"use client";

import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from "recharts";
import {
  BriefcaseIcon, LineChart, TrendingUp, TrendingDown,
  Brain, Sparkles, MapPin, Award, Rocket
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelStyle = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return { color: "text-emerald-500", bg: "bg-emerald-500", border: "border-emerald-500/20" };
      case "medium":
        return { color: "text-yellow-500", bg: "bg-yellow-500", border: "border-yellow-500/20" };
      case "low":
        return { color: "text-red-500", bg: "bg-red-500", border: "border-red-500/20" };
      default:
        return { color: "text-gray-500", bg: "bg-gray-500", border: "border-gray-500/20" };
    }
  };

  const getMarketOutlookStyle = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" };
      case "neutral":
        return { icon: LineChart, color: "text-yellow-500", bg: "bg-yellow-500/10" };
      case "negative":
        return { icon: TrendingDown, color: "text-red-500", bg: "bg-red-500/10" };
      default:
        return { icon: LineChart, color: "text-gray-500", bg: "bg-gray-500/10" };
    }
  };

  const OutlookIcon = getMarketOutlookStyle(insights.marketOutlook).icon;
  const outlookStyle = getMarketOutlookStyle(insights.marketOutlook);
  const demandStyle = getDemandLevelStyle(insights.demandLevel);

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "MMM dd, yyyy");
  const nextUpdateDistance = formatDistanceToNow(new Date(insights.nextUpdate), { addSuffix: true });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-muted/30 p-6 rounded-2xl border">
        <div>
          <Badge variant="outline" className="mb-2 text-primary border-primary/30 bg-primary/5">
            <Sparkles className="w-3 h-3 mr-1" /> Industry Intelligence
          </Badge>
          <h1 className="text-4xl font-black tracking-tight">Your Market Dashboard</h1>
          <p className="text-muted-foreground mt-1">Real-time data for your specific industry.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background px-4 py-2 rounded-full border shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live • Updated {lastUpdatedDate}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="border hover:border-primary/40 transition-colors shadow-sm group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Market Outlook</CardTitle>
            <div className={`p-2 rounded-lg ${outlookStyle.bg}`}>
              <OutlookIcon className={`h-5 w-5 ${outlookStyle.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black capitalize">{insights.marketOutlook}</div>
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              Next AI refresh {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card className="border hover:border-primary/40 transition-colors shadow-sm group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Industry Growth</CardTitle>
            <div className="p-2 rounded-lg bg-blue-500/10">
              <Rocket className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black">{insights.growthRate.toFixed(1)}%</div>
            <Progress value={insights.growthRate} className="mt-3 h-1.5" />
          </CardContent>
        </Card>

        <Card className={`border hover:${demandStyle.border} transition-colors shadow-sm group`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Hiring Demand</CardTitle>
            <div className={`p-2 rounded-lg bg-opacity-10 ${demandStyle.bg.replace("bg-", "bg-opacity-10 ")}`}>
              <BriefcaseIcon className={`h-5 w-5 ${demandStyle.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className={`text-3xl font-black capitalize ${demandStyle.color}`}>{insights.demandLevel}</div>
            <div className={`h-1.5 w-full rounded-full mt-3 ${demandStyle.bg}`} />
          </CardContent>
        </Card>

        <Card className="border hover:border-primary/40 transition-colors shadow-sm group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Top Hard Skills</CardTitle>
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Brain className="h-5 w-5 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {insights.topSkills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 border-0">
                  {skill}
                </Badge>
              ))}
              {insights.topSkills.length > 3 && (
                <span className="text-xs text-muted-foreground flex items-center ml-1">+{insights.topSkills.length - 3} more</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Chart */}
        <Card className="lg:col-span-2 border-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <LineChart className="w-5 h-5 text-primary" />
              Salary Benchmarks by Role
            </CardTitle>
            <CardDescription>
              Live market data (in thousands) representing base compensation ranges.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salaryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMedian" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dx={-10} tickFormatter={(val) => `${val}k`} />
                  <Tooltip
                    cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-background border-2 rounded-xl p-4 shadow-xl">
                            <p className="font-bold text-base border-b pb-2 mb-2">{label}</p>
                            <div className="space-y-1.5">
                              {payload.map((item) => (
                                <div key={item.name} className="flex justify-between items-center gap-6 text-sm">
                                  <span className="text-muted-foreground flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    {item.name}
                                  </span>
                                  <span className="font-bold">\${item.value}k</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area type="monotone" dataKey="max" stroke="#94a3b8" fill="none" strokeWidth={2} name="Max Range" />
                  <Area type="monotone" dataKey="median" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorMedian)" strokeWidth={3} name="Median" />
                  <Area type="monotone" dataKey="min" stroke="#cbd5e1" fill="none" strokeWidth={2} name="Min Range" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Trends & Skills */}
        <div className="space-y-6">
          <Card className="border shadow-sm h-[calc(50%-12px)] overflow-hidden flex flex-col">
            <CardHeader className="pb-3 bg-muted/30 border-b">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Key Industry Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex-1 overflow-y-auto">
              <ul className="space-y-4">
                {insights.keyTrends.map((trend, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <span className="text-[10px] font-black text-primary group-hover:text-primary-foreground">{index + 1}</span>
                    </div>
                    <span className="text-sm leading-relaxed">{trend}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border shadow-sm h-[calc(50%-12px)] overflow-hidden flex flex-col">
            <CardHeader className="pb-3 bg-muted/30 border-b">
              <CardTitle className="text-base flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                Recommended Next Skills
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 flex-1 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {insights.recommendedSkills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="outline" 
                    className="px-3 py-1.5 text-sm hover:bg-primary hover:text-primary-foreground transition-all cursor-default border-primary/20"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default DashboardView;
