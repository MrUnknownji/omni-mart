import React from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-16 lg:px-12 lg:py-24">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">Privacy Policy</h1>
        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-foreground mb-4">1. Information We Collect</h2>
            <p>At OmniMart, your privacy is our priority. We collect information to provide better services to all our users. We may collect personal information such as your name, email address, and shipping address when you create an account or place an order.</p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-foreground mb-4">2. How We Use Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect OmniMart and our users.</p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-foreground mb-4">3. Data Security</h2>
            <p>We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold. We use encryption to keep your data private while in transit.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
