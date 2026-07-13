# Noncanonical web Prisma schema

## Status
Open
## Severity
High
## Type
Risk
## Scope
`apps/platform-web/prisma`.
## Current behavior
App-local schema lacks canonical `address_hash` fields and migration history.
## Evidence
Web schema versus `services/api/prisma/schema.prisma`.
## Risk
Direct application writes can drift from database contract.
## Recommended direction
Treat schema as historical until a migration plan exists.
## Constraints
API Prisma remains canonical.
## Acceptance criteria
- [ ] Compatibility and ownership are verified.
## Related issues
[duplicates](../../platform/issues/duplicate-database-definitions.md)
