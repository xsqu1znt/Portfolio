"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { ComponentProps, useRef } from "react";

export default function ShowreelCard({
    src,
    title,
    description,
    date,
    alignment,
    className,
    ...props
}: ComponentProps<"div"> & {
    src: string;
    title?: string;
    description?: string;
    date?: string;
    alignment?: "left" | "right";
}) {
    const cardRef = useRef(null);

    // Track scroll progress of this specific card
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.9]);
    const filter = useTransform(scrollYProgress, [0.8, 1], ["blur(0px)", "blur(6px)"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={cardRef}
            className={cn("group flex w-full flex-col md:max-w-[75%]", alignment === "right" && "text-right", className)}
            style={{
                scale,
                filter,
                opacity
            }}
        >
            <img
                src={src}
                alt="showreel-card"
                className="group-hover:outline-foreground-dim rounded-md object-cover object-top outline outline-transparent transition-all duration-300 group-hover:outline-offset-8"
            />

            <div
                className={cn("mt-2 flex justify-between text-sm md:text-base", alignment === "right" && "flex-row-reverse")}
            >
                <h3 className="font-sans">{title || "LOREM IPSUM"}</h3>

                <span className="text-foreground-dim font-normal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    ({date || "25/01"})
                </span>
            </div>

            <p className="text-foreground-dim inline-block font-serif text-[0.7rem] leading-relaxed tracking-wide md:text-xs">
                {description || "LOREM IPSUM DOLOR SIT AMUT."}
            </p>
        </motion.div>
    );
}
