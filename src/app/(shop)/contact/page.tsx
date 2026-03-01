"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, Instagram, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/config";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate Firestore delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // TODO: Save to Firestore
        console.log("Form submitted:", formData);

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-background py-12 md:py-20">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-primary font-bold tracking-wider text-sm uppercase">Get in Touch</span>
                            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                                Let's Chat!
                            </h1>
                            <p className="text-muted-foreground text-lg">
                                Have a question about a custom order or just want to say hi?
                                I'd love to hear from you.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full text-primary">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground">Email</h4>
                                    <a href="mailto:hello@handmadeharmony.com" className="text-muted-foreground hover:text-primary transition-colors">
                                        hello@handmadeharmony.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-secondary/20 p-3 rounded-full text-secondary-foreground">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground">WhatsApp</h4>
                                    <a href={`https://wa.me/${siteConfig.contact.phone}`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                        {siteConfig.contact.phoneDisplay}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="bg-accent/20 p-3 rounded-full text-accent-foreground">
                                    <Instagram size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-foreground">Instagram</h4>
                                    <a href={siteConfig.contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                        @{siteConfig.contact.instagram}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-muted/30 rounded-2xl">
                            <h4 className="font-bold text-foreground mb-2">Note on Custom Orders</h4>
                            <p className="text-sm text-muted-foreground">
                                Custom orders typically take 1-2 weeks to complete depending on complexity.
                                Please reach out well in advance!
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <Card className="border-none shadow-lg">
                        <CardHeader>
                            <CardTitle>Send a Message</CardTitle>
                            <CardDescription>Fill out the form below and I'll get back to you soon.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-12 text-center"
                                >
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                                    <p className="text-muted-foreground mb-6">
                                        Thank you for reaching out. I'll respond to your email as soon as possible.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsSuccess(false)}
                                    >
                                        Send Another Message
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                                        <Input
                                            id="name"
                                            placeholder="Your Name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="your@email.com"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">Message</label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tell me what you'd like to order..."
                                            className="min-h-[150px]"
                                            required
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-primary text-white hover:bg-primary/90"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <Send size={16} className="animate-pulse" /> Sending...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2">
                                                <Send size={16} /> Send Message
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
