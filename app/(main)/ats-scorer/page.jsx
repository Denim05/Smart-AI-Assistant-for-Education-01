"use client";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2, XCircle, AlertTriangle, Loader2,
  Upload, Target, Sparkles, ArrowRight, TrendingUp,
  FileText, Clipboard, RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const SCORE_TIERS = [
  { min: 80, label: "Excellent", color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/30", bar: "bg-emerald-500" },
  { min: 60, label: "Good", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/30", bar: "bg-yellow-500" },
  { min: 40, label: "Needs Work", color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/30", bar: "bg-orange-500" },
  { min: 0, label: "Critical", color: "text-red-500", bg: "bg-red-500/10 border-red-500/30", bar: "bg-red-500" },
];

const SECTION_LABELS = {
  keywordsMatch: "Keywords Match",
  formatting: "Formatting",
  experience: "Experience",
  skills: "Skills",
};

const SAMPLE_RESUME = `John Doe | john@example.com | linkedin.com/in/johndoe | +91 9876543210

SUMMARY
Results-driven software engineer with 3 years of experience building scalable web applications using React, Node.js, and cloud technologies.

EXPERIENCE
Software Engineer — Infosys, Bangalore (2021–Present)
• Built and maintained 5+ production React applications serving 100K+ users
• Reduced page load time by 40% through code splitting and lazy loading
• Collaborated with cross-functional teams in agile sprints

EDUCATION
B.Tech in Computer Science — VIT University (2017–2021) | CGPA: 8.2

SKILLS
React, JavaScript, TypeScript, Node.js, Express, MongoDB, PostgreSQL, AWS, Docker, Git`;

export default function ATSScorerPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const resultsRef = useRef(null);

  const getTier = (score) => SCORE_TIERS.find((t) => score >= t.min) || SCORE_TIERS[3];

  const handleAnalyze = async () => {
    if (!resumeText.trim() && !file) {
      setError("Please paste your resume text or upload a PDF file.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      let res;
      if (file) {
        const formData = new FormData();
        formData.append("resume", file);
        formData.append("jobDescription", jobDescription);
        res = await fetch("/api/ats-score", {
          method: "POST",
          body: formData,
        });
      } else {
        res = await fetch("/api/ats-score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText, jobDescription }),
        });
      }
      
      const data = await res.json();
      if (data.success) {
        setResult(data.analysis);
        toast.success("Analysis complete!");
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      } else {
        setError(data.error || "Analysis failed.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  const handleReset = () => {
    setResult(null);
    setResumeText("");
    setJobDescription("");
    setError("");
  };

  const overallTier = result ? getTier(result.overallScore) : null;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <Badge variant="outline" className="text-primary border-primary/30">
            AI-Powered
          </Badge>
        </div>
        <h1 className="text-4xl font-black">ATS Resume Scorer</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Know exactly why recruiters aren't calling back. Paste your resume and a job description to get a detailed ATS compatibility score — plus the specific fixes that matter.
        </p>
      </div>



      {/* Input Section */}
      {!result && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Resume Input */}
            <Card className="border-2 hover:border-primary/40 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="w-4 h-4" />
                  Your Resume
                  <span className="ml-auto text-xs text-muted-foreground font-normal">*Required</span>
                </CardTitle>
                <CardDescription>Upload PDF or paste text</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* File Upload Zone */}
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${file ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30"}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const droppedFile = e.dataTransfer.files[0];
                    if (droppedFile?.type === "application/pdf") {
                      setFile(droppedFile);
                      setResumeText("");
                      toast.success(`Resume "${droppedFile.name}" selected`);
                    } else {
                      toast.error("Please upload a PDF file.");
                    }
                  }}
                >
                  <input 
                    type="file" 
                    accept=".pdf" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={(e) => {
                      const selectedFile = e.target.files[0];
                      if (selectedFile) {
                        setFile(selectedFile);
                        setResumeText("");
                        toast.success(`Resume "${selectedFile.name}" selected`);
                      }
                    }}
                  />
                  {file ? (
                    <div className="space-y-2">
                      <div className="mx-auto w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-sm font-bold truncate max-w-[200px] mx-auto">{file.name}</div>
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-red-500 hover:text-red-600" onClick={(e) => { e.stopPropagation(); setFile(null); }}>Remove file</Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="mx-auto w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Upload className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="text-sm font-semibold">Drop your resume PDF here</div>
                      <div className="text-xs text-muted-foreground">or click to browse files</div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or paste text</span></div>
                </div>

                <Textarea
                  placeholder="Paste your full resume text here..."
                  className="min-h-[120px] text-sm font-mono resize-none focus:border-primary"
                  value={resumeText}
                  onChange={(e) => {
                    setResumeText(e.target.value);
                    if (e.target.value) setFile(null);
                  }}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-primary"
                  onClick={() => { setResumeText(SAMPLE_RESUME); setFile(null); toast.info("Sample resume loaded"); }}
                >
                  <Clipboard className="w-3 h-3 mr-1" />
                  Load sample resume
                </Button>
              </CardContent>
            </Card>

            {/* JD Input */}
            <Card className="border-2 hover:border-primary/40 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Target className="w-4 h-4" />
                  Job Description
                  <span className="ml-auto text-xs text-green-500 font-semibold">+30% accuracy</span>
                </CardTitle>
                <CardDescription>Optional — but highly recommended for precision</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste the job description you're applying to..."
                  className="min-h-[280px] text-sm resize-none focus:border-primary"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </CardContent>
            </Card>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-500">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <Button
            onClick={handleAnalyze}
            disabled={loading}
            size="lg"
            className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin mr-2" />Analyzing with AI — this takes 5–10 seconds...</>
            ) : (
              <><Sparkles className="w-5 h-5 mr-2" />Analyze My Resume <ArrowRight className="ml-2 w-4 h-4" /></>
            )}
          </Button>
        </div>
      )}

      {/* Results */}
      {result && (
        <div ref={resultsRef} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Reset Button */}
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Analyze Another Resume
            </Button>
          </div>

          {/* Overall Score Card */}
          <Card className={`border-2 ${overallTier.bg}`}>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
                <div className="flex-1">
                  <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                    Overall ATS Score
                  </p>
                  <h2 className="text-3xl font-black mb-3">{result.summary}</h2>
                  <Badge className={`${overallTier.color} bg-transparent border border-current text-sm px-3 py-1`}>
                    {overallTier.label} — {result.overallScore >= 80 ? "Ready to apply" : result.overallScore >= 60 ? "Minor fixes needed" : "Fix before applying"}
                  </Badge>
                </div>
                <div className="shrink-0 text-center">
                  <div className={`text-8xl font-black ${overallTier.color} tabular-nums`}>
                    {result.overallScore}
                  </div>
                  <div className="text-muted-foreground text-sm font-medium mt-1">out of 100</div>
                </div>
              </div>
              <Progress value={result.overallScore} className="h-3 rounded-full" />
            </CardContent>
          </Card>

          {/* Section Scores */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(result.sections).map(([key, val]) => {
              const tier = getTier(val);
              return (
                <Card key={key} className="hover:border-primary/40 transition-colors">
                  <CardContent className="pt-5">
                    <div className={`text-4xl font-black ${tier.color} mb-1`}>{val}%</div>
                    <div className="text-sm font-medium capitalize mb-3">
                      {SECTION_LABELS[key] || key.replace(/([A-Z])/g, " $1")}
                    </div>
                    <Progress value={val} className="h-1.5 rounded-full" />
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Strengths & Improvements */}
          <div className="grid md:grid-cols-2 gap-5">
            <Card className="border-emerald-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-emerald-500 text-base">
                  <CheckCircle2 className="w-5 h-5" />
                  What's Working Well
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-orange-500 text-base">
                  <AlertTriangle className="w-5 h-5" />
                  High-Impact Fixes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {result.improvements.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <ArrowRight className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Missing Keywords */}
          {result.missingKeywords?.length > 0 && (
            <Card className="border-red-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <XCircle className="w-5 h-5 text-red-500" />
                  Missing Keywords
                  <Badge variant="destructive" className="ml-auto">
                    {result.missingKeywords.length} missing
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Add these keywords naturally into your resume to improve ATS match for this role
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {result.missingKeywords.map((k, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="border-red-500/30 text-red-500 bg-red-500/5 hover:bg-red-500/10 transition-colors"
                    >
                      {k}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Next Steps CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="font-bold text-lg mb-2">What to do next</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Add the missing keywords, fix the improvements above, then run your resume through the scorer again. Most users reach 80+ in 1–2 iterations.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleReset} variant="outline" size="sm" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Re-score Updated Resume
                </Button>
                <Button size="sm" asChild>
                  <a href="/resume">Build Better Resume with AI →</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
