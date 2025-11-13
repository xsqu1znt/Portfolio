"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ComponentProps } from "react";

export default function SelectedWork() {
    const ShowreelCard = ({ src, ...props }: ComponentProps<"div"> & { src?: string }) => (
        <div className={cn("relative w-48 shrink-0 rounded-md border border-white/5 bg-white/5", src ? "h-fit" : "h-28")}>
            {src && (
                <Image
                    src={src}
                    alt="showreel-card"
                    width={256}
                    height={256}
                    className="max-h-64 w-full rounded-md object-cover object-top"
                />
            )}
        </div>
    );

    return (
        <section id="work" className="flex w-full flex-col gap-10 px-4">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-light tracking-tight">// SELECTED WORK</h2>
                <p className="text-foreground-dim font-light tracking-wide">Some of my favorite pieces.</p>
            </div>

            {/* Showreel/Container */}
            <div className="relative mt-9 w-full">
                <div className="relative flex w-full -translate-x-32 gap-4">
                    {/* Align/Left */}
                    <div className="flex flex-col gap-4">
                        <ShowreelCard />
                        <ShowreelCard src="/images/showreel/004.png" />
                        <ShowreelCard />
                        <ShowreelCard />
                    </div>

                    {/* Align/Center */}
                    <div className="flex -translate-y-9 flex-col gap-4">
                        <ShowreelCard />
                        <ShowreelCard src="/images/showreel/001.png" />
                        <ShowreelCard src="/images/showreel/002.png" />
                        <ShowreelCard />
                    </div>

                    {/* Align/Right */}
                    <div className="flex flex-col gap-4">
                        <ShowreelCard />
                        <ShowreelCard src="/images/showreel/003.png" />
                        <ShowreelCard />
                        <ShowreelCard />
                    </div>
                </div>
                {/* TODO: Add bottom fade out gradient */}
                <div className="absolute bottom-0 left-0 -ml-4 h-[50px] w-screen bg-linear-to-b from-transparent to-black" />
            </div>
        </section>
    );
}
