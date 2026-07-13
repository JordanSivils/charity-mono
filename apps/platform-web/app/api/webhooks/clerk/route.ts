import { headers } from "next/headers"
import { Webhook } from "svix"
import type { WebhookEvent } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/db-export/prisma-client"

export async function POST(req: Request) {
  const secret = process.env.CLERK_WEBHOOK_SECRET

  if (!secret) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET")
  }

  const headerPayload = await headers()
  const svixId = headerPayload.get("svix-id")
  const svixTimestamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json(
      { error: "Missing Svix headers" },
      { status: 400 }
    )
  }

  const body = await req.text()

  let evt: WebhookEvent

  try {
    const wh = new Webhook(secret)
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent
  } catch (error) {
    console.error("Invalid webhook signature", error)
    return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
    )
  }

  if (evt.type === "user.deleted") {
    const clerkUserId = evt.data.id
    console.log("Received user.deleted webhook for Clerk user:", clerkUserId)

    if (clerkUserId) {
      const localUser = await prisma.user.findUnique({
        where: { clerkId: clerkUserId },
        select: { id: true },
      })

      if (localUser) {
        await prisma.$transaction([
          prisma.apiKey.deleteMany({
            where: { userId: localUser.id },
          }),
          prisma.user.delete({
            where: { id: localUser.id },
          }),
        ])
      }
    }
  }

  return NextResponse.json({ success: true })
}