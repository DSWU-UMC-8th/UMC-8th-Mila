import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { path: "/", label: "홈" },
    { path: "/movies/category/popular", label: "인기 영화" },
    { path: "/movies/category/now_playing", label: "상영 중" },
    { path: "/movies/category/top_rated", label: "평점 높은" },
    { path: "/movies/category/upcoming", label: "개봉 예정" },
  ];

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex gap-4 justifyleft">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `px-3 py-1 rounded ${
              isActive
                ? "bg-blue-500 text-white font-bold"
                : "text-gray-600 hover:text-blue-500"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
