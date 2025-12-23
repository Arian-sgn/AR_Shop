
import { useContext } from "react";
import { cartContext } from "./CartContext";

export const useCart = () => {
  const context = useContext(cartContext);

  if (!context) {
    throw new Error("useCart باید داخل <CartProvider> استفاده شود.");
  }

  return context;
}