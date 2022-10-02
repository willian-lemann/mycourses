import { ReactNode } from "react";
import { CartProvider } from "./cart/CartContext";

interface ProviderProps {
  children: ReactNode;
}

export const Provider = ({ children }: ProviderProps) => (
  <CartProvider>{children}</CartProvider>
);
