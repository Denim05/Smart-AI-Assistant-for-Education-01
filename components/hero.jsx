"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowRight, Sparkles, ChevronDown, Zap,
  Target, BrainCircuit, Map, Linkedin,
  FileText, Briefcase, Trophy, TrendingUp,
} from "lucide-react";

/* ── Typewriter hook ──────────────────────────────────── */
const ROLES = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "UI/UX Designer",
  "DevOps Engineer",
  "Business Analyst",
];

function useTypewriter(words, speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState("typing");

  useEffect(() => {
    let t;
    const word = words[wordIdx];
    if (phase === "typing") {
      if (displayed.length < word.length) {
        t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), speed);
      } else {
        t = setTimeout(() => setPhase("pausing"), pause);
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("deleting"), 200);
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2);
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [displayed, phase, wordIdx, words, speed, pause]);

  return displayed;
}

/* ── Floating feature pills ──────────────────────────── */
const floatingPills = [
  { text: "ATS Score", icon: Target, style: "top-[10%] left-[4%]", delay: "0s", color: "text-violet-400" },
  { text: "Career Roadmap", icon: Map, style: "top-[18%] right-[5%]", delay: "0.9s", color: "text-purple-400" },
  { text: "LinkedIn Optimizer", icon: Linkedin, style: "top-[42%] left-[1%]", delay: "1.8s", color: "text-blue-400" },
  { text: "Interview Prep", icon: BrainCircuit, style: "top-[58%] right-[3%]", delay: "2.7s", color: "text-pink-400" },
  { text: "Resume Builder", icon: FileText, style: "bottom-[28%] left-[4%]", delay: "0.5s", color: "text-emerald-400" },
  { text: "Cover Letter AI", icon: Sparkles, style: "bottom-[14%] right-[5%]", delay: "1.4s", color: "text-amber-400" },
];

/* ── Live Results Ticker ──────────────────────────────── */
const tickerItems = [
  { label: "ATS Score", value: "38% → 84%", icon: "🎯" },
  { label: "LinkedIn Views", value: "+1,400%", icon: "📈" },
  { label: "Interview Rate", value: "3x Higher", icon: "🚀" },
  { label: "Offer Accepted", value: "₹3.5L Bonus", icon: "🏆" },
  { label: "Resumes Analyzed", value: "10K+", icon: "📄" },
  { label: "Cover Letters", value: "3/3 Responses", icon: "✉️" },
  { label: "Career Shifts", value: "Non-CS → Dev", icon: "⚡" },
  { label: "Salary Negotiated", value: "+40%", icon: "💰" },
];

/* ── ATS Score Ring ──────────────────────────────────── */
function ScoreRing({ score = 84, size = 80 }) {
  const r = 32;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <svg width={size} height={size} className="score-ring -rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="6"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#sg)" strokeWidth="6"
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}/>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6"/>
          <stop offset="100%" stopColor="#ec4899"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Orbital Tool Node ───────────────────────────────── */
const ORBIT_TOOLS = [
  { icon: Target,      label: "ATS",       color: "#8b5cf6", bg: "rgba(139,92,246,0.15)",  angle: 0   },
  { icon: FileText,    label: "Resume",    color: "#10b981", bg: "rgba(16,185,129,0.15)",   angle: 45  },
  { icon: Linkedin,    label: "LinkedIn",  color: "#3b82f6", bg: "rgba(59,130,246,0.15)",   angle: 90  },
  { icon: BrainCircuit,label: "Interview", color: "#f59e0b", bg: "rgba(245,158,11,0.15)",   angle: 135 },
  { icon: Map,         label: "Roadmap",   color: "#ec4899", bg: "rgba(236,72,153,0.15)",   angle: 180 },
  { icon: Trophy,      label: "Cover",     color: "#a78bfa", bg: "rgba(167,139,250,0.15)",  angle: 225 },
  { icon: TrendingUp,  label: "Salary",    color: "#34d399", bg: "rgba(52,211,153,0.15)",   angle: 270 },
  { icon: Briefcase,   label: "Jobs",      color: "#fb7185", bg: "rgba(251,113,133,0.15)",  angle: 315 },
];

/* ── Terminal Lines ──────────────────────────────────── */
const TERMINAL_LINES = [
  { text: "$ genzai analyze --resume arjun_mehta.pdf", color: "#a78bfa", delay: 0 },
  { text: "  ✓ Parsing document structure...", color: "#10b981", delay: 600 },
  { text: "  ✓ Extracting 47 keywords...", color: "#10b981", delay: 1100 },
  { text: "  ⚡ Running ATS compatibility check...", color: "#f59e0b", delay: 1700 },
  { text: "  ✓ Comparing against job description...", color: "#10b981", delay: 2400 },
  { text: "", color: "", delay: 2900 },
  { text: "  ── ATS SCORE: 84/100 ──────────────────", color: "#8b5cf6", delay: 3000 },
  { text: "  Keywords Match:    ████████░░  84%", color: "#c4b5fd", delay: 3400 },
  { text: "  Formatting:        █████████░  91%", color: "#c4b5fd", delay: 3700 },
  { text: "  Experience Fit:    ███████░░░  76%", color: "#c4b5fd", delay: 4000 },
  { text: "", color: "", delay: 4300 },
  { text: "  ⚠  Missing: GraphQL, Docker, CI/CD", color: "#fbbf24", delay: 4400 },
  { text: "  → Suggested rewrites: 12 bullet points", color: "#6ee7b7", delay: 4900 },
  { text: "  → Salary range for this role: ₹16–22L", color: "#6ee7b7", delay: 5400 },
  { text: "", color: "", delay: 5800 },
  { text: "  ✅ Report ready. Opening GENzAI...", color: "#10b981", delay: 6000 },
];

function AnimatedTerminal({ active }) {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    if (!active) return;
    setVisibleLines([]);
    const timers = TERMINAL_LINES.map((line, i) =>
      setTimeout(() => setVisibleLines((prev) => [...prev, i]), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    <div className="rounded-xl border border-white/10 bg-[#080a10] overflow-hidden shadow-2xl font-mono text-[11px] leading-relaxed h-full flex flex-col">
      {/* Terminal bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8 bg-[#05060a] shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"/>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"/>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"/>
        </div>
        <span className="text-muted-foreground/40 text-[10px] ml-2">genzai — AI Career Analysis</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
          <span className="text-[9px] text-green-400 font-bold">LIVE</span>
        </div>
      </div>
      {/* Terminal content */}
      <div className="p-4 space-y-0.5 overflow-hidden flex-1">
        {TERMINAL_LINES.map((line, i) => (
          <div
            key={i}
            className="transition-all duration-300"
            style={{
              opacity: visibleLines.includes(i) ? 1 : 0,
              transform: visibleLines.includes(i) ? "translateY(0)" : "translateY(4px)",
              color: line.color || "transparent",
              minHeight: line.text === "" ? "10px" : "auto",
            }}
          >
            {line.text}
          </div>
        ))}
        {/* blinking cursor */}
        {visibleLines.length > 0 && visibleLines.length < TERMINAL_LINES.length && (
          <span className="inline-block w-2 h-3.5 bg-violet-400 align-middle animate-pulse ml-0.5"/>
        )}
      </div>
    </div>
  );
}

/* ── Orbital Visual ──────────────────────────────────── */
function OrbitalUniverse({ active }) {
  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[300px]">
      {/* Outer rotating ring */}
      <div
        className="absolute rounded-full border border-dashed border-primary/15"
        style={{ width: 280, height: 280, animation: "spin-slow 30s linear infinite" }}
      />
      {/* Inner rotating ring */}
      <div
        className="absolute rounded-full border border-dashed border-pink-500/10"
        style={{ width: 190, height: 190, animation: "spin-slow 20s linear infinite reverse" }}
      />

      {/* Orbiting tool nodes */}
      {ORBIT_TOOLS.map((tool, i) => {
        const Icon = tool.icon;
        const rad = (tool.angle * Math.PI) / 180;
        const r = 140;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        return (
          <div
            key={tool.label}
            className="absolute flex flex-col items-center gap-1 animate-slide-in-up"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              animationDelay: `${0.5 + i * 0.1}s`,
              opacity: active ? 1 : 0,
              transition: `opacity 0.5s ease ${0.5 + i * 0.1}s`,
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-lg"
              style={{
                background: tool.bg,
                borderColor: tool.color + "40",
                boxShadow: `0 0 16px ${tool.color}30`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: tool.color }}/>
            </div>
            <span className="text-[9px] font-bold" style={{ color: tool.color }}>{tool.label}</span>
          </div>
        );
      })}

      {/* Center "You" orb */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Pulse rings */}
        <div className="absolute w-24 h-24 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: "2.5s" }}/>
        <div className="absolute w-20 h-20 rounded-full border border-primary/15 animate-ping" style={{ animationDuration: "3s", animationDelay: "0.5s" }}/>
        {/* Core orb */}
        <div className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(139,92,246,0.1) 60%, transparent 100%)",
            border: "1px solid rgba(139,92,246,0.5)",
            boxShadow: "0 0 40px rgba(139,92,246,0.4), 0 0 80px rgba(139,92,246,0.15)",
          }}
        >
          <Sparkles className="w-7 h-7 text-primary"/>
        </div>
        <span className="mt-2 text-[10px] font-black uppercase tracking-widest text-primary">You</span>
      </div>

      {/* Floating score card */}
      <div
        className="absolute top-0 right-0 flex flex-col items-center gap-1.5 glass-card rounded-xl p-3 shadow-xl"
        style={{ opacity: active ? 1 : 0, transition: "opacity 0.6s ease 1s" }}
      >
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">ATS Score</span>
        <div className="relative flex items-center justify-center">
          <ScoreRing score={84} size={60}/>
          <span className="absolute text-sm font-black gradient-title-alt">84</span>
        </div>
        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[9px] px-1.5 py-0.5">
          ✓ Ready
        </Badge>
      </div>

      {/* Floating salary card */}
      <div
        className="absolute bottom-2 left-0 glass-card rounded-xl p-3 shadow-xl min-w-[120px]"
        style={{ opacity: active ? 1 : 0, transition: "opacity 0.6s ease 1.3s" }}
      >
        <p className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-wider">Market Salary</p>
        <p className="text-base font-black text-emerald-400 mt-0.5">₹18L</p>
        <p className="text-[9px] text-muted-foreground/50">Full Stack · BLR</p>
        <div className="flex items-end gap-0.5 mt-2 h-5">
          {[40, 60, 80, 100, 85, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm"
              style={{
                height: `${h}%`,
                background: i === 3 ? "#10b981" : "rgba(16,185,129,0.25)",
                transition: `height 0.5s ease ${1.3 + i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main Hero ───────────────────────────────────────── */
const HeroSection = () => {
  const imageRef = useRef(null);
  const typedRole = useTypewriter(ROLES);
  const [mounted, setMounted] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [terminalActive, setTerminalActive] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t1 = setTimeout(() => setShowScore(true), 1000);
    const t2 = setTimeout(() => setTerminalActive(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;
    const onScroll = () => el.classList.toggle("scrolled", window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full pt-28 md:pt-40 pb-0 overflow-hidden min-h-screen flex flex-col">

      {/* Orbs */}
      <div className="orb-1 top-[-10%] left-[-5%] pointer-events-none"/>
      <div className="orb-2 top-[20%] right-[-10%] pointer-events-none"/>
      <div className="orb-3 bottom-[10%] left-[30%] pointer-events-none"/>

      {/* Floating pills (desktop) */}
      {floatingPills.map((pill) => {
        const Icon = pill.icon;
        return (
          <div key={pill.text}
            className={`absolute hidden lg:flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-full
              border border-white/10 bg-white/5 backdrop-blur-lg shadow-lg
              ${pill.color} animate-float ${pill.style} z-10`}
            style={{ animationDelay: pill.delay }}
          >
            <Icon className="w-3.5 h-3.5"/>
            {pill.text}
          </div>
        );
      })}

      {/* Main content */}
      <div className="relative container mx-auto px-4 text-center flex flex-col items-center gap-7 flex-1">

        {/* Eyebrow */}
        <div className="animate-slide-in-up">
          <Badge variant="outline"
            className="text-sm px-4 py-1.5 border-primary/30 text-primary bg-primary/8 backdrop-blur-sm badge-glow gap-2">
            <Zap className="w-3.5 h-3.5 fill-primary"/>
            Powered by Google Gemini AI · Built for Gen Z
          </Badge>
        </div>

        {/* Headline */}
        <div className="space-y-3 animate-slide-in-up" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-5xl font-black md:text-7xl lg:text-8xl leading-[1.02] pb-2">
            <span className="gradient-title block">Land Your Dream Job</span>
            <span className="text-foreground text-4xl md:text-5xl lg:text-6xl font-bold block mt-2">
              as a{" "}
              <span className="gradient-title-alt">
                {mounted ? typedRole : "Software Engineer"}
              </span>
              <span className="typing-cursor"/>
            </span>
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-lg md:text-xl leading-relaxed font-normal">
            ATS scoring, LinkedIn optimization, career roadmaps, and AI interview prep —
            8 powerful tools in one platform. No fluff. Real results.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-slide-in-up"
          style={{ animationDelay: "0.2s" }}>
          <Link href="/dashboard">
            <Button size="lg" id="hero-cta-primary"
              className="h-13 px-8 text-base font-bold shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all animate-pulse-glow gap-2 group">
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform"/>
              Start Free — No Card Needed
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform"/>
            </Button>
          </Link>
          <Link href="/ats-scorer">
            <Button size="lg" variant="outline" id="hero-cta-ats"
              className="h-13 px-8 text-base font-semibold border-primary/30 hover:border-primary hover:bg-primary/8 gap-2 backdrop-blur-sm">
              <Target className="w-4 h-4"/>
              Score My Resume Free
            </Button>
          </Link>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-muted-foreground animate-slide-in-up"
          style={{ animationDelay: "0.3s" }}>
          {[
            { icon: "✅", text: "No credit card required" },
            { icon: "⚡", text: "Results in under 30 seconds" },
            { icon: "🔒", text: "Your data stays private" },
            { icon: "🤖", text: "Real Gemini AI — not a wrapper" },
          ].map((item) => (
            <span key={item.text} className="flex items-center gap-1.5">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </span>
          ))}
        </div>

        {/* ── HERO VISUAL: Terminal + Orbital ── */}
        <div className="hero-image-wrapper w-full mt-6 animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
          <div ref={imageRef} className="hero-image">
            <div className="relative mx-auto max-w-5xl">
              {/* Outer glow */}
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-b from-primary/20 via-pink-500/10 to-transparent blur-3xl pointer-events-none"/>

              <div className="relative grid grid-cols-1 md:grid-cols-5 gap-4 items-stretch">

                {/* LEFT — AI Terminal (3 cols) */}
                <div className="md:col-span-3 rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(139,92,246,0.25)]" style={{ minHeight: 340 }}>
                  <AnimatedTerminal active={terminalActive}/>
                </div>

                {/* RIGHT — Orbital Universe (2 cols) */}
                <div className="md:col-span-2 rounded-2xl border border-white/10 bg-[#080a10]/80 backdrop-blur-md overflow-hidden shadow-[0_30px_80px_rgba(236,72,153,0.15)] flex items-center justify-center p-4" style={{ minHeight: 340 }}>
                  <OrbitalUniverse active={showScore}/>
                </div>
              </div>

              {/* Bottom connecting bar */}
              <div className="mt-3 rounded-xl border border-white/8 bg-white/3 backdrop-blur-sm px-4 py-2.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0"/>
                  <span className="text-[11px] text-muted-foreground/70 font-mono">Gemini AI analysis complete · 847ms</span>
                </div>
                <div className="flex items-center gap-3">
                  {[
                    { label: "Score", val: "84%", color: "#8b5cf6" },
                    { label: "Match", val: "91%", color: "#10b981" },
                    { label: "Rank", val: "Top 8%", color: "#f59e0b" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-1.5">
                      <span className="text-[9px] text-muted-foreground/50 uppercase tracking-wider font-bold">{s.label}</span>
                      <span className="text-[11px] font-black" style={{ color: s.color }}>{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="w-full mt-10 py-4 border-t border-white/5 bg-black/20 backdrop-blur-sm ticker-wrapper">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-8 shrink-0 text-sm">
              <span className="text-lg">{item.icon}</span>
              <span className="text-muted-foreground">{item.label}:</span>
              <span className="font-bold text-primary">{item.value}</span>
              <span className="text-border mx-4">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="flex justify-center py-6 animate-bounce">
        <ChevronDown className="w-5 h-5 text-muted-foreground/40"/>
      </div>
    </section>
  );
};

export default HeroSection;
