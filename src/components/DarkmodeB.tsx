import useTheme from "../theme/UseTheme";

function ThemeToggleButton() {
  const { theme, ToggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={ToggleTheme}
      aria-label="Toggle theme"
      className={`
        sticky bottom-8 left-8 w-16 h-16 rounded-full
        flex items-center justify-center
        transition-all duration-400
        bg-(--a) shadow-lg
        hover:scale-105 active:scale-95
      `}
    >
      {/* ☀️ Sun Icon – Light Mode */}
      <svg
        className={`
          absolute transition-all duration-300 ease-in-out 
          ${isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100 text-gray-200"}
          
        `}
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>

      {/* 🌙 Moon Icon – Dark Mode */}
      <svg
        className={`
          absolute transition-all duration-300 ease-in-out
          ${isDark ? "opacity-100 rotate-0 scale-100  text-gray-800" : "opacity-0 -rotate-90 scale-50"}
         
        `}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}

export default ThemeToggleButton;
