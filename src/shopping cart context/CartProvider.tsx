import React, { useState } from "react";
import { cartContext } from "./CartContext";
import type { itemInCart } from "./CartContext";

interface ch {
  children: React.ReactNode;
}

export function CartProvider({ children }: ch) {
  const [itemsInCart, setItemsInCart] = useState<itemInCart[]>([]);

  const IncreaseItemQTY = (id: number) => {
    setItemsInCart((currentItems) => {
      const itemExists = currentItems.find((item) => item.id === id);

      if (!itemExists) {
        return [...currentItems, { id: id, qty: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const DecreaseItemQTY = (id: number) => {
    setItemsInCart((currentItems) => {
      const itemExists = currentItems.find((item) => item.id === id);
      if (itemExists?.qty === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, qty: item.qty - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const GetProductQTY = (id: number) => {
    return itemsInCart.find((item) => item.id === id)?.qty || 0;
  };
  const Trash = (id: number) => {
    setItemsInCart((currentItems) =>
      currentItems.filter((item) => item.id !== id)
    );
  };

  const cartQTY = itemsInCart.reduce(
    (totalQty, item) => totalQty + item.qty,
    0
  );

  return (
    <cartContext.Provider
      value={{
        itemsInCart,
        setItemsInCart,
        IncreaseItemQTY,
        DecreaseItemQTY,
        GetProductQTY,
        Trash,
        cartQTY,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
