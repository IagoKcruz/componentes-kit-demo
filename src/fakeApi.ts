/** Simula uma chamada de API real (latência de rede) sem precisar de um backend. */
export function fakeApiCall<T>(result: T, delayMs = 700): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result), delayMs);
  });
}
