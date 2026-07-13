-- This is an empty migration.
CREATE OR REPLACE FUNCTION public.apply_zip_fallback_geocodes()
RETURNS integer
LANGUAGE plpgsql
AS $function$
BEGIN

    UPDATE "Charity" c
    SET
        lat = f.lat,
        lng = f.lng,
        location = f.location,
        geocode_status = 22,
        geocoded_at = NOW()
    FROM "FallbackGeocodes" f
    WHERE
        c.zip = f.zip
        AND c.geocode_status = 21
        AND c.lat IS NULL;

    UPDATE "Charity"
    SET
        geocode_status = 23,
        geocoded_at = NOW()
    WHERE
        geocode_status = 21
        AND lat IS NULL;

    RETURN 0;
END;
$function$;