"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Instagram, Facebook, Mail, Youtube } from "lucide-react";
import { siteConfig } from "@/lib/config";

const Footer = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const currentYear = isMounted ? new Date().getFullYear() : 2026;
    return (
        <footer className="bg-muted/30 border-t py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="font-heading text-xl font-bold text-primary">Handmade Harmony</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Smile stitched. Joy delivered. Handcrafted crochet dolls and accessories made with love by Dharita.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/products" className="hover:text-primary transition-colors">Shop Collection</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/admin" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-xs text-muted-foreground/50">Admin Login</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-foreground">Connect</h4>
                        <div className="flex gap-4">
                            <a href={siteConfig.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full shadow-sm hover:scale-110 transition-transform text-primary">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href={siteConfig.contact.youtubeUrl} target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full shadow-sm hover:scale-110 transition-transform text-primary">
                                <Youtube className="h-5 w-5" />
                                <span className="sr-only">YouTube</span>
                            </a>
                            <a href="#" className="bg-white p-2 rounded-full shadow-sm hover:scale-110 transition-transform text-primary">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="mailto:crochetnookdharita@gmail.com" className="bg-white p-2 rounded-full shadow-sm hover:scale-110 transition-transform text-primary">
                                <Mail className="h-5 w-5" />
                                <span className="sr-only">Email</span>
                            </a>
                        </div>
                        <div className="mt-4 space-y-1">
                            <p className="text-xs text-muted-foreground">
                                © {currentYear} Crochetnook by Dharita. All rights reserved.
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Built with <span className="text-red-500">❤️</span> by <a href="https://www.stacktribe.dev/" target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">StackTribe</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
