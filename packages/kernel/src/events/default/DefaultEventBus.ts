/**
 * ATLAS Framework
 * Sprint: G2.5.1b - Default EventBus
 * Package: v2
 */

import {EventHandlerCollection,Handler} from "./EventHandlerCollection";
import {DefaultEventSubscription} from "./DefaultEventSubscription";
import {EventMatcher} from "./EventMatcher";

export class DefaultEventBus{
 private readonly collection=new EventHandlerCollection();
 private readonly matcher=new EventMatcher();
 private nextId=1;

 subscribe(type:string,handler:Handler){
   this.collection.add(type,handler);
   return new DefaultEventSubscription(String(this.nextId++),type,()=>{
      this.collection.remove(type,handler);
   });
 }

 async publish(event:{type:string}):Promise<void>{
   const handlers=this.collection.handlers(event.type);
   for(const h of handlers){
      if(this.matcher.matches(event.type,event.type)){
        await h(event);
      }
   }
 }

 clear(){this.collection.clear();}
}
