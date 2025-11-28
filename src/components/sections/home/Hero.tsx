"use client";

import { easings } from "@/config/motion";
import { styles } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";

function StaggerClipRevealText({
    className,
    text,
    letterSpacing,
    wordSpacing,
    stagger,
    duration,
    initialDelay
}: {
    className?: string;
    text: string;
    letterSpacing?: string;
    /** @default 1.5rem */
    wordSpacing?: string;
    /** @default 0.05*/
    stagger?: number;
    /** @default 0.3 */
    duration?: number;
    initialDelay?: number;
}) {
    const words = text.split(" ");
    const chars = words.map(w => w.split(""));
    let charIndex = 0;

    return (
        <div className={cn("flex w-fit overflow-clip", className)}>
            {chars.map((group, idx) => {
                return (
                    <div
                        key={idx}
                        className="flex"
                        style={{ marginRight: idx !== chars.length - 1 ? (wordSpacing ?? "1rem") : undefined }}
                    >
                        {group.map((char, idx2) => {
                            const div = (
                                <div
                                    key={idx2}
                                    className="relative select-none"
                                    style={{ marginRight: idx2 !== group.length ? letterSpacing : undefined }}
                                >
                                    <span className="pointer-events-none w-fit opacity-0">{char}</span>
                                    <motion.div initial="initial" whileHover="hovered">
                                        <motion.span
                                            className="absolute inset-0 inline-block w-fit"
                                            variants={{
                                                initial: { opacity: 1, scaleX: "100%" },
                                                hovered: { opacity: 0, scaleX: "0%" }
                                            }}
                                            transition={{ delay: 0.025, duration: 0.15, ease: "circInOut" }}
                                        >
                                            {char}
                                        </motion.span>
                                        <motion.span
                                            className="font-special absolute top-1/2 left-1/2 inline-block -translate-x-1/2 -translate-y-1/2 font-bold"
                                            variants={{
                                                initial: { opacity: 0, scaleX: "0%" },
                                                hovered: { opacity: 1, scaleX: "100%", color: "var(--accent)" }
                                            }}
                                            transition={{ delay: 0.025, duration: 0.15, ease: "circInOut" }}
                                        >
                                            {char}
                                        </motion.span>
                                    </motion.div>
                                </div>
                            );

                            charIndex++;
                            return div;
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default function Hero() {
    const lenis = useLenis();

    const scrollToWork = () => {
        lenis?.scrollTo("#work", { duration: 2 });
    };

    return (
        <section
            id="home"
            className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden ${styles.padding.section}`}
        >
            {/* Header */}
            <motion.div
                className="flex flex-col-reverse overflow-clip font-sans text-8xl font-semibold tracking-tighter text-nowrap select-none"
                initial={{ width: 76, borderTopRightRadius: "1.75rem", borderBottomRightRadius: "1.75rem" }}
                animate={{ width: 516, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                transition={{ delay: 0.25, duration: 1, ease: easings.fluidInOut }}
            >
                <div className="text-foreground-dim ml-1 overflow-clip text-xl tracking-tight">
                    <motion.span
                        className="inline-block"
                        initial={{ opacity: 0, translateX: "10%" }}
                        animate={{ opacity: 1, translateX: 0 }}
                        transition={{ delay: 0.25, duration: 1.25, ease: easings.fluidInOut }}
                    >
                        <span className="text-accent">WEB</span> DEVELOPER | DESIGNER
                    </motion.span>
                </div>
                <motion.div
                    className="w-fit"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                    <StaggerClipRevealText duration={0.5} text="GUNIQUE G." />
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute bottom-12 left-4 md:left-8"
                initial={{ opacity: 0, translateX: "-100%" }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: easings.fluidInOut }}
            >
                I WORK WITH STARTUPS & CREATORS
            </motion.div>

            <motion.button
                className="group absolute bottom-2.5 left-1/2 flex -translate-x-1/2 cursor-pointer gap-1"
                initial={{ opacity: 0, translateY: "200%" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: easings.fluidInOut }}
                onClick={scrollToWork}
            >
                <span className="group-hover:opacity-75 transition-opacity duration-300">VIEW WORK</span>
                <ArrowDown className="w-4 stroke-icon-active transition-transform duration-300 group-hover:translate-y-0.5" />
            </motion.button>

            <motion.div
                className="absolute right-4 bottom-12 md:right-8"
                initial={{ opacity: 0, translateX: "100%" }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: easings.fluidInOut }}
            >
                FOUNDER // <span className="text-accent">OCTAVELABS</span>
            </motion.div>

            <motion.div
                className="absolute bottom-10 h-px bg-linear-to-r from-white/5 from-1% via-white/25 to-white/5 to-99%"
                initial={{ opacity: 0.5, width: 0 }}
                animate={{ opacity: 1, width: "96%" }}
                transition={{ delay: 0.25, duration: 1, ease: easings.fluidInOut }}
            />
        </section>
    );
}
