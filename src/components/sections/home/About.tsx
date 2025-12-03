"use client";

import FitText from "@/components/layout/FitText";
import { useNavContext } from "@/components/provider/NavProvider";
import AnimateNumber from "@/components/ui/AnimateNumber";
import { easings } from "@/config/motion";
import { useUserClient } from "@/hooks/useUserClient";
import { cn } from "@/lib/utils";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

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
                        viewport={{ margin: viewMargin }}
                        initial={{ opacity: 0, filter: "blur(4px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
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

export default function About() {
    const { setNavDarkMode } = useNavContext();
    // const { isMobile } = useUserClient();
    const sectionRef = useRef<HTMLDivElement>(null);
    // const selfieRef = useRef<HTMLImageElement>(null);

    const sectionInView = useInView(sectionRef, { amount: 0.95 });

    useEffect(() => {
        if (sectionInView) {
            setNavDarkMode(true);
        } else {
            setNavDarkMode(false);
        }
    }, [sectionInView]);

    const { scrollYProgress: sectionScrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });

    const sectionScale = useTransform(sectionScrollYProgress, [0, 1], [0.9, 1]);
    const sectionBorderRadius = useTransform(sectionScrollYProgress, [0, 1], ["3rem", "0rem"]);

    /* const { scrollYProgress } = useScroll({
        target: selfieRef,
        offset: ["start end", "end start"]
    }); */

    // const objectPosition = useTransform(scrollYProgress, [0, 1], ["0% 10%", "0% 40%"]);

    return (
        <motion.section
            ref={sectionRef}
            id="about"
            className="section light bg-background-secondary py-16"
            style={{
                scale: sectionScale,
                borderTopLeftRadius: sectionBorderRadius,
                borderTopRightRadius: sectionBorderRadius
            }}
        >
            {/* Header */}
            <div className="flex h-fit flex-col gap-2">
                {/* Heading */}
                <div className="overflow-hidden font-sans font-black tracking-tight md:w-1/2">
                    <motion.div
                        // viewport={{ once: true }}
                        initial={{ opacity: 0, translateY: "100%" }}
                        whileInView={{ opacity: 1, translateY: 0 }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    >
                        <FitText>WHO I AM</FitText>
                    </motion.div>
                </div>

                {/* Separator */}
                <motion.div
                    className="bg-foreground-dimmer h-px"
                    // viewport={{ once: true }}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.3, duration: 0.5, ease: easings.fluidInOut }}
                />

                {/* Paragraph */}
                <SplitWord
                    text="I'm Gunique — a web developer & designer building functional interfaces, modern branding, and fast, scalable websites for startups & creators."
                    className="md:max-w-1/2 md:text-lg md:tracking-wide"
                    duration={0.3}
                    stagger={0.03}
                />
            </div>

            <div className="flex flex-col items-end">
                <img src="/images/IMG_2849_BW.jpg" alt="" className="w-full -scale-x-100 object-cover md:w-1/2" />

                <SplitWord
                    text="I design and develop custom websites, landing pages, and UI systems that help brands feel modern and communicate clearly. My work blends minimal design with strong structure, tight typography, and high functionality."
                    className="md:w-1/2 md:tracking-wide"
                    duration={0.3}
                    stagger={0.01}
                />
                {/* <motion.p
                    className="inline-block tracking-wide md:w-1/2"
                    viewport={{ margin: "-100px" }}
                    initial={{ opacity: 0, translateY: -15, filter: "blur(16px)" }}
                    whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: easings.fluidInOut }}
                >
                    I design and develop custom websites, landing pages, and UI systems that help brands look modern and
                    communicate clearly. My work blends minimal design with strong structure, tight typography, and high
                    functionality.
                </motion.p> */}
            </div>

            {/* Selfie */}
            {/* <div className="grid grid-cols-2 gap-12">
                <div />
                <div className="flex flex-col gap-4">
                    <motion.img
                        ref={selfieRef}
                        src="/images/IMG_2849_BW.jpg"
                        alt=""
                        className="max-h-128 w-full -scale-x-100 object-cover"
                        style={{ objectPosition }}
                        viewport={{ amount: 0.8, once: true }}
                        initial={{ opacity: 0, translateX: -15 }}
                        whileInView={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />

                    <motion.p
                        className="inline-block leading-relaxed tracking-wide"
                        viewport={{ margin: "-100px", once: true }}
                        initial={{ opacity: 0, translateY: -15, filter: "blur(16px)" }}
                        whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    >
                        I design and develop custom websites, landing pages, and UI systems that help brands look modern and
                        communicate clearly. My work blends minimal design with strong structure, tight typography, and high
                        functionality.
                    </motion.p>
                </div>
            </div> */}

            {/* Numbers */}
            {/* <div className="mt-64 grid grid-cols-2 gap-12">
                <div className="overflow-clip">
                    <motion.h3
                        className="inline-block cursor-default font-sans text-6xl font-semibold"
                        viewport={{ once: true }}
                        initial={{ opacity: 0, translateX: -25 }}
                        whileInView={{ opacity: 1, translateX: 0 }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    >
                        The numbers don't lie.
                    </motion.h3>
                </div>

                <div className="divide-foreground-dimmer flex w-full flex-col divide-y">
                    <motion.div
                        className="grid w-full grid-cols-2 py-6"
                        viewport={{ margin: "-250px" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    >
                        <span className="font-sans text-6xl tracking-tight">
                            <AnimateNumber value={5} direction="up" />+
                        </span>
                        <span className="text-foreground-dim text-lg">
                            Years working with clients, teams, projects, and making things happen.
                        </span>
                    </motion.div>

                    <motion.div
                        className="grid w-full grid-cols-2 py-6"
                        viewport={{ margin: "-250px" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    >
                        <span className="font-sans text-6xl tracking-tight">
                            <AnimateNumber value={26} direction="up" />+
                        </span>
                        <span className="text-foreground-dim text-lg">
                            Projects launched and remembered. I keep the standards high and the process simple.
                        </span>
                    </motion.div>

                    <motion.div
                        className="grid w-full grid-cols-2 py-6"
                        viewport={{ margin: "-250px" }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    >
                        <span className="font-sans text-6xl tracking-tight">
                            <AnimateNumber value={14} direction="up" />+
                        </span>
                        <span className="text-foreground-dim text-lg">
                            Amazing people I've worked with. Each project unique, every need fulfilled.
                        </span>
                    </motion.div>
                </div>
            </div> */}

            {/* Separator */}
            {/* <motion.div
                className="bg-foreground-dimmer h-px w-full"
                viewport={{ once: true }}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.5, ease: easings.fluidInOut }}
            /> */}

            {/* Extra */}
            {/* <div className="flex flex-col gap-12"> */}
            {/* <motion.div
                    className="grid grid-cols-2 gap-12"
                    viewport={{ margin: "-250px", once: true }}
                    initial={{ opacity: 0, translateY: -25, filter: "blur(16px)" }}
                    whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: easings.fluidInOut }}
                >
                    <div className="flex gap-2">
                        <span className="text-foreground-dim cursor-default text-xs tracking-tighter">//</span>
                        <span className="text-foreground-dim cursor-default font-sans text-2xl">MY PROCESS</span>
                    </div>
                    <p className="text-lg leading-relaxed tracking-wide">
                        I follow a simple process that keeps everything predictable: Research. Wireframes. Design.
                        Development. Launch. Support. Clients always know what stage we're in and what's coming next.
                    </p>
                </motion.div> */}

            {/* Separator */}
            {/* <motion.div
                    className="bg-foreground-dimmer h-px w-full"
                    viewport={{ once: true }}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.3, duration: 0.5, ease: easings.fluidInOut }}
                /> */}

            {/* <motion.div
                    className="grid grid-cols-2 gap-12"
                    viewport={{ margin: "-250px", once: true }}
                    initial={{ opacity: 0, translateY: -25, filter: "blur(16px)" }}
                    whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.5, ease: easings.fluidInOut }}
                >
                    <div className="flex gap-2">
                        <span className="text-foreground-dim cursor-default text-xs tracking-tighter">//</span>
                        <span className="text-foreground-dim cursor-default font-sans text-2xl">MY EXPERIENCE</span>
                    </div>
                    <p className="text-lg leading-relaxed tracking-wide">
                        I've spent 5+ years freelancing, building trust, relationships, and projects across websites, bots,
                        and custom tools. I handle both design and development, so projects stay consistent from start to
                        finish.
                    </p>
                </motion.div> */}
            {/* </div> */}

            {/* Separator */}
            {/* <motion.div
                className="bg-foreground-dimmer h-px w-full"
                viewport={{ once: true }}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.5, ease: easings.fluidInOut }}
            /> */}

            {/* OCTAVELABS */}
            {/* <div className="mt-32 flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-12">
                        <p className="leading-relaxed tracking-wide">
                            I'm the founder of a web development agency called{" "}
                            <span className="text-accent">Octave Labs</span>. My team focuses on building modern, fast, and
                            functional websites. As well as <span className="font-semibold">BOLD,</span> memorable branding
                            for your audience.
                        </p>
                    </div>

                    <div className="h-64 w-full border border-white/5 bg-white/5" />
                </div> */}
        </motion.section>
    );
}
