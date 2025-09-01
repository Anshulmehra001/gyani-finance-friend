import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Heart, TrendingUp } from "lucide-react";
import gyaniAvatar from "@/assets/gyani-mascot.jpg";

interface Message {
  id: string;
  content: string;
  isGyani: boolean;
  timestamp: Date;
  emoji?: string;
}

interface GyaniChatProps {
  initialMessage?: string;
  onUserResponse?: (response: string) => void;
}

export const GyaniChat = ({ initialMessage, onUserResponse }: GyaniChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: initialMessage || "Hey there! I'm Gyani, your friendly financial guide! 🌱 What's your name? I'd love to get to know you better!",
      isGyani: true,
      timestamp: new Date(),
      emoji: "👋"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isGyani: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue("");
    setIsTyping(true);
    
    if (onUserResponse) {
      onUserResponse(currentInput);
    }

    try {
      // Try to call the backend API first
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          provider: 'openai',
          model: 'gpt-4o-mini',
          messages: [
            ...messages.filter(m => !m.isGyani).map(m => ({ role: 'user', content: m.content })),
            { role: 'user', content: currentInput }
          ],
          maxTokens: 512
        })
      });

      if (response.ok) {
        const data = await response.json();
        const gyaniMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.reply || 'Sorry, I had trouble understanding that. Could you try rephrasing?',
          isGyani: true,
          timestamp: new Date(),
          emoji: "🤖"
        };
        
        setMessages(prev => [...prev, gyaniMessage]);
      } else {
        throw new Error('API call failed');
      }
    } catch (error) {
      // Fallback to local response generation
      console.log('Using fallback response generation');
      const gyaniResponse = generateGyaniResponse(currentInput);
      const gyaniMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: gyaniResponse.message,
        isGyani: true,
        timestamp: new Date(),
        emoji: gyaniResponse.emoji
      };
      
      setMessages(prev => [...prev, gyaniMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateGyaniResponse = (userInput: string): { message: string; emoji: string } => {
    const input = userInput.toLowerCase();
    
    // Name introduction
    if (input.includes("name") || input.includes("i'm") || input.includes("my name")) {
      return {
        message: `Nice to meet you! I'm so glad you're here. 😊 I'm here to make your financial journey as smooth and enjoyable as possible. Think of me as your patient, encouraging friend who happens to know a thing or two about money! Ready to start with a quick Financial Health Check? It's just a friendly chat to understand where you are right now.`,
        emoji: "🤝"
      };
    }
    
    // Positive responses
    if (input.includes("yes") || input.includes("ready") || input.includes("sure")) {
      return {
        message: `Awesome! I love your enthusiasm! 🌟 Let's start simple. On a scale of 1-5, how confident do you feel about your current financial situation? (1 being "help!" and 5 being "I've got this!") Remember, there's no wrong answer here - we're just getting to know each other!`,
        emoji: "📊"
      };
    }
    
    // Numbers (financial confidence rating)
    if (/[1-5]/.test(input)) {
      const confidence = parseInt(input);
      if (confidence <= 2) {
        return {
          message: `Thank you for being so honest with me! 💙 That takes courage, and you're already taking the most important step by being here. We're going to work together to build your confidence step by step. No pressure at all - just learning and growing together! Would you like to start with the basics of saving?`,
          emoji: "🌱"
        };
      } else if (confidence >= 4) {
        return {
          message: `Wow, that's fantastic! 🎉 I can already tell you've got great instincts. Even confident folks like you can discover new strategies and fine-tune their approach. How about we explore some advanced concepts like compound interest? It's one of my favorite topics - I call it the "snowball effect"!`,
          emoji: "⭐"
        };
      } else {
        return {
          message: `That's a great place to be! 👍 You've got some foundation, and now we can build on it together. I think you'll really enjoy learning some new concepts. Would you like to dive into a fun topic like compound interest? I have this amazing snowball analogy that makes it super clear!`,
          emoji: "🎯"
        };
      }
    }
    
    // Default encouraging response
    return {
      message: `I hear you! 😊 Every step in your financial journey is important, and I'm here to support you no matter what. Would you like to share a bit more about what brought you here today? Or shall we jump into something fun like learning about how money can grow over time?`,
      emoji: "💚"
    };
  };

  return (
    <Card className="w-full max-w-md mx-auto h-96 flex flex-col">
      <div className="p-4 border-b bg-gradient-to-r from-primary to-growth-glow text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-3">
          <img 
            src={gyaniAvatar} 
            alt="Gyani" 
            className="w-10 h-10 rounded-full border-2 border-primary-foreground/20"
          />
          <div>
            <h3 className="font-semibold">Gyani</h3>
            <p className="text-sm opacity-90">Your Financial Guide</p>
          </div>
          <Heart className="w-4 h-4 ml-auto opacity-80" />
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isGyani ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[80%] ${
                message.isGyani 
                  ? 'gyani-bubble text-primary-foreground' 
                  : 'user-bubble'
              }`}>
                {message.isGyani && (
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src={gyaniAvatar} 
                      alt="Gyani" 
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium opacity-90">Gyani</span>
                    {message.emoji && <span>{message.emoji}</span>}
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="gyani-bubble text-primary-foreground max-w-[80%]">
                <div className="flex items-center gap-2 mb-2">
                  <img 
                    src={gyaniAvatar} 
                    alt="Gyani" 
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm font-medium opacity-90">Gyani</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            size="icon"
            disabled={!inputValue.trim() || isTyping}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};