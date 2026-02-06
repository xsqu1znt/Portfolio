"use client";

import { easings } from "@/config/motion";
import { styles } from "@/constants/styles";
import { useOrientation } from "@/hooks/useOrientation";
import { cn } from "@/lib/utils";
import { ArrowDown02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLenis } from "lenis/react";
import { motion } from "motion/react";

function HeaderReveal({ initialText, text, className }: { initialText: string; text: string; className?: string }) {
    return (
        <div className={cn("flex items-center", className)}>
            <motion.span
                className="inline-block"
                initial={{ opacity: 0, translateY: "25%" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {initialText}
            </motion.span>
            <motion.span
                className="flex items-center overflow-hidden"
                initial={{ width: 0, opacity: 0, borderTopRightRadius: "2rem", borderBottomRightRadius: "2rem" }}
                animate={{ width: "auto", opacity: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: easings.fluidInOut }}
            >
                <span className="whitespace-nowrap">{text}</span>
            </motion.span>
        </div>
    );
}

function HeaderRevealFontHover({ initialText, text, className }: { initialText: string; text: string; className?: string }) {
    const CharFontHover = ({ char }: { char: string }) => {
        return (
            <motion.span
                initial="initial"
                whileHover="hovered"
                className={cn("relative inline-block select-none *:inline-block", className)}
            >
                {/* <span aria-hidden className="select-none opacity-0">{char}</span> */}
                <motion.span
                    variants={{
                        initial: { opacity: 1, scaleX: "100%" },
                        hovered: { opacity: 0, scaleX: "0%" }
                    }}
                    transition={{ delay: 0.025, duration: 0.15, ease: "circInOut" }}
                >
                    {char}
                </motion.span>
                <motion.span
                    className="font-special absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold"
                    variants={{
                        initial: { opacity: 0, scaleX: "0%" },
                        hovered: { opacity: 1, scaleX: "100%", color: "var(--accent)" }
                    }}
                    transition={{ delay: 0.025, duration: 0.15, ease: "circInOut" }}
                >
                    {char}
                </motion.span>
            </motion.span>
        );
    };

    return (
        <div className={cn("flex items-center", className)}>
            <motion.span
                className="inline-block"
                initial={{ opacity: 0, translateY: "25%" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <CharFontHover char={initialText} />
            </motion.span>
            <motion.div
                className="flex items-center overflow-hidden"
                initial={{ width: 0, opacity: 0, borderTopRightRadius: "2rem", borderBottomRightRadius: "2rem" }}
                animate={{ width: "auto", opacity: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                transition={{ delay: 0.5, duration: 1, ease: easings.fluidInOut }}
            >
                <span className="flex whitespace-nowrap">
                    {text.split(" ").map((word, idx) => (
                        <span key={idx} className="mr-4 flex">
                            {word.split("").map((char, idx) => (
                                <CharFontHover key={idx} char={char} />
                            ))}
                        </span>
                    ))}
                </span>
            </motion.div>
        </div>
    );
}

export default function Hero() {
    const lenis = useLenis();
    const { isLandscape } = useOrientation();

    const scrollToWork = () => {
        lenis?.scrollTo("#work", { duration: 2 });
    };

    return (
        <section
            id="home"
            className={cn(
                "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden",
                styles.padding.section
            )}
        >
            {/* Header */}
            <div
                className={cn(
                    "relative z-10 flex flex-col font-sans text-nowrap md:mt-0",
                    isLandscape ? "-mt-12" : "-mt-32"
                )}
            >
                {/* Header/Mobile */}
                <HeaderReveal
                    initialText="G"
                    text="UNIQUE G."
                    className="text-6xl font-semibold tracking-tighter md:hidden"
                />

                {/* Header/Desktop */}
                <HeaderRevealFontHover
                    initialText="G"
                    text="UNIQUE G."
                    className="hidden text-8xl font-semibold tracking-tighter md:flex"
                />

                {/* Subheader */}
                <motion.div
                    className="absolute bottom-1 left-0 ml-1 translate-y-full text-lg tracking-tight md:text-xl"
                    initial={{ opacity: 0, translateX: "10%" }}
                    animate={{ opacity: 1, translateX: 0 }}
                    transition={{ delay: 0.5, duration: 1.25, ease: easings.fluidInOut }}
                >
                    <span className="text-foreground-dim">
                        <span className="text-accent">WEB</span> DEVELOPER | DESIGNER
                    </span>
                </motion.div>
            </div>

            {/* Bottom-Left */}
            <motion.div
                className="absolute bottom-12 left-4 text-xs tracking-wide md:left-8 md:text-base md:tracking-normal"
                initial={{ opacity: 0, translateX: "-100%" }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: easings.fluidInOut }}
            >
                I WORK WITH <br className="md:hidden" /> STARTUPS & CREATORS
            </motion.div>

            {/* Bottom-Right */}
            <motion.div
                className="absolute right-4 bottom-12 text-right text-xs md:right-8 md:text-base md:tracking-normal"
                initial={{ opacity: 0, translateX: "100%" }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: easings.fluidInOut }}
            >
                FOUNDER // <span className="text-accent">OCTAVELABS</span>
            </motion.div>

            {/* Divider */}
            <div className={cn("absolute bottom-10 left-0 flex w-full justify-center py-0", styles.padding.section)}>
                <motion.div
                    className="h-px bg-linear-to-r from-white/5 from-1% via-white/25 to-white/5 to-99%"
                    initial={{ opacity: 0.5, width: "1%" }}
                    animate={{ opacity: 1, width: "100%" }}
                    transition={{ delay: 0.5, duration: 1, ease: easings.fluidInOut }}
                />
            </div>

            {/* Middle - Button/Scroll to work */}
            <motion.button
                className="group absolute bottom-3 left-1/2 flex -translate-x-1/2 cursor-pointer items-center gap-1 md:bottom-2.5"
                initial={{ opacity: 0, translateY: "200%" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: easings.fluidInOut }}
                onClick={scrollToWork}
            >
                <span className="text-xs tracking-wide transition-opacity duration-300 group-hover:opacity-75 md:text-base md:tracking-normal">
                    VIEW WORK
                </span>
                <HugeiconsIcon
                    icon={ArrowDown02Icon}
                    strokeWidth={2.5}
                    color="currentColor"
                    className="text-accent-secondary -mr-1 size-4 transition-transform duration-300 group-hover:translate-y-0.5 md:size-4.5"
                />
            </motion.button>
        </section>
    );
}
