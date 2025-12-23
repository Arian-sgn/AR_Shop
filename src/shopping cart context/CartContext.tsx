
import { createContext } from "react";

export interface itemInCart {
  id: number;
  qty: number;
}
export interface cartContextType {
  itemsInCart: itemInCart[];
  setItemsInCart: React.Dispatch<React.SetStateAction<itemInCart[]>>;
}

export const cartContext = createContext<cartContextType | undefined>(undefined);
