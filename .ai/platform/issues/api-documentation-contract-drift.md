# API documentation contract drift

## Status
Open
## Severity
Medium
## Type
Documentation
## Scope
API and platform-web docs.
## Current behavior
Docs hardcode deployed API URLs and duplicate contract examples.
## Evidence
`apps/platform-web/app/(docs)`; API routes/OpenAPI.
## Risk
Examples can diverge from routes or fields.
## Recommended direction
Audit documentation against generated API contract.
## Constraints
Do not change public behavior without review.
## Acceptance criteria
- [ ] Documented routes and examples are verified.
## Related issues
[hardcoded URL](../../platform-web/issues/hardcoded-production-api-url.md)
