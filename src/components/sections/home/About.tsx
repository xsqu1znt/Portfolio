"use client";

import FitText from "@/components/layout/FitText";
import { useNavContext } from "@/components/provider/NavProvider";
import AnimateNumber from "@/components/ui/AnimateNumber";
import { easings } from "@/config/motion";
import { styles } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, memo, useMemo } from "react";

// 1. Memoized SplitWord to prevent re-renders when parent state changes
const SplitWord = memo(
    ({
        text,
        duration = 0.3,
        stagger = 0.03,
        initialDelay = 0,
        viewMargin,
        className
    }: {
        text: string;
        duration?: number;
        stagger?: number;
        initialDelay?: number;
        viewMargin?: string;
        className?: string;
    }) => {
        // Memoize the word split so it doesn't run on every render
        const words = useMemo(() => text.split(" "), [text]);

        return (
            <div className={cn("overflow-hidden", className)}>
                {words.map((word, wordIndex) => (
                    <motion.span
                        key={`${word}-${wordIndex}`}
                        className="will-change-opacity mr-1 inline-block"
                        viewport={{ margin: viewMargin, once: true }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                            delay: initialDelay + stagger * wordIndex,
                            duration,
                            ease: "easeInOut"
                        }}
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
        );
    }
);
SplitWord.displayName = "SplitWord";

// 2. Memoized Separator
const Separator = memo(() => (
    <motion.div
        className="bg-foreground-dimmer h-px will-change-[width]"
        viewport={{ once: true }}
        initial={{ width: 0 }}
        whileInView={{ width: "auto" }}
        transition={{ delay: 0.3, duration: 0.5, ease: easings.fluidInOut }}
    />
));
Separator.displayName = "Separator";

const NumberRow = memo(({ value, label }: { value: number; label: string }) => (
    <motion.div
        className="grid w-full grid-cols-2 gap-4 py-6 md:gap-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: easings.fluidInOut }}
    >
        <span className="border-foreground-dimmer border-r font-sans text-4xl tracking-tight md:border-r-0 md:text-5xl">
            <AnimateNumber value={value} direction="up" />+
        </span>
        <span className="text-foreground-dim">{label}</span>
    </motion.div>
));
NumberRow.displayName = "NumberRow";

const InfoBlock = memo(({ title, text }: { title: string; text: string }) => (
    <motion.div
        className="grid grid-cols-1 gap-2 py-6 md:grid-cols-2 md:gap-12"
        viewport={{ once: true }}
        initial={{ opacity: 0, y: "-10%" }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easings.fluidInOut }}
    >
        <div className="flex gap-2">
            <span className="text-foreground-dim text-xs tracking-tighter md:inline-block">//</span>
            <span className="text-foreground-dim font-sans text-xl uppercase md:text-2xl">{title}</span>
        </div>
        <p className="leading-relaxed md:tracking-wide">{text}</p>
    </motion.div>
));
InfoBlock.displayName = "InfoBlock";

export default function About() {
    const selfieRef = useRef<HTMLImageElement>(null);

    // Parallax effect for the selfie
    const { scrollYProgress: selfieScroll } = useScroll({
        target: selfieRef,
        offset: ["start end", "end start"]
    });
    const selfiePos = useTransform(selfieScroll, [0, 1], ["0% 0%", "0% 100%"]);

    return (
        <section id="about" className="section light gap-0 bg-white px-0 pt-16 pb-50">
            {/* Header */}
            <div className={`flex h-fit flex-col gap-4 ${styles.padding.section}`}>
                <div className="overflow-hidden font-sans font-black tracking-tight md:w-1/2">
                    <motion.div
                        viewport={{ once: true }}
                        initial={{ opacity: 0, y: "100%" }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                        className="will-change-transform"
                    >
                        <FitText>WHO I AM</FitText>
                    </motion.div>
                </div>

                <Separator />

                <SplitWord
                    text="I’m Gunique — a web developer & designer building functional interfaces, modern branding, and fast, scalable websites for startups & creators."
                    className="text-lg md:max-w-1/2 md:tracking-wide"
                />
            </div>

            {/* Selfie */}
            <div className={`mt-32 flex flex-col items-end ${styles.padding.section}`}>
                <motion.img
                    ref={selfieRef}
                    src="/images/selfie.webp"
                    alt="Me on a cloudy, sunny day."
                    className="max-h-64 w-full -scale-x-100 rounded-md object-cover will-change-[object-position] md:max-h-128 md:w-1/2"
                    loading="lazy"
                    style={{ objectPosition: selfiePos }}
                />

                <SplitWord
                    text="I design and develop custom websites, landing pages, and UI systems that help brands feel modern and communicate clearly. My work blends minimal design with strong structure, tight typography, and high functionality."
                    className="md:w-1/2 md:tracking-wide"
                    stagger={0.01}
                />
            </div>

            {/* Numbers */}
            <div className={`mt-32 grid grid-cols-1 gap-12 py-16 md:grid-cols-2 ${styles.padding.section}`}>
                <div className="font-sans font-semibold">
                    <motion.h3
                        className="hidden text-3xl will-change-[transform,opacity] md:inline-block md:text-8xl"
                        viewport={{ once: true }}
                        initial={{ opacity: 0, x: "-10%" }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    >
                        The numbers don’t lie.
                    </motion.h3>

                    <motion.div
                        className="will-change-[transform,opacity] md:hidden"
                        viewport={{ once: true }}
                        initial={{ opacity: 0, x: -25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    >
                        <FitText>The numbers don’t lie.</FitText>
                    </motion.div>
                </div>

                <div className="divide-foreground-dimmer flex w-full flex-col divide-y">
                    <NumberRow value={5} label="Years working with clients, teams, projects, and making things happen." />
                    <NumberRow
                        value={26}
                        label="Projects launched and remembered. I keep the standards high and the process simple."
                    />
                    <NumberRow
                        value={14}
                        label="Amazing people I’ve worked with. Each project unique, every need fulfilled."
                    />
                </div>
            </div>

            {/* Extra Info */}
            <div className={`divide-foreground-dimmer mt-32 flex flex-col divide-y ${styles.padding.section}`}>
                <InfoBlock
                    title="MY PROCESS"
                    text="I follow a simple process that keeps everything predictable: Research. Wireframes. Design. Development. Launch. Support. Clients always know what stage we’re in and what’s coming next."
                />
                <InfoBlock
                    title="MY EXPERIENCE"
                    text="I’ve spent 5+ years freelancing, building trust, relationships, and projects across websites, bots, and custom tools. I handle both design and development, so projects stay consistent from start to finish."
                />
            </div>
        </section>
    );
}
