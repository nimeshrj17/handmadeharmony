"use client";

import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/config";

const WhatsAppButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Replace with actual number from config or env
    const phoneNumber = siteConfig.contact.phone;
    const defaultMessage = "Hi! I'm interested in your crochet products.";

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.a
                    href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-shadow hover:shadow-green-500/50"
                    aria-label="Chat on WhatsApp"
                >
                    <MessageCircle className="h-7 w-7 fill-current" />
                </motion.a>
            )}
        </AnimatePresence>
    );
};

export default WhatsAppButton;
