"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Product } from "@/lib/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MessageCircle, FileText, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { siteConfig } from "@/lib/config";

interface ProductDetailDialogProps {
    product: Product;
    children: React.ReactNode;
}

export function ProductDetailDialog({ product, children }: ProductDetailDialogProps) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const phoneNumber = siteConfig.contact.phone;
    const message = `Hi, I want to order ${product.name} priced at ₹${product.price}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-background">
                <div className="grid md:grid-cols-2 h-[80vh] md:h-[500px]">
                    {/* Image Section - Banner Style */}
                    <div className="relative h-64 md:h-full w-full bg-muted flex flex-col">
                        <div className="relative flex-1 w-full bg-muted">
                            {product.images[selectedImageIndex] ? (
                                <Image
                                    src={product.images[selectedImageIndex]}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    No Image
                                </div>
                            )}
                            {/* Price Badge Overlay */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm z-10">
                                <span className="font-bold text-lg text-primary">₹{product.price}</span>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {product.images.length > 1 && (
                            <div className="flex gap-2 p-3 bg-background border-t overflow-x-auto no-scrollbar">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`relative w-14 h-14 rounded-md overflow-hidden flex-shrink-0 border-2 transition-all ${selectedImageIndex === idx ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col h-full overflow-hidden">
                        <DialogHeader className="p-6 pb-2">
                            <div className="flex justify-between items-start gap-2">
                                <DialogTitle className="text-2xl font-heading font-bold text-foreground">
                                    {product.name}
                                </DialogTitle>
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">{product.category}</p>
                        </DialogHeader>

                        <ScrollArea className="flex-1 px-6">
                            <div className="space-y-6 pb-6">
                                <div className="space-y-2">
                                    <h4 className="font-semibold text-foreground">Description</h4>
                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Free Pattern Section */}
                                {product.hasFreePattern && product.freePatternDetails && (
                                    <div className="bg-secondary/20 p-4 rounded-xl space-y-3 border border-secondary/30">
                                        <div className="flex items-center gap-2 text-secondary-foreground font-semibold">
                                            <FileText size={18} />
                                            <span>Free Pattern Included!</span>
                                        </div>
                                        <p className="text-sm text-foreground/80 whitespace-pre-line font-mono bg-white/50 p-3 rounded-lg border">
                                            {product.freePatternDetails}
                                        </p>
                                    </div>
                                )}
                                <div className="space-y-4 pt-4 border-t">
                                    <div className="bg-primary/5 p-3 rounded-xl border border-primary/10">
                                        <h4 className="text-xs font-bold text-foreground mb-1 flex items-center gap-1">
                                            <Sparkles size={14} className="text-primary" />
                                            Material & Care
                                        </h4>
                                        <ul className="text-[11px] space-y-0.5 list-none p-0 m-0 text-muted-foreground">
                                            <li><span className="font-semibold text-foreground">Material:</span> 100% cotton</li>
                                            <li><span className="font-semibold text-foreground">Cleaning Guide:</span> “Treat it gently—hand wash and let it rest flat to dry 💙</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </ScrollArea>

                        <div className="p-6 pt-2 mt-auto border-t bg-muted/10">
                            {product.inStock ? (
                                <Button className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white gap-2 h-12 text-lg shadow-md hover:shadow-lg transition-all" asChild>
                                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                        <MessageCircle size={20} />
                                        Order on WhatsApp
                                    </a>
                                </Button>
                            ) : (
                                <Button className="w-full rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 h-12 text-lg shadow-md hover:shadow-lg transition-all" asChild>
                                    <a href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(`Hi, I saw that ${product.name} is out of stock. I would like to get it back in stock!`)}`} target="_blank" rel="noopener noreferrer">
                                        <MessageCircle size={20} />
                                        Contact to get it back in stock
                                    </a>
                                </Button>
                            )}
                            <div className="mt-4 p-3 bg-muted/30 rounded-lg text-[10px] leading-relaxed text-muted-foreground">
                                <p className="font-bold mb-1 uppercase tracking-wider">Note on Colours</p>
                                <p>
                                    Slight variations in shades may occur due to dye lots or monitor settings. Darker shades may occasionally bleed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
