import { describe, it, expect } from "vitest";
import { productColumns } from "./productColumns";

describe("productColumns", () => {
  it("defines all expected column keys", () => {
    const keys = productColumns.map((c) => c.chave);
    expect(keys).toContain("codigo");
    expect(keys).toContain("nome");
    expect(keys).toContain("categoria");
    expect(keys).toContain("quantidade");
    expect(keys).toContain("preco");
    expect(keys).toContain("status");
  });

  it("every column has a cabecalho", () => {
    for (const col of productColumns) {
      expect(col.cabecalho).toBeTruthy();
    }
  });
});
