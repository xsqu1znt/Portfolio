import Hero from "@/components/sections/home/Hero";
import SelectedWork from "@/components/sections/home/SelectedWork";
import Services from "@/components/sections/home/Services";
import ExtraServices from "@/components/sections/home/ExtraServices";

export default function Home() {
    return (
        <main className="font-nunito flex min-h-screen min-w-[320px] flex-col gap-32 overflow-x-hidden">
            <Hero />
            <SelectedWork />
            <Services />
            <ExtraServices />
        </main>
    );
}
