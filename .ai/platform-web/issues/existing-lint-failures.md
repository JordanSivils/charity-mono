# Existing lint failures

## Status
Open
## Severity
Medium
## Type
Cleanup
## Scope
`apps/platform-web`.
## Current behavior
Lint reports 9 errors and 19 warnings.
## Evidence
Transport lint validation.
## Risk
CI quality gate fails.
## Recommended direction
Fix separately with UI review.
## Constraints
Preserve UI behavior.
## Acceptance criteria
- [ ] `pnpm app:platform-web:lint` passes.
## Related issues
[build](offline-build-not-validated.md)
