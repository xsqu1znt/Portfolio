"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";
import { motion } from "motion/react";

export default function ShowreelCard({
    src,
    title,
    description,
    date,
    alignment,
    className,
    ...props
}: ComponentProps<"div"> & {
    src?: string;
    title?: string;
    description?: string;
    date?: string;
    alignment?: "left" | "right";
}) {
    return (
        <motion.div
            className={cn(
                "group relative z-10 flex w-full shrink-0 gap-6 transition-all duration-300",
                src ? "h-fit" : "h-28",
                alignment === "right" && "flex-row-reverse",
                className
            )}
            initial="initial"
            whileHover="hovered"
        >
            {src && (
                <img
                    src={src}
                    alt="showreel-card"
                    className="group-hover:outline-foreground-dim max-h-80 w-300 object-cover object-top outline outline-transparent transition-all duration-300 group-hover:outline-offset-8"
                />
            )}

            <div className={cn("flex w-full flex-col overflow-clip", alignment === "right" && "text-right")}>
                <motion.div
                    className={cn(
                        "flex w-full justify-between text-lg font-semibold tracking-tight text-nowrap",
                        alignment === "right" && "flex-row-reverse"
                    )}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <h3 className="font-sans">{title || "LOREM IPSUM"}</h3>

                    <span className="text-foreground-dim font-normal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        ({date || "25/01"})
                    </span>
                </motion.div>
                <motion.p
                    className="text-foreground-dim inline-block font-serif text-xs tracking-wide"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}
                >
                    {description || "LOREM IPSUM DOLOR SIT AMUT."}
                </motion.p>
            </div>
        </motion.div>
    );
}
