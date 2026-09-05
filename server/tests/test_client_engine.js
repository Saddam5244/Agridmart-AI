import { resolveClientAgronomyQuery } from '../client/src/utils/agronomyKnowledgeClient.js';

const testQuestions = [
  "भारत में सबसे ज्यादा खेती कहां होती है?",
  "टमाटर में फल छेदक इल्ली और पत्ती मरोड़ रोग का इलाज?",
  "धान में तना छेदक के लिए क्या डालें?",
  "सरसों में माहूं की रोकथाम कैसे करें?",
  "आलू में पछेती झुलसा का क्या उपचार है?",
  "गेहूं में पीला रतुआ का इलाज?",
  "गाय भैंस का दूध कैसे बढ़ाएं?",
  "पीएम किसान और सोलर पंप योजना क्या है?",
  "खेत में 30 मिनट पानी चला दो"
];

console.log("==================================================");
console.log("🧪 TESTING CLIENT-SIDE AGRONOMY ENGINE & OPTIONS");
console.log("==================================================");

testQuestions.forEach((q, i) => {
  const res = resolveClientAgronomyQuery(q, "hi");
  console.log(`✅ [${i+1}/${testQuestions.length}] Query: "${q}"`);
  console.log(`   ➔ Options (${res.options.length}): ${res.options.map(o => o.label).join(' | ')}`);
});
console.log("==================================================");
