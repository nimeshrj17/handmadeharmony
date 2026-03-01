"use client";

import Link from "next/link";
import { Menu, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AddReviewDialog } from "@/components/AddReviewDialog";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Shop", href: "/products" },
        { name: "About", href: "/#about" },
        { name: "Reviews", href: "/#reviews" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    {/* Placeholder for Logo Image if available, else text */}
                    <span className="font-heading text-xl font-bold text-primary md:text-2xl">
                        Handmade Harmony
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {isMounted && (
                        <>
                            <div className="hidden md:block">
                                <AddReviewDialog />
                            </div>

                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                                <Heart className="h-5 w-5" />
                                <span className="sr-only">Wishlist</span>
                            </Button>
                            {/* Mobile Menu */}
                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="md:hidden">
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[300px] sm:w-[400px]" aria-describedby="mobile-menu-description">
                                    <SheetHeader className="sr-only">
                                        <SheetTitle>Navigation Menu</SheetTitle>
                                        <SheetDescription id="mobile-menu-description">
                                            Access all sections of the Handmade Harmony website including Home, Shop, and more.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="flex flex-col gap-4 mt-8">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="text-lg font-medium hover:text-primary"
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                        <div className="mt-4 space-y-2">
                                            <div className="w-full">
                                                <AddReviewDialog trigger={<Button variant="outline" className="w-full">Leave a Review</Button>} />
                                            </div>
                                            <Button className="w-full bg-primary text-white hover:bg-primary/90" asChild>
                                                <Link href="/products">Shop Now</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </>
                    )}

                    <Button className="hidden md:flex bg-primary text-white hover:bg-primary/90 rounded-full" asChild>
                        <Link href="/products">Shop Now</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
