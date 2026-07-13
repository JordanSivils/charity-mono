# IRS data upload context

AWS SAM Lambda service at `services/irs-data-upload`; handler `charity-etl/app.ts`. Verified: typecheck, isolated tests, SAM validate, and SAM build. Deployment, handler execution, IRS downloads, and database writes are operational. It streams IRS CSVs into `CharityStaging`, calls `insert_charity_to_final()`, then truncates staging.
