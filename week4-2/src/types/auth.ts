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

export interface RequestSignupDto {
  email: string;
  password: string;
  name: string;
}

export interface RequestSigninDto {
  email: string;
  password: string;
}

export interface ResponseSigninDto {
  data: {
    accessToken: string;
  };
}

export interface ResponseSignupDto {
  data: {
    userId: string;
    message?: string;
  };
}

export interface ResponseMyInfoDto {
  data: {
    name: string;
    email: string;
    bio1: string;
    bio2: string;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}
