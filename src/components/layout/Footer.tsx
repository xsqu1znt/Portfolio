"use client";

import { useLenis } from "lenis/react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { ComponentProps } from "react";
import { MarqueeItem, VelocityMarquee } from "../ui/VelocityMarquee";
import { cn } from "@/lib/utils";

interface ArrowLinkProps {
    label: string;
    href: string;
    accent?: boolean;
    newTab?: boolean;
}

interface UnderlineLinkProps {
    underline: true;
    label: string;
    href: string;
    newTab?: boolean;
}

interface IconLinkProps {
    label: string;
    href: string;
    iconSrc: string;
    iconAlt: string;
    iconSize?: number;
    translateXMargin?: number;
    accent?: boolean;
    newTab?: boolean;
    reverseIconAlignment?: boolean;
}

function ArrowLink({ label, href, accent, newTab }: ArrowLinkProps) {
    return (
        <div className="group relative w-fit cursor-pointer overflow-hidden pr-8 text-2xl text-nowrap">
            <ArrowUpRight className="text-accent absolute top-1/2 left-0 size-6 -translate-x-6 -translate-y-1/2 -rotate-90 stroke-[1.5px] opacity-0 transition-all duration-200 group-hover:size-7 group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100" />
            <a
                className={`inline-block font-sans transition-all duration-250 group-hover:translate-x-7 ${accent ? "text-accent" : ""}`}
                href={href}
                target={newTab ? "_blank" : undefined}
                rel={newTab ? "noopener noreferrer" : undefined}
            >
                {label}
            </a>
        </div>
    );
}

function IconLink({
    label,
    href,
    iconSrc,
    iconAlt,
    iconSize = 7,
    translateXMargin = 8,
    accent,
    newTab,
    reverseIconAlignment
}: IconLinkProps) {
    return (
        <div className="group relative w-fit cursor-pointer pr-8 text-2xl text-nowrap">
            {/* Icon */}
            <img
                src={iconSrc}
                alt={iconAlt}
                className={`absolute top-1/2 left-0 size-${iconSize - 1} -translate-x-full -translate-y-1/2 -rotate-45 opacity-0 transition-all duration-200 group-hover:size-${iconSize} group-hover:translate-x-0 ${reverseIconAlignment ? "group-hover:-rotate-5" : "group-hover:rotate-5"} group-hover:opacity-100`}
            />
            {/* Delay effect */}
            <img
                src={iconSrc}
                alt={iconAlt}
                className={`absolute top-1/2 left-0 -z-10 size-${iconSize - 1} -translate-x-full -translate-y-1/2 -rotate-45 opacity-0 transition-all duration-350 group-hover:size-${iconSize} group-hover:translate-x-0 ${reverseIconAlignment ? "group-hover:-rotate-5" : "group-hover:rotate-5"} group-hover:opacity-50`}
            />
            {/* Glow */}
            <img
                src={iconSrc}
                alt={iconAlt}
                className={`absolute top-1/2 left-0 -z-10 blur-sm size-${iconSize - 1} -translate-x-full -translate-y-1/2 -rotate-45 opacity-0 transition-all duration-300 group-hover:size-${iconSize} group-hover:translate-x-0 ${reverseIconAlignment ? "group-hover:-rotate-5" : "group-hover:rotate-5"} group-hover:opacity-50`}
            />
            {/* Label */}
            <a
                className={`inline-block font-sans transition-all duration-250 group-hover:translate-x-${translateXMargin} ${accent ? "text-accent" : ""}`}
                href={href}
                target={newTab ? "_blank" : undefined}
                rel={newTab ? "noopener noreferrer" : undefined}
            >
                {label}
            </a>
        </div>
    );
}

function UnderlineLink({ label, href, newTab }: UnderlineLinkProps) {
    return (
        <div className="group relative w-fit cursor-pointer overflow-hidden text-nowrap">
            <a
                className="font-sans"
                href={href}
                target={newTab ? "_blank" : undefined}
                rel={newTab ? "noopener noreferrer" : undefined}
            >
                {label}
            </a>
            <div className="bg-accent absolute bottom-0 left-0 h-[1.25px] w-0 transition-all duration-200 group-hover:w-full" />
        </div>
    );
}

function LinkList({ links }: { links: (ArrowLinkProps | IconLinkProps | UnderlineLinkProps)[] }) {
    return links.map((link, i) => (
        <li key={i}>
            {"iconSrc" in link ? (
                <IconLink {...link} />
            ) : "underline" in link ? (
                <UnderlineLink {...link} />
            ) : (
                <ArrowLink {...link} />
            )}
        </li>
    ));
}

function List(props: ComponentProps<"ul">) {
    return <ul {...props} className="flex flex-col gap-1 font-serif" />;
}

function LabeledList({ label, children, ...props }: ComponentProps<"div"> & { label: string }) {
    return (
        <div {...props} className="flex w-fit flex-col">
            <span className="text-foreground-dim mb-4 cursor-default text-sm">{label}</span>
            <List>{children}</List>
        </div>
    );
}

export default function Footer() {
    const lenis = useLenis();

    const scrollToTop = () => {
        lenis?.scrollTo(0, { duration: 1 });
    };

    return (
        <div className="relative flex min-h-screen flex-col justify-end overflow-hidden">
            {/* Snow */}
            <video
                src="/videos/overlays/snow.mp4"
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 -z-50 w-screen opacity-15"
                style={{
                    maskImage: "linear-gradient(to bottom, transparent, black)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black)"
                }}
            />

            {/* Header */}
            <h3 className="px-4 text-center text-2xl font-light">Building spaces that inspire connections.</h3>

            {/* Footer */}
            <footer className="mt-8 flex flex-col">
                {/* Wrapper/Margin */}
                <div className="px-4">
                    <div className="border-foreground-dimmer relative grid w-full grid-cols-3 border-t py-8">
                        <LabeledList label="CONTACT">
                            <ul className="mb-4 text-2xl">
                                <li>Hawaii, USA</li>
                                <li>GMT-10</li>
                            </ul>

                            <LinkList
                                links={[
                                    {
                                        underline: true,
                                        label: "guniquegrimble@gmail.com",
                                        href: "mailto:guniquegrimble@gmail.com"
                                    },
                                    { underline: true, label: "+1 808 426-6141", href: "tel:+18084266141" }
                                ]}
                            />
                        </LabeledList>

                        <LabeledList label="SITEMAP">
                            <LinkList
                                links={[
                                    { label: "Work", href: "#work" },
                                    { label: "About", href: "#about" },
                                    { label: "Services", href: "#services" },
                                    { label: "Contact", href: "#contact" }
                                ]}
                            />
                        </LabeledList>

                        <LabeledList label="CONNECT">
                            <LinkList
                                links={[
                                    {
                                        label: "Linkedin",
                                        href: "https://www.linkedin.com/in/guniqueg/",
                                        iconSrc: "/icons/socials/linkedin.svg",
                                        iconAlt: "Linkedin"
                                    },
                                    {
                                        label: "Twitter / X",
                                        href: "https://x.com/bygunique",
                                        iconSrc: "/icons/socials/x.svg",
                                        iconAlt: "Twitter (X)",
                                        reverseIconAlignment: true
                                    },
                                    {
                                        label: "Github",
                                        href: "https://github.com/xsqu1znt",
                                        iconSrc: "/icons/socials/github-white.svg",
                                        iconAlt: "Github",
                                        iconSize: 6,
                                        translateXMargin: 7
                                    },
                                    { label: "Octave Labs", href: "https://octavelabs.com", accent: true }
                                ]}
                            />
                        </LabeledList>

                        {/* Button/Back to top */}
                        <button
                            className="group absolute top-6 right-0 flex cursor-pointer items-center gap-1 font-serif"
                            onClick={scrollToTop}
                        >
                            <ArrowUp className="text-icon-active ease-overshoot size-10 rotate-45 stroke-[1.5px] transition-all duration-300 group-hover:rotate-0" />
                        </button>
                    </div>

                    <div className="border-foreground-dimmer text-foreground-dim flex w-full items-center justify-between border-t border-b py-4 text-sm">
                        <span>© Copyright {new Date().getFullYear()}</span>

                        <span>
                            Designed & Built by <span className="font-semibold text-white/60">Gunique G.</span>
                        </span>
                    </div>
                </div>

                <div className="relative flex items-center justify-center overflow-hidden font-sans text-[21rem] leading-[0.9] font-semibold tracking-tighter select-none">
                    <VelocityMarquee baseVelocity={-1}>
                        <MarqueeItem
                            text="GUNIQUE"
                            className="bg-linear-to-b from-white/15 to-white/5 bg-clip-text text-transparent"
                        />
                    </VelocityMarquee>

                    <div
                        className="absolute top-1/2 left-0 h-full w-16 -translate-y-1/2 bg-linear-to-r from-black/50 to-transparent backdrop-blur-lg"
                        style={{
                            maskImage: "linear-gradient(to right, black, transparent)",
                            WebkitMaskImage: "linear-gradient(to right, black, transparent)"
                        }}
                    />
                    <div
                        className="absolute top-1/2 right-0 h-full w-16 -translate-y-1/2 bg-linear-to-l from-black/50 to-transparent backdrop-blur-lg"
                        style={{
                            maskImage: "linear-gradient(to left, black, transparent)",
                            WebkitMaskImage: "linear-gradient(to left, black, transparent)"
                        }}
                    />
                </div>
            </footer>
        </div>
    );
}

/* export default function Footer() {
    const lenis = useLenis();

    const scrollToTop = () => {
        lenis?.scrollTo(0, { duration: 1 });
    };

    return (
        <div className="mt-32 w-full px-4">
            <footer className="border-b-none flex w-full flex-col gap-8 rounded-t-md border border-foreground-dimmer bg-white/5 p-6 font-sans">
                <div className="flex w-full justify-between gap-2">
                    <StackedTextRow label="GUNIQUE⠀G." />

                    <button className="group flex cursor-pointer items-center gap-1 font-serif" onClick={scrollToTop}>
                        <ArrowUp className="text-icon-active ease-overshoot size-10 rotate-45 stroke-[1.5px] transition-all duration-300 group-hover:rotate-0" />
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                    <List>
                        <ArrowLinkList
                            links={[
                                { label: "Linkedin", href: "https://www.linkedin.com/in/guniqueg/" },
                                { label: "Twitter / X", href: "https://x.com/bygunique" },
                                { label: "Instagram", href: "https://www.instagram.com/xsqu1znt/" }
                            ]}
                        />
                    </List>

                    <LabeledList label="EXTRA">
                        <ArrowLinkList
                            links={[
                                { label: "Github", href: "https://github.com/xsqu1znt" },
                                { label: "Dribbble", href: "https://github.com/xsqu1znt" }
                            ]}
                        />
                    </LabeledList>

                    <LabeledList label="GENERAL INQUIRERS">
                        <UnderlineLink label="guniquegrimble@gmail.com" href="mailto:guniquegrimble@gmail.com" />
                    </LabeledList>

                    <LabeledList label="HAWAII, USA">
                        <UnderlineLink label="+1 808 426-6141" href="tel:+18084266141" />
                    </LabeledList>
                </div>

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

                <span className="text-foreground-dim w-full font-serif text-sm font-medium">
                    © {new Date().getFullYear()} | Designed & Built by Gunique G.
                </span>
            </footer>
        </div>
    );
} */
