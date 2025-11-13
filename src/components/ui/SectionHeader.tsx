"use client";

import { cn } from "@/lib/utils";

export default function SectionHeader({
    title,
    description,
    align
}: {
    title: string;
    description: string;
    align?: "left" | "right";
}) {
    return (
        <div className={cn("flex w-full flex-col gap-1", align === "right" && "text-right")}>
            <h2 className="w-full text-2xl font-light tracking-tight">{title}</h2>
            <p className="text-foreground-dim w-full font-light tracking-wide">{description}</p>
        </div>
    );
}
