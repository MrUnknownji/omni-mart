import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-12 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-sm text-muted-foreground">
              Your one-stop shop for all your needs. Quality products, great
              prices, and excellent customer service.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              123 Shopping Street, Market Town, MT 12345
            </p>
            <p className="text-sm text-muted-foreground">
              Email: omni-mart@example.com
            </p>
            <p className="text-sm text-muted-foreground">
              Phone: (123) 456-7890
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Stay updated with our latest offers
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-grow"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; 2024 OmniMart. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
