import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Globe, 
  RefreshCw,
  Clock,
  AlertCircle,
  Activity,
  DollarSign,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
}

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  sector: string;
  pe: number;
  high52w: number;
  low52w: number;
}

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  category: 'market' | 'company' | 'economy' | 'policy';
  timestamp: string;
  impact: 'positive' | 'negative' | 'neutral';
  relatedStocks?: string[];
}

const generateMarketData = (): { indices: MarketIndex[], stocks: Stock[], news: NewsItem[] } => {
  const indices: MarketIndex[] = [
    {
      name: "NIFTY 50",
      value: 19500 + (Math.random() - 0.5) * 400,
      change: (Math.random() - 0.5) * 100,
      changePercent: (Math.random() - 0.5) * 2,
      high: 19800,
      low: 19200,
      volume: "₹45,230 Cr"
    },
    {
      name: "SENSEX",
      value: 65000 + (Math.random() - 0.5) * 1000,
      change: (Math.random() - 0.5) * 300,
      changePercent: (Math.random() - 0.5) * 2,
      high: 65800,
      low: 64200,
      volume: "₹38,450 Cr"
    },
    {
      name: "NIFTY BANK",
      value: 43500 + (Math.random() - 0.5) * 800,
      change: (Math.random() - 0.5) * 200,
      changePercent: (Math.random() - 0.5) * 3,
      high: 44200,
      low: 42800,
      volume: "₹12,340 Cr"
    },
    {
      name: "NIFTY IT",
      value: 31200 + (Math.random() - 0.5) * 600,
      change: (Math.random() - 0.5) * 150,
      changePercent: (Math.random() - 0.5) * 2.5,
      high: 31800,
      low: 30600,
      volume: "₹8,920 Cr"
    }
  ];

  const stocksData = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', sector: 'Energy', basePrice: 2450 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT', basePrice: 3890 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', sector: 'Banking', basePrice: 1680 },
    { symbol: 'INFY', name: 'Infosys Ltd', sector: 'IT', basePrice: 1535 },
    { symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', sector: 'Banking', basePrice: 1145 },
    { symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', sector: 'FMCG', basePrice: 2400 },
    { symbol: 'ITC', name: 'ITC Ltd', sector: 'FMCG', basePrice: 487 },
    { symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking', basePrice: 623 },
    { symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', sector: 'Telecom', basePrice: 1156 },
    { symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', sector: 'Paints', basePrice: 3245 }
  ];

  const stocks: Stock[] = stocksData.map(stock => {
    const change = (Math.random() - 0.5) * 50;
    const price = stock.basePrice + change;
    const changePercent = (change / stock.basePrice) * 100;
    
    return {
      symbol: stock.symbol,
      name: stock.name,
      price: parseFloat(price.toFixed(2)),
      change: parseFloat(change.toFixed(2)),
      changePercent: parseFloat(changePercent.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 100000,
      marketCap: `₹${Math.floor(Math.random() * 500000) + 50000} Cr`,
      sector: stock.sector,
      pe: parseFloat((Math.random() * 30 + 10).toFixed(2)),
      high52w: parseFloat((price * (1 + Math.random() * 0.3)).toFixed(2)),
      low52w: parseFloat((price * (1 - Math.random() * 0.3)).toFixed(2))
    };
  });

  const newsItems: NewsItem[] = [
    {
      id: '1',
      title: 'RBI Keeps Repo Rate Unchanged at 6.5%',
      summary: 'Reserve Bank of India maintains status quo on policy rates, citing inflation concerns and growth stability.',
      category: 'policy',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      impact: 'neutral',
      relatedStocks: ['HDFCBANK', 'ICICIBANK', 'SBIN']
    },
    {
      id: '2',
      title: 'IT Sector Shows Strong Q3 Results',
      summary: 'Major IT companies report better-than-expected earnings with strong guidance for next quarter.',
      category: 'company',
      timestamp: new Date(Date.now() - Math.random() * 7200000).toISOString(),
      impact: 'positive',
      relatedStocks: ['TCS', 'INFY']
    },
    {
      id: '3',
      title: 'Oil Prices Surge on Global Supply Concerns',
      summary: 'Crude oil prices jump 3% amid geopolitical tensions, benefiting energy sector stocks.',
      category: 'market',
      timestamp: new Date(Date.now() - Math.random() * 10800000).toISOString(),
      impact: 'positive',
      relatedStocks: ['RELIANCE']
    },
    {
      id: '4',
      title: 'SEBI Introduces New Regulations for F&O Trading',
      summary: 'Market regulator announces stricter norms for derivatives trading to protect retail investors.',
      category: 'policy',
      timestamp: new Date(Date.now() - Math.random() * 14400000).toISOString(),
      impact: 'neutral'
    },
    {
      id: '5',
      title: 'Telecom Sector Faces Revenue Pressure',
      summary: 'Industry analysts predict challenging times ahead due to intense competition and regulatory changes.',
      category: 'company',
      timestamp: new Date(Date.now() - Math.random() * 18000000).toISOString(),
      impact: 'negative',
      relatedStocks: ['BHARTIARTL']
    }
  ];

  return { indices, stocks, news: newsItems };
};

export const MarketDataSimulator = () => {
  const { toast } = useToast();
  const [marketData, setMarketData] = useState<{ indices: MarketIndex[], stocks: Stock[], news: NewsItem[] }>({
    indices: [],
    stocks: [],
    news: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setMarketData(generateMarketData());
      setLastUpdated(new Date());
      setIsLoading(false);
      toast({
        title: "Market Data Updated",
        description: "Latest market information has been loaded",
      });
    }, 1000);
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(refreshData, 30000); // Update every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-50 border-green-200';
      case 'negative': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'market': return <BarChart3 className="w-4 h-4" />;
      case 'company': return <Activity className="w-4 h-4" />;
      case 'economy': return <DollarSign className="w-4 h-4" />;
      case 'policy': return <AlertCircle className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Live Market Data</h2>
          <p className="text-muted-foreground">Real-time simulation • Educational purposes only</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <Button
            onClick={refreshData}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={() => setAutoRefresh(!autoRefresh)}
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
          >
            <Zap className="w-4 h-4 mr-2" />
            Auto Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="indices" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="indices">Market Indices</TabsTrigger>
          <TabsTrigger value="stocks">Top Stocks</TabsTrigger>
          <TabsTrigger value="news">Market News</TabsTrigger>
        </TabsList>

        <TabsContent value="indices" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketData.indices.map((index) => (
              <Card key={index.name} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {index.name}
                    <Badge variant="outline" className="text-xs">
                      Live
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-2xl font-bold">
                        {index.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                      </div>
                      <div className={`flex items-center gap-1 text-sm ${
                        index.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {index.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>
                        <div>High: {index.high.toLocaleString('en-IN')}</div>
                        <div>Low: {index.low.toLocaleString('en-IN')}</div>
                      </div>
                      <div>
                        <div>Volume:</div>
                        <div className="font-medium">{index.volume}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stocks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Stocks by Market Cap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {marketData.stocks.map((stock) => (
                  <div key={stock.symbol} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-sm text-muted-foreground">{stock.name}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {stock.sector}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 text-right">
                      <div>
                        <div className="font-medium">₹{stock.price.toFixed(2)}</div>
                        <div className={`text-sm flex items-center gap-1 ${
                          stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">Market Cap</div>
                        <div className="font-medium text-sm">{stock.marketCap}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground">P/E Ratio</div>
                        <div className="font-medium text-sm">{stock.pe}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {marketData.news.map((news) => (
              <Card key={news.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(news.category)}
                      <Badge variant="outline" className="text-xs capitalize">
                        {news.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getImpactColor(news.impact)}`}>
                        {news.impact}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(news.timestamp)}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    {news.summary}
                  </p>
                  
                  {news.relatedStocks && news.relatedStocks.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Related:</span>
                      <div className="flex gap-1">
                        {news.relatedStocks.map((stock) => (
                          <Badge key={stock} variant="secondary" className="text-xs">
                            {stock}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};