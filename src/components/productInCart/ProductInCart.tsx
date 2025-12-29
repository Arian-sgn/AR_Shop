import { useEffect, useState } from "react";
import type { itemInCart } from "../../shopping cart context/CartContext";
import { getProduct } from "../../services/api";
import type { mpt } from "../../types/Types";
import { useCart } from "../../shopping cart context/useCart";
import { NavLink } from "react-router-dom";

function ProductInCart({ id, qty }: itemInCart) {

  const{IncreaseItemQTY,DecreaseItemQTY,Trash} = useCart();

  const [product, setProduct] = useState<mpt>();

  useEffect(() => {
    getProduct(id).then((result) => {
      setProduct(result);
    });
  });

  return (
    <div className="flex flex-row-reverse justify-center">
      <div className="flex flex-row-reverse items-center border border-gray-300 rounded-2xl shadow-lg bg-white px-10 py-7 mt-10 mb-4">
        <NavLink to={`/Product/${id}`}>
         <div className="w-52 text-center flex flex-col items-center">
          <img
            className="shadow-md rounded-2xl w-full"
            src={product?.image}
            alt="product"
          />
          <p className="text-xl font-medium mt-3">{product?.title}</p>
        </div>
        </NavLink>
       

        <div className="flex flex-row-reverse items-center mr-20 gap-4">
          <button onClick={() => IncreaseItemQTY(id)} className="px-3 py-1 border rounded-lg hover:bg-green-50 transition">
            <svg
              fill="#00c0ff"
              width="27px"
              height="27px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z" />
            </svg>
          </button>

          <p className="text-lg font-semibold">{qty}</p>

          <button onClick={() => DecreaseItemQTY(id)} className="px-3 py-1 border rounded-lg hover:bg-green-50 transition">
            <svg
              fill="#00c0ff"
              width="27px"
              height="27px"
              viewBox="-5 -11 24 24"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMinYMin"
            >
              <path d="M1 0h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z" />
            </svg>
          </button>

          <button onClick={ () => Trash(id)}>
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="#00c0ff"
            >
              <path d="M20 6h-3.155a.949.949 0 0 0-.064-.125l-1.7-2.124A1.989 1.989 0 0 0 13.519 3h-3.038a1.987 1.987 0 0 0-1.562.75l-1.7 2.125A.949.949 0 0 0 7.155 6H4a1 1 0 0 0 0 2h1v11a2 2 0 0 0 1.994 2h10.011A2 2 0 0 0 19 19V8h1a1 1 0 0 0 0-2zm-9.519-1h3.038l.8 1H9.681zm6.524 14H7V8h10z" />
              <path d="M14 18a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1zM10 18a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductInCart;
