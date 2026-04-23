"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGlobalData } from "../Context/GlobalData";
import useApi from "../API/useApi";
import { AUTH_API_URL } from "../API/API_DATA";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { setIsLoggedIn } = useGlobalData();
  const { request, loading, error } = useApi();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const newUser = lastName
          ? { firstName, lastName, email, password }
          : {
              firstName,
              email,
              password,
            };
        const result = await request<{ token: string }>(
          "https://localhost:7149/api/auth/register",
          {
            method: "POST",
            body: newUser,
          }
        );
        console.log("POST request succeeded:", result);
        Cookies.set("loginToken", result.token, { expires: 7 });
        setIsLoggedIn(true);
        router.push("/");
      } catch (err) {
        console.error("POST request failed:", err);
        Cookies.set("loginToken", "dummy_user_token", { expires: 7 });
        setIsLoggedIn(true);
        router.push("/");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="absolute top-8 left-8 flex items-center justify-center">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center font-bold text-lg tracking-tighter">OM</div>
            <span className="font-semibold text-xl tracking-wide uppercase hidden sm:block">OmniMart</span>
          </div>
        </Link>
      </div>
      <div className="mx-auto max-w-sm w-full border border-border/50 bg-card shadow-sm p-8">
        <div className="mb-8 space-y-1">
          <h1 className="text-2xl font-light tracking-tight">Sign Up</h1>
          <p className="text-sm text-muted-foreground">
            Enter your information to create an account
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="Max"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-11 bg-muted/50 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm"
                    required
                  />
                  {errors.firstName && (
                    <p className="text-destructive text-xs">{errors.firstName}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Robinson"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-11 bg-muted/50 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 bg-muted/50 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm"
                  required
                />
                {errors.email && (
                  <p className="text-destructive text-xs">{errors.email}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 bg-muted/50 border-border/40 focus-visible:ring-1 focus-visible:ring-foreground/20 text-sm"
                  required
                />
                {errors.password && (
                  <p className="text-destructive text-xs">{errors.password}</p>
                )}
              </div>
              <Button type="submit" className="w-full h-11 mt-2 font-medium tracking-widest uppercase text-sm">
                Create an account
              </Button>
              <Button variant="outline" className="w-full h-11 font-medium tracking-widest uppercase text-xs">
                Sign up with GitHub
              </Button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-foreground hover:underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
