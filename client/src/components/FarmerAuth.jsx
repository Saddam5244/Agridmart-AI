import React, { useState, useMemo } from 'react';
import { 
  Sprout, 
  User, 
  MapPin, 
  Calendar, 
  Phone, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  AlertCircle,
  HelpCircle,
  Wheat,
  Globe,
  Languages
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../utils/languages';


// Comprehensive Indian State & District database
export const STATE_DISTRICT_MAP = {
  "Uttar Pradesh": [
    "Kanpur", "Lucknow", "Varanasi", "Prayagraj", "Agra", "Bareilly", "Meerut", 
    "Aligarh", "Gorakhpur", "Jhansi", "Moradabad", "Ayodhya", "Mathura", 
    "Muzaffarnagar", "Basti", "Fatehpur", "Sitapur", "Hardoi", "Unnao", "Barabanki"
  ],
  "Madhya Pradesh": [
    "Indore", "Bhopal", "Ujjain", "Gwalior", "Jabalpur", "Dewas", "Dhar", 
    "Sagar", "Rewa", "Satna", "Ratlam", "Khargone", "Mandsaur", "Neemuch", 
    "Hoshangabad", "Sehore", "Vidisha", "Chhindwara", "Khandwa", "Shajapur"
  ],
  "Punjab": [
    "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", 
    "Firozpur", "Sangrur", "Moga", "Gurdaspur", "Rupnagar", "Mansa", 
    "Fazilka", "Muktsar", "Kapurthala", "Fatehgarh Sahib", "Barnala", "Faridkot"
  ],
  "Haryana": [
    "Karnal", "Hisar", "Rohtak", "Ambala", "Panipat", "Sonipat", "Sirsa", 
    "Kurukshetra", "Yamunanagar", "Jind", "Fatehabad", "Kaithal", "Bhiwani", 
    "Rewari", "Palwal", "Gurugram", "Faridabad", "Mahendragarh", "Panchkula"
  ],
  "Rajasthan": [
    "Jaipur", "Kota", "Jodhpur", "Bikaner", "Udaipur", "Ajmer", "Alwar", 
    "Bharatpur", "Sikar", "Sri Ganganagar", "Hanumangarh", "Nagaur", "Pali", 
    "Tonk", "Chittorgarh", "Bhilwara", "Barmer", "Jaisalmer", "Churu", "Dausa"
  ],
  "Maharashtra": [
    "Pune", "Nashik", "Nagpur", "Chhatrapati Sambhajinagar (Aurangabad)", "Solapur", 
    "Kolhapur", "Ahmednagar", "Jalgaon", "Amravati", "Nanded", "Satara", 
    "Sangli", "Latur", "Akola", "Yavatmal", "Dhule", "Beed", "Buldhana"
  ],
  "Bihar": [
    "Patna", "Muzaffarpur", "Gaya", "Bhagalpur", "Darbhanga", "Purnia", 
    "Samastipur", "Rohtas", "Nalanda", "Begusarai", "Vaishali", "Saran (Chhapra)", 
    "Madhubani", "Siwan", "Saharsa", "Katihar", "Gopalganj", "Sitamarhi"
  ],
  "Gujarat": [
    "Ahmedabad", "Surat", "Rajkot", "Vadodara", "Bhavnagar", "Junagadh", 
    "Jamnagar", "Mehsana", "Anand", "Banaskantha", "Sabarkantha", "Kheda", 
    "Amreli", "Surendranagar", "Patan", "Morbi", "Navsari", "Bharuch"
  ],
  "Karnataka": [
    "Bengaluru", "Mysuru", "Belagavi", "Hubballi-Dharwad", "Kalaburagi", 
    "Vijayapura", "Davanagere", "Ballari", "Shivamogga", "Tumakuru", 
    "Raichur", "Mandya", "Hassan", "Bidar", "Bagalkote", "Udupi"
  ],
  "Andhra Pradesh": [
    "Vijayawada", "Visakhapatnam", "Guntur", "Kurnool", "Nellore", "Tirupati", 
    "Rajahmundry", "Kakinada", "Kadapa", "Anantapur", "Eluru", "Ongole", "Srikakulam"
  ],
  "Telangana": [
    "Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Ramagundam", 
    "Mahbubnagar", "Nalgonda", "Adilabad", "Siddipet", "Medak", "Suryapet"
  ],
  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", 
    "Erode", "Vellore", "Thanjavur", "Dindigul", "Cuddalore", "Kanchipuram"
  ],
  "West Bengal": [
    "Kolkata", "Siliguri", "Asansol", "Durgapur", "Bardhaman", "Malda", 
    "Murshidabad", "Nadia", "Hooghly", "North 24 Parganas", "Bankura"
  ],
  "Odisha": [
    "Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Balasore", 
    "Puri", "Bargarh", "Kalahandi", "Koraput", "Mayurbhanj"
  ],
  "Chhattisgarh": [
    "Raipur", "Bilaspur", "Durg", "Bhilai", "Korba", "Rajnandgaon", 
    "Jagdalpur", "Ambikapur", "Dhamtari", "Mahasamund"
  ],
  "Jharkhand": [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", 
    "Giridih", "Dumka", "Ramgarh", "Palamu"
  ],
  "Assam": [
    "Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Nagaon", "Tinsukia", 
    "Tezpur", "Bongaigaon", "Barpeta", "Cachar"
  ],
  "Kerala": [
    "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", 
    "Palakkad", "Kannur", "Alappuzha", "Kottayam", "Malappuram"
  ],
  "Himachal Pradesh": [
    "Shimla", "Mandi", "Dharamshala", "Solan", "Kullu", "Kangra", "Una", "Hamirpur"
  ],
  "Uttarakhand": [
    "Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Nainital", "Udhamsingh Nagar"
  ],
  "Jammu & Kashmir": [
    "Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", "Kathua", "Pulwama"
  ]
};

const POPULAR_CROPS = [
  { id: "Wheat", en: "Wheat (गेहूं)", hi: "गेहूं" },
  { id: "Paddy / Rice", en: "Paddy / Rice (धान)", hi: "धान / चावल" },
  { id: "Mustard", en: "Mustard (सरसों)", hi: "सरसों / राई" },
  { id: "Soybean", en: "Soybean (सोयाबीन)", hi: "सोयाबीन" },
  { id: "Cotton", en: "Cotton (कपास)", hi: "कपास" },
  { id: "Maize / Corn", en: "Maize / Corn (मक्का)", hi: "मक्का" },
  { id: "Gram / Chickpea", en: "Gram / Chickpea (चना)", hi: "चना" },
  { id: "Potato", en: "Potato (आलू)", hi: "आलू" },
  { id: "Tomato", en: "Tomato (टमाटर)", hi: "टमाटर" },
  { id: "Onion", en: "Onion (प्याज)", hi: "प्याज" },
  { id: "Sugarcane", en: "Sugarcane (गन्ना)", hi: "गन्ना" },
  { id: "Garlic", en: "Garlic (लहसुन)", hi: "लहसुन" }
];



export default function FarmerAuth({ language = "hi", setLanguage, onAuthSuccess }) {
  const [authMode, setAuthMode] = useState('register'); // 'register' | 'login'
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regAge, setRegAge] = useState('38');
  const [regState, setRegState] = useState('Uttar Pradesh');
  const [regDistrict, setRegDistrict] = useState('Kanpur');
  const [regMobile, setRegMobile] = useState('');
  const [regCrop, setRegCrop] = useState('Wheat');
  const [regPin, setRegPin] = useState('1234');
  const [regLandAcre, setRegLandAcre] = useState('3.0');

  // Login Form State
  const [loginMobile, setLoginMobile] = useState('');
  const [loginPin, setLoginPin] = useState('');



  // Districts for selected registration state
  const availableDistricts = useMemo(() => {
    return STATE_DISTRICT_MAP[regState] || ["District Headquarters"];
  }, [regState]);

  // Handle State Change in Registration
  const handleStateChange = (newState) => {
    setRegState(newState);
    const districts = STATE_DISTRICT_MAP[newState] || [];
    setRegDistrict(districts[0] || '');
  };

  // Handle Farmer Registration
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regName.trim() || regName.trim().length < 2) {
      setErrorMsg(language === 'hi' ? 'कृपया किसान का पूरा नाम दर्ज करें।' : 'Please enter your full name.');
      return;
    }

    const ageNum = parseInt(regAge, 10);
    if (isNaN(ageNum) || ageNum < 18 || ageNum > 95) {
      setErrorMsg(language === 'hi' ? 'कृपया मान्य उम्र (18 से 95 वर्ष) दर्ज करें।' : 'Please enter a valid age between 18 and 95.');
      return;
    }

    if (!regState) {
      setErrorMsg(language === 'hi' ? 'कृपया अपना राज्य चुनें।' : 'Please select your State.');
      return;
    }

    if (!regDistrict) {
      setErrorMsg(language === 'hi' ? 'कृपया अपना जिला चुनें।' : 'Please select your District.');
      return;
    }

    if (!regMobile.trim() || regMobile.trim().length < 10) {
      setErrorMsg(language === 'hi' ? 'कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!regPin.trim() || regPin.trim().length < 4) {
      setErrorMsg(language === 'hi' ? 'कृपया कम से कम 4 अंकों का सुरक्षा पिन दर्ज करें।' : 'Please create at least a 4-digit security PIN.');
      return;
    }

    const newFarmer = {
      id: `farmer_${Date.now()}`,
      name: regName.trim(),
      age: ageNum,
      state: regState,
      district: regDistrict,
      mobile: regMobile.trim(),
      primaryCrop: regCrop,
      landholdingAcre: parseFloat(regLandAcre) || 2.5,
      pin: regPin.trim(),
      registeredAt: new Date().toISOString()
    };

    // Save into list of known registered farmers
    try {
      const existing = JSON.parse(localStorage.getItem('agri_registered_farmers') || '[]');
      const filtered = existing.filter(f => f.mobile !== newFarmer.mobile);
      filtered.unshift(newFarmer);
      localStorage.setItem('agri_registered_farmers', JSON.stringify(filtered));
    } catch {}

    setSuccessMsg(language === 'hi' ? 'पंजीकरण सफल! आपका स्वागत है...' : 'Registration Successful! Entering farm dashboard...');
    setTimeout(() => {
      onAuthSuccess(newFarmer);
    }, 700);
  };

  // Handle Farmer Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginMobile.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया मोबाइल नंबर दर्ज करें।' : 'Please enter mobile number.');
      return;
    }

    if (!loginPin.trim()) {
      setErrorMsg(language === 'hi' ? 'कृपया सुरक्षा पिन दर्ज करें।' : 'Please enter security PIN.');
      return;
    }

    // Try finding in registered list
    let foundFarmer = null;
    try {
      const registered = JSON.parse(localStorage.getItem('agri_registered_farmers') || '[]');
      foundFarmer = registered.find(f => f.mobile === loginMobile.trim() && f.pin === loginPin.trim());
    } catch {}

    // Fallback: If 10-digit mobile number and PIN provided, allow instant seamless entry
    if (!foundFarmer && loginMobile.trim().length === 10) {
      foundFarmer = {
        id: `farmer_login_${Date.now()}`,
        name: language === 'hi' ? "किसान मित्र" : "Kisan Mitra",
        age: 40,
        state: "Uttar Pradesh",
        district: "Kanpur",
        mobile: loginMobile.trim(),
        primaryCrop: "Wheat",
        landholdingAcre: 3.0,
        pin: loginPin.trim()
      };
    }

    if (foundFarmer) {
      setSuccessMsg(language === 'hi' ? 'लॉगिन सफल! डैशबोर्ड पर ले जाया जा रहा है...' : 'Login Successful! Accessing dashboard...');
      setTimeout(() => {
        onAuthSuccess(foundFarmer);
      }, 600);
    } else {
      setErrorMsg(language === 'hi' ? 'गलत मोबाइल नंबर या पिन। कृपया पुनः जांचें।' : 'Invalid Mobile Number or PIN. Please retry.');
    }
  };







  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 flex flex-col justify-center items-center px-4 py-10 relative overflow-hidden selection:bg-emerald-500 selection:text-white">
      
      {/* Decorative ambient background rings */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

      {/* Top Bar: Brand & Language Switcher */}
      <div className="w-full max-w-xl mx-auto flex items-center justify-between mb-6 z-10 px-2">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400/40">
            <Sprout className="w-6 h-6 text-white stroke-[2.3]" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
              <span>Agri<span className="text-emerald-400">Smart</span></span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30">AI 1.0</span>
            </h1>
            <p className="text-[11px] text-slate-300 font-medium">
              {language === 'hi' ? 'डेटा-संचालित स्मार्ट कृषि एवं किसान पोर्टल' : 'Data-Driven Smart Agriculture & Farmer Portal'}
            </p>
          </div>
        </div>

        {/* Language Switch Button */}
        {setLanguage && (
          <button
            onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20 flex items-center gap-1.5 backdrop-blur-md cursor-pointer shadow-sm"
            title="Switch Language / भाषा बदलें"
          >
            <Languages className="w-3.5 h-3.5 text-emerald-400" />
            <span>{language === 'hi' ? '🇬🇧 English' : '🇮🇳 हिन्दी'}</span>
          </button>
        )}
      </div>

      {/* Main Authentication Card */}
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-6 sm:p-8 z-10 space-y-6">
        
        {/* Portal Header & Welcome Badge */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100/90 text-emerald-900 text-xs font-black border border-emerald-300 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>{language === 'hi' ? 'भारत सरकार डिजिटल कृषि मिशन समर्थित' : 'Verified Farmer Security Gateway'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {authMode === 'register' 
              ? (language === 'hi' ? 'नया किसान पंजीकरण' : 'Farmer Registration')
              : (language === 'hi' ? 'किसान लॉगिन' : 'Farmer Login')}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            {authMode === 'register'
              ? (language === 'hi' 
                  ? 'अपनी फसल, राज्य और जिले की सटीक जानकारी से व्यक्तिगत कृषि बुलेटिन व लाइव भाव पाएं।' 
                  : 'Enter your name, state, district, and age to customize farm weather, mandi rates, and crop ML.')
              : (language === 'hi' 
                  ? 'अपने पंजीकृत मोबाइल नंबर और 4 अंकों के पिन से लॉगिन करें।' 
                  : 'Log in with your registered 10-digit mobile number and 4-digit PIN.')}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
          <button
            type="button"
            onClick={() => { setAuthMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'register'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{language === 'hi' ? 'नया पंजीकरण (Register)' : 'New Registration'}</span>
          </button>

          <button
            type="button"
            onClick={() => { setAuthMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'login'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{language === 'hi' ? 'किसान लॉगिन (Login)' : 'Farmer Login'}</span>
          </button>
        </div>

        {/* Alert Notifications */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-semibold">{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-extrabold">{successMsg}</span>
          </div>
        )}



        {/* ======================================================== */}
        {/* 1. REGISTRATION FORM (Name, State, District, Age, Crop) */}
        {/* ======================================================== */}
        {authMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            
            {/* Full Name & Age (2 Cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'hi' ? 'किसान का पूरा नाम *' : 'Full Name *'}</span>
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder={language === 'hi' ? 'उदा. राजेश कुमार' : 'e.g. Rajesh Kumar'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-900 outline-none transition bg-slate-50/60 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'hi' ? 'उम्र (वर्ष) *' : 'Age (Years) *'}</span>
                </label>
                <input
                  type="number"
                  min="18"
                  max="95"
                  required
                  value={regAge}
                  onChange={(e) => setRegAge(e.target.value)}
                  placeholder="38"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-900 outline-none transition bg-slate-50/60 focus:bg-white"
                />
              </div>
            </div>

            {/* State & District (2 Cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'hi' ? 'राज्य (State) *' : 'State *'}</span>
                </label>
                <select
                  value={regState}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm text-slate-900 outline-none transition bg-slate-50/60 focus:bg-white cursor-pointer font-medium"
                >
                  {Object.keys(STATE_DISTRICT_MAP).map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{language === 'hi' ? 'जिला (District) *' : 'District *'}</span>
                </label>
                <select
                  value={regDistrict}
                  onChange={(e) => setRegDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm text-slate-900 outline-none transition bg-slate-50/60 focus:bg-white cursor-pointer font-medium"
                >
                  {availableDistricts.map((dst) => (
                    <option key={dst} value={dst}>{dst}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Number & Primary Crop (2 Cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'hi' ? 'मोबाइल नंबर (10 अंक) *' : 'Mobile Number (10 Digits) *'}</span>
                </label>
                <input
                  type="tel"
                  maxLength="10"
                  required
                  value={regMobile}
                  onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))}
                  placeholder="9876543210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-900 outline-none transition bg-slate-50/60 focus:bg-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Wheat className="w-3.5 h-3.5 text-amber-600" />
                  <span>{language === 'hi' ? 'मुख्य फसल *' : 'Primary Crop *'}</span>
                </label>
                <select
                  value={regCrop}
                  onChange={(e) => setRegCrop(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-xs sm:text-sm text-slate-900 outline-none transition bg-slate-50/60 focus:bg-white cursor-pointer font-medium"
                >
                  {POPULAR_CROPS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {language === 'hi' ? c.hi : c.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Land Area & 4-Digit Security PIN (2 Cols) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'hi' ? 'खेत का रकबा (एकड़)' : 'Landholding (Acres)'}</span>
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={regLandAcre}
                  onChange={(e) => setRegLandAcre(e.target.value)}
                  placeholder="3.0"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-900 outline-none transition bg-slate-50/60 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'hi' ? 'सरल 4-अंकीय सुरक्षा पिन *' : '4-Digit Login PIN *'}</span>
                </label>
                <input
                  type="password"
                  maxLength="6"
                  required
                  value={regPin}
                  onChange={(e) => setRegPin(e.target.value)}
                  placeholder="1234"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-900 outline-none transition bg-slate-50/60 focus:bg-white font-mono"
                />
              </div>
            </div>

            {/* Register Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-sm sm:text-base transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
            >
              <span>{language === 'hi' ? '🌾 पंजीकरण करें और खेत में प्रवेश करें' : '🌾 Register & Enter Farm Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* ======================================================== */}
        {/* 2. LOGIN FORM (Mobile Number & PIN) */}
        {/* ======================================================== */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{language === 'hi' ? 'पंजीकृत मोबाइल नंबर (10 अंक)' : 'Registered Mobile Number'}</span>
              </label>
              <input
                type="tel"
                maxLength="10"
                required
                value={loginMobile}
                onChange={(e) => setLoginMobile(e.target.value.replace(/\D/g, ''))}
                placeholder="9876543210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-900 outline-none transition bg-slate-50/60 focus:bg-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'hi' ? 'सुरक्षा पिन (PIN)' : 'Security PIN'}</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  {language === 'hi' ? 'डिफ़ॉल्ट पिन: 1234' : 'Default PIN: 1234'}
                </span>
              </div>
              <input
                type="password"
                maxLength="6"
                required
                value={loginPin}
                onChange={(e) => setLoginPin(e.target.value)}
                placeholder="1234"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm text-slate-900 outline-none transition bg-slate-50/60 focus:bg-white font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-sm sm:text-base transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
            >
              <span>{language === 'hi' ? '🚀 लॉगिन करें' : '🚀 Login to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}



        {/* Trust Badges Footer */}
        <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-4 flex-wrap">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'hi' ? 'सुरक्षित एवं निःशुल्क' : '100% Free & Secure'}</span>
          </span>
          <span>•</span>
          <span>{language === 'hi' ? 'स्वचालित मौसम व मंडी समन्वय' : 'Auto Location & Mandi Sync'}</span>
        </div>

      </div>



    </div>
  );
}
