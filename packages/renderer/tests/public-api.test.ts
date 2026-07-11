import { describe, expect, it } from "vitest";

import { createCoreRuntimeHost, type CoreRuntimeHost } from "@atlas/core";

import type { RendererHostContext } from "../src";
import * as Renderer from "../src";
import { createRendererHostContext } from "../src";

describe("renderer public API", () => {
  it("exports the Renderer package value surface from the package root", () => {
    expect(Renderer.createRendererHostContext).toBeTypeOf("function");
  });

  it("creates a Renderer host context from a Core Runtime host", () => {
    const runtime: CoreRuntimeHost = createCoreRuntimeHost({
      application: {
        name: "renderer-api",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });

    const context: RendererHostContext = createRendererHostContext(runtime);

    expect(context.runtime).toBe(runtime);
    expect(context.runtime.application.name).toBe("renderer-api");
  });
});
