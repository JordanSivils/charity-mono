# Hardcoded production API URL

## Status
Open
## Severity
Medium
## Type
Documentation
## Scope
Platform-web docs and OpenAPI route.
## Current behavior
Uses `https://api.charityquery.com` directly.
## Evidence
`app/openapi.json/route.ts`; documentation pages.
## Risk
Non-production environments show production examples/data.
## Recommended direction
Assess configurable documentation endpoint later.
## Constraints
Do not change public docs during transport.
## Acceptance criteria
- [ ] Environment strategy is documented and verified.
## Related issues
[contract drift](../../platform/issues/api-documentation-contract-drift.md)
