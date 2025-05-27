// hooks/useThrottle.ts
import { useRef, useCallback } from "react";

export function useThrottle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
) {
  const lastExecuted = useRef(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastExecuted.current >= delay) {
        lastExecuted.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );
}
