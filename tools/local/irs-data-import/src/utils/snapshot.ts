import { Transform } from "stream"
import { cleanState, cleanString, cleanZip, convertToNumber, getGroup } from "./clean-values.js"

export const toSnapshot = () => {
    return new Transform({
    objectMode: true,
    transform(row, _enc, cb) {
        cb(null, {
            ein: cleanString(row.EIN),
            name: cleanString(row.NAME),
            ico: cleanString(row.ICO),
            street: cleanString(row.STREET),
            city: cleanString(row.CITY),
            state: cleanState(row.STATE),
            zip: cleanZip(row.ZIP),
            group: cleanString(row.GROUP),
            subsection: cleanString(row.SUBSECTION),
            affiliation: cleanString(row.AFFILIATION),
            classification: cleanString(row.CLASSIFICATION),
            ruling: cleanString(row.RULING),
            deductibility: cleanString(row.DEDUCTIBILITY),
            foundation: cleanString(row.FOUNDATION),
            activity: cleanString(row.ACTIVITY),
            organization: cleanString(row.ORGANIZATION),
            status: cleanString(row.STATUS),
            tax_period: cleanString(row.TAX_PERIOD),
            filing_req_code: cleanString(row.FILING_REQ_CD),
            pf_filing_req_code: cleanString(row.PF_FILING_REQ_CD),
            account_paid: convertToNumber(row.ACCT_PD),
            asset_amount: convertToNumber(row.ASSET_AMT),
            income_amount: convertToNumber(row.INCOME_AMT),
            revenue_amount: convertToNumber(row.REVENUE_AMT),
            ntee_code: cleanString(row.NTEE_CD),
            ntee_group: getGroup(row.NTEE_CD)
        })
    }
})
}