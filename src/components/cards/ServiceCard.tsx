"use client";

import { ServiceCardProps } from "@/types/types";

export default function ServiceCard({
    index,
    title,
    description,
    subtext,
    price,
    handleContact,
    extraDetails
}: ServiceCardProps) {
    return (
        <div className="border-foreground-dimmer flex flex-col gap-3 border-b px-4 py-6">
            {/* Service/Title */}
            <div className="flex gap-3">
                <span className="text-xs tracking-tighter">{`${index}`.padStart(3, "0")}</span>
                <h2 className="text-3xl">{title}</h2>
            </div>

            {/* Service/Description */}
            <div>
                {description.map(desc => (
                    <p key={desc} className="text-sm font-light tracking-wide">
                        {desc}
                    </p>
                ))}
            </div>

            {/* Service/Details */}
            <div className="flex items-end justify-between gap-2.5">
                <span className="text-foreground-dim text-xs leading-6 tracking-tighter">{subtext}</span>

                {price.starting && (
                    <span className="text-foreground-dim text-xs tracking-tighter">
                        Starting at<span className="text-foreground-primary text-2xl font-normal"> {price.starting}</span>
                    </span>
                )}
                {price.monthly && (
                    <span className="text-foreground-dim text-xs tracking-tighter">
                        <span className="text-foreground-primary text-2xl font-normal">{price.monthly} </span> / month
                    </span>
                )}
                {price.perPage && (
                    <span className="text-foreground-dim text-xs tracking-tighter">
                        <span className="text-foreground-primary text-2xl font-normal">{price.perPage} </span> / page
                    </span>
                )}
            </div>
        </div>
    );
}
