import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GlobalProvider } from "./Context/GlobalData";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "OmniMart — Premium Ecommerce",
  description: "Curated essentials for the discerning lifestyle. Precision crafted, invisibly excellent.",
  keywords: "premium ecommerce, luxury tech, curated collection, OmniMart",
  openGraph: {
    title: "OmniMart — Premium Ecommerce",
    description: "Curated essentials for the discerning lifestyle.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon_io/favicon.ico" sizes="any" />
      </head>
      <body>
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
