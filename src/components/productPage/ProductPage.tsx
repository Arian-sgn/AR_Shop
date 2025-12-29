import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../Container";
import Button from "../button/Button";
import type { mpt } from "../../types/Types";
import { getProduct } from "../../services/api";
import { useCart } from "../../shopping cart context/useCart";
import { NavLink } from "react-router-dom";

function ProductPage() {
  const {
    IncreaseItemQTY,
    DecreaseItemQTY,
    GetProductQTY,
    Trash,
  } = useCart();

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
            <aside className="col-span-12 sm:col-span-5 lg:col-span-4 text-center rounded-xl border border-gray-200 bg-white p-4 shadow-md flex flex-col justify-between">
              <div>
                <span className="block text-lg font-bold text-emerald-700">
                  {prd.price.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              {GetProductQTY(parseInt(params.id as string)) === 0 ? (
                <button
                  onClick={() => IncreaseItemQTY(parseInt(params.id as string))}
                  className="m-3 p-3 text-2xl border bg-green-400 rounded-lg shadow-md text-white bold mt-16 hover:bg-green-300 transition"
                >
                  افزودن به سبد خرید
                </button>
              ) : (
                <div>
                  {GetProductQTY(parseInt(params.id as string)) === 1 ? (
                    <div className="rounded border border-gray-200 bg-gray-100 shadow-lg flex justify-around items-center mt-7 mb-4 text-2xl">
                      <p className="text-sm">در سبد شما:</p>

                      <Button
                        onClick={() => Trash(parseInt(params.id as string))}
                        className=" text-white flex justify-center items-center transition"
                      >
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
                      </Button>
                      {GetProductQTY(parseInt(params.id as string))}
                      <Button
                        onClick={() =>
                          IncreaseItemQTY(parseInt(params.id as string))
                        }
                        className="flex justify-center items-center mt-3 mb-3"
                      >
                        <svg
                          fill="#00c0ff"
                          width="27px"
                          height="27px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z" />
                        </svg>
                      </Button>
                    </div>
                  ) : (
                    <div className="rounded border border-gray-200 bg-gray-100 shadow-lg flex justify-around items-center mt-7 mb-4 text-2xl">
                      <p className="text-sm">در سبد شما:</p>
                      <Button
                        onClick={() =>
                          DecreaseItemQTY(parseInt(params.id as string))
                        }
                        className="text-lg font-extrabold text-[#00c0ff] flex justify-center items-center hover:text-[#00a0ff] transition mt-2 mb-2"
                      >
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
                      </Button>
                      {GetProductQTY(parseInt(params.id as string))}
                      <Button
                        onClick={() =>
                          IncreaseItemQTY(parseInt(params.id as string))
                        }
                        className=" flex justify-center items-center mt-3 mb-3"
                      >
                        <svg
                          fill="#00c0ff"
                          width="27px"
                          height="27px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z" />
                        </svg>
                      </Button>
                    </div>
                  )}

                  <NavLink className={"text-green-500 text-sm"} to={"/cart"}>
                    مشاهده سبد خرید
                  </NavLink>
                </div>
              )}
            </aside>

            <article className="col-span-12 sm:col-span-7 lg:col-span-8 rounded-xl border border-gray-200 bg-white p-4 shadow-md text-sm leading-relaxed text-gray-700">
              {prd.description}
            </article>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default ProductPage;
