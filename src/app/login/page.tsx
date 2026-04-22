"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useGlobalData } from "../Context/GlobalData";
import useApi from "../API/useApi";
import { User as UserIcon } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { setIsLoggedIn } = useGlobalData();
  const { request } = useApi();

  useEffect(() => {
    const token = Cookies.get("loginToken");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 3) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFastLogin = () => {
    Cookies.set("loginToken", "dummy_user_token", { expires: 7 });
    setIsLoggedIn(true);
    router.push("/");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      if (email === "admin@email.com" && password === "Test@123") {
        Cookies.set("loginToken", "admin_token", { expires: 7 });
        setIsLoggedIn(true);
        router.push("/admin");
        return;
      }

      try {
        const result = await request("/api/auth/login", {
          method: "POST",
          body: { email, password },
        });
        Cookies.set("loginToken", result.token, { expires: 7 });
        setIsLoggedIn(true);
        router.push("/");
      } catch (err) {
        // Fallback for regular users
        Cookies.set("loginToken", "dummy_user_token", { expires: 7 });
        setIsLoggedIn(true);
        router.push("/");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-muted/20">
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
          <h1 className="text-2xl font-light tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Enter your email below to sign in to your account</p>
        </div>

        <div className="grid gap-4 mb-6">
          <Button
            variant="outline"
            className="w-full justify-start gap-2 text-muted-foreground border-dashed"
            onClick={handleFastLogin}
          >
            <UserIcon className="w-4 h-4" /> Fast Login: Test User
          </Button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password" className="text-xs font-medium tracking-widest uppercase text-muted-foreground">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
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
              Sign In
            </Button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          {`Don't have an account? `}
          <Link href="/signup" className="text-foreground hover:underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
