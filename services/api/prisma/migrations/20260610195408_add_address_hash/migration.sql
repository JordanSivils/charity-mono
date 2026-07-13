-- Deploy order:
-- 1. Apply this DB migration first. Existing ETL COPY statements keep working because
--    address_hash is nullable and not required in the explicit COPY column list.
-- 2. Update ETL second to populate CharityStaging.address_hash using the same
--    street/city/state/zip hash algorithm below.
-- 3. Backfill existing Charity.address_hash later as a manual operational step;
--    do not run the full-table backfill inside prisma migrate deploy.

ALTER TABLE "Charity" ADD COLUMN "address_hash" TEXT;
ALTER TABLE "CharityStaging" ADD COLUMN "address_hash" TEXT;

CREATE OR REPLACE FUNCTION public.insert_charity_to_final()
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
BEGIN
    MERGE INTO "Charity" AS chari
    USING (
        SELECT
            stg.*,
            COALESCE(
                stg.address_hash,
                md5(
                    concat(
                        COALESCE(length(stg.street)::text, '-1'), ':', COALESCE(stg.street, ''), '|',
                        COALESCE(length(stg.city)::text, '-1'), ':', COALESCE(stg.city, ''), '|',
                        COALESCE(length(stg.state)::text, '-1'), ':', COALESCE(stg.state, ''), '|',
                        COALESCE(length(stg.zip)::text, '-1'), ':', COALESCE(stg.zip, '')
                    )
                )
            ) AS effective_address_hash
        FROM "CharityStaging" AS stg
    ) AS stg
    ON chari.ein = stg.ein

    WHEN MATCHED AND chari.hash_value IS DISTINCT FROM stg.hash_value THEN
        UPDATE SET
            name = stg."name",
            ico = stg.ico,
            street = stg.street,
            city = stg.city,
            state = stg."state",
            zip = stg.zip,
            "group" = stg."group",
            subsection = stg.subsection,
            affiliation = stg.affiliation,
            classification = stg.classification,
            ruling = stg.ruling,
            deductibility = stg.deductibility,
            foundation = stg.foundation,
            activity = stg.activity,
            organization = stg.organization,
            "status" = stg.status,
            tax_period = stg.tax_period,
            filing_req_code = stg.filing_req_code,
            pf_filing_req_code = stg.pf_filing_req_code,
            account_paid = stg.account_paid,
            asset_amount = stg.asset_amount,
            income_amount = stg.income_amount,
            revenue_amount = stg.revenue_amount,
            ntee_code = stg.ntee_code,
            ntee_group = stg.ntee_group,
            hash_value = stg.hash_value,
            address_hash = stg.effective_address_hash,
            lat = CASE
                WHEN COALESCE(
                    chari.address_hash,
                    md5(
                        concat(
                            COALESCE(length(chari.street)::text, '-1'), ':', COALESCE(chari.street, ''), '|',
                            COALESCE(length(chari.city)::text, '-1'), ':', COALESCE(chari.city, ''), '|',
                            COALESCE(length(chari.state)::text, '-1'), ':', COALESCE(chari.state, ''), '|',
                            COALESCE(length(chari.zip)::text, '-1'), ':', COALESCE(chari.zip, '')
                        )
                    )
                ) IS DISTINCT FROM stg.effective_address_hash THEN NULL
                ELSE chari.lat
            END,
            lng = CASE
                WHEN COALESCE(
                    chari.address_hash,
                    md5(
                        concat(
                            COALESCE(length(chari.street)::text, '-1'), ':', COALESCE(chari.street, ''), '|',
                            COALESCE(length(chari.city)::text, '-1'), ':', COALESCE(chari.city, ''), '|',
                            COALESCE(length(chari.state)::text, '-1'), ':', COALESCE(chari.state, ''), '|',
                            COALESCE(length(chari.zip)::text, '-1'), ':', COALESCE(chari.zip, '')
                        )
                    )
                ) IS DISTINCT FROM stg.effective_address_hash THEN NULL
                ELSE chari.lng
            END,
            geocoded_at = CASE
                WHEN COALESCE(
                    chari.address_hash,
                    md5(
                        concat(
                            COALESCE(length(chari.street)::text, '-1'), ':', COALESCE(chari.street, ''), '|',
                            COALESCE(length(chari.city)::text, '-1'), ':', COALESCE(chari.city, ''), '|',
                            COALESCE(length(chari.state)::text, '-1'), ':', COALESCE(chari.state, ''), '|',
                            COALESCE(length(chari.zip)::text, '-1'), ':', COALESCE(chari.zip, '')
                        )
                    )
                ) IS DISTINCT FROM stg.effective_address_hash THEN NULL
                ELSE chari.geocoded_at
            END,
            location = CASE
                WHEN COALESCE(
                    chari.address_hash,
                    md5(
                        concat(
                            COALESCE(length(chari.street)::text, '-1'), ':', COALESCE(chari.street, ''), '|',
                            COALESCE(length(chari.city)::text, '-1'), ':', COALESCE(chari.city, ''), '|',
                            COALESCE(length(chari.state)::text, '-1'), ':', COALESCE(chari.state, ''), '|',
                            COALESCE(length(chari.zip)::text, '-1'), ':', COALESCE(chari.zip, '')
                        )
                    )
                ) IS DISTINCT FROM stg.effective_address_hash THEN NULL
                ELSE chari.location
            END,
            geocode_status = CASE
                WHEN COALESCE(
                    chari.address_hash,
                    md5(
                        concat(
                            COALESCE(length(chari.street)::text, '-1'), ':', COALESCE(chari.street, ''), '|',
                            COALESCE(length(chari.city)::text, '-1'), ':', COALESCE(chari.city, ''), '|',
                            COALESCE(length(chari.state)::text, '-1'), ':', COALESCE(chari.state, ''), '|',
                            COALESCE(length(chari.zip)::text, '-1'), ':', COALESCE(chari.zip, '')
                        )
                    )
                ) IS DISTINCT FROM stg.effective_address_hash THEN
                    CASE
                        WHEN stg.street LIKE 'Po Box%' THEN 21
                        ELSE 11
                    END
                ELSE chari.geocode_status
            END

    WHEN NOT MATCHED THEN
        INSERT (
            ein,
            name,
            ico,
            street,
            city,
            state,
            zip,
            "group",
            subsection,
            affiliation,
            classification,
            ruling,
            deductibility,
            foundation,
            activity,
            organization,
            "status",
            tax_period,
            filing_req_code,
            pf_filing_req_code,
            account_paid,
            asset_amount,
            income_amount,
            revenue_amount,
            ntee_code,
            ntee_group,
            hash_value,
            address_hash,
            lat,
            lng,
            geocode_status,
            geocoded_at,
            location
        )
        VALUES (
            stg.ein,
            stg."name",
            stg.ico,
            stg.street,
            stg.city,
            stg."state",
            stg.zip,
            stg."group",
            stg.subsection,
            stg.affiliation,
            stg.classification,
            stg.ruling,
            stg.deductibility,
            stg.foundation,
            stg.activity,
            stg.organization,
            stg."status",
            stg.tax_period,
            stg.filing_req_code,
            stg.pf_filing_req_code,
            stg.account_paid,
            stg.asset_amount,
            stg.income_amount,
            stg.revenue_amount,
            stg.ntee_code,
            stg.ntee_group,
            stg.hash_value,
            stg.effective_address_hash,
            NULL,
            NULL,
            CASE
                WHEN stg.street LIKE 'Po Box%' THEN 21
                ELSE 11
            END,
            NULL,
            NULL
        );

    RETURN 0;
END;
$function$;
