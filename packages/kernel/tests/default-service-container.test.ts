import { describe, it, expect } from "vitest";
import {
  DefaultServiceContainer,
  ServiceLifetimes
} from "../src/container";

describe("DefaultServiceContainer", () => {
  it("resolves singleton once", () => {
    const key = Symbol("svc");
    let created = 0;

    const c = new DefaultServiceContainer();
    c.add({
      key,
      lifetime: ServiceLifetimes.Singleton,
      factory: () => ({ id: ++created })
    });

    const a = c.resolve<{id:number}>(key);
    const b = c.resolve<{id:number}>(key);

    expect(a.id).toBe(1);
    expect(b.id).toBe(1);
  });
});
