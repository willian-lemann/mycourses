import { parseCookies } from "nookies";
import { describe, it, expect, afterEach, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";

import { useCart } from "./useCart";
import { Product } from "../../models/product";

const storageKey = process.env.NEXT_PUBLIC_CART_STORAGE_KEY as string;

const { result, unmount, rerender } = renderHook(useCart);

describe("test useCart hook", () => {
  it("should add an item to the cart", () => {
    const item: Product = {
      id: "id",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };

    expect(result.current.inCart(item.id)).toBeFalsy();

    result.current.addItem(item);

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.inCart(item.id)).toBeTruthy();
  });

  it("should open modal when add an item", () => {
    const item: Product = {
      id: "id",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };

    result.current.addItem(item);
    result.current.addItem(item);

    expect(result.current.inCart(item.id)).toBeTruthy();
  });

  it("should update quantity adding a item with the same id", () => {
    const item: Product = {
      id: "id",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };

    result.current.emptyCart();

    result.current.addItem(item);
    result.current.addItem(item);

    expect(result.current.items[0].quantity).toBe(2);
  });

  it("should add an item to the local storage cart", () => {
    const item: Product = {
      id: "id",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };

    result.current.addItem(item);

    const { [storageKey]: storageData } = parseCookies(undefined);

    const storageItems = JSON.parse(storageData) as Product[];
    expect(storageItems).toHaveLength(1);
  });

  it("should update cart item quantity", () => {
    const item: Product = {
      id: "id",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };
  });

  it("should remove an item from the cart", () => {
    const item: Product = {
      id: "id",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };

    result.current.addItem(item);
    result.current.removeItem(item.id);
    expect(result.current.items).toHaveLength(0);
  });

  it("should remove an item from the local storage cart", () => {
    const item: Product = {
      id: "id",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };

    result.current.addItem(item);
    result.current.removeItem(item.id);

    const { [storageKey]: storageData } = parseCookies(undefined);

    const storageItems = JSON.parse(storageData) as Product[];
    expect(storageItems).toHaveLength(0);
  });

  it("should close cart modal when remove the last item from cart", () => {
    const item: Product = {
      id: "id",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };
    const item2: Product = {
      id: "id2",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };

    result.current.addItem(item);
    expect(result.current.inCart(item2.id)).toBeFalsy();
    result.current.addItem(item2);
    expect(result.current.inCart(item2.id)).toBeTruthy();

    result.current.toggle();

    result.current.removeItem(item2.id);
    result.current.removeItem(item.id);
    expect(result.current.isOpen).toBeFalsy();
  });

  it("should isEmpty be empty after removing all items from cart", () => {
    const item: Product = {
      id: "id",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };

    result.current.addItem(item);
    result.current.removeItem(item.id);
    expect(result.current.items).toHaveLength(0);
    expect(result.current.isEmpty).toBeTruthy();
  });

  it("should totalItems have the total of items in cart", () => {
    const item: Product = {
      id: "id",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };
    const item2: Product = {
      id: "id2",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };

    result.current.addItem(item);
    result.current.addItem(item2);
    expect(result.current.totalItems).toBe(2);
  });

  it("should be able to get one item from the cart", () => {
    const item: Product = {
      id: "id",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };

    result.current.emptyCart();

    result.current.addItem(item);

    const itemFromCart = result.current.getItem(item.id);

    expect(itemFromCart).toStrictEqual(item);

    const otherId = "id2";
    const itemIsNotInCart = result.current.getItem(otherId);

    expect(itemIsNotInCart).toBeNull();
    expect(result.current.items).toHaveLength(1);
  });

  it("should quantity not be less than zero", () => {
    const item: Product = {
      id: "id",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };

    result.current.addItem(item);
    result.current.updateCartItemQuantity(item.id, item.quantity - 2);

    expect(result.current.getItem(item.id)?.quantity).toBe(1);
  });

  it("should be able to get the total amount of the cart", () => {
    const item: Product = {
      id: "id",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };
    const item2: Product = {
      id: "id2",
      image: "test image",
      name: "test name",
      price: 100,
      quantity: 1,
    };

    result.current.emptyCart();
    result.current.addItem(item);
    result.current.addItem(item2);

    expect(result.current.totalAmount).toBe(200);

    result.current.updateCartItemQuantity(item2.id, item2.quantity + 1);

    expect(result.current.totalAmount).toBe(300);
  });
});
