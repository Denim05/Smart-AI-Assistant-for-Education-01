"use client";
import { useState } from "react";
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Loader2, Map, ChevronRight, BookOpen, TrendingUp,
  IndianRupee, Sparkles, ArrowRight, RefreshCw, Target,
  Lightbulb, CheckCircle2, Clock,
} from "lucide-react";
import { toast } from "sonner";

const PHASE_COLORS = [
  { bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500/30", light: "bg-blue-500/10" },
  { bg: "bg-purple-500", text: "text-purple-500", border: "border-purple-500/30", light: "bg-purple-500/10" },
  { bg: "bg-pink-500", text: "text-pink-500", border: "border-pink-500/30", light: "bg-pink-500/10" },
  { bg: "bg-orange-500", text: "text-orange-500", border: "border-orange-500/30", light: "bg-orange-500/10" },
  { bg: "bg-green-500", text: "text-green-500", border: "border-green-500/30", light: "bg-green-500/10" },
  { bg: "bg-teal-500", text: "text-teal-500", border: "border-teal-500/30", light: "bg-teal-500/10" },
];

const EXAMPLE_PATHS = [
  { from: "CS Student", to: "Full Stack Developer at Startup", time: "12" },
  { from: "Non-CS Graduate", to: "Data Scientist", time: "18" },
  { from: "Junior Developer", to: "Senior SDE at FAANG", time: "24" },
  { from: "Fresher", to: "DevOps / Cloud Engineer", time: "12" },
  { from: "Developer", to: "Product Manager", time: "12" },
];

export default function CareerRoadmapPage() {
  const [form, setForm] = useState({ currentRole: "", targetRole: "", currentSkills: "", timeframe: "12" });
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  const handleGenerate = async () => {
    if (!form.targetRole.trim()) {
      toast.error("Please enter your target role.");
      return;
    }
    setLoading(true);
    setRoadmap(null);
    try {
      const res = await fetch("/api/career-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, timeframe: `${form.timeframe} months` }),
      });
      const data = await res.json();
      if (data.success) {
        setRoadmap(data.roadmap);
        toast.success("Your roadmap is ready!");
      } else {
        toast.error(data.error || "Failed to generate roadmap.");
      }
    } catch {
      toast.error("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  const fillExample = (ex) => {
    setForm({ currentRole: ex.from, targetRole: ex.to, currentSkills: "", timeframe: ex.time });
    toast.info("Example loaded — click Generate to create your roadmap");
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
            <Map className="w-6 h-6 text-primary" />
          </div>
          <Badge variant="outline" className="text-primary border-primary/30">
            AI-Generated
          </Badge>
        </div>
        <h1 className="text-4xl font-black">Career Roadmap Generator</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          No more Googling "how to become a developer." Get a precise, month-by-month action plan with the exact skills to learn, projects to build, and resources to use — tailored entirely to you.
        </p>
      </div>

      {/* Input Form */}
      {!roadmap && (
        <div className="space-y-6">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Define Your Career Goal
              </CardTitle>
              <CardDescription>
                Be as specific as possible for the most accurate roadmap
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Where are you now?</label>
                  <Input
                    placeholder="e.g. CS Student, Fresher, Junior Developer"
                    value={form.currentRole}
                    onChange={(e) => setForm({ ...form, currentRole: e.target.value })}
                    className="focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">
                    Where do you want to be? <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Senior Full Stack Engineer at FAANG"
                    value={form.targetRole}
                    onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
                    className="focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Skills you already have</label>
                  <Input
                    placeholder="e.g. HTML, CSS, JavaScript, React basics"
                    value={form.currentSkills}
                    onChange={(e) => setForm({ ...form, currentSkills: e.target.value })}
                    className="focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Your Timeframe
                  </label>
                  <Select value={form.timeframe} onValueChange={(v) => setForm({ ...form, timeframe: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 months — Intensive pace</SelectItem>
                      <SelectItem value="12">12 months — Balanced pace</SelectItem>
                      <SelectItem value="18">18 months — Comfortable pace</SelectItem>
                      <SelectItem value="24">24 months — Part-time learning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20"
                size="lg"
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 animate-spin mr-2" />Building your roadmap — this takes 10–15 seconds...</>
                ) : (
                  <><Sparkles className="w-5 h-5 mr-2" />Generate My Roadmap <ArrowRight className="ml-2 w-4 h-4" /></>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Quick Examples */}
          <div className="space-y-3">
            <p className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Try a popular career path:
            </p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PATHS.map((ex) => (
                <button
                  key={ex.to}
                  onClick={() => fillExample(ex)}
                  className="text-xs px-3 py-2 rounded-full border hover:border-primary hover:text-primary hover:bg-primary/5 transition-all text-muted-foreground"
                >
                  {ex.from} → {ex.to}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Roadmap Results */}
      {roadmap && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Top Bar */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black">{roadmap.title}</h2>
              <p className="text-muted-foreground mt-1 max-w-2xl">{roadmap.summary}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 gap-2"
              onClick={() => setRoadmap(null)}
            >
              <RefreshCw className="w-4 h-4" />
              New Roadmap
            </Button>
          </div>

          {/* Phases */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Map className="w-5 h-5 text-primary" />
              Your Learning Phases
            </h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-border hidden md:block" />

              <div className="space-y-4">
                {roadmap.phases?.map((phase, i) => {
                  const color = PHASE_COLORS[i % PHASE_COLORS.length];
                  return (
                    <div key={i} className="relative md:pl-14">
                      {/* Timeline dot */}
                      <div className={`absolute left-3 top-5 w-4 h-4 rounded-full ${color.bg} hidden md:flex items-center justify-center ring-4 ring-background`}>
                        <span className="text-white text-[8px] font-black">{i + 1}</span>
                      </div>

                      <Card className={`border hover:border-primary/40 transition-colors`}>
                        <div className={`h-1 ${color.bg} rounded-t-xl`} />
                        <CardContent className="pt-5">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge className={`${color.bg} text-white border-0`}>
                                  Phase {phase.phase}
                                </Badge>
                                <span className={`text-sm font-medium ${color.text} flex items-center gap-1`}>
                                  <Clock className="w-3 h-3" />
                                  {phase.duration}
                                </span>
                              </div>
                              <h4 className="text-lg font-bold mt-2">{phase.title}</h4>
                              <p className="text-sm text-muted-foreground">{phase.focus}</p>
                            </div>
                            <div className={`shrink-0 px-4 py-3 rounded-xl border ${color.border} ${color.light} text-sm max-w-[220px]`}>
                              <div className="flex items-center gap-1.5 mb-1">
                                <CheckCircle2 className={`w-3.5 h-3.5 ${color.text}`} />
                                <span className="font-semibold text-xs uppercase tracking-wide">Milestone</span>
                              </div>
                              <p className="text-muted-foreground text-xs leading-relaxed">{phase.milestone}</p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-5 text-sm">
                            <div>
                              <p className="font-semibold mb-2 flex items-center gap-1.5">
                                🛠 Skills to Learn
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {phase.skills?.map((s, j) => (
                                  <Badge key={j} variant="outline" className="text-xs">{s}</Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="font-semibold mb-2 flex items-center gap-1.5">
                                🚀 Projects to Build
                              </p>
                              <ul className="space-y-1.5">
                                {phase.projects?.map((p, j) => (
                                  <li key={j} className="flex items-start gap-1.5 text-muted-foreground text-xs">
                                    <ChevronRight className="w-3 h-3 mt-0.5 shrink-0 text-primary" />
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="font-semibold mb-2 flex items-center gap-1.5">
                                📚 Resources
                              </p>
                              <ul className="space-y-1.5">
                                {phase.resources?.map((r, j) => (
                                  <li key={j} className="flex items-start gap-1.5 text-muted-foreground text-xs">
                                    <BookOpen className="w-3 h-3 mt-0.5 shrink-0 text-primary" />
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Salary Progression */}
          {roadmap.salaryProgression && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <IndianRupee className="w-5 h-5 text-green-500" />
                  Expected Salary Progression
                </CardTitle>
                <CardDescription>
                  Based on current Indian job market data for this career path
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {roadmap.salaryProgression.map((s, i) => (
                    <div key={i} className="relative text-center p-5 rounded-xl bg-muted/40 border hover:border-green-500/40 transition-colors">
                      {i === 1 && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                          <Badge className="text-xs bg-green-500/20 text-green-500 border-green-500/30">
                            Your Goal
                          </Badge>
                        </div>
                      )}
                      <div className="text-2xl font-black text-green-500">{s.range}</div>
                      <div className="font-semibold mt-1">{s.stage}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{s.yearsExp} yrs experience</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Top Resources */}
          {roadmap.topResources && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Curated Top Resources
                </CardTitle>
                <CardDescription>
                  The best learning materials specifically for this career path
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {roadmap.topResources.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3.5 rounded-xl border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <Badge variant="outline" className="text-xs shrink-0 group-hover:border-primary group-hover:text-primary transition-colors">
                        {r.type}
                      </Badge>
                      <span className="text-sm font-medium flex-1">{r.name}</span>
                      {r.url && r.url !== "URL if known" && (
                        <a
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        >
                          Visit →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2">Now, execute the plan.</h3>
              <p className="text-muted-foreground text-sm mb-4 max-w-lg">
                While you learn, keep your resume and LinkedIn profile updated to reflect each new skill. Use GENzAI's other tools to stay ahead at every phase.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="sm" onClick={() => setRoadmap(null)} variant="outline" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Generate New Roadmap
                </Button>
                <Button size="sm" asChild>
                  <a href="/ats-scorer">Score My Resume →</a>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <a href="/linkedin-optimizer">Optimize LinkedIn →</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
