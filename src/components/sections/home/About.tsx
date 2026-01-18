"use client";

import FitText from "@/components/layout/FitText";
import { useNavContext } from "@/components/provider/NavProvider";
import AnimateNumber from "@/components/ui/AnimateNumber";
import { easings } from "@/config/motion";
import { styles } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function SplitWord({
    text,
    duration,
    stagger,
    initialDelay,
    viewMargin,
    className
}: {
    text: string;
    duration?: number;
    stagger?: number;
    initialDelay?: number;
    viewMargin?: string;
    className?: string;
}) {
    const words = text.split(" ");

    return (
        <div className={cn("overflow-hidden", className)}>
            {words.map((word, wordIndex) => {
                return (
                    <motion.span
                        key={wordIndex}
                        className="mr-1 inline-block"
                        viewport={{ margin: viewMargin, once: true }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                            delay: (initialDelay ?? 0) + (stagger ? stagger * wordIndex : 0),
                            duration,
                            ease: "easeInOut"
                        }}
                    >
                        {word}
                    </motion.span>
                );
            })}
        </div>
    );
}

function Separator() {
    return (
        <motion.div
            className="bg-foreground-dimmer h-px"
            viewport={{ once: true }}
            initial={{ width: 0 }}
            whileInView={{ width: "auto" }}
            transition={{ delay: 0.3, duration: 0.5, ease: easings.fluidInOut }}
        />
    );
}

export default function About() {
    const { setNavDarkMode } = useNavContext();
    const sectionRef = useRef<HTMLDivElement>(null);
    const selfieRef = useRef<HTMLImageElement>(null);

    const { scrollYProgress: darkModeScrollProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // 2. Listen to changes. If progress is between 0 and 1, we are within the target area.
    useMotionValueEvent(darkModeScrollProgress, "change", latest => {
        if (latest > 0 && latest < 1) {
            setNavDarkMode(true);
        } else {
            setNavDarkMode(false);
        }
    });

    const { scrollYProgress: sectionScrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });

    const sectionScale = useTransform(sectionScrollYProgress, [0, 1], [0.9, 1]);
    const sectionBorderRadius = useTransform(sectionScrollYProgress, [0, 1], ["3rem", "0rem"]);

    const { scrollYProgress } = useScroll({
        target: selfieRef,
        offset: ["start end", "end start"]
    });

    const selfie_objectPosition = useTransform(scrollYProgress, [0, 1], ["0% 0%", "0% 100%"]);

    return (
        <motion.section
            ref={sectionRef}
            id="about"
            className="section light bg-white gap-0 px-0 pt-16 pb-50"
            style={{
                scale: sectionScale,
                borderTopLeftRadius: sectionBorderRadius,
                borderTopRightRadius: sectionBorderRadius
            }}
        >
            {/* Header */}
            <div className={`flex h-fit flex-col gap-4 ${styles.padding.section}`}>
                {/* Heading */}
                <div className="overflow-hidden font-sans font-black tracking-tight md:w-1/2">
                    <motion.div
                        viewport={{ once: true }}
                        initial={{ opacity: 0, translateY: "100%" }}
                        whileInView={{ opacity: 1, translateY: 0 }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    >
                        <FitText>WHO I AM</FitText>
                    </motion.div>
                </div>

                {/* Separator */}
                <Separator />

                {/* Paragraph */}
                <SplitWord
                    text="I’m Gunique — a web developer & designer building functional interfaces, modern branding, and fast, scalable websites for startups & creators."
                    className="text-lg md:max-w-1/2 md:tracking-wide"
                    duration={0.3}
                    stagger={0.03}
                />
            </div>

            {/* Selfie */}
            <div className={`mt-32 flex flex-col items-end ${styles.padding.section}`}>
                <motion.img
                    ref={selfieRef}
                    src="/images/selfie.webp"
                    alt="Me on a cloudy, sunny day."
                    className="max-h-64 w-full -scale-x-100 rounded-md object-cover md:max-h-128 md:w-1/2"
                    loading="lazy"
                    style={{ objectPosition: selfie_objectPosition }}
                />

                <SplitWord
                    text="I design and develop custom websites, landing pages, and UI systems that help brands feel modern and communicate clearly. My work blends minimal design with strong structure, tight typography, and high functionality."
                    className="md:w-1/2 md:tracking-wide"
                    duration={0.3}
                    stagger={0.01}
                />
            </div>

            {/* Numbers */}
            <div
                className={`mt-32 grid grid-cols-1 gap-12 py-16 md:grid-cols-2 ${styles.padding.section}`}
            >
                <div className="font-sans font-semibold">
                    {/* Header/Desktop */}
                    <motion.h3
                        className="hidden text-3xl md:inline-block md:text-8xl"
                        viewport={{ once: true }}
                        initial={{ opacity: 0, translateX: "-10%" }}
                        whileInView={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    >
                        The numbers don’t lie.
                    </motion.h3>

                    {/* Header/Mobile */}
                    <motion.div
                        className="md:hidden"
                        viewport={{ once: true }}
                        initial={{ opacity: 0, translateX: -25 }}
                        whileInView={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    >
                        <FitText>The numbers don’t lie.</FitText>
                    </motion.div>
                </div>

                <div className="divide-foreground-dimmer flex w-full flex-col divide-y">
                    <motion.div
                        className="grid w-full grid-cols-2 gap-4 py-6 md:gap-0"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    >
                        <span className="border-foreground-dimmer border-r font-sans text-4xl tracking-tight md:border-r-0 md:text-5xl">
                            <AnimateNumber value={5} direction="up" />+
                        </span>
                        <span className="text-foreground-dim">
                            Years working with clients, teams, projects, and making things happen.
                        </span>
                    </motion.div>

                    <motion.div
                        className="grid w-full grid-cols-2 gap-4 py-6 md:gap-0"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    >
                        <span className="border-foreground-dimmer border-r font-sans text-4xl tracking-tight md:border-r-0 md:text-5xl">
                            <AnimateNumber value={26} direction="up" />+
                        </span>
                        <span className="text-foreground-dim">
                            Projects launched and remembered. I keep the standards high and the process simple.
                        </span>
                    </motion.div>

                    <motion.div
                        className="grid w-full grid-cols-2 gap-4 py-6 md:gap-0"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    >
                        <span className="border-foreground-dimmer border-r font-sans text-4xl tracking-tight md:border-r-0 md:text-5xl">
                            <AnimateNumber value={14} direction="up" />+
                        </span>
                        <span className="text-foreground-dim">
                            Amazing people I’ve worked with. Each project unique, every need fulfilled.
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Extra */}
            <div className={`divide-foreground-dimmer mt-32 flex flex-col divide-y ${styles.padding.section}`}>
                <motion.div
                    className="grid grid-cols-1 gap-2 py-6 md:grid-cols-2 md:gap-12"
                    viewport={{ once: true }}
                    initial={{ opacity: 0, translateY: "-10%", filter: "blur(16px)" }}
                    whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: easings.fluidInOut }}
                >
                    <div className="flex gap-2">
                        <span className="text-foreground-dim text-xs tracking-tighter md:inline-block">//</span>
                        <span className="text-foreground-dim font-sans text-xl md:text-2xl">MY PROCESS</span>
                    </div>
                    <p className="leading-relaxed md:tracking-wide">
                        I follow a simple process that keeps everything predictable: Research. Wireframes. Design.
                        Development. Launch. Support. Clients always know what stage we’re in and what’s coming next.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 gap-2 py-6 md:grid-cols-2 md:gap-12"
                    viewport={{ once: true }}
                    initial={{ opacity: 0, translateY: "-10%", filter: "blur(16px)" }}
                    whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: easings.fluidInOut }}
                >
                    <div className="flex gap-2">
                        <span className="text-foreground-dim text-xs tracking-tighter md:inline-block">//</span>
                        <span className="text-foreground-dim font-sans text-xl md:text-2xl">MY EXPERIENCE</span>
                    </div>
                    <p className="leading-relaxed md:tracking-wide">
                        I’ve spent 5+ years freelancing, building trust, relationships, and projects across websites, bots,
                        and custom tools. I handle both design and development, so projects stay consistent from start to
                        finish.
                    </p>
                </motion.div>
            </div>

            {/* OCTAVELABS */}
            {/* <div className={`mt-32 flex flex-col gap-2 ${styles.padding.section}`}>
                <div className="grid grid-cols-1">
                    <SplitWord
                        text="I’m the founder of a web development agency called Octave Labs. My team focuses on building modern, fast, and functional websites. As well as bold, memorable branding for your audience."
                        className="leading-relaxed md:tracking-wide"
                        duration={0.3}
                        stagger={0.03}
                    />
                </div>

                <motion.div
                    className="font-special flex w-full flex-col justify-center rounded-md border border-black/5 bg-black/5 p-2 text-center md:p-4"
                    initial={{ opacity: 0, translateY: "-25%" }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 1, ease: easings.fluidInOut }}
                >
                    <FitText className="font-semibold">
                        <span className="bg-linear-to-br from-[#6aacf7] to-[#5797e0] bg-clip-text text-transparent">
                            Octave
                        </span>{" "}
                        Labs
                    </FitText>
                    <span className="text-2xl tracking-wide md:text-4xl">Digital Solutions</span>
                </motion.div>
            </div> */}
        </motion.section>
    );
}
