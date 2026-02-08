import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getProduct } from "../../services/api";
import { useCart } from "../../shopping cart context/useCart";
import type { mpt } from "../../types/Types";

// 1. تعریف ساده و صریح پراپ‌ها (بدون ارث‌بری پیچیده)
interface ProductInCartProps {
  id: number;
  qty: number;
  // این فیلدها را اختیاری می‌گذاریم تا اگر پاس داده نشدند، از API بگیریم
  image?: string;
  title?: string;
  price?: number;
}

function ProductInCart({ id, qty, image, title, price }: ProductInCartProps) {
  const { IncreaseItemQTY, DecreaseItemQTY, Trash } = useCart();

  // استیت برای نگه داشتن دیتای محصول (چه از پراپ بیاید چه از فچ)
  const [productData, setProductData] = useState<Partial<mpt>>({
    image,
    title,
    price,
  });

  useEffect(() => {
    // اگر اطلاعات اصلی (مثل عکس) پاس داده نشده بود، برو از سرور بگیر
    if (!image || !title || !price) {
      getProduct(id).then((result) => {
        setProductData(result);
      });
    } else {
      // اگر پراپ‌ها تغییر کردند (مثلا در ری‌رندر والد)، استیت را آپدیت کن
      setProductData({ image, title, price });
    }
  }, [id, image, title, price]);

  return (
    <div className="w-full px-4 sm:px-0">
      <div className="mx-auto mt-4 mb-4 flex w-full max-w-4xl flex-col items-center gap-6 rounded-2xl bg-(--pms-b) p-6 shadow-(--shadow-md) sm:mt-10 sm:flex-row-reverse sm:justify-between sm:px-10 sm:py-7">
        
        {/* --- بخش تصویر و عنوان --- */}
        <NavLink to={`/Product/${id}`} className="group w-full sm:w-auto">
          <div className="flex flex-col items-center text-center">
            {/* کانتینر عکس با اندازه کنترل شده */}
            <div className="relative w-full max-w-[200px] sm:w-52">
              <img
                className="w-full rounded-2xl object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                src={productData.image}
                alt={productData.title || "Product"}
                loading="lazy"
              />
            </div>
            {/* عنوان محصول */}
            <p className="mt-4 line-clamp-2 text-lg font-medium text-(--text) sm:max-w-[200px]">
              {productData.title}
            </p>
          </div>
        </NavLink>

        {/* --- بخش دکمه‌ها و قیمت --- */}
        <div className="flex w-full flex-col items-center gap-6 sm:w-auto sm:items-end sm:gap-4">
          
          {/* کنترلرهای تعداد */}
          <div className="flex items-center gap-3 sm:flex-row-reverse">
            {/* دکمه افزودن */}
            <button
              onClick={() => IncreaseItemQTY(id)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all hover:bg-green-50 hover:border-green-200 active:scale-95"
            >
              <svg fill="#00c0ff" width="22px" height="22px" viewBox="0 0 24 24">
                <path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z" />
              </svg>
            </button>

            {/* نمایش تعداد */}
            <span className="min-w-[30px] text-center text-xl font-bold text-(--text)">
              {qty}
            </span>

            {/* دکمه کاهش */}
            <button
              onClick={() => DecreaseItemQTY(id)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all hover:bg-red-50 hover:border-red-200 active:scale-95"
            >
              <svg fill="#00c0ff" width="22px" height="22px" viewBox="-5 -11 24 24">
                <path d="M1 0h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z" />
              </svg>
            </button>

            {/* دکمه حذف */}
            <button 
              onClick={() => Trash(id)} 
              className="mr-2 rounded-lg p-2 transition-colors hover:bg-red-50 active:scale-95"
              title="حذف از سبد"
            >
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="#ef4444">
                <path d="M20 6h-3.155a.949.949 0 0 0-.064-.125l-1.7-2.124A1.989 1.989 0 0 0 13.519 3h-3.038a1.987 1.987 0 0 0-1.562.75l-1.7 2.125A.949.949 0 0 0 7.155 6H4a1 1 0 0 0 0 2h1v11a2 2 0 0 0 1.994 2h10.011A2 2 0 0 0 19 19V8h1a1 1 0 0 0 0-2zm-9.519-1h3.038l.8 1H9.681zm6.524 14H7V8h10z" />
                <path d="M14 18a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1zM10 18a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1z" />
              </svg>
            </button>
          </div>

          {/* خط جداکننده */}
          <div className="h-px w-full bg-gray-200 sm:w-full"></div>

          {/* قیمت */}
          <div className="flex w-full items-center justify-center sm:justify-end">
            <span className="text-xl font-bold text-green-600 sm:text-2xl">
              {productData.price?.toLocaleString("fa-IR")} <span className="text-sm font-normal text-gray-500">تومان</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInCart;