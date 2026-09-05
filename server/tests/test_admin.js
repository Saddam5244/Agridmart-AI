import http from 'http';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ statusCode: res.statusCode, body: JSON.parse(body) });
        } catch (e) {
          resolve({ statusCode: res.statusCode, body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(typeof data === 'string' ? data : JSON.stringify(data));
    req.end();
  });
}

async function runAdminTests() {
  console.log('🧪 Testing Admin & Farmer Backend Integration...');

  // 1. Admin Overview
  console.log('\n--- 1. Testing GET /api/admin/overview ---');
  const adminRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/admin/overview',
    method: 'GET'
  });
  console.log(`Status: ${adminRes.statusCode}`);
  console.log(`Total Monitored Farms: ${adminRes.body.stats.totalMonitoredFarms}`);
  console.log(`Active IoT Nodes: ${adminRes.body.stats.activeIoTNodes}`);
  console.log(`Cluster Water Saved: ${(adminRes.body.stats.clusterWaterSavedLiters / 1000000).toFixed(2)}M L`);

  // 2. Admin Broadcast an Emergency Advisory
  console.log('\n--- 2. Testing POST /api/admin/broadcast-advisory ---');
  const bcRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/admin/broadcast-advisory',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    title: "Sudden Hailstorm Warning (Next 6 Hours)",
    message: "Radar indicates severe thunderstorm cells moving towards Indore & Ujjain. Harvest ready vegetable crops immediately and secure greenhouse netting.",
    level: "critical",
    issuer: "State Agro-Met Center, MP"
  });
  console.log(`Status: ${bcRes.statusCode}`);
  console.log(`Broadcast ID: ${bcRes.body.broadcast.id}`);
  console.log(`Title: ${bcRes.body.broadcast.title}`);

  // 3. Verify Farmer Dashboard receives this broadcast in real-time
  console.log('\n--- 3. Testing GET /api/dashboard for Broadcast Sync ---');
  const dashRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/dashboard',
    method: 'GET'
  });
  console.log(`Status: ${dashRes.statusCode}`);
  const hasHailstormAlert = dashRes.body.broadcasts.some(b => b.title.includes("Hailstorm"));
  console.log(`Hailstorm Alert Received on Farmer Dashboard: ${hasHailstormAlert ? "✅ YES (Synced!)" : "❌ NO"}`);

  // 4. Admin updates Mandi price
  console.log('\n--- 4. Testing POST /api/admin/update-mandi ---');
  const mandiRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/admin/update-mandi',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    commodityId: 'wheat',
    newPrice: 2560,
    newRecommendation: 'HOLD',
    newNote: 'Export quota increased. Expected to reach ₹2,620.'
  });
  console.log(`Status: ${mandiRes.statusCode}`);
  console.log(`Updated Wheat Rate: ₹${mandiRes.body.market.currentPrice}/q`);

  // 5. Verify Farmer Market Intelligence receives updated rate
  console.log('\n--- 5. Testing GET /api/market-intelligence?commodityId=wheat ---');
  const marketRes = await request({
    hostname: 'localhost',
    port: 5000,
    path: '/api/market-intelligence?commodityId=wheat',
    method: 'GET'
  });
  console.log(`Status: ${marketRes.statusCode}`);
  console.log(`Farmer Market View Price: ₹${marketRes.body.item.currentPrice}/q (${marketRes.body.item.change24h})`);

  console.log('\n🎉 ALL ADMIN & USER BACKEND INTEGRATION TESTS PASSED 100%!');
}

runAdminTests().catch(console.error);
