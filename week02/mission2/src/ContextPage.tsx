import { ThemeProvider } from "./context/ThemeProvider";
import NavBar from "./Navbar";
import ThemeContent from "./ThemeContent";

const ContextPage = () => {
  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center">
        <NavBar />
        <main className="flex-1 w-full">
          <ThemeContent />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default ContextPage;
