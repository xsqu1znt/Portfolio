"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";

export default function ShowreelCard({ src, className, ...props }: ComponentProps<"div"> & { src?: string }) {
    return (
        <div
            {...props}
            className={cn(
                "relative w-48 shrink-0 rounded-md border border-white/5 bg-white/5",
                src ? "h-fit" : "h-28",
                className
            )}
        >
            {src && (
                <Image
                    src={src}
                    alt="showreel-card"
                    width={256}
                    height={256}
                    className="max-h-64 w-full rounded-md object-cover object-top"
                />
            )}
        </div>
    );
}
