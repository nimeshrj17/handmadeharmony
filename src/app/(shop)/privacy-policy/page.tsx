"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">Privacy Policy</h1>

                    <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                        <section>
                            <p>
                                Handmade Harmony respects your privacy. Any personal information you share with us will only be used to improve our services and provide you with updates or offers.
                            </p>
                            <p>
                                We may collect details such as your name, contact information, and preferences to better serve you. This information helps us keep records, enhance our products, and occasionally reach out for feedback.
                            </p>
                            <p>
                                Your data will never be sold, and we take care to keep it secure. Please note, this policy may be updated from time to time, so we encourage you to check back for the latest version.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">Order Confirmation</h2>
                            <p>
                                Once your order is placed, a confirmation will be automatically sent to the email address provided. Please ensure your email is valid. You may also print the confirmation directly from our site for your records.
                            </p>
                        </section>

                        <section className="bg-muted/30 p-6 rounded-2xl border italic text-sm">
                            <p>
                                Shipping Charges: As per actual Charges will be informed during the payment.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">Payments & Kits</h2>
                            <p>
                                Workshop and class fees are nonrefundable. Each kit will include all the essential materials you need, but items are preselected and may not match personal preferences.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
