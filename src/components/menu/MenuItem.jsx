import { CartContext } from '@/hooks/AppContext';
import { useContext } from 'react';
import FlyingButton from 'react-flying-item';
import { useState } from 'react';
import MenuItemTile from './MenuItemTile';
import Image from 'next/image';

export default function MenuItem({ item }) {
  const { addToCart } = useContext(CartContext);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(item?.sizes[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const addToCartClickHandler = async () => {
    const hasOptions = item.sizes.length > 0 || item.extraIngredientPrices.length > 0;

    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    showPopup ? addToCart(item, selectedSize, selectedExtras) : addToCart(item);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowPopup(false);
  };

  const handleExtraThingClick = (ev, extraThing) => {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  };

  let selectedPrice = item.basePrice;
  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }
  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }
  return (
    <div className={showPopup ? 'overflow-y-hidden' : 'overflow-y-auto'}>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed w-full h-full top-0 left-0 z-10 flex items-center justify-center bg-black/80 ">
          <div
            onClick={(evt) => evt.stopPropagation()}
            className="bg-white rounded-lg max-w-md p-2">
            <div className="overflow-y-auto p-2 " style={{ maxHeight: 'calc(100vh - 80px' }}>
              <Image
                src={item.image}
                width={300}
                height={200}
                className="mx-auto"
                alt={item.name}
              />
              <h2 className="text-lg font-bold text-center mb-2">{item.name}</h2>
              <p className="text-gray-500 text-sm text-center">{item.description}</p>
              {item.sizes.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-700">Pick your size</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    {item.sizes.map((size, index) => (
                      <label
                        key={item._id + index}
                        className="inline-flex items-center gap-2 cursor-pointer p-4 rounded-md border ">
                        <input
                          type="radio"
                          onChange={() => setSelectedSize(size)}
                          checked={selectedSize?.name === size.name}
                          name="size"
                        />
                        {size.name} ${item.basePrice + size.price}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {item.extraIngredientPrices.length > 0 && (
                <div className="p-2">
                  <h3 className="text-center text-gray-700">Any extras?</h3>
                  <div className="flex flex-col gap-2 mt-2">
                    {item.extraIngredientPrices.map((extraThing, index) => (
                      <label
                        key={extraThing.price + index}
                        className="inline-flex items-center gap-2 cursor-pointer p-4 rounded-md border ">
                        <input
                          type="checkbox"
                          onClick={(ev) => handleExtraThingClick(ev, extraThing)}
                          name={extraThing.name}
                        />
                        {extraThing.name} +${extraThing.price}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flying-button-parent1">
                <FlyingButton targetTop={'5%'} targetLeft={'90%'} src={item.image}>
                  <div onClick={addToCartClickHandler}>Add to card ${selectedPrice}</div>
                </FlyingButton>
              </div>
              <button onClick={() => setShowPopup(false)} type="button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile item={item} onClick={addToCartClickHandler} />
    </div>
  );
}
