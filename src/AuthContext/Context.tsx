import { createContext } from "react";
import type { AuthContextType } from "./AuthFunctions";

export const AuthContext = createContext<AuthContextType | null>(null);
