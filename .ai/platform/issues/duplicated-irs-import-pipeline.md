# Duplicated IRS import pipeline

## Status
Open
## Severity
Medium
## Type
Architecture
## Scope
Lambda and local importer.
## Current behavior
Both stream IRS CSVs, COPY `CharityStaging`, merge, and clear staging.
## Evidence
`services/irs-data-upload/charity-etl/utils/pipeline.ts`; local equivalent.
## Risk
Behavior drifts between operational paths.
## Recommended direction
Compare ownership and tests before any extraction.
## Constraints
Do not refactor during transport.
## Acceptance criteria
- [ ] Differences and ownership are explicitly decided.
## Related issues
[validation gaps](workspace-validation-gaps.md)
