"use client";

import SectionHeader from "@/components/layout/SectionHeader";
import { FAQ } from "@/constants/faqs";
import { styles } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLenis } from "lenis/react";
import { ComponentProps, memo, useCallback, useRef, useState } from "react";

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
        const handleClick = () => onToggleItem(index - 1);

        return (
            <div
                {...props}
                className={cn(
                    // FIX 1: Transition ONLY specific properties. Avoid 'all'.
                    // FIX 2: Removed will-change-transform from here.
                    `group flex w-full flex-col gap-2 border border-transparent px-4 py-4.5 font-serif transition-[background-color,border-color] duration-300`,
                    !collapsed && "border-foreground-dimmer rounded-md bg-[#eef5fb]",
                    className
                )}
                // FIX 3: Move the shadow to a static style or only apply when NOT animating to prevent lag
                style={{
                    backfaceVisibility: "hidden" // GPU Hint
                }}
            >
                <button
                    className="flex cursor-pointer justify-between gap-1 outline-none"
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
                            className={cn(
                                "absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 stroke-[1.5px] transition-transform duration-300",
                                collapsed ? "text-foreground-dim" : "text-accent-secondary rotate-180"
                            )}
                        />
                    </div>
                </button>

                <div
                    className="grid overflow-hidden transition-[grid-template-rows] duration-300"
                    style={{ gridTemplateRows: collapsed ? "0fr" : "1fr" }}
                >
                    <div className="min-h-0 overflow-hidden">
                        <div
                            className={cn(
                                "pt-2 transition-all duration-300",
                                collapsed ? "translate-x-4 opacity-0" : "translate-x-0 opacity-100"
                            )}
                        >
                            <p className="text-sm leading-relaxed tracking-wide">{answer}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

FAQAccordion.displayName = "FAQAccordion";

function FAQList() {
    const [opened, setOpened] = useState<number | null>(0);
    const lenis = useLenis();

    const toggleCollapse = useCallback(
        (index: number) => {
            setOpened(prev => (prev === index ? null : index));

            // Force immediate resize
            lenis?.resize();

            // Re-sync after animation ends
            setTimeout(() => lenis?.resize(), 310);
        },
        [lenis]
    );

    return (
        <div className="mt-16 flex flex-col">
            {FAQ.map((faq, i) => (
                <FAQAccordion
                    key={`faq-${i}`}
                    index={i + 1}
                    {...faq}
                    collapsed={i !== opened}
                    onToggleItem={toggleCollapse}
                    // Fixed logic: i+1 matches the 1-based index
                    className={opened !== i + 1 && i + 1 !== FAQ.length ? "border-b-foreground-dimmer" : ""}
                />
            ))}
        </div>
    );
}

export default function FAQs() {
    return (
        <section id="faq" className="section light overflow-hidden bg-white px-0">
            <div
                className={`border-foreground-dimmer relative h-full w-full py-16 ${styles.padding.section} clip-path-services isolation-auto bg-[#e5ecf3]`}
                style={{ transform: "translate3d(0,0,0)" }}
            >
                <div className="pointer-events-none absolute top-0 left-0 h-12 w-full bg-linear-to-b from-black/2 to-transparent" />
                <SectionHeader title="FAQs" description="Let's keep it simple." />
                <FAQList />
            </div>
        </section>
    );
}
