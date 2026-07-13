
import z from "../../../utils/zod-openapi.js";
import { charityFields } from "../../charity/utils/response-builder.js";

export const nearbyCharityFields = [
  ...charityFields,
  "distance_miles",
] as const;

export type NearbyCharityField = (typeof nearbyCharityFields)[number];

export const NearbyCharityFieldEnum = z.enum(nearbyCharityFields);

export const nearbyFieldsQuerySchema = z.preprocess(
  (val) => {
    if (val == null || val === "") return undefined;

    if (typeof val === "string") {
      return val.split(",").map((s) => s.trim()).filter(Boolean);
    }

    if (Array.isArray(val)) {
      return val
        .map(String)
        .flatMap((s) => s.split(","))
        .map((s) => s.trim())
        .filter(Boolean);
    }

    return val;
  },
  z.array(NearbyCharityFieldEnum).min(1).optional()
);

export const defaultNearbyCharityFields: NearbyCharityField[] = [
  "ein",
  "name",
  "city",
  "ntee_group",
  "lat",
  "lng",
  "distance_miles",
];