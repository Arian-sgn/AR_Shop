import { Link } from "react-router-dom";
import Container from "../../components/Container";
import { useEffect, useState } from "react";
import type { mpt } from "../../types/Types";
import { getProducts } from "../../services/api";
import SimpleProductSlider from "../../components/SimpleProductSlider";
import useTheme from "../../theme/UseTheme";


function Home() {
  const [products, setProducts] = useState<mpt[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container>
      <section className="flex flex-col-reverse items-center gap-8 py-10 lg:flex-row lg:justify-between lg:gap-16 lg:py-20">
        
        <div className="flex flex-1 flex-col items-center gap-6 text-center lg:items-end lg:text-right">
          <h1 className="text-3xl font-black leading-tight text-(--text) sm:text-4xl md:text-5xl lg:text-6xl">
            خرید هوشمندانه
            <br />
            <span className="bg-linear-to-r from-blue-500 to-[#00c0ff] bg-clip-text text-transparent pb-2">
              سریع و مطمئن
            </span>
          </h1>

          <p className="max-w-lg text-base leading-loose text-(--text-muted) sm:text-lg">
            مجموعه‌ای از بهترین محصولات با قیمت مناسب، ضمانت اصالت کالا، ارسال سریع و پشتیبانی
            واقعی در تمام روزهای هفته.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row-reverse">
            <Link
              to="/store"
              className="flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1 hover:bg-blue-700 active:scale-95"
            >
              مشاهده محصولات
            </Link>

            <Link
              to="/cart"
              className="flex items-center justify-center rounded-full border-2 border-blue-600 px-8 py-3.5 text-base font-bold text-blue-600 transition-all hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 active:scale-95"
            >
              سبد خرید
            </Link>
          </div>
        </div>

        <div className="flex w-full flex-1 justify-center lg:justify-start">
          <div className="relative w-full max-w-md lg:max-w-full">
            
            <img
              src={theme === "light" ? "/aaa.svg" : "/online shopping.jpg"}
              alt="online shopping banner"
              className="relative w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10 transition-transform hover:scale-[1.02] md:aspect-4/3 lg:aspect-auto lg:h-[500px]"
              loading="eager"

            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {[
            { icon: "🚀", title: "ارسال سریع", text: "تحویل فوری در سراسر کشور" },
            { icon: "🛡️", title: "پرداخت امن", text: "درگاه پرداخت معتبر بانکی" },
            { icon: "💎", title: "تضمین کیفیت", text: "ضمانت اصالت و سلامت کالا" },
            { icon: "🎧", title: "پشتیبانی ۲۴/۷", text: "پاسخگویی در تمام ساعات" },
          ].map((item, i) => (
            <div
              key={i}
              className="group flex flex-col items-center rounded-2xl border border-(--border) bg-(--pms-b) p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md "
            >
              <div className="mb-4 text-4xl transition-transform group-hover:scale-110 group-hover:rotate-6">
                {item.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-(--text)">{item.title}</h3>
              <p className="text-xs text-(--text-muted) sm:text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="my-12 flex flex-col items-center justify-center gap-6">
        <div className="flex w-full items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700" dir="rtl">
           <h2 className="text-xl font-bold text-(--text) sm:text-2xl">جدیدترین محصولات</h2>
           <Link to="/store" className="text-sm font-medium text-blue-500 hover:text-blue-600">مشاهده همه &larr;</Link>
        </div>

        {loading ? (
          <div className="flex h-60 w-full flex-col items-center justify-center gap-4 rounded-3xl bg-(--surface)/50">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            <span className="animate-pulse text-sm text-(--text-muted)">...در حال دریافت محصولات</span>
          </div>
        ) : products.length > 0 ? (
          <div className="w-full">
             <SimpleProductSlider products={products.slice(0, 10)} />
          </div>
        ) : (
          <div className="flex h-40 w-full items-center justify-center rounded-2xl border border-dashed border-gray-300">
            <span className="text-lg text-gray-400">محصولی برای نمایش وجود ندارد</span>
          </div>
        )}
      </section>

      <section className="relative mb-20 overflow-hidden rounded-3xl bg-linear-to-r from-blue-600 to-[#00c0ff] px-6 py-12 text-center text-white shadow-xl sm:px-12 md:py-16">        

        <div className="relative z-10 flex flex-col items-center gap-4">
          <h2 className="text-2xl font-black sm:text-3xl md:text-4xl">
            آماده تجربه خریدی متفاوت هستید؟
          </h2>
          <p className="max-w-xl text-sm font-medium opacity-90 sm:text-base">
            همین حالا به جمع هزاران مشتری راضی ما بپیوندید و از تخفیف‌های ویژه بهره‌مند شوید.
          </p>
          <Link
            to="/store"
            className="mt-4 inline-block rounded-full bg-white px-10 py-3.5 text-base font-bold text-blue-600 shadow-lg transition-transform hover:scale-105 hover:bg-gray-50 active:scale-95"
          >
            ورود به فروشگاه
          </Link>
        </div>
      </section>
    </Container>
  );
}

export default Home;