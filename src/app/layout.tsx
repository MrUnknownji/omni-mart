import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Toaster } from "@/components/ui/toaster";
import { GlobalProvider } from "./Context/GlobalData";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

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
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon_io/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon_io/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon_io/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/favicon_io/apple-touch-icon.png" />
      </Head>
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
