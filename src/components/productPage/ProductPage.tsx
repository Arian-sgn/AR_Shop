import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../Container";
import Button from "../button/Button";
import type { mpt } from "../../types/Types";
import { getProduct } from "../../services/api";
import { useCart } from "../../shopping cart context/useCart";


function ProductPage() {
  const {IncreaseItemQTY, itemsInCart} = useCart();

  const params = useParams<{ id: string }>();
  const [prd, setPrd] = useState<mpt>();

  useEffect(() => {
    if (!params.id) return;

    getProduct(params.id).then((result) => {
      setPrd(result);
    });
  }, [params.id]);

  if (!prd) {
    return (
      <Container>
        <div className="mt-10 text-center text-gray-500">
          در حال بارگذاری...
        </div>
      </Container>
    );
  }
  console.log(itemsInCart);

  return (
    <Container>
      <section className="mt-10 grid grid-cols-12 gap-8 text-right">
        <div className="col-span-12 md:col-span-4 order-1">
          <div className="rounded-xl border border-gray-200 bg-white shadow-md overflow-hidden">
            <div className=" bg-gray-50">
              <img
                src={prd.image}
                alt={prd.title}
                className="h-full w-full object-contain aspect-3/4"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-8 flex flex-col gap-6">
          <header className="border-b border-gray-200 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold">{prd.title}</h1>
          </header>

          <div className="grid grid-cols-12 gap-4">
            <aside className="col-span-12 sm:col-span-4 lg:col-span-3 text-center rounded-xl border border-gray-200 bg-white p-4 shadow-md flex flex-col justify-between">
              <div>
                <span className="block text-lg font-bold text-emerald-700">
                  {prd.price.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              <Button onClick={()=>IncreaseItemQTY(parseInt(params.id as string))} className="mt-4 w-full">افزودن به سبد خرید</Button>
            </aside>

            <article className="col-span-12 sm:col-span-8 lg:col-span-9 rounded-xl border border-gray-200 bg-white p-4 shadow-md text-sm leading-relaxed text-gray-700">
              {prd.description}
            </article>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default ProductPage;
