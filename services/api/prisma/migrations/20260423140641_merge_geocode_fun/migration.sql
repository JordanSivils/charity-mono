-- This is an empty migration.
CREATE OR REPLACE FUNCTION public.apply_census_geocodes()
RETURNS integer
LANGUAGE plpgsql
AS $function$
BEGIN
    MERGE INTO "Charity" AS chari
    USING (
        SELECT
            gs.ein,
            gs.match_status,
            gs.lat AS census_lat,
            gs.lng AS census_lng,
            fg.lat AS fallback_lat,
            fg.lng AS fallback_lng,
            fg.location AS fallback_location
        FROM "GeocodeStaging" gs
        LEFT JOIN "FallbackGeocodes" fg
            ON fg.zip = gs.zip
    ) AS src
    ON chari.ein = src.ein

    WHEN MATCHED
         AND chari.geocode_status = 11
         AND src.match_status = 'match'
    THEN
        UPDATE SET
            lat = src.census_lat,
            lng = src.census_lng,
            location = ST_SetSRID(
                ST_MakePoint(src.census_lng::double precision, src.census_lat::double precision),
                4326
            )::geography,
            geocode_status = 12,
            geocoded_at = NOW()

    WHEN MATCHED
         AND chari.geocode_status = 11
         AND src.match_status = 'tie'
         AND src.fallback_lat IS NOT NULL
         AND src.fallback_lng IS NOT NULL
    THEN
        UPDATE SET
            lat = src.fallback_lat,
            lng = src.fallback_lng,
            location = src.fallback_location,
            geocode_status = 14,
            geocoded_at = NOW()

    WHEN MATCHED
         AND chari.geocode_status = 11
         AND src.match_status = 'no_match'
         AND src.fallback_lat IS NOT NULL
         AND src.fallback_lng IS NOT NULL
    THEN
        UPDATE SET
            lat = src.fallback_lat,
            lng = src.fallback_lng,
            location = src.fallback_location,
            geocode_status = 13,
            geocoded_at = NOW()

    WHEN MATCHED
         AND chari.geocode_status = 11
         AND src.match_status IN ('tie', 'no_match')
         AND src.fallback_lat IS NULL
         AND src.fallback_lng IS NULL
    THEN
        UPDATE SET
            lat = NULL,
            lng = NULL,
            location = NULL,
            geocode_status = 15,
            geocoded_at = NOW();

    RETURN 0;
END;
$function$;