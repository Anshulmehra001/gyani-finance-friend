import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
    Brain,
    CheckCircle,
    XCircle,
    Trophy,
    Clock,
    Target,
    BookOpen,
    Zap,
    Star,
    RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    points: number;
}

interface QuizResult {
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    timeSpent: number;
    grade: string;
    achievements: string[];
}

const quizQuestions: QuizQuestion[] = [
    {
        id: '1',
        question: 'What does P/E ratio stand for in stock analysis?',
        options: [
            'Price to Equity ratio',
            'Price to Earnings ratio',
            'Profit to Expense ratio',
            'Portfolio to Equity ratio'
        ],
        correctAnswer: 1,
        explanation: 'P/E ratio stands for Price to Earnings ratio. It measures how much investors are willing to pay for each rupee of earnings.',
        difficulty: 'easy',
        category: 'Fundamental Analysis',
        points: 10
    },
    {
        id: '2',
        question: 'Which of the following is NOT a major stock exchange in India?',
        options: [
            'NSE (National Stock Exchange)',
            'BSE (Bombay Stock Exchange)',
            'LSE (London Stock Exchange)',
            'MCX (Multi Commodity Exchange)'
        ],
        correctAnswer: 2,
        explanation: 'LSE (London Stock Exchange) is located in the UK, not India. NSE and BSE are the major stock exchanges in India.',
        difficulty: 'easy',
        category: 'Stock Market Basics',
        points: 10
    },
    {
        id: '3',
        question: 'What is the full form of SIP in mutual fund investments?',
        options: [
            'Systematic Investment Plan',
            'Strategic Investment Portfolio',
            'Structured Investment Program',
            'Secure Investment Policy'
        ],
        correctAnswer: 0,
        explanation: 'SIP stands for Systematic Investment Plan, which allows investors to invest a fixed amount regularly in mutual funds.',
        difficulty: 'easy',
        category: 'Mutual Funds',
        points: 10
    },
    {
        id: '4',
        question: 'Which technical indicator is used to measure the momentum of price changes?',
        options: [
            'Moving Average',
            'RSI (Relative Strength Index)',
            'Bollinger Bands',
            'MACD'
        ],
        correctAnswer: 1,
        explanation: 'RSI (Relative Strength Index) is a momentum oscillator that measures the speed and change of price movements, ranging from 0 to 100.',
        difficulty: 'medium',
        category: 'Technical Analysis',
        points: 15
    },
    {
        id: '5',
        question: 'What is the maximum amount that can be invested in ELSS funds under Section 80C?',
        options: [
            '₹1,00,000',
            '₹1,50,000',
            '₹2,00,000',
            '₹2,50,000'
        ],
        correctAnswer: 1,
        explanation: 'Under Section 80C, the maximum deduction limit is ₹1,50,000 per financial year, which includes ELSS investments.',
        difficulty: 'medium',
        category: 'Tax Planning',
        points: 15
    },
    {
        id: '6',
        question: 'What is the concept of "Beta" in portfolio management?',
        options: [
            'A measure of dividend yield',
            'A measure of systematic risk relative to the market',
            'A measure of company profitability',
            'A measure of liquidity'
        ],
        correctAnswer: 1,
        explanation: 'Beta measures systematic risk - how much a stock moves relative to the overall market. A beta of 1 means it moves with the market.',
        difficulty: 'hard',
        category: 'Portfolio Management',
        points: 20
    },
    {
        id: '7',
        question: 'Which of the following is a characteristic of a bull market?',
        options: [
            'Falling stock prices',
            'High unemployment',
            'Rising stock prices and investor optimism',
            'Economic recession'
        ],
        correctAnswer: 2,
        explanation: 'A bull market is characterized by rising stock prices, investor optimism, and generally positive economic conditions.',
        difficulty: 'easy',
        category: 'Market Cycles',
        points: 10
    },
    {
        id: '8',
        question: 'What is the lock-in period for ELSS mutual funds?',
        options: [
            '1 year',
            '2 years',
            '3 years',
            '5 years'
        ],
        correctAnswer: 2,
        explanation: 'ELSS (Equity Linked Savings Scheme) funds have a mandatory lock-in period of 3 years, the shortest among all 80C investments.',
        difficulty: 'medium',
        category: 'Mutual Funds',
        points: 15
    },
    {
        id: '9',
        question: 'What does "Diversification" mean in investment?',
        options: [
            'Investing all money in one stock',
            'Spreading investments across different assets to reduce risk',
            'Only investing in government bonds',
            'Timing the market perfectly'
        ],
        correctAnswer: 1,
        explanation: 'Diversification means spreading investments across different assets, sectors, or geographies to reduce overall portfolio risk.',
        difficulty: 'easy',
        category: 'Risk Management',
        points: 10
    },
    {
        id: '10',
        question: 'What is the current repo rate set by RBI (as of 2024)?',
        options: [
            '5.5%',
            '6.0%',
            '6.5%',
            '7.0%'
        ],
        correctAnswer: 2,
        explanation: 'As of 2024, the RBI repo rate is 6.5%. The repo rate is the rate at which RBI lends money to commercial banks.',
        difficulty: 'medium',
        category: 'Economic Policy',
        points: 15
    }
];

interface QuizSystemProps {
    onComplete?: (result: QuizResult) => void;
    selectedCategory?: string;
    difficulty?: 'easy' | 'medium' | 'hard' | 'all';
}

export const QuizSystem = ({ onComplete, selectedCategory, difficulty = 'all' }: QuizSystemProps) => {
    const { toast } = useToast();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [timeSpent, setTimeSpent] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [filteredQuestions, setFilteredQuestions] = useState<QuizQuestion[]>([]);

    useEffect(() => {
        // Filter questions based on category and difficulty
        let filtered = quizQuestions;

        if (selectedCategory && selectedCategory !== 'all') {
            filtered = filtered.filter(q => q.category === selectedCategory);
        }

        if (difficulty !== 'all') {
            filtered = filtered.filter(q => q.difficulty === difficulty);
        }

        // Shuffle questions for variety
        filtered = filtered.sort(() => Math.random() - 0.5);

        setFilteredQuestions(filtered.slice(0, 10)); // Limit to 10 questions
        setUserAnswers(new Array(Math.min(filtered.length, 10)).fill(null));
    }, [selectedCategory, difficulty]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeSpent(Math.floor((new Date().getTime() - startTime.getTime()) / 1000));
        }, 1000);

        return () => clearInterval(timer);
    }, [startTime]);

    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;

    const handleAnswerSelect = (answerIndex: number) => {
        setSelectedAnswer(answerIndex);
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestionIndex] = answerIndex;
        setUserAnswers(newAnswers);
    };

    const handleNext = () => {
        if (selectedAnswer === null) {
            toast({
                title: "Please select an answer",
                description: "You need to choose an option before proceeding.",
                variant: "destructive"
            });
            return;
        }

        if (!showExplanation) {
            setShowExplanation(true);
            return;
        }

        if (currentQuestionIndex < filteredQuestions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedAnswer(userAnswers[currentQuestionIndex + 1]);
            setShowExplanation(false);
        } else {
            completeQuiz();
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setSelectedAnswer(userAnswers[currentQuestionIndex - 1]);
            setShowExplanation(false);
        }
    };

    const completeQuiz = () => {
        const correctAnswers = userAnswers.reduce((count, answer, index) => {
            return answer === filteredQuestions[index]?.correctAnswer ? (count || 0) + 1 : (count || 0);
        }, 0);

        const score = userAnswers.reduce((total, answer, index) => {
            const question = filteredQuestions[index];
            return answer === question?.correctAnswer ? (total || 0) + (question?.points || 0) : (total || 0);
        }, 0);

        const percentage = ((correctAnswers || 0) / filteredQuestions.length) * 100;
        let grade = 'F';
        if (percentage >= 90) grade = 'A+';
        else if (percentage >= 80) grade = 'A';
        else if (percentage >= 70) grade = 'B';
        else if (percentage >= 60) grade = 'C';
        else if (percentage >= 50) grade = 'D';

        const achievements = [];
        if (percentage === 100) achievements.push('Perfect Score!');
        if (percentage >= 90) achievements.push('Excellence Award');
        if (percentage >= 80) achievements.push('High Achiever');
        if (timeSpent < 300) achievements.push('Speed Demon'); // Less than 5 minutes
        if ((correctAnswers || 0) >= 5) achievements.push('Knowledge Seeker');

        const result: QuizResult = {
            score: score || 0,
            totalQuestions: filteredQuestions.length,
            correctAnswers: correctAnswers || 0,
            timeSpent,
            grade,
            achievements
        };

        setQuizCompleted(true);

        // Save result to localStorage
        const savedResults = JSON.parse(localStorage.getItem('quiz-results') || '[]');
        savedResults.push({
            ...result,
            timestamp: new Date().toISOString(),
            category: selectedCategory,
            difficulty
        });
        localStorage.setItem('quiz-results', JSON.stringify(savedResults));

        toast({
            title: "Quiz Completed!",
            description: `You scored ${correctAnswers || 0}/${filteredQuestions.length} (${percentage.toFixed(1)}%)`,
        });

        onComplete?.(result);
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setUserAnswers(new Array(filteredQuestions.length).fill(null));
        setStartTime(new Date());
        setTimeSpent(0);
        setQuizCompleted(false);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getDifficultyColor = (diff: string) => {
        switch (diff) {
            case 'easy': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'hard': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (filteredQuestions.length === 0) {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardContent className="text-center py-8">
                    <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No questions available for the selected criteria.</p>
                    <Button onClick={() => window.location.reload()} className="mt-4">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset Filters
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (quizCompleted) {
        const result = {
            score: userAnswers.reduce((total, answer, index) => {
                const question = filteredQuestions[index];
                return answer === question?.correctAnswer ? (total || 0) + (question?.points || 0) : (total || 0);
            }, 0),
            totalQuestions: filteredQuestions.length,
            correctAnswers: userAnswers.reduce((count, answer, index) => {
                return answer === filteredQuestions[index]?.correctAnswer ? (count || 0) + 1 : (count || 0);
            }, 0),
            timeSpent,
            grade: '',
            achievements: []
        };

        const percentage = ((result.correctAnswers || 0) / result.totalQuestions) * 100;

        return (
            <Card className="max-w-3xl mx-auto">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Trophy className="w-8 h-8 text-yellow-600" />
                        <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="p-4 bg-primary/10 rounded-lg">
                            <div className="text-3xl font-bold text-primary mb-2">
                                {result.correctAnswers || 0}/{result.totalQuestions}
                            </div>
                            <div className="text-sm text-muted-foreground">Correct Answers</div>
                        </div>

                        <div className="p-4 bg-green-50 rounded-lg">
                            <div className="text-3xl font-bold text-green-600 mb-2">
                                {percentage.toFixed(1)}%
                            </div>
                            <div className="text-sm text-muted-foreground">Accuracy</div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                {formatTime(timeSpent)}
                            </div>
                            <div className="text-sm text-muted-foreground">Time Taken</div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Badge className={`text-lg px-4 py-2 ${percentage >= 80 ? 'bg-green-600' :
                            percentage >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                            }`}>
                            {percentage >= 90 ? 'Excellent!' :
                                percentage >= 80 ? 'Very Good!' :
                                    percentage >= 60 ? 'Good!' : 'Keep Learning!'}
                        </Badge>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-center">Review Your Answers</h3>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {filteredQuestions.map((question, index) => {
                                const userAnswer = userAnswers[index];
                                const isCorrect = userAnswer === question.correctAnswer;

                                return (
                                    <div key={question.id} className={`p-3 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                                        }`}>
                                        <div className="flex items-start gap-3">
                                            {isCorrect ?
                                                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" /> :
                                                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                                            }
                                            <div className="flex-1">
                                                <div className="font-medium text-sm mb-1">
                                                    Q{index + 1}: {question.question}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    Your answer: {question.options[userAnswer || 0]}
                                                    {!isCorrect && (
                                                        <span className="block text-green-600 mt-1">
                                                            Correct: {question.options[question.correctAnswer]}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <Badge className={getDifficultyColor(question.difficulty)}>
                                                {question.difficulty}
                                            </Badge>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Button onClick={restartQuiz} variant="outline">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Retake Quiz
                        </Button>
                        <Button onClick={() => window.location.reload()}>
                            <BookOpen className="w-4 h-4 mr-2" />
                            New Quiz
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!currentQuestion) {
        return (
            <Card className="max-w-2xl mx-auto">
                <CardContent className="text-center py-8">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p>Loading quiz questions...</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Brain className="w-6 h-6 text-primary" />
                        <CardTitle>Financial Knowledge Quiz</CardTitle>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTime(timeSpent)}
                        </div>
                        <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {currentQuestionIndex + 1}/{filteredQuestions.length}
                        </div>
                    </div>
                </div>
                <Progress value={progress} className="h-2" />
            </CardHeader>

            <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                        {currentQuestion.difficulty}
                    </Badge>
                    <Badge variant="outline">
                        {currentQuestion.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4" />
                        {currentQuestion.points} points
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-6">{currentQuestion.question}</h3>

                    <RadioGroup
                        value={selectedAnswer?.toString()}
                        onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                        disabled={showExplanation}
                    >
                        <div className="space-y-3">
                            {currentQuestion.options.map((option, index) => {
                                let optionClass = "p-4 border rounded-lg cursor-pointer transition-colors";

                                if (showExplanation) {
                                    if (index === currentQuestion.correctAnswer) {
                                        optionClass += " bg-green-50 border-green-300";
                                    } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                                        optionClass += " bg-red-50 border-red-300";
                                    }
                                }

                                return (
                                    <div key={index} className={optionClass}>
                                        <div className="flex items-center space-x-3">
                                            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                                            <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                                                {option}
                                            </Label>
                                            {showExplanation && index === currentQuestion.correctAnswer && (
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                            )}
                                            {showExplanation && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                                                <XCircle className="w-5 h-5 text-red-600" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </RadioGroup>
                </div>

                {showExplanation && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start gap-2">
                            <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
                            <div>
                                <h4 className="font-medium text-blue-900 mb-2">Explanation</h4>
                                <p className="text-blue-800 text-sm">{currentQuestion.explanation}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex justify-between pt-4">
                    <Button
                        onClick={handlePrevious}
                        disabled={currentQuestionIndex === 0}
                        variant="outline"
                    >
                        Previous
                    </Button>

                    <Button onClick={handleNext}>
                        {showExplanation ? (
                            currentQuestionIndex === filteredQuestions.length - 1 ? "Finish Quiz" : "Next Question"
                        ) : (
                            "Submit Answer"
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};