"use client";

import { createBillingPortalSession } from "@/lib/actions/stripe/billing-portal";


export function ManageBillingButton() {
  return (
    <button onClick={() => createBillingPortalSession()}>
      Manage Billing
    </button>
  );
}