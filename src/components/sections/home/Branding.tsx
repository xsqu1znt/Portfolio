"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { RefObject, useRef } from "react";

function BottomBranding({ selfRef }: { selfRef?: RefObject<HTMLDivElement | null> }) {
    const { scrollYProgress } = useScroll({ target: selfRef, offset: ["start end", "end start"] });
    const translateX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

    return (
        <motion.div
            className="pointer-events-none"
            style={{ translateX }}
            // initial={{ opacity: 0 }}
            // whileInView={{ opacity: 1 }}
            // transition={{ duration: 0.3 }}
        >
            <span className="text-foreground-primary/15 font-sans text-6xl font-light text-nowrap uppercase transition-colors duration-300 text-shadow-[12px_12px_2px] text-shadow-black/4">
                Landing Page | Custom Website | UI/UX Design | Copy // Marketing | SEO-Optimization | Maintenance
            </span>
        </motion.div>
    );
}

export default function Branding() {
    const selfRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={selfRef} className="relative flex flex-col justify-center overflow-hidden">
            <BottomBranding selfRef={selfRef} />

            <div className="absolute top-0 left-0 h-full w-[25%] bg-linear-to-r from-black to-transparent" />
            <div className="absolute top-0 right-0 h-full w-[25%] bg-linear-to-l from-black to-transparent" />
        </div>
    );
}
