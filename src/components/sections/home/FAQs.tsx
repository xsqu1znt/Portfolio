"use client";

import SectionHeader from "@/components/layout/SectionHeader";
import { FAQ } from "@/constants/faqs";
import { styles } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { ComponentProps, useState } from "react";

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
                `group flex w-full flex-col gap-2 border border-t-transparent border-r-transparent border-l-transparent bg-transparent px-4 py-4.5 font-serif transition-all duration-300 ${collapsed ? "" : "rounded-md border-t-white/5 border-r-white/5 border-l-white/5 bg-black/5 shadow-[0_0_32px_2px] shadow-black/5"}`,
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
                    <ChevronDown
                        className={`text-foreground-dim absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:size-8 ${collapsed ? "" : "text-accent-secondary rotate-180"} stroke-[1.5px]`}
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
                    className={`border-b-transparent ${opened !== i + 1 && i + 1 !== FAQ.length ? "border-b-foreground-dimmer" : ""}`}
                />
            ))}
        </div>
    );
}

export default function FAQs() {
    return (
        <section id="faq" className="section light bg-background-primary px-0">
            <div
                className={`bg-background-secondary border-foreground-dimmer relative mt-64 h-full w-full border-t pb-16 ${styles.padding.section}`}
                // style={{ clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0% 100%)" }}
            >
                <div className="absolute top-0 left-0 h-12 w-full bg-linear-to-b from-black/2 to-transparent" />
                <div className="mt-16" />
                <SectionHeader title="FAQs" description="Let's keep it simple." />
                <FAQList />
            </div>
        </section>
    );
}
