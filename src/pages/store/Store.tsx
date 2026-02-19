import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Products from "../../components/products/Products";
import { getProducts } from "../../services/api";
import type { mpt } from "../../types/Types";
import { useSearch } from "../../search-context/UseSearch";

function Store() {
  const [loading, setLoading] = useState<boolean>(true);
  const { search, filteredProducts, setProducts, products } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    getProducts()
      .then((result: mpt[]) => {
        setProducts(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // گرفتن دسته‌بندی‌های یکتا
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  // فیلتر نهایی برای نمایش (search + category)
  const displayedProducts = useMemo(() => {
    if (!selectedCategory) return filteredProducts;

    return filteredProducts.filter((p) => p.category === selectedCategory);
  }, [filteredProducts, selectedCategory]);

  return (
    <Container>
      <div className="flex flex-col gap-6 py-8" dir="rtl">
        <h1
          className="inline-block bg-linear-to-r from-blue-500 via-[#00c0ff] to-blue-600
         bg-clip-text pb-1 animate-pulse text-right text-sm font-black text-transparent 
         sm:text-4xl md:text-5xl lg:text-6xl"
        >
          لیست محصولات
        </h1>

        {search && (
          <p className="text-right text-sm text-gray-500">
            نتایج جستجو برای:
            <span className="font-bold"> {search}</span>
          </p>
        )}

        {/* دسته‌بندی‌ها */}
        <div className="flex flex-col items-end gap-4 ring-1 ring-(--ring) rounded-2xl p-6">
          <span className="font-extrabold text-lg text-(--primary)"> دسته بندی ها</span>
          <div className="flex gap-4 flex-row-reverse">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-12 py-1 rounded-full text-sm text-(--primary-soft)
               cursor-pointer transition-all font-bold hover:bg-(--primary) ${
                !selectedCategory ? "bg-(--primary)" : "bg-(--surface)"
               }`}
            >
              همه
            </button>

            {categories.map((c) => (
              <button
                key={c}
                onClick={() =>
                  setSelectedCategory(selectedCategory === c ? null : c)
                }
                className={` px-3 py-1 rounded-full text-sm
                 cursor-pointer transition-all font-black hover:bg-(--primary) ${
                   selectedCategory === c && "bg-(--primary)"
                 }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          در حال دریافت محصولات...
        </div>
      )}

      {!loading && displayedProducts.length === 0 && (
        <div className="text-center py-20">محصولی پیدا نشد</div>
      )}

      {!loading && displayedProducts.length > 0 && (
        <div className="grid grid-cols-2 gap-4 pb-20 sm:grid-cols-3 md:grid-cols-4">
          {displayedProducts.map((item) => (
            <Link key={item.id} to={`/Product/${item.id}`} className="block">
              <Products {...item} />
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}

export default Store;
