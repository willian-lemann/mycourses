import { parseCookies, setCookie } from "nookies";
import { useEffect, useMemo, useState } from "react";
import { Product } from "../../models/product";

const storageKey = process.env.NEXT_PUBLIC_CART_STORAGE_KEY as string;

export const useCart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<Product[]>([]);

  const isEmpty = useMemo(() => items.length === 0, [items]);
  const totalItems = useMemo(() => items.length, [items]);
  const totalAmount = useMemo(() => {
    const eachItemAmount = items.flatMap((item) => item.quantity * item.price);
    return eachItemAmount.reduce((previous, next) => previous + next, 0);
  }, [items]);

  function toggle() {
    setIsOpen(!isOpen);
  }

  function addItem(item: Product, quantity: number = 1) {
    if (inCart(item.id)) {
      const itemInCart = items.find(
        (product) => product.id === item.id
      ) as Product;

      updateCartItemQuantity(item.id, itemInCart.quantity + 1);

      toggle();

      return;
    }

    const newItem = { ...item, quantity };

    setItems((state) => [...state, newItem]);

    setCookie(undefined, storageKey, JSON.stringify([...items, newItem]));

    toggle();
  }

  function updateCartItemQuantity(id: string, quantity: number) {
    const newCartItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: quantity < 1 ? 1 : quantity,
        };
      }

      return item;
    });

    setItems(newCartItems);

    setCookie(undefined, storageKey, JSON.stringify(newCartItems));
  }

  function getItem(id: string): Product | null {
    const item = items.find((item) => item.id === id);
    return item || null;
  }

  function removeItem(id: string) {
    setItems((state) => state.filter((item) => item.id !== id));

    const { [storageKey]: storageData } = parseCookies(undefined);

    const storageItems = JSON.parse(storageData) as Product[];

    setCookie(
      undefined,
      storageKey,
      JSON.stringify(storageItems.filter((item) => item.id !== id))
    );

    if (items.length === 1) {
      toggle();
    }
  }

  function emptyCart() {
    setItems([]);
  }

  function inCart(id: string) {
    const productItem = items.find((item) => item.id === id);
    return productItem !== undefined;
  }

  useEffect(() => {
    const loadItemsFromStorage = () => {
      const { [storageKey]: storageData } = parseCookies(undefined);

      if (storageData) {
        const storageItems = JSON.parse(storageData) as Product[];
        setItems(storageItems);
      }
    };

    loadItemsFromStorage();
  }, []);

  return {
    isOpen,
    toggle,
    items,
    isEmpty,
    totalItems,
    totalAmount,
    addItem,
    updateCartItemQuantity,
    getItem,
    removeItem,
    emptyCart,
    inCart,
  };
};
