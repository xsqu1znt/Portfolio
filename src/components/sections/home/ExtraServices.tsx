import ServiceCard from "@/components/cards/ServiceCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { AddonServices, MainServices } from "@/constants/services";
import { ChevronRight } from "lucide-react";

export default function ExtraServices() {
    return (
        <section id="services" className="section">
            <SectionHeader title="EXTRA //" description="Looking for a specific service?" align="right" />

            {/* Extra Service/Container */}
            <div className="flex flex-col">
                {AddonServices.map((service, i) => (
                    <ServiceCard key={i} index={i + 1 + MainServices.length} {...service} />
                ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-1.5">
                <span className="text-2xl font-light tracking-tighter">Have a question or new idea?</span>
                <button className="shade-3d bg-accent text-background-primary font-satoshi flex h-[50px] w-full items-center justify-center rounded-md px-4 py-2.5 font-bold">
                    LET'S TALK
                    <ChevronRight className="-mr-2 ml-1 h-6 stroke-[1.5px]" />
                </button>
            </div>
        </section>
    );
}
