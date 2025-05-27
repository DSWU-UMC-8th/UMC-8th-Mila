import api from "./axios";
import type { LpListResponse, LpDetail, ResponseLpListDto } from "../types/lp";

// LP 목록
export const fetchLps = async (
  cursor: number = 0,
  order: "asc" | "desc" = "desc"
): Promise<LpListResponse> => {
  const res = await api.get("/v1/lps", {
    params: { cursor, limit: 10, order },
  });
  return res.data.data;
};

// LP 상세
export const fetchLpDetail = async (lpId: number): Promise<LpDetail> => {
  const res = await api.get(`/v1/lps/${lpId}`);
  return res.data.data;
};

// 검색어 기반 LP 목록 무한 스크롤
export const fetchSearchLps = async (
  keyword: string,
  pageParam: number
): Promise<ResponseLpListDto> => {
  const { data } = await api.get("/v1/lps/search", {
    params: {
      search: keyword,
      limit: 10,
      cursor: pageParam,
    },
  });
  return data;
};
