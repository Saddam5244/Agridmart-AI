import express from 'express';
import fs from 'fs';
import { calculateSmartIrrigation } from '../services/irrigationEngine.js';
import { recommendCropsAndPredictYield } from '../services/cropRecommender.js';
import { classifyCropDisease } from '../services/diseaseClassifier.js';
import { getAgronomistAnswer } from '../services/agronomistAI.js';
import { CROP_DISEASES } from '../data/cropDiseases.js';
import { CROPS_DATASET } from '../data/cropSuitability.js';
import { MANDI_PRICES } from '../data/mandiPrices.js';
import { GOVERNMENT_SCHEMES_DATA, YEARLY_POLICY_TIMELINE } from '../data/governmentSchemes.js';
import { FARM_MEMORY_LOGS, CROP_HEALTH_PASSPORTS } from '../data/farmMemoryData.js';
import { simulateWhatIfScenario, CROP_ECONOMIC_PROFILES } from '../services/whatIfSimulator.js';
import { predictPreSymptomDiseaseRisk } from '../services/preSymptomPredictor.js';
import { getLiveWeatherForecast, searchCityCoordinates, reverseGeocodeCoordinates } from '../services/weatherService.js';
import { getLiveMandiRates, getMandiSummary, updateMandiPriceById } from '../services/mandiLiveService.js';
import { getCurrentAgroSeason, resolveRegionalAgroProfile, compareCropsData } from '../services/agroLocationService.js';

const router = express.Router();

// Dynamic in-memory state
let currentMandiPrices = [...MANDI_PRICES];
let currentSchemesData = [...GOVERNMENT_SCHEMES_DATA];
let currentPolicyTimeline = [...YEARLY_POLICY_TIMELINE];

// Active broadcasts dispatched by Agriculture Officers / Admins
let activeBroadcasts = [
  {
    id: "bc-1",
    title: "Yellow Rust Spore Alert - Malwa & Nimar Belt",
    level: "warning", // 'warning' | 'critical' | 'info'
    message: "High humidity and morning mist favoring yellow rust in late-sown wheat. Inspect lower leaves and apply Propiconazole (1ml/L) if yellow stripes appear.",
    issuer: "District Agriculture Department, Indore",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " Today"
  }
];

// Disease scan history logs for regional surveillance
let diseaseScanLogs = [
  {
    id: "scan-101",
    crop: "Potato",
    diseaseName: "Late Blight (Phytophthora infestans)",
    severity: "High",
    confidence: 0.96,
    farmer: "Rajesh Kumar",
    location: "Indore (Plot A1)",
    time: "10 mins ago"
  },
  {
    id: "scan-102",
    crop: "Wheat",
    diseaseName: "Yellow / Stripe Rust",
    severity: "High",
    confidence: 0.94,
    farmer: "Harpreet Singh",
    location: "Dewas Block B",
    time: "45 mins ago"
  },
  {
    id: "scan-103",
    crop: "Tomato",
    diseaseName: "Early Blight",
    severity: "Moderate",
    confidence: 0.91,
    farmer: "Suresh Patil",
    location: "Dhar Sector 3",
    time: "2 hours ago"
  },
  {
    id: "scan-104",
    crop: "Cotton",
    diseaseName: "Bacterial Blight",
    severity: "Moderate",
    confidence: 0.89,
    farmer: "Anil Sharma",
    location: "Ujjain North",
    time: "3 hours ago"
  }
];

// Multi-farm directory monitored by Admin
let registeredFarms = [
  {
    id: "farm-1",
    name: "Green Valley Farms - Plot A1",
    farmer: "Rajesh Kumar",
    location: "Indore, Madhya Pradesh",
    crop: "Wheat (Lokwan)",
    stage: "Vegetative (Day 38)",
    areaAcres: 2.5,
    healthScore: 87,
    moisture: 42,
    diseaseRisk: "Low",
    pumpStatus: false
  },
  {
    id: "farm-2",
    name: "Surya Bio Farms - Plot B3",
    farmer: "Harpreet Singh",
    location: "Dewas, Madhya Pradesh",
    crop: "Wheat (Sharbati)",
    stage: "Tillering (Day 44)",
    areaAcres: 5.0,
    healthScore: 78,
    moisture: 36,
    diseaseRisk: "Moderate",
    pumpStatus: true
  },
  {
    id: "farm-3",
    name: "Patil Agro Orchards",
    farmer: "Suresh Patil",
    location: "Nashik, Maharashtra",
    crop: "Tomato (Hybrid)",
    stage: "Flowering (Day 52)",
    areaAcres: 3.2,
    healthScore: 92,
    moisture: 58,
    diseaseRisk: "Low",
    pumpStatus: false
  },
  {
    id: "farm-4",
    name: "Narmada Riverbed Fields",
    farmer: "Kailash Verma",
    location: "Hoshangabad, MP",
    crop: "Paddy / Rice (Basmati)",
    stage: "Grain Filling",
    areaAcres: 8.0,
    healthScore: 68,
    moisture: 28,
    diseaseRisk: "High",
    pumpStatus: false
  }
];

// Primary farm state for user portal
let farmState = {
  farmName: "Green Valley Farms - Plot A1",
  farmerName: "Rajesh Kumar",
  location: "Indore, Madhya Pradesh",
  currentCrop: "Wheat (Lokwan)",
  cropStage: "Vegetative (Day 38)",
  farmHealthScore: 87,
  telemetry: {
    soilMoisture: 42,
    nitrogen: 118,
    phosphorus: 58,
    potassium: 42,
    soilPh: 6.6,
    soilTemp: 22.4,
    ambientTemp: 29,
    humidity: 45,
    rainForecastMm: 0,
    solarRadiation: "High (7.2 kWh/m²)"
  },
  cropHealthStatus: "Healthy",
  diseaseRisk: "Low",
  irrigationPumpStatus: false,
  lastUpdated: new Date().toISOString()
};

// ==========================================
// 🌾 USER (FARMER) ROUTES
// ==========================================

// 0. GET /api - Live Backend API Explorer & Service Status Dashboard
router.get('/', (req, res) => {
  if (req.accepts('html')) {
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🌾 AgriSmart AI — Live Backend API Services</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', system-ui, sans-serif; background: #f8fafc; color: #0f172a; padding: 32px 16px; }
    .container { max-width: 860px; margin: 0 auto; }
    .card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 24px; padding: 32px; box-shadow: 0 10px 30px -5px rgba(0,0,0,0.06); margin-bottom: 24px; }
    .header { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #e2e8f0; }
    .brand { font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 800; color: #0f172a; }
    .brand span { color: #10b981; }
    .badge { background: #d1fae5; color: #065f46; font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; border: 1px solid #a7f3d0; }
    .btn { display: inline-flex; align-items: center; gap: 8px; background: #10b981; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 14px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 14px rgba(16,185,129,0.3); transition: all 0.2s; }
    .btn:hover { background: #059669; transform: translateY(-1px); }
    .status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px; }
    .status-box { background: #f1f5f9; border: 1px solid #e2e8f0; padding: 14px; border-radius: 16px; font-size: 12px; }
    .status-box strong { display: block; font-size: 13px; color: #0f172a; margin-bottom: 4px; }
    .status-box .dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #10b981; margin-right: 6px; }
    h2 { font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 16px; color: #1e293b; }
    .endpoints { display: flex; flex-direction: column; gap: 10px; }
    .endpoint-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; text-decoration: none; color: inherit; transition: all 0.2s; }
    .endpoint-row:hover { background: #ecfdf5; border-color: #a7f3d0; transform: translateX(4px); }
    .method-get { background: #dbeafe; color: #1e40af; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 8px; }
    .method-post { background: #e0e7ff; color: #3730a3; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 8px; }
    .path { font-family: monospace; font-size: 13px; font-weight: 600; color: #0f172a; margin-left: 8px; }
    .desc { font-size: 12px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div>
          <div class="brand">🌾 Agri<span>Smart</span> AI Backend API</div>
          <p style="font-size: 13px; color: #64748b; margin-top: 4px;">CodeBuild 1.0 — High-Performance Cloud & IoT Microservices</p>
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          <span class="badge">● Online (Port 5000)</span>
          <a href="http://localhost:5173" class="btn">🚀 Open Web App ↗</a>
        </div>
      </div>

      <div class="status-grid">
        <div class="status-box">
          <strong><span class="dot"></span>Google Gemini AI</strong>
          Connected (gemini-2.5-flash)
        </div>
        <div class="status-box">
          <strong><span class="dot"></span>Satellite Weather</strong>
          Live GPS & Open-Meteo Active
        </div>
        <div class="status-box">
          <strong><span class="dot"></span>Plant Pathology</strong>
          Live Camera Neural Scanner
        </div>
        <div class="status-box">
          <strong><span class="dot"></span>Smart Irrigation</strong>
          IoT Relay & Pump Controller
        </div>
      </div>

      <h2>📡 Live API Endpoints (Click to Test JSON)</h2>
      <div class="endpoints">
        <a href="/api/dashboard" class="endpoint-row">
          <div><span class="method-get">GET</span><span class="path">/api/dashboard</span></div>
          <span class="desc">Farm Telemetry, Crops & Weather</span>
        </a>
        <a href="/api/weather/live?lat=26.8467&lon=80.9462&city=Lucknow" class="endpoint-row">
          <div><span class="method-get">GET</span><span class="path">/api/weather/live?lat=26.85&lon=80.95</span></div>
          <span class="desc">Real-time Satellite Forecast (Lucknow)</span>
        </a>
        <a href="/api/weather/search?q=Kanpur" class="endpoint-row">
          <div><span class="method-get">GET</span><span class="path">/api/weather/search?q=Kanpur</span></div>
          <span class="desc">District Geocoding Search</span>
        </a>
        <a href="/api/weather/reverse-geocode?lat=26.8467&lon=80.9462" class="endpoint-row">
          <div><span class="method-get">GET</span><span class="path">/api/weather/reverse-geocode</span></div>
          <span class="desc">GPS Reverse Geocoding</span>
        </a>
        <a href="/api/disease-samples" class="endpoint-row">
          <div><span class="method-get">GET</span><span class="path">/api/disease-samples</span></div>
          <span class="desc">35+ Botanical Crop Disease Library</span>
        </a>
        <a href="/api/market-intelligence" class="endpoint-row">
          <div><span class="method-get">GET</span><span class="path">/api/market-intelligence</span></div>
          <span class="desc">APMC Mandi Commodity Rates</span>
        </a>
        <a href="/api/schemes" class="endpoint-row">
          <div><span class="method-get">GET</span><span class="path">/api/schemes</span></div>
          <span class="desc">PM-KISAN, Solar Grants & Subsidies</span>
        </a>
        <a href="/api/policies/timeline" class="endpoint-row">
          <div><span class="method-get">GET</span><span class="path">/api/policies/timeline</span></div>
          <span class="desc">1998-2026 Policy Reform Gazette</span>
        </a>
        <a href="/api/farm-memory/plot-a1" class="endpoint-row">
          <div><span class="method-get">GET</span><span class="path">/api/farm-memory/plot-a1</span></div>
          <span class="desc">Multi-Season Crop Health History</span>
        </a>
        <a href="/api/passport/PASSPORT-WHEAT-2026" class="endpoint-row">
          <div><span class="method-get">GET</span><span class="path">/api/passport/PASSPORT-WHEAT-2026</span></div>
          <span class="desc">QR Crop Health Batch Passport</span>
        </a>
        <a href="/health" class="endpoint-row">
          <div><span class="method-get">GET</span><span class="path">/health</span></div>
          <span class="desc">Server Health Status Check</span>
        </a>
      </div>
    </div>
  </div>
</body>
</html>`);
  }

  res.json({
    platform: "AgriSmart AI — Smart Agriculture Platform Backend",
    status: "online",
    version: "1.0.0",
    port: 5000,
    services: {
      geminiAi: "Google Gemini 2.5 Flash Active",
      weather: "Open-Meteo & GPS Geocoding Connected",
      pathology: "Live Camera Vision & Media Scan Active",
      iotRelay: "Smart Drip Pump Controller Active"
    },
    endpoints: [
      "/api/dashboard",
      "/api/disease-detection",
      "/api/disease-samples",
      "/api/weather/live",
      "/api/weather/search",
      "/api/weather/reverse-geocode",
      "/api/assistant-chat",
      "/api/voice-copilot/action",
      "/api/irrigation-advisory",
      "/api/crop-recommendation",
      "/api/market-intelligence",
      "/api/schemes",
      "/api/policies/timeline",
      "/api/simulator/what-if",
      "/api/farm-memory/:farmId",
      "/api/passport/:batchId",
      "/health"
    ],
    timestamp: new Date().toISOString()
  });
});

// 1. GET /api/dashboard - Aggregated Farmer Overview (Matches PDF Page 6)
router.get('/dashboard', (req, res) => {
  const irrigationAdvice = calculateSmartIrrigation({
    soilMoisture: farmState.telemetry.soilMoisture,
    cropType: "Wheat",
    cropStage: "vegetative",
    soilType: "Loamy",
    ambientTemp: farmState.telemetry.ambientTemp,
    humidity: farmState.telemetry.humidity,
    rainForecastMm: farmState.telemetry.rainForecastMm
  });

  const featuredMarket = currentMandiPrices.find(m => m.id === "wheat") || currentMandiPrices[0];

  res.json({
    success: true,
    farmName: farmState.farmName,
    farmerName: farmState.farmerName,
    location: farmState.location,
    currentCrop: farmState.currentCrop,
    cropStage: farmState.cropStage,
    farmHealthScore: farmState.farmHealthScore,
    weather: {
      temperature: farmState.telemetry.ambientTemp,
      condition: "Clear",
      humidity: farmState.telemetry.humidity,
      rainfallForecast: `${farmState.telemetry.rainForecastMm} mm`,
      uvIndex: "Moderate",
      forecast5Day: [
        { day: "Today", temp: "29°C", rain: "0 mm", icon: "sun" },
        { day: "Tomorrow", temp: "30°C", rain: "0 mm", icon: "sun" },
        { day: "Thu", temp: "28°C", rain: "2 mm", icon: "cloud-sun" },
        { day: "Fri", temp: "27°C", rain: "5 mm", icon: "cloud-rain" },
        { day: "Sat", temp: "29°C", rain: "0 mm", icon: "sun" }
      ]
    },
    soilMoisture: farmState.telemetry.soilMoisture,
    cropHealth: farmState.cropHealthStatus,
    diseaseRisk: farmState.diseaseRisk,
    marketPrice: {
      commodity: featuredMarket.commodity,
      price: featuredMarket.currentPrice,
      unit: featuredMarket.unit,
      trend: featuredMarket.trend,
      change24h: featuredMarket.change24h,
      recommendation: featuredMarket.sellRecommendation
    },
    nextAction: irrigationAdvice.irrigationRequired ? "Irrigate tomorrow" : "Routine field monitoring",
    aiRecommendation: irrigationAdvice.nextBestAction,
    irrigationAdvice,
    telemetry: farmState.telemetry,
    pumpStatus: farmState.irrigationPumpStatus,
    broadcasts: activeBroadcasts,
    timestamp: new Date().toISOString()
  });
});

// 2. POST /api/disease-detection - AI Plant Pathology Classifier
router.post('/disease-detection', async (req, res) => {
  try {
    const { sampleId, cropHint, imageBase64, filename: bodyFilename, geminiApiKey } = req.body || {};
    let filename = req.file ? req.file.originalname : (bodyFilename || null);
    let imageBase64Data = imageBase64 || null;

    if (!imageBase64Data && req.file && req.file.path) {
      try {
        const fileBuffer = fs.readFileSync(req.file.path);
        imageBase64Data = fileBuffer.toString('base64');
      } catch (err) {
        console.warn("Could not read uploaded file to base64:", err.message);
      }
    }

    const customKey = geminiApiKey || req.headers['x-gemini-key'] || null;
    const result = await classifyCropDisease({ 
      filename, 
      cropHint, 
      sampleId, 
      imageBase64: imageBase64Data,
      customApiKey: customKey 
    });
    
    // Log this scan for the Admin Surveillance Radar
    if (result && result.diseaseName !== "Healthy Crop - No Pathogen Detected") {
      diseaseScanLogs.unshift({
        id: `scan-${Date.now().toString().slice(-4)}`,
        crop: result.crop,
        diseaseName: result.diseaseName,
        severity: result.severity,
        confidence: result.confidence,
        farmer: farmState.farmerName,
        location: farmState.location,
        time: "Just now"
      });
      if (diseaseScanLogs.length > 20) diseaseScanLogs.pop();
    }

    res.json({
      success: true,
      result,
      analyzedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/disease-samples
router.get('/disease-samples', (req, res) => {
  res.json({
    success: true,
    samples: CROP_DISEASES
  });
});

// 3. POST /api/irrigation-advisory
router.post('/irrigation-advisory', (req, res) => {
  try {
    const params = req.body || {};
    const result = calculateSmartIrrigation(params);
    res.json({
      success: true,
      advice: result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. POST /api/crop-recommendation
router.post('/crop-recommendation', (req, res) => {
  try {
    const input = req.body || {};
    const result = recommendCropsAndPredictYield(input);
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4b. GET /api/location-agro-profile - Auto-resolves season, soil & climate profile for location
router.get('/location-agro-profile', async (req, res) => {
  try {
    const { lat, lon, city = "", state = "" } = req.query;
    const numLat = lat ? Number(lat) : 22.7196;
    const numLon = lon ? Number(lon) : 75.8577;

    const season = getCurrentAgroSeason(new Date());
    const agroProfile = resolveRegionalAgroProfile({ state, city, lat: numLat, lon: numLon });
    
    // Also fetch live weather to enrich location profile
    let liveWeather = null;
    try {
      liveWeather = await getLiveWeatherForecast({ lat: numLat, lon: numLon, cityName: city || agroProfile.regionName });
    } catch (e) {
      console.warn("Weather fetch inside location profile warning:", e.message);
    }

    res.json({
      success: true,
      location: {
        city: city || agroProfile.regionName,
        state: state || "India",
        latitude: numLat,
        longitude: numLon
      },
      season,
      agroProfile,
      liveWeather: liveWeather?.current || {
        temperature: 28,
        humidity: 45,
        condition: "Clear Sky",
        rainfallForecast24h: "0 mm"
      },
      recommendedSeasonCrops: agroProfile.dominantCrops
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4c. POST /api/crop-comparison - Accurate side-by-side comparison matrix for crops
router.post('/crop-comparison', (req, res) => {
  try {
    const { crops } = req.body || {};
    const result = compareCropsData(crops);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. GET /api/mandi/live & GET /api/market-intelligence - Live Real-Time Multi-Mandi Feed
router.get('/mandi/live', (req, res) => {
  const result = getLiveMandiRates(req.query);
  res.json(result);
});

router.get('/mandi/summary', (req, res) => {
  const summary = getMandiSummary();
  res.json(summary);
});

router.get('/mandi/:id', (req, res) => {
  const { id } = req.params;
  const result = getLiveMandiRates({ search: id });
  const match = result.markets.find(m => m.id.toLowerCase() === id.toLowerCase()) || result.markets[0];
  if (match) {
    return res.json({ success: true, item: match });
  }
  res.status(404).json({ success: false, error: "Mandi commodity not found" });
});

router.get('/market-intelligence', (req, res) => {
  const { commodityId } = req.query;
  const result = getLiveMandiRates(req.query);
  if (commodityId) {
    const cId = commodityId.toLowerCase().trim();
    const found = result.markets.find(m => 
      m.id.toLowerCase() === cId ||
      m.id.toLowerCase().startsWith(cId) ||
      m.commodity.toLowerCase().includes(cId)
    );
    if (found) {
      return res.json({ success: true, item: found, markets: result.markets });
    }
  }
  res.json({
    success: true,
    totalMarkets: result.totalMarkets,
    matchingCount: result.matchingCount,
    markets: result.markets,
    timestamp: new Date().toISOString()
  });
});

// 6. POST /api/assistant-chat - Multilingual Agronomist & Google Gemini AI
router.post('/assistant-chat', async (req, res) => {
  try {
    const { query, language = "en", apiKey = "" } = req.body;
    if (!query) {
      return res.status(400).json({ success: false, error: "Query is required" });
    }
    const response = await getAgronomistAnswer({ query, language, apiKey });
    res.json({
      success: true,
      ...response
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// ⏱️ MANUAL PUMP TIMING & SCHEDULING STATE
// ==========================================

let activePumpTimer = {
  isRunning: false,
  mode: "standby", // 'manual_timer' | 'smart_auto' | 'scheduled'
  durationMinutes: 30,
  remainingSeconds: 0,
  startedAt: null,
  endsAt: null,
  flowRateLpm: 120, // 120 Liters/min (2.5 HP Drip Pump)
  waterDeliveredLiters: 0
};

let manualPumpSchedules = [
  {
    id: "sch-1",
    time: "06:00 AM",
    durationMinutes: 35,
    days: "Daily",
    waterVolumeLiters: 4200,
    enabled: true,
    note: "Morning Root Zone Drip Cycle"
  },
  {
    id: "sch-2",
    time: "05:30 PM",
    durationMinutes: 20,
    days: "Alternate Days",
    waterVolumeLiters: 2400,
    enabled: false,
    note: "Evening Foliar & Soil Cooling"
  }
];

let pumpHistoryLogs = [
  {
    id: "log-1",
    date: "2026-08-31",
    time: "06:00 AM",
    durationMinutes: 35,
    waterDeliveredLiters: 4200,
    trigger: "Scheduled Morning Slot",
    status: "Completed"
  },
  {
    id: "log-2",
    date: "2026-08-30",
    time: "06:15 AM",
    durationMinutes: 30,
    waterDeliveredLiters: 3600,
    trigger: "Manual Timer (30 min)",
    status: "Completed"
  },
  {
    id: "log-3",
    date: "2026-08-29",
    time: "06:30 AM",
    durationMinutes: 40,
    waterDeliveredLiters: 4800,
    trigger: "AI Smart Irrigation",
    status: "Completed"
  }
];

// 7. POST /api/pump-control (1-Tap Toggle)
router.post('/pump-control', (req, res) => {
  const { turnOn } = req.body;
  farmState.irrigationPumpStatus = Boolean(turnOn);

  if (farmState.irrigationPumpStatus) {
    activePumpTimer = {
      isRunning: true,
      mode: "manual_timer",
      durationMinutes: 30,
      remainingSeconds: 30 * 60,
      startedAt: new Date().toISOString(),
      endsAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      flowRateLpm: 120,
      waterDeliveredLiters: 30 * 120
    };
  } else {
    activePumpTimer.isRunning = false;
    activePumpTimer.remainingSeconds = 0;
  }

  res.json({
    success: true,
    pumpStatus: farmState.irrigationPumpStatus,
    activeTimer: activePumpTimer,
    message: farmState.irrigationPumpStatus 
      ? "Smart IoT Pump ACTIVATED (30-min standard manual cycle started)." 
      : "Smart IoT Pump STOPPED: Standby mode active."
  });
});

// GET /api/pump/timer-status - Fetch current timer state, schedules and logs
router.get('/pump/timer-status', (req, res) => {
  res.json({
    success: true,
    pumpStatus: farmState.irrigationPumpStatus,
    activeTimer: activePumpTimer,
    schedules: manualPumpSchedules,
    history: pumpHistoryLogs
  });
});

// POST /api/pump/manual-timer - Start or Stop manual duration timer
router.post('/pump/manual-timer', (req, res) => {
  const { durationMinutes = 30, action = "START" } = req.body;
  const mins = Math.max(1, Math.min(360, Number(durationMinutes)));

  if (action === "START") {
    farmState.irrigationPumpStatus = true;
    const now = new Date();
    const ends = new Date(now.getTime() + mins * 60 * 1000);

    activePumpTimer = {
      isRunning: true,
      mode: "manual_timer",
      durationMinutes: mins,
      remainingSeconds: mins * 60,
      startedAt: now.toISOString(),
      endsAt: ends.toISOString(),
      flowRateLpm: 120,
      waterDeliveredLiters: mins * 120
    };

    // Log to history
    pumpHistoryLogs.unshift({
      id: `log-${Date.now()}`,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationMinutes: mins,
      waterDeliveredLiters: mins * 120,
      trigger: `Manual Timer (${mins} min)`,
      status: "In Progress"
    });

    res.json({
      success: true,
      pumpStatus: true,
      activeTimer: activePumpTimer,
      message: `Manual Pump Timer ACTIVATED for ${mins} minutes (~${mins * 120} Liters).`
    });
  } else {
    farmState.irrigationPumpStatus = false;
    activePumpTimer.isRunning = false;
    activePumpTimer.remainingSeconds = 0;

    if (pumpHistoryLogs.length > 0 && pumpHistoryLogs[0].status === "In Progress") {
      pumpHistoryLogs[0].status = "Stopped Manually";
    }

    res.json({
      success: true,
      pumpStatus: false,
      activeTimer: activePumpTimer,
      message: "Pump manually stopped. Irrigation paused."
    });
  }
});

// POST /api/pump/add-schedule - Add recurring timing schedule
router.post('/pump/add-schedule', (req, res) => {
  const { time = "06:00 AM", durationMinutes = 30, days = "Daily", note = "Custom Timing Schedule" } = req.body;
  const mins = Math.max(1, Math.min(360, Number(durationMinutes)));

  const newSchedule = {
    id: `sch-${Date.now()}`,
    time,
    durationMinutes: mins,
    days,
    waterVolumeLiters: mins * 120,
    enabled: true,
    note
  };

  manualPumpSchedules.unshift(newSchedule);

  res.json({
    success: true,
    schedule: newSchedule,
    schedules: manualPumpSchedules,
    message: `Scheduled ${time} pump run for ${mins} minutes saved.`
  });
});

// DELETE /api/pump/delete-schedule/:id - Remove schedule
router.delete('/pump/delete-schedule/:id', (req, res) => {
  const { id } = req.params;
  manualPumpSchedules = manualPumpSchedules.filter(s => s.id !== id);
  res.json({
    success: true,
    schedules: manualPumpSchedules,
    message: "Schedule deleted successfully."
  });
});

// POST /api/pump/toggle-schedule/:id - Toggle schedule on/off
router.post('/pump/toggle-schedule/:id', (req, res) => {
  const { id } = req.params;
  const schedule = manualPumpSchedules.find(s => s.id === id);
  if (schedule) {
    schedule.enabled = !schedule.enabled;
  }
  res.json({
    success: true,
    schedule,
    schedules: manualPumpSchedules,
    message: schedule?.enabled ? "Schedule enabled" : "Schedule disabled"
  });
});

// 8. POST /api/simulate-telemetry
router.post('/simulate-telemetry', (req, res) => {
  const updates = req.body || {};
  farmState.telemetry = { ...farmState.telemetry, ...updates };
  
  let score = 90;
  if (farmState.telemetry.soilMoisture < 35 || farmState.telemetry.soilMoisture > 80) score -= 15;
  if (farmState.telemetry.nitrogen < 70 || farmState.telemetry.nitrogen > 160) score -= 10;
  if (farmState.telemetry.soilPh < 5.8 || farmState.telemetry.soilPh > 7.8) score -= 8;
  if (farmState.diseaseRisk === "High") score -= 20;
  else if (farmState.diseaseRisk === "Moderate") score -= 10;
  
  farmState.farmHealthScore = Math.max(25, Math.min(99, score));
  farmState.lastUpdated = new Date().toISOString();

  res.json({
    success: true,
    farmState
  });
});

// ==========================================
// 🛡️ ADMIN / AGRICULTURE OFFICER ROUTES
// ==========================================

// GET /api/admin/overview - Command center metrics
router.get('/admin/overview', (req, res) => {
  const totalFarms = registeredFarms.length;
  const avgHealth = Math.round(registeredFarms.reduce((acc, f) => acc + f.healthScore, 0) / totalFarms);
  const activePumps = registeredFarms.filter(f => f.pumpStatus).length + (farmState.irrigationPumpStatus ? 1 : 0);
  const highRiskFarms = registeredFarms.filter(f => f.diseaseRisk === "High").length;

  res.json({
    success: true,
    stats: {
      totalMonitoredFarms: 1248,
      registeredPlots: totalFarms,
      activeIoTNodes: 3710,
      clusterWaterSavedLiters: 4280000,
      averageClusterHealth: avgHealth,
      activePumpsRunning: activePumps,
      activeDiseaseAlerts: highRiskFarms + 1,
      regionalDistricts: ["Indore", "Dewas", "Ujjain", "Dhar", "Hoshangabad"]
    },
    activeBroadcasts,
    recentDiseaseScans: diseaseScanLogs.slice(0, 6)
  });
});

// GET /api/admin/farms - Get all registered farm plots
router.get('/admin/farms', (req, res) => {
  res.json({
    success: true,
    farms: registeredFarms
  });
});

// POST /api/admin/farms - Register a new farm plot
router.post('/admin/farms', (req, res) => {
  const { name, farmer, location, crop, stage, areaAcres } = req.body;
  if (!name || !farmer) {
    return res.status(400).json({ success: false, error: "Name and Farmer name required" });
  }

  const newFarm = {
    id: `farm-${Date.now()}`,
    name,
    farmer,
    location: location || "Indore Region",
    crop: crop || "Wheat",
    stage: stage || "Vegetative",
    areaAcres: Number(areaAcres) || 2.0,
    healthScore: 85,
    moisture: 45,
    diseaseRisk: "Low",
    pumpStatus: false
  };

  registeredFarms.unshift(newFarm);
  res.json({ success: true, farm: newFarm });
});

// POST /api/admin/broadcast-advisory - Dispatch emergency advisory to all farmers
router.post('/admin/broadcast-advisory', (req, res) => {
  const { title, message, level = "warning", issuer } = req.body;
  if (!title || !message) {
    return res.status(400).json({ success: false, error: "Title and message required" });
  }

  const newBroadcast = {
    id: `bc-${Date.now()}`,
    title,
    message,
    level,
    issuer: issuer || "AgriSmart Command Center",
    timestamp: "Just now"
  };

  activeBroadcasts.unshift(newBroadcast);
  res.json({
    success: true,
    broadcast: newBroadcast,
    message: "Advisory broadcasted to all farmers successfully."
  });
});

// DELETE /api/admin/broadcast-advisory/:id
router.delete('/admin/broadcast-advisory/:id', (req, res) => {
  const { id } = req.params;
  activeBroadcasts = activeBroadcasts.filter(b => b.id !== id);
  res.json({ success: true, message: "Broadcast advisory removed." });
});

// GET /api/admin/disease-reports
router.get('/admin/disease-reports', (req, res) => {
  res.json({
    success: true,
    reports: diseaseScanLogs
  });
});

// ==========================================
// 📊 REAL-TIME MANDI LIVE RATES & COMMODITY HUB
// ==========================================

// GET /api/mandi/live & GET /api/market-intelligence
router.get('/mandi/live', (req, res) => {
  const { search, state, district, category, sortBy, limit } = req.query;
  const result = getLiveMandiRates({
    search,
    state,
    district,
    category,
    sortBy,
    limit: limit ? Number(limit) : 50
  });
  res.json(result);
});

router.get('/market-intelligence', (req, res) => {
  const { search, state, district, category, sortBy, limit } = req.query;
  const result = getLiveMandiRates({
    search,
    state,
    district,
    category,
    sortBy,
    limit: limit ? Number(limit) : 50
  });
  res.json(result);
});

// GET /api/mandi/summary
router.get('/mandi/summary', (req, res) => {
  const result = getMandiSummary();
  res.json(result);
});

// POST /api/admin/update-mandi - Modify Mandi commodity rates in real time
router.post('/admin/update-mandi', (req, res) => {
  const { commodityId, newPrice, newRecommendation, newNote } = req.body;
  const updated = updateMandiPriceById(commodityId, {
    currentPrice: newPrice,
    sellRecommendation: newRecommendation,
    forecastNote: newNote
  });

  if (!updated) {
    return res.status(404).json({ success: false, error: "Commodity not found" });
  }

  res.json({
    success: true,
    market: updated,
    message: `Updated market rate for ${updated.commodity}`
  });
});

// POST /api/admin/fleet-pump-control - Bulk toggle IoT irrigation pumps
router.post('/admin/fleet-pump-control', (req, res) => {
  const { turnOn } = req.body;
  registeredFarms.forEach(f => f.pumpStatus = Boolean(turnOn));
  farmState.irrigationPumpStatus = Boolean(turnOn);
  res.json({
    success: true,
    pumpStatus: Boolean(turnOn),
    message: turnOn ? "All Cluster Pumps Activated" : "All Cluster Pumps Stopped"
  });
});

// ==========================================
// 🏛️ GOVERNMENT SCHEMES & POLICIES ROUTES
// ==========================================

// GET /api/schemes - Fetch government schemes with optional category & search filter
router.get('/schemes', (req, res) => {
  const { category, q } = req.query;
  let result = [...currentSchemesData];

  if (category && category !== 'all') {
    result = result.filter(s => s.category === category);
  }

  if (q) {
    const query = q.toLowerCase();
    result = result.filter(s => 
      s.name.toLowerCase().includes(query) ||
      (s.nameHi && s.nameHi.includes(query)) ||
      (s.nameBho && s.nameBho.includes(query)) ||
      s.shortDesc.toLowerCase().includes(query) ||
      s.benefitAmount.toLowerCase().includes(query)
    );
  }

  res.json({
    success: true,
    total: result.length,
    schemes: result
  });
});

// GET /api/policies/timeline - Fetch chronological yearly policy & land reforms timeline
router.get('/policies/timeline', (req, res) => {
  res.json({
    success: true,
    timeline: currentPolicyTimeline
  });
});

// POST /api/admin/schemes - Agriculture Officer publishes a new government notification / bill update
router.post('/admin/schemes', (req, res) => {
  const { name, nameHi, category, benefitAmount, benefitAmountHi, shortDesc, shortDescHi, officialPortalUrl, documentsRequired, eligibility, isPolicy, year } = req.body;
  
  if (!name || !benefitAmount) {
    return res.status(400).json({ success: false, error: "Scheme name and benefit amount required" });
  }

  if (isPolicy) {
    const newPolicy = {
      year: Number(year) || new Date().getFullYear(),
      policyName: name,
      policyNameHi: nameHi || name,
      policyNameBho: nameHi || name,
      category: category || "Government Gazette & Policy Reform",
      authority: "Ministry of Agriculture / State Govt Gazette",
      summary: shortDesc,
      summaryHi: shortDescHi || shortDesc,
      summaryBho: shortDescHi || shortDesc,
      officialGazetteUrl: officialPortalUrl || "https://agricoop.nic.in"
    };
    currentPolicyTimeline.unshift(newPolicy);
    return res.json({ success: true, policy: newPolicy, message: "Policy published to yearly timeline." });
  }

  const newScheme = {
    id: `scheme-${Date.now()}`,
    name,
    nameHi: nameHi || name,
    nameBho: nameHi || name,
    category: category || "income_support",
    categoryLabel: "Special Govt Incentive",
    categoryLabelHi: "विशेष सरकारी प्रोत्साहन",
    launchYear: new Date().getFullYear(),
    ministry: "Ministry of Agriculture & Farmers Welfare",
    ministryHi: "कृषि एवं किसान कल्याण मंत्रालय",
    benefitAmount,
    benefitAmountHi: benefitAmountHi || benefitAmount,
    benefitAmountBho: benefitAmountHi || benefitAmount,
    shortDesc,
    shortDescHi: shortDescHi || shortDesc,
    shortDescBho: shortDescHi || shortDesc,
    eligibility: eligibility || ["All landholding farmers."],
    eligibilityHi: eligibility || ["सभी पात्र किसान परिवार।"],
    documentsRequired: documentsRequired || ["Aadhaar Card", "Land Record (Khasra/Khatauni)", "Bank Account"],
    documentsRequiredHi: documentsRequired || ["आधार कार्ड", "भू-अभिलेख खसरा खतौनी", "बैंक पासबुक"],
    officialPortalUrl: officialPortalUrl || "https://agricoop.nic.in",
    helplineNumber: "1800-180-1551",
    status: "Newly Published Gazette"
  };

  currentSchemesData.unshift(newScheme);
  res.json({
    success: true,
    scheme: newScheme,
    message: "New Government Scheme / Subsidy published successfully."
  });
});

// ==========================================
// 🔮 WHAT-IF SIMULATOR & DIGITAL TWIN APIS
// ==========================================

// POST /api/simulator/what-if - Simulate farm decisions before execution
router.post('/simulator/what-if', (req, res) => {
  const {
    baseCrop = "wheat",
    targetCrop = "mustard",
    waterAdjustmentPercent = 0,
    fertilizerTimingShiftDays = 0,
    nitrogenAdjustmentPercent = 0,
    farmAreaAcres = 1.0,
    soilConditions = {},
    weatherConditions = {},
    customCrops = []
  } = req.body;

  const result = simulateWhatIfScenario({
    baseCrop,
    targetCrop,
    waterAdjustmentPercent: Number(waterAdjustmentPercent) || 0,
    fertilizerTimingShiftDays: Number(fertilizerTimingShiftDays) || 0,
    nitrogenAdjustmentPercent: Number(nitrogenAdjustmentPercent) || 0,
    farmAreaAcres: Number(farmAreaAcres) || 1.0,
    soilConditions,
    weatherConditions,
    customCrops
  });

  res.json(result);
});

// GET /api/simulator/crop-library - Available crops and default benchmarks
router.get('/simulator/crop-library', (req, res) => {
  res.json({
    success: true,
    crops: Object.values(CROP_ECONOMIC_PROFILES)
  });
});

// ==========================================
// 🧠 FARM MEMORY AI APIS
// ==========================================

// GET /api/farm-memory/:farmId - Multi-season memory & history-aware learning
router.get('/farm-memory/:farmId', (req, res) => {
  const { farmId } = req.params;
  const memory = FARM_MEMORY_LOGS[farmId] || FARM_MEMORY_LOGS["plot-a1"];
  res.json({
    success: true,
    memory
  });
});

// ==========================================
// 🏷️ DIGITAL CROP HEALTH PASSPORT APIS
// ==========================================

// GET /api/passport/:batchId - Verified batch passport & QR payload
router.get('/passport/:batchId', (req, res) => {
  const { batchId } = req.params;
  const passport = CROP_HEALTH_PASSPORTS[batchId] || CROP_HEALTH_PASSPORTS["PASSPORT-WHEAT-2026"];
  res.json({
    success: true,
    passport
  });
});

// ==========================================
// 🛡️ PRE-SYMPTOM DISEASE PREDICTION APIS
// ==========================================

// GET /api/disease-prediction/pre-symptom - Early environmental warning before visual lesions
router.get('/disease-prediction/pre-symptom', (req, res) => {
  const { crop = "wheat", humidity = 76, temperature = 24, recentRainfall = 8, leafWetnessHours = 7 } = req.query;

  const prediction = predictPreSymptomDiseaseRisk({
    crop,
    humidity: Number(humidity) || 76,
    temperature: Number(temperature) || 24,
    recentRainfallMm: Number(recentRainfall) || 8,
    leafWetnessHours: Number(leafWetnessHours) || 7,
    soilMoisture: farmState.soilMoisture,
    cropStage: farmState.cropStage
  });

  res.json(prediction);
});

// ==========================================
// 🎙️⚡ MULTILINGUAL AI FARM COPILOT (VOICE ➔ ACTION)
// ==========================================

// POST /api/voice-copilot/action - Code-Mixed Voice understanding with Google Gemini & direct IoT Action execution
router.post('/voice-copilot/action', async (req, res) => {
  try {
    const { prompt, query, language = "hi", apiKey = "" } = req.body;
    const text = prompt || query;
    if (!text) {
      return res.status(400).json({ success: false, error: "Prompt or query is required" });
    }

    const answer = await getAgronomistAnswer({ query: text, language, apiKey });

    // If it's an IoT pump schedule command, trigger hardware state
    const isPump = answer.actionExecuted || answer.actionType === "IOT_PUMP_SCHEDULED" || answer.actionType === "pump_schedule";
    if (isPump) {
      farmState.irrigationPumpStatus = true;
      registeredFarms.forEach(f => f.pumpStatus = true);
    }

    res.json({
      success: true,
      actionExecuted: isPump,
      actionType: isPump ? "IOT_PUMP_SCHEDULED" : (answer.actionType || "ADVISORY"),
      pumpStatus: farmState.irrigationPumpStatus,
      commandUnderstood: text,
      detectedLanguage: answer.detectedLanguage || language,
      speechText: answer.speechText || answer.answer,
      answer: answer.answer,
      options: answer.options || [],
      actionRecommendation: answer.action,
      executionStep: answer.executionStep || "Voice ➔ Neural Reasoning ➔ Advisory Delivered",
      poweredBy: answer.poweredBy || "AgriSmart AI Engine"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/assistant-chat (Direct Chat Alias)
router.post('/assistant-chat', async (req, res) => {
  try {
    const { query, prompt, language = "hi", apiKey = "" } = req.body;
    const text = query || prompt;
    if (!text) {
      return res.status(400).json({ success: false, error: "Query or prompt is required" });
    }

    const answer = await getAgronomistAnswer({ query: text, language, apiKey });
    res.json({
      success: true,
      answer: answer.answer,
      speechText: answer.speechText,
      options: answer.options || [],
      detectedLanguage: answer.detectedLanguage || language,
      poweredBy: answer.poweredBy || "AgriSmart AI Engine"
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// 🌦️ REAL-TIME LIVE WEATHER & FORECAST APIS
// ==========================================

// GET /api/weather/live - Fetch real-time live forecast, 7-day outlook & agro-advisory
router.get('/weather/live', async (req, res) => {
  try {
    const { lat = 22.7196, lon = 75.8577, city = "Indore, Madhya Pradesh" } = req.query;
    const weatherData = await getLiveWeatherForecast({
      lat: Number(lat),
      lon: Number(lon),
      cityName: city
    });
    res.json(weatherData);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/weather/search - Search city/district coordinates across India & globally
router.get('/weather/search', async (req, res) => {
  try {
    const { q = "" } = req.query;
    if (!q || q.trim().length < 2) {
      return res.json({ success: true, results: [] });
    }
    const results = await searchCityCoordinates(q.trim());
    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/weather/reverse-geocode - Resolve exact GPS coordinates into city/district name
router.get('/weather/reverse-geocode', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ success: false, error: "lat and lon are required" });
    }
    const geo = await reverseGeocodeCoordinates({ lat: Number(lat), lon: Number(lon) });
    res.json({ success: true, ...geo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;


