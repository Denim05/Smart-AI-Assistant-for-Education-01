"use client";
import { useEffect, useState } from "react";
import { Users, Star, TrendingUp, Zap } from "lucide-react";

// Formats a raw number into a clean display string
function formatCount(n) {
  if (!n || n === 0) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K+`;
  return `${n}+`;
}

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

  const items = [
    {
      value: loaded ? formatCount(stats?.users) : "...",
      label: "Registered Users",
      icon: <Users className="w-5 h-5 text-primary" />,
      sub: "Growing every day",
    },
    {
      value: loaded ? formatCount(stats?.resumes) : "...",
      label: "Resumes Analyzed",
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      sub: "Real AI feedback",
    },
    {
      value: loaded ? formatCount(stats?.coverLetters) : "...",
      label: "Cover Letters Generated",
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      sub: "Tailored by AI",
    },
    {
      value: "Free",
      label: "To Get Started",
      icon: <Star className="w-5 h-5 text-pink-500" />,
      sub: "No credit card needed",
    },
  ];

  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-10">
          Live platform stats
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {items.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/50 border hover:border-primary/50 transition-colors"
            >
              <div className="mb-2">{s.icon}</div>
              <h3 className="text-4xl font-black text-foreground">{s.value}</h3>
              <p className="text-sm font-medium mt-1">{s.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
