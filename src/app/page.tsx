"use client";
import { useState, useEffect, useRef } from "react";
import Carousel from "./components/carousel";
import Footer from "./components/footer";
import NavBar from "./components/navbar";
import ProductCard from "./components/product-card";
import { useGlobalData } from "./Context/GlobalData";
import { ArrowRight, Zap, Shield, Truck, RotateCcw } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

// Hook for intersection observer
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const categories = [
  { name: "Electronics", count: "24 Pieces", tag: "01" },
  { name: "Smartwatch", count: "12 Pieces", tag: "02" },
  { name: "Laptop", count: "18 Pieces", tag: "03" },
  { name: "Gaming Console", count: "9 Pieces", tag: "04" },
];

const promises = [
  { icon: Truck, label: "Free Shipping", desc: "On all orders over $150" },
  { icon: Shield, label: "2-Year Warranty", desc: "Full coverage guaranteed" },
  { icon: RotateCcw, label: "30-Day Returns", desc: "Hassle-free returns" },
  { icon: Zap, label: "Express Delivery", desc: "Same-day available" },
];

const testimonials = [
  {
    quote: "The quality of everything I've ordered from OmniMart has been exceptional. Truly a premium experience from start to finish.",
    author: "Alexandra M.",
    role: "Verified Customer",
  },
  {
    quote: "Finally an ecommerce platform that feels as premium as the products they sell. Packaging, delivery, everything is top-tier.",
    author: "James K.",
    role: "Verified Customer",
  },
  {
    quote: "I've never experienced such seamless shopping. Every detail is thought through. OmniMart is in a class of its own.",
    author: "Sarah L.",
    role: "Verified Customer",
  },
];

function MarqueeBar() {
  const items = ["New Season", "Premium Quality", "Express Delivery", "30-Day Returns", "Curated Collection", "Free Shipping Over $150"];
  const repeated = [...items, ...items];
  return (
    <div className="w-full overflow-hidden border-y border-border/30 py-4 bg-card/50">
      <div className="animate-marquee flex gap-16 whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center gap-4 font-body text-xs tracking-[0.25em] uppercase text-muted-foreground shrink-0">
            <span className="w-1 h-1 rounded-full bg-gold inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function HomeContent() {
  const { products, user, isLoggedIn } = useGlobalData();
  const [searchTerm, setSearchTerm] = useState("");
  const [semanticResults, setSemanticResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    if (selectedCategory || window.location.hash === "#collection") {
      const timer = setTimeout(() => {
        const el = document.getElementById("collection");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length > 3) {
        setIsSearching(true);
        try {
          const response = await fetch("/api/search/semantic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: searchTerm }),
          });
          const data = await response.json();
          if (data.results) {
            setSemanticResults(data.results);
          }
        } catch (error) {
          console.error("Semantic search failed:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSemanticResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const filteredProducts = (searchTerm.length > 3 && semanticResults.length > 0
    ? semanticResults
    : products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )).filter((product) => 
        !selectedCategory || product.category === selectedCategory
      );

  const { ref: heroRef, visible: heroVisible } = useReveal();
  const { ref: catRef, visible: catVisible } = useReveal();
  const { ref: prodRef, visible: prodVisible } = useReveal();
  const { ref: testimonialRef, visible: testimonialVisible } = useReveal();
  const { ref: promisesRef, visible: promisesVisible } = useReveal();

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar
        isSearch={true}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <main className="flex-grow w-full">
        {/* Hero Carousel */}
        <Carousel />

        {/* Marquee Strip */}
        <MarqueeBar />

        {/* Category Showcase */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 lg:py-32">
          <div
            ref={catRef}
            className={`transition-all duration-800 ${catVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            {/* Section Header */}
            <div className="flex items-end justify-between mb-16">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-gold" />
                  <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
                    Browse by Category
                  </span>
                </div>
                <h2 className="font-display text-5xl lg:text-6xl text-foreground">
                  Shop the<br />
                  <em className="not-italic text-muted-foreground">Collection</em>
                </h2>
              </div>
              <button
                onClick={() => {
                  router.push("/#collection");
                  document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden md:flex items-center gap-3 font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors group"
              >
                View All
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat, i) => (
                <div
                  key={cat.name}
                  onClick={() => {
                    router.push(`/?category=${cat.name}#collection`);
                    document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={cn(
                    "group relative cursor-pointer overflow-hidden border transition-all duration-500",
                    selectedCategory === cat.name ? "border-gold bg-gold/5" : "border-border/40 hover:border-gold/40"
                  )}
                  style={{
                    transitionDelay: `${i * 60}ms`,
                    opacity: catVisible ? 1 : 0,
                    transform: catVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s ${i * 0.06}s, transform 0.6s ${i * 0.06}s, border-color 0.3s`,
                  }}
                  id={`category-${cat.name.toLowerCase()}`}
                >
                  <div className="aspect-square bg-muted/20 flex flex-col justify-between p-6 group-hover:bg-muted/40 transition-colors duration-300">
                    <span className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50">
                      {cat.tag}
                    </span>
                    <div>
                      <h3 className={cn(
                        "font-display text-2xl lg:text-3xl transition-colors duration-300 mb-1",
                        selectedCategory === cat.name ? "text-gold" : "text-foreground group-hover:text-gold"
                      )}>
                        {cat.name}
                      </h3>
                      <p className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">
                        {cat.count}
                      </p>
                    </div>
                    <div className={cn(
                      "h-px bg-gold transition-all duration-400",
                      selectedCategory === cat.name ? "w-8" : "w-0 group-hover:w-8"
                    )} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section id="collection" className="max-w-[1440px] mx-auto px-6 lg:px-16 pb-24 lg:pb-32">
          <div ref={prodRef}>
            {/* Section Header */}
            <div
              className={`flex flex-col md:flex-row md:items-end justify-between mb-16 transition-all duration-700 ${
                prodVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-px bg-gold" />
                  <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
                    The Collection
                  </span>
                </div>
                <h2 className="font-display text-5xl lg:text-6xl text-foreground">
                  {isLoggedIn ? (
                    <>Curated for <em className="not-italic text-muted-foreground">{user.firstName}</em></>
                  ) : (
                    <>New <em className="not-italic text-muted-foreground">Arrivals</em></>
                  )}
                </h2>
              </div>
              <p className="font-body text-sm tracking-[0.1em] text-muted-foreground hidden md:block mt-4 md:mt-0">
                {filteredProducts.length} pieces available
              </p>
            </div>

            {isSearching ? (
              <div className="py-24 text-center">
                 <div className="inline-block w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-4" />
                 <p className="font-display text-xl text-muted-foreground font-light">
                   AI is analyzing your request...
                 </p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.productId} product={product} index={i} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <p className="font-display text-3xl text-muted-foreground font-light">
                  No pieces match your search.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Brand Promises */}
        <section className="border-y border-border/30 bg-card/30">
          <div
            ref={promisesRef}
            className="max-w-[1440px] mx-auto px-6 lg:px-16 py-16 lg:py-20 grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {promises.map((p, i) => (
              <div
                key={p.label}
                className="flex flex-col items-center text-center gap-4"
                style={{
                  opacity: promisesVisible ? 1 : 0,
                  transform: promisesVisible ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.6s ${i * 0.1}s, transform 0.6s ${i * 0.1}s`,
                }}
              >
                <div className="w-12 h-12 border border-border/50 flex items-center justify-center text-gold">
                  <p.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-display text-lg text-foreground mb-1">{p.label}</p>
                  <p className="font-body text-xs tracking-wide text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Feature Section */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 lg:py-32">
          <div
            ref={heroRef}
            className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-800 ${
              heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Text */}
            <div className="order-2 lg:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-px bg-gold" />
                <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
                  Our Promise
                </span>
              </div>
              <h2 className="font-display text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
                Precision<br />
                <em className="not-italic text-muted-foreground">Crafted</em> for<br />
                the Discerning
              </h2>
              <p className="font-body text-sm leading-[1.9] tracking-wide text-muted-foreground max-w-md mb-10">
                Every product in our collection is hand-selected by our team of experts.
                We believe in quality over quantity — each piece is chosen for its
                craftsmanship, innovation, and lasting value.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-10">
                {[
                  { num: "500+", label: "Premium Products" },
                  { num: "50K+", label: "Happy Customers" },
                  { num: "4.9", label: "Average Rating" },
                  { num: "24/7", label: "Expert Support" },
                ].map((stat) => (
                  <div key={stat.label} className="border-l border-gold/40 pl-4">
                    <p className="font-display text-3xl text-foreground">{stat.num}</p>
                    <p className="font-body text-xs tracking-[0.1em] uppercase text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-4 font-body text-xs tracking-[0.2em] uppercase text-foreground border border-foreground px-8 py-4 hover:bg-gold hover:text-white hover:border-gold transition-all duration-300 group"
                id="about-cta-btn"
              >
                Learn More
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Image collage */}
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] bg-muted/30 overflow-hidden relative">
                <NextImage
                  src="/images/hero-3.png"
                  alt="Premium products"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="aspect-square bg-muted/30 overflow-hidden flex-1 relative">
                  <NextImage
                    src="/images/hero-2.png"
                    alt="Lifestyle"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="aspect-video bg-muted/30 flex-1 overflow-hidden relative">
                  <NextImage
                    src="/images/hero-1.png"
                    alt="Collection"
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-zinc-950 text-zinc-50 py-24 lg:py-32 overflow-hidden">
          <div
            ref={testimonialRef}
            className="max-w-[1440px] mx-auto px-6 lg:px-16"
          >
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-8 h-px bg-gold" />
                <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
                  What Clients Say
                </span>
                <div className="w-8 h-px bg-gold" />
              </div>
              <h2 className="font-display text-5xl lg:text-6xl text-white">
                Trusted by<br />
                <em className="not-italic text-gold-muted">Thousands</em>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto text-center">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="transition-all duration-500"
                  style={{
                    opacity: i === activeTestimonial ? 1 : 0,
                    position: i === activeTestimonial ? "relative" : "absolute",
                    pointerEvents: i === activeTestimonial ? "auto" : "none",
                    transform: i === activeTestimonial ? "translateY(0)" : "translateY(20px)",
                  }}
                >
                  <p className="font-display text-2xl lg:text-3xl text-white/90 italic leading-relaxed mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-px bg-gold" />
                    <div>
                      <p className="font-body text-sm font-medium tracking-wide text-white">{t.author}</p>
                      <p className="font-body text-xs tracking-[0.15em] uppercase text-white/50 mt-0.5">{t.role}</p>
                    </div>
                    <div className="w-12 h-px bg-gold" />
                  </div>
                </div>
              ))}

              {/* Testimonial dots */}
              <div className="flex justify-center gap-2 mt-12">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    id={`testimonial-dot-${i}`}
                    className={`h-px transition-all duration-300 ${
                      i === activeTestimonial ? "w-10 bg-gold" : "w-4 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 lg:py-32">
          <div className="border border-border/40 p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-gold mb-4">
                Limited Time
              </p>
              <h2 className="font-display text-4xl lg:text-5xl text-foreground">
                Unlock Premium<br />
                <em className="not-italic text-muted-foreground">Member Benefits</em>
              </h2>
            </div>
            {!isLoggedIn && (
              <div className="flex flex-col sm:flex-row gap-4 shrink-0 relative z-30">
                <button
                  onClick={() => router.push("/signup")}
                  id="cta-join-btn"
                  className="inline-flex items-center justify-center gap-4 font-body text-xs tracking-[0.2em] uppercase bg-zinc-950 text-white px-10 py-4 hover:bg-gold hover:text-white transition-all duration-300 cursor-pointer"
                >
                  Join Now
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => router.push("/login")}
                  id="cta-signin-btn"
                  className="inline-flex items-center justify-center gap-4 font-body text-xs tracking-[0.2em] uppercase border border-border px-10 py-4 hover:border-foreground transition-all duration-300 cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" /></div>}>
      <HomeContent />
    </Suspense>
  );
}
