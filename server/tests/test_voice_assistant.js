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

async function testVoiceAssistant() {
  console.log("=================================================================");
  console.log("🎙️ TESTING MULTILINGUAL VOICE ASSISTANT & VOICE-TO-ACTION");
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

  // 1. Hindi Voice Query (Yellow Rust / Disease)
  const hiRes = await post('/api/voice-copilot/action', {
    prompt: "गेहूं के पत्ते पीले हो रहे हैं क्या दवा डालें?",
    language: "hi"
  });
  assert(hiRes?.speechText && (hiRes.speechText.includes("पीला") || hiRes.speechText.includes("प्रोपिकोनाजोल")), "Hindi voice response for Yellow Rust");

  // 2. Bhojpuri Query
  const bhoRes = await post('/api/voice-copilot/action', {
    prompt: "पत्ता पियर भइला प का दवाई छिड़कीं?",
    language: "bho"
  });
  assert(bhoRes?.speechText && bhoRes.speechText.includes("पियर"), "Bhojpuri voice response for Leaf Yellowing");

  // 3. Hinglish Query (Latin alphabet)
  const hinglishRes = await post('/api/voice-copilot/action', {
    prompt: "Mere wheat ke leaves yellow ho rahe hain, kya spray karun?",
    language: "hi"
  });
  assert(hinglishRes?.speechText && hinglishRes.speechText.includes("पीला"), "Hinglish voice query resolution");

  // 4. Voice-to-Action (IoT Pump Trigger)
  const pumpRes = await post('/api/voice-copilot/action', {
    prompt: "Kal subah khet me 35 minute pani chala do pump start karo",
    language: "hi"
  });
  assert(pumpRes?.actionExecuted === true && pumpRes?.actionType === "IOT_PUMP_SCHEDULED", "Voice-to-Action triggers IoT Pump");
  assert(pumpRes?.speechText && pumpRes.speechText.includes("स्वीकार"), "Spoken confirmation for IoT pump activation");

  // 5. Fertilizer Dosing Query (Punjabi)
  const paRes = await post('/api/voice-copilot/action', {
    prompt: "ਕਣਕ ਵਿੱਚ ਯੂਰੀਆ ਖਾਦ ਕਿੰਨੀ ਪਾਈਏ?",
    language: "pa"
  });
  assert(paRes?.speechText && paRes.speechText.includes("ਯੂਰੀਆ"), "Punjabi voice response for Fertilizer dosage");

  // 6. Mandi Price Query (Marathi)
  const mrRes = await post('/api/voice-copilot/action', {
    prompt: "गव्हाचा आजचा बाजार भाव काय आहे?",
    language: "mr"
  });
  assert(mrRes?.speechText && mrRes.speechText.includes("गहू"), "Marathi voice response for Mandi Rates");

  // 7. Govt Scheme Query (Gujarati)
  const guRes = await post('/api/voice-copilot/action', {
    prompt: "પીએમ કિસાન યોજના અને સબસિડી વિશે જણાવો",
    language: "gu"
  });
  assert(guRes?.speechText && guRes.speechText.includes("પીએમ-કિસાન"), "Gujarati voice response for Schemes");

  // 8. Bengali Query (Bengali script)
  const bnRes = await post('/api/voice-copilot/action', {
    prompt: "জমিতে ইউরিয়া সার কিভাবে দেব?",
    language: "bn"
  });
  assert(bnRes?.speechText && bnRes.speechText.includes("ইউরিয়া"), "Bengali voice response for Fertilizer");

  // 9. Tamil Query (Tamil script)
  const taRes = await post('/api/voice-copilot/action', {
    prompt: "இலைகள் மஞ்சள் நிறமாக மாறினால் என்ன மருந்து தெளிக்க வேண்டும்?",
    language: "ta"
  });
  assert(taRes?.speechText && taRes.speechText.includes("இலை"), "Tamil voice response for Yellow leaves");

  // 10. Telugu Query (Telugu script)
  const teRes = await post('/api/voice-copilot/action', {
    prompt: "గోధుమ పంటలో నీరు ఎప్పుడు పెట్టాలి?",
    language: "te"
  });
  assert(teRes?.speechText && teRes.speechText.includes("సాగునీరు"), "Telugu voice response for Irrigation");

  console.log(`\n=================================================================`);
  console.log(`🏁 VOICE ASSISTANT TEST: ${passed}/${total} TESTS PASSED (${Math.round((passed/total)*100)}%)`);
  console.log(`=================================================================`);
}

testVoiceAssistant().catch(console.error);
