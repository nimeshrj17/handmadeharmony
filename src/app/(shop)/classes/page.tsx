"use client";

import { useState, useEffect } from "react";
import { getClasses } from "@/lib/db";
import { ClassVideo } from "@/lib/types";
import { motion } from "framer-motion";
import { FileVideo, PlayCircle, Users, CheckCircle2, Scissors, Sparkles, BookOpen, Heart, MonitorOff, Gift, Briefcase, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ClassesPage() {
    const [classes, setClasses] = useState<ClassVideo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClasses = async () => {
            const data = await getClasses();
            setClasses(data);
            setLoading(false);
        };
        fetchClasses();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-background pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-primary/5 -z-10 group-hover:bg-primary/10 transition-colors" />
                <div className="absolute top-[-10%] right-[-5%] w-[40%] aspect-square bg-primary/10 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] aspect-square bg-secondary/10 rounded-full blur-3xl -z-10" />

                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">New Beginner Batches Open</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-heading font-bold mb-6 text-foreground leading-[1.1]"
                    >
                        Crochet & Amigurumi <br />
                        <span className="text-primary italic">Classes for Beginners</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
                    >
                        Welcome to Crochet Nook by Dharita, where you can learn the beautiful art of crochet and amigurumi through easy, beginner-friendly classes.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <Button size="lg" className="rounded-full px-8 h-12 text-lg shadow-lg hover:shadow-xl transition-all" asChild>
                            <Link href="/contact">Join a Class</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-lg bg-white/50 backdrop-blur-sm" onClick={() => document.getElementById('tutorials')?.scrollIntoView({ behavior: 'smooth' })}>
                            Watch Tutorials
                        </Button>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-4 space-y-24">
                {/* Introduction Section */}
                <section>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-heading font-bold text-foreground">
                                Discover the Joy of <span className="text-primary underline decoration-primary/30 underline-offset-8">Handmade Art</span>
                            </h2>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    Our crochet and amigurumi classes are designed for anyone who wants to learn how to create handmade toys, keychains, and creative yarn projects step-by-step.
                                </p>
                                <p>
                                    Crochet is a relaxing and creative craft that allows you to transform simple yarn into beautiful handmade items. One of the most loved styles of crochet is **amigurumi**, a Japanese art of crocheting small stuffed toys and cute characters.
                                </p>
                                <p>
                                    Through our structured crochet workshops, students learn essential techniques, practice stitches, and complete small projects that build confidence and creativity.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=800"
                                alt="Crochet amigurumi toys"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-sm">
                                <p className="text-primary font-bold italic">"Turn yarn into adorable creations — join our crochet classes today!"</p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Who Can Join & Format */}
                <section className="grid md:grid-cols-2 gap-8">
                    {/* Who Can Join */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-primary/5 p-8 md:p-10 rounded-[2.5rem] border border-primary/10"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-primary/20 p-3 rounded-2xl text-primary">
                                <Users size={24} />
                            </div>
                            <h3 className="text-2xl font-heading font-bold">Who Can Join?</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Absolute beginners who want to learn crochet",
                                "Craft lovers interested in handmade art",
                                "Hobbyists looking for a relaxing creative activity",
                                "Small business beginners who want to sell handmade products"
                            ].map((text, i) => (
                                <li key={i} className="flex gap-3 items-start">
                                    <div className="bg-white rounded-full p-1 mt-1 shadow-sm">
                                        <CheckCircle2 size={16} className="text-primary" />
                                    </div>
                                    <span className="text-foreground/80 font-medium">{text}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-8 text-sm italic text-muted-foreground bg-primary/5 p-3 rounded-lg border border-primary/5 inline-block">
                            No prior experience is required for the beginner classes.
                        </p>
                    </motion.div>

                    {/* Class Format */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-secondary/10 p-8 md:p-10 rounded-[2.5rem] border border-secondary/10"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-secondary/20 p-3 rounded-2xl text-secondary-foreground">
                                <BookOpen size={24} />
                            </div>
                            <h3 className="text-2xl font-heading font-bold">Class Format</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { icon: <Sparkles size={18} />, text: "Step-by-step Lessons" },
                                { icon: <Heart size={18} />, text: "Beginner-friendly style" },
                                { icon: <Globe size={18} />, text: "Live Online Workshops" },
                                { icon: <CheckCircle2 size={18} />, text: "Personal Guidance" },
                                { icon: <Scissors size={18} />, text: "Pattern Support" },
                                { icon: <Users size={18} />, text: "Small Batches" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white/60 p-3 rounded-xl shadow-sm border border-secondary/5">
                                    <span className="text-secondary-foreground">{item.icon}</span>
                                    <span className="text-sm font-semibold">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Digital Age Balance */}
                <section className="text-center py-12 md:py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto space-y-8"
                    >
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold">Why Learn Crochet in the <span className="text-primary italic">Digital Age?</span></h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                In today’s fast-paced digital world, learning a hands-on creative skill offers a refreshing balance. These art forms encourage creativity, mindfulness, and the joy of making something with your own hands.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                            {[
                                { icon: <MonitorOff />, title: "Digital Detox", desc: "Step away from screens and enjoy a calm, focused activity." },
                                { icon: <Sparkles />, title: "Mindfulness", desc: "The rhythmic motion of stitches helps reduce stress and promotes relaxation." },
                                { icon: <Users />, title: "For All Ages", desc: "Builds patience and concentration for both children and adults." },
                                { icon: <Gift />, title: "Meaningful Gifts", desc: "Create thoughtful and personal handmade gifts for loved ones." },
                                { icon: <Briefcase />, title: "Business Potential", desc: "Start a small business creating toys, keychains, and custom gifts." },
                                { icon: <Heart />, title: "Community", desc: "Connect with a worldwide community of makers who share inspiration." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemVariants}
                                    className="p-6 bg-muted/30 rounded-2xl border hover:border-primary/30 transition-colors"
                                >
                                    <div className="text-primary mb-4 bg-white p-2 w-fit rounded-lg shadow-sm">{item.icon}</div>
                                    <h4 className="font-bold mb-2">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Video Tutorials Grid */}
                <section id="tutorials" className="pt-12 border-t">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                        <div className="space-y-2 text-center md:text-left">
                            <h2 className="text-3xl font-heading font-bold tracking-tight">Free Video <span className="text-primary">Tutorials</span></h2>
                            <p className="text-muted-foreground">Short previews and step-by-step guides from our YouTube channel.</p>
                        </div>
                        <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 font-bold" asChild>
                            <a href="https://youtube.com/@crochetnookdharita" target="_blank" rel="noopener noreferrer">View All on YouTube →</a>
                        </Button>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="animate-pulse flex flex-col gap-4">
                                    <div className="bg-muted rounded-2xl aspect-video w-full"></div>
                                    <div className="h-6 bg-muted rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    ) : classes.length === 0 ? (
                        <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-primary/20">
                            <FileVideo className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold font-heading mb-2">No Tutorials Available</h3>
                            <p className="text-muted-foreground">Subscribe to our YouTube channel for upcoming tutorials!</p>
                        </div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                        >
                            {classes.map((cls, index) => (
                                <motion.a
                                    href={cls.youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={cls.id}
                                    variants={itemVariants}
                                    className="group block bg-card rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    {/* Thumbnail Container */}
                                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                        <img
                                            src={cls.thumbnailUrl}
                                            alt={cls.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                            <PlayCircle className="text-white w-16 h-16 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-md" />
                                        </div>
                                    </div>

                                    {/* Video Info */}
                                    <div className="p-5">
                                        <h3 className="font-bold font-heading text-lg group-hover:text-primary transition-colors line-clamp-2">
                                            {cls.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                                            <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
                                            Watch on YouTube
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </motion.div>
                    )}
                </section>

                {/* Final CTA */}
                <section className="pb-10 pt-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-primary p-10 md:p-16 rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -ml-32 -mb-32" />

                        <div className="relative z-10 space-y-8">
                            <h2 className="text-3xl md:text-5xl font-heading font-bold">Ready to Start Your <br /> Crochet Journey?</h2>
                            <p className="text-white/80 text-xl max-w-2xl mx-auto">
                                Fill the form in contact details for more information and join our upcoming beginner-friendly batches.
                            </p>
                            <Button size="lg" variant="secondary" className="rounded-full px-10 h-14 text-xl shadow-xl hover:scale-105 transition-transform" asChild>
                                <Link href="/contact">Inquire Now</Link>
                            </Button>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
    );
}
