'use client';

import { SessionProvider } from 'next-auth/react';
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }

  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== 'undefined' ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem('cartProducts')) {
      setCartProducts(JSON.parse(ls.getItem('cartProducts')));
    }
  }, []);

  const saveCartProductsToLocalStorage = (cartProducts) => {
    if (ls) {
      ls.setItem('cartProducts', JSON.stringify(cartProducts));
    }
  };

  const clearCart = () => {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  };

  const removeCartProduct = (indexToRemove) => {
    setCartProducts((prevCartProducts) => {
      const newProducts = prevCartProducts.filter((_, index) => index !== indexToRemove);
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  };

  const addToCart = (product, size = null, extras = []) => {
    setCartProducts((prevCartProducts) => {
      const newProduct = { ...product, size, extras };
      const newProducts = [...prevCartProducts, newProduct];
      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  };

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{ cartProducts, setCartProducts, addToCart, clearCart, removeCartProduct }}>
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
}
