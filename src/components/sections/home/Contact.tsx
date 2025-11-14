"use client";

import SectionHeader from "@/components/layout/SectionHeader";
import StringSelectMenu from "@/components/ui/StringSelectMenu";
import TextInput from "@/components/ui/TextInput";
import { AddonServices, MainServices } from "@/constants/services";

export default function Contact() {
    return (
        <section id="contact" className="section">
            <SectionHeader title="// CONTACT" description="Let's get your business the attention it needs." />

            {/* Form/Contact */}
            <div className="mb-32 flex flex-col gap-8">
                {/* Field/Project Type */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="ssm-project-type" className="text-foreground-dim ml-2 text-xs tracking-tight">
                        PROJECT TYPE
                    </label>
                    <StringSelectMenu
                        id="ssm-project-type"
                        className="w-full"
                        direction="top"
                        options={[
                            ...MainServices.map(service => ({ id: service.title, label: service.title })),
                            ...AddonServices.map(service => ({ id: service.title, label: service.title }))
                        ]}
                    />
                </div>

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
                <div className="flex flex-col gap-1.5">
                    <button className="shade-3d bg-accent text-background-primary font-satoshi flex h-[50px] w-full items-center justify-center rounded-md px-4 py-2.5 font-bold">
                        SUBMIT
                    </button>
                </div>
            </div>
        </section>
    );
}
