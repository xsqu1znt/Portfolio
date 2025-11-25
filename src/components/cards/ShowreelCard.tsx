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
            className={cn("group flex max-w-[75%] flex-col", alignment === "right" && "text-right", className)}
            style={{
                scale,
                filter,
                opacity
            }}
        >
            <img
                src={src}
                alt="showreel-card"
                // className="group-hover:outline-foreground-dim max-h-80 w-300 object-cover object-top outline outline-transparent transition-all duration-300 group-hover:outline-offset-8"
                className="group-hover:outline-foreground-dim object-cover object-top outline outline-transparent transition-all duration-300 group-hover:outline-offset-8"
            />

            <div className={cn("mt-2 flex justify-between", alignment === "right" && "flex-row-reverse")}>
                <h3 className="font-sans">{title || "LOREM IPSUM"}</h3>

                <span className="text-foreground-dim font-normal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    ({date || "25/01"})
                </span>
            </div>

            <p className="text-foreground-dim inline-block font-serif text-xs leading-relaxed tracking-wide">
                {description || "LOREM IPSUM DOLOR SIT AMUT."}
            </p>

            {/* <div className={cn("flex w-full flex-col overflow-clip", alignment === "right" && "text-right")}>
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
            </div> */}
        </motion.div>
    );
}

/* export default function ShowreelCard({
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
} */
