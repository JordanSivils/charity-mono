import { prisma } from "../../../config/prisma.js";
import { ApiError } from "../../../middleware/error-handler.middleware.js";
import { NearbyCharityQuery } from "../types/nearby.request.types.js";

type NearbyOrigin = {
  lat: number;
  lng: number;
  source: "coordinates" | "zip";
};

export async function resolveNearbyOrigin(q: NearbyCharityQuery): Promise<NearbyOrigin> {
  if (q.lat !== undefined && q.lng !== undefined) {
    return {
      lat: q.lat,
      lng: q.lng,
      source: "coordinates",
    };
  }

  if (!q.origin_zip) {
    throw new Error("Provide either zip or both lat and lng");
  }

  const zipOrigin = await prisma.fallbackGeocodes.findFirst({
    where: {
      zip: q.origin_zip,
    },
    select: {
      lat: true,
      lng: true,
    },
  });

  if (!zipOrigin) {
    throw new ApiError(400, "invalid_origin_zip", `No coordinates found for that origin_zip`);
  }

  return {
    lat: Number(zipOrigin.lat),
    lng: Number(zipOrigin.lng),
    source: "zip",
  };
}