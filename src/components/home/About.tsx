"use client";

import { motion } from "framer-motion";
import { Smile, Key, Heart, Home } from "lucide-react";

const SERVICES = [
    {
        icon: Smile,
        title: "Custom Dolls",
        description: "Personalized crochet dolls made to look like you or your loved ones.",
        color: "bg-primary/10 text-primary",
    },
    {
        icon: Key,
        title: "Cute Keychains",
        description: "Tiny, adorable companions to carry with you everywhere.",
        color: "bg-secondary/20 text-secondary-foreground",
    },
    {
        icon: Heart,
        title: "Plushies",
        description: "Soft, huggable stuffed animals perfect for all ages.",
        color: "bg-accent/20 text-accent-foreground",
    },
    {
        icon: Home,
        title: "Home Decor",
        description: "Coasters, baskets, and more to add warmth to your space.",
        color: "bg-muted text-muted-foreground",
    },
];

const About = () => {
    return (
        <section id="about" className="pt-12 pb-16 md:pt-16 md:pb-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="inline-block rounded-full bg-secondary/30 px-3 py-1 text-sm font-medium text-secondary-foreground">
                            About the Artist
                        </div>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
                            From Learning Loops to Living the Dream 🧶✨
                        </h2>
                        <div className="space-y-4 text-muted-foreground">
                            <p className="text-lg leading-relaxed text-foreground/80">
                                If you’ve ever picked up a crochet hook “just to try” and ended up completely falling in love… hi, welcome to my world.
                            </p>
                            <p>
                                I’m Dharita — an amigurumi and crochet artist who started as a complete beginner. With zero experience but endless curiosity, I learned crochet step by step and later took a dedicated amigurumi course to truly understand the art of bringing characters to life.
                            </p>
                            <p>
                                There was no big plan — just practice, patience, and plenty of undone stitches. I frogged projects, fixed tiny details at midnight, and kept learning with every loop.
                            </p>
                            <p>
                                Somewhere between those learning phases and finished plushies, Handmade Harmony was born — a space where yarn transforms into tiny companions filled with warmth and personality.
                            </p>
                            <p>
                                Each piece is thoughtfully handcrafted with premium yarn, precision, and lots of love.
                            </p>
                            <p className="font-medium text-primary">
                                Because for me, amigurumi isn’t just crochet — it’s a dream built one stitch at a time. 💛
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                            {SERVICES.map((service, index) => (
                                <motion.div
                                    key={service.title}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-3 p-4 rounded-xl hover:bg-muted/30 transition-colors"
                                >
                                    <div className={`p-2 rounded-lg ${service.color}`}>
                                        <service.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-bold text-foreground">{service.title}</h4>
                                        <p className="text-sm text-muted-foreground">{service.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image/Illustration Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative mx-auto w-full max-w-[500px] aspect-square lg:order-last"
                    >
                        <div className="absolute inset-0 bg-primary/5 rounded-full blur-[100px] -z-10" />
                        <div className="w-full h-full relative rounded-[2rem] border-4 border-white shadow-xl overflow-hidden">
                            <img
                                src="/images/dharita.jpg"
                                alt="Dharita with crochet creations"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
