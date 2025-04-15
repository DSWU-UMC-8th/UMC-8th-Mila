import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 shadow-md">
      <div
        onClick={() => navigate("/")}
        className="text-xl font-bold cursor-pointer"
      >
        PinkDark
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="text-sm hover:underline"
        >
          로그인
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-pink-500 px-4 py-1 rounded hover:bg-pink-600"
        >
          회원가입
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
