import { describe, expect, it } from "vitest";

import {
  ModuleDependencyResolver,
  type ModuleDescriptor,
} from "../src/modules";

function descriptor(
  id: string,
  dependencies: ModuleDescriptor["manifest"]["dependencies"] = [],
): ModuleDescriptor {
  return {
    manifest: {
      id,
      name: id,
      version: "1.0.0",
      dependencies,
    },
    loaded: false,
  };
}

describe("ModuleDependencyResolver", () => {
  it("orders dependencies before their dependents", () => {
    const resolver = new ModuleDependencyResolver();
    const dependent = descriptor("dependent", [{ id: "dependency", version: "1.0.0" }]);
    const dependency = descriptor("dependency");

    const resolved = resolver.resolve([dependent, dependency]);

    expect(resolved.map(module => module.manifest.id)).toEqual([
      "dependency",
      "dependent",
    ]);
  });

  it("rejects a missing required dependency", () => {
    const resolver = new ModuleDependencyResolver();

    expect(() => resolver.resolve([
      descriptor("dependent", [{ id: "missing", version: "1.0.0" }]),
    ])).toThrow("Module dependency not found: dependent -> missing");
  });

  it("allows a missing optional dependency", () => {
    const resolver = new ModuleDependencyResolver();

    expect(resolver.resolve([
      descriptor("optional", [{ id: "missing", version: "1.0.0", optional: true }]),
    ]).map(module => module.manifest.id)).toEqual(["optional"]);
  });

  it("rejects cyclic dependencies", () => {
    const resolver = new ModuleDependencyResolver();
    const first = descriptor("first", [{ id: "second", version: "1.0.0" }]);
    const second = descriptor("second", [{ id: "first", version: "1.0.0" }]);

    expect(() => resolver.resolve([first, second]))
      .toThrow("Module dependency cycle detected.");
  });
});
