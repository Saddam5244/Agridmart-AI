import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Sparkles, 
  TrendingUp, 
  Droplet, 
  Coins, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  HelpCircle, 
  RefreshCw, 
  Cpu, 
  Volume2, 
  VolumeX, 
  Layers, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sprout, 
  Zap,
  MapPin,
  Plus,
  X,
  Thermometer,
  CloudRain,
  Compass,
  AlertTriangle,
  Check,
  Building2,
  Calendar,
  Activity,
  Trash2
} from 'lucide-react';
import { runWhatIfSimulation, fetchCropLibrary } from '../services/api';
import { getTranslation, CROP_NAMES_MAP } from '../utils/translations';
import { SUPPORTED_LANGUAGES } from '../utils/languages';

export default function WhatIfSimulator({ language = "en" }) {
  // Built-in & Custom Crops State with localStorage persistence
  const [cropsList, setCropsList] = useState([]);
  const [customCrops, setCustomCrops] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_custom_crops');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isAddCropModalOpen, setIsAddCropModalOpen] = useState(false);

  // Selected Simulation Parameters
  const [baseCrop, setBaseCrop] = useState('wheat');
  const [targetCrop, setTargetCrop] = useState('mustard');
  const [waterAdjustment, setWaterAdjustment] = useState(0);
  const [fertilizerTiming, setFertilizerTiming] = useState(0);
  const [farmArea, setFarmArea] = useState(1.0);

  // Soil Conditions State
  const [soilType, setSoilType] = useState('alluvial');
  const [soilPh, setSoilPh] = useState(6.8);
  const [soilMoisture, setSoilMoisture] = useState(45);
  const [organicCarbon, setOrganicCarbon] = useState(0.65);

  // Live Location & Weather State
  const [locationName, setLocationName] = useState('Indore, Madhya Pradesh');
  const [temperature, setTemperature] = useState(26);
  const [humidity, setHumidity] = useState(55);
  const [rainfallMm, setRainfallMm] = useState(0);
  const [weatherCondition, setWeatherCondition] = useState('Clear sky');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Simulation Results & Voice
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // New Custom Crop Form State
  const [newCropName, setNewCropName] = useState('');
  const [newCropCategory, setNewCropCategory] = useState('Horticulture');
  const [newCropYieldQ, setNewCropYieldQ] = useState(25);
  const [newCropRateQ, setNewCropRateQ] = useState(3500);
  const [newCropCostAcre, setNewCropCostAcre] = useState(38000);
  const [newCropWaterLevel, setNewCropWaterLevel] = useState('Medium');
  const [newCropDiseaseRisk, setNewCropDiseaseRisk] = useState('Medium');

  const t = getTranslation(language);
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const getLocalizedCropName = (cropName) => {
    if (!cropName) return "";
    for (const key of Object.keys(CROP_NAMES_MAP)) {
      if (cropName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(cropName.toLowerCase())) {
        return CROP_NAMES_MAP[key]?.[language] || CROP_NAMES_MAP[key]?.hi || cropName;
      }
    }
    return cropName;
  };

  // Preset Agro-Districts with Known Coordinates
  const AGRO_DISTRICTS = [
    { name: "Indore, Madhya Pradesh", lat: 22.7196, lon: 75.8577, soil: "black", defaultPh: 7.4 },
    { name: "Kanpur, Uttar Pradesh", lat: 26.4499, lon: 80.3319, soil: "alluvial", defaultPh: 7.1 },
    { name: "Ludhiana, Punjab", lat: 30.9010, lon: 75.8573, soil: "loamy", defaultPh: 7.2 },
    { name: "Nashik, Maharashtra", lat: 19.9975, lon: 73.7898, soil: "black", defaultPh: 6.9 },
    { name: "Guntur, Andhra Pradesh", lat: 16.3067, lon: 80.4365, soil: "clay_loam", defaultPh: 7.3 },
    { name: "Patna, Bihar", lat: 25.5941, lon: 85.1376, soil: "heavy_alluvial", defaultPh: 6.8 },
    { name: "Jaipur, Rajasthan", lat: 26.9124, lon: 75.7873, soil: "sandy_loam", defaultPh: 7.8 },
    { name: "Bathinda, Punjab", lat: 30.2110, lon: 74.9455, soil: "alluvial", defaultPh: 7.6 }
  ];

  // Load Crop Library on mount and merge with local customCrops
  useEffect(() => {
    async function loadCrops() {
      const res = await fetchCropLibrary();
      if (res?.crops && res.crops.length > 0) {
        const merged = [...res.crops];
        customCrops.forEach(cc => {
          if (!merged.some(m => m.id === cc.id)) {
            merged.push(cc);
          }
        });
        setCropsList(merged);
      }
    }
    loadCrops();
  }, [customCrops]);

  // Run simulation whenever any variable, soil, or weather changes
  useEffect(() => {
    handleRunSimulation();
  }, [
    baseCrop, 
    targetCrop, 
    waterAdjustment, 
    fertilizerTiming, 
    farmArea, 
    soilType, 
    soilPh, 
    soilMoisture, 
    organicCarbon,
    locationName,
    temperature,
    humidity,
    rainfallMm
  ]);

  const handleRunSimulation = async () => {
    setLoading(true);
    try {
      const res = await runWhatIfSimulation({
        baseCrop,
        targetCrop,
        waterAdjustmentPercent: waterAdjustment,
        fertilizerTimingShiftDays: fertilizerTiming,
        farmAreaAcres: farmArea,
        soilConditions: {
          soilType,
          soilPh: Number(soilPh),
          soilMoisture: Number(soilMoisture),
          organicCarbon: Number(organicCarbon)
        },
        weatherConditions: {
          location: locationName,
          temperature: Number(temperature),
          humidity: Number(humidity),
          rainfallMm: Number(rainfallMm)
        },
        customCrops
      });

      if (res?.comparison) {
        setSimulationResult(res);
      }
    } catch (err) {
      console.error("Simulation error:", err);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------------------------------
  // 📍 GPS / BROWSER GEOLOCATION DETECTOR
  // -------------------------------------------------------------
  const handleDetectLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // 1. Fetch live reverse-geocode
          const geoRes = await fetch(`/api/weather/reverse-geocode?lat=${latitude}&lon=${longitude}`);
          const geoData = await geoRes.json();
          const detectedCity = geoData?.city ? `${geoData.city}, ${geoData.state || geoData.country || ''}` : `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`;
          setLocationName(detectedCity);

          // 2. Fetch live Open-Meteo weather
          const weatherRes = await fetch(`/api/weather/live?lat=${latitude}&lon=${longitude}&city=${encodeURIComponent(detectedCity)}`);
          const wData = await weatherRes.json();
          if (wData?.current) {
            setTemperature(Math.round(wData.current.temperature));
            setHumidity(Math.round(wData.current.humidity));
            setWeatherCondition(wData.current.weatherText || "Live Conditions");
            setRainfallMm(wData.daily?.rainProbability || 0);
          }
        } catch (e) {
          console.warn("Location weather fetch error:", e);
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (err) => {
        console.warn("Geolocation denied or error:", err.message);
        setIsDetectingLocation(false);
        alert(language === 'hi' ? "स्थान अनुमति नहीं मिली। कृपया सूची में से जिला चुनें।" : "Location access not granted. Please pick a district from the dropdown.");
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  const handleSelectPredefinedDistrict = async (district) => {
    setLocationName(district.name);
    setSoilType(district.soil);
    setSoilPh(district.defaultPh);

    try {
      const res = await fetch(`/api/weather/live?lat=${district.lat}&lon=${district.lon}&city=${encodeURIComponent(district.name)}`);
      const data = await res.json();
      if (data?.current) {
        setTemperature(Math.round(data.current.temperature));
        setHumidity(Math.round(data.current.humidity));
        setWeatherCondition(data.current.weatherText || "Clear sky");
        setRainfallMm(data.daily?.precipitationTotal || 0);
      }
    } catch (e) {
      console.warn("District weather fetch error:", e);
    }
  };

  // -------------------------------------------------------------
  // ➕ MANUAL / CUSTOM CROP HANDLER & DELETION
  // -------------------------------------------------------------
  const saveCustomCropsToStorage = (updated) => {
    setCustomCrops(updated);
    try {
      localStorage.setItem('agri_custom_crops', JSON.stringify(updated));
    } catch (err) {
      console.warn("Error saving custom crops to storage:", err);
    }
  };

  const handleSaveCustomCrop = (e) => {
    e.preventDefault();
    if (!newCropName.trim()) return;

    const customId = `custom_${Date.now()}_${newCropName.trim().toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const tons = Number((Number(newCropYieldQ) / 10).toFixed(2));
    const ratePerTon = Number(newCropRateQ) * 10;
    const cost = Number(newCropCostAcre);

    const createdCrop = {
      id: customId,
      name: `${newCropName.trim()} ⭐`,
      nameHi: `${newCropName.trim()} (कस्टम फसल)`,
      category: newCropCategory,
      baseYieldTons: tons,
      basePricePerTon: ratePerTon,
      basePricePerQuintal: Number(newCropRateQ),
      totalBaseCost: cost,
      waterConsumptionLiters: newCropWaterLevel === 'Very Low' ? 70000 : newCropWaterLevel === 'Low' ? 100000 : newCropWaterLevel === 'High' ? 240000 : 160000,
      waterRequirementLevel: newCropWaterLevel,
      baseDiseaseRisk: newCropDiseaseRisk,
      baseDiseaseScore: newCropDiseaseRisk === 'High' ? 65 : newCropDiseaseRisk === 'Low' ? 20 : 40,
      isCustom: true
    };

    const updated = [...customCrops, createdCrop];
    saveCustomCropsToStorage(updated);
    setCropsList(prev => [...prev, createdCrop]);
    setTargetCrop(customId);
    setIsAddCropModalOpen(false);

    // Reset Form
    setNewCropName('');
    setNewCropYieldQ(25);
    setNewCropRateQ(3500);
    setNewCropCostAcre(38000);
  };

  const handleDeleteCustomCrop = (cropId, e) => {
    if (e) e.stopPropagation();
    const targetCropObj = cropsList.find(c => c.id === cropId);
    const cropTitle = targetCropObj ? (language === 'hi' ? targetCropObj.nameHi : targetCropObj.name) : cropId;
    const confirmMsg = language === 'hi' 
      ? `क्या आप वास्तव में '${cropTitle}' कस्टम फसल को हटाना चाहते हैं?` 
      : `Are you sure you want to delete the custom crop '${cropTitle}'?`;
    
    if (window.confirm(confirmMsg)) {
      const updated = customCrops.filter(c => c.id !== cropId);
      saveCustomCropsToStorage(updated);
      setCropsList(prev => prev.filter(c => c.id !== cropId));
      if (targetCrop === cropId) {
        setTargetCrop('mustard');
      }
      if (baseCrop === cropId) {
        setBaseCrop('wheat');
      }
    }
  };

  // -------------------------------------------------------------
  // 🔊 MULTILINGUAL AI VOICE EXPLANATION
  // -------------------------------------------------------------
  const handleSpeakRationale = () => {
    if (!simulationResult) return;
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    if (speaking) {
      setSpeaking(false);
      return;
    }

    const textToSpeak = language === 'hi' ? simulationResult.aiDecisionRationaleHi : simulationResult.aiDecisionRationale;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = currentLangObj.speechCode || 'hi-IN';
    utterance.rate = 0.94;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // 1-Click Presets
  const presets = [
    {
      label: language === 'hi' ? "सरसों बनाम गेहूं (कम पानी, अधिक लाभ?)" : "Mustard instead of Wheat?",
      desc: language === 'hi' ? "सरसों 45% कम पानी लेती है और तेल भाव ऊंचा है" : "Mustard saves 45% water with high oilseed MSP",
      base: "wheat", target: "mustard", water: 0, fert: 0
    },
    {
      label: language === 'hi' ? "20% कम पानी (सटीक ड्रिप सिंचाई)" : "What if I use 20% less water?",
      desc: language === 'hi' ? "पानी व बिजली की बचत, फंगल रोग में 14% कमी" : "Cuts pumping cost & minimizes fungal blight risk",
      base: "wheat", target: "wheat", water: -20, fert: 0
    },
    {
      label: language === 'hi' ? "चना बनाम गेहूं (सूखा-प्रतिरोधी दलहन)" : "Chickpea / Chana instead of Wheat?",
      desc: language === 'hi' ? "न्यूनतम पानी व ₹5,800/क्विंटल मजबूत बाजार भाव" : "Very low water budget & ₹5,800/q market price",
      base: "wheat", target: "chickpea", water: 0, fert: 0
    },
    {
      label: language === 'hi' ? "सोयाबीन बनाम मक्का (खरीफ में लाभ)" : "Soybean instead of Maize?",
      desc: language === 'hi' ? "काली मिट्टी में दलहन पोषण व कम लागत" : "Lower fertilizer demand & deep moisture retention",
      base: "maize", target: "soybean", water: 0, fert: 0
    }
  ];

  return (
    <div className="space-y-6 pb-16 animate-fadeIn">
      
      {/* 1. Header & Digital Twin USP Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 bg-white border-2 border-emerald-500/30 shadow-xl shadow-emerald-500/5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
              <Cpu className="w-3.5 h-3.5" />
              <span>{language === 'hi' ? 'एआई फार्म डिजिटल ट्विन • व्हाट-इफ सिमुलेशन लैब' : 'AI Farm Digital Twin • What-If Decision Lab'}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {language === 'hi' ? '🔮 एआई "व्हाट-इफ" फार्म सिम्युलेटर' : '🔮 AI "What-If" Farm Decision Simulator'}
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed font-medium">
              {language === 'hi'
                ? 'निर्णय लेने से पहले उसके परिणामों का वर्चुअल परीक्षण करें! मिट्टी का प्रकार, पीएच, मौसम और अपनी पसंद की फसलें जोड़कर पैदावार, पानी, रोग जोखिम और शुद्ध मुनाफे की तुलना करें।'
                : 'Simulate the exact consequences of crop switching, soil pH, moisture, and local weather before spending money in the field.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:items-center shrink-0">
            {/* Custom Crop Button */}
            <button
              onClick={() => setIsAddCropModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-600/20 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'hi' ? '+ अपनी फसल जोड़ें (Add Custom Crop)' : '+ Add Custom Crop'}</span>
            </button>
          </div>
        </div>

        {/* 1-Tap Preset Decision Scenarios */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600 block mb-3">
            {language === 'hi' ? '⚡ त्वरित 1-क्लिक परिदृश्य प्रश्न (Quick Presets)' : '⚡ Quick 1-Click Decision Scenarios'}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setBaseCrop(p.base);
                  setTargetCrop(p.target);
                  setWaterAdjustment(p.water);
                  setFertilizerTiming(p.fert);
                }}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-300 transition text-left space-y-1 group shadow-xs cursor-pointer"
              >
                <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition">
                  {p.label}
                </div>
                <div className="text-[11px] text-slate-500 font-medium leading-snug">
                  {p.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC REAL-WORLD CONDITIONS: SOIL + LIVE LOCATION & WEATHER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ========================================================================= */}
        {/* LEFT: LIVE LOCATION & METEOROLOGY CARD (6 COLS) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  {language === 'hi' ? 'स्थान एवं सजीव मौसम (Live Location & Weather)' : 'Live Farm Location & Weather'}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  {language === 'hi' ? 'तापमान, आर्द्रता और वर्षा के अनुसार सटीक सिमुलेशन' : 'Calibrates crop heat stress & rainfall budget'}
                </p>
              </div>
            </div>

            {/* GPS Auto-Detect Button */}
            <button
              onClick={handleDetectLiveLocation}
              disabled={isDetectingLocation}
              className="px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 text-cyan-800 text-xs font-extrabold flex items-center space-x-1.5 transition cursor-pointer"
            >
              <MapPin className={`w-3.5 h-3.5 ${isDetectingLocation ? 'animate-spin' : ''}`} />
              <span>{isDetectingLocation ? 'खोज रहे हैं...' : (language === 'hi' ? '📍 GPS से स्थान लें' : '📍 Auto-Detect GPS')}</span>
            </button>
          </div>

          {/* Quick Agro-District Picker */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              {language === 'hi' ? 'प्रमुख कृषि जिला चुनें या बदलें:' : 'Select Farming District:'}
            </label>
            <select
              value={locationName}
              onChange={(e) => {
                const found = AGRO_DISTRICTS.find(d => d.name === e.target.value);
                if (found) handleSelectPredefinedDistrict(found);
                else setLocationName(e.target.value);
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {AGRO_DISTRICTS.map((d, idx) => (
                <option key={idx} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Live Weather Metrics Pills */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
              <div className="flex items-center justify-center space-x-1 text-amber-700 text-xs font-bold mb-0.5">
                <Thermometer className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'तापमान' : 'Temperature'}</span>
              </div>
              <div className="text-lg font-black text-slate-900">{temperature}°C</div>
              <div className="text-[10px] text-slate-500 font-semibold">{weatherCondition}</div>
            </div>

            <div className="p-3 rounded-2xl bg-cyan-50/70 border border-cyan-200 text-center">
              <div className="flex items-center justify-center space-x-1 text-cyan-700 text-xs font-bold mb-0.5">
                <Droplet className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'आर्द्रता' : 'Humidity'}</span>
              </div>
              <div className="text-lg font-black text-slate-900">{humidity}%</div>
              <div className="text-[10px] text-slate-500 font-semibold">{humidity > 70 ? 'High Mist' : 'Optimal'}</div>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200 text-center">
              <div className="flex items-center justify-center space-x-1 text-blue-700 text-xs font-bold mb-0.5">
                <CloudRain className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'वर्षा पूर्वानुमान' : 'Rain Forecast'}</span>
              </div>
              <div className="text-lg font-black text-slate-900">{rainfallMm} mm</div>
              <div className="text-[10px] text-slate-500 font-semibold">{rainfallMm > 5 ? 'Rain Offset' : 'Dry Spell'}</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT: SOIL PHYSICS & COMPOSITION CARD (6 COLS) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 border border-slate-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Sprout className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  {language === 'hi' ? 'खेत की मिट्टी परिस्थितियां (Soil Conditions)' : 'Field Soil Physics & Chemistry'}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  {language === 'hi' ? 'मिट्टी का प्रकार और पीएच फसल अनुकूलता तय करते हैं' : 'Dictates water retention and nutrient uptake'}
                </p>
              </div>
            </div>

            <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
              {simulationResult?.soilSummary?.compatibilityScore ? `${simulationResult.soilSummary.compatibilityScore}% Compatibility` : 'Analyzed'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Soil Type */}
            <div>
              <label className="text-slate-700 font-bold block mb-1.5">
                {language === 'hi' ? 'मिट्टी का प्रकार (Soil Type):' : 'Soil Texture / Classification:'}
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
              >
                <option value="alluvial">🌾 Alluvial / Loam (दोमट मिट्टी)</option>
                <option value="black">🖤 Deep Black Soil / Regur (काली कपास मिट्टी)</option>
                <option value="sandy_loam">🏜️ Sandy Loam (रेतीली दोमट)</option>
                <option value="clay">🧱 Clayey Heavy Soil (चिकनी भारी मिट्टी)</option>
                <option value="red_loam">🧱 Red & Yellow Loam (लाल दोमट)</option>
              </select>
            </div>

            {/* Organic Carbon */}
            <div>
              <label className="text-slate-700 font-bold block mb-1.5">
                {language === 'hi' ? 'जैविक कार्बन (Organic Carbon %):' : 'Soil Organic Carbon (SOC):'}
              </label>
              <select
                value={organicCarbon}
                onChange={(e) => setOrganicCarbon(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
              >
                <option value="0.35">Low (&lt; 0.40% - Low Fertility)</option>
                <option value="0.65">Medium (0.50 - 0.75% - Normal)</option>
                <option value="0.95">High (&gt; 0.80% - Rich / Organic)</option>
              </select>
            </div>
          </div>

          {/* Soil pH Slider with Dynamic Status Label */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold mb-1">
              <span className="text-slate-700">{language === 'hi' ? 'मिट्टी का पीएच (Soil pH Level):' : 'Soil pH Level:'}</span>
              <span className={`px-2 py-0.5 rounded-md font-extrabold ${
                soilPh < 6.0 ? 'bg-amber-100 text-amber-800' : soilPh > 7.8 ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                pH {soilPh} • {soilPh < 6.0 ? (language === 'hi' ? 'अम्लीय (Acidic)' : 'Acidic') : soilPh > 7.8 ? (language === 'hi' ? 'क्षारीय (Alkaline)' : 'Alkaline') : (language === 'hi' ? 'उदासीन / आदर्श (Neutral)' : 'Optimal Neutral')}
              </span>
            </div>
            <input 
              type="range"
              min="5.0"
              max="8.5"
              step="0.1"
              value={soilPh}
              onChange={(e) => setSoilPh(Number(e.target.value))}
              className="w-full mt-1.5 accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-semibold">
              <span>5.0 (Strong Acid)</span>
              <span>6.5 - 7.2 (Ideal Range)</span>
              <span>8.5 (Alkaline / Calcareous)</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3. SIMULATOR CONTROLS: CROPS, WATER, FERTILIZER & FARM ACRES */}
      <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200 bg-white shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600" />
            <span>{language === 'hi' ? 'निर्णय अनुकूलन पैरामीटर्स (Adjust Variables)' : 'Simulated Decision Variables'}</span>
          </h3>
          <span className="text-xs text-slate-500 font-semibold">
            {language === 'hi' ? '14 प्रामाणिक फसलें + कस्टम फसलें उपलब्ध' : '14 Verified Agro-Profiles Available'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
          
          {/* Base Crop Selector */}
          <div>
            <label className="text-slate-700 block mb-1.5 font-bold">
              {language === 'hi' ? '1. वर्तमान फसल (Baseline Crop)' : '1. Baseline Crop:'}
            </label>
            <select
              value={baseCrop}
              onChange={(e) => setBaseCrop(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold"
            >
              {cropsList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.isCustom ? '⭐ ' : ''}{language === 'hi' ? (c.nameHi || c.name) : c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Target Simulated Crop Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-slate-700 font-bold">
                {language === 'hi' ? '2. सिम्युलेटेड फसल (Target Crop):' : '2. Target Crop:'}
              </label>
              <div className="flex items-center space-x-2">
                {customCrops.some(c => c.id === targetCrop) && (
                  <button
                    type="button"
                    onClick={(e) => handleDeleteCustomCrop(targetCrop, e)}
                    className="text-rose-600 hover:text-rose-800 font-extrabold text-[11px] flex items-center space-x-1 transition cursor-pointer"
                    title={language === 'hi' ? 'यह कस्टम फसल हटाएं' : 'Delete this custom crop'}
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>{language === 'hi' ? 'हटाएं' : 'Delete'}</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsAddCropModalOpen(true)}
                  className="text-emerald-700 hover:text-emerald-900 font-extrabold text-[11px] underline cursor-pointer"
                >
                  + {language === 'hi' ? 'नई फसल' : 'Custom'}
                </button>
              </div>
            </div>
            <select
              value={targetCrop}
              onChange={(e) => setTargetCrop(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-emerald-50/60 border-2 border-emerald-400 text-emerald-950 font-bold"
            >
              {cropsList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.isCustom ? '⭐ ' : ''}{language === 'hi' ? (c.nameHi || c.name) : c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Water Adjustment Slider */}
          <div>
            <label className="text-slate-700 flex justify-between font-bold mb-1.5">
              <span>{language === 'hi' ? '3. पानी बदलाव (Water Variation):' : '3. Water Budget Shift:'}</span>
              <span className={`font-extrabold ${waterAdjustment < 0 ? 'text-cyan-700' : waterAdjustment > 0 ? 'text-amber-700' : 'text-slate-700'}`}>
                {waterAdjustment > 0 ? `+${waterAdjustment}%` : `${waterAdjustment}%`}
              </span>
            </label>
            <input
              type="range"
              min="-40"
              max="40"
              step="10"
              value={waterAdjustment}
              onChange={(e) => setWaterAdjustment(Number(e.target.value))}
              className="w-full mt-2 accent-cyan-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-medium">
              <span>{language === 'hi' ? '-40% (ड्रिप सिंचाई)' : '-40% (Strict Drip)'}</span>
              <span>{language === 'hi' ? 'सामान्य (0%)' : 'Standard (0%)'}</span>
              <span>{language === 'hi' ? '+40% (बाढ़ सिंचाई)' : '+40% (Flood)'}</span>
            </div>
          </div>

          {/* Farm Area in Acres */}
          <div>
            <label className="text-slate-700 flex justify-between font-bold mb-1.5">
              <span>{language === 'hi' ? '4. खेत का क्षेत्रफल:' : '4. Farm Area (Acres):'}</span>
              <span className="font-extrabold text-emerald-700">{farmArea} {language === 'hi' ? 'एकड़' : 'Acre'}</span>
            </label>
            <input
              type="range"
              min="0.5"
              max="20.0"
              step="0.5"
              value={farmArea}
              onChange={(e) => setFarmArea(Number(e.target.value))}
              className="w-full mt-2 accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-medium">
              <span>0.5 {language === 'hi' ? 'एकड़' : 'Acre'}</span>
              <span>5.0 {language === 'hi' ? 'एकड़' : 'Acres'}</span>
              <span>20 {language === 'hi' ? 'एकड़' : 'Acres'}</span>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. COMPARISON CONSEQUENCE MATRIX & HEAVY DATA RESULTS */}
      {/* ========================================================================= */}
      {simulationResult && (
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-emerald-200 bg-white shadow-md space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                  {language === 'hi' ? 'डिजिटल ट्विन परिणाम' : 'Digital Twin Matrix'}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  📍 {simulationResult.location} • {simulationResult.farmAreaAcres} {language === 'hi' ? 'एकड़' : 'Acre'} • {simulationResult.soilSummary.soilType}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1.5">
                {language === 'hi' ? 'सिम्युलेटेड परिणाम एवं लाभ-हानि तुलना' : 'Decision Consequence & Multi-Parameter Comparison'}
              </h2>
            </div>

            {/* Profit Difference Pill */}
            <div className={`px-4 py-2.5 rounded-2xl font-black text-sm sm:text-base flex items-center space-x-2 shadow-sm ${
              simulationResult.delta.profitDiff >= 0 
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-rose-100 text-rose-900 border border-rose-300'
            }`}>
              {simulationResult.delta.profitDiff >= 0 ? <ArrowUpRight className="w-5 h-5 text-emerald-700" /> : <ArrowDownRight className="w-5 h-5 text-rose-700" />}
              <span>{language === 'hi' ? 'शुद्ध मुनाफे में अंतर: ' : 'Net Profit Difference: '} {simulationResult.delta.profitDiffFormatted}</span>
            </div>
          </div>

          {/* Detailed Matrix Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-[11px] font-extrabold">
                  <th className="py-3 px-4">{language === 'hi' ? 'मापदंड / संकेतक' : language === 'bho' ? 'मापदंड / नाप' : 'Parameter'}</th>
                  <th className="py-3 px-4 text-emerald-700">
                    {language === 'hi' ? 'वर्तमान फसल' : language === 'bho' ? 'अभी के फसल' : 'Baseline'} ({getLocalizedCropName(simulationResult.comparison.baseline.cropHi || simulationResult.comparison.baseline.crop)})
                  </th>
                  <th className="py-3 px-4 text-violet-700">
                    {language === 'hi' ? 'सिम्युलेटेड फसल' : language === 'bho' ? 'सिम्युलेटेड फसल' : 'Simulated'} ({getLocalizedCropName(simulationResult.comparison.simulated.cropHi || simulationResult.comparison.simulated.crop)})
                  </th>
                  <th className="py-3 px-4 text-cyan-700">{language === 'hi' ? 'सकल प्रभाव / अंतर' : language === 'bho' ? 'असर / अंतर' : 'Net Impact / Difference'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                
                {/* 1. Net Profit */}
                <tr className="bg-emerald-50/70 font-black text-sm sm:text-base border-b border-emerald-200">
                  <td className="py-4 px-4 text-emerald-900 font-black flex items-center gap-1.5">
                    <Coins className="w-5 h-5 text-emerald-600" />
                    <span>💰 {language === 'hi' ? 'अपेक्षित शुद्ध मुनाफा' : language === 'bho' ? 'अपेक्षित शुद्ध मुनाफा' : 'Expected Net Profit'}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-900 font-bold">₹{simulationResult.comparison.baseline.expectedProfit.toLocaleString()}</td>
                  <td className="py-4 px-4 text-emerald-700 font-black">₹{simulationResult.comparison.simulated.expectedProfit.toLocaleString()}</td>
                  <td className={`py-4 px-4 font-black ${simulationResult.delta.profitDiff >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {simulationResult.delta.profitDiff >= 0 ? `+₹${Math.abs(simulationResult.delta.profitDiff).toLocaleString()}` : `-₹${Math.abs(simulationResult.delta.profitDiff).toLocaleString()}`}
                  </td>
                </tr>

                {/* 2. Expected Yield */}
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-700">
                    🌾 {language === 'hi' ? 'अपेक्षित पैदावार' : language === 'bho' ? 'अपेक्षित उपज' : 'Expected Yield'}
                  </td>
                  <td className="py-3.5 px-4 font-bold">
                    {simulationResult.comparison.baseline.expectedYieldQuintals} {language === 'hi' || language === 'bho' ? 'क्विंटल' : 'q'} ({simulationResult.comparison.baseline.expectedYield})
                  </td>
                  <td className="py-3.5 px-4 font-black text-violet-700">
                    {simulationResult.comparison.simulated.expectedYieldQuintals} {language === 'hi' || language === 'bho' ? 'क्विंटल' : 'q'} ({simulationResult.comparison.simulated.expectedYield})
                  </td>
                  <td className="py-3.5 px-4 text-xs font-semibold text-slate-500">
                    {language === 'hi' ? 'फसल अनुसार उपज' : language === 'bho' ? 'फसल अनुसार' : 'Crop Specific Value'}
                  </td>
                </tr>

                {/* 3. Water Consumption */}
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-700">
                    💧 {language === 'hi' ? 'पानी की खपत' : language === 'bho' ? 'पानी के खपत' : 'Water Consumption'}
                  </td>
                  <td className="py-3.5 px-4">
                    {simulationResult.comparison.baseline.waterConsumptionLiters.toLocaleString()} {language === 'hi' || language === 'bho' ? 'लीटर' : 'Liters'}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-violet-700">
                    {simulationResult.comparison.simulated.waterConsumptionLiters.toLocaleString()} {language === 'hi' || language === 'bho' ? 'लीटर' : 'Liters'}
                  </td>
                  <td className="py-3.5 px-4 text-xs text-cyan-700 font-bold">
                    {simulationResult.delta.waterSavedLiters > 0 
                      ? (language === 'hi' || language === 'bho' ? `बचत: ${simulationResult.delta.waterSavedLiters.toLocaleString()} लीटर` : `Saves ${simulationResult.delta.waterSavedLiters.toLocaleString()} L`) 
                      : (language === 'hi' || language === 'bho' ? 'अधिक पानी की आवश्यकता' : 'Higher Water Budget')}
                  </td>
                </tr>

                {/* 4. Total Farming Cost */}
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-700">
                    💳 {language === 'hi' ? 'खेती की कुल लागत' : language === 'bho' ? 'खेती के कुल लागत' : 'Total Cost of Cultivation'}
                  </td>
                  <td className="py-3.5 px-4">₹{simulationResult.comparison.baseline.farmingCost.toLocaleString()}</td>
                  <td className="py-3.5 px-4 font-semibold text-violet-700">₹{simulationResult.comparison.simulated.farmingCost.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-xs font-bold text-amber-700">
                    {simulationResult.delta.costDiff <= 0 
                      ? (language === 'hi' || language === 'bho' ? `₹${Math.abs(simulationResult.delta.costDiff).toLocaleString()} कम लागत` : `₹${Math.abs(simulationResult.delta.costDiff).toLocaleString()} Lower Cost`) 
                      : (language === 'hi' || language === 'bho' ? `+₹${simulationResult.delta.costDiff.toLocaleString()} अधिक लागत` : `+₹${simulationResult.delta.costDiff.toLocaleString()} Higher Cost`)}
                  </td>
                </tr>

                {/* 5. Soil Compatibility */}
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-700">
                    🌱 {language === 'hi' ? 'मिट्टी अनुकूलता स्कोर' : language === 'bho' ? 'माटी अनुकूलता' : 'Soil Compatibility Score'}
                  </td>
                  <td className="py-3.5 px-4 font-semibold">{simulationResult.comparison.baseline.soilCompatibility}%</td>
                  <td className="py-3.5 px-4 font-bold text-violet-700">{simulationResult.comparison.simulated.soilCompatibility}%</td>
                  <td className="py-3.5 px-4 text-xs text-emerald-700 font-bold">
                    {simulationResult.comparison.simulated.soilCompatibility >= 80 
                      ? (language === 'hi' || language === 'bho' ? 'स्थानीय मिट्टी के लिए पूर्णतः अनुकूल' : 'Highly Compatible with Local Soil') 
                      : (language === 'hi' || language === 'bho' ? 'मध्यम मिट्टी अनुकूलता' : 'Moderate Tilth Match')}
                  </td>
                </tr>

                {/* 6. Weather Suitability */}
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-700">
                    ☁️ {language === 'hi' ? 'मौसम उपयुक्तता स्कोर' : language === 'bho' ? 'मौसम अनुकूलता' : 'Weather Suitability Score'}
                  </td>
                  <td className="py-3.5 px-4 font-semibold">{simulationResult.comparison.baseline.weatherSuitability}%</td>
                  <td className="py-3.5 px-4 font-bold text-violet-700">{simulationResult.comparison.simulated.weatherSuitability}%</td>
                  <td className="py-3.5 px-4 text-xs text-slate-600 font-medium">
                    {language === 'hi' || language === 'bho' 
                      ? `${temperature}°C तापमान एवं ${humidity}% नमी अनुसार` 
                      : `Adjusted for ${temperature}°C & ${humidity}% humidity`}
                  </td>
                </tr>

                {/* 7. Disease Vulnerability */}
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-700">
                    🛡️ {language === 'hi' ? 'रोग संवेदनशीलता' : language === 'bho' ? 'बेमारी खतरा' : 'Disease Vulnerability'}
                  </td>
                  <td className="py-3.5 px-4">
                    {language === 'hi' && simulationResult.comparison.baseline.crop?.toLowerCase().includes('wheat') 
                      ? 'मध्यम (अधिक नमी में पीला रतुआ का जोखिम)' 
                      : language === 'hi' && simulationResult.comparison.baseline.crop?.toLowerCase().includes('mustard') 
                      ? 'कम (सफेद रतुआ / माहू का हल्का जोखिम)' 
                      : simulationResult.comparison.baseline.diseaseRisk}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-violet-700">
                    {language === 'hi' && simulationResult.comparison.simulated.crop?.toLowerCase().includes('mustard')
                      ? 'कम जोखिम'
                      : language === 'hi' && simulationResult.comparison.simulated.crop?.toLowerCase().includes('wheat')
                      ? 'मध्यम जोखिम'
                      : simulationResult.comparison.simulated.diseaseRisk}
                  </td>
                  <td className="py-3.5 px-4 text-xs font-bold text-slate-700">
                    {language === 'hi' || language === 'bho' ? `जोखिम स्कोर: ${simulationResult.comparison.simulated.diseaseScore} / 100` : `Risk Score: ${simulationResult.comparison.simulated.diseaseScore} / 100`}
                  </td>
                </tr>

                {/* 8. Return on Investment (ROI) */}
                <tr>
                  <td className="py-3.5 px-4 font-bold text-slate-700">
                    📊 {language === 'hi' ? 'निवेश पर लाभ (ROI)' : language === 'bho' ? 'मुनाफा दर (ROI)' : 'Return on Investment (ROI)'}
                  </td>
                  <td className="py-3.5 px-4 font-bold">{simulationResult.comparison.baseline.roiPercent}%</td>
                  <td className="py-3.5 px-4 font-black text-violet-700">{simulationResult.comparison.simulated.roiPercent}%</td>
                  <td className={`py-3.5 px-4 font-bold ${simulationResult.delta.roiDiff >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {simulationResult.delta.roiDiff >= 0 
                      ? (language === 'hi' || language === 'bho' ? `+${simulationResult.delta.roiDiff}% अधिक ROI` : `+${simulationResult.delta.roiDiff}% Higher ROI`) 
                      : (language === 'hi' || language === 'bho' ? `${simulationResult.delta.roiDiff}% कम ROI` : `${simulationResult.delta.roiDiff}% Lower ROI`)}
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* AI Decision Rationale & Voice Readout Box */}
          <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'hi' ? 'एआई डिजिटल ट्विन विश्लेषण एवं स्थान-विशिष्ट सलाह' : 'AI Digital Twin Synthesis & Location Advisory'}</span>
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                "{language === 'hi' ? simulationResult.aiDecisionRationaleHi : simulationResult.aiDecisionRationale}"
              </p>
            </div>

            <button
              onClick={handleSpeakRationale}
              className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center space-x-1.5 shadow-md shrink-0 transition cursor-pointer"
              title="Listen Decision Rationale"
            >
              {speaking ? <VolumeX className="w-4 h-4 text-white animate-pulse" /> : <Volume2 className="w-4 h-4" />}
              <span>{speaking ? (language === 'hi' ? 'रोकें' : 'Stop') : (language === 'hi' ? '🔊 विश्लेषण सुनें' : 'Listen AI Rationale')}</span>
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL: ADD CUSTOM CROP MANUALLY */}
      {/* ========================================================================= */}
      {isAddCropModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-scaleUp">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {language === 'hi' ? 'अपनी कस्टम फसल जोड़ें' : 'Add Custom Crop Manually'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === 'hi' ? 'नाम, उपज, मंडी भाव व लागत दर्ज करें' : 'Define custom parameters to simulate against any crop'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAddCropModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomCrop} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-700 font-bold block mb-1">
                  {language === 'hi' ? 'फसल का नाम (Crop Name):' : 'Crop Name:'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dragon Fruit, Garlic, Chia Seeds, Ginger..."
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">
                    {language === 'hi' ? 'फसल श्रेणी (Category):' : 'Crop Category:'}
                  </label>
                  <select
                    value={newCropCategory}
                    onChange={(e) => setNewCropCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs"
                  >
                    <option value="Horticulture">Horticulture / बागवानी</option>
                    <option value="Cash Crop">Cash Crop / नकदी फसल</option>
                    <option value="Spice">Spice / मसाला</option>
                    <option value="Medicinal">Medicinal / औषधीय</option>
                    <option value="Pulse">Pulse / दलहन</option>
                    <option value="Cereal">Cereal / अनाज</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">
                    {language === 'hi' ? 'अपेक्षित पैदावार (Quintal/Acre):' : 'Expected Yield (Quintals/Acre):'}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={newCropYieldQ}
                    onChange={(e) => setNewCropYieldQ(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">
                    {language === 'hi' ? 'अपेक्षित मंडी भाव (₹/Quintal):' : 'Market Rate (₹/Quintal):'}
                  </label>
                  <input
                    type="number"
                    required
                    value={newCropRateQ}
                    onChange={(e) => setNewCropRateQ(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs"
                  />
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">
                    {language === 'hi' ? 'कुल लागत प्रति एकड़ (₹/Acre):' : 'Total Input Cost (₹/Acre):'}
                  </label>
                  <input
                    type="number"
                    required
                    value={newCropCostAcre}
                    onChange={(e) => setNewCropCostAcre(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">
                    {language === 'hi' ? 'पानी की आवश्यकता:' : 'Water Requirement:'}
                  </label>
                  <select
                    value={newCropWaterLevel}
                    onChange={(e) => setNewCropWaterLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs"
                  >
                    <option value="Very Low">Very Low / बहुत कम (Drought hardy)</option>
                    <option value="Low">Low / कम (1-2 irrigations)</option>
                    <option value="Medium">Medium / मध्यम (3-4 irrigations)</option>
                    <option value="High">High / अधिक (Frequent)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-bold block mb-1">
                    {language === 'hi' ? 'रोग संवेदनशीलता:' : 'Disease Risk:'}
                  </label>
                  <select
                    value={newCropDiseaseRisk}
                    onChange={(e) => setNewCropDiseaseRisk(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs"
                  >
                    <option value="Low">Low / कम जोखिम</option>
                    <option value="Medium">Medium / मध्यम जोखिम</option>
                    <option value="High">High / उच्च जोखिम</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddCropModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer"
                >
                  {language === 'hi' ? 'बंद करें' : 'Close'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md shadow-emerald-600/20 transition cursor-pointer"
                >
                  {language === 'hi' ? 'फसल जोड़ें व सिमुलेट करें' : 'Save & Simulate Crop'}
                </button>
              </div>
            </form>

            {/* Saved Custom Crops Management List */}
            {customCrops.length > 0 && (
              <div className="pt-4 border-t border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                    <span>🌾</span>
                    <span>{language === 'hi' ? `सहेजी गई कस्टम फसलें (${customCrops.length})` : `Saved Custom Crops (${customCrops.length})`}</span>
                  </h4>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {language === 'hi' ? 'इन्हें कभी भी हटाया जा सकता है' : 'Can be deleted anytime'}
                  </span>
                </div>

                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {customCrops.map((crop) => (
                    <div 
                      key={crop.id}
                      className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:border-emerald-300 transition"
                    >
                      <div>
                        <div className="font-bold text-slate-900 text-xs flex items-center gap-1">
                          <span>{crop.name}</span>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">{crop.category}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5 space-x-2">
                          <span>🌾 {crop.baseYieldTons * 10} {language === 'hi' ? 'क्विंटल/एकड़' : 'q/Ac'}</span>
                          <span>•</span>
                          <span>💰 ₹{crop.basePricePerQuintal?.toLocaleString()}/{language === 'hi' ? 'क्विंटल' : 'q'}</span>
                          <span>•</span>
                          <span>💳 ₹{crop.totalBaseCost?.toLocaleString()} {language === 'hi' ? 'लागत' : 'cost'}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleDeleteCustomCrop(crop.id, e)}
                        className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center space-x-1 border border-rose-200 transition cursor-pointer"
                        title={language === 'hi' ? 'हटाएं' : 'Delete'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{language === 'hi' ? 'हटाएं' : 'Delete'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
