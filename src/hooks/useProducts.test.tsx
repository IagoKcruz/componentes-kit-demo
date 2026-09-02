import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProducts } from "./useProducts";

vi.mock("@iagokcruz/componentes-kit", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@iagokcruz/componentes-kit")>();
  return { ...actual, mostrarNotificacao: vi.fn() };
});

describe("useProducts", () => {
  it("starts with the initial products list", () => {
    const { result } = renderHook(() => useProducts());
    expect(result.current.products.length).toBeGreaterThan(0);
  });

  it("createDraft returns a product with a new unique id", () => {
    const { result } = renderHook(() => useProducts());
    const existingIds = result.current.products.map((p) => p.id);
    const draft = result.current.createDraft();
    expect(typeof draft.id).toBe("number");
    expect(existingIds).not.toContain(draft.id);
  });

  it("createDraft returns empty string fields ready to fill in", () => {
    const { result } = renderHook(() => useProducts());
    const draft = result.current.createDraft();
    expect(draft.codigo).toBe("");
    expect(draft.nome).toBe("");
    expect(draft.categoria).toBe("");
    expect(draft.quantidade).toBe(0);
    expect(draft.preco).toBe(0);
  });

  it("duplicateProduct adds a copy with a new id and '(cópia)' suffix", () => {
    const { result } = renderHook(() => useProducts());
    const original = result.current.products[0]!;
    act(() => { result.current.duplicateProduct(original); });
    const copy = result.current.products.find((p) => p.nome === `${original.nome} (cópia)`);
    expect(copy).toBeDefined();
    expect(copy!.id).not.toBe(original.id);
    expect(copy!.codigo).toBe(original.codigo);
  });

  it("removeProduct removes the product with the matching id", async () => {
    const { result } = renderHook(() => useProducts());
    const target = result.current.products[0]!;
    const initialCount = result.current.products.length;
    await act(async () => { await result.current.removeProduct(target); });
    expect(result.current.products.length).toBe(initialCount - 1);
    expect(result.current.products.find((p) => p.id === target.id)).toBeUndefined();
  });

  it("saveProduct replaces the product with the updated version", async () => {
    const { result } = renderHook(() => useProducts());
    const target = result.current.products[0]!;
    const updated = { ...target, nome: "Nome atualizado" };
    await act(async () => { await result.current.saveProduct(updated); });
    const found = result.current.products.find((p) => p.id === target.id);
    expect(found?.nome).toBe("Nome atualizado");
  });

  it("createProduct appends the new product to the list", async () => {
    const { result } = renderHook(() => useProducts());
    const initialCount = result.current.products.length;
    const newProduct = result.current.createDraft();
    newProduct.nome = "Novo produto";
    await act(async () => { await result.current.createProduct(newProduct); });
    expect(result.current.products.length).toBe(initialCount + 1);
    expect(result.current.products.at(-1)?.nome).toBe("Novo produto");
  });
});
