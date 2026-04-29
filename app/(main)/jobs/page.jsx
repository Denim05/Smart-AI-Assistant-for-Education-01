"use client";
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, MapPin, Building2, Clock, ExternalLink, Briefcase, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const POPULAR_SEARCHES = ["React Developer", "Full Stack", "Data Science", "DevOps", "UI/UX Designer", "Python Developer", "AI Engineer"];

export default function JobBoardPage() {
  const [query, setQuery] = useState("developer");
  const [location, setLocation] = useState("india");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMock, setIsMock] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchJobs = useCallback(async (q = query, l = location) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/jobs?query=${encodeURIComponent(q)}&location=${encodeURIComponent(l)}`);
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs);
        setTotal(data.total);
        setIsMock(data.isMock);
      } else toast.error("Failed to fetch jobs.");
    } catch { toast.error("Something went wrong."); }
    setLoading(false);
  }, []);

  useEffect(() => { fetchJobs(); }, []);

  const typeColor = (type) => {
    if (!type) return "secondary";
    const t = type.toLowerCase();
    if (t.includes("remote")) return "default";
    if (t.includes("hybrid")) return "outline";
    return "secondary";
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-xl"><Briefcase className="w-6 h-6 text-primary" /></div>
        <div>
          <h1 className="text-3xl font-bold">Job Board</h1>
          <p className="text-muted-foreground mt-1">Discover {total > 0 ? `${total.toLocaleString()}+` : ""} live opportunities matching your skills.</p>
        </div>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Job title, skills, company..." value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && fetchJobs()} />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Location (e.g. Bangalore, Remote)" value={location} onChange={e => setLocation(e.target.value)} onKeyDown={e => e.key === "Enter" && fetchJobs()} />
            </div>
            <Button onClick={() => fetchJobs()} disabled={loading} className="shrink-0 gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Search
            </Button>
          </div>

          {/* Popular searches */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {POPULAR_SEARCHES.map((s) => (
              <Badge key={s} variant="outline" className="cursor-pointer hover:border-primary hover:text-primary transition-colors" onClick={() => { setQuery(s); fetchJobs(s, location); }}>{s}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {isMock && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm">
          <RefreshCw className="w-4 h-4 text-yellow-500 shrink-0" />
          <span className="text-yellow-600 dark:text-yellow-400">Showing demo jobs. Add <code className="font-mono bg-muted px-1 rounded">ADZUNA_APP_ID</code> and <code className="font-mono bg-muted px-1 rounded">ADZUNA_APP_KEY</code> to <code>.env</code> for live jobs from Adzuna.</span>
        </div>
      )}

      {/* Jobs Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <Card key={job.id} className="group hover:border-primary/50 hover:shadow-md transition-all duration-200 flex flex-col">
              <CardContent className="pt-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold leading-tight group-hover:text-primary transition-colors">{job.title}</h3>
                    <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                      <Building2 className="w-3 h-3" />{job.company}
                    </div>
                  </div>
                  <Badge variant={typeColor(job.type)} className="shrink-0 text-xs">{job.type}</Badge>
                </div>

                <div className="space-y-1.5 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{job.location}</div>
                  {job.salary !== "Not disclosed" && <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-medium">💰 {job.salary}</div>}
                  <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{formatDistanceToNow(new Date(job.created), { addSuffix: true })}</div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 flex-1 mb-4">{job.description}</p>

                <Button size="sm" className="w-full gap-2 mt-auto" asChild>
                  <a href={job.url} target="_blank" rel="noopener noreferrer">
                    Apply Now <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && jobs.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>No jobs found. Try a different search.</p>
        </div>
      )}
    </div>
  );
}
