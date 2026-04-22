"use client";
import Link from "next/link";
import { Package2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlobalData } from "@/app/Context/GlobalData";
import { UserCart } from "./user-cart";
import NavDropDownMenu from "@/app/components/nav-dropdown-menu";

export function Dashboard() {
  const { cart } = useGlobalData();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-6 lg:px-12 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center font-bold text-lg tracking-tighter">OM</div>
            <span className="font-semibold text-xl tracking-wide uppercase hidden sm:block">OmniMart</span>
          </Link>
          <div className="flex items-center space-x-4">
            <NavDropDownMenu />
          </div>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-light tracking-tight">Shopping Cart</h1>
          {cart.length > 0 && (
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
              {cart.length} Item{cart.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {cart.length > 0 ? (
          <UserCart searchTerm="" />
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center bg-muted/5 border border-border/40">
            <Package2 className="h-16 w-16 text-muted-foreground mb-6 opacity-50" />
            <h2 className="text-2xl font-light tracking-tight mb-3">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven&apos;t added anything to your cart yet. Explore our collections and find something you love.
            </p>
            <Button asChild className="h-12 px-8 text-sm font-medium tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-all group">
              <Link href="/">
                Continue Shopping <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
