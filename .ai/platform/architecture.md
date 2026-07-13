# Confirmed data flow

```text
IRS CSV sources
→ IRS data upload/import pipeline
→ CharityStaging
→ insert_charity_to_final()
→ canonical Charity records
→ local Census geocoding workflow
→ GeocodeStaging
→ geocoding database functions
→ canonical coordinates/location
→ services/api
→ apps/platform-web and external API consumers
```

The upload Lambda and local importer are direct-SQL consumers. The geocode worker populates canonical coordinates and `location` used by API nearby search.
