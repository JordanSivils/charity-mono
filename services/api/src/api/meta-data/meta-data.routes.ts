import { Router } from "express";
import { getAccountsPaidCodes, getAffiliationCodes, getCharityKey, getDeductibilityCodes, getFilingReqCodes, getFoundationCodes, getGeocodeStatusCodes, getNteeCodes, getNteeGroups, getOrganizationCodes, getPfRequiredCodes, getStatusCodes, getSubsesctionClassifiactionCodes } from "./meta-data.controller.js";

const router = Router()

router.get("/ntee-codes", getNteeCodes)
router.get("/ntee-groups", getNteeGroups)
router.get("/subsection-classification-codes", getSubsesctionClassifiactionCodes)
router.get("/pf-required-codes", getPfRequiredCodes)
router.get("/organization-codes", getOrganizationCodes)
router.get("/status-codes", getStatusCodes)
router.get("/affiliation-codes", getAffiliationCodes)
router.get("/deductibility-codes", getDeductibilityCodes)
router.get("/charity-key", getCharityKey)
router.get("/foundation-codes", getFoundationCodes)
router.get("/account-paid-codes", getAccountsPaidCodes)
router.get("/filing-required-codes", getFilingReqCodes)
router.get("/geocode-status-codes", getGeocodeStatusCodes)

export default router;