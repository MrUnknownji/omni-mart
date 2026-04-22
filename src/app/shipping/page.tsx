import React from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

export default function ShippingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-16 lg:px-12 lg:py-24">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">Shipping & Returns</h1>
        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-foreground mb-4">Complimentary Global Shipping</h2>
            <p>OmniMart offers complimentary standard shipping on all orders globally. For expedited delivery, premium shipping options are available at checkout.</p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-foreground mb-4">Delivery Times</h2>
            <p>Standard delivery typically takes 3-5 business days. Premium shipping takes 1-2 business days. Please note that during high-volume periods, delivery times may be slightly extended.</p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-foreground mb-4">Returns & Exchanges</h2>
            <p>We accept returns within 30 days of delivery. Items must be in their original, unused condition with all tags and packaging intact. To initiate a return, please contact our support team.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
