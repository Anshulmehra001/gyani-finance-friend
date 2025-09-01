import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GyaniChat } from "@/components/GyaniChat";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { LearningModule } from "@/components/LearningModule";
import { FinancialHealthCheck } from "@/components/FinancialHealthCheck";
import { StockMarketEducation } from "@/components/StockMarketEducation";
import { VirtualTradingPlatform } from "@/components/VirtualTradingPlatform";
import { RiskAssessmentTool } from "@/components/RiskAssessmentTool";
import { LanguageSelector } from "@/components/LanguageSelector";
import { MarketDataSimulator } from "@/components/MarketDataSimulator";
import { QuizSystem } from "@/components/QuizSystem";
import { Heart, BookOpen, MessageCircle, BarChart3, Sparkles, TrendingUp, Shield, Target } from "lucide-react";
import gyaniAvatar from "@/assets/gyani-mascot.jpg";
import "@/i18n";

const Index = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("welcome");
  const [userName, setUserName] = useState("Financial Explorer");
  const [showHealthCheck, setShowHealthCheck] = useState(false);

  const handleStartJourney = () => {
    setActiveTab("chat");
  };

  const handleHealthCheckComplete = (results: { score: number; recommendations: string[] }) => {
    console.log("Health check completed:", results);
    setShowHealthCheck(false);
    setActiveTab("dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-growth-light/5 to-trust-light/5">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src={gyaniAvatar} 
                  alt="Gyani - Your Financial Guide" 
                  className="w-24 h-24 rounded-full border-4 border-primary/20 shadow-lg"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-celebration to-warmth rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Meet Gyani, Your
              <span className="block bg-gradient-to-r from-primary to-growth-glow bg-clip-text text-transparent">
                Financial Friend
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Learn investing and personal finance in a fun, encouraging way. 
              No jargon, no judgment – just your supportive guide on the journey to financial confidence! 🌱
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={handleStartJourney} size="lg" className="text-lg px-8">
                <Heart className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
              <Button 
                onClick={() => setShowHealthCheck(true)} 
                variant="outline" 
                size="lg" 
                className="text-lg px-8"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Take Health Check
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Health Check Modal */}
      {showHealthCheck && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Financial Health Check</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowHealthCheck(false)}
                >
                  ✕
                </Button>
              </div>
              <FinancialHealthCheck onComplete={handleHealthCheckComplete} />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Comprehensive Investment Education</h2>
          <LanguageSelector />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="welcome" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">{t('welcome')}</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t('chat')}</span>
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">{t('learn')}</span>
            </TabsTrigger>
            <TabsTrigger value="trading" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">{t('trading')}</span>
            </TabsTrigger>
            <TabsTrigger value="risk" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">{t('risk')}</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">{t('progress')}</span>
            </TabsTrigger>
            <TabsTrigger value="market" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Market</span>
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span className="hidden sm:inline">Quiz</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="welcome" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="learning-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Encouraging & Patient
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Gyani is your biggest cheerleader! No judgment, just gentle guidance and celebration of your progress. 🌟
                  </p>
                </CardContent>
              </Card>

              <Card className="learning-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-accent" />
                    Relatable & Empathetic
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Finance can be scary! Gyani understands your feelings and makes complex topics digestible with fun analogies. ❄️
                  </p>
                </CardContent>
              </Card>

              <Card className="learning-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-growth" />
                    Wise but Humble
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Expert knowledge shared with humility. Gyani speaks in plain language and is always curious about you! 🤔
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Ready to begin?</h3>
              <p className="text-muted-foreground mb-6">
                Start with a friendly chat or dive into your personalized dashboard
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => setActiveTab("chat")}>
                  Chat with Gyani
                </Button>
                <Button variant="outline" onClick={() => setActiveTab("dashboard")}>
                  View Dashboard
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <div className="flex justify-center">
              <GyaniChat 
                initialMessage="Hello! Welcome to FinGyan AI! I'm Gyani, and I'm absolutely thrilled you're here! 🌟 Think of me as your friendly financial guide who's here to make your money journey as encouraging and fun as possible. What's your name? I'd love to get to know you better!"
                onUserResponse={(response) => {
                  console.log("User responded:", response);
                }}
              />
            </div>
          </TabsContent>

          <TabsContent value="dashboard">
            <ProgressDashboard 
              userName={userName}
              achievements={["First Steps", "Knowledge Seeker", "Curiosity Champion"]}
              currentStreak={3}
              onNavigateToEducation={() => setActiveTab("education")}
              onNavigateToTrading={() => setActiveTab("trading")}
              onTakeChallenge={() => setShowHealthCheck(true)}
            />
          </TabsContent>

          <TabsContent value="education">
            <StockMarketEducation 
              onModuleComplete={(moduleId) => {
                console.log("Module completed:", moduleId);
                setActiveTab("dashboard");
              }}
            />
          </TabsContent>

          <TabsContent value="trading">
            <VirtualTradingPlatform />
          </TabsContent>

          <TabsContent value="risk">
            <div className="flex justify-center">
              <RiskAssessmentTool />
            </div>
          </TabsContent>

          <TabsContent value="market">
            <MarketDataSimulator />
          </TabsContent>

          <TabsContent value="quiz">
            <QuizSystem 
              onComplete={(result) => {
                console.log("Quiz completed:", result);
                setActiveTab("dashboard");
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;