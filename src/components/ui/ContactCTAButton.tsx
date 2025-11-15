"use client";

import { useLenis } from "lenis/react";
import { ChevronRight } from "lucide-react";
import Button from "./Button";

export default function ContactCTAButton({ label }: { label: string }) {
    const lenis = useLenis();

    const scrollToContact = () => {
        lenis?.scrollTo("#contact", { offset: -100 });
    };

    return (
        <div className="mt-8 flex flex-col gap-1.5">
            <span className="text-xl font-light tracking-tight">{label}</span>

            <Button label="LET'S TALK" variant="accent" full onClick={scrollToContact}>
                <ChevronRight className="h-6 stroke-[1.5px]" />
            </Button>
        </div>
    );
}
