import { getTiers } from "@/lib/actions/tier/get-tiers";
import { TierTable } from "./components/tier-table";
import { TierForm } from "./components/tier-form";

export async function AdminFetch() {
    const tiers = await getTiers();

    return (
        <div className="flex flex-col gap-4">
            <TierForm />
            <TierTable tiers={tiers} />
        </div>
        
    )
}