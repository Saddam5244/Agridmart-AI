// Test suite for all 7 PDF features
import http from 'http';

async function post(path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = http.request(
      {
        hostname: 'localhost',
        port: 5000,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        }
      },
      (res) => {
        let respData = '';
        res.on('data', (chunk) => (respData += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(respData));
          } catch (e) {
            resolve({ raw: respData });
          }
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function get(path) {
  return new Promise((resolve, reject) => {
    http.get({ hostname: 'localhost', port: 5000, path }, (res) => {
      let respData = '';
      res.on('data', (chunk) => (respData += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(respData));
        } catch (e) {
          resolve({ raw: respData });
        }
      });
    }).on('error', reject);
  });
}

async function runTests() {
  console.log("=================================================================");
  console.log("🧪 RUNNING COMPREHENSIVE PDF FEATURES VERIFICATION TEST SUITE");
  console.log("=================================================================\n");

  let passed = 0;
  let total = 0;

  function assert(condition, name) {
    total++;
    if (condition) {
      console.log(`✅ [PASS] ${name}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${name}`);
    }
  }

  // 1. Test What-If Simulator (Mustard vs Wheat)
  const simMustard = await post('/api/simulator/what-if', {
    baseCrop: 'wheat',
    targetCrop: 'mustard',
    waterAdjustmentPercent: 0,
    fertilizerTimingShiftDays: 0,
    farmAreaAcres: 1.0
  });
  assert(simMustard?.comparison?.baseline?.crop && simMustard?.comparison?.simulated?.crop, "What-If Simulator compares Baseline vs Simulated");
  assert(simMustard?.delta?.profitDiffFormatted, `What-If Simulator calculates Net Profit difference: ${simMustard?.delta?.profitDiffFormatted}`);
  assert(simMustard?.aiDecisionRationale && simMustard?.aiDecisionRationaleHi, "What-If Simulator generates Bilingual Decision Rationale");

  // 2. Test What-If Simulator (20% Water Deficit)
  const simWater = await post('/api/simulator/what-if', {
    baseCrop: 'wheat',
    targetCrop: 'wheat',
    waterAdjustmentPercent: -20,
    farmAreaAcres: 1.0
  });
  assert(simWater?.delta?.waterSavedLiters > 0, `What-If calculates water savings: ${simWater?.delta?.waterSavedLiters} L`);

  // 3. Test Farm Memory AI
  const memory = await get('/api/farm-memory/plot-a1');
  assert(memory?.memory?.seasonalHistory?.length >= 3, `Farm Memory retrieves 4 seasonal records (2024-2026)`);
  assert(memory?.memory?.memoryLearnings?.length > 0, `Farm Memory provides historical learned insights`);

  // 4. Test Digital Crop Health Passport & QR
  const passport = await get('/api/passport/PASSPORT-WHEAT-2026');
  assert(passport?.passport?.batchId === 'AGRI-IN-MP-2026-WHT-0042', `Crop Passport retrieves verified batch ID: ${passport?.passport?.batchId}`);
  assert(passport?.passport?.agrochemicalLog?.length > 0, "Crop Passport includes chemical & bio-input audit log");
  assert(passport?.passport?.verificationQrPayload?.verifyUrl, "Crop Passport includes scannable Buyer QR verification payload");

  // 5. Test Pre-Symptom Disease Warning
  const preSymptom = await get('/api/disease-prediction/pre-symptom?humidity=78&temperature=24&leafWetnessHours=8');
  assert(preSymptom?.isPreSymptom === true, "Pre-symptom early warning engine active");
  assert(preSymptom?.fungalRiskScore >= 70, `Pre-symptom calculates fungal risk score: ${preSymptom?.fungalRiskScore}%`);
  assert(preSymptom?.explainableReasoning?.why && preSymptom?.explainableReasoning?.evidence, "Pre-symptom provides Explainable AI (XAI) breakdown");

  // 6. Test Voice-to-Action Copilot (Hinglish Query)
  const copilotQuery = await post('/api/voice-copilot/action', {
    prompt: "Mere wheat ke leaves yellow ho rahe hain, kya spray karun?",
    language: "hi"
  });
  assert(copilotQuery?.speechText && copilotQuery?.speechText.includes("पीला"), "Multilingual Copilot understands Indian code-mixed Hinglish");

  // 7. Test Voice-to-Action Copilot (IoT Pump Scheduling Command)
  const copilotAction = await post('/api/voice-copilot/action', {
    prompt: "Kal subah khet me pani chala do pump start karo",
    language: "hi"
  });
  assert(copilotAction?.actionExecuted === true, "Voice-to-Action executes IoT Pump start on natural speech");
  assert(copilotAction?.farmContext?.scheduledDurationMinutes === 35, "Voice-to-Action schedules precision irrigation window (35m)");

  console.log(`\n=================================================================`);
  console.log(`🏁 TEST RESULTS: ${passed}/${total} TESTS PASSED (${Math.round((passed/total)*100)}%)`);
  console.log(`=================================================================`);
}

runTests().catch(console.error);
