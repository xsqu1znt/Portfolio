"use client";

import ShowreelCard from "@/components/cards/ShowreelCard";
import { easings } from "@/config/motion";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import React, { ComponentProps, useRef } from "react";

function Showreel({ className, children }: ComponentProps<"div">) {
    const cards = React.Children.toArray(children);

    return (
        <div className={cn("flex w-full max-w-[75%] flex-col gap-100", className)}>
            {cards.map((card, idx) => {
                return (
                    <div key={idx} className={cn("flex w-full", idx % 2 && "justify-end")}>
                        {card}
                    </div>
                );
            })}
        </div>
    );
}

export default function FeaturedWork() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

    const headerOpacity = useTransform(scrollYProgress, [0.1, 0.125, 0.75, 0.9], [1, 0.1, 0.1, 0]);
    // const headerY = useTransform(scrollYProgress, [0.75, 1], [0, -25]);
    const headerScale = useTransform(scrollYProgress, [0.1, 0.125], [1, 0.85]);
    const headerFilter = useTransform(scrollYProgress, [0.1, 0.125], ["blur(0px)", "blur(2px)"]);

    // const subheaderOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    // const subheaderX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, 25]);

    return (
        <section ref={sectionRef} id="work" className="section items-center">
            {/* Header */}
            <motion.div
                className="pointer-events-none sticky top-1/2 left-1/2 -z-50 flex w-fit -translate-x-1/2 -translate-y-1/2 flex-col"
                style={{ opacity: headerOpacity, scale: headerScale, filter: headerFilter }}
            >
                <div className="overflow-clip">
                    <motion.h2
                        className="inline-block font-sans text-6xl font-semibold tracking-tight"
                        viewport={{ once: true }}
                        initial={{ opacity: 0, translateY: "100%" }}
                        whileInView={{ opacity: 1, translateY: 0 }}
                        transition={{ duration: 0.3, ease: easings.fluidInOut }}
                    >
                        FEATURED WORK
                    </motion.h2>
                </div>
            </motion.div>

            <Showreel className="mt-[50vh] mb-[50vh]">
                <ShowreelCard src="/images/showreel/001.png" />
                <ShowreelCard src="/images/showreel/002.png" alignment="right" />
                <ShowreelCard src="/images/showreel/003.png" />
                <ShowreelCard src="/images/showreel/004.png" alignment="right" />

                {/* <ShowreelCard src="/images/showreel/001.png" />
                <ShowreelCard src="/images/showreel/002.png" alignment="right" />
                <ShowreelCard src="/images/showreel/003.png" />
                <ShowreelCard src="/images/showreel/004.png" alignment="right" /> */}
            </Showreel>
        </section>
    );
}
