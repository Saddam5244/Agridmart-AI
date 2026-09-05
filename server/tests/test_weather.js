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

async function testWeather() {
  console.log("=================================================================");
  console.log("🌦️ TESTING LIVE REAL-TIME WEATHER FORECAST & AGRO-METEOROLOGY");
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

  // 1. Test Live Weather for Indore
  const indoreWeather = await get('/api/weather/live?lat=22.7196&lon=75.8577&city=Indore');
  assert(Boolean(indoreWeather?.current?.temperature !== undefined), `Live Temperature retrieved: ${indoreWeather?.current?.temperature}°C`);
  assert(Boolean(indoreWeather?.current?.humidity !== undefined), `Live Relative Humidity retrieved: ${indoreWeather?.current?.humidity}%`);
  assert(Boolean(indoreWeather?.current?.condition), `Live Weather condition: ${indoreWeather?.current?.condition}`);
  assert(indoreWeather?.forecast7Day?.length === 7, `7-Day Day-by-Day Forecast available (Length: ${indoreWeather?.forecast7Day?.length})`);
  assert(Boolean(indoreWeather?.agroAdvisory?.spraying?.status), `Agro-Meteorology Spraying Condition: ${indoreWeather?.agroAdvisory?.spraying?.status}`);
  assert(Boolean(indoreWeather?.agroAdvisory?.irrigation?.status), `Agro-Meteorology Irrigation Advisory: ${indoreWeather?.agroAdvisory?.irrigation?.status}`);

  // 2. Test City Geocode Search
  const searchRes = await get('/api/weather/search?q=Patna');
  assert(searchRes?.results?.length > 0, `City Search for 'Patna' returned ${searchRes?.results?.length} location results`);
  assert(searchRes?.results?.[0]?.name === "Patna", "First search result matches Patna");

  // 3. Test Live Weather for Patna coordinates
  if (searchRes?.results?.[0]) {
    const p = searchRes.results[0];
    const patnaWeather = await get(`/api/weather/live?lat=${p.latitude}&lon=${p.longitude}&city=${encodeURIComponent(p.displayName)}`);
    assert(Boolean(patnaWeather?.current?.temperature !== undefined), `Patna Live Temperature: ${patnaWeather?.current?.temperature}°C`);
  }

  console.log(`\n=================================================================`);
  console.log(`🏁 WEATHER TEST RESULTS: ${passed}/${total} TESTS PASSED (${Math.round((passed/total)*100)}%)`);
  console.log(`=================================================================`);
}

testWeather().catch(console.error);
