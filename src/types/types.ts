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

    handleContact?: () => void;
    extraDetails?: string;
}
