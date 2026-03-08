"use client";

import { motion } from "framer-motion";

export default function ReturnPolicyPage() {
    return (
        <div className="min-h-screen bg-background py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">RETURN POLICY</h1>

                    <div className="prose prose-stone dark:prose-invert max-w-none space-y-6 text-muted-foreground">
                        <section className="bg-red-50 dark:bg-red-950/20 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                            <p className="font-semibold text-red-700 dark:text-red-400">
                                Only damaged products are eligible for a refund. To process a refund, you must provide a clear video recording of the product being opened upon delivery. Refunds will not be issued without this proof
                            </p>
                        </section>

                        <section>
                            <p>
                                Items must be new, unused, and in their original packaging to be eligible for return. Returns that don’t meet these conditions may be declined. We also reserve the right to refuse returns we believe are fraudulent or do not follow these guidelines.
                            </p>
                        </section>

                        <section>
                            <p>
                                "Customers are responsible for return shipping costs unless the item received is defective or not as described. For your protection, we recommend using a shipping method with tracking and insurance
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">NonReturnable Items</h2>
                            <p>Certain products are not eligible for return or exchange, including (but not limited to):</p>
                            <ul className="list-disc pl-5">
                                <li>Personalized or custommade items</li>
                                <li>Clearance or sale items</li>
                                <li>Paid patterns</li>
                                <li>Kits</li>
                            </ul>
                        </section>

                        <section className="bg-muted/30 p-6 rounded-2xl border text-sm">
                            <h2 className="text-lg font-bold text-foreground mt-0">Product Colours</h2>
                            <p>
                                Our yarns are sourced from reliable suppliers, not manufactured by us. Please note that slight variations in shades may occur due to different dye lots or monitor settings. Refunds or exchanges cannot be made for minor color differences. To maintain consistency, we recommend purchasing enough yarn for your entire project at once. Darker shades of yarn may occasionally bleed.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
