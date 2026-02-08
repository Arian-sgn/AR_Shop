import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../search-context/UseSearch";

function SearchBar() {
  const { search, setSearch, filteredProducts, open, setOpen } = useSearch();
  const [inputValue, setInputValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]); // added dep

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(inputValue.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, setSearch]);

  return (
    <div ref={ref} className="relative w-full" dir="rtl">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setOpen(true);
        }}
        placeholder="...جستجوی محصولات"
        className=" w-full rounded-full px-5 py-2.5 text-base text-(--text) ring-2 ring-(--primary) transition-all focus:outline-none focus:ring-4 focus:ring-(--primary)/50"
        dir="rtl"
      />

      {open && search && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-80 w-full overflow-y-auto rounded-xl border border-(--text-muted) bg-(--bg) shadow-2xl ring-1 ring-black/5">
          {filteredProducts.length > 0 ? (
            <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-700">
              {filteredProducts.slice(0, 5).map((p) => (
                <Link
                  key={p.id}
                  to={`/Product/${p.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-gray-100 dark:hover:bg-white/5"
                >
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md bg-white p-1">
                    <img src={p.image} className="h-full w-full object-contain" alt={p.title} />
                  </div>
                  <div className="flex flex-col text-right">
                    <p className="line-clamp-1 text-sm font-medium text-(--text)">{p.title}</p>
                    <span className="text-xs font-bold text-gray-400">{p.category}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-">
              محصولی با این نام یافت نشد
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;