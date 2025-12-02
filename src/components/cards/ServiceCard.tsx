"use client";

import { useUserClient } from "@/hooks/useUserClient";
import { cn } from "@/lib/utils";
import { ServiceCardProps } from "@/types/shared";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Button from "../ui/Button";

function ServiceHeader({ index, title, expanded }: ServiceCardProps & { expanded: boolean }) {
    return (
        <div className="flex justify-between">
            <div className="flex gap-3">
                <span className="text-foreground-dim text-xs tracking-tighter">{`${index}`.padStart(3, "0")}</span>
                <h3 className="group-hover:text-accent-secondary text-2xl transition-colors duration-300 md:text-3xl">
                    {title}
                </h3>
            </div>

            <div
                className={cn(
                    "ease-overshoot relative -mx-1 -my-2 size-4 p-4 transition-all duration-500",
                    expanded && "rotate-180"
                )}
            >
                <div
                    className={cn(
                        "absolute top-1/2 left-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-[#7c7c81] transition-all duration-300",
                        expanded && "bg-accent-secondary rotate-0"
                    )}
                />
                <div
                    className={cn(
                        "absolute top-1/2 left-1/2 h-[1.5px] w-4 -translate-x-1/2 -translate-y-1/2 bg-[#7c7c81] transition-all duration-300",
                        expanded && "bg-accent-secondary"
                    )}
                />
            </div>
        </div>
    );
}

// --- Transitioning Components ---

// This is the default view (Original Description + Footer).
// It slides out horizontally and fades during the collapse.
function ServiceDescriptionDefault({ description, subtext, price, expanded }: ServiceCardProps & { expanded: boolean }) {
    return (
        // Added horizontal transform and opacity transitions
        <div
            className={cn(
                "flex transform flex-col gap-3 transition-all duration-300",
                expanded && "-translate-x-8 opacity-0"
            )}
        >
            {/* Service/Description */}
            <div>
                {description.map(desc => (
                    <p key={desc} className="text-sm leading-relaxed font-light tracking-wide md:text-base">
                        {desc}
                    </p>
                ))}
            </div>

            {/* Service/Details (Original Footer content - now slides out) */}
            <div className="flex items-end justify-between gap-2.5">
                <span className="text-foreground-dim text-xs leading-6 tracking-tighter">{subtext}</span>

                {price.starting && (
                    <span className="text-foreground-dim text-xs tracking-tighter">
                        Starting at
                        <span className="bg-linear-to-br from-white to-white/50 bg-clip-text text-2xl font-normal text-transparent md:text-3xl">
                            {" "}
                            {price.starting}
                        </span>
                    </span>
                )}
                {price.monthly && (
                    <span className="text-foreground-dim text-xs tracking-tighter">
                        <span className="bg-linear-to-br from-white to-white/50 bg-clip-text text-2xl font-normal text-transparent md:text-3xl">
                            {price.monthly}{" "}
                        </span>{" "}
                        / month
                    </span>
                )}
                {price.perPage && (
                    <span className="text-foreground-dim text-xs tracking-tighter">
                        <span className="bg-linear-to-br from-white to-white/50 bg-clip-text text-2xl font-normal text-transparent md:text-3xl">
                            {price.perPage}{" "}
                        </span>{" "}
                        / page
                    </span>
                )}
            </div>
        </div>
    );
}

// This is the revealed view (Extra Details + Contact Button).
// It starts invisible/translated and slides in horizontally as the container expands.
function ServiceExtra({ extraDetails, handleContact, expanded }: ServiceCardProps & { expanded: boolean }) {
    return (
        // Added horizontal transform and opacity transitions
        <div
            className={cn(
                "flex h-full translate-x-8 transform flex-col justify-between gap-3 opacity-0 transition-all duration-300",
                expanded && "translate-x-0 opacity-100"
            )}
        >
            {/* Extra Details List */}
            <ul className="flex list-inside list-disc flex-col gap-1">
                {extraDetails.map(detail => (
                    <li key={detail} className="text-sm font-light tracking-wide">
                        {detail}
                    </li>
                ))}
            </ul>

            {/* Contact Me Button (Replaces price/subtext area) */}
            <Button label="GET STARTED" variant="accent" full className="mt-2" onClick={handleContact}>
                <ArrowRight className="text-background-primary size-5 stroke-[1.5px]" />
            </Button>
        </div>
    );
}

// --- Main Card Component ---

export default function ServiceCard(props: ServiceCardProps) {
    const [expanded, setExpanded] = useState(false);
    const { isMobile } = useUserClient();

    // Note: You would typically pass handleContact as a prop from the parent,
    // but for this example, we'll define a placeholder if not provided.
    const finalProps = {
        ...props,
        handleContact: props.handleContact || (() => console.log("Contact action triggered.")),
        extraDetails: props.extraDetails || [] // Ensure extraDetails is an array
    };

    // const handleMouseOver = () => !isMobile && setExpanded(true);
    const handleMouseLeave = () => !isMobile && setExpanded(false);
    const toggleExpanded = () => setExpanded(prev => !prev);

    return (
        // Add 'group' class to the main container to enable hover tracking for children
        <div
            className="group flex cursor-pointer flex-col gap-3 px-4 py-6"
            onMouseLeave={handleMouseLeave}
            onClick={toggleExpanded}
        >
            <ServiceHeader {...finalProps} expanded={expanded} />

            {/* Accordion Container: This wrapper manages the dynamic height transition */}
            <div>
                {/* 1. Collapsing Container: Starts tall (1fr), shrinks to zero (0fr) on hover */}
                <div
                    className={cn(
                        "grid grid-rows-[1fr] transition-[grid-template-rows] duration-300",
                        expanded && "grid-rows-[0fr]"
                    )}
                >
                    {/* The content inside is clipped by the overflow-hidden */}
                    <div className="overflow-hidden">
                        <ServiceDescriptionDefault {...finalProps} expanded={expanded} />
                    </div>
                </div>

                {/* 2. Expanding Container: Starts zero (0fr), expands to fit content (1fr) on hover */}
                <div
                    className={cn(
                        "grid grid-rows-[0fr] transition-[grid-template-rows] duration-300",
                        expanded && "grid-rows-[1fr]"
                    )}
                >
                    <div className="overflow-hidden">
                        <ServiceExtra {...finalProps} expanded={expanded} />
                    </div>
                </div>
            </div>
        </div>
    );
}
