import Image from 'next/image';
import Trash from '@/components/icons/Trash';
import { cartProductPrice } from '@/hooks/AppContext';

export default function CartProduct({ product, onRemove, index }) {
  return (
    <div key={product._id} className="flex items-center justify-between p-2 border-b-2">
      <div className="flex items-center gap-4 ">
        <div>
          <Image src={product.image} width={100} height={100} alt={product.name} />
        </div>
        <div>
          <p className="font-semibold">{product.name}</p>
          {product.size && (
            <p className="text-sm">
              Size: <span>{product.size.name}</span>
            </p>
          )}
          {product.extras?.length > 0 && (
            <div className="text-sm text-gray-400">
              {product.extras.map((extra) => (
                <p key={extra.name}>
                  {extra.name} ${extra.price}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-lg font-semibold">${cartProductPrice(product)}</p>
        {onRemove && (
          <button type="button" onClick={() => onRemove(index)}>
            <Trash />
          </button>
        )}
      </div>
    </div>
  );
}
