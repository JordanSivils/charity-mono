# Workspace validation gaps

## Status
Open
## Severity
Medium
## Type
Risk
## Scope
All workspaces.
## Current behavior
Safe static validation exists; operational workflows were not exercised.
## Evidence
Transport validation reports.
## Risk
Integration regressions remain undiscovered.
## Recommended direction
Design isolated fixtures and integration environments.
## Constraints
Never use production resources for setup validation.
## Acceptance criteria
- [ ] Safe integration validation plan is verified.
## Related issues
[pipeline](duplicated-irs-import-pipeline.md)
