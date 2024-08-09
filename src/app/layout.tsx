import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Toaster } from "@/components/ui/toaster";
import { GlobalProvider } from "./Context/GlobalData";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omni-Mart",
  description: "Everything Everywhere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ThemeProvider enableSystem={true} attribute="class">
          <GlobalProvider>
            {children}
            <Toaster />
          </GlobalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
