import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { CheckCircle, ArrowRight, Snowflake } from "lucide-react";

interface LearningModuleProps {
  onComplete?: () => void;
}

export const LearningModule = ({ onComplete }: LearningModuleProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [sliderValue, setSliderValue] = useState([1000]);
  const [years] = useState([10]);
  
  const steps = [
    {
      title: "Meet the Snowball! ❄️",
      content: "Imagine your money is a small snowball at the top of a hill. As it rolls down, it picks up more snow and gets bigger and bigger, all by itself. That's compound interest!",
      interactive: false
    },
    {
      title: "See It In Action! 🎯",
      content: "Let's watch your money snowball grow! Move the slider to see how different amounts grow over 10 years with compound interest.",
      interactive: true
    },
    {
      title: "The Magic Number 🪄",
      content: "At 7% annual growth, your money doubles roughly every 10 years. That means $1,000 becomes $2,000, then $4,000, then $8,000! The snowball keeps getting bigger!",
      interactive: false
    }
  ];

  const calculateCompoundInterest = (principal: number, rate: number = 0.07, time: number = 10) => {
    return Math.round(principal * Math.pow(1 + rate, time));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete?.();
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;
  const currentStepData = steps[currentStep];
  const finalAmount = calculateCompoundInterest(sliderValue[0]);
  const growth = finalAmount - sliderValue[0];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Snowflake className="w-6 h-6 text-accent" />
          <CardTitle className="text-xl">Compound Interest: The Snowball Effect</CardTitle>
        </div>
        <Progress value={progressPercentage} className="w-full h-2" />
        <p className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">{currentStepData.title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {currentStepData.content}
          </p>
        </div>

        {currentStepData.interactive && (
          <div className="space-y-6 p-6 bg-gradient-to-br from-primary/5 to-growth-light/10 rounded-xl border border-primary/10">
            <div className="space-y-4">
              <div className="text-center">
                <label className="text-sm font-medium text-muted-foreground">
                  Starting Amount: ${sliderValue[0].toLocaleString()}
                </label>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  min={100}
                  max={10000}
                  step={100}
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-card rounded-lg border">
                  <div className="text-2xl font-bold text-primary">
                    ${sliderValue[0].toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Starting Amount</div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-growth/10 to-growth-glow/10 rounded-lg border border-growth/20">
                  <div className="text-2xl font-bold text-growth">
                    +${growth.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Growth (10 years)</div>
                </div>

                <div className="p-4 bg-gradient-to-r from-celebration/10 to-warmth/10 rounded-lg border border-celebration/20">
                  <div className="text-2xl font-bold text-celebration">
                    ${finalAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Final Amount</div>
                </div>
              </div>

              <div className="text-center p-4 bg-accent/5 rounded-lg border border-accent/10">
                <p className="text-sm text-muted-foreground">
                  That's a <span className="font-bold text-accent">
                    {Math.round(((finalAmount - sliderValue[0]) / sliderValue[0]) * 100)}%
                  </span> increase! 🎉
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {currentStep > 0 && <CheckCircle className="w-4 h-4 text-growth" />}
            {currentStep > 0 && "Previous steps completed"}
          </div>
          
          <Button onClick={handleNext} className="flex items-center gap-2">
            {currentStep === steps.length - 1 ? "Complete Module" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};