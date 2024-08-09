"use client";
import Link from "next/link";
import { Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGlobalData } from "@/app/Context/GlobalData";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { UserCart } from "./user-cart";
import NavDropDownMenu from "@/app/components/nav-dropdown-menu";
import { ToastAction } from "@/components/ui/toast";

export function Dashboard() {
  const { cart } = useGlobalData();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    toast({
      duration: Infinity,
      style: { borderWidth: 0, padding: 0, background: "transparent" },
      action: (
        <Card x-chunk="dashboard-02-chunk-0">
          <CardHeader className="p-2 pt-0 md:p-4">
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
            <Link href="/subscription">
              <ToastAction altText="Upgrade to Pro" className="w-full">
                Upgrade
              </ToastAction>
            </Link>
          </CardContent>
        </Card>
      ),
    });
  }, []);

  return (
    <div className="grid min-h-screen w-full ">
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="flex h-14 w-fit items-center lg:h-[60px]">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Omni Mart</span>
            </Link>
          </div>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </form>
          </div>
          <NavDropDownMenu />
        </header>
        {cart.length > 0 ? (
          <UserCart searchTerm={searchTerm} />
        ) : (
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
            </div>
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                  You have no products
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can start selling as soon as you add a product.
                </p>
                <Button className="mt-4">
                  <Link href="/">Add Product</Link>
                </Button>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
