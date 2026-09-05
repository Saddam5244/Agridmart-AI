import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Bot, 
  User, 
  Sparkles,
  CheckCircle2,
  RotateCcw,
  AlertCircle,
  ChevronDown,
  Check,
  Languages,
  Globe
} from 'lucide-react';
import { executeVoiceCopilotAction } from '../services/api';
import { getTranslation } from '../utils/translations';
import { SUPPORTED_LANGUAGES } from '../utils/languages';
import { getContextualOptions } from '../utils/agronomyKnowledgeClient';

export default function AIAssistantModal({ isOpen, onClose, language = "hi", setLanguage }) {
  const t = getTranslation(language);
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const [activeSpeechLang, setActiveSpeechLang] = useState(language);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingIdx, setSpeakingIdx] = useState(null);
  const [micError, setMicError] = useState(null);
  const [availableVoices, setAvailableVoices] = useState([]);

  // Gemini API Key State (silently loaded from localStorage if previously set)
  const [geminiApiKey] = useState(() => {
    try {
      return localStorage.getItem('gemini_api_key') || '';
    } catch (e) {
      return '';
    }
  });

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const langDropdownRef = useRef(null);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Multi-language sample prompt chips
  const getSamplePromptsForLang = (lang) => {
    if (lang === 'en') {
      return [
        { text: "Which state produces the highest agriculture in India?", label: "🌾 Top Farming States" },
        { text: "How to treat Tomato fruit borer and leaf curl virus?", label: "🍅 Tomato Borer & Leaf Curl" },
        { text: "What is the 1-acre fertilizer schedule for Wheat (NPK)?", label: "🌱 Wheat Fertilizer & NPK" },
        { text: "How to spray for Mustard aphids and when to sow?", label: "🌾 Mustard Aphids & Sowing" },
        { text: "How to treat Potato Late Blight and boost tuber size?", label: "🥔 Potato Blight & Bulking" },
        { text: "What is today's live mandi price for Wheat and Paddy?", label: "💰 Live Mandi Rates" },
        { text: "How to apply for PM-KUSUM 80% solar pump subsidy?", label: "☀️ PM-KUSUM Solar Subsidy" },
        { text: "Start drip pump in the farm for 30 minutes", label: "⚡ IoT Pump Control" }
      ];
    }
    if (lang === 'bho') {
      return [
        { text: "भारत में सबसे जादे खेती कहाँ होला?", label: "🌾 सबसे जादे खेती" },
        { text: "टमाटर में कीड़ा आ पत्ता मुड़े के दवाई का बा?", label: "🍅 टमाटर के कीड़ा" },
        { text: "1 एकड़ गेहूं में यूरिया आ DAP केतना डालीं?", label: "🌱 1 एकड़ गेहूं खाद" },
        { text: "आलू में झुलसा बेमारी के दवाई आ आलू के साइज बढ़ावे के तरीका?", label: "🥔 आलू झुलसा" },
        { text: "आज प्रमुख फसलन के मंडी भाव का बा?", label: "💰 मंडी भाव" },
        { text: "खेत में 30 मिनट पानी चला दीं", label: "⚡ पटवन चालू करीं" }
      ];
    }
    // Default Hindi
    return [
      { text: "भारत में सबसे ज्यादा खेती कहां होती है?", label: "🌾 प्रमुख कृषि राज्य" },
      { text: "टमाटर में फल छेदक इल्ली और पत्ती मरोड़ रोग का क्या इलाज है?", label: "🍅 टमाटर फल छेदक" },
      { text: "धान में तना छेदक और खैरा रोग के लिए क्या स्प्रे करें?", label: "🍚 धान तना छेदक" },
      { text: "सरसों में माहूं (चेपा) की रोकथाम और बुवाई का सही समय?", label: "🌾 सरसों माहूं व बुवाई" },
      { text: "आलू में पछेती झुलसा की दवा और कंद बढ़ाने का उपाय?", label: "🥔 आलू झुलसा व साइज" },
      { text: "गेहूं में पीला रतुआ का इलाज और 1 एकड़ में यूरिया DAP की मात्रा?", label: "🌱 गेहूं रतुआ व NPK" },
      { text: "मिर्च में पत्ती मरोड़ (चुरड़ा) और थ्रिप्स का पक्का इलाज?", label: "🌶️ मिर्च थ्रिप्स व चुरड़ा" },
      { text: "गाय और भैंस का दूध व फैट प्रतिशत कैसे बढ़ाएं?", label: "🐄 दूध व फैट %" },
      { text: "आज प्रमुख फसलों का लाइव मंडी भाव क्या है?", label: "💰 आज का मंडी भाव" },
      { text: "पीएम-किसान और सोलर पंप 80% सब्सिडी आवेदन?", label: "🏛️ सरकारी योजनाएं" },
      { text: "खेत में 30 मिनट पानी चला दो (ड्रिप पंप चालू करो)", label: "⚡ IoT पंप चालू" }
    ];
  };

  // Initialize SpeechSynthesis voices
  useEffect(() => {
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
      }
    };

    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  // Update welcome greeting when language changes
  useEffect(() => {
    const welcomeGreetings = {
      hi: "नमस्ते किसान भाई! मैं Google Gemini द्वारा संचालित आपका AI कृषि व किसान मित्र हूँ। आप बोलकर या लिखकर खेती, खाद, रोग, मंडी भाव या सिंचाई के बारे में कोई भी प्रश्न पूछ सकते हैं।",
      bho: "प्रणाम किसान भाई! हम Google Gemini से जुड़ल रउआ के AI किसान मित्र हईं। रउआ बोल के चाहे लिख के खेती, खाद-बीज, बेमारी, मंडी भाव भा पटवन चालू करे खातिर कुछुओ पूछ सकीलें।",
      pa: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ! ਮੈਂ Google Gemini ਦੁਆਰਾ ਸੰਚਾਲਿਤ ਤੁਹਾਡਾ AI ਖੇਤੀਬਾੜੀ ਸਹਾਇਕ ਹਾਂ। ਤੁਸੀਂ ਬੋਲ ਕੇ ਕੋਈ ਵੀ ਸਵਾਲ ਪੁੱਛ ਸਕਦੇ ਹੋ।",
      mr: "नमस्कार शेतकरी बंधूंनो! मी Google Gemini द्वारे समर्थित आपला AI कृषी सहाय्यक आहे. तुम्ही कोणताही प्रश्न विचारू शकता.",
      gu: "નમસ્તે ખેડૂત મિત્રો! હું Google Gemini દ્વારા સંચાલિત તમારો AI કૃષિ સહાયક છું. તમે બોલીને કે લખીને પ્રશ્ન પૂછી શકો છો.",
      bn: "নমস্কার কৃষক ভাই! আমি Google Gemini দ্বারা চালিত আপনার AI কৃষি পরামর্শদাতা। আপনি মুখে বলে বা লিখে যেকোনো প্রশ্ন করতে পারেন।",
      te: "నమస్కారం రైతు సోదరులారా! నేను Google Gemini ఆధారిత మీ AI వ్యవసాయ సలహాదారుని.",
      ta: "வணக்கம் விவசாய நண்பர்களே! நான் Google Gemini மூலம் இயங்கும் உங்கள் AI விவசாய ஆலோசகர்.",
      kn: "ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! ನಾನು Google Gemini ಆಧಾರಿತ ನಿಮ್ಮ AI ಕೃಷಿ ಸಲಹೆಗಾರ.",
      en: "Hello farmer! I am your AI Agronomist & Farm Copilot powered by Google Gemini 2.5 Flash. Ask anything about crops, fertilizer schedules, disease remedies, market prices, or speak commands to schedule IoT irrigation pumps."
    };

    const activeText = welcomeGreetings[language] || welcomeGreetings.hi;
    setMessages([
      {
        sender: 'bot',
        text: activeText,
        options: getContextualOptions("", language),
        action: "Speak into microphone or tap any sample question below.",
        poweredBy: "Google Gemini 2.5 Flash (Active)"
      }
    ]);
  }, [language]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading, interimTranscript]);

  if (!isOpen) return null;

  const handleLanguageSwitch = (newLangCode) => {
    setActiveSpeechLang(newLangCode);
    if (setLanguage) {
      setLanguage(newLangCode);
    }
    setIsLangDropdownOpen(false);

    // Stop speaking
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
    }
    // Stop listening if active
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Select best natural voice for language
  const getBestVoiceForLang = (langCode) => {
    if (!availableVoices || availableVoices.length === 0) return null;
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
    const speechCode = (langObj?.speechCode || 'hi-IN').toLowerCase();
    
    let matched = availableVoices.find(v => v.lang.toLowerCase() === speechCode && (v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Neural")));
    if (matched) return matched;
    
    matched = availableVoices.find(v => v.lang.toLowerCase().startsWith(speechCode.split('-')[0]));
    if (matched) return matched;
    
    return availableVoices.find(v => v.lang.toLowerCase().includes("in")) || availableVoices[0];
  };

  const speakText = (text, langCode = activeSpeechLang) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    setSpeakingIdx(null);

    const cleanText = text
      .replace(/[*#_`~[\]()]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, '')
      .replace(/\n\s*\n/g, '. ')
      .replace(/\n/g, '. ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === langCode);
    utterance.lang = langObj?.speechCode || 'hi-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const voice = getBestVoiceForLang(langCode);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => setSpeakingIdx(null);
    utterance.onerror = () => setSpeakingIdx(null);

    setSpeakingIdx(messages.length);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (queryText = inputQuery) => {
    const text = queryText.trim();
    if (!text) return;

    setMicError(null);
    setInterimTranscript('');
    const userMsg = { sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await executeVoiceCopilotAction(text, activeSpeechLang, geminiApiKey);
      const contextualOpts = (response.options && response.options.length > 0)
        ? response.options 
        : getContextualOptions(text + " " + (response.answer || ""), activeSpeechLang);

      const botMsg = {
        sender: 'bot',
        text: response.answer || response.speechText || "Answer processed.",
        speechText: response.speechText || response.answer,
        options: contextualOpts,
        actionExecuted: response.actionExecuted,
        actionType: response.actionType,
        executionStep: response.executionStep,
        action: response.actionRecommendation,
        detectedLang: response.detectedLanguage || activeSpeechLang,
        poweredBy: response.poweredBy || "Google Gemini 2.5 Flash"
      };
      
      setMessages(prev => [...prev, botMsg]);
      setSpeakingIdx(messages.length + 1);

      // Auto-speak response in chosen language
      speakText(botMsg.speechText || botMsg.text, response.detectedLanguage || activeSpeechLang);

    } catch (err) {
      console.error("Agronomist Query error:", err);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: activeSpeechLang === 'hi'
            ? "सर्वर से संपर्क नहीं हो पाया। कृपया अपना इंटरनेट कनेक्शन जांचें।"
            : "Could not reach server. Please verify your connection.",
          options: getContextualOptions(text, activeSpeechLang),
          action: "Check your connection or reload.",
          poweredBy: "AgriSmart AI Engine"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Robust Speech-to-Text Microphone Engine
  const startListening = () => {
    setMicError(null);
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setMicError("Speech recognition is not supported on this browser. Please open in Google Chrome or Microsoft Edge.");
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeakingIdx(null);
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      const activeLangObj = SUPPORTED_LANGUAGES.find(l => l.code === activeSpeechLang) || currentLangObj;
      recognition.lang = activeLangObj.speechCode || 'hi-IN';
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setInterimTranscript('');
      };

      recognition.onresult = (event) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        if (interim) {
          setInterimTranscript(interim);
        }

        if (final) {
          setInterimTranscript('');
          setInputQuery(final);
          setIsListening(false);
          handleSend(final);
        }
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
        setInterimTranscript('');
        
        if (event.error === 'not-allowed') {
          setMicError("Microphone access blocked. Please click the Lock/Mic icon in your browser URL bar and allow Microphone.");
        } else if (event.error === 'no-speech') {
          setMicError("आवाज सुनाई नहीं दी। कृपया माइक बटन दबाकर साफ आवाज में बोलें।");
        } else if (event.error === 'network') {
          setMicError("Network issue with speech engine. You can also type your question.");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.warn("Recognition start failed:", e);
      setIsListening(false);
      setMicError("Microphone failed to start. Please check device permissions.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const activeLangObj = SUPPORTED_LANGUAGES.find(l => l.code === activeSpeechLang) || currentLangObj;
  const currentSamplePrompts = getSamplePromptsForLang(activeSpeechLang);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border-2 border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[92vh] max-h-[740px]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 border-b border-slate-200 bg-slate-50/90 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-md shadow-emerald-500/25 shrink-0">
              <Bot className="w-5 h-5 text-white" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 ring-2 ring-white"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                  {t.assistant.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                  ✨ Gemini 2.5 Flash
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate max-w-[200px] sm:max-w-xs">
                {activeSpeechLang === 'hi' 
                  ? 'बहुभाषी AI कृषि विशेषज्ञ • वॉइस व टेक्स्ट' 
                  : activeSpeechLang === 'bho'
                  ? 'भोजपुरी व बहुभाषी किसान मित्र'
                  : 'Multilingual Agronomist & Voice Copilot'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* 🌐 Prominent Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition border border-emerald-300 shadow-xs cursor-pointer"
                title="Change Voice & Text Language"
              >
                <span className="text-sm">{activeLangObj.icon}</span>
                <span className="font-extrabold">{activeLangObj.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-emerald-700" />
              </button>

              {/* Language Dropdown Menu */}
              {isLangDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5 text-emerald-600" />
                      भाषा चुनें (Select Language)
                    </span>
                  </div>
                  <div className="max-h-60 overflow-y-auto py-1">
                    {SUPPORTED_LANGUAGES.map((lang) => {
                      const isSelected = lang.code === activeSpeechLang;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageSwitch(lang.code)}
                          className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-emerald-50 transition text-xs ${
                            isSelected ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-700'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">{lang.icon}</span>
                            <div>
                              <span className="block font-bold">{lang.nativeName}</span>
                              <span className="text-[10px] text-slate-400 font-medium">{lang.name}</span>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Clear Chat */}
            <button
              onClick={() => {
                setMessages([]);
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              }}
              className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
              title="Clear Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={() => {
                if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                onClose();
              }}
              className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Language Switcher Bar (1-Click Switch for Farmers) */}
        <div className="px-3 sm:px-4 py-1.5 bg-emerald-900/5 border-b border-emerald-200/60 overflow-x-auto flex items-center space-x-1.5 scrollbar-none">
          <span className="text-[10px] font-bold text-emerald-900 shrink-0 flex items-center gap-1 mr-1">
            <Languages className="w-3 h-3 text-emerald-600" />
            भाषा:
          </span>
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isActive = lang.code === activeSpeechLang;
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageSwitch(lang.code)}
                className={`shrink-0 px-2.5 py-0.5 rounded-full text-[11px] font-bold transition flex items-center space-x-1 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-emerald-100 hover:text-emerald-900 border border-slate-200'
                }`}
              >
                <span>{lang.icon}</span>
                <span>{lang.nativeName}</span>
              </button>
            );
          })}
        </div>

        {/* Microphone Error Alert */}
        {micError && (
          <div className="mx-4 mt-3 p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold">{micError}</p>
            </div>
            <button onClick={() => setMicError(null)} className="text-amber-700 font-bold text-xs cursor-pointer">
              ✕
            </button>
          </div>
        )}

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
          {messages.map((msg, idx) => {
            const displayOptions = (msg.options && msg.options.length > 0)
              ? msg.options 
              : (msg.sender === 'bot' ? getContextualOptions(msg.text, activeSpeechLang) : []);

            return (
              <div
                key={idx}
                className={`flex items-start space-x-3 ${
                  msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[88%] rounded-3xl p-4 shadow-sm text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none font-medium'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none space-y-2'
                  }`}
                >
                  {/* Text Content */}
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>

                  {/* IoT Hardware Action Feedback */}
                  {msg.actionExecuted && (
                    <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center space-x-2 mt-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold block">IoT Hardware Signal Sent</span>
                        <span className="text-[11px] text-emerald-700">{msg.executionStep || msg.action}</span>
                      </div>
                    </div>
                  )}

                  {/* Interactive Quick Action Options */}
                  {msg.sender === 'bot' && displayOptions && displayOptions.length > 0 && (
                    <div className="pt-2.5 pb-1 flex flex-wrap gap-1.5 border-t border-slate-100">
                      <span className="w-full text-[10px] font-bold text-slate-400">
                        {activeSpeechLang === 'hi'
                          ? 'संबंधित विकल्प व त्वरित प्रश्न (Quick Options):'
                          : activeSpeechLang === 'bho'
                          ? 'जुड़ल सवाल (Quick Options):'
                          : 'Contextual Quick Follow-ups:'}
                      </span>
                      {displayOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleSend(opt.query || opt.label)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-semibold transition border border-emerald-200 text-left flex items-center space-x-1.5 shadow-xs cursor-pointer active:scale-95"
                        >
                          <span>{opt.label}</span>
                          <span className="text-emerald-600 font-bold">➔</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Model Attribution & Voice Readout for Bot */}
                  {msg.sender === 'bot' && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                      <span className="font-semibold text-emerald-700 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        {msg.poweredBy || "Google Gemini AI"}
                      </span>

                      <button
                        onClick={() => speakText(msg.speechText || msg.text, msg.detectedLang || activeSpeechLang)}
                        className="flex items-center space-x-1 text-slate-600 hover:text-emerald-700 font-bold px-2 py-0.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
                        title="Speak Answer"
                      >
                        {speakingIdx === idx ? (
                          <VolumeX className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {speakingIdx === idx 
                            ? (activeSpeechLang === 'hi' ? "बोल रहा है..." : "Speaking...") 
                            : (activeSpeechLang === 'hi' ? "सुनें" : "Listen")}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Interim Real-time Speech-to-text Bubble */}
          {interimTranscript && (
            <div className="flex items-start space-x-3 flex-row-reverse space-x-reverse">
              <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="max-w-[85%] rounded-3xl p-3.5 bg-emerald-100 border border-emerald-300 text-emerald-950 rounded-tr-none text-xs sm:text-sm font-medium animate-pulse">
                <span>🎙️ "{interimTranscript}"...</span>
              </div>
            </div>
          )}

          {/* Loading Thinking Indicator */}
          {loading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-bounce">
                <Bot className="w-4 h-4" />
              </div>
              <div className="rounded-3xl p-4 bg-white border border-emerald-200 text-slate-700 rounded-tl-none text-xs flex flex-col space-y-2 shadow-sm max-w-[85%]">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span className="font-bold text-emerald-800 text-xs">
                    {activeSpeechLang === 'hi' 
                      ? 'कृषि वैज्ञानिक AI विश्लेषण कर रहा है...' 
                      : activeSpeechLang === 'bho'
                      ? 'AI किसान मित्र विश्लेषण करत बा...'
                      : 'AI Agronomist is reasoning...'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 flex items-center space-x-1.5 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                  <span>
                    {activeSpeechLang === 'hi'
                      ? 'मृदा स्वास्थ्य, कीटनाशक डोज, NPK व मौसम आंकड़ों का मिलान हो रहा है...'
                      : 'Matching soil NPK, pest remedies, weather & mandi data...'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Sample Prompt Chips Carousel */}
        <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 overflow-x-auto flex space-x-2 scrollbar-none">
          {currentSamplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt.text)}
              disabled={loading}
              className="shrink-0 px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-400 text-xs font-semibold transition shadow-sm cursor-pointer"
            >
              {prompt.text}
            </button>
          ))}
        </div>

        {/* Input Bar with Voice & Send */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2"
          >
            {/* Microphone Button */}
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`p-3 rounded-2xl font-bold transition shadow-md flex items-center justify-center shrink-0 ${
                isListening
                  ? 'bg-rose-500 text-white ring-4 ring-rose-300 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25 cursor-pointer'
              }`}
              title={isListening ? "Listening... Tap to stop" : `Speak question in ${activeLangObj.nativeName}`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Query Input Box */}
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={
                activeSpeechLang === 'hi'
                  ? 'खेती का कोई भी सवाल पूछें या बोलें...'
                  : activeSpeechLang === 'bho'
                  ? 'खेती-बारी के सवाल पूछीं भा बोल के बतावीं...'
                  : 'Ask any farming, crop, fertilizer, or irrigation question...'
              }
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputQuery.trim() || loading}
              className="p-3 rounded-2xl bg-slate-900 hover:bg-emerald-600 disabled:opacity-40 text-white transition shadow-md shrink-0 cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
