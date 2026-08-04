# Plugin Specification

A Plugin:
- declares metadata
- has a version
- declares dependencies
- is initialized through the kernel
- can be adapted to a Runtime module while preserving plugin metadata
- can expose extension points and provided capabilities for future discovery
- may provide optional deactivate and dispose hooks that are called through Runtime shutdown
- can be registered in a runtime plugin catalog for discovery by extension point or capability
- can be projected into an administration view with status and management actions
