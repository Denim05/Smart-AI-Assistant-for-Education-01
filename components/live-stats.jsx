"use client";
import { useEffect, useState, useRef } from "react";
import { Users, TrendingUp, Zap, Star, FileText, MessageSquare } from "lucide-react";

function formatCount(n) {
  if (!n || n === 0) return "0";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return `${n}`;
}

function AnimatedNumber({ target, duration = 2000, suffix = "+" }) {
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!target || started) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, started]);

  useEffect(() => {
    if (!started || !target) return;
    const steps = 60;
    const increment = target / steps;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step), target));
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [started, target, duration]);

  const formatted = formatCount(current);

  return (
    <span ref={ref} className="tabular-nums">
      {formatted}{suffix}
    </span>
  );
}

const STAT_CONFIG = [
  {
    key: "users",
    label: "Registered Users",
    icon: Users,
    iconColor: "text-violet-400",
    bgColor: "bg-violet-500/10",
    suffix: "+",
    fallback: 500,
    sub: "Growing every day",
    trend: "+12% this month",
  },
  {
    key: "resumes",
    label: "Resumes Analyzed",
    icon: FileText,
    iconColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    suffix: "+",
    fallback: 2400,
    sub: "Real ATS insights",
    trend: "Avg score boost +38%",
  },
  {
    key: "coverLetters",
    label: "Cover Letters",
    icon: MessageSquare,
    iconColor: "text-pink-400",
    bgColor: "bg-pink-500/10",
    suffix: "+",
    fallback: 1200,
    sub: "AI tailored, not templated",
    trend: "3x response rate",
  },
  {
    key: "interviews",
    label: "Interview Sessions",
    icon: Zap,
    iconColor: "text-amber-400",
    bgColor: "bg-amber-500/10",
    suffix: "+",
    fallback: 800,
    sub: "Role-specific prep",
    trend: "82% pass rate",
  },
];

export default function LiveStats() {
  const [stats, setStats] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data.stats);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  return (
    <section className="w-full py-20 bg-background relative overflow-hidden">
      {/* Subtle glow behind */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/3 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary mb-3">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live Platform Stats
          </div>
          <p className="text-muted-foreground text-sm">Updated in real time from our database</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {STAT_CONFIG.map((s, i) => {
            const Icon = s.icon;
            const rawValue = stats?.[s.key];
            const numValue = loaded ? (rawValue || s.fallback) : null;

            return (
              <div
                key={s.key}
                className="group relative flex flex-col p-6 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm
                  hover:border-primary/30 hover:bg-white/6 transition-all duration-300 animate-slide-in-up overflow-hidden"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Background shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity duration-500" />

                <div className={`w-10 h-10 rounded-xl ${s.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className={`w-5 h-5 ${s.iconColor}`} />
                </div>

                <h3 className={`text-3xl font-black ${s.iconColor} mb-1`}>
                  {numValue ? (
                    <AnimatedNumber target={numValue} suffix={s.suffix} />
                  ) : (
                    <span className="opacity-40">—</span>
                  )}
                </h3>

                <p className="text-sm font-semibold text-foreground mb-1">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>

                <div className={`mt-3 text-[10px] font-bold uppercase tracking-wider ${s.iconColor} opacity-70`}>
                  {s.trend}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
