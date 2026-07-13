"use client"
import { ReactNode } from "react"

interface DocsTitleSectionTypes {
    title: string
    paragraph: string
}
export function DocsTitleSection({ title, paragraph }: DocsTitleSectionTypes) {
    return (
        <section className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          {title}
        </h1>
        <p className="max-w-3xl ">
          {paragraph}
        </p>
      </section>
    )
}