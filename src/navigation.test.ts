import { describe, it, expect } from "vitest";
import { PAGE_LABELS } from "./navigation";
import type { PageId } from "./navigation";

describe("navigation", () => {
  it("has a label for every PageId", () => {
    const ids: PageId[] = ["pagina-1", "pagina-2", "pagina-3"];
    for (const id of ids) {
      expect(PAGE_LABELS[id]).toBeTruthy();
    }
  });
});
