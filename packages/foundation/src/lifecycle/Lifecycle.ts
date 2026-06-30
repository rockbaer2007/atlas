import { Disposable } from "./Disposable";
import { Initializable } from "./Initializable";
import { Startable } from "./Startable";
import { Stoppable } from "./Stoppable";

export interface Lifecycle extends Initializable, Startable, Stoppable, Disposable {}
