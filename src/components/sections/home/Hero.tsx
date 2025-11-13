import Image from "next/image";

export default function Hero() {
    return (
        <section id="top" className="mt-32 w-full px-4">
            {/* Header Typography */}
            <div className="font-satoshi flex w-full flex-col gap-3">
                <span className="font-satoshi w-full text-4xl font-semibold">Gunique G.</span>
                <div className="@ flex w-full flex-col items-center justify-center leading-tight tracking-tight">
                    <div className="flex w-full items-center justify-end gap-4">
                        <Image src="/icons/arrow-right.svg" alt="arrow-right" width={0} height={0} className="w-14" />
                        <span className="text-accent text-right text-7xl font-bold whitespace-nowrap">WEB</span>
                    </div>
                    <span className="w-full text-[16cqw] font-bold whitespace-nowrap">DEVELOPER</span>
                    <span className="w-full text-[16.6cqw] font-bold whitespace-nowrap">| DESIGNER</span>
                </div>
                <span className="text-foreground-dim w-full text-2xl font-semibold">
                    FOUNDER // <span className="text-accent">OCTAVELABS</span>
                </span>
            </div>

            {/* Placeholder Graphic */}
            <div className="mt-20 flex h-full w-full flex-col gap-6">
                <Image
                    src="/images/placeholder-graphic.jpg"
                    alt="placeholder-graphic"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-14 w-full rounded-md object-cover object-[0_95%]"
                />
                <Image
                    src="/images/placeholder-graphic.jpg"
                    alt="placeholder-graphic"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-14 w-full rounded-md object-cover object-top"
                />
                <Image
                    src="/images/placeholder-graphic.jpg"
                    alt="placeholder-graphic"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-14 w-full rounded-md object-cover object-[0_50%]"
                />
                <Image
                    src="/images/placeholder-graphic.jpg"
                    alt="placeholder-graphic"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-14 w-full rounded-md object-cover object-bottom"
                />
            </div>
        </section>
    );
}
