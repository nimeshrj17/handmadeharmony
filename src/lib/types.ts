export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    images: string[];
    category: string;
    availableColors: string[];
    isFeatured: boolean;
    inStock: boolean;
    hasFreePattern?: boolean;
    freePatternDetails?: string;
    createdAt?: any; // Firebase Timestamp
}

export interface Review {
    id: string;
    name: string;
    rating: number;
    reviewText: string;
    image?: string;
    createdAt?: any;
}

export interface ClassVideo {
    id?: string;
    title: string;
    youtubeUrl: string;
    thumbnailUrl: string;
    createdAt?: any;
}

export interface Enquiry {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt?: any;
}
