import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Store from "./pages/store/Store";
import "./App.css";
import Layout from "./components/layout/Layout";
import ProductPage from "./components/productPage/ProductPage";
import Cart from "./pages/cart/Cart";
import { CartProvider } from "./shopping cart context/CartProvider";

function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Layout>
    </CartProvider>
  );
}

export default App;
