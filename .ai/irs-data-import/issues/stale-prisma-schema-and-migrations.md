# Stale importer Prisma schema and migrations

## Status
Open
## Severity
High
## Type
Risk
## Scope
`tools/local/irs-data-import/prisma`.
## Current behavior
Historical schema omits newer COPY fields such as `address_hash`.
## Evidence
Importer pipeline versus local schema.
## Risk
It misrepresents current database behavior.
## Recommended direction
Use API Prisma for all contract decisions.
## Constraints
Preserve copy for comparison.
## Acceptance criteria
- [ ] Consumer compatibility is verified against canonical schema.
## Related issues
[ownership](../../platform/issues/canonical-database-ownership.md)
