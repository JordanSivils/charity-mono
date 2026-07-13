# Duplicate database definitions

## Status
Open
## Severity
High
## Type
Risk
## Scope
`apps/platform-web/prisma`; `tools/local/irs-data-import/prisma`.
## Current behavior
Noncanonical copies exist.
## Evidence
Transport inspection; `AGENTS.md`.
## Risk
Copies can describe obsolete fields or migrations.
## Recommended direction
Preserve for comparison; assess consolidation only later.
## Constraints
API schema/migrations remain canonical.
## Acceptance criteria
- [ ] Ownership and consumer compatibility are verified.
## Related issues
[ownership](canonical-database-ownership.md)
