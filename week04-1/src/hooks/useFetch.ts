// src/hooks/useFetch.ts
import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

interface FetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export function useFetch<T>(endpoint: string) {
  const [result, setResult] = useState<FetchResult<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      setResult({ data: null, isLoading: true, error: null });

      try {
        const response = await axios.get<T>(`${BASE_URL}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
          },
        });

        setResult({ data: response.data, isLoading: false, error: null });
      } catch (err) {
        setResult({
          data: null,
          isLoading: false,
          error: "데이터를 불러오는 데 실패했습니다.",
        });
      }
    };

    fetchData();
  }, [endpoint]);

  return result;
}
