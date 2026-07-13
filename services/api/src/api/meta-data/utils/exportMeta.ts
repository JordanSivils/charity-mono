import SubsectionAndClassificationCodes from "../fields-json/subsection_classification_metadata.json" with { type: 'json' };
import NteeCodes from "../fields-json/ntee_codes_metadata.json" with { type: 'json' };
import NteeGroups from "../fields-json/ntee_group_metadata.json" with { type: 'json' };
import OrganizationCodes from "../fields-json/organization_metadata.json" with { type: 'json' };
import PfFilingRequiredCodes from "../fields-json/pf_filing_rq_codes.json" with { type: 'json' };
import StatusCodes from "../fields-json/status_metadata.json" with { type: 'json' };
import AffiliationCodes from "../fields-json/affiliation_metadata.json" with { type: 'json' };
import DeductibilityCodes from "../fields-json/deductibility_metadata.json" with { type: 'json' };
import CharityFieldsKey from "../fields-json/field_metadata.json" with { type: 'json' };
import FoundationCodes from "../fields-json/foundation_metadata.json" with { type: 'json' };
import AccountsPaidCodes from "../fields-json/acctPaid_metadata.json" with { type: 'json' };
import FilingRequiredCodes from "../fields-json/filingRQ_codes.json" with { type: 'json' };
import GeocodeStatusCodes from "../fields-json/geocodeStatus_metadata.json" with { type: 'json' };

export {
    SubsectionAndClassificationCodes, 
    NteeCodes, 
    NteeGroups,
    OrganizationCodes,
    PfFilingRequiredCodes, 
    StatusCodes,  
    AffiliationCodes, 
    DeductibilityCodes, 
    CharityFieldsKey, // good
    FoundationCodes,
    AccountsPaidCodes,  // good
    FilingRequiredCodes, // good
    GeocodeStatusCodes
}

export const nteeCodesSet = new Set(NteeCodes.map((item) => item.code));
export const nteeGroupsSet = new Set(NteeGroups.map((item) => item.code));
export const accountPaidSet = new Set(AccountsPaidCodes.map((item) => item.code));
export const subsectionSet = new Set(SubsectionAndClassificationCodes.map((item) => item.subsection));
export const classificationSet = new Set(SubsectionAndClassificationCodes.map((item) => item.classification));
export const pfFilingSet = new Set(PfFilingRequiredCodes.map((item) => item.code));
export const statusCodeSet = new Set(StatusCodes.map((item) => item.code));
export const organizationSet = new Set(OrganizationCodes.map((item) => item.code));
export const affiliationSet = new Set(AffiliationCodes.map((item) => item.code));
export const deductibilitySet = new Set(DeductibilityCodes.map((item) => item.code));
export const foundationSet = new Set(FoundationCodes.map((item) => item.code));
export const filingRequiredCodesSet = new Set(FilingRequiredCodes.map((item) => item.code));
export const geocodeStatusSet = new Set(GeocodeStatusCodes.map((item) => item.code));