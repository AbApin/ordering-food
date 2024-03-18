'use client';

import SectionHeaders from '@/components/layout/SectionHeaders';
import { CartContext, cartProductPrice } from '@/hooks/AppContext';
import { useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import AddressInputs from '@/components/layout/AddressInputs';
import { useAdmin } from '@/hooks/useAdmin';
import CartProduct from '@/components/menu/CartProduct';

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const { data: profileData } = useAdmin();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment failed');
      }
    }
  }, []);

  useEffect(() => {
    const sum = cartProducts.reduce((full, product) => {
      return (full += cartProductPrice(product));
    }, 0);
    setSubTotal(sum);
  }, [cartProducts]);

  useEffect(() => {
    if (profileData?.city) {
      setAddress(profileData);
    }
  }, [profileData]);

  const handleAddressChange = (propName, value) => {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  };

  const removeProductHandler = (index) => {
    removeCartProduct(index);
    toast.success('Product removed!');
  };

  const proceedToCheckout = async (evt) => {
    evt.preventDefault();

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });

    toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment...',
      error: 'Something went wrong',
    });
  };

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="mt-8">
        {cartProducts?.length === 0 && (
          <div className="text-center font-semibold italic">
            No products in your shopping cart 😌
          </div>
        )}
        {cartProducts?.length !== 0 && (
          <div className="grid md:grid-cols-2 gap-8 items-start mt-8">
            <div>
              {cartProducts?.length > 0 &&
                cartProducts.map((product, index) => (
                  <CartProduct
                    key={product._id}
                    product={product}
                    onRemove={removeProductHandler}
                    index={index}
                  />
                ))}
              <div className="mt-2 text-right pr-16">
                <p className="text-gray-500 italic">
                  SubTotal:
                  <span className="inline-block ml-2 font-semibold text-lg text-black">
                    ${subTotal}
                  </span>
                </p>
                <p className="text-gray-500 italic">
                  Deliivery:
                  <span className="inline-block ml-2 font-semibold text-lg text-black">$5</span>
                </p>
                <p className="text-gray-500 italic">
                  Total:
                  <span className="inline-block ml-2 font-semibold text-lg text-black">
                    ${subTotal + 5}
                  </span>
                </p>
              </div>
            </div>
            <div className="bg-gray-200 p-4 rounded-md">
              <h2>Checkout</h2>
              <form onSubmit={proceedToCheckout}>
                <div className="mt-2">
                  <AddressInputs addressProps={address} setAddressProps={handleAddressChange} />
                </div>
                <button type="submit" className="bg-primary text-white mt-2">
                  Pay ${subTotal + 5}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
