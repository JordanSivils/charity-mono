# Offline build not validated

## Status
Open
## Severity
Medium
## Type
Risk
## Scope
Platform web build.
## Current behavior
`next build` was skipped.
## Evidence
Server actions/routes use database, Redis, Clerk, Stripe, Resend, and API fetches.
## Risk
Build may require external systems.
## Recommended direction
Prove offline build inputs before running it.
## Constraints
No production access.
## Acceptance criteria
- [ ] Build safety and result are verified.
## Related issues
[lint](existing-lint-failures.md)
