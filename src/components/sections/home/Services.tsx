import ServiceCard from "@/components/cards/ServiceCard";
import SectionHeader from "@/components/layout/SectionHeader";
import { MarqueeItem, VelocityMarquee } from "@/components/ui/VelocityMarquee";
import { AddonServices, MainServices } from "@/constants/services";
import { styles } from "@/constants/styles";

export default function Services() {
    return (
        <section id="services" className="section bg-background-secondary clip-path-services px-0 py-16">
            {/* Header */}
            <div className={`w-full ${styles.padding.section}`}>
                <SectionHeader
                    title="SERVICES"
                    description="Design clean. Build clever. Ship fast."
                    className="text-accent"
                />
            </div>

            {/* Wrapper/Services */}
            <div className={`w-full ${styles.padding.section}`}>
                <div className="bg-background-secondary divide-foreground-dimmer flex w-full flex-col divide-y overflow-hidden rounded-md">
                    {MainServices.map((service, i) => (
                        <ServiceCard key={i} index={i + 1} {...service} />
                    ))}
                </div>
            </div>

            {/* Marquee/Separator */}
            <VelocityMarquee
                baseVelocity={-2}
                className="text-background-primary bg-accent my-16 rotate-2 py-6 font-sans text-4xl font-semibold tracking-tighter uppercase md:my-32 md:text-6xl"
            >
                <MarqueeItem text="Looking for a specific service?" />
            </VelocityMarquee>

            {/* Wrapper/Extra Services */}
            <div className={`w-full ${styles.padding.section}`}>
                <div className="bg-background-secondary divide-foreground-dimmer flex w-full flex-col divide-y overflow-hidden rounded-md">
                    {AddonServices.map((service, i) => (
                        <ServiceCard key={i} index={i + 1 + MainServices.length} {...service} />
                    ))}
                </div>
            </div>
        </section>
    );
}
