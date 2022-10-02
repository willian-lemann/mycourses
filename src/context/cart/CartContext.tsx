import { createContext, ReactNode, useContext } from "react";

import { useCart } from "./useCart";
import { Product } from "../../models/product";

export interface CartContextProps {
  isOpen: boolean;
  items: Product[];
  totalItems: number;
  totalAmount: number;
  isEmpty: boolean;
  addItem: (item: Product) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  emptyCart: () => void;
  getItem: (id: string) => Product | null;
  inCart: (id: string) => boolean;
  toggle: () => void;
}

const CartContext = createContext({} as CartContextProps);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const cart = useCart();

  return (
    <CartContext.Provider
      value={{
        ...cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
