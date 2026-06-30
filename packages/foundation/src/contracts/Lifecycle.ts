import { Disposable } from "./Disposable";
import { Initializable } from "./Initializable";
import { Startable } from "./Startable";
import { Stoppable } from "./Stoppable";

/**
 * Represents the complete lifecycle of an object.
 * @public
 * @since 0.2.0-alpha.1
 */
export interface Lifecycle
    extends Initializable,
        Startable,
        Stoppable,
        Disposable {
}
