"use client";

import FitText from "@/components/layout/FitText";
import AnimateNumber from "@/components/ui/AnimateNumber";
import { easings } from "@/config/motion";
import { useUserClient } from "@/hooks/useUserClient";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const selfieRef = useRef<HTMLImageElement>(null);

    const { isMobile } = useUserClient();
    const { scrollYProgress: sectionScrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start start"]
    });

    const sectionBorderRadius = useTransform(sectionScrollYProgress, [0, 1], ["5rem", "0rem"]);
    const sectionScale = useTransform(sectionScrollYProgress, [0, 1], [0.9, 1]);
    const sectionTranslateY = useTransform(sectionScrollYProgress, [0, 0.5], [200, 0]);

    const { scrollYProgress } = useScroll({
        target: selfieRef,
        offset: ["start end", "end start"]
    });

    const objectPosition = useTransform(scrollYProgress, [0, 1], ["0% 10%", "0% 40%"]);

    return (
        <motion.section
            ref={sectionRef}
            id="about"
            className="section light bg-background-primary"
            style={{
                translateY: isMobile ? undefined : sectionTranslateY,
                scale: sectionScale,
                borderTopLeftRadius: sectionBorderRadius,
                borderTopRightRadius: sectionBorderRadius
            }}
        >
            {/* Header */}
            <div className="my-16 flex h-fit flex-col gap-2">
                {/* Heading */}
                <div className="w-1/2 overflow-clip font-sans font-black tracking-tight">
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
                <motion.div
                    className="bg-foreground-dimmer h-px"
                    viewport={{ once: true }}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.3, duration: 0.5, ease: easings.fluidInOut }}
                />

                {/* Paragraph */}
                <div>
                    <div className="overflow-clip">
                        <motion.p
                            className="inline-block max-w-1/2 pt-2 text-lg tracking-wide"
                            viewport={{ once: true }}
                            initial={{ opacity: 0, translateY: "100%", filter: "blur(16px)" }}
                            whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.3, duration: 0.5, ease: easings.fluidInOut }}
                        >
                            I'm Gunique — a web developer & designer building functional interfaces, modern
                        </motion.p>
                    </div>

                    <div className="overflow-clip">
                        <motion.p
                            className="inline-block max-w-1/2 pt-2 text-lg tracking-wide"
                            viewport={{ once: true }}
                            initial={{ opacity: 0, translateY: "100%", filter: "blur(16px)" }}
                            whileInView={{ opacity: 1, translateY: 0, filter: "blur(0px)" }}
                            transition={{ delay: 0.35, duration: 0.5, ease: easings.fluidInOut }}
                        >
                            branding, and fast, scalable websites for startups & creators.
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Selfie */}
            <div className="grid grid-cols-2 gap-12">
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
            </div>

            {/* Numbers */}
            <div className="mt-64 grid grid-cols-2 gap-12">
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
            </div>

            {/* Separator */}
            <motion.div
                className="bg-foreground-dimmer h-px w-full"
                viewport={{ once: true }}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.3, duration: 0.5, ease: easings.fluidInOut }}
            />

            {/* Extra */}
            <div className="flex flex-col gap-12">
                <motion.div
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
                </motion.div>

                {/* Separator */}
                <motion.div
                    className="bg-foreground-dimmer h-px w-full"
                    viewport={{ once: true }}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.3, duration: 0.5, ease: easings.fluidInOut }}
                />

                <motion.div
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
                </motion.div>
            </div>

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
                </div>
            </div> */}
        </motion.section>
    );
}
