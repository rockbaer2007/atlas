/**
 * ATLAS Framework
 * Sprint: G2.5.1b - Default EventBus
 * Package: v2
 */

export class EventMatcher{
 matches(eventType:string,subscriptionType:string):boolean{
   return eventType===subscriptionType;
 }
}
