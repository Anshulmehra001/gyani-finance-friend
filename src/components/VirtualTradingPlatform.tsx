import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3,
  ArrowUpDown,
  Target,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

// Mock stock data - In production, this would come from a real API
const mockStocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2456.75, change: 23.45, changePercent: 0.96 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3891.20, change: -45.30, changePercent: -1.15 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank Limited', price: 1678.90, change: 12.35, changePercent: 0.74 },
  { symbol: 'INFY', name: 'Infosys Limited', price: 1534.60, change: -8.75, changePercent: -0.57 },
  { symbol: 'ITC', name: 'ITC Limited', price: 487.25, change: 5.40, changePercent: 1.12 },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever', price: 2398.45, change: -15.20, changePercent: -0.63 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank Limited', price: 1145.30, change: 28.90, changePercent: 2.59 },
  { symbol: 'SBIN', name: 'State Bank of India', price: 623.15, change: 8.25, changePercent: 1.34 }
];

interface Holding {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  totalValue: number;
  pnl: number;
  pnlPercent: number;
}

interface Trade {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  timestamp: Date;
  total: number;
}

export const VirtualTradingPlatform = () => {
  const { t } = useTranslation();
  const [balance, setBalance] = useState(100000); // Starting with ₹1,00,000
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [trades, setTrades] = useState<Trade[]>([]);
  const [selectedStock, setSelectedStock] = useState(mockStocks[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("market");

  // Calculate portfolio metrics
  const portfolioValue = balance + holdings.reduce((sum, holding) => sum + holding.totalValue, 0);
  const totalInvested = 100000 - balance;
  const totalPnL = holdings.reduce((sum, holding) => sum + holding.pnl, 0);
  const totalPnLPercent = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update mock stock prices slightly
      mockStocks.forEach(stock => {
        const change = (Math.random() - 0.5) * 10; // Random price movement
        stock.price = parseFloat((stock.price + change).toFixed(2));
        stock.change = change;
        stock.changePercent = (change / (stock.price - change)) * 100;
      });

      // Update holdings with new prices
      setHoldings(prev => prev.map(holding => {
        const currentStock = mockStocks.find(s => s.symbol === holding.symbol);
        if (currentStock) {
          const totalValue = holding.quantity * currentStock.price;
          const pnl = totalValue - (holding.quantity * holding.avgPrice);
          const pnlPercent = ((currentStock.price - holding.avgPrice) / holding.avgPrice) * 100;
          
          return {
            ...holding,
            currentPrice: currentStock.price,
            totalValue,
            pnl,
            pnlPercent
          };
        }
        return holding;
      }));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleBuy = () => {
    const total = selectedStock.price * quantity;
    
    if (total > balance) {
      toast.error("Insufficient funds for this purchase!");
      return;
    }

    // Create trade record
    const trade: Trade = {
      id: Date.now().toString(),
      symbol: selectedStock.symbol,
      type: 'BUY',
      quantity,
      price: selectedStock.price,
      timestamp: new Date(),
      total
    };

    // Update balance
    setBalance(prev => prev - total);
    
    // Update holdings
    setHoldings(prev => {
      const existingHolding = prev.find(h => h.symbol === selectedStock.symbol);
      
      if (existingHolding) {
        const newQuantity = existingHolding.quantity + quantity;
        const newAvgPrice = ((existingHolding.avgPrice * existingHolding.quantity) + total) / newQuantity;
        const totalValue = newQuantity * selectedStock.price;
        const pnl = totalValue - (newQuantity * newAvgPrice);
        const pnlPercent = ((selectedStock.price - newAvgPrice) / newAvgPrice) * 100;
        
        return prev.map(h => 
          h.symbol === selectedStock.symbol 
            ? { ...h, quantity: newQuantity, avgPrice: newAvgPrice, totalValue, pnl, pnlPercent }
            : h
        );
      } else {
        return [...prev, {
          symbol: selectedStock.symbol,
          name: selectedStock.name,
          quantity,
          avgPrice: selectedStock.price,
          currentPrice: selectedStock.price,
          totalValue: total,
          pnl: 0,
          pnlPercent: 0
        }];
      }
    });

    setTrades(prev => [trade, ...prev]);
    toast.success(`Successfully bought ${quantity} shares of ${selectedStock.symbol}!`);
    setQuantity(1);
  };

  const handleSell = (holding: Holding) => {
    const sellQuantity = Math.min(quantity, holding.quantity);
    const total = selectedStock.price * sellQuantity;

    // Create trade record
    const trade: Trade = {
      id: Date.now().toString(),
      symbol: holding.symbol,
      type: 'SELL',
      quantity: sellQuantity,
      price: selectedStock.price,
      timestamp: new Date(),
      total
    };

    // Update balance
    setBalance(prev => prev + total);

    // Update holdings
    setHoldings(prev => {
      return prev.map(h => {
        if (h.symbol === holding.symbol) {
          const newQuantity = h.quantity - sellQuantity;
          if (newQuantity === 0) {
            return null; // Will be filtered out
          }
          const totalValue = newQuantity * h.currentPrice;
          const pnl = totalValue - (newQuantity * h.avgPrice);
          const pnlPercent = ((h.currentPrice - h.avgPrice) / h.avgPrice) * 100;
          
          return { ...h, quantity: newQuantity, totalValue, pnl, pnlPercent };
        }
        return h;
      }).filter(Boolean) as Holding[];
    });

    setTrades(prev => [trade, ...prev]);
    toast.success(`Successfully sold ${sellQuantity} shares of ${holding.symbol}!`);
    setQuantity(1);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="learning-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              {t('virtualTrading.portfolioValue')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              ₹{portfolioValue.toLocaleString('en-IN')}
            </div>
          </CardContent>
        </Card>

        <Card className="learning-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-accent" />
              {t('virtualTrading.balance')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{balance.toLocaleString('en-IN')}
            </div>
          </CardContent>
        </Card>

        <Card className="learning-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-growth" />
              Invested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{totalInvested.toLocaleString('en-IN')}
            </div>
          </CardContent>
        </Card>

        <Card className="learning-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-celebration" />
              Total P&L
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-growth' : 'text-destructive'}`}>
              ₹{totalPnL.toLocaleString('en-IN')}
              <span className="text-sm ml-2">
                ({totalPnLPercent >= 0 ? '+' : ''}{totalPnLPercent.toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stock List */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Live Market Data</CardTitle>
                <p className="text-sm text-muted-foreground">
                  🔴 Real-time simulation • Updates every 5 seconds
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockStocks.map((stock) => (
                    <div
                      key={stock.symbol}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedStock.symbol === stock.symbol ? 'bg-primary/5 border-primary/30' : ''
                      }`}
                      onClick={() => setSelectedStock(stock)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-sm text-muted-foreground truncate">
                            {stock.name}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{stock.price.toFixed(2)}</div>
                          <div className={`text-sm flex items-center gap-1 ${
                            stock.change >= 0 ? 'text-growth' : 'text-destructive'
                          }`}>
                            {stock.change >= 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} 
                            ({stock.changePercent.toFixed(2)}%)
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trading Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="w-5 h-5" />
                  Trade {selectedStock.symbol}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Current Price
                  </label>
                  <div className="text-2xl font-bold text-primary">
                    ₹{selectedStock.price.toFixed(2)}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t('virtualTrading.quantity')}
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Total Cost:</span>
                    <span className="font-medium">
                      ₹{(selectedStock.price * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    onClick={handleBuy} 
                    className="w-full"
                    disabled={selectedStock.price * quantity > balance}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {t('virtualTrading.buyStock')}
                  </Button>

                  {holdings.find(h => h.symbol === selectedStock.symbol) && (
                    <Button 
                      onClick={() => handleSell(holdings.find(h => h.symbol === selectedStock.symbol)!)}
                      variant="outline" 
                      className="w-full"
                    >
                      <TrendingDown className="w-4 h-4 mr-2" />
                      {t('virtualTrading.sellStock')}
                    </Button>
                  )}
                </div>

                {selectedStock.price * quantity > balance && (
                  <div className="flex items-center gap-2 text-destructive text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    Insufficient funds
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('virtualTrading.holdings')}</CardTitle>
            </CardHeader>
            <CardContent>
              {holdings.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <PieChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No holdings yet. Start by buying some stocks!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {holdings.map((holding) => (
                    <div key={holding.symbol} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{holding.symbol}</div>
                          <div className="text-sm text-muted-foreground">
                            {holding.quantity} shares @ ₹{holding.avgPrice.toFixed(2)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ₹{holding.totalValue.toLocaleString('en-IN')}
                          </div>
                          <div className={`text-sm ${
                            holding.pnl >= 0 ? 'text-growth' : 'text-destructive'
                          }`}>
                            {holding.pnl >= 0 ? '+' : ''}₹{holding.pnl.toFixed(2)} 
                            ({holding.pnlPercent >= 0 ? '+' : ''}{holding.pnlPercent.toFixed(2)}%)
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trade History</CardTitle>
            </CardHeader>
            <CardContent>
              {trades.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No trades yet. Make your first trade!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {trades.slice(0, 10).map((trade) => (
                    <div key={trade.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={trade.type === 'BUY' ? 'default' : 'secondary'}
                              className={trade.type === 'BUY' ? 'bg-growth' : 'bg-destructive'}
                            >
                              {trade.type}
                            </Badge>
                            <span className="font-medium">{trade.symbol}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {trade.quantity} shares @ ₹{trade.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            ₹{trade.total.toLocaleString('en-IN')}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {trade.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="learning-card">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Trades:</span>
                  <span className="font-medium">{trades.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Win Rate:</span>
                  <span className="font-medium">
                    {trades.length > 0 ? 
                      Math.round((holdings.filter(h => h.pnl > 0).length / holdings.length) * 100) : 0
                    }%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Best Performer:</span>
                  <span className="font-medium text-growth">
                    {holdings.length > 0 ? 
                      holdings.reduce((prev, current) => 
                        (prev.pnlPercent > current.pnlPercent) ? prev : current
                      ).symbol : 'N/A'
                    }
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="learning-card">
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {Math.min(trades.length * 10, 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Trading Experience Level
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Trades Completed:</span>
                    <span>{trades.length}/10</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((trades.length / 10) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};