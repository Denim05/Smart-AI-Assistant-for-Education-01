"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Linkedin, Copy, CheckCheck, Lightbulb } from "lucide-react";
import { toast } from "sonner";

export default function LinkedInOptimizerPage() {
  const [currentBio, setCurrentBio] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [industry, setIndustry] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(null);

  const handleOptimize = async () => {
    if (!targetRole.trim()) { toast.error("Please enter your target role."); return; }
    setLoading(true); setResult(null);
    try {
      const res = await fetch("/api/linkedin-optimizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentBio, targetRole, industry }),
      });
      const data = await res.json();
      if (data.success) { setResult(data.optimized); toast.success("Profile optimized!"); }
      else toast.error(data.error || "Optimization failed.");
    } catch { toast.error("Something went wrong."); }
    setLoading(false);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600/10 rounded-xl"><Linkedin className="w-6 h-6 text-blue-600" /></div>
        <div>
          <h1 className="text-3xl font-bold">LinkedIn Profile Optimizer</h1>
          <p className="text-muted-foreground mt-1">Get AI-powered headlines and an optimized About section to attract recruiters.</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Your Profile Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Role *</label>
              <Input placeholder="e.g. Senior Frontend Developer" value={targetRole} onChange={e => setTargetRole(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <Input placeholder="e.g. FinTech, Healthcare, SaaS" value={industry} onChange={e => setIndustry(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Current LinkedIn Bio (optional)</label>
            <Textarea placeholder="Paste your current LinkedIn About section here..." className="min-h-[150px]" value={currentBio} onChange={e => setCurrentBio(e.target.value)} />
          </div>
          <Button onClick={handleOptimize} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Optimizing...</> : <><Linkedin className="w-4 h-4 mr-2" />Optimize My Profile</>}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          {/* Headlines */}
          <Card>
            <CardHeader><CardTitle>✨ Optimized Headlines</CardTitle><CardDescription>Choose the one that best matches your goals. LinkedIn headline max is 220 characters.</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {result.optimizedHeadlines?.map((h, i) => (
                <div key={i} className="flex items-start justify-between gap-4 p-3 rounded-lg border hover:border-primary transition-colors">
                  <p className="text-sm flex-1">{h}</p>
                  <Button size="sm" variant="ghost" onClick={() => copyToClipboard(h, `h${i}`)}>
                    {copied === `h${i}` ? <CheckCheck className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* About Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>📝 Optimized About Section</CardTitle>
                <Button size="sm" variant="outline" onClick={() => copyToClipboard(result.optimizedAbout, "about")}>
                  {copied === "about" ? <CheckCheck className="w-4 h-4 text-green-500" /> : <><Copy className="w-4 h-4 mr-1" />Copy</>}
                </Button>
              </div>
            </CardHeader>
            <CardContent><p className="text-sm leading-relaxed whitespace-pre-wrap">{result.optimizedAbout}</p></CardContent>
          </Card>

          {/* Keywords & Tips */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle>🔑 Keywords to Add</CardTitle></CardHeader>
              <CardContent><div className="flex flex-wrap gap-2">{result.keywordsToAdd?.map((k,i)=><Badge key={i} variant="secondary">{k}</Badge>)}</div></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Lightbulb className="w-4 h-4 text-yellow-500"/>Profile Tips</CardTitle></CardHeader>
              <CardContent><ul className="space-y-2">{result.profileTips?.map((t,i)=><li key={i} className="text-sm flex items-start gap-2"><span className="text-primary font-bold">→</span>{t}</li>)}</ul></CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
