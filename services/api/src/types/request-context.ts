export type RequestAuthType = "public" | "api_key"



export type RequestContext = {
    requestId: string
     auth: {
        userId?: string
        apiKeyId?: string
        environment?: "DEV" | "LIVE"
        tier?: {
            id: string
            name: string
            dailyLimit: number
            resultLimit: number
            nearbyRadiusMaxMiles: number
            nearbyResultLimit: number
            rpmLimit?: number
        }
    }
    rateLimit?: {
            daily: {
                limit: number
                used: number
                remaining: number
                timeRemaining: number
            }
        }
   
}