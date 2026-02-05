import { cn } from "@/lib/utils";
import { motion, Transition, Variants, HTMLMotionProps } from "motion/react";

interface Props extends HTMLMotionProps<"div"> {
    $text: string;
    /** @defaultValue "1.2rem" */
    $lineHeight?: string;
    /** @defaultValue 0.01 */
    $stagger?: number;
    $hoveredVariant?: Variants["hovered"];
    $tappedVariant?: Variants["tapped"];
}

const SPRING_TRANSITION: Transition = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

export function StaggerText({
    $text,
    $lineHeight = "1.2rem",
    $stagger = 0.01,
    $hoveredVariant,
    $tappedVariant,
    className,
    ...rest
}: Props) {
    // Variants for the parent to control children
    const containerVariants: Variants = {
        initial: {},
        hovered: {
            transition: {
                staggerChildren: $stagger
            }
        },
        tapped: {}
    };

    const childVariants: Variants = {
        initial: { y: 0 },
        hovered: {
            y: "-100%",
            transition: SPRING_TRANSITION,
            ...$hoveredVariant
        },
        tapped: $tappedVariant ? $tappedVariant : {}
    };

    return (
        <motion.div
            initial="initial"
            whileHover="hovered"
            whileTap="tapped"
            variants={containerVariants}
            className={cn("relative h-fit w-fit overflow-hidden", className)}
            style={{ lineHeight: $lineHeight }}
            {...rest}
        >
            {/* Container for the double-text effect */}
            <div className="flex flex-wrap">
                {$text.split("").map((char, i) => (
                    <span
                        key={i}
                        className="relative inline-block overflow-hidden"
                        // If it's a space, we need to give it width
                        style={{ whiteSpace: "pre" }}
                    >
                        {/* Top Layer */}
                        <motion.span variants={childVariants} className="inline-block">
                            {char}
                        </motion.span>

                        {/* Bottom Layer (Absolute) */}
                        <motion.span
                            variants={{
                                initial: { y: "100%" },
                                hovered: { y: 0, transition: SPRING_TRANSITION, ...$hoveredVariant },
                                tapped: $tappedVariant ? $tappedVariant : {}
                            }}
                            className="absolute inset-0 inline-block"
                        >
                            {char}
                        </motion.span>
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
