# Missing import transaction

## Status
Open
## Severity
Medium
## Type
Risk
## Scope
Lambda import pipeline.
## Current behavior
COPY, merge function, and staging cleanup have no explicit transaction.
## Evidence
`charity-etl/utils/pipeline.ts`.
## Risk
Partial import/staging state after failures.
## Recommended direction
Assess database transaction semantics separately.
## Constraints
Do not change COPY order or merge behavior without a plan.
## Acceptance criteria
- [ ] Failure semantics are documented and verified.
## Related issues
[local pipeline](../../platform/issues/duplicated-irs-import-pipeline.md)
