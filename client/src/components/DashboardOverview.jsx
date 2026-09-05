import React, { useState, useMemo, useEffect } from 'react';
import { 
  CloudSun, 
  Droplet, 
  Sprout, 
  ShieldAlert, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight, 
  Zap, 
  RotateCw,
  Radio,
  Landmark,
  Camera,
  ScanLine,
  Coins,
  ChevronDown,
  ChevronUp,
  Mic,
  Power,
  Layers,
  Cpu,
  Volume2,
  VolumeX,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Check
} from 'lucide-react';
import { CROP_NAMES_MAP } from '../utils/translations';
import { togglePumpControl } from '../services/api';

export const OFFICIAL_ALL_INDIA_ADVISORIES = [
  {
    id: "national-imd-1",
    zoneId: "all_india",
    zoneLabel: "All India (National)",
    zoneLabelHi: "अखिल भारतीय (राष्ट्रीय)",
    icon: "🇮🇳",
    title: "ICAR & IMD Agromet National Advisory • Rabi Crop Temperature & Moisture Management",
    titleHi: "आईसीएआर एवं आईएमडी राष्ट्रीय कृषि बुलेटिन • रबी फसल तापमान व नमी प्रबंधन",
    issuer: "ICAR & IMD Agromet Advisory Service, New Delhi",
    issuerHi: "आईसीएआर एवं भारत मौसम विज्ञान विभाग (IMD), नई दिल्ली",
    level: "warning",
    timestamp: "Today • Verified National Bulletin",
    timestampHi: "आज • प्रमाणित राष्ट्रीय बुलेटिन",
    crops: "Wheat, Mustard, Gram, Barley",
    cropsHi: "गेहूं, सरसों, चना, जौ",
    advisory: "Rising day temperatures observed across North-West and Central India. Farmers advised to provide light and frequent irrigation to wheat during flowering/grain filling stage to prevent terminal heat stress. Complete harvesting of matured mustard to prevent pod shattering. Regularly monitor gram/chana for pod borer (Helicoverpa).",
    advisoryHi: "उत्तर-पश्चिम और मध्य भारत में दिन के तापमान में वृद्धि देखी जा रही है। गेहूं में दाना भरने व फूल आने की अवस्था पर हल्की सिंचाई करें ताकि तापमान के झटके (Terminal Heat) से दाना पतला न पड़े। पकी सरसों की कटाई तुरंत पूरी करें ताकि फलियां चटकने से दाना न गिरे। चने में फली छेदक (इल्ली) की नियमित निगरानी रखें।",
    action: "Light irrigation in wheat during early morning/evening; install 5 pheromone traps/acre in gram.",
    actionHi: "गेहूं में सुबह या शाम के समय हल्की सिंचाई करें; चने के खेत में 5 फेरोमोन ट्रैप प्रति एकड़ लगाएं।"
  },
  {
    id: "up-advisory-1",
    zoneId: "uttar_pradesh",
    zoneLabel: "Uttar Pradesh",
    zoneLabelHi: "उत्तर प्रदेश",
    icon: "🌾",
    title: "UP Krishi Vibhag & CSAUA&T Kanpur • Wheat Tillering & Mustard Aphid Control",
    titleHi: "उ.प्र. कृषि विभाग व सीएसए कृषि विश्वविद्यालय कानपुर • गेहूं व सरसों सुरक्षा सलाह",
    issuer: "Directorate of Agriculture, Lucknow & CSA Kanpur",
    issuerHi: "कृषि निदेशालय, लखनऊ एवं सीएसए कृषि विवि, कानपुर",
    level: "warning",
    timestamp: "Today • State Krishi Advisory",
    timestampHi: "आज • राज्य कृषि परामर्श",
    crops: "Wheat, Mustard, Potato",
    cropsHi: "गेहूं, सरसों, आलू",
    advisory: "In Central Gangetic Plains (Kanpur, Lucknow, Fatehpur, Unnao), late-sown wheat is entering jointing/booting stage. Apply second top-dressing of Urea (25-30 kg/acre) before irrigation. Mustard crop is highly vulnerable to Aphids (माहू/चेपा) — inspect terminal shoots; if aphid colonies exceed 10 per twig, spray Dimethoate 30% EC @ 1.5 ml/L or Neem oil (3000 ppm) @ 3 ml/L.",
    advisoryHi: "मध्य मैदानी क्षेत्र (कानपुर, लखनऊ, फतेहपुर, उन्नाव) में गेहूं में दूसरी सिंचाई के साथ 25-30 किग्रा यूरिया प्रति एकड़ दें। सरसों में माहू (चेपा) कीट की निगरानी रखें — शाखा पर 10 से अधिक कीट दिखने पर डाईमेथोएट 30 ईसी (1.5 मिली/ली) या नीम तेल (3000 पीपीएम) 3 मिली/ली का छिड़काव करें।",
    action: "Spray Dimethoate 30% EC or Neem Oil for mustard aphids; inspect potato foliage for late blight spots.",
    actionHi: "सरसों में माहू हेतु डाईमेथोएट या नीम तेल का छिड़काव करें; आलू में पछेती झुलसा के धब्बों की जांच करें।"
  },
  {
    id: "pb-advisory-1",
    zoneId: "punjab_haryana",
    zoneLabel: "Punjab & Haryana",
    zoneLabelHi: "पंजाब व हरियाणा",
    icon: "🚜",
    title: "PAU Ludhiana & HAU Hisar • Stripe / Yellow Rust Surveillance Alert",
    titleHi: "पीएयू लुधियाना व एचएयू हिसार • पीला रतुआ (Yellow Rust) सतर्कता बुलेटिन",
    issuer: "Punjab Agricultural University (PAU), Ludhiana",
    issuerHi: "पंजाब कृषि विश्वविद्यालय (PAU), लुधियाना",
    level: "critical",
    timestamp: "Today • High Alert",
    timestampHi: "आज • उच्च सतर्कता अलर्ट",
    crops: "Wheat, Barley",
    cropsHi: "गेहूं, जौ",
    advisory: "Foliar yellow stripes observed in foothill belts (Rupnagar, Hoshiarpur, Yamunanagar). Do not delay fungicide intervention: immediately spray Propiconazole 25 EC (Tilt / Bumper) @ 200 ml in 200 liters of water per acre. Avoid irrigation during high wind forecast to prevent lodging.",
    advisoryHi: "कंडी व तराई क्षेत्रों में गेहूं की पत्तियों पर पीली धारियों (Yellow Rust) के लक्षण दिखे हैं। तुरंत प्रोपिकोनाजोल 25 ईसी (Tilt) 200 मिली को 200 लीटर पानी में मिलाकर प्रति एकड़ छिड़काव करें। तेज हवाओं के दौरान सिंचाई बिल्कुल न करें ताकि फसल गिरने (Lodging) से बच सके।",
    action: "Immediate foliar spray of Propiconazole 25 EC @ 200 ml/acre; halt irrigation during wind gusts.",
    actionHi: "प्रोपिकोनाजोल 25 ईसी का 200 मिली/एकड़ की दर से तत्काल छिड़काव करें; तेज हवा के समय सिंचाई रोकें।"
  },
  {
    id: "mp-advisory-1",
    zoneId: "madhya_pradesh",
    zoneLabel: "Madhya Pradesh",
    zoneLabelHi: "मध्य प्रदेश",
    icon: "🌱",
    title: "RVSKVV Gwalior & KVK Indore • Gram Pod Borer & Garlic Thrips Protection",
    titleHi: "राजमाता कृषि विवि व केवीके इंदौर • चना फली छेदक (इल्ली) व लहसुन थ्रिप्स नियंत्रण",
    issuer: "State Agriculture Department, Bhopal & KVK Indore",
    issuerHi: "कृषि कल्याण विभाग, भोपाल एवं केवीके, इंदौर",
    level: "warning",
    timestamp: "Today • District Krishi Advisory",
    timestampHi: "आज • जिला कृषि परामर्श",
    crops: "Gram (Chana), Garlic, Wheat",
    cropsHi: "चना, लहसुन, गेहूं",
    advisory: "In Malwa and Nimar plateau, gram (chana) is at 50% pod filling stage. Install 5-6 pheromone traps per acre to monitor Helicoverpa moths. When 2-3 caterpillars per meter row length are seen, spray Emamectin Benzoate 5% SG @ 80g/acre or Chlorantraniliprole 18.5% SC @ 60ml/acre. In garlic, spray Fipronil 5% SC (1.5 ml/L) for curling leaves caused by thrips.",
    advisoryHi: "मालवा-निमाड़ में चना फली विकास की अवस्था में है। प्रति एकड़ 5-6 फेरोमोन ट्रैप लगाएं। ईटीएल (2-3 इल्ली प्रति मीटर) पार होने पर एमामेक्टिन बेंजोएट 5% एसजी 80 ग्राम/एकड़ या कोराजन 60 मिली/एकड़ का छिड़काव करें। लहसुन में पत्तियां मुड़ने पर थ्रिप्स नियंत्रण हेतु फिप्रोनिल 5% एससी छिड़कें।",
    action: "Install pheromone traps; spray Emamectin Benzoate @ 80g/acre on crossing economic injury level.",
    actionHi: "फेरोमोन ट्रैप लगाएं; इल्ली दिखने पर एमामेक्टिन बेंजोएट 80 ग्राम प्रति एकड़ का छिड़काव करें।"
  },
  {
    id: "raj-advisory-1",
    zoneId: "rajasthan",
    zoneLabel: "Rajasthan",
    zoneLabelHi: "राजस्थान",
    icon: "🏜️",
    title: "SKNAU Jobner & MPUAT Udaipur • Mustard White Rust & Frost Mitigation",
    titleHi: "एसकेएनएयू जोबनेर व एमपीयूएटी उदयपुर • सरसों सफेद रोली व पाला सुरक्षा बुलेटिन",
    issuer: "Directorate of Agriculture, Government of Rajasthan, Jaipur",
    issuerHi: "कृषि आयुक्तालय, राजस्थान सरकार, जयपुर",
    level: "info",
    timestamp: "Today • State Agro Alert",
    timestampHi: "आज • राज्य कृषि अलर्ट",
    crops: "Mustard, Cumin (Jeera), Isabgol",
    cropsHi: "सरसों, जीरा, इसबगोल",
    advisory: "Dry north-westerly cold winds blowing over semi-arid zones. If night temperatures forecast below 4°C, provide light irrigation or burn stubble on northern boundaries for smoke screen. For white rust pustules on mustard leaves, spray Metalaxyl + Mancozeb (Ridomil MZ) @ 2g/L.",
    advisoryHi: "उत्तर-पश्चिमी शुष्क हवाएं चल रही हैं। पाले की आशंका होने पर शाम के समय खेत की उत्तरी-पश्चिमी मेड़ों पर धुआं करें या हल्की सिंचाई दें। सरसों में सफेद फफोले (White Rust) दिखने पर रिडोमिल एमजेड 2 ग्राम प्रति लीटर पानी का छिड़काव करें।",
    action: "Burn border weeds for night frost protection; spray Ridomil MZ @ 2g/L for white rust.",
    actionHi: "पाले से बचाव हेतु खेत की मेड़ों पर धुआं करें; सफेद रोली पर रिडोमिल एमजेड 2 ग्राम/ली छिड़कें।"
  },
  {
    id: "mh-advisory-1",
    zoneId: "maharashtra",
    zoneLabel: "Maharashtra",
    zoneLabelHi: "महाराष्ट्र",
    icon: "🍇",
    title: "MPKV Rahuri & VNMKV Parbhani • Rabi Onion Thrips & Purple Blotch Warning",
    titleHi: "महात्मा फुले कृषि विद्यापीठ राहुरी • रबी प्याज थ्रिप्स व जामुनी धब्बा रोग",
    issuer: "Commissionerate of Agriculture, Pune",
    issuerHi: "कृषि आयुक्तालय, महाराष्ट्र राज्य, पुणे",
    level: "warning",
    timestamp: "Today • Regional Extension Advisory",
    timestampHi: "आज • विभागीय कृषि संदेश",
    crops: "Onion, Gram, Jowar, Grapes",
    cropsHi: "प्याज, चना, ज्वार, अंगूर",
    advisory: "Nashik, Pune, and Ahmednagar onion crops report Thrips and Alternaria purple blotch. Spray Fipronil 5% SC @ 1.5 ml/L mixed with Difenoconazole 25% EC @ 1 ml/L and agricultural sticker (0.5 ml/L). Ensure deep plowing of cotton fields to bury pink bollworm pupae.",
    advisoryHi: "नासिक, पुणे व अहमदनगर में प्याज में थ्रिप्स व जामुनी धब्बे के लक्षण दिख रहे हैं। फिप्रोनिल 5% एससी 1.5 मिली + डायफेनोकोनाजोल 25% ईसी 1 मिली प्रति लीटर पानी में स्टीकर मिलाकर छिड़काव करें। गुलाबी सुंडी रोकने हेतु कपास की पराटी नष्ट करें।",
    action: "Combined spray of Fipronil + Difenoconazole with sticker; deep plow harvested cotton fields.",
    actionHi: "स्टीकर मिलाकर फिप्रोनिल व फफूंदनाशक का छिड़काव करें; कपास के अवशेषों को नष्ट करें।"
  },
  {
    id: "bh-advisory-1",
    zoneId: "bihar",
    zoneLabel: "Bihar",
    zoneLabelHi: "बिहार",
    icon: "🌽",
    title: "BAU Sabour & RPCAU Pusa • Boro Rice Water Depth & Spring Maize Stem Borer",
    titleHi: "बिहार कृषि विवि सबौर व राजेंद्र कृषि विवि पूसा • बोरो धान व मक्का तना छेदक",
    issuer: "Directorate of Agriculture, Patna",
    issuerHi: "कृषि निदेशालय, बिहार सरकार, पटना",
    level: "info",
    timestamp: "Today • State Agromet Advisory",
    timestampHi: "आज • राज्य कृषि मौसम परामर्श",
    crops: "Boro Rice, Spring Maize, Lentil",
    cropsHi: "बोरो धान, वसंत मक्का, मसूर",
    advisory: "Maintain 3-5 cm shallow water in transplanted Boro rice fields. In spring maize, scout leaf whorls for Fall Armyworm / stem borer; apply Chlorantraniliprole 18.5% SC @ 0.4 ml/L or granular Cartap Hydrochloride 4G @ 7 kg/acre in leaf whorls.",
    advisoryHi: "बोरो धान में 3-5 सेमी पानी का स्तर बनाए रखें। वसंतकालीन मक्का में फॉल आर्मीवर्म या तना छेदक कीट की निगरानी करें; पत्ती के पोंगे में कोराजन 0.4 मिली/ली या कारटाप हाइड्रोक्लोराइड 4जी दानेदार का प्रयोग करें।",
    action: "Maintain water depth in Boro paddy; apply Coragen or Cartap 4G granules in maize leaf whorls.",
    actionHi: "बोरो धान में उचित जलस्तर रखें; मक्का में पोंगे के अंदर कोराजन या कारटाप 4जी डालें।"
  },
  {
    id: "south-advisory-1",
    zoneId: "south_india",
    zoneLabel: "South India",
    zoneLabelHi: "दक्षिण भारत",
    icon: "🌴",
    title: "TNAU Coimbatore & UAS Bangalore • Paddy Neck Blast & Nutrient Management",
    titleHi: "टीएनएयू कोयंबटूर व कृषि विवि बेंगलुरु • धान गर्दन तोड़ (Neck Blast) सतर्कता",
    issuer: "State Agricultural Management & Extension, Chennai / Bengaluru",
    issuerHi: "राज्य कृषि विस्तार एवं प्रबंधन, चेन्नई / बेंगलुरु",
    level: "info",
    timestamp: "Today • Southern Zone Advisory",
    timestampHi: "आज • दक्षिण भारत कृषि बुलेटिन",
    crops: "Paddy, Coconut, Blackgram",
    cropsHi: "धान, नारियल, उड़द",
    advisory: "Navarai / Thaladi paddy heading stage: inspect panicles for neck blast lesions. Prophylactically spray Tricyclazole 75% WP @ 1g/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/L. For coconut, apply root feeding of bio-control agents for root wilt.",
    advisoryHi: "धान की बाली निकलने की अवस्था में गर्दन तोड़ (Neck Blast) रोग की निगरानी करें। बचाव हेतु ट्राइसाइक्लाजोल 75% डब्ल्यूपी 1 ग्राम/ली का छिड़काव करें। नारियल में रूट विल्ट प्रबंधन हेतु जैविक दवाओं का प्रयोग करें।",
    action: "Spray Tricyclazole 75% WP @ 1g/L at early heading stage of paddy.",
    actionHi: "धान में बालियां निकलते समय ट्राइसाइक्लाजोल 75% डब्ल्यूपी 1 ग्राम/ली का छिड़काव करें।"
  }
];

export default function DashboardOverview({ 
  dashboardData, 
  farmLocation = { city: "Indore, Madhya Pradesh", temp: 29 },
  setActiveTab, 
  onSimulate, 
  language = "en",
  onOpenAssistant,
  onOpenWeather,
  farmerUser
}) {
  const [showAdvancedTelemetry, setShowAdvancedTelemetry] = useState(false);
  const [pumpRunning, setPumpRunning] = useState(dashboardData?.pumpStatus || false);
  const [simMoisture, setSimMoisture] = useState(dashboardData?.soilMoisture || 42);
  const [simRain, setSimRain] = useState(dashboardData?.telemetry?.rainForecastMm || 0);
  const [simN, setSimN] = useState(dashboardData?.telemetry?.nitrogen || 118);

  const weather = dashboardData?.weather || {
    temperature: 29,
    condition: "Clear",
    humidity: 45,
    rainfallForecast: "0 mm",
    forecast5Day: []
  };

  const telemetry = dashboardData?.telemetry || {
    soilMoisture: 42,
    nitrogen: 118,
    phosphorus: 58,
    potassium: 42,
    soilPh: 6.6,
    soilTemp: 22.4,
    ambientTemp: 29,
    humidity: 45
  };

  const broadcasts = dashboardData?.broadcasts || [];

  // Selected Official Advisory Zone State
  const defaultZoneId = useMemo(() => {
    const loc = (farmLocation?.city || '').toLowerCase();
    if (loc.includes('uttar pradesh') || loc.includes('kanpur') || loc.includes('lucknow') || loc.includes('up') || loc.includes('varanasi') || loc.includes('agra') || loc.includes('prayagraj') || loc.includes('bareilly') || loc.includes('gorakhpur')) {
      return 'uttar_pradesh';
    }
    if (loc.includes('punjab') || loc.includes('haryana') || loc.includes('ludhiana') || loc.includes('karnal') || loc.includes('amritsar') || loc.includes('bathinda') || loc.includes('patiala')) {
      return 'punjab_haryana';
    }
    if (loc.includes('madhya pradesh') || loc.includes('indore') || loc.includes('bhopal') || loc.includes('mp') || loc.includes('ujjain') || loc.includes('gwalior') || loc.includes('jabalpur')) {
      return 'madhya_pradesh';
    }
    if (loc.includes('rajasthan') || loc.includes('jaipur') || loc.includes('kota') || loc.includes('jodhpur') || loc.includes('bikaner') || loc.includes('udaipur')) {
      return 'rajasthan';
    }
    if (loc.includes('maharashtra') || loc.includes('pune') || loc.includes('nashik') || loc.includes('mumbai') || loc.includes('nagpur') || loc.includes('aurangabad') || loc.includes('solapur')) {
      return 'maharashtra';
    }
    if (loc.includes('bihar') || loc.includes('patna') || loc.includes('muzaffarpur') || loc.includes('gaya') || loc.includes('bhagalpur')) {
      return 'bihar';
    }
    if (loc.includes('karnataka') || loc.includes('tamil nadu') || loc.includes('andhra') || loc.includes('telangana') || loc.includes('bengaluru') || loc.includes('hyderabad') || loc.includes('chennai')) {
      return 'south_india';
    }
    return 'all_india';
  }, [farmLocation?.city]);

  const [selectedAdvisoryZone, setSelectedAdvisoryZone] = useState(defaultZoneId);
  const [showAllAdvisories, setShowAllAdvisories] = useState(false);
  const [speakingAdvisoryId, setSpeakingAdvisoryId] = useState(null);

  useEffect(() => {
    setSelectedAdvisoryZone(defaultZoneId);
  }, [defaultZoneId]);

  const activeAdvisory = useMemo(() => {
    return OFFICIAL_ALL_INDIA_ADVISORIES.find(a => a.zoneId === selectedAdvisoryZone) || OFFICIAL_ALL_INDIA_ADVISORIES[0];
  }, [selectedAdvisoryZone]);

  const handleVoiceAdvisory = (advisory) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingAdvisoryId === advisory.id) {
      window.speechSynthesis.cancel();
      setSpeakingAdvisoryId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const textToSpeak = language === 'hi' 
      ? `${advisory.titleHi}। जारीकर्ता: ${advisory.issuerHi}। सलाह: ${advisory.advisoryHi}। मुख्य सिफारिश: ${advisory.actionHi}`
      : `${advisory.title}. Issued by: ${advisory.issuer}. Advisory: ${advisory.advisory}. Recommended action: ${advisory.action}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.onend = () => setSpeakingAdvisoryId(null);
    utterance.onerror = () => setSpeakingAdvisoryId(null);
    setSpeakingAdvisoryId(advisory.id);
    window.speechSynthesis.speak(utterance);
  };

  const handleTogglePump = async () => {
    const newState = !pumpRunning;
    setPumpRunning(newState);
    try {
      await togglePumpControl(newState);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSimulateUpdate = () => {
    if (onSimulate) {
      onSimulate({
        soilMoisture: Number(simMoisture),
        rainForecastMm: Number(simRain),
        nitrogen: Number(simN)
      });
    }
  };

  const registeredCropKey = farmerUser?.primaryCrop || "Wheat";
  const localizedCrop = CROP_NAMES_MAP[registeredCropKey]?.[language] || registeredCropKey;
  const farmerName = farmerUser?.name || (language === 'hi' ? "राजेश कुमार" : "Rajesh Kumar");
  const farmerGreeting = language === 'hi' 
    ? `नमस्ते ${farmerName} जी 🙏` 
    : language === 'bho' 
    ? `राम-राम ${farmerName} भईया 🙏` 
    : `Welcome, ${farmerName} 🙏`;

  const getRegionalBulletinData = () => {
    const loc = farmLocation?.city || "Indore, Madhya Pradesh";
    const locLower = loc.toLowerCase();
    const temp = farmLocation?.temp || weather?.temperature || 29;
    const hum = weather?.humidity || 45;
    const rain = weather?.rainfallForecast || "0 mm";
    const cond = weather?.condition || "Clear";

    if (locLower.includes("lucknow") || locLower.includes("kanpur") || locLower.includes("up") || locLower.includes("uttar pradesh")) {
      return {
        regionTitle: language === 'hi' ? `📍 ${loc} कृषि मौसम बुलेटिन` : `📍 ${loc} Agro-Weather Bulletin`,
        agroZone: language === 'hi' ? 'मध्य गंगा मैदानी क्षेत्र' : 'Central Gangetic Plains Zone',
        advisory: language === 'hi' 
          ? `मौसम: ${temp}°C, आर्द्रता ${hum}%, वर्षा: ${rain}, स्थिति: ${cond}। गेहूं की वानस्पतिक अवस्था में पर्याप्त नमी बनाए रखें तथा सरसों व दलहन में माहू (एफिड) की नियमित निगरानी करें।`
          : `Weather: ${temp}°C, Humidity ${hum}%, Rain: ${rain}, Sky: ${cond}. Adequate root-zone moisture for wheat tillering; scout mustard for aphids.`,
        recommendation: language === 'hi'
          ? `तापमान ${temp}°C के अनुकूल नैनो यूरिया @ 4 मिली/लीटर का छिड़काव करें। बारिश का पूर्वानुमान 0mm रहने से उर्वरक प्रयोग सुरक्षित है।`
          : `Current ${temp}°C favors vegetative tillering. Spray Nano Urea @ 4ml/L. 0mm rain forecast ensures safe fertilizer uptake.`
      };
    } else if (locLower.includes("punjab") || locLower.includes("ludhiana") || locLower.includes("haryana") || locLower.includes("karnal")) {
      return {
        regionTitle: language === 'hi' ? `📍 ${loc} कृषि मौसम बुलेटिन` : `📍 ${loc} Agro-Weather Bulletin`,
        agroZone: language === 'hi' ? 'उत्तर-पश्चिम सिंचित खाद्यान्न क्षेत्र' : 'North-West Irrigated Cereal Zone',
        advisory: language === 'hi' 
          ? `मौसम: ${temp}°C, आर्द्रता ${hum}%। सुबह की ओस व धुंध के कारण पीला रतुआ (Yellow Rust) की पत्तियों पर नियमित जांच करें।`
          : `Weather: ${temp}°C, Humidity ${hum}%. Morning fog increases spore activity. Inspect lower canopy for yellow rust.`,
        recommendation: language === 'hi'
          ? `पीला रतुआ के लक्षण दिखते ही प्रोपिकोनाजोल 25% EC (टिल्ट) @ 1 मिली/लीटर का छिड़काव करें।`
          : `Keep Propiconazole 25% EC (Tilt) @ 1ml/L on standby for preventative canopy spray.`
      };
    } else if (locLower.includes("rajasthan") || locLower.includes("jaipur") || locLower.includes("kota")) {
      return {
        regionTitle: language === 'hi' ? `📍 ${loc} कृषि मौसम बुलेटिन` : `📍 ${loc} Agro-Weather Bulletin`,
        agroZone: language === 'hi' ? 'अर्ध-शुष्क पश्चिमी कृषि क्षेत्र' : 'Semi-Arid Western Agricultural Zone',
        advisory: language === 'hi' 
          ? `मौसम: ${temp}°C, आर्द्रता ${hum}%, वर्षा: ${rain}। तेज धूप के कारण वाष्पीकरण दर अधिक है।`
          : `Weather: ${temp}°C, Humidity ${hum}%, Rain: ${rain}. High solar irradiance and evapotranspiration rate.`,
        recommendation: language === 'hi'
          ? `जड़ क्षेत्र में नमी संरक्षण हेतु मल्चिंग अपनाएं तथा सरसों/चना में फली छेदक कीट का प्रबोधन करें।`
          : `Conserve soil moisture with straw mulching and monitor mustard/gram for pod borer.`
      };
    } else if (locLower.includes("maharashtra") || locLower.includes("nagpur") || locLower.includes("nashik")) {
      return {
        regionTitle: language === 'hi' ? `📍 ${loc} कृषि मौसम बुलेटिन` : `📍 ${loc} Agro-Weather Bulletin`,
        agroZone: language === 'hi' ? 'दक्कन पठार व विदर्भ क्षेत्र' : 'Deccan Plateau & Vidarbha Zone',
        advisory: language === 'hi' 
          ? `मौसम: ${temp}°C, आर्द्रता ${hum}%, वर्षा: ${rain}। कपास, सोयाबीन व प्याज में थ्रिप्स व कीट नियंत्रण पर ध्यान दें।`
          : `Weather: ${temp}°C, Humidity ${hum}%, Rain: ${rain}. Monitor onion, cotton & soybean for thrips/sucking pests.`,
        recommendation: language === 'hi'
          ? `नीम तेल (3000 ppm) @ 5 मिली/लीटर का छिड़काव करें और खेत में पीला चिपचिपा ट्रैप लगाएं।`
          : `Apply Neem Oil (3000 ppm) @ 5ml/L and install yellow sticky traps across the plot.`
      };
    } else if (locLower.includes("bihar") || locLower.includes("patna") || locLower.includes("varanasi")) {
      return {
        regionTitle: language === 'hi' ? `📍 ${loc} कृषि मौसम बुलेटिन` : `📍 ${loc} Agro-Weather Bulletin`,
        agroZone: language === 'hi' ? 'पूर्वी जलोढ़ मैदानी कृषि क्षेत्र' : 'Eastern Alluvial Plains Zone',
        advisory: language === 'hi' 
          ? `मौसम: ${temp}°C, आर्द्रता ${hum}%, वर्षा: ${rain}। मक्का, आलू व रबी फसलों में झुलसा रोग से बचाव करें।`
          : `Weather: ${temp}°C, Humidity ${hum}%, Rain: ${rain}. Scout maize, potato, and rabi crops for early foliar blight.`,
        recommendation: language === 'hi'
          ? `आलू व टमाटर में मैन्कोजेब 75% WP @ 2.5 ग्राम/लीटर का सुरक्षात्मक छिड़काव करें।`
          : `Spray protective Mancozeb 75% WP @ 2.5g/L on solanaceous crops.`
      };
    } else {
      return {
        regionTitle: language === 'hi' ? `📍 ${loc} कृषि मौसम बुलेटिन` : `📍 ${loc} Agro-Weather Bulletin`,
        agroZone: language === 'hi' ? 'मध्य भारत मालवा पठार' : 'Central India Agro-Climatic Belt',
        advisory: language === 'hi' 
          ? `मौसम: ${temp}°C, आर्द्रता ${hum}%, वर्षा: ${rain}, स्थिति: ${cond}। अनुकूल मौसम से फसलों की बढ़वार सामान्य है।`
          : `Weather: ${temp}°C, Humidity ${hum}%, Rain: ${rain}, Sky: ${cond}. Favorable climate ensuring steady vegetative growth.`,
        recommendation: language === 'hi'
          ? `मिट्टी नमी ${dashboardData?.soilMoisture || 42}% बनी हुई है। आगामी 48 घंटे में बारिश न होने से उर्वरक प्रयोग सुरक्षित है।`
          : `Soil moisture stable at ${dashboardData?.soilMoisture || 42}%. Zero rain forecast supports timely nutrient top-dressing.`
      };
    }
  };

  const bulletin = getRegionalBulletinData();

  return (
    <div className="space-y-6 pb-16 max-w-7xl mx-auto">
      
      {/* 🏛️ OFFICIAL AGRO ADVISORY FROM ALL OVER INDIA (ICAR & IMD AGROMET SERVICE) */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50/40 to-amber-50 border-2 border-amber-300/80 rounded-3xl p-5 sm:p-6 shadow-md shadow-amber-500/5 space-y-4">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/80">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 shrink-0 shadow-xs">
              <Radio className="w-5 h-5 animate-pulse text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200/90 text-amber-950 text-[11px] font-black uppercase tracking-wider">
                  {language === 'hi' ? 'आधिकारिक अखिल भारतीय कृषि परामर्श' : language === 'bho' ? 'सरकारी कृषि संदेश' : 'OFFICIAL AGRO ADVISORY • ICAR & IMD'}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                  {language === 'hi' ? 'सक्रिय राष्ट्रीय व राज्य बुलेटिन' : 'LIVE STATE & NATIONAL BULLETINS'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                {language === 'hi' 
                  ? 'भारतीय कृषि अनुसंधान परिषद (ICAR) व भारत मौसम विज्ञान विभाग (IMD) द्वारा जारी आधिकारिक संदेश।'
                  : 'Authenticated bulletins issued by ICAR, IMD Agromet, and State Agricultural Universities across India.'}
              </p>
            </div>
          </div>

          {/* Action Buttons: Listen & View All */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleVoiceAdvisory(activeAdvisory)}
              className="px-3 py-1.5 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-900 text-xs font-bold transition flex items-center gap-1.5 border border-amber-300 cursor-pointer shadow-xs"
              title="Listen Advisory Aloud"
            >
              {speakingAdvisoryId === activeAdvisory.id ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-700 animate-pulse" />
                  <span>{language === 'hi' ? 'रोकें' : 'Stop'}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                  <span>{language === 'hi' ? 'परामर्श सुनें 🔊' : 'Listen 🔊'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => setShowAllAdvisories(!showAllAdvisories)}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-slate-700 hover:text-slate-900 text-xs font-bold transition border border-amber-200 cursor-pointer shadow-xs flex items-center gap-1"
            >
              <span>{showAllAdvisories ? (language === 'hi' ? 'संक्षिप्त करें' : 'Collapse') : (language === 'hi' ? 'पूरे भारत के संदेश (8 राज्य) 🇮🇳' : 'All States (8 Zones) 🇮🇳')}</span>
              {showAllAdvisories ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* State / Region Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide shrink-0">
            {language === 'hi' ? 'राज्य / क्षेत्र चुनें:' : 'Select Region:'}
          </span>
          {OFFICIAL_ALL_INDIA_ADVISORIES.map((adv) => {
            const isSelected = adv.zoneId === selectedAdvisoryZone;
            return (
              <button
                key={adv.zoneId}
                onClick={() => setSelectedAdvisoryZone(adv.zoneId)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-500/40'
                    : 'bg-white/90 hover:bg-amber-100 text-slate-700 border border-amber-200'
                }`}
              >
                <span>{adv.icon}</span>
                <span>{language === 'hi' ? adv.zoneLabelHi : adv.zoneLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Selected Advisory Card */}
        <div className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                  activeAdvisory.level === 'critical'
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : activeAdvisory.level === 'warning'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-blue-100 text-blue-900 border border-blue-200'
                }`}>
                  {activeAdvisory.level === 'critical'
                    ? (language === 'hi' ? '🚨 अति महत्वपूर्ण अलर्ट' : '🚨 CRITICAL ALERT')
                    : activeAdvisory.level === 'warning'
                    ? (language === 'hi' ? '⚠️ सतर्कता चेतावनी' : '⚠️ WARNING ADVISORY')
                    : (language === 'hi' ? 'ℹ️ आधिकारिक परामर्श' : 'ℹ️ OFFICIAL ADVISORY')}
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {language === 'hi' ? activeAdvisory.timestampHi : activeAdvisory.timestamp}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                {language === 'hi' ? activeAdvisory.titleHi : activeAdvisory.title}
              </h3>
            </div>

            <div className="shrink-0 text-left sm:text-right">
              <span className="text-[11px] font-bold text-slate-500 block">
                {language === 'hi' ? 'जारीकर्ता संस्थान:' : 'Issuing Authority:'}
              </span>
              <span className="text-xs font-black text-slate-800">
                {language === 'hi' ? activeAdvisory.issuerHi : activeAdvisory.issuer}
              </span>
            </div>
          </div>

          {/* Crops Affected Pill */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-slate-500">{language === 'hi' ? 'संबद्ध फसलें:' : 'Target Crops:'}</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-xs">
              {language === 'hi' ? activeAdvisory.cropsHi : activeAdvisory.crops}
            </span>
          </div>

          {/* Full Advisory Narrative */}
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
            {language === 'hi' ? activeAdvisory.advisoryHi : activeAdvisory.advisory}
          </p>

          {/* Action Intervention Banner */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-2.5">
            <span className="text-base shrink-0 mt-0.5">💡</span>
            <div className="text-xs font-semibold">
              <span className="font-black text-amber-900 block sm:inline mr-1">
                {language === 'hi' ? 'अनुशंसित कृषि कार्य (Action):' : 'Recommended Farmer Action:'}
              </span>
              <span>{language === 'hi' ? activeAdvisory.actionHi : activeAdvisory.action}</span>
            </div>
          </div>
        </div>

        {/* Expandable Grid of All 8 India Regions (when toggled) */}
        {showAllAdvisories && (
          <div className="pt-3 border-t border-amber-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <span>🇮🇳</span>
                <span>{language === 'hi' ? 'पूरे भारत के राज्यवार आधिकारिक कृषि बुलेटिन' : 'All-India State-wise Official Bulletins'}</span>
              </h4>
              <span className="text-[11px] text-slate-500">{OFFICIAL_ALL_INDIA_ADVISORIES.length} {language === 'hi' ? 'राज्य बुलेटिन' : 'Regional Bulletins'}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {OFFICIAL_ALL_INDIA_ADVISORIES.map((adv) => {
                const isCurrent = adv.zoneId === selectedAdvisoryZone;
                return (
                  <div
                    key={adv.id}
                    onClick={() => setSelectedAdvisoryZone(adv.zoneId)}
                    className={`p-4 rounded-2xl border transition cursor-pointer ${
                      isCurrent
                        ? 'bg-white border-2 border-amber-500 shadow-md shadow-amber-500/10'
                        : 'bg-white/80 hover:bg-white border-amber-200 hover:border-amber-300 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                        <span>{adv.icon}</span>
                        <span>{language === 'hi' ? adv.zoneLabelHi : adv.zoneLabel}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                        adv.level === 'critical' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {adv.level}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800 line-clamp-1">
                      {language === 'hi' ? adv.titleHi : adv.title}
                    </h5>
                    <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                      {language === 'hi' ? adv.advisoryHi : adv.advisory}
                    </p>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                      <span className="text-emerald-700 font-bold">{language === 'hi' ? adv.cropsHi : adv.crops}</span>
                      <span className="text-amber-800 font-extrabold">{language === 'hi' ? 'विस्तार से देखें →' : 'View Full →'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 🌟 1. ONE-GLANCE TODAY'S FARM HERO BANNER (आज का खेत बुलेटिन - DYNAMIC WEATHER LOCATION) */}
      {/* ========================================================================= */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 bg-white border-2 border-emerald-500/30 shadow-xl shadow-emerald-500/5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left: Greeting & Dynamic Location Weather Bulletin */}
          <div className="space-y-3.5 flex-1">
            <div 
              onClick={onOpenWeather}
              className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 cursor-pointer hover:bg-emerald-200 transition group shadow-sm"
              title="Click to Change Farm Location & View Live Weather"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>🌾 {farmLocation?.city || 'Indore, Madhya Pradesh'}</span>
              <span className="text-[10px] text-emerald-800 underline font-extrabold group-hover:text-emerald-950 transition ml-1">
                [{language === 'hi' ? 'मौसम व स्थान बदलें ✏️' : 'Change Location ✏️'}]
              </span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {farmerGreeting}
              </h1>
              {farmerUser?.age && (
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-2xs">
                  🎂 {farmerUser.age} {language === 'hi' ? 'वर्ष' : 'yrs'}
                </span>
              )}
              {farmerUser?.district && (
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 shadow-2xs">
                  📍 {farmerUser.district}, {farmerUser.state}
                </span>
              )}
            </div>

            <p className="text-slate-600 text-sm sm:text-base font-medium flex items-center gap-2">
              <span>🌱 {language === 'hi' ? 'सक्रिय फसल:' : language === 'bho' ? 'फसल:' : 'Active Crop:'}</span>
              <strong className="text-emerald-700 font-bold">{localizedCrop}</strong>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 text-xs sm:text-sm">{language === 'hi' ? 'वानस्पतिक अवस्था (दिन 38)' : 'Vegetative Stage (Day 38)'}</span>
            </p>

            {/* Dynamic Localized Agro-Weather Bulletin */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/60 to-emerald-50 border border-emerald-300 text-emerald-950 text-xs sm:text-sm font-semibold space-y-2.5 max-w-3xl shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-emerald-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 animate-spin-slow" />
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {bulletin.regionTitle}
                  </span>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-black uppercase tracking-wide">
                  {bulletin.agroZone}
                </span>
              </div>
              
              <div className="text-xs text-slate-800 leading-relaxed">
                <span className="font-bold text-emerald-900">🌤️ {language === 'hi' ? 'मौसम स्थिति व विश्लेषण:' : 'Agro-Climate Advisory:'} </span>
                {bulletin.advisory}
              </div>

              <div className="p-2.5 rounded-xl bg-white/90 border border-emerald-200 text-[11px] text-emerald-950 flex items-center gap-2">
                <span className="font-black text-emerald-800 shrink-0 uppercase tracking-wider text-[10px]">
                  💡 {language === 'hi' ? 'कृषि सलाह:' : 'Action:'}
                </span>
                <span className="font-medium text-slate-800">{bulletin.recommendation}</span>
              </div>
            </div>

            {/* Farm Memory Historical Learning Pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-violet-50 text-violet-900 text-xs border border-violet-200 shadow-sm">
              <span className="font-bold">🧠 {language === 'hi' ? 'फार्म मेमोरी एआई:' : 'Farm Memory AI:'}</span>
              <span className="text-slate-700">
                {language === 'hi'
                  ? 'रबी 2025 में अत्यधिक नमी से पीला रतुआ लगा था। स्थानीय मौसम के अनुसार सुरक्षात्मक निगरानी बनाए रखें।'
                  : 'Learned from past season fungal risks. Maintaining timely surveillance based on local weather.'}
              </span>
            </div>
          </div>

          {/* Right: Quick Signal Cards (Health, Live Weather, Location Switcher) */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 shrink-0">
            
            {/* Health Score Pill */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 text-center flex flex-col justify-center items-center shadow-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-700">
                {dashboardData?.farmHealthScore || 87}<span className="text-xs text-slate-500">/100</span>
              </div>
              <div className="text-[11px] font-bold text-slate-700 mt-0.5">
                {language === 'hi' ? 'खेत स्वास्थ्य स्कोर' : language === 'bho' ? 'खेत सेहत' : 'Farm Health'}
              </div>
              <div className="text-[10px] text-emerald-700 font-bold">
                {language === 'hi' ? 'उत्कृष्ट स्थिति' : 'Optimal Health'}
              </div>
            </div>

            {/* Interactive Live Weather Pill */}
            <div 
              onClick={onOpenWeather}
              className="p-4 rounded-2xl bg-amber-50/80 border border-amber-300 hover:border-amber-400 hover:bg-amber-100 text-center flex flex-col justify-center items-center cursor-pointer transition transform hover:scale-105 group shadow-sm"
              title={`Live Weather for ${farmLocation.city} — Click to Change Location or View 7-Day Forecast`}
            >
              <div className="text-2xl sm:text-3xl font-black text-amber-700 flex items-center justify-center gap-1 group-hover:scale-110 transition">
                <CloudSun className="w-6 h-6 text-amber-600 animate-spin-slow" />
                <span>{farmLocation?.temp || weather?.temperature || 29}°C</span>
              </div>
              <div className="text-[11px] font-bold text-slate-800 mt-0.5 group-hover:text-amber-900 transition">
                {farmLocation?.city?.split(',')[0] || 'Live Weather'}
              </div>
              <div className="text-[10px] text-amber-700 font-extrabold">
                {language === 'hi' ? '7-दिवसीय मौसम ➔' : '7-Day Forecast ➔'}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 🛡️ PRE-SYMPTOM DISEASE EARLY WARNING CARD */}
      <div className="glass-panel-glow rounded-3xl p-5 sm:p-6 bg-gradient-to-r from-amber-50 via-white to-amber-50 border-2 border-amber-300 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="p-3 rounded-2xl bg-amber-100 text-amber-700 border border-amber-300 shrink-0">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-950 text-xs font-black uppercase tracking-wider border border-amber-400">
                  {language === 'hi' ? '⚠️ पूर्व-लक्षण प्रारंभिक चेतावनी (78% फंगल जोखिम)' : '⚠️ Pre-Symptom Early Warning (78% Fungal Risk)'}
                </span>
                <span className="text-[11px] text-slate-500 font-semibold">
                  {language === 'hi' ? 'बीमारी दिखने से पहले भविष्यवाणी' : 'Predicted before lesions appear'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                {language === 'hi' ? 'गेहूं पीला रतुआ एवं पर्ण झुलसा जोखिम • अनुकूल आर्द्रता (76%) एवं बारिश' : 'Yellow Rust & Foliar Blight Risk • High Humidity (76%) Detected'}
              </h3>
              <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                {language === 'hi'
                  ? 'पत्तियों पर रोग के लक्षण दिखने से पहले 48 घंटे के भीतर ट्राइकोडर्मा (5 ग्राम/लीटर) या प्रोपिकोनाजोल (1 मिली/लीटर) का छिड़काव करें।'
                  : 'Environmental micro-climate favors spore germination. Apply preventive Trichoderma viride or Propiconazole within 48h before physical lesions emerge.'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0 self-start sm:self-center">
            <button
              onClick={() => setActiveTab('disease')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs transition shadow-md whitespace-nowrap"
            >
              <span>{language === 'hi' ? 'निवारक दवा देखें →' : 'View Preventive Spray →'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 📱 2. THE 6 BIG, TOUCH-FRIENDLY FARMER ACTION TILES (CLEAN WHITE CARDS) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        
        {/* Tile 1: 📸 Scan Leaf Disease */}
        <div 
          onClick={() => setActiveTab('disease')}
          className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-emerald-500 bg-white cursor-pointer transition transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4 group shadow-sm"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center group-hover:scale-110 transition shadow-sm">
                <Camera className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase border border-emerald-200">
                {language === 'hi' ? 'एआई कैमरा' : language === 'bho' ? 'एआई कैमरा' : 'AI Vision'}
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition">
                {language === 'hi' ? '📸 फसल रोग पहचानें' : language === 'bho' ? '📸 बेमारी के पहचान' : '📸 AI Disease Scanner'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {language === 'hi' 
                  ? 'पत्ती की फोटो खींचें। हमारा एआई तुरंत बीमारी पहचानकर जैविक व रासायनिक दवा बताएगा।' 
                  : language === 'bho'
                  ? 'पत्ता के फोटो खींचीं। एआई तुरंत बेमारी पहचान के सही दवाई बताई।'
                  : 'Take a photo of any damaged leaf to get instant pathogen diagnosis & spray remedies.'}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <div className="w-full py-3 rounded-2xl bg-emerald-600 group-hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 transition">
              <ScanLine className="w-4 h-4" />
              <span>{language === 'hi' ? 'पत्ती की जांच करें →' : language === 'bho' ? 'पत्ता जाँचीं →' : 'Scan Leaf Photo →'}</span>
            </div>
          </div>
        </div>

        {/* Tile 2: ⚙️ What-If Agricultural Simulator */}
        <div 
          onClick={() => setActiveTab('simulator')}
          className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-emerald-500 bg-white cursor-pointer transition transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4 group shadow-sm"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center group-hover:scale-110 transition shadow-sm">
                <Cpu className="w-7 h-7 text-emerald-600" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase border border-emerald-200">
                {language === 'hi' ? 'सिमुलेशन एआई' : 'What-If AI'}
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition">
                {language === 'hi' ? '⚙️ व्हाट-इफ कृषि सिम्युलेटर' : language === 'bho' ? '⚙️ व्हाट-इफ फसल सिम्युलेटर' : '⚙️ What-If Simulator'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {language === 'hi' 
                  ? 'मौसम, सूखा, खाद या बाजार भाव बदलने पर अपनी फसल की पैदावार और मुनाफे का पहले से सटीक अनुमान लगाएं।' 
                  : language === 'bho'
                  ? 'मौसम, सूखा भा खाद के मात्रा बदले पर फसल के पैदावार आ मुनाफा पहिले से जांचीं।'
                  : 'Simulate climate shifts, fertilizer adjustments, and custom crops to forecast yield & profit.'}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <div className="w-full py-3 rounded-2xl bg-emerald-600 group-hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 transition">
              <Cpu className="w-4 h-4" />
              <span>{language === 'hi' ? 'सिम्युलेटर चलाएं →' : language === 'bho' ? 'सिम्युलेटर देखीं →' : 'Launch Simulator →'}</span>
            </div>
          </div>
        </div>

        {/* Tile 3: 💰 APMC Mandi Rates & Sell/Hold Advice */}
        <div 
          onClick={() => setActiveTab('market')}
          className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-amber-500 bg-white cursor-pointer transition transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4 group shadow-sm"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center group-hover:scale-110 transition shadow-sm">
                <Coins className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase border border-amber-200">
                {language === 'hi' ? 'रोकें (HOLD)' : language === 'bho' ? 'रोकीं (HOLD)' : 'HOLD'}
              </span>
            </div>

            <div>
              <div className="text-xs text-amber-800 font-extrabold">
                {language === 'hi' ? 'गेहूं: ₹2,480 / क्विंटल (+₹35 तेजी)' : 'Wheat: ₹2,480 / Qtl (+₹35)'}
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-amber-700 transition mt-0.5">
                {language === 'hi' ? '💰 आज का मंडी भाव' : language === 'bho' ? '💰 मंडी भाव आ सलाह' : '💰 Mandi Rates & Advice'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {language === 'hi' 
                  ? 'इंदौर मंडी में भाव बढ़ने का अनुमान है। अभी फसल रोकें, अगले हफ्ते ऊंचे दाम पर बेचें।' 
                  : language === 'bho'
                  ? 'मंडी में भाव अउरी बढ़े के उम्मीद बा। अभी फसल रोकीं, अगिला हफ्ता बेचीं।'
                  : 'Demand rising. Expected to reach ₹2,560. AI suggests holding stock for better profits.'}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <div className="w-full py-3 rounded-2xl bg-amber-500 group-hover:bg-amber-600 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 shadow-md shadow-amber-500/20 transition">
              <TrendingUp className="w-4 h-4" />
              <span>{language === 'hi' ? 'मंडी भाव व तेजी-मंदी →' : language === 'bho' ? 'मंडी भाव देखीं →' : 'Check Market Rates →'}</span>
            </div>
          </div>
        </div>

        {/* Tile 4: 🏛️ Govt Schemes, ₹6000 & Subsidies */}
        <div 
          onClick={() => setActiveTab('schemes')}
          className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-yellow-500 bg-white cursor-pointer transition transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4 group shadow-sm"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-yellow-50 text-yellow-700 border border-yellow-200 flex items-center justify-center group-hover:scale-110 transition shadow-sm">
                <Landmark className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-800 text-xs font-bold uppercase border border-yellow-200">
                {language === 'hi' ? 'PM-KISAN व सोलर' : 'PM-KISAN & Grants'}
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-yellow-700 transition">
                {language === 'hi' ? '🏛️ सरकारी योजनाएं व सब्सिडी' : language === 'bho' ? '🏛️ सरकारी योजना आ ₹6000' : '🏛️ Government Schemes'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {language === 'hi' 
                  ? '₹6,000 किसान सम्मान निधि, 80% ड्रिप सब्सिडी, सोलर पंप (PM-KUSUM) व आधिकारिक पोर्टल लिंक।' 
                  : language === 'bho'
                  ? '₹6,000 हर साल, 80% ड्रिप छूट, सोलर मोटर आ सगरी सरकारी फॉर्म के लिंक।'
                  : 'Access PM-KISAN ₹6000, 80% micro-irrigation subsidies, solar pumps & official apply portals.'}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <div className="w-full py-3 rounded-2xl bg-amber-500 group-hover:bg-amber-600 text-slate-950 font-black text-sm flex items-center justify-center space-x-2 shadow-md shadow-amber-500/20 transition">
              <ArrowUpRight className="w-4 h-4" />
              <span>{language === 'hi' ? 'योजनाएं व फॉर्म देखें →' : language === 'bho' ? 'सगरी योजना देखीं →' : 'Explore Schemes & Apply →'}</span>
            </div>
          </div>
        </div>

        {/* Tile 5: 🌱 Best Crop Recommendation */}
        <div 
          onClick={() => setActiveTab('crops')}
          className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-emerald-500 bg-white cursor-pointer transition transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4 group shadow-sm"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center group-hover:scale-110 transition shadow-sm">
                <Sprout className="w-7 h-7" />
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase border border-emerald-200">
                {language === 'hi' ? '94% पैदावार मैच' : '94% Match'}
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition">
                {language === 'hi' ? '🌱 कौन सी फसल लगाएं?' : language === 'bho' ? '🌱 कवन फसल बोवल जाव?' : '🌱 Crop Recommender'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {language === 'hi' 
                  ? 'अपनी मिट्टी और मौसम के अनुसार सबसे ज्यादा पैदावार और मुनाफा देने वाली फसलें चुनें।' 
                  : language === 'bho'
                  ? 'माटी आ मौसम के हिसाब से सबसे बेसी पैदावार आ मुनाफा देवे वाला फसल चुनीं।'
                  : 'AI ranks top crops for your soil chemistry with estimated yield & income per acre.'}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <div className="w-full py-3 rounded-2xl bg-emerald-600 group-hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/20 transition">
              <Sprout className="w-4 h-4" />
              <span>{language === 'hi' ? 'फसल सिफारिश देखें →' : language === 'bho' ? 'फसल सलाह देखीं →' : 'Get Crop Advice →'}</span>
            </div>
          </div>
        </div>

        {/* Tile 6: 🎙️ 1-Tap Voice AI Agronomist */}
        <div 
          onClick={onOpenAssistant}
          className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-200 hover:border-violet-500 bg-white cursor-pointer transition transform hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between space-y-4 group shadow-sm"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-violet-50 text-violet-700 border border-violet-200 flex items-center justify-center group-hover:scale-110 transition shadow-sm">
                <Mic className="w-7 h-7 animate-pulse text-violet-600" />
              </div>
              <span className="px-3 py-1 rounded-full bg-violet-50 text-violet-800 text-xs font-bold uppercase border border-violet-200">
                {language === 'hi' ? 'बोलकर पूछें' : language === 'bho' ? 'बोल के पूछीं' : 'Voice AI'}
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-violet-700 transition">
                {language === 'hi' ? '🎙️ एआई कृषि विशेषज्ञ' : language === 'bho' ? '🎙️ एआई किसान मित्र' : '🎙️ Voice AI Assistant'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                {language === 'hi' 
                  ? 'खाद की मात्रा, कीटनाशक छिड़काव, या सिंचाई के बारे में अपनी भाषा में बोलकर पूछें।' 
                  : language === 'bho'
                  ? 'खाद, दवाई, पटवन या सरकारी योजना के बारे में बोल के पूछीं, तुरंत जवाब मिली।'
                  : 'Ask agronomy questions, urea dosage, and disease remedies aloud in your regional language.'}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <div className="w-full py-3 rounded-2xl bg-violet-600 group-hover:bg-violet-500 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-md shadow-violet-600/20 transition">
              <Mic className="w-4 h-4" />
              <span>{language === 'hi' ? 'बोलिए किसान भाई 🎙️' : language === 'bho' ? 'बोल के पूछीं 🎙️' : 'Tap to Speak 🎙️'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 🔬 3. COLLAPSIBLE ADVANCED IOT SENSORS & SIMULATOR (CLEAN LIGHT ACCORDION) */}
      {/* ========================================================================= */}
      <div className="glass-panel rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-sm">
        
        {/* Accordion Toggle Header */}
        <button
          onClick={() => setShowAdvancedTelemetry(!showAdvancedTelemetry)}
          className="w-full p-5 sm:p-6 flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {language === 'hi' ? '🔬 उन्नत मिट्टी रसायन एवं आईओटी सेंसर डेटा' : language === 'bho' ? '🔬 माटी जाँच आ आईओटी सेंसर डेटा' : '🔬 Advanced Soil Chemistry & IoT Sensor Telemetry'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'hi' ? 'नाइट्रोजन (N), फास्फोरस (P), पोटाश (K), pH, मिट्टी तापमान एवं सेंसर सिम्युलेटर' : 'NPK values, soil pH, moisture gauges, and telemetry simulator'}
              </p>
            </div>
          </div>

          <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 shadow-sm">
            {showAdvancedTelemetry ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </button>

        {/* Collapsed Content */}
        {showAdvancedTelemetry && (
          <div className="p-5 sm:p-6 border-t border-slate-200 space-y-6 bg-slate-50/50">
            
            {/* 6 Sensor Telemetry Gauges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">Nitrogen (N)</div>
                <div className="text-xl font-black text-slate-900 mt-1">{telemetry.nitrogen} <span className="text-xs font-normal text-slate-400">kg/ha</span></div>
                <div className="text-[10px] text-emerald-700 font-bold">{language === 'hi' ? 'पर्याप्त' : 'Adequate'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">Phosphorus (P)</div>
                <div className="text-xl font-black text-slate-900 mt-1">{telemetry.phosphorus} <span className="text-xs font-normal text-slate-400">kg/ha</span></div>
                <div className="text-[10px] text-emerald-700 font-bold">{language === 'hi' ? 'संतुलित' : 'Balanced'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">Potassium (K)</div>
                <div className="text-xl font-black text-slate-900 mt-1">{telemetry.potassium} <span className="text-xs font-normal text-slate-400">kg/ha</span></div>
                <div className="text-[10px] text-emerald-700 font-bold">{language === 'hi' ? 'उत्तम' : 'Optimal'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">Soil pH</div>
                <div className="text-xl font-black text-slate-900 mt-1">{telemetry.soilPh}</div>
                <div className="text-[10px] text-cyan-700 font-bold">{language === 'hi' ? 'आदर्श (उदासीन)' : 'Neutral (6.6)'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">Soil Temp</div>
                <div className="text-xl font-black text-slate-900 mt-1">{telemetry.soilTemp}°C</div>
                <div className="text-[10px] text-emerald-700 font-bold">{language === 'hi' ? 'अनुकूल' : 'Favorable'}</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">Solar Radiation</div>
                <div className="text-xl font-black text-slate-900 mt-1">7.2 <span className="text-xs font-normal text-slate-400">kWh</span></div>
                <div className="text-[10px] text-amber-700 font-bold">{language === 'hi' ? 'प्रखर' : 'High'}</div>
              </div>
            </div>

            {/* Interactive Telemetry Slider Simulator */}
            <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  {language === 'hi' ? 'लाइव सेंसर सिम्युलेटर (परीक्षण हेतु)' : 'Live Sensor Telemetry Simulator (For Demo Testing)'}
                </span>
                <span className="text-xs text-slate-500">
                  {language === 'hi' ? 'स्लाइडर बदलकर एआई सलाह में बदलाव देखें' : 'Slide values to test AI recommendation recalibration'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="text-slate-700 flex justify-between font-medium">
                    <span>{language === 'hi' ? 'मिट्टी की नमी' : 'Soil Moisture'}:</span>
                    <span className="font-bold text-cyan-700">{simMoisture}%</span>
                  </label>
                  <input 
                    type="range" 
                    min="15" 
                    max="85" 
                    value={simMoisture}
                    onChange={(e) => setSimMoisture(e.target.value)}
                    className="w-full mt-2 accent-cyan-600"
                  />
                </div>

                <div>
                  <label className="text-slate-700 flex justify-between font-medium">
                    <span>{language === 'hi' ? 'बारिश पूर्वानुमान' : 'Rain Forecast'}:</span>
                    <span className="font-bold text-blue-700">{simRain} mm</span>
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="60" 
                    value={simRain}
                    onChange={(e) => setSimRain(e.target.value)}
                    className="w-full mt-2 accent-blue-600"
                  />
                </div>

                <div>
                  <label className="text-slate-700 flex justify-between font-medium">
                    <span>{language === 'hi' ? 'नाइट्रोजन (N)' : 'Nitrogen (N)'}:</span>
                    <span className="font-bold text-amber-700">{simN} kg/ha</span>
                  </label>
                  <input 
                    type="range" 
                    min="40" 
                    max="180" 
                    value={simN}
                    onChange={(e) => setSimN(e.target.value)}
                    className="w-full mt-2 accent-amber-600"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleSimulateUpdate}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-emerald-600/20 transition"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'डेटा लागू करें व एआई सलाह रीसेट करें' : 'Apply & Recalculate AI Advisory'}</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
