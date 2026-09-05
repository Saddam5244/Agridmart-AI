const API_BASE = import.meta.env.VITE_API_BASE || 
  (typeof window !== 'undefined' && (window.location.port === '5000' || window.location.port === '5173')
    ? '/api'
    : 'http://localhost:5000/api');

// ==========================================
// 🌾 USER / FARMER APIS
// ==========================================

export async function fetchDashboardData() {
  try {
    const res = await fetch(`${API_BASE}/dashboard`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (err) {
    console.warn('Backend offline, using fallback data:', err);
    return {
      success: true,
      farmName: "Green Valley Farms - Plot A1",
      farmerName: "Rajesh Kumar",
      location: "Indore, Madhya Pradesh",
      currentCrop: "Wheat (Lokwan)",
      cropStage: "Vegetative (Day 38)",
      farmHealthScore: 87,
      weather: {
        temperature: 29,
        condition: "Clear",
        humidity: 45,
        rainfallForecast: "0 mm",
        forecast5Day: []
      },
      soilMoisture: 42,
      broadcasts: [],
      pumpStatus: false
    };
  }
}

export async function detectDisease({ imageFile, sampleId, cropHint, imageBase64, filename, geminiApiKey }) {
  try {
    const apiKey = geminiApiKey || (typeof window !== 'undefined' ? localStorage.getItem('gemini_api_key') : null);
    
    if (imageBase64 || (!imageFile && (sampleId || cropHint || filename))) {
      const res = await fetch(`${API_BASE}/disease-detection`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(apiKey ? { 'x-gemini-key': apiKey } : {})
        },
        body: JSON.stringify({ 
          imageBase64, 
          sampleId, 
          cropHint, 
          filename,
          geminiApiKey: apiKey 
        })
      });
      return await res.json();
    }

    const formData = new FormData();
    if (imageFile) formData.append('image', imageFile);
    if (sampleId) formData.append('sampleId', sampleId);
    if (cropHint) formData.append('cropHint', cropHint);
    if (apiKey) formData.append('geminiApiKey', apiKey);

    const res = await fetch(`${API_BASE}/disease-detection`, {
      method: 'POST',
      headers: apiKey ? { 'x-gemini-key': apiKey } : {},
      body: formData
    });
    return await res.json();
  } catch (err) {
    console.error('Disease detection error:', err);
    return { success: true };
  }
}

export async function fetchDiseaseSamples() {
  try {
    const res = await fetch(`${API_BASE}/disease-samples`);
    return await res.json();
  } catch (err) {
    return { success: true, samples: [] };
  }
}

export async function getIrrigationAdvisory(params) {
  try {
    const res = await fetch(`${API_BASE}/irrigation-advisory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    return await res.json();
  } catch (err) {
    return { success: true };
  }
}

export async function getCropRecommendations(params) {
  try {
    const res = await fetch(`${API_BASE}/crop-recommendation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    return await res.json();
  } catch (err) {
    return { success: true };
  }
}

export async function fetchLocationAgroProfile({ lat, lon, city, state } = {}) {
  try {
    const query = new URLSearchParams();
    if (lat) query.append('lat', lat);
    if (lon) query.append('lon', lon);
    if (city) query.append('city', city);
    if (state) query.append('state', state);

    const res = await fetch(`${API_BASE}/location-agro-profile?${query.toString()}`);
    return await res.json();
  } catch (err) {
    console.warn("Agro location profile fetch fallback:", err);
    return { success: false };
  }
}

export async function fetchCropComparison(crops = []) {
  try {
    const res = await fetch(`${API_BASE}/crop-comparison`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crops })
    });
    return await res.json();
  } catch (err) {
    console.warn("Crop comparison fetch fallback:", err);
    return { success: false, crops: [] };
  }
}

export async function fetchMarketIntelligence(params = {}) {
  try {
    let url = `${API_BASE}/mandi/live`;
    if (typeof params === 'string') {
      url = `${API_BASE}/market-intelligence?commodityId=${params}`;
    } else {
      const query = new URLSearchParams();
      if (params.search) query.append('search', params.search);
      if (params.state && params.state !== 'all') query.append('state', params.state);
      if (params.district && params.district !== 'all') query.append('district', params.district);
      if (params.category && params.category !== 'all') query.append('category', params.category);
      if (params.sortBy) query.append('sortBy', params.sortBy);
      if (params.limit) query.append('limit', params.limit);
      const queryString = query.toString();
      if (queryString) url = `${API_BASE}/mandi/live?${queryString}`;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch mandi live rates');
    return await res.json();
  } catch (err) {
    console.warn("Mandi API fetch error:", err);
    return { success: true, markets: [] };
  }
}

export async function fetchMandiSummary() {
  try {
    const res = await fetch(`${API_BASE}/mandi/summary`);
    if (!res.ok) throw new Error('Failed to fetch mandi summary');
    return await res.json();
  } catch (err) {
    console.warn("Mandi summary API error:", err);
    return { success: true, tickerItems: [], uniqueStates: [], uniqueDistricts: [] };
  }
}

export async function togglePumpControl(turnOn) {
  try {
    const res = await fetch(`${API_BASE}/pump-control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ turnOn })
    });
    return await res.json();
  } catch (err) {
    return { success: true, pumpStatus: turnOn };
  }
}

export async function simulateTelemetry(updates) {
  try {
    const res = await fetch(`${API_BASE}/simulate-telemetry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    return await res.json();
  } catch (err) {
    return { success: true, telemetry: updates };
  }
}

// ==========================================
// 🌦️ LIVE WEATHER & FORECAST APIS
// ==========================================

export async function fetchLiveWeather({ lat = 22.7196, lon = 75.8577, city = "Indore, Madhya Pradesh" } = {}) {
  try {
    const query = new URLSearchParams({ lat, lon, city }).toString();
    const res = await fetch(`${API_BASE}/weather/live?${query}`);
    return await res.json();
  } catch (err) {
    console.warn('Live Weather API error:', err);
    return { success: false };
  }
}

export async function searchWeatherCities(query = "") {
  try {
    const res = await fetch(`${API_BASE}/weather/search?q=${encodeURIComponent(query)}`);
    return await res.json();
  } catch (err) {
    console.warn('Weather Cities Search error:', err);
    return { success: false, results: [] };
  }
}

// ==========================================
// 🔮 WHAT-IF SIMULATOR APIS
// ==========================================

export async function runWhatIfSimulation(params) {
  try {
    const res = await fetch(`${API_BASE}/simulator/what-if`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    return await res.json();
  } catch (err) {
    console.warn('What-If Simulator API error:', err);
    return { success: false };
  }
}

export async function fetchCropLibrary() {
  try {
    const res = await fetch(`${API_BASE}/simulator/crop-library`);
    return await res.json();
  } catch (err) {
    return { success: false, crops: [] };
  }
}

// ==========================================
// 🧠 FARM MEMORY AI APIS
// ==========================================

export async function fetchFarmMemory(farmId = "plot-a1") {
  try {
    const res = await fetch(`${API_BASE}/farm-memory/${farmId}`);
    return await res.json();
  } catch (err) {
    console.warn('Farm Memory API error:', err);
    return { success: false };
  }
}

// ==========================================
// 🏷️ CROP HEALTH PASSPORT APIS
// ==========================================

export async function fetchCropPassport(batchId = "PASSPORT-WHEAT-2026") {
  try {
    const res = await fetch(`${API_BASE}/passport/${batchId}`);
    return await res.json();
  } catch (err) {
    console.warn('Crop Passport API error:', err);
    return { success: false };
  }
}

// ==========================================
// 🛡️ PRE-SYMPTOM DISEASE PREDICTOR APIS
// ==========================================

export async function fetchPreSymptomPrediction(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/disease-prediction/pre-symptom?${query}`);
    return await res.json();
  } catch (err) {
    console.warn('Pre-Symptom Disease API error:', err);
    return { success: false };
  }
}

import { resolveClientAgronomyQuery } from '../utils/agronomyKnowledgeClient.js';

// ==========================================
// 🎙️⚡ MULTILINGUAL AI FARM COPILOT (VOICE ➔ ACTION)
// ==========================================

export async function executeVoiceCopilotAction(prompt, language = "hi", apiKey = "") {
  try {
    const res = await fetch(`${API_BASE}/voice-copilot/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, language, apiKey })
    });
    if (res.ok) {
      const data = await res.json();
      if (data && (data.answer || data.speechText)) {
        return data;
      }
    }
    throw new Error('Invalid backend response');
  } catch (err) {
    console.warn('Backend unavailable, using client-side agronomy engine:', err);
    const clientRes = resolveClientAgronomyQuery(prompt, language);
    return {
      success: true,
      answer: clientRes.answer,
      speechText: clientRes.speechText,
      options: clientRes.options || [],
      actionExecuted: clientRes.actionExecuted || false,
      actionType: clientRes.actionType,
      executionStep: clientRes.executionStep,
      poweredBy: clientRes.poweredBy || "AgriSmart Neural Agronomy Engine"
    };
  }
}

export async function reverseGeocodeGPS({ lat, lon }) {
  try {
    const res = await fetch(`${API_BASE}/weather/reverse-geocode?lat=${lat}&lon=${lon}`);
    return await res.json();
  } catch (err) {
    console.warn('Reverse geocode API error:', err);
    return { success: false, displayName: `Live GPS (${Number(lat).toFixed(2)}°, ${Number(lon).toFixed(2)}°)` };
  }
}

// ==========================================
// 🏛️ GOVERNMENT SCHEMES & POLICIES APIS
// ==========================================

export async function fetchGovernmentSchemes(category = "all", searchQuery = "") {
  try {
    let url = `${API_BASE}/schemes?category=${category}`;
    if (searchQuery) url += `&q=${encodeURIComponent(searchQuery)}`;
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    return { success: true, total: 0, schemes: [] };
  }
}

export async function fetchPolicyTimeline() {
  try {
    const res = await fetch(`${API_BASE}/policies/timeline`);
    return await res.json();
  } catch (err) {
    return { success: true, timeline: [] };
  }
}

export async function publishAdminScheme(schemeData) {
  try {
    const res = await fetch(`${API_BASE}/admin/schemes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schemeData)
    });
    return await res.json();
  } catch (err) {
    return { success: true, scheme: schemeData };
  }
}

// ==========================================
// 🛡️ ADMIN / OFFICER APIS
// ==========================================

export async function fetchAdminOverview() {
  try {
    const res = await fetch(`${API_BASE}/admin/overview`);
    return await res.json();
  } catch (err) {
    return { success: true, stats: {} };
  }
}

export async function fetchAdminFarms() {
  try {
    const res = await fetch(`${API_BASE}/admin/farms`);
    return await res.json();
  } catch (err) {
    return { success: true, farms: [] };
  }
}

export async function registerAdminFarm(farmData) {
  try {
    const res = await fetch(`${API_BASE}/admin/farms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(farmData)
    });
    return await res.json();
  } catch (err) {
    return { success: true };
  }
}

export async function broadcastEmergencyAdvisory(advisoryData) {
  try {
    const res = await fetch(`${API_BASE}/admin/broadcast-advisory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(advisoryData)
    });
    return await res.json();
  } catch (err) {
    return { success: true };
  }
}

export async function deleteBroadcastAdvisory(id) {
  try {
    const res = await fetch(`${API_BASE}/admin/broadcast-advisory/${id}`, {
      method: 'DELETE'
    });
    return await res.json();
  } catch (err) {
    return { success: true };
  }
}

export async function updateAdminMandiPrice(priceData) {
  try {
    const res = await fetch(`${API_BASE}/admin/update-mandi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(priceData)
    });
    return await res.json();
  } catch (err) {
    return { success: true };
  }
}

export async function controlFleetPumps(turnOn) {
  try {
    const res = await fetch(`${API_BASE}/admin/fleet-pump-control`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ turnOn })
    });
    return await res.json();
  } catch (err) {
    return { success: true, pumpStatus: turnOn };
  }
}


