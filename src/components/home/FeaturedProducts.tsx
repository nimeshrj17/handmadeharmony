"use client";

import { Product } from "@/lib/types";
import { getProducts } from "@/lib/db";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const FeaturedProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const allProducts = await getProducts();
                const featured = allProducts.filter(p => p.isFeatured);
                setProducts(featured);
            } catch (error) {
                console.error("Failed to fetch featured products", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <section className="py-20 bg-muted/30">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center mb-12 text-center space-y-4">
                    <span className="text-sm font-bold text-primary uppercase tracking-wider">Our Favorites</span>
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Featured Creations</h2>
                    <p className="max-w-2xl text-muted-foreground">
                        Handpicked favorites that bring the most joy. Each piece is unique and crafted with attention to detail.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="space-y-4">
                                <div className="h-64 bg-muted rounded-3xl animate-pulse" />
                                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                                <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                            </div>
                        ))
                    ) : products.length > 0 ? (
                        products.slice(0, 4).map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <ProductCard product={product} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-muted-foreground">
                            No featured products at the moment. Check back soon!
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <Button size="lg" variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white transition-colors" asChild>
                        <Link href="/products">View Full Collection</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
