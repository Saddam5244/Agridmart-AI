export const TRANSLATIONS = {
  en: {
    tagline: "From Guesswork to Data-Driven Farming",
    farmHealth: "Farm Health",
    pitchDeck: "Pitch Slides",
    voiceAi: "Voice AI",
    askVoice: "Ask AI Voice",
    farmerView: "🌾 Farmer View",
    adminView: "🛡️ Admin View",
    districtOps: "District Command Operations Active",
    loggedAsOfficer: "Logged in as District Agriculture Officer • Krishi Control Desk",
    tabs: {
      dashboard: "Dashboard",
      simulator: "What-If Simulator",
      disease: "AI Disease Detection",
      irrigation: "Smart Irrigation",
      crops: "Crop & Yield ML",
      market: "Market Intelligence",
      schemes: "Govt Schemes & Policies",
      assistant: "AI Assistant"
    },
    schemes: {
      badge: "Central & State Govt Portals • Verified Subsidies",
      title: "Government Schemes & Farm Land Policies",
      desc: "Complete directory of verified subsidies, direct income support (PM-KISAN), 60-80% drip/solar pump grants, and yearly chronological land bills (1998–2026) with direct official application portals.",
      allCategories: "All Schemes & Grants",
      incomeSupport: "Direct Income Support",
      irrigationSolar: "Irrigation & Solar (PM-KUSUM)",
      insuranceRelief: "Crop Insurance (PMFBY)",
      loansCredit: "KCC & Low-Interest Loans",
      machineryDrone: "Machinery & Spray Drones",
      landTitling: "Land Titling & Farmer ID",
      organicNatural: "Organic & Natural Farming",
      policyTimeline: "Yearly Policy & Land Bill Timeline (1998–2026)",
      viewSchemes: "Active Schemes & Subsidies",
      eligibility: "Eligibility Criteria",
      documents: "Required Documents Checklist",
      applyOfficial: "Apply on Official Portal",
      listenScheme: "Listen Benefits Aloud",
      benefitAmount: "Financial Benefit & Subsidy",
      searchPlaceholder: "Search by scheme, subsidy, drone, solar pump, KCC..."
    },
    dashboard: {
      title: "Live Farm Telemetry • Plot A1",
      farmerLabel: "Farmer",
      activeCropLabel: "Active Crop",
      healthScoreTitle: "Farm Health Score",
      healthScoreSub: "Composite score of 6 agro signals",
      optimal: "Optimal Health",
      attention: "Attention Needed",
      aiRecommendationTitle: "AI Actionable Recommendation",
      viewIrrigationPlan: "View Irrigation Plan",
      weather: "Weather",
      soilMoisture: "Soil Moisture",
      cropHealth: "Crop Health",
      diseaseRisk: "Disease Risk",
      marketPrice: "Market Price",
      nextAction: "Next Action",
      irrigateTomorrow: "Irrigate tomorrow",
      healthy: "Healthy",
      low: "Low Risk",
      hold: "HOLD",
      humidity: "Humidity",
      sensorTelemetry: "IoT Soil Chemistry & Sensor Telemetry",
      sensorSimulator: "Live Sensor Simulator",
      hideSimulator: "Hide Sensor Simulator",
      quickActions: "Quick Decision Modules",
      targetMoisture: "Target: 65%",
      depthRootZone: "Depth: 15cm (Root zone)",
      canopyNdvi: "Vegetative phase • Canopy NDVI: 0.78",
      chlorophyllNormal: "Chlorophyll Index: Normal",
      fungalIndex: "Fungal Spore Index: 0.12",
      mandiLocation: "Indore APMC Mandi",
      windowMorning: "Window: 06:00 AM – 07:00 AM (~35 mins)",
      waterSavedNote: "Saves ~31,250 Liters",
      applyRecalculate: "Apply Telemetry & Recalculate AI Advisory"
    },
    disease: {
      badge: "Computer Vision • AI Plant Pathology Engine",
      title: "AI Crop Disease & Pest Diagnostic Scanner",
      desc: "Upload or capture a leaf photo. Our deep learning computer vision engine detects pathogens and outputs verified organic & chemical remedies.",
      uploadTitle: "Upload Leaf Photo",
      uploadPrompt: "Click to browse or take photo",
      demoSamples: "Live Demo Test Samples (Click to Scan)",
      symptoms: "Key Observable Symptoms",
      organicTab: "🌿 Organic & Biological",
      chemicalTab: "🧪 Chemical Dosing",
      preventionTab: "🛡️ Long-Term Prevention",
      listenVoice: "Listen Prescriptions",
      accuracyLabel: "Diagnosis Accuracy",
      supportedLabel: "Pathogens Supported",
      confidence: "Confidence",
      pathogenType: "Pathogen Type",
      affectedArea: "Canopy Area Affected",
      readyDiagnosis: "Ready for Leaf Diagnosis",
      readyDesc: "Upload a plant photo or click any sample leaf on the left to trigger the deep learning classifier."
    },
    irrigation: {
      badge: "Evapotranspiration (ET0) & Water Deficit Engine",
      title: "Smart Precision Irrigation & Water Conservation",
      desc: "Calculate optimal watering time and duration based on crop growth stages, real-time soil deficit, and rain forecasts to save up to 40% water.",
      waterConserved: "Water Conserved",
      powerSaved: "Power Saved",
      cropParameters: "Field & Crop Parameters",
      targetCrop: "Target Crop",
      growthStage: "Crop Growth Stage",
      soilTexture: "Soil Texture",
      currentMoisture: "Current Soil Moisture",
      rainForecast: "Rain Forecast (Next 24h)",
      fieldArea: "Field Area",
      irrigateRequired: "Action Required: Irrigate",
      noWaterNeeded: "Optimal: No Water Needed",
      runTime: "Recommended Run Time",
      startPump: "Start Precision Drip Cycle",
      stopPump: "Stop Pump (Manual Override)",
      rationale: "Agronomic Rationale",
      iotPumpController: "IoT Smart Pump Controller",
      scheduleWindow: "Optimal Window"
    },
    crops: {
      badge: "Machine Learning Multi-Criteria Decision Engine",
      title: "AI Crop Recommendation & Yield Predictor",
      desc: "Match soil macronutrients (N, P, K), pH, and climate conditions against optimal crop profiles to rank crops by yield probability and revenue.",
      inputsTitle: "Soil Chemistry & Climate Inputs",
      rankedTitle: "Top Recommended Crops Ranked by ML Fit",
      predictedYield: "Predicted Yield",
      suitability: "Suitability",
      estimatedIncome: "Estimated Gross Income",
      keyAdvice: "Key Agronomic Advice",
      presetsLabel: "Ecological Agro-Climatic Presets (1-Click Fill)",
      seasonLabel: "Crop Sowing Season",
      soilTypeLabel: "Soil Type Classification",
      calculateButton: "Calculate ML Recommendations & Forecast",
      autoMode: "Auto Mode (Location-Driven AI Advisory)",
      manualMode: "Manual Mode (Custom Soil Card & Overrides)",
      detectedLocation: "Detected Farm Location",
      detectedSeason: "Current Crop Cycle",
      detectedSoil: "Regional Soil Baseline",
      compareTab: "Side-by-Side Crop Comparison & Insights",
      compareSubtitle: "Compare financial returns, water demands, cultivation costs, and risk ratings between top candidate crops",
      selectCropsToCompare: "Select Crops to Compare",
      netProfit: "Net Profit (After Costs)",
      cultivationCost: "Total Cultivation Cost",
      waterIntensity: "Water Requirement",
      growthDays: "Days to Harvest",
      riskRating: "Pest & Climate Risk",
      roi: "Return on Investment (ROI)",
      mandiPrice: "Market Rate / MSP",
      grossRevenue: "Gross Revenue",
      winnerVerdict: "AI Economic Verdict",
      breakdownCost: "Cost Breakdown"
    },
    market: {
      badge: "APMC Mandi Intelligence & AI Price Forecasting",
      title: "Market Intelligence & Selling Decision Support",
      desc: "Traditional platforms only display static prices. AgriSmart forecasts price trends and provides actionable HOLD / SELL / MSP decisions.",
      spotRate: "Live Spot Rate",
      arbitrageFinder: "APMC Price Arbitrage Finder (Top 3 Markets within 60km)",
      decisionOutput: "Decision Support Output",
      marketReasoning: "Market Reasoning",
      mspBenchmark: "Govt MSP Benchmark"
    },
    assistant: {
      title: "AI Agronomist Voice & Chat",
      subtitle: "Agricultural science, pest remedies & govt schemes",
      placeholder: "Ask agronomy questions, urea dosage, subsidies...",
      listening: "Listening... Speak now...",
      welcome: "Hello farmer! I am your AI Agronomist assistant. You can ask me anything about crop diseases, fertilizer dosing, smart irrigation, or government subsidies like PM-KISAN & PMKSY.",
      actionLabel: "Action"
    }
  },

  hi: {
    tagline: "डेटा-संचालित आधुनिक कृषि निर्णय प्रणाली (CodeBuild 1.0)",
    farmHealth: "फार्म स्वास्थ्य",
    pitchDeck: "पिच प्रेजेंटेशन",
    voiceAi: "एआई आवाज",
    askVoice: "बोलकर पूछें",
    farmerView: "🌾 किसान दृश्य",
    adminView: "🛡️ अधिकारी दृश्य",
    districtOps: "जिला कृषि कमांड कंट्रोल रूम सक्रिय",
    loggedAsOfficer: "जिला कृषि अधिकारी के रूप में लॉगिन • कृषि नियंत्रण कक्ष",
    tabs: {
      dashboard: "डैशबोर्ड",
      simulator: "व्हाट-इफ सिम्युलेटर",
      disease: "रोग पहचान",
      irrigation: "स्मार्ट सिंचाई",
      crops: "फसल चयन व उपज",
      market: "मंडी भाव व बाजार",
      schemes: "सरकारी योजनाएं",
      assistant: "एआई सलाहकार"
    },
    schemes: {
      badge: "केंद्र व राज्य सरकार • प्रमाणित योजनाएं एवं सब्सिडी",
      title: "सरकारी कृषि योजनाएं, सब्सिडी एवं भूमि नीतियां",
      desc: "पीएम-किसान, 80% ड्रिप/सोलर पंप सब्सिडी, फसल बीमा, केसीसी ऋण एवं 1998 से 2026 तक के सभी भूमि सुधार कानूनों की आधिकारिक पोर्टल लिंक सहित पूरी जानकारी।",
      allCategories: "सभी योजनाएं व अनुदान",
      incomeSupport: "प्रत्यक्ष आय सहायता (PM-KISAN)",
      irrigationSolar: "सिंचाई एवं सोलर पंप (PM-KUSUM)",
      insuranceRelief: "फसल बीमा (PMFBY)",
      loansCredit: "केसीसी व रियायती कृषि ऋण",
      machineryDrone: "कृषि यंत्र व स्प्रे ड्रोन",
      landTitling: "भू-अभिलेख व किसान आईडी",
      organicNatural: "जैविक व प्राकृतिक खेती",
      policyTimeline: "वार्षिक कृषि नीतियां एवं भूमि कानून (1998–2026)",
      viewSchemes: "सक्रिय सरकारी योजनाएं व सब्सिडी",
      eligibility: "पात्रता एवं शर्तें",
      documents: "आवश्यक दस्तावेज चेकलिस्ट",
      applyOfficial: "आधिकारिक पोर्टल पर आवेदन करें",
      listenScheme: "योजना की जानकारी सुनें",
      benefitAmount: "सरकारी वित्तीय लाभ व सब्सिडी",
      searchPlaceholder: "योजना, सब्सिडी, ट्रैक्टर, सोलर पंप, केसीसी या ड्रोन खोजें..."
    },
    dashboard: {
      title: "लाइव खेत टेलीमेट्री • प्लॉट A1",
      farmerLabel: "किसान भाई",
      activeCropLabel: "सक्रिय फसल",
      healthScoreTitle: "फार्म स्वास्थ्य स्कोर",
      healthScoreSub: "6 कृषि संकेतों का समग्र स्कोर",
      optimal: "उत्कृष्ट स्वास्थ्य",
      attention: "ध्यान देने की आवश्यकता",
      aiRecommendationTitle: "एआई स्मार्ट कृषि सिफारिश",
      viewIrrigationPlan: "सिंचाई प्लान देखें",
      weather: "मौसम",
      soilMoisture: "मिट्टी की नमी",
      cropHealth: "फसल स्वास्थ्य",
      diseaseRisk: "रोग जोखिम",
      marketPrice: "मंडी भाव",
      nextAction: "अगली कार्रवाई",
      irrigateTomorrow: "कल सुबह सिंचाई करें",
      healthy: "स्वस्थ फसल",
      low: "कम जोखिम",
      hold: "रोकें (HOLD)",
      humidity: "आर्द्रता",
      sensorTelemetry: "आईओटी मृदा सेंसर टेलीमेट्री",
      sensorSimulator: "लाइव सेंसर सिम्युलेटर",
      hideSimulator: "सिम्युलेटर छुपाएं",
      quickActions: "त्वरित निर्णय मॉड्यूल",
      targetMoisture: "लक्ष्य: 65%",
      depthRootZone: "गहराई: 15 सेमी (जड़ क्षेत्र)",
      canopyNdvi: "वानस्पतिक अवस्था • फसल स्वास्थ्य सूचकांक: 0.78",
      chlorophyllNormal: "क्लोरोफिल स्तर: सामान्य व स्वस्थ",
      fungalIndex: "फंगल बीजाणु जोखिम: 0.12 (कम)",
      mandiLocation: "इंदौर एपीएमसी कृषि उपज मंडी",
      windowMorning: "समय: सुबह 06:00 – 07:00 बजे (~35 मिनट)",
      waterSavedNote: "बचत: ~31,250 लीटर पानी",
      applyRecalculate: "सेंसर डेटा लागू करें व एआई सलाह रीसेट करें"
    },
    disease: {
      badge: "कंप्यूटर विज़न • एआई पादप रोग निदान",
      title: "एआई फसल रोग व कीट पहचान स्कैनर",
      desc: "फसल की पत्ती की तस्वीर अपलोड करें। हमारा एआई मॉडल रोग की पहचान कर जैविक व रासायनिक उपचार और रोकथाम की सलाह देता है।",
      uploadTitle: "पत्ती की तस्वीर अपलोड करें",
      uploadPrompt: "फोटो चुनने या खींचने के लिए क्लिक करें",
      demoSamples: "त्वरित डेमो पत्ती नमूने (क्लिक करें)",
      symptoms: "प्रमुख लक्षण",
      organicTab: "🌿 जैविक व प्राकृतिक उपचार",
      chemicalTab: "🧪 रासायनिक कीटनाशक व खुराक",
      preventionTab: "🛡️ दीर्घकालिक रोकथाम",
      listenVoice: "उपचार आवाज में सुनें",
      accuracyLabel: "निदान सटीकता",
      supportedLabel: "समर्थित फसलें",
      confidence: "एआई सटीकता विश्वास",
      pathogenType: "रोगजनक प्रकार",
      affectedArea: "प्रभावित पत्ती क्षेत्र",
      readyDiagnosis: "पत्ती स्कैन के लिए तैयार",
      readyDesc: "पत्ती की फोटो अपलोड करें या बाईं ओर दिए गए नमूने पर क्लिक करके तुरंत जांचें।"
    },
    irrigation: {
      badge: "वाष्पोत्सर्जन (ET0) एवं जल कमी इंजन",
      title: "स्मार्ट सटीक सिंचाई एवं जल संरक्षण",
      desc: "फसल की अवस्था, मिट्टी की नमी और मौसम के आधार पर सटीक सिंचाई समय और अवधि की गणना करें ताकि 40% तक पानी बचाया जा सके।",
      waterConserved: "जल की बचत",
      powerSaved: "बिजली की बचत",
      cropParameters: "खेत व फसल पैरामीटर",
      targetCrop: "फसल चुनें",
      growthStage: "फसल विकास अवस्था",
      soilTexture: "मिट्टी का प्रकार",
      currentMoisture: "वर्तमान मिट्टी नमी",
      rainForecast: "बारिश का पूर्वानुमान (24 घंटे)",
      fieldArea: "खेत का रकबा (एकड़)",
      irrigateRequired: "सिंचाई आवश्यक है",
      noWaterNeeded: "नमी संतुलित है: पानी की जरूरत नहीं",
      runTime: "अनुशंसित समय",
      startPump: "स्मार्ट ड्रिप पंप चालू करें",
      stopPump: "पंप बंद करें",
      rationale: "कृषि वैज्ञानिक कारण",
      iotPumpController: "आईओटी स्मार्ट सिंचाई पंप नियंत्रक",
      scheduleWindow: "सिंचाई का सही समय"
    },
    crops: {
      badge: "मशीन लर्निंग बहु-मापदंड निर्णय इंजन",
      title: "एआई फसल सिफारिश एवं उपज भविष्यवाणी",
      desc: "मिट्टी के पोषक तत्वों (N, P, K, pH) और जलवायु के आधार पर सबसे उपयुक्त फसलों की रैंकिंग और प्रति एकड़ अनुमानित आय जानें।",
      inputsTitle: "मिट्टी रसायन एवं जलवायु इनपुट",
      rankedTitle: "एमएल द्वारा अनुशंसित शीर्ष फसलें",
      predictedYield: "अनुमानित पैदावार",
      suitability: "अनुकूलता",
      estimatedIncome: "अनुमानित सकल आय",
      keyAdvice: "प्रमुख कृषि सलाह",
      presetsLabel: "क्षेत्रीय कृषि-जलवायु प्रीसेट (1-क्लिक भरें)",
      seasonLabel: "फसल बुवाई का मौसम",
      soilTypeLabel: "मिट्टी का प्रकार",
      calculateButton: "फसल अनुकूलता व पैदावार की गणना करें",
      autoMode: "ऑटो मोड (स्थान-आधारित एआई फसल सलाह)",
      manualMode: "मैनुअल मोड (कस्टम मृदा कार्ड व इनपुट)",
      detectedLocation: "पहचाना गया खेत का स्थान",
      detectedSeason: "वर्तमान फसल चक्र",
      detectedSoil: "क्षेत्रीय मिट्टी का प्रकार",
      compareTab: "फसलों की आमने-सामने विस्तृत तुलना एवं अंतर्दृष्टि",
      compareSubtitle: "शीर्ष फसलों के बीच शुद्ध लाभ, पानी की खपत, खेती की कुल लागत और जोखिम का सटीक तुलनात्मक विश्लेषण",
      selectCropsToCompare: "तुलना के लिए फसलें चुनें",
      netProfit: "शुद्ध मुनाफा (लागत काटकर)",
      cultivationCost: "खेती की कुल लागत",
      waterIntensity: "पानी की आवश्यकता",
      growthDays: "पकने के दिन (अवधि)",
      riskRating: "कीट व मौसम जोखिम",
      roi: "निवेश पर लाभ (ROI)",
      mandiPrice: "मंडी भाव / एमएसपी",
      grossRevenue: "सकल राजस्व",
      winnerVerdict: "एआई आर्थिक निर्णय",
      breakdownCost: "लागत विवरण"
    },
    market: {
      badge: "एपीएमसी मंडी खुफिया व मूल्य पूर्वानुमान",
      title: "मंडी भाव एवं बिक्री निर्णय प्रणाली",
      desc: "हमारी प्रणाली आवक और मांग का विश्लेषण करके बेचने (SELL) या रोकने (HOLD) की सटीक सलाह देती है।",
      spotRate: "आज का लाइव मंडी भाव",
      arbitrageFinder: "निकटतम 3 मंडियों के भाव की तुलना (60 किमी)",
      decisionOutput: "बिक्री निर्णय",
      marketReasoning: "बाजार विश्लेषण कारण",
      mspBenchmark: "सरकारी एमएसपी दर"
    },
    assistant: {
      title: "एआई कृषि विशेषज्ञ सहायक",
      subtitle: "कृषि विज्ञान, कीट नियंत्रण और योजनाओं की जानकारी",
      placeholder: "फसल, खाद, सिंचाई या सरकारी योजनाओं के बारे में पूछें...",
      listening: "सुन रहा हूँ... बोलिए किसान भाई...",
      welcome: "नमस्ते किसान भाई! मैं आपका एआई कृषि विशेषज्ञ (Krishi Mitra) हूँ। आप मुझसे फसल रोग, यूरिया खाद की मात्रा, सिंचाई, या सरकारी योजनाओं (PM-KISAN) के बारे में बोलकर या लिखकर पूछ सकते हैं।",
      actionLabel: "कार्रवाई"
    }
  },

  bho: {
    tagline: "अंदाजा छोड़ल जाव, डेटा से खेती कइल जाव (CodeBuild 1.0)",
    farmHealth: "खेत के सेहत",
    pitchDeck: "पिच प्रेजेंटेशन",
    voiceAi: "एआई आवाज",
    askVoice: "बोल के पूछीं",
    farmerView: "🌾 किसान भाई",
    adminView: "🛡️ अधिकारी दृश्य",
    districtOps: "जिला कृषि कंट्रोल रूम चालू बा",
    loggedAsOfficer: "जिला कृषि अधिकारी के रूप में लॉगिन • कृषि नियंत्रण कक्ष",
    tabs: {
      dashboard: "डैशबोर्ड",
      simulator: "व्हाट-इफ सिम्युलेटर",
      disease: "बेमारी पहचान",
      irrigation: "स्मार्ट पटवन",
      crops: "फसल सलाह",
      market: "मंडी भाव आ बाजार",
      schemes: "सरकारी योजना आ नीति",
      assistant: "एआई किसान मित्र"
    },
    schemes: {
      badge: "सरकारी योजना आ सब्सिडी जानकारी",
      title: "सरकारी योजना, सब्सिडी आ जमीन के कानून",
      desc: "पीएम-किसान (₹6000), 80% ड्रिप/सोलर पंप सब्सिडी, फसल बीमा, केसीसी लोन आ 1998 से 2026 ले जमीन के सगरी सरकारी नीति आ ऑनलाइन फॉर्म लिंक।",
      allCategories: "सगरी योजना आ सब्सिडी",
      incomeSupport: "सीधा पईसा सहायता (PM-KISAN)",
      irrigationSolar: "पटवन आ सोलर पंप (PM-KUSUM)",
      insuranceRelief: "फसल बीमा (PMFBY)",
      loansCredit: "केसीसी आ सस्त कर्जा",
      machineryDrone: "ट्रैक्टर आ ड्रोन सब्सिडी",
      landTitling: "जमीन के कागज आ किसान आईडी",
      organicNatural: "जैविक आ देसी खेती",
      policyTimeline: "साल-दर-साल सरकारी कानून (1998–2026)",
      viewSchemes: "चालू सरकारी योजना आ लाभ",
      eligibility: "कवना किसान के मिली (पात्रता)",
      documents: "कवन-कवन कागज लागी",
      applyOfficial: "सरकारी वेबसाइट प फॉर्म भरीं",
      listenScheme: "योजना के जानकारी सुनीं",
      benefitAmount: "सरकारी पईसा आ सब्सिडी",
      searchPlaceholder: "योजना, ट्रैक्टर, सोलर, केसीसी खोजल जाव..."
    },
    dashboard: {
      title: "लाइव खेत टेलीमेट्री • खेत प्लॉट A1",
      farmerLabel: "किसान भाई",
      activeCropLabel: "बोअल फसल",
      healthScoreTitle: "खेत के सेहत स्कोर",
      healthScoreSub: "6 गो पैमाना मिला के बनावल स्कोर",
      optimal: "एकदम बढ़िया स्थिति",
      attention: "धियान देबे के जरूरत बा",
      aiRecommendationTitle: "एआई के खास सलाह",
      viewIrrigationPlan: "पटवन के प्लान देखीं",
      weather: "मौसम के हाल",
      soilMoisture: "माटी के नमी",
      cropHealth: "फसल के सेहत",
      diseaseRisk: "रोग-कीट के खतरा",
      marketPrice: "मंडी के भाव",
      nextAction: "आगे का करे के बा",
      irrigateTomorrow: "बिहाने पटवन करीं",
      healthy: "फसल निमन बा",
      low: "कम खतरा बा",
      hold: "अहिये रोकीं (HOLD)",
      humidity: "हवा में नमी",
      sensorTelemetry: "आईओटी माटी सेंसर टेलीमेट्री",
      sensorSimulator: "लाइव सेंसर सिम्युलेटर",
      hideSimulator: "सिम्युलेटर बंद करीं",
      quickActions: "झटपट काम के मॉड्यूल",
      targetMoisture: "लक्ष्य: 65%",
      depthRootZone: "गहिराई: 15 सेमी (जड़ क्षेत्र)",
      canopyNdvi: "वानस्पतिक अवस्था • फसल हरियरी: 0.78",
      chlorophyllNormal: "पत्ता के रंग: एकदम हरा आ स्वस्थ",
      fungalIndex: "फंगस के खतरा: 0.12 (कम)",
      mandiLocation: "इंदौर एपीएमसी मंडी",
      windowMorning: "समय: बिहाने 06:00 – 07:00 बजे (~35 मिनट)",
      waterSavedNote: "बचत: ~31,250 लीटर पानी",
      applyRecalculate: "सेंसर नाप लागू करीं आ एआई सलाह दोबारा निकालीं"
    },
    disease: {
      badge: "कंप्यूटर विज़न • फसल बेमारी जाँच इंजन",
      title: "एआई फसल बेमारी आ कीड़ा पहचान स्कैनर",
      desc: "पत्ता के फोटो अपलोड करीं भा खींचीं। हमार एआई मॉडल तुरंत बेमारी बता के देसी आ अंग्रेजी दवाई के सही मात्रा बताई।",
      uploadTitle: "पत्ता के फोटो अपलोड करीं",
      uploadPrompt: "फोटो चुने भा खींचे खातिर क्लिक करीं",
      demoSamples: "डेमो खातिर पत्ता नमूना (क्लिक करीं)",
      symptoms: "दिखे वाला मुख्य लच्छन",
      organicTab: "🌿 जैविक आ देसी इलाज",
      chemicalTab: "🧪 रासायनिक दवाई आ छिड़काव",
      preventionTab: "🛡️ आगे से बचाव के तरीका",
      listenVoice: "सलाह बोल के सुनीं",
      accuracyLabel: "जाँच के सटीकता",
      supportedLabel: "सगरी मुख्य फसल",
      confidence: "एआई भरोसा",
      pathogenType: "कीड़ा भा फंगस के प्रकार",
      affectedArea: "पत्ता के कतना भाग खराब बा",
      readyDiagnosis: "पत्ता जाँच खातिर तैयार बा",
      readyDesc: "पत्ता के फोटो अपलोड करीं भा बाएँ तरफ नमूना प क्लिक करीं।"
    },
    irrigation: {
      badge: "स्मार्ट पानी आ नमी आकलन इंजन",
      title: "स्मार्ट पटवन आ पानी बचाव सलाहकार",
      desc: "फसल के उमिर, माटी के नमी आ मौसम देख के जानीं कि केतना देर पानी पटावे के बा, ताकि 40% ले पानी आ बिजली बचे।",
      waterConserved: "पानी के बचत",
      powerSaved: "बिजली के बचत",
      cropParameters: "खेत आ फसल के जानकारी",
      targetCrop: "कवन फसल बा",
      growthStage: "फसल के अवस्था",
      soilTexture: "माटी के प्रकार",
      currentMoisture: "माटी के नमी अभी",
      rainForecast: "बारिश के उम्मीद (24 घंटा में)",
      fieldArea: "खेत के नाप (एकड़)",
      irrigateRequired: "पटवन जरूरी बा",
      noWaterNeeded: "माटी में नमी पूरा बा, पानी मत पटावीं",
      runTime: "केतना देर मोटर चलाईं",
      startPump: "स्मार्ट ड्रिप पंप चालू करीं",
      stopPump: "पंप बंद करीं",
      rationale: "एआई के वैज्ञानिक कारण",
      iotPumpController: "आईओटी स्मार्ट सिंचाई पंप स्विच",
      scheduleWindow: "पटवन के सही समय"
    },
    crops: {
      badge: "मशीन लर्निंग फसल आ पैदावार इंजन",
      title: "माटी हिसाब से फसल चुनाव आ आमदनी",
      desc: "माटी के खाद (N, P, K, pH) आ मौसम के हिसाब से जानीं कि कवन फसल बोवला से सबसे जादे पैदावार आ पईसा मिली।",
      inputsTitle: "माटी आ मौसम के नाप-जोख",
      rankedTitle: "रउआ खेत खातिर सबसे बढ़िया फसल",
      predictedYield: "अनुमानित पैदावार",
      suitability: "अनुकूलता",
      estimatedIncome: "अनुमानित कमाई",
      keyAdvice: "जरूरी किसानी सलाह",
      presetsLabel: "क्षेत्रीय इलाका के प्रीसेट (1-क्लिक में भरीं)",
      seasonLabel: "बोवाई के मौसम",
      soilTypeLabel: "माटी के प्रकार",
      calculateButton: "फसल आ कमाई के हिसाब निकालीं",
      autoMode: "ऑटो मोड (इलाका के मौसम हिसाब से सलाह)",
      manualMode: "मैनुअल मोड (अपना मन से माटी नापीं)",
      detectedLocation: "रउआ खेत के इलाका",
      detectedSeason: "अभी के फसल चक्र",
      detectedSoil: "क्षेत्रीय माटी",
      compareTab: "फसल के आमने-सामने तुलना आ मुनाफा",
      compareSubtitle: "कवन फसल में केतना फायदा, केतना पानी आ केतना लागत लागी; सब तुलना देखीं",
      selectCropsToCompare: "तुलना खातिर फसल चुनीं",
      netProfit: "शुद्ध मुनाफा (लागत काट के)",
      cultivationCost: "खेती में कुल लागत",
      waterIntensity: "पानी के जरूरत",
      growthDays: "तैयार होवे के दिन",
      riskRating: "कीड़ा आ मौसम के खतरा",
      roi: "मुनाफा प्रतिशत (ROI)",
      mandiPrice: "मंडी भाव / एमएसपी",
      grossRevenue: "कुल कमाई",
      winnerVerdict: "एआई फैसला",
      breakdownCost: "लागत के हिसाब"
    },
    market: {
      badge: "मंडी खुफिया आ भाव के चाल",
      title: "मंडी भाव आ फसल बेचे के सही फैसला",
      desc: "खाली भाव मत देखीं; जानीं कि फसल अभी रोकल ठीक होई (HOLD) कि तुरंते बेचल (SELL NOW) से जादे फायदा मिली।",
      spotRate: "आज के ताजा भाव",
      arbitrageFinder: "आस-पास के 3 गो मंडी के भाव तुलना",
      decisionOutput: "बेचे के फैसला",
      marketReasoning: "बाजार के रुझान",
      mspBenchmark: "सरकारी एमएसपी भाव"
    },
    assistant: {
      title: "एआई किसान मित्र (सलाहकार)",
      subtitle: "खेती-बारी, कीड़ा-मकोड़ा आ सरकारी योजना के जानकारी",
      placeholder: "फसल, खाद, पटवन चाहे पीएम-किसान योजना के बारे में पूछीं...",
      listening: "सुनत बानी... बोलीं किसान भाई...",
      welcome: "प्रणाम किसान भाई! हम रउआ के एआई किसान मित्र हईं। फसल में कवनो बेमारी लागल होखे, यूरिया के मात्रा, पटवन, चाहे पीएम-किसान योजना के बारे में कुछुओ बोल के भा लिख के पूछ लीं।",
      actionLabel: "उपाय"
    }
  },

  pa: {
    tagline: "ਅੰਦਾਜ਼ੇ ਛੱਡੋ, ਡਾਟਾ ਆਧਾਰਿਤ ਖੇਤੀ ਅਪਣਾਓ (ਕੋਡਬਿਲਡ 1.0)",
    farmHealth: "ਖੇਤ ਦੀ ਸਿਹਤ",
    pitchDeck: "ਪਿੱਚ ਪ੍ਰੈਜ਼ੈਂਟੇਸ਼ਨ",
    voiceAi: "ਏਆਈ ਆਵਾਜ਼",
    askVoice: "ਬੋਲ ਕੇ ਪੁੱਛੋ",
    farmerView: "🌾 ਕਿਸਾਨ ਵਿਊ",
    adminView: "🛡️ ਅਫਸਰ ਵਿਊ",
    districtOps: "ਜ਼ਿਲ੍ਹਾ ਖੇਤੀ ਕੰਟਰੋਲ ਰੂਮ ਸਰਗਰਮ",
    loggedAsOfficer: "ਜ਼ਿਲ੍ਹਾ ਖੇਤੀਬਾੜੀ ਅਫਸਰ ਲੌਗਿਨ • ਕੰਟਰੋਲ ਡੈਸਕ",
    tabs: {
      dashboard: "ਡੈਸ਼ਬੋਰਡ",
      simulator: "ਵ੍ਹਟ-ਇਫ਼ ਸਿਮੂਲੇਟਰ",
      disease: "ਬਿਮਾਰੀ ਪਛਾਣ",
      irrigation: "ਸਮਾਰਟ ਸਿੰਚਾਈ",
      crops: "ਫ਼ਸਲ ਚੋਣ ਤੇ ਝਾੜ",
      market: "ਮੰਡੀ ਭਾਅ ਤੇ ਫੈਸਲਾ",
      schemes: "ਸਰਕਾਰੀ ਸਕੀਮਾਂ",
      assistant: "ਏਆਈ ਕਿਸਾਨ ਸਲਾਹਕਾਰ"
    },
    crops: {
      badge: "ਮਸ਼ੀਨ ਲਰਨਿੰਗ ਬਹੁ-ਮਾਪਦੰਡ ਫੈਸਲਾ ਇੰਜਣ",
      title: "ਏਆਈ ਫ਼ਸਲ ਸਿਫਾਰਸ਼ ਅਤੇ ਝਾੜ ਅਨੁਮਾਨ",
      desc: "ਮਿੱਟੀ ਦੇ ਤੱਤ (N, P, K, pH) ਅਤੇ ਮੌਸਮ ਅਨੁਸਾਰ ਸਭ ਤੋਂ ਵੱਧ ਝਾੜ ਅਤੇ ਮੁਨਾਫ਼ੇ ਵਾਲੀਆਂ ਫ਼ਸਲਾਂ ਜਾਣੋ।",
      inputsTitle: "ਮਿੱਟੀ ਅਤੇ ਮੌਸਮ ਇਨਪੁਟ",
      rankedTitle: "ਸਭ ਤੋਂ ਢੁਕਵੀਆਂ ਸਿਫਾਰਸ਼ ਕੀਤੀਆਂ ਫ਼ਸਲਾਂ",
      predictedYield: "ਅਨੁਮਾਨਿਤ ਝਾੜ",
      suitability: "ਅਨੁਕੂਲਤਾ",
      estimatedIncome: "ਅਨੁਮਾਨਿਤ ਆਮਦਨ",
      keyAdvice: "ਮੁੱਖ ਖੇਤੀ ਸਲਾਹ",
      presetsLabel: "ਖੇਤਰੀ ਐਗਰੋ-ਕਲਾਈਮੇਟ ਪ੍ਰੀਸੈਟ",
      seasonLabel: "ਫ਼ਸਲ ਬਿਜਾਈ ਦਾ ਸੀਜ਼ਨ",
      soilTypeLabel: "ਮਿੱਟੀ ਦੀ ਕਿਸਮ",
      calculateButton: "ਫ਼ਸਲ ਅਨੁਕੂਲਤਾ ਦੀ ਗਣਨਾ ਕਰੋ",
      autoMode: "ਆਟੋ ਮੋਡ (ਲੋਕੇਸ਼ਨ ਆਧਾਰਿਤ ਏਆਈ ਸਲਾਹ)",
      manualMode: "ਮੈਨੂਅਲ ਮੋਡ (ਕਸਟਮ ਮਿੱਟੀ ਕਾਰਡ)",
      detectedLocation: "ਪਛਾਣਿਆ ਗਿਆ ਖੇਤ ਟਿਕਾਣਾ",
      detectedSeason: "ਮੌਜੂਦਾ ਫ਼ਸਲ ਚੱਕਰ",
      detectedSoil: "ਖੇਤਰੀ ਮਿੱਟੀ",
      compareTab: "ਫ਼ਸਲਾਂ ਦੀ ਆਹਮੋ-ਸਾਹਮਣੇ ਤੁਲਨਾ",
      compareSubtitle: "ਮੁਨਾਫ਼ਾ, ਪਾਣੀ ਦੀ ਖਪਤ, ਲਾਗਤ ਅਤੇ ਜੋਖਮ ਦੀ ਸਟੀਕ ਤੁਲਨਾ",
      selectCropsToCompare: "ਤੁਲਨਾ ਲਈ ਫ਼ਸਲਾਂ ਚੁਣੋ",
      netProfit: "ਸ਼ੁੱਧ ਮੁਨਾਫ਼ਾ (ਖਰਚੇ ਕੱਟ ਕੇ)",
      cultivationCost: "ਕੁੱਲ ਖੇਤੀ ਲਾਗਤ",
      waterIntensity: "ਪਾਣੀ ਦੀ ਲੋੜ",
      growthDays: "ਪੱਕਣ ਦੇ ਦਿਨ",
      riskRating: "ਕੀੜੇ ਤੇ ਮੌਸਮ ਦਾ ਜੋਖਮ",
      roi: "ਮੁਨਾਫ਼ਾ ਦਰ (ROI)",
      mandiPrice: "ਮੰਡੀ ਭਾਅ / ਐਮ.ਐਸ.ਪੀ",
      grossRevenue: "ਕੁੱਲ ਆਮਦਨ",
      winnerVerdict: "ਏਆਈ ਫੈਸਲਾ",
      breakdownCost: "ਲਾਗਤ ਵੇਰਵਾ"
    },
    assistant: {
      title: "ਏਆਈ ਕਿਸਾਨ ਸਲਾਹਕਾਰ",
      subtitle: "ਖੇਤੀਬਾੜੀ ਵਿਗਿਆਨ, ਕੀੜੇ-ਮਕੌੜੇ ਅਤੇ ਸਰਕਾਰੀ ਸਕੀਮਾਂ",
      placeholder: "ਫ਼ਸਲ, ਖਾਦ, ਪਾਣੀ ਜਾਂ ਪੀਐਮ-ਕਿਸਾਨ ਬਾਰੇ ਪੁੱਛੋ...",
      listening: "ਸੁਣ ਰਿਹਾ ਹੈ... ਬੋਲੋ ਜੀ...",
      welcome: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ! ਮੈਂ ਤੁਹਾਡਾ ਏਆਈ ਖੇਤੀ ਮਿੱਤਰ ਹਾਂ। ਫ਼ਸਲ ਬਿਮਾਰੀ, ਖਾਦ ਜਾਂ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ।"
    }
  },

  mr: {
    tagline: "अंदाज सोडा, डेटा-आधारित आधुनिक शेती करा (CodeBuild 1.0)",
    farmHealth: "शेत आरोग्य",
    pitchDeck: "सादरीकरण",
    voiceAi: "एआय आवाज",
    askVoice: "बोलून विचारा",
    farmerView: "🌾 शेतकरी दृश्य",
    adminView: "🛡️ अधिकारी दृश्य",
    districtOps: "जिल्हा कृषी नियंत्रण कक्ष सक्रिय",
    loggedAsOfficer: "जिल्हा कृषी अधिकारी लॉगिन • नियंत्रण कक्ष",
    tabs: {
      dashboard: "डॅशबोर्ड",
      simulator: "व्हॉट-इफ सिम्युलेटर",
      disease: "रोग निदान",
      irrigation: "स्मार्ट सिंचन",
      crops: "पीक निवड व उत्पादन",
      market: "बाजार भाव व निर्णय",
      schemes: "शासकीय योजना",
      assistant: "एआय कृषी मित्र"
    },
    crops: {
      badge: "मशीन लर्निंग बहु-निकष निर्णय इंजिन",
      title: "एआय पीक शिफारस आणि उत्पादन अंदाज",
      desc: "मातीतील पोषणद्रव्ये (N, P, K, pH) आणि हवामानानुसार सर्वाधिक उत्पादन व नफा देणारी पिके ओळखा.",
      inputsTitle: "माती आणि हवामान इनपुट",
      rankedTitle: "एमएल द्वारे शिफारस केलेली सर्वोत्तम पिके",
      predictedYield: "अंदाजित उत्पादन",
      suitability: "अनुकूलता",
      estimatedIncome: "अंदाजित निव्वळ उत्पन्न",
      keyAdvice: "महत्त्वाचा कृषी सल्ला",
      presetsLabel: "प्रादेशिक कृषी-हवामान प्रीसेट",
      seasonLabel: "पीक पेरणीचा हंगाम",
      soilTypeLabel: "मातीचा प्रकार",
      calculateButton: "पीक अनुकूलतेची गणना करा",
      autoMode: "ऑटो मोड (स्थान-आधारित एआय सल्ला)",
      manualMode: "मॅन्युअल मोड (माती परीक्षण कार्ड)",
      detectedLocation: "शोधलेले शेत स्थान",
      detectedSeason: "सध्याचा पीक हंगाम",
      detectedSoil: "प्रादेशिक माती",
      compareTab: "पिकांची समोरासमोर तुलना व अंतर्दृष्टी",
      compareSubtitle: "निव्वळ नफा, पाण्याची गरज, उत्पादन खर्च आणि हवामान धोक्याची सविस्तर तुलना",
      selectCropsToCompare: "तुलनेसाठी पिके निवडा",
      netProfit: "निव्वळ नफा (खर्च वजा करून)",
      cultivationCost: "एकूण लागवड खर्च",
      waterIntensity: "पाण्याची गरज",
      growthDays: "पक्व होण्याचे दिवस",
      riskRating: "कीड व हवामान जोखीम",
      roi: "गुंतवणुकीवरील परतावा (ROI)",
      mandiPrice: "बाजार भाव / हमीभाव (MSP)",
      grossRevenue: "एकूण उत्पन्न",
      winnerVerdict: "एआय आर्थिक निकाल",
      breakdownCost: "खर्चाचा तपशील"
    },
    assistant: {
      title: "एआय कृषी मित्र",
      subtitle: "कृषी विज्ञान, कीड नियंत्रण आणि सरकारी योजना",
      placeholder: "पीक, खत, पाणी किंवा पीएम-किसान बाबत विचारा...",
      listening: "ऐकत आहे... बोला शेतकरी बांधवांनो...",
      welcome: "नमस्कार शेतकरी मित्रांनो! मी तुमचा एआय कृषी मित्र आहे. पिकावरील रोग, खत नियोजन किंवा योजनांबद्दल बोला किंवा टाईप करून विचारा."
    }
  },

  gu: {
    tagline: "અંદાજ નહીં, ડેટા-આધારિત આધુનિક ખેતી (CodeBuild 1.0)",
    farmHealth: "ખેતર સ્વાસ્થ્ય",
    pitchDeck: "પીચ સ્લાઇડ્સ",
    voiceAi: "એઆઈ અવાજ",
    askVoice: "બોલીને પૂછો",
    farmerView: "🌾 ખેડૂત દૃશ્ય",
    adminView: "🛡️ અધિકારી દૃશ્ય",
    districtOps: "જિલ્લા કૃષિ કંટ્રોલ રૂમ સક્રિય",
    loggedAsOfficer: "જિલ્લા કૃષિ અધિકારી તરીકે લૉગિન",
    tabs: {
      dashboard: "ડેશબોર્ડ",
      simulator: "વ્હોટ-ઇફ સિમ્યુલેટર",
      disease: "રોગ નિદાન",
      irrigation: "સ્માર્ટ સિંચાઈ",
      crops: "પાક પસંદગી અને ઉપજ",
      market: "બજાર ભાવ અને નિર્ણય",
      schemes: "સરકારી યોજનાઓ",
      assistant: "એઆઈ કિસાન મિત્ર"
    },
    crops: {
      badge: "મશીન લર્નિંગ મલ્ટી-ક્રાઇટેરિયા એન્જિન",
      title: "એઆઈ પાક ભલામણ અને ઉપજ આગાહી",
      desc: "જમીનના પોષક તત્વો (N, P, K, pH) અને હવામાનના આધારે મહત્તમ ઉપજ અને નફો આપતા પાકોની માહિતી મેળવો.",
      inputsTitle: "જમીન અને હવામાન વિગત",
      rankedTitle: "સર્વોત્તમ ભલામણ કરેલ પાકો",
      predictedYield: "અંદાજિત ઉપજ",
      suitability: "અનુકૂળતા",
      estimatedIncome: "અંદાજિત આવક",
      keyAdvice: "મહત્વપૂર્ણ કૃષિ સલાહ",
      presetsLabel: "પ્રાદેશિક કૃષિ પ્રીસેટ",
      seasonLabel: "વાવણીની ઋતુ",
      soilTypeLabel: "જમીનનો પ્રકાર",
      calculateButton: "પાક અનુકૂળતાની ગણતરી કરો",
      autoMode: "ઓટો મોડ (લોકેશન આધારિત એઆઈ સલાહ)",
      manualMode: "મેન્યુઅલ મોડ (કસ્ટમ સોઇલ કાર્ડ)",
      detectedLocation: "ઓળખાયેલ ખેતર સ્થળ",
      detectedSeason: "હાલની પાક ઋતુ",
      detectedSoil: "પ્રાદેશિક જમીન",
      compareTab: "પાકોની સામસામે સરખામણી અને નફો",
      compareSubtitle: "ચોખ્ખો નફો, પાણીની જરૂરિયાત, ખેતી ખર્ચ અને જોખમની ચોક્કસ સરખામણી",
      selectCropsToCompare: "સરખામણી માટે પાક પસંદ કરો",
      netProfit: "ચોખ્ખો નફો (ખર્ચ બાદ)",
      cultivationCost: "કુલ ખેતી ખર્ચ",
      waterIntensity: "પાણીની જરૂરિયાત",
      growthDays: "પાકવાનો સમય (દિવસ)",
      riskRating: "જીવાત અને હવામાન જોખમ",
      roi: "રોકાણ પર વળતર (ROI)",
      mandiPrice: "બજાર ભાવ / એમએસપી",
      grossRevenue: "કુલ આવક",
      winnerVerdict: "એઆઈ આર્થિક નિર્ણય",
      breakdownCost: "ખર્ચ વિગત"
    },
    assistant: {
      title: "એઆઈ કિસાન મિત્ર",
      subtitle: "કૃષિ વિજ્ઞાન, જીવાત નિયંત્રણ અને સરકારી યોજનાઓ",
      placeholder: "પાક, ખાતર, પાણી અથવા યોજનાઓ વિશે પૂછો...",
      listening: "સાંભળી રહ્યું છે... બોલો ખેડૂત ભાઈ...",
      welcome: "નમસ્તે ખેડૂત મિત્રો! હું તમારો એઆઈ કૃષિ સલાહકાર છું. પાકના રોગ, ખાતર અથવા સરકારી યોજનાઓ વિશે પૂછો."
    }
  },

  bn: {
    tagline: "অনুমান নয়, ডেটা-ভিত্তিক আধুনিক কৃষি (CodeBuild 1.0)",
    farmHealth: "খামারের স্বাস্থ্য",
    pitchDeck: "পিচ ডেক",
    voiceAi: "এআই ভয়েস",
    askVoice: "ভয়েসে জিজ্ঞাসা করুন",
    farmerView: "🌾 কৃষক ভিউ",
    adminView: "🛡️ অফিসার ভিউ",
    districtOps: "জেলা কৃষি কমান্ড কন্ট্রোল রুম সক্রিয়",
    loggedAsOfficer: "জেলা কৃষি আধিকারিক লগইন • কন্ট্রোল ডেস্ক",
    tabs: {
      dashboard: "ড্যাশবোর্ড",
      simulator: "হোয়াট-ইফ সিমুলেটর",
      disease: "রোগ শনাক্তকরণ",
      irrigation: "স্মার্ট সেচ",
      crops: "ফসল নির্বাচন ও ফলন",
      market: "বাজার দর ও সিদ্ধান্ত",
      schemes: "সরকারি প্রকল্প",
      assistant: "এআই কৃষক বন্ধু"
    },
    crops: {
      badge: "মেশিন লার্নিং বহু-মানদণ্ড সিদ্ধান্ত ইঞ্জিন",
      title: "এআই ফসল সুপারিশ ও ফলন পূর্বাভাস",
      desc: "মাটির পুষ্টি উপাদান (N, P, K, pH) এবং জলবায়ুর ভিত্তিতে সর্বাধিক ফলন ও মুনাফাদায়ক ফসলের তালিকা জানুন।",
      inputsTitle: "মাটি ও আবহাওয়ার তথ্য",
      rankedTitle: "শীর্ষ প্রস্তাবিত ফসল তালিকা",
      predictedYield: "আনুমানিক ফলন",
      suitability: "অনুকূলতা",
      estimatedIncome: "আনুমানিক আয়",
      keyAdvice: "কৃষি পরামর্শ",
      presetsLabel: "আঞ্চলিক কৃষি প্রিসেট",
      seasonLabel: "ফসল বোনার মরশুম",
      soilTypeLabel: "মাটির ধরন",
      calculateButton: "ফসল উপযুক্ততা নির্ণয় করুন",
      autoMode: "স্বয়ংক্রিয় মোড (অবস্থান ভিত্তিক এআই পরামর্শ)",
      manualMode: "ম্যানুয়াল মোড (কাস্টম মৃত্তিকা কার্ড)",
      detectedLocation: "শনাক্তকৃত খামারের অবস্থান",
      detectedSeason: "বর্তমান ফসল চক্র",
      detectedSoil: "আঞ্চলিক মাটি",
      compareTab: "পাশাপাশি ফসলের বিশদ তুলনা ও অন্তর্দৃষ্টি",
      compareSubtitle: "নিট লাভ, জলের ব্যবহার, চাষের খরচ ও ঝুঁকির তুলনামূলক পর্যালোচনা",
      selectCropsToCompare: "তুলনার জন্য ফসল নির্বাচন করুন",
      netProfit: "নিট লাভ (খরচ বাদ দিয়ে)",
      cultivationCost: "মোট চাষের খরচ",
      waterIntensity: "জলের প্রয়োজনীয়তা",
      growthDays: "পাকার সময়কাল (দিন)",
      riskRating: "কীটপতঙ্গ ও আবহাওয়ার ঝুঁকি",
      roi: "বিনিয়োগে রিটার্ন (ROI)",
      mandiPrice: "বাজার দর / এমএসপি",
      grossRevenue: "মোট রাজস্ব",
      winnerVerdict: "এআই অর্থনৈতিক রায়",
      breakdownCost: "খরচের বিবরণ"
    },
    assistant: {
      title: "এআই কৃষক বন্ধু",
      subtitle: "কৃষি বিজ্ঞান, বালাই ব্যবস্থাপনা ও সরকারি সহায়তা",
      placeholder: "ফসল, সার, সেচ বা পিএম-কিসান সম্পর্কে জিজ্ঞাসা করুন...",
      listening: "শুনছি... বলুন কৃষক ভাই...",
      welcome: "নমস্কার কৃষক ভাই! আমি আপনার এআই কৃষি উপদেষ্টা। ফসলের রোগ, সার বা সরকারি প্রকল্প নিয়ে প্রশ্ন করুন।"
    }
  },

  te: {
    tagline: "అంచనాలు వద్దు, డేటా ఆధారిత వ్యవసాయం చేయండి (CodeBuild 1.0)",
    farmHealth: "పొలం ఆరోగ్యం",
    pitchDeck: "ప్రెజెంటేషన్",
    voiceAi: "AI వాయిస్",
    askVoice: "మాట్లాడి అడగండి",
    farmerView: "🌾 రైతు వీక్షణ",
    adminView: "🛡️ అధికారి వీక్షణ",
    districtOps: "జిల్లా వ్యవసాయ కంట్రోల్ రూమ్ క్రియాశీలం",
    loggedAsOfficer: "జిల్లా వ్యవసాయ అధికారి లాగిన్",
    tabs: {
      dashboard: "డ్యాష్‌బోర్డ్",
      simulator: "వాట్-ఇఫ్ సిమ్యులేటర్",
      disease: "తెగుళ్ళ నిర్ధారణ",
      irrigation: "స్మార్ట్ సాగునీరు",
      crops: "పంట సిఫార్సు & దిగుబడి",
      market: "మార్కెట్ ధరలు & నిర్ణయం",
      schemes: "ప్రభుత్వ పథకాలు",
      assistant: "AI రైతు మిత్ర"
    },
    crops: {
      badge: "మెషిన్ లెర్నింగ్ పంట దిగుబడి ఇంజిన్",
      title: "AI పంట సిఫార్సు & దిగుబడి అంచనా",
      desc: "నేల పోషకాలు (N, P, K, pH) మరియు వాతావరణం ఆధారంగా అత్యధిక దిగుబడి, ఆదాయం ఇచ్చే పంటలను ఎంచుకోండి.",
      inputsTitle: "నేల రసాయన & వాతావరణ సమాచారం",
      rankedTitle: "సిఫార్సు చేయబడిన అగ్ర పంటలు",
      predictedYield: "అంచనా దిగుబడి",
      suitability: "అనుకూలత",
      estimatedIncome: "అంచనా నికర ఆదాయం",
      keyAdvice: "ముఖ్యమైన వ్యవసాయ సలహా",
      presetsLabel: "ప్రాంతీయ వ్యవసాయ ప్రీసెట్లు",
      seasonLabel: "విత్తే కాలం / సీజన్",
      soilTypeLabel: "నేల రకం",
      calculateButton: "పంట అనుకూలతను లెక్కించండి",
      autoMode: "ఆటో మోడ్ (స్థాన ఆధారిత AI సలహా)",
      manualMode: "మాన్యువల్ మోడ్ (సొంత నేల సమాచారం)",
      detectedLocation: "గుర్తించిన పొలం ప్రాంతం",
      detectedSeason: "ప్రస్తుత పంట కాలం",
      detectedSoil: "ప్రాంతీయ నేల రకం",
      compareTab: "పంటల ప్రత్యక్ష పోలిక & సమగ్ర విశ్లేషణ",
      compareSubtitle: "నికర లాభం, నీటి అవసరం, సాగు ఖర్చు మరియు నష్టభయంపై స్పష్టమైన పోలిక",
      selectCropsToCompare: "పోల్చడానికి పంటలను ఎంచుకోండి",
      netProfit: "నికర లాభం (ఖర్చులు తీసివేసిన తర్వాత)",
      cultivationCost: "మొత్తం సాగు ఖర్చు",
      waterIntensity: "సాగునీటి అవసరం",
      growthDays: "పంట కాలపరిమితి (రోజులు)",
      riskRating: "తెగుళ్ళు & వాతావరణ నష్టభయం",
      roi: "పెట్టుబడిపై రాబడి (ROI)",
      mandiPrice: "మార్కెట్ ధర / మద్దతు ధర (MSP)",
      grossRevenue: "మొత్తం ఆదాయం",
      winnerVerdict: "AI ఆర్థిక తీర్పు",
      breakdownCost: "ఖర్చుల వివరాలు"
    },
    assistant: {
      title: "AI రైతు మిత్ర",
      subtitle: "వ్యవసాయ శాస్త్రం, తెగుళ్ళ నివారణ & ప్రభుత్వ పథకాలు",
      placeholder: "పంటలు, ఎరువులు, సాగునీరు లేదా పథకాలపై అడగండి...",
      listening: "వింటున్నాను... చెప్పండి రైతు సోదరా...",
      welcome: "నమస్కారం రైతు సోదరులారా! నేను మీ AI వ్యవసాయ మిత్రుడిని. పంట తెగుళ్ళు, ఎరువుల వాడకం లేదా పథకాలపై మాట్లాడి అడగండి."
    }
  },

  ta: {
    tagline: "ஊகங்கள் வேண்டாம், தரவு சார்ந்த நவீன விவசாயம் (CodeBuild 1.0)",
    farmHealth: "பண்ணை ஆரோக்கியம்",
    pitchDeck: "விளக்கக்காட்சி",
    voiceAi: "AI குரல்",
    askVoice: "பேசி கேளுங்கள்",
    farmerView: "🌾 விவசாயி பார்வை",
    adminView: "🛡️ அதிகாரி பார்வை",
    districtOps: "மாவட்ட வேளாண்மை கட்டுப்பாட்டு அறை இயங்குகிறது",
    loggedAsOfficer: "மாவட்ட வேளாண் அதிகாரி உள்நுழைவு",
    tabs: {
      dashboard: "டாஷ்போர்டு",
      simulator: "வாட்-இஃப் சிமுலேட்டர்",
      disease: "நோய் கண்டறிதல்",
      irrigation: "துல்லிய நீர்ப்பாசனம்",
      crops: "பயிர் தேர்வு & மகசூல்",
      market: "சந்தை விலை & முடிவு",
      schemes: "அரசு திட்டங்கள்",
      assistant: "AI உழவன் நண்பன்"
    },
    crops: {
      badge: "மெஷின் லேர்னிங் பல-அளவுகோல் முடிவு எஞ்சின்",
      title: "AI பயிர் பரிந்துரை மற்றும் மகசூல் கணிப்பு",
      desc: "மண் சத்துக்கள் (N, P, K, pH) மற்றும் வானிலைக்கேற்ப அதிக மகசூலும் லாபமும் தரும் பயிர்களை கண்டறியுங்கள்.",
      inputsTitle: "மண் மற்றும் காலநிலை விவரங்கள்",
      rankedTitle: "பரிந்துரைக்கப்பட்ட சிறந்த பயிர்கள்",
      predictedYield: "எதிர்பார்க்கப்படும் மகசூல்",
      suitability: "பொருத்தம்",
      estimatedIncome: "மதிப்பிடப்பட்ட வருமானம்",
      keyAdvice: "முக்கிய வேளாண் அறிவுரை",
      presetsLabel: "மண்டல வேளாண்மை முன்னமைவுகள்",
      seasonLabel: "பயிர் விதைப்பு பருவம்",
      soilTypeLabel: "மண் வகை",
      calculateButton: "பயிர் பொருத்தத்தை கணக்கிடுங்கள்",
      autoMode: "தானியங்கி பயன்முறை (இருப்பிட அடிப்படையிலான AI அறிவுரை)",
      manualMode: "கையேடு பயன்முறை (தனிப்பயன் மண் அட்டை)",
      detectedLocation: "கண்டறியப்பட்ட பண்ணை இருப்பிடம்",
      detectedSeason: "தற்போதைய பயிர் பருவம்",
      detectedSoil: "மண்டல மண் வகை",
      compareTab: "பயிர்களின் நேரடி ஒப்பீடு & நுண்ணறிவு",
      compareSubtitle: "நிகர லாபம், நீர் தேவை, சாகுபடி செலவு மற்றும் இடர் அளவுகளின் ஒப்பீடு",
      selectCropsToCompare: "ஒப்பிட வேண்டிய பயிர்களைத் தேர்வுசெய்க",
      netProfit: "நிகர லாபம் (செலவுகள் போக)",
      cultivationCost: "மொத்த சாகுபடி செலவு",
      waterIntensity: "நீர்த் தேவை",
      growthDays: "அறுவடை நாட்கள்",
      riskRating: "பூச்சி மற்றும் காலநிலை இடர்",
      roi: "முதலீட்டின் மீதான லாபம் (ROI)",
      mandiPrice: "சந்தை விலை / குறைந்தபட்ச ஆதரவு விலை",
      grossRevenue: "மொத்த வருவாய்",
      winnerVerdict: "AI பொருளாதார தீர்ப்பு",
      breakdownCost: "செலவு விவரம்"
    },
    assistant: {
      title: "AI உழவன் நண்பன்",
      subtitle: "வேளாண் அறிவியல், பூச்சி மேலாண்மை மற்றும் அரசு திட்டங்கள்",
      placeholder: "பயிர்கள், உரம், பாசனம் அல்லது அரசு மானியம் பற்றி கேளுங்கள்...",
      listening: "கேட்கிறது... பேசுங்கள் உழவர் தோழரே...",
      welcome: "வணக்கம் விவசாயத் தோழரே! நான் உங்கள் AI வேளாண்மை ஆலோசகர். பயிர் நோய்கள், உர நிர்வாகம் அல்லது அரசு திட்டங்கள் குறித்து கேளுங்கள்."
    }
  },

  kn: {
    tagline: "ಊಹೆಗಳನ್ನು ಬಿಡಿ, ಡೇಟಾ ಆಧಾರಿತ ಆಧುನಿಕ ಕೃಷಿ ಮಾಡಿ (CodeBuild 1.0)",
    farmHealth: "ಹೊಲದ ಆರೋಗ್ಯ",
    pitchDeck: "ಪ್ರಸ್ತುತಿ",
    voiceAi: "AI ಧ್ವನಿ",
    askVoice: "ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ",
    farmerView: "🌾 ರೈತರ ವೀಕ್ಷಣೆ",
    adminView: "🛡️ ಅಧಿಕಾರಿಗಳ ವೀಕ್ಷಣೆ",
    districtOps: "ಜಿಲ್ಲಾ ಕೃಷಿ ನಿಯಂತ್ರಣ ಕೊಠಡಿ ಸಕ್ರಿಯ",
    loggedAsOfficer: "ಜಿಲ್ಲಾ ಕೃಷಿ ಅಧಿಕಾರಿ ಲಾಗಿನ್ • ಕಂಟ್ರೋಲ್ ಡೆಸ್ಕ್",
    tabs: {
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      simulator: "ವಾಟ್-ಇಫ್ ಸಿಮ್ಯುಲೇಟರ್",
      disease: "ರೋಗ ಪತ್ತೆ",
      irrigation: "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ",
      crops: "ಬೆಳೆ ಶಿಫಾರಸು & ಇಳುವರಿ",
      market: "ಮಾರುಕಟ್ಟೆ ದರ & ನಿರ್ಧಾರ",
      schemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
      assistant: "AI ರೈತ ಮಿತ್ರ"
    },
    crops: {
      badge: "ಮೆಷಿನ್ ಲರ್ನಿಂಗ್ ಬೆಳೆ ಇಳುವರಿ ಎಂಜಿನ್",
      title: "AI ಬೆಳೆ ಶಿಫಾರಸು ಮತ್ತು ಇಳುವರಿ ಮುನ್ಸೂಚನೆ",
      desc: "ಮಣ್ಣಿನ ಪೋಷಕಾಂಶಗಳು (N, P, K, pH) ಮತ್ತು ಹವಾಮಾನದ ಆಧಾರದ ಮೇಲೆ ಗರಿಷ್ಠ ಇಳುವರಿ ಹಾಗೂ ಲಾಭ ನೀಡುವ ಬೆಳೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      inputsTitle: "ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ಇನ್‌ಪುಟ್",
      rankedTitle: "ಶಿಫಾರಸು ಮಾಡಲಾದ ಪ್ರಮುಖ ಬೆಳೆಗಳು",
      predictedYield: "ಅಂದಾಜು ಇಳುವರಿ",
      suitability: "ಹೊಂದಾಣಿಕೆ",
      estimatedIncome: "ಅಂದಾಜು ಆದಾಯ",
      keyAdvice: "ಪ್ರಮುಖ ಕೃಷಿ ಸಲಹೆ",
      presetsLabel: "ಪ್ರಾದೇಶಿಕ ಕೃಷಿ-ಹವಾಮಾನ ಪ್ರಿಸೆಟ್‌ಗಳು",
      seasonLabel: "ಬೆಳೆ ಬಿತ್ತನೆ ಋತು",
      soilTypeLabel: "ಮಣ್ಣಿನ ಪ್ರಕಾರ",
      calculateButton: "ಬೆಳೆ ಹೊಂದಾಣಿಕೆಯನ್ನು ಲೆಕ್ಕಹಾಕಿ",
      autoMode: "ಆಟೋ ಮೋಡ್ (ಸ್ಥಳ ಆಧಾರಿತ AI ಸಲಹೆ)",
      manualMode: "ಮ್ಯಾನುಯಲ್ ಮೋಡ್ (ಕಸ್ಟಮ್ ಮಣ್ಣು ಕಾರ್ಡ್)",
      detectedLocation: "ಗುರುತಿಸಲಾದ ಹೊಲದ ಸ್ಥಳ",
      detectedSeason: "ಪ್ರಸ್ತುತ ಬೆಳೆ ಋತು",
      detectedSoil: "ಪ್ರಾದೇಶಿಕ ಮಣ್ಣು",
      compareTab: "ಬೆಳೆಗಳ ಮುಖಾಮುಖಿ ಹೋಲಿಕೆ ಮತ್ತು ಒಳನೋಟಗಳು",
      compareSubtitle: "ನಿವ್ವಳ ಲಾಭ, ನೀರಿನ ಅವಶ್ಯಕತೆ, ಕೃಷಿ ವೆಚ್ಚ ಮತ್ತು ಅಪಾಯದ ನಿಖರ ಹೋಲಿಕೆ",
      selectCropsToCompare: "ಹೋಲಿಕೆ ಮಾಡಲು ಬೆಳೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
      netProfit: "ನಿವ್ವಳ ಲಾಭ (ವೆಚ್ಚ ಕಳೆದು)",
      cultivationCost: "ಒಟ್ಟು ಕೃಷಿ ವೆಚ್ಚ",
      waterIntensity: "ನೀರಿನ ಅವಶ್ಯಕತೆ",
      growthDays: "ಕಟಾವಿನ ದಿನಗಳು",
      riskRating: "ಕೀಟ ಮತ್ತು ಹವಾಮಾನ ಅಪಾಯ",
      roi: "ಹೂಡಿಕೆಯ ಮೇಲಿನ ಆದಾಯ (ROI)",
      mandiPrice: "ಮಾರುಕಟ್ಟೆ ದರ / ಬೆಂಬಲ ಬೆಲೆ (MSP)",
      grossRevenue: "ಒಟ್ಟು ಆದಾಯ",
      winnerVerdict: "AI ಆರ್ಥಿಕ ತೀರ್ಪು",
      breakdownCost: "ವೆಚ್ಚದ ವಿವರ"
    },
    assistant: {
      title: "AI ರೈತ ಮಿತ್ರ",
      subtitle: "ಕೃಷಿ ವಿಜ್ಞಾನ, ಕೀಟ ನಿಯಂತ್ರಣ ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
      placeholder: "ಬೆಳೆ, ರಸಗೊಬ್ಬರ, ನೀರಾವರಿ ಅಥವಾ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ...",
      listening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ... ಮಾತನಾಡಿ ರೈತ ಬಾಂಧವರೇ...",
      welcome: "ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಮಿತ್ರ. ಬೆಳೆ ರೋಗಗಳು, ಗೊಬ್ಬರ ನಿರ್ವಹಣೆ ಅಥವಾ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಕುರಿತು ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ."
    }
  }
};

// Fallback lookup
export function getTranslation(lang = 'en') {
  const base = TRANSLATIONS[lang] || TRANSLATIONS.en;
  // Deep fallback merge with English so all keys are guaranteed to exist
  return {
    ...TRANSLATIONS.en,
    ...base,
    tabs: { ...TRANSLATIONS.en.tabs, ...(base.tabs || {}) },
    crops: { ...TRANSLATIONS.en.crops, ...(base.crops || {}) },
    dashboard: { ...TRANSLATIONS.en.dashboard, ...(base.dashboard || {}) },
    disease: { ...TRANSLATIONS.en.disease, ...(base.disease || {}) },
    irrigation: { ...TRANSLATIONS.en.irrigation, ...(base.irrigation || {}) },
    market: { ...TRANSLATIONS.en.market, ...(base.market || {}) },
    schemes: { ...TRANSLATIONS.en.schemes, ...(base.schemes || {}) },
    assistant: { ...TRANSLATIONS.en.assistant, ...(base.assistant || {}) }
  };
}

// ==============================================================
// 🌾 COMPREHENSIVE REGIONAL LOCALIZATION LOOKUP HELPERS
// ==============================================================

export const CROP_NAMES_MAP = {
  Wheat: {
    en: "Wheat",
    hi: "गेहूं",
    bho: "गेहूं",
    pa: "ਕਣਕ",
    mr: "गहू",
    gu: "ઘઉં",
    bn: "গম",
    te: "గోధుమలు",
    ta: "கோதுமை",
    kn: "ಗೋಧಿ"
  },
  Tomato: {
    en: "Tomato",
    hi: "टमाटर",
    bho: "टमाटर",
    pa: "ਟਮਾਟਰ",
    mr: "टोमॅटो",
    gu: "ટામેટા",
    bn: "টমেটো",
    te: "టమోటా",
    ta: "தக்காளி",
    kn: "ಟೊಮ್ಯಾಟೊ"
  },
  "Paddy / Rice": {
    en: "Paddy / Rice",
    hi: "धान / चावल",
    bho: "धान / चाउर",
    pa: "ਝੋਨਾ / ਚੌਲ",
    mr: "भात / तांदूळ",
    gu: "ડાંગર / ચોખા",
    bn: "ধান / চাল",
    te: "వరి / బియ్యం",
    ta: "நெல் / அரிசி",
    kn: "ಭತ್ತ / ಅಕ್ಕಿ"
  },
  Cotton: {
    en: "Cotton",
    hi: "कपास",
    bho: "कपास",
    pa: "ਕਪਾਹ",
    mr: "कापूस",
    gu: "કપાસ",
    bn: "তুলা",
    te: "పత్తి",
    ta: "பருத்தி",
    kn: "ಹತ್ತಿ"
  },
  "Chickpea / Gram": {
    en: "Chickpea / Gram",
    hi: "चना",
    bho: "चना",
    pa: "ਛੋਲੇ / ਚਨਾ",
    mr: "हरभरा",
    gu: "ચણા",
    bn: "ছোলা",
    te: "శనగలు",
    ta: "கொண்டைக்கடலை",
    kn: "ಕಡಲೆ"
  },
  Mustard: {
    en: "Mustard",
    hi: "सरसों",
    bho: "सरसों / तोरी",
    pa: "ਸਰ੍ਹੋਂ",
    mr: "मोहरी",
    gu: "રાઈ / સરસવ",
    bn: "সরিষা",
    te: "ఆవాలు",
    ta: "கடுகு",
    kn: "ಸಾಸಿವೆ"
  },
  Maize: {
    en: "Maize / Corn",
    hi: "मक्का",
    bho: "मकई / भुट्टा",
    pa: "ਮੱਕੀ",
    mr: "मका",
    gu: "મકાઈ",
    bn: "ভুট্টা",
    te: "మొక్కజొన్న",
    ta: "மக்காச்சோளம்",
    kn: "ಮೆಕ್ಕೆಜೋಳ"
  },
  Potato: {
    en: "Potato",
    hi: "आलू",
    bho: "आलू",
    pa: "ਆਲੂ",
    mr: "बटाटा",
    gu: "બટાકા",
    bn: "আলু",
    te: "బంగాళాదుంప",
    ta: "உருளைக்கிழங்கு",
    kn: "ಆಲೂಗಡ್ಡೆ"
  },
  Onion: {
    en: "Onion",
    hi: "प्याज",
    bho: "पियाज",
    pa: "ਪਿਆਜ਼",
    mr: "कांदा",
    gu: "ડુંગળી",
    bn: "পেঁয়াজ",
    te: "ఉల్లిపాయ",
    ta: "வெங்காயம்",
    kn: "ಈರುಳ್ಳಿ"
  },
  Soybean: {
    en: "Soybean",
    hi: "सोयाबीन",
    bho: "सोयाबीन",
    pa: "ਸੋਇਆਬੀਨ",
    mr: "सोयाबीन",
    gu: "સોયાબીન",
    bn: "সয়াবিন",
    te: "సోయాబీన్",
    ta: "சோயாபீன்",
    kn: "ಸೋಯಾಬೀನ್"
  }
};

export const GROWTH_STAGES_MAP = {
  vegetative: {
    en: "Vegetative (Day 25-45)",
    hi: "वानस्पतिक अवस्था (25-45 दिन)",
    bho: "वानस्पतिक बढ़वार (25-45 दिन)",
    pa: "ਵਾਧੇ ਦੀ ਸਟੇਜ (25-45 ਦਿਨ)",
    mr: "शाकीय वाढ अवस्था (२५-४५ दिवस)",
    gu: "વાનસ્પતિક વૃદ્ધિ (૨૫-૪૫ દિવસ)",
    bn: "অঙ্গজ বৃদ্ধির পর্যায় (২৫-৪৫ দিন)"
  },
  tillering: {
    en: "Tillering / Branching",
    hi: "कल्ले फूटने की अवस्था",
    bho: "कल्ले फूटे के समय",
    pa: "ਫੋਟ ਪੈਣ ਦੀ ਸਟੇਜ",
    mr: "फुटवे फुटण्याची अवस्था",
    gu: "ફૂટવાની અવસ્થા",
    bn: "কুশি গজানোর পর্যায়"
  },
  flowering: {
    en: "Flowering & Pollination",
    hi: "फूल आने व परागण की अवस्था",
    bho: "फूल आवे के समय",
    pa: "ਫੁੱਲ ਪੈਣ ਦੀ ਸਟੇਜ",
    mr: "फुलोरा अवस्था",
    gu: "ફૂલ આવવાની અવસ્થા",
    bn: "ফুল ফোটার পর্যায়"
  },
  grain_filling: {
    en: "Grain / Fruit Filling",
    hi: "दाना / फल भरने की अवस्था",
    bho: "दाना भरे के समय",
    pa: "ਦਾਣਾ ਭਰਨ ਦੀ ਸਟੇਜ",
    mr: "दाणे भरण्याची अवस्था",
    gu: "દાણા ભરાવાની અવસ્થા",
    bn: "দানা ভরার পর্যায়"
  },
  maturity: {
    en: "Maturity / Ripening",
    hi: "परिपक्वता व पकने की अवस्था",
    bho: "फसल पके के समय",
    pa: "ਪੱਕਣ ਦੀ ਸਟੇਜ",
    mr: "पक्वता अवस्था",
    gu: "પાકવાની અવસ્થા",
    bn: "পাকার পর্যায়"
  }
};

export const SOIL_TYPES_MAP = {
  Loamy: {
    en: "Loamy (Optimal Water Retention)",
    hi: "दोमट मिट्टी (उत्तम जल धारण)",
    bho: "दोमट माटी (बढ़िया पानी सोखे वाली)",
    pa: "ਦੋਮਟ ਮਿੱਟੀ (ਵਧੀਆ ਨਮੀ ਵਾਲੀ)",
    mr: "काळी दोमट माती (उत्तम ओलावा)",
    gu: "ગોરાડુ જમીન",
    bn: "দোআঁশ মাটি"
  },
  Clay: {
    en: "Clay / Black Cotton Soil",
    hi: "चिकनी / काली कपास मिट्टी",
    bho: "चिकनी भा करिया कपास माटी",
    pa: "ਚੀਕਣੀ / ਕਾਲੀ ਮਿੱਟੀ",
    mr: "काळी कसदार माती",
    gu: "કાળી માટી",
    bn: "এঁটেল মাটি"
  },
  Sandy: {
    en: "Sandy / Light Soil",
    hi: "बलुई / हल्की मिट्टी",
    bho: "बलुई / हलुक माटी",
    pa: "ਰੇਤਲੀ ਮਿੱਟੀ",
    mr: "हलकी वालुकामय माती",
    gu: "રેતાળ જમીન",
    bn: "বেলে মাটি"
  },
  "Alluvial / Loamy": {
    en: "Alluvial / Loamy",
    hi: "जलोढ़ / दोमट उपजाऊ मिट्टी",
    bho: "जलोढ़ भा दोमट माटी",
    pa: "ਦਰਿਆਈ ਦੋਮਟ ਮਿੱਟੀ",
    mr: "गाळाची सुपीक माती",
    gu: "કાંપવાળી જમીન",
    bn: "পলি মাটি"
  }
};

export const SEASONS_MAP = {
  rabi: {
    en: "Rabi (Winter: Oct - Mar)",
    hi: "रबी (सर्दियों की फसल: अक्टू - मार्च)",
    bho: "रबी (जाड़ा के फसल: अक्टूबर - मार्च)",
    pa: "ਹਾੜ੍ਹੀ (ਸਰਦੀਆਂ ਦੀ ਫ਼ਸਲ)",
    mr: "रब्बी (हिवाळी हंगाम)",
    gu: "રવિ પાક (શિયાળુ)",
    bn: "রবি মৌসুম (শীতকালীন)"
  },
  kharif: {
    en: "Kharif (Monsoon: Jun - Oct)",
    hi: "खरीफ (मानसून फसल: जून - अक्टू)",
    bho: "खरीफ (बरसात के फसल: जून - अक्टूबर)",
    pa: "ਸਾਉਣੀ (ਮੀਂਹ ਦੀ ਫ਼ਸਲ)",
    mr: "खरीप (पावसाळी हंगाम)",
    gu: "ખરીફ પાક (ચોમાસુ)",
    bn: "খরিফ মৌসুম (বর্ষাকালীন)"
  },
  zaid: {
    en: "Zaid (Summer: Mar - Jun)",
    hi: "जायद (गर्मी की फसल: मार्च - जून)",
    bho: "जायद (गर्मी के फसल: मार्च - जून)",
    pa: "ਜ਼ਾਇਦ (ਗਰਮੀਆਂ ਦੀ ਫ਼ਸਲ)",
    mr: "उन्हाळी हंगाम",
    gu: "ઝાયદ પાક (ઉનાળુ)",
    bn: "জায়েদ মৌসুম (গ্রীষ্মকালীন)"
  }
};

export const PRESETS_MAP = {
  central: {
    en: "Semi-Arid Central India (Indore/Malwa)",
    hi: "अर्ध-शुष्क मध्य भारत (इंदौर / मालवा क्षेत्र)",
    bho: "मध्य भारत इलाका (इंदौर / मालवा)",
    pa: "ਮੱਧ ਭਾਰਤੀ ਖੇਤਰ",
    mr: "मध्य भारत (माळवा विभाग)",
    gu: "મધ્ય ભારત વિસ્તાર",
    bn: "মধ্য ভারত অঞ্চল"
  },
  north: {
    en: "Punjab-Haryana Irrigated Belt",
    hi: "पंजाब-हरियाणा सिंचित नहरी क्षेत्र",
    bho: "पंजाब-हरियाणा सिंचित नहर इलाका",
    pa: "ਪੰਜਾਬ-ਹਰਿਆਣਾ ਨਹਿਰੀ ਖੇਤਰ",
    mr: "पंजाब-हरियाणा बागायती पट्टा",
    gu: "પંજાબ-હરિયાણા પિયત વિસ્તાર",
    bn: "পাঞ্জাব-হরিয়ানা সেচ এলাকা"
  },
  deccan: {
    en: "Black Cotton Soil Belt (Maharashtra/Vidarbha)",
    hi: "काली मिट्टी कपास क्षेत्र (महाराष्ट्र / विदर्भ)",
    bho: "करिया माटी कपास इलाका (महाराष्ट्र / विदर्भ)",
    pa: "ਕਾਲੀ ਮਿੱਟੀ ਕਪਾਹ ਖੇਤਰ",
    mr: "काळ्या मातीचा पट्टा (विदर्भ/मराठवाडा)",
    gu: "કાળી જમીન વિસ્તાર (વિદર્ભ)",
    bn: "কালো মাটি তুলা অঞ্চল"
  },
  arid: {
    en: "Sandy Arid Zone (Rajasthan/Kutch)",
    hi: "रेतीला शुष्क क्षेत्र (राजस्थान / कच्छ)",
    bho: "रेतीला सूखा इलाका (राजस्थान / कच्छ)",
    pa: "ਰੇਤਲਾ ਖੇਤਰ (ਰਾਜਸਥਾਨ/ਕੱਛ)",
    mr: "कोरडवाहू वाळवंटी भाग",
    gu: "રેતાળ સૂકો વિસ્તાર (કચ્છ)",
    bn: "শুষ্ক বালুকাময় অঞ্চল"
  }
};

export const COMMODITY_NAMES_MAP = {
  wheat: {
    en: "Wheat (Lokwan / Sharbati)",
    hi: "गेहूं (लोकवान / शरबती)",
    bho: "गेहूं (लोकवान / शरबती)",
    pa: "ਕਣਕ (ਸ਼ਰਬਤੀ)",
    mr: "गहू (लोकवान / शरबती)",
    gu: "ઘઉં (લોકવાન)",
    bn: "গম (শরবতী)"
  },
  tomato: {
    en: "Tomato (Hybrid Super)",
    hi: "टमाटर (हाइब्रिड सुपर)",
    bho: "टमाटर (हाइब्रिड सुपर)",
    pa: "ਟਮਾਟਰ (ਹਾਈਬ੍ਰਿਡ)",
    mr: "टोमॅटो (हायब्रिड)",
    gu: "ટામેટા (હાઇબ્રિડ)",
    bn: "টমেটো (হাইব্রিড)"
  },
  rice: {
    en: "Rice (Basmati 1121)",
    hi: "धान / चावल (बासमती 1121)",
    bho: "धान / बासमती चाउर 1121",
    pa: "ਬਾਸਮਤੀ ਚੌਲ 1121",
    mr: "बासमती तांदूळ 1121",
    gu: "બાસમતી ચોખા 1121",
    bn: "বাসমতী চাল ১১২১"
  },
  cotton: {
    en: "Cotton (Medium Staple)",
    hi: "कपास (मध्यम रेशा)",
    bho: "कपास (मध्यम रेशा)",
    pa: "ਨਰਮਾ / ਕਪਾਹ",
    mr: "कापूस (मध्यम धागा)",
    gu: "કપાસ",
    bn: "তুলা"
  },
  onion: {
    en: "Onion (Nashik Red)",
    hi: "प्याज (नासिक लाल)",
    bho: "पियाज (नासिक लाल)",
    pa: "ਲਾਲ ਪਿਆਜ਼",
    mr: "नाशिक लाल कांदा",
    gu: "લાલ ડુંગળી",
    bn: "পেঁয়াজ (লাল)"
  },
  mustard: {
    en: "Mustard Seed",
    hi: "सरसों / राई",
    bho: "सरसों / तोरी",
    pa: "ਪੀਲੀ ਸਰ੍ਹੋਂ",
    mr: "पिवळी मोहरी",
    gu: "રાયડો / સરસવ",
    bn: "সরিষা বীজ"
  },
  soybean: {
    en: "Soybean (Yellow 9560)",
    hi: "सोयाबीन (पीला)",
    bho: "सोयाबीन",
    pa: "ਸੋਇਆਬੀਨ",
    mr: "सोयाबीन",
    gu: "સોયાબીન",
    bn: "সয়াবিন"
  },
  chana: {
    en: "Gram / Chickpea (Chana)",
    hi: "चना (देसी / डॉलर)",
    bho: "चना",
    pa: "ਛੋਲੇ (ਚਣਾ)",
    mr: "हरभरा (चना)",
    gu: "ચણા",
    bn: "ছোলা"
  },
  potato: {
    en: "Potato (Kufri Jyoti / Desi)",
    hi: "आलू (कुफरी ज्योति / देसी)",
    bho: "आलू (देसी)",
    pa: "ਆਲੂ",
    mr: "बटाटा",
    gu: "બટાટા",
    bn: "আলু"
  },
  garlic: {
    en: "Garlic (Lahsun Ooty / G2)",
    hi: "लहसुन (ऊटी / जी-2)",
    bho: "लहसुन",
    pa: "ਲਸਣ",
    mr: "लसूण",
    gu: "લસણ",
    bn: "রসুন"
  },
  cumin: {
    en: "Cumin / Jeera (Unjha Clean)",
    hi: "जीरा (उंझा मशीन क्लीन)",
    bho: "जीरा",
    pa: "ਜੀਰਾ",
    mr: "जिरे",
    gu: "જીરું",
    bn: "জিরা"
  },
  turmeric: {
    en: "Turmeric / Haldi (Finger)",
    hi: "हल्दी (राजापुरी / सेलम)",
    bho: "हरदी",
    pa: "ਹਲਦੀ",
    mr: "हळद",
    gu: "હળદર",
    bn: "হলুদ"
  },
  groundnut: {
    en: "Groundnut (Mungfali)",
    hi: "मूंगफली (राजकोट जी-20)",
    bho: "मूंगफली",
    pa: "ਮੂੰਗਫਲੀ",
    mr: "भुईमूग",
    gu: "મગફળી",
    bn: "চীনাবাদাম"
  },
  maize: {
    en: "Maize / Corn (Yellow Hybrid)",
    hi: "मक्का (पीला हाइब्रिड)",
    bho: "मक्का",
    pa: "ਮੱਕੀ",
    mr: "मका",
    gu: "મકાઈ",
    bn: "ভুট্টা"
  },
  bajra: {
    en: "Pearl Millet (Bajra)",
    hi: "बाजरा (देसी / हाइब्रिड)",
    bho: "बाजरा",
    pa: "ਬਾਜਰਾ",
    mr: "बाजरी",
    gu: "બાજરી",
    bn: "বাজরা"
  },
  sugarcane: {
    en: "Sugarcane",
    hi: "गन्ना (अगेती)",
    bho: "ऊख (गन्ना)",
    pa: "ਗੰਨਾ",
    mr: "ऊस",
    gu: "શેરડી",
    bn: "আখ"
  }
};

export const DISEASE_LOCALIZATION_MAP = {
  potato_late_blight: {
    name: {
      en: "Late Blight (Phytophthora infestans)",
      hi: "पछेती झुलसा रोग (Late Blight)",
      bho: "पछेती झुलसा बेमारी (आलू के झुलसा)",
      pa: "ਪਿਛੇਤਾ ਝੁਲਸ ਰੋਗ",
      mr: "उशिरा येणारा करपा रोग",
      gu: "પાછોતરો સુકારો",
      bn: "নাবী ধসা রোগ"
    },
    symptoms: {
      en: ["Water-soaked dark lesions on leaf tips", "White fuzzy fungal growth underneath in humidity", "Rapid browning of foliage"],
      hi: ["पत्तियों के किनारों पर गहरे भूरे पानीदार धब्बे", "नम मौसम में पत्ती की निचली सतह पर सफेद फफूंद", "पत्तियों का तेजी से सूखना व सड़ना"],
      bho: ["पत्ता के कोना प करिया पानी जइसन दाग", "हवा में नमी रहला प पत्ता के पाछे उज्जर फफूंद", "पत्ता के तेजी से झुलस के सुखल"],
      pa: ["ਪੱਤਿਆਂ 'ਤੇ ਕਾਲੇ-ਭੂਰੇ ਗਿੱਲੇ ਧੱਬੇ", "ਪੱਤੇ ਦੇ ਹੇਠਲੇ ਪਾਸੇ ਚਿੱਟੀ ਉੱਲੀ", "ਪੱਤਿਆਂ ਦਾ ਸੁੱਕਣਾ"]
    },
    organic: {
      en: ["Spray Bordeaux mixture (1%) or Copper Oxychloride", "Apply Trichoderma viride biological culture", "Prune and destroy severely infected leaves"],
      hi: ["बोर्डो मिश्रण (1%) या कॉपर ऑक्सीक्लोराइड का छिड़काव करें", "ट्राइकोडर्मा विरिडी (5 ग्राम/लीटर) जैविक स्प्रे करें", "संक्रमित पत्तियों को तोड़कर नष्ट करें, खेत में न छोड़ें"],
      bho: ["बोर्डो मिक्सचर (1%) भा कॉपर ऑक्सीक्लोराइड छिड़कीं", "ट्राइकोडर्मा विरिडी जैविक घोल के छिड़काव करीं", "खराब पत्ता तोड़ के खेत से दूर फेंक दीं भा जरा दीं"],
      pa: ["ਬੋਰਡੋ ਮਿਸ਼ਰਣ (1%) ਦਾ ਸਪਰੇਅ ਕਰੋ", "ਟਰਾਈਕੋਡਰਮਾ ਜੈਵਿਕ ਸਪਰੇਅ ਕਰੋ", "ਬਿਮਾਰੀ ਵਾਲੇ ਪੱਤੇ ਤੋੜ ਕੇ ਨਸ਼ਟ ਕਰੋ"]
    },
    chemical: {
      en: ["Mancozeb 75% WP @ 2.5g / Liter of water", "Metalaxyl + Mancozeb (Ridomil MZ) @ 2g / L", "Dimethomorph 50% WP @ 1g / L during outbreak"],
      hi: ["मैनकोजेब 75% WP @ 2.5 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें", "मेटालेक्सिल + मैनकोजेब (रिडोमिल) @ 2 ग्राम प्रति लीटर", "प्रकोप अधिक होने पर डाइमेथोमॉर्फ 50% WP @ 1 ग्राम/लीटर"],
      bho: ["मैनकोजेब 75% WP @ 2.5 ग्राम प्रति लीटर पानी में घोर के छिड़कीं", "रिडोमिल (Metalaxyl + Mancozeb) @ 2 ग्राम/लीटर छिड़कीं", "बेमारी जादे होखे त डाइमेथोमॉर्फ 50% WP @ 1 ग्राम/लीटर"],
      pa: ["ਮੈਨਕੋਜ਼ੇਬ 75% WP @ 2.5 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲਿਟਰ ਪਾਣੀ", "ਰਿਡੋਮਿਲ @ 2 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲਿਟਰ ਸਪਰੇਅ ਕਰੋ"]
    }
  },

  tomato_early_blight: {
    name: {
      en: "Early Blight (Alternaria solani)",
      hi: "अगेती झुलसा रोग (Early Blight)",
      bho: "अगेती झुलसा बेमारी (टमाटर के दाग)",
      pa: "ਅਗੇਤਾ ਝੁਲਸ ਰੋਗ",
      mr: "लवकर येणारा करपा रोग",
      gu: "અગેતરો સુકારો",
      bn: "আগাম ধসা রোগ"
    },
    symptoms: {
      en: ["Concentric ring 'target' spots on lower leaves", "Yellowing halo around brown spots", "Premature leaf drop"],
      hi: ["निचली पत्तियों पर गोल छल्लेदार गहरे कत्थई धब्बे", "धब्बों के चारों ओर पीला घेरा", "पत्तियों का पीला पड़कर गिरना"],
      bho: ["निचला पत्ता प गोल चक्र जइसन करिया दाग", "दाग के चारो ओर पियर घेरा बनल", "पत्ता पियर होके गिरल"],
      pa: ["ਪੱਤਿਆਂ 'ਤੇ ਗੋਲ ਚੱਕਰਦਾਰ ਧੱਬੇ", "ਪੱਤੇ ਪੀਲੇ ਹੋ ਕੇ ਝੜਨਾ"]
    },
    organic: {
      en: ["Spray Neem seed kernel extract (5%)", "Apply Pseudomonas fluorescens bio-fungicide", "Maintain proper mulching to prevent soil splash"],
      hi: ["नीम तेल या नीम बीज अर्क (5%) का छिड़काव करें", "स्यूडोमोनास फ्लोरोसेंस (5 ग्राम/लीटर) का स्प्रे करें", "मिट्टी पर मल्चिंग बिछाएं ताकि पानी के छींटे न पड़ें"],
      bho: ["नीम के तेल भा नीम काढ़ा (5%) के छिड़काव करीं", "स्यूडोमोनास जैविक फफूंदनाशी छिड़कीं", "जमीन प पुआल बिछा के मल्चिंग करीं"],
      pa: ["ਨਿੰਮ ਦੇ ਤੇਲ ਦਾ ਸਪਰੇਅ ਕਰੋ", "ਜੈਵਿਕ ਉੱਲੀਨਾਸ਼ਕ ਵਰਤੋ"]
    },
    chemical: {
      en: ["Chlorothalonil 75% WP @ 2g / Liter", "Azoxystrobin 23% SC @ 1ml / Liter", "Difenoconazole 25% EC @ 0.5ml / Liter"],
      hi: ["क्लोरोथैलोनिल 75% WP @ 2 ग्राम प्रति लीटर", "एज़ोक्सीस्ट्रोबिन 23% SC @ 1 मिली प्रति लीटर पानी", "डाइफेनोकोनाज़ोल 25% EC @ 0.5 मिली/लीटर"],
      bho: ["क्लोरोथैलोनिल 75% WP @ 2 ग्राम/लीटर पानी में छिड़कीं", "एज़ोक्सीस्ट्रोबिन 23% SC @ 1ml प्रति लीटर", "डाइफेनोकोनाज़ोल @ 0.5 मिली/लीटर"],
      pa: ["ਕਲੋਰੋਥੈਲੋਨਿਲ @ 2 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲਿਟਰ ਸਪਰੇਅ ਕਰੋ"]
    }
  },

  wheat_yellow_rust: {
    name: {
      en: "Yellow / Stripe Rust (Puccinia striiformis)",
      hi: "पीला रतुआ / हल्दी रोग (Yellow Rust)",
      bho: "पीला रतुआ / हरदी रोग (गेहूं के पियर दाग)",
      pa: "ਪੀਲੀ ਕੁੰਗੀ / ਹਲਦੀ ਰੋਗ",
      mr: "पिवळा तांबेरा रोग",
      gu: "પીળો ગેરુ રોગ",
      bn: "হলুদ মরিচা রোগ"
    },
    symptoms: {
      en: ["Yellow powdery stripes parallel to leaf veins", "Yellow dust rubs off on fingers", "Stunted growth and shriveled grains"],
      hi: ["पत्तियों पर नसों के समानांतर पीले चूर्ण की धारियां", "उंगली लगाने पर पीला पाउडर छूटना", "पौधों का विकास रुकना व दाना सिकुड़ना"],
      bho: ["पत्ता प नरी के साथ-साथ पियर पाउडर के लकीर", "छूवे प उंगली में पियर हरदी जइसन पाउडर लागल", "फसल के बढ़वार रुकना आ दाना पातर होखल"],
      pa: ["ਪੱਤਿਆਂ 'ਤੇ ਪੀਲੀਆਂ ਧਾਰੀਆਂ", "ਹੱਥ ਲਾਉਣ 'ਤੇ ਪੀਲਾ ਪਾਊਡਰ ਲੱਗਣਾ"]
    },
    organic: {
      en: ["Spray fermented cow urine + sour buttermilk (1:10)", "Dust sulfur powder at early onset", "Ensure balanced potassium nutrition"],
      hi: ["खट्टी छाछ और गोमूत्र (1:10 अनुपात) का छिड़काव करें", "शुरुआती लक्षण पर सल्फर डस्टिंग करें", "खेत में पोटाश की पर्याप्त मात्रा बनाए रखें"],
      bho: ["खट्टा छाछ आ गोमूत्र (1:10) मिला के छिड़कीं", "सुरु में सल्फर चूर्ण के धूरा मारीं", "खेत में पोटाश खाद के सही मात्रा राखीं"],
      pa: ["ਖੱਟੀ ਲੱਸੀ ਤੇ ਗਊ ਮੂਤਰ ਦਾ ਸਪਰੇਅ ਕਰੋ"]
    },
    chemical: {
      en: ["Propiconazole 25% EC (Tilt) @ 1ml / Liter", "Tebuconazole 25.9% EC @ 1ml / Liter", "Repeat after 12-14 days if morning fog persists"],
      hi: ["प्रोपिकोनाज़ोल 25% EC (टिल्ट) @ 1 मिली प्रति लीटर पानी", "टेबुकोनाज़ोल 25.9% EC @ 1 मिली/लीटर", "कोहरा जारी रहने पर 12-14 दिन बाद दोबारा छिड़कें"],
      bho: ["प्रोपिकोनाज़ोल 25% EC (टिल्ट) @ 1ml प्रति लीटर छिड़कीं", "टेबुकोनाज़ोल 25.9% EC @ 1 मिली प्रति लीटर पानी", "कोहरा रहे त 12-14 दिन बाद फेर छिड़कीं"],
      pa: ["ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ (ਟਿਲਟ) @ 1 ਮਿਲੀਲਿਟਰ ਪ੍ਰਤੀ ਲਿਟਰ ਸਪਰੇਅ ਕਰੋ"]
    }
  },

  rice_blast: {
    name: {
      en: "Rice Blast (Magnaporthe oryzae)",
      hi: "धान का झुलसा रोग (Rice Blast)",
      bho: "धान के झुलसा रोग (ब्लास्ट)",
      pa: "ਝੋਨੇ ਦਾ ਬਲਾਸਟ ਰੋਗ",
      mr: "भातावरील करपा रोग",
      gu: "ડાંગરનો કરપો",
      bn: "ধানের ব্লাস্ট রোগ"
    },
    symptoms: {
      en: ["Spindle-shaped diamond eye lesions with gray center", "Neck rot breaking panicles", "Widespread leaf drying"],
      hi: ["पत्तियों पर आंख के आकार के धब्बे जिनका केंद्र धूसर हो", "बाली की गर्दन का काला पड़कर टूटना", "पत्तियों का सूखना"],
      bho: ["पत्ता प आँख जइसन गोल-लम्बा धूसर दाग", "बाली के गर्दन करिया होके टूट गिरल", "पत्ता सुख के जरल"],
      pa: ["ਪੱਤਿਆਂ 'ਤੇ ਅੱਖ ਵਰਗੇ ਧੱਬੇ", "ਮੁੰਜਰਾਂ ਦਾ ਟੁੱਟਣਾ"]
    },
    organic: {
      en: ["Spray Pseudomonas fluorescens (10g/L)", "Avoid excess nitrogen fertilizer in cloudy weather", "Use resistant certified seed varieties"],
      hi: ["स्यूडोमोनास फ्लोरोसेंस (10 ग्राम/लीटर) का स्प्रे करें", "बादल छाए रहने पर अत्यधिक यूरिया न डालें", "प्रमाणित रोगरोधी बीजों का प्रयोग करें"],
      bho: ["स्यूडोमोनास जैविक दवा (10 ग्राम/लीटर) छिड़कीं", "बादल वाला मौसम में जादे यूरिया मत डालीं", "बढ़िया प्रमाणित बीया बोईं"],
      pa: ["ਸੂਡੋਮੋਨਾਸ ਜੈਵਿਕ ਸਪਰੇਅ ਕਰੋ"]
    },
    chemical: {
      en: ["Tricyclazole 75% WP @ 0.6g / Liter", "Isoprothiolane 40% EC @ 1.5ml / Liter", "Kasugamycin 3% SL @ 2ml / Liter"],
      hi: ["ट्राइसाइक्लाज़ोल 75% WP @ 0.6 ग्राम प्रति लीटर", "आइसोप्रोथियोलेन 40% EC @ 1.5 मिली/लीटर", "कासुगामाइसिन 3% SL @ 2 मिली/लीटर"],
      bho: ["ट्राइसाइक्लाज़ोल 75% WP @ 0.6 ग्राम/लीटर छिड़कीं", "आइसोप्रोथियोलेन 40% EC @ 1.5ml प्रति लीटर", "कासुगामाइसिन @ 2 मिली/लीटर छिड़कीं"],
      pa: ["ਟ੍ਰਾਈਸਾਈਕਲਾਜ਼ੋਲ @ 0.6 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲਿਟਰ ਸਪਰੇਅ ਕਰੋ"]
    }
  },

  cotton_bacterial_blight: {
    name: {
      en: "Cotton Bacterial Blight / Black Arm",
      hi: "कपास का जीवाणु झुलसा / ब्लैक आर्म रोग",
      bho: "कपास के जीवाणु झुलसा (ब्लैक आर्म)",
      pa: "ਕਪਾਹ ਦਾ ਜੀਵਾਣੂ ਝੁਲਸ ਰੋਗ",
      mr: "कापसावरील जिवाणूजन्य करपा",
      gu: "કપાસનો કાળો ચાઠો",
      bn: "তুলার ব্যাকটেরিয়াল ব্লাইট"
    },
    symptoms: {
      en: ["Angular water-soaked leaf spots bounded by veins", "Black lesions on stems (Black arm)", "Boll rot"],
      hi: ["पत्तियों पर कोणीय पानीदार धब्बे जो नसों से घिरे होते हैं", "तने पर काले घाव (ब्लैक आर्म)", "कपास के टिंडे सड़ना"],
      bho: ["पत्ता प कोनादार पानी जइसन दाग", "डंठल प करिया घाव (ब्लैक आर्म)", "कपास के टिंडा सड़ल"],
      pa: ["ਪੱਤਿਆਂ 'ਤੇ ਗਿੱਲੇ ਧੱਬੇ", "ਟਹਿਣੀਆਂ ਕਾਲੀਆਂ ਹੋਣਾ"]
    },
    organic: {
      en: ["Seed treatment with Cow dung slurry + Trichoderma", "Spray Copper Hydroxide biological mix", "Destroy crop debris after picking"],
      hi: ["बीज को गोबर के घोल और ट्राइकोडर्मा से उपचारित करें", "कॉपर हाइड्रॉक्साइड का जैविक छिड़काव करें", "चुनाई के बाद अवशेष नष्ट करें"],
      bho: ["बीया के गोबर घोल आ ट्राइकोडर्मा से शोधन करीं", "कॉपर हाइड्रॉक्साइड के छिड़काव करीं", "कपास चुने के बाद डंठल जरा दीं भा हटा दीं"],
      pa: ["ਬੀਜ ਸੋਧ ਕੇ ਬੀਜੋ", "ਕਾਪਰ ਸਪਰੇਅ ਕਰੋ"]
    },
    chemical: {
      en: ["Streptocycline 90:10 @ 0.1g + Copper Oxychloride @ 2.5g / L", "Kasugamycin 3% SL @ 2ml / Liter", "Repeat after 10 days if humid"],
      hi: ["स्ट्रेप्टोसाइक्लिन (1 ग्राम) + कॉपर ऑक्सीक्लोराइड (25 ग्राम) प्रति 10 लीटर पानी", "कासुगामाइसिन 3% SL @ 2 मिली/लीटर", "10 दिन बाद पुनः छिड़कें"],
      bho: ["स्ट्रेप्टोसाइक्लिन (1 ग्राम) + कॉपर ऑक्सीक्लोराइड (25 ग्राम) 10 लीटर पानी में मिला के छिड़कीं", "कासुगामाइसिन 3% SL @ 2ml प्रति लीटर पानी", "10 दिन बाद फेर छिड़कीं"],
      pa: ["ਸਟ੍ਰੈਪਟੋਸਾਈਕਲੀਨ + ਕਾਪਰ ਆਕਸੀਕਲੋਰਾਈਡ ਸਪਰੇਅ ਕਰੋ"]
    }
  },

  healthy_crop: {
    name: {
      en: "Healthy Crop - No Pathogen Detected",
      hi: "स्वस्थ फसल - कोई रोग या कीट नहीं",
      bho: "एकदम स्वस्थ फसल - कौनों बेमारी नइखे",
      pa: "ਸਿਹਤਮੰਦ ਫ਼ਸਲ - ਕੋਈ ਬਿਮਾਰੀ ਨਹੀਂ",
      mr: "निरोगी पीक - कोणताही रोग नाही",
      gu: "તંદુરસ્ત પાક - કોઈ રોગ નથી",
      bn: "সুস্থ ফসল - কোনো রোগ নেই"
    },
    symptoms: {
      en: ["Uniform vibrant green foliage", "No lesions or chlorosis", "Vigorous growth"],
      hi: ["पत्तियां पूरी तरह हरी व चमकदार", "कोई दाग या पीलापन नहीं", "पौधे का संतुलित विकास"],
      bho: ["पत्ता एकदम हरियर आ चमकदार बा", "कौनों दाग-धब्बा नइखे", "फसल के बढ़वार बहुत बढ़िया बा"],
      pa: ["ਪੱਤੇ ਹਰੇ-ਭਰੇ", "ਕੋਈ ਦਾਗ਼ ਨਹੀਂ"]
    },
    organic: {
      en: ["Continue balanced vermicompost application", "Maintain prophylactic neem oil spray every 15 days", "Regular field scouting"],
      hi: ["संतुलित वर्मीकम्पोस्ट खाद देते रहें", "हर 15 दिन में नीम तेल (3ml/L) का बचाव स्प्रे करें", "खेत की नियमित निगरानी रखें"],
      bho: ["गोबर के सड़ावल खाद भा केंचुआ खाद डालीं", "हर 15 दिन प नीम तेल (3ml/L) के छिड़काव करत रहीं", "खेत के रोज देखरेख करीं"],
      pa: ["ਰੂੜੀ ਖਾਦ ਪਾਓ", "ਨਿੰਮ ਦੇ ਤੇਲ ਦਾ ਸਪਰੇਅ ਰੱਖੋ"]
    },
    chemical: {
      en: ["No chemical pesticide required at this stage", "Apply water-soluble NPK 19:19:19 for vigor", "Preventive micro-nutrients spray"],
      hi: ["इस समय किसी रासायनिक कीटनाशक की आवश्यकता नहीं है", "विकास के लिए घुलनशील NPK 19:19:19 (5 ग्राम/लीटर) स्प्रे करें", "सूक्ष्म पोषक तत्वों का छिड़काव करें"],
      bho: ["अभी कवनो अंग्रेजी दवाई के जरूरत नइखे", "फसल के बढ़वार खातिर NPK 19:19:19 (5 ग्राम/लीटर) छिड़कीं", "हल्का सूक्ष्म पोषक तत्व स्प्रे करीं"],
      pa: ["ਕਿਸੇ ਰਸਾਇਣਕ ਦਵਾਈ ਦੀ ਲੋੜ ਨਹੀਂ"]
    }
  }
};

// Helper to translate disease result
export function getLocalizedDisease(sampleId, lang = 'en') {
  const data = DISEASE_LOCALIZATION_MAP[sampleId] || DISEASE_LOCALIZATION_MAP.healthy_crop;
  return {
    diseaseName: data.name[lang] || data.name.hi || data.name.en,
    symptoms: data.symptoms[lang] || data.symptoms.hi || data.symptoms.en,
    organicTreatments: data.organic[lang] || data.organic.hi || data.organic.en,
    chemicalControls: data.chemical[lang] || data.chemical.hi || data.chemical.en
  };
}
