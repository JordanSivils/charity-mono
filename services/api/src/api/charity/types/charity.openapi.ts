import { registry } from "../../../utils/registry.js";
import { charityQuerySchema, singleCharityQuerySchema } from "./charity.request.types.js";
import { charityListResponseSchema, singleCharityParamsSchema, singleCharityResponseSchema } from "./charity.response.schema.js";

registry.registerPath({
  method: "get",
  path: "/charities",
  operationId: "getCharities",
  summary: "List charities",
  description: "Returns charities matching the provided filters. Use the fields query parameter to request a subset of available public response fields for each charity record.",
  tags: ["Charities"],
  request: {
    query: charityQuerySchema,
  },
  responses: {
    200: {
      description: "Paginated list of charities",
      content: {
        "application/json": {
          schema: charityListResponseSchema,
        },
      },
    },
  },
});
// comment
registry.registerPath({
  method: "get",
  path: "/charities/{ein}",
  operationId: "getCharityByEin",
  summary: "Get charity by EIN",
  description: "Returns a single charity by EIN. Use the fields query parameter to request a subset of available public response fields for the charity record.",
  tags: ["Charities"],
  request: {
    params: singleCharityParamsSchema,
    query: singleCharityQuerySchema,
  },
  responses: {
    200: {
      description: "Single charity record",
      content: {
        "application/json": {
          schema: singleCharityResponseSchema,
        },
      },
    },
  },
});