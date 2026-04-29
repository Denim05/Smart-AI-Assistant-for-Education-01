"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";

const floatingKeywords = [
  { text: "ATS Score", style: "top-[12%] left-[6%]", delay: "0s" },
  { text: "Career Roadmap", style: "top-[20%] right-[8%]", delay: "0.8s" },
  { text: "LinkedIn Optimizer", style: "top-[40%] left-[2%]", delay: "1.6s" },
  { text: "Interview Prep", style: "top-[55%] right-[4%]", delay: "2.4s" },
  { text: "Resume Builder", style: "bottom-[25%] left-[5%]", delay: "0.4s" },
  { text: "Cover Letter AI", style: "bottom-[15%] right-[6%]", delay: "1.2s" },
];

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;
    if (!imageElement) return;

    const handleScroll = () => {
      if (window.scrollY > 100) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full pt-32 md:pt-44 pb-0 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/8 blur-[80px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-pink-500/8 blur-[80px] pointer-events-none" />

      {/* Floating feature pills */}
      {floatingKeywords.map((kw) => (
        <div
          key={kw.text}
          className={`absolute hidden lg:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary backdrop-blur-sm animate-float ${kw.style}`}
          style={{ animationDelay: kw.delay }}
        >
          <Sparkles className="w-3 h-3" />
          {kw.text}
        </div>
      ))}

      <div className="relative container mx-auto px-4 text-center space-y-8">
        {/* Eyebrow */}
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className="text-sm px-4 py-1.5 border-primary/30 text-primary bg-primary/5 animate-slide-in-up"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Powered by Google Gemini AI
          </Badge>
        </div>

        {/* Headline */}
        <div className="space-y-4 animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-5xl font-black md:text-6xl lg:text-7xl xl:text-8xl gradient-title leading-[1.05] pb-4">
            The AI Career Coach
            <br />
            Built for Gen Z
          </h1>
          <p className="mx-auto max-w-[620px] text-muted-foreground text-lg md:text-xl leading-relaxed">
            ATS scoring, LinkedIn optimization, career roadmaps, and interview prep — all powered by real AI. Sign up free and start in under 2 minutes.
          </p>
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-slide-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <Link href="/dashboard">
            <Button
              size="lg"
              className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow animate-pulse-glow"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/ats-scorer">
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base font-semibold border-primary/30 hover:border-primary hover:bg-primary/5"
            >
              Score My Resume
            </Button>
          </Link>
        </div>

        {/* Honest sub-text — no fake claims */}
        <div
          className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-muted-foreground animate-slide-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <span>✅ No credit card required</span>
          <span className="hidden sm:inline text-border">|</span>
          <span>⚡ AI results in under 30 seconds</span>
          <span className="hidden sm:inline text-border">|</span>
          <span>🔒 Your data stays private</span>
        </div>

        {/* Dashboard preview image */}
        <div className="hero-image-wrapper mt-10">
          <div ref={imageRef} className="hero-image">
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-primary/20 via-transparent to-transparent blur-xl scale-105 pointer-events-none" />
              <img
                src="/banner.jpeg"
                alt="GENzAI Dashboard Preview"
                className="relative rounded-2xl shadow-2xl border border-white/10 mx-auto w-full object-cover"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center pb-8 animate-bounce">
          <ChevronDown className="w-5 h-5 text-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
