"use client";

import SectionHeader from "@/components/layout/SectionHeader";
import Button from "@/components/ui/Button";
import StringSelectMenu, { StringSelectMenuOption } from "@/components/ui/StringSelectMenu";
import TextInput from "@/components/ui/TextInput";
import { AddonServices, MainServices } from "@/constants/services";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { ComponentProps, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "react-toastify";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const CAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;

function ContactForm({ className }: ComponentProps<"div">) {
    const recaptchaRef = useRef<ReCAPTCHA>(null);

    const [projectType, setProjectType] = useState("Landing Page");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [timeline, setTimeline] = useState("");
    const [budget, setBudget] = useState("");
    const [message, setMessage] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fieldsRequired, setFieldsRequired] = useState(false);

    const handleOptionSelect = (option: StringSelectMenuOption) => {
        setProjectType(option.label);
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        setFieldsRequired(false);

        const formData = { projectType, name, email, timeline, budget, message };

        try {
            if (!WEB3FORMS_KEY) {
                toast.error("Server configuration error.");
                throw new Error("Server configuration error: 0x1337");
            }

            const recaptchaToken = recaptchaRef.current?.getValue();

            if (!recaptchaToken) {
                toast.error("Please complete the reCAPTCHA.");
                return;
            }

            if (!formData.projectType || !formData.name || !formData.email || !formData.timeline || !formData.budget) {
                setFieldsRequired(true);
                toast.error("Please fill in all required fields.");
                return;
            }

            const recaptchaRes = await fetch("/api/captcha", {
                method: "POST",
                body: JSON.stringify({ token: recaptchaToken })
            });

            const recaptchaData = await recaptchaRes.json();

            if (!recaptchaRes.ok || !recaptchaData?.success) {
                recaptchaRef.current?.reset();
                toast.error("Failed to verify reCAPTCHA. Please try again.");
                return;
            }

            const formattedMessage = [
                "--- Project Details ---",
                `Project Type: ${formData.projectType || "N/A"}`,
                `Timeline: ${formData.timeline || "N/A"}`,
                `Budget: ${formData.budget || "N/A"}`,
                "",
                "--- Contact Information ---",
                `Name: ${formData.name || "N/A"}`,
                `Email: ${formData.email || "N/A"}`,
                "",
                "--- Message ---",
                `${formData.message || "No specific message provided."}`
            ].join("\n");

            const web3formsPayload = {
                access_key: WEB3FORMS_KEY,
                subject: `New Inquiry from ${formData.name}`,
                message: formattedMessage,
                email: formData.email
            };

            const web3formsRes = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(web3formsPayload),
                cache: "no-store"
            });

            const web3formsData = await web3formsRes.json();

            if (web3formsRes.ok && web3formsData.success) {
                toast.success("Thank you for reaching out! Expect a response within 24 hours.");
            } else {
                toast.error("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.log("Frontend Error: ", error);
            toast.error("A catastrophic error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className={cn(
                "bg-background-secondary relative w-full overflow-hidden rounded-md border-2 border-white/5 p-6",
                // Removed transition-colors to prevent the browser from listening for layout-triggered paint updates
                className
            )}
        >
            <div className="no-scrollbar z-10 flex h-full max-h-screen w-full flex-col gap-8 overflow-y-auto">
                <div className="w-full">
                    <h2 className="font-sans text-2xl font-semibold">Contact</h2>
                </div>

                <StringSelectMenu
                    id="ssm-project-type"
                    label="PROJECT TYPE*"
                    className="w-full"
                    options={[
                        ...MainServices.map(service => ({
                            id: service.title,
                            label: service.title,
                            description: service.description[0]
                        })),
                        ...AddonServices.map(service => ({
                            id: service.title,
                            label: service.title,
                            description: service.description[0]
                        })),
                        { id: "other", label: "Other", description: "Have something else in mind?" }
                    ]}
                    onOptionSelect={handleOptionSelect}
                    disabled={isSubmitting}
                />

                <div className="flex w-full gap-6">
                    <TextInput
                        id="input-name"
                        label="NAME*"
                        placeholder="John Smith"
                        className={cn("flex-[75%]", fieldsRequired && !name.length && "border-red-500")}
                        onTextChange={setName}
                        disabled={isSubmitting}
                    />

                    <TextInput
                        id="input-email"
                        type="email"
                        label="EMAIL*"
                        placeholder="johnsmith@gmail.com"
                        className={fieldsRequired && !email.length ? "border-red-500" : undefined}
                        onTextChange={setEmail}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="flex w-full gap-6">
                    <TextInput
                        id="input-timeline"
                        label="TIMELINE*"
                        placeholder="2 weeks"
                        className={fieldsRequired && !timeline.length ? "border-red-500" : undefined}
                        onTextChange={setTimeline}
                        disabled={isSubmitting}
                    />

                    <TextInput
                        id="input-budget"
                        label="BUDGET*"
                        placeholder="$1,500 USD"
                        className={cn("flex-[75%]", fieldsRequired && !budget.length && "border-red-500")}
                        onTextChange={setBudget}
                        disabled={isSubmitting}
                    />
                </div>

                <TextInput
                    area
                    id="input-message"
                    label="MESSAGE (optional)"
                    placeholder="Hello. I’m interested in one of your finest landing pages for my business."
                    onTextChange={setMessage}
                    disabled={isSubmitting}
                />

                <div className="flex flex-col items-center gap-4">
                    {CAPTCHA_SITE_KEY && <ReCAPTCHA ref={recaptchaRef} sitekey={CAPTCHA_SITE_KEY} />}

                    <Button
                        label="SEND INQUIRY"
                        variant="accent"
                        full
                        disabled={isSubmitting}
                        waiting={isSubmitting}
                        onClick={handleSubmit}
                    >
                        <ArrowRight className="text-background-primary size-5 stroke-[1.5px]" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function Contact() {
    return (
        <section id="contact" className="section relative items-center overflow-hidden">
            {/* FIX: GPU ISOLATION 
                We use translate3d and will-change to force this massive blur onto its own GPU layer.
                We also use content-visibility: auto to ensure the browser ignores it when not on screen.
            */}
            <div
                className="pointer-events-none absolute top-0 left-1/2 -z-10 size-280 rounded-full bg-linear-to-b from-white to-transparent opacity-10 blur-[250px] md:opacity-25"
                style={{
                    transform: "translate3d(-50%, -50%, 0)",
                    willChange: "transform",
                    contentVisibility: "auto"
                }}
            />

            <div className="mt-50 flex flex-col gap-10">
                <SectionHeader title="LET’S TALK" description="Your business deserves attention." className="items-center" />
                <ContactForm className="max-w-[500px]" />
            </div>
        </section>
    );
}
