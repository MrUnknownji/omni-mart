import React from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-16 lg:px-12 lg:py-24">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">Contact Us</h1>
        <div className="space-y-8 text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-medium text-foreground mb-4">Get in Touch</h2>
            <p>Our dedicated support team is available to assist you with any inquiries regarding our products, styling advice, or your order.</p>
          </section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border/40">
            <div>
              <h3 className="font-medium text-foreground mb-2">Email</h3>
              <p>concierge@omnimart.com</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Phone</h3>
              <p>+1 (800) OMNI-MRT</p>
              <p className="text-sm mt-1">Mon-Fri, 9am - 6pm EST</p>
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Headquarters</h3>
              <p>123 Luxury Avenue</p>
              <p>New York, NY 10001</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
