import { describe,it,expect } from "vitest";
import { DefaultRegistry } from "../src/registry/DefaultRegistry";

describe("DefaultRegistry",()=>{
  it("registers and retrieves values",()=>{
    const r=new DefaultRegistry<string,number>();
    r.register("a",1);
    expect(r.get("a")).toBe(1);
    expect(r.size).toBe(1);
  });

  it("notifies listeners",()=>{
    const r=new DefaultRegistry<string,string>();
    let called=false;
    r.subscribe(()=>called=true);
    r.register("x","y");
    expect(called).toBe(true);
  });
});
