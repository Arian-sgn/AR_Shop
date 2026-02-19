import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Container from "../Container";
import { useCart } from "../../shopping cart context/useCart";
import { useAuth } from "../../AuthContext/useAuth";
import SearchBar from "../SearchBar";

const DesktopNavItem = ({ to, label }: { to: string; label: string }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative px-1 pb-1 text-lg font-medium transition-colors duration-300 hover:text-[#00c0ff] ${
          isActive ? "text-[#00c0ff]" : "text-(--surface)"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          <span
            className={`absolute bottom-0 right-0 h-[3px] rounded-t-full bg-[#00c0ff] transition-all duration-300 ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          ></span>
        </>
      )}
    </NavLink>
  </li>
);

const MobileNavItem = ({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) => (
  <li>
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `block w-full rounded-xl px-4 py-3 text-right text-base font-medium transition-all ${
          isActive
            ? "bg-blue-50 text-[#00c0ff] dark:bg-white/5"
            : "text-(--text) hover:bg-gray-50 dark:hover:bg-white/5"
        }`
      }
    >
      {label}
    </NavLink>
  </li>
);

const CartIcon = ({ qty }: { qty: number }) => (
  <div className="relative flex items-center justify-center p-2">
    <svg
      className="h-7 w-7 transition-colors hover:text-[#00c0ff] text-(--text)"
      viewBox="0 0 122.88 111.85"
      fill="currentColor"
    >
      <path d="M4.06,8.22A4.15,4.15,0,0,1,0,4.06,4.13,4.13,0,0,1,4.06,0h6A19.12,19.12,0,0,1,20,2.6c5.44,3.45,6.41,8.38,7.8,13.94h91a4.07,4.07,0,0,1,4.06,4.06,5,5,0,0,1-.21,1.25L112.06,64.61a4,4,0,0,1-4,3.13H41.51c1.46,5.41,2.92,8.32,4.89,9.67C48.8,79,53,79.08,59.93,79h47.13a4.06,4.06,0,0,1,0,8.12H60c-8.63.1-13.94-.11-18.2-2.91s-6.66-7.91-8.95-17h0L18.94,14.46c0-.1,0-.1-.11-.21a7.26,7.26,0,0,0-3.12-4.68A10.65,10.65,0,0,0,10,8.22H4.06Zm80.32,25a2.89,2.89,0,0,1,5.66,0V48.93a2.89,2.89,0,0,1-5.66,0V33.24Zm-16.95,0a2.89,2.89,0,0,1,5.67,0V48.93a2.89,2.89,0,0,1-5.67,0V33.24Zm-16.94,0a2.89,2.89,0,0,1,5.66,0V48.93a2.89,2.89,0,0,1-5.66,0V33.24Zm41.72-8.58H30.07l9.26,34.86H105l8.64-34.86Zm2.68,67.21a10,10,0,1,1-10,10,10,10,0,0,1,10-10Zm-43.8,0a10,10,0,1,1-10,10,10,10,0,0,1,10-10Z" />
    </svg>
    {qty > 0 && (
      <span className="absolute right-0 top-0 flex h-5 w-5 -translate-x-1 -translate-y-0.5 items-center justify-center rounded-full bg-[#00c0ff] text-[10px] font-bold text-white ring-2 ring-(--a)">
        {qty}
      </span>
    )}
  </div>
);

// --- Main Navbar Component ---

function Navbar() {
  const { cartQTY } = useCart();
  const { user, loginWithGoogle, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);


  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-(--pms-b)/80 shadow-(--shadow-sm) ring-1 ring-(--ring) rounded-b-4xl hover:ring-4 hover:shadow-(--shadow-md) backdrop-blur-sm transition-all">
        <Container>
          <div className="flex flex-col py-3 md:h-24 md:flex-row md:items-center md:justify-between md:py-0">
            {/* Top Row: Logo, Hamburger, Cart (Mobile), Profile (Mobile) */}
            <div className="flex w-full items-center justify-between">
              {/* Hamburger Button (Mobile Only) */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-lg p-2 text-(--text) hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:hover:bg-white/5 md:hidden"
                aria-label="Toggle Menu"
              >
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>

              {/* Desktop Nav Links */}
              <ul className="hidden items-center gap-8 md:flex">
                <DesktopNavItem to="/" label="صفحه اصلی" />
                <DesktopNavItem to="/store" label="فروشگاه" />
              </ul>

              <div className="text-xl font-bold text-[#00c0ff] md:hidden">
                Logo
              </div>

              {/* Desktop Search */}
              <div className="hidden w-full max-w-sm px-6 md:block">
                <SearchBar />
              </div>

              {/* Actions Right Side */}
              <div className="flex items-center gap-2 md:gap-4">
                {/* Cart */}
                {user && (
                  <NavLink to="/cart" className="rounded-lg">
                    <CartIcon qty={cartQTY} />
                  </NavLink>
                )}

                {/* Desktop Profile / Login */}
                <div className="hidden md:block">
                  {user ? (
                    <div className="flex items-center gap-3 py-1.5 px-6 rounded-full ring-1 ring-(--surface) transition-colors">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="h-10 w-10 rounded-full border-2 border-(--a) shadow-sm"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                          {user.displayName?.charAt(0)}
                        </div>
                      )}
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-extrabold text-(--text) leading-tight">
                          {user.displayName}
                        </span>
                        <button
                          onClick={logout}
                          className="text-[11px] text-red-500 hover:text-red-700 transition-colors cursor-pointer font-medium"
                        >
                          خروج از حساب
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={loginWithGoogle}
                      className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-google"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                      </svg>
                      <span>ورود با گوگل</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Search Bar (Only visible on mobile, underneath top row) */}
            <div className="mt-3 w-full md:hidden">
              <SearchBar />
            </div>
          </div>
        </Container>
      </nav>

      {/* Mobile Menu Overlay & Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-60 flex md:hidden">
          {/* Backdrop (Darkens background) */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Menu Content */}
          <div
            className="relative w-[75%] max-w-sm flex-col bg-(--bg) shadow-2xl transition-transform"
            dir="rtl"
          >
            {/* Menu Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-4 dark:border-gray-800">
              <span className="text-lg font-bold text-[#00c0ff]">
                منوی کاربری
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <svg
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Links */}
            <ul className="flex flex-col gap-2 p-4">
              <MobileNavItem
                to="/"
                label="صفحه اصلی"
                onClick={() => setIsOpen(false)}
              />
              <MobileNavItem
                to="/store"
                label="فروشگاه"
                onClick={() => setIsOpen(false)}
              />
            </ul>

            {/* Mobile Auth Section (Bottom) */}
            <div className="mt-auto border-t border-(--surface) p-4">
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="h-10 w-10 rounded-full"
                      />
                    )}
                    <span className="font-bold text-(--text)">
                      {user.displayName}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full rounded-xl border border-red-200 bg-red-50 py-3 text-red-600 transition-colors hover:bg-red-100 dark:border-red-900/30 dark:bg-red-900/20"
                  >
                    خروج از حساب
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    loginWithGoogle();
                    setIsOpen(false);
                  }}
                  className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white shadow-lg active:scale-95"
                >
                  ورود / عضویت
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
