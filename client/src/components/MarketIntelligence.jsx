import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Store, 
  ShieldCheck, 
  Search, 
  Volume2, 
  VolumeX, 
  MapPin, 
  Sparkles, 
  RefreshCw, 
  ArrowUpRight, 
  ArrowDownRight,
  LocateFixed,
  Scale,
  Check,
  Compass
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Area, 
  AreaChart,
  ReferenceLine
} from 'recharts';
import { fetchMarketIntelligence, fetchMandiSummary, reverseGeocodeGPS } from '../services/api';
import { getTranslation } from '../utils/translations';

export default function MarketIntelligence({ language = "en" }) {
  const [markets, setMarkets] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [selectedCommodityId, setSelectedCommodityId] = useState('wheat-indore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [sortBy, setSortBy] = useState('volume');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [activeLocationBadge, setActiveLocationBadge] = useState('');
  const [lastRefreshed, setLastRefreshed] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  const t = getTranslation(language);

  const POPULAR_CROPS = [
    { label: language === 'hi' ? '🌾 गेहूं' : 'Wheat', query: 'wheat' },
    { label: language === 'hi' ? '🌻 सरसों' : 'Mustard', query: 'mustard' },
    { label: language === 'hi' ? '🌱 सोयाबीन' : 'Soybean', query: 'soybean' },
    { label: language === 'hi' ? '🌾 धान' : 'Paddy', query: 'paddy' },
    { label: language === 'hi' ? '🥔 आलू' : 'Potato', query: 'potato' },
    { label: language === 'hi' ? '🍅 टमाटर' : 'Tomato', query: 'tomato' },
    { label: language === 'hi' ? '🧅 प्याज' : 'Onion', query: 'onion' },
    { label: language === 'hi' ? '☁️ कपास' : 'Cotton', query: 'cotton' },
    { label: language === 'hi' ? '🌽 मक्का' : 'Maize', query: 'maize' },
    { label: language === 'hi' ? '🧄 लहसुन' : 'Garlic', query: 'garlic' },
    { label: language === 'hi' ? '🫘 चना' : 'Gram', query: 'chickpea' }
  ];

  const handleDetectGPSLocation = async () => {
    if (!navigator.geolocation) {
      alert(language === 'hi' ? "ब्राउज़र में जीपीएस लोकेशन उपलब्ध नहीं है।" : "Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const geo = await reverseGeocodeGPS(latitude, longitude);
          if (geo) {
            const detectedState = geo.state || 'all';
            const detectedDist = geo.district || geo.city || 'all';
            setSelectedState(detectedState);
            setSelectedDistrict(detectedDist);
            setActiveLocationBadge(`${detectedDist}, ${detectedState}`);
          }
        } catch (err) {
          console.warn("GPS lookup fallback:", err);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.warn("GPS denied/error:", error.message);
        setIsLocating(false);
        try {
          const saved = localStorage.getItem('agri_active_location');
          if (saved) {
            const parsed = JSON.parse(saved);
            const parts = (parsed.city || '').split(',').map(s => s.trim());
            if (parts.length > 1) {
              setSelectedDistrict(parts[0]);
              setSelectedState(parts[1]);
              setActiveLocationBadge(`${parts[0]}, ${parts[1]}`);
            }
          }
        } catch (e) {}
      },
      { timeout: 8000, enableHighAccuracy: false }
    );
  };

  // Load live mandi rates and summary
  const loadMandiData = async () => {
    setIsLoading(true);
    try {
      const [ratesRes, sumRes] = await Promise.all([
        fetchMarketIntelligence({
          search: searchQuery,
          state: selectedState,
          district: selectedDistrict,
          category: selectedCategory,
          sortBy
        }),
        fetchMandiSummary()
      ]);

      if (ratesRes?.markets) {
        setMarkets(ratesRes.markets);
        if (ratesRes.markets.length > 0 && !ratesRes.markets.find(m => m.id === selectedCommodityId)) {
          setSelectedCommodityId(ratesRes.markets[0].id);
        }
      }
      if (sumRes?.success) {
        setSummaryData(sumRes);
      }
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.warn("Failed to refresh mandi data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMandiData();
  }, [searchQuery, selectedCategory, selectedState, selectedDistrict, sortBy]);

  // Active highlighted commodity
  const activeMarket = useMemo(() => {
    return markets.find(m => m.id === selectedCommodityId) || markets[0] || {
      id: "wheat-indore",
      commodity: "Wheat (Lokwan / Sharbati)",
      commodityHi: "गेहूं (लोकवन / शरबती)",
      currentPrice: 2480,
      minPrice: 2420,
      maxPrice: 2540,
      unit: "₹/Quintal",
      msp: 2425,
      change24h: "+₹35 (+1.4%)",
      trend: "up",
      state: "Madhya Pradesh",
      district: "Indore",
      market: "Indore (Choithram) APMC",
      arrivalTons: 1420,
      qualityGrade: "Grade-A (Moisture: 10.5%)",
      sellRecommendation: "HOLD",
      forecastNote: "Export demand rising and mill purchasing active. Expected to touch ₹2,560 within 14 days.",
      forecastNoteHi: "आटा मिलों की मजबूत मांग और सरकारी खरीद के कारण भाव में तेजी के संकेत हैं।",
      historical: [
        { date: "Day -4", price: 2440 },
        { date: "Day -3", price: 2435 },
        { date: "Day -2", price: 2460 },
        { date: "Day -1", price: 2470 },
        { date: "Today", price: 2480 },
        { date: "Day +1 (Est)", price: 2495 },
        { date: "Day +2 (Est)", price: 2515 },
        { date: "Day +3 (Est)", price: 2540 }
      ]
    };
  }, [markets, selectedCommodityId]);

  // Other local/national mandis trading the same crop for price arbitrage
  const comparisonMarkets = useMemo(() => {
    if (!activeMarket) return [];
    const baseWord = (activeMarket.commodity || '').split(' ')[0].toLowerCase();
    return markets
      .filter(m => m.id !== activeMarket.id && (
        m.commodity.toLowerCase().includes(baseWord) ||
        (m.category === activeMarket.category && m.commodity.slice(0, 4).toLowerCase() === activeMarket.commodity.slice(0, 4).toLowerCase())
      ))
      .slice(0, 6);
  }, [markets, activeMarket]);

  // Comparison metrics across all loaded mandis
  const comparisonStats = useMemo(() => {
    if (!markets || markets.length === 0) return null;
    let highest = markets[0];
    let lowest = markets[0];
    let sum = 0;
    markets.forEach(m => {
      sum += (m.currentPrice || 0);
      if ((m.currentPrice || 0) > (highest.currentPrice || 0)) highest = m;
      if ((m.currentPrice || 0) < (lowest.currentPrice || 0)) lowest = m;
    });
    const avg = Math.round(sum / markets.length);
    const spread = (highest.currentPrice || 0) - (lowest.currentPrice || 0);
    return { highest, lowest, avg, spread, count: markets.length };
  }, [markets]);

  // Categories list
  const categoryTabs = [
    { id: 'all', label: language === 'hi' ? '🌾 सभी फसलें' : language === 'bho' ? '🌾 सब फसल' : '🌾 All Crops' },
    { id: 'grains', label: language === 'hi' ? '🌽 अनाज (Cereals)' : language === 'bho' ? '🌽 अनाज' : '🌽 Cereals & Grains' },
    { id: 'pulses', label: language === 'hi' ? '🫘 दलहन (Pulses)' : language === 'bho' ? '🫘 दाल' : '🫘 Pulses' },
    { id: 'oilseeds', label: language === 'hi' ? '🌻 तिलहन (Oilseeds)' : language === 'bho' ? '🌻 तेलहन' : '🌻 Oilseeds' },
    { id: 'vegetables', label: language === 'hi' ? '🥔 सब्जियां (Vegetables)' : language === 'bho' ? '🥔 तरकारी' : '🥔 Vegetables' },
    { id: 'spices', label: language === 'hi' ? '🌿 मसाले (Spices)' : language === 'bho' ? '🌿 मसाला' : '🌿 Spices' },
    { id: 'cash_crops', label: language === 'hi' ? '💰 नकदी फसलें (Cash Crops)' : language === 'bho' ? '💰 नकदी' : '💰 Cash Crops' },
  ];

  // Voice readout
  const handleVoiceBroadcast = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToSpeak = language === 'hi'
      ? `आज ${activeMarket.market} में ${activeMarket.commodityHi || activeMarket.commodity} का चालू भाव ₹${activeMarket.currentPrice} प्रति क्विंटल है। न्यूनतम भाव ₹${activeMarket.minPrice} और अधिकतम भाव ₹${activeMarket.maxPrice} दर्ज किया गया है। एआई कृषि सलाह: ${activeMarket.sellRecommendationHi || activeMarket.sellRecommendation}।`
      : `Today at ${activeMarket.market}, the live spot rate for ${activeMarket.commodity} is ₹${activeMarket.currentPrice} per quintal. Range: ₹${activeMarket.minPrice} to ₹${activeMarket.maxPrice}. AI Strategy: ${activeMarket.sellRecommendation}.`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const getLocalizedRecommendation = (market) => {
    const rec = market.sellRecommendation;
    if (rec === 'HOLD') {
      return language === 'hi' ? 'रोकें (HOLD - भाव बढ़ेंगे)' : language === 'bho' ? 'अहिये रोकीं (HOLD)' : 'HOLD';
    }
    if (rec === 'SELL NOW') {
      return language === 'hi' ? 'तुरंत बेचें (SELL NOW)' : language === 'bho' ? 'तुरंते बेचीं (SELL)' : 'SELL NOW';
    }
    if (rec.includes('PARTIAL SELL') || rec.includes('SELL (50%)') || rec.includes('SELL (60%)') || rec.includes('SELL (70%)')) {
      return language === 'hi' ? 'आंशिक बेचें (Partial Sell)' : language === 'bho' ? 'आधा बेचीं' : 'PARTIAL SELL';
    }
    return rec;
  };

  const statesList = summaryData?.uniqueStates || [
    "Uttar Pradesh", "Madhya Pradesh", "Maharashtra", "Rajasthan", "Gujarat", "Punjab", "Karnataka", "Andhra Pradesh"
  ];

  const districtsList = useMemo(() => {
    if (selectedState === 'all') {
      return summaryData?.uniqueDistricts || [
        "Indore", "Kanpur", "Lucknow", "Bhopal", "Lasalgaon", "Nashik", "Jaipur", "Khanna", "Guntur", "Unjha"
      ];
    }
    const filtered = (summaryData?.uniqueDistricts || []).filter(d => {
      return markets.some(m => m.district.toLowerCase() === d.toLowerCase() && m.state.toLowerCase() === selectedState.toLowerCase());
    });
    return filtered.length > 0 ? filtered : summaryData?.uniqueDistricts || [];
  }, [selectedState, summaryData, markets]);

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. REAL-TIME SCROLLING TICKER */}
      <div className="bg-slate-900 text-white rounded-2xl p-2.5 shadow-lg border border-slate-800 overflow-hidden flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-wider shrink-0 border border-emerald-500/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{language === 'hi' ? '🔴 लाइव मंडी भाव' : '🔴 Live APMC Ticker'}</span>
        </div>

        <div className="overflow-hidden relative w-full flex-1">
          <div className="flex items-center space-x-8 whitespace-nowrap animate-marquee text-xs font-semibold">
            {(summaryData?.tickerItems || markets).map((item, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedCommodityId(item.id)}
                className="inline-flex items-center space-x-2 text-slate-300 hover:text-emerald-400 transition"
              >
                <span className="font-bold text-white">{language === 'hi' ? (item.commodityHi || item.commodity) : item.commodity}</span>
                <span className="text-slate-400 text-[11px]">({item.market})</span>
                <span className="text-emerald-400 font-extrabold">₹{item.currentPrice?.toLocaleString()}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded font-bold ${
                  item.trend === 'up' ? 'text-emerald-400' : item.trend === 'down' ? 'text-rose-400' : 'text-slate-400'
                }`}>
                  {item.change24h}
                </span>
                <span className="text-slate-600">•</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. HEADER & LIVE METRICS BAR */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 bg-white border-2 border-emerald-500/30 shadow-xl shadow-emerald-500/5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{t.market.badge || "Real-Time APMC Mandi Intelligence"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-3">
              <span>{t.market.title || "Daily Live Mandi Rates Hub"}</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500 text-white font-bold">
                {markets.length} {language === 'hi' ? 'फसलें सक्रिय' : 'Products Live'}
              </span>
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-3xl">
              {language === 'hi' 
                ? "देशभर की प्रमुख एवं स्थानीय कृषि उपज मंडियों (लखनऊ, कानपुर, कानपुर देहात, इंदौर, लासलगांव, उंझा, खन्ना, गुंटूर) के दैनिक वास्तविक भाव, न्यूनतम-अधिकतम दरें, सरकारी एमएसपी व एआई खरीद-बिक्री पूर्वानुमान।"
                : "Real daily spot rates from national & local APMC mandis (Lucknow, Kanpur, Kanpur Dehat, Indore, Lasalgaon, Unjha, Khanna, Guntur) with Min-Max range, MSP benchmarks, and AI hold/sell forecasting."}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleVoiceBroadcast}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition shadow-sm border ${
                isSpeaking 
                  ? 'bg-rose-50 text-rose-700 border-rose-300 animate-pulse'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-emerald-700" />}
              <span>{isSpeaking ? (language === 'hi' ? 'आवाज बंद करें' : 'Stop Audio') : (language === 'hi' ? '🔊 मंडी भाव सुनें' : '🔊 Listen Rates')}</span>
            </button>

            <button
              onClick={loadMandiData}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition"
              title="Refresh Live Rates"
            >
              <RefreshCw className={`w-4 h-4 text-slate-600 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
              <span>{isLoading ? (language === 'hi' ? 'अपडेट हो रहा...' : 'Syncing...') : `${language === 'hi' ? 'अपडेट' : 'Sync'} (${lastRefreshed})`}</span>
            </button>
          </div>
        </div>

        {/* TOP GAINERS & VOLUME HIGHLIGHTS */}
        {summaryData?.gainers && summaryData.gainers.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {summaryData.gainers.slice(0, 4).map((g, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedCommodityId(g.id)}
                className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 hover:border-emerald-400 transition cursor-pointer group"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="truncate max-w-[110px]">{g.market}</span>
                  <span className="text-emerald-700 font-bold flex items-center"><ArrowUpRight className="w-3 h-3" />{g.change24h}</span>
                </div>
                <div className="text-sm font-black text-slate-900 mt-1 group-hover:text-emerald-700 transition truncate">
                  {language === 'hi' ? (g.commodityHi || g.commodity) : g.commodity}
                </div>
                <div className="text-xs font-extrabold text-slate-700 mt-0.5">
                  ₹{g.currentPrice?.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">/ q</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. MULTI-FILTER & SEARCH CONTROL PANEL */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
        
        {/* Row 1: Search Box + GPS Live Location Button + Clear */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          
          {/* Search Box */}
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'hi' ? "🔍 किसी भी फसल का नाम खोजें (जैसे गेहूं, सरसों, सोयाबीन, आलू, प्याज, धान, लहसुन)..." : "🔍 Search any crop or mandi (e.g. Wheat, Mustard, Soybean, Potato, Paddy, Garlic)..."}
              className="w-full pl-10 pr-10 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition text-slate-800 shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* 1-Tap Live GPS Location Button */}
          <div className="sm:col-span-4">
            <button
              onClick={handleDetectGPSLocation}
              disabled={isLocating}
              className={`w-full py-3 px-4 rounded-2xl text-xs font-extrabold flex items-center justify-center space-x-2 transition shadow-sm border cursor-pointer ${
                activeLocationBadge 
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-600/20' 
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}
            >
              <LocateFixed className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
              <span>
                {isLocating 
                  ? (language === 'hi' ? 'स्थान खोज रहे हैं...' : 'Detecting GPS...') 
                  : activeLocationBadge 
                  ? `📍 ${activeLocationBadge}` 
                  : (language === 'hi' ? '📍 लाइव लोकेशन से मंडी ढूंढें' : '📍 Find Mandi by GPS')}
              </span>
            </button>
          </div>
        </div>

        {/* Row 2: Manual Location Selectors (State + District) + Sort By */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
          
          {/* State Filter (Manual Location) */}
          <div className="sm:col-span-4">
            <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wide block mb-1">
              📍 {language === 'hi' ? 'राज्य चुनें (Select State):' : 'State / Region:'}
            </label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('all');
                setActiveLocationBadge('');
              }}
              className="w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition text-slate-800 shadow-xs"
            >
              <option value="all">🇮🇳 {language === 'hi' ? 'सभी राज्य (All India APMCs)' : 'All India APMCs'}</option>
              {statesList.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* District Filter (Manual Location) */}
          <div className="sm:col-span-4">
            <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wide block mb-1">
              🏛️ {language === 'hi' ? 'जिला / मंडी क्षेत्र (District):' : 'District / APMC Area:'}
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setActiveLocationBadge('');
              }}
              className="w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition text-slate-800 shadow-xs"
            >
              <option value="all">📍 {language === 'hi' ? 'सभी जिले व मंडियां (All Districts)' : 'All Districts'}</option>
              {districtsList.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="sm:col-span-4">
            <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wide block mb-1">
              ⚡ {language === 'hi' ? 'क्रमबद्ध करें (Sort By):' : 'Sort Criteria:'}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition text-slate-800 shadow-xs"
            >
              <option value="volume">📊 {language === 'hi' ? 'अधिक आवक (Arrival Volume)' : 'Highest Volume'}</option>
              <option value="gainers">📈 {language === 'hi' ? 'अधिक भाव बढ़त (Top Gainers)' : 'Top 24h Gainers'}</option>
              <option value="price_high">💰 {language === 'hi' ? 'उच्चतम भाव (Price: High to Low)' : 'Price: High to Low'}</option>
              <option value="price_low">📉 {language === 'hi' ? 'न्यूनतम भाव (Price: Low to High)' : 'Price: Low to High'}</option>
              <option value="crop_name">🔤 {language === 'hi' ? 'फसल नाम (A to Z)' : 'Crop Name (A-Z)'}</option>
            </select>
          </div>
        </div>

        {/* Row 3: Quick Crop Chips (Instant 1-Click Search) */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
            <span>{language === 'hi' ? '⚡ त्वरित फसल भाव जांच (1-Click Crop Filter):' : '⚡ Quick Crop Rate Filters:'}</span>
            {(searchQuery || selectedState !== 'all' || selectedDistrict !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedState('all');
                  setSelectedDistrict('all');
                  setActiveLocationBadge('');
                }}
                className="text-emerald-700 hover:text-emerald-900 font-extrabold cursor-pointer"
              >
                {language === 'hi' ? '🔄 रीसेट करें (Show All)' : '🔄 Reset All'}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_CROPS.map(c => {
              const isActive = searchQuery.toLowerCase() === c.query.toLowerCase();
              return (
                <button
                  key={c.query}
                  onClick={() => setSearchQuery(isActive ? '' : c.query)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    isActive 
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm font-black' 
                      : 'bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 4: Category Tabs Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 pb-1 scrollbar-none">
          {categoryTabs.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20 font-extrabold'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. MAIN 2-COLUMN VIEW: DETAIL CHART (LEFT) + COMMODITY CATALOG (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Detailed Interactive Price Chart & AI Strategy (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-7 border-2 border-emerald-200 bg-white shadow-md">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{activeMarket.market} • {activeMarket.district}, {activeMarket.state}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {language === 'hi' ? (activeMarket.commodityHi || activeMarket.commodity) : activeMarket.commodity}
                </h3>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                  {language === 'hi' ? 'गुणवत्ता ग्रेड' : 'Grade'}: <span className="font-bold text-slate-700">{activeMarket.qualityGrade || 'FAQ Grade'}</span>
                </div>
              </div>

              {/* Price & Trend Pill */}
              <div className="flex items-center space-x-3">
                <div className="px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-right shadow-sm">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">{language === 'hi' ? 'चालू मॉडल भाव' : 'Live Spot Rate'}</div>
                  <div className="text-xl sm:text-2xl font-black text-slate-900">
                    ₹{activeMarket.currentPrice?.toLocaleString()} <span className="text-xs font-normal text-slate-500">{language === 'hi' ? '₹/क्विंटल' : activeMarket.unit}</span>
                  </div>
                </div>

                <div className={`px-3.5 py-2.5 rounded-2xl border text-xs font-extrabold flex items-center gap-1.5 shadow-sm ${
                  activeMarket.trend === 'up'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : activeMarket.trend === 'down'
                    ? 'bg-rose-100 text-rose-900 border-rose-300'
                    : 'bg-slate-100 text-slate-900 border-slate-300'
                }`}>
                  {activeMarket.trend === 'up' ? <TrendingUp className="w-4 h-4 text-emerald-700" /> : <TrendingDown className="w-4 h-4 text-rose-700" />}
                  <span>{activeMarket.change24h}</span>
                </div>
              </div>
            </div>

            {/* Min-Max & MSP Quick Matrix */}
            <div className="grid grid-cols-3 gap-3 mt-4 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-semibold">{language === 'hi' ? 'न्यूनतम भाव' : 'Min Price'}</div>
                <div className="text-sm font-black text-slate-800 mt-0.5">₹{activeMarket.minPrice?.toLocaleString() || activeMarket.currentPrice - 80}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-slate-500 font-semibold">{language === 'hi' ? 'अधिकतम भाव' : 'Max Price'}</div>
                <div className="text-sm font-black text-slate-800 mt-0.5">₹{activeMarket.maxPrice?.toLocaleString() || activeMarket.currentPrice + 90}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
                <div className="text-[10px] text-emerald-800 font-semibold">{language === 'hi' ? 'सरकारी एमएसपी' : 'Govt MSP'}</div>
                <div className="text-sm font-black text-emerald-900 mt-0.5">
                  {activeMarket.msp ? `₹${activeMarket.msp?.toLocaleString()}` : (language === 'hi' ? 'गैर-एमएसपी' : 'Open Market')}
                </div>
              </div>
            </div>

            {/* Recharts Interactive Price Chart */}
            <div className="mt-5 h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activeMarket.historical} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#64748b" 
                    fontSize={11} 
                    tickLine={false} 
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={11} 
                    domain={['dataMin - 50', 'dataMax + 50']} 
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderColor: '#10b981', 
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#0f172a',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    formatter={(val) => [`₹${val} / ${language === 'hi' ? 'क्विंटल' : 'Quintal'}`, language === 'hi' ? 'भाव' : 'Price']}
                  />
                  {activeMarket.msp && (
                    <ReferenceLine 
                      y={activeMarket.msp} 
                      stroke="#f59e0b" 
                      strokeDasharray="4 4" 
                      label={{ value: `MSP: ₹${activeMarket.msp}`, fill: '#b45309', fontSize: 10, position: 'top' }} 
                    />
                  )}
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#059669" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#priceGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-200 gap-2">
              <div className="flex items-center space-x-3 font-medium">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span> {language === 'hi' ? '7-दिवसीय वास्तविक भाव' : '7-Day Historical'}</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-cyan-600"></span> {language === 'hi' ? '3-दिवसीय एआई अनुमान' : '3-Day AI Forecast'}</span>
                {activeMarket.msp && (
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> {language === 'hi' ? 'एमएसपी लाइन' : 'MSP Benchmark'}</span>
                )}
              </div>
              <span className="font-bold text-slate-700">{language === 'hi' ? 'दैनिक आवक' : 'Daily Arrivals'}: ~{activeMarket.arrivalTons?.toLocaleString() || 1400} {language === 'hi' ? 'टन' : 'Tons'}</span>
            </div>

          </div>

          {/* AI DECISION & FORECAST CARD */}
          <div className="glass-panel-glow rounded-3xl p-6 border border-emerald-200 bg-white shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {language === 'hi' ? 'एआई मंडी खरीद-बिक्री रणनीति (AI Recommendation)' : 'AI Strategic Recommendation'}
                </span>
              </div>
              <span className={`px-3 py-1 rounded-xl text-xs font-black tracking-wide ${
                activeMarket.sellRecommendation === 'HOLD'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : activeMarket.sellRecommendation === 'SELL NOW'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                  : 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
              }`}>
                {getLocalizedRecommendation(activeMarket)}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-sm">
              <span className="font-bold text-emerald-900 block mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{language === 'hi' ? 'वैज्ञानिक बाजार विश्लेषण:' : 'Market Intelligence Analysis:'}</span>
              </span>
              {language === 'hi' ? (activeMarket.forecastNoteHi || activeMarket.forecastNote) : activeMarket.forecastNote}
            </div>
          </div>

          {/* 5. MULTI-MANDI LOCAL VS REGIONAL ARBITRAGE COMPARATOR */}
          {comparisonMarkets.length > 0 && (
            <div className="glass-panel-glow rounded-3xl p-6 border border-emerald-200 bg-white shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Store className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900">
                      {language === 'hi' ? 'स्थानिक एवं राष्ट्रीय मंडियों में भाव तुलना (Live Arbitrage)' : 'Local vs National Mandi Price Comparison'}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {language === 'hi' ? `समान फसल के अन्य नजदीकी एवं राष्ट्रीय मंडियों के आज के भाव` : `Compare today's rates for this crop across different mandis`}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                  {comparisonMarkets.length + 1} {language === 'hi' ? 'मंडियां' : 'Mandis'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {comparisonMarkets.map((comp) => {
                  const diff = comp.currentPrice - activeMarket.currentPrice;
                  return (
                    <div
                      key={comp.id}
                      onClick={() => setSelectedCommodityId(comp.id)}
                      className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 transition cursor-pointer flex items-center justify-between group"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 truncate">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="truncate">{comp.market}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 ml-5 font-medium truncate">
                          {comp.district}, {comp.state}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-black text-slate-900">
                          ₹{comp.currentPrice.toLocaleString()} <span className="text-[10px] text-slate-500 font-normal">/q</span>
                        </div>
                        <div className={`text-[10px] font-extrabold ${diff > 0 ? 'text-emerald-700' : diff < 0 ? 'text-rose-700' : 'text-slate-500'}`}>
                          {diff > 0 ? `+₹${diff} (${language === 'hi' ? 'अधिक' : 'Higher'})` : diff < 0 ? `-₹${Math.abs(diff)} (${language === 'hi' ? 'कम' : 'Lower'})` : (language === 'hi' ? 'समान भाव' : 'Same Rate')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Right: Real-Time Commodity Grid Catalog (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
              <Store className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'दैनिक लाइव मंडी सूची' : 'Daily Live Rates Catalog'}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">{markets.length}</span>
            </h3>
            <span className="text-[11px] text-slate-500">{language === 'hi' ? 'चयन हेतु क्लिक करें' : 'Click to inspect'}</span>
          </div>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {markets.map((m) => {
              const isSelected = m.id === selectedCommodityId;
              const title = language === 'hi' ? (m.commodityHi || m.commodity) : m.commodity;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedCommodityId(m.id)}
                  className={`p-4 rounded-2xl border transition cursor-pointer relative ${
                    isSelected
                      ? 'bg-emerald-50/90 border-2 border-emerald-500 shadow-md shadow-emerald-600/10'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/60 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{m.market} ({m.district})</span>
                      </div>
                      <h4 className="text-sm font-black text-slate-900 mt-0.5 truncate">
                        {title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-bold border border-slate-200">
                          {m.categoryLabel || m.category}
                        </span>
                        {m.msp && (
                          <span className="text-[10px] text-emerald-700 font-semibold">
                            MSP: ₹{m.msp}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-base font-black text-slate-900">
                        ₹{m.currentPrice?.toLocaleString()}
                      </div>
                      <div className={`text-[11px] font-extrabold flex items-center justify-end gap-0.5 ${
                        m.trend === 'up' ? 'text-emerald-700' : m.trend === 'down' ? 'text-rose-700' : 'text-slate-600'
                      }`}>
                        {m.trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                        <span>{m.change24h}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation Tag */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">
                      {language === 'hi' ? 'आवक' : 'Arrivals'}: <strong className="text-slate-700">~{m.arrivalTons}t</strong>
                    </span>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${
                      m.sellRecommendation === 'HOLD'
                        ? 'bg-emerald-100 text-emerald-800'
                        : m.sellRecommendation === 'SELL NOW'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}>
                      {m.sellRecommendation}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Side-by-Side Multi-Mandi Price Comparison & Arbitrage Table */}
      {markets.length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-sm mt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
                  <Scale className="w-4 h-4 text-emerald-700" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  {language === 'hi' ? 'तुलनात्मक मंडी मूल्य एवं आर्बिट्राज तालिका (Side-by-Side Mandi Comparison)' : 'Side-by-Side Multi-Mandi Price Comparison & Profit Arbitrage'}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {language === 'hi'
                  ? 'विभिन्न मंडियों के न्यूनतम, मॉडल और उच्चतम भावों की सीधी तुलना — उच्चतम मुनाफा देने वाली मंडी चुनें।'
                  : 'Direct comparison of Min, Modal, and Peak rates across active regional mandis to identify maximum farmer profit.'}
              </p>
            </div>

            {comparisonStats && (
              <div className="flex items-center gap-2 flex-wrap">
                <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                  <span className="text-[10px] text-emerald-600 uppercase font-bold block">{language === 'hi' ? 'उच्चतम मंडी भाव' : 'Peak Mandi'}</span>
                  <span className="font-extrabold">{comparisonStats.highest.market}: ₹{comparisonStats.highest.currentPrice.toLocaleString()}</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <span className="text-[10px] text-amber-600 uppercase font-bold block">{language === 'hi' ? 'मूल्य अंतर (Spread)' : 'Price Spread'}</span>
                  <span className="font-extrabold">₹{comparisonStats.spread.toLocaleString()}/q {language === 'hi' ? 'अंतर' : 'gap'}</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">{language === 'hi' ? 'औसत भाव' : 'Average Rate'}</span>
                  <span className="font-extrabold">₹{comparisonStats.avg.toLocaleString()}/q</span>
                </div>
              </div>
            )}
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase font-bold tracking-wider text-[10px] bg-slate-50/70">
                  <th className="py-3 px-3 rounded-l-xl">{language === 'hi' ? 'मंडी एवं स्थान' : 'Mandi & Location'}</th>
                  <th className="py-3 px-3">{language === 'hi' ? 'फसल व किस्म' : 'Commodity'}</th>
                  <th className="py-3 px-3 text-right">{language === 'hi' ? 'मॉडल भाव (₹/क्विंटल)' : 'Modal Price (₹/q)'}</th>
                  <th className="py-3 px-3 text-center">{language === 'hi' ? 'दैनिक रेंज (न्यूनतम - अधिकतम)' : "Today's Range (Min - Max)"}</th>
                  <th className="py-3 px-3 text-center">{language === 'hi' ? 'एमएसपी तुलना' : 'MSP Benchmark'}</th>
                  <th className="py-3 px-3 text-right">{language === 'hi' ? 'दैनिक आवक' : 'Arrivals'}</th>
                  <th className="py-3 px-3 text-center rounded-r-xl">{language === 'hi' ? 'एआई सिफारिश' : 'Action / Recommendation'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {markets.map((m) => {
                  const isSelected = m.id === selectedCommodityId;
                  const isBestPrice = comparisonStats && m.currentPrice === comparisonStats.highest.currentPrice;
                  const mspDiff = m.msp ? m.currentPrice - m.msp : null;

                  return (
                    <tr
                      key={m.id}
                      onClick={() => setSelectedCommodityId(m.id)}
                      className={`hover:bg-emerald-50/60 cursor-pointer transition ${
                        isSelected ? 'bg-emerald-50/80 font-semibold' : ''
                      }`}
                    >
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="font-black text-slate-900">{m.market}</span>
                          {isBestPrice && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-extrabold ml-1">
                              ⭐ {language === 'hi' ? 'सर्वोत्तम' : 'Best'}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium ml-5">
                          {m.district}, {m.state}
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="font-bold text-slate-800">
                          {language === 'hi' ? (m.commodityHi || m.commodity) : m.commodity}
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {m.variety || m.category}
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <div className="text-sm font-black text-slate-900">
                          ₹{m.currentPrice.toLocaleString()}
                        </div>
                        <div className={`text-[10px] font-bold flex items-center justify-end gap-0.5 ${
                          m.changePercent >= 0 ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                          {m.changePercent >= 0 ? '+' : ''}{m.changePercent}%
                          {m.changePercent >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <div className="text-slate-700 font-bold">
                          ₹{m.minPrice?.toLocaleString()} – ₹{m.maxPrice?.toLocaleString()}
                        </div>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full mx-auto mt-1 overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{
                              width: `${Math.min(100, Math.max(10, ((m.currentPrice - (m.minPrice || 0)) / Math.max(1, (m.maxPrice || 1) - (m.minPrice || 0))) * 100))}%`
                            }}
                          />
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        {m.msp ? (
                          <div>
                            <span className="text-[10px] text-slate-500 font-medium">MSP: ₹{m.msp}</span>
                            <div className={`text-[10px] font-extrabold ${mspDiff >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {mspDiff >= 0 ? `+₹${mspDiff} ${language === 'hi' ? 'ऊपर' : 'above'}` : `-₹${Math.abs(mspDiff)} ${language === 'hi' ? 'नीचे' : 'below'}`}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[10px]">-</span>
                        )}
                      </td>

                      <td className="py-3.5 px-3 text-right">
                        <span className="font-bold text-slate-700">{m.arrivals}</span>
                      </td>

                      <td className="py-3.5 px-3 text-center">
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full whitespace-nowrap inline-block ${
                          m.sellRecommendation === 'SELL NOW'
                            ? 'bg-rose-100 text-rose-800'
                            : m.sellRecommendation === 'HOLD'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {getLocalizedRecommendation(m)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}

