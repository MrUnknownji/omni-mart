"use client";
import {
  CreditCard,
  LifeBuoy,
  LogOut,
  User,
  Sun,
  Moon,
  Laptop,
  LogIn,
  ShoppingCart,
  Check,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useGlobalData } from "../Context/GlobalData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

const NavDropDownMenu = () => {
  const { user } = useGlobalData();
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src={user?.profileImage || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/subscription">
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Subscription</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Sun className="mr-2 h-4 w-4" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                  {theme === "light" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                  {theme === "dark" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Laptop className="mr-2 h-4 w-4" />
                  <span>System</span>
                  {theme === "system" && <Check className="ml-auto h-4 w-4" />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <Link href="/support">
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="md:hidden">
          <Link href="/login">
            <DropdownMenuItem>
              <LogIn className="mr-2 h-4 w-4" />
              <span>Login</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/cart">
            <DropdownMenuItem>
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>Cart</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="md:hidden" />
        <DropdownMenuItem disabled>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavDropDownMenu;
