import { useState, useEffect } from 'react';
import EditableImage from './EditableImage';

import MenuItemPriceProps from './MenuItemPriceProps';

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || [],
  );
  const [categories, setGategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then((response) =>
      response.json().then((categories) => {
        setGategories(categories);
      }),
    );
  }, []);

  return (
    <form
      className="mt-8"
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientPrices,
          category,
        })
      }>
      <div className="flex items-start gap-4 sm:flex-row flex-col">
        <div className="flex gap-2 flex-col items-center sm:w-1/4 w-full">
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow flex flex-col gap-2 sm:w-3/4 w-full">
          <input
            type="text"
            placeholder="Write menu item name"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <input
            type="text"
            placeholder="Write menu item description"
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
          />
          <div className="">
            <p className="text-gray-500 text-sm">Choose category</p>
            <select value={category} onChange={(evt) => setCategory(evt.target.value)}>
              {categories?.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <input
            type="text"
            placeholder="Write menu item price"
            value={basePrice}
            onChange={(evt) => setBasePrice(evt.target.value)}
          />
          <MenuItemPriceProps
            sizes={sizes}
            setSizes={setSizes}
            name={'Sizes'}
            addLabel={'Add item size'}
          />
          <MenuItemPriceProps
            sizes={extraIngredientPrices}
            setSizes={setExtraIngredientPrices}
            name={'Extra ingredients'}
            addLabel={'Add ingredients prices'}
          />
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}
