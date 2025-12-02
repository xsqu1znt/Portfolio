"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import { ComponentProps, useRef } from "react";

interface VelocityMarqueeProps {
    children: React.ReactNode;
    baseVelocity: number;
    className?: string;
}

interface MarqueeItemProps {
    text: string;
    className?: string;
}

// Wraps a number between min and max
const wrap = (min: number, max: number, v: number): number => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function VelocityMarquee({
    children,
    baseVelocity = 100, // Negative for left, Positive for right
    className
}: VelocityMarqueeProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    /**
     * We duplicate the content 4 times to ensure no gaps.
     * We wrap the x position between -20% and -45%.
     * This creates the infinite loop effect.
     */
    const x = useTransform(baseX, v => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * Change direction based on scroll velocity polarity.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className={cn("flex flex-nowrap overflow-hidden whitespace-nowrap select-none", className)}>
            <motion.div className="flex flex-nowrap gap-4" style={{ x }}>
                {/* Render children multiple times to ensure seamless looping */}
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}

export const MarqueeItem: React.FC<MarqueeItemProps> = ({ text, className }) => (
    <span className={cn("mx-4", className)}>{text}</span>
);
