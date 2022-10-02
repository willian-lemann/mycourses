import { useCartContext } from "../../context/cart/CartContext";

interface QuantityCounterProps {
  productId: string;
  quantity: number;
}

export const QuantityCounter = ({
  productId,
  quantity,
}: QuantityCounterProps) => {
  const { updateCartItemQuantity } = useCartContext();

  return (
    <div className="flex flex-row w-28 rounded-lg relative bg-transparent">
      <button
        onClick={() => updateCartItemQuantity(productId, quantity - 1)}
        data-action="decrement"
        className=" bg-gray-50 text-gray-600 hover:text-gray-700 hover:bg-gray-100 h-full w-20 rounded-l  flex items-center justify-center cursor-pointer outline-none"
      >
        <span className="text-2xl font-thin">−</span>
      </button>

      <button
        onClick={() => updateCartItemQuantity(productId, quantity + 1)}
        data-action="increment"
        className=" bg-gray-50 text-gray-600 hover:text-gray-700 hover:bg-gray-100 h-full w-20 rounded-r cursor-pointer outline-none"
      >
        <span className="text-2xl font-thin">+</span>
      </button>
    </div>
  );
};
