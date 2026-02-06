export interface ServiceCardProps {
    index: number;
    title: string;
    description: string[];
    subtext: string;
    price: {
        starting?: string;
        monthly?: string;
        perPage?: string;
    };

    extraDetails: string[];
    handleContact?: (e: React.MouseEvent) => void;
}

export interface TestimonialCardProps {
    imageSrc: string;
    flagSrc?: string;
    name: string;
    handle: string;
    review: string | string[];
}
