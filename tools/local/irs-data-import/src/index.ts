import stateJson from "./json/states.json" with { type: "json" }
import { streamData } from "./utils/pipeline.js"
import client from "./pg/pg-config.js"

(async () => {
    try {
        for (const val of stateJson) {
            await streamData(val.irsUrl)
        } 
    } finally {
        await client.end();
        console.log("done")
    }
})()