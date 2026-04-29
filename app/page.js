import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, CheckCircle2, Star, Award,
  UserCheck, ScanSearch, Rocket, TrendingUp,
  BrainCircuit, Briefcase, LineChart, ScrollText,
  Target, Linkedin, Map, Trophy,
} from "lucide-react";
import HeroSection from "@/components/hero";
import LiveStats from "@/components/live-stats";
import {
  Accordion, AccordionContent,
  AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

// Map string names → Lucide components
const ICONS = {
  UserCheck, ScanSearch, Rocket, TrendingUp,
  BrainCircuit, Briefcase, LineChart, ScrollText,
  Target, Linkedin, Map, Trophy,
};

function DynIcon({ name, className }) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon className={className} />;
}

const trustBadges = [
  "Real Gemini AI — Not a GPT Wrapper",
  "ATS Algorithm Tested",
  "SOC 2 Compliant Auth (Clerk)",
  "No Data Sold — Ever",
  "Live Job Market Salary Data",
];

export default function LandingPage() {
  return (
    <>
      <div className="grid-background" />

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Trust Bar ── */}
      <section className="w-full py-4 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {trustBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Stats (real DB counts) ── */}
      <LiveStats />

      {/* ── Features ── */}
      <section className="w-full py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Everything You Need
            </Badge>
            <h2 className="text-4xl font-black tracking-tight mb-4">
              One platform. Every career tool.
            </h2>
            <p className="text-muted-foreground text-lg">
              ATS scoring, roadmaps, LinkedIn optimizer, interview prep, resume builder, cover letters, and a live job board — all powered by real AI.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href || "#"}>
                <Card className="relative h-full border hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group cursor-pointer">
                  {feature.badge && (
                    <div className="absolute -top-2.5 left-4">
                      <Badge className="text-xs bg-primary text-primary-foreground">
                        {feature.badge}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="pt-6 text-left flex flex-col">
                    <DynIcon name={feature.icon} className="w-10 h-10 mb-4 text-primary" />
                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              How It Works
            </Badge>
            <h2 className="text-4xl font-black tracking-tight mb-4">
              From signup to offer letter in 4 steps
            </h2>
            <p className="text-muted-foreground text-lg">
              No fluff. No guessing. A clear, AI-powered process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <DynIcon name={item.icon} className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-black flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-xl">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="w-full py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              User Experiences
            </Badge>
            <h2 className="text-4xl font-black tracking-tight mb-4">
              What users have achieved
            </h2>
            <p className="text-muted-foreground text-lg">
              Real results shared by people who used GENzAI's tools.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonial.map((t, index) => (
              <Card key={index} className="bg-background hover:border-primary/40 hover:shadow-md transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    {t.result && (
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-xs font-bold text-green-500 uppercase tracking-wide">
                          {t.result}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 pt-2 border-t">
                      <img
                        src={t.image}
                        alt={t.author}
                        className="w-10 h-10 rounded-full border-2 border-primary/20 bg-muted"
                      />
                      <div>
                        <p className="font-semibold text-sm">{t.author}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                        <p className="text-xs text-muted-foreground">{t.location}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              FAQ
            </Badge>
            <h2 className="text-4xl font-black tracking-tight mb-4">
              Honest answers to real questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border rounded-xl px-2 data-[state=open]:border-primary/50"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl gradient p-12 md:p-16 text-center">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            <div className="relative flex flex-col items-center space-y-6">
              <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-1.5">
                🚀 Start Free — No Card Needed
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight max-w-2xl">
                Your next career move starts here.
              </h2>
              <p className="text-white/80 text-lg max-w-xl">
                Real AI. Real tools. Sign up free and start with any tool in under 2 minutes.
              </p>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-bold text-base h-12 px-8 shadow-lg"
                >
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <p className="text-white/60 text-sm">Powered by Google Gemini AI · No credit card required</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
