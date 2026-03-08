export type SeoCategory = 'product' | 'gift' | 'clothing' | 'decor' | 'learning' | 'beginner' | 'business' | 'pattern' | 'long-tail' | 'local';

export interface SeoPageData {
    slug: string;
    topic: string;
    category: SeoCategory;
    title: string;
    description: string;
    h1: string;
}

const BRAND_NAME = "Handmade Harmony";

const generateTitle = (topic: string) => `${topic.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | Crochet Handmade Harmony India`;
const generateDescription = (topic: string) => `Looking for ${topic}? Discover beautiful handmade crochet products, step-by-step tutorials, beginner patterns, and gifts at Handmade Harmony India.`;
const generateH1 = (topic: string) => `${topic.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`;

// 100 SEO Keywords for Crochet Business (India)
export const SEO_PAGES_RAW: { topic: string, category: SeoCategory }[] = [
    // 1. Core Crochet Product Keywords
    { topic: "crochet products india", category: "product" },
    { topic: "handmade crochet products", category: "product" },
    { topic: "crochet handmade items", category: "product" },
    { topic: "crochet accessories india", category: "product" },
    { topic: "crochet handmade gifts", category: "product" },
    { topic: "crochet home decor india", category: "product" },
    { topic: "crochet fashion accessories", category: "product" },
    { topic: "handmade crochet store", category: "product" },
    { topic: "crochet craft products", category: "product" },
    { topic: "crochet handmade shop", category: "product" },

    // 2. Crochet Gift Keywords
    { topic: "crochet gift ideas", category: "gift" },
    { topic: "handmade crochet gifts india", category: "gift" },
    { topic: "crochet birthday gifts", category: "gift" },
    { topic: "crochet gifts for women", category: "gift" },
    { topic: "crochet gifts for babies", category: "gift" },
    { topic: "crochet gifts for friends", category: "gift" },
    { topic: "crochet valentine gifts", category: "gift" },
    { topic: "crochet anniversary gifts", category: "gift" },
    { topic: "crochet christmas gifts", category: "gift" },
    { topic: "unique crochet gifts india", category: "gift" },

    // 3. Crochet Clothing Keywords
    { topic: "crochet tops india", category: "clothing" },
    { topic: "crochet clothing india", category: "clothing" },
    { topic: "handmade crochet clothing", category: "clothing" },
    { topic: "crochet summer tops", category: "clothing" },
    { topic: "crochet crop tops india", category: "clothing" },
    { topic: "crochet cardigans", category: "clothing" },
    { topic: "crochet fashion accessories clothing", category: "clothing" }, // slight tweak to make unique if duplicate
    { topic: "crochet scarves india", category: "clothing" },
    { topic: "crochet handmade wear", category: "clothing" },
    { topic: "crochet fashion products", category: "clothing" },

    // 4. Crochet Home Decor Keywords
    { topic: "crochet home decor", category: "decor" },
    { topic: "crochet cushion covers", category: "decor" },
    { topic: "crochet table runners", category: "decor" },
    { topic: "crochet wall decor", category: "decor" },
    { topic: "crochet handmade decor", category: "decor" },
    { topic: "crochet decorative items", category: "decor" },
    { topic: "crochet coasters india", category: "decor" },
    { topic: "crochet plant hangers", category: "decor" },
    { topic: "crochet table mats", category: "decor" },
    { topic: "crochet home accessories", category: "decor" },

    // 5. Crochet Learning Keywords
    { topic: "learn crochet online", category: "learning" },
    { topic: "crochet classes online", category: "learning" },
    { topic: "crochet tutorial for beginners", category: "learning" },
    { topic: "crochet learning course", category: "learning" },
    { topic: "crochet training india", category: "learning" },
    { topic: "crochet classes india", category: "learning" },
    { topic: "crochet workshops india", category: "learning" },
    { topic: "crochet beginner guide", category: "learning" },
    { topic: "crochet step by step tutorial", category: "learning" },
    { topic: "crochet training course", category: "learning" },

    // 6. Crochet Beginner Keywords
    { topic: "crochet for beginners", category: "beginner" },
    { topic: "how to crochet for beginners", category: "beginner" },
    { topic: "easy crochet patterns", category: "beginner" },
    { topic: "beginner crochet projects", category: "beginner" },
    { topic: "crochet basics tutorial", category: "beginner" },
    { topic: "crochet stitches for beginners", category: "beginner" },
    { topic: "crochet beginner course", category: "beginner" },
    { topic: "crochet starter guide", category: "beginner" },
    { topic: "crochet learning india", category: "beginner" },
    { topic: "crochet tutorial india", category: "beginner" },

    // 7. Crochet Business Keywords
    { topic: "crochet business ideas", category: "business" },
    { topic: "crochet business india", category: "business" },
    { topic: "how to sell crochet products", category: "business" },
    { topic: "start crochet business", category: "business" },
    { topic: "handmade crochet business", category: "business" },
    { topic: "crochet selling ideas", category: "business" },
    { topic: "crochet handmade business", category: "business" },
    { topic: "crochet side business", category: "business" },
    { topic: "crochet small business india", category: "business" },
    { topic: "crochet products to sell", category: "business" },

    // 8. Crochet Patterns Keywords
    { topic: "crochet patterns", category: "pattern" },
    { topic: "crochet design patterns", category: "pattern" },
    { topic: "crochet bag patterns", category: "pattern" },
    { topic: "crochet dress patterns", category: "pattern" },
    { topic: "crochet toy patterns", category: "pattern" },
    { topic: "crochet flower patterns", category: "pattern" },
    { topic: "crochet blanket patterns", category: "pattern" },
    { topic: "crochet beginner patterns", category: "pattern" },
    { topic: "crochet accessories patterns", category: "pattern" },
    { topic: "crochet product patterns", category: "pattern" },

    // 9. Long Tail Conversion Keywords
    { topic: "buy crochet handmade products india", category: "long-tail" },
    { topic: "handmade crochet gifts india conversion", category: "long-tail" }, // tweak for uniqueness
    { topic: "learn crochet online india", category: "long-tail" },
    { topic: "crochet classes for beginners india", category: "long-tail" },
    { topic: "crochet training online india", category: "long-tail" },
    { topic: "crochet handmade products store", category: "long-tail" },
    { topic: "crochet products made in india", category: "long-tail" },
    { topic: "crochet items for home decor", category: "long-tail" },
    { topic: "crochet products for gifting", category: "long-tail" },
    { topic: "crochet handmade fashion accessories long tail", category: "long-tail" }, // tweak for uniqueness

    // 10. Local + Indian Keywords
    { topic: "crochet products india online", category: "local" },
    { topic: "indian crochet handmade products", category: "local" },
    { topic: "crochet handmade store india", category: "local" },
    { topic: "crochet classes india online", category: "local" },
    { topic: "crochet workshop india", category: "local" },
    { topic: "handmade crochet india", category: "local" },
    { topic: "crochet handicrafts india", category: "local" },
    { topic: "crochet artisans india", category: "local" },
    { topic: "crochet products made by indian artisans", category: "local" },
    { topic: "crochet handmade brand india", category: "local" }
];

// Ensure unique slugs
const seenSlugs = new Set();

export const SEO_PAGES: SeoPageData[] = SEO_PAGES_RAW.map(item => {
    let slug = item.topic.replace(/ /g, '-').toLowerCase();

    if (seenSlugs.has(slug)) {
        slug = `${slug}-${item.category}`;
    }
    seenSlugs.add(slug);

    return {
        slug,
        topic: item.topic,
        category: item.category as SeoCategory,
        title: generateTitle(item.topic),
        description: generateDescription(item.topic),
        h1: generateH1(item.topic),
    };
});

export function getSeoPageBySlug(slug: string): SeoPageData | undefined {
    return SEO_PAGES.find(page => page.slug === slug);
}

export function getRelatedSeoPages(currentSlug: string, category: SeoCategory, limit: number = 4): SeoPageData[] {
    return SEO_PAGES.filter(page => page.category === category && page.slug !== currentSlug)
        .sort(() => 0.5 - Math.random()) // Randomize for variety
        .slice(0, limit);
}
