import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t border-border/40 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-between items-start md:flex-row md:items-end">
        <div className="mb-12 md:mb-0 space-y-4 max-w-sm">
           <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-foreground text-background flex items-center justify-center font-bold text-xs rounded-sm tracking-tighter">OM</div>
            <span className="font-semibold tracking-wide uppercase">OmniMart</span>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Curated essentials for the modern lifestyle. Precision crafted, invisibly excellent.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 w-full md:w-auto items-start md:items-end justify-end">
          <ul className="flex flex-wrap gap-6 text-sm text-muted-foreground uppercase tracking-widest font-medium">
            <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
            <li><Link href="/shipping" className="hover:text-foreground transition-colors">Shipping</Link></li>
            <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-border/20 text-xs text-muted-foreground uppercase tracking-wider flex justify-between">
        <p>&copy; {new Date().getFullYear()} OmniMart. Invisible Excellence.</p>
      </div>
    </footer>
  );
};

export default Footer;
