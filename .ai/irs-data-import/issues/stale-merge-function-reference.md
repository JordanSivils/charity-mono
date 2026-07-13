# Stale merge-function reference

## Status
Open
## Severity
Medium
## Type
Documentation
## Scope
`tools/local/irs-data-import/sql.txt`.
## Current behavior
Reference merge SQL predates newer fields.
## Evidence
`sql.txt`; canonical API migrations.
## Risk
Manual operations use obsolete SQL.
## Recommended direction
Treat as historical only.
## Constraints
Do not alter during transport.
## Acceptance criteria
- [ ] Current authoritative function source is documented.
## Related issues
[stale schema](stale-prisma-schema-and-migrations.md)
