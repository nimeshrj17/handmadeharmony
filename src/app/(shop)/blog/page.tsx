import React from 'react';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog | Crochet Tips, Tutorials & Class Updates in Vadodara",
  description: "Read our latest articles on crochet techniques, amigurumi tutorials, and hobby class updates from Crochet Nook by Dharita in Vadodara.",
};

const BlogPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Crochet <span className="text-primary">Journal</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Insights, tips, and stories from the world of handmade crochet and amigurumi in Vadodara.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article key={post.slug} className="bg-white rounded-3xl overflow-hidden border shadow-sm hover:shadow-xl transition-all group">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={post.image || "/images/placeholder-blog.jpg"} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800";
                }}
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{post.date}</span>
                <span>•</span>
                <span>By {post.author}</span>
              </div>
              <h2 className="text-xl font-bold font-heading group-hover:text-primary transition-colors">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-muted-foreground line-clamp-3 text-sm">
                {post.excerpt}
              </p>
              <Link 
                href={`/blog/${post.slug}`}
                className="inline-block text-primary font-bold text-sm hover:underline"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
