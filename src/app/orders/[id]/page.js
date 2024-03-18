'use client';

import AddressInputs from '@/components/layout/AddressInputs';
import SectionHeaders from '@/components/layout/SectionHeaders';
import CartProduct from '@/components/menu/CartProduct';
import { CartContext, cartProductPrice } from '@/hooks/AppContext';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function OrderPage() {
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true);
  const { clearCart } = useContext(CartContext);
  const [subTotal, setSubTotal] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true);
      fetch('/api/orders?_id=' + id).then((response) =>
        response.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false);
        }),
      );
    }
  }, []);

  useEffect(() => {
    const sum = order?.cartProducts.reduce((full, product) => {
      return (full += cartProductPrice(product));
    }, 0);
    setSubTotal(sum);
  }, [order]);

  return (
    <section className="max-w-2xl mx-auto  mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader={'Your order'} />
        <div className="my-4 ">
          <p>Thanks for your order</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>
      {loadingOrder && <p>Loading order...</p>}
      {order && (
        <div className="flex sm:flex-row flex-col justify-between gap-5">
          <div className="sm:w-1/2 w-full">
            {order.cartProducts.map((product) => (
              <CartProduct key={product._id} product={product} />
            ))}
            <div className="mt-2 text-right">
              <p className="text-gray-500 italic">
                SubTotal:
                <span className="inline-block ml-2 font-semibold text-lg text-black w-8">
                  ${subTotal}
                </span>
              </p>
              <p className="text-gray-500 italic">
                Deliivery:
                <span className="inline-block ml-2 font-semibold text-lg text-black w-8">$5</span>
              </p>
              <p className="text-gray-500 italic">
                Total:
                <span className="inline-block ml-2 font-semibold text-lg text-black w-8">
                  ${subTotal + 5}
                </span>
              </p>
            </div>
          </div>
          <div className="sm:w-1/2 w-full">
            <div className="bg-gray-100 p-4 rounded-lg">
              <AddressInputs disapled={true} addressProps={order} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
