import React, { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        // Si el item ya existe, actualizar cantidad
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      }
      // Si es un item nuevo, agregarlo con cantidad 1
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const value = {
    cart,
    addItem,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}


