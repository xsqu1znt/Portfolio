"use client";

import Button from "@/components/ui/Button";
import StringSelectMenu from "@/components/ui/StringSelectMenu";
import TextInput from "@/components/ui/TextInput";
import { AddonServices, MainServices } from "@/constants/services";
import { ArrowRight } from "lucide-react";

function ContactServiceForm() {
    return (
        <div className="flex flex-col gap-8">
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
            <section id="contact" className="section">
                {/* <SectionHeader title="// CONTACT" description="Let's get your business the attention it needs." /> */}

                <div className="flex w-full flex-col gap-2">
                    <span className="font-sans text-6xl font-bold tracking-tight">// CONTACT</span>
                    <span className="text-foreground-dim text-xl font-normal tracking-tight">Request an inquiry today.</span>
                </div>

                <ContactServiceForm />
            </section>
        </>
    );
}
