"use client";

import { useState, useMemo, useEffect } from "react";
import { getProducts, getCategories } from "@/lib/db";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOption, setSortOption] = useState("default");
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>(["All"]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dbProducts, dbCategories] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);
                setProducts(dbProducts || []);
                setCategories(["All", "Free Patterns", ...dbCategories]);
            } catch (error) {
                console.error("Failed to fetch data", error);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            let matchesCategory = true;

            if (selectedCategory === "All") {
                matchesCategory = true;
            } else if (selectedCategory === "Free Patterns") {
                matchesCategory = product.hasFreePattern === true;
            } else {
                matchesCategory = product.category === selectedCategory;
            }

            return matchesSearch && matchesCategory;
        }).sort((a, b) => {
            switch (sortOption) {
                case "price-asc":
                    return a.price - b.price;
                case "price-desc":
                    return b.price - a.price;
                case "name-asc":
                    return a.name.localeCompare(b.name);
                case "name-desc":
                    return b.name.localeCompare(a.name);
                default:
                    // Sort by creation date or keep original order
                    // If createdAt exists, sort newest first
                    if (b.createdAt && a.createdAt) {
                        return b.createdAt.toMillis?.() - a.createdAt.toMillis?.() || 0;
                    }
                    return 0;
            }
        });
    }, [searchQuery, selectedCategory, sortOption, products]);

    return (
        <div className="min-h-screen bg-background py-12 md:py-20">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-12 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                        Our Collection
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Browse our handmade crochet treasures. From cuddly friends to charming decor, find something special.
                    </p>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2 justify-center">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category)}
                                className={`rounded-full transition-all ${selectedCategory === category
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "hover:bg-primary/10 hover:text-primary"
                                    }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>

                    {/* Search and Sort Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        {/* Search Input */}
                        <div className="relative w-full sm:w-64 md:w-72 items-center">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Search products..."
                                className="pl-10 h-10 rounded-full bg-white border-muted shadow-sm focus-visible:ring-primary w-full"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        
                        {/* Sort Dropdown */}
                        <select
                            className="flex h-10 w-full sm:w-48 rounded-full border border-muted bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="default">Sort by: Default</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                >
                    <AnimatePresence>
                        {isLoading ? (
                            // Loading Skeletons
                            Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="h-64 bg-muted rounded-3xl animate-pulse" />
                                    <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                                    <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                                </div>
                            ))
                        ) : filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <motion.div
                                    layout
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center py-20 text-muted-foreground"
                            >
                                No products found matching your criteria.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
