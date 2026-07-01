
import {describe,it,expect} from "vitest";
import {DefaultEventBus} from "../src/events/default/DefaultEventBus";

describe("DefaultEventBus",()=>{
 it("publishes event",async()=>{
   const bus=new DefaultEventBus();
   let called=false;
   bus.subscribe("demo",()=>{called=true;});
   await bus.publish({type:"demo"});
   expect(called).toBe(true);
 });
});
