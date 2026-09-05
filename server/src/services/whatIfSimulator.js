// =========================================================================
// 🔮 ADVANCED AI "WHAT-IF" FARM SIMULATOR & DIGITAL TWIN ENGINE
// Powered by ICAR Agro-Climatic Benchmarks, Soil Physics & Live Meteorology
// =========================================================================

export const CROP_ECONOMIC_PROFILES = {
  wheat: {
    id: "wheat",
    name: "Wheat (Lokwan / Sharbati)",
    nameHi: "गेहूं (लोकवान / शरबती)",
    category: "Cereal / Rabi",
    baseYieldTons: 4.2, // ~18.5 Quintals/Acre
    basePricePerTon: 24800, // ₹2,480/q
    waterRequirementLevel: "Medium (4-5 irrigations)",
    waterConsumptionLiters: 180000, // 1.8 Lakh Liters / Acre
    costBreakdown: {
      seedCost: 3500,
      fertilizerCost: 9500,
      waterElectricityCost: 4000,
      labourCost: 12000,
      machineryCost: 6000,
      protectionCost: 2000
    },
    totalBaseCost: 37000,
    baseDiseaseRisk: "Medium (Yellow Rust risk if high humidity)",
    baseDiseaseScore: 35,
    optimalConditions: {
      minPh: 6.0, maxPh: 7.8, optPh: 6.8,
      minTemp: 12, maxTemp: 28, optTemp: 20,
      suitableSoils: ["alluvial", "loamy", "clay_loam", "black"]
    }
  },

  mustard: {
    id: "mustard",
    name: "Mustard / Rapeseed (Pusa Bold)",
    nameHi: "सरसों (पूसा बोल्ड / पीली सरसों)",
    category: "Oilseed / Rabi",
    baseYieldTons: 2.8, // ~12.5 Quintals/Acre
    basePricePerTon: 54500, // ₹5,450/q
    waterRequirementLevel: "Low (1-2 irrigations)",
    waterConsumptionLiters: 95000,
    costBreakdown: {
      seedCost: 2000,
      fertilizerCost: 7000,
      waterElectricityCost: 2500,
      labourCost: 10500,
      machineryCost: 5500,
      protectionCost: 2500
    },
    totalBaseCost: 30000,
    baseDiseaseRisk: "Low (Aphid / White Rust in foggy late season)",
    baseDiseaseScore: 22,
    optimalConditions: {
      minPh: 6.0, maxPh: 7.5, optPh: 6.5,
      minTemp: 10, maxTemp: 26, optTemp: 18,
      suitableSoils: ["loamy", "sandy_loam", "alluvial", "black"]
    }
  },

  potato: {
    id: "potato",
    name: "Potato (Kufri Pukhraj / Jyoti)",
    nameHi: "आलू (कुफरी पुखराज / ज्योति)",
    category: "Tuber / Rabi",
    baseYieldTons: 9.5, // ~95 Quintals/Acre
    basePricePerTon: 13500, // ₹1,350/q
    waterRequirementLevel: "High (6-8 shallow irrigations)",
    waterConsumptionLiters: 260000,
    costBreakdown: {
      seedCost: 18000,
      fertilizerCost: 13000,
      waterElectricityCost: 6000,
      labourCost: 18000,
      machineryCost: 8000,
      protectionCost: 5000
    },
    totalBaseCost: 68000,
    baseDiseaseRisk: "High (Late Blight vulnerability under overcast mist)",
    baseDiseaseScore: 68,
    optimalConditions: {
      minPh: 5.2, maxPh: 6.8, optPh: 6.0,
      minTemp: 15, maxTemp: 24, optTemp: 18,
      suitableSoils: ["sandy_loam", "loamy", "alluvial"]
    }
  },

  chickpea: {
    id: "chickpea",
    name: "Chickpea / Chana (Desi / Kabuli)",
    nameHi: "चना (देसी / काबुली चना)",
    category: "Pulse / Rabi",
    baseYieldTons: 2.2, // ~9.8 Quintals/Acre
    basePricePerTon: 58000, // ₹5,800/q
    waterRequirementLevel: "Very Low (1 critical irrigation)",
    waterConsumptionLiters: 70000,
    costBreakdown: {
      seedCost: 4000,
      fertilizerCost: 4500,
      waterElectricityCost: 1800,
      labourCost: 9500,
      machineryCost: 5000,
      protectionCost: 2200
    },
    totalBaseCost: 27000,
    baseDiseaseRisk: "Low (Fusarium Wilt / Pod Borer)",
    baseDiseaseScore: 25,
    optimalConditions: {
      minPh: 6.0, maxPh: 8.0, optPh: 7.0,
      minTemp: 12, maxTemp: 28, optTemp: 22,
      suitableSoils: ["black", "loamy", "clay_loam", "alluvial"]
    }
  },

  rice: {
    id: "rice",
    name: "Rice / Paddy (Pusa / PR 126)",
    nameHi: "धान / चावल (पूसा / बासमती)",
    category: "Cereal / Kharif",
    baseYieldTons: 5.5, // ~24.5 Quintals/Acre
    basePricePerTon: 23000, // ₹2,300/q MSP
    waterRequirementLevel: "Very High (Standing water / AWD)",
    waterConsumptionLiters: 380000,
    costBreakdown: {
      seedCost: 3200,
      fertilizerCost: 11000,
      waterElectricityCost: 8500,
      labourCost: 16000,
      machineryCost: 7500,
      protectionCost: 3800
    },
    totalBaseCost: 50000,
    baseDiseaseRisk: "High (Blast, Bacterial Leaf Blight)",
    baseDiseaseScore: 55,
    optimalConditions: {
      minPh: 5.5, maxPh: 7.2, optPh: 6.2,
      minTemp: 22, maxTemp: 36, optTemp: 28,
      suitableSoils: ["clay", "clay_loam", "heavy_alluvial", "black"]
    }
  },

  cotton: {
    id: "cotton",
    name: "Cotton (Bt Hybrid)",
    nameHi: "कपास (बीटी कॉटन)",
    category: "Cash Crop / Kharif",
    baseYieldTons: 2.5, // ~11 Quintals/Acre
    basePricePerTon: 72000, // ₹7,200/q
    waterRequirementLevel: "Medium to High",
    waterConsumptionLiters: 210000,
    costBreakdown: {
      seedCost: 4500,
      fertilizerCost: 10000,
      waterElectricityCost: 5000,
      labourCost: 15000,
      machineryCost: 6500,
      protectionCost: 6000
    },
    totalBaseCost: 47000,
    baseDiseaseRisk: "High (Pink Bollworm, Bacterial Blight)",
    baseDiseaseScore: 60,
    optimalConditions: {
      minPh: 6.0, maxPh: 8.2, optPh: 7.2,
      minTemp: 22, maxTemp: 38, optTemp: 30,
      suitableSoils: ["black", "clay_loam", "deep_alluvial"]
    }
  },

  maize: {
    id: "maize",
    name: "Maize / Corn (Pioneer Hybrid)",
    nameHi: "मक्का (हाइब्रिड कॉर्न)",
    category: "Cereal / Kharif & Rabi",
    baseYieldTons: 6.2, // ~28 Quintals/Acre
    basePricePerTon: 21500, // ₹2,150/q
    waterRequirementLevel: "Medium (Sensitive at silking)",
    waterConsumptionLiters: 160000,
    costBreakdown: {
      seedCost: 3800,
      fertilizerCost: 9000,
      waterElectricityCost: 3500,
      labourCost: 11000,
      machineryCost: 5500,
      protectionCost: 3200
    },
    totalBaseCost: 36000,
    baseDiseaseRisk: "Medium (Fall Armyworm, Turcicum Leaf Blight)",
    baseDiseaseScore: 38,
    optimalConditions: {
      minPh: 5.8, maxPh: 7.8, optPh: 6.8,
      minTemp: 18, maxTemp: 34, optTemp: 26,
      suitableSoils: ["loamy", "sandy_loam", "alluvial", "black"]
    }
  },

  soybean: {
    id: "soybean",
    name: "Soybean (JS 335 / JS 9560)",
    nameHi: "सोयाबीन (जेएस 335)",
    category: "Oilseed / Kharif",
    baseYieldTons: 2.1, // ~9.5 Quintals/Acre
    basePricePerTon: 48920, // ₹4,892/q MSP
    waterRequirementLevel: "Medium (Rainfed tolerant)",
    waterConsumptionLiters: 130000,
    costBreakdown: {
      seedCost: 4000,
      fertilizerCost: 6500,
      waterElectricityCost: 2000,
      labourCost: 9000,
      machineryCost: 5000,
      protectionCost: 3500
    },
    totalBaseCost: 30000,
    baseDiseaseRisk: "Medium (Yellow Mosaic Virus, Stem Fly)",
    baseDiseaseScore: 42,
    optimalConditions: {
      minPh: 6.0, maxPh: 7.5, optPh: 6.5,
      minTemp: 20, maxTemp: 34, optTemp: 27,
      suitableSoils: ["black", "clay_loam", "loamy"]
    }
  },

  sugarcane: {
    id: "sugarcane",
    name: "Sugarcane (Co 0238)",
    nameHi: "गन्ना (को 0238)",
    category: "Cash Crop / Annual",
    baseYieldTons: 36.0, // ~360 Quintals/Acre
    basePricePerTon: 3400, // ₹340/q FRP
    waterRequirementLevel: "Extremely High (Annual crop)",
    waterConsumptionLiters: 650000,
    costBreakdown: {
      seedCost: 14000,
      fertilizerCost: 16000,
      waterElectricityCost: 14000,
      labourCost: 24000,
      machineryCost: 10000,
      protectionCost: 4000
    },
    totalBaseCost: 82000,
    baseDiseaseRisk: "Medium (Red Rot, Top Borer)",
    baseDiseaseScore: 45,
    optimalConditions: {
      minPh: 6.0, maxPh: 8.0, optPh: 6.8,
      minTemp: 20, maxTemp: 38, optTemp: 30,
      suitableSoils: ["deep_alluvial", "loamy", "black"]
    }
  },

  tomato: {
    id: "tomato",
    name: "Tomato (Hybrid Abhinav)",
    nameHi: "टमाटर (हाइब्रिड अभिनव)",
    category: "Vegetable / All Seasons",
    baseYieldTons: 14.0, // ~140 Quintals/Acre
    basePricePerTon: 16000, // ₹1,600/q
    waterRequirementLevel: "High (Frequent drip irrigation)",
    waterConsumptionLiters: 230000,
    costBreakdown: {
      seedCost: 8500,
      fertilizerCost: 15000,
      waterElectricityCost: 6500,
      labourCost: 22000,
      machineryCost: 8000,
      protectionCost: 9000
    },
    totalBaseCost: 69000,
    baseDiseaseRisk: "High (Early & Late Blight, Leaf Curl)",
    baseDiseaseScore: 70,
    optimalConditions: {
      minPh: 6.0, maxPh: 7.2, optPh: 6.5,
      minTemp: 16, maxTemp: 32, optTemp: 24,
      suitableSoils: ["sandy_loam", "loamy", "alluvial"]
    }
  },

  onion: {
    id: "onion",
    name: "Onion (Nashik Red / Agrifound Light Red)",
    nameHi: "प्याज (नासिक लाल)",
    category: "Vegetable / Rabi & Kharif",
    baseYieldTons: 11.5, // ~115 Quintals/Acre
    basePricePerTon: 18000, // ₹1,800/q
    waterRequirementLevel: "Medium to High",
    waterConsumptionLiters: 200000,
    costBreakdown: {
      seedCost: 7000,
      fertilizerCost: 12000,
      waterElectricityCost: 5500,
      labourCost: 20000,
      machineryCost: 7000,
      protectionCost: 5500
    },
    totalBaseCost: 57000,
    baseDiseaseRisk: "High (Purple Blotch, Thrips)",
    baseDiseaseScore: 62,
    optimalConditions: {
      minPh: 6.0, maxPh: 7.5, optPh: 6.8,
      minTemp: 14, maxTemp: 30, optTemp: 22,
      suitableSoils: ["sandy_loam", "loamy", "alluvial"]
    }
  },

  groundnut: {
    id: "groundnut",
    name: "Groundnut / Peanut (JL 24)",
    nameHi: "मूंगफली (जेएल 24)",
    category: "Oilseed / Kharif",
    baseYieldTons: 2.4, // ~10.5 Quintals/Acre
    basePricePerTon: 63770, // ₹6,377/q MSP
    waterRequirementLevel: "Low to Medium (Needs well-drained soil)",
    waterConsumptionLiters: 110000,
    costBreakdown: {
      seedCost: 6500,
      fertilizerCost: 6000,
      waterElectricityCost: 2500,
      labourCost: 11000,
      machineryCost: 5000,
      protectionCost: 3000
    },
    totalBaseCost: 34000,
    baseDiseaseRisk: "Medium (Tikka Leaf Spot, Collar Rot)",
    baseDiseaseScore: 36,
    optimalConditions: {
      minPh: 5.8, maxPh: 7.5, optPh: 6.5,
      minTemp: 20, maxTemp: 34, optTemp: 27,
      suitableSoils: ["sandy_loam", "loamy", "red_loam"]
    }
  },

  bajra: {
    id: "bajra",
    name: "Pearl Millet / Bajra (Hybrid)",
    nameHi: "बाजरा (हाइब्रिड)",
    category: "Millet / Kharif (Drought Hardy)",
    baseYieldTons: 3.2, // ~14.5 Quintals/Acre
    basePricePerTon: 25000, // ₹2,500/q MSP
    waterRequirementLevel: "Very Low (Survives severe drought)",
    waterConsumptionLiters: 60000,
    costBreakdown: {
      seedCost: 1500,
      fertilizerCost: 4000,
      waterElectricityCost: 1200,
      labourCost: 7500,
      machineryCost: 4000,
      protectionCost: 1200
    },
    totalBaseCost: 19400,
    baseDiseaseRisk: "Very Low (Downy Mildew in rare humid spells)",
    baseDiseaseScore: 16,
    optimalConditions: {
      minPh: 6.0, maxPh: 8.5, optPh: 7.2,
      minTemp: 24, maxTemp: 42, optTemp: 32,
      suitableSoils: ["sandy", "sandy_loam", "red_loam", "loamy"]
    }
  },

  moong: {
    id: "moong",
    name: "Green Gram / Moong (Pusa Vishal)",
    nameHi: "मूंग (पूसा विशाल - 60 दिन)",
    category: "Short Duration Pulse / Zaid & Kharif",
    baseYieldTons: 1.2, // ~5.5 Quintals/Acre
    basePricePerTon: 85580, // ₹8,558/q MSP
    waterRequirementLevel: "Low (Short 60-day cycle)",
    waterConsumptionLiters: 65000,
    costBreakdown: {
      seedCost: 2800,
      fertilizerCost: 3500,
      waterElectricityCost: 1800,
      labourCost: 7000,
      machineryCost: 4000,
      protectionCost: 2200
    },
    totalBaseCost: 21300,
    baseDiseaseRisk: "Medium (Yellow Mosaic, Pod Borer)",
    baseDiseaseScore: 32,
    optimalConditions: {
      minPh: 6.2, maxPh: 7.8, optPh: 7.0,
      minTemp: 22, maxTemp: 38, optTemp: 30,
      suitableSoils: ["loamy", "sandy_loam", "alluvial", "black"]
    }
  }
};

// =========================================================================
// 🧪 SOIL SUITABILITY & CLIMATIC PHYSICS EVALUATION ENGINE
// =========================================================================

function evaluateSoilCompatibility(cropProfile, soilConditions) {
  const {
    soilType = "loamy",
    soilPh = 6.8,
    organicCarbon = 0.65, // %
    soilMoisture = 45 // %
  } = soilConditions || {};

  const normalizedSoil = String(soilType).toLowerCase().replace(/[^a-z_]/g, "");
  const opt = cropProfile.optimalConditions || {};
  let score = 100;
  let yieldMultiplier = 1.0;
  let waterRetentionMultiplier = 1.0;
  const notes = [];

  // 1. Soil Type Match
  if (opt.suitableSoils && opt.suitableSoils.length > 0) {
    const isDirectMatch = opt.suitableSoils.some(s => normalizedSoil.includes(s) || s.includes(normalizedSoil));
    if (isDirectMatch) {
      score += 5;
      notes.push(`Soil type (${soilType}) provides optimal root aeration and tilth.`);
    } else {
      score -= 15;
      yieldMultiplier *= 0.92;
      notes.push(`Soil type (${soilType}) is sub-optimal for ${cropProfile.name}, slight yield drag expected.`);
    }
  }

  // Black Soil Physical Retention Factor
  if (normalizedSoil.includes("black")) {
    waterRetentionMultiplier = 0.85; // Retains moisture strongly, saves 15% irrigation
    if (cropProfile.id === "potato") {
      yieldMultiplier *= 0.90; // Heavy black clay restricts tuber swelling
      notes.push("Heavy black soil can cause compaction for potato tubers; ridge tillage advised.");
    } else if (cropProfile.id === "cotton" || cropProfile.id === "soybean") {
      yieldMultiplier *= 1.05; // Ideal black cotton soil
      notes.push("Black soil provides exceptional deep moisture for taproot system.");
    }
  } else if (normalizedSoil.includes("sandy")) {
    waterRetentionMultiplier = 1.22; // High percolation, requires 22% more irrigation
    notes.push("Sandy soil has high percolation rate; light frequent irrigations needed.");
  }

  // 2. pH Deviation
  const phVal = Number(soilPh) || 6.8;
  const optPh = opt.optPh || 6.5;
  const phDiff = Math.abs(phVal - optPh);

  if (phDiff > 1.2) {
    score -= 20;
    yieldMultiplier *= 0.88;
    notes.push(`Soil pH (${phVal}) deviates strongly from optimal (${optPh}). Micronutrient availability restricted.`);
  } else if (phDiff > 0.6) {
    score -= 10;
    yieldMultiplier *= 0.95;
  }

  // 3. Organic Carbon
  const oc = Number(organicCarbon) || 0.6;
  if (oc < 0.4) {
    score -= 8;
    yieldMultiplier *= 0.94;
    notes.push("Low organic carbon (<0.4%) requires additional basal compost or bio-fertilizer.");
  } else if (oc > 0.8) {
    score += 5;
    yieldMultiplier *= 1.03;
  }

  return {
    compatibilityScore: Math.min(100, Math.max(40, score)),
    yieldMultiplier: Number(yieldMultiplier.toFixed(3)),
    waterRetentionMultiplier: Number(waterRetentionMultiplier.toFixed(3)),
    notes
  };
}

function evaluateWeatherSuitability(cropProfile, weatherConditions) {
  const {
    temperature = 26,
    humidity = 55,
    rainfallMm = 0,
    location = "Indore, MP"
  } = weatherConditions || {};

  const opt = cropProfile.optimalConditions || {};
  let score = 95;
  let yieldMultiplier = 1.0;
  let diseaseShift = 0;
  const warnings = [];

  const temp = Number(temperature) || 26;
  const hum = Number(humidity) || 55;
  const rain = Number(rainfallMm) || 0;

  // Temperature stress check
  if (opt.maxTemp && temp > opt.maxTemp) {
    const excess = temp - opt.maxTemp;
    const penalty = Math.min(22, excess * 2.5);
    yieldMultiplier *= (1 - penalty / 100);
    score -= Math.round(penalty);
    warnings.push(`Current temperature (${temp}°C) exceeds optimal threshold (${opt.maxTemp}°C). Heat stress penalty applied.`);
  } else if (opt.minTemp && temp < opt.minTemp) {
    const deficit = opt.minTemp - temp;
    const penalty = Math.min(20, deficit * 2.2);
    yieldMultiplier *= (1 - penalty / 100);
    score -= Math.round(penalty);
    warnings.push(`Chilling temperature (${temp}°C) will slow germination & vegetative tillering.`);
  }

  // Humidity & Disease Risk Shift
  if (hum > 78) {
    diseaseShift += 18;
    score -= 8;
    warnings.push(`High ambient humidity (${hum}%) increases foliar fungal & rust outbreak probability.`);
  } else if (hum < 35) {
    diseaseShift -= 10;
  }

  // Rainfall offset
  let naturalRainCreditLiters = 0;
  if (rain > 2) {
    naturalRainCreditLiters = Math.round(rain * 4046.86); // 1 mm rain on 1 acre = ~4046.86 Liters
    warnings.push(`Forecasted rainfall (${rain} mm) saves approximately ${naturalRainCreditLiters.toLocaleString()} Liters of irrigation.`);
  }

  return {
    suitabilityScore: Math.min(100, Math.max(35, score)),
    yieldMultiplier: Number(yieldMultiplier.toFixed(3)),
    diseaseShift,
    naturalRainCreditLiters,
    warnings
  };
}

// =========================================================================
// 🚀 MAIN SIMULATOR EXPORT FUNCTION
// =========================================================================

export function simulateWhatIfScenario({
  baseCrop = "wheat",
  targetCrop = "mustard",
  waterAdjustmentPercent = 0,
  fertilizerTimingShiftDays = 0,
  nitrogenAdjustmentPercent = 0,
  farmAreaAcres = 1.0,
  soilConditions = {},
  weatherConditions = {},
  customCrops = []
}) {
  // 1. Build Merged Economic Profile Dictionary (Built-in + Custom User Crops)
  const mergedProfiles = { ...CROP_ECONOMIC_PROFILES };

  if (Array.isArray(customCrops) && customCrops.length > 0) {
    for (const c of customCrops) {
      if (c && c.id && c.name) {
        const yieldVal = Number(c.baseYieldTons) || 3.0;
        const rateVal = Number(c.basePricePerTon) || (Number(c.basePricePerQuintal) * 10) || 30000;
        const costVal = Number(c.totalBaseCost) || 32000;
        const waterVal = Number(c.waterConsumptionLiters) || 150000;

        mergedProfiles[c.id] = {
          id: c.id,
          name: c.name,
          nameHi: c.nameHi || c.name,
          category: c.category || "Custom User Crop",
          baseYieldTons: yieldVal,
          basePricePerTon: rateVal,
          waterRequirementLevel: c.waterRequirementLevel || "Medium",
          waterConsumptionLiters: waterVal,
          costBreakdown: {
            seedCost: Math.round(costVal * 0.12),
            fertilizerCost: Math.round(costVal * 0.28),
            waterElectricityCost: Math.round(costVal * 0.12),
            labourCost: Math.round(costVal * 0.32),
            machineryCost: Math.round(costVal * 0.16),
            protectionCost: Math.round(costVal * 0.08)
          },
          totalBaseCost: costVal,
          baseDiseaseRisk: c.baseDiseaseRisk || "Medium",
          baseDiseaseScore: Number(c.baseDiseaseScore) || 35,
          optimalConditions: c.optimalConditions || {
            minPh: 6.0, maxPh: 7.8, optPh: 6.8,
            minTemp: 15, maxTemp: 35, optTemp: 26,
            suitableSoils: ["alluvial", "loamy", "black", "sandy_loam"]
          }
        };
      }
    }
  }

  const current = mergedProfiles[baseCrop] || mergedProfiles.wheat;
  const target = mergedProfiles[targetCrop] || mergedProfiles.mustard;

  // 2. Evaluate Soil & Weather Physical Conditions
  const baseSoilEval = evaluateSoilCompatibility(current, soilConditions);
  const targetSoilEval = evaluateSoilCompatibility(target, soilConditions);

  const baseWeatherEval = evaluateWeatherSuitability(current, weatherConditions);
  const targetWeatherEval = evaluateWeatherSuitability(target, weatherConditions);

  // 3. Baseline Calculations (Factoring Soil & Weather of current setup)
  const baseCalibratedYield = Number((current.baseYieldTons * baseSoilEval.yieldMultiplier * baseWeatherEval.yieldMultiplier).toFixed(2));
  const baseCalibratedWater = Math.max(20000, Math.round((current.waterConsumptionLiters * baseSoilEval.waterRetentionMultiplier) - baseWeatherEval.naturalRainCreditLiters));
  const baseRevenue = Math.round(baseCalibratedYield * current.basePricePerTon * farmAreaAcres);
  const baseCost = Math.round(current.totalBaseCost * farmAreaAcres);
  const baseProfit = baseRevenue - baseCost;

  // 4. Simulated Target Scenario Calculations
  let simYield = target.baseYieldTons * targetSoilEval.yieldMultiplier * targetWeatherEval.yieldMultiplier;
  let simCost = target.totalBaseCost;
  let simWater = Math.max(20000, Math.round((target.waterConsumptionLiters * targetSoilEval.waterRetentionMultiplier) - targetWeatherEval.naturalRainCreditLiters));
  let simDiseaseScore = target.baseDiseaseScore + targetWeatherEval.diseaseShift;

  // Water Slider Adjustments
  if (waterAdjustmentPercent !== 0) {
    const waterFactor = 1 + (waterAdjustmentPercent / 100);
    simWater = Math.round(simWater * waterFactor);

    if (waterAdjustmentPercent < 0) {
      // Deficit irrigation
      const deficitStress = Math.abs(waterAdjustmentPercent) * 0.38;
      simYield = simYield * (1 - deficitStress / 100);
      simCost -= Math.round(Math.abs(waterAdjustmentPercent) * 45); // saved pumping energy
      simDiseaseScore = Math.max(10, simDiseaseScore - 14); // Less waterlogging = lower fungal pathogen proliferation
    } else {
      // Excess water
      simYield = simYield * 1.02;
      simCost += Math.round(waterAdjustmentPercent * 42);
      simDiseaseScore = Math.min(95, simDiseaseScore + 20); // High moisture increases blight
    }
  }

  // Fertilizer Timing Shift
  if (fertilizerTimingShiftDays > 0) {
    const latePenalty = Math.min(18, fertilizerTimingShiftDays * 1.15);
    simYield = simYield * (1 - latePenalty / 100);
  } else if (fertilizerTimingShiftDays < 0) {
    simYield = simYield * 1.025; // Optimized early root establishment
  }

  simYield = Number(simYield.toFixed(2));

  // 5. Financials
  const simRevenue = Math.round(simYield * target.basePricePerTon * farmAreaAcres);
  const simTotalCost = Math.round(simCost * farmAreaAcres);
  const simProfit = simRevenue - simTotalCost;
  const profitDifference = simProfit - baseProfit;
  const roi = simTotalCost > 0 ? Number(((simProfit / simTotalCost) * 100).toFixed(1)) : 0;
  const baseRoi = baseCost > 0 ? Number(((baseProfit / baseCost) * 100).toFixed(1)) : 0;

  // 6. Detailed Location & Soil Contextual AI Reasoning
  const locationLabel = weatherConditions?.location || "Your Location";
  const soilTypeLabel = soilConditions?.soilType || "Loamy Soil";
  const soilPhVal = soilConditions?.soilPh || 6.8;

  let aiRecommendation = "";
  let aiRecommendationHi = "";

  if (profitDifference >= 0) {
    aiRecommendation = `In ${locationLabel} on ${soilTypeLabel} (pH ${soilPhVal}), switching to ${target.name} is projected to yield +₹${profitDifference.toLocaleString()} higher net profit (ROI: ${roi}%) with ${targetSoilEval.compatibilityScore}% soil compatibility.`;
    aiRecommendationHi = `${locationLabel} में ${soilTypeLabel} (pH ${soilPhVal}) के अंतर्गत, ${target.nameHi || target.name} लगाने पर ₹${profitDifference.toLocaleString()} अधिक शुद्ध मुनाफा (ROI: ${roi}%) मिलने का अनुमान है। मिट्टी अनुकूलता स्कोर ${targetSoilEval.compatibilityScore}% है।`;
  } else {
    aiRecommendation = `In ${locationLabel}, ${target.name} yields ₹${Math.abs(profitDifference).toLocaleString()} lower net profit compared to ${current.name} due to higher input costs or local soil/temperature constraints. Current baseline setup remains financially optimal.`;
    aiRecommendationHi = `${locationLabel} में वर्तमान मौसम व मिट्टी परिस्थितियों में ${target.nameHi || target.name} से ${current.nameHi || current.name} की तुलना में ₹${Math.abs(profitDifference).toLocaleString()} कम लाभ हो सकता है। वर्तमान फसल ही आर्थिक रूप से अधिक सुरक्षित है।`;
  }

  if (targetSoilEval.notes.length > 0) {
    aiRecommendation += ` Note: ${targetSoilEval.notes[0]}`;
    aiRecommendationHi += ` सलाह: ${targetSoilEval.notes[0]}`;
  }

  return {
    success: true,
    scenarioName: `${current.name} ➔ ${target.name}`,
    farmAreaAcres,
    location: locationLabel,
    weatherSummary: {
      temperature: weatherConditions?.temperature || 26,
      humidity: weatherConditions?.humidity || 55,
      rainfallMm: weatherConditions?.rainfallMm || 0,
      season: weatherConditions?.season || "Rabi"
    },
    soilSummary: {
      soilType: soilTypeLabel,
      soilPh: soilPhVal,
      compatibilityScore: targetSoilEval.compatibilityScore
    },
    comparison: {
      baseline: {
        id: current.id,
        crop: current.name,
        cropHi: current.nameHi,
        category: current.category,
        expectedYield: `${(baseCalibratedYield * farmAreaAcres).toFixed(1)} Tons`,
        expectedYieldQuintals: Number((baseCalibratedYield * farmAreaAcres * 10).toFixed(1)),
        waterRequirement: current.waterRequirementLevel,
        waterConsumptionLiters: baseCalibratedWater * farmAreaAcres,
        farmingCost: baseCost,
        costBreakdown: current.costBreakdown,
        diseaseRisk: current.baseDiseaseRisk,
        diseaseScore: current.baseDiseaseScore,
        expectedRevenue: baseRevenue,
        expectedProfit: baseProfit,
        roiPercent: baseRoi,
        soilCompatibility: baseSoilEval.compatibilityScore,
        weatherSuitability: baseWeatherEval.suitabilityScore
      },
      simulated: {
        id: target.id,
        crop: target.name,
        cropHi: target.nameHi,
        category: target.category,
        expectedYield: `${(simYield * farmAreaAcres).toFixed(1)} Tons`,
        expectedYieldQuintals: Number((simYield * farmAreaAcres * 10).toFixed(1)),
        waterRequirement: target.waterRequirementLevel,
        waterConsumptionLiters: simWater * farmAreaAcres,
        farmingCost: simTotalCost,
        costBreakdown: target.costBreakdown,
        diseaseRisk: simDiseaseScore > 50 ? "High" : simDiseaseScore > 30 ? "Medium" : "Low",
        diseaseScore: simDiseaseScore,
        expectedRevenue: simRevenue,
        expectedProfit: simProfit,
        roiPercent: roi,
        soilCompatibility: targetSoilEval.compatibilityScore,
        weatherSuitability: targetWeatherEval.suitabilityScore
      }
    },
    delta: {
      profitDiff: profitDifference,
      profitDiffFormatted: profitDifference >= 0 ? `+₹${profitDifference.toLocaleString()}` : `-₹${Math.abs(profitDifference).toLocaleString()}`,
      waterSavedLiters: Math.max(0, (baseCalibratedWater - simWater) * farmAreaAcres),
      costDiff: simTotalCost - baseCost,
      roiDiff: Number((roi - baseRoi).toFixed(1))
    },
    soilNotes: targetSoilEval.notes,
    weatherWarnings: targetWeatherEval.warnings,
    aiDecisionRationale: aiRecommendation,
    aiDecisionRationaleHi: aiRecommendationHi
  };
}
