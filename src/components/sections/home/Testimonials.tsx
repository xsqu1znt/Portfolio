"use client";

import SectionHeader from "@/components/layout/SectionHeader";
import { easings } from "@/config/motion";
import { testimonials } from "@/constants/testimonials";
import { TestimonialCardProps } from "@/types/shared";
import { Star } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

function TestimonialCard({ imageSrc, flagSrc, name, handle, review }: TestimonialCardProps) {
    const firstReview = Array.isArray(review) ? review[0] : review;
    const extraReviews = Array.isArray(review) ? review.slice(1) : [];

    return (
        <div className="group bg-background-secondary relative flex w-full flex-col gap-6 rounded-md p-6">
            {/* Header */}
            <div className="relative flex w-full items-center gap-4">
                <span className="text-foreground-dimmer absolute top-0 right-0 text-[12rem] leading-[0.7] transition-all duration-300 select-none group-hover:-translate-x-2">
                    “
                </span>

                {/* Avatar */}
                <Image
                    width={48}
                    height={48}
                    src={imageSrc}
                    alt={`@${handle}`}
                    className="rounded-full border-2 border-white/25"
                />

                {/* Info */}
                <div className="flex flex-col">
                    <span className="font-sans font-semibold">{name}</span>
                    <div className="flex items-center gap-1 md:gap-2">
                        {flagSrc && (
                            <Image
                                width={16}
                                height={16}
                                src={flagSrc}
                                alt={`${flagSrc.split("/").pop()?.split(".").shift()} flag`}
                                className="size-3 md:size-4"
                            />
                        )}
                        <span className="text-foreground-dim text-sm tracking-wide">@{handle}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    {/* Rating */}
                    <div className="flex items-end gap-2">
                        <div className="flex">
                            <Star className="fill-accent-secondary size-4 stroke-0 md:size-5" />
                            <Star className="fill-accent-secondary size-4 stroke-0 md:size-5" />
                            <Star className="fill-accent-secondary size-4 stroke-0 md:size-5" />
                            <Star className="fill-accent-secondary size-4 stroke-0 md:size-5" />
                            <Star className="fill-accent-secondary size-4 stroke-0 md:size-5" />
                        </div>

                        <span className="text-foreground-dim text-xs leading-[1.1] font-semibold md:text-sm">5.0</span>
                    </div>

                    <div className="bg-foreground-dimmer h-px w-full" />
                </div>

                {/* Review */}
                <p className="text-foreground-dim font-sans text-sm leading-relaxed tracking-wide md:text-base">
                    “{firstReview}”
                </p>

                {/* Extra reviews */}
                {extraReviews.map((text, idx) => (
                    <div
                        key={idx}
                        className="bg-foreground-dimmer absolute bottom-0 left-0 flex w-full translate-y-full scale-95 flex-col gap-2 rounded-md p-6 opacity-0 blur-lg transition-all duration-300 group-hover:translate-y-[calc(100%+0.75rem)] group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none"
                        style={{ zIndex: -idx }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="bg-foreground-dimmer h-px w-full" />
                            <span className="text-foreground-dim text-sm text-nowrap">
                                {">"} RETURNING {`${idx + 2}`.padStart(2, "0")}
                            </span>
                        </div>

                        <p className="text-foreground-dim font-sans text-sm leading-relaxed tracking-wide md:text-base">
                            “{text}”
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Testimonials() {
    const headerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: headerRef,
        offset: ["start end", "end start"]
    });

    const headerTranslateX = useTransform(scrollYProgress, [0, 1.1], ["5%", "-5%"]);

    return (
        <section id="testimonials" className="section my-50">
            <div className="border-foreground-dimmer w-full border-b text-right">
                <motion.div
                    ref={headerRef}
                    className="w-full text-center md:w-[75%] md:text-right"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease: easings.fluidInOut }}
                    style={{ translateX: headerTranslateX }}
                >
                    <h2 className="font-sans text-3xl font-bold tracking-tight md:text-6xl">What people say.</h2>
                </motion.div>
            </div>

            {/* TODO: Replace with carousel on mobile, maybe stacked cards on desktop */}
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-3">
                {testimonials.map((data, idx) => (
                    <TestimonialCard key={idx} {...data} />
                ))}
            </div>
        </section>
    );
}
