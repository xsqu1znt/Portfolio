import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

type Props = {
    value: number;
    direction?: "up" | "down";
    className?: string;
};

export default function AnimateNumber({ value, direction = "up", className }: Props) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(direction === "down" ? value : 0);
    const springValue = useSpring(motionValue, {
        damping: 100,
        stiffness: 200
    });
    const isInView = useInView(ref, { once: true /* margin: "-250px" */ });

    useEffect(() => {
        if (isInView) {
            motionValue.set(direction === "down" ? 0 : value);
        }
    }, [motionValue, isInView]);

    useEffect(
        () =>
            springValue.on("change", latest => {
                if (ref.current) {
                    ref.current.textContent = Intl.NumberFormat("en-US").format(parseInt(latest.toFixed(0)));
                }
            }),
        [springValue]
    );

    return <span className={className} ref={ref} />;
}
