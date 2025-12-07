import { useHandleClickOutside } from "@/hooks/useHandleClickOutside";
import { cn } from "@/lib/utils";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useLenis } from "lenis/react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { NoTouchPropagation } from "../common/NoTouchPropagation";

export type StringSelectStyles = "primary";
export type StringSelectSizes = "normal";

export interface StringSelectMenuOption {
    id: string;
    label: string;
    description?: string | string[];
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    placeholder?: string;
    variant?: StringSelectStyles;
    direction?: "top" | "bottom";
    size?: StringSelectSizes;
    options: StringSelectMenuOption[];
    full?: boolean;
    onOptionSelect?: (option: StringSelectMenuOption) => void;
}

// prettier-ignore
export const stringSelectStyles: Record<StringSelectStyles, string> = {
    primary: "border border-white/5 bg-foreground-dimmer hover:bg-white/15 focus:bg-white/15",
};

export const stringSelectSizes: Record<StringSelectSizes, string> = {
    normal: "px-6 py-3 gap-6"
};

export const stringSelectMinWidths: Record<StringSelectSizes, string> = {
    normal: "min-w-50"
};

export const stringSelectTextSizes: Record<StringSelectSizes, string> = {
    normal: "text-base"
};

/* TODO: Add keyboard support. */
export default function StringSelectMenu({
    id,
    label,
    placeholder,
    options,
    size,
    variant,
    direction,
    full,
    onOptionSelect,
    className,
    ...props
}: Props) {
    const lenis = useLenis();

    const styleVariant = stringSelectStyles[variant || "primary"];
    const styleSize = stringSelectSizes[size || "normal"];
    const styleMinWidth = stringSelectMinWidths[size || "normal"];
    const styleTextSize = stringSelectTextSizes[size || "normal"];

    const [selected, setSelected] = useState<StringSelectMenuOption | null>(placeholder ? null : options[0]);
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    useHandleClickOutside(buttonRef, () => setIsOpen(false));

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    setIsOpen(false);
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div ref={buttonRef} className={cn("flex flex-col gap-1", full && "w-full")}>
            <label htmlFor={id} className="text-foreground-dim ml-2 text-xs tracking-tight">
                {label}
            </label>

            <div className={cn("relative", full && "w-full")}>
                <button
                    id={id}
                    className={cn(
                        `group relative flex w-fit cursor-pointer items-center justify-between rounded-md px-4 py-3 transition-all duration-300`,
                        styleVariant,
                        styleSize,
                        styleMinWidth,
                        styleTextSize,
                        full && "w-full",
                        isOpen && (direction === "top" ? "rounded-t-none" : "rounded-b-none"),
                        isOpen && "border-transparent",
                        className
                    )}
                    onClick={toggleOpen}
                >
                    <span className={cn("text-nowrap")}>{!selected && placeholder ? placeholder : selected?.label}</span>
                    <div className={"relative -mr-2 size-7"}>
                        <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            color="currentColor"
                            className="absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 stroke-[1.5px] transition-all duration-300 group-hover:size-8"
                        />
                    </div>
                </button>

                {isOpen && (
                    <NoTouchPropagation>
                        <motion.ul
                            className={cn(
                                "no-scrollbar divide-foreground-dimmer absolute z-10 max-h-52 w-full touch-pan-y divide-y overflow-x-hidden overflow-y-auto border border-white/5 bg-[#141312]",
                                direction === "top"
                                    ? "bottom-full border-b-transparent"
                                    : "top-full rounded-b-md border-t-transparent"
                            )}
                            initial={{ opacity: 0, y: direction === "top" ? 10 : -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, ease: "circInOut" }}
                        >
                            {options.map((opt, i) => {
                                const handleSelect = () => {
                                    setSelected(opt);
                                    onOptionSelect?.(opt);
                                    setIsOpen(false);
                                };

                                return (
                                    <li
                                        key={i}
                                        onClick={handleSelect}
                                        className={cn(
                                            "text-foreground-primary w-full cursor-pointer px-4 py-3 transition-all duration-300 hover:bg-white/5 focus:bg-white/5",
                                            selected?.id === opt.id && "bg-white/10"
                                        )}
                                    >
                                        {opt.label}
                                        {opt.description && Array.isArray(opt.description) ? (
                                            opt.description.map((d, i) => (
                                                <p key={i} className="text-foreground-dim text-xs">
                                                    {d}
                                                </p>
                                            ))
                                        ) : (
                                            <p className="text-foreground-dim text-xs">{opt.description}</p>
                                        )}
                                    </li>
                                );
                            })}
                        </motion.ul>
                    </NoTouchPropagation>
                )}
            </div>
        </div>
    );
}
