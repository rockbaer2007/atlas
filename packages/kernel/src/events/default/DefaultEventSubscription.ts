/**
 * ATLAS Framework
 * Sprint: G2.5.1b - Default EventBus
 * Package: v2
 */

export class DefaultEventSubscription{
 constructor(
  public readonly id:string,
  public readonly eventType:string,
  private readonly disposeAction:()=>Promise<void>|void){}
 async dispose():Promise<void>{await this.disposeAction();}
}
