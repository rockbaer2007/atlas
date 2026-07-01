/**
 * ATLAS Framework
 * Sprint: G2.5.1b - Default EventBus
 * Package: v2
 */

export type Handler<T=unknown>=(event:T)=>void|Promise<void>;

export class EventHandlerCollection{
  private readonly map=new Map<string,Set<Handler>>();

  add(type:string,handler:Handler):void{
    const set=this.map.get(type)??new Set<Handler>();
    set.add(handler);
    this.map.set(type,set);
  }

  remove(type:string,handler:Handler):boolean{
    const set=this.map.get(type);
    if(!set) return false;
    const removed=set.delete(handler);
    if(set.size===0) this.map.delete(type);
    return removed;
  }

  handlers(type:string):readonly Handler[]{
    return [...(this.map.get(type)??[])];
  }

  clear(){this.map.clear();}
  get handlerCount(){return [...this.map.values()].reduce((a,s)=>a+s.size,0);}
  get eventTypeCount(){return this.map.size;}
}
