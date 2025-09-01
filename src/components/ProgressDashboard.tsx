import React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Award, BookOpen, Target, Calendar, Clock, Star, Trophy, Zap, Brain } from "lucide-react";

interface ProgressDashboardProps {
  userName?: string;
  completedModules?: number;
  totalModules?: number;
  achievements?: string[];
  currentStreak?: number;
  onNavigateToEducation?: () => void;
  onNavigateToTrading?: () => void;
  onTakeChallenge?: () => void;
}

export const ProgressDashboard = ({ 
  userName = "Financial Explorer",
  completedModules: propCompletedModules,
  totalModules: propTotalModules,
  achievements = ["First Steps", "Knowledge Seeker"],
  currentStreak = 3,
  onNavigateToEducation,
  onNavigateToTrading,
  onTakeChallenge
}: ProgressDashboardProps) => {
  // Get real progress from localStorage
  const [realProgress, setRealProgress] = useState({ completed: 0, total: 8 });
  
  useEffect(() => {
    const savedProgress = localStorage.getItem('gyani-education-progress');
    let completedCount = 0;
    
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        completedCount = Object.values(progress).filter(Boolean).length;
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
    
    setRealProgress({ completed: completedCount, total: 8 });
  }, []);

  const completedModules = realProgress.completed;
  const totalModules = realProgress.total;
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
  const knowledgeLevel = completedModules < 2 ? "Beginner" : completedModules < 5 ? "Intermediate" : "Advanced";
  const totalTimeSpent = completedModules * 120; // More realistic time estimate
  const weeklyGoal = 3; // More realistic weekly goal
  const weeklyProgress = Math.min((completedModules / weeklyGoal) * 100, 100);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, {userName}! 🌟
        </h2>
        <p className="text-muted-foreground text-lg">
          Your financial knowledge is growing every day
        </p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <Badge variant="outline" className="text-sm px-3 py-1">
            <Brain className="w-4 h-4 mr-1" />
            {knowledgeLevel} Level
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1">
            <Clock className="w-4 h-4 mr-1" />
            {totalTimeSpent} min learned
          </Badge>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Learning Progress */}
        <Card className="learning-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{completedModules} of {totalModules} modules</span>
                <span className="text-primary font-medium">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {totalModules - completedModules} modules remaining
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Current Streak */}
        <Card className="learning-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-celebration" />
              Learning Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-celebration mb-1">
                {currentStreak}
              </div>
              <p className="text-xs text-muted-foreground">days in a row!</p>
              <div className="mt-2">
                <Badge variant="secondary" className="text-xs">
                  🔥 On Fire!
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Goal */}
        <Card className="learning-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              Weekly Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{Math.min(completedModules, weeklyGoal)} of {weeklyGoal} modules</span>
                <span className="text-accent font-medium">{Math.round(weeklyProgress)}%</span>
              </div>
              <Progress value={weeklyProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {weeklyProgress >= 100 ? "Goal achieved! 🎉" : `${weeklyGoal - Math.min(completedModules, weeklyGoal)} more to go`}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Knowledge Level */}
        <Card className="learning-card bg-gradient-to-br from-growth-light to-growth-glow/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-growth" />
              Knowledge Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-growth mb-1">
                {knowledgeLevel}
              </div>
              <p className="text-xs text-muted-foreground">Keep it up! 🚀</p>
              <div className="mt-2">
                {knowledgeLevel === "Advanced" && (
                  <Badge className="text-xs bg-growth text-growth-foreground">
                    <Star className="w-3 h-3 mr-1" />
                    Expert
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements Section */}
      <Card className="learning-card">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            Your Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-accent/10 border border-accent/20">
                <Award className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">{achievement}</span>
              </div>
            ))}
            {/* Potential achievements */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-muted">
              <Award className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Week Warrior</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-muted">
              <Award className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Market Master</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Path & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Learning Path */}
        <Card className="learning-card">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Your Learning Path
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-primary">Stock Market Basics</h4>
                  <p className="text-xs text-muted-foreground">Understanding the fundamentals</p>
                </div>
                <Badge className="ml-auto">✓ Done</Badge>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-accent">Market Indices</h4>
                  <p className="text-xs text-muted-foreground">NIFTY, SENSEX, and more</p>
                </div>
                <Badge variant="outline" className="ml-auto">Current</Badge>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-muted">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-muted-foreground">Fundamental Analysis</h4>
                  <p className="text-xs text-muted-foreground">Evaluating company value</p>
                </div>
                <Badge variant="secondary" className="ml-auto">Next</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="learning-card">
          <CardHeader>
            <CardTitle className="text-lg">Continue Your Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-growth-light/10 border border-primary/20">
                <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Next Module
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Market Indices: Understanding NIFTY & SENSEX
                </p>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={onNavigateToEducation}
                >
                  Start Learning
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-to-r from-accent/10 to-trust-light/10 border border-accent/20">
                <h4 className="font-medium text-accent mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Daily Challenge
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn about emergency funds and financial planning
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={onTakeChallenge}
                >
                  Take Challenge
                </Button>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-to-r from-celebration/10 to-warmth/10 border border-celebration/20">
                <h4 className="font-medium text-celebration mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Practice Trading
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Try virtual trading with ₹1,00,000 virtual money
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={onNavigateToTrading}
                >
                  Start Trading
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};