"use client";

import { getProductBySlug } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft, Check, Star, Sparkles, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";
import { siteConfig } from "@/lib/config";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            const p = await getProductBySlug(params.slug);
            if (p) {
                setProduct(p);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [params.slug]);


    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return notFound();
    }

    const phoneNumber = siteConfig.contact.phone;
    const message = `Hi, I want to order ${product.name} priced at ₹${product.price}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <div className="min-h-screen bg-background py-10">
            <div className="container px-4 md:px-6 mx-auto">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Catalog
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Section */}
                    <div className="space-y-4">
                        <motion.div
                            layoutId={`image-${product.id}`}
                            className="relative aspect-square rounded-3xl overflow-hidden bg-muted border border-border"
                        >
                            {product.images.length > 0 ? (
                                <Image
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-secondary/20 text-secondary-foreground font-medium">
                                    No Image Available
                                </div>
                            )}
                        </motion.div>
                        {/* Thumbnails if multiple images (placeholder login) */}
                        {product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx ? "border-primary ring-2 ring-primary/30" : "border-transparent opacity-70 hover:opacity-100"
                                            }`}
                                    >
                                        <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary" className="bg-secondary/30 text-secondary-foreground hover:bg-secondary/40">
                                    {product.category}
                                </Badge>
                                {product.inStock ? (
                                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                        <Check size={12} className="mr-1" /> In Stock
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive">Out of Stock</Badge>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                                {product.name}
                            </h1>
                            <div className="flex items-baseline gap-4">
                                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                                {/* <span className="text-lg text-muted-foreground line-through">₹{product.price + 200}</span> */}
                            </div>
                        </div>

                        <div className="prose prose-stone dark:prose-invert max-w-none text-muted-foreground">
                            <p>{product.description}</p>
                            <p>
                                Every piece is handmade with love and care. Due to the nature of handmade items, slight variations may occur, making your item truly unique.
                            </p>
                            <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                                    <Sparkles size={16} className="text-primary" />
                                    Material & Care
                                </h4>
                                <ul className="text-sm space-y-1 list-none p-0 m-0">
                                    <li><span className="font-semibold">Material:</span> {product.material || "100% cotton"}</li>
                                    <li><span className="font-semibold">Cleaning Guide:</span> {product.careGuide || "“Treat it gently—hand wash and let it rest flat to dry 💙”"}</li>
                                </ul>
                            </div>
                        </div>

                        {product.availableColors.length > 0 && (
                            <div className="space-y-3">
                                <span className="text-sm font-bold text-foreground">Available Colors:</span>
                                <div className="flex flex-wrap gap-2">
                                    {product.availableColors.map((color) => (
                                        <div
                                            key={color}
                                            className="px-4 py-2 rounded-full border border-border bg-background text-sm font-medium shadow-sm"
                                        >
                                            {color}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="pt-8 border-t border-border">
                            <Button size="lg" className="w-full md:w-auto rounded-full bg-green-500 hover:bg-green-600 text-white gap-2 text-lg h-14 px-8" asChild>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <MessageCircle size={24} />
                                    Order Now on WhatsApp
                                </a>
                            </Button>
                            <p className="text-xs text-muted-foreground mt-4 text-center md:text-left">
                                Secure checkout via WhatsApp. We will confirm details and payment.
                            </p>
                            <div className="mt-6 p-4 bg-muted/30 rounded-xl text-[10px] leading-relaxed text-muted-foreground">
                                <p className="font-bold mb-1 uppercase tracking-wider">Product Colours & Care</p>
                                <p>
                                    Our yarns are sourced from reliable suppliers. Slight variations in shades may occur due to different dye lots or monitor settings. Refunds or exchanges cannot be made for minor color differences. Darker shades of yarn may occasionally bleed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

