"use client";
import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { useGlobalData } from "../Context/GlobalData";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { cart, setCart, isLoggedIn } = useGlobalData();
  const { toast } = useToast();
  const router = useRouter();

  const addToCart = () => {
    cart.find((item) => item.productId === product.productId)
      ? setCart((prevData) =>
          prevData.map((item) =>
            item.productId === product.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        )
      : setCart((prevData) => [
          ...prevData,
          {
            ...product,
            cartItemId: product.productId,
            quantity: 1,
            addedAt: new Date(),
          },
        ]);

    toast({
      title: cart.find((item) => item.productId === product.productId)
        ? `Item's quantity is now ${
            (cart.find((item) => item.productId === product.productId)
              ?.quantity ?? 0) + 1
          }`
        : `Item added to cart`,
      description: "You can now checkout",
      action: (
        <ToastAction altText="View Cart" onClick={() => router.push("/cart")}>
          View Cart
        </ToastAction>
      ),
    });
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader />
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md overflow-hidden border">
          <Link href={`/product/${product.productId}`}>
            <Image
              src={product.image}
              alt={product.title}
              className="object-cover"
              width={500}
              height={500}
            />
          </Link>
        </div>
        <div>
          <Link href={`/product/${product.productId}`}>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {product.title}
              </p>
              <p className="text-sm text-muted-foreground">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={!isLoggedIn}
          onClick={() => addToCart()}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
