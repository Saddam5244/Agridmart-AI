import http from 'http';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ statusCode: res.statusCode, body: JSON.parse(body), headers: res.headers });
        } catch (e) {
          resolve({ statusCode: res.statusCode, body, headers: res.headers });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(typeof data === 'string' ? data : JSON.stringify(data));
    req.end();
  });
}

async function runFullWebsiteTests() {
  console.log('===============================================================');
  console.log('🌾 AGRISMART AI — FULL COMPREHENSIVE SYSTEM TEST SUITE 🌾');
  console.log('===============================================================\n');

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition, message) {
    totalTests++;
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passedTests++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
    }
  }

  // -------------------------------------------------------------
  // TEST 1: FRONTEND & BACKEND SERVER LIVENESS
  // -------------------------------------------------------------
  console.log('📡 [1/8] Testing Server Liveness & Health...');
  try {
    const health = await request({ hostname: 'localhost', port: 5000, path: '/api/dashboard', method: 'GET' });
    assert(health.statusCode === 200, `Backend Express Server running on Port 5000 (Status ${health.statusCode})`);
    assert(health.body.success === true, 'Backend returned valid JSON dashboard payload');
  } catch (err) {
    assert(false, `Backend connection failed: ${err.message}`);
  }

  // -------------------------------------------------------------
  // TEST 2: FARMER DASHBOARD & HEALTH SCORE ENGINE
  // -------------------------------------------------------------
  console.log('\n📊 [2/8] Testing Farmer Dashboard & Farm Health Score...');
  try {
    const dash = await request({ hostname: 'localhost', port: 5000, path: '/api/dashboard', method: 'GET' });
    assert(typeof dash.body.farmHealthScore === 'number' && dash.body.farmHealthScore >= 0 && dash.body.farmHealthScore <= 100, `Farm Health Score calculated: ${dash.body.farmHealthScore}/100`);
    assert(Boolean(dash.body.aiRecommendation), `AI Actionable Recommendation generated: "${dash.body.aiRecommendation}"`);
    assert(Boolean(dash.body.weather.temperature), `Live weather attached: ${dash.body.weather.temperature}°C, ${dash.body.weather.condition}`);
    assert(dash.body.weather.forecast5Day.length === 5, '5-Day Weather Forecast available');
  } catch (err) {
    assert(false, `Dashboard test failed: ${err.message}`);
  }

  // -------------------------------------------------------------
  // TEST 3: AI PLANT PATHOLOGY & DISEASE CLASSIFIER
  // -------------------------------------------------------------
  console.log('\n🔬 [3/8] Testing AI Disease Pathology Diagnostics...');
  try {
    const samples = await request({ hostname: 'localhost', port: 5000, path: '/api/disease-samples', method: 'GET' });
    assert(samples.body.samples && samples.body.samples.length >= 5, `Retrieved ${samples.body.samples.length} calibrated plant disease pathology profiles`);

    const scan = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/disease-detection',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { sampleId: 'potato_late_blight', cropHint: 'Potato' });

    assert(scan.statusCode === 200, 'Disease classifier responded HTTP 200 OK');
    assert(scan.body.result.diseaseName.includes('Late Blight'), `Diagnosed: ${scan.body.result.diseaseName} (${Math.round(scan.body.result.confidence * 100)}% Confidence)`);
    assert(scan.body.result.organicTreatments.length > 0, `Organic remedies provided (${scan.body.result.organicTreatments.length} prescriptions)`);
    assert(scan.body.result.chemicalControls.length > 0, `Chemical dosages provided (${scan.body.result.chemicalControls.length} prescriptions)`);
  } catch (err) {
    assert(false, `Disease test failed: ${err.message}`);
  }

  // -------------------------------------------------------------
  // TEST 4: SMART EVAPOTRANSPIRATION IRRIGATION & IOT PUMP
  // -------------------------------------------------------------
  console.log('\n💧 [4/8] Testing Smart Irrigation & IoT Pump Controller...');
  try {
    const irr = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/irrigation-advisory',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      soilMoisture: 38,
      cropType: 'Wheat',
      cropStage: 'vegetative',
      soilType: 'Loamy',
      ambientTemp: 31,
      humidity: 40,
      rainForecastMm: 0
    });

    assert(irr.body.advice.irrigationRequired === true, 'Precision engine accurately flagged water deficit for 38% moisture');
    assert(irr.body.advice.recommendedDurationMinutes > 0, `Calculated optimal run duration: ${irr.body.advice.recommendedDurationMinutes} minutes`);
    assert(irr.body.advice.waterSavedLiters > 0, `Water conservation model projected: ${irr.body.advice.waterSavedLiters.toLocaleString()} Liters saved vs flood irrigation`);

    // Test IoT Pump activation
    const pump = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/pump-control',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { turnOn: true });
    assert(pump.body.pumpStatus === true, 'Smart IoT drip irrigation pump triggered ON via REST API');
  } catch (err) {
    assert(false, `Irrigation test failed: ${err.message}`);
  }

  // -------------------------------------------------------------
  // TEST 5: ML CROP SUITABILITY & YIELD PREDICTOR
  // -------------------------------------------------------------
  console.log('\n🌱 [5/8] Testing ML Crop Recommender & Yield Engine...');
  try {
    const crop = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/crop-recommendation',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      nitrogen: 120,
      phosphorus: 60,
      potassium: 45,
      ph: 6.8,
      soilType: 'Alluvial / Loamy',
      season: 'rabi'
    });

    assert(crop.body.topRecommendations.length > 0, `Generated ${crop.body.topRecommendations.length} ranked crop recommendations`);
    const topCrop = crop.body.topRecommendations[0];
    assert(Boolean(topCrop.name && topCrop.matchPercentage), `Top Match: ${topCrop.name} (${topCrop.matchPercentage}% Suitability)`);
    assert(topCrop.predictedYield > 0, `Predicted Yield: ${topCrop.predictedYield} ${topCrop.unit}`);
    assert(topCrop.estimatedGrossIncome > 0, `Estimated Gross Income: ₹${topCrop.estimatedGrossIncome.toLocaleString()}/Acre`);
  } catch (err) {
    assert(false, `Crop recommender failed: ${err.message}`);
  }

  // -------------------------------------------------------------
  // TEST 6: MULTILINGUAL AI VOICE & CHAT AGRONOMIST
  // -------------------------------------------------------------
  console.log('\n🗣️ [6/8] Testing Multilingual AI Agronomist (Bhojpuri, Hindi, English)...');
  try {
    // English
    const enChat = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/assistant-chat',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { query: 'Why are leaves yellow?', language: 'en' });
    assert(enChat.statusCode === 200 && enChat.body.answer.length > 10, 'English AI Agronomist response verified');

    // Bhojpuri
    const bhoChat = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/assistant-chat',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { query: 'पत्ता पियर काहे हो रहल बा?', language: 'bho' });
    assert(bhoChat.statusCode === 200 && bhoChat.body.answer.includes('खाद') || bhoChat.body.answer.includes('पत्ता'), `Bhojpuri AI Agronomist response verified: "${bhoChat.body.answer.slice(0, 75)}..."`);

    // Hindi
    const hiChat = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/assistant-chat',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { query: 'ड्रिप सिंचाई सब्सिडी', language: 'hi' });
    assert(hiChat.statusCode === 200 && hiChat.body.answer.includes('सब्सिडी') || hiChat.body.answer.includes('सिंचाई'), `Hindi AI Agronomist response verified: "${hiChat.body.answer.slice(0, 75)}..."`);
  } catch (err) {
    assert(false, `Multilingual AI test failed: ${err.message}`);
  }

  // -------------------------------------------------------------
  // TEST 7: ADMIN / AGRICULTURE OFFICER COMMAND CENTER
  // -------------------------------------------------------------
  console.log('\n🛡️ [7/8] Testing Admin Control Room & Farm Directory...');
  try {
    const admin = await request({ hostname: 'localhost', port: 5000, path: '/api/admin/overview', method: 'GET' });
    assert(admin.statusCode === 200, 'Admin Overview endpoint responded HTTP 200 OK');
    assert(admin.body.stats.totalMonitoredFarms >= 1000, `Admin tracking ${admin.body.stats.totalMonitoredFarms} connected farms across districts`);
    assert(admin.body.stats.activeIoTNodes >= 3000, `Telemetry live on ${admin.body.stats.activeIoTNodes} active IoT sensor nodes`);

    // Register a new farm plot
    const newPlot = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/admin/farms',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: "Kisan Adarsh Farm Block D",
      farmer: "Rameshwar Prasad",
      location: "Indore Rural",
      crop: "Soybean",
      areaAcres: 4.5
    });
    assert(newPlot.body.success === true, `Admin successfully registered new farm plot for ${newPlot.body.farm.farmer}`);
  } catch (err) {
    assert(false, `Admin test failed: ${err.message}`);
  }

  // -------------------------------------------------------------
  // TEST 8: REAL-TIME EMERGENCY BROADCAST & MANDI PRICE SYNC
  // -------------------------------------------------------------
  console.log('\n🔄 [8/8] Testing Real-Time Admin ➔ Farmer Synchronization...');
  try {
    // 1. Admin broadcasts an emergency alert
    const testAlertTitle = `Locust Swarm Warning #${Date.now().toString().slice(-4)}`;
    const bc = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/admin/broadcast-advisory',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      title: testAlertTitle,
      message: "Swarm sighted 15km West. Keep sprayers ready with Chlorpyrifos.",
      level: "critical",
      issuer: "Krishi Vigyan Kendra (KVK)"
    });
    assert(bc.body.success === true, 'Admin dispatched emergency broadcast advisory');

    // 2. Farmer dashboard receives alert instantly
    const farmerDash = await request({ hostname: 'localhost', port: 5000, path: '/api/dashboard', method: 'GET' });
    const received = farmerDash.body.broadcasts.some(b => b.title === testAlertTitle);
    assert(received === true, `Real-time synchronization verified: Farmer Dashboard received "${testAlertTitle}"`);

    // 3. Admin updates Mandi price
    const newPrice = 2580;
    const mandiUpdate = await request({
      hostname: 'localhost',
      port: 5000,
      path: '/api/admin/update-mandi',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      commodityId: 'wheat',
      newPrice: newPrice,
      newRecommendation: 'HOLD',
      newNote: 'Record export orders recorded at regional Mandi.'
    });
    assert(mandiUpdate.body.success === true, `Admin updated Wheat price to ₹${newPrice}/q`);

    // 4. Verify Market Intelligence feed updated
    const market = await request({ hostname: 'localhost', port: 5000, path: '/api/market-intelligence?commodityId=wheat', method: 'GET' });
    assert(market.body.item.currentPrice === newPrice, `Farmer Market Intelligence synchronized: Current Price ₹${market.body.item.currentPrice}/q`);
  } catch (err) {
    assert(false, `Sync test failed: ${err.message}`);
  }

  // -------------------------------------------------------------
  // TEST SUMMARY REPORT
  // -------------------------------------------------------------
  console.log('\n===============================================================');
  console.log(`🏁 TEST SUITE COMPLETED: ${passedTests}/${totalTests} TESTS PASSED (${Math.round((passedTests / totalTests) * 100)}%)`);
  console.log('===============================================================');

  if (passedTests === totalTests) {
    console.log('🌟 STATUS: ALL SYSTEMS 100% OPERATIONAL & VERIFIED FOR HACKATHON DEMO!');
  } else {
    console.log('⚠️ WARNING: SOME TESTS FAILED. PLEASE CHECK LOGS ABOVE.');
  }
}

runFullWebsiteTests().catch(console.error);
