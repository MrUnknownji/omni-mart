"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Settings, HelpCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavDropDownMenu from "../components/nav-dropdown-menu";
import Image from "next/image";
import { useState, useEffect } from "react";
import NotificationDropdown from "./components/NotificationDropdown";
import { useGlobalData } from "../Context/GlobalData";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoggedIn, isLoading } = useGlobalData();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isLoggedIn || user.role !== "admin") {
        router.push("/");
      }
    }
  }, [isLoggedIn, user, isLoading, router]);

  if (isLoading || !isLoggedIn || user.role !== "admin") {
    return null; // or a loading spinner
  }

  const isActive = (path: string) => {
    return pathname === path
      ? "text-foreground"
      : "text-foreground/60 hover:text-foreground/80";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Button
              size="icon"
              variant="ghost"
              className="mr-2 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Link href="/" className="flex items-center justify-center">
              <Image src="/favicon.svg" width={30} height={30} alt="OmniMart" />
            </Link>
          </div>
          <nav
            className={`${
              isMenuOpen 
                ? "absolute left-0 top-14 w-full bg-background border-b z-50 animate-in fade-in slide-in-from-top-2 duration-300" 
                : "hidden"
            } md:static md:flex md:w-auto md:border-none`}
          >
            <div className="flex flex-col space-y-4 p-6 md:flex-row md:space-x-8 md:space-y-0 md:p-0">
              <Link
                className={`transition-colors ${isActive("/admin")}`}
                href="/admin"
              >
                Dashboard
              </Link>
              <Link
                className={`transition-colors ${isActive("/admin/products")}`}
                href="/admin/products"
              >
                Products
              </Link>
              <Link
                className={`transition-colors ${isActive("/admin/orders")}`}
                href="/admin/orders"
              >
                Orders
              </Link>
              <Link
                className={`transition-colors ${isActive("/admin/customers")}`}
                href="/admin/customers"
              >
                Customers
              </Link>
            </div>
          </nav>
          <div className="flex items-center space-x-4">
            <NotificationDropdown />
            <NavDropDownMenu small />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full min-h-[calc(100vh-160px)]">
        {children}
      </main>

      <footer className="border-t bg-muted/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center font-bold text-xs tracking-tighter">OM</div>
              <span className="text-sm font-semibold tracking-wide uppercase">Admin Portal</span>
            </div>
            <p className="text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
              © 2026 Omni-Mart — Intelligent Logistics & Performance
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
