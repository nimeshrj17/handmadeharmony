import React from 'react';
import { blogPosts } from '@/lib/blog-data';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for better SEO and performance
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
    },
  };
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 pt-12 md:pt-20">
        <Link href="/blog" className="text-primary font-bold flex items-center gap-2 mb-8 hover:underline italic">
          ← Back to Blog
        </Link>
        
        <header className="max-w-4xl mx-auto space-y-6 mb-12">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground leading-[1.2]">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span className="font-medium text-foreground">By {post.author}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
          <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={post.image || "/images/placeholder-blog.jpg"} 
              alt={post.title} 
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800";
              }}
            />
          </div>
        </header>

        <div 
          className="max-w-3xl mx-auto prose prose-lg prose-primary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="max-w-3xl mx-auto mt-16 pt-10 border-t">
          <div className="bg-primary/5 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-3xl font-bold italic">
              D
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">About Dharita</h3>
              <p className="text-muted-foreground text-sm">
                Dharita is the founder of Crochet Nook and an avid crafter based in Vadodara. She loves sharing her passion for crochet through workshops and handmade art.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
             <Link href="/classes" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                Join our next Crochet Batch in Vadodara →
             </Link>
          </div>
        </footer>
      </div>
    </article>
  );
};

export default BlogPostPage;
