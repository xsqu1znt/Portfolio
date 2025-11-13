import ServiceCard from "@/components/cards/ServiceCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { MainServices } from "@/constants/services";

export default function Services() {
    return (
        <section id="services" className="section">
            <SectionHeader title="// SERVICES" description="Design clean. Build clever. Ship fast." />

            {/* Service/Container */}
            <div className="flex flex-col">
                {MainServices.map((service, i) => (
                    <ServiceCard key={i} index={i + 1} {...service} />
                ))}
            </div>
        </section>
    );
}
