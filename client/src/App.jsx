import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import DiseaseDetector from './components/DiseaseDetector';
import CropRecommender from './components/CropRecommender';
import MarketIntelligence from './components/MarketIntelligence';
import GovernmentSchemes from './components/GovernmentSchemes';
import WhatIfSimulator from './components/WhatIfSimulator';
import CropPassportModal from './components/CropPassportModal';
import LiveWeatherModal from './components/LiveWeatherModal';
import AdminPortal from './components/AdminPortal';
import AIAssistantModal from './components/AIAssistantModal';
import FarmerAuth from './components/FarmerAuth';
import { logoutFirebase } from './services/firebase';
import { fetchDashboardData, simulateTelemetry, reverseGeocodeGPS, fetchLiveWeather } from './services/api';
import { MessageSquareText, Mic, Sprout } from 'lucide-react';
import { getTranslation } from './utils/translations';

function App() {
  const [portalRole, setPortalRole] = useState('user'); // 'user' (Farmer View) | 'admin' (Agriculture Officer)
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('agri_language') || 'hi';
    } catch {
      return 'hi';
    }
  });
  const [dashboardData, setDashboardData] = useState(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isWeatherOpen, setIsWeatherOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Logged-in Farmer state with local storage persistence
  const [farmerUser, setFarmerUser] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_logged_farmer');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // User-customizable Farm Location with local storage persistence
  const [farmLocation, setFarmLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('agri_farm_location');
      return saved ? JSON.parse(saved) : { city: "Indore, Madhya Pradesh", lat: 22.7196, lon: 75.8577, temp: 29 };
    } catch {
      return { city: "Indore, Madhya Pradesh", lat: 22.7196, lon: 75.8577, temp: 29 };
    }
  });

  const t = getTranslation(language);

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('agri_language', newLang);
    } catch (e) {
      console.warn("Language storage warning:", e);
    }
  };

  useEffect(() => {
    loadDashboard();
    detectUserLocation();
  }, []);

  // Automatic Location Discovery on Website Load
  const detectUserLocation = () => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const geoRes = await reverseGeocodeGPS({ lat: latitude, lon: longitude });
            const weatherRes = await fetchLiveWeather({ lat: latitude, lon: longitude });
            
            const cityName = geoRes?.displayName || `${latitude.toFixed(2)}°N, ${longitude.toFixed(2)}°E`;
            const currentTemp = weatherRes?.current?.temperature || 28;

            const detectedLoc = {
              city: cityName,
              lat: latitude,
              lon: longitude,
              temp: currentTemp
            };
            handleUpdateFarmLocation(detectedLoc);
            try {
              localStorage.setItem('agri_farm_location', JSON.stringify(detectedLoc));
            } catch {}
          } catch (err) {
            console.log("Auto-location weather enrichment failed:", err);
          }
        },
        (error) => {
          console.log("Browser geolocation permission not granted, using saved/default location:", error.message);
        },
        { timeout: 8000, maximumAge: 300000, enableHighAccuracy: false }
      );
    }
  };

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const data = await fetchDashboardData();
      setDashboardData(data);
    } catch (err) {
      console.error("Dashboard load failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFarmLocation = async (newLoc) => {
    setFarmLocation(newLoc);
    try {
      localStorage.setItem('agri_active_location', JSON.stringify(newLoc));
    } catch (e) {}

    // Fetch live weather data for this updated location
    try {
      const liveW = await fetchLiveWeather({ lat: newLoc.lat, lon: newLoc.lon, city: newLoc.city });
      if (liveW?.current) {
        setDashboardData(prev => ({
          ...prev,
          location: newLoc.city,
          weather: {
            ...prev?.weather,
            temperature: Math.round(liveW.current.temperature),
            humidity: Math.round(liveW.current.humidity),
            rainfallForecast: liveW.current.rainForecast || "0 mm",
            condition: liveW.current.conditionText || prev?.weather?.condition || "Clear"
          }
        }));
        return;
      }
    } catch (err) {
      console.warn("Live weather update on location change fallback:", err);
    }

    if (dashboardData) {
      setDashboardData(prev => ({
        ...prev,
        location: newLoc.city,
        weather: {
          ...prev?.weather,
          temperature: newLoc.temp || prev?.weather?.temperature || 29
        }
      }));
    }
  };

  const handleSimulate = async (updates) => {
    try {
      await simulateTelemetry(updates);
      const refreshed = await fetchDashboardData();
      setDashboardData(refreshed);
    } catch (err) {
      console.error("Simulation error:", err);
    }
  };

  const handleAuthSuccess = (farmer) => {
    setFarmerUser(farmer);
    try {
      localStorage.setItem('agri_logged_farmer', JSON.stringify(farmer));
    } catch (e) {
      console.warn("Farmer storage error:", e);
    }

    // Auto-synchronize registered District & State with the website's farmLocation
    if (farmer?.district && farmer?.state) {
      const newCity = `${farmer.district}, ${farmer.state}`;
      const newLoc = {
        city: newCity,
        lat: farmer.lat || farmLocation.lat || 22.7196,
        lon: farmer.lon || farmLocation.lon || 75.8577,
        temp: 29
      };
      handleUpdateFarmLocation(newLoc);
      try {
        localStorage.setItem('agri_farm_location', JSON.stringify(newLoc));
      } catch {}
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('agri_logged_farmer');
    } catch (e) {}
    logoutFirebase();
    setFarmerUser(null);
  };

  // If farmer is not logged in, enforce the Login & Registration Gateway
  if (!farmerUser) {
    return (
      <FarmerAuth 
        language={language}
        setLanguage={handleLanguageChange}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 via-slate-50 to-white text-slate-900 flex flex-col selection:bg-emerald-500 selection:text-white">
      
      {/* Navigation Bar with Role Switcher & Farmer Profile Pill */}
      <Navbar 
        portalRole={portalRole}
        setPortalRole={setPortalRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={handleLanguageChange}
        openAssistantModal={() => setIsAssistantOpen(true)}
        openPassportModal={() => setIsPassportOpen(true)}
        openWeatherModal={() => setIsWeatherOpen(true)}
        farmLocation={farmLocation}
        farmHealth={dashboardData?.farmHealthScore || 87}
        broadcastCount={dashboardData?.broadcasts?.length || 0}
        farmerUser={farmerUser}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        
        {/* ================= ADMIN VIEW ================= */}
        {portalRole === 'admin' && (
          <AdminPortal language={language} />
        )}

        {/* ================= FARMER / USER VIEW ================= */}
        {portalRole === 'user' && (
          <>
            {activeTab === 'dashboard' && (
              <DashboardOverview 
                dashboardData={dashboardData}
                farmLocation={farmLocation}
                setActiveTab={setActiveTab}
                onSimulate={handleSimulate}
                language={language}
                onOpenAssistant={() => setIsAssistantOpen(true)}
                onOpenWeather={() => setIsWeatherOpen(true)}
                farmerUser={farmerUser}
              />
            )}

            {activeTab === 'simulator' && (
              <WhatIfSimulator language={language} />
            )}

            {activeTab === 'disease' && (
              <DiseaseDetector language={language} onOpenAssistant={() => setIsAssistantOpen(true)} />
            )}

            {activeTab === 'crops' && (
              <CropRecommender 
                language={language} 
                farmLocation={farmLocation}
                dashboardData={dashboardData}
              />
            )}

            {activeTab === 'market' && (
              <MarketIntelligence language={language} />
            )}

            {activeTab === 'schemes' && (
              <GovernmentSchemes language={language} />
            )}

            {activeTab === 'assistant' && (
              <div className="py-6">
                <div className="glass-panel-glow rounded-3xl p-8 text-center max-w-xl mx-auto space-y-4 bg-white border border-emerald-500/30 shadow-xl shadow-emerald-500/10">
                  <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-md">
                    <MessageSquareText className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {t.assistant.title}
                  </h2>
                  <p className="text-sm text-slate-600">
                    {t.assistant.subtitle}
                  </p>
                  <button
                    onClick={() => setIsAssistantOpen(true)}
                    className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition flex items-center space-x-2 mx-auto"
                  >
                    <Mic className="w-4 h-4" />
                    <span>{t.askVoice}</span>
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* AI Voice Assistant Floating Button */}
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="p-3.5 sm:px-4 sm:py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-xl shadow-emerald-600/30 transition flex items-center space-x-2 group animate-bounce [animation-duration:3s]"
          title="Open Voice Assistant"
        >
          <Mic className="w-5 h-5 text-white" />
          <span className="hidden sm:inline">{t.askVoice}</span>
        </button>
      </div>

      {/* Modals */}
      <AIAssistantModal 
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        language={language}
        setLanguage={handleLanguageChange}
      />

      <CropPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
        language={language}
      />

      <LiveWeatherModal
        isOpen={isWeatherOpen}
        onClose={() => setIsWeatherOpen(false)}
        language={language}
        farmLocation={farmLocation}
        onUpdateFarmLocation={handleUpdateFarmLocation}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/90 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-2 font-medium">
            <Sprout className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-800 font-bold">AgriSmart AI — CodeBuild 1.0</span>
          </div>
          <div className="text-slate-600">
            “Make every farmer a data-driven farmer” • Dual Portal: 🌾 Farmer App + 🛡️ Krishi Command Center
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
