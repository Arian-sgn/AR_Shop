import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../Container";
import Button from "../button/Button";
import type { mpt } from "../../types/Types";
import { getProduct } from "../../services/api";
import { useCart } from "../../shopping cart context/useCart";
import { NavLink } from "react-router-dom";

function ProductPage() {
  const { IncreaseItemQTY, DecreaseItemQTY, GetProductQTY, Trash } = useCart();
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
        <div className="mt-12 flex h-[50vh] items-center justify-center text-(--text)">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </Container>
    );
  }

  const productId = parseInt(params.id as string);
  const qty = GetProductQTY(productId);

  return (
    <Container>
      <section className="mt-8 grid grid-cols-1 gap-8 pb-20 text-right md:mt-20 md:grid-cols-12">
        
        {/* Image Section */}
        <div className="order-1 col-span-1 md:col-span-4 md:order-1">
          <div className="overflow-hidden rounded-xl bg-(--primary-soft) shadow-(--shadow-md) ring-1 ring-(--ring)">
            <img
              src={prd.image}
              alt={prd.title}
              className="aspect-square w-full object-contain p-4 md:aspect-3/4"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="order-2 flex flex-col gap-6 md:col-span-8 md:order-2">
          <header className="border-b border-(--surface) pb-4">
            <h1 className="text-xl font-bold leading-tight text-(--a) sm:text-2xl md:text-3xl">
              {prd.title}
            </h1>
          </header>

          <div className="flex flex-col-reverse gap-6 lg:grid lg:grid-cols-12">
            
            {/* Description */}
            <article className="rounded-xl bg-(--primary-soft) p-4 text-sm leading-relaxed text-(--text-muted) shadow-(--shadow-sm) ring-1 ring-(--ring) lg:col-span-8">
              {prd.description}
            </article>

            {/* Sidebar / Cart Actions */}
            <aside className="flex flex-col justify-between rounded-xl bg-(--primary-soft) p-4 shadow-(--shadow-sm) ring-1 ring-(--ring) lg:col-span-4">
              <div className="mb-4 text-center">
                <span className="block text-xl font-bold text-(--buy-button)">
                  {prd.price.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              {qty === 0 ? (
                <button
                  onClick={() => IncreaseItemQTY(productId)}
                  className="mt-4 w-full rounded-lg border bg-(--buy-button) py-3 text-lg font-bold text-(--primary-soft) ring-(--a) transition-all hover:shadow-md hover:ring-2 active:scale-95"
                >
                  افزودن به سبد خرید
                </button>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="mt-4 flex flex-row-reverse w-full items-center justify-between rounded-lg bg-(--primary-soft) px-2 py-2 text-xl shadow-lg ring-2 ring-(--nb)">
                    
                    {/* Increase Button */}
                    <Button
                      onClick={() => IncreaseItemQTY(productId)}
                      className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
                    >
                      <svg fill="#00c0ff" width="24px" height="24px" viewBox="0 0 24 24">
                        <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z" />
                      </svg>
                    </Button>

                    <span className="font-bold">{qty}</span>

                    {/* Decrease/Trash Button */}
                    {qty === 1 ? (
                      <Button
                        onClick={() => Trash(productId)}
                        className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100"
                      >
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="#00c0ff">
                          <path d="M20 6h-3.155a.949.949 0 0 0-.064-.125l-1.7-2.124A1.989 1.989 0 0 0 13.519 3h-3.038a1.987 1.987 0 0 0-1.562.75l-1.7 2.125A.949.949 0 0 0 7.155 6H4a1 1 0 0 0 0 2h1v11a2 2 0 0 0 1.994 2h10.011A2 2 0 0 0 19 19V8h1a1 1 0 0 0 0-2zm-9.519-1h3.038l.8 1H9.681zm6.524 14H7V8h10z" />
                          <path d="M14 18a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1zM10 18a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1z" />
                        </svg>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => DecreaseItemQTY(productId)}
                        className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-extrabold text-[#00c0ff] hover:bg-gray-100 hover:text-[#00a0ff]"
                      >
                         <svg fill="#00c0ff" width="20px" height="20px" viewBox="-5 -11 24 24">
                          <path d="M1 0h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z" />
                        </svg>
                      </Button>
                    )}
                  </div>
                  <div className="mt-3 w-full text-center text-sm text-(--text-muted)">
                     در سبد شما
                  </div>

                  <NavLink
                    className="mt-4 block w-full text-center text-sm text-(--primary) hover:font-bold hover:underline"
                    to={"/cart"}
                  >
                    مشاهده سبد خرید
                  </NavLink>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default ProductPage;