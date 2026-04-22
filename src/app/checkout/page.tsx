"use client";
import { useState } from "react";
import { ChevronLeft, CreditCard, Truck, Apple, Bitcoin, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-12">
      <div className="mx-auto max-w-5xl">
        <Button
          variant="ghost"
          className="mb-8 hover:bg-transparent hover:text-muted-foreground transition-colors -ml-2"
          onClick={() => router.push("/cart")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>

        <div className="mb-12 pb-4 border-b border-border/40">
          <h1 className="text-3xl lg:text-4xl font-light tracking-tight">Secure Checkout</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-8">

            {/* Shipping Information */}
            <div className="border border-border/40 bg-muted/10">
              <div className="px-6 py-5 border-b border-border/40">
                <h2 className="text-base font-medium tracking-wide">Shipping Information</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Enter your shipping details</p>
              </div>
              <div className="p-6 grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">First Name</Label>
                    <Input id="first-name" placeholder="John" className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Address</Label>
                  <Input id="address" placeholder="123 Main St" className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">City</Label>
                    <Input id="city" placeholder="New York" className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">State</Label>
                    <Input id="state" placeholder="NY" className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Email</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+1 234 567 890" className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-border/40 bg-muted/10">
              <div className="px-6 py-5 border-b border-border/40">
                <h2 className="text-base font-medium tracking-wide">Payment Method</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Choose how you want to pay</p>
              </div>
              <div className="p-6 grid gap-6">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  <div className={`flex items-center space-x-3 border p-4 transition-colors cursor-pointer ${paymentMethod === 'credit-card' ? 'border-foreground bg-muted/20' : 'border-border/40 hover:border-foreground/40'}`}>
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex items-center cursor-pointer flex-1 text-sm">
                      <CreditCard className="mr-3 h-4 w-4" />
                      Credit Card
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 border p-4 transition-colors cursor-pointer ${paymentMethod === 'apple-pay' ? 'border-foreground bg-muted/20' : 'border-border/40 hover:border-foreground/40'}`}>
                    <RadioGroupItem value="apple-pay" id="apple-pay" />
                    <Label htmlFor="apple-pay" className="flex items-center cursor-pointer flex-1 text-sm">
                      <Apple className="mr-3 h-4 w-4" />
                      Apple Pay
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 border p-4 transition-colors cursor-pointer ${paymentMethod === 'google-pay' ? 'border-foreground bg-muted/20' : 'border-border/40 hover:border-foreground/40'}`}>
                    <RadioGroupItem value="google-pay" id="google-pay" />
                    <Label htmlFor="google-pay" className="flex items-center cursor-pointer flex-1 text-sm">
                      <Smartphone className="mr-3 h-4 w-4" />
                      Google Pay
                    </Label>
                  </div>
                  <div className={`flex items-center space-x-3 border p-4 transition-colors cursor-pointer ${paymentMethod === 'crypto' ? 'border-foreground bg-muted/20' : 'border-border/40 hover:border-foreground/40'}`}>
                    <RadioGroupItem value="crypto" id="crypto" />
                    <Label htmlFor="crypto" className="flex items-center cursor-pointer flex-1 text-sm">
                      <Bitcoin className="mr-3 h-4 w-4" />
                      Cryptocurrency
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "credit-card" && (
                  <div className="grid gap-4 pt-4 border-t border-border/40">
                    <div className="space-y-2">
                      <Label htmlFor="card-number" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Card Number</Label>
                      <Input id="card-number" placeholder="1234 5678 9012 3456" className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 font-mono text-sm" />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 space-y-2">
                        <Label htmlFor="expiry-date" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Expiry Date</Label>
                        <Input id="expiry-date" placeholder="MM/YY" className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">CVV</Label>
                        <Input id="cvv" placeholder="123" className="h-11 bg-muted/20 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod !== "credit-card" && (
                  <div className="pt-4 border-t border-border/40 text-center text-muted-foreground text-sm py-6">
                    You will be redirected to complete your purchase securely.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="border border-border/40 bg-muted/10 sticky top-24">
              <div className="px-6 py-5 border-b border-border/40">
                <h2 className="text-base font-medium tracking-wide">Order Summary</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>$2,549.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Tax</span>
                    <span>$25.49</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium text-base">
                    <span>Total</span>
                    <span>$2,579.49</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Button className="w-full h-12 text-sm font-medium uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 transition-all">
                  <Truck className="mr-2 h-4 w-4" />
                  Complete Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
