import Trash from '../icons/Trash';
import Plus from '../icons/Plus';
import Bottom from '../icons/Bottom';
import { useState } from 'react';
import clsx from 'clsx';

export default function MenuItemPriceProps({ sizes, setSizes, addLabel, name }) {
  const [isOpen, setIsOpen] = useState(false);
  const addSize = () => {
    setSizes((oldSizes) => {
      return [...oldSizes, { name: '', price: 0 }];
    });
  };

  const editSize = (evt, index, prop) => {
    const newValue = evt.target.value;

    setSizes((oldSizes) => {
      const newSizes = [...oldSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  };

  const removeSize = (index) => {
    return setSizes((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="flex flex-col gap-2 bg-gray-200 p-2 rounded-md transition-all">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-700 font-normal">
          {name} <span>({sizes.length})</span>
        </h3>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white border border-gray-700 p-1 rounded-md w-auto transition-all hover:border-primary hover:text-primary">
          <Bottom className={clsx(isOpen ? 'rotate-180' : 'rotate-0', 'w-5 h-5 transition-all')} />
        </button>
      </div>
      {isOpen && (
        <>
          {sizes?.length > 0 &&
            sizes.map((size, index) => (
              <div key={index} className="flex items-end gap-2">
                <div className="">
                  <label className="text-gray-600 font-normal text-[13px]">Name</label>
                  <input
                    type="text"
                    placeholder="Size name"
                    value={size.name}
                    onChange={(evt) => editSize(evt, index, 'name')}
                  />
                </div>
                <div className="">
                  <label className="text-gray-600 font-normal text-[13px]">Extra price</label>
                  <input
                    type="text"
                    placeholder="Extra price"
                    value={size.price}
                    onChange={(evt) => editSize(evt, index, 'price')}
                  />
                </div>
                <div className="">
                  <button type="button" onClick={() => removeSize(index)} className="bg-white px-2">
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <button
            type="button"
            onClick={addSize}
            className="flex items-center justify-center gap-2 bg-white">
            <Plus className="w-5 h-5" />
            {addLabel}
          </button>
        </>
      )}
    </div>
  );
}
