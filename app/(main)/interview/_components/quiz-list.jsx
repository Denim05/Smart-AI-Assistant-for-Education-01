"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, CheckCircle2, History, AlertTriangle } from "lucide-react";
import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
      <Card className="border-2 shadow-sm">
        <CardHeader className="border-b bg-muted/20 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                Recent Mock Interviews
              </CardTitle>
              <CardDescription className="mt-1">
                Review past sessions, feedback, and improvement areas.
              </CardDescription>
            </div>
            <Button onClick={() => router.push("/interview/mock")} className="shrink-0 gap-2">
              <Plus className="w-4 h-4" /> Start New Session
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4">
            {assessments?.map((assessment, i) => {
              const isHigh = assessment.quizScore >= 75;
              const isMedium = assessment.quizScore >= 50 && assessment.quizScore < 75;
              const scoreColor = isHigh ? "text-emerald-500" : isMedium ? "text-yellow-500" : "text-red-500";
              const scoreBg = isHigh ? "bg-emerald-500/10" : isMedium ? "bg-yellow-500/10" : "bg-red-500/10";
              const scoreBorder = isHigh ? "border-emerald-500/20" : isMedium ? "border-yellow-500/20" : "border-red-500/20";
              
              return (
                <div
                  key={assessment.id}
                  className="group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer shadow-sm"
                  onClick={() => setSelectedQuiz(assessment)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-sm ${scoreBg} ${scoreColor} border ${scoreBorder}`}>
                      {assessment.quizScore.toFixed(0)}%
                    </div>
                    <div>
                      <h4 className="font-bold text-base group-hover:text-primary transition-colors">
                        Session {assessments.length - i}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {format(new Date(assessment.createdAt), "MMMM dd, yyyy 'at' HH:mm")}
                      </p>
                      {assessment.improvementTip && (
                        <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                          {isHigh ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" />}
                          <span className="line-clamp-1">{assessment.improvementTip}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    View Feedback →
                  </Button>
                </div>
              );
            })}
            
            {!assessments?.length && (
              <div className="text-center py-10 px-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                  <History className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm">No mock interviews completed yet.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
