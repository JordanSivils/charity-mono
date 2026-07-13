# IRS data upload

This service deploys the IRS charity CSV importer as an AWS Lambda through AWS SAM. The Lambda handler is `charity-etl/app.ts`; [template.yaml](template.yaml) maps it as `app.handler` and builds the nested application with esbuild.

## Import workflow

For every configured IRS state CSV URL in `charity-etl/json/states.json`, the handler streams records, normalizes them, and loads `CharityStaging` through PostgreSQL `COPY`. On stream completion it calls `insert_charity_to_final()` and truncates `CharityStaging`.

The source is external IRS CSV URLs; this service has no S3 input or output in its current template. It requires `DATABASE_URL`, supplied in SAM as the secret `DatabaseUrl` parameter and passed to the function environment. For local configuration, copy `charity-etl/.env.example` to `charity-etl/.env` and do not commit credentials.

## Safe validation

```sh
pnpm service:irs-upload:typecheck
pnpm service:irs-upload:test
pnpm service:irs-upload:sam-validate
pnpm service:irs-upload:sam-build
```

`sam build` creates `.aws-sam/` build artifacts but does not invoke the Lambda handler or access production resources.

## Operational deployment

`sam deploy` and `sam sync` use the configuration in `samconfig.toml` and can create AWS resources and upload deployment artifacts. They are intentionally not exposed as root scripts and must be run only with deliberate authorization.

## Relationship to the local importer

`tools/local/irs-data-import` is the local testing and troubleshooting counterpart. Its duplicated import logic, schema history, and operational helpers are intentionally preserved rather than consolidated during this transport phase.
