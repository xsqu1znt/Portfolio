"use client";

import SectionHeader from "@/components/layout/SectionHeader";
import { useNavContext } from "@/components/provider/NavProvider";
import { FAQ } from "@/constants/faqs";
import { styles } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { ComponentProps, memo, useCallback, useRef, useState } from "react";

// 1. Memoized Accordion Item
const FAQAccordion = memo(
    ({
        index,
        question,
        answer,
        collapsed,
        onToggleItem,
        className,
        ...props
    }: ComponentProps<"div"> & {
        index: number;
        question: string;
        answer: string;
        collapsed?: boolean;
        onToggleItem: (index: number) => void;
    }) => {
        // Handle click without creating a new function in the parent render cycle
        const handleClick = () => onToggleItem(index - 1);

        return (
            <div
                {...props}
                className={cn(
                    `group flex w-full flex-col gap-2 border border-transparent px-4 py-4.5 font-serif transition-all duration-300 will-change-transform ${
                        collapsed
                            ? ""
                            : "border-foreground-dimmer rounded-md bg-[#eef5fb] shadow-[0_0_32px_2px] shadow-black/5"
                    }`,
                    className
                )}
            >
                <button
                    className="flex cursor-pointer justify-between gap-1 outline-hidden"
                    onClick={handleClick}
                    aria-expanded={!collapsed}
                >
                    <div className="flex gap-3">
                        <span className="text-foreground-dim text-xs tracking-tighter">{`${index}`.padStart(2, "0")}</span>
                        <h3 className="text-left text-lg tracking-tight">{question}</h3>
                    </div>

                    <div className="relative size-7">
                        <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            color="currentColor"
                            className={`absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:size-8 ${
                                collapsed ? "text-foreground-dim" : "text-accent-secondary rotate-180"
                            } stroke-[1.5px]`}
                        />
                    </div>
                </button>

                <div
                    className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out"
                    style={{ gridTemplateRows: collapsed ? "0fr" : "1fr" }}
                >
                    <div
                        className={`min-h-0 overflow-hidden transition-all duration-300 ${
                            collapsed ? "-translate-x-8 opacity-0" : "translate-x-0 opacity-100"
                        } will-change-[transform,opacity]`}
                    >
                        <p className="inline-block pt-2 text-sm leading-relaxed tracking-wide">{answer}</p>
                    </div>
                </div>
            </div>
        );
    }
);

FAQAccordion.displayName = "FAQAccordion";

function FAQList() {
    const [opened, setOpened] = useState<number | null>(0);

    // Optimized: Stable reference for the toggle function
    const toggleCollapse = useCallback((index: number) => {
        setOpened(prev => (prev === index ? null : index));
    }, []);

    return (
        <div className="mt-16 flex flex-col">
            {FAQ.map((faq, i) => (
                <FAQAccordion
                    key={`faq-${i}`} // Use a more descriptive key
                    index={i + 1}
                    {...faq}
                    collapsed={i !== opened}
                    onToggleItem={toggleCollapse}
                    className={opened !== i + 1 && i + 1 !== FAQ.length ? "border-b-foreground-dimmer" : ""}
                />
            ))}
        </div>
    );
}

export default function FAQs() {
    return (
        <section id="faq" className="section light bg-white px-0">
            <div
                className={`border-foreground-dimmer relative h-full w-full py-16 ${styles.padding.section} clip-path-services bg-[#e5ecf3]`}
            >
                <div className="absolute top-0 left-0 h-12 w-full bg-linear-to-b from-black/2 to-transparent" />
                <SectionHeader title="FAQs" description="Let's keep it simple." />
                <FAQList />
            </div>
        </section>
    );
}
