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

async function verifyAllFarmerQuestions() {
  console.log("==================================================");
  console.log("🌾 TESTING REAL-WORLD FARMER QUESTIONS ACROSS DOMAINS");
  console.log("==================================================");

  const testCases = [
    { q: "sbse jaada kheti kaha hoti hain", lang: "hi", check: "उत्तर प्रदेश" },
    { q: "wheat me peela patta ho raha hai kya spray kare", lang: "hi", check: "प्रोपीकोनाजोल" },
    { q: "1 acre gehu me kitna urea dale", lang: "hi", check: "यूरिया" },
    { q: "today mandi rate of wheat", lang: "en", check: "Mandi" },
    { q: "solar pump subsidy scheme", lang: "hi", check: "पीएम कुसुम" },
    { q: "khet me 20 minute pani chala do", lang: "hi", check: "20 मिनट" },
    { q: "who is messi", lang: "hi", check: "AI कृषि सलाहकार" }
  ];

  for (let i = 0; i < testCases.length; i++) {
    const { q, lang, check } = testCases[i];
    const res = await postJson('/api/voice-copilot/action', { prompt: q, language: lang });
    const ans = res.answer || res.speechText || "";
    const ok = ans.includes(check);
    console.log(`${ok ? '✅' : '❌'} [${i+1}/${testCases.length}] Query: "${q}" ➔ ${ok ? 'Passed (Found "' + check + '")' : 'Failed'}`);
    if (!ok) console.log("Response was:", ans);
  }
}

verifyAllFarmerQuestions();
