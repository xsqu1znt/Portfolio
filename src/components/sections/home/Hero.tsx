"use client";

import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import Image from "next/image";

function StaggerRevealText({
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
        <div className={cn("flex overflow-clip", className)}>
            {chars.map((group, idx) => {
                return (
                    <div key={idx} style={{ marginRight: wordSpacing ?? "1.5rem" }}>
                        {group.map((char, idx2) => {
                            const span = (
                                <motion.span
                                    key={idx2}
                                    className="inline-block"
                                    style={{ marginRight: letterSpacing }}
                                    initial={{ translateY: "100%", opacity: 0 }}
                                    animate={{ translateY: 0, opacity: 1 }}
                                    transition={{
                                        delay: (initialDelay ?? 0) + (stagger ?? 0.05) * charIndex,
                                        duration: duration ?? 0.3,
                                        ease: "easeInOut"
                                    }}
                                >
                                    {char}
                                </motion.span>
                            );

                            charIndex++;
                            return span;
                        })}
                    </div>
                );
            })}
        </div>
    );
}

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
                                            // transition={{ delay: 0.025, type: "spring", damping: 25, stiffness: 500 }}
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
                                            // transition={{ delay: 0.025, type: "spring", damping: 25, stiffness: 500 }}
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
            className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4"
        >
            {/* Header */}
            <motion.div
                className="overflow-clip font-sans text-8xl font-semibold tracking-tighter text-nowrap select-none"
                initial={{ width: 76, borderTopRightRadius: "1.75rem", borderBottomRightRadius: "1.75rem" }}
                animate={{ width: 516, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                transition={{ delay: 0.25, duration: 1, ease: [0.741, 0.002, 0.083, 0.999] }}
                // transition={{ delay: 0.5, type: "spring", damping: 10, stiffness: 50 }}
            >
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
                className="absolute bottom-12 left-4"
                initial={{ opacity: 0, translateX: "-100%" }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: [0.741, 0.002, 0.083, 0.999] }}
            >
                <span className="text-accent">WEB</span> DEVELOPER | DESIGNER
            </motion.div>

            <motion.button
                className="group absolute bottom-2.5 left-1/2 flex -translate-x-1/2 cursor-pointer gap-2"
                initial={{ opacity: 0, translateY: "200%" }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: [0.741, 0.002, 0.083, 0.999] }}
                onClick={scrollToWork}
            >
                <span>VIEW WORK</span>
                <img
                    src="/icons/arrow-right.svg"
                    alt="arrow-right"
                    width={0}
                    height={0}
                    className="w-3 rotate-90 transition-transform duration-300 group-hover:translate-y-1"
                />
            </motion.button>

            <motion.div
                className="absolute right-4 bottom-12"
                initial={{ opacity: 0, translateX: "100%" }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 0.75, duration: 1, ease: [0.741, 0.002, 0.083, 0.999] }}
            >
                FOUNDER // <span className="text-accent">OCTAVELABS</span>
            </motion.div>

            <motion.div
                className="absolute bottom-10 h-px bg-linear-to-r from-white/5 from-1% via-white/25 to-white/5 to-99%"
                initial={{ opacity: 0.5, width: 0 }}
                animate={{ opacity: 1, width: "98%" }}
                transition={{ delay: 0.25, duration: 1, ease: [0.741, 0.002, 0.083, 0.999] }}
            />
        </section>
    );
}

/* export default function Hero() {
    return (
        <section
            id="home"
            className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4"
        >
            <div className="font-sans flex flex-col font-semibold tracking-tighter">
                <div className="flex flex-col items-center gap-2">
                    <StaggerClipRevealText duration={0.5} className="text-8xl font-bold" text="GUNIQUE G" />

                    <div className="flex w-fit flex-col">
                        <motion.span
                            className="inline-block text-4xl"
                            initial={{ opacity: 0, x: "5%" }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                        >
                            <span className="text-accent">WEB</span> DEVELOPER | DESIGNER
                        </motion.span>

                        <motion.span
                            className="text-foreground-dim inline-block w-full text-right font-semibold"
                            initial={{ opacity: 0, y: "-25%" }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.75, duration: 1, ease: "easeInOut" }}
                        >
                            FOUNDER // <span className="text-accent">OCTAVELABS</span>
                        </motion.span>
                    </div>
                </div>
            </div>

            <motion.div
                className="font-sans absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75.5, duration: 1 }}
            >
                <span>VIEW WORK</span>
                <img src="/icons/arrow-right.svg" alt="arrow-right" width={0} height={0} className="w-3.5 rotate-90" />
            </motion.div>
        </section>
    );
} */

// export default function Hero() {
//     return (
//         <section id="top" className="mt-32 w-full px-4">
//             {/* Mobile/Header Typography */}
//             <div className="font-sans flex w-full flex-col gap-3 md:hidden">
//                 <span className="font-sans w-full text-4xl font-semibold">GUNIQUE G.</span>
//                 <div className="flex w-full flex-col items-center justify-center leading-tight tracking-tighter">
//                     <div className="flex w-full items-center justify-end gap-4">
//                         <Image src="/icons/arrow-right.svg" alt="arrow-right" width={0} height={0} className="w-14" />
//                         <span className="text-accent text-right text-7xl font-bold whitespace-nowrap">WEB</span>
//                     </div>
//                     <span className="w-full text-[16cqw] font-bold whitespace-nowrap">DEVELOPER</span>
//                     <span className="w-full text-[16.6cqw] font-bold whitespace-nowrap">| DESIGNER</span>
//                 </div>
//                 <span className="text-foreground-dim w-full text-2xl font-semibold">
//                     FOUNDER // <span className="text-accent">OCTAVELABS</span>
//                 </span>
//             </div>

//             {/* Desktop/Header Typography */}
//             <div className="font-sans hidden w-full flex-col gap-3 md:flex">
//                 <span className="font-sans w-full text-4xl font-semibold">GUNIQUE G.</span>
//                 <div className="flex w-full flex-col items-center justify-center leading-tight tracking-tighter">
//                     <div className="flex w-full items-center gap-4">
//                         <Image src="/icons/arrow-right.svg" alt="arrow-right" width={0} height={0} className="w-14" />
//                         <span className="text-accent text-6xl font-bold whitespace-nowrap">WEB</span>
//                     </div>
//                     <span className="w-full text-6xl font-bold whitespace-nowrap">DEVELOPER | DESIGNER</span>
//                 </div>
//                 <span className="text-foreground-dim w-full text-2xl font-semibold">
//                     FOUNDER // <span className="text-accent">OCTAVELABS</span>
//                 </span>
//             </div>

//             {/* Placeholder Graphic */}
//             <div className="mt-20 flex h-full w-full flex-col gap-6">
//                 <Image
//                     src="/images/placeholder-graphic.jpg"
//                     alt="placeholder-graphic"
//                     width={0}
//                     height={0}
//                     sizes="100vw"
//                     className="h-14 w-full rounded-md object-cover object-[0_95%]"
//                 />
//                 <Image
//                     src="/images/placeholder-graphic.jpg"
//                     alt="placeholder-graphic"
//                     width={0}
//                     height={0}
//                     sizes="100vw"
//                     className="h-14 w-full rounded-md object-cover object-top"
//                 />
//                 <Image
//                     src="/images/placeholder-graphic.jpg"
//                     alt="placeholder-graphic"
//                     width={0}
//                     height={0}
//                     sizes="100vw"
//                     className="h-14 w-full rounded-md object-cover object-[0_50%]"
//                 />
//                 <Image
//                     src="/images/placeholder-graphic.jpg"
//                     alt="placeholder-graphic"
//                     width={0}
//                     height={0}
//                     sizes="100vw"
//                     className="h-14 w-full rounded-md object-cover object-bottom"
//                 />
//             </div>
//         </section>
//     );
//}
