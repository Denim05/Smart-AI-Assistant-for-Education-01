"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Map, ChevronRight, BookOpen, TrendingUp, IndianRupee } from "lucide-react";
import { toast } from "sonner";

export default function CareerRoadmapPage() {
  const [form, setForm] = useState({ currentRole: "", targetRole: "", currentSkills: "", timeframe: "12" });
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  const handleGenerate = async () => {
    if (!form.targetRole.trim()) { toast.error("Please enter your target role."); return; }
    setLoading(true); setRoadmap(null);
    try {
      const res = await fetch("/api/career-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, timeframe: `${form.timeframe} months` }),
      });
      const data = await res.json();
      if (data.success) { setRoadmap(data.roadmap); toast.success("Roadmap generated!"); }
      else toast.error(data.error || "Failed to generate roadmap.");
    } catch { toast.error("Something went wrong."); }
    setLoading(false);
  };

  const phaseColors = ["bg-blue-500","bg-purple-500","bg-pink-500","bg-orange-500","bg-green-500","bg-teal-500"];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-xl"><Map className="w-6 h-6 text-primary" /></div>
        <div>
          <h1 className="text-3xl font-bold">Career Roadmap Generator</h1>
          <p className="text-muted-foreground mt-1">Get a personalized month-by-month plan to reach your dream role.</p>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle>Tell Us Your Career Goals</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Role / Level</label>
              <Input placeholder="e.g. React Developer, CS Student, Fresher" value={form.currentRole} onChange={e => setForm({...form, currentRole: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Target Role *</label>
              <Input placeholder="e.g. Senior Full Stack Engineer at FAANG" value={form.targetRole} onChange={e => setForm({...form, targetRole: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Skills</label>
              <Input placeholder="e.g. HTML, CSS, JavaScript, React basics" value={form.currentSkills} onChange={e => setForm({...form, currentSkills: e.target.value})} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Timeframe</label>
              <Select value={form.timeframe} onValueChange={v => setForm({...form, timeframe: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="18">18 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleGenerate} disabled={loading} className="w-full" size="lg">
            {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Generating Your Roadmap...</> : <><Map className="w-4 h-4 mr-2" />Generate My Roadmap</>}
          </Button>
        </CardContent>
      </Card>

      {roadmap && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <Card className="border-primary/30 border-2">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold">{roadmap.title}</h2>
              <p className="text-muted-foreground mt-2">{roadmap.summary}</p>
            </CardContent>
          </Card>

          {/* Phases */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">📅 Your Learning Phases</h2>
            {roadmap.phases?.map((phase, i) => (
              <Card key={i} className="overflow-hidden">
                <div className={`${phaseColors[i % phaseColors.length]} h-1.5`} />
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${phaseColors[i % phaseColors.length]} text-white border-0`}>Phase {phase.phase}</Badge>
                        <span className="text-muted-foreground text-sm">{phase.duration}</span>
                      </div>
                      <h3 className="text-lg font-bold mt-1">{phase.title}</h3>
                      <p className="text-sm text-muted-foreground">{phase.focus}</p>
                    </div>
                    <div className="text-right text-sm bg-muted/50 px-3 py-2 rounded-lg">
                      <p className="font-medium">🎯 Milestone</p>
                      <p className="text-muted-foreground max-w-[200px]">{phase.milestone}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-1">🛠 Skills to Learn</p>
                      <div className="flex flex-wrap gap-1">{phase.skills?.map((s,j)=><Badge key={j} variant="outline" className="text-xs">{s}</Badge>)}</div>
                    </div>
                    <div>
                      <p className="font-medium mb-1">🚀 Projects to Build</p>
                      <ul className="space-y-1">{phase.projects?.map((p,j)=><li key={j} className="flex items-start gap-1 text-muted-foreground"><ChevronRight className="w-3 h-3 mt-0.5 shrink-0"/>{p}</li>)}</ul>
                    </div>
                    <div>
                      <p className="font-medium mb-1">📚 Resources</p>
                      <ul className="space-y-1">{phase.resources?.map((r,j)=><li key={j} className="flex items-start gap-1 text-muted-foreground"><BookOpen className="w-3 h-3 mt-0.5 shrink-0"/>{r}</li>)}</ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Salary Progression */}
          {roadmap.salaryProgression && (
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><IndianRupee className="w-5 h-5 text-green-500"/>Salary Progression</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  {roadmap.salaryProgression.map((s,i) => (
                    <div key={i} className="text-center p-4 rounded-lg bg-muted/40 border">
                      <div className="text-2xl font-bold text-green-500">{s.range}</div>
                      <div className="font-medium mt-1">{s.stage}</div>
                      <div className="text-sm text-muted-foreground">{s.yearsExp} years exp</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Top Resources */}
          {roadmap.topResources && (
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5"/>Top Resources</CardTitle></CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {roadmap.topResources.map((r,i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary transition-colors">
                      <Badge variant="secondary">{r.type}</Badge>
                      <span className="text-sm font-medium flex-1">{r.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
