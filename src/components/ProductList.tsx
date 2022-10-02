import { useCartContext } from "../context/cart/CartContext";
import { Product } from "../models/product";

const products: Product[] = [
  {
    id: "1",
    name: "Earthen Bottle",
    quantity: 1,
    price: 48,
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
  },
  {
    id: "2",
    name: "Earthen Bottle",
    quantity: 1,
    price: 48,
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
  },
  {
    id: "3",
    name: "Earthen Bottle",
    quantity: 1,
    price: 48,
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
  },
  {
    id: "4",
    name: "Earthen Bottle",
    quantity: 1,
    price: 48,
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
  },
  {
    id: "5",
    name: "Earthen Bottle",
    quantity: 1,
    price: 48,
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
  },
];

export const ProductList = () => {
  const { addItem } = useCartContext();

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <ul className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <li
              key={product.id}
              className="group relative list-none"
              onClick={() => addItem(product)}
            >
              <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                  src={product.image}
                  alt="image alt"
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <button>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </button>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">Color </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
