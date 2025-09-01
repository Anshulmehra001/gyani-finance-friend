import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Heart, TrendingUp, Shield, Target } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; score: number }[];
  icon: React.ReactNode;
}

const questions: Question[] = [
  {
    id: "confidence",
    question: "On a scale of 1-5, how confident do you feel about your current financial situation?",
    icon: <Heart className="w-5 h-5 text-primary" />,
    options: [
      { value: "1", label: "1 - Help! I need guidance", score: 1 },
      { value: "2", label: "2 - Struggling a bit", score: 2 },
      { value: "3", label: "3 - Getting by okay", score: 3 },
      { value: "4", label: "4 - Pretty confident", score: 4 },
      { value: "5", label: "5 - I've got this!", score: 5 }
    ]
  },
  {
    id: "savings",
    question: "Do you currently have any savings set aside?",
    icon: <TrendingUp className="w-5 h-5 text-growth" />,
    options: [
      { value: "none", label: "No savings yet", score: 1 },
      { value: "small", label: "A small amount (under $500)", score: 2 },
      { value: "emergency", label: "Some emergency savings", score: 4 },
      { value: "solid", label: "Solid savings foundation", score: 5 }
    ]
  },
  {
    id: "investing",
    question: "What's your experience with investing?",
    icon: <Target className="w-5 h-5 text-accent" />,
    options: [
      { value: "none", label: "Never invested before", score: 1 },
      { value: "curious", label: "Curious but haven't started", score: 2 },
      { value: "learning", label: "Just getting started", score: 3 },
      { value: "some", label: "Have some investments", score: 4 },
      { value: "experienced", label: "Experienced investor", score: 5 }
    ]
  }
];

interface FinancialHealthCheckProps {
  onComplete?: (results: { score: number; recommendations: string[] }) => void;
}

export const FinancialHealthCheck = ({ onComplete }: FinancialHealthCheckProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    let totalScore = 0;
    questions.forEach(question => {
      const answer = answers[question.id];
      const option = question.options.find(opt => opt.value === answer);
      if (option) {
        totalScore += option.score;
      }
    });

    const maxScore = questions.length * 5;
    const percentage = (totalScore / maxScore) * 100;
    
    const recommendations = generateRecommendations(percentage, answers);
    
    setShowResults(true);
    onComplete?.({ score: percentage, recommendations });
  };

  const generateRecommendations = (score: number, userAnswers: Record<string, string>): string[] => {
    const recs: string[] = [];
    
    if (score < 40) {
      recs.push("Start with the 'First Steps in Saving' module 🌱");
      recs.push("Learn about budgeting basics");
      recs.push("Build an emergency fund goal");
    } else if (score < 70) {
      recs.push("Explore compound interest concepts ❄️");
      recs.push("Learn about different investment types");
      recs.push("Set up automatic savings");
    } else {
      recs.push("Advanced investing strategies 🚀");
      recs.push("Tax-efficient investing");
      recs.push("Portfolio diversification");
    }
    
    return recs;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const hasAnswer = answers[currentQ.id];

  if (showResults) {
    const totalScore = questions.reduce((sum, question) => {
      const answer = answers[question.id];
      const option = question.options.find(opt => opt.value === answer);
      return sum + (option?.score || 0);
    }, 0);
    
    const percentage = Math.round((totalScore / (questions.length * 5)) * 100);
    const recommendations = generateRecommendations(percentage, answers);

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-growth" />
            <CardTitle className="text-2xl">Your Financial Health Report</CardTitle>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center p-6 bg-gradient-to-br from-growth-light/20 to-growth-glow/10 rounded-xl border border-growth/20">
            <div className="text-4xl font-bold text-growth mb-2">{percentage}%</div>
            <p className="text-muted-foreground">
              {percentage < 40 ? "Building Foundation 🌱" :
               percentage < 70 ? "Growing Strong 📈" : "Financial Pro! 🏆"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Recommended Next Steps
            </h3>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-medium">
                    {index + 1}
                  </div>
                  <span className="text-sm">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm text-muted-foreground mb-4">
              Great job completing your Financial Health Check! 🎉
            </p>
            <Button onClick={() => window.location.reload()} className="w-full">
              Start Learning Journey
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl flex items-center justify-center gap-2">
          {currentQ.icon}
          Financial Health Check
        </CardTitle>
        <Progress value={progress} className="w-full h-2 mt-4" />
        <p className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-6">{currentQ.question}</h3>
          
          <RadioGroup
            value={answers[currentQ.id] || ""}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {currentQ.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="flex-1 text-left cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleNext}
            disabled={!hasAnswer}
            className="px-8"
          >
            {currentQuestion === questions.length - 1 ? "See Results" : "Next Question"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};