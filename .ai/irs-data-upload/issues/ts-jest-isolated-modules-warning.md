# ts-jest isolated-modules warning

## Status
Open
## Severity
Low
## Type
Cleanup
## Scope
Lambda ts-jest configuration.
## Current behavior
Tests pass with TS151002 warnings.
## Evidence
Transport test output; `tsconfig.json`.
## Risk
Warnings obscure future test failures.
## Recommended direction
Review ts-jest/TypeScript configuration later.
## Constraints
Keep tests isolated.
## Acceptance criteria
- [ ] Tests pass without configuration warnings.
## Related issues
[validation gaps](../../platform/issues/workspace-validation-gaps.md)
