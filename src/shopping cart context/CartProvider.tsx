import React, { useState } from "react";
import { cartContext } from "./CartContext";
import { itemInCart } from "./CartContext";

interface ch{
  children: React.ReactNode
}

export function CartProvider({ children }: ch) {
  const [itemsInCart, setItemsInCart] = useState<itemInCart[]>([]);

  return (
    <cartContext.Provider value={{ itemsInCart, setItemsInCart }}>
      {children}
    </cartContext.Provider>
  );
}