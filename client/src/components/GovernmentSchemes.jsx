import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  ExternalLink, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  Calendar, 
  Landmark, 
  Sparkles, 
  Tag, 
  Filter, 
  ShieldCheck, 
  PhoneCall,
  History,
  Award,
  ChevronRight,
  Sun,
  Droplets,
  Coins,
  Cpu,
  Tractor,
  Layers
} from 'lucide-react';
import { fetchGovernmentSchemes, fetchPolicyTimeline } from '../services/api';
import { getTranslation } from '../utils/translations';
import { SUPPORTED_LANGUAGES } from '../utils/languages';

export default function GovernmentSchemes({ language = "en" }) {
  const [viewMode, setViewMode] = useState('schemes'); // 'schemes' | 'timeline'
  const [schemes, setSchemes] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [speakingId, setSpeakingId] = useState(null);

  const t = getTranslation(language);
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    loadSchemesAndTimeline();
  }, [selectedCategory, searchQuery]);

  const loadSchemesAndTimeline = async () => {
    setLoading(true);
    try {
      const [schemesRes, timelineRes] = await Promise.all([
        fetchGovernmentSchemes(selectedCategory, searchQuery),
        fetchPolicyTimeline()
      ]);
      if (schemesRes?.schemes) setSchemes(schemesRes.schemes);
      if (timelineRes?.timeline) setTimeline(timelineRes.timeline);
    } catch (err) {
      console.error("Schemes load failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: t.schemes?.allCategories || "All Schemes", icon: Layers },
    { id: 'income_support', label: t.schemes?.incomeSupport || "Direct Income", icon: Coins },
    { id: 'irrigation_solar', label: t.schemes?.irrigationSolar || "Irrigation & Solar", icon: Droplets },
    { id: 'insurance_relief', label: t.schemes?.insuranceRelief || "Crop Insurance", icon: ShieldCheck },
    { id: 'loans_credit', label: t.schemes?.loansCredit || "KCC & Loans", icon: Landmark },
    { id: 'machinery_drone', label: t.schemes?.machineryDrone || "Machinery & Drones", icon: Tractor },
    { id: 'land_titling', label: t.schemes?.landTitling || "Land Records & SVAMITVA", icon: FileText },
    { id: 'organic_natural', label: t.schemes?.organicNatural || "Organic Farming", icon: Award },
  ];

  const handleSpeak = (scheme) => {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported on this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    if (speakingId === scheme.id) {
      setSpeakingId(null);
      return;
    }

    let textToSpeak = "";
    if (language === 'bho') {
      textToSpeak = `योजना के नाम: ${scheme.nameBho || scheme.name}। सरकारी लाभ: ${scheme.benefitAmountBho || scheme.benefitAmountHi || scheme.benefitAmount}। विवरण: ${scheme.shortDescBho || scheme.shortDescHi || scheme.shortDesc}`;
    } else if (language === 'hi') {
      textToSpeak = `योजना का नाम: ${scheme.nameHi || scheme.name}। सरकारी लाभ: ${scheme.benefitAmountHi || scheme.benefitAmount}। संक्षिप्त विवरण: ${scheme.shortDescHi || scheme.shortDesc}। आवश्यक दस्तावेज: आधार कार्ड और खतौनी भू-अभिलेख।`;
    } else {
      textToSpeak = `Scheme Name: ${scheme.name}. Government Benefit: ${scheme.benefitAmount}. Overview: ${scheme.shortDesc}. Required documents: Aadhaar card and land records.`;
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = currentLangObj.speechCode || 'hi-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(scheme.id);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 bg-white border-2 border-emerald-500/30 shadow-xl shadow-emerald-500/5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
              <Landmark className="w-3.5 h-3.5" />
              <span>{t.schemes?.badge || "Central & State Government Portals • Verified Schemes"}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900">
              {t.schemes?.title || "Government Schemes & Farm Land Policies"}
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed font-medium">
              {t.schemes?.desc || "Complete directory of verified subsidies, direct income support (PM-KISAN), 60-80% drip/solar pump grants, and yearly chronological land bills (1998–2026) with direct official application portals."}
            </p>
          </div>

          {/* View Mode Switcher (Schemes vs Policy Timeline) */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 border border-slate-200 shrink-0">
            <button
              onClick={() => setViewMode('schemes')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                viewMode === 'schemes'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>{t.schemes?.viewSchemes || "Active Schemes & Subsidies"}</span>
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                viewMode === 'timeline'
                  ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>{t.schemes?.policyTimeline || "Yearly Policy Timeline (1998–2026)"}</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Category Chips (Shown in Schemes View) */}
        {viewMode === 'schemes' && (
          <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
            
            {/* Search Input */}
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.schemes?.searchPlaceholder || "Search by scheme, subsidy, drone, solar pump, KCC..."}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none placeholder:text-slate-400 font-medium"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-md shadow-emerald-600/20'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 📜 VIEW 1: ACTIVE SCHEMES & DIRECT APPLICATION CARDS */}
      {/* ========================================================= */}
      {viewMode === 'schemes' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {schemes.map((scheme) => {
            const localizedName = language === 'hi' ? (scheme.nameHi || scheme.name) : language === 'bho' ? (scheme.nameBho || scheme.nameHi || scheme.name) : scheme.name;
            const localizedBenefit = language === 'hi' ? (scheme.benefitAmountHi || scheme.benefitAmount) : language === 'bho' ? (scheme.benefitAmountBho || scheme.benefitAmountHi || scheme.benefitAmount) : scheme.benefitAmount;
            const localizedDesc = language === 'hi' ? (scheme.shortDescHi || scheme.shortDesc) : language === 'bho' ? (scheme.shortDescBho || scheme.shortDescHi || scheme.shortDesc) : scheme.shortDesc;
            const localizedEligibility = language === 'hi' ? (scheme.eligibilityHi || scheme.eligibility) : scheme.eligibility;
            const localizedDocs = language === 'hi' ? (scheme.documentsRequiredHi || scheme.documentsRequired) : scheme.documentsRequired;

            return (
              <div 
                key={scheme.id}
                className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-emerald-400 bg-white transition flex flex-col justify-between space-y-5 group shadow-sm hover:shadow-md"
              >
                <div className="space-y-4">
                  
                  {/* Card Top: Ministry, Launch Year & Voice Readout */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wide border border-slate-200">
                          Est. {scheme.launchYear}
                        </span>
                        <span className="text-[11px] text-emerald-700 font-bold">
                          {scheme.ministryHi && language === 'hi' ? scheme.ministryHi : scheme.ministry}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1.5 group-hover:text-emerald-700 transition">
                        {localizedName}
                      </h3>
                    </div>

                    <button
                      onClick={() => handleSpeak(scheme)}
                      className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 border border-slate-200 transition shrink-0"
                      title={t.schemes?.listenScheme || "Listen Scheme Details"}
                    >
                      {speakingId === scheme.id ? <VolumeX className="w-4 h-4 text-emerald-600 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Benefit & Subsidy Highlight Box */}
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block mb-1">
                      💰 {t.schemes?.benefitAmount || "Financial Benefit & Subsidy"}
                    </span>
                    <p className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                      {localizedBenefit}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {localizedDesc}
                  </p>

                  {/* Eligibility Checklist */}
                  <div className="space-y-1.5 pt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
                      <span>{t.schemes?.eligibility || "Eligibility Criteria"}</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {localizedEligibility?.map((el, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 mt-1.5 shrink-0"></span>
                          <span>{el}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Documents Checklist */}
                  <div className="space-y-1.5 pt-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      <span>{t.schemes?.documents || "Required Documents Checklist"}</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {localizedDocs?.map((doc, i) => (
                        <div key={i} className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 flex items-start space-x-1.5 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card Footer: Official Portal Apply Button & Helpline */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500 font-medium">
                    <span className="text-slate-700 font-bold">Toll Free: </span>
                    <span>{scheme.helplineNumber}</span>
                  </div>

                  <a
                    href={scheme.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center space-x-1.5 shadow-md shadow-emerald-600/20 transition whitespace-nowrap"
                  >
                    <span>{t.schemes?.applyOfficial || "Apply on Official Portal"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================= */}
      {/* 📅 VIEW 2: YEARLY POLICY & LAND BILL TIMELINE (1998–2026) */}
      {/* ========================================================= */}
      {viewMode === 'timeline' && (
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-emerald-200 bg-white shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {language === 'hi' ? 'भारतीय कृषि एवं भूमि सुधार कानूनों का कालक्रम (1998 – 2026)' : 'Chronological Timeline of Indian Farm Land & Policy Acts'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                Official gazette notifications, land digitization reforms, and subsidy frameworks organized by year.
              </p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 font-bold border border-cyan-300 self-start sm:self-center">
              10 Milestone Policies
            </span>
          </div>

          {/* Timeline Nodes */}
          <div className="relative border-l-2 border-emerald-400 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8">
            {timeline.map((item, idx) => {
              const localizedTitle = language === 'hi' ? (item.policyNameHi || item.policyName) : language === 'bho' ? (item.policyNameBho || item.policyNameHi || item.policyName) : item.policyName;
              const localizedSummary = language === 'hi' ? (item.summaryHi || item.summary) : language === 'bho' ? (item.summaryBho || item.summaryHi || item.summary) : item.summary;

              return (
                <div key={idx} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full bg-white border-2 border-emerald-600 flex items-center justify-center group-hover:scale-125 transition shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  </div>

                  {/* Timeline Content Card */}
                  <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition space-y-3 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-sm">
                          {item.year}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">
                          {item.authority}
                        </span>
                      </div>
                      <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-white text-cyan-800 border border-cyan-200 font-bold">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {localizedTitle}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                      {localizedSummary}
                    </p>

                    <div className="pt-2 flex justify-end">
                      <a
                        href={item.officialGazetteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center space-x-1"
                      >
                        <span>{language === 'hi' ? 'आधिकारिक राजपत्र देखें' : 'View Official Gazette'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
