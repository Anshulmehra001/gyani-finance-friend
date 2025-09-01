import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  PieChart as PieChartIcon,
  BarChart3
} from "lucide-react";

interface RiskQuestion {
  id: string;
  question: string;
  options: { value: string; label: string; score: number }[];
}

const riskQuestions: RiskQuestion[] = [
  {
    id: 'age',
    question: 'What is your age group?',
    options: [
      { value: 'under25', label: 'Under 25', score: 5 },
      { value: '25-35', label: '25-35 years', score: 4 },
      { value: '35-45', label: '35-45 years', score: 3 },
      { value: '45-55', label: '45-55 years', score: 2 },
      { value: 'over55', label: 'Over 55', score: 1 }
    ]
  },
  {
    id: 'income',
    question: 'What percentage of your income can you invest without affecting your lifestyle?',
    options: [
      { value: 'over30', label: 'More than 30%', score: 5 },
      { value: '20-30', label: '20-30%', score: 4 },
      { value: '10-20', label: '10-20%', score: 3 },
      { value: '5-10', label: '5-10%', score: 2 },
      { value: 'under5', label: 'Less than 5%', score: 1 }
    ]
  },
  {
    id: 'experience',
    question: 'How much investment experience do you have?',
    options: [
      { value: 'expert', label: 'Expert (10+ years)', score: 5 },
      { value: 'experienced', label: 'Experienced (5-10 years)', score: 4 },
      { value: 'moderate', label: 'Moderate (2-5 years)', score: 3 },
      { value: 'beginner', label: 'Beginner (Less than 2 years)', score: 2 },
      { value: 'none', label: 'No experience', score: 1 }
    ]
  },
  {
    id: 'volatility',
    question: 'If your investment lost 20% in a month, what would you do?',
    options: [
      { value: 'buy-more', label: 'Buy more - it\'s a good opportunity', score: 5 },
      { value: 'hold', label: 'Hold and wait for recovery', score: 4 },
      { value: 'review', label: 'Review my strategy', score: 3 },
      { value: 'sell-some', label: 'Sell some to reduce risk', score: 2 },
      { value: 'sell-all', label: 'Sell everything immediately', score: 1 }
    ]
  },
  {
    id: 'timeframe',
    question: 'What is your investment time horizon?',
    options: [
      { value: 'over10', label: 'More than 10 years', score: 5 },
      { value: '5-10', label: '5-10 years', score: 4 },
      { value: '3-5', label: '3-5 years', score: 3 },
      { value: '1-3', label: '1-3 years', score: 2 },
      { value: 'under1', label: 'Less than 1 year', score: 1 }
    ]
  }
];

interface RiskProfile {
  type: 'Conservative' | 'Moderate' | 'Aggressive';
  description: string;
  allocation: {
    equity: number;
    debt: number;
    gold: number;
    cash: number;
  };
  expectedReturn: string;
  volatility: string;
  color: string;
}

const riskProfiles: Record<string, RiskProfile> = {
  Conservative: {
    type: 'Conservative',
    description: 'You prefer stable investments with predictable returns. Capital preservation is your priority.',
    allocation: { equity: 20, debt: 60, gold: 10, cash: 10 },
    expectedReturn: '8-10% annually',
    volatility: 'Low (±5%)',
    color: '#22c55e'
  },
  Moderate: {
    type: 'Moderate',
    description: 'You can handle some market fluctuations for potentially higher returns.',
    allocation: { equity: 50, debt: 35, gold: 10, cash: 5 },
    expectedReturn: '10-14% annually',
    volatility: 'Medium (±12%)',
    color: '#3b82f6'
  },
  Aggressive: {
    type: 'Aggressive',
    description: 'You\'re comfortable with high volatility in pursuit of maximum returns.',
    allocation: { equity: 80, debt: 15, gold: 3, cash: 2 },
    expectedReturn: '14-18% annually',
    volatility: 'High (±20%)',
    color: '#f59e0b'
  }
};

const assetColors = {
  equity: '#ef4444',
  debt: '#22c55e', 
  gold: '#f59e0b',
  cash: '#6b7280'
};

export const RiskAssessmentTool = () => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [riskQuestions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < riskQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRiskProfile();
    }
  };

  const calculateRiskProfile = () => {
    let totalScore = 0;
    
    riskQuestions.forEach(question => {
      const answer = answers[question.id];
      const option = question.options.find(opt => opt.value === answer);
      if (option) {
        totalScore += option.score;
      }
    });

    const maxScore = riskQuestions.length * 5;
    const percentage = (totalScore / maxScore) * 100;
    
    let profileType: 'Conservative' | 'Moderate' | 'Aggressive';
    if (percentage <= 40) {
      profileType = 'Conservative';
    } else if (percentage <= 70) {
      profileType = 'Moderate';
    } else {
      profileType = 'Aggressive';
    }

    setRiskProfile(riskProfiles[profileType]);
    setShowResults(true);
  };

  const progress = ((currentQuestion + 1) / riskQuestions.length) * 100;
  const currentQ = riskQuestions[currentQuestion];
  const hasAnswer = answers[currentQ.id];

  if (showResults && riskProfile) {
    const pieData = [
      { name: 'Equity', value: riskProfile.allocation.equity, color: assetColors.equity },
      { name: 'Debt', value: riskProfile.allocation.debt, color: assetColors.debt },
      { name: 'Gold', value: riskProfile.allocation.gold, color: assetColors.gold },
      { name: 'Cash', value: riskProfile.allocation.cash, color: assetColors.cash }
    ];

    const barData = [
      { name: 'Conservative', return: 9, risk: 5 },
      { name: 'Moderate', return: 12, risk: 12 },
      { name: 'Aggressive', return: 16, risk: 20 }
    ];

    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="learning-card">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <CardTitle className="text-2xl">{t('riskAssessment.yourProfile')}</CardTitle>
            </div>
            <Badge 
              className="text-lg px-4 py-2" 
              style={{ backgroundColor: riskProfile.color }}
            >
              {riskProfile.type} Investor
            </Badge>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground leading-relaxed">
                {riskProfile.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Asset Allocation Pie Chart */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5" />
                  {t('riskAssessment.recommendations')}
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}: {item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk vs Return Comparison */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Risk vs Return Comparison
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="return" fill="#22c55e" name="Expected Return %" />
                      <Bar dataKey="risk" fill="#ef4444" name="Volatility %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 gap-3 mt-4">
                  <div className="p-3 bg-growth/10 rounded-lg border border-growth/20">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-growth" />
                      <span className="font-medium">Expected Return</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{riskProfile.expectedReturn}</span>
                  </div>
                  
                  <div className="p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-destructive" />
                      <span className="font-medium">Expected Volatility</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{riskProfile.volatility}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Recommendations */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Recommended Investment Products</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {riskProfile.type === 'Conservative' && (
                  <>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Fixed Deposits</h4>
                      <p className="text-sm text-muted-foreground">Safe, guaranteed returns</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Government Bonds</h4>
                      <p className="text-sm text-muted-foreground">Low risk, steady income</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Debt Mutual Funds</h4>
                      <p className="text-sm text-muted-foreground">Professional debt management</p>
                    </Card>
                  </>
                )}
                
                {riskProfile.type === 'Moderate' && (
                  <>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Balanced Mutual Funds</h4>
                      <p className="text-sm text-muted-foreground">Mix of equity and debt</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Large Cap Funds</h4>
                      <p className="text-sm text-muted-foreground">Stable large companies</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Index Funds</h4>
                      <p className="text-sm text-muted-foreground">Market-linked returns</p>
                    </Card>
                  </>
                )}
                
                {riskProfile.type === 'Aggressive' && (
                  <>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Small Cap Funds</h4>
                      <p className="text-sm text-muted-foreground">High growth potential</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Sectoral Funds</h4>
                      <p className="text-sm text-muted-foreground">Focused sector exposure</p>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-medium mb-2">Individual Stocks</h4>
                      <p className="text-sm text-muted-foreground">Direct equity investment</p>
                    </Card>
                  </>
                )}
              </div>
            </div>

            <div className="text-center pt-4">
              <Button onClick={() => window.location.reload()} className="w-full md:w-auto">
                Retake Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl flex items-center justify-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          {t('riskAssessment.title')}
        </CardTitle>
        <Progress value={progress} className="w-full h-2 mt-4" />
        <p className="text-sm text-muted-foreground">
          Question {currentQuestion + 1} of {riskQuestions.length}
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
            {currentQuestion === riskQuestions.length - 1 ? "Get My Profile" : "Next Question"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};