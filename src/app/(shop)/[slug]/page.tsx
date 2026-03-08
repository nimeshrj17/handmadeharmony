import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SEO_PAGES, getSeoPageBySlug, getRelatedSeoPages } from "@/lib/seo-data";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return SEO_PAGES.map((page) => ({
        slug: page.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const pageData = getSeoPageBySlug(slug);

    if (!pageData) {
        return {
            title: "Page Not Found | Handmade Harmony",
        };
    }

    return {
        title: pageData.title,
        description: pageData.description,
        openGraph: {
            title: pageData.title,
            description: pageData.description,
            type: "article",
        },
        alternates: {
            canonical: `https://www.handmadeharmony.in/${pageData.slug}`,
        },
    };
}

export default async function ProgrammaticSeoPage({ params }: Props) {
    const { slug } = await params;
    const pageData = getSeoPageBySlug(slug);

    if (!pageData) {
        notFound();
    }

    const relatedPages = getRelatedSeoPages(pageData.slug, pageData.category);

    const isTutorial = ['learning', 'beginner', 'tutorial'].includes(pageData.category);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": isTutorial ? "HowTo" : "Article",
        "name": pageData.title,
        "headline": pageData.title,
        "description": pageData.description,
        "author": {
            "@type": "Organization",
            "name": "Handmade Harmony",
            "url": "https://www.handmadeharmony.in"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Handmade Harmony",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.handmadeharmony.in/logo.jpg"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.handmadeharmony.in/${pageData.slug}`
        },
        ...(isTutorial && {
            "step": [
                {
                    "@type": "HowToStep",
                    "name": "Start with a slip knot",
                    "text": "Everything starts here. Pull the yarn through a small loop to secure your first stitch on the hook."
                },
                {
                    "@type": "HowToStep",
                    "name": "Foundation Chain",
                    "text": "Create your base row. Try to keep your tension consistent—not too tight, not too loose."
                }
            ]
        })
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
                {/* Breadcrumbs */}
                <nav className="text-sm text-muted-foreground mb-8">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href={`/${pageData.category}s`} className="hover:text-primary transition-colors capitalize">
                        {pageData.category}s
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-foreground capitalize">{pageData.topic}</span>
                </nav>

                {/* Hero Section */}
                <header className="mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 capitalize">
                        {pageData.h1}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                        {pageData.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="rounded-full bg-primary text-white hover:scale-105 transition-transform" asChild>
                            <Link href="/products">Explore Handmade Crochet Products</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full hover:scale-105 transition-transform" asChild>
                            <Link href="/classes">Join Crochet Classes</Link>
                        </Button>
                    </div>
                </header>

                {/* Image Section */}
                <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden mb-16 shadow-lg">
                    <Image
                        src="/images/hero-elephant.jpg"
                        alt={`Beautiful handmade crochet products and ${pageData.topic} for beginners`}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Content Structure */}
                <div className="prose prose-lg dark:prose-invert max-w-none space-y-12 text-foreground/80">

                    {['learning', 'beginner', 'tutorial'].includes(pageData.category) ? (
                        <>
                            <section id="basics">
                                <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">1. The Basics of {pageData.topic}</h2>
                                <p>Welcome to your complete guided path for <strong>{pageData.topic}</strong>. Getting started with crochet doesn't have to be overwhelming. At Handmade Harmony, we believe anyone can master the art of crochet with the right foundation.</p>
                            </section>

                            <section id="tools">
                                <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">2. Tools Needed for {pageData.topic}</h2>
                                <p>Before you dive in, make sure your toolkit is ready. We highly recommend:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                                    <li><strong>Crochet Hooks:</strong> Start with a comfortable 4.0mm or 5.0mm ergonomic hook.</li>
                                    <li><strong>Yarn:</strong> Medium weight (worsted) acrylic or cotton blend yarn is easiest for beginners learning {pageData.topic}.</li>
                                    <li><strong>Accessories:</strong> Stitch markers, a tapestry needle, and small scissors.</li>
                                </ul>
                            </section>

                            {/* Secondary Image */}
                            <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-lg my-12">
                                <Image src="/images/hero-krishna.jpg" alt={`Crochet handmade gifts and tutorial tools for ${pageData.topic}`} fill className="object-cover" />
                            </div>

                            <section id="step-by-step">
                                <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">3. Step-by-Step {pageData.topic} Guide</h2>
                                <p>Follow these steps closely to master {pageData.topic}:</p>
                                <ol className="list-decimal pl-6 space-y-2 mt-4 text-muted-foreground">
                                    <li><strong>The Slip Knot:</strong> Everything starts here. Pull the yarn through a small loop to secure your first stitch on the hook.</li>
                                    <li><strong>Foundation Chain:</strong> Create your base row. Try to keep your tension consistent—not too tight, not too loose.</li>
                                    <li><strong>First Stitches:</strong> Work a row of single crochets (sc) into your main chain to build the fabric.</li>
                                </ol>
                                <p className="mt-4">Need to see it in action? Take our deep-dive <Link href="/learn-crochet-online" className="text-primary hover:underline font-medium">expert-led crochet class</Link>.</p>
                            </section>

                            <section id="beginner-projects">
                                <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">4. Beginner Projects</h2>
                                <p>The best way to solidify your skills in {pageData.topic} is to practice with real projects! We recommend starting with a simple <Link href="/crochet-coaster-patterns" className="text-primary hover:underline">crochet coaster</Link> or easy scarf pattern before attempting complex amigurumi dolls.</p>
                            </section>
                        </>
                    ) : pageData.category === 'gift' ? (
                        <>
                            <section id="why-special">
                                <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">1. Why Handmade Crochet Gifts Are Special</h2>
                                <p>Looking for the perfect gift? Nothing says "I care about you" quite like a handmade crochet piece. Unlike mass-produced items, <strong>{pageData.topic}</strong> carries the warmth, time, and heart of the artisan who made it here in India.</p>
                            </section>

                            <section id="popular-ideas">
                                <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">2. Popular {pageData.topic} Ideas</h2>
                                <p>Not sure what to pick? Consider these top-selling options:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                                    <li><strong>Amigurumi Dolls:</strong> Cute, customizable crochet dolls reflecting the recipient's personality.</li>
                                    <li><strong>Crochet Keychains:</strong> A small, budget-friendly token of love they can carry everywhere.</li>
                                    <li><strong>Coasters and Decor:</strong> Practical yet beautiful items that enhance any home aesthetic.</li>
                                </ul>
                            </section>

                            {/* Secondary Image */}
                            <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-lg my-12">
                                <Image src="/images/hero-krishna.jpg" alt={`Top unique ${pageData.topic} gifts`} fill className="object-cover" />
                            </div>

                            <section id="occasions">
                                <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">3. {pageData.topic} for Different Occasions</h2>
                                <p>Handmade crochet gifts are universally loved, whether it's a cozy scarf for a <strong>winter birthday</strong>, a beautiful table runner for a <strong>housewarming party</strong>, or an adorable plushie for a <strong>baby shower</strong>. Browse our <Link href="/products" className="text-primary hover:underline">product catalog</Link> to find exactly what you need.</p>
                            </section>
                        </>
                    ) : pageData.category === 'business' ? (
                        <>
                            <section id="how-to-start">
                                <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">1. How to Start Your {pageData.topic}</h2>
                                <p>Turning a hobby into a business can be daunting, but the market for <strong>{pageData.topic}</strong> in India is rapidly growing. The key is finding your niche—whether that's amigurumi dolls, modern clothing, or aesthetic home decor—and building a strong portfolio of high-quality products.</p>
                            </section>

                            <section id="pricing">
                                <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">2. Pricing Your Crochet Handmade Products</h2>
                                <p>Pricing is the hardest part. Make sure you calculate the exact cost of your yarn AND pay yourself a fair hourly wage for your labor. A common formula is: `(Cost of Materials + Hourly Labor) x 2.5 = Retail Price`.</p>
                            </section>

                            {/* Secondary Image */}
                            <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-lg my-12">
                                <Image src="/images/hero-krishna.jpg" alt={`How to sell and start a business involving ${pageData.topic}`} fill className="object-cover" />
                            </div>

                            <section id="selling-online">
                                <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">3. Where to Sell Your Products</h2>
                                <p>Start by tapping into Instagram and local WhatsApp groups. As you scale, platforms like Etsy India, Amazon Karigar, or your own dedicated e-commerce storefront (just like Handmade Harmony) will help you reach a massive, dedicated audience.</p>
                            </section>
                        </>
                    ) : (
                        <>
                            <section id="introduction">
                                <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">1. Introduction to {pageData.topic}</h2>
                                <p>Welcome to the ultimate guide on <strong>{pageData.topic}</strong>. Whether you are shopping for high-quality handmade crochet items or seeking inspiration for your next project, {pageData.topic} is a wonderful world to explore. At Handmade Harmony, we specialize in authentic, adorable crochet craftsmanship.</p>
                            </section>

                            <section id="why-popular">
                                <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">2. Why {pageData.topic} Is So Popular</h2>
                                <p>The demand for <em>{pageData.topic}</em> in India has skyrocketed. People are increasingly pivoting toward sustainable, artisan-made products that tell a story—moving away from mass-produced plastics. Buying {pageData.topic} directly supports local creators and artists.</p>
                            </section>

                            {/* Secondary Image */}
                            <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-lg my-12">
                                <Image src="/images/hero-krishna.jpg" alt={`Discover ${pageData.topic} at Handmade Harmony`} fill className="object-cover" />
                            </div>

                            <section id="exploring">
                                <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">3. Exploring {pageData.topic}</h2>
                                <p>When browsing for {pageData.topic}, look out for tight, clean stitching and high-quality yarn that won't pill or fuzz easily. Our artisan, Dharita, ensures every piece shipped from Handmade Harmony meets rigorous quality checks.</p>
                                <p className="mt-4">If {pageData.topic} has inspired you to pick up a hook yourself, don't miss our <Link href="/how-to-crochet-for-beginners" className="text-primary hover:underline font-medium">crochet beginner guide</Link>!</p>
                            </section>
                        </>
                    )}

                    <section id="related" className="bg-primary/5 p-8 rounded-2xl mt-12 border border-primary/10">
                        <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-6 flex items-center gap-2">
                            <span className="text-4xl">🧶</span> 6. Related Crochet {pageData.category}s
                        </h2>

                        {/* Topic Cluster Pillar Link */}
                        <div className="mb-6 p-4 bg-background rounded-xl border-l-4 border-primary shadow-sm">
                            <h3 className="font-heading font-bold text-foreground mb-1">Explore our Main Guide:</h3>
                            <p className="text-sm text-muted-foreground">
                                Make sure to check out our comprehensive pillar page on {' '}
                                {['learning', 'beginner', 'tutorial'].includes(pageData.category) && <Link href="/how-to-crochet-for-beginners" className="text-primary hover:underline font-medium">How to Crochet for Beginners</Link>}
                                {pageData.category === 'pattern' && <Link href="/crochet-patterns" className="text-primary hover:underline font-medium">Crochet Patterns</Link>}
                                {pageData.category === 'business' && <Link href="/how-to-start-crochet-business" className="text-primary hover:underline font-medium">How to Start a Crochet Business</Link>}
                                {pageData.category === 'gift' && <Link href="/crochet-gift-ideas" className="text-primary hover:underline font-medium">Crochet Gift Ideas</Link>}
                                {['product', 'decor', 'clothing', 'long-tail', 'local'].includes(pageData.category) && <Link href="/crochet-handmade-products" className="text-primary hover:underline font-medium">Handmade Crochet Products</Link>}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {relatedPages.map(related => (
                                <Link
                                    href={`/${related.slug}`}
                                    key={related.slug}
                                    className="bg-background p-4 rounded-xl shadow-sm border border-border hover:border-primary hover:shadow-md transition-all group"
                                >
                                    <h3 className="font-heading font-semibold text-foreground group-hover:text-primary capitalize transition-colors">
                                        {related.topic}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                        {related.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section id="classes" className="mt-16 text-center">
                        <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-6">7. Learn Crochet With Our Classes</h2>
                        <p className="text-lg mb-8 max-w-2xl mx-auto">
                            Want to take your skills to the next level? Join our expert-led crochet classes designed for all skill levels. From the very basics to advanced amigurumi techniques, we've got you covered.
                        </p>
                        <Button size="lg" className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 hover:scale-105 transition-transform" asChild>
                            <Link href="/learn-crochet-online">Start Learning Crochet Today</Link>
                        </Button>
                    </section>

                    <section id="start-journey" className="mt-16 text-center border-t border-border pt-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground capitalize mb-6">8. Start Your Crochet Journey Today</h2>
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                            Whether you're shopping for the perfect gift or starting a new hobby, Handmade Harmony is here to inspire and support you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="rounded-full bg-primary text-white hover:scale-105 transition-transform px-8" asChild>
                                <Link href="/products">Explore Crochet Products</Link>
                            </Button>
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}
