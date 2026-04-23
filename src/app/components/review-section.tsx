"use client";
import React, { useEffect, useState } from "react";
import { Star, Sparkles, User } from "lucide-react";
import { cn } from "@/lib/utils";

import { Review } from "@/lib/types";

interface ReviewSectionProps {
  productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [summary, setSummary] = useState<string>("");
  const [sentiment, setSentiment] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [revRes, sumRes] = await Promise.all([
          fetch(`/api/reviews?productId=${productId}`),
          fetch(`/api/reviews/summarize?productId=${productId}`)
        ]);
        
        const revData = await revRes.json();
        const sumData = await sumRes.json();
        
        setReviews(revData.reviews || []);
        setSummary(sumData.summary || "");
        setSentiment(sumData.sentiment || "");
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <div className="space-y-12 py-24 border-t border-border/30">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
              Customer Voices
            </span>
          </div>
          <h2 className="font-display text-4xl lg:text-5xl text-foreground">
            Reviews & <em className="not-italic text-muted-foreground">Ratings</em>
          </h2>
        </div>
      </div>

      {/* AI Summary Box */}
      {summary && (
        <div className="relative p-8 bg-zinc-950 text-white border border-gold/30 group overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Sparkles className="w-24 h-24 text-gold" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gold/20 text-gold">
                <Sparkles className="w-3 h-3" />
              </div>
              <span className="font-body text-[10px] tracking-[0.2em] uppercase text-gold font-bold">
                AI Generated Insights
              </span>
              <span className={cn(
                "ml-auto px-2 py-0.5 rounded-full text-[9px] uppercase tracking-widest",
                sentiment === "Positive" ? "bg-emerald-500/20 text-emerald-400" :
                sentiment === "Negative" ? "bg-red-500/20 text-red-400" : "bg-zinc-800 text-zinc-400"
              )}>
                {sentiment} Sentiment
              </span>
            </div>
            <p className="font-display text-xl lg:text-2xl leading-relaxed italic text-zinc-200">
              &ldquo;{summary}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.length > 0 ? (
          reviews.map((review, i) => (
            <div key={review.reviewId} className="p-8 border border-border/40 hover:border-gold/40 transition-colors bg-card/30">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-foreground">{review.userName}</p>
                    <p className="font-body text-[10px] text-muted-foreground uppercase tracking-widest">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className={cn("w-3 h-3", s <= review.rating ? "fill-gold text-gold" : "text-zinc-700")} />
                  ))}
                </div>
              </div>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {review.comment}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center border border-dashed border-border/60">
            <p className="font-display text-2xl text-muted-foreground font-light">No reviews yet. Be the first to share your thoughts.</p>
          </div>
        )}
      </div>
    </div>
  );
}
