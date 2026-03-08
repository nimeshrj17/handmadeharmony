"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">TERMS & CONDITIONS & POLICY</h1>

                    <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                        <section>
                            <p>
                                Product prices may change at any time without prior notice. We may update, modify, or discontinue our services or content whenever needed. Please note that we are not responsible for any changes, price adjustments, or service interruptions."
                            </p>
                        </section>

                        <section>
                            <p>
                                Our site may include links or content from third parties. We are not responsible for the accuracy, quality, or policies of these external sites, products, or services. Any issues or concerns with thirdparty items should be directed to them. Please review their terms carefully before making a purchase or engaging in any transaction.
                            </p>
                        </section>

                        <section>
                            <p>
                                By sending us comments, ideas, or submissions, you agree we may use them freely without obligation to keep them confidential, pay compensation, or respond. We may monitor or remove content we find inappropriate or unlawful. You are responsible for ensuring your comments do not violate any rights, contain harmful material, or mislead others. We are not liable for any comments posted by you or third parties.
                            </p>
                        </section>

                        <section className="bg-primary/5 p-6 rounded-2xl border italic text-sm">
                            <p>
                                “Workshop fees are nonrefundable; kits include standard materials.”
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
