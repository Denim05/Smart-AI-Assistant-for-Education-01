"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Loader2, Linkedin, Copy, CheckCheck, Lightbulb,
  Sparkles, ArrowRight, TrendingUp, Eye, Users, RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const SAMPLE_ROLES = [
  "Senior React Developer",
  "Data Scientist",
  "Product Manager",
  "DevOps Engineer",
  "UI/UX Designer",
  "Machine Learning Engineer",
];

export default function LinkedInOptimizerPage() {
  const [currentBio, setCurrentBio] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(null);

  const handleOptimize = async () => {
    if (!targetRole.trim()) {
      toast.error("Please enter your target role.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/linkedin-optimizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentBio, targetRole, industry }),
      });
      const data = await res.json();
      if (data.success) {
        setResult(data.optimized);
        toast.success("Profile optimized! Scroll down to see results.");
      } else {
        toast.error(data.error || "Optimization failed.");
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/10 rounded-xl border border-blue-600/20">
            <Linkedin className="w-6 h-6 text-blue-600" />
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-600/30 bg-blue-600/5">
            Recruiter-Tested
          </Badge>
        </div>
        <h1 className="text-4xl font-black">LinkedIn Profile Optimizer</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          LinkedIn's algorithm decides who recruiters see. Give it exactly what it wants. Our AI crafts keyword-rich headlines and About sections that get you found — and make recruiters reach out first.
        </p>
      </div>



      {/* Input Card */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle>Tell Us About Your Goals</CardTitle>
          <CardDescription>
            The more context you give, the more precisely the AI can tailor your profile to attract the right recruiters.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Role & Industry Row */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Target Role <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="e.g. Senior Frontend Developer"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="focus:border-primary"
              />
              {/* Quick Role Suggestions */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SAMPLE_ROLES.map((r) => (
                  <button
                    key={r}
                    onClick={() => setTargetRole(r)}
                    className="text-xs px-2.5 py-1 rounded-full border hover:border-primary hover:text-primary transition-colors text-muted-foreground"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Industry / Domain</label>
              <Input
                placeholder="e.g. FinTech, HealthTech, SaaS, EdTech"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="focus:border-primary"
              />
              <p className="text-xs text-muted-foreground">
                Helps the AI use the right industry-specific keywords
              </p>
            </div>
          </div>

          {/* Current Bio */}
          <div className="space-y-2">
            <label className="text-sm font-semibold">
              Current LinkedIn About Section{" "}
              <span className="text-muted-foreground font-normal">(optional — paste if you have one)</span>
            </label>
            <Textarea
              placeholder="Paste your current LinkedIn About section here. If you don't have one, leave it blank and we'll write it from scratch based on your target role."
              className="min-h-[140px] resize-none focus:border-primary"
              value={currentBio}
              onChange={(e) => setCurrentBio(e.target.value)}
            />
          </div>

          <Button
            onClick={handleOptimize}
            disabled={loading}
            className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20"
            size="lg"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin mr-2" />Crafting your recruiter magnet...</>
            ) : (
              <><Sparkles className="w-5 h-5 mr-2" />Optimize My LinkedIn Profile <ArrowRight className="ml-2 w-4 h-4" /></>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Optimized Profile</h2>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => { setResult(null); setTargetRole(""); setCurrentBio(""); setIndustry(""); }}
            >
              <RefreshCw className="w-4 h-4" />
              Start Over
            </Button>
          </div>

          {/* Optimized Headlines */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                ✨ Optimized Headlines
                <Badge variant="secondary" className="ml-auto text-xs">Pick your favourite</Badge>
              </CardTitle>
              <CardDescription>
                Each headline is under 220 characters. Copy the one that resonates most and paste it directly into your LinkedIn profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {result.optimizedHeadlines?.map((h, i) => (
                <div
                  key={i}
                  className="group flex items-start justify-between gap-4 p-4 rounded-xl border hover:border-primary/60 hover:bg-primary/5 transition-all cursor-pointer"
                  onClick={() => copyToClipboard(h, `h${i}`)}
                >
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm flex-1 leading-relaxed">{h}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="shrink-0 opacity-50 group-hover:opacity-100">
                    {copied === `h${i}` ? (
                      <CheckCheck className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Optimized About Section */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">📝 Optimized About Section</CardTitle>
                  <CardDescription className="mt-1">
                    Keyword-rich, engaging, and written to appeal to both recruiters and LinkedIn's algorithm.
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="shrink-0 gap-2"
                  onClick={() => copyToClipboard(result.optimizedAbout, "about")}
                >
                  {copied === "about" ? (
                    <><CheckCheck className="w-4 h-4 text-green-500" />Copied!</>
                  ) : (
                    <><Copy className="w-4 h-4" />Copy</>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-xl bg-muted/40 border text-sm leading-relaxed whitespace-pre-wrap">
                {result.optimizedAbout}
              </div>
            </CardContent>
          </Card>

          {/* Keywords & Tips */}
          <div className="grid md:grid-cols-2 gap-5">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">🔑 Keywords to Add to Your Profile</CardTitle>
                <CardDescription>Add these to your headline, about, and experience sections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.keywordsToAdd?.map((k, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                      onClick={() => copyToClipboard(k, `kw${i}`)}
                    >
                      {copied === `kw${i}` ? <CheckCheck className="w-3 h-3 mr-1 text-green-500" /> : null}
                      {k}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Lightbulb className="w-4 h-4 text-yellow-500" />
                  Actionable Profile Tips
                </CardTitle>
                <CardDescription>Quick wins beyond just the text</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {result.profileTips?.map((t, i) => (
                    <li key={i} className="text-sm flex items-start gap-2.5">
                      <span className="text-primary font-bold shrink-0 mt-0.5">→</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
