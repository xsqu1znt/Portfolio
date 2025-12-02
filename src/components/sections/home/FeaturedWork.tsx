"use client";

import ShowreelCard from "@/components/cards/ShowreelCard";
import { easings } from "@/config/motion";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import React, { ComponentProps, useRef } from "react";

function Showreels({ className, children }: ComponentProps<"div">) {
    const cards = React.Children.toArray(children);

    return (
        <div className={cn("flex w-full flex-col gap-100", className)}>
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
    const headerOpacity = useTransform(scrollYProgress, [0.2, 0.25, 0.75, 0.9], [1, 0.1, 0.1, 0]);
    const headerScale = useTransform(scrollYProgress, [0.2, 0.25], [1, 0.85]);
    const headerFilter = useTransform(scrollYProgress, [0.2, 0.25], ["blur(0px)", "blur(2px)"]);

    return (
        <section ref={sectionRef} id="work" className="section my-50 items-center">
            {/* Header */}
            <motion.div
                className="pointer-events-none sticky top-1/3 left-0 -z-50 flex w-fit flex-col justify-center"
                style={{ opacity: headerOpacity, scale: headerScale, filter: headerFilter }}
            >
                <div className="overflow-hidden">
                    <motion.h2
                        className="inline-block text-center font-sans text-4xl font-semibold tracking-tight md:text-6xl"
                        viewport={{ once: true }}
                        initial={{ opacity: 0, translateY: "100%" }}
                        whileInView={{ opacity: 1, translateY: 0 }}
                        transition={{ duration: 0.3, ease: easings.fluidInOut }}
                    >
                        FEATURED WORK
                    </motion.h2>
                </div>
            </motion.div>

            <Showreels className="my-[50vh]">
                <ShowreelCard src="/images/showreel/001.png" />
                <ShowreelCard src="/images/showreel/001.png" alignment="right" />
                <ShowreelCard src="/images/showreel/001.png" />
                <ShowreelCard src="/images/showreel/001.png" alignment="right" />
            </Showreels>
        </section>
    );
}
