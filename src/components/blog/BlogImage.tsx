"use client";

import React from 'react';

interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "video" | "wide";
}

const BlogImage = ({ src, alt, className, aspectRatio = "video" }: BlogImageProps) => {
  const fallbackImage = "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800";
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = fallbackImage;
  };

  const aspectClass = aspectRatio === "video" ? "aspect-video" : "aspect-[21/9]";

  return (
    <div className={`${aspectClass} relative overflow-hidden ${className || ""}`}>
      <img
        src={src || fallbackImage}
        alt={alt}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        onError={handleImageError}
      />
    </div>
  );
};

export default BlogImage;
