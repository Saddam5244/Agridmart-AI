import http from 'http';

function postJson(path, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ raw: body });
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function getJson(path) {
  return new Promise((resolve, reject) => {
    http.get({
      hostname: 'localhost',
      port: 5000,
      path: path
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve({ raw: body });
        }
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log("===============================================================");
  console.log("🧪 TESTING ADVANCED WHAT-IF FARM SIMULATOR (HEAVY AGRO-DATA)");
  console.log("===============================================================");

  let passed = 0;
  let total = 0;

  // Test 1: Crop Library Endpoint (14 Major Crops)
  total++;
  const libRes = await getJson('/api/simulator/crop-library');
  if (libRes?.success && Array.isArray(libRes?.crops) && libRes.crops.length >= 14) {
    console.log(`✅ [1/5] Crop Library Verified: Loaded ${libRes.crops.length} authentic crop economic profiles (Wheat, Rice, Cotton, Sugarcane, etc.)`);
    passed++;
  } else {
    console.error("❌ [1/5] Failed to fetch crop library", libRes);
  }

  // Test 2: Standard Soil & Weather Aware Simulation (Wheat ➔ Mustard in Indore on Black Soil)
  total++;
  const res2 = await postJson('/api/simulator/what-if', {
    baseCrop: "wheat",
    targetCrop: "mustard",
    farmAreaAcres: 2.5,
    soilConditions: {
      soilType: "Black Cotton Soil",
      soilPh: 7.2,
      organicCarbon: 0.72,
      soilMoisture: 45
    },
    weatherConditions: {
      location: "Indore, Madhya Pradesh",
      temperature: 24,
      humidity: 50,
      rainfallMm: 0,
      season: "Rabi"
    }
  });

  if (res2?.success && res2?.comparison?.baseline && res2?.soilSummary?.compatibilityScore > 0) {
    console.log(`✅ [2/5] Soil & Weather Simulation Passed:`);
    console.log(`   Location: ${res2.location} | Net Profit Difference: ${res2.delta.profitDiffFormatted} | Water Saved: ${res2.delta.waterSavedLiters.toLocaleString()} L`);
    passed++;
  } else {
    console.error("❌ [2/5] Standard simulation failed", res2);
  }

  // Test 3: Custom / Manually Added Crop Simulation (e.g. Dragon Fruit / Exotic Cash Crop)
  total++;
  const customCrop = {
    id: "custom_dragon_fruit",
    name: "Dragon Fruit (Kamalam)",
    nameHi: "ड्रैगन फ्रूट (कमलम)",
    category: "Horticulture / Exotic",
    baseYieldTons: 4.5,
    basePricePerTon: 90000, // ₹9,000/q
    totalBaseCost: 75000,
    waterConsumptionLiters: 120000,
    waterRequirementLevel: "Low to Medium (Cactus family)",
    baseDiseaseRisk: "Low",
    baseDiseaseScore: 18
  };

  const res3 = await postJson('/api/simulator/what-if', {
    baseCrop: "wheat",
    targetCrop: "custom_dragon_fruit",
    farmAreaAcres: 1.0,
    customCrops: [customCrop],
    soilConditions: {
      soilType: "Sandy Loam",
      soilPh: 6.8
    },
    weatherConditions: {
      location: "Baramati, Maharashtra",
      temperature: 28,
      humidity: 45
    }
  });

  if (res3?.success && res3?.comparison?.simulated?.crop?.includes("Dragon Fruit")) {
    console.log(`✅ [3/5] Custom Crop Manual Simulation Passed:`);
    console.log(`   Simulated "${res3.comparison.simulated.crop}" with Net Revenue: ₹${res3.comparison.simulated.expectedRevenue.toLocaleString()} and Profit: ₹${res3.comparison.simulated.expectedProfit.toLocaleString()}`);
    passed++;
  } else {
    console.error("❌ [3/5] Custom Crop simulation failed", res3);
  }

  // Test 4: Extreme Soil pH & Adverse Weather Stress Penalties
  total++;
  const res4 = await postJson('/api/simulator/what-if', {
    baseCrop: "wheat",
    targetCrop: "wheat",
    farmAreaAcres: 1.0,
    soilConditions: {
      soilType: "Saline / Alkaline Soil",
      soilPh: 8.8, // severe alkalinity
      organicCarbon: 0.3
    },
    weatherConditions: {
      location: "Bathinda, Punjab",
      temperature: 36, // heat stress during wheat maturity
      humidity: 88, // high humidity
      rainfallMm: 25 // rainfall offset
    }
  });

  if (res4?.success && res4?.weatherWarnings?.length > 0 && res4?.soilNotes?.length > 0) {
    console.log(`✅ [4/5] Agro-Climatic Stress & Physics Penalties Verified:`);
    console.log(`   Warning: "${res4.weatherWarnings[0]}"`);
    console.log(`   Soil Note: "${res4.soilNotes[0]}"`);
    passed++;
  } else {
    console.error("❌ [4/5] Stress penalties verification failed", res4);
  }

  // Test 5: Deficit Irrigation vs Overwatering Tradeoff
  total++;
  const res5 = await postJson('/api/simulator/what-if', {
    baseCrop: "rice",
    targetCrop: "rice",
    waterAdjustmentPercent: -30,
    farmAreaAcres: 2.0
  });

  if (res5?.success && res5?.delta?.waterSavedLiters > 0) {
    console.log(`✅ [5/5] Deficit Water Budget Model Verified: Saved ${res5.delta.waterSavedLiters.toLocaleString()} Liters on 2 Acres Paddy`);
    passed++;
  } else {
    console.error("❌ [5/5] Deficit irrigation test failed", res5);
  }

  console.log("===============================================================");
  console.log(`🎯 RESULT: ${passed}/${total} TESTS PASSED (${Math.round((passed/total)*100)}%)`);
  console.log("===============================================================");
}

runTests().catch(console.error);
