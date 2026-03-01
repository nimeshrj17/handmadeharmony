"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Product } from "@/lib/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MessageCircle, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { siteConfig } from "@/lib/config";

interface ProductDetailDialogProps {
    product: Product;
    children: React.ReactNode;
}

export function ProductDetailDialog({ product, children }: ProductDetailDialogProps) {
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
                    <div className="relative h-64 md:h-full w-full bg-muted">
                        {product.images[0] ? (
                            <Image
                                src={product.images[0]}
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
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                            <span className="font-bold text-lg text-primary">₹{product.price}</span>
                        </div>
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
                            </div>
                        </ScrollArea>

                        <div className="p-6 pt-2 mt-auto border-t bg-muted/10">
                            <Button className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white gap-2 h-12 text-lg shadow-md hover:shadow-lg transition-all" asChild>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                    <MessageCircle size={20} />
                                    Order on WhatsApp
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
