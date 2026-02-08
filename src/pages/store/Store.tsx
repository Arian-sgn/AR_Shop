import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Products from "../../components/products/Products";
import { getProducts } from "../../services/api";
import type { mpt } from "../../types/Types";
import { useSearch } from "../../search-context/UseSearch";

function Store() {
  const [loading, setLoading] = useState<boolean>(true);
  const { search, filteredProducts, setProducts } = useSearch();

  useEffect(() => {
    getProducts()
      .then((result: mpt[]) => {
        setProducts(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <div className="flex flex-col gap-6 py-8" dir="rtl">
        <h1
          className="bg-linear-to-r from-blue-500 via-[#00c0ff] to-blue-600 bg-clip-text pb-1 animate-pulse text-right text-sm font-black text-transparent sm:text-4xl md:text-5xl lg:text-6xl"
        >
          لیست محصولات
        </h1>

        {search && (
          <p className="text-right text-sm text-gray-500">
            نتایج جستجو برای: <span className="font-bold text-(--text)">{search}</span>
          </p>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600"></div>
          <p className="animate-pulse text-lg font-medium text-(--a)">
            ...در حال دریافت محصولات
          </p>
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="flex min-h-[40vh] flex-col items-center justify-center px-4 text-center">
          <div className="text-6xl mb-4">😕</div>
          <p className="text-xl font-bold text-(--surface)">
            محصولی پیدا نشد
          </p>
          <p className="mt-2 text-sm text-(--surface)">
            لطفاً املای کلمات را چک کنید یا کلمه دیگری را امتحان کنید
          </p>
        </div>
      )}

      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-2 gap-4 pb-20 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:gap-8">
          {filteredProducts.map((item) => (
            <Link
              key={item.id}
              to={`/Product/${item.id}`}
              className="block h-full focus:outline-none focus:ring-4 focus:ring-blue-500/20 rounded-2xl"
            >
              <Products {...item} />
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}

export default Store;