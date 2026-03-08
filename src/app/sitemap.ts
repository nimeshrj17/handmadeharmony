import { MetadataRoute } from 'next'
import { SEO_PAGES } from '@/lib/seo-data'

const BASE_URL = 'https://www.crochetnookbydharita.co.in'

export default function sitemap(): MetadataRoute.Sitemap {
    // Static Routes
    const staticRoutes = [
        '',
        '/products',
        '/classes',
        '/contact',
        '/privacy-policy',
        '/return-policy',
        '/terms',
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Programmatic SEO Routes
    const seoRoutes = SEO_PAGES.map((page) => ({
        url: `${BASE_URL}/${page.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }))

    return [...staticRoutes, ...seoRoutes]
}
