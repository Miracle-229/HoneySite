import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  const initialRender = useRef(true);

  // Загрузить значение счетчика из localStorage при загрузке
  useEffect(() => {
    const savedCartCount = localStorage.getItem('cartCount');
    if (savedCartCount) {
      setCartCount(parseInt(savedCartCount, 10));
    }
  }, []);

  // Сохранить значение счетчика в localStorage при его изменении
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    localStorage.setItem('cartCount', cartCount.toString());
  }, [cartCount]);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
