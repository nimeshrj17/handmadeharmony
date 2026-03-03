"use client";

import { useState, useEffect } from "react";
import { getClasses } from "@/lib/db";
import { ClassVideo } from "@/lib/types";
import { motion } from "framer-motion";
import { FileVideo, PlayCircle } from "lucide-react";

export default function ClassesPage() {
    const [classes, setClasses] = useState<ClassVideo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            const data = await getClasses();
            setClasses(data);
            setLoading(false);
        };
        fetchClasses();
    }, []);

    return (
        <div className="min-h-screen bg-background pt-8 pb-20">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header Section */}
                <div className="text-center space-y-4 mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-2"
                    >
                        <FileVideo className="h-8 w-8 text-primary" />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold font-heading text-foreground"
                    >
                        Learn with <span className="text-primary">Dharita</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Watch step-by-step crochet tutorials, learn new stitches, and bring your own yarn creations to life.
                    </motion.p>
                </div>

                {/* Videos Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="animate-pulse flex flex-col gap-4">
                                <div className="bg-muted rounded-2xl aspect-video w-full"></div>
                                <div className="h-6 bg-muted rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                ) : classes.length === 0 ? (
                    <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-primary/20">
                        <FileVideo className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold font-heading mb-2">No Classes Yet</h3>
                        <p className="text-muted-foreground">Check back soon for exciting new crochet tutorials!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {classes.map((cls, index) => (
                            <motion.a
                                href={cls.youtubeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={cls.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className="group block bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Thumbnail Container */}
                                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                    <img
                                        src={cls.thumbnailUrl}
                                        alt={cls.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                        <PlayCircle className="text-white w-16 h-16 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-md" />
                                    </div>
                                </div>

                                {/* Video Info */}
                                <div className="p-5">
                                    <h3 className="font-bold font-heading text-lg group-hover:text-primary transition-colors line-clamp-2">
                                        {cls.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                                        <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                                        Watch on YouTube
                                    </p>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
