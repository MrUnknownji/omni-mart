"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/lib/types";
import ProductCard from "./product-card";
import { useGlobalData } from "../Context/GlobalData";

interface RecommendationsProps {
  title?: string;
  maxResults?: number;
}

export default function Recommendations({ title = "Highly Complementary", maxResults = 4 }: RecommendationsProps) {
  const { cart } = useGlobalData();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const cartProductIds = cart.map(item => item.productId);
        const response = await fetch("/api/products/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartProductIds }),
        });
        const data = await response.json();
        if (data.recommendations) {
          setRecommendations(data.recommendations.slice(0, maxResults));
        }
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [cart, maxResults]);

  if (!isLoading && recommendations.length === 0) return null;

  return (
    <section className="py-24 border-t border-border/30 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-gold" />
              <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
                AI Suggestions
              </span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl text-foreground">
              {title}
            </h2>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {recommendations.map((product, i) => (
              <ProductCard key={product.productId} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
