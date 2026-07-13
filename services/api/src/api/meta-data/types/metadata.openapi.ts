import { registry } from "../../../utils/registry.js";
import { accountsPaidCodesResponseSchema, affiliationCodesResponseSchema, deductibilityCodesResponseSchema, fieldsKeyResponseSchema, filingRequiredCodesResponseSchema, foundationCodesResponseSchema, nteeCodeResponseSchema, nteeGroupCodesResponseSchema, organizationCodesResponseSchema, pfReturnCodesResponseSchema, statusCodesResponseSchema, subsectionAndClassificationCodesResponseSchema } from "./metadata.types.js";

registry.registerPath({
  method: "get",
  path: "/metadata/account-paid-codes",
  summary: "List account paid codes",
  tags: ["Metadata"],
  responses: {
    200: {
      description: "Accounts paid codes",
      content: {
        "application/json": {
          schema: accountsPaidCodesResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/metadata/ntee-codes",
  summary: "List ntee codes",
  tags: ["Metadata"],
  responses: {
    200: {
      description: "Ntee codes",
      content: {
        "application/json": {
          schema: nteeCodeResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/metadata/ntee-groups",
  summary: "List ntee goups",
  tags: ["Metadata"],
  responses: {
    200: {
      description: "Ntee Groups",
      content: {
        "application/json": {
          schema: nteeGroupCodesResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/metadata/subsection-classification-codes",
  summary: "List subsection and classification codes.",
  tags: ["Metadata"],
  responses: {
    200: {
      description: "Recommended to use both subsection and classification together when filtering charities. Many classification codes repeat across subsections and vice versa, but using both in unison produces more accurate results.",
      content: {
        "application/json": {
          schema: subsectionAndClassificationCodesResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/metadata/pf-required-codes",
  summary: "List PF filing required codes",
  tags: ["Metadata"],
  responses: {
    200: {
      description: "List PF filing required codes",
      content: {
        "application/json": {
          schema: pfReturnCodesResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/metadata/organization-codes",
  summary: "List organization codes",
  tags: ["Metadata"],
  responses: {
    200: {
      description: "List of IRS organization codes",
      content: {
        "application/json": {
          schema: organizationCodesResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/metadata/status-codes",
  summary: "List status codes",
  tags: ["Metadata"],
  responses: {
    200: {
      description: "List of IRS status codes",
      content: {
        "application/json": {
          schema: statusCodesResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/metadata/affiliation-codes",
  summary: "List affiliation codes",
  tags: ["Metadata"],
  responses: {
    200: {
      description: "List of IRS affiliation codes",
      content: {
        "application/json": {
          schema: affiliationCodesResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/metadata/deductibility-codes",
  summary: "List deductibility codes",
  tags: ["Metadata"],
  responses: {
    200: {
      description: "List of IRS deductibility codes",
      content: {
        "application/json": {
          schema: deductibilityCodesResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/metadata/charity-key",
  operationId: "getCharityKey",
  summary: "List charity dataset field definitions",
  description: "Returns metadata describing the fields available in the charity dataset, including the field name, human-readable label, and description.",
  tags: ["Metadata"],
  responses: {
    200: {
      description: "Charity dataset field definitions",
      content: {
        "application/json": {
          schema: fieldsKeyResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/metadata/foundation-codes",
  summary: "List foundation codes",
  tags: ["Metadata"],
  responses: {
    200: {
      description: "List of IRS foundation codes",
      content: {
        "application/json": {
          schema: foundationCodesResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/metadata/filing-required-codes",
  summary: "List filing required codes",
  tags: ["Metadata"],
  responses: {
    200: {
      description: "List of IRS filing required codes",
      content: {
        "application/json": {
          schema: filingRequiredCodesResponseSchema,
        },
      },
    },
  },
});