import { useState, useEffect, useRef } from "react";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export function useApiStatus() {
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  const onlineRef = useRef<boolean | null>(null);

  function checarApi() {
    fetch(`${BASE_URL}/docs`, { signal: AbortSignal.timeout(4000) })
      .then(() => { onlineRef.current = true; setApiOnline(true); })
      .catch(() => { onlineRef.current = false; setApiOnline(false); });
  }

  useEffect(() => {
    checarApi();

    // Quando apiClient detecta falha de rede, marca offline imediatamente
    function handleOffline() { onlineRef.current = false; setApiOnline(false); }
    window.addEventListener("api:network-error", handleOffline);

    // Recheck a cada 30s enquanto offline para detectar retorno da API
    const interval = setInterval(() => {
      if (onlineRef.current === false) checarApi();
    }, 30_000);

    return () => {
      window.removeEventListener("api:network-error", handleOffline);
      clearInterval(interval);
    };
  }, []);

  return { apiOnline };
}
