import React, { useState, useEffect } from 'react';
import { 
  X, 
  CloudSun, 
  Sun, 
  CloudRain, 
  Cloud, 
  CloudLightning, 
  Wind, 
  Droplets, 
  Compass, 
  Search, 
  MapPin, 
  RefreshCw, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle,
  Sunrise,
  Sunset,
  Gauge,
  Thermometer,
  ShieldCheck,
  Check,
  Navigation,
  Radio,
  LocateFixed
} from 'lucide-react';
import { fetchLiveWeather, searchWeatherCities, reverseGeocodeGPS } from '../services/api';
import { getTranslation } from '../utils/translations';
import { SUPPORTED_LANGUAGES } from '../utils/languages';

// 🌾 Top Farming Regions in India for 1-Click Fast Location Switch
export const POPULAR_FARMING_REGIONS = [
  { name: "Lucknow, UP", nameHi: "लखनऊ (उ.प्र.)", lat: 26.8467, lon: 80.9462, state: "Uttar Pradesh" },
  { name: "Kanpur, UP", nameHi: "कानपुर नगर (उ.प्र.)", lat: 26.4499, lon: 80.3319, state: "Uttar Pradesh" },
  { name: "Kanpur Dehat, UP", nameHi: "कानपुर देहात (अकबरपुर, उ.प्र.)", lat: 26.4357, lon: 79.9507, state: "Uttar Pradesh" },
  { name: "Indore, MP (Malwa)", nameHi: "इंदौर (मालवा, म.प्र.)", lat: 22.7196, lon: 75.8577, state: "Madhya Pradesh" },
  { name: "Varanasi, UP", nameHi: "वाराणसी / पूर्वांचल (उ.प्र.)", lat: 25.3176, lon: 82.9739, state: "Uttar Pradesh" },
  { name: "Patna, Bihar", nameHi: "पटना (बिहार)", lat: 25.5941, lon: 85.1376, state: "Bihar" },
  { name: "Ludhiana, Punjab", nameHi: "लुधियाना (पंजाब)", lat: 30.9010, lon: 75.8573, state: "Punjab" },
  { name: "Bhopal, MP", nameHi: "भोपाल (म.प्र.)", lat: 23.2599, lon: 77.4126, state: "Madhya Pradesh" },
  { name: "Jaipur, Rajasthan", nameHi: "जयपुर (राजस्थान)", lat: 26.9124, lon: 75.7873, state: "Rajasthan" },
  { name: "Nagpur, Maharashtra", nameHi: "नागपुर (विदर्भ, महा.)", lat: 21.1458, lon: 79.0882, state: "Maharashtra" },
  { name: "Nashik, Maharashtra", nameHi: "नासिक (महाराष्ट्र)", lat: 19.9975, lon: 73.7898, state: "Maharashtra" },
  { name: "Karnal, Haryana", nameHi: "करनाल (हरियाणा)", lat: 29.6857, lon: 76.9905, state: "Haryana" },
  { name: "Guntur, Andhra Pradesh", nameHi: "गुंटूर (आंध्र प्रदेश)", lat: 16.3067, lon: 80.4365, state: "Andhra Pradesh" },
  { name: "Coimbatore, Tamil Nadu", nameHi: "कोयंबटूर (तमिलनाडु)", lat: 11.0168, lon: 76.9558, state: "Tamil Nadu" },
  { name: "Bengaluru Rural, Karnataka", nameHi: "बेंगलुरु ग्रामीण (कर्नाटक)", lat: 12.9716, lon: 77.5946, state: "Karnataka" }
];

export default function LiveWeatherModal({ 
  isOpen, 
  onClose, 
  language = "hi", 
  farmLocation = { city: "Indore, Madhya Pradesh", lat: 22.7196, lon: 75.8577 },
  onUpdateFarmLocation
}) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState(farmLocation.city);
  const [coords, setCoords] = useState({ lat: farmLocation.lat, lon: farmLocation.lon });
  const [speaking, setSpeaking] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const t = getTranslation(language);
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    if (isOpen) {
      setSelectedCity(farmLocation.city);
      setCoords({ lat: farmLocation.lat, lon: farmLocation.lon });
      loadWeather(farmLocation.lat, farmLocation.lon, farmLocation.city);
    }
  }, [isOpen, farmLocation]);

  const loadWeather = async (lat, lon, city) => {
    setLoading(true);
    try {
      const data = await fetchLiveWeather({ lat, lon, city });
      if (data?.current) {
        setWeatherData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySearch = async (val) => {
    setSearchQuery(val);
    if (val.trim().length >= 2) {
      const res = await searchWeatherCities(val.trim());
      if (res?.results) {
        setSearchResults(res.results);
      }
    } else {
      setSearchResults([]);
    }
  };

  const selectCity = (cityObj) => {
    setSelectedCity(cityObj.displayName);
    setCoords({ lat: cityObj.latitude, lon: cityObj.longitude });
    setSearchQuery('');
    setSearchResults([]);
    loadWeather(cityObj.latitude, cityObj.longitude, cityObj.displayName);
  };

  const selectPresetRegion = (region) => {
    setSelectedCity(region.name);
    setCoords({ lat: region.lat, lon: region.lon });
    loadWeather(region.lat, region.lon, region.name);
  };

  // 📍 AUTOMATIC LIVE GPS GEOLOCATION + REVERSE GEOCODE
  const useLiveGPS = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        let resolvedCityName = `Live Farm GPS (${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E)`;

        try {
          const geoRes = await reverseGeocodeGPS({ lat: latitude, lon: longitude });
          if (geoRes?.displayName) {
            resolvedCityName = geoRes.displayName;
          }
        } catch (e) {
          console.warn("Reverse geocode fallback used:", e);
        }

        setSelectedCity(resolvedCityName);
        setCoords({ lat: latitude, lon: longitude });
        setIsLocating(false);

        // Auto-load weather & save
        await loadWeather(latitude, longitude, resolvedCityName);

        const locObj = {
          city: resolvedCityName,
          lat: latitude,
          lon: longitude,
          temp: 29,
          condition: "Clear"
        };
        if (onUpdateFarmLocation) onUpdateFarmLocation(locObj);
        try {
          localStorage.setItem('agri_farm_location', JSON.stringify(locObj));
        } catch (e) {}

        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      },
      (err) => {
        setIsLocating(false);
        alert("GPS location permission denied. Please allow location access or choose Lucknow / Kanpur from presets.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Permanently save location as Active Farm Location
  const handleSaveAsFarmLocation = () => {
    const locObj = {
      city: selectedCity,
      lat: coords.lat,
      lon: coords.lon,
      temp: weatherData?.current?.temperature || 29,
      condition: weatherData?.current?.condition || "Clear"
    };

    if (onUpdateFarmLocation) {
      onUpdateFarmLocation(locObj);
    }

    try {
      localStorage.setItem('agri_farm_location', JSON.stringify(locObj));
    } catch (e) {
      console.warn("Storage save failed:", e);
    }

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSpeakWeather = () => {
    if (!('speechSynthesis' in window) || !weatherData) return;
    window.speechSynthesis.cancel();
    if (speaking) {
      setSpeaking(false);
      return;
    }

    const curr = weatherData.current;
    const textToSpeak = language === 'hi' || language === 'bho'
      ? `${selectedCity} में वर्तमान तापमान ${curr.temperature} डिग्री सेल्सियस है। मौसम ${curr.conditionHi || curr.condition} है। आर्द्रता ${curr.humidity}% और हवा ${curr.windSpeedKmH} किलोमीटर प्रति घंटा है। कृषि सलाह: ${weatherData.agroAdvisory?.generalAdvisoryHi || 'मौसम अनुकूल है।'}`
      : `In ${selectedCity}, live temperature is ${curr.temperature}°C with ${curr.condition}. Humidity is ${curr.humidity}% and wind speed is ${curr.windSpeedKmH} km/h. Agricultural advisory: ${weatherData.agroAdvisory?.generalAdvisory || 'Favorable conditions.'}`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = currentLangObj.speechCode || 'hi-IN';
    utterance.rate = 0.93;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  if (!isOpen) return null;

  const curr = weatherData?.current || {
    temperature: 29,
    feelsLike: 30,
    humidity: 46,
    condition: "Mainly Clear & Sunny",
    conditionHi: "साफ एवं धूप",
    windSpeedKmH: 9,
    windDirection: 240,
    pressureHpa: 1012,
    uvIndex: 6,
    rainfallForecast24h: "0 mm"
  };

  const isCurrentActiveFarm = farmLocation.city === selectedCity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-3xl bg-white border-2 border-emerald-500/30 p-6 sm:p-8 shadow-2xl my-6 space-y-6 max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition border border-slate-200 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header & Search Bar */}
        <div className="space-y-4 pb-4 border-b border-slate-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
                <CloudSun className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'लाइव मौसम पूर्वानुमान एवं GPS स्थान' : 'Live Satellite Weather & Farm GPS'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedCity}
                </h2>
              </div>
            </div>

            {/* Set as Active Farm Location Action Button */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSaveAsFarmLocation}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black flex items-center space-x-2 transition shadow-md ${
                  isCurrentActiveFarm || savedSuccess
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-500'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/30'
                }`}
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{language === 'hi' ? 'स्थान सेट हो गया! ✓' : 'Location Saved! ✓'}</span>
                  </>
                ) : isCurrentActiveFarm ? (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{language === 'hi' ? 'सक्रिय खेत का स्थान (Active)' : 'Active Farm Location'}</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4" />
                    <span>{language === 'hi' ? '📍 इसे मेरा खेत बनाएं' : '📍 Set as My Farm Location'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Search Input & Live GPS Auto-Detect Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleCitySearch(e.target.value)}
                placeholder={language === 'hi' ? "नया शहर या जिला खोजें (उदा: Lucknow, Kanpur, Patna, Ludhiana)..." : "Search any city or district across India..."}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none shadow-inner"
              />

              {/* Search Suggestions Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 rounded-2xl bg-white border border-slate-200 shadow-2xl z-30 overflow-hidden divide-y divide-slate-100">
                  {searchResults.map((city, idx) => (
                    <button
                      key={idx}
                      onClick={() => selectCity(city)}
                      className="w-full p-3 text-left text-xs text-slate-800 hover:bg-emerald-50 hover:text-emerald-900 flex items-center justify-between transition"
                    >
                      <span className="font-semibold">{city.displayName}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 1-Tap Live GPS Auto-Detect Button */}
            <button
              onClick={useLiveGPS}
              disabled={isLocating}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center space-x-2 transition shadow-md shadow-emerald-600/20 cursor-pointer shrink-0"
              title="Auto-Detect Live GPS Coordinates from Device"
            >
              {isLocating ? (
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
              ) : (
                <LocateFixed className="w-4 h-4 text-white" />
              )}
              <span>{isLocating ? (language === 'hi' ? 'GPS खोज रहा है...' : 'Locating GPS...') : (language === 'hi' ? '📍 मेरा लाइव GPS स्थान लें' : '📍 Auto-Detect Live GPS')}</span>
            </button>
          </div>

          {/* Quick Regional Presets Carousel */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2">
              <span>{language === 'hi' ? '⚡ 1-क्लिक प्रमुख कृषि क्षेत्र:' : '⚡ 1-Click Major Farming Districts:'}</span>
              <span className="text-emerald-700 font-bold">15+ Districts</span>
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
              {POPULAR_FARMING_REGIONS.map((region, idx) => {
                const isSelected = selectedCity.includes(region.name.split(',')[0]);
                return (
                  <button
                    key={idx}
                    onClick={() => selectPresetRegion(region)}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    }`}
                  >
                    {language === 'hi' || language === 'bho' ? region.nameHi : region.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Live Weather Hero Card */}
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center space-y-3">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin" />
            <p className="text-xs font-bold text-slate-500">
              {language === 'hi' ? 'लाइव उपग्रह मौसम डेटा लोड हो रहा है...' : 'Fetching Live Satellite Weather Telemetry...'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            
            <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 backdrop-blur-3xl rounded-l-full pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center space-x-2 text-emerald-100 text-xs font-bold uppercase tracking-wider mb-1">
                    <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-200" />
                    <span>{language === 'hi' ? 'लाइव उपग्रह डेटा • अपडेटेड' : 'Live Satellite Feed • Real-Time'}</span>
                  </div>
                  <div className="text-4xl sm:text-5xl font-black tracking-tight">
                    {curr.temperature}°C
                  </div>
                  <div className="text-lg font-bold text-emerald-50 mt-1">
                    {language === 'hi' || language === 'bho' ? curr.conditionHi || curr.condition : curr.condition}
                  </div>
                  <div className="text-xs text-emerald-100 mt-1">
                    {language === 'hi' ? 'महसूस होता है' : 'Feels like'}: {curr.feelsLike || curr.temperature}°C • {language === 'hi' ? 'बारिश का पूर्वानुमान' : 'Rain Forecast'}: {curr.rainfallForecast24h || '0 mm'}
                  </div>
                </div>

                {/* Weather Speak Audio Button */}
                <div className="flex flex-col items-start sm:items-end gap-3">
                  <button
                    onClick={handleSpeakWeather}
                    className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-md transition border border-white/30 shadow-sm"
                  >
                    {speaking ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
                    <span>{speaking ? (language === 'hi' ? 'मौसम सुना रहा हूँ...' : 'Speaking...') : (language === 'hi' ? 'मौसम बुलेटिन सुनें' : 'Listen Voice Bulletin')}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2 text-right">
                    <div className="px-3 py-1.5 rounded-xl bg-black/15 text-left backdrop-blur-sm">
                      <div className="text-[10px] text-emerald-100 uppercase font-semibold">{language === 'hi' ? 'आर्द्रता' : 'Humidity'}</div>
                      <div className="text-sm font-bold text-white">{curr.humidity}%</div>
                    </div>
                    <div className="px-3 py-1.5 rounded-xl bg-black/15 text-left backdrop-blur-sm">
                      <div className="text-[10px] text-emerald-100 uppercase font-semibold">{language === 'hi' ? 'हवा की गति' : 'Wind Speed'}</div>
                      <div className="text-sm font-bold text-white">{curr.windSpeedKmH} km/h</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Agro-Advisory Cards */}
            {weatherData?.agroAdvisory && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1.5">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{language === 'hi' ? 'फसल छिड़काव सलाह:' : 'Foliar Spray Advisory:'}</span>
                    <span className="font-black text-emerald-800">
                      {language === 'hi' ? weatherData.agroAdvisory.spraying?.statusHi : weatherData.agroAdvisory.spraying?.status}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {language === 'hi' ? weatherData.agroAdvisory.spraying?.descHi : weatherData.agroAdvisory.spraying?.desc}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 text-xs space-y-1.5">
                  <div className="font-bold text-cyan-900 flex items-center gap-1.5">
                    <Droplets className="w-4 h-4 text-cyan-600" />
                    <span>{language === 'hi' ? 'सिंचाई दिशा-निर्देश:' : 'Smart Irrigation Need:'}</span>
                    <span className="font-black text-cyan-800">
                      {language === 'hi' ? weatherData.agroAdvisory.irrigation?.statusHi : weatherData.agroAdvisory.irrigation?.status}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {language === 'hi' ? weatherData.agroAdvisory.generalAdvisoryHi : weatherData.agroAdvisory.generalAdvisory}
                  </p>
                </div>
              </div>
            )}

            {/* 7-Day Weather Outlook */}
            {weatherData?.forecast7Day?.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {language === 'hi' ? '7 दिवसीय कृषि मौसम पूर्वानुमान' : '7-Day Agronomic Forecast'}
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                  {weatherData.forecast7Day.map((day, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1 shadow-sm">
                      <div className="text-[11px] font-bold text-slate-600">
                        {language === 'hi' || language === 'bho' ? day.dayHi || day.day : day.day}
                      </div>
                      <div className="text-base font-black text-slate-900">
                        {day.maxTemp}°
                        <span className="text-xs text-slate-400 font-normal"> / {day.minTemp}°</span>
                      </div>
                      <div className="text-[10px] text-emerald-700 font-semibold truncate">
                        {language === 'hi' || language === 'bho' ? day.conditionHi || day.condition : day.condition}
                      </div>
                      <div className="text-[10px] text-cyan-700 font-bold">
                        💧 {day.precipitationMm || 0} mm
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
