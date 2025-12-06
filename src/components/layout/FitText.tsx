import React, { useRef, useState, useLayoutEffect, useEffect } from "react";

interface FitTextProps {
    children: React.ReactNode;
    className?: string;
    minFontSize?: number;
    maxFontSize?: number;
}

const FitText: React.FC<FitTextProps> = ({ children, className = "", minFontSize = 12, maxFontSize = 200 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const [fontSize, setFontSize] = useState<number>(maxFontSize);

    // The calculation logic
    const fitText = () => {
        const container = containerRef.current;
        const text = textRef.current;

        if (!container || !text) return;

        // 1. Get the width of the container
        const containerWidth = container.offsetWidth;

        // 2. We need the "natural" width of the text.
        // To get this accurately without the current font-size limiting us,
        // we can use a ratio based on the current metrics.
        const textWidth = text.offsetWidth;
        const currentFontSize = parseFloat(window.getComputedStyle(text).fontSize);

        // Guard against divide by zero or empty elements
        if (textWidth === 0) return;

        // 3. Calculate the new size: (Container / Text) * CurrentSize
        let newFontSize = (containerWidth / textWidth) * currentFontSize;

        // 4. Clamp the results
        newFontSize = Math.max(minFontSize, Math.min(newFontSize, maxFontSize));

        setFontSize(newFontSize);
    };

    // useLayoutEffect prevents the "flash" of unstyled content
    useLayoutEffect(() => {
        fitText();
    }, [children, minFontSize, maxFontSize]);

    // Observer to handle window resizing or dynamic container changes
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new ResizeObserver(() => {
            // When the container resizes, we assume we need to recalculate.
            // However, to get an accurate "up-scaling" measurement, we temporarily
            // reset to the max size or a stable baseline if the text has wrapped or shrunk too much.
            // But for single line text, simply re-running fitText usually works
            // provided the text element is inline-block or similar.
            fitText();
        });

        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className={className} style={{ width: "100%", overflow: "hidden" }}>
            <span
                ref={textRef}
                className="inline-block whitespace-nowrap"
                style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: 1 // Prevents clipping issues
                    // transition: "font-size 0.1s ease-out" // Optional: smooths jitter
                }}
            >
                {children}
            </span>
        </div>
    );
};

export default FitText;
