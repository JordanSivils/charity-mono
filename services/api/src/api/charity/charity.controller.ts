import { NextFunction, Request, Response } from "express";
import { singleCharityQuerySchema } from "./types/charity.request.types.js";
import { getAllCharities, getCharityByEin } from "./charity.repository.js";
import { ApiError } from "../../middleware/error-handler.middleware.js";
import { toCharityDto } from "./utils/charity.dto.js";
import { resolveSelectedFields } from "./utils/response-builder.js";

export const getAllCharitiesHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const q = req.charityQuery!
        const { charities, total } = await getAllCharities(q);

        const selectedFields = resolveSelectedFields(q.fields)

        const charityDtos = charities.map((charity) => toCharityDto(charity, selectedFields));

        const page = q.page;
        const limit = q.limit;
        const totalPages = Math.ceil(total / limit);
        return res.status(200).json({
            page,
            limit,
            total,
            totalPages,
            next: page < totalPages ? page + 1 : null,
            prev: page > 1 ? page - 1 : null,
            charities: charityDtos,
        })
    } catch (error) {
        return next(error)   
    }
}

type EinParams = {
  ein: string;
};

export const getCharityByEinHandler = async (req: Request<EinParams>, res: Response, next: NextFunction) => {
    try {
        const q = singleCharityQuerySchema.parse(req.query);
        const ein = req.params.ein

        if (!ein) {
            throw new ApiError(401, "not_found", "Missing required param")
        }

        const charity = await getCharityByEin(ein, q)

        if (!charity) {
            throw new ApiError(404, "not_found", "There is no charity by that ein")
        }

        const selectedFields = resolveSelectedFields(q.fields)

        const charityDto = toCharityDto(charity, selectedFields)

        return res.status(200).json({ charity: charityDto })
    } catch (error) {
        return next(error)
    }
}
