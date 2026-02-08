import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function useTheme() {
  const xq = useContext(ThemeContext);
  if (!xq) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return xq;
}

export default useTheme;
