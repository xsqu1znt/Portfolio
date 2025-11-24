import Branding from "@/components/sections/home/Branding";
import Contact from "@/components/sections/home/Contact";
import Contact_Screen from "@/components/sections/home/Contact_Screen";
import ExtraServices from "@/components/sections/home/ExtraServices";
import FAQs from "@/components/sections/home/FAQs";
import Hero from "@/components/sections/home/Hero";
import FeaturedWork from "@/components/sections/home/FeaturedWork";
import Services from "@/components/sections/home/Services";

export default function Home() {
    return (
        <main className="flex min-h-screen min-w-[320px] flex-col">
            <Hero />
            <FeaturedWork />
            <Branding />
            <Services />
            <ExtraServices />
            <Contact_Screen />
            <Contact />
            <FAQs />
        </main>
    );
}
