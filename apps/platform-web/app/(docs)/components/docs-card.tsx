"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"

interface DocsCardTypes {
    cardTitle: string
    cardDescription?: ReactNode
    children: ReactNode
    className?: string
}
export function DocsCard({
    cardTitle,
    cardDescription,
    children,
    className
}: DocsCardTypes) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{cardTitle}</CardTitle>
                {cardDescription && (
                    <CardDescription>{cardDescription}</CardDescription>
                )}
            </CardHeader>
            <CardContent className={className ?? "flex flex-col gap-3"}>
                {children}
            </CardContent>
        </Card>
    )
}