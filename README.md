# charity-mono

The monorepo for the charity data platform.

- `apps` contains user-facing web applications.
- `services` contains deployable backend services.
- `shared` is reserved for deliberately extracted reusable contracts, database tooling, validation, and other shared packages.
- `tools/local` contains locally executed operational, testing, and data-maintenance tools.

No shared package should be created merely because similar code exists. The first migration phase preserves every project's behavior and boundaries before consolidation is considered.
