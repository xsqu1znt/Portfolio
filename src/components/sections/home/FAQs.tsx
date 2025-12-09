"use client";

import SectionHeader from "@/components/layout/SectionHeader";
import { useNavContext } from "@/components/provider/NavProvider";
import { FAQ } from "@/constants/faqs";
import { styles } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { ComponentProps, useRef, useState } from "react";

function FAQAccordion({
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
    toggleCollapse?: () => void;
}) {
    return (
        <div
            {...props}
            className={cn(
                `group flex w-full flex-col gap-2 border border-transparent px-4 py-4.5 font-serif transition-all duration-300 ${collapsed ? "" : "bg-background-primary border-foreground-dimmer rounded-md shadow-[0_0_32px_2px] shadow-black/5"}`,
                className
            )}
        >
            <button className="flex cursor-pointer justify-between gap-1" onClick={toggleCollapse}>
                {/* Header */}
                <div className="flex gap-3">
                    {/* Index */}
                    <span className="text-foreground-dim text-xs tracking-tighter">{`${index}`.padStart(2, "0")}</span>
                    {/* Question */}
                    <h3 className="text-left text-lg tracking-tight">{question}</h3>
                </div>

                {/* Button/Collapse */}
                <div className="relative size-7">
                    <HugeiconsIcon
                        icon={ArrowDown01Icon}
                        color="currentColor"
                        className={`absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:size-8 ${collapsed ? "text-foreground-dim" : "text-accent-secondary rotate-180"} stroke-[1.5px]`}
                    />
                </div>
            </button>

            {/* Answer */}
            <div
                className={`grid overflow-hidden transition-all duration-300`}
                style={{ gridTemplateRows: collapsed ? "0fr" : "1fr" }}
            >
                <div
                    className={`min-h-0 overflow-hidden transition-all duration-300 ${collapsed ? "-translate-x-8 blur-xs" : "translate-x-0"}`}
                >
                    <p className={`inline-block text-sm leading-relaxed tracking-wide`}>{answer}</p>
                </div>
            </div>
        </div>
    );
}

function FAQList() {
    const [opened, setOpened] = useState(0);

    const toggleCollapse = (index: number) => {
        if (index === opened) {
            setOpened(-1);
        } else {
            setOpened(index);
        }
    };

    return (
        <div className="mt-16 flex flex-col">
            {FAQ.map((faq, i) => (
                <FAQAccordion
                    key={i}
                    index={i + 1}
                    {...faq}
                    collapsed={i !== opened}
                    toggleCollapse={() => toggleCollapse(i)}
                    className={`${opened !== i + 1 && i + 1 !== FAQ.length ? "border-b-foreground-dimmer" : ""}`}
                />
            ))}
        </div>
    );
}

export default function FAQs() {
    const { setNavDarkMode } = useNavContext();
    const sectionRef = useRef<HTMLDivElement>(null);

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

    return (
        <section ref={sectionRef} id="faq" className="bg-background-secondary section light px-0">
            <div
                className={`border-foreground-dimmer relative h-full w-full py-16 ${styles.padding.section} clip-path-services bg-background-primary`}
            >
                <div className="absolute top-0 left-0 h-12 w-full bg-linear-to-b from-black/2 to-transparent" />
                <SectionHeader title="FAQs" description="Let's keep it simple." />
                <FAQList />
            </div>
        </section>
    );
}
