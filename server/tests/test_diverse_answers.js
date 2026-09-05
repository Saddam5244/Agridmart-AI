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

async function verifyDiverseAnswers() {
  console.log("==================================================");
  console.log("🧪 TESTING UNIQUE & DIVERSE ANSWERS ACROSS CROPS");
  console.log("==================================================");

  const testQueries = [
    { q: "टमाटर में फल छेदक का क्या इलाज है?", check: "कोराजन" },
    { q: "धान में तना छेदक के लिए क्या डालें?", check: "कार्टाप" },
    { q: "सरसों में माहूं की रोकथाम कैसे करें?", check: "माहूं" },
    { q: "आलू में पछेती झुलसा का क्या उपचार है?", check: "रिडोमिल" },
    { q: "कपास में गुलाबी सुंडी कैसे रोकें?", check: "गुलाबी सुंडी" },
    { q: "मिर्च में पत्ती मरोड़ और थ्रिप्स का क्या इलाज है?", check: "थ्रिप्स" },
    { q: "भारत में सबसे ज्यादा खेती कहां होती है?", check: "उत्तर प्रदेश" },
    { q: "गाय भैंस का दूध और फैट कैसे बढ़ाएं?", check: "मिनरल" },
    { q: "प्राकृतिक जीवामृत कैसे बनाएं?", check: "जीवामृत" },
    { q: "पीएम किसान और सोलर पंप योजना क्या है?", check: "सोलर पंप" },
    { q: "खेत में 25 मिनट पानी चला दो", check: "25 मिनट" },
    { q: "IPL 2026 cricket score", check: "AI कृषि सलाहकार" }
  ];

  const answers = new Set();

  for (let i = 0; i < testQueries.length; i++) {
    const { q, check } = testQueries[i];
    const res = await postJson('/api/voice-copilot/action', { prompt: q, language: "hi" });
    const text = res.answer || res.speechText || "";
    
    // Check if the answer is duplicated
    const isDuplicate = answers.has(text);
    answers.add(text);

    const hasExpectedKeyword = text.includes(check);
    const status = hasExpectedKeyword && !isDuplicate ? "✅ PASS" : "❌ FAIL";
    
    console.log(`${status} [${i+1}/${testQueries.length}] Query: "${q}"`);
    console.log(`   ➔ Action: ${res.actionRecommendation || res.action || res.poweredBy}`);
    console.log(`   ➔ Unique Answer Preview: ${text.slice(0, 100).replace(/\n/g, ' ')}...`);
    console.log("--------------------------------------------------");
  }

  console.log(`🎯 TOTAL UNIQUE RESPONSES: ${answers.size} / ${testQueries.length}`);
  console.log("==================================================");
}

verifyDiverseAnswers();
