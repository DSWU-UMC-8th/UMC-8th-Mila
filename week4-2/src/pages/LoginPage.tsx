import UseForm from "../hooks/UseForm";
import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { validateSignin, UserSigninInformation } from "../utils/validate";
import useLocalStorage from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import GoogleLoginButton from "../components/common/GoogleLoginButton";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setItem } = useLocalStorage();
  const {
    values,
    errors = {},
    touched = {},
    getInputProps,
  } = UseForm<UserSigninInformation>({
    initialValue: { email: "", password: "" },
    validate: validateSignin,
  });

  const isDisabled =
    Object.values(errors).some((e) => e) ||
    Object.values(values).some((v) => v === "");

  const handleLogin = async () => {
    try {
      const response = await postSignin(values);
      setItem(LOCAL_STORAGE_KEY.accessToken, response.data.accessToken);
      alert("로그인 성공!");
      navigate("/my");
    } catch {
      alert("로그인 실패");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 space-y-6">
        <div className="flex items-center space-x-2">
          <FiArrowLeft
            className="text-white cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-2xl font-bold text-white">로그인</h2>
        </div>

        <div className="space-y-4">
          <GoogleLoginButton />

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <hr className="flex-1 border-gray-700" />
            OR
            <hr className="flex-1 border-gray-700" />
          </div>

          <div>
            <input
              {...getInputProps("email")}
              type="email"
              placeholder="이메일을 입력해주세요!"
              className={`w-full p-3 rounded border bg-gray-700 text-white placeholder-gray-400 ${
                errors?.email && touched?.email
                  ? "border-red-400"
                  : "border-gray-600"
              }`}
            />
            {errors?.email && touched?.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              {...getInputProps("password")}
              type="password"
              placeholder="비밀번호를 입력해주세요!"
              className={`w-full p-3 rounded border bg-gray-700 text-white placeholder-gray-400 ${
                errors?.password && touched?.password
                  ? "border-red-400"
                  : "border-gray-600"
              }`}
            />
            {errors?.password && touched?.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            onClick={handleLogin}
            disabled={isDisabled}
            className="w-full bg-pink-500 text-white py-3 rounded font-semibold hover:bg-pink-600 transition disabled:bg-gray-400"
          >
            로그인
          </button>

          <p className="text-sm text-center text-gray-400">
            아직 계정이 없으신가요?
            <span
              className="text-pink-400 font-semibold cursor-pointer hover:underline ml-1"
              onClick={() => navigate("/signup")}
            >
              회원가입
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
