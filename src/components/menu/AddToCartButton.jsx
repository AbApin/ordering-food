import FlyingButton from 'react-flying-item';

export default function AddToCartButton({ hasSizesOrExtras, onClick, basePrice, imageSrc }) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent">
        <FlyingButton targetTop={'5%'} targetLeft={'90%'} src={imageSrc}>
          <div className="w-full h-full" onClick={onClick}>
            Add to cart ${basePrice}
          </div>
        </FlyingButton>
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="absolute bottom-0 w-full bg-primary text-white rounded-full px-8 py-2 mt-4">
      Add to cart (from ${basePrice})
    </button>
  );
}
