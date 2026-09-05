import http from 'http';

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

async function testUPLocations() {
  console.log("=================================================================");
  console.log("🌦️ TESTING WEATHER FOR LUCKNOW, KANPUR & KANPUR DEHAT");
  console.log("=================================================================\n");

  let passed = 0;
  let total = 0;

  function assert(condition, name, detail = "") {
    total++;
    if (condition) {
      console.log(`✅ [PASS] ${name}`);
      if (detail) console.log(`   ↳ ${detail}\n`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${name}`);
      if (detail) console.error(`   ↳ Detail: ${detail}\n`);
    }
  }

  // 1. Test Lucknow Live Weather
  const lko = await get('/api/weather/live?lat=26.8467&lon=80.9462&city=Lucknow,%20UP');
  assert(
    Boolean(lko?.current?.temperature !== undefined),
    "Lucknow Live Weather",
    `Temp: ${lko?.current?.temperature}°C | Humidity: ${lko?.current?.humidity}% | Condition: ${lko?.current?.condition}`
  );

  // 2. Test Kanpur Nagar Live Weather
  const knp = await get('/api/weather/live?lat=26.4499&lon=80.3319&city=Kanpur,%20UP');
  assert(
    Boolean(knp?.current?.temperature !== undefined),
    "Kanpur Nagar Live Weather",
    `Temp: ${knp?.current?.temperature}°C | Humidity: ${knp?.current?.humidity}% | Condition: ${knp?.current?.condition}`
  );

  // 3. Test Kanpur Dehat Live Weather
  const knd = await get('/api/weather/live?lat=26.4357&lon=79.9507&city=Kanpur%20Dehat,%20UP');
  assert(
    Boolean(knd?.current?.temperature !== undefined),
    "Kanpur Dehat Live Weather",
    `Temp: ${knd?.current?.temperature}°C | Humidity: ${knd?.current?.humidity}% | 7-Day Forecast: ${knd?.forecast7Day?.length} days`
  );

  // 4. Test Search for Kanpur Dehat
  const search = await get('/api/weather/search?q=Kanpur');
  assert(
    search?.results?.length > 0,
    "Search 'Kanpur' returns geographic coordinates",
    `Found ${search?.results?.length} results: ${search?.results?.map(r => r.name).join(', ')}`
  );

  console.log(`=================================================================`);
  console.log(`🏁 TEST RESULTS: ${passed}/${total} TESTS PASSED (${Math.round((passed/total)*100)}%)`);
  console.log(`=================================================================`);
}

testUPLocations().catch(console.error);
