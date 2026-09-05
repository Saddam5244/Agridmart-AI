import React, { useState } from 'react';
import { 
  Sprout, 
  Languages, 
  Mic,
  Droplets, 
  ScanLine, 
  TrendingUp, 
  MessageSquareText, 
  LayoutDashboard,
  ShieldCheck,
  ChevronDown,
  UserCheck,
  ShieldAlert,
  Landmark,
  Cpu,
  FileCheck2,
  CloudSun,
  LogOut,
  User
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../utils/languages';
import { getTranslation } from '../utils/translations';
import LanguageSelectorModal from './LanguageSelectorModal';

export default function Navbar({ 
  portalRole, 
  setPortalRole,
  activeTab, 
  setActiveTab, 
  language, 
  setLanguage, 
  openAssistantModal,
  openPassportModal,
  openWeatherModal,
  farmLocation = { city: "Indore, MP", temp: 29 },
  farmHealth = 87,
  broadcastCount = 0,
  farmerUser = null,
  onLogout
}) {
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const t = getTranslation(language);
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const tabs = [
    { id: 'dashboard', label: t.tabs.dashboard, icon: LayoutDashboard },
    { id: 'simulator', label: language === 'hi' ? 'व्हाट-इफ सिम्युलेटर' : language === 'bho' ? 'व्हाट-इफ सिम्युलेटर' : 'What-If Simulator', icon: Cpu },
    { id: 'disease', label: t.tabs.disease, icon: ScanLine },
    { id: 'crops', label: t.tabs.crops, icon: Sprout },
    { id: 'market', label: t.tabs.market, icon: TrendingUp },
    { id: 'schemes', label: t.tabs.schemes || "Govt Schemes", icon: Landmark },
    { id: 'assistant', label: t.tabs.assistant, icon: MessageSquareText },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Brand */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setPortalRole('user'); setActiveTab('dashboard'); }}>
              <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-500/20">
                <Sprout className="w-7 h-7 text-white stroke-[2.2]" />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 ring-2 ring-white"></span>
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 font-['Outfit']">
                    Agri<span className="text-emerald-600">Smart</span> <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 tracking-normal uppercase">AI 1.0</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium hidden sm:block">
                  {t.tagline}
                </p>
              </div>
            </div>

            {/* Action Controls & Side Admin Portal */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Language Selector */}
              <button
                onClick={() => setIsLangModalOpen(true)}
                className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 hover:border-emerald-500 text-xs font-semibold text-slate-800 transition shadow-sm group"
                title="Select Indian Language"
              >
                <Languages className="w-3.5 h-3.5 text-emerald-600" />
                <span className="flex items-center gap-1">
                  <span>{currentLangObj.icon}</span>
                  <span className="font-bold hidden md:inline">{currentLangObj.nativeName}</span>
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500 group-hover:text-emerald-600 transition" />
              </button>

              {/* Voice Assistant Trigger */}
              <button
                onClick={openAssistantModal}
                className="relative flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition group"
              >
                <Mic className="w-3.5 h-3.5 animate-pulse" />
                <span className="hidden lg:inline">{t.voiceAi}</span>
              </button>

              {/* Live Weather Forecast Trigger */}
              <button
                onClick={openWeatherModal}
                className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 hover:bg-amber-100 text-amber-900 text-xs font-bold transition shadow-sm"
                title={`Live Satellite Weather for ${farmLocation.city} — Click to Change Location`}
              >
                <CloudSun className="w-3.5 h-3.5 text-amber-600" />
                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs">
                  <span>📍 {farmLocation.city.split(',')[0]}</span>
                  <span className="text-amber-700 font-extrabold">({farmLocation.temp || 29}°C)</span>
                </span>
              </button>

              {/* Crop Health Passport (QR) */}
              <button
                onClick={openPassportModal}
                className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-cyan-50 border border-cyan-300 hover:bg-cyan-100 text-cyan-900 text-xs font-bold transition shadow-sm"
                title="View Digital Crop Health Passport & QR"
              >
                <FileCheck2 className="w-3.5 h-3.5 text-cyan-600" />
                <span className="hidden md:inline">{language === 'hi' ? 'फसल पासपोर्ट' : 'Crop Passport'}</span>
              </button>

              {/* Vertical Divider separating Farmer tools from side Admin Portal */}
              <div className="h-6 w-px bg-slate-200 mx-0.5 sm:mx-1"></div>

              {/* Dedicated Side Admin Portal / Officer Switch */}
              {portalRole === 'user' ? (
                <button
                  onClick={() => setPortalRole('admin')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all border border-slate-700/80 group"
                  title="Open District Agriculture Officer & Admin Portal"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="whitespace-nowrap">
                    {language === 'hi' ? 'अधिकारी पोर्टल' : language === 'bho' ? 'अधिकारी पोर्टल' : t.adminView || 'Admin Portal'}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => setPortalRole('user')}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold shadow-md shadow-emerald-600/30 transition-all group"
                  title="Return to Farmer Dashboard"
                >
                  <span className="text-sm">🌾</span>
                  <span className="whitespace-nowrap">
                    {language === 'hi' ? 'किसान दृश्य' : language === 'bho' ? 'किसान दृश्य' : t.farmerView || 'Farmer View'}
                  </span>
                </button>
              )}

              {/* Farmer Profile Badge & Logout Button */}
              {farmerUser && (
                <div className="flex items-center space-x-1.5 pl-1">
                  <div 
                    className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 font-bold shadow-2xs"
                    title={`Farmer: ${farmerUser.name} | Age: ${farmerUser.age} | ${farmerUser.district}, ${farmerUser.state} | Crop: ${farmerUser.primaryCrop}`}
                  >
                    {farmerUser.photoURL ? (
                      <img 
                        src={farmerUser.photoURL} 
                        alt={farmerUser.name} 
                        className="w-5 h-5 rounded-full object-cover ring-1.5 ring-emerald-500 shrink-0" 
                        onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <span className="text-sm">👨‍🌾</span>
                    )}
                    <span className="truncate max-w-[110px]">{farmerUser.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-emerald-700 font-medium">({farmerUser.district})</span>
                  </div>

                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-300 text-xs font-bold transition shadow-2xs cursor-pointer"
                    title="Logout & Switch Account / लॉगआउट करें"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-600" />
                    <span className="hidden sm:inline">{language === 'hi' ? 'लॉगआउट' : 'Logout'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Tabs Bar (Only in User / Farmer View) */}
          {portalRole === 'user' ? (
            <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2.5 pt-1 scrollbar-none border-t border-slate-100">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-bold ring-1 ring-emerald-500'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          ) : (
            <div className="flex items-center justify-between py-2 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
                <span className="font-bold text-cyan-700 uppercase tracking-wider">
                  District Command Operations Active
                </span>
              </div>
              <button
                onClick={() => setPortalRole('user')}
                className="flex items-center space-x-1 text-emerald-700 hover:text-emerald-800 font-semibold bg-emerald-50 hover:bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200 transition"
              >
                <span>← {language === 'hi' ? 'किसान दृश्य पर वापस जाएं' : 'Return to Farmer View'}</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Language Selection Modal */}
      <LanguageSelectorModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        currentLanguage={language}
        onSelectLanguage={(langCode) => setLanguage(langCode)}
      />
    </>
  );
}
