"use client";
import React, { useState, useEffect } from "react";
import { Search, ShoppingBag, Settings, X, Menu } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top announcement bar */}
      <div className="w-full bg-zinc-950 text-white text-center py-2.5 text-xs tracking-[0.2em] uppercase font-body font-medium">
        Free Shipping on Orders Over $150 &nbsp;·&nbsp; New Collection Available
      </div>

      <nav
        className={`sticky top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/95 backdrop-blur-2xl border-b border-border/60 shadow-[0_4px_40px_rgba(0,0,0,0.06)]"
            : "bg-background/80 backdrop-blur-xl border-b border-border/30"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => router.push("/")}
            >
              <div className="relative w-9 h-9 bg-zinc-950 text-white flex items-center justify-center overflow-hidden">
                <span className="font-display text-sm font-light tracking-widest group-hover:scale-110 transition-transform duration-300">
                  OM
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-xl tracking-[0.15em] uppercase">
                  OmniMart
                </span>
              </div>
            </div>

            {/* Center Nav Links */}
            <div className="hidden lg:flex items-center gap-10">
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/#collection" },
                { label: "Support", href: "/support" },
                { label: "Cart", href: "/cart" }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => router.push(item.href)}
                  className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1 lg:gap-3">
              {/* Search toggle */}
              {isSearch && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-transparent hover:text-gold transition-colors duration-300"
                  onClick={() => setSearchOpen(!searchOpen)}
                  id="nav-search-btn"
                >
                  {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                </Button>
              )}

              {!isLoggedIn ? (
                <button
                  className="hidden sm:flex font-body text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 px-3 py-2"
                  onClick={() => router.push("/login")}
                  id="nav-signin-btn"
                >
                  Sign In
                </button>
              ) : (
                <div className="flex items-center gap-1">
                  {user?.role === "admin" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => router.push("/admin/settings")}
                      className="hover:bg-transparent hover:text-gold transition-colors duration-300"
                      id="nav-admin-btn"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-transparent hover:text-gold transition-colors duration-300"
                    onClick={() => router.push("/cart")}
                    id="nav-cart-btn"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {cart.length > 0 && (
                      <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-gold rounded-full" />
                    )}
                  </Button>
                </div>
              )}

              {/* Divider + Avatar */}
              <div className="pl-3 ml-1 border-l border-border/40">
                <NavDropDownMenu />
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-transparent transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                id="nav-mobile-menu-btn"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Expanding search bar */}
          {isSearch && searchOpen && (
            <div className="pb-4 overflow-hidden">
              <div
                className="relative w-full"
                style={{ animation: "fade-up 0.3s ease forwards" }}
              >
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  autoFocus
                  type="search"
                  className="w-full h-12 pl-10 pr-4 bg-muted/30 border-border/40 focus-visible:ring-1 focus-visible:ring-gold/40 font-body text-sm tracking-wide placeholder:text-muted-foreground/50"
                  placeholder="Search the collection..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  id="nav-search-input"
                />
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/40 bg-background/98 backdrop-blur-2xl px-6 py-6">
            <div className="flex flex-col gap-5">
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/#collection" },
                { label: "Support", href: "/support" },
                { label: "Cart", href: "/cart" }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => { router.push(item.href); setMobileMenuOpen(false); }}
                  className="font-body text-xs tracking-[0.2em] uppercase text-left text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
              {!isLoggedIn && (
                <button
                  onClick={() => router.push("/login")}
                  className="font-body text-xs tracking-[0.2em] uppercase text-left text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
