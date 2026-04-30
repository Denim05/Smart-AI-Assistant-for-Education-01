import { Brain, Target, Trophy, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  const avgScore = getAverageScore();
  const scoreColor = avgScore > 75 ? "text-emerald-500" : avgScore > 50 ? "text-yellow-500" : "text-primary";

  return (
    <div className="grid gap-5 md:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="border-2 hover:border-primary/40 transition-colors shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold text-muted-foreground">Overall Mastery</CardTitle>
          <div className="p-2 bg-emerald-500/10 rounded-xl">
            <Trophy className="h-5 w-5 text-emerald-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-4xl font-black ${scoreColor}`}>{avgScore}%</div>
          <p className="text-xs text-muted-foreground mt-1 font-medium">
            Average across all sessions
          </p>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/40 transition-colors shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold text-muted-foreground">
            Questions Handled
          </CardTitle>
          <div className="p-2 bg-blue-500/10 rounded-xl">
            <Brain className="h-5 w-5 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black">{getTotalQuestions()}</div>
          <p className="text-xs text-muted-foreground mt-1 font-medium">Unique scenarios practiced</p>
        </CardContent>
      </Card>

      <Card className="border-2 hover:border-primary/40 transition-colors shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold text-muted-foreground">Latest Readiness</CardTitle>
          <div className="p-2 bg-primary/10 rounded-xl">
            <Target className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black text-primary">
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-medium">Score from most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
}
