import { describe, it, expect } from "vitest";
import { validateProject } from "@/lib/validation";

describe("validateProject", () => {
  it("rejects short names", () => {
    const res = validateProject({ name: "a" });
    expect(res.ok).toBe(false);
  });

  it("trims and accepts valid names", () => {
    const res = validateProject({ name: "  Hello World  " });
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.value.name).toBe("Hello World");
  });
});
