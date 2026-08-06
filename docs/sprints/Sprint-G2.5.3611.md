# Sprint G2.5.3611 - Retire Matter Overview TODO

## Summary

- Removed the Matter/Thread overview idea from active ATLAS follow-up TODOs.
- Kept the Lovelace UV Card as the remaining planned follow-up project.
- Updated the bilingual external documentation in `ugso-opensource-docs`.

## Verification

- `rg -n "UGSo Thread Monitor|Thread Monitor|Thread card|Thread-Card|thread card|thread-monitor"` in Atlas and `ugso-opensource-docs`
- `pnpm --filter @atlas/runtime test`
- `pnpm build`
- `git diff --check`
- `npm run docs:build` in `ugso-opensource-docs`
- `git diff --check` in `ugso-opensource-docs`
