import ServiceCard from "@/components/cards/ServiceCard";
import SectionHeader from "@/components/layout/SectionHeader";
import ContactCTAButton from "@/components/ui/ContactCTAButton";
import { AddonServices, MainServices } from "@/constants/services";

export default function ExtraServices() {
    return (
        <section id="services" className="section">
            <SectionHeader title="EXTRA //" description="Looking for a specific service?" align="right" />

            {/* Extra Service/Container */}
            <div className="bg-foreground-dimmer divide-foreground-dimmer flex flex-col divide-y overflow-hidden rounded-md">
                {AddonServices.map((service, i) => (
                    <ServiceCard key={i} index={i + 1 + MainServices.length} {...service} />
                ))}
            </div>

            <ContactCTAButton label="Have a question or new idea?" />
        </section>
    );
}
