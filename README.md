# 🌟 Gyani - Your AI-Powered Financial Education Companion

**Making Finance Learning Fun and Accessible**

Gyani is a friendly financial education platform that helps retail investors learn about investing and personal finance in an encouraging, judgment-free environment. Built to solve the problem of retail investors lacking knowledge to navigate securities markets, this platform combines AI-powered guidance with interactive learning and educational tools.

![Gyani Logo](src/assets/gyani-mascot.jpg)

## 🎯 Problem Statement

Many retail investors lack the knowledge to navigate the securities market, leading to poor investment decisions or reliance on unverified advice. Additionally, most online sources of information for retail investors are in English, creating a lack of educative material in various vernacular languages.

## 💡 Solution

Gyani provides:
- **AI-Powered Chat**: Friendly, encouraging AI companion for personalized financial guidance
- **Interactive Education**: Learning modules covering stock market basics and investment strategies
- **Virtual Trading**: Risk-free practice with simulated portfolio management
- **Risk Assessment**: Personalized investment recommendations based on risk profile
- **Progress Tracking**: Visual dashboard to track your learning journey
- **Multilingual Support**: Interface available in English, Hindi, and Telugu

## 🚀 Key Features

### 🤖 AI-Powered Learning Assistant
- **Gyani Chat**: Friendly, encouraging AI companion with personality
- **Multi-Provider Support**: OpenAI GPT-4 and Google Gemini integration with fallbacks
- **Demo Mode**: Works without API keys using built-in responses
- **Indian Market Focus**: Specialized knowledge of NSE, BSE, SEBI regulations
- **Encouraging Tone**: Patient, supportive guidance without judgment

### 📚 Educational Content
- **Learning Modules**: Stock market basics and investment strategies
- **Interactive Quizzes**: Knowledge testing with explanations
- **Progress Tracking**: Visual completion statistics
- **Financial Health Check**: Comprehensive assessment tool
- **Risk Assessment**: Personalized investment recommendations

### � AVirtual Trading Platform
- **Portfolio Simulation**: Practice trading with virtual money
- **Market Data Simulation**: Educational stock price simulation
- **Transaction Tracking**: Record of virtual trades
- **Performance Analytics**: Basic P&L tracking

### 🎯 User Experience
- **Learning Dashboard**: Progress visualization and achievements
- **Multilingual Interface**: English, Hindi, and Telugu support
- **Responsive Design**: Works on desktop and mobile
- **Local Storage**: Progress saved in browser
- **Intuitive Navigation**: Easy-to-use tabbed interface

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for beautiful, accessible components
- **React Router** for navigation
- **React Query** for state management
- **i18next** for internationalization

### Backend
- **Node.js** with Express
- **OpenAI API** integration
- **Google Gemini API** integration
- **CORS** for cross-origin requests
- **dotenv** for environment management

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **Concurrently** for running multiple processes
- **Nodemon** for development server

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or newer) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **OpenAI API Key** (optional but recommended) - [Get one here](https://platform.openai.com/api-keys)
- **Google API Key** (optional) - [Get one here](https://makersuite.google.com/app/apikey)

## 🚀 Quick Start

### 1. Clone and Install
```bash
# Clone the repository
git clone https://github.com/Anshulmehra001/gyani.git
cd gyani-finance-friend

# Install all dependencies
npm install
```

### 2. Environment Setup
```bash
# Copy the environment template
copy .env.example .env

# Edit .env file and add your API keys (optional)
# OPENAI_API_KEY=your_openai_api_key_here
# GOOGLE_API_KEY=your_google_api_key_here
# PORT=3000
```

**Note**: The app works without API keys using built-in demo responses!

### 3. Development Mode
```bash
# Start both frontend and backend simultaneously
npm run dev
```

This will start:
- **Backend server** on `http://localhost:3000`
- **Frontend development server** on `http://localhost:5173`

### 4. Production Build
```bash
# Build the frontend
npm run build

# Start production server
npm start
```

The production server serves both the API and the built React app on `http://localhost:3000`.

## 📁 Project Structure

```
gyani-finance-friend/
├── 📁 server/                 # Backend API server
│   └── index.js              # Express server with AI integration
├── 📁 src/                   # Frontend React application
│   ├── 📁 components/        # React components
│   │   ├── 📁 ui/           # shadcn/ui components
│   │   ├── GyaniChat.tsx    # AI chat interface
│   │   ├── StockMarketEducation.tsx # Learning modules
│   │   ├── ProgressDashboard.tsx    # Progress tracking
│   │   ├── VirtualTradingPlatform.tsx # Trading simulation
│   │   ├── RiskAssessmentTool.tsx   # Risk profiling
│   │   ├── FinancialHealthCheck.tsx # Health assessment
│   │   ├── QuizSystem.tsx           # Interactive quizzes
│   │   └── MarketDataSimulator.tsx  # Market data simulation
│   ├── 📁 pages/            # Page components (Index, NotFound)
│   ├── 📁 i18n/             # Internationalization files
│   └── �k assets/           # Images and static files
├── 📄 package.json          # Dependencies and scripts
├── 📄 vite.config.ts        # Vite configuration
├── 📄 tailwind.config.ts    # Tailwind CSS configuration
├── 📄 .env.example          # Environment variables template
└── 📄 README.md             # This file
```

## 🎮 Usage Guide

### Getting Started
1. **Welcome Screen**: Introduction to Gyani and key features
2. **Financial Health Check**: Optional assessment to understand your financial situation
3. **Choose Your Path**: 
   - Chat with Gyani for friendly financial guidance
   - Explore learning modules about investing basics
   - Try virtual trading simulation
   - Check your progress dashboard

### Learning Features
- **Educational Modules**: Learn stock market basics and investment concepts
- **Interactive Quizzes**: Test your knowledge with multiple-choice questions
- **Progress Tracking**: See your learning progress visually
- **Risk Assessment**: Understand your risk tolerance

### AI Chat Features
- **Friendly Conversations**: Ask questions in plain English
- **Encouraging Responses**: Patient, supportive guidance without judgment
- **Demo Mode**: Works even without API keys using built-in responses
- **Indian Market Context**: Basic knowledge of NSE, BSE, and SEBI

## 🔧 Configuration

### API Keys (Optional)
The application works in three modes:

1. **With OpenAI API**: Full AI-powered responses
2. **With Google Gemini API**: Alternative AI provider
3. **Demo Mode**: Built-in responses (no API keys needed)

### Environment Variables
```bash
# API Keys (optional)
OPENAI_API_KEY=your_openai_key
GOOGLE_API_KEY=your_google_key

# Server Configuration
PORT=3000

# Example Model Names
# OpenAI: gpt-4o, gpt-4o-mini, gpt-3.5-turbo
# Google: gemini-pro, gemini-1.5-flash
```

## 🧪 Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run client:dev       # Start only frontend (port 5173)
npm run server:dev       # Start only backend (port 3000)

# Production
npm run build           # Build frontend for production
npm start              # Start production server
npm run preview        # Preview production build

# Code Quality
npm run lint           # Run ESLint
npm test              # Run tests (placeholder)
```

## 🌐 API Endpoints

### Chat API
```
POST /api/chat
Content-Type: application/json

{
  "provider": "openai",           // "openai", "google", or "local"
  "model": "gpt-4o-mini",        // Model name
  "messages": [                   // Chat history
    {
      "role": "user",
      "content": "What are stocks?"
    }
  ],
  "maxTokens": 512               // Response length limit
}
```

### Health Check
```
GET /api/health
```

## 🎨 Customization

### Adding New Learning Modules
1. Create a new module object in `StockMarketEducation.tsx`
2. Add content for each topic
3. Include appropriate icons and difficulty levels

### Modifying AI Personality
Edit the system message in `server/index.js` to change Gyani's personality and knowledge focus.

### Styling
- **Tailwind Classes**: Modify component styles
- **Theme Colors**: Update `tailwind.config.ts`
- **Custom CSS**: Add to `src/index.css`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Heroku
1. Create a Heroku app
2. Set environment variables
3. Deploy using Git

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the existing code style
4. **Test thoroughly**: Ensure all features work
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Describe your changes

### Development Guidelines
- Use TypeScript for type safety
- Follow React best practices
- Write descriptive commit messages
- Test on multiple browsers
- Ensure mobile responsiveness

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
PORT=3001 npm start
```

**API Key Issues**
- Verify your API keys are correct
- Check your OpenAI/Google API quotas
- The app works without API keys in demo mode

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**CORS Errors**
- Ensure the backend server is running
- Check the proxy configuration in `vite.config.ts`

## 📚 Educational Content

### Learning Modules Available
- **Stock Market Fundamentals**: Basic concepts and terminology
- **Investment Strategies**: Different approaches to investing
- **Risk Management**: Understanding and managing investment risks
- **Portfolio Basics**: Introduction to portfolio management
- **Indian Market Context**: NSE, BSE, and SEBI basics

## 🔒 Security

- **API Key Protection**: Never commit API keys to version control
- **Input Validation**: All user inputs are validated
- **CORS Configuration**: Proper cross-origin request handling
- **Error Handling**: Secure error messages without sensitive data

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT API
- **Google** for Gemini API
- **shadcn/ui** for beautiful components
- **Tailwind CSS** for styling system
- **React Team** for the amazing framework
- **Indian Financial Markets** for inspiration

## 📞 Support

Need help? Here are your options:

1. **Check this README** for common solutions
2. **Open an Issue** on GitHub for bugs
3. **Start a Discussion** for questions
4. **Check the Wiki** for detailed guides

---

**Made with ❤️ for financial education in India**

*Gyani - Making finance accessible, one conversation at a time* 🌟