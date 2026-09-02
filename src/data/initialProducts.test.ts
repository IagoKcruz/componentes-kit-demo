import { describe, it, expect } from "vitest";
import { initialProducts } from "./initialProducts";

describe("initialProducts", () => {
  it("has at least one product", () => {
    expect(initialProducts.length).toBeGreaterThan(0);
  });

  it("every product has a unique numeric id", () => {
    const ids = initialProducts.map((p) => p.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
    for (const id of ids) {
      expect(typeof id).toBe("number");
    }
  });

  it("every product has required string fields", () => {
    for (const p of initialProducts) {
      expect(typeof p.codigo).toBe("string");
      expect(typeof p.nome).toBe("string");
      expect(typeof p.categoria).toBe("string");
      expect(typeof p.status).toBe("string");
    }
  });

  it("every product has non-negative quantidade and preco", () => {
    for (const p of initialProducts) {
      expect(p.quantidade).toBeGreaterThanOrEqual(0);
      expect(p.preco).toBeGreaterThanOrEqual(0);
    }
  });
});
