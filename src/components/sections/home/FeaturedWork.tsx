"use client";

import ShowreelCard from "@/components/cards/ShowreelCard";
import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import React, { ComponentProps, useRef } from "react";

function Showreel({ className, children }: ComponentProps<"div">) {
    const cards = React.Children.toArray(children);

    return (
        <div className={cn("flex w-full max-w-[75%] flex-col gap-100", className)}>
            {cards.map((card, idx) => {
                const thisRef = useRef<HTMLDivElement>(null);
                const { scrollYProgress } = useScroll({ target: thisRef, offset: ["start end", "end start"] });

                const scale = useSpring(useTransform(scrollYProgress, [0, 0.35], [0.75, 1]), { damping: 5, mass: 0.2 });
                const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

                return (
                    <motion.div
                        className={`flex w-full ${idx % 2 ? "justify-end" : ""}`}
                        key={idx}
                        ref={thisRef}
                        style={{ scale, opacity }}
                    >
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                            {card}
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
}

export default function FeaturedWork() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

    const headerOpacity = useTransform(scrollYProgress, [0.1, 0.125, 0.75, 0.9], [1, 0.1, 0.1, 0]);
    const headerY = useTransform(scrollYProgress, [0.75, 1], [0, -25]);
    const headerScale = useTransform(scrollYProgress, [0.1, 0.125], [1, 0.95]);
    const headerFilter = useTransform(scrollYProgress, [0.1, 0.125], ["blur(0px)", "blur(2px)"]);

    // const subheaderOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    // const subheaderX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, 25]);

    return (
        <section ref={sectionRef} id="work" className="section items-center">
            {/* Header */}
            <motion.div
                className="pointer-events-none sticky top-1/2 left-1/2 -z-50 flex w-fit -translate-x-1/2 -translate-y-1/2 flex-col"
                style={{ opacity: headerOpacity, y: headerY, scale: headerScale, filter: headerFilter }}
            >
                <div className="overflow-clip">
                    <motion.h2
                        className="inline-block font-sans text-4xl font-semibold tracking-tight"
                        initial={{ opacity: 0, translateY: "100%" }}
                        whileInView={{ opacity: 1, translateY: 0 }}
                        // transition={{ duration: 0.5, ease: "circInOut" }}
                        transition={{ type: "spring", damping: 15, stiffness: 200 }}
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

/* export default function SelectedWork() {
    return (
        <section id="work" className="section">
            <SectionHeader title="// SELECTED WORK" description="Some of my favorite pieces." />

            <div className="relative mt-9 w-full overflow-hidden">
                <div className="relative flex w-full -translate-x-32 gap-4">
                    <div className="flex flex-col gap-4">
                        <ShowreelCard />
                        <ShowreelCard src="/images/showreel/004.png" />
                        <ShowreelCard />
                        <ShowreelCard />
                    </div>

                    <div className="flex -translate-y-9 flex-col gap-4">
                        <ShowreelCard />
                        <ShowreelCard src="/images/showreel/001.png" />
                        <ShowreelCard src="/images/showreel/002.png" />
                        <ShowreelCard />
                    </div>

                    <div className="flex flex-col gap-4">
                        <ShowreelCard />
                        <ShowreelCard src="/images/showreel/003.png" />
                        <ShowreelCard />
                        <ShowreelCard />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 -ml-4 h-[50px] w-screen bg-linear-to-b from-transparent to-black" />
            </div>
        </section>
    );
} */
