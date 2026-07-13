import { Request, Response, NextFunction } from "express";
import { getNearbyCharities } from "./nearby.repository.js";
import { toCharityDto } from "./utils/nearby.dto.js";

export async function getNearbyCharitiesHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const q = req.nearbyQuery!

    const { charities, total, origin } = await getNearbyCharities(q);

    const totalPages = Math.ceil(total / q.limit);
    const fields = q.fields as string[] | undefined;
    
    res.status(200).json({
      page: q.page,
      limit: q.limit,
      total,
      totalPages,
      next: q.page < totalPages ? q.page + 1 : null,
      prev: q.page > 1 ? q.page - 1 : null,
      origin,
      charities: charities.map((charity) => toCharityDto(charity, fields)),
    });
  } catch (err) {
    console.error("NEARBY ROUTE ERROR:", err);
    next(err);
  }
}