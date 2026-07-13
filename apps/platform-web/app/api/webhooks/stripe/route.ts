import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { handleSubscriptionCreatedOrUpdated, handleSubscriptionDeleted } from "./subscription-actions";
import { getStripe } from "@/lib/actions/stripe";

export async function POST(req: Request) {
    const stripe = getStripe()
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get("stripe-signature");

    if (!signature) {
        return NextResponse.json(
        { error: "Missing Stripe signature" },
        { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error) {
        console.error("Stripe webhook signature verification failed:", error);

        return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 400 }
        );
    }

    switch (event.type) {
        case "customer.subscription.created":
        case "customer.subscription.updated": {
            const subscription = event.data.object as Stripe.Subscription;

            await handleSubscriptionCreatedOrUpdated(subscription);
            break;
        }

        case "customer.subscription.deleted": {
            const subscription = event.data.object as Stripe.Subscription;

            await handleSubscriptionDeleted(subscription);
            break;
        }

        default:
            console.log(`Unhandled Stripe event: ${event.type}`);
            break;
        }

    return NextResponse.json({ received: true });
}