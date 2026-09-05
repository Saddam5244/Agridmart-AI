// =========================================================================
// 🌾 AGRO-LOCATION & REGIONAL CROP COMPARISON SERVICE
// Maps coordinates/regions to ICAR agro-climatic zones, soil profiles,
// real-time agricultural sowing seasons, and side-by-side crop insights
// =========================================================================

import { CROPS_DATASET } from "../data/cropSuitability.js";
import { CROP_ECONOMIC_PROFILES } from "./whatIfSimulator.js";

/**
 * Determine the current agricultural season in India based on month
 * - Kharif (Monsoon): June to October (Months 5 to 9 in 0-indexed JS)
 * - Rabi (Winter): November to February/March (Months 10, 11, 0, 1)
 * - Zaid (Summer): March to May (Months 2, 3, 4)
 */
export function getCurrentAgroSeason(date = new Date()) {
  const month = date.getMonth(); // 0-indexed: 0 = Jan, 2 = Mar, 5 = June, etc.
  if (month >= 5 && month <= 9) {
    return {
      seasonKey: "kharif",
      name: "Kharif (Monsoon Crop Cycle)",
      nameHi: "खरीफ (मानसून फसल चक्र)",
      description: "Sown in June-July with monsoon rains; harvested in autumn.",
      descriptionHi: "जून-जुलाई में मानसूनी बारिश के साथ बुवाई, अक्टूबर-नवंबर में कटाई।"
    };
  } else if (month >= 2 && month <= 4) {
    return {
      seasonKey: "zaid",
      name: "Zaid (Summer Crop Cycle)",
      nameHi: "जायद (ग्रीष्मकालीन फसल चक्र)",
      description: "Short summer season between Rabi and Kharif. Ideal for quick vegetables, pulses, and fodder.",
      descriptionHi: "रबी और खरीफ के बीच का ग्रीष्मकालीन चक्र। सब्जियां, मूंग, उड़द व चारे के लिए सर्वोत्तम।"
    };
  } else {
    return {
      seasonKey: "rabi",
      name: "Rabi (Winter Crop Cycle)",
      nameHi: "रबी (शीतकालीन फसल चक्र)",
      description: "Sown in Oct-Dec and harvested in spring (March-April).",
      descriptionHi: "अक्टूबर-दिसंबर में बुवाई और मार्च-अप्रैल में कटाई।"
    };
  }
}

/**
 * Resolve regional soil and climate baseline based on State/Region or Coordinates
 */
export function resolveRegionalAgroProfile({ state = "", city = "", lat = 22.7, lon = 75.8 }) {
  const text = `${state} ${city}`.toLowerCase();

  // 1. Central India / Deccan Black Soil Belt (Madhya Pradesh, Maharashtra, Northern Karnataka)
  if (text.includes("madhya pradesh") || text.includes("indore") || text.includes("bhopal") || 
      text.includes("maharashtra") || text.includes("vidarbha") || text.includes("nagpur") || 
      text.includes("nashik") || (lat >= 18 && lat <= 24 && lon >= 73 && lon <= 80)) {
    return {
      regionName: "Central Deccan & Malwa Plateau",
      regionNameHi: "मध्य दक्कन एवं मालवा पठार",
      soilType: "Clay / Black Cotton Soil",
      soilTypeHi: "काली कपासिया मिट्टी (वर्टिसोल)",
      soilCode: "Clay",
      baselineNPK: { nitrogen: 110, phosphorus: 55, potassium: 50, ph: 7.4 },
      rainfallAverageMm: 780,
      dominantCrops: ["Wheat", "Mustard", "Chickpea / Gram", "Cotton", "Tomato"],
      irrigationSource: "Tube-well & Canal network"
    };
  }

  // 2. Northern Indo-Gangetic Plains (Punjab, Haryana, Western UP)
  if (text.includes("punjab") || text.includes("ludhiana") || text.includes("haryana") || 
      text.includes("karnal") || text.includes("delhi") || (lat >= 28 && lon <= 78)) {
    return {
      regionName: "Northern Indo-Gangetic Plain",
      regionNameHi: "उत्तर भारत का सिंधु-गंगा मैदान",
      soilType: "Alluvial / Loamy",
      soilTypeHi: "जलोढ़ दोमट उपजाऊ मिट्टी",
      soilCode: "Alluvial / Loamy",
      baselineNPK: { nitrogen: 140, phosphorus: 65, potassium: 45, ph: 7.1 },
      rainfallAverageMm: 620,
      dominantCrops: ["Wheat", "Rice / Paddy", "Mustard", "Potato", "Maize / Corn"],
      irrigationSource: "Borewell & Perennial Canals"
    };
  }

  // 3. Eastern Gangetic Plains (Uttar Pradesh, Bihar, West Bengal)
  if (text.includes("uttar pradesh") || text.includes("lucknow") || text.includes("kanpur") || 
      text.includes("varanasi") || text.includes("bihar") || text.includes("patna") || 
      text.includes("bengal") || text.includes("kolkata")) {
    return {
      regionName: "Eastern Fertile Alluvial Plains",
      regionNameHi: "पूर्वी गंगा जलोढ़ मैदान",
      soilType: "Deep Alluvial Loam",
      soilTypeHi: "गहरी जलोढ़ दोमट मिट्टी",
      soilCode: "Alluvial / Loamy",
      baselineNPK: { nitrogen: 125, phosphorus: 60, potassium: 45, ph: 6.9 },
      rainfallAverageMm: 950,
      dominantCrops: ["Wheat", "Rice / Paddy", "Potato", "Tomato", "Chickpea / Gram", "Sugarcane"],
      irrigationSource: "Groundwater & River basins"
    };
  }

  // 4. Arid & Semi-Arid Zone (Rajasthan, North Gujarat)
  if (text.includes("rajasthan") || text.includes("jaipur") || text.includes("gujarat") || 
      (lon < 73 && lat > 23)) {
    return {
      regionName: "Western Arid & Semi-Arid Zone",
      regionNameHi: "पश्चिमी शुष्क एवं अर्ध-शुष्क क्षेत्र",
      soilType: "Sandy / Light Soil",
      soilTypeHi: "रेतीली / हल्की दोमट मिट्टी",
      soilCode: "Sandy",
      baselineNPK: { nitrogen: 80, phosphorus: 35, potassium: 35, ph: 7.9 },
      rainfallAverageMm: 380,
      dominantCrops: ["Mustard / Rapeseed", "Chickpea / Gram", "Cotton", "Wheat"],
      irrigationSource: "Drip Irrigation & Indira Gandhi Canal"
    };
  }

  // 5. Southern Peninsular Zone (Andhra, Telangana, Tamil Nadu, Karnataka)
  if (text.includes("andhra") || text.includes("telangana") || text.includes("tamil") || 
      text.includes("karnataka") || text.includes("bengaluru") || text.includes("coimbatore") || 
      text.includes("guntur") || lat < 18) {
    return {
      regionName: "Southern Peninsular Agro-Zone",
      regionNameHi: "दक्षिणी प्रायद्वीपीय कृषि क्षेत्र",
      soilType: "Red Sandy Loam / Mixed Loam",
      soilTypeHi: "लाल दोमट एवं मिश्रित मिट्टी",
      soilCode: "Alluvial / Loamy",
      baselineNPK: { nitrogen: 105, phosphorus: 50, potassium: 60, ph: 6.6 },
      rainfallAverageMm: 850,
      dominantCrops: ["Rice / Paddy", "Cotton", "Tomato", "Maize / Corn", "Sugarcane"],
      irrigationSource: "Borewells, Farm Ponds & Micro-Drip"
    };
  }

  // Default Fallback
  return {
    regionName: "Composite Agro-Climatic Zone",
    regionNameHi: "समग्र कृषि जलवायु क्षेत्र",
    soilType: "Alluvial / Loamy",
    soilTypeHi: "जलोढ़ दोमट मिट्टी",
    soilCode: "Alluvial / Loamy",
    baselineNPK: { nitrogen: 120, phosphorus: 60, potassium: 45, ph: 6.8 },
    rainfallAverageMm: 700,
    dominantCrops: ["Wheat", "Mustard / Rapeseed", "Chickpea / Gram", "Tomato", "Potato"],
    irrigationSource: "Mixed Tube-well & Surface Water"
  };
}

/**
 * Detailed Side-by-Side Crop Comparison
 * Compares selected crops across Yield, Revenue, Cultivation Cost,
 * Net Profit, Water Consumed, Growth Duration, and Pest/Risk Profile.
 */
export function compareCropsData(cropNamesOrIds = []) {
  if (!Array.isArray(cropNamesOrIds) || cropNamesOrIds.length === 0) {
    cropNamesOrIds = ["Wheat", "Mustard / Rapeseed", "Chickpea / Gram"];
  }

  const comparedList = cropNamesOrIds.map(queryName => {
    const qLower = String(queryName).toLowerCase().trim();
    
    // Find in CROPS_DATASET
    const cropMeta = CROPS_DATASET.find(c => 
      c.name.toLowerCase().includes(qLower) || 
      qLower.includes(c.name.toLowerCase())
    ) || CROPS_DATASET[0];

    // Find in CROP_ECONOMIC_PROFILES
    let econProfile = null;
    for (const key of Object.keys(CROP_ECONOMIC_PROFILES)) {
      const p = CROP_ECONOMIC_PROFILES[key];
      if (p.name.toLowerCase().includes(qLower) || 
          cropMeta.name.toLowerCase().includes(p.name.toLowerCase()) ||
          p.id.toLowerCase() === qLower) {
        econProfile = p;
        break;
      }
    }

    // Baseline stats
    const yieldAcre = cropMeta.avgYieldPerAcre;
    const marketRate = cropMeta.avgMarketRate;
    const grossRevenue = Math.round(yieldAcre * marketRate);
    
    // Cost estimation per acre
    const totalCost = econProfile ? econProfile.totalBaseCost : Math.round(grossRevenue * 0.45);
    const netProfit = grossRevenue - totalCost;
    const roiPercentage = Math.round((netProfit / (totalCost || 1)) * 100);

    const costBreakdown = econProfile?.costBreakdown || {
      seedCost: Math.round(totalCost * 0.12),
      fertilizerCost: Math.round(totalCost * 0.28),
      waterElectricityCost: Math.round(totalCost * 0.12),
      labourCost: Math.round(totalCost * 0.32),
      machineryCost: Math.round(totalCost * 0.16)
    };

    const waterLiters = econProfile?.waterConsumptionLiters || (
      cropMeta.waterRequirement.includes("High") ? 280000 : 
      cropMeta.waterRequirement.includes("Low") ? 90000 : 180000
    );

    return {
      name: cropMeta.name,
      category: cropMeta.category,
      yieldAcre,
      unit: cropMeta.unit,
      marketRate,
      grossRevenue,
      totalCost,
      netProfit,
      roiPercentage,
      costBreakdown,
      waterLiters,
      waterRequirement: cropMeta.waterRequirement,
      durationDays: cropMeta.durationDays,
      diseaseRisk: econProfile?.baseDiseaseRisk || "Moderate risk; inspect canopy regularly",
      diseaseScore: econProfile?.baseDiseaseScore || 35,
      keyAdvice: cropMeta.keyAdvice,
      optimumConditions: {
        npk: `N:${cropMeta.optN} P:${cropMeta.optP} K:${cropMeta.optK}`,
        ph: `${cropMeta.minPh} - ${cropMeta.maxPh}`,
        temperature: `${cropMeta.minTemp}°C - ${cropMeta.maxTemp}°C`
      }
    };
  });

  // Calculate comparative winning verdicts
  if (comparedList.length > 1) {
    let maxProfitCrop = comparedList[0];
    let minWaterCrop = comparedList[0];
    let minCostCrop = comparedList[0];

    comparedList.forEach(c => {
      if (c.netProfit > maxProfitCrop.netProfit) maxProfitCrop = c;
      if (c.waterLiters < minWaterCrop.waterLiters) minWaterCrop = c;
      if (c.totalCost < minCostCrop.totalCost) minCostCrop = c;
    });

    comparedList.forEach(c => {
      c.badges = [];
      if (c.name === maxProfitCrop.name) {
        c.badges.push({ type: "profit", label: "Highest Net Profit", labelHi: "सर्वाधिक शुद्ध मुनाफा", icon: "Trophy" });
      }
      if (c.waterLiters === minWaterCrop.waterLiters) {
        c.badges.push({ type: "water", label: "Water Saver / Drought Resilient", labelHi: "कम पानी / सूखा सहनशील", icon: "Droplets" });
      }
      if (c.totalCost === minCostCrop.totalCost) {
        c.badges.push({ type: "cost", label: "Lowest Capital Investment", labelHi: "न्यूनतम लागत निवेश", icon: "Shield" });
      }
      if (c.roiPercentage >= 70) {
        c.badges.push({ type: "roi", label: `High ROI (${c.roiPercentage}%)`, labelHi: `उच्च रिटर्न (${c.roiPercentage}%)`, icon: "TrendingUp" });
      }
    });
  }

  return {
    success: true,
    crops: comparedList,
    comparisonDate: new Date().toISOString()
  };
}
