# Deployment runs Prisma migrations

## Status
Open
## Severity
High
## Type
Deployment
## Scope
`services/api/fly.toml`.
## Current behavior
Fly release command runs `prisma migrate deploy`.
## Evidence
`fly.toml` `release_command`.
## Risk
Deployment changes production schema.
## Recommended direction
Review migration authorization and rollback controls.
## Constraints
API migrations are canonical.
## Acceptance criteria
- [ ] Production migration procedure is verified.
## Related issues
[ownership](../../platform/issues/canonical-database-ownership.md)
