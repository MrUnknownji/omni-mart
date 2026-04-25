"use client";
import React from "react";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import NextImage from "next/image";
import { ArrowRight, Star, Award, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-zinc-950">
          <div className="absolute inset-0 opacity-40">
            <NextImage
              src="/images/hero_2.png"
              alt="About OmniMart"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
          
          <div className="relative z-10 text-center px-6">
            <div className="flex items-center justify-center gap-4 mb-6 animate-fade-up">
              <div className="w-8 h-px bg-gold" />
              <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
                Our Story
              </span>
              <div className="w-8 h-px bg-gold" />
            </div>
            <h1 className="font-display text-5xl lg:text-7xl text-white mb-6 animate-fade-up [animation-delay:200ms]">
              Invisible <em className="not-italic text-gold-muted">Excellence</em>
            </h1>
            <p className="font-body text-sm lg:text-base tracking-[0.1em] uppercase text-white/70 max-w-xl mx-auto animate-fade-up [animation-delay:400ms]">
              Curating the world&apos;s finest essentials for those who appreciate the details.
            </p>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-px bg-gold" />
                <span className="font-body text-xs tracking-[0.3em] uppercase text-gold font-medium">
                  Our Philosophy
                </span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl text-foreground mb-8 leading-tight">
                Craftsmanship is the<br />
                <em className="not-italic text-muted-foreground">Soul</em> of Luxury
              </h2>
              <p className="font-body text-sm leading-[2] tracking-wide text-muted-foreground mb-8">
                OmniMart was born from a simple observation: in an era of mass production, 
                true quality has become a rarity. We believe that the objects we surround 
                ourselves with should be more than just functional—they should be 
                inspirations.
              </p>
              <p className="font-body text-sm leading-[2] tracking-wide text-muted-foreground">
                Our team travels the globe to source pieces that represent the pinnacle 
                of innovation and design. From independent artisans to legendary 
                manufacturers, we only partner with those who share our uncompromising 
                standards for excellence.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] bg-muted relative overflow-hidden">
                <NextImage
                  src="/images/smartphone_x.png"
                  alt="Craftsmanship"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="aspect-[4/5] bg-muted relative overflow-hidden mt-12">
                <NextImage
                  src="/images/hp_spectre.png"
                  alt="Innovation"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pillars Section */}
        <section className="bg-zinc-50 dark:bg-zinc-900/50 py-24 lg:py-32">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
            <div className="text-center mb-20">
              <h2 className="font-display text-4xl lg:text-5xl text-foreground mb-4">
                The Three Pillars
              </h2>
              <div className="w-12 h-px bg-gold mx-auto" />
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  icon: Star,
                  title: "Quality",
                  desc: "Every item undergoes rigorous testing to ensure it meets our editorial standards for performance and longevity."
                },
                {
                  icon: Award,
                  title: "Authenticity",
                  desc: "We work directly with brands and authorized distributors to guarantee the provenance of every product we sell."
                },
                {
                  icon: Sparkles,
                  title: "Service",
                  desc: "Our relationship with you doesn't end at checkout. We provide lifelong support for everything in our collection."
                }
              ].map((pillar, i) => (
                <div key={pillar.title} className="text-center group">
                  <div className="w-16 h-16 border border-border flex items-center justify-center mx-auto mb-6 group-hover:border-gold transition-colors duration-300">
                    <pillar.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl text-foreground mb-4">{pillar.title}</h3>
                  <p className="font-body text-sm leading-[1.8] text-muted-foreground px-4">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-[1440px] mx-auto px-6 lg:px-16 py-24 lg:py-32">
          <div className="border border-border/40 p-12 lg:p-20 text-center">
            <h2 className="font-display text-4xl lg:text-5xl text-foreground mb-8">
              Experience the <em className="not-italic text-muted-foreground">Difference</em>
            </h2>
            <Link
              href="/#collection"
              className="inline-flex items-center gap-4 font-body text-xs tracking-[0.2em] uppercase bg-zinc-950 text-white px-10 py-4 hover:bg-gold hover:text-white transition-all duration-300"
            >
              Explore The Collection
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
