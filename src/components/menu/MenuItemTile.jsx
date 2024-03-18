import AddToCartButton from './AddToCartButton';

export default function MenuItemTile({ item, onClick }) {
  const hasSizesOrExtras = item.sizes?.length > 0 || item.extraIngredients?.length > 0;

  return (
    <div className="flex flex-col justify-between min-h-80 h-full bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-lg hover:shadow-black/25 transition-all cursor-pointer">
      <div className="text-center">
        <img src={item.image} alt="pizza" className="block max-h-36 h-full mx-auto" />
      </div>
      <div className="flex flex-col h-full relative">
        <h4 className="font-semibold">{item.name}</h4>
        <p className="text-gray-500 text-sm mt-2 line-clamp-3">{item.description}</p>
        <AddToCartButton
          onClick={onClick}
          basePrice={item.basePrice}
          hasSizesOrExtras={hasSizesOrExtras}
          imageSrc={item.image}
        />
      </div>
    </div>
  );
}
