import React, { useState, useEffect } from 'react';
import { 
  Droplets, 
  Power, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  CloudRain, 
  Zap, 
  ShieldCheck,
  RotateCw
} from 'lucide-react';
import { getIrrigationAdvisory, togglePumpControl } from '../services/api';
import { 
  getTranslation, 
  CROP_NAMES_MAP, 
  GROWTH_STAGES_MAP, 
  SOIL_TYPES_MAP 
} from '../utils/translations';

export default function SmartIrrigation({ language = "en" }) {
  const [cropType, setCropType] = useState('Wheat');
  const [cropStage, setCropStage] = useState('vegetative');
  const [soilType, setSoilType] = useState('Loamy');
  const [soilMoisture, setSoilMoisture] = useState(42);
  const [rainForecastMm, setRainForecastMm] = useState(0);
  const [ambientTemp, setAmbientTemp] = useState(29);
  const [fieldArea, setFieldArea] = useState(2.5);

  const [advisory, setAdvisory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pumpRunning, setPumpRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const t = getTranslation(language);

  useEffect(() => {
    fetchAdvisory();
  }, [cropType, cropStage, soilType, soilMoisture, rainForecastMm, ambientTemp, fieldArea]);

  useEffect(() => {
    let interval = null;
    if (pumpRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(sec => sec - 1);
      }, 1000);
    } else if (timerSeconds === 0 && pumpRunning) {
      setPumpRunning(false);
    }
    return () => clearInterval(interval);
  }, [pumpRunning, timerSeconds]);

  const fetchAdvisory = async () => {
    setLoading(true);
    try {
      const data = await getIrrigationAdvisory({
        cropType,
        cropStage,
        soilType,
        soilMoisture: Number(soilMoisture),
        ambientTemp: Number(ambientTemp),
        humidity: 45,
        rainForecastMm: Number(rainForecastMm),
        fieldAreaAcres: Number(fieldArea)
      });
      setAdvisory(data.advice);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePump = async () => {
    const nextState = !pumpRunning;
    setPumpRunning(nextState);
    if (nextState) {
      setTimerSeconds((advisory?.recommendedDurationMinutes || 35) * 60);
    } else {
      setTimerSeconds(0);
    }
    await togglePumpControl(nextState);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Localized rationale builder
  const getLocalizedRationale = () => {
    if (soilMoisture < 45) {
      if (language === 'hi') {
        return `मिट्टी की नमी (${soilMoisture}%) जड़ क्षेत्र के लिए कम है। ${GROWTH_STAGES_MAP[cropStage]?.hi || 'वानस्पतिक'} अवस्था में पानी की कमी से पैदावार प्रभावित हो सकती है। सुबह 06:00 से 07:00 बजे के बीच ${advisory?.recommendedDurationMinutes || 35} मिनट ड्रिप सिंचाई चलाएं।`;
      }
      if (language === 'bho') {
        return `माटी के नमी (${soilMoisture}%) कम बा। ${GROWTH_STAGES_MAP[cropStage]?.bho || 'वानस्पतिक'} अवस्था में पानी जरूरी बा। बिहाने 06:00 से 07:00 बजे ले ${advisory?.recommendedDurationMinutes || 35} मिनट मोटर चला के पटवन करीं।`;
      }
      return advisory?.reason || "Soil moisture deficit detected. Precision irrigation recommended.";
    } else {
      if (language === 'hi') {
        return `मिट्टी में नमी का स्तर (${soilMoisture}%) पर्याप्त व संतुलित है। अभी सिंचाई की आवश्यकता नहीं है। इससे 31,250 लीटर पानी और बिजली की बचत होगी।`;
      }
      if (language === 'bho') {
        return `माटी में नमी (${soilMoisture}%) एकदम पूरा बा। अभी पानी मत पटावीं, एकरा से पानी आ बिजली बची।`;
      }
      return "Soil moisture is currently in the optimal range. No additional watering required.";
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 bg-white border-2 border-emerald-500/30 shadow-xl shadow-emerald-500/5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
              <Droplets className="w-3.5 h-3.5" />
              <span>{t.irrigation.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {t.irrigation.title}
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              {t.irrigation.desc}
            </p>
          </div>

          {/* Water Conservation KPI Counter */}
          <div className="flex items-center space-x-3">
            <div className="px-5 py-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center shadow-sm">
              <div className="text-xs text-emerald-800 font-bold">{t.irrigation.waterConserved}</div>
              <div className="text-2xl font-black text-emerald-700 mt-0.5">
                ~{advisory?.waterSavedLiters?.toLocaleString() || "31,250"} <span className="text-xs font-normal text-emerald-600">Liters</span>
              </div>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-amber-50 border border-amber-200 text-center shadow-sm">
              <div className="text-xs text-amber-800 font-bold">{t.irrigation.powerSaved}</div>
              <div className="text-2xl font-black text-amber-700 mt-0.5">38%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Field & Crop Parameters Form (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {t.irrigation.cropParameters}
              </h3>
              <span className="text-[10px] text-emerald-800 font-bold px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300">
                Live Sensor Feed
              </span>
            </div>

            {/* Crop Type */}
            <div>
              <label className="text-xs text-slate-700 font-bold block mb-1.5">
                {t.irrigation.targetCrop}
              </label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none font-medium"
              >
                <option value="Wheat">{CROP_NAMES_MAP.Wheat[language] || "Wheat"}</option>
                <option value="Tomato">{CROP_NAMES_MAP.Tomato[language] || "Tomato"}</option>
                <option value="Paddy / Rice">{CROP_NAMES_MAP["Paddy / Rice"][language] || "Paddy / Rice"}</option>
                <option value="Cotton">{CROP_NAMES_MAP.Cotton[language] || "Cotton"}</option>
                <option value="Chickpea / Gram">{CROP_NAMES_MAP["Chickpea / Gram"][language] || "Chickpea / Gram"}</option>
                <option value="Mustard">{CROP_NAMES_MAP.Mustard[language] || "Mustard"}</option>
              </select>
            </div>

            {/* Growth Stage */}
            <div>
              <label className="text-xs text-slate-700 font-bold block mb-1.5">
                {t.irrigation.growthStage}
              </label>
              <select
                value={cropStage}
                onChange={(e) => setCropStage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none font-medium"
              >
                <option value="vegetative">{GROWTH_STAGES_MAP.vegetative[language] || "Vegetative (Day 25-45)"}</option>
                <option value="tillering">{GROWTH_STAGES_MAP.tillering[language] || "Tillering / Branching"}</option>
                <option value="flowering">{GROWTH_STAGES_MAP.flowering[language] || "Flowering & Pollination"}</option>
                <option value="grain_filling">{GROWTH_STAGES_MAP.grain_filling[language] || "Grain / Fruit Filling"}</option>
                <option value="maturity">{GROWTH_STAGES_MAP.maturity[language] || "Maturity / Ripening"}</option>
              </select>
            </div>

            {/* Soil Texture */}
            <div>
              <label className="text-xs text-slate-700 font-bold block mb-1.5">
                {t.irrigation.soilTexture}
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none font-medium"
              >
                <option value="Loamy">{SOIL_TYPES_MAP.Loamy[language] || "Loamy"}</option>
                <option value="Clay">{SOIL_TYPES_MAP.Clay[language] || "Clay / Black Cotton Soil"}</option>
                <option value="Sandy">{SOIL_TYPES_MAP.Sandy[language] || "Sandy / Light Soil"}</option>
              </select>
            </div>

            {/* Soil Moisture Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
                <span>{t.irrigation.currentMoisture}</span>
                <span className="font-bold text-emerald-700">{soilMoisture}%</span>
              </div>
              <input
                type="range"
                min="15"
                max="85"
                value={soilMoisture}
                onChange={(e) => setSoilMoisture(e.target.value)}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Rain Forecast Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
                <span>{t.irrigation.rainForecast}</span>
                <span className="font-bold text-cyan-700">{rainForecastMm} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={rainForecastMm}
                onChange={(e) => setRainForecastMm(e.target.value)}
                className="w-full accent-cyan-600"
              />
            </div>

          </div>

        </div>

        {/* Right Column: Advisory Card & Smart IoT Pump Controller (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 border border-emerald-200 bg-white shadow-md space-y-6">
            
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
              <div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide flex items-center gap-1.5 ${
                    advisory?.irrigationRequired
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}>
                    {advisory?.irrigationRequired ? <AlertCircle className="w-4 h-4 text-amber-700" /> : <CheckCircle2 className="w-4 h-4 text-emerald-700" />}
                    <span>{advisory?.irrigationRequired ? t.irrigation.irrigateRequired : t.irrigation.noWaterNeeded}</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                  {advisory?.irrigationRequired 
                    ? `${t.irrigation.runTime}: ~${advisory?.recommendedDurationMinutes || 35} ${language === 'hi' ? 'मिनट' : language === 'bho' ? 'मिनट' : 'Minutes'}` 
                    : (language === 'hi' ? 'नमी पर्याप्त है' : language === 'bho' ? 'नमी पूरा बा' : 'Optimal Moisture')}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  {t.irrigation.scheduleWindow}: <strong className="text-emerald-700">{language === 'hi' ? 'कल सुबह (06:00 AM - 07:00 AM)' : language === 'bho' ? 'बिहाने सबेरे (06:00 AM - 07:00 AM)' : advisory?.scheduleWindow || "Tomorrow Morning (06:00 AM - 07:00 AM)"}</strong>
                </p>
              </div>

              {/* Dynamic Run Time Badge */}
              <div className="px-5 py-3 rounded-2xl bg-cyan-50 border border-cyan-200 text-center shadow-sm">
                <div className="text-[10px] text-cyan-800 uppercase font-bold">ET0 Water Need</div>
                <div className="text-xl font-black text-cyan-700">
                  {advisory?.cropWaterNeedMmPerDay || 4.8} <span className="text-xs font-normal text-slate-500">mm/day</span>
                </div>
              </div>
            </div>

            {/* Agronomic Rationale Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-sm">
              <span className="font-bold text-emerald-800 block mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t.irrigation.rationale}:</span>
              </span>
              {getLocalizedRationale()}
            </div>

            {/* Smart IoT Pump Controller Section */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  pumpRunning 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 animate-pulse' 
                    : 'bg-white text-slate-500 border border-slate-200 shadow-sm'
                }`}>
                  <Power className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {t.irrigation.iotPumpController || "IoT Drip Pump Relay"}
                  </div>
                  <div className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>{pumpRunning ? (language === 'hi' ? 'पंप चालू है (सिंचाई जारी)' : language === 'bho' ? 'पंप चालू बा' : 'Pump Running (Active)') : (language === 'hi' ? 'पंप स्टैंडबाय मोड' : 'Standby Mode')}</span>
                    {pumpRunning && <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>}
                  </div>
                  {pumpRunning && (
                    <div className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{language === 'hi' ? 'शेष समय' : 'Remaining'}: {formatTimer(timerSeconds)}</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleTogglePump}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm tracking-wide flex items-center justify-center space-x-2 transition shadow-md ${
                  pumpRunning
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                }`}
              >
                <Power className="w-4 h-4" />
                <span>{pumpRunning ? t.irrigation.stopPump : t.irrigation.startPump}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
