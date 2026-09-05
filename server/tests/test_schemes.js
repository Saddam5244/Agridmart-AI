import http from 'http';

function request(url, options = {}, data = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = http.request(reqOptions, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log("===============================================================");
  console.log("🏛️ AGRISMART AI — GOVERNMENT SCHEMES & LAND POLICIES TEST SUITE");
  console.log("===============================================================");

  let passed = 0;
  let total = 0;

  function assert(cond, msg) {
    total++;
    if (cond) {
      console.log(`  ✅ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${msg}`);
    }
  }

  try {
    // Test 1: Full Schemes Directory
    console.log("\n📜 [1/5] Testing Government Schemes Directory API...");
    const res1 = await request('http://localhost:5000/api/schemes');
    assert(res1.status === 200, "GET /api/schemes returns 200 OK");
    assert(res1.data.schemes?.length >= 9, `Retrieved ${res1.data.schemes?.length} verified schemes`);
    const pmKisan = res1.data.schemes.find(s => s.id === 'pm-kisan');
    assert(pmKisan && pmKisan.officialPortalUrl === 'https://pmkisan.gov.in', "PM-KISAN has verified official URL");
    assert(pmKisan.documentsRequired?.length >= 3, "PM-KISAN has required documents checklist");

    // Test 2: Category Filtering
    console.log("\n💧 [2/5] Testing Category Filtering (Irrigation & Solar)...");
    const res2 = await request('http://localhost:5000/api/schemes?category=irrigation_solar');
    assert(res2.status === 200, "GET /api/schemes?category=irrigation_solar returns 200 OK");
    assert(res2.data.schemes?.length >= 2, "Filtered to irrigation & solar schemes (PMKSY, PM-KUSUM)");

    // Test 3: Search Query
    console.log("\n🔍 [3/5] Testing Search Query Engine...");
    const res3 = await request('http://localhost:5000/api/schemes?q=drone');
    assert(res3.status === 200, "GET /api/schemes?q=drone returns 200 OK");
    assert(res3.data.schemes?.some(s => s.name.includes("Mechanization") || s.name.includes("SMAM")), "Search found Agri-Drone & Machinery scheme");

    // Test 4: Yearly Policy Timeline
    console.log("\n📅 [4/5] Testing Yearly Chronological Policy & Land Bill Timeline...");
    const res4 = await request('http://localhost:5000/api/policies/timeline');
    assert(res4.status === 200, "GET /api/policies/timeline returns 200 OK");
    assert(res4.data.timeline?.length >= 9, `Timeline contains ${res4.data.timeline?.length} milestone policy acts`);
    assert(res4.data.timeline[0].year === 2026, "Latest policy begins in 2026 (Digital Agriculture Mission 2.0)");
    assert(res4.data.timeline[res4.data.timeline.length - 1].year === 1998, "Historical timeline spans back to 1998 (KCC Launch)");

    // Test 5: Admin Scheme & Gazette Publishing
    console.log("\n🛡️ [5/5] Testing Admin Gazette / Scheme Publishing...");
    const newSchemePayload = {
      name: "MP Kisan Kalyan Yojana 2026",
      nameHi: "मुख्यमंत्री किसान कल्याण योजना 2026",
      category: "income_support",
      benefitAmount: "Additional ₹6,000 / Year State Grant (Total ₹12,000 with PM-KISAN)",
      shortDesc: "Madhya Pradesh state top-up grant directly transferred in two installments to PM-KISAN registered landholders.",
      officialPortalUrl: "https://saara.mp.gov.in"
    };
    const res5 = await request('http://localhost:5000/api/admin/schemes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, newSchemePayload);
    assert(res5.status === 200, "POST /api/admin/schemes returned 200 OK");
    assert(res5.data.scheme?.name === "MP Kisan Kalyan Yojana 2026", "New scheme registered in database");

    // Verify dynamic update in farmer schemes list
    const res6 = await request('http://localhost:5000/api/schemes?q=Kalyan');
    assert(res6.data.schemes?.length >= 1, "Farmer Schemes Directory dynamically reflects published state scheme");

    console.log("\n===============================================================");
    console.log(`🏁 TEST RESULTS: ${passed}/${total} TESTS PASSED (${Math.round(passed/total*100)}%)`);
    console.log("===============================================================");

  } catch (err) {
    console.error("Test execution error:", err);
  }
}

runTests();
