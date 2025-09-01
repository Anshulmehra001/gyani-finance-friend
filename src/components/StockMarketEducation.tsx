import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Building2, 
  Shield, 
  Target,
  BookOpen,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Zap,
  Play,
  Clock,
  Users,
  Award,
  ChevronLeft,
  ChevronRight,
  Star,
  DollarSign,
  PieChart,
  Calculator
} from "lucide-react";

interface StockEducationModule {
  id: string;
  title: string;
  icon: React.ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  estimatedTime: number; // in minutes
  topics: string[];
  completed: boolean;
  rating: number;
  studentsEnrolled: number;
  description: string;
  learningOutcomes: string[];
  prerequisites?: string[];
}

interface LessonContent {
  title: string;
  content: string;
  keyPoints: string[];
  examples?: string[];
  quiz?: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
}

// Comprehensive educational modules with detailed content
const educationModules: StockEducationModule[] = [
  {
    id: 'basics',
    title: 'Stock Market Fundamentals',
    icon: <Building2 className="w-6 h-6" />,
    difficulty: 'Beginner',
    duration: '2 hours',
    estimatedTime: 120,
    topics: ['What are Stocks?', 'Stock Exchanges', 'NSE vs BSE', 'Market Hours', 'Types of Orders', 'Market Participants'],
    completed: false,
    rating: 4.8,
    studentsEnrolled: 15420,
    description: 'Master the fundamentals of stock markets with comprehensive coverage of Indian stock exchanges, trading basics, and market mechanics.',
    learningOutcomes: [
      'Understand what stocks represent and how they work',
      'Learn about Indian stock exchanges (NSE & BSE)',
      'Master different types of trading orders',
      'Understand market participants and their roles'
    ]
  },
  {
    id: 'indices',
    title: 'Market Indices & Benchmarks',
    icon: <BarChart3 className="w-6 h-6" />,
    difficulty: 'Beginner',
    duration: '1.5 hours',
    estimatedTime: 90,
    topics: ['NIFTY 50 Deep Dive', 'SENSEX Analysis', 'Sectoral Indices', 'Market Capitalization', 'Index Construction', 'Weightage Methods'],
    completed: false,
    rating: 4.7,
    studentsEnrolled: 12350,
    description: 'Comprehensive guide to understanding market indices, their construction, and how to use them for investment decisions.',
    learningOutcomes: [
      'Understand how NIFTY 50 and SENSEX are calculated',
      'Learn about different sectoral indices',
      'Master market cap classifications',
      'Use indices for portfolio benchmarking'
    ]
  },
  {
    id: 'fundamental-analysis',
    title: 'Fundamental Analysis Mastery',
    icon: <Calculator className="w-6 h-6" />,
    difficulty: 'Intermediate',
    duration: '3 hours',
    estimatedTime: 180,
    topics: ['Financial Statements', 'Ratio Analysis', 'P/E, P/B, ROE', 'Cash Flow Analysis', 'Industry Comparison', 'Valuation Models'],
    completed: false,
    rating: 4.9,
    studentsEnrolled: 8750,
    description: 'Deep dive into fundamental analysis with practical examples from Indian companies and real-world case studies.',
    learningOutcomes: [
      'Read and analyze financial statements',
      'Calculate and interpret key financial ratios',
      'Perform company valuation using multiple methods',
      'Compare companies within industries'
    ],
    prerequisites: ['Stock Market Fundamentals']
  },
  {
    id: 'technical-analysis',
    title: 'Technical Analysis & Chart Patterns',
    icon: <TrendingUp className="w-6 h-6" />,
    difficulty: 'Intermediate',
    duration: '2.5 hours',
    estimatedTime: 150,
    topics: ['Chart Types', 'Candlestick Patterns', 'Technical Indicators', 'Support & Resistance', 'Trend Analysis', 'Trading Strategies'],
    completed: false,
    rating: 4.6,
    studentsEnrolled: 9200,
    description: 'Master technical analysis with hands-on chart reading, pattern recognition, and indicator-based trading strategies.',
    learningOutcomes: [
      'Read different types of charts effectively',
      'Identify key candlestick patterns',
      'Use technical indicators for decision making',
      'Develop systematic trading strategies'
    ]
  },
  {
    id: 'risk-management',
    title: 'Risk Management & Portfolio Theory',
    icon: <Shield className="w-6 h-6" />,
    difficulty: 'Intermediate',
    duration: '2 hours',
    estimatedTime: 120,
    topics: ['Risk Types', 'Diversification', 'Position Sizing', 'Stop Loss Strategies', 'Portfolio Allocation', 'Risk-Return Analysis'],
    completed: false,
    rating: 4.8,
    studentsEnrolled: 7800,
    description: 'Learn professional risk management techniques used by successful investors and fund managers.',
    learningOutcomes: [
      'Identify and measure different types of risks',
      'Build diversified portfolios',
      'Implement effective stop-loss strategies',
      'Optimize risk-return ratios'
    ]
  },
  {
    id: 'mutual-funds',
    title: 'Mutual Funds & ETF Investing',
    icon: <PieChart className="w-6 h-6" />,
    difficulty: 'Beginner',
    duration: '2 hours',
    estimatedTime: 120,
    topics: ['Types of Mutual Funds', 'SIP vs Lump Sum', 'ETF Mechanics', 'Expense Ratios', 'Fund Selection', 'Tax Implications'],
    completed: false,
    rating: 4.7,
    studentsEnrolled: 11500,
    description: 'Complete guide to mutual fund investing with practical tips for fund selection and portfolio construction.',
    learningOutcomes: [
      'Choose the right mutual funds for your goals',
      'Understand SIP benefits and strategies',
      'Compare mutual funds vs ETFs',
      'Optimize tax efficiency in fund investing'
    ]
  },
  {
    id: 'derivatives',
    title: 'Derivatives Trading (F&O)',
    icon: <Zap className="w-6 h-6" />,
    difficulty: 'Advanced',
    duration: '4 hours',
    estimatedTime: 240,
    topics: ['Futures Contracts', 'Options Strategies', 'Greeks Analysis', 'Hedging Techniques', 'Arbitrage', 'Risk Management in F&O'],
    completed: false,
    rating: 4.5,
    studentsEnrolled: 5200,
    description: 'Advanced derivatives trading covering futures, options, and complex strategies for experienced traders.',
    learningOutcomes: [
      'Trade futures and options effectively',
      'Understand and use the Greeks',
      'Implement hedging strategies',
      'Manage risks in derivative trading'
    ],
    prerequisites: ['Fundamental Analysis', 'Technical Analysis', 'Risk Management']
  },
  {
    id: 'taxation',
    title: 'Investment Taxation in India',
    icon: <DollarSign className="w-6 h-6" />,
    difficulty: 'Intermediate',
    duration: '1.5 hours',
    estimatedTime: 90,
    topics: ['Capital Gains Tax', 'LTCG vs STCG', 'Tax-Saving Investments', 'Section 80C', 'TDS on Investments', 'Tax Planning'],
    completed: false,
    rating: 4.6,
    studentsEnrolled: 6800,
    description: 'Master investment taxation in India with practical examples and tax-saving strategies.',
    learningOutcomes: [
      'Calculate capital gains tax correctly',
      'Optimize tax-saving investments',
      'Understand TDS implications',
      'Plan investments for tax efficiency'
    ]
  }
];

// Detailed lesson content for each module
const lessonContent: Record<string, LessonContent[]> = {
  'basics': [
    {
      title: 'What are Stocks?',
      content: `Stocks represent ownership shares in a company. When you buy a stock, you become a partial owner of that business and have a claim on its assets and earnings.

Think of it like this: Imagine a pizza cut into 100 slices. If a company issues 100 shares and you buy 10 shares, you own 10% of that company - just like owning 10 slices of the pizza!

In India, stocks are traded on two main exchanges: NSE (National Stock Exchange) and BSE (Bombay Stock Exchange). Companies list their shares on these exchanges to raise capital from public investors.`,
      keyPoints: [
        'Stocks = Ownership in a company',
        'Share price reflects company value',
        'Dividends = Share of company profits',
        'Capital appreciation = Stock price increase'
      ],
      examples: [
        'Reliance Industries: If you own 100 shares of RIL, you own a tiny part of India\'s largest private company',
        'TCS: As a shareholder, you benefit when TCS wins big IT contracts and grows'
      ],
      quiz: {
        question: 'What does owning a stock represent?',
        options: [
          'Lending money to a company',
          'Owning a part of the company',
          'Buying company products',
          'Working for the company'
        ],
        correctAnswer: 1,
        explanation: 'Owning a stock means you own a part of the company and have a claim on its assets and future earnings.'
      }
    },
    {
      title: 'Stock Exchanges: NSE vs BSE',
      content: `Stock exchanges are like organized marketplaces where buyers and sellers trade stocks. India has two major exchanges:

**NSE (National Stock Exchange):**
- Established in 1992
- More modern technology
- Higher trading volumes
- Home to NIFTY 50 index
- Faster order execution

**BSE (Bombay Stock Exchange):**
- Asia's oldest exchange (1875)
- Home to SENSEX index
- More listed companies
- Rich heritage and tradition

Both exchanges are regulated by SEBI (Securities and Exchange Board of India) and offer similar stocks, but NSE generally has better liquidity and technology.`,
      keyPoints: [
        'NSE: Modern, high-tech, NIFTY 50',
        'BSE: Oldest, traditional, SENSEX',
        'Both regulated by SEBI',
        'Similar stocks available on both'
      ],
      examples: [
        'Most active traders prefer NSE for better liquidity',
        'BSE has more small and mid-cap companies listed'
      ]
    },
    {
      title: 'Market Hours & Trading Sessions',
      content: `Indian stock markets operate on specific schedules:

**Regular Trading Hours:**
- Pre-opening: 9:00 AM - 9:15 AM
- Normal Trading: 9:15 AM - 3:30 PM
- Post-closing: 3:40 PM - 4:00 PM

**Special Sessions:**
- After Market Orders (AMO): 3:45 PM - 8:57 AM (next day)
- Block Deal Window: 9:15 AM - 9:50 AM
- Bulk Deal Window: 9:15 AM - 3:30 PM

**Market Holidays:**
- Weekends (Saturday & Sunday)
- National holidays (Diwali, Holi, etc.)
- Exchange-specific holidays

Understanding these timings is crucial for effective trading and investment decisions.`,
      keyPoints: [
        'Main trading: 9:15 AM - 3:30 PM',
        'Pre-opening session for price discovery',
        'AMO for placing orders after hours',
        'No trading on weekends and holidays'
      ]
    }
  ],
  'indices': [
    {
      title: 'NIFTY 50: India\'s Premier Index',
      content: `NIFTY 50 represents the top 50 companies listed on NSE by market capitalization. It's a free-float market capitalization weighted index.

**How NIFTY 50 Works:**
- Base year: 1995 (Base value: 1000)
- Covers ~65% of total market cap
- Reviewed semi-annually
- Represents 13 sectors

**NIFTY 50 Companies Include:**
- Reliance Industries (Highest weightage ~10%)
- TCS, Infosys (IT sector)
- HDFC Bank, ICICI Bank (Banking)
- Asian Paints, Hindustan Unilever (FMCG)

The index is calculated in real-time and serves as a benchmark for mutual funds and portfolio performance.`,
      keyPoints: [
        'Top 50 companies by market cap',
        'Free-float weighted methodology',
        'Covers ~65% of total market',
        'Benchmark for fund performance'
      ],
      examples: [
        'If NIFTY rises 1%, it means the average of top 50 stocks went up',
        'NIFTY ETFs track this index exactly'
      ]
    },
    {
      title: 'SENSEX: The Bombay Stock Exchange Benchmark',
      content: `SENSEX (Sensitive Index) is BSE's flagship index comprising 30 well-established companies.

**SENSEX Features:**
- Base year: 1978-79 (Base value: 100)
- 30 largest and most liquid stocks
- Free-float market cap weighted
- Oldest index in India

**Key Differences from NIFTY:**
- Fewer companies (30 vs 50)
- Older history (1978 vs 1995)
- BSE-based vs NSE-based
- Similar but not identical composition

Both indices generally move in the same direction but NIFTY 50 is more diversified due to more companies.`,
      keyPoints: [
        '30 largest BSE companies',
        'Oldest Indian stock index',
        'Similar movement to NIFTY',
        'Base value 100 (1978-79)'
      ]
    }
  ]
  // Add more lesson content for other modules...
};

interface StockMarketEducationProps {
  onModuleComplete?: (moduleId: string) => void;
}

export const StockMarketEducation = ({ onModuleComplete }: StockMarketEducationProps) => {
  const [modules, setModules] = useState<StockEducationModule[]>(educationModules);
  const [selectedModule, setSelectedModule] = useState<StockEducationModule | null>(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('gyani-education-progress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setModules(prev => prev.map(module => ({
          ...module,
          completed: progress[module.id] || false
        })));
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (moduleId: string, completed: boolean) => {
    const savedProgress = localStorage.getItem('gyani-education-progress');
    let progress = {};
    
    if (savedProgress) {
      try {
        progress = JSON.parse(savedProgress);
      } catch (error) {
        console.error('Error parsing saved progress:', error);
      }
    }
    
    progress[moduleId] = completed;
    localStorage.setItem('gyani-education-progress', JSON.stringify(progress));
  };

  const completedModules = modules.filter(m => m.completed).length;
  const totalModules = modules.length;
  const progressPercentage = (completedModules / totalModules) * 100;

  const handleModuleComplete = (moduleId: string) => {
    setModules(prev => prev.map(m => 
      m.id === moduleId ? { ...m, completed: true } : m
    ));
    saveProgress(moduleId, true);
    setSelectedModule(null);
    setCurrentLessonIndex(0);
    setShowQuiz(false);
    setQuizAnswer(null);
    setShowQuizResult(false);
    onModuleComplete?.(moduleId);
  };

  const handleNextLesson = () => {
    if (!selectedModule) return;
    
    const lessons = lessonContent[selectedModule.id] || [];
    const currentLesson = lessons[currentLessonIndex];
    
    if (currentLesson?.quiz && !showQuiz) {
      setShowQuiz(true);
    } else if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
      setShowQuiz(false);
      setQuizAnswer(null);
      setShowQuizResult(false);
    } else {
      // Module completed
      handleModuleComplete(selectedModule.id);
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
      setShowQuiz(false);
      setQuizAnswer(null);
      setShowQuizResult(false);
    }
  };

  const handleQuizSubmit = () => {
    if (quizAnswer !== null) {
      setShowQuizResult(true);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '🌱';
      case 'Intermediate': return '🚀';
      case 'Advanced': return '🎯';
      default: return '📚';
    }
  };

  if (selectedModule) {
    const lessons = lessonContent[selectedModule.id] || [];
    const currentLesson = lessons[currentLessonIndex];
    const lessonProgress = ((currentLessonIndex + 1) / lessons.length) * 100;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Module Header */}
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => {
              setSelectedModule(null);
              setCurrentLessonIndex(0);
              setShowQuiz(false);
              setQuizAnswer(null);
              setShowQuizResult(false);
            }}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Courses
          </Button>
          <Badge className={getDifficultyColor(selectedModule.difficulty)}>
            {getDifficultyIcon(selectedModule.difficulty)} {selectedModule.difficulty}
          </Badge>
        </div>

        {/* Progress Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              {selectedModule.icon}
              <div className="flex-1">
                <CardTitle className="text-2xl">{selectedModule.title}</CardTitle>
                <p className="text-muted-foreground">
                  Lesson {currentLessonIndex + 1} of {lessons.length} • {selectedModule.duration}
                </p>
              </div>
            </div>
            <Progress value={lessonProgress} className="h-2" />
          </CardHeader>
        </Card>

        {/* Lesson Content */}
        {currentLesson && !showQuiz && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" />
                {currentLesson.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-gray max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {currentLesson.content}
                </div>
              </div>

              {/* Key Points */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Key Points to Remember
                </h4>
                <ul className="space-y-2">
                  {currentLesson.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-blue-800">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-blue-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Examples */}
              {currentLesson.examples && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Real-World Examples
                  </h4>
                  <ul className="space-y-2">
                    {currentLesson.examples.map((example, index) => (
                      <li key={index} className="text-green-800">
                        • {example}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6">
                <Button 
                  variant="outline" 
                  disabled={currentLessonIndex === 0}
                  onClick={handlePreviousLesson}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <span className="text-sm text-muted-foreground">
                  {currentLessonIndex + 1} of {lessons.length} lessons
                </span>
                
                <Button onClick={handleNextLesson} className="flex items-center gap-2">
                  {currentLesson.quiz && !showQuiz ? 'Take Quiz' : 
                   currentLessonIndex === lessons.length - 1 ? 'Complete Module' : 'Next Lesson'}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quiz Section */}
        {showQuiz && currentLesson?.quiz && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Quick Quiz: {currentLesson.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-900 mb-4">
                  {currentLesson.quiz.question}
                </h4>
                <div className="space-y-3">
                  {currentLesson.quiz.options.map((option, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="quiz-answer"
                        value={index}
                        checked={quizAnswer === index}
                        onChange={() => setQuizAnswer(index)}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-yellow-800">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {showQuizResult && (
                <div className={`p-4 rounded-lg ${
                  quizAnswer === currentLesson.quiz.correctAnswer 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <h4 className={`font-semibold mb-2 ${
                    quizAnswer === currentLesson.quiz.correctAnswer 
                      ? 'text-green-900' 
                      : 'text-red-900'
                  }`}>
                    {quizAnswer === currentLesson.quiz.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
                  </h4>
                  <p className={
                    quizAnswer === currentLesson.quiz.correctAnswer 
                      ? 'text-green-800' 
                      : 'text-red-800'
                  }>
                    {currentLesson.quiz.explanation}
                  </p>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousLesson}>
                  Back to Lesson
                </Button>
                {!showQuizResult ? (
                  <Button 
                    onClick={handleQuizSubmit}
                    disabled={quizAnswer === null}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button onClick={handleNextLesson}>
                    {currentLessonIndex === lessons.length - 1 ? 'Complete Module' : 'Next Lesson'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Main modules grid view
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Your Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">{completedModules}</div>
              <div className="text-sm text-muted-foreground">Modules Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {modules.reduce((acc, m) => acc + m.estimatedTime, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Minutes</div>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {totalModules - completedModules} modules remaining
          </p>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <Card
            key={module.id}
            className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
              module.completed 
                ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => {
              setSelectedModule(module);
              setCurrentLessonIndex(0);
              setShowQuiz(false);
              setQuizAnswer(null);
              setShowQuizResult(false);
            }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  {module.icon}
                </div>
                {module.completed && (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                )}
              </div>
              
              <CardTitle className="text-lg leading-tight">{module.title}</CardTitle>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getDifficultyColor(module.difficulty)}>
                  {getDifficultyIcon(module.difficulty)} {module.difficulty}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {module.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {module.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {module.studentsEnrolled.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  {module.rating}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-medium text-muted-foreground">
                  What you'll learn:
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {module.topics.slice(0, 3).map((topic, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {topic}
                    </li>
                  ))}
                  {module.topics.length > 3 && (
                    <li className="text-primary text-xs">
                      +{module.topics.length - 3} more topics
                    </li>
                  )}
                </ul>
              </div>

              {module.prerequisites && (
                <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                  Prerequisites: {module.prerequisites.join(', ')}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Official Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            Official Learning Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="https://www.sebi.gov.in/investor-education.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 rounded-lg border border-blue-200 hover:border-blue-400 transition-colors"
            >
              <h4 className="font-semibold text-blue-900 mb-2">SEBI Investor Education</h4>
              <p className="text-sm text-blue-700">
                Official guidelines and educational material from India's market regulator
              </p>
            </a>
            
            <a 
              href="https://www.nseindia.com/education" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 rounded-lg border border-green-200 hover:border-green-400 transition-colors"
            >
              <h4 className="font-semibold text-green-900 mb-2">NSE Academy</h4>
              <p className="text-sm text-green-700">
                Professional certification courses and market insights from NSE
              </p>
            </a>
            
            <a 
              href="https://www.bseindia.com/education/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-4 rounded-lg border border-purple-200 hover:border-purple-400 transition-colors"
            >
              <h4 className="font-semibold text-purple-900 mb-2">BSE Institute</h4>
              <p className="text-sm text-purple-700">
                Professional trading and investment courses from Asia's oldest exchange
              </p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};