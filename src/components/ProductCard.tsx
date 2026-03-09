"use client";

import Image from "next/image";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ProductDetailDialog } from "@/components/ProductDetailDialog";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const phoneNumber = siteConfig.contact.phone; // Config
    const message = `Hi, I want to order ${product.name} priced at ₹${product.price}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <ProductDetailDialog product={product}>
            <div className="cursor-pointer group h-full">
                <Card className="h-full flex flex-col overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl bg-card">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                        {product.images[0] ? (
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-secondary/30 text-secondary-foreground font-medium">
                                No Image
                            </div>
                        )}
                        {!product.inStock && (
                            <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                                <div className="bg-amber-500 text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider shadow-md backdrop-blur-sm text-center">
                                    Place to order<br />to get it made
                                </div>
                            </div>
                        )}
                        {product.hasFreePattern && (
                            <div className="absolute bottom-2 left-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-bold shadow-sm">
                                Free Pattern
                            </div>
                        )}
                    </div>

                    <CardContent className="p-4 space-y-2 flex-grow">
                        <div className="flex justify-between items-start">
                            <h3 className="font-heading font-bold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                {product.name}
                            </h3>
                            <span className="font-bold text-primary">₹{product.price}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.description}
                        </p>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 gap-2 mt-auto">
                        <Button className="w-full rounded-full bg-green-500 hover:bg-green-600 text-white gap-2 pointer-events-none" asChild>
                            <span>
                                <MessageCircle size={16} />
                                Order
                            </span>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </ProductDetailDialog>
    );
};

export default ProductCard;
