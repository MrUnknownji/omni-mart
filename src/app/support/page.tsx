"use client";
import { Mail, MessageCircle, Phone, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <>
      <NavBar />
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col gap-4 p-4 sm:gap-8 sm:p-6 md:p-10">
          <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Search for Help</CardTitle>
                <CardDescription>
                  Find answers to your questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search support articles..."
                      className="w-full pl-8"
                    />
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <CardDescription>
                  Get in touch with our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  <span>support@omnimart.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  <span>+1 (800) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>Live Chat (24/7)</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Submit a Ticket</CardTitle>
                <CardDescription>
                  Create a support ticket for complex issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CreateTicketDialog />
              </CardContent>
            </Card>
          </div>
          <Tabs defaultValue="faq" className="w-full">
            <TabsList>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="orders">Orders & Shipping</TabsTrigger>
              <TabsTrigger value="returns">Returns & Refunds</TabsTrigger>
            </TabsList>
            <TabsContent value="faq" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Quick answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        How do I create an account?
                      </AccordionTrigger>
                      <AccordionContent>
                        {`To create an account, click on the "Sign Up" button in the
                      top right corner of the homepage. Fill in your details and
                      follow the prompts to complete the registration process.`}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        What payment methods do you accept?
                      </AccordionTrigger>
                      <AccordionContent>
                        We accept various payment methods including credit/debit
                        cards (Visa, MasterCard, American Express), PayPal, and
                        Apple Pay.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        How can I track my order?
                      </AccordionTrigger>
                      <AccordionContent>
                        {`Once your order is shipped, you'll receive a tracking
                      number via email. You can use this number to track your
                      package on our website or the carrier's website.`}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="orders" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Orders & Shipping</CardTitle>
                  <CardDescription>
                    Information about orders and shipping
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        How long does shipping take?
                      </AccordionTrigger>
                      <AccordionContent>
                        Shipping times vary depending on your location and
                        chosen shipping method. Standard shipping usually takes
                        3-5 business days, while express shipping can take 1-2
                        business days.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        Do you offer international shipping?
                      </AccordionTrigger>
                      <AccordionContent>
                        Yes, we offer international shipping to most countries.
                        Shipping costs and delivery times may vary depending on
                        the destination.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        Can I change or cancel my order?
                      </AccordionTrigger>
                      <AccordionContent>
                        You can change or cancel your order within 1 hour of
                        placing it. After that, please contact our customer
                        support team for assistance.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="returns" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Returns & Refunds</CardTitle>
                  <CardDescription>
                    Information about our return and refund policies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        What is your return policy?
                      </AccordionTrigger>
                      <AccordionContent>
                        We offer a 30-day return policy for most items. Products
                        must be in their original condition and packaging to be
                        eligible for a return.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>
                        How do I initiate a return?
                      </AccordionTrigger>
                      <AccordionContent>
                        To initiate a return, log into your account, go to your
                        order history, select the item you wish to return, and
                        follow the prompts to generate a return label.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>
                        How long do refunds take to process?
                      </AccordionTrigger>
                      <AccordionContent>
                        Once we receive your return, refunds are typically
                        processed within 3-5 business days. It may take an
                        additional 5-10 business days for the refund to appear
                        on your account, depending on your bank.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
