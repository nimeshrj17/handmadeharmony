import { db, storage } from "./firebase";
import {
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    serverTimestamp
} from "firebase/firestore";
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import { Product } from "./types";

const COLLECTION_NAME = "products";

export const getProducts = async (): Promise<Product[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
            products.push({ id: doc.id, ...doc.data() } as Product);
        });
        return products;
    } catch (error) {
        console.error("Error getting products: ", error);
        return [];
    }
};

export const uploadImage = async (imageFile: File): Promise<string> => {
    try {
        const uniqueId = Math.random().toString(36).substring(7);
        const storageRef = ref(storage, `products/${Date.now()}_${uniqueId}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        return await getDownloadURL(snapshot.ref);
    } catch (error) {
        console.error("Error uploading image: ", error);
        throw error;
    }
}

export const addProduct = async (product: Omit<Product, "id">, imageFiles?: File[]): Promise<string> => {
    try {
        const imageUrls: string[] = [];
        if (imageFiles && imageFiles.length > 0) {
            const uploadPromises = imageFiles.map(file => uploadImage(file));
            const uploadedUrls = await Promise.all(uploadPromises);
            imageUrls.push(...uploadedUrls);
        }

        // Add image urls to product
        const productData = {
            ...product,
            images: [...(product.images || []), ...imageUrls],
            createdAt: serverTimestamp(),
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), productData);
        return docRef.id;
    } catch (error) {
        console.error("Error adding product: ", error);
        throw error;
    }
};

export const deleteProduct = async (id: string) => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
        console.error("Error deleting product: ", error);
        throw error;
    }
};

import { query, where, limit } from "firebase/firestore";

export const getProductBySlug = async (slug: string): Promise<Product | undefined> => {
    try {
        const q = query(collection(db, COLLECTION_NAME), where("slug", "==", slug), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return { id: doc.id, ...doc.data() } as Product;
        }
        return undefined;
    } catch (error) {
        console.error("Error getting product by slug: ", error);
        return undefined;
    }
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, updates);
    } catch (error) {
        console.error("Error updating product: ", error);
        throw error;
    }
};

// Reviews
const REVIEWS_COLLECTION = "reviews";
import { Review } from "./types";

export const getReviews = async (): Promise<Review[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, REVIEWS_COLLECTION));
        const reviews: Review[] = [];
        querySnapshot.forEach((doc) => {
            reviews.push({ id: doc.id, ...doc.data() } as Review);
        });
        return reviews;
    } catch (error) {
        console.error("Error getting reviews: ", error);
        return [];
    }
};

export const addReview = async (review: Omit<Review, "id" | "createdAt">): Promise<string> => {
    try {
        const reviewData = {
            ...review,
            createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), reviewData);
        return docRef.id;
    } catch (error) {
        console.error("Error adding review: ", error);
        throw error;
    }
};

export const deleteReview = async (id: string) => {
    try {
        await deleteDoc(doc(db, REVIEWS_COLLECTION, id));
    } catch (error) {
        console.error("Error deleting review: ", error);
        throw error;
    }
};
// Categories
const CATEGORIES_COLLECTION = "categories";
const DEFAULT_CATEGORIES = [
    "Toddler Treasures",
    "Bag & Key Charms",
    "Comfort Creations",
    "Handmade Hair Love",
    "Free Patterns"
];

export const getCategories = async (): Promise<string[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
        const categories: string[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data.name) categories.push(data.name);
        });

        // Initialize if empty
        if (categories.length === 0) {
            const batch = [];
            for (const cat of DEFAULT_CATEGORIES) {
                await addDoc(collection(db, CATEGORIES_COLLECTION), { name: cat });
                categories.push(cat);
            }
            return categories;
        }

        return categories.sort();
    } catch (error) {
        console.error("Error getting categories: ", error);
        return DEFAULT_CATEGORIES;
    }
};

export const addCategory = async (name: string): Promise<void> => {
    try {
        // Check for duplicates
        const q = query(collection(db, CATEGORIES_COLLECTION), where("name", "==", name));
        const existing = await getDocs(q);
        if (!existing.empty) return;

        await addDoc(collection(db, CATEGORIES_COLLECTION), { name });
    } catch (error) {
        console.error("Error adding category: ", error);
        throw error;
    }
};

export const deleteCategory = async (name: string): Promise<void> => {
    try {
        const q = query(collection(db, CATEGORIES_COLLECTION), where("name", "==", name));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (d) => {
            await deleteDoc(doc(db, CATEGORIES_COLLECTION, d.id));
        });
    } catch (error) {
        console.error("Error deleting category: ", error);
        throw error;
    }
};

// Classes
const CLASSES_COLLECTION = "classes";
import { ClassVideo } from "./types";

export const getClasses = async (): Promise<ClassVideo[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, CLASSES_COLLECTION));
        const classes: ClassVideo[] = [];
        querySnapshot.forEach((doc) => {
            classes.push({ id: doc.id, ...doc.data() } as ClassVideo);
        });

        // Sort by creation date (newest first) if createdAt exists
        return classes.sort((a, b) => {
            const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
            const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
            return timeB - timeA;
        });
    } catch (error) {
        console.error("Error getting classes: ", error);
        return [];
    }
};

export const addClass = async (classVideo: Omit<ClassVideo, "id" | "createdAt">): Promise<string> => {
    try {
        const classData = {
            ...classVideo,
            createdAt: serverTimestamp(),
        };
        const docRef = await addDoc(collection(db, CLASSES_COLLECTION), classData);
        return docRef.id;
    } catch (error) {
        console.error("Error adding class: ", error);
        throw error;
    }
};

export const deleteClass = async (id: string) => {
    try {
        await deleteDoc(doc(db, CLASSES_COLLECTION, id));
    } catch (error) {
        console.error("Error deleting class: ", error);
        throw error;
    }
};
// Enquiries
const ENQUIRIES_COLLECTION = "enquiries";

import { Enquiry } from "./types";

export const getEnquiries = async (): Promise<Enquiry[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, ENQUIRIES_COLLECTION));
        const enquiries: Enquiry[] = [];
        querySnapshot.forEach((doc) => {
            enquiries.push({ id: doc.id, ...doc.data() } as Enquiry);
        });

        // Sort by creation date (newest first)
        return enquiries.sort((a, b) => {
            const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
            const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
            return timeB - timeA;
        });
    } catch (error) {
        console.error("Error getting enquiries: ", error);
        return [];
    }
};

export const deleteEnquiry = async (id: string) => {
    try {
        await deleteDoc(doc(db, ENQUIRIES_COLLECTION, id));
    } catch (error) {
        console.error("Error deleting enquiry: ", error);
        throw error;
    }
};

export const submitEnquiry = async (enquiry: { name: string; email: string; phone: string; message: string }): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, ENQUIRIES_COLLECTION), {
            ...enquiry,
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error submitting enquiry: ", error);
        throw error;
    }
};
