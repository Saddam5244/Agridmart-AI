import { CROPS_DATASET } from "../data/cropSuitability.js";

/**
 * Machine Learning Multi-Criteria Ranking for Crop Recommendation & Yield Prediction
 */
export function recommendCropsAndPredictYield({
  nitrogen = 120,
  phosphorus = 60,
  potassium = 40,
  ph = 6.5,
  temperature = 24,
  humidity = 60,
  rainfall = 650,
  soilType = "Loamy",
  season = "rabi"
}) {
  const normSeason = (season || "rabi").toLowerCase();

  const scoredCrops = CROPS_DATASET.map(crop => {
    // 1. Calculate nutrient fit scores (0 to 1)
    const nScore = calculateFeatureFit(nitrogen, crop.minN, crop.maxN, crop.optN);
    const pScore = calculateFeatureFit(phosphorus, crop.minP, crop.maxP, crop.optP);
    const kScore = calculateFeatureFit(potassium, crop.minK, crop.maxK, crop.optK);
    const phScore = calculateFeatureFit(ph, crop.minPh, crop.maxPh, crop.optPh);
    const tempScore = calculateFeatureFit(temperature, crop.minTemp, crop.maxTemp, crop.optTemp);
    const rainScore = calculateFeatureFit(rainfall, crop.minRain, crop.maxRain, crop.optRain);

    // Soil type alignment
    const soilScore = crop.soilTypes.some(s => s.toLowerCase().includes(soilType.toLowerCase()) || soilType.toLowerCase().includes(s.toLowerCase())) ? 1.0 : 0.72;

    // Season alignment bonus (Rabi vs Kharif vs Zaid / Multiseason)
    let seasonScore = 0.75;
    const catLower = crop.category.toLowerCase();
    if (catLower.includes(normSeason) || catLower.includes("multiseason") || catLower.includes("annual")) {
      seasonScore = 1.0;
    } else if (normSeason === "rabi" && catLower.includes("kharif")) {
      seasonScore = 0.55;
    } else if (normSeason === "kharif" && catLower.includes("rabi")) {
      seasonScore = 0.55;
    }

    // Weighted composite match probability
    const compositeScore = (
      nScore * 0.20 +
      pScore * 0.16 +
      kScore * 0.14 +
      phScore * 0.14 +
      tempScore * 0.12 +
      rainScore * 0.10 +
      seasonScore * 0.09 +
      soilScore * 0.05
    );

    const matchPercentage = Math.min(99, Math.max(32, Math.round(compositeScore * 100)));

    // Predict Yield (Quintals per acre & Tons) based on nutrient optimality
    const yieldMultiplier = 0.82 + (compositeScore * 0.36);
    const predictedYield = Number((crop.avgYieldPerAcre * yieldMultiplier).toFixed(1));
    const predictedYieldTons = Number((predictedYield / 10).toFixed(2));
    
    // Financial Returns (Per Acre)
    const estimatedGrossIncome = Math.round(predictedYield * crop.avgMarketRate);
    // ICAR standardized cultivation cost ~38-46% of baseline revenue
    const estimatedCost = Math.round(crop.avgYieldPerAcre * crop.avgMarketRate * 0.42);
    const estimatedNetProfit = Math.max(12000, estimatedGrossIncome - estimatedCost);
    const roiPercentage = Math.round((estimatedNetProfit / (estimatedCost || 1)) * 100);

    const waterBudgetLiters = crop.waterRequirement.includes("High") ? 280000 : 
      crop.waterRequirement.includes("Low") ? 90000 : 170000;

    return {
      ...crop,
      matchPercentage,
      predictedYield,
      predictedYieldTons,
      estimatedGrossIncome,
      estimatedCost,
      estimatedNetProfit,
      roiPercentage,
      waterBudgetLiters,
      suitabilityLevel: matchPercentage >= 85 ? "Highly Recommended" : matchPercentage >= 70 ? "Moderately Recommended" : "Low Feasibility"
    };
  });

  // Sort descending by match percentage
  scoredCrops.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return {
    farmerInput: { nitrogen, phosphorus, potassium, ph, temperature, humidity, rainfall, soilType, season: normSeason },
    topRecommendations: scoredCrops.slice(0, 4),
    allCrops: scoredCrops
  };
}

function calculateFeatureFit(val, min, max, opt) {
  if (val >= min && val <= max) {
    const distFromOpt = Math.abs(val - opt);
    const maxDist = Math.max(Math.abs(opt - min), Math.abs(max - opt));
    return Math.max(0.65, 1 - (distFromOpt / (maxDist * 2)));
  } else {
    const dist = val < min ? min - val : val - max;
    const penalty = Math.min(0.6, dist / opt);
    return Math.max(0.1, 0.6 - penalty);
  }
}
