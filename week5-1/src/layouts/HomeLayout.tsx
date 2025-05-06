import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

const HomeLayout = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
