import { useQuery } from "@tanstack/react-query";
import { fetchLps } from "../apis/lp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LpListResponse } from "../types/lp";
import { useThrottle } from "../hooks/useThrottle";

function HomePage() {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery<LpListResponse>({
    queryKey: ["lps", order],
    queryFn: () => fetchLps(0, order),
  });

  const throttledScroll = useThrottle(() => {
    console.log("스크롤 감지됨:", window.scrollY);
    setScrollY(window.scrollY); // 실사용 시 페이지네이션 트리거 등 활용
  }, 1000); // 1초에 한 번만 실행

  useEffect(() => {
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [throttledScroll]);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) {
    console.error(" 홈 API 요청 에러 내용:", isError, data);
    return <div>에러가 발생했습니다!</div>;
  }

  return (
    <div className="pt-16 px-4">
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setOrder("asc")}
          className={order === "asc" ? "font-bold" : ""}
        >
          오래된순
        </button>
        <button
          onClick={() => setOrder("desc")}
          className={order === "desc" ? "font-bold" : ""}
        >
          최신순
        </button>
      </div>

      <div
        className="
    grid gap-4
    grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]
    justify-items-center
  "
      >
        {data?.data.map((lp) => (
          <div
            key={lp.id}
            onClick={() => navigate(`/lps/${lp.id}`)}
            className="relative overflow-hidden rounded cursor-pointer transition-transform duration-300 hover:scale-105"
            style={{ width: "200px", height: "200px", willChange: "transform" }}
          >
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-lg font-bold truncate">{lp.title}</h3>
              <p className="text-sm opacity-80">
                {new Date(lp.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm mt-1">❤️ {lp.likes.length}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
