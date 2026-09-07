import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export function useApiStatus() {
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/docs`, { signal: AbortSignal.timeout(4000) })
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));
  }, []);

  return { apiOnline };
}
