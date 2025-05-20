// 타입
export interface UserSigninInformation {
  email: string;
  password: string;
}

export interface UserSignupInformation {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

// 로그인 유효성 검사
export const validateSignin = (values: UserSigninInformation) => {
  const errors: Partial<UserSigninInformation> = {};

  if (!values.email.includes("@")) {
    errors.email = "올바른 이메일 형식을 입력해주세요.";
  }

  if (values.password.length < 8) {
    errors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
  }

  return errors;
};

// 회원가입 유효성 검사
export const validateSignup = (values: UserSignupInformation) => {
  const errors: Partial<UserSignupInformation> = {};

  if (!values.email.includes("@")) {
    errors.email = "올바른 이메일 형식을 입력해주세요.";
  }

  if (values.password.length < 8) {
    errors.password = "비밀번호는 최소 8자 이상이어야 합니다.";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "비밀번호가 일치하지 않습니다.";
  }

  if (!values.nickname.trim()) {
    errors.nickname = "닉네임을 입력해주세요.";
  }

  return errors;
};
