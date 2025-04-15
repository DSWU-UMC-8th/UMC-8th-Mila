import { useState } from "react";
import UseForm from "../hooks/UseForm";
import { validateSignup } from "../utils/validate";

import { postSignup } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { UserSignupInformation, RequestSignupDto } from "../types/auth";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import GoogleLoginButton from "../components/common/GoogleLoginButton";

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const {
    values,
    errors = {},
    touched = {},
    getInputProps,
  } = UseForm<UserSignupInformation>({
    initialValue: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    },
    validate: validateSignup,
  });

  const nextStep = () => setStep((s) => s + 1);

  const handleSubmit = async () => {
    const payload: RequestSignupDto = {
      email: values.email,
      password: values.password,
      name: values.nickname,
    };

    try {
      await postSignup(payload);
      alert("회원가입 성공!");
      navigate("/login");
    } catch (error) {
      alert("회원가입 실패. 다시 시도해주세요.");
      console.error(error);
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
          <h2 className="text-2xl font-bold text-white">회원가입</h2>
        </div>

        {step === 1 && (
          <>
            <GoogleLoginButton />
            <div className="space-y-4">
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
              <button
                onClick={nextStep}
                disabled={!!errors.email || !values.email}
                className="w-full bg-pink-500 text-white py-3 rounded font-semibold hover:bg-pink-600 transition disabled:bg-gray-400"
              >
                다음
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-gray-300 text-sm">
              입력한 이메일: {values.email}
            </p>

            <div className="relative">
              <input
                {...getInputProps("password")}
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요!"
                className={`w-full p-3 rounded border bg-gray-700 text-white placeholder-gray-400 ${
                  errors?.password && touched?.password
                    ? "border-red-400"
                    : "border-gray-600"
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors?.password && touched?.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}

            <div className="relative">
              <input
                {...getInputProps("confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호를 다시 입력해주세요!"
                className={`w-full p-3 rounded border bg-gray-700 text-white placeholder-gray-400 ${
                  errors?.confirmPassword && touched?.confirmPassword
                    ? "border-red-400"
                    : "border-gray-600"
                }`}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors?.confirmPassword && touched?.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}

            <button
              onClick={nextStep}
              disabled={
                !!errors.password ||
                !!errors.confirmPassword ||
                !values.password ||
                !values.confirmPassword
              }
              className="w-full bg-pink-500 text-white py-3 rounded font-semibold hover:bg-pink-600 transition disabled:bg-gray-400"
            >
              다음
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <input
              {...getInputProps("nickname")}
              placeholder="닉네임을 입력해주세요!"
              className={`w-full p-3 rounded border bg-gray-700 text-white placeholder-gray-400 ${
                errors?.nickname && touched?.nickname
                  ? "border-red-400"
                  : "border-gray-600"
              }`}
            />
            {errors?.nickname && touched?.nickname && (
              <p className="text-red-400 text-sm mt-1">{errors.nickname}</p>
            )}
            <button
              onClick={handleSubmit}
              disabled={!!errors.nickname || !values.nickname}
              className="w-full bg-pink-500 text-white py-3 rounded font-semibold hover:bg-pink-600 transition disabled:bg-gray-400"
            >
              완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
