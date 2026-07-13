-- This is an empty migration.
CREATE OR REPLACE FUNCTION public.insert_charity_to_final()
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
BEGIN
    MERGE INTO "Charity" AS chari
    USING "CharityStaging" AS stg
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
            lat = NULL,
            lng = NULL,
            geocoded_at = NULL,
            location = NULL,
            geocode_status = CASE
                WHEN stg.street LIKE 'Po Box%' THEN 21
                ELSE 11
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
$function$
