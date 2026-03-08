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

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
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
        }
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

                    <section id="introduction">
                        <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">1. Introduction to {pageData.topic}</h2>
                        <p>
                            Welcome to the ultimate guide on <strong>{pageData.topic}</strong>. Whether you are looking to purchase high-quality handmade crochet items or you want to learn how to create your own beautiful pieces, understanding the nuances of {pageData.topic} is the perfect place to start. At Handmade Harmony, we specialize in bringing you the best in crochet craftsmanship and education.
                        </p>
                    </section>

                    <section id="why-popular">
                        <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">2. Why Crochet {pageData.topic} Is Popular</h2>
                        <p>
                            In recent years, the demand for <em>{pageData.topic}</em> has surged, especially in India. This popularity stems from the unique, personal touch that handmade items offer compared to mass-produced goods. Engaging in or purchasing items related to {pageData.topic} supports local artisans and provides a sense of connection to traditional crafts that have been cherished for generations.
                        </p>
                    </section>

                    <section id="materials">
                        <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">3. Materials Needed for Crochet</h2>
                        <p>
                            To effectively dive into {pageData.topic}, it's essential to have the right materials. For a successful project, you will generally need:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                            <li><strong>High-quality Yarn:</strong> Acrylic, cotton, or blended yarns depending on the specific project.</li>
                            <li><strong>Crochet Hooks:</strong> Various sizes depending on yarn weight.</li>
                            <li><strong>Stitch Markers:</strong> To keep track of rounds and complex patterns.</li>
                            <li><strong>Tapestry Needle:</strong> Essential for weaving in ends and sewing pieces together.</li>
                        </ul>
                    </section>

                    {/* Secondary Image */}
                    <div className="relative w-full aspect-[2/1] rounded-2xl overflow-hidden shadow-lg my-12">
                        <Image
                            src="/images/hero-krishna.jpg"
                            alt={`Crochet handmade gifts and tutorial for ${pageData.topic}`}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <section id="step-by-step">
                        <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">4. Step-by-Step Crochet Guide</h2>
                        <p>
                            Mastering {pageData.topic} requires patience and practice. Here is a high-level overview to get you started:
                        </p>
                        <ol className="list-decimal pl-6 space-y-2 mt-4 text-muted-foreground">
                            <li><strong>Understand the Basics:</strong> Familiarize yourself with fundamental stitches like chain (ch), single crochet (sc), and double crochet (dc).</li>
                            <li><strong>Read the Pattern Carefully:</strong> Before beginning any project related to {pageData.topic}, read through the entire instructions.</li>
                            <li><strong>Start Small:</strong> Begin with small, manageable projects before tackling complex designs or large business ventures.</li>
                            <li><strong>Check Your Gauge:</strong> Ensure your tension matches the pattern's requirements for consistent results.</li>
                        </ol>
                        <p className="mt-4">
                            For a deeper dive tailored specifically for beginners, check out our comprehensive <Link href="/how-to-crochet-for-beginners" className="text-primary hover:underline font-medium">crochet beginner guide</Link>.
                        </p>
                    </section>

                    <section id="tips">
                        <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-4">5. Crochet Tips for Beginners</h2>
                        <p>
                            When exploring {pageData.topic}, keep these essential tips in mind to avoid common pitfalls:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4 text-muted-foreground">
                            <li>Take frequent breaks to rest your hands and wrists.</li>
                            <li>Count your stitches diligently at the end of every row or round.</li>
                            <li>Don't be afraid to frog (unravel) your work if you make a mistake; it's the best way to learn!</li>
                            <li>Engage with the community to learn new techniques and gain inspiration.</li>
                        </ul>
                    </section>

                    <section id="related" className="bg-primary/5 p-8 rounded-2xl mt-12 border border-primary/10">
                        <h2 className="text-3xl font-heading font-bold text-foreground capitalize mb-6 flex items-center gap-2">
                            <span className="text-4xl">🧶</span> 6. Related Crochet {pageData.category}s
                        </h2>
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
