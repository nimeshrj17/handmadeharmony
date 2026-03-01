"use client";


import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Review } from "@/lib/types";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getReviews } from "@/lib/db";
import { AddReviewDialog } from "../AddReviewDialog";

const Reviews = () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const data = await getReviews();
            setReviews(data);
        };
        fetchReviews();
    }, []);

    // Calculate average rating
    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
        : "5.0";

    return (
        <section id="reviews" className="py-20 bg-background overflow-hidden relative">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                        Hear from our Happy Customers
                    </h2>
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center justify-center gap-2 text-yellow-500">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} fill="currentColor" size={24} />
                            ))}
                            <span className="text-foreground font-bold ml-2">({averageRating}/5)</span>
                        </div>
                        <div className="mt-4">
                            <AddReviewDialog onReviewAdded={() => {
                                const fetchReviews = async () => {
                                    const data = await getReviews();
                                    setReviews(data);
                                };
                                fetchReviews();
                            }} />
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {reviews.length === 0 ? (
                        <div className="text-center text-muted-foreground py-10">
                            No reviews yet. Be the first to leave one!
                        </div>
                    ) : (
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent>
                                {reviews.map((review) => (
                                    <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 p-2">
                                        <div className="h-full">
                                            <Card className="h-full border-none shadow-sm bg-muted/40 hover:bg-muted/60 transition-colors">
                                                <CardContent className="flex flex-col gap-4 p-6">
                                                    <div className="flex gap-1 text-yellow-500">
                                                        {Array.from({ length: 5 }).map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={16}
                                                                fill={i < review.rating ? "currentColor" : "none"}
                                                                className={i < review.rating ? "" : "text-muted-foreground"}
                                                            />
                                                        ))}
                                                    </div>
                                                    <p className="text-muted-foreground text-sm italic">"{review.reviewText}"</p>
                                                    <div className="mt-auto pt-4 border-t border-border flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                                            {review.name.charAt(0)}
                                                        </div>
                                                        <span className="font-bold text-sm text-foreground">{review.name}</span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex" />
                            <CarouselNext className="hidden md:flex" />
                        </Carousel>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
