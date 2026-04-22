"use client";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

export default function SubscriptionPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const subscriptionData = {
    name: "OmniMart Plus",
    monthlyPrice: 9.99,
    annualPrice: 99.99,
    features: [
      "Free priority shipping on all orders",
      "Early access to new collections and sales",
      "Exclusive member-only discounts",
      "Dedicated 24/7 concierge support",
      "Extended 60-day return window",
    ],
  };

  const currentPrice = isAnnual
    ? subscriptionData.annualPrice
    : subscriptionData.monthlyPrice;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-grow flex flex-col items-center justify-center py-20 px-6 lg:px-12">
        <div className="max-w-3xl w-full text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6">
            Elevate Your Experience
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Join OmniMart Plus and unlock a world of premium benefits designed exclusively for our most valued members.
          </p>
        </div>

        <div className="w-full max-w-lg mx-auto bg-muted/5 border border-border/40 p-8 md:p-12 shadow-2xl">
          <div className="flex flex-col items-center mb-10 text-center">
            <h2 className="text-2xl font-medium tracking-wide mb-2 uppercase">{subscriptionData.name}</h2>
            <div className="flex items-end justify-center gap-1 mb-6">
              <span className="text-5xl font-light tracking-tight">${currentPrice}</span>
              <span className="text-muted-foreground pb-1">/{isAnnual ? "year" : "month"}</span>
            </div>
            
            <div className="flex items-center justify-center gap-4 bg-muted/20 px-6 py-3 border border-border/40">
              <Label htmlFor="billing-cycle" className={`text-sm tracking-wider cursor-pointer transition-colors ${!isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>MONTHLY</Label>
              <Switch
                id="billing-cycle"
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <Label htmlFor="billing-cycle" className={`text-sm tracking-wider cursor-pointer transition-colors ${isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                ANNUALLY <span className="ml-1 text-xs text-green-600 font-bold">SAVE 17%</span>
              </Label>
            </div>
          </div>

          <div className="space-y-4 mb-10">
            {subscriptionData.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <Button className="w-full h-14 text-sm font-medium tracking-widest uppercase bg-foreground text-background hover:bg-foreground/90 transition-all group">
            Become a Member <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <p className="mt-6 text-center text-xs text-muted-foreground uppercase tracking-widest">
            Cancel anytime. No hidden fees.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
