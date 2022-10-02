import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import EventEmitter from "events";
import { useEffect, useState } from "react";
import { useCartContext } from "../../context/cart/CartContext";
import { classNames } from "../../utils/classnames";

export const NavbarActions = () => {
  const { totalItems, toggle } = useCartContext();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [search, setSearch] = useState("");

  const handleInputBlur = () => {
    if (!search) {
      return setIsInputVisible(false);
    }

    setIsInputVisible(true);
  };

  useEffect(() => {
    if (search.length === 0) {
      setIsInputVisible(false);
    }
  }, [search]);

  return (
    <div className="ml-auto flex items-center">
      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
        <a
          href="#"
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          Sign in
        </a>
        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
        <a
          href="#"
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          Create account
        </a>
      </div>

      <div className="hidden lg:ml-8 lg:flex">
        <a
          href="#"
          className="flex items-center text-gray-700 hover:text-gray-800"
        >
          <img
            src="https://tailwindui.com/img/flags/flag-canada.svg"
            alt=""
            className="block h-auto w-5 flex-shrink-0"
          />
          <span className="ml-3 block text-sm font-medium">CAD</span>
          <span className="sr-only">, change currency</span>
        </a>
      </div>

      <div className="flex lg:ml-6 lg:max-w-full">
        <a
          href="#"
          className="p-2 text-gray-400 hover:text-gray-500"
          onClick={() => setIsInputVisible(!isInputVisible)}
        >
          <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
        </a>

        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          onBlur={handleInputBlur}
          className={classNames(
            "px-2 outline-none border rounded-md text-gray-400",
            isInputVisible ? "max-w-full" : "max-w-0 sr-only"
          )}
        />
      </div>

      {/* Cart */}
      <div className="ml-4 flow-root lg:ml-6" onClick={toggle}>
        <a href="#" className="group -m-2 flex items-center p-2">
          <ShoppingBagIcon
            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {totalItems}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </a>
      </div>
    </div>
  );
};
