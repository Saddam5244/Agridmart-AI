import React, { useState, useEffect } from 'react';
import { 
  X, 
  QrCode, 
  ShieldCheck, 
  FileCheck2, 
  Calendar, 
  MapPin, 
  Award, 
  Download, 
  CheckCircle2, 
  Sparkles,
  Droplet,
  Layers,
  ExternalLink
} from 'lucide-react';
import { fetchCropPassport } from '../services/api';
import { getTranslation } from '../utils/translations';

export default function CropPassportModal({ isOpen, onClose, batchId = "PASSPORT-WHEAT-2026", language = "en" }) {
  const [passport, setPassport] = useState(null);
  const [loading, setLoading] = useState(true);

  const t = getTranslation(language);

  useEffect(() => {
    if (isOpen) {
      loadPassport();
    }
  }, [isOpen, batchId]);

  const loadPassport = async () => {
    setLoading(true);
    try {
      const res = await fetchCropPassport(batchId);
      if (res?.passport) {
        setPassport(res.passport);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-slate-950 border border-emerald-500/40 p-6 sm:p-8 shadow-2xl shadow-emerald-950/60 my-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'डिजिटल फसल स्वास्थ्य पासपोर्ट • फार्म-टू-मार्केट' : 'Digital Crop Health Passport • Farm-to-Market'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {passport?.crop || "Wheat (Lokwan / Sharbati Premium)"}
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Batch ID: {passport?.batchId || "AGRI-IN-MP-2026-WHT-0042"}
            </p>
          </div>

          <span className="px-3 py-1 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs shrink-0 flex items-center gap-1 shadow-md">
            <Award className="w-3.5 h-3.5" />
            <span>Grade A+ Verified</span>
          </span>
        </div>

        {/* Passport Main Grid: Details + Verified QR Code */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Origin, Seed, Soil & Treatment Logs */}
          <div className="md:col-span-2 space-y-4 text-xs">
            
            {/* Origin & Farmer Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
                📍 {language === 'hi' ? 'खेत एवं किसान सत्यापन' : 'Farm & Grower Verification'}
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px]">Farmer:</span>
                  <span className="font-bold text-white">{passport?.farmer}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Farm & Location:</span>
                  <span className="font-bold text-white">{passport?.farm} ({passport?.location})</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Sowing Date:</span>
                  <span className="font-bold text-white">{passport?.sowingDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Expected Harvest:</span>
                  <span className="font-bold text-emerald-400">{passport?.expectedHarvest}</span>
                </div>
              </div>
            </div>

            {/* Seed & Soil Quality */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400">
                🌱 {language === 'hi' ? 'बीज व मृदा गुणवत्ता' : 'Certified Seed & Soil Condition'}
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div>
                  <span className="text-slate-500 block text-[10px]">Seed Variety:</span>
                  <span className="font-bold text-white">{passport?.seedInfo?.variety}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Certification:</span>
                  <span className="font-bold text-white">{passport?.seedInfo?.certificationAgency}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Soil Type & pH:</span>
                  <span className="font-bold text-white">{passport?.soilBaseline?.type} (pH {passport?.soilBaseline?.ph})</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Organic Carbon:</span>
                  <span className="font-bold text-white">{passport?.soilBaseline?.organicCarbon}</span>
                </div>
              </div>
            </div>

            {/* Agrochemical History */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">
                🧪 {language === 'hi' ? 'खाद एवं जैविक उपचार इतिहास' : 'Treatment & Fertilizer Log'}
              </div>
              <ul className="space-y-1 text-slate-300">
                {passport?.agrochemicalLog?.map((log, i) => (
                  <li key={i} className="flex items-center justify-between py-1 border-b border-slate-800/60 last:border-0 text-[11px]">
                    <span className="text-slate-400 font-mono">{log.date} • {log.type}</span>
                    <span className="font-semibold text-white">{log.input}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Col: Verified Scannable QR Code for Buyers */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 flex flex-col items-center justify-between text-center space-y-4 shadow-xl">
            <div className="space-y-1">
              <div className="text-xs font-black uppercase text-emerald-400">
                {language === 'hi' ? 'व्यापारी सत्यापन क्यूआर कोड' : 'Buyer QR Verification'}
              </div>
              <p className="text-[10px] text-slate-400">
                {language === 'hi' ? 'खरीदार/मंडी व्यापारी स्कैन करके फसल की शुद्धता जांच सकते हैं।' : 'Scan to inspect full farm-to-market chemical history & purity.'}
              </p>
            </div>

            {/* Simulated Clean QR Code Graphic */}
            <div className="p-4 rounded-2xl bg-white shadow-2xl flex flex-col items-center justify-center">
              <QrCode className="w-36 h-36 text-slate-950" />
              <span className="text-[9px] font-mono text-slate-700 mt-1 font-bold">
                {passport?.batchId}
              </span>
            </div>

            <div className="space-y-1 w-full text-center">
              <div className="text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Residue-Free Verified</span>
              </div>
              <div className="text-[10px] text-slate-500">
                GPS Geo-Tagged (Plot A1)
              </div>
            </div>

            <button
              onClick={() => alert("Digital Crop Passport QR Downloaded!")}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center space-x-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'पासपोर्ट डाउनलोड करें' : 'Download Passport'}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
