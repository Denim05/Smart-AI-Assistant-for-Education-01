import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, CheckCircle2, Star, Award,
  UserCheck, ScanSearch, Rocket, TrendingUp,
  BrainCircuit, Briefcase, LineChart, ScrollText,
  Target, Linkedin, Map, Trophy, X, Check,
  Zap, Shield, Globe, Clock,
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
  { text: "Real Gemini AI — Not a GPT Wrapper", icon: Zap },
  { text: "ATS Algorithm Tested", icon: Target },
  { text: "SOC 2 Compliant Auth (Clerk)", icon: Shield },
  { text: "No Data Sold — Ever", icon: Shield },
  { text: "Live Job Market Salary Data", icon: Globe },
  { text: "AI Results in Under 30 Seconds", icon: Clock },
];

// Comparison table data
const comparisonRows = [
  { feature: "ATS Resume Scoring", genzai: true, others: false },
  { feature: "Typewriter Career Coaching", genzai: true, others: false },
  { feature: "LinkedIn AI Optimizer", genzai: true, others: false },
  { feature: "Month-by-Month Roadmap", genzai: true, others: false },
  { feature: "Live Salary Insights", genzai: true, others: "partial" },
  { feature: "AI Interview Questions", genzai: true, others: false },
  { feature: "Live Job Board", genzai: true, others: "partial" },
  { feature: "AI Cover Letter", genzai: true, others: false },
  { feature: "100% Free to Start", genzai: true, others: false },
];

// Before/After stories
const beforeAfter = [
  {
    before: { label: "ATS Score", value: "34%", desc: "Rejected by every filter" },
    after: { label: "ATS Score", value: "89%", desc: "First interview in 3 days" },
    name: "Arjun M.", role: "SWE @ Startup", color: "#8b5cf6",
  },
  {
    before: { label: "LinkedIn Views", value: "9/wk", desc: "No recruiter reach-outs" },
    after: { label: "LinkedIn Views", value: "140+/wk", desc: "3 recruiter DMs that week" },
    name: "Rohan S.", role: "PM @ Funded Co", color: "#ec4899",
  },
  {
    before: { label: "Salary Offer", value: "₹12L", desc: "Accepted first number" },
    after: { label: "Salary Offer", value: "₹15.5L", desc: "Negotiated with market data" },
    name: "Kavya R.", role: "DevOps @ MNC", color: "#3b82f6",
  },
];

export default function LandingPage() {
  return (
    <>
      <div className="grid-background" />

      {/* Hero */}
      <HeroSection />

      {/* Trust Bar */}
      <section className="w-full py-5 border-y border-white/5 bg-black/10 backdrop-blur-sm overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustBadges.map(({ text, icon: Icon }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <LiveStats />

      {/* Features Grid */}
      <section className="w-full py-24 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
              Everything You Need
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              One platform.{" "}
              <span className="gradient-title">Every career tool.</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              ATS scoring, roadmaps, LinkedIn optimizer, interview prep, resume builder, cover letters,
              and a live job board — all powered by real AI.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href || "#"}>
                <div className={`gradient-border h-full group cursor-pointer
                  transition-all duration-300 animate-slide-in-up`}
                  style={{ animationDelay: `${index * 0.07}s` }}
                >
                  <Card className="relative h-full border-0 bg-card feature-card-gradient group-hover:bg-card/80 transition-all duration-300">
                    {feature.badge && (
                      <div className="absolute -top-2.5 left-4 z-10">
                        <Badge className="text-xs bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                          {feature.badge}
                        </Badge>
                      </div>
                    )}
                    <CardContent className="pt-6 text-left flex flex-col h-full">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <DynIcon name={feature.icon} className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {feature.description}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-xs text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Try it free <ArrowRight className="w-3 h-3" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="w-full py-24 bg-background relative overflow-hidden">
        <div className="orb-2 opacity-30 top-0 right-0 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
              Real Results
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              The{" "}
              <span className="gradient-title">before & after</span>
              {" "}is real
            </h2>
            <p className="text-muted-foreground text-lg">
              Numbers from actual users — not made up marketing stats.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {beforeAfter.map((item, i) => (
              <div
                key={i}
                className="glass-card-hover rounded-2xl p-6 animate-slide-in-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="flex gap-4 mb-5">
                  {/* Before */}
                  <div className="flex-1 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-1">Before</p>
                    <p className="text-2xl font-black text-red-400">{item.before.value}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{item.before.desc}</p>
                  </div>
                  {/* Arrow */}
                  <div className="flex items-center">
                    <ArrowRight className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  {/* After */}
                  <div
                    className="flex-1 rounded-xl p-3 text-center border"
                    style={{
                      background: `${item.color}15`,
                      borderColor: `${item.color}30`,
                    }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: item.color }}>After</p>
                    <p className="text-2xl font-black" style={{ color: item.color }}>{item.after.value}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{item.after.desc}</p>
                  </div>
                </div>
                <div className="border-t border-white/5 pt-4 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black text-white"
                    style={{ background: item.color }}>
                    {item.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-24 bg-muted/20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
              How It Works
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              From signup to{" "}
              <span className="gradient-title">offer letter</span>
              {" "}in 4 steps
            </h2>
          </div>
          <div className="relative max-w-5xl mx-auto">
            {/* Connector lines (desktop) */}
            <div className="hidden lg:flex absolute top-8 left-[12%] right-[12%] items-center pointer-events-none">
              {[0, 1, 2].map((i) => (
                <div key={i} className="step-connector flex-1 mx-6" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center space-y-4 animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.12}s` }}
                >
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center
                      hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 group">
                      <DynIcon name={item.icon} className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-primary text-primary-foreground
                      text-xs font-black flex items-center justify-center shadow-lg shadow-primary/40 animate-pulse-ring">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="w-full py-24 bg-background relative overflow-hidden">
        <div className="orb-1 opacity-20 bottom-0 left-0 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
              Why GENzAI
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              <span className="gradient-title">GENzAI vs.</span> everyone else
            </h2>
            <p className="text-muted-foreground text-lg">
              One platform. Eight tools. Zero fluff. No paid tier needed to start.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="glass-card rounded-2xl overflow-x-auto">
              <table className="w-full comparison-table">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left py-4 px-6 text-sm font-bold text-muted-foreground">Feature</th>
                    <th className="py-4 px-6 text-sm font-black text-primary text-center">
                      <span className="gradient-title text-base">GENzAI</span>
                    </th>
                    <th className="py-4 px-6 text-sm font-bold text-muted-foreground text-center">Others</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0 transition-colors">
                      <td className="py-3.5 px-6 text-sm font-medium">{row.feature}</td>
                      <td className="py-3.5 px-6 text-center">
                        <Check className="w-5 h-5 text-green-400 mx-auto comparison-check" />
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        {row.others === true ? (
                          <Check className="w-5 h-5 text-green-400 mx-auto" />
                        ) : row.others === "partial" ? (
                          <span className="text-amber-400 text-sm font-semibold">Partial</span>
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-8">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 animate-pulse-glow font-bold">
                  Start Using GENzAI Free <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-24 bg-muted/20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
              User Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              What users have{" "}
              <span className="gradient-title">achieved</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonial.map((t, index) => (
              <div
                key={index}
                className="glass-card-hover rounded-2xl p-6 animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col space-y-4 h-full">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  {t.result && (
                    <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-green-500/10 border border-green-500/20 w-fit">
                      <Award className="w-4 h-4 text-green-400 shrink-0" />
                      <span className="text-xs font-bold text-green-400 uppercase tracking-wide">
                        {t.result}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                    <img
                      src={t.image}
                      alt={t.author}
                      className="w-10 h-10 rounded-full border-2 border-primary/20 bg-muted"
                    />
                    <div>
                      <p className="font-semibold text-sm">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.role} · {t.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-primary/5">
              FAQ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
              Honest answers to{" "}
              <span className="gradient-title">real questions</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-white/8 rounded-xl px-2 data-[state=open]:border-primary/40 data-[state=open]:bg-primary/3 transition-all"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-5 hover:text-primary transition-colors">
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

      {/* CTA */}
      <section className="w-full py-28 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl cta-gradient p-12 md:p-20 text-center noise-overlay">
            <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-2xl" />

            <div className="relative flex flex-col items-center space-y-7">
              <Badge className="bg-white/20 text-white border-white/30 text-sm px-5 py-2 backdrop-blur-sm">
                🚀 Start Free — No Card Needed
              </Badge>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight max-w-2xl leading-tight">
                Your next career move starts <span className="text-white/80">right here.</span>
              </h2>
              <p className="text-white/75 text-lg max-w-xl">
                Real AI. Real tools. 8 powerful features. Sign up free and start with any tool in under 2 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    id="bottom-cta-primary"
                    className="bg-white text-purple-700 hover:bg-white/90 font-black text-base h-13 px-10 shadow-2xl gap-2"
                  >
                    Get Started Free <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/ats-scorer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm h-13 px-8"
                  >
                    Try ATS Scorer
                  </Button>
                </Link>
              </div>
              <p className="text-white/50 text-sm">
                Powered by Google Gemini AI · Built for Gen Z in India 🇮🇳
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
