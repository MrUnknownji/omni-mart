"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Settings, HelpCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavDropDownMenu from "../components/nav-dropdown-menu";
import Image from "next/image";
import { useState } from "react";
import NotificationDropdown from "./components/NotificationDropdown";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return pathname === path
      ? "text-foreground"
      : "text-foreground/60 hover:text-foreground/80";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
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
            className={`absolute left-0 top-14 w-full bg-background md:static md:w-auto ${
              isMenuOpen ? "block" : "hidden"
            } md:block`}
          >
            <div className="flex flex-col space-y-4 p-4 md:flex-row md:space-x-6 md:space-y-0 md:p-0">
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

      <main className="container py-6">{children}</main>

      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between py-4 md:flex-row">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © 2024 OmniMart. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-4 w-4" />
              <span className="sr-only">Help</span>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
