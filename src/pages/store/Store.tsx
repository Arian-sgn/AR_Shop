import { useEffect, useState } from "react";
import Container from "../../components/Container";
import Products from "../../components/products/Products";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/api";
import type { mpt } from "../../types/Types";
import { useCart } from "../../shopping cart context/useCart";

const {itemsInCart,setItemsInCart} = useCart();



function Store() {
  const [product, setProduct] = useState<mpt[]>([]);

  useEffect(() => {
    getProducts().then((result) => {
      setProduct(result);
    });
  }, []);

  return (
    <div>
      <Container>
        <p className="font-bold text-3xl text-right mt-4 mb-6">لیست محصولات</p>
        <div className="grid grid-cols-4 gap-6">
          {product.map((item) => (
            <Link key={item.id} to={`/Product/${item.id}`}>
              <Products {...item} />
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Store;
