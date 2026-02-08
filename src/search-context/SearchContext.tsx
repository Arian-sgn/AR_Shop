import { createContext } from "react";
import type { SearchContextType } from "./SearchProvider";

export const SearchContext = createContext<SearchContextType | null>(null);
