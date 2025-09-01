const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the React app build directory (if it exists)
const distPath = path.join(__dirname, '../dist');
if (require('fs').existsSync(distPath)) {
  app.use(express.static(distPath));
}

const OPENAI_KEY = process.env.OPENAI_API_KEY || '';
const GOOGLE_KEY = process.env.GOOGLE_API_KEY || '';

// Helper: join messages into a single prompt for providers that don't accept chat format
function messagesToPrompt(messages = []) {
	return messages.map(m => `${m.role}: ${m.content}`).join('\n\n');
}

// Enhanced Gyani-specific chat endpoint
app.post('/api/chat', async (req, res) => {
	try {
		const { provider = 'openai', model = 'gpt-4o-mini', messages = [], maxTokens = 512 } = req.body;

		if (!Array.isArray(messages) || messages.length === 0) {
			return res.status(400).json({ error: 'messages array required' });
		}

		// Add Gyani personality to the system message
		const systemMessage = {
			role: 'system',
			content: `You are Gyani, a friendly, encouraging, and patient financial education assistant. Your personality traits:
			- Encouraging & Patient: You're the user's biggest cheerleader, offering gentle guidance without judgment
			- Relatable & Empathetic: You understand that finance can be scary and use fun analogies to make complex topics digestible
			- Wise but Humble: You share expert knowledge in plain language and stay curious about the user
			- Use emojis appropriately to keep conversations warm and friendly
			- Focus on Indian financial context (NSE, BSE, SEBI, etc.) when relevant
			- Keep responses concise but informative
			- Always encourage learning and celebrate progress`
		};

		const enhancedMessages = [systemMessage, ...messages];

		// OpenAI
		if (provider === 'openai') {
			if (!OPENAI_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY not set' });

			const payload = { model, messages: enhancedMessages, max_tokens: maxTokens };

			const r = await axios.post('https://api.openai.com/v1/chat/completions', payload, {
				headers: {
					'Authorization': `Bearer ${OPENAI_KEY}`,
					'Content-Type': 'application/json'
				}
			});

			const reply = r.data?.choices?.[0]?.message?.content || '';
			return res.json({ provider: 'openai', reply, raw: r.data });
		}

		// Google / Gemini (alias)
		if (provider === 'google' || provider === 'gemini') {
			if (!GOOGLE_KEY) return res.status(500).json({ error: 'GOOGLE_API_KEY not set' });

			// Use the current Gemini API format
			const modelName = model || 'gemini-pro';
			const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GOOGLE_KEY}`;
			
			// Convert messages to Gemini format
			const contents = enhancedMessages.filter(m => m.role !== 'system').map(msg => ({
				role: msg.role === 'assistant' ? 'model' : 'user',
				parts: [{ text: msg.content }]
			}));

			// Add system message as first user message if exists
			const systemMsg = enhancedMessages.find(m => m.role === 'system');
			if (systemMsg) {
				contents.unshift({
					role: 'user',
					parts: [{ text: `System instructions: ${systemMsg.content}` }]
				});
			}

			const body = {
				contents,
				generationConfig: {
					maxOutputTokens: maxTokens,
					temperature: 0.7
				}
			};

			const r = await axios.post(url, body, {
				headers: { 'Content-Type': 'application/json' }
			});

			const candidates = r.data?.candidates || [];
			const reply = candidates[0]?.content?.parts?.[0]?.text || '';
			return res.json({ provider: 'google', reply, raw: r.data });
		}

		// Fallback for demo purposes
		if (provider === 'local' || !OPENAI_KEY) {
			const lastMessage = messages[messages.length - 1]?.content || '';
			const demoResponse = generateDemoResponse(lastMessage);
			return res.json({ provider: 'demo', reply: demoResponse });
		}

		return res.status(400).json({ error: 'unsupported provider' });
	} catch (err) {
		console.error(err?.response?.data || err.message || err);
		const message = err?.response?.data || { message: err.message || 'unknown error' };
		return res.status(500).json({ error: message });
	}
});

// Demo response generator for when API keys aren't available
function generateDemoResponse(userInput) {
	const input = userInput.toLowerCase();
	
	if (input.includes('hello') || input.includes('hi')) {
		return "Hello! I'm Gyani, your friendly financial guide! 🌟 I'm here to help you learn about investing and personal finance in a fun, encouraging way. What would you like to explore today?";
	}
	
	if (input.includes('stock') || input.includes('invest')) {
		return "Great question about investing! 📈 Stocks represent ownership in companies. When you buy a stock, you become a part-owner of that business. The Indian stock market has two main exchanges - NSE and BSE. Would you like to learn more about how to get started?";
	}
	
	if (input.includes('save') || input.includes('money')) {
		return "Saving money is such a smart move! 💰 I always tell people to think of saving like planting seeds - the earlier you start, the bigger your financial tree grows! A good rule of thumb is the 50-30-20 rule: 50% needs, 30% wants, 20% savings. What's your current saving goal?";
	}
	
	return "That's a thoughtful question! 🤔 I'm here to help you understand finance better. Whether it's about saving, investing, or planning for the future, we can explore it together step by step. What specific area would you like to focus on?";
}

// Market data simulation for educational purposes
const generateMarketData = () => {
	const stocks = [
		{ symbol: 'RELIANCE', name: 'Reliance Industries Ltd', sector: 'Energy' },
		{ symbol: 'TCS', name: 'Tata Consultancy Services', sector: 'IT' },
		{ symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', sector: 'Banking' },
		{ symbol: 'INFY', name: 'Infosys Ltd', sector: 'IT' },
		{ symbol: 'ICICIBANK', name: 'ICICI Bank Ltd', sector: 'Banking' },
		{ symbol: 'HINDUNILVR', name: 'Hindustan Unilever Ltd', sector: 'FMCG' },
		{ symbol: 'ITC', name: 'ITC Ltd', sector: 'FMCG' },
		{ symbol: 'SBIN', name: 'State Bank of India', sector: 'Banking' },
		{ symbol: 'BHARTIARTL', name: 'Bharti Airtel Ltd', sector: 'Telecom' },
		{ symbol: 'ASIANPAINT', name: 'Asian Paints Ltd', sector: 'Paints' }
	];

	return stocks.map(stock => {
		const basePrice = Math.random() * 2000 + 100;
		const change = (Math.random() - 0.5) * 20;
		const changePercent = (change / basePrice) * 100;
		
		return {
			...stock,
			price: parseFloat(basePrice.toFixed(2)),
			change: parseFloat(change.toFixed(2)),
			changePercent: parseFloat(changePercent.toFixed(2)),
			volume: Math.floor(Math.random() * 1000000) + 10000,
			high: parseFloat((basePrice + Math.abs(change) * 1.5).toFixed(2)),
			low: parseFloat((basePrice - Math.abs(change) * 1.5).toFixed(2)),
			marketCap: Math.floor(Math.random() * 500000) + 50000,
			pe: parseFloat((Math.random() * 30 + 5).toFixed(2)),
			lastUpdated: new Date().toISOString()
		};
	});
};

// Market data endpoint
app.get('/api/market-data', (_req, res) => {
	try {
		const marketData = generateMarketData();
		res.json({
			success: true,
			data: marketData,
			indices: {
				nifty50: {
					value: 19500 + (Math.random() - 0.5) * 200,
					change: (Math.random() - 0.5) * 50,
					changePercent: (Math.random() - 0.5) * 2
				},
				sensex: {
					value: 65000 + (Math.random() - 0.5) * 500,
					change: (Math.random() - 0.5) * 100,
					changePercent: (Math.random() - 0.5) * 2
				}
			},
			timestamp: new Date().toISOString()
		});
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// Virtual trading endpoints
app.post('/api/virtual-trading/portfolio', (req, res) => {
	try {
		const { userId, action, symbol, quantity, price } = req.body;
		
		// Simulate portfolio update
		const portfolio = {
			userId,
			totalValue: 100000, // Starting with 1 lakh
			availableCash: 50000,
			holdings: [
				{ symbol: 'RELIANCE', quantity: 10, avgPrice: 2500, currentPrice: 2520 },
				{ symbol: 'TCS', quantity: 5, avgPrice: 3200, currentPrice: 3180 }
			],
			transactions: [
				{
					id: Date.now(),
					symbol,
					action,
					quantity,
					price,
					timestamp: new Date().toISOString()
				}
			]
		};
		
		res.json({ success: true, portfolio });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// Educational content translation endpoint
app.post('/api/translate', async (req, res) => {
	try {
		const { text, targetLanguage = 'hi' } = req.body;
		
		// Simple translation simulation for demo
		const translations = {
			'Stock Market': 'शेयर बाजार',
			'Investment': 'निवेश',
			'Portfolio': 'पोर्टफोलियो',
			'Risk': 'जोखिम',
			'Return': 'रिटर्न',
			'Dividend': 'लाभांश',
			'Market Cap': 'बाजार पूंजीकरण',
			'P/E Ratio': 'पी/ई अनुपात'
		};
		
		let translatedText = text;
		Object.keys(translations).forEach(key => {
			translatedText = translatedText.replace(new RegExp(key, 'gi'), translations[key]);
		});
		
		res.json({
			success: true,
			originalText: text,
			translatedText,
			targetLanguage
		});
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// Learning progress tracking
app.post('/api/progress', (req, res) => {
	try {
		const { userId, moduleId, progress, completed } = req.body;
		
		// Simulate progress saving
		const progressData = {
			userId,
			moduleId,
			progress,
			completed,
			timestamp: new Date().toISOString(),
			achievements: completed ? ['Module Completed'] : []
		};
		
		res.json({ success: true, data: progressData });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// Quiz system endpoint
app.post('/api/quiz/submit', (req, res) => {
	try {
		const { quizId, answers, userId } = req.body;
		
		// Simulate quiz evaluation
		const score = Math.floor(Math.random() * 40) + 60; // 60-100%
		const result = {
			quizId,
			userId,
			score,
			passed: score >= 70,
			feedback: score >= 90 ? 'Excellent!' : score >= 70 ? 'Good job!' : 'Keep learning!',
			timestamp: new Date().toISOString()
		};
		
		res.json({ success: true, result });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// Risk assessment endpoint
app.post('/api/risk-assessment', (req, res) => {
	try {
		const { answers } = req.body;
		
		// Simple risk scoring algorithm
		const totalScore = answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
		const maxScore = answers.length * 5;
		const riskScore = (totalScore / maxScore) * 100;
		
		let riskProfile = 'Conservative';
		if (riskScore > 70) riskProfile = 'Aggressive';
		else if (riskScore > 40) riskProfile = 'Moderate';
		
		const recommendations = {
			Conservative: [
				'Focus on fixed deposits and government bonds',
				'Consider debt mutual funds',
				'Limit equity exposure to 20-30%'
			],
			Moderate: [
				'Balanced portfolio with 50-60% equity',
				'Diversify across sectors',
				'Consider SIP investments'
			],
			Aggressive: [
				'Higher equity allocation (70-80%)',
				'Consider growth stocks',
				'Explore derivatives with caution'
			]
		};
		
		res.json({
			success: true,
			riskProfile,
			score: Math.round(riskScore),
			recommendations: recommendations[riskProfile]
		});
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
	res.json({ 
		status: 'ok', 
		message: 'Gyani server is running!',
		features: [
			'AI Chat',
			'Market Data Simulation',
			'Virtual Trading',
			'Educational Content',
			'Risk Assessment',
			'Progress Tracking'
		]
	});
});

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (_req, res) => {
	const indexPath = path.join(__dirname, '../dist/index.html');
	if (require('fs').existsSync(indexPath)) {
		res.sendFile(indexPath);
	} else {
		res.json({ 
			message: 'Gyani API Server', 
			status: 'Frontend not built yet. Run `npm run build` to build the frontend.',
			endpoints: {
				health: '/api/health',
				chat: '/api/chat'
			}
		});
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🚀 Gyani server running on http://localhost:${PORT}`);
	console.log(`📊 API endpoints available at http://localhost:${PORT}/api/`);
});
