# Sprint G2.5.9155 - NotifyArchive Foundation Review

## Summary

- Added the first `@atlas/notifyarchive` package for Home Assistant message collection and action decisions.
- Modeled alarm, notification and entity-outage rules with fixed-text handling, priorities, printer targets, vacation mode, local archive, SFTP backup and acknowledgement requirements.
- Added escalation decisions that only apply to unacknowledged messages which require acknowledgement.
- Covered timed printing, vacation digest, SFTP archive and acknowledgement escalation with focused tests.

## Verification

- `pnpm --filter @atlas/notifyarchive check`
- `pnpm --filter @atlas/notifyarchive test -- --run`
- `pnpm --filter @atlas/notifyarchive build`
- `git diff --check`
