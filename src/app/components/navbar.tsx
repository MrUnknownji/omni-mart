"use client";
import React from "react";
import { LogIn, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import NavDropDownMenu from "./nav-dropdown-menu";

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
  return (
    <nav className="sticky top-0 left-0 w-full bg-background/50 backdrop-blur-3xl border border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-1">
            <Link href="/">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4 flex-1">
            {isSearch && (
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="search"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit">Search</Button>
              </div>
            )}
          </div>
          <div className=" items-center space-x-8 flex flex-1 justify-end">
            <div className="hidden items-center space-x-8 md:flex">
              <Link href="/login">
                <Button variant="default" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              </Link>
              <Link
                href="/cart"
                className="text-foreground hover:text-muted-foreground"
              >
                <ShoppingCart />
              </Link>
            </div>
            <NavDropDownMenu />
          </div>
        </div>
        {isSearch && (
          <div className="md:hidden py-2">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button type="submit">Search</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
