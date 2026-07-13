# Canonical database ownership

## Status
Open
## Severity
High
## Type
Architecture
## Scope
`services/api/prisma/*`; all database consumers.
## Current behavior
API schema and migrations are canonical.
## Evidence
`AGENTS.md`; `services/api/prisma/schema.prisma`.
## Risk
Duplicate definitions diverge.
## Recommended direction
Start schema changes in API migrations, then audit consumers.
## Constraints
Do not move ownership to `shared` without an explicit design decision.
## Acceptance criteria
- [ ] Database-change workflow is followed and verified.
## Related issues
[duplicates](duplicate-database-definitions.md)
