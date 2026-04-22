"use client";
import React, { useEffect, useState, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Check,
} from "lucide-react";
import { useGlobalData } from "@/app/Context/GlobalData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { CartItem, Product } from "@/lib/types";
import Footer from "../../components/footer";
import NavBar from "../../components/navbar";

export default function EnhancedProductDetail(
  props: {
    params: Promise<{ productId: string }>;
  }
) {
  const params = use(props.params);
  const router = useRouter();
  const { toast } = useToast();
  const { products, setCart, isLoggedIn } = useGlobalData();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!products.length) return;
    const foundProduct = products.find((p) => p.productId === params.productId);
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      router.push("/404");
    }
  }, [products, params.productId, router]);

  if (!product) return null;

  const productImages = product.extraImages
    ? [product.image, ...product.extraImages]
    : [product.image];

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }

    const newItem: CartItem = {
      cartItemId: product.productId,
      productId: product.productId,
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: quantity,
      category: product.category,
      addedAt: new Date(),
      image: product.image,
    };

    setCart((prevCart: CartItem[]) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.productId === product.productId
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        return [...prevCart, newItem];
      }
    });

    toast({
      title: "Added to Cart",
      description: `${quantity} ${quantity > 1 ? "pieces" : "piece"} added to your selection.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 lg:px-12 py-8 lg:py-16">
        <Button 
          variant="ghost" 
          className="mb-8 hover:bg-transparent hover:text-muted-foreground transition-colors -ml-4" 
          onClick={() => router.back()}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Collection
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column - Images */}
          <div className="space-y-6">
            {productImages.map((image, index) => (
              <div key={index} className="w-full aspect-[4/5] relative bg-muted/20">
                <Image
                  src={image}
                  alt={`${product.title} - View ${index + 1}`}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Right Column - Details */}
          <div className="flex flex-col">
            <div className="sticky top-32">
              <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase mb-4">
                {product.brand || product.category}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-4">
                {product.title}
              </h1>
              
              <p className="text-xl md:text-2xl font-normal tracking-wide mb-6">
                ${product.price?.toFixed(2)}
              </p>

              <div className="flex items-center mb-8 pb-8 border-b border-border/40">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < 5
                          ? "text-foreground fill-foreground"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-3 text-sm tracking-wide text-muted-foreground">
                  (123 reviews)
                </span>
              </div>

              <div className="prose prose-sm dark:prose-invert mb-10 text-muted-foreground leading-relaxed max-w-none">
                <p>{product.description}</p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center justify-between py-4 border-y border-border/40">
                  <span className="text-sm tracking-widest uppercase font-medium">Quantity</span>
                  <div className="flex items-center border border-border/50">
                    <button
                      className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-12 text-center text-sm font-medium">
                      {quantity}
                    </span>
                    <button
                      className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    className="w-full h-14 text-sm font-medium tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-all"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </div>
                
                <div className="pt-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Check className="h-4 w-4" />
                    <span>In stock and ready to ship</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ShoppingBag className="h-4 w-4" />
                    <span>Complimentary shipping & returns</span>
                  </div>
                </div>

                <div className="pt-12 mt-12 border-t border-border/40">
                  <h3 className="text-sm font-medium tracking-widest uppercase mb-6">Product Details</h3>
                  <ul className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                    <li className="grid grid-cols-3 gap-4">
                      <span className="font-medium text-foreground">Category</span>
                      <span className="col-span-2">{product.category}</span>
                    </li>
                    <li className="grid grid-cols-3 gap-4">
                      <span className="font-medium text-foreground">SKU</span>
                      <span className="col-span-2">{product.productId.substring(0, 8).toUpperCase()}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
