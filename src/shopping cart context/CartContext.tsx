import { createContext } from "react";

export interface itemInCart {
  id: number;
  qty: number;
}
export interface cartContextType {
  itemsInCart: itemInCart[];
  setItemsInCart: React.Dispatch<React.SetStateAction<itemInCart[]>>;
  IncreaseItemQTY: (id: number) => void;
  DecreaseItemQTY: (id: number) => void;
  GetProductQTY: (id: number) => number;
  Trash: (id: number) => void;
  cartQTY: number;
}

export const cartContext = createContext<cartContextType | undefined>(
  undefined
);
