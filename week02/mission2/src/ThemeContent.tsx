import clsx from "clsx";
import { useTheme, THEME } from "./context/ThemeProvider";

const ThemeContent = () => {
  const { theme } = useTheme();
  const isLight = theme === THEME.LIGHT;

  return (
    <div
      className={clsx(
        "w-full h-dvh px-6",
        isLight ? "bg-white" : "bg-gray-800"
      )}
    >
      <h1
        className={clsx(
          "text-2xl font-bold",
          isLight ? "text-black" : "text-white"
        )}
      >
        현재 테마: {isLight ? "Light" : "Dark"}
      </h1>
      <p className={clsx("mt-4", isLight ? "text-black" : "text-white")}>
        현재 선택된 테마에 따라 배경과 텍스트 색상이 자동으로 바뀝니다.
      </p>
    </div>
  );
};

export default ThemeContent;
