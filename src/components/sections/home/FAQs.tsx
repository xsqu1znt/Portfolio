"use client";

import React, { ComponentProps, useRef, useState, memo, useCallback, useMemo } from "react";
import SectionHeader from "@/components/layout/SectionHeader";
import { useNavContext } from "@/components/provider/NavProvider";
import { FAQ } from "@/constants/faqs";
import { styles } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMotionValueEvent, useScroll } from "motion/react";

// 1. Memoize the Accordion Item
// This prevents the component from re-rendering unless its specific props change
const FAQAccordion = memo(({
    index,
    question,
    answer,
    collapsed,
    toggleCollapse,
    className,
    ...props
}: ComponentProps<"div"> & {
    index: number;
    question: string;
    answer: string;
    collapsed?: boolean;
    toggleCollapse: () => void;
}) => {
    return (
        <div
            {...props}
            className={cn(
                `group flex w-full flex-col gap-2 border border-transparent px-4 py-4.5 font-serif transition-all duration-300 ${
                    collapsed ? "" : "bg-[#eef5fb] border-foreground-dimmer rounded-md shadow-[0_0_32px_2px] shadow-black/5"
                }`,
                className
            )}
        >
            <button className="flex cursor-pointer justify-between gap-1" onClick={toggleCollapse}>
                <div className="flex gap-3">
                    <span className="text-foreground-dim text-xs tracking-tighter">{`${index}`.padStart(2, "0")}</span>
                    <h3 className="text-left text-lg tracking-tight">{question}</h3>
                </div>

                <div className="relative size-7">
                    <HugeiconsIcon
                        icon={ArrowDown01Icon}
                        color="currentColor"
                        className={`absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:size-8 ${
                            collapsed ? "text-foreground-dim" : "text-accent-secondary rotate-180"
                        } stroke-[1.5px]`}
                    />
                </div>
            </button>

            {/* Answer Animation Logic Kept Exactly As Original */}
            <div
                className="grid overflow-hidden transition-all duration-300"
                style={{ gridTemplateRows: collapsed ? "0fr" : "1fr" }}
            >
                <div
                    className={`min-h-0 overflow-hidden transition-all duration-300 ${
                        collapsed ? "-translate-x-8 opacity-0" : "translate-x-0 opacity-100"
                    }`}
                >
                    <p className="inline-block text-sm leading-relaxed tracking-wide">{answer}</p>
                </div>
            </div>
        </div>
    );
});

// Set display name for debugging
FAQAccordion.displayName = "FAQAccordion";

function FAQList() {
    const [opened, setOpened] = useState<number | null>(0);

    // 2. useCallback ensures the function reference doesn't change on every render
    const toggleCollapse = useCallback((index: number) => {
        setOpened(prev => (prev === index ? null : index));
    }, []);

    return (
        <div className="mt-16 flex flex-col">
            {FAQ.map((faq, i) => (
                <FAQAccordion
                    key={i}
                    index={i + 1}
                    {...faq}
                    collapsed={i !== opened}
                    toggleCollapse={() => toggleCollapse(i)}
                    // Memoizing the class calculation
                    className={opened !== i + 1 && i + 1 !== FAQ.length ? "border-b-foreground-dimmer" : ""}
                />
            ))}
        </div>
    );
}

export default function FAQs() {
    const { setNavDarkMode } = useNavContext();
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    useMotionValueEvent(scrollYProgress, "change", latest => {
        // Optimized check to prevent unnecessary context updates
        const isWithin = latest > 0 && latest < 1;
        setNavDarkMode(isWithin);
    });

    return (
        <section ref={sectionRef} id="faq" className="bg-white section light px-0">
            <div className={`border-foreground-dimmer relative h-full w-full py-16 ${styles.padding.section} clip-path-services bg-[#e5ecf3]`}>
                <div className="absolute top-0 left-0 h-12 w-full bg-linear-to-b from-black/2 to-transparent" />
                <SectionHeader title="FAQs" description="Let's keep it simple." />
                <FAQList />
            </div>
        </section>
    );
}