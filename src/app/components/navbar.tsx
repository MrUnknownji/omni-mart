"use client";
import React from "react";
import { LogIn, Search, ShoppingBag, Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavDropDownMenu from "./nav-dropdown-menu";
import { useRouter } from "next/navigation";
import { useGlobalData } from "../Context/GlobalData";

interface NavBarProps {
  isSearch?: boolean;
  searchTerm?: string;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar = ({
  isSearch = false,
  searchTerm = "",
  setSearchTerm = () => {},
}: NavBarProps) => {
  const router = useRouter();
  const { isLoggedIn, cart, user } = useGlobalData();

  return (
    <nav className="sticky top-0 left-0 w-full bg-background/90 backdrop-blur-xl border-b border-border/40 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
            <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center font-bold text-lg tracking-tighter">OM</div>
            <span className="font-semibold text-xl tracking-wide uppercase hidden sm:block">OmniMart</span>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1 max-w-lg mx-8">
            {isSearch && (
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                <Input
                  type="search"
                  className="w-full h-11 pl-12 pr-4 bg-muted/30 hover:bg-muted/50 border-transparent focus-visible:ring-1 focus-visible:ring-foreground/20 focus-visible:bg-background transition-all text-sm tracking-wide"
                  placeholder="Search curated collection..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            {!isLoggedIn ? (
              <Button
                variant="ghost"
                className="text-sm font-medium tracking-wide uppercase hidden sm:flex hover:bg-transparent hover:text-muted-foreground transition-colors"
                onClick={() => router.push("/login")}
              >
                Sign In
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                {user?.role === "admin" && (
                  <Button variant="ghost" size="icon" onClick={() => router.push("/admin/settings")} className="hover:bg-transparent hover:text-muted-foreground transition-colors">
                    <Settings className="w-5 h-5" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="relative hover:bg-transparent hover:text-muted-foreground transition-colors" onClick={() => router.push("/cart")}>
                  <ShoppingBag className="w-5 h-5" />
                  {cart.length > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-foreground"></span>
                  )}
                </Button>
              </div>
            )}
            <div className="pl-2 border-l border-border/40">
               <NavDropDownMenu />
            </div>
          </div>
        </div>
        {isSearch && (
          <div className="md:hidden pb-4">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
              <Input
                type="search"
                className="w-full h-11 pl-12 pr-4 bg-muted/30 border-transparent focus-visible:ring-1 focus-visible:ring-foreground/20 transition-all text-sm tracking-wide"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
