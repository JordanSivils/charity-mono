# Incorrect database URL error message

## Status
Open
## Severity
Low
## Type
Cleanup
## Scope
`tools/local/geocode-worker/src/pg/pg-config.ts`.
## Current behavior
Code reads `DATABASE_URL` but error says `DIRECT_DATABASE_URL`.
## Evidence
`pg-config.ts`.
## Risk
Misleading operator diagnosis.
## Recommended direction
Align message with actual environment variable.
## Constraints
Preserve runtime connection behavior.
## Acceptance criteria
- [ ] Missing-variable error names `DATABASE_URL`.
## Related issues
[ownership](../../platform/issues/canonical-database-ownership.md)
