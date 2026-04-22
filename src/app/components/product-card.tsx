"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useGlobalData } from "../Context/GlobalData";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { cart, setCart, isLoggedIn } = useGlobalData();
  const { toast } = useToast();
  const router = useRouter();

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
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
      title: "Added to Cart",
      description: `${product.title} has been added to your curated selection.`,
    });
  };

  return (
    <div className={cn("group relative flex flex-col space-y-4", className)}>
      <Link href={`/product/${product.productId}`} className="block overflow-hidden relative aspect-[4/5] bg-muted/30">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-105"
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
        
        {/* Quick Add Button */}
        <div className="absolute bottom-4 left-0 right-0 px-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
          <Button 
            className="w-full bg-background/90 text-foreground backdrop-blur-sm hover:bg-foreground hover:text-background rounded-none font-medium tracking-wide uppercase text-xs h-12"
            onClick={addToCart}
          >
            {isLoggedIn ? "Quick Add" : "Sign in to Buy"}
          </Button>
        </div>
      </Link>
      
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-start">
          <Link href={`/product/${product.productId}`} className="group-hover:underline decoration-1 underline-offset-4">
            <h3 className="font-medium text-sm md:text-base leading-snug">{product.title}</h3>
          </Link>
        </div>
        <p className="text-muted-foreground text-sm font-medium tracking-wide">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
