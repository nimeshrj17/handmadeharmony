import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/'],
        },
        sitemap: 'https://www.crochetnookbydharita.co.in/sitemap.xml',
    }
}
