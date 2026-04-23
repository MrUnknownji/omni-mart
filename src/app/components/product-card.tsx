"use client";
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import NextImage from "next/image";
import { useGlobalData } from "../Context/GlobalData";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import { ShoppingBag, Eye, Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  className?: string;
  index?: number;
}

export default function ProductCard({ product, className, index = 0 }: ProductCardProps) {
  const { cart, setCart, isLoggedIn } = useGlobalData();
  const { toast } = useToast();
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [wished, setWished] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 80);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [index]);

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    const existingItem = cart.find((item) => item.productId === product.productId);
    if (existingItem) {
      setCart((prev) =>
        prev.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart((prev) => [
        ...prev,
        {
          ...product,
          cartItemId: product.productId,
          quantity: 1,
          addedAt: new Date(),
        },
      ]);
    }
    toast({
      title: "Added to Collection",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const inCart = cart.some((item) => item.productId === product.productId);

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative flex flex-col",
        "transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
      style={{ transitionDelay: isVisible ? "0ms" : `${index * 80}ms` }}
    >
      {/* Image Container */}
      <div
        className="relative overflow-hidden bg-muted/20"
        style={{ aspectRatio: "4/5" }}
      >
        {/* Transparent navigation overlay (behind interactive elements) */}
        <Link
          href={`/product/${product.productId}`}
          className="absolute inset-0 z-10"
          id={`product-card-${product.productId}`}
          tabIndex={-1}
          aria-hidden
        />

        <NextImage
          src={product.image}
          alt={product.title}
          fill
          className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

        {/* Sale badge */}
        {product.salePrice && (
          <div className="absolute top-3 left-3 bg-gold text-white font-body text-[10px] tracking-[0.2em] uppercase px-2 py-1 z-20">
            Sale
          </div>
        )}

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:text-white z-20"
          onClick={(e) => { e.stopPropagation(); setWished(!wished); }}
          id={`wishlist-${product.productId}`}
        >
          <Heart className={cn("w-3.5 h-3.5 transition-colors", wished ? "fill-gold text-gold" : "")} />
        </button>

        {/* Bottom actions */}
        <div className="absolute bottom-0 left-0 right-0 flex gap-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
          <button
            className="flex-1 h-12 bg-background/95 backdrop-blur-sm text-foreground font-body text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-gold hover:text-white transition-colors duration-300"
            onClick={addToCart}
            id={`add-to-cart-${product.productId}`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {isLoggedIn ? (inCart ? "Added" : "Quick Add") : "Sign In"}
          </button>
          <button
            className="w-12 h-12 bg-black/80 backdrop-blur-sm text-white flex items-center justify-center hover:bg-gold transition-colors duration-300"
            onClick={() => router.push(`/product/${product.productId}`)}
            id={`view-product-${product.productId}`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-4 flex flex-col gap-1">
        {/* Category */}
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground/70">
          {product.category}
        </span>

        {/* Title */}
        <Link href={`/product/${product.productId}`}>
          <h3 className="font-display text-base leading-snug text-foreground group-hover:text-gold transition-colors duration-300 line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Price Row */}
        <div className="flex items-center gap-3 mt-1">
          {product.salePrice ? (
            <>
              <span className="font-body text-sm font-medium text-gold">
                ${product.salePrice.toFixed(2)}
              </span>
              <span className="font-body text-xs text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-body text-sm font-medium text-foreground">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating dots */}
        {product.rating > 0 && (
          <div className="flex items-center gap-1.5 mt-1">
            {[1,2,3,4,5].map((star) => (
              <div
                key={star}
                className={cn(
                  "w-1 h-1 rounded-full transition-colors",
                  star <= Math.round(product.rating) ? "bg-gold" : "bg-border"
                )}
              />
            ))}
            <span className="font-body text-[10px] text-muted-foreground ml-1">
              ({product.reviewCount})
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
