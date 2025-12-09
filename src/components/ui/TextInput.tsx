"use client";

import { useUserClient } from "@/hooks/useUserClient";
import { cn } from "@/lib/utils";
import { useLenis } from "lenis/react";
import { ChangeEvent, ComponentProps, HTMLInputTypeAttribute, useRef } from "react";

export default function TextInput({
    id,
    type,
    label,
    placeholder,
    value,
    setValue,
    area,
    className,
    ...props
}: ComponentProps<"div"> & {
    type?: HTMLInputTypeAttribute;
    label: string;
    placeholder: string;
    value?: string;
    setValue?: (value: string) => void;
    area?: boolean;
}) {
    const lenis = useLenis();
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const { isMobile } = useUserClient();

    const handleFocus = () => {
        if (!isMobile) return;

        if (inputRef.current) {
            setTimeout(() => {
                lenis?.scrollTo(inputRef.current as any, { offset: -200, duration: 1 });
            }, 100);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setValue?.(e.target.value);
    };

    const TextArea = () => (
        <textarea
            ref={inputRef as any}
            onFocus={handleFocus}
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            className="placeholder:text-foreground-dim bg-foreground-dimmer focus:border-foreground-primary min-h-40 w-full resize-none rounded-md border border-white/5 px-4 py-3 transition-all duration-300 outline-none focus:min-h-52"
        />
    );

    const TextInput = () => (
        <input
            ref={inputRef as any}
            onFocus={handleFocus}
            type={type || "text"}
            id={id}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            className="placeholder:text-foreground-dim bg-foreground-dimmer focus:border-foreground-primary w-full rounded-md border border-white/5 px-4 py-3 transition-all duration-300 outline-none"
        />
    );

    return (
        <div {...props} className={cn("flex w-full flex-col gap-1", className)}>
            <label htmlFor={id} className="text-foreground-dim ml-2 text-xs tracking-tight">
                {label}
            </label>

            {area ? <TextArea /> : <TextInput />}
        </div>
    );
}
