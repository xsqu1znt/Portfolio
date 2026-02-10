"use client";

import { easings } from "@/config/motion";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import { memo, useRef } from "react";

// ShowreelCard remains the same as the previous optimized version
const ShowreelCard = memo(
    ({
        src,
        href,
        github,
        title,
        description,
        date,
        alignment,
        className,
        innerRef,
        style
    }: {
        src: string;
        href?: string;
        github?: string;
        title?: string;
        description?: string;
        date?: string;
        alignment?: "left" | "right";
        className?: string;
        innerRef?: React.RefObject<HTMLDivElement | null>;
        style?: React.CSSProperties;
    }) => {
        const cardRef = useRef<HTMLDivElement>(null);
        const targetRef = innerRef || cardRef;

        const { scrollYProgress } = useScroll({
            target: targetRef,
            offset: ["start end", "end start"]
        });

        const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.9]);
        const filter = useTransform(scrollYProgress, [0.8, 0.95], ["blur(0px)", "blur(4px)"]);
        const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

        return (
            <motion.div
                ref={targetRef}
                className={cn(
                    "group flex w-full flex-col will-change-[transform,opacity,filter] md:max-w-[75%]",
                    alignment === "right" && "text-right md:ml-auto",
                    className
                )}
                style={{ ...style, scale, filter, opacity }}
            >
                <img
                    src={src}
                    alt={title}
                    loading="lazy"
                    className="group-hover:border-foreground-dim relative z-0 w-full rounded-md border-2 border-transparent object-cover object-top transition-all duration-300 group-hover:scale-101"
                />

                <div
                    className={cn(
                        "mt-4 flex justify-between text-sm md:text-base",
                        alignment === "right" && "flex-row-reverse"
                    )}
                >
                    <h3 className="inline-block font-sans font-medium tracking-tight whitespace-nowrap uppercase">
                        {title}
                    </h3>

                    <div
                        className={cn(
                            "text-foreground-dim flex items-center gap-2 font-normal opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                            alignment === "right" && "flex-row-reverse"
                        )}
                    >
                        {github && (
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground-primary transition-colors duration-300"
                            >
                                [ Github ]
                            </a>
                        )}
                        {href && (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground-primary transition-colors duration-300"
                            >
                                [ Live Demo ]
                            </a>
                        )}
                        <span>({date})</span>
                    </div>
                </div>
                <p className="text-foreground-dim mt-1 font-serif text-[0.7rem] leading-relaxed tracking-wide md:text-xs">
                    {description}
                </p>
            </motion.div>
        );
    }
);

export default function FeaturedWork() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const firstCardRef = useRef<HTMLDivElement>(null);

    // 1. Initial Fade (Behind first card)
    const { scrollYProgress: firstCardScroll } = useScroll({
        target: firstCardRef,
        offset: ["start 50%", "start 33%"]
    });

    // 2. PRE-EXIT FADE (This is the fix)
    // We target the section, but trigger the end early.
    // ["end 80%", "end 50%"] means it will be fully gone
    // when the bottom of the section is still 50% from the top.
    const { scrollYProgress: exitScroll } = useScroll({
        target: sectionRef,
        offset: ["end 80%", "end 50%"]
    });

    // Composite Opacity:
    // (1 - v1 * 0.65) handles the dimming to 35%
    // (1 - v2) handles the final 35% -> 0% fade out
    const headerOpacity = useTransform([firstCardScroll, exitScroll], ([v1, v2]: number[]) => (1 - v1 * 0.65) * (1 - v2));

    // Header Blur (0px -> 3px -> Recede)
    const headerBlur = useTransform([firstCardScroll, exitScroll], ([v1, v2]: number[]) => `blur(${v1 * 3 + v2 * 5}px)`);
    const headerScale = useTransform(
        [firstCardScroll, exitScroll],
        ([v1, v2]: number[]) => (1 - v1 * 0.15) * (1 - v2 * 0.1)
    );

    return (
        <section ref={sectionRef} id="work" className="section relative my-32 md:my-72">
            <motion.div
                className="pointer-events-none sticky top-1/3 z-0 flex w-full flex-col items-center justify-center will-change-[transform,opacity]"
                style={{
                    opacity: headerOpacity,
                    filter: headerBlur,
                    scale: headerScale
                }}
            >
                <div className="overflow-hidden">
                    <motion.h2
                        className="font-sans text-4xl font-semibold tracking-tighter md:text-7xl"
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: easings.fluidInOut }}
                    >
                        FEATURED WORK
                    </motion.h2>
                </div>
            </motion.div>

            <div className="relative z-10 mt-[60vh] flex w-full flex-col gap-40 md:gap-80">
                <ShowreelCard
                    innerRef={firstCardRef}
                    src="/featured/featured_avatarList.webp"
                    href="https://guniqueg-concept-avatar-list.vercel.app"
                    github="https://github.com/xsqu1znt/SNIPPET-FluidMorphingAvatarList"
                    title="3 State Avatar Card"
                    description="An avatar card that morphs between 3 states for a fun user experience. Built using React.js, TailwindCSS, and Motion."
                    date="26/01"
                />
                <ShowreelCard
                    src="/featured/featured_businessCard.webp"
                    href="https://guniqueg-concept-business-card.vercel.app"
                    github="https://github.com/xsqu1znt/SNIPPET-OctaveLabsBusinessCard"
                    alignment="right"
                    title="Link-In-Bio Business Card"
                    description="A link-in-bio style business card that links to your socials, and morphs into the landing page of your business. Built using React.js, TailwindCSS, and Motion."
                    date="26/01"
                />
                <ShowreelCard
                    src="/featured/featured_trusteeDashboard.webp"
                    title="Trustee Dashboard"
                    description="A client requested a dashboard for a Discord moderation bot I built for them. Using Next.js and TailwindCSS I built a clean and functional dashboard."
                    date="25/10"
                />
            </div>
        </section>
    );
}
