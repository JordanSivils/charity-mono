import { registry } from "../../../utils/registry.js";
import { nearbyCharityQuerySchema } from "./nearby.request.types.js";
import { nearbyCharityListResponseSchema } from "./nearby.response.types.js";

registry.registerPath({
  method: "get",
  path: "/nearby",
  operationId: "getNearbyCharities",
  summary: "List charities within a radius",
description:
  "Returns charities within a specified radius based on latitude/longitude or origin ZIP code. Supports filtering and field selection via query parameters.",
  tags: ["Charities", "Nearby"],
  request: {
    query: nearbyCharityQuerySchema,
  },
  responses: {
    200: {
      description: "Paginated list of charities",
      content: {
        "application/json": {
          schema: nearbyCharityListResponseSchema,
        },
      },
    },
  },
});