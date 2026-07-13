import client from "../pg/pg-config.js"
import { from as copyFrom } from "pg-copy-streams"
import { callSave, turncateStaging } from "../pg/queries.js"
import https from "https"
import { pipeline } from "stream"
import { parse } from "fast-csv"
import { toSnapshot } from "./snapshot.js"
import { addHash } from "./hash.js"
import { convertToCsv } from "./convert-to-csv.js"

export const streamData = async (url: string) => {
    const db = await client.connect()
    try {
        await new Promise<void>((resolve, reject)=> {
        const copySql = `COPY "CharityStaging" (
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
            status,
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
            geocoded_at 
            ) FROM STDIN WITH (FORMAT csv)`

        const streamToPg = db.query(copyFrom(copySql))
        streamToPg.on("error", reject)
        streamToPg.on("finish", () => {
            (async () => {
                try {
                    await callSave(client);
                    await turncateStaging(client);
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })()
        });

        const req = https.get(url, (res) => {
            
            if (res.statusCode !== 200) {
                reject(new Error(`HTTP: ${res.statusCode}`));
                res.resume();
                return
            }
            pipeline(
                res,
                parse({headers: true, maxRows: 400}),
                toSnapshot(),
                addHash(),
                convertToCsv(),
                streamToPg,
                (err) => { if (err) reject(err) }
            )
        })
        req.on("error", reject)
    })
    } finally {
        db.release()
    }
}
