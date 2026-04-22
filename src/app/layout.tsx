import type { Metadata } from "next";
import { Inter, Fredoka } from "next/font/google";
import Script from "next/script";
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
      <head>
        {/* Meta Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1493928352365060');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1493928352365060&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body
        className={`${inter.variable} ${fredoka.variable} antialiased font-sans`}
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
