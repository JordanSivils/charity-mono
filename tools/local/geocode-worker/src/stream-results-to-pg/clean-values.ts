export function cleanString(val: string) {
    if (!val || val === "") return null;
    if (val.includes("%")) {
        val = val.replace("%", "").trim()
    }
    return val
            .split(" ")
            .map(v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase())
            .join(" ")
}

export function cleanZip(val: string) {
    return val.split('-')[0]
}

export function cleanState(val: string) {
    if (!val || val === "") return null
    return val.trim()
}

export function getGroup(val: string) {
    if (!val || val === "") return null
    return val.trim().charAt(0).toUpperCase()
}

export function convertToNumber(val: string) {
    if (!val || val === "") return null
    const v = Number(val)
    if (Number.isNaN(v)) return null
    return Math.trunc(v)
}