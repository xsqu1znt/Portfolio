"use client";

import { useLenis } from "lenis/react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { ComponentProps } from "react";

function ArrowLink({ label, href }: { label: string; href: string }) {
    return (
        <div className="group relative w-fit cursor-pointer overflow-hidden pr-7 text-nowrap">
            <span className="pointer-events-none opacity-0">{label}</span>
            <ArrowUpRight className="text-accent absolute top-0 left-0 size-4 -translate-x-6 -rotate-90 stroke-[1.5px] opacity-0 transition-all duration-200 group-hover:size-6 group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100" />
            <a
                className="absolute top-0 left-0 font-serif transition-all duration-250 group-hover:translate-x-7"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
            >
                {label}
            </a>
        </div>
    );
}

function UnderlineLink({ label, href }: { label: string; href: string }) {
    return (
        <div className="group relative w-fit cursor-pointer overflow-hidden text-nowrap">
            <a className="font-serif" href={href} target="_blank" rel="noopener noreferrer">
                {label}
            </a>
            <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="bg-accent absolute bottom-0 left-0 h-[1.75px] w-0 transition-all duration-200 group-hover:w-full" />
            </div>
        </div>
    );
}

function ArrowLinkList({ links }: { links: { label: string; href: string }[] }) {
    return links.map((link, i) => (
        <li key={i}>
            <ArrowLink label={link.label} href={link.href} />
        </li>
    ));
}

function List(props: ComponentProps<"ul">) {
    return <ul {...props} className="flex flex-col gap-0.5 font-serif" />;
}

function LabeledList({ label, children, ...props }: ComponentProps<"div"> & { label: string }) {
    return (
        <div {...props} className="flex w-fit flex-col">
            <span className="text-foreground-dim cursor-default text-xs font-semibold">{label}</span>
            <List>{children}</List>
        </div>
    );
}

function StackedText({ label, delay }: { label: string; delay: number }) {
    return (
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
}

function StackedTextRow({ label }: { label: string }) {
    return (
        <div className="group text-foreground-dim hover:text-foreground-primary flex w-fit cursor-default transition-all duration-3500">
            {label.split("").map((char, i) => (
                <StackedText key={i} label={char} delay={i * 20} />
            ))}
        </div>
    );
}

export default function Footer() {
    const lenis = useLenis();

    const scrollToTop = () => {
        lenis?.scrollTo(0, { duration: 1 });
    };

    return (
        <div className="mt-32 w-full px-4">
            <footer className="border-b-none flex w-full flex-col gap-8 rounded-t-md border border-white/5 bg-white/5 p-6 font-sans">
                {/* Header */}
                <div className="flex w-full justify-between gap-2">
                    <StackedTextRow label="GUNIQUE⠀G." />

                    {/* Button/Top */}
                    <button className="group flex cursor-pointer items-center gap-1 font-serif" onClick={scrollToTop}>
                        <ArrowUp className="text-icon-active ease-overshoot size-10 rotate-45 stroke-[1.5px] transition-all duration-300 group-hover:rotate-0" />
                    </button>
                </div>

                {/* Links */}
                <div className="flex flex-col gap-6">
                    {/* Socials */}
                    <List>
                        <ArrowLinkList
                            links={[
                                { label: "Linkedin", href: "https://www.linkedin.com/in/guniqueg/" },
                                { label: "Twitter / X", href: "https://x.com/bygunique" },
                                { label: "Instagram", href: "https://www.instagram.com/xsqu1znt/" }
                            ]}
                        />
                    </List>

                    {/* Extras */}
                    <LabeledList label="EXTRA">
                        <ArrowLinkList
                            links={[
                                { label: "Github", href: "https://github.com/xsqu1znt" },
                                { label: "Dribbble", href: "https://github.com/xsqu1znt" }
                            ]}
                        />
                    </LabeledList>

                    {/* Email */}
                    <LabeledList label="GENERAL INQUIRERS">
                        <UnderlineLink label="guniquegrimble@gmail.com" href="mailto:guniquegrimble@gmail.com" />
                    </LabeledList>

                    {/* Phone Number */}
                    <LabeledList label="HAWAII, USA">
                        <UnderlineLink label="+1 808 426-6141" href="tel:+18084266141" />
                    </LabeledList>
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
                <span className="text-foreground-dim w-full font-serif text-sm font-medium">
                    © {new Date().getFullYear()} | Designed & Built by Gunique G.
                </span>
            </footer>
        </div>
    );
}
