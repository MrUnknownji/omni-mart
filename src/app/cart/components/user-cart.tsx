"use client";
import { Copy, Minus, Plus, Trash, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGlobalData } from "@/app/Context/GlobalData";
import { useEffect, useState, useMemo } from "react";
import { CartItem } from "@/lib/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function UserCart({ searchTerm }: { searchTerm: string }) {
  const { cart, setCart, user } = useGlobalData();
  const [cartItems, setCartItems] = useState(cart);

  const router = useRouter();

  const filteredCartItems = useMemo(() => {
    return cartItems.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, cartItems]);

  const handleQuantityChange = (index: number, change: number) => {
    const updatedCart = cartItems.map((item, i) =>
      i === index ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    setCartItems(updatedCart);
    setCart(updatedCart);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const shipping = 5.0;
  const taxRate = 0.1;

  const calculateTax = () => {
    return calculateSubtotal() * taxRate;
  };

  const handleDeleteItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    setCart(updatedCart);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      {/* Cart Items List */}
      <div className="flex-1 w-full">
        <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-border/40 text-xs font-medium tracking-widest uppercase text-muted-foreground">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        <div className="divide-y divide-border/40">
          {filteredCartItems.map((item, index) => (
            <div key={index} className="py-6 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center flex flex-col gap-4">
              <div className="col-span-6 flex items-center gap-4">
                <div className="h-24 w-20 bg-muted/20 relative shrink-0">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium tracking-wide text-base">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 hidden sm:block">{item.brand || item.category}</p>
                  <Button
                    variant="link"
                    className="px-0 h-auto text-muted-foreground hover:text-destructive mt-2 text-xs uppercase tracking-widest sm:hidden"
                    onClick={() => handleDeleteItem(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>

              <div className="col-span-2 text-center hidden sm:block">
                <span className="text-sm font-medium tracking-wider">${item.price.toFixed(2)}</span>
              </div>

              <div className="col-span-2 flex items-center justify-center">
                <div className="flex items-center border border-border/50">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-none hover:bg-muted/20"
                    onClick={() => handleQuantityChange(index, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-none hover:bg-muted/20"
                    onClick={() => handleQuantityChange(index, 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="col-span-2 flex items-center justify-between sm:justify-end">
                <span className="text-base font-medium tracking-wider sm:hidden">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </span>
                <span className="text-base font-medium tracking-wider hidden sm:block">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hidden sm:flex ml-4"
                  onClick={() => handleDeleteItem(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div className="w-full lg:w-80 xl:w-96 shrink-0 bg-muted/5 border border-border/40 p-6 md:p-8">
        <h2 className="text-xl font-light tracking-tight mb-6">Order Summary</h2>
        
        <div className="space-y-4 text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium tracking-wider">${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Shipping Estimate</span>
            <span className="font-medium tracking-wider">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax Estimate</span>
            <span className="font-medium tracking-wider">${calculateTax().toFixed(2)}</span>
          </div>
        </div>
        
        <Separator className="my-6 border-border/50" />
        
        <div className="flex justify-between mb-8 items-end">
          <span className="font-medium">Total</span>
          <span className="text-2xl font-light tracking-tight">
            ${(calculateSubtotal() + shipping + calculateTax()).toFixed(2)}
          </span>
        </div>

        <Button
          className="w-full h-14 text-sm font-medium tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-all group"
          onClick={() => router.push("/checkout")}
        >
          Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>

        <div className="mt-8 space-y-4">
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-1">Shipping To</h4>
            <p className="text-sm">{user.firstName} {user.lastName}</p>
            <p className="text-sm text-muted-foreground">{user?.address?.city || "Update address at checkout"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
