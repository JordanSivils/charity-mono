import z from "../../../utils/zod-openapi.js";

export const accountsPaidTypes = z.object({
    code: z.string(),
    description: z.string()
})

export const affiliationTypes = z.object({
    code: z.string(),
    label: z.string(),
    description: z.string()
})

export const deductibilityTypes = z.object({
    code: z.string(),
    description: z.string()
})

export const fieldsKeyTypes = z.object({
    field: z.string(),
    label: z.string(),
    description: z.string()
})

export const filingRequiredTypes = z.object({
    code: z.string(),
    form: z.string(),
    description: z.string()
})

export const foundationTypes = z.object({
    code: z.string(),
    description: z.string()
})

export const nteeCodeTypes = z.object({
    code: z.string(),
    description: z.string()
})

export const nteeGroupTypes = z.object({
    code: z.string(),
    description: z.string()
})

export const organizationTypes = z.object({
    code: z.string(),
    description: z.string()
})

export const pfReturnTypes = z.object({
    code: z.string(),
    description: z.string()
})

export const statusTypes = z.object({
    code: z.string(),
    description: z.string()
})

export const subsectionAndClassificationTypes = z.object({
    subsection: z.string(),
    classification: z.string(),
    description: z.string()
})

export const accountsPaidCodesResponseSchema = z.object({ accountsPaidCodes: z.array(accountsPaidTypes) });
export const affiliationCodesResponseSchema = z.object({ affiliationCodes: z.array(affiliationTypes) });
export const deductibilityCodesResponseSchema = z.object({ deductibilityCodes: z.array(deductibilityTypes) });
export const fieldsKeyResponseSchema = z.object({ charityKey: z.array(fieldsKeyTypes) });
export const filingRequiredCodesResponseSchema = z.object({ filingRequiredCodes: z.array(filingRequiredTypes) });
export const foundationCodesResponseSchema = z.object({ foundationCodes: z.array(foundationTypes) });
export const nteeCodeResponseSchema = z.object({ nteeCodes: z.array(nteeCodeTypes) });
export const nteeGroupCodesResponseSchema = z.object({ nteeGroups: z.array(nteeGroupTypes) });
export const organizationCodesResponseSchema = z.object({ organizationCodes: z.array(organizationTypes) });
export const pfReturnCodesResponseSchema = z.object({ pfFilingRequiredCodes: z.array(pfReturnTypes) });
export const statusCodesResponseSchema = z.object({ statusCodes: z.array(statusTypes) });
export const subsectionAndClassificationCodesResponseSchema = z.object({ subsectionAndClassificationCodes: z.array(subsectionAndClassificationTypes) });

