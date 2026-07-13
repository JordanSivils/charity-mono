import { Request, Response } from "express"
import { AccountsPaidCodes, AffiliationCodes, CharityFieldsKey, DeductibilityCodes, FilingRequiredCodes, FoundationCodes, GeocodeStatusCodes, NteeCodes, NteeGroups, OrganizationCodes, PfFilingRequiredCodes, StatusCodes, SubsectionAndClassificationCodes } from "./utils/exportMeta.js"

export const getNteeCodes = (_req: Request, res: Response) => {
    res.status(200).json({
        nteeCodes: NteeCodes
    })
}

export const getNteeGroups = (_req: Request, res: Response) => {
    res.status(200).json({
        nteeGroups: NteeGroups
    })
}

export const getSubsesctionClassifiactionCodes = (_req: Request, res: Response) => {
    res.status(200).json({
        subsectionAndClassificationCodes: SubsectionAndClassificationCodes
    })
}

export const getPfRequiredCodes = (_req: Request, res: Response) => {
    res.status(200).json({
        pfFilingRequiredCodes: PfFilingRequiredCodes
    })
}

export const getOrganizationCodes = (_req: Request, res: Response) => {
    res.status(200).json({
        organizationCodes: OrganizationCodes
    })
}

export const getStatusCodes = (_req: Request, res: Response) => {
    res.status(200).json({
        statusCodes: StatusCodes
    })
}

export const getAffiliationCodes = (_req: Request, res: Response) => {
    res.status(200).json({
        affiliationCodes: AffiliationCodes
    })
}

export const getDeductibilityCodes = (_req: Request, res: Response) => {
    res.status(200).json({
        deductibilityCodes: DeductibilityCodes
    })
}

export const getCharityKey = (_req: Request, res: Response) => {
    res.status(200).json({
        charityKey: CharityFieldsKey
    })
}

export const getFoundationCodes = (_req: Request, res: Response) => {
    res.status(200).json({
        foundationCodes: FoundationCodes
    })
}

export const getAccountsPaidCodes = (_req: Request, res: Response) => {
    res.status(200).json({
        accountsPaidCodes: AccountsPaidCodes
    })
}

export const getFilingReqCodes = (_req: Request, res: Response) => {
    res.status(200).json({
        filingRequiredCodes: FilingRequiredCodes
    })
}

export const getGeocodeStatusCodes = (_req: Request, res: Response) => {
    res.status(200).json({
        geocodeStatusCodes: GeocodeStatusCodes
    })
}