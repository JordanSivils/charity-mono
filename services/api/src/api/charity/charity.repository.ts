import { prisma } from "../../config/prisma.js"
import {  buildCharityWhere } from "./utils/query-builder.js"
import { CharityQuery, SingleCharityQuery } from "./types/charity.request.types.js";
import { buildCharitySelect } from "./utils/response-builder.js";

export const getAllCharities = async (q: CharityQuery) => {
    const where = buildCharityWhere(q);
    const fields = buildCharitySelect(q.fields)
    const skip = (q.page - 1) * q.limit
    const take = q.limit
    const [charities, total] = await Promise.all([
        prisma.charity.findMany({
            where,
            orderBy: {
                [q.sortBy]: q.sortDir
            },
            skip,
            take,
            select: fields
        }),
        prisma.charity.count({ where })
    ])
    return { charities, total }
}

export const getCharityByEin = async (ein: string, q?: SingleCharityQuery) => {
    const fields = buildCharitySelect(q?.fields)
    return prisma.charity.findUnique({
        where: { ein: ein },
        select: fields
    })
}