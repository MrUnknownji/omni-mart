"use client";
import { Mail, MessageCircle, Phone, Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import NavBar from "../components/navbar";
import { CreateTicketDialog } from "./components/create-ticket-dialog";
import Footer from "../components/footer";

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-muted/10 py-20 lg:py-32 border-b border-border/40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-6">How can we help you?</h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Search our knowledge base or get in touch with our support team for assistance.
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for articles, guides, or FAQ..."
              className="w-full h-14 pl-12 pr-4 bg-background border-border/50 text-base focus-visible:ring-1 focus-visible:ring-foreground/20 rounded-none"
            />
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 border border-border/40 hover:border-foreground/20 transition-colors group">
            <Mail className="h-8 w-8 text-foreground mb-6" />
            <h3 className="text-xl font-medium tracking-wide mb-2">Email Support</h3>
            <p className="text-muted-foreground mb-6">Get a response within 24 hours.</p>
            <a href="mailto:support@omnimart.com" className="inline-flex items-center text-sm font-medium tracking-widest uppercase hover:underline underline-offset-4">
              support@omnimart.com <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          
          <div className="p-8 border border-border/40 hover:border-foreground/20 transition-colors group">
            <Phone className="h-8 w-8 text-foreground mb-6" />
            <h3 className="text-xl font-medium tracking-wide mb-2">Phone Support</h3>
            <p className="text-muted-foreground mb-6">Available Mon-Fri, 9am - 6pm EST.</p>
            <a href="tel:+18001234567" className="inline-flex items-center text-sm font-medium tracking-widest uppercase hover:underline underline-offset-4">
              +1 (800) 123-4567 <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="p-8 border border-border/40 hover:border-foreground/20 transition-colors group bg-foreground text-background">
            <MessageCircle className="h-8 w-8 text-background mb-6" />
            <h3 className="text-xl font-medium tracking-wide mb-2">Submit a Ticket</h3>
            <p className="text-background/70 mb-6">Create a support ticket for complex issues.</p>
            <CreateTicketDialog />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-muted/5 border-t border-border/40">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light tracking-tight mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Quick answers to common questions.</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-border/40 py-2">
              <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-muted-foreground transition-colors">
                How do I create an account?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-6">
                To create an account, click on the &quot;Sign Up&quot; button in the top right corner of the homepage. Fill in your details and follow the prompts to complete the registration process.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-b border-border/40 py-2">
              <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-muted-foreground transition-colors">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-6">
                We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-b border-border/40 py-2">
              <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-muted-foreground transition-colors">
                How can I track my order?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-6">
                Once your order is shipped, you&apos;ll receive a tracking number via email. You can use this number to track your package on our website or the carrier&apos;s website.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-border/40 py-2">
              <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-muted-foreground transition-colors">
                What is your return policy?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-6">
                We offer a 30-day return policy for most items. Products must be in their original condition and packaging to be eligible for a return. Log into your account to generate a return label.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-b border-border/40 py-2">
              <AccordionTrigger className="text-lg font-medium hover:no-underline hover:text-muted-foreground transition-colors">
                Do you offer international shipping?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2 pb-6">
                Yes, we offer international shipping to most countries. Shipping costs and delivery times may vary depending on the destination and will be calculated at checkout.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
}
