import { useMemo, useState } from "react";
import type { mpt } from "../types/Types";
import { SearchContext } from "./SearchContext";

export type SearchContextType = {
  search: string;
  setSearch: (v: string) => void;
  filteredProducts: mpt[];
  setProducts: (p: mpt[]) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<mpt[]>([]);
  const [open, setOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;

    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [search, products]);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        filteredProducts,
        setProducts,
        open,
        setOpen,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
