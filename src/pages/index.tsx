import { Cart } from "../components/Cart";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ProductList } from "../components/ProductList";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;
