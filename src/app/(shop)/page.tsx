"use client";

import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import About from "@/components/home/About";
import Reviews from "@/components/home/Reviews";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <FeaturedProducts />
      <Reviews />

      {/* Final CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4 text-center mx-auto">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Ready to stitch some joy?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            Explore our collection of handcrafted crochet dolls and accessories, or reach out for a custom order made just for you.
          </p>
          <Button size="lg" className="rounded-full bg-primary text-white hover:scale-105 transition-transform px-8" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
