import React from "react";
import Link from "next/link";
import { Globe, Share2, Play, ArrowRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-white border-t border-white/5">
      {/* Main Footer Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-background text-foreground flex items-center justify-center">
                <span className="font-display text-sm tracking-widest">OM</span>
              </div>
              <span className="font-display text-2xl tracking-[0.15em] uppercase text-white">
                OmniMart
              </span>
            </div>
            <p className="font-body text-sm leading-[1.9] tracking-wide text-white/50 max-w-xs mb-8">
              Curated essentials for the modern lifestyle. Precision crafted,
              invisibly excellent. Every product tells a story of innovation.
            </p>

            {/* Newsletter */}
            <div className="flex gap-0 max-w-sm">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 h-12 bg-white/10 border border-white/10 px-4 font-body text-xs tracking-wide text-white placeholder:text-white/30 outline-none focus:border-gold/50 transition-colors"
                id="footer-email-input"
                suppressHydrationWarning
              />
              <button
                className="w-12 h-12 bg-gold flex items-center justify-center hover:bg-gold/80 transition-colors shrink-0"
                id="footer-subscribe-btn"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="font-body text-[10px] tracking-[0.1em] text-white/30 mt-2">
              Subscribe for exclusive offers and new arrivals.
            </p>
          </div>

          {/* Navigation Columns */}
          <div>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gold font-medium mb-6">
              Shop
            </p>
            <ul className="flex flex-col gap-3">
              {["New Arrivals", "Electronics", "Accessories", "Smartwatches", "Laptops", "Sale"].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="font-body text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gold group-hover:w-3 transition-all duration-300 inline-block" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-gold font-medium mb-6">
              Company
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Shipping Policy", href: "/shipping" },
                { label: "Contact Us", href: "/contact" },
                { label: "Support", href: "/support" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-body text-sm text-white/50 hover:text-white transition-colors duration-300 tracking-wide flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-gold group-hover:w-3 transition-all duration-300 inline-block" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs tracking-[0.15em] text-white/30 uppercase">
            © {currentYear} OmniMart. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            {[
              { icon: Globe, href: "#", label: "Website" },
              { icon: Share2, href: "#", label: "Social" },
              { icon: Play, href: "#", label: "Videos" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/40 hover:border-gold/40 hover:text-gold transition-all duration-300"
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          <p className="font-body text-xs tracking-[0.1em] text-white/20">
            Invisible Excellence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
