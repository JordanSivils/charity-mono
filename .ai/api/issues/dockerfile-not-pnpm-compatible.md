# Dockerfile is not pnpm compatible

## Status
Open
## Severity
High
## Type
Deployment
## Scope
`services/api/Dockerfile`.
## Current behavior
Uses `npm ci`; package lock was not transported.
## Evidence
Dockerfile and pnpm migration.
## Risk
Docker build fails.
## Recommended direction
Plan a pnpm Docker build separately.
## Constraints
Do not alter deployment during transport.
## Acceptance criteria
- [ ] Container build succeeds from root lockfile.
## Related issues
[Node mismatch](docker-node-version-mismatch.md)
