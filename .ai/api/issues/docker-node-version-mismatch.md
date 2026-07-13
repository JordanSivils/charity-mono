# Docker Node version mismatch

## Status
Open
## Severity
Medium
## Type
Deployment
## Scope
API Dockerfile and root `.nvmrc`.
## Current behavior
Docker uses Node 22; repository baseline is 24.
## Evidence
`services/api/Dockerfile`; `.nvmrc`.
## Risk
Runtime differences.
## Recommended direction
Decide supported production version.
## Constraints
Validate deployment separately.
## Acceptance criteria
- [ ] Runtime policy is documented and tested.
## Related issues
[Docker pnpm](dockerfile-not-pnpm-compatible.md)
