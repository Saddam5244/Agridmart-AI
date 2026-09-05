/**
 * Smart Irrigation Engine using Evapotranspiration (ET0) & Soil Moisture Deficit
 */
export function calculateSmartIrrigation({
  soilMoisture = 42, // Current moisture percentage
  cropType = "Wheat",
  cropStage = "vegetative", // initial, vegetative, flowering, maturity
  soilType = "Loamy", // Sandy, Loamy, Clayey
  ambientTemp = 29, // Celsius
  humidity = 45, // %
  rainForecastMm = 0, // mm in next 24h
  fieldAreaAcres = 2.5
}) {
  // Field Capacity and Wilting points by soil type
  const soilParams = {
    Sandy: { fieldCapacity: 18, wiltingPoint: 8, optimalMoisture: 65 },
    Loamy: { fieldCapacity: 30, wiltingPoint: 14, optimalMoisture: 70 },
    Clayey: { fieldCapacity: 40, wiltingPoint: 22, optimalMoisture: 75 },
    Alluvial: { fieldCapacity: 32, wiltingPoint: 15, optimalMoisture: 70 }
  };

  const currentSoil = soilParams[soilType] || soilParams.Loamy;

  // Crop coefficient (Kc) by stage
  const stageCoefficients = {
    initial: 0.45,
    vegetative: 0.85,
    flowering: 1.15, // peak water requirement
    maturity: 0.65
  };

  const kc = stageCoefficients[cropStage.toLowerCase()] || 0.85;

  // Reference Evapotranspiration ET0 approx (Hargreaves method simplified)
  const et0 = Math.max(2.5, (0.0023 * (ambientTemp + 17.8) * Math.sqrt(Math.max(1, 35 - ambientTemp * 0.4)) * 4.2));
  const cropWaterNeedMmPerDay = Number((et0 * kc).toFixed(2));

  // Determine Moisture Deficit
  let moistureStatus = "Optimal";
  let irrigationRequired = false;
  let recommendedDurationMinutes = 0;
  let scheduleWindow = "No immediate irrigation needed";
  let waterSavedLiters = 0;
  let reason = "";

  if (rainForecastMm > 15) {
    moistureStatus = "Rain Expected";
    irrigationRequired = false;
    recommendedDurationMinutes = 0;
    scheduleWindow = "Pause irrigation: Significant rainfall expected";
    waterSavedLiters = Math.round(fieldAreaAcres * 12000);
    reason = `Weather forecast indicates ${rainForecastMm}mm rain. Postpone irrigation to prevent waterlogging and save electricity.`;
  } else if (soilMoisture < 45) {
    irrigationRequired = true;
    moistureStatus = soilMoisture < 30 ? "Critical Deficit" : "Low Moisture";
    
    // Calculate minutes based on deficit and area
    const deficitFactor = (65 - soilMoisture) / 20;
    recommendedDurationMinutes = Math.round(25 + deficitFactor * 15 * kc);
    scheduleWindow = "Tomorrow Morning (06:00 AM - 07:00 AM)";
    
    // Drip irrigation vs conventional flood savings
    const conventionalWaterUsage = fieldAreaAcres * 22000; // liters
    const precisionWaterUsage = fieldAreaAcres * 9500;
    waterSavedLiters = Math.round(conventionalWaterUsage - precisionWaterUsage);
    
    reason = `Soil moisture is at ${soilMoisture}%. High crop water demand during the ${cropStage} stage. Irrigate in early morning to minimize solar evaporation loss.`;
  } else if (soilMoisture >= 45 && soilMoisture <= 75) {
    moistureStatus = "Optimal";
    irrigationRequired = false;
    recommendedDurationMinutes = 0;
    scheduleWindow = "Next inspection in 48 hours";
    waterSavedLiters = Math.round(fieldAreaAcres * 8000);
    reason = `Soil moisture is currently balanced at ${soilMoisture}%. Root zone has adequate moisture for healthy nutrient uptake.`;
  } else {
    moistureStatus = "Excess Moisture";
    irrigationRequired = false;
    recommendedDurationMinutes = 0;
    scheduleWindow = "Ensure field drainage";
    waterSavedLiters = 0;
    reason = `Moisture exceeds 75%. Avoid waterlogging to prevent root asphyxiation and fungal collar rot.`;
  }

  return {
    cropType,
    cropStage,
    soilType,
    currentMoisture: soilMoisture,
    moistureStatus,
    irrigationRequired,
    cropWaterNeedMmPerDay,
    recommendedDurationMinutes,
    scheduleWindow,
    waterSavedLiters,
    reason,
    pumpAutoEligible: irrigationRequired,
    nextBestAction: irrigationRequired 
      ? `Irrigate tomorrow morning for ~${recommendedDurationMinutes} minutes based on soil moisture (${soilMoisture}%) and clear weather.`
      : `No irrigation needed today. Soil moisture is optimal at ${soilMoisture}%.`
  };
}
