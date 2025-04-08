import clsx from "clsx";
import { useTheme, THEME } from "./context/ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";

const NavBar = () => {
  const { theme } = useTheme();
  const isLight = theme === THEME.LIGHT;

  return (
    <nav
      className={clsx(
        "w-full p-4 flex justify-end",
        isLight ? "bg-white" : "bg-gray-800"
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
};

export default NavBar;
