import { Transform } from "stream"
import crypto from "crypto"

type AddressSnapshot = {
    street: string | null
    city: string | null
    state: string | null
    zip: string | null
}

const hashPart = (val: string | null | undefined) => {
    const value = val ?? ""
    const length = val == null ? "-1" : String(Array.from(value).length)

    return `${length}:${value}`
}

export const computeAddressHash = (snapshot: AddressSnapshot) => {
    const input = [
        hashPart(snapshot.street),
        hashPart(snapshot.city),
        hashPart(snapshot.state),
        hashPart(snapshot.zip)
    ].join("|")

    return crypto
        .createHash("md5")
        .update(input)
        .digest("hex")
}

export const addHash = () => {
    return new Transform({
    objectMode: true,
    transform(snapshot, _enc, cb) {
        const hash = crypto
            .createHash("md5")
            .update(JSON.stringify(snapshot))
            .digest("hex")

        cb(null, { 
            ...snapshot, 
            hash_value: hash,
            address_hash: computeAddressHash(snapshot),
            lat: null,
            lng: null,
            geocode_status: null,
            geocoded_at: null
        })
    }
});
} 
