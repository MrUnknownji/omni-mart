"use client";
import { useState } from "react";
import { Check, CreditCard, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NavBar from "../components/navbar";

export default function SubscriptionPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const subscriptionData = {
    name: "Omni Mart Plus",
    monthlyPrice: 9.99,
    annualPrice: 99.99,
    features: [
      "Free shipping on all orders",
      "Early access to sales",
      "Exclusive member-only deals",
      "24/7 customer support",
      "30-day money-back guarantee",
    ],
  };

  const currentPrice = isAnnual
    ? subscriptionData.annualPrice
    : subscriptionData.monthlyPrice;

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-muted/40 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-center text-3xl font-bold">
            Upgrade Your Shopping Experience
          </h1>
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">
                    {subscriptionData.name}
                  </CardTitle>
                  <CardDescription>Get more from your shopping</CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  Most Popular
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6 text-center">
                <span className="text-4xl font-bold">${currentPrice}</span>
                <span className="text-muted-foreground">
                  {isAnnual ? "/year" : "/month"}
                </span>
              </div>
              <div className="mb-6 flex items-center justify-center space-x-2">
                <Label htmlFor="annual-billing">Monthly</Label>
                <Switch
                  id="annual-billing"
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                />
                <Label htmlFor="annual-billing">Annual</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save 17% with annual billing</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <ul className="space-y-2">
                {subscriptionData.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg">
                <CreditCard className="mr-2 h-4 w-4" />
                Subscribe Now
              </Button>
            </CardFooter>
          </Card>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            By subscribing, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </div>
      </div>
    </>
  );
}
