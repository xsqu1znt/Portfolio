import SectionHeader from "@/components/layout/SectionHeader";
import { testimonials } from "@/constants/testimonials";
import { TestimonialCardProps } from "@/types/shared";
import { Star } from "lucide-react";

function TestimonialCard({ imageSrc, flagSrc, name, handle, review }: TestimonialCardProps) {
    const firstReview = Array.isArray(review) ? review[0] : review;
    const extraReviews = Array.isArray(review) ? review.slice(1) : [];

    return (
        <div className="group bg-foreground-dimmer relative flex w-full flex-col gap-12 rounded-md p-6">
            <span className="text-foreground-dimmer absolute top-4 right-4 text-[14rem] leading-[0.7] transition-all duration-300 select-none group-hover:scale-95 group-hover:-rotate-5">
                “
            </span>

            {/* Header */}
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <img src={imageSrc} alt={`@${handle}`} className="size-12 rounded-full border-2 border-white/25" />

                {/* Info */}
                <div className="flex flex-col">
                    <span className="font-sans font-semibold">{name}</span>
                    <div className="flex items-center gap-2">
                        {flagSrc && (
                            <img
                                src={flagSrc}
                                alt={`${flagSrc.split("/").pop()?.split(".").shift()} flag`}
                                className="size-4"
                            />
                        )}
                        <span className="text-foreground-dim text-sm tracking-wide">@{handle}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                {/* Rating */}
                <div className="flex items-end gap-2">
                    <div className="flex gap-1">
                        <Star className="fill-icon-active size-5 stroke-0" />
                        <Star className="fill-icon-active size-5 stroke-0" />
                        <Star className="fill-icon-active size-5 stroke-0" />
                        <Star className="fill-icon-active size-5 stroke-0" />
                        <Star className="fill-icon-active size-5 stroke-0" />
                    </div>

                    <span className="text-foreground-dim text-sm leading-[1.1] font-semibold">5.0</span>
                </div>

                {/* <li className="flex flex-col">
                    <p className="text-foreground-dim font-sans leading-relaxed tracking-wide">“{item}”</p>

                    <div className="flex items-center gap-2">
                        <span className="text-foreground-dimmer text-xs font-semibold">{`${idx + 2}`.padStart(2, "0")}</span>
                        <div className="bg-foreground-dimmer h-px w-full" />
                    </div>
                </li> */}

                {/* Review */}
                <p className="text-foreground-dim max-w-96 font-sans leading-relaxed tracking-wide">“{firstReview}”</p>

                {/* Extra reviews */}
                {extraReviews.map((text, idx) => (
                    <div
                        key={idx}
                        className="bg-foreground-dimmer absolute bottom-0 left-0 flex w-full translate-y-full scale-95 flex-col gap-2 rounded-md p-6 opacity-0 blur-lg transition-all duration-300 group-hover:translate-y-[calc(100%+0.75rem)] group-hover:scale-100 group-hover:opacity-100 group-hover:blur-none"
                        style={{ zIndex: -idx }}
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-foreground-dim text-sm text-nowrap">
                                REOCCURRING {`${idx + 2}`.padStart(2, "0")}
                            </span>
                            <div className="bg-foreground-dimmer h-px w-full" />
                        </div>

                        <p className="text-foreground-dim font-sans leading-relaxed tracking-wide">“{text}”</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Testimonials() {
    return (
        <section id="testimonials" className="section">
            <div className="border-foreground-dimmer w-full border-b py-6">
                <SectionHeader title="What my clients say." />
            </div>

            <div className="grid grid-cols-3 gap-12">
                {testimonials.map((data, idx) => (
                    <TestimonialCard key={idx} {...data} />
                ))}
            </div>
        </section>
    );
}
