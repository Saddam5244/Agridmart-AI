import React from 'react';
import { X, Globe, Check, Sparkles } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../utils/languages';

export default function LanguageSelectorModal({ isOpen, onClose, currentLanguage, onSelectLanguage }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-md">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base sm:text-lg flex items-center gap-2">
                <span>Select Your Language / भाषा चुनें</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  10 Languages
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Choose your native language for platform interface and voice advisory
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    onSelectLanguage(lang.code);
                    onClose();
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/20'
                      : 'bg-slate-950/60 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <span className="text-2xl">{lang.icon}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-base font-extrabold text-white group-hover:text-emerald-300 transition">
                          {lang.nativeName}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          ({lang.name})
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {lang.region}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-md">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Highlight note for rural & regional accessibility */}
          <div className="mt-5 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center space-x-3 text-xs text-emerald-300">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              All modules (Disease Scanner, Smart Irrigation, Crop Advisor, Mandi Forecast & Voice AI) seamlessly adapt to your selected language!
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
