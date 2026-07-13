# Nested build script path

## Status
Open
## Severity
Medium
## Type
Deployment
## Scope
`services/irs-data-upload/charity-etl/package.json`.
## Current behavior
Nested `build` runs `sam build`, while template is one directory above.
## Evidence
Package script; service `template.yaml`.
## Risk
Direct package build may not find the template.
## Recommended direction
Define an explicit supported build entrypoint later.
## Constraints
Preserve nesting and SAM behavior.
## Acceptance criteria
- [ ] Package-local and root build behavior are documented.
## Related issues
[validation gaps](../../platform/issues/workspace-validation-gaps.md)
