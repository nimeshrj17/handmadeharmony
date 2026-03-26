import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: {
    default: "Crochet Nook by Dharita | Handmade Crochet & Amigurumi in Vadodara",
    template: "%s | Crochet Nook by Dharita"
  },
  description: "Learn the art of crochet and amigurumi with Dharita in Vadodara. Shop our collection of handmade crochet dolls, accessories, and join our beginner-friendly workshops.",
  keywords: ["crochet classes Vadodara", "amigurumi Vadodara", "handmade crochet India", "crochet workshops Gujarat", "learn crochet"],
  authors: [{ name: "Dharita" }],
  creator: "Dharita",
  publisher: "Crochet Nook by Dharita",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://crochetnookbydharita.co.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Crochet Nook by Dharita | Handmade Crochet & Amigurumi",
    description: "Smile stitched. Joy delivered. Creative crochet classes and handmade wonders in Vadodara.",
    url: "https://crochetnookbydharita.co.in",
    siteName: "Crochet Nook by Dharita",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/logo.jpg?v=1",
    apple: "/logo.jpg?v=1",
  },
};

import JsonLd from "@/components/seo/JsonLd";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${fredoka.variable} antialiased font-sans`}
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
