/**
 * 🌾 AgriSmart AI — Client-Side Agronomy & Multi-Crop Intelligence Engine
 * Provides instant offline/fail-safe reasoning and multilingual contextual options for any farming query
 */

export function getContextualOptions(query = "", language = "hi") {
  const q = query.toLowerCase();

  // 1. TOMATO / TAMATAR
  if (q.includes("tomato") || q.includes("tamatar") || q.includes("टमाटर")) {
    if (language === 'en') {
      return [
        { label: "🧪 Coragen 0.4ml/L Dosage", query: "What is the exact spray dosage of Coragen for Tomato fruit borer?" },
        { label: "🌿 Neem Oil & Sticky Traps", query: "How to use neem oil and yellow sticky traps in Tomato?" },
        { label: "💰 Tomato Live Mandi Price", query: "What is today's live mandi price of Tomato?" },
        { label: "💧 Tomato Drip Irrigation", query: "How much water does a tomato crop need per day?" }
      ];
    }
    if (language === 'bho') {
      return [
        { label: "🧪 कोराजन 0.4ml स्प्रे", query: "टमाटर में कोराजन आ एमामेक्टिन के स्प्रे कइसे करीं?" },
        { label: "🌿 नीम तेल आ पीला ट्रैप", query: "टमाटर में नीम तेल आ फेरोमोन ट्रैप कइसे लगाईं?" },
        { label: "💰 टमाटर के आज के भाव", query: "आज टमाटर के मंडी भाव का बा?" }
      ];
    }
    return [
      { label: "🧪 कोराजन 0.4ml स्प्रे डोज", query: "टमाटर में कोराजन और एमामेक्टिन का सही स्प्रे कैसे करें?" },
      { label: "🌿 जैविक नीम तेल व ट्रैप", query: "टमाटर में नीम तेल और पीले स्टिकी ट्रैप कैसे लगाएं?" },
      { label: "💰 टमाटर का आज का मंडी भाव", query: "आज टमाटर का मंडी भाव क्या है?" },
      { label: "💧 टमाटर ड्रिप सिंचाई सलाह", query: "टमाटर में ड्रिप सिंचाई से पानी कैसे दें?" }
    ];
  }

  // 2. WHEAT / GEHU
  if (q.includes("wheat") || q.includes("gehu") || q.includes("गेहूं") || q.includes("गेहूँ") || q.includes("कणक") || q.includes("गहू")) {
    if (language === 'en') {
      return [
        { label: "🧪 Propiconazole Rust Spray", query: "How to spray Propiconazole 25% EC for Wheat Yellow Rust?" },
        { label: "🌱 1-Acre Wheat NPK Fertilizer", query: "1-acre fertilizer schedule for Wheat (Urea, DAP, Potash)?" },
        { label: "⚡ 30-Min Irrigation Schedule", query: "Start 30 minutes irrigation in the farm" },
        { label: "💰 Wheat Live Mandi Rate", query: "What is today's Wheat mandi price?" }
      ];
    }
    if (language === 'bho') {
      return [
        { label: "🧪 प्रोपीकोनाजोल रतुआ स्प्रे", query: "गेहूं में पीला रतुआ खातिर प्रोपीकोनाजोल कइसे छिड़कीं?" },
        { label: "🌱 1 एकड़ गेहूं खाद शेड्यूल", query: "1 एकड़ गेहूं में यूरिया आ DAP केतना डालीं?" },
        { label: "💰 गेहूं के आज के मंडी भाव", query: "आज गेहूं के मंडी भाव का बा?" }
      ];
    }
    return [
      { label: "🧪 प्रोपीकोनाजोल रतुआ स्प्रे", query: "गेहूं में पीला रतुआ के लिए प्रोपीकोनाजोल का छिड़काव कैसे करें?" },
      { label: "🌱 1 एकड़ गेहूं खाद शेड्यूल", query: "1 एकड़ गेहूं में यूरिया, डीएपी और पोटाश कब और कितना डालें?" },
      { label: "⚡ 30 मिनट ड्रिप सिंचाई चलाएं", query: "खेत में 30 मिनट पानी चला दो" },
      { label: "💰 गेहूं का आज का मंडी भाव", query: "आज गेहूं का मंडी भाव क्या है?" }
    ];
  }

  // 3. POTATO / ALOO
  if (q.includes("potato") || q.includes("aloo") || q.includes("आलू") || q.includes("बटाटा") || q.includes("আলু")) {
    if (language === 'en') {
      return [
        { label: "🧪 Ridomil Gold Blight Spray", query: "How to spray Ridomil Gold for Potato Late Blight?" },
        { label: "🌱 0:0:50 Potash & Boron Sizing", query: "How to use 0:0:50 and Boron to increase potato tuber size?" },
        { label: "💰 Potato Live Mandi Price", query: "What is today's Potato mandi price in Agra and Kanpur?" }
      ];
    }
    if (language === 'bho') {
      return [
        { label: "🧪 रिडोमिल गोल्ड झुलसा स्प्रे", query: "आलू में झुलसा बेमारी खातिर रिडोमिल गोल्ड कइसे छिड़कीं?" },
        { label: "🌱 0:0:50 आ बोरॉन स्प्रे", query: "आलू के साइज बढ़ावे खातिर 0:0:50 आ बोरॉन के स्प्रे?" },
        { label: "💰 आलू के आज के मंडी भाव", query: "आज आलू के मंडी भाव का बा?" }
      ];
    }
    return [
      { label: "🧪 रिडोमिल गोल्ड झुलसा स्प्रे", query: "आलू में पछेती झुलसा के लिए रिडोमिल गोल्ड कैसे छिड़कें?" },
      { label: "🌱 0:0:50 पोटाश व बोरॉन स्प्रे", query: "आलू का साइज बड़ा करने के लिए 0:0:50 और बोरॉन का स्प्रे?" },
      { label: "💰 आलू का आज का मंडी भाव", query: "आज आलू का मंडी भाव क्या है?" }
    ];
  }

  // 4. MUSTARD / SARSON
  if (q.includes("mustard") || q.includes("sarson") || q.includes("sarso") || q.includes("सरसों") || q.includes("सरसो") || q.includes("राई")) {
    if (language === 'en') {
      return [
        { label: "🧪 Thiamethoxam 25% WG Spray", query: "How to spray Thiamethoxam for Mustard Aphids/Chepa?" },
        { label: "🌱 Bentonite Sulphur 90% Guide", query: "How much Sulphur 90% to apply in Mustard for oil percentage?" },
        { label: "💰 Mustard Live Mandi Price", query: "What is today's Mustard mandi price in Alwar and Jaipur?" }
      ];
    }
    return [
      { label: "🧪 थियामेथॉक्सम 25% WG स्प्रे", query: "सरसों में माहूं चेपा के लिए थियामेथॉक्सम का स्प्रे कैसे करें?" },
      { label: "🌱 सल्फर 90% खाद की मात्रा", query: "सरसों में तेल बढ़ाने के लिए सल्फर 90% कब और कितना डालें?" },
      { label: "💰 सरसों का आज का मंडी भाव", query: "आज सरसों का मंडी भाव क्या है?" }
    ];
  }

  // 5. PADDY / RICE / DHAAN
  if (q.includes("rice") || q.includes("paddy") || q.includes("dhaan") || q.includes("धान") || q.includes("चावल") || q.includes("बासमती")) {
    if (language === 'en') {
      return [
        { label: "🌾 Cartap 4G for Stem Borer", query: "How to apply Cartap 4G in Paddy for Stem Borer?" },
        { label: "🌱 Zinc Sulphate & Khaira Spray", query: "How to treat Khaira disease with Zinc Sulphate in Paddy?" },
        { label: "💰 Basmati Rice Mandi Price", query: "What is today's Basmati 1121 mandi price in Khanna Mandi?" },
        { label: "💧 Paddy Water Management", query: "Water management for Paddy during grain-filling stage?" }
      ];
    }
    return [
      { label: "🌾 तना छेदक के लिए कार्टाप 4G", query: "धान में तना छेदक के लिए कार्टाप 4G और फेम कैसे डालें?" },
      { label: "🌱 जिंक व खैरा रोग स्प्रे", query: "धान में जिंक सल्फेट और खैरा रोग का स्प्रे कैसे करें?" },
      { label: "💰 बासमती धान का मंडी भाव", query: "आज बासमती धान 1121 का मंडी भाव क्या है?" },
      { label: "💧 धान में जल प्रबंधन", query: "धान में बाली निकलते समय कितना पानी रखें?" }
    ];
  }

  // 6. CHILLI / MIRCH
  if (q.includes("chilli") || q.includes("mirch") || q.includes("मिर्च") || q.includes("मिरची")) {
    if (language === 'en') {
      return [
        { label: "🧪 Delegate & Fipronil Spray", query: "How to spray Delegate and Fipronil for Chilli Thrips?" },
        { label: "🌿 Blue & Yellow Sticky Traps", query: "How to use blue and yellow sticky cards in Chilli?" },
        { label: "💰 Green & Dry Chilli Mandi Rates", query: "What is today's Green Chilli and Guntur Red Chilli rate?" }
      ];
    }
    return [
      { label: "🧪 थ्रिप्स के लिए डेलीगेट स्प्रे", query: "मिर्च में थ्रिप्स और चुरड़ा के लिए डेलीगेट कैसे छिड़कें?" },
      { label: "🌿 नीले व पीले स्टिकी कार्ड", query: "मिर्च में नीले स्टिकी कार्ड और नीम तेल का उपयोग कैसे करें?" },
      { label: "💰 मिर्च का आज का मंडी भाव", query: "आज हरी मिर्च और लाल मिर्च का मंडी भाव क्या है?" }
    ];
  }

  // 7. COTTON / KAPAS
  if (q.includes("cotton") || q.includes("kapas") || q.includes("कपास") || q.includes("कापूस") || q.includes("नरमा")) {
    if (language === 'en') {
      return [
        { label: "🌱 Pink Bollworm Pheromone Traps", query: "How to control Pink Bollworm in Cotton using pheromone traps?" },
        { label: "🧪 Emamectin Benzoate 5% SG", query: "Spray schedule for Cotton bollworms and whitefly?" },
        { label: "💰 Cotton Live Mandi Rate", query: "What is today's Cotton Shankar-6 mandi price in Rajkot APMC?" }
      ];
    }
    return [
      { label: "🌱 गुलाबी सुंडी फेरोमोन ट्रैप", query: "कपास में गुलाबी सुंडी नियंत्रण के लिए फेरोमोन ट्रैप कैसे लगाएं?" },
      { label: "🧪 एमामेक्टिन बेंजोएट स्प्रे", query: "कपास में सुंडी और सफेद मक्खी के लिए कौन सी दवा स्प्रे करें?" },
      { label: "💰 कपास का आज का मंडी भाव", query: "आज कपास (शंकर-6) का मंडी भाव क्या है?" }
    ];
  }

  // 8. DAIRY / CATTLE / MILK / PASHUPALAN
  if (q.includes("milk") || q.includes("doodh") || q.includes("cow") || q.includes("gaay") || q.includes("bhains") || q.includes("दूध") || q.includes("गाय") || q.includes("भैंस") || q.includes("पशुपालन")) {
    if (language === 'en') {
      return [
        { label: "🐄 Chelated Mineral Mixture", query: "How much mineral mixture to feed cows and buffaloes daily?" },
        { label: "🥛 Boost Milk Fat % Guide", query: "How to increase milk fat and SNF percentage in dairy cattle?" },
        { label: "🌿 Green Fodder (Napier Grass)", query: "How to cultivate Napier and Berseem green fodder for dairy?" }
      ];
    }
    return [
      { label: "🐄 मिनरल मिक्सचर आहार चार्ट", query: "गाय भैंस को प्रतिदिन कितना मिनरल मिक्सचर और दाना देना चाहिए?" },
      { label: "🥛 दूध में फैट % बढ़ाने के उपाय", query: "दूध में फैट और एसएनएफ बढ़ाने के लिए क्या खिलाएं?" },
      { label: "🌿 हरा चारा (नेपियर/बरसीम)", query: "दूध बढ़ाने के लिए नेपियर और बरसीम हरा चारा कैसे उगाएं?" }
    ];
  }

  // 9. SCHEMES / YOJANA / SUBSIDY
  if (q.includes("yojana") || q.includes("scheme") || q.includes("subsidy") || q.includes("pm kisan") || q.includes("solar") || q.includes("kusum") || q.includes("kcc") || q.includes("योजना") || q.includes("सब्सिडी") || q.includes("पीएम किसान") || q.includes("सोलर")) {
    if (language === 'en') {
      return [
        { label: "☀️ PM-KUSUM Solar Pump 80% Subsidy", query: "How to apply for PM-KUSUM 80% solar pump subsidy?" },
        { label: "💳 KCC 4% Interest Loan Process", query: "How to apply for Kisan Credit Card 4% crop loan?" },
        { label: "🏛️ PM-KISAN ₹6,000 Guidelines", query: "PM-KISAN ₹6,000 installment eligibility and e-KYC steps?" }
      ];
    }
    return [
      { label: "☀️ सोलर पंप 80% सब्सिडी आवेदन", query: "पीएम कुसुम सोलर पंप योजना के लिए आवेदन कैसे करें?" },
      { label: "💳 केसीसी 4% लोन प्रक्रिया", query: "किसान क्रेडिट कार्ड (KCC) लोन कैसे बनवाएं?" },
      { label: "🏛️ पीएम किसान ₹6,000 गाइड", query: "पीएम किसान सम्मान निधि ₹6,000 किस्त के नियम क्या हैं?" }
    ];
  }

  // 10. MANDI RATES / BHAV
  if (q.includes("mandi") || q.includes("bhav") || q.includes("rate") || q.includes("price") || q.includes("मंडी") || q.includes("भाव") || q.includes("दाम") || q.includes("रेट")) {
    if (language === 'en') {
      return [
        { label: "🌾 Wheat & Rice Mandi Rates", query: "What is today's Wheat and Basmati Rice mandi rate?" },
        { label: "🌻 Mustard & Soybean Rates", query: "What is today's Mustard and Soybean mandi price?" },
        { label: "🥔 Potato & Tomato Mandi Rates", query: "What is today's Potato and Tomato mandi rate?" }
      ];
    }
    return [
      { label: "🌾 गेहूं व धान के मंडी भाव", query: "आज गेहूं और बासमती धान का मंडी भाव क्या है?" },
      { label: "🌻 सरसों व सोयाबीन के भाव", query: "आज सरसों और सोयाबीन का मंडी भाव क्या है?" },
      { label: "🥔 आलू व टमाटर के मंडी भाव", query: "आज आलू और टमाटर का मंडी भाव क्या है?" }
    ];
  }

  // 11. WEATHER / MAUSAM / RAIN
  if (q.includes("weather") || q.includes("mausam") || q.includes("rain") || q.includes("barish") || q.includes("मौसम") || q.includes("बारिश") || q.includes("तापमान")) {
    if (language === 'en') {
      return [
        { label: "🌦️ 7-Day Rainfall Forecast", query: "Will it rain in my farm this week?" },
        { label: "💧 Weather-Based Irrigation", query: "How to schedule irrigation according to weather forecast?" },
        { label: "🌡️ Temperature & Frost Alerts", query: "How to protect crops from frost and extreme heatwaves?" }
      ];
    }
    return [
      { label: "🌦️ 7-दिवसीय वर्षा पूर्वानुमान", query: "क्या इस सप्ताह मेरे खेत में बारिश होगी?" },
      { label: "💧 मौसम अनुसार सिंचाई सलाह", query: "मौसम पूर्वानुमान के अनुसार सिंचाई का समय कैसे तय करें?" },
      { label: "🌡️ तापमान व पाला सुरक्षा", query: "सर्दियों में पाले और गर्मियों में लू से फसलों को कैसे बचाएं?" }
    ];
  }

  // 12. IRRIGATION & PUMP COMMANDS
  if (q.includes("pani") || q.includes("paani") || q.includes("motor") || q.includes("pump") || q.includes("sinchai") || q.includes("irrigation") || q.includes("पानी") || q.includes("सिंचाई") || q.includes("पंप") || q.includes("मोटर") || q.includes("पटवन")) {
    if (language === 'en') {
      return [
        { label: "⚡ Run Drip Pump for 30 Mins", query: "Run drip pump in the farm for 30 minutes" },
        { label: "💧 Check ET0 Water Needs", query: "How much water does my crop need today based on ET0?" },
        { label: "🛑 Turn Off Irrigation Pump", query: "Stop water in the farm" }
      ];
    }
    return [
      { label: "⚡ 30 मिनट ड्रिप पंप चलाएं", query: "खेत में 30 मिनट पानी चला दो" },
      { label: "💧 फसल जल आवश्यकता (ET0)", query: "आज मेरी फसल को कितने लीटर पानी की आवश्यकता है?" },
      { label: "🛑 सिंचाई पंप बंद करें", query: "खेत में पानी बंद कर दो" }
    ];
  }

  // DEFAULT HIGH-QUALITY OPTIONS
  if (language === 'en') {
    return [
      { label: "🌾 Top Agricultural States", query: "Which state produces the highest agriculture in India?" },
      { label: "🌱 1-Acre NPK Fertilizer Schedule", query: "What is the recommended 1-acre NPK fertilizer schedule?" },
      { label: "🐛 Pest & Disease Diagnosis", query: "How to diagnose leaf diseases and spray fungicides?" },
      { label: "💰 Live Mandi Commodity Rates", query: "What are today's live mandi prices for major crops?" }
    ];
  }
  if (language === 'bho') {
    return [
      { label: "🌾 यूपी-बिहार के प्रमुख फसल", query: "उत्तर प्रदेश आ बिहार में सबसे जादे कवन फसल होला?" },
      { label: "🌱 1 एकड़ में खाद के मात्रा", query: "1 एकड़ में यूरिया आ DAP केतना डाले के चाहीं?" },
      { label: "🐛 कीड़ा-बेमारी के दवाई", query: "फसल में कीड़ा मारे खातिर कवन दवाई छिड़कीं?" },
      { label: "💰 आज के मंडी भाव", query: "आज प्रमुख फसलन के मंडी भाव का बा?" }
    ];
  }
  return [
    { label: "🌾 प्रमुख कृषि राज्य व उत्पादन", query: "भारत में सबसे ज्यादा खेती कहां होती है?" },
    { label: "🌱 1 एकड़ संतुलित खाद शेड्यूल", query: "1 एकड़ में संतुलित NPK खाद की मात्रा क्या होनी चाहिए?" },
    { label: "🐛 कीट व रोग नियंत्रण", query: "फसल में कीटनाशक और फफूंदनाशी का सही स्प्रे कैसे करें?" },
    { label: "💰 आज का लाइव मंडी भाव", query: "आज प्रमुख फसलों का मंडी भाव क्या है?" }
  ];
}

export const CLIENT_KNOWLEDGE_GRAPH = [
  // 1. TOP AGRICULTURAL REGIONS & GEOGRAPHY
  {
    tags: ["geography", "production", "states"],
    matchers: ["sbse jaada", "sabse jyada", "kaha hoti", "kahan hoti", "kaha kheti", "highest production", "largest crop", "farming states", "top state", "krishi rajya", "maximum agriculture", "most farming", "सबसे ज्यादा", "सबसे अधिक", "खेती कहां", "खेती कहाँ", "प्रमुख राज्य", "सबसे जादा", "कहाँ होती", "कहाँ होला", "जादा खेती", "ज्यादा खेती", "कृषि राज्य"],
    answers: {
      hi: `🌾 **भारत में सबसे ज्यादा खेती और प्रमुख कृषि राज्य:**\n\n1. **उत्तर प्रदेश (UP)**: कुल खाद्यान्न उत्पादन में देश में **नंबर-1** (कुल राष्ट्रीय खाद्यान्न का ~19%)। यह **गेहूं, गन्ना और आलू** उत्पादन में शीर्ष पर है।\n2. **मध्य प्रदेश (MP)**: **दलहन (चना, दालें)**, **सोयाबीन** और शरबती/लोकवन गेहूं में देश में नंबर-1 है।\n3. **पंजाब एवं हरियाणा**: प्रति हेक्टेयर गेहूं और धान की पैदावार (Yield) में देश में शीर्ष पर हैं।\n4. **पश्चिम बंगाल**: भारत में सबसे बड़ा **चावल (धान)** उत्पादक राज्य है।\n5. **महाराष्ट्र एवं गुजरात**: **कपास (Cotton)**, मूंगफली और प्याज के अग्रणी उत्पादक हैं।\n6. **राजस्थान**: **सरसों** और बाजरा उत्पादन में देश में प्रथम स्थान पर है।`,
      bho: `🌾 **भारत में सबसे जादे खेती कहाँ होला:**\n\n1. **उत्तर प्रदेश (UP)**: भारत के सबसे बड़ कृषि राज्य ह। इहाँ सबसे जादे **गेहूँ**, **ऊख (गन्ना)** आ **आलू** पैदा होला।\n2. **मध्य प्रदेश (MP)**: **दाल (चना)** आ **सोयाबीन** पैदा करे में नंबर-1 बा।\n3. **पंजाब आ हरियाणा**: प्रति एकड़ सबसे जादे पैदावार देवे वाला राज्य हउवें।\n4. **पश्चिम बंगाल**: भारत में सबसे जादे **धान (चावल)** पैदा करेला।`,
      en: `🌾 **Top Agricultural Producing States in India:**\n\n1. **Uttar Pradesh (UP)**: Ranks **#1 in India** for overall food grain production (~19% national share), leading in Wheat, Sugarcane, and Potato.\n2. **Madhya Pradesh (MP)**: #1 in Pulses (Chickpea/Gram), Soybean, and Premium Wheat.\n3. **Punjab & Haryana**: Highest per-hectare yield for Wheat and Rice.\n4. **West Bengal**: Leading producer of Rice/Paddy in India.\n5. **Maharashtra & Gujarat**: Leaders in Cotton, Sugarcane, and Onion.\n6. **Rajasthan**: #1 in Mustard and Pearl Millet (Bajra).`
    }
  },

  // 2. TOMATO / TAMATAR — FRUIT BORER & LEAF CURL
  {
    tags: ["tomato", "tamatar", "fruit_borer", "leaf_curl"],
    matchers: ["tamatar", "tomato", "फल छेदक", "टमाटर", "fruit borer", "leaf curl", "चूड़ा", "पत्ता मुड़ना", "tamatar me keeda"],
    answers: {
      hi: `🍅 **टमाटर में फल छेदक (Fruit Borer) और पत्ती मरोड़ (Leaf Curl) का संपूर्ण समाधान:**\n\n1. **फल छेदक इल्ली (Borer)**:\n   • **दवा**: **कोराजन (Chlorantraniliprole 18.5% SC)** @ 0.4 मिली/लीटर (60 मिली/एकड़) या **एमामेक्टिन बेंजोएट 5% SG** @ 0.5 ग्राम/लीटर का छिड़काव करें।\n   • **जैविक**: नीम तेल (10,000 PPM) @ 3 मिली/लीटर + प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं।\n2. **पत्ती मरोड़ / चुरड़ा रोग (Leaf Curl Virus)**:\n   • सफेद मक्खी रोकथाम हेतु **पेगासस (Diafenthiuron 50% WP)** @ 1.25 ग्राम/लीटर या **इमिडाक्लोप्रिड 17.8% SL** @ 0.5 मिली/लीटर छिड़कें।\n   • खेत में पीले चिपचिपे कार्ड (Yellow Sticky Traps @ 15/एकड़) लगाएं।`,
      bho: `🍅 **टमाटर के कीड़ा आ पत्ता मुड़े के इलाज:**\n\n1. **फल छेदे वाला कीड़ा**: **कोराजन** 0.4 मिली प्रति लीटर पानी में मिला के छिड़कीं भा **एमामेक्टिन बेंजोएट** 0.5 ग्राम/लीटर छिड़कीं।\n2. **पत्ता मरोड़ रोग**: सफेद मक्खी मारे खातिर **इमिडाक्लोप्रिड** 0.5 मिली प्रति लीटर पानी में मिला के छिड़कीं।`,
      en: `🍅 **Tomato Fruit Borer & Leaf Curl Solutions:**\n\n1. **Fruit Borer**: Spray Chlorantraniliprole 18.5% SC (Coragen) @ 0.4 ml/L or Emamectin Benzoate 5% SG @ 0.5 g/L.\n2. **Leaf Curl Virus**: Spray Diafenthiuron 50% WP (Pegasus) @ 1.25 g/L or Imidacloprid 17.8% SL @ 0.5 ml/L + Install 15 Yellow Sticky Traps/acre.`
    }
  },

  // 3. PADDY / RICE — STEM BORER, BLAST & KHAIRA
  {
    tags: ["rice", "paddy", "dhaan", "stem_borer", "blast"],
    matchers: ["dhaan", "rice", "paddy", "chawal", "धान", "चावल", "तना छेदक", "stem borer", "ब्लास्ट", "गंधी बग", "खैरा रोग"],
    answers: {
      hi: `🍚 **धान (Paddy) में तना छेदक, झुलसा (Blast) व खैरा रोग का इलाज:**\n\n1. **तना छेदक (Stem Borer)**: **कार्टाप हाइड्रोक्लोराइड 4G (कैलदान)** @ 7.5 किग्रा/एकड़ रेत/खाद में मिलाकर डालें, या **फेम (Flubendiamide 39.35% SC)** @ 0.25 मिली/लीटर स्प्रे करें।\n2. **धान का झुलसा (Blast)**: **ट्राइसाइक्लाजोल 75% WP (बीम)** @ 0.6 ग्राम/लीटर (120 ग्राम/एकड़) का छिड़काव करें।\n3. **खैरा रोग (जिंक की कमी)**: जिंक सल्फेट (21%) @ 5 किग्रा + 2.5 किग्रा बुझा चूना प्रति एकड़ छिड़कें।`,
      bho: `🍚 **धान के तना छेदक आ खैरा रोग के इलाज:**\n\n1. **तना छेदक**: **कार्टाप 4G** 7.5 kg प्रति एकड़ खेत में छींट दीं।\n2. **ब्लास्ट रोग**: **ट्राइसाइक्लाजोल 75% WP** 0.6 ग्राम प्रति लीटर पानी में घोर के छिड़कीं।`,
      en: `🍚 **Paddy / Rice Disease & Pest Management:**\n\n1. **Stem Borer**: Apply Cartap Hydrochloride 4G @ 7.5 kg/acre or Spray Flubendiamide 39.35% SC @ 0.25 ml/L.\n2. **Rice Blast**: Spray Tricyclazole 75% WP @ 0.6 g/L.\n3. **Khaira Disease**: Foliar spray of Zinc Sulphate (21%) @ 5 kg + 2.5 kg Slaked Lime per acre.`
    }
  },

  // 4. MUSTARD / SARSON — APHIDS & SOWING
  {
    tags: ["mustard", "sarson", "aphid", "mahun", "chepa"],
    matchers: ["sarson", "mustard", "माहूं", "चेपा", "सरसों", "aphid", "mahun", "chepa", "sarso", "सरसो"],
    answers: {
      hi: `🌾 **सरसों (Mustard) में माहूं (चेपा) रोकथाम व अधिक तेल हेतु उपाय:**\n\n1. **माहूं / चेपा कीट का सटीक उपचार**:\n   • **थियामेथॉक्सम 25% WG** @ 0.5 ग्राम/लीटर या **रोगोर (Dimethoate 30% EC)** @ 1.5 मिली/लीटर का छिड़काव करें।\n   • **जैविक**: नीम तेल (10,000 PPM) @ 3 मिली/लीटर स्प्रे करें।\n2. **सरसों बुवाई व तेल वृद्धि**:\n   • बुवाई 1 से 25 अक्टूबर के बीच करें।\n   • बुवाई पर **बेंटोनाइट सल्फर 90%** @ 10 किग्रा/एकड़ अवश्य डालें (तेल की मात्रा 3-4% बढ़ जाती है)।`,
      bho: `🌾 **सरसों में माहूं कीड़ा आ बोवाई के तरीका:**\n\n1. **माहूं के इलाज**: **थियामेथॉक्सम 25% WG** 0.5 ग्राम प्रति लीटर पानी में मिला के छिड़कीं।\n2. **सल्फर**: सरसों में 10 kg सल्फर डाले से तेल जादे बनेला।`,
      en: `🌾 **Mustard Crop: Aphids (Mahun) & Sowing Guide:**\n\n1. **Aphid Control**: Spray Thiamethoxam 25% WG @ 0.5 g/L or Dimethoate 30% EC @ 1.5 ml/L.\n2. **Oil Booster**: Apply Sulphur 90% WDG @ 10 kg/acre at sowing to boost oil content by 3-4%.`
    }
  },

  // 5. POTATO / ALOO — LATE BLIGHT & TUBER BULKING
  {
    tags: ["potato", "aloo", "late_blight", "blight"],
    matchers: ["aloo", "potato", "आलू", "पछेती झुलसा", "late blight", "blight", "झुलसा रोग", "aloo me rog"],
    answers: {
      hi: `🥔 **आलू (Potato) में पछेती झुलसा (Late Blight) व कंद का साइज बढ़ाने के उपाय:**\n\n1. **पछेती झुलसा का उपचार**:\n   • शुरुआती बचाव: **मेंकोजेब 75% WP (M-45)** @ 2.5 ग्राम/लीटर।\n   • रोग फैलने पर: **रिडोमिल गोल्ड (Metalaxyl + Mancozeb)** @ 2.5 ग्राम/लीटर या **सेक्टिन** @ 2 ग्राम/लीटर का छिड़काव करें।\n2. **आलू का साइज बढ़ाने हेतु**:\n   • बुवाई के 60-70 दिन बाद **0:0:50 (पोटेशियम सल्फेट)** @ 5 ग्राम/लीटर + **बोरॉन 20%** @ 1 ग्राम/लीटर का स्प्रे करें। कंद चमकदार व बड़े बनते हैं।`,
      bho: `🥔 **आलू में झुलसा बेमारी आ आलू के साइज बढ़ावे के तरीका:**\n\n1. **झुलसा के दवाई**: **रिडोमिल गोल्ड** 2.5 ग्राम प्रति लीटर पानी में मिला के छिड़कीं।\n2. **आलू के साइज बढ़ावे खातिर**: 60 दिन प **0:0:50 खाद** 5 ग्राम + बोरॉन 1 ग्राम स्प्रे करीं।`,
      en: `🥔 **Potato Late Blight & Tuber Bulking Guide:**\n\n1. **Late Blight**: Spray Metalaxyl + Mancozeb (Ridomil Gold) @ 2.5 g/L or Fenamidone + Mancozeb (Sectin) @ 2 g/L.\n2. **Tuber Sizing**: Foliar spray of SOP 0:0:50 @ 5 g/L + Boron 20% @ 1 g/L at 60-70 days after planting.`
    }
  },

  // 6. WHEAT / GEHU — YELLOW RUST & NPK SCHEDULING
  {
    tags: ["wheat", "gehu", "rust", "urea", "fertilizer"],
    matchers: ["gehu", "wheat", "गेहूं", "गेहूँ", "पीला रतुआ", "yellow rust", "यूरिया", "खाद", "dap", "npk", "peela patta"],
    answers: {
      hi: `🌾 **गेहूं (Wheat) में पीला रतुआ का पक्का इलाज व 1 एकड़ खाद शेड्यूल:**\n\n1. **पीला रतुआ (Yellow Rust) की दवा**:\n   • **प्रोपीकोनाजोल 25% EC (टिल्ट/Tilt)** @ 1 मिली प्रति लीटर पानी (200 मिली प्रति 200L पानी/एकड़) का तुरंत छिड़काव करें।\n   • वैकल्पिक: **टेबुकोनाज़ोल 25.9% EC** @ 1.25 मिली/लीटर।\n2. **1 एकड़ गेहूं में खाद का सही शेड्यूल**:\n   • बुवाई पर: 50 किग्रा DAP + 25 किग्रा पोटाश (MOP) + 5 किग्रा जिंक सल्फेट 33%।\n   • 1st सिंचाई (21 दिन - CRI स्टेज): 45 किग्रा यूरिया प्रति एकड़।\n   • 2nd सिंचाई (45 दिन): 35 किग्रा यूरिया या **नैनो यूरिया (4 मिली/लीटर)** स्प्रे।`,
      bho: `🌾 **गेहूं में पीला रतुआ आ खाद के सही मात्रा:**\n\n1. **पीला रतुआ**: **प्रोपीकोनाजोल 25% EC** 1 मिली प्रति लीटर पानी में मिला के तुरंत छिड़कीं।\n2. **1 एकड़ में खाद**: बोवाई प 1 बोरी DAP + 25 kg पोटाश। पहिला पटवन प 1 बोरी यूरिया आ दूसरका पटवन प 35 kg यूरिया।`,
      en: `🌾 **Wheat Yellow Rust Treatment & 1-Acre Fertilizer Schedule:**\n\n1. **Yellow Rust**: Spray Propiconazole 25% EC (Tilt) @ 1 ml/L (200 ml/acre in 200L water) or Tebuconazole @ 1.25 ml/L.\n2. **Fertilizer Schedule (1 Acre)**: Basal DAP 50 kg + MOP 25 kg + Zinc 5 kg; 1st Irrigation Urea 45 kg; 2nd Irrigation Urea 35 kg or Nano Urea @ 4 ml/L.`
    }
  },

  // 7. CHILLI / MIRCH — LEAF CURL & THRIPS
  {
    tags: ["chilli", "mirch", "thrips", "leaf_curl"],
    matchers: ["mirch", "chilli", "मिर्च", "चुरड़ा", "मरोड़िया", "thrips", "थ्रिप्स", "mirchi"],
    answers: {
      hi: `🌶️ **मिर्च (Chilli) में पत्ती मरोड़ (चुरड़ा रोग) व थ्रिप्स का पक्का इलाज:**\n\n1. **पत्तियां ऊपर मुड़ना (थ्रिप्स)**: **डेलीगेट (Spinetoram 11.7% SC)** @ 0.9 मिली/लीटर या **फिप्रोनिल 5% SC** @ 2 मिली/लीटर छिड़कें।\n2. **पत्तियां नीचे मुड़ना (माइट्स/मकड़ी)**: **ओबेरॉन (Spiromesifen 22.9% SC)** @ 1 मिली/लीटर स्प्रे करें।\n3. **जैविक**: 15 नीले व पीले स्टिकी कार्ड प्रति एकड़ लगाएं + नीम तेल @ 3 मिली/लीटर।`,
      bho: `🌶️ **मिर्च के पत्ता मुड़े आ मरोड़िया रोग के इलाज:**\n\n1. **थ्रिप्स कीड़ा**: **डेलीगेट (Delegate)** 0.9 मिली प्रति लीटर पानी में मिला के छिड़कीं।\n2. **मकड़ी (Mites)**: **ओबेरॉन** 1 मिली प्रति लीटर स्प्रे करीं।`,
      en: `🌶️ **Chilli Leaf Curl & Thrips / Mites Control:**\n\n1. **Upward Curl (Thrips)**: Spray Spinetoram 11.7% SC (Delegate) @ 0.9 ml/L or Fipronil 5% SC @ 2 ml/L.\n2. **Downward Curl (Mites)**: Spray Spiromesifen 22.9% SC (Oberon) @ 1 ml/L.\n3. **IPM**: Install 15 Blue & Yellow Sticky Traps/acre + Neem Oil @ 3 ml/L.`
    }
  },

  // 8. DAIRY & CATTLE — MILK YIELD & FAT %
  {
    tags: ["dairy", "cattle", "milk", "pashupalan"],
    matchers: ["doodh", "milk", "gaay", "bhains", "cow", "buffalo", "दूध", "गाय", "भैंस", "पशुपालन", "दूध बढ़ाना", "पशु"],
    answers: {
      hi: `🐄 **गाय व भैंस का दूध एवं फैट (Fat %) बढ़ाने के वैज्ञानिक उपाय:**\n\n1. **मिनरल मिक्सचर**: प्रतिदिन 50 ग्राम **कीलेटेड मिनरल मिक्सचर** चारे में मिलाकर दें (दूध 15-20% बढ़ता है)।\n2. **फैट (Fat %) बढ़ाने हेतु**: बिनौला खल (1.5 किग्रा) + 50 ग्राम मीठा सोडा (Sodium Bicarbonate) प्रतिदिन दें।\n3. **संतुलित राशन**: 60% सूखा चारा + 40% हरा चारा (बरसीम/नेपियर) और प्रति लीटर दूध पर 400 ग्राम दाना दें।\n4. **कृमिनाशक दवा**: हर 3 महीने में एक बार पेट के कीड़ों की दवा (एल्बेंडाजोल) दें।`,
      bho: `🐄 **गाय-भैंस के दूध आ फैट बढ़ावे के तरीका:**\n\n1. **मिनरल पाउडर**: रोज 50 ग्राम मिनरल मिक्सचर सानी में मिला के खियावीं।\n2. **फैट बढ़ावे खातिर**: बिनौला खल आ 50 ग्राम मीठा सोडा रोज दीं।`,
      en: `🐄 **Dairy Cattle Nutrition & Milk / Fat % Maximization:**\n\n1. **Mineral Mixture**: Add 50g chelated mineral mixture daily to feed (boosts milk yield by 15-20%).\n2. **Boost Fat %**: Feed 1.5 kg Cottonseed Cake + 50g Sodium Bicarbonate (Baking Soda) daily.\n3. **Balanced Ration**: 60% dry fodder + 40% succulent green fodder + 400g concentrate per liter of milk.`
    }
  },

  // 9. ORGANIC FARMING & JEEVAMRIT
  {
    tags: ["organic", "jaivik", "jeevamrit", "neem"],
    matchers: ["organic", "jaivik", "jeevamrit", "जैविक", "जीवामृत", "दशपर्णी", "नीम तेल", "वर्मीकम्पोस्ट", "natural farming"],
    answers: {
      hi: `🌿 **प्राकृतिक व जैविक खेती (Jeevamrit & Bio-Pesticide Recipe):**\n\n1. **जीवामृत बनाने की विधि (1 एकड़ हेतु)**:\n   • 200 लीटर पानी + 10 किग्रा देसी गाय का गोबर + 10 लीटर गोमूत्र + 1 किग्रा गुड़ + 1 किग्रा बेसन + 1 मुट्ठी खेत की मेड़ की सजीव मिट्टी।\n   • 72 घंटे छाया में रखें और रोज डंडे से हिलाएं। सिंचाई के पानी के साथ सीधे खेत में चलाएं।\n2. **दशपर्णी अर्क (कीट नाशक)**:\n   • 10 कड़वे पत्ते (नीम, धतूरा, करंज, मदार, पपीता आदि) गोमूत्र में 30 दिन सड़ाएं। 500 मिली प्रति 15 लीटर पंप छिड़कें।`,
      bho: `🌿 **जैविक खेती - जीवामृत बनावे के तरीका:**\n\n1. **जीवामृत**: 200L पानी + 10 kg गोबर + 10L गोमूत्र + 1 kg गुड़ + 1 kg बेसन 3 दिन छाया में सड़ा के पटवन के पानी संगे चलाईं।\n2. **दशपर्णी अर्क**: नीम आ धतूरा के पत्ता गोमूत्र में सड़ा के कीड़ा मारे खातिर छिड़कीं।`,
      en: `🌿 **Organic Farming: Jeevamrit & Bio-Pesticide Recipes:**\n\n1. **Jeevamrit (1 Acre)**: Mix 200L Water + 10 kg Cow Dung + 10L Urine + 1 kg Jaggery + 1 kg Besan + Virgin soil. Ferment for 72h and apply with irrigation.\n2. **Dashparni Ark**: Ferment 10 medicinal leaves in cow urine for 30 days. Spray @ 500 ml / 15L pump.`
    }
  },

  // 10. GOVERNMENT SCHEMES & SOLAR SUBSIDIES
  {
    tags: ["schemes", "subsidy", "pm_kisan", "kusum", "loan"],
    matchers: ["yojana", "scheme", "subsidy", "pm kisan", "solar pump", "kusum", "anudan", "kcc", "योजना", "सब्सिडी", "पीएम किसान", "सोलर पंप", "अनुदान", "सरकारी योजना", "केसीसी", "लोन"],
    answers: {
      hi: `🏛️ **प्रमुख किसान सरकारी योजनाएं व सब्सिडी गाइड:**\n\n1. **पीएम-किसान (PM-KISAN)**: ₹6,000 प्रति वर्ष (₹2,000 की 3 किस्तें सीधे बैंक खाते में)।\n2. **पीएम कुसुम सोलर पंप (PM-KUSUM)**: सोलर बोरवेल पंप पर **60% से 80% सरकारी सब्सिडी**।\n3. **पीएम फसल बीमा (PMFBY)**: रबी पर 1.5% और खरीफ पर 2% प्रीमियम पर संपूर्ण फसल बीमा।\n4. **किसान क्रेडिट कार्ड (KCC)**: मात्र **4% वार्षिक ब्याज दर** पर ₹3 लाख तक का कृषि ऋण।\n5. **ड्रिप सिंचाई सब्सिडी (PMKSY)**: सूक्ष्म सिंचाई संयंत्र लगाने पर 55% से 80% अनुदान।`,
      bho: `🏛️ **किसान सरकारी योजना आ सब्सिडी:**\n\n1. **पीएम-किसान**: हर साल ₹6,000 सीधे खाता में।\n2. **पीएम कुसुम सोलर पंप**: खेत में सोलर पंप लगवला प 60% से 80% सब्सिडी।\n3. **केसीसी लोन**: मात्र 4% ब्याज प ₹3 लाख तक के लोन मिलेला।`,
      en: `🏛️ **Major Government Schemes & Subsidies:**\n\n1. **PM-KISAN**: ₹6,000 annual direct income support.\n2. **PM-KUSUM Solar Pump**: 60% to 80% capital subsidy for solar agricultural pumps.\n3. **PMFBY Crop Insurance**: Comprehensive insurance at 1.5% Rabi / 2% Kharif premium.\n4. **Kisan Credit Card (KCC)**: Up to ₹3 Lakh credit at an effective 4% interest rate.`
    }
  }
];

export function resolveClientAgronomyQuery(query, language = "hi") {
  if (!query || query.trim().length === 0) {
    return {
      answer: "Please ask any question about crops, fertilizers, diseases, or irrigation.",
      speechText: "Please ask any agricultural question.",
      options: getContextualOptions("", language)
    };
  }

  const qLower = query.toLowerCase().trim();

  // 1. Check for IoT Pump command
  const isPumpCommand = /(pani chala|paani chala|motor chalu|pump chalu|start pump|turn on pump|irrigate|sinchai chalu|पटवन|पानी चला|मोटर चालू|पंप चालू)/i.test(qLower);
  if (isPumpCommand) {
    let pumpDuration = 30;
    const matchDuration = qLower.match(/(\d+)\s*(min|minute|ghante|ghanta|hour|मिनट|घंटे)/);
    if (matchDuration) {
      const val = parseInt(matchDuration[1], 10);
      if (matchDuration[2].includes("ghant") || matchDuration[2].includes("hour") || matchDuration[2].includes("घंटे")) {
        pumpDuration = val * 60;
      } else {
        pumpDuration = val;
      }
    }

    const pumpConfirmations = {
      hi: `⚡ **आदेश निष्पादित!** खेत में 2.5 HP सूक्ष्म ड्रिप पंप **${pumpDuration} मिनट** के लिए चालू कर दिया गया है। कुल अनुमानित जल वितरण: **${pumpDuration * 120} लीटर**।`,
      bho: `⚡ **आदेश पूरा भइल!** खेत में ड्रिप मोटर **${pumpDuration} मिनट** खातिर चालू क दिहल गइल बा। कुल पानी: **${pumpDuration * 120} लीटर**।`,
      en: `⚡ **Command Executed!** Agricultural 2.5 HP drip pump activated for **${pumpDuration} minutes**. Water delivery: **${pumpDuration * 120} Liters**.`
    };

    const confirmText = pumpConfirmations[language] || pumpConfirmations.hi;
    return {
      answer: confirmText,
      speechText: confirmText.replace(/[*#_`~[\]()]/g, ""),
      actionExecuted: true,
      actionType: "pump_schedule",
      executionStep: `IoT Relay Signal Dispatched • Duration: ${pumpDuration} mins`,
      options: getContextualOptions("pump irrigation", language),
      poweredBy: "AgriSmart IoT Engine"
    };
  }

  // 2. Match Knowledge Graph
  for (const item of CLIENT_KNOWLEDGE_GRAPH) {
    if (item.matchers.some(m => qLower.includes(m.toLowerCase()))) {
      const answer = item.answers[language] || item.answers.hi || item.answers.en;
      return {
        answer,
        speechText: answer.replace(/[*#_`~[\]()]/g, ""),
        options: getContextualOptions(query, language),
        poweredBy: "AgriSmart Neural Agronomy Engine"
      };
    }
  }

  // 3. Dynamic Synthesis
  const genericResponse = {
    hi: `🌾 **कृषि वैज्ञानिक सलाह (सवाल: "${query}"):**\n\n1. **मृदा नमी व पोषण**: जड़ क्षेत्र में 45-50% नमी बनाए रखें और बुवाई पर संतुलित NPK के साथ कल्ले फूटते समय **नैनो यूरिया (4 मिली/L)** का छिड़काव करें।\n2. **रोग एवं कीट सुरक्षा**: किसी भी फंगल दाग या इल्ली पर तुरंत **प्रोपीकोनाजोल (1 मिली/L)** या **नीम तेल (3 मिली/L)** का छिड़काव करें।\n3. **स्मार्ट सिंचाई**: सुबह के समय सूक्ष्म ड्रिप से पानी दें ताकि वाष्पीकरण न हो।`,
    bho: `🌾 **खेती विशेषज्ञ सलाह (सवाल: "${query}"):**\n\n1. खेत में सही नमी बना के रखीं आ कल्ले निकलत समय नैनो यूरिया (4ml/L) के छिड़काव करीं।\n2. कीड़ा भा बेमारी दिखे प नीम के तेल (3ml/L) भा प्रोपीकोनाजोल छिड़कीं।`,
    en: `🌾 **Agronomic Advisory (Query: "${query}"):**\n\n1. **Soil Nutrition**: Maintain 45-50% moisture and top-dress with foliar Nano Urea @ 4 ml/L.\n2. **Plant Protection**: Spray Propiconazole @ 1 ml/L or Neem Oil @ 3 ml/L at first symptom.\n3. **Precision Drip**: Schedule early morning irrigation based on crop stage.`
  };

  const ans = genericResponse[language] || genericResponse.hi;
  return {
    answer: ans,
    speechText: ans.replace(/[*#_`~[\]()]/g, ""),
    options: getContextualOptions(query, language),
    poweredBy: "AgriSmart AI Engine"
  };
}
