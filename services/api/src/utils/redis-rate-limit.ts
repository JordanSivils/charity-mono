import { getRedisClient } from "../config/redis.js";
import {  getUtcDayKeyAndTtl } from "./dates.js";

export const setRateLimits = async (
  userId: string,
) => {
  const { utcDateKey, secondsTillMidnight } = getUtcDayKeyAndTtl()
  const redisClient = await getRedisClient()

  const userIdKey = `rl:day:user:${userId}:${utcDateKey}`

  const used = await redisClient.incr(userIdKey)

  if (used === 1) {
    await redisClient.expire(userIdKey, secondsTillMidnight)
  }

  const timeRemaining = await redisClient.ttl(userIdKey)


  return { used, timeRemaining }
}

const burstLimits = {
  DEV: { max: 10, window: 10},
  LIVE: { max: 30, window: 10}
} as const


function buildBurstRateLimitKey(apiKeyId: string, environment: string, windowKey: number) {
  return `rl:burst:key:${environment}:${apiKeyId}:${windowKey}`
}


export const setBurstRateLimit = async (
  apiKeyId: string,
  environment: "DEV" | "LIVE"
) => {
  const redisClient = await getRedisClient()

  const config = burstLimits[environment]
  const windowKey = Math.floor(Date.now() / (config.window * 1000))

  const burstKey = buildBurstRateLimitKey(apiKeyId, environment, windowKey)

  const used = await redisClient.incr(burstKey)

  if (used === 1) {
    await redisClient.expire(burstKey, config.window)
  }

  const timeRemaining = await redisClient.ttl(burstKey)

  return {
    used,
    limit: config.max,
    timeRemaining,
  }
}