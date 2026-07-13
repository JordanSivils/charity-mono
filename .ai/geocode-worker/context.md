# Geocode worker context

Local batch worker at `tools/local/geocode-worker`. Verified: typecheck and build. Operational commands select database records, submit Census batches, and write `GeocodeStaging`/invoke database functions. It directly consumes the canonical API database contract.
