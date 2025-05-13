import api from "./axios";
import type { LpListResponse, LpDetail } from "../types/lp";

// LP 목록 (누구나 조회)
export const fetchLps = async (
  cursor: number = 0,
  order: "asc" | "desc" = "desc"
): Promise<LpListResponse> => {
  const res = await api.get("/v1/lps", {
    params: {
      cursor,
      limit: 10,
      order,
    },
  });
  return res.data.data;
};

// LP 상세 (로그인한 사용자만)
export const fetchLpDetail = async (lpId: number): Promise<LpDetail> => {
  const res = await api.get(`/v1/lps/${lpId}`);
  return res.data.data;
};
