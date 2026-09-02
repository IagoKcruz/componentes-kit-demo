import { describe, it, expect } from "vitest";
import { CATEGORY_OPTIONS, STATUS_OPTIONS } from "./productOptions";

describe("productOptions", () => {
  it("CATEGORY_OPTIONS has valor and rotulo on every entry", () => {
    expect(CATEGORY_OPTIONS.length).toBeGreaterThan(0);
    for (const opt of CATEGORY_OPTIONS) {
      expect(opt.valor).toBeTruthy();
      expect(opt.rotulo).toBeTruthy();
    }
  });

  it("STATUS_OPTIONS has valor and rotulo on every entry", () => {
    expect(STATUS_OPTIONS.length).toBeGreaterThan(0);
    for (const opt of STATUS_OPTIONS) {
      expect(opt.valor).toBeTruthy();
      expect(opt.rotulo).toBeTruthy();
    }
  });
});
