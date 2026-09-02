import { describe, it, expect } from "vitest";
import { fakeApiCall } from "./fakeApi";

describe("fakeApiCall", () => {
  it("resolves with the given result", async () => {
    const result = await fakeApiCall({ id: 1 }, 0);
    expect(result).toEqual({ id: 1 });
  });

  it("resolves primitive values", async () => {
    expect(await fakeApiCall("ok", 0)).toBe("ok");
    expect(await fakeApiCall(42, 0)).toBe(42);
  });
});
