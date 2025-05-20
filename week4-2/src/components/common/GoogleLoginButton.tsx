import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    alert("구글 로그인 기능은 아직 구현되지 않았습니다.");
    // 실제 Google OAuth 연동은 이후 구현
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 border border-gray-400 bg-black text-white py-3 rounded hover:bg-gray-800 transition"
    >
      <FcGoogle size={20} />
      구글 로그인
    </button>
  );
};

export default GoogleLoginButton;
