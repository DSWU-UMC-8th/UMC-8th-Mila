import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // 여기를 너의 API 서버 주소로 바꿔줘
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 인증 등 필요한 경우에만 true
});

export default axiosInstance;
