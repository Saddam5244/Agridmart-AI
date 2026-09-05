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
          'Content-Length': Buffer.byteLength(data),
        },
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

async function testPreferredLanguages() {
  console.log("=================================================================");
  console.log("🗣️ TESTING AI ASSISTANT: PREFERRED LANGUAGE ADAPTATION & SPEECH");
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

  // 1. User preferred language = Punjabi (pa) -> Ask in English/Roman
  const paRes = await post('/api/voice-copilot/action', {
    prompt: "How much fertilizer to use for wheat?",
    language: "pa"
  });
  assert(
    Boolean(paRes.speechText && (paRes.speechText.includes("ਕਣਕ") || paRes.speechText.includes("ਯੂਰੀਆ") || paRes.speechText.includes("ਡੀਏਪੀ"))),
    "Punjabi Preferred Language: English Prompt ➔ Punjabi Spoken Response",
    paRes.speechText?.slice(0, 90) + "..."
  );

  // 2. User preferred language = Marathi (mr) -> Ask in Hinglish
  const mrRes = await post('/api/voice-copilot/action', {
    prompt: "peeli patti ka ilaj kya hai",
    language: "mr"
  });
  assert(
    Boolean(mrRes.speechText && (mrRes.speechText.includes("पिवळी") || mrRes.speechText.includes("तांबेरा") || mrRes.speechText.includes("फवारणी"))),
    "Marathi Preferred Language: Hinglish Prompt ➔ Marathi Spoken Response",
    mrRes.speechText?.slice(0, 90) + "..."
  );

  // 3. User preferred language = Gujarati (gu) -> Ask in English
  const guRes = await post('/api/voice-copilot/action', {
    prompt: "organic farming best practices",
    language: "gu"
  });
  assert(
    Boolean(guRes.speechText && (guRes.speechText.includes("ખેતી") || guRes.speechText.includes("ખાતર") || guRes.speechText.includes("જીવામૃત"))),
    "Gujarati Preferred Language: English Prompt ➔ Gujarati Spoken Response",
    guRes.speechText?.slice(0, 90) + "..."
  );

  // 4. User preferred language = Bengali (bn) -> Ask in English
  const bnRes = await post('/api/voice-copilot/action', {
    prompt: "irrigation schedule for wheat",
    language: "bn"
  });
  assert(
    Boolean(bnRes.speechText && (bnRes.speechText.includes("সেচ") || bnRes.speechText.includes("গম"))),
    "Bengali Preferred Language: English Prompt ➔ Bengali Spoken Response",
    bnRes.speechText?.slice(0, 90) + "..."
  );

  // 5. User preferred language = Telugu (te) -> Ask in English
  const teRes = await post('/api/voice-copilot/action', {
    prompt: "where is maximum agriculture in India",
    language: "te"
  });
  assert(
    Boolean(teRes.speechText && (teRes.speechText.includes("వ్యవసాయం") || teRes.speechText.includes("ఉత్తరప్రదేశ్"))),
    "Telugu Preferred Language: English Prompt ➔ Telugu Spoken Response",
    teRes.speechText?.slice(0, 90) + "..."
  );

  // 6. User preferred language = Tamil (ta) -> Ask in English
  const taRes = await post('/api/voice-copilot/action', {
    prompt: "where is maximum agriculture in India",
    language: "ta"
  });
  assert(
    Boolean(taRes.speechText && (taRes.speechText.includes("விவசாயம்") || taRes.speechText.includes("உத்தரபிரதேசம்"))),
    "Tamil Preferred Language: English Prompt ➔ Tamil Spoken Response",
    taRes.speechText?.slice(0, 90) + "..."
  );

  // 7. User preferred language = Kannada (kn) -> Ask in English
  const knRes = await post('/api/voice-copilot/action', {
    prompt: "yellow rust disease spray",
    language: "kn"
  });
  assert(
    Boolean(knRes.speechText && (knRes.speechText.includes("ಹಳದಿ") || knRes.speechText.includes("ರೋಗ"))),
    "Kannada Preferred Language: English Prompt ➔ Kannada Spoken Response",
    knRes.speechText?.slice(0, 90) + "..."
  );

  // 8. User preferred language = Hindi (hi) -> Ask in Hinglish
  const hiRes = await post('/api/voice-copilot/action', {
    prompt: "sbse jaada kheti kaha hoti hain",
    language: "hi"
  });
  assert(
    Boolean(hiRes.speechText && (hiRes.speechText.includes("उत्तर प्रदेश") || hiRes.speechText.includes("मध्य प्रदेश"))),
    "Hindi Preferred Language: Hinglish Prompt ➔ Pure Hindi Spoken Response",
    hiRes.speechText?.slice(0, 90) + "..."
  );

  // 9. User preferred language = Bhojpuri (bho) -> Ask in Hinglish
  const bhoRes = await post('/api/voice-copilot/action', {
    prompt: "sbse jaada kheti kaha hoti hain",
    language: "bho"
  });
  assert(
    Boolean(bhoRes.speechText && (bhoRes.speechText.includes("उत्तर प्रदेश") || bhoRes.speechText.includes("होला"))),
    "Bhojpuri Preferred Language: Hinglish Prompt ➔ Pure Bhojpuri Spoken Response",
    bhoRes.speechText?.slice(0, 90) + "..."
  );

  // 10. Out-of-Domain in preferred language (e.g. Marathi)
  const oodMr = await post('/api/voice-copilot/action', {
    prompt: "who is Salman Khan",
    language: "mr"
  });
  assert(
    Boolean(oodMr.speechText && oodMr.speechText.includes("कृषी सल्लागार")),
    "Out-of-Domain Guardrail in Preferred Language (Marathi)",
    oodMr.speechText?.slice(0, 90) + "..."
  );

  console.log(`=================================================================`);
  console.log(`🏁 TEST RESULTS: ${passed}/${total} TESTS PASSED (${Math.round((passed/total)*100)}%)`);
  console.log(`=================================================================`);
}

testPreferredLanguages().catch(console.error);
