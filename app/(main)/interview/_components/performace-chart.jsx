"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { LineChart as LineChartIcon } from "lucide-react";

export default function PerformanceChart({ assessments }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (assessments) {
      const formattedData = assessments.map((assessment) => ({
        date: format(new Date(assessment.createdAt), "MMM dd"),
        score: assessment.quizScore,
      }));
      // Reverse if needed so oldest is on the left
      setChartData(formattedData.reverse());
    }
  }, [assessments]);

  return (
    <Card className="border-2 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <LineChartIcon className="w-5 h-5 text-primary" />
          Performance Trend
        </CardTitle>
        <CardDescription>Your mock interview scores over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dy={10} />
              <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dx={-10} tickFormatter={(val) => \`\${val}%\`} />
              <Tooltip
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
                content={({ active, payload }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-background border-2 rounded-xl p-3 shadow-xl">
                        <p className="text-xs text-muted-foreground mb-1 font-medium">
                          {payload[0].payload.date}
                        </p>
                        <p className="font-bold text-lg text-primary flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          {payload[0].value}%
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="hsl(var(--primary))" 
                fillOpacity={1} 
                fill="url(#colorScore)" 
                strokeWidth={3} 
                activeDot={{ r: 6, strokeWidth: 0, fill: "hsl(var(--primary))" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
