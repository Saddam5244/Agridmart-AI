import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Coins, 
  Calendar, 
  ShieldCheck, 
  RotateCw,
  MapPin,
  Sliders,
  Compass,
  Droplets,
  Thermometer,
  Scale
} from 'lucide-react';
import { getCropRecommendations, fetchLocationAgroProfile } from '../services/api';
import CropComparisonMatrix from './CropComparisonMatrix';
import { 
  getTranslation, 
  CROP_NAMES_MAP, 
  SEASONS_MAP, 
  SOIL_TYPES_MAP,
  PRESETS_MAP
} from '../utils/translations';

export default function CropRecommender({ 
  language = "en",
  farmLocation = { city: "Indore, Madhya Pradesh", lat: 22.7196, lon: 75.8577 }
}) {
  const [mode, setMode] = useState('auto'); // 'auto' (Location-Driven) | 'manual' (Custom Soil Card)
  const [agroProfile, setAgroProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const [nitrogen, setNitrogen] = useState(120);
  const [phosphorus, setPhosphorus] = useState(60);
  const [potassium, setPotassium] = useState(45);
  const [ph, setPh] = useState(6.8);
  const [soilType, setSoilType] = useState('Alluvial / Loamy');
  const [season, setSeason] = useState('rabi');
  const [rainfallMm, setRainfallMm] = useState(650);

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const t = getTranslation(language);

  // Load Agro-Location Profile on mount or location change
  useEffect(() => {
    loadLocationAgroProfile();
  }, [farmLocation?.city, farmLocation?.lat, farmLocation?.lon]);

  const loadLocationAgroProfile = async () => {
    setLoadingProfile(true);
    try {
      const data = await fetchLocationAgroProfile({
        lat: farmLocation?.lat,
        lon: farmLocation?.lon,
        city: farmLocation?.city
      });
      if (data?.success) {
        setAgroProfile(data);
        if (mode === 'auto') {
          applyLocationProfile(data);
        }
      }
    } catch (e) {
      console.warn("Agro profile load failed:", e);
    } finally {
      setLoadingProfile(false);
    }
  };

  const applyLocationProfile = (profileData) => {
    if (!profileData) return;
    const { agroProfile, season: sData, liveWeather } = profileData;
    if (agroProfile?.soilCode) {
      setSoilType(agroProfile.soilCode);
    }
    if (sData?.seasonKey) {
      setSeason(sData.seasonKey);
    }
    if (agroProfile?.baselineNPK) {
      setNitrogen(agroProfile.baselineNPK.nitrogen);
      setPhosphorus(agroProfile.baselineNPK.phosphorus);
      setPotassium(agroProfile.baselineNPK.potassium);
      setPh(agroProfile.baselineNPK.ph);
    }
    if (agroProfile?.rainfallAverageMm) {
      setRainfallMm(agroProfile.rainfallAverageMm);
    }
  };

  useEffect(() => {
    if (mode === 'auto' && agroProfile) {
      applyLocationProfile(agroProfile);
    }
  }, [mode]);

  useEffect(() => {
    runRecommendation();
  }, [nitrogen, phosphorus, potassium, ph, soilType, season, rainfallMm]);

  const runRecommendation = async () => {
    setLoading(true);
    try {
      const data = await getCropRecommendations({
        nitrogen: Number(nitrogen),
        phosphorus: Number(phosphorus),
        potassium: Number(potassium),
        ph: Number(ph),
        soilType,
        season,
        rainfallMm: Number(rainfallMm)
      });
      if (data?.topRecommendations) {
        setRecommendations(data.topRecommendations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyPreset = (presetKey) => {
    if (presetKey === 'central') {
      setNitrogen(115);
      setPhosphorus(55);
      setPotassium(40);
      setPh(6.8);
      setSoilType('Loamy');
      setSeason('rabi');
      setRainfallMm(800);
    } else if (presetKey === 'north') {
      setNitrogen(145);
      setPhosphorus(70);
      setPotassium(50);
      setPh(7.2);
      setSoilType('Alluvial / Loamy');
      setSeason('rabi');
      setRainfallMm(600);
    } else if (presetKey === 'deccan') {
      setNitrogen(90);
      setPhosphorus(45);
      setPotassium(65);
      setPh(7.6);
      setSoilType('Clay');
      setSeason('kharif');
      setRainfallMm(750);
    } else if (presetKey === 'arid') {
      setNitrogen(60);
      setPhosphorus(30);
      setPotassium(30);
      setPh(8.1);
      setSoilType('Sandy');
      setSeason('zaid');
      setRainfallMm(350);
    }
  };

  // Helper for localized crop advice
  const getLocalizedCropAdvice = (cropName) => {
    if (cropName.includes("Wheat")) {
      if (language === 'hi') return "बुवाई के 21 दिन बाद पहली क्राउन रूट सिंचाई आवश्यक है। संतुलित NPK (120:60:40) का प्रयोग करें।";
      if (language === 'bho') return "बोआई के 21 दिन बाद पहिलका पटवन जरूर करीं। संतुलित NPK खाद डालीं।";
      return "Crown root initiation watering at 21 days is vital. Split nitrogen at first irrigation.";
    }
    if (cropName.includes("Gram") || cropName.includes("Chickpea")) {
      if (language === 'hi') return "दलहनी फसल होने के कारण कम यूरिया की आवश्यकता होती है। फूल आते समय सिंचाई से बचें।";
      if (language === 'bho') return "चना के फसल में जादे यूरिया मत डालीं। फूल आवे के समय पानी मत पटावीं।";
      return "Nitrogen-fixing legume; minimal urea required. Avoid heavy irrigation during flowering.";
    }
    if (cropName.includes("Mustard")) {
      if (language === 'hi') return "तेल की मात्रा बढ़ाने के लिए सल्फर 25-30 किग्रा/हेक्टेयर डालें। 35 दिन पर पहली सिंचाई करें।";
      if (language === 'bho') return "तेल बढ़ावे खातिर सल्फर 25-30 किग्रा/हेक्टेयर डालीं। 35 दिन प पहिलका पटवन करीं।";
      return "Apply elemental sulfur (25 kg/ha) to boost oil content. First irrigation at 35 days.";
    }
    if (cropName.includes("Maize")) {
      if (language === 'hi') return "भुट्टे बनने के समय खेत में नमी की कमी न होने दें। जिंक सल्फेट 25 किग्रा/हेक्टेयर डालें।";
      if (language === 'bho') return "भुट्टा भरे के समय खेत में पानी के कमी मत होखे दीं। जिंक सल्फेट खाद डालीं।";
      return "Ensure consistent moisture during silking and cob development. Apply Zinc sulfate.";
    }
    if (cropName.includes("Tomato")) {
      if (language === 'hi') return "ड्रिप सिंचाई और मल्चिंग अपनाएं। फूल व फल बनते समय कैल्शियम नाइट्रेट का छिड़काव करें।";
      if (language === 'bho') return "ड्रिप पटवन आ मल्चिंग करीं। फल आवे के समय कैल्शियम स्प्रे करीं।";
      return "Drip irrigation with silver-black mulch. Foliar spray of Calcium nitrate prevents blossom end rot.";
    }
    return "Ensure timely intercultural operations and weed management for best yield.";
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header & Mode Switcher */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 bg-white border-2 border-emerald-500/30 shadow-xl shadow-emerald-500/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
              <Sprout className="w-3.5 h-3.5" />
              <span>{t.crops?.badge || "ML Crop Suitability & Yield Engine"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.crops?.title || "AI Crop Recommendation & Yield Predictor"}
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              {t.crops?.desc || "Match soil macronutrients (N, P, K), pH, and climate conditions against optimal crop profiles to rank crops by yield probability and revenue."}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center p-1.5 rounded-2xl bg-slate-100 border border-slate-200 self-start md:self-auto shadow-inner">
            <button
              type="button"
              onClick={() => setMode('auto')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center space-x-2 ${
                mode === 'auto' 
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{t.crops?.autoMode || "Auto Mode (Location-Driven)"}</span>
            </button>
            <button
              type="button"
              onClick={() => setMode('manual')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center space-x-2 ${
                mode === 'manual' 
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t.crops?.manualMode || "Manual Mode (Custom Soil Card)"}</span>
            </button>
          </div>
        </div>

        {/* Auto Mode Location Summary Banner */}
        {mode === 'auto' && (
          <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                  <span>{farmLocation?.city || "Indore, Madhya Pradesh"}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 text-[10px] uppercase font-black">
                    Auto Detected
                  </span>
                </div>
                <div className="text-slate-600 font-medium mt-0.5">
                  {agroProfile?.agroProfile?.regionName || "Central Deccan & Malwa Plateau"} • {agroProfile?.season?.name || "Rabi Winter Cycle"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:border-l sm:border-emerald-200 sm:pl-4">
              <div className="text-right sm:text-left">
                <span className="text-[10px] text-emerald-800 font-bold block">REGIONAL SOIL</span>
                <span className="font-extrabold text-slate-800">{agroProfile?.agroProfile?.soilType || "Clay / Black Cotton Soil"}</span>
              </div>
              <div className="text-right sm:text-left">
                <span className="text-[10px] text-emerald-800 font-bold block">LIVE CLIMATE</span>
                <span className="font-extrabold text-slate-800">
                  {agroProfile?.liveWeather?.temperature || farmLocation?.temp || 28}°C • {agroProfile?.liveWeather?.humidity || 45}% Hum.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Form & Ranked Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Soil Chemistry & Climate (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200 bg-white shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.crops?.inputsTitle || "Soil Chemistry & Climate Inputs"}</span>
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                mode === 'auto' 
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-slate-100 text-slate-700 border-slate-300'
              }`}>
                {mode === 'auto' ? "📍 Auto-Calibrated" : "⚙️ Manual Overrides"}
              </span>
            </div>

            {/* In Manual Mode: Agro-Climatic Presets */}
            {mode === 'manual' && (
              <div>
                <label className="text-xs text-slate-600 block mb-2 font-bold">
                  {t.crops?.presetsLabel || "Ecological Presets"}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => applyPreset('central')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-xs font-semibold transition text-left"
                  >
                    {PRESETS_MAP.central[language] || "Semi-Arid Central India"}
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('north')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-xs font-semibold transition text-left"
                  >
                    {PRESETS_MAP.north[language] || "Punjab-Haryana Irrigated"}
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('deccan')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-xs font-semibold transition text-left"
                  >
                    {PRESETS_MAP.deccan[language] || "Black Cotton Belt"}
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPreset('arid')}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 text-xs font-semibold transition text-left"
                  >
                    {PRESETS_MAP.arid[language] || "Sandy Arid Zone"}
                  </button>
                </div>
              </div>
            )}

            {/* Sowing Season */}
            <div>
              <label className="text-xs text-slate-700 font-bold block mb-1.5">
                {t.crops?.seasonLabel || "Crop Sowing Season"}
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none font-medium"
              >
                <option value="rabi">{SEASONS_MAP.rabi[language] || "Rabi (Winter: Oct - Mar)"}</option>
                <option value="kharif">{SEASONS_MAP.kharif[language] || "Kharif (Monsoon: Jun - Oct)"}</option>
                <option value="zaid">{SEASONS_MAP.zaid[language] || "Zaid (Summer: Mar - Jun)"}</option>
              </select>
            </div>

            {/* Soil Type */}
            <div>
              <label className="text-xs text-slate-700 font-bold block mb-1.5">
                {t.crops?.soilTypeLabel || "Soil Type Classification"}
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none font-medium"
              >
                <option value="Alluvial / Loamy">{SOIL_TYPES_MAP["Alluvial / Loamy"][language] || "Alluvial / Loamy"}</option>
                <option value="Clay">{SOIL_TYPES_MAP.Clay[language] || "Clay / Black Cotton Soil"}</option>
                <option value="Sandy">{SOIL_TYPES_MAP.Sandy[language] || "Sandy / Light Soil"}</option>
              </select>
            </div>

            {/* N-P-K Sliders */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
                  <span>Nitrogen (N):</span>
                  <span className="font-bold text-emerald-700">{nitrogen} kg/ha</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="180"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(e.target.value)}
                  className="w-full accent-emerald-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
                  <span>Phosphorus (P):</span>
                  <span className="font-bold text-cyan-700">{phosphorus} kg/ha</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(e.target.value)}
                  className="w-full accent-cyan-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
                  <span>Potassium (K):</span>
                  <span className="font-bold text-amber-700">{potassium} kg/ha</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="90"
                  value={potassium}
                  onChange={(e) => setPotassium(e.target.value)}
                  className="w-full accent-amber-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
                  <span>Soil pH Level:</span>
                  <span className="font-bold text-purple-700">{ph}</span>
                </div>
                <input
                  type="range"
                  min="5.0"
                  max="9.0"
                  step="0.1"
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                  className="w-full accent-purple-600"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Ranked Recommendations & Yield Cards (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="flex items-center justify-between">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t.crops?.rankedTitle || "Top Recommended Crops"}</span>
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {recommendations.length} {language === 'hi' ? 'फसलें अनुकूल' : language === 'bho' ? 'फसल ठीक बा' : 'Crops Evaluated'}
            </span>
          </div>

          <div className="space-y-3.5">
            {recommendations.map((crop, idx) => {
              const localizedCrop = CROP_NAMES_MAP[crop.name]?.[language] || crop.name;
              return (
                <div
                  key={idx}
                  className={`glass-panel rounded-3xl p-5 sm:p-6 border transition-all ${
                    idx === 0 
                      ? 'border-2 border-emerald-500 bg-emerald-50/40 shadow-lg' 
                      : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm ${
                        idx === 0
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        #{idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-lg font-black text-slate-900">
                            {localizedCrop}
                          </h4>
                          {idx === 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-extrabold uppercase border border-emerald-300">
                              {language === 'hi' ? 'सर्वश्रेष्ठ पसंद' : language === 'bho' ? 'सबसे बढ़िया' : 'Best Match'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500">
                          {crop.durationDays} • {crop.category}
                        </p>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-right shadow-sm">
                      <div className="text-[10px] text-emerald-800 uppercase font-bold">{t.crops?.suitability || "Match Score"}</div>
                      <div className="text-base font-black text-emerald-700">
                        {crop.matchPercentage}%
                      </div>
                    </div>
                  </div>

                  {/* Yield & Income Projection Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3 text-xs">
                    <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm">
                      <span className="text-slate-500 text-[11px] font-medium block">{t.crops?.predictedYield || "Predicted Yield"}</span>
                      <span className="text-base font-black text-slate-900 mt-0.5 block">
                        {crop.predictedYield} <span className="text-xs font-normal text-slate-500">{crop.unit}</span>
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                        ≈ {(crop.predictedYieldTons || (crop.predictedYield / 10)).toFixed(1)} {language === 'hi' ? 'टन / एकड़' : 'Tons/Ac'}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-cyan-50 border border-cyan-200 shadow-sm">
                      <span className="text-cyan-800 text-[11px] font-medium block">{t.crops?.mandiPrice || "Mandi Rate"}</span>
                      <span className="text-base font-black text-cyan-700 mt-0.5 block">
                        ₹{crop.avgMarketRate?.toLocaleString()} <span className="text-xs font-normal text-cyan-600">/ q</span>
                      </span>
                      <span className="text-[10px] text-cyan-700/80 font-medium block mt-0.5">
                        {language === 'hi' ? 'बाज़ार भाव' : 'Live MSP/Market'}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm">
                      <span className="text-amber-800 text-[11px] font-medium block">{language === 'hi' ? 'कुल आय (Gross)' : 'Gross Revenue'}</span>
                      <span className="text-base font-black text-amber-700 mt-0.5 block">
                        ₹{crop.estimatedGrossIncome?.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-amber-700/80 font-medium block mt-0.5">
                        {language === 'hi' ? 'लागत: ₹' + (crop.estimatedCost?.toLocaleString() || '18,000') : 'Cost: ₹' + (crop.estimatedCost?.toLocaleString() || '18,000')}
                      </span>
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-100/70 border border-emerald-300 shadow-sm">
                      <span className="text-emerald-900 text-[11px] font-black block">{language === 'hi' ? 'शुद्ध लाभ (Net Profit)' : 'Net Profit'}</span>
                      <span className="text-base font-black text-emerald-800 mt-0.5 block">
                        ₹{(crop.estimatedNetProfit || (crop.estimatedGrossIncome - (crop.estimatedCost || 20000))).toLocaleString()} <span className="text-xs font-normal text-emerald-700">/ Ac</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-extrabold block mt-0.5">
                        ROI: +{crop.roiPercentage || Math.round(((crop.estimatedNetProfit || 25000) / (crop.estimatedCost || 18000)) * 100)}%
                      </span>
                    </div>
                  </div>

                  {/* Agronomic Advice */}
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-800 flex items-start space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      <strong className="text-emerald-800">{t.crops?.keyAdvice || "Key Advice"}:</strong> {getLocalizedCropAdvice(crop.name)}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Side-by-Side Accurate Crop Data Comparison Matrix */}
      <div className="mt-8">
        <CropComparisonMatrix 
          language={language}
          initialCrops={recommendations.map(r => r.name)}
        />
      </div>

    </div>
  );
}
