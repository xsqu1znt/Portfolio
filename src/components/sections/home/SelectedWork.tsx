import ShowreelCard from "@/components/cards/ShowreelCard";
import SectionHeader from "@/components/ui/SectionHeader";

export default function SelectedWork() {
    return (
        <section id="work" className="section">
            <SectionHeader title="// SELECTED WORK" description="Some of my favorite pieces." />

            {/* Showreel/Container */}
            <div className="relative mt-9 w-full">
                <div className="relative flex w-full -translate-x-32 gap-4">
                    {/* Align/Left */}
                    <div className="flex flex-col gap-4">
                        <ShowreelCard />
                        <ShowreelCard src="/images/showreel/004.png" />
                        <ShowreelCard />
                        <ShowreelCard />
                    </div>

                    {/* Align/Center */}
                    <div className="flex -translate-y-9 flex-col gap-4">
                        <ShowreelCard />
                        <ShowreelCard src="/images/showreel/001.png" />
                        <ShowreelCard src="/images/showreel/002.png" />
                        <ShowreelCard />
                    </div>

                    {/* Align/Right */}
                    <div className="flex flex-col gap-4">
                        <ShowreelCard />
                        <ShowreelCard src="/images/showreel/003.png" />
                        <ShowreelCard />
                        <ShowreelCard />
                    </div>
                </div>
                {/* TODO: Add bottom fade out gradient */}
                <div className="absolute bottom-0 left-0 -ml-4 h-[50px] w-screen bg-linear-to-b from-transparent to-black" />
            </div>
        </section>
    );
}
