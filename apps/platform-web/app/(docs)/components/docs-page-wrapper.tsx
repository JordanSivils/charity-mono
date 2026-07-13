"use clinet"
import { ReactNode } from "react";

export function DocsPageWrapper({ children }: { children: ReactNode}) {
    return (
        <div className="flex flex-col gap-6 max-w-6xl">
            {children}
        </div>
    )
}