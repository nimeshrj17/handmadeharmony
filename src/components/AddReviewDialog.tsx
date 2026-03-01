"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { addReview } from "@/lib/db";

interface AddReviewDialogProps {
    trigger?: React.ReactNode;
    onReviewAdded?: () => void;
}

export function AddReviewDialog({ trigger, onReviewAdded }: AddReviewDialogProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addReview({
                name,
                rating,
                reviewText,
                image: "" // Optional: Add avatar upload later if needed
            });
            setOpen(false);
            setName("");
            setRating(5);
            setReviewText("");
            if (onReviewAdded) onReviewAdded();
            alert("Review submitted successfully!");
        } catch (error) {
            console.error("Failed to submit review", error);
            alert("Failed to submit review.");
        } finally {
            setLoading(false);
        }
    };

    if (!isMounted) {
        return trigger || <Button variant="outline">Leave a Review</Button>;
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || <Button variant="outline">Leave a Review</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Leave a Review</DialogTitle>
                    <DialogDescription>
                        Share your experience with Handmade Harmony.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Rating</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className={`transition-colors ${rating >= star ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`}
                                >
                                    <Star size={24} className={rating >= star ? "fill-current" : ""} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Review</label>
                        <Textarea
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            placeholder="Write your review here..."
                            required
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Submitting..." : "Submit Review"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
