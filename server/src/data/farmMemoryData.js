// ==========================================
// 🧠 FARM MEMORY AI — MULTI-SEASON LOGS
// ==========================================

export const FARM_MEMORY_LOGS = {
  "plot-a1": {
    farmId: "plot-a1",
    farmName: "Green Valley Farms - Plot A1",
    farmerName: "Rajesh Kumar",
    location: "Indore, Madhya Pradesh",
    soilBaseline: {
      type: "Black / Clay-Loam (Medium)",
      ph: 6.8,
      organicCarbon: "0.68%",
      waterHoldingCapacity: "High"
    },
    seasonalHistory: [
      {
        year: 2024,
        season: "Rabi",
        crop: "Wheat (Lokwan)",
        seedSource: "National Seeds Corporation (NSC-Certified)",
        yieldTonsPerAcre: 4.1,
        totalCost: 32000,
        grossRevenue: 75000,
        netProfit: 43000,
        irrigationCycles: 4,
        keyEvent: "Optimal harvest with standard urea/DAP schedule."
      },
      {
        year: 2025,
        season: "Rabi",
        crop: "Wheat (Lokwan)",
        seedSource: "Local Agro Dealer",
        yieldTonsPerAcre: 3.4,
        totalCost: 36500,
        grossRevenue: 62000,
        netProfit: 25500,
        irrigationCycles: 6,
        diseaseEncountered: "Yellow Rust & Fungal Root Rot",
        excessIrrigationFlag: true,
        keyEvent: "Excess flood irrigation during humid spell in February triggered yellow rust & root rot. Yield dropped by 17%."
      },
      {
        year: 2025,
        season: "Kharif",
        crop: "Soybean (JS 335)",
        seedSource: "State Seed Agency",
        yieldTonsPerAcre: 1.2,
        totalCost: 18000,
        grossRevenue: 48000,
        netProfit: 30000,
        irrigationCycles: 1,
        keyEvent: "Good rainfed crop. Added bio-fertilizer Rhizobium."
      },
      {
        year: 2026,
        season: "Rabi (Active)",
        crop: "Wheat (Lokwan)",
        stage: "Vegetative (Day 38)",
        soilMoisture: "42% (Deficit)",
        fertilizerApplied: "Basal DAP 50kg/acre + First Top Dressing Urea 35kg/acre",
        keyEvent: "Current crop in healthy vegetative growth. Farm Memory active."
      }
    ],
    memoryLearnings: [
      "⚠️ History Warning: In Rabi 2025, flood irrigation during humid February triggered Yellow Rust. System enforces micro-drip precision (~35 mins) instead of flooding.",
      "🌱 Nitrogen Uptake: Soil responds well to split urea application at day 21 (CRI stage) and day 45 (Tillering).",
      "💧 Water Retention: Heavy clay subsoil retains moisture 48h longer than average sandy soils."
    ],
    memoryLearningsHi: [
      "⚠️ ऐतिहासिक चेतावनी: रबी 2025 में अत्यधिक पटवन से पीला रतुआ (Yellow Rust) रोग लगा था। इसलिए इस वर्ष केवल 35 मिनट ड्रिप सिंचाई की सलाह है।",
      "🌱 नाइट्रोजन दक्षता: कल्ले फूटने के समय यूरिया की दूसरी खुराक देने पर पैदावार 15% बढ़ती है।",
      "💧 जल संधारण क्षमता: खेत की काली दोमट मिट्टी पानी को 48 घंटे अधिक समय तक रोक कर रखती है।"
    ]
  }
};

// ==========================================
// 🏷️ DIGITAL CROP HEALTH PASSPORT
// ==========================================

export const CROP_HEALTH_PASSPORTS = {
  "PASSPORT-WHEAT-2026": {
    batchId: "AGRI-IN-MP-2026-WHT-0042",
    crop: "Wheat (Lokwan / Sharbati Premium)",
    cropHi: "गेहूं (लोकवान / शरबती प्रीमियम)",
    farm: "Green Valley Farms - Plot A1",
    farmer: "Rajesh Kumar (Verified Farmer ID: AGRI-MP-9842)",
    location: "Indore Tehsil, Madhya Pradesh (22.7196° N, 75.8577° E)",
    sowingDate: "November 12, 2025",
    expectedHarvest: "March 24, 2026",
    currentStage: "Vegetative Phase (Day 38)",
    seedInfo: {
      variety: "Lokwan Certified Breeder Seed",
      certificationAgency: "MP State Seed Certification Agency",
      germinationRate: "96%",
      purityScore: "99.2%"
    },
    soilBaseline: {
      type: "Black Cotton Loam",
      nitrogenKgHa: 118,
      phosphorusKgHa: 58,
      potassiumKgHa: 42,
      ph: 6.6,
      organicCarbon: "0.68%"
    },
    agrochemicalLog: [
      { date: "2025-11-12", type: "Seed Treatment", input: "Trichoderma viride @ 5g/kg seed (Biological)" },
      { date: "2025-11-12", type: "Basal Fertilizer", input: "DAP (18-46-0) @ 50kg/acre" },
      { date: "2025-12-04", type: "Top Dressing", input: "Neem Coated Urea @ 35kg/acre" },
      { date: "2025-12-18", type: "Bio-Stimulant", input: "Seaweed extract foliar spray @ 2ml/L" }
    ],
    irrigationLog: [
      { date: "2025-11-12", method: "Pre-sowing Paleva", volumeLiters: 120000 },
      { date: "2025-12-03", method: "Crown Root (CRI) Micro-Drip", volumeLiters: 38000 }
    ],
    purityAndSafety: {
      pesticideResidueLevel: "Zero / Within Safe MRL Limits",
      exportGrade: "Grade A+ Premium Milling Wheat",
      carbonFootprintScore: "1.2 kg CO2e / kg (Low - Drip & Solar Powered)",
      verificationStatus: "Verified Blockchain & GPS Geo-tagged"
    },
    verificationQrPayload: {
      title: "AgriSmart Verified Crop Health Passport",
      batch: "AGRI-IN-MP-2026-WHT-0042",
      farm: "Green Valley Farms (Indore, MP)",
      qualityScore: "Grade A+ (Residue Free)",
      verifyUrl: "https://agrismart.ai/passport/AGRI-IN-MP-2026-WHT-0042"
    }
  }
};
