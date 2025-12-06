"use client";

import SectionHeader from "@/components/layout/SectionHeader";
import Button from "@/components/ui/Button";
import StringSelectMenu from "@/components/ui/StringSelectMenu";
import TextInput from "@/components/ui/TextInput";
import { AddonServices, MainServices } from "@/constants/services";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { ComponentProps } from "react";

function ContactServiceForm({ className }: ComponentProps<"div">) {
    return (
        <div
            className={cn(
                "bg-background-secondary flex w-full flex-col gap-8 rounded-md border border-white/5 p-6",
                className
            )}
        >
            {/* Field/Project Type */}
            <StringSelectMenu
                id="ssm-project-type"
                label="PROJECT TYPE"
                className="w-full"
                // direction="top"
                options={[
                    ...MainServices.map(service => ({
                        id: service.title,
                        label: service.title,
                        description: service.description[0]
                    })),
                    ...AddonServices.map(service => ({
                        id: service.title,
                        label: service.title,
                        description: service.description[0]
                    })),
                    { id: "other", label: "Other", description: "Have something else in mind?" }
                ]}
            />

            {/* Grouped */}
            <div className="flex w-full gap-6">
                {/* Field/Name */}
                <TextInput id="input-name" label="NAME" placeholder="John Smith" className="flex-[75%]" />

                {/* Field/Email */}
                <TextInput id="input-email" type="email" label="EMAIL" placeholder="johnsmith@gmail.com" />
            </div>

            {/* Grouped */}
            <div className="flex w-full gap-6">
                {/* Field/Timeline */}
                <TextInput id="input-timeline" label="TIMELINE" placeholder="2 weeks" />

                {/* Field/Budget */}
                <TextInput id="input-budget" label="BUDGET" placeholder="$1,500 USD" className="flex-[75%]" />
            </div>

            {/* Field/Message */}
            <TextInput
                area
                id="input-message"
                label="MESSAGE"
                placeholder="Hello. I'm interested in one of your finest landing pages for my company."
            />

            {/* Button/Submit */}
            <Button label="SUBMIT" variant="accent" full>
                <ArrowRight className="text-background-primary size-5 stroke-[1.5px]" />
            </Button>
        </div>
    );
}

export default function Contact() {
    return (
        <>
            {/* Section/Contact */}
            <section id="contact" className="section relative mt-50 items-center overflow-hidden">
                <SectionHeader title="LET'S TALK" description="Your business deserves attention." className="items-center" />

                <div className="relative">
                    <div className="absolute bottom-0 left-1/2 -z-10 h-155 w-150 -translate-x-1/2 rounded-full bg-linear-to-b from-white opacity-10 blur-3xl" />

                    <ContactServiceForm className="max-w-[500px]" />
                </div>
            </section>
        </>
    );
}
