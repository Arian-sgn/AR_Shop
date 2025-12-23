import React, { useState } from "react";
import { cartContext } from "./CartContext";
import type { itemInCart } from "./CartContext";

interface ch{
  children: React.ReactNode
}

export function CartProvider({ children }: ch) {

  const [itemsInCart, setItemsInCart] = useState<itemInCart[]>([]);

  const IncreaseItemQTY = (id : number) => {
    setItemsInCart(currentItems => {
      const selected = currentItems.find((item) => item.id == id)

      if (selected == null){
        return [...currentItems , {id: id , qty: 1}]
      }
      else{
        return currentItems.map(item =>{
          if(item.id == id){
            return{...item , qty:item.qty + 1}
          }
          else{
            return item
          }
        })
      }
    })
  }
  return (
    <cartContext.Provider value={{ itemsInCart, setItemsInCart ,IncreaseItemQTY}}>
      {children}
    </cartContext.Provider>
  );
}