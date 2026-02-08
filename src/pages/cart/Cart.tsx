import { useEffect, useState } from "react";
import ProductInCart from "../../components/productInCart/ProductInCart";
import { useCart } from "../../shopping cart context/useCart";
import type { mpt } from "../../types/Types";
import { getProducts } from "../../services/api";
import Container from "../../components/Container"; // اضافه کردن Container

function Cart() {
  const { itemsInCart } = useCart();
  const [products, setProducts] = useState<mpt[]>([]);

  useEffect(() => {
    getProducts().then((result) => {
      setProducts(result);
    });
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fa-IR").format(price);
  };

  const TotalPrice = itemsInCart.reduce((total, Item) => {
    const product = products.find((p) => p.id === Item.id);
    return total + (product?.price || 0) * Item.qty;
  }, 0);

  const Discount = 0;
  const FinalPrice = TotalPrice - Discount;

  if (itemsInCart.length === 0) {
    return (
      <Container>
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
          <p className="text-xl font-bold text-(--text)">سبد خرید شما خالی است</p>
          <div className="text-6xl">🛒</div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-8 flex flex-col gap-4 pb-20">
        
        {/* لیست محصولات */}
        <div className="flex flex-col gap-4">
          {itemsInCart.map((cartItem) => {
            const productData = products.find((p) => p.id === cartItem.id);
            if (!productData) return null;

            return (
              <ProductInCart
                key={cartItem.id}
                {...productData}
                qty={cartItem.qty}
              />
            );
          })}
        </div>

        {/* فاکتور نهایی */}
        <div className="mx-auto mt-6 w-full max-w-lg rounded-xl bg-(--primary-soft) p-6 shadow-md ring-2 ring-(--surface)">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between text-lg">
              <span className="font-medium text-(--text)">مجموع قیمت‌ها</span>
              <span className="font-bold">{formatPrice(TotalPrice)} <span className="text-xs">تومان</span></span>
            </div>

            <div className="flex justify-between text-lg">
              <span className="font-medium text-(--text)">مبلغ تخفیف</span>
              <span className="font-bold">{formatPrice(Discount)} <span className="text-xs">تومان</span></span>
            </div>

            <div className="my-2 h-px w-full bg-gray-200"></div>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">جمع کل</span>
              <span className="text-xl font-bold text-green-600">
                {formatPrice(FinalPrice)} <span className="text-xs">تومان</span>
              </span>
            </div>
          </div>
        </div>

        {/* دکمه سفارش */}
        <div className="group mt-6 mb-10 flex justify-center">
          <button
            className="w-full max-w-xs animate-pulse rounded-full border border-green-700 bg-green-500 px-10 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-600 active:scale-95 sm:w-auto"
          >
            سفارش محصول
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Cart;