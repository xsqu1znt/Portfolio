"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { ComponentProps, RefObject, useEffect, useRef, useTransition } from "react";

function StaggerScrollText({
    text,
    containerRef,
    className
}: {
    text: string;
    containerRef?: RefObject<HTMLDivElement | null>;
    className?: string;
}) {
    // 1. Get the scroll progress for the whole container
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "start start"] });

    // Split the text into an array of words
    const words = text.split(" ");
    const wordCount = words.length;

    // Define the stagger configuration
    const STAGGER_AMOUNT = 0.1; // Amount of delay between each word (e.g., 5% of the total scroll)

    return (
        <div className={`flex flex-wrap ${className}`}>
            {words.map((word, i) => {
                // 2. Calculate the start and end of the staggered input range
                const start = i * STAGGER_AMOUNT;
                // Ensure the end point is always 1.0 (or close to it)
                // but doesn't start before the total stagger time.
                const end = 1.0 - (wordCount - 1 - i) * STAGGER_AMOUNT;

                // 3. Create a unique, staggered 'x' transformation for each word
                const x = useTransform(
                    scrollYProgress,
                    // Staggered Input Range (e.g., [0, 1] becomes [0, 1], [0.05, 1.05], [0.1, 1.1]...)
                    // We must clamp the range to [0, 1] for useTransform, so effectively:
                    [start, end],
                    // Output Range (Initial position and Final position)
                    ["25%", "0%"]
                );

                const opacity = useTransform(
                    scrollYProgress,
                    // Staggered Input Range (e.g., [0, 1] becomes [0, 1], [0.05, 1.05], [0.1, 1.1]...)
                    // We must clamp the range to [0, 1] for useTransform, so effectively:
                    [0, 1],
                    // Output Range (Initial position and Final position)
                    [0, 1]
                );

                const blur = useTransform(
                    scrollYProgress,
                    // Staggered Input Range (e.g., [0, 1] becomes [0, 1], [0.05, 1.05], [0.1, 1.1]...)
                    // We must clamp the range to [0, 1] for useTransform, so effectively:
                    [0, 1],
                    // Output Range (Initial position and Final position)
                    ["blur(10px)", "blur(0px)"]
                );

                return (
                    <div key={i} className="mr-4">
                        <motion.span className="inline-block" style={{ x, opacity, filter: blur }}>
                            {word}
                        </motion.span>
                    </div>
                );
            })}
        </div>
    );
}

function HeadingText({ containerRef }: { containerRef?: RefObject<HTMLDivElement | null> }) {
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["0.075 end", "end 0.6"] });

    const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);
    const translateY = useTransform(scrollYProgress, [0, 1.25], [-50, 50]);
    const filter = useTransform(scrollYProgress, [0, 0.8, 1], ["blur(0px)", "blur(0px)", "blur(12px)"]);

    return (
        <motion.div
            className="pointer-events-none sticky top-1/2 flex -translate-y-1/2 flex-col items-center text-center"
            style={{ opacity, translateY }}
        >
            <span className="text-background-primary font-sans text-6xl font-medium tracking-tight transition-colors duration-300 text-shadow-lg">
                Your business deserves attention.
            </span>
        </motion.div>
    );
}

function Background({ containerRef }: { containerRef?: RefObject<HTMLDivElement | null> }) {
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["0.075 end", "end 0.6"] });
    const opacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 0.95], [0, 1, 1, 0]);

    return <motion.div className="bg-accent absolute top-0 left-0 z-[-99] h-full w-full" />;
}

function BottomBranding({ containerRef }: { containerRef?: RefObject<HTMLDivElement | null> }) {
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["0.075 end", "end 0.6"] });
    const opacity = useTransform(scrollYProgress, [0, 0.05, 0.8, 0.9], [0, 1, 1, 0]);
    const translateX = useTransform(scrollYProgress, [0, 1.5], ["10%", "-10%"]);

    return (
        <motion.div
            className="pointer-events-none fixed bottom-0 left-1/2 -z-10 -translate-x-1/2 translate-y-1/2"
            style={{ opacity, translateX }}
        >
            <span className="text-foreground-primary/15 font-sans text-[19vw] font-light text-nowrap transition-colors duration-300 text-shadow-[12px_12px_2px] text-shadow-black/4">
                GUNIQUE GUNIQUE GUNIQUE
            </span>
        </motion.div>
    );
}

function ImageScaleIn({ className, thisRef }: ComponentProps<"img"> & { thisRef?: RefObject<HTMLImageElement | null> }) {
    const { scrollYProgress } = useScroll({ target: thisRef, offset: ["start end", "end start"] });
    const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

    return (
        <motion.img
            src="/images/backgrounds_animated/trustee-1.gif"
            alt="animated background"
            className="rounded-md border border-white/25"
            style={{ scale }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        />
    );
}

export default function Contact_Screen() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imgRef1 = useRef<HTMLImageElement>(null);
    const imgRef2 = useRef<HTMLImageElement>(null);
    const imgRef3 = useRef<HTMLImageElement>(null);

    const switchToLightTheme = () => {
        document.body.classList.add("dark-foreground");
        console.log("switched to light theme");
    };

    const switchToDarkTheme = () => {
        document.body.classList.remove("dark-foreground");
        console.log("switched to dark theme");
    };

    return (
        <div ref={sectionRef} className="section relative items-center">
            <HeadingText containerRef={sectionRef} />

            {/* <div ref={imgRef1} className="mt-[100%] w-1/2 -translate-x-[30%]">
                <ImageScaleIn thisRef={imgRef1} />
            </div>
            <div ref={imgRef2} className="mt-[100%] w-1/2 translate-x-[30%]">
                <ImageScaleIn thisRef={imgRef2} />
            </div>
            <div ref={imgRef3} className="mt-[100%] w-1/2 -translate-x-[30%]">
                <ImageScaleIn thisRef={imgRef3} />
            </div> */}

            {/* Trigger/Theme */}
            {/* <motion.div
                onViewportEnter={switchToLightTheme}
                onViewportLeave={switchToDarkTheme}
                className="pointer-events-none absolute top-[7%] left-0 h-[80%]"
            /> */}

            <Background containerRef={sectionRef} />
            {/* <BottomBranding containerRef={sectionRef} /> */}
        </div>
    );
}
