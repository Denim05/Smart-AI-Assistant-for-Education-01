"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, AlertTriangle, Loader2, Upload, Target } from "lucide-react";

export default function ATSScorerPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!resumeText.trim()) { setError("Please paste your resume text."); return; }
    setError(""); setLoading(true); setResult(null);
    try {
      const res = await fetch("/api/ats-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });
      const data = await res.json();
      if (data.success) setResult(data.analysis);
      else setError(data.error || "Analysis failed.");
    } catch { setError("Something went wrong. Try again."); }
    setLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">ATS Resume Scorer</h1>
        <p className="text-muted-foreground mt-1">Paste your resume and a job description to get an instant ATS compatibility score with AI feedback.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Upload className="w-4 h-4"/>Resume Text</CardTitle></CardHeader>
          <CardContent>
            <Textarea placeholder="Paste your full resume text here..." className="min-h-[280px] text-sm" value={resumeText} onChange={(e) => setResumeText(e.target.value)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Target className="w-4 h-4"/>Job Description</CardTitle><CardDescription>Optional but highly recommended for accuracy</CardDescription></CardHeader>
          <CardContent>
            <Textarea placeholder="Paste the job description you're applying for..." className="min-h-[280px] text-sm" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
          </CardContent>
        </Card>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button onClick={handleAnalyze} disabled={loading} size="lg" className="w-full bg-gradient-to-r from-primary to-blue-600">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2"/>Analyzing with AI...</> : "Analyze My Resume"}
      </Button>

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* Overall Score */}
          <Card className="border-2 border-primary/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">Overall ATS Score</h2>
                  <p className="text-muted-foreground">{result.summary}</p>
                </div>
                <div className={`text-6xl font-black ${getScoreColor(result.overallScore)}`}>{result.overallScore}<span className="text-2xl">%</span></div>
              </div>
              <Progress value={result.overallScore} className="h-3" />
            </CardContent>
          </Card>

          {/* Section Scores */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(result.sections).map(([key, val]) => (
              <Card key={key}>
                <CardContent className="pt-4 text-center">
                  <div className={`text-3xl font-bold ${getScoreColor(val)}`}>{val}%</div>
                  <div className="text-sm text-muted-foreground capitalize mt-1">{key.replace(/([A-Z])/g, " $1")}</div>
                  <Progress value={val} className="mt-2 h-1.5" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Strengths & Improvements */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-green-500 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/>Strengths</CardTitle></CardHeader>
              <CardContent><ul className="space-y-2">{result.strengths.map((s,i)=><li key={i} className="flex items-start gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0"/>{s}</li>)}</ul></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-yellow-500 flex items-center gap-2"><AlertTriangle className="w-5 h-5"/>Improvements</CardTitle></CardHeader>
              <CardContent><ul className="space-y-2">{result.improvements.map((s,i)=><li key={i} className="flex items-start gap-2 text-sm"><AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0"/>{s}</li>)}</ul></CardContent>
            </Card>
          </div>

          {/* Missing Keywords */}
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><XCircle className="w-5 h-5 text-red-500"/>Missing Keywords</CardTitle><CardDescription>Add these to your resume to improve ATS match</CardDescription></CardHeader>
            <CardContent><div className="flex flex-wrap gap-2">{result.missingKeywords.map((k,i)=><Badge key={i} variant="destructive">{k}</Badge>)}</div></CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
