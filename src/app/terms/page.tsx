import React from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-16 lg:px-12 lg:py-24">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">Terms of Service</h1>
        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-foreground mb-4">1. Agreement to Terms</h2>
            <p>By accessing or using our services, you agree to be bound by these terms. If you disagree with any part of the terms, then you may not access the service.</p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-foreground mb-4">2. Purchases</h2>
            <p>If you wish to purchase any product or service made available through OmniMart, you may be asked to supply certain information relevant to your Purchase including your credit card number, the expiration date of your credit card, and your billing address.</p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-foreground mb-4">3. Content</h2>
            <p>Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
