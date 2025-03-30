import { useTheme, THEME } from "./context/ThemeProvider";
import clsx from "clsx";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "mt-2 px-4 py-2 rounded transition-colors",
        isLight ? "bg-white text-black" : "bg-black text-white"
      )}
    >
      {isLight ? "🌙 다크 모드" : "☀️ 라이트 모드"}
    </button>
  );
};

export default ThemeToggleButton;
