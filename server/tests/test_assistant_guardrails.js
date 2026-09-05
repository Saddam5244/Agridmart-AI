import { getAgronomistAnswer, isAgricultureDomain } from '../src/services/agronomistAI.js';

console.log("=================================================================");
console.log("🌾 TESTING AI ASSISTANT: DOMAIN GUARDRAILS & AGRICULTURE Q&A");
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

// 1. Test "sbse jaada kheti kaha hoti hain"
const q1 = "sbse jaada kheti kaha hoti hain";
const ans1 = getAgronomistAnswer(q1);
assert(
  ans1.answer.includes("उत्तर प्रदेश") || ans1.answer.includes("Uttar Pradesh"),
  "Handles 'sbse jaada kheti kaha hoti hain'",
  ans1.answer.split('\n')[0] + " | " + ans1.answer.split('\n')[1]
);

// 2. Test Hindi "भारत में सबसे ज्यादा खेती किस राज्य में होती है"
const q2 = "भारत में सबसे ज्यादा खेती किस राज्य में होती है";
const ans2 = getAgronomistAnswer(q2, "hi");
assert(
  ans2.answer.includes("उत्तर प्रदेश") && ans2.answer.includes("मध्य प्रदेश"),
  "Handles Hindi 'भारत में सबसे ज्यादा खेती किस राज्य में होती है'",
  ans2.answer.split('\n')[0]
);

// 3. Test Out-of-Domain question: "who is Salman Khan"
const q3 = "who is Salman Khan";
const ans3 = getAgronomistAnswer(q3, "en");
assert(
  ans3.isOutOfDomain === true && ans3.answer.includes("specialized AI Agronomist"),
  "Out-of-Domain Blocked: 'who is Salman Khan'",
  ans3.answer.split('\n')[0]
);

// 4. Test Out-of-Domain question: "write python code for calculator"
const q4 = "write python code for calculator";
const ans4 = getAgronomistAnswer(q4, "en");
assert(
  ans4.isOutOfDomain === true && ans4.answer.includes("specialized AI Agronomist"),
  "Out-of-Domain Blocked: 'write python code for calculator'",
  ans4.answer.split('\n')[0]
);

// 5. Test Out-of-Domain question in Hindi: "क्रिकेट मैच का स्कोर क्या है"
const q5 = "क्रिकेट मैच का स्कोर क्या है";
const ans5 = getAgronomistAnswer(q5, "hi");
assert(
  ans5.isOutOfDomain === true && ans5.answer.includes("समर्पित AI कृषि सलाहकार"),
  "Out-of-Domain Blocked in Hindi: 'क्रिकेट मैच का स्कोर क्या है'",
  ans5.answer.split('\n')[0]
);

// 6. Test In-Domain Farming question: "wheat me kitna urea daale"
const q6 = "wheat me kitna urea daale";
const ans6 = getAgronomistAnswer(q6);
assert(
  ans6.isOutOfDomain === false && (ans6.answer.includes("DAP") || ans6.answer.includes("यूरिया")),
  "In-Domain Farming: 'wheat me kitna urea daale'",
  ans6.answer.split('\n')[0]
);

// 7. Test In-Domain Farming question in Bhojpuri: "पत्ता पियर भइला प का दवाई छिड़कीं"
const q7 = "पत्ता पियर भइला प का दवाई छिड़कीं";
const ans7 = getAgronomistAnswer(q7, "bho");
assert(
  ans7.isOutOfDomain === false && (ans7.answer.includes("पत्ता पियर") || ans7.answer.includes("प्रोपिकोनाजोल")),
  "In-Domain Bhojpuri: 'पत्ता पियर भइला प का दवाई छिड़कीं'",
  ans7.answer.slice(0, 100) + "..."
);

// 8. Test In-Domain Farming question: "organic farming kaise kare"
const q8 = "organic farming kaise kare gobar khad";
const ans8 = getAgronomistAnswer(q8);
assert(
  ans8.isOutOfDomain === false && (ans8.answer.includes("जीवामृत") || ans8.answer.includes("गोबर")),
  "In-Domain Organic Farming: 'organic farming kaise kare'",
  ans8.answer.split('\n')[0]
);

console.log(`=================================================================`);
console.log(`🏁 ASSISTANT TEST RESULTS: ${passed}/${total} TESTS PASSED (${Math.round((passed/total)*100)}%)`);
console.log(`=================================================================`);
