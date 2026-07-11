import { describe, expect, it } from "vitest";

import type {
  CoreRuntimeHost,
  CoreRuntimeHostConfiguration,
} from "../src";
import { createCoreRuntimeHost } from "../src";

describe("core public API", () => {
  it("creates a Runtime host through the Core package root", () => {
    const configuration: CoreRuntimeHostConfiguration = {
      application: {
        name: "core-api",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    };

    const host: CoreRuntimeHost = createCoreRuntimeHost(configuration);

    expect(host.application.name).toBe("core-api");
    expect(host.state).toBe("created");
  });
});
