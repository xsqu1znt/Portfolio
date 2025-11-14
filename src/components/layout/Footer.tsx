"use client";

import { useLenis } from "lenis/react";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export default function Footer() {
    const lenis = useLenis();

    const handleScrollToTop = () => {
        lenis?.scrollTo(0);
    };

    const ArrowLink = ({ label, href }: { label: string; href: string }) => (
        <div className="group relative w-fit cursor-pointer overflow-hidden pr-7 text-nowrap">
            <span className="pointer-events-none opacity-0">{label}</span>

            <ArrowUpRight className="text-accent absolute top-0 left-0 size-4 -translate-x-6 -rotate-90 stroke-[1.5px] opacity-0 transition-all duration-200 group-hover:size-6 group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100" />

            <a
                className="font-nunito absolute top-0 left-0 transition-all duration-250 group-hover:translate-x-7"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
                {label}
            </a>
        </div>
    );

    const UnderlineLink = ({ label, href }: { label: string; href: string }) => (
        <div className="group relative w-fit cursor-pointer overflow-hidden text-nowrap">
            <a className="font-nunito" href={href} target="_blank" rel="noopener noreferrer">
                {label}
            </a>

            <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="bg-accent absolute bottom-0 left-0 h-[1.75px] w-0 transition-all duration-200 group-hover:w-full" />
            </div>
        </div>
    );

    const StackedText = ({ label, delay }: { label: string; delay: number }) => (
        <div className="*:ease-overshoot relative overflow-hidden text-3xl font-bold tracking-tighter *:transition-all *:duration-500">
            <span className="pointer-events-none opacity-0">{label}</span>

            <span
                className="absolute top-0 left-0 inline-block -translate-y-full animate-pulse group-hover:translate-y-0"
                style={{ animationDelay: `${delay * 4}ms`, transitionDelay: `${delay}ms` }}
            >
                {label}
            </span>

            <span
                className="absolute top-0 left-0 inline-block group-hover:translate-y-full"
                style={{ transitionDelay: `${delay}ms` }}
            >
                {label}
            </span>
        </div>
    );

    const StackedTextRow = ({ label }: { label: string }) => (
        <div className="group text-foreground-dim hover:text-foreground-primary flex w-fit cursor-default transition-all duration-3500">
            {label.split("").map((char, i) => (
                <StackedText key={i} label={char} delay={i * 20} />
            ))}
        </div>
    );

    return (
        <div className="mt-8 w-full px-4">
            <footer className="font-satoshi border-b-none flex w-full flex-col gap-8 rounded-t-md border border-white/5 bg-white/5 p-6">
                {/* Header */}
                <div className="flex w-full justify-between gap-2">
                    <StackedTextRow label="GUNIQUE⠀G." />

                    <button className="font-nunito group flex cursor-pointer items-center gap-1" onClick={handleScrollToTop}>
                        <ArrowUp className="text-icon-active ease-overshoot size-10 rotate-45 stroke-[1.5px] transition-all duration-300 group-hover:rotate-0" />
                    </button>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-6">
                    {/* Socials */}
                    <ul className="font-nunito flex flex-col gap-0.5">
                        {[
                            { name: "Linkedin", url: "https://www.linkedin.com/in/guniqueg/" },
                            { name: "Twitter / X", url: "https://x.com/bygunique" },
                            { name: "Instagram", url: "https://www.instagram.com/xsqu1znt/" }
                        ].map((link, i) => (
                            <li key={i}>
                                <ArrowLink label={link.name} href={link.url} />
                            </li>
                        ))}
                    </ul>

                    {/* Extras */}
                    <div className="flex flex-col">
                        <span className="text-foreground-dim cursor-default text-xs font-semibold">EXTRA</span>

                        <ul className="font-nunito flex flex-col gap-0.5">
                            {[
                                { name: "Github", url: "https://github.com/xsqu1znt" },
                                { name: "Dribbble", url: "https://github.com/xsqu1znt" }
                            ].map((link, i) => (
                                <li key={i}>
                                    <ArrowLink label={link.name} href={link.url} />
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Email */}
                    <div className="flex w-fit flex-col">
                        <span className="text-foreground-dim cursor-default text-xs font-semibold">GENERAL INQUIRERS</span>

                        <UnderlineLink label="guniquegrimble@gmail.com" href="mailto:guniquegrimble@gmail.com" />
                    </div>

                    {/* Phone Number */}
                    <div className="flex w-fit flex-col">
                        <span className="text-foreground-dim cursor-default text-xs font-semibold">HAWAII, USA</span>

                        <UnderlineLink label="+1 808 426-6141" href="tel:+18084266141" />
                    </div>
                </div>

                {/* Subtext */}
                <div className="flex w-full justify-end">
                    <div className="group text-accent flex w-fit cursor-default flex-col items-end justify-center text-xl font-bold">
                        <span className="ease-overshoot transition-transform duration-300 group-hover:-translate-x-2">
                            Developer
                        </span>
                        <span className="ease-overshoot transition-transform duration-350 group-hover:translate-x-1">
                            | Designer
                        </span>
                    </div>
                </div>

                {/* Copyright */}
                <span className="font-nunito text-foreground-dim w-full text-sm font-medium">
                    © {new Date().getFullYear()} | Designed & Built by Gunique G.
                </span>
            </footer>
        </div>
    );
}
