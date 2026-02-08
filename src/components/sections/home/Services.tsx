"use client";

import React, { useState, memo } from "react";
import { useLenis } from "lenis/react";
import { ArrowRight } from "lucide-react";

import SectionHeader from "@/components/layout/SectionHeader";
import Button from "@/components/ui/Button";
import { MarqueeItem, VelocityMarquee } from "@/components/ui/VelocityMarquee";
import { AddonServices, MainServices } from "@/constants/services";
import { styles } from "@/constants/styles";
import { cn } from "@/lib/utils";
import { ServiceCardProps } from "@/types/shared";

function ServiceHeader({ index, title, expanded }: ServiceCardProps & { expanded: boolean }) {
    return (
        <div className="flex justify-between">
            <div className="flex gap-3">
                <span className="text-foreground-dim text-xs tracking-tighter">{`${index}`.padStart(3, "0")}</span>
                <h3 className="group-hover:text-accent-secondary text-2xl font-medium transition-colors duration-300 md:text-3xl">
                    {title}
                </h3>
            </div>

            <div
                className={cn(
                    "ease-overshoot relative -mx-1 -my-2 size-4 p-4 transition-all duration-300",
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

function ServiceDescriptionDefault({ description, subtext, price, expanded }: ServiceCardProps & { expanded: boolean }) {
    return (
        <div
            className={cn(
                "flex transform flex-col gap-3 transition-all duration-300",
                expanded && "translate-x-8 opacity-0"
            )}
        >
            <div>
                {description.map(desc => (
                    <p key={desc} className="text-sm leading-relaxed font-light tracking-wide md:text-base">
                        {desc}
                    </p>
                ))}
            </div>
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

function ServiceExtra({ extraDetails, handleContact, expanded }: ServiceCardProps & { expanded: boolean }) {
    return (
        <div
            className={cn(
                "flex h-full transform flex-col justify-between gap-3 opacity-0 transition-all duration-300",
                expanded && "opacity-100"
            )}
        >
            <ul className="flex list-inside list-disc flex-col gap-1">
                {extraDetails.map(detail => (
                    <li key={detail} className="text-sm font-light tracking-wide">
                        {detail}
                    </li>
                ))}
            </ul>
            <Button label="GET STARTED" variant="accent" full className="mt-2" onClick={handleContact}>
                <ArrowRight className="text-background-primary size-5 stroke-[1.5px]" />
            </Button>
        </div>
    );
}

const ServiceCard = memo((props: ServiceCardProps) => {
    const lenis = useLenis();
    const [expanded, setExpanded] = useState(false);

    const scrollToContact = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent toggling the accordion when clicking the button
        lenis?.scrollTo("#contact", { duration: 1.5 });
    };

    const finalProps = {
        ...props,
        handleContact: props.handleContact || scrollToContact,
        extraDetails: props.extraDetails || []
    };

    return (
        <div
            className="group flex cursor-pointer flex-col gap-3 px-4 py-6 will-change-[grid-template-rows]"
            onClick={() => setExpanded(!expanded)}
        >
            <ServiceHeader {...finalProps} expanded={expanded} />

            <div className="grid grid-rows-[1fr] overflow-hidden transition-[grid-template-rows] duration-300">
                {/* Grid-based Accordion: Zero-motion until clicked */}
                <div
                    className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-in-out",
                        expanded ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
                    )}
                >
                    <div className="overflow-hidden">
                        <ServiceDescriptionDefault {...finalProps} expanded={expanded} />
                    </div>
                </div>
                <div
                    className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-in-out",
                        expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                >
                    <div className="overflow-hidden">
                        <ServiceExtra {...finalProps} expanded={expanded} />
                    </div>
                </div>
            </div>
        </div>
    );
});
ServiceCard.displayName = "ServiceCard";

export default function Services() {
    return (
        <section id="services" className="section bg-background-secondary clip-path-services mt-50 px-0 py-16">
            <div className={`w-full ${styles.padding.section}`}>
                <SectionHeader
                    title="SERVICES"
                    description="Design clean. Build clever. Ship fast."
                    className="text-accent"
                />
            </div>

            <div className={`w-full ${styles.padding.section}`}>
                <div className="bg-background-secondary divide-foreground-dimmer border-foreground-dimmer/20 flex w-full flex-col divide-y overflow-hidden rounded-md border-y">
                    {MainServices.map((service, i) => (
                        <ServiceCard key={i} index={i + 1} {...service} />
                    ))}
                </div>
            </div>

            <VelocityMarquee
                baseVelocity={-2}
                className="text-background-primary bg-accent my-16 rotate-2 py-6 font-sans text-4xl font-semibold tracking-tighter uppercase shadow-lg md:my-32 md:text-6xl"
            >
                <MarqueeItem text="Tailored Solutions • Modern Tech • Scalable Design •" />
            </VelocityMarquee>

            <div className={`w-full ${styles.padding.section}`}>
                <div className="bg-background-secondary divide-foreground-dimmer border-foreground-dimmer/20 flex w-full flex-col divide-y overflow-hidden rounded-md border-y">
                    {AddonServices.map((service, i) => (
                        <ServiceCard key={i} index={i + 1 + MainServices.length} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
