"use client";

import FitText from "@/components/layout/FitText";
import SectionHeader from "@/components/layout/SectionHeader";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function About() {
    const selfieRef = useRef<HTMLImageElement>(null);

    const { scrollYProgress } = useScroll({
        target: selfieRef,
        offset: ["start end", "end start"]
    });

    const objectPosition = useTransform(scrollYProgress, [0, 1], ["0% 10%", "0% 40%"]);

    return (
        <section id="about" className="section">
            {/* Header */}
            <div className="flex h-fit flex-col gap-2">
                {/* Heading */}
                <div className="w-1/2 font-sans font-black tracking-tight">
                    <FitText>WHO I AM</FitText>
                </div>
                {/* Separator */}
                <div className="bg-foreground-dimmer h-px w-full" />
                {/* Paragraph */}
                <p className="max-w-1/2 pt-2 text-lg leading-relaxed tracking-wide">
                    I'm Gunique — a web developer & designer building functional interfaces, modern branding, and fast,
                    scalable websites for startups & creators.
                </p>
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
                    />

                    <p className="leading-relaxed tracking-wide">
                        I design and develop custom websites, landing pages, and UI systems that help brands look modern and
                        communicate clearly. My work blends minimal design with strong structure, tight typography, and high
                        functionality.
                    </p>
                </div>
            </div>

            {/* Numbers */}
            <div className="mt-32 grid grid-cols-2 gap-12">
                <h3 className="cursor-default font-sans text-6xl font-semibold">The numbers don't lie.</h3>

                <div className="divide-foreground-dimmer border-foreground-dimmer flex w-full flex-col divide-y border-t">
                    <div className="grid w-full grid-cols-2 py-6">
                        <span className="font-sans text-6xl tracking-tight">5+</span>
                        <span className="text-foreground-dim text-lg">
                            Years working with clients, teams, projects, and making things happen.
                        </span>
                    </div>

                    <div className="grid w-full grid-cols-2 py-6">
                        <span className="font-sans text-6xl tracking-tight">26+</span>
                        <span className="text-foreground-dim text-lg">
                            Projects launched and remembered. I keep the standards high and the process simple.
                        </span>
                    </div>

                    <div className="grid w-full grid-cols-2 py-6">
                        <span className="font-sans text-6xl tracking-tight">14+</span>
                        <span className="text-foreground-dim text-lg">
                            Amazing people I've worked with. Each project unique, every need fulfilled.
                        </span>
                    </div>
                </div>
            </div>

            {/* Separator */}
            <div className="bg-foreground-dimmer h-px w-full" />

            {/* Extra */}
            <div className="flex flex-col gap-12">
                <div className="flex max-w-1/2 flex-col">
                    <span className="text-foreground-dim cursor-default text-sm">MY PROCESS</span>
                    <p className="text-lg leading-relaxed tracking-wide">
                        I follow a simple process that keeps everything predictable: Research. Wireframes. Design.
                        Development. Launch. Support. Clients always know what stage we're in and what's coming next.
                    </p>
                </div>

                {/* Separator */}
                <div className="bg-foreground-dimmer h-px w-full" />

                <div className="flex max-w-1/2 flex-col">
                    <span className="text-foreground-dim cursor-default text-sm">MY EXPERIENCE</span>
                    <p className="text-lg leading-relaxed tracking-wide">
                        I've spent 5+ years freelancing, building trust, relationships, and projects across websites, bots,
                        and custom tools. I handle both design and development, so projects stay consistent from start to
                        finish.
                    </p>
                </div>
            </div>

            {/* Separator */}
            <div className="bg-foreground-dimmer h-px w-full" />

            {/* OCTAVELABS */}
            <div className="mt-32 flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                    <p className="text-right leading-relaxed tracking-wide">
                        I'm the founder of a web development agency called <span className="text-accent">Octave Labs</span>.{" "}
                        <br />
                        My team focuses on building modern, fast, and functional websites. As well as{" "}
                        <span className="font-semibold">BOLD,</span> memorable branding for your audience.
                    </p>
                    <div className="h-64 w-full border border-white/5 bg-white/5" />
                </div>
            </div>
        </section>
    );
}
