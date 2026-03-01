"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-background pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-60" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-muted/30 rounded-full blur-3xl -z-10" />

            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4 max-w-3xl"
                    >
                        <div className="inline-block rounded-full bg-secondary/30 px-3 py-1 text-sm font-medium text-secondary-foreground mb-4">
                            ✨ Handcrafted with Love
                        </div>
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-heading text-foreground">
                            Smile Stitched. <br />
                            <span className="text-primary">Joy Delivered.</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Discover the magic of handmade crochet. From adorable dolls to charming accessories,
                            Handmade Harmony brings warmth and cuteness to your world.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 min-[400px]:flex-row justify-center"
                    >
                        <Button size="lg" className="rounded-full bg-primary text-white hover:scale-105 transition-transform shadow-lg hover:shadow-primary/25" asChild>
                            <Link href="/products">
                                Explore Collection
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full hover:scale-105 transition-transform" asChild>
                            <Link href="/contact">
                                Custom Order
                            </Link>
                        </Button>
                    </motion.div>

                    {/* Hero Images/Carousel */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="relative mt-10 md:mt-16 w-full max-w-5xl aspect-[4/3] sm:aspect-[16/6] lg:aspect-[16/5]"
                    >
                        <div className="grid grid-cols-3 gap-2 md:gap-4 h-full">
                            <div className="relative rounded-xl md:rounded-2xl overflow-hidden h-full w-full hover:scale-[1.02] transition-transform duration-300 shadow-md">
                                <Image src="/images/hero-elephant.jpg" alt="Handmade Crochet Elephant" fill className="object-cover" />
                            </div>
                            <div className="relative rounded-xl md:rounded-2xl overflow-hidden h-full w-full hover:scale-[1.02] transition-transform duration-300 shadow-md mt-4 md:mt-8">
                                <Image src="/images/hero-krishna.jpg" alt="Handmade Crochet Krishna Doll" fill className="object-cover" />
                            </div>
                            <div className="relative rounded-xl md:rounded-2xl overflow-hidden h-full w-full hover:scale-[1.02] transition-transform duration-300 shadow-md">
                                <Image src="/images/hero-red-bird.jpg" alt="Handmade Crochet Red Bird Keychain" fill className="object-cover" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
