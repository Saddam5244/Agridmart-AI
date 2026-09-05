// Activity Tracker & Farmer Activity Engine for Smart Agriculture Platform

const INITIAL_ACTIVITIES = [
  {
    id: "act_101",
    farmerName: "Rameshwar Patel",
    district: "Indore",
    state: "Madhya Pradesh",
    type: "disease",
    typeLabel: "Disease Detection",
    typeLabelHi: "रोग निदान स्कैन",
    action: "Uploaded tomato leaf photo for AI diagnosis",
    actionHi: "टमाटर की पत्ती की फोटो अपलोड कर एआई जांच की",
    details: "Detected Early Blight (Alternaria solani) with 91% confidence. Recommended Mancozeb 75% WP.",
    detailsHi: "अगेती झुलसा (91% सटीकता) पाया गया। मैन्कोजेब 75% WP की सिफारिश की गई।",
    badgeColor: "rose",
    timestamp: "3 mins ago",
    timestampHi: "3 मिनट पहले",
    authProvider: "google"
  },
  {
    id: "act_102",
    farmerName: "Rajesh Kumar",
    district: "Indore",
    state: "Madhya Pradesh",
    type: "mandi",
    typeLabel: "Mandi Price Check",
    typeLabelHi: "मंडी भाव जांच",
    action: "Inspected APMC mandi rates for Wheat (Lokwan)",
    actionHi: "इंदौर मंडी में गेहूं (लोकवन) के लाइव भाव देखे",
    details: "Current rate ₹2,550/q. Bullish trend with ₹40/q daily gain.",
    detailsHi: "वर्तमान भाव ₹2,550/क्विंटल। ₹40/क्विंटल की तेजी देखी गई।",
    badgeColor: "emerald",
    timestamp: "12 mins ago",
    timestampHi: "12 मिनट पहले",
    authProvider: "mobile"
  },
  {
    id: "act_103",
    farmerName: "Harpreet Singh",
    district: "Ludhiana",
    state: "Punjab",
    type: "ai_voice",
    typeLabel: "AI Assistant Query",
    typeLabelHi: "एआई आवाज सहायक परामर्श",
    action: "Consulted Krishi AI Copilot via voice in Punjabi/Hindi",
    actionHi: "वॉइस से पूछा: 'गेहूं में पीला रतुआ से बचाव कैसे करें?'",
    details: "Voice answered with Tilt (Propiconazole 25% EC) 1ml/L dosage and weather timing.",
    detailsHi: "टिल्ट (प्रोपिकोनाजोल 25% ईसी) 1 मिली/लीटर स्प्रे का ऑडियो परामर्श प्राप्त किया।",
    badgeColor: "cyan",
    timestamp: "28 mins ago",
    timestampHi: "28 मिनट पहले",
    authProvider: "mobile"
  },
  {
    id: "act_104",
    farmerName: "Shivraj Patil",
    district: "Nashik",
    state: "Maharashtra",
    type: "simulator",
    typeLabel: "Crop Simulator",
    typeLabelHi: "फसल सिमुलेशन प्रयोग",
    action: "Simulated 20% water deficit impact on Rabi Onion crop",
    actionHi: "प्याज फसल पर 20% कम पानी के प्रभाव का सिमुलेशन किया",
    details: "Projected yield reduction of 8.4%. Recommended drip fertigation with bio-mulch.",
    detailsHi: "8.4% उत्पादन में कमी का अनुमान। ड्रिप फर्टिगेशन व मल्चिंग की सलाह।",
    badgeColor: "purple",
    timestamp: "45 mins ago",
    timestampHi: "45 मिनट पहले",
    authProvider: "mobile"
  },
  {
    id: "act_105",
    farmerName: "Ramesh Verma",
    district: "Varanasi",
    state: "Uttar Pradesh",
    type: "scheme",
    typeLabel: "Government Scheme",
    typeLabelHi: "सरकारी योजना जांच",
    action: "Checked eligibility for PM Krishi Sinchayee Yojana (PMKSY)",
    actionHi: "पीएम कृषि सिंचाई योजना (ड्रिप सब्सिडी) की पात्रता जांची",
    details: "Eligible for 55% micro-irrigation capital grant for 3.5-acre plot.",
    detailsHi: "3.5 एकड़ खेत हेतु 55% सूक्ष्म सिंचाई अनुदान हेतु पात्र पाए गए।",
    badgeColor: "amber",
    timestamp: "1 hour ago",
    timestampHi: "1 घंटा पहले",
    authProvider: "google"
  },
  {
    id: "act_106",
    farmerName: "Kisan Mitra",
    district: "Kanpur",
    state: "Uttar Pradesh",
    type: "auth",
    typeLabel: "Farmer Login",
    typeLabelHi: "सफल किसान लॉगिन",
    action: "Logged into Kisan Portal via verified mobile credential",
    actionHi: "मोबाइल नंबर एवं सुरक्षा पिन द्वारा पोर्टल में प्रवेश किया",
    details: "Session initialized for Central Gangetic Plains Agro-Climatic Zone.",
    detailsHi: "मध्य गंगा मैदानी क्षेत्र के लिए सत्र आरंभ हुआ।",
    badgeColor: "blue",
    timestamp: "2 hours ago",
    timestampHi: "2 घंटे पहले",
    authProvider: "mobile"
  }
];

export function getFarmerActivities() {
  try {
    const custom = JSON.parse(localStorage.getItem('agri_farmer_activities') || '[]');
    if (custom && custom.length > 0) {
      return [...custom, ...INITIAL_ACTIVITIES];
    }
  } catch (e) {}
  return INITIAL_ACTIVITIES;
}

export function logFarmerActivity({ farmerName, district, state, type, action, actionHi, details, detailsHi }) {
  try {
    const existing = JSON.parse(localStorage.getItem('agri_farmer_activities') || '[]');
    const newEntry = {
      id: `act_${Date.now()}`,
      farmerName: farmerName || "Farmer",
      district: district || "Local Mandi",
      state: state || "India",
      type: type || "general",
      typeLabel: type === 'disease' ? 'Disease Detection' : type === 'mandi' ? 'Mandi Price Check' : 'Platform Action',
      typeLabelHi: type === 'disease' ? 'रोग जांच' : type === 'mandi' ? 'मंडी भाव जांच' : 'प्लेटफ़ॉर्म कार्य',
      action: action || "Interacted with Smart Agriculture Platform",
      actionHi: actionHi || action || "स्मार्ट कृषि प्लेटफॉर्म का उपयोग किया",
      details: details || "",
      detailsHi: detailsHi || details || "",
      badgeColor: type === 'disease' ? 'rose' : type === 'mandi' ? 'emerald' : 'cyan',
      timestamp: "Just now",
      timestampHi: "अभी-अभी",
      authProvider: "active"
    };

    existing.unshift(newEntry);
    // Keep max 40 items
    if (existing.length > 40) existing.pop();
    localStorage.setItem('agri_farmer_activities', JSON.stringify(existing));
  } catch (e) {
    console.warn("Could not record farmer activity", e);
  }
}

export function getAllKnownFarmers() {
  const defaultRoster = [
    {
      id: "f_rajesh",
      name: "Rajesh Kumar",
      age: 42,
      state: "Madhya Pradesh",
      district: "Indore",
      primaryCrop: "Wheat",
      landholdingAcre: 4.5,
      mobile: "9876543210",
      email: "rajesh.kumar@kisan.in",
      photoURL: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
      authProvider: "Mobile PIN",
      status: "Online",
      lastActive: "Active now"
    },
    {
      id: "f_harpreet",
      name: "Harpreet Singh",
      age: 48,
      state: "Punjab",
      district: "Ludhiana",
      primaryCrop: "Paddy",
      landholdingAcre: 8.0,
      mobile: "9823456789",
      email: "harpreet.singh@punjabkrishi.in",
      photoURL: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      authProvider: "Mobile PIN",
      status: "Online",
      lastActive: "15 mins ago"
    },
    {
      id: "f_shivraj",
      name: "Shivraj Patil",
      age: 39,
      state: "Maharashtra",
      district: "Nashik",
      primaryCrop: "Onion / Grapes",
      landholdingAcre: 5.5,
      mobile: "9812345678",
      email: "shivraj.patil@mahagrapes.in",
      photoURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      authProvider: "Mobile PIN",
      status: "Online",
      lastActive: "32 mins ago"
    },
    {
      id: "f_rameshwar",
      name: "Rameshwar Patel",
      age: 38,
      state: "Madhya Pradesh",
      district: "Indore",
      primaryCrop: "Soybean / Wheat",
      landholdingAcre: 3.5,
      mobile: "",
      email: "rameshwar.patel.farmer@gmail.com",
      photoURL: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      authProvider: "Google OAuth",
      status: "Online",
      lastActive: "Just now"
    }
  ];

  try {
    const registered = JSON.parse(localStorage.getItem('agri_registered_farmers') || '[]');
    const currentLogged = JSON.parse(localStorage.getItem('agri_logged_farmer') || 'null');

    const combined = [...registered];

    if (currentLogged && !combined.find(f => f.name === currentLogged.name || (f.email && f.email === currentLogged.email))) {
      combined.unshift({
        ...currentLogged,
        status: "Online",
        lastActive: "Active session"
      });
    }

    defaultRoster.forEach(df => {
      if (!combined.find(f => f.name === df.name || f.mobile === df.mobile)) {
        combined.push(df);
      }
    });

    return combined;
  } catch (e) {
    return defaultRoster;
  }
}
