import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Language resources
const resources = {
  en: {
    translation: {
      // Navigation
      welcome: "Welcome",
      chat: "Chat",
      progress: "Progress", 
      learn: "Learn",
      trading: "Virtual Trading",
      portfolio: "Portfolio",
      risk: "Risk Assessment",
      
      // Gyani responses
      gyani: {
        welcome: "Hello! I'm Gyani, your friendly stock market guide! 📈 I'll help you understand investing, from basics to advanced strategies. What's your name?",
        encouragement: "Great question! Don't worry, everyone starts somewhere. Let's explore this together! 💪",
        celebration: "Fantastic progress! You're becoming a smart investor! 🎉",
        stockBasics: "Think of stocks like owning a tiny piece of your favorite company. When the company does well, your piece becomes more valuable! 🏢",
        riskExplain: "Risk in investing is like weather - some days are sunny (profits), some rainy (losses). The key is being prepared! ☔→☀️"
      },
      
      // Stock Market Education
      stockMarket: {
        title: "Stock Market Basics",
        whatAreStocks: "What are Stocks?",
        stocksExplanation: "Stocks are like owning a small piece of a company. When you buy Apple stock, you become a tiny owner of Apple!",
        marketTypes: "Types of Markets",
        primaryMarket: "Primary Market - Where companies first sell their shares",
        secondaryMarket: "Secondary Market - Where investors trade with each other",
        indices: "Market Indices",
        nifty: "NIFTY 50 - Top 50 companies in India",
        sensex: "SENSEX - Top 30 companies on BSE"
      },
      
      // Risk Assessment
      riskAssessment: {
        title: "Know Your Risk Profile",
        conservative: "Conservative - I prefer safe investments",
        moderate: "Moderate - I can handle some ups and downs", 
        aggressive: "Aggressive - I'm comfortable with high risk for high returns",
        yourProfile: "Your Risk Profile",
        recommendations: "Recommended Asset Allocation"
      },
      
      // Virtual Trading
      virtualTrading: {
        title: "Practice Trading",
        portfolioValue: "Portfolio Value",
        buyStock: "Buy Stock",
        sellStock: "Sell Stock",
        quantity: "Quantity",
        price: "Price",
        total: "Total",
        balance: "Available Balance",
        holdings: "Your Holdings"
      }
    }
  },
  hi: {
    translation: {
      // Navigation (Hindi)
      welcome: "स्वागत",
      chat: "चैट",
      progress: "प्रगति",
      learn: "सीखें",
      trading: "वर्चुअल ट्रेडिंग",
      portfolio: "पोर्टफोलियो",
      risk: "जोखिम मूल्यांकन",
      
      // Gyani responses (Hindi)
      gyani: {
        welcome: "नमस्ते! मैं ज्ञानी हूँ, आपका मित्र शेयर बाज़ार गाइड! 📈 मैं आपको निवेश समझाऊंगा, बुनियादी बातों से लेकर उन्नत रणनीतियों तक। आपका नाम क्या है?",
        encouragement: "बहुत अच्छा सवाल! चिंता न करें, हर कोई कहीं न कहीं से शुरुआत करता है। आइए इसे मिलकर समझते हैं! 💪",
        celebration: "शानदार प्रगति! आप एक समझदार निवेशक बन रहे हैं! 🎉",
        stockBasics: "शेयर्स को अपनी पसंदीदा कंपनी का छोटा सा हिस्सा मानिए। जब कंपनी अच्छा करती है, आपका हिस्सा भी ज्यादा कीमती हो जाता है! 🏢",
        riskExplain: "निवेश में जोखिम मौसम की तरह है - कुछ दिन धूप (मुनाफा), कुछ बारिश (नुकसान)। मुख्य बात तैयार रहना है! ☔→☀️"
      },
      
      // Stock Market Education (Hindi)
      stockMarket: {
        title: "शेयर बाज़ार की बुनियादी बातें",
        whatAreStocks: "शेयर क्या हैं?",
        stocksExplanation: "शेयर्स कंपनी का छोटा सा हिस्सा होने जैसा है। जब आप Apple का शेयर खरीदते हैं, तो आप Apple के छोटे मालिक बन जाते हैं!",
        marketTypes: "बाज़ार के प्रकार",
        primaryMarket: "प्राथमिक बाज़ार - जहाँ कंपनियाँ पहली बार अपने शेयर बेचती हैं",
        secondaryMarket: "द्वितीयक बाज़ार - जहाँ निवेशक आपस में व्यापार करते हैं",
        indices: "बाज़ार सूचकांक",
        nifty: "निफ्टी 50 - भारत की टॉप 50 कंपनियाँ",
        sensex: "सेंसेक्स - BSE की टॉप 30 कंपनियाँ"
      },
      
      // Risk Assessment (Hindi)
      riskAssessment: {
        title: "अपना जोखिम प्रोफाइल जानें",
        conservative: "रूढ़िवादी - मैं सुरक्षित निवेश पसंद करता हूँ",
        moderate: "मध्यम - मैं कुछ उतार-चढ़ाव संभाल सकता हूँ",
        aggressive: "आक्रामक - मैं ज्यादा रिटर्न के लिए ज्यादा जोखिम उठा सकता हूँ",
        yourProfile: "आपका जोखिम प्रोफाइल",
        recommendations: "सुझाया गया एसेट एलोकेशन"
      },
      
      // Virtual Trading (Hindi)
      virtualTrading: {
        title: "ट्रेडिंग का अभ्यास",
        portfolioValue: "पोर्टफोलियो वैल्यू",
        buyStock: "शेयर खरीदें",
        sellStock: "शेयर बेचें",
        quantity: "मात्रा",
        price: "कीमत",
        total: "कुल",
        balance: "उपलब्ध बैलेंस",
        holdings: "आपकी होल्डिंग्स"
      }
    }
  },
  te: {
    translation: {
      // Navigation (Telugu)
      welcome: "స్వాగతం",
      chat: "చాట్",
      progress: "పురోగతి",
      learn: "నేర్చుకోండి",
      trading: "వర్చువల్ ట్రేడింగ్",
      portfolio: "పోర్ట్‌ఫోలియో",
      risk: "రిస్క్ అసెస్‌మెంట్",
      
      // Gyani responses (Telugu)
      gyani: {
        welcome: "నమస్కారం! నేను జ్ఞాని, మీ స్నేహపూర్వక స్టాక్ మార్కెట్ గైడ్! 📈 నేను మీకు పెట్టుబడిని అర్థం చేయడంలో సహాయం చేస్తాను, ప్రాథమికాల నుండి అధునాతన వ్యూహాల వరకు। మీ పేరు ఏమిటి?",
        encouragement: "చాలా మంచి ప్రశ్న! చింతించకండి, అందరూ ఎక్కడో మొదలుపెట్టారు. దీనిని కలిసి అన్వేషిద్దాం! 💪",
        celebration: "అద్భుతమైన పురోగతి! మీరు తెలివైన పెట్టుబడిదారుగా మారుతున్నారు! 🎉",
        stockBasics: "స్టాక్‌లను మీ ఇష్టమైన కంపెనీలో చిన్న భాగాన్ని కలిగి ఉన్నట్లుగా భావించండి. కంపెనీ బాగా చేసినప్పుడు, మీ భాగం మరింత విలువైనదిగా మారుతుంది! 🏢",
        riskExplain: "పెట్టుబడిలో రిస్క్ వాతావరణం లాంటిది - కొన్ని రోజులు ఎండ (లాభాలు), కొన్ని వర్షం (నష్టాలు). ముఖ్యమైన విషయం సిద్ధంగా ఉండటం! ☔→☀️"
      },
      
      // Stock Market Education (Telugu)
      stockMarket: {
        title: "స్టాక్ మార్కెట్ ప్రాథమికాలు",
        whatAreStocks: "స్టాక్‌లు ఏమిటి?",
        stocksExplanation: "స్టాక్‌లు కంపెనీలో చిన్న భాగాన్ని కలిగి ఉన్నట్లుగా ఉంటాయి. మీరు ఆపిల్ స్టాక్ కొనుగోలు చేసినప్పుడు, మీరు ఆపిల్‌కు చిన్న యజమాని అవుతారు!",
        marketTypes: "మార్కెట్ రకాలు",
        primaryMarket: "ప్రైమరీ మార్కెట్ - కంపెనీలు మొదటిసారిగా తమ షేర్లను అమ్మే చోటు",
        secondaryMarket: "సెకండరీ మార్కెట్ - పెట్టుబడిదారులు ఒకరితో ఒకరు వ్యాపారం చేసే చోటు",
        indices: "మార్కెట్ సూచీలు",
        nifty: "నిఫ్టీ 50 - భారతదేశంలో టాప్ 50 కంపెనీలు",
        sensex: "సెన్‌సెక్స్ - BSEలో టాప్ 30 కంపెనీలు"
      },
      
      // Risk Assessment (Telugu)
      riskAssessment: {
        title: "మీ రిస్క్ ప్రొఫైల్‌ను తెలుసుకోండి",
        conservative: "సంప్రదాయవాది - నేను సురక్షితమైన పెట్టుబడులను ఇష్టపడతాను",
        moderate: "మోడరేట్ - నేను కొన్ని ఎత్తుపల్లాలను నిర్వహించగలను",
        aggressive: "దూకుడుగా - అధిక రిటర్న్‌ల కోసం అధిక రిస్క్‌తో నేను సౌకర్యంగా ఉన్నాను",
        yourProfile: "మీ రిస్క్ ప్రొఫైల్",
        recommendations: "సిఫార్సు చేయబడిన అసెట్ కేటాయింపు"
      },
      
      // Virtual Trading (Telugu)
      virtualTrading: {
        title: "ట్రేడింగ్ అభ్యాసం",
        portfolioValue: "పోర్ట్‌ఫోలియో విలువ",
        buyStock: "స్టాక్ కొనుగోలు",
        sellStock: "స్టాక్ అమ్మకం",
        quantity: "పరిమాణం",
        price: "ధర",
        total: "మొత్తం",
        balance: "అందుబాటులో ఉన్న బ్యాలెన్స్",
        holdings: "మీ హోల్డింగ్‌లు"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;