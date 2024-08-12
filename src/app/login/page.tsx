"use client";
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
import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGlobalData } from "../Context/GlobalData";
import useApi from "../API/useApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const { setIsLoggedIn } = useGlobalData();
  const { request, loading, error } = useApi();

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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const result = await request("https://localhost:7149/api/auth/login", {
          method: "POST",
          body: { email, password },
        });
        console.log("POST request succeeded:", result);
        Cookies.set("loginToken", result.userId, { expires: 7 });
        setIsLoggedIn(true);
        router.push("/");
      } catch (err) {
        console.error("POST request failed:", err);
      }
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="absolute top-4 left-4 flex items-center justify-center">
        <Link href="/">
          <Avatar>
            <AvatarImage src="/favicon.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Link>
      </div>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button type="button" variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            {`Don't have an account?`}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
