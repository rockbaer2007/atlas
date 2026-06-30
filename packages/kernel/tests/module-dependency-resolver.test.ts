import {describe,it,expect} from "vitest";
import {ModuleDependencyResolver} from "../src/modules";

describe("ModuleDependencyResolver",()=>{
  it("returns modules when no cycles exist",()=>{
    const r=new ModuleDependencyResolver();
    expect(r.resolve([])).toEqual([]);
  });
});
