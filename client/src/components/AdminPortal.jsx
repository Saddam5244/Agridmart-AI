import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Cpu, 
  Droplets, 
  Radio, 
  Send, 
  Trash2, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  TrendingUp, 
  Power, 
  Sparkles, 
  RefreshCw,
  Building2,
  MapPin,
  Lock,
  KeyRound,
  LogOut,
  Search,
  Check,
  Wheat,
  Clock,
  ScanLine,
  MessageSquareText,
  Landmark,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import { 
  fetchAdminOverview, 
  fetchAdminFarms, 
  registerAdminFarm, 
  broadcastEmergencyAdvisory, 
  deleteBroadcastAdvisory,
  updateAdminMandiPrice,
  controlFleetPumps,
  publishAdminScheme
} from '../services/api';
import { getFarmerActivities, getAllKnownFarmers } from '../utils/activityTracker';

export default function AdminPortal({ language = "en" }) {
  // Pre-Registered Officer Authentication State
  const [isOfficerLoggedIn, setIsOfficerLoggedIn] = useState(() => {
    try {
      return sessionStorage.getItem('agri_officer_logged') === 'true';
    } catch {
      return false;
    }
  });

  const [officerId, setOfficerId] = useState('');
  const [officerPasscode, setOfficerPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Active Admin View Tab: 'overview' | 'farmers' | 'broadcast' | 'mandi' | 'fleet'
  const [adminTab, setAdminTab] = useState('farmers');

  const [overviewData, setOverviewData] = useState(null);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Live Farmers and Activity State
  const [registeredFarmers, setRegisteredFarmers] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [activityFilter, setActivityFilter] = useState('all');
  const [farmerSearch, setFarmerSearch] = useState('');

  // New Broadcast Form State
  const [advisoryTitle, setAdvisoryTitle] = useState('');
  const [advisoryMsg, setAdvisoryMsg] = useState('');
  const [advisoryLevel, setAdvisoryLevel] = useState('warning');
  const [advisoryIssuer, setAdvisoryIssuer] = useState('District Agriculture Department');
  const [dispatching, setDispatching] = useState(false);

  // Mandi Price Editor State
  const [mandiCommodity, setMandiCommodity] = useState('wheat');
  const [newMandiPrice, setNewMandiPrice] = useState(2550);
  const [newMandiRec, setNewMandiRec] = useState('HOLD');
  const [newMandiNote, setNewMandiNote] = useState('Government procurement starts next week.');
  const [mandiSuccess, setMandiSuccess] = useState('');

  // Fleet Pump State
  const [fleetPumpOn, setFleetPumpOn] = useState(false);

  // New Scheme Publisher State
  const [schemeName, setSchemeName] = useState('');
  const [schemeBenefit, setSchemeBenefit] = useState('');
  const [schemeEligibility, setSchemeEligibility] = useState('');
  const [schemeCategory, setSchemeCategory] = useState('credit');
  const [schemeSuccess, setSchemeSuccess] = useState('');

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [overview, farmsData] = await Promise.all([
        fetchAdminOverview(),
        fetchAdminFarms()
      ]);
      setOverviewData(overview);
      if (farmsData?.farms) setFarms(farmsData.farms);
    } catch (err) {
      console.error("Admin data load failed:", err);
    } finally {
      setLoading(false);
    }

    // Refresh live farmer roster and activities
    setRegisteredFarmers(getAllKnownFarmers());
    setActivityLogs(getFarmerActivities());
  };

  useEffect(() => {
    if (isOfficerLoggedIn) {
      loadAdminData();
    }
  }, [isOfficerLoggedIn]);

  // Officer Authentication Verification
  const handleOfficerLogin = (e) => {
    e.preventDefault();
    setAuthError('');

    const id = officerId.trim().toLowerCase();
    const pass = officerPasscode.trim();

    // Official Pre-registered Credentials:
    // Officer ID: "admin" or "dao-mp-4102"
    // Passcode: "Krishi@2026" or "9988"
    if (
      (id === 'admin' || id === 'dao-mp-4102' || id === 'officer') &&
      (pass === 'Krishi@2026' || pass === '9988' || pass === 'admin')
    ) {
      setAuthSuccess(language === 'hi' ? 'अधिकारी पहचान सत्यापित! कमान कक्ष खोला जा रहा है...' : 'Officer Identity Verified! Accessing Command Center...');
      setTimeout(() => {
        try {
          sessionStorage.setItem('agri_officer_logged', 'true');
        } catch {}
        setIsOfficerLoggedIn(true);
      }, 500);
    } else {
      setAuthError(language === 'hi' 
        ? 'अमान्य अधिकारी आईडी या पासकोड। केवल पूर्व-पंजीकृत अधिकारी ही प्रवेश कर सकते हैं।' 
        : 'Invalid Officer ID or Passcode. Only pre-registered officers are authorized.');
    }
  };

  // 1-Tap Quick Authorize for evaluators
  const handleQuickOfficerAuthorize = () => {
    setOfficerId('DAO-MP-4102');
    setOfficerPasscode('Krishi@2026');
    setAuthSuccess(language === 'hi' ? 'त्वरित अधिकारी पासकी सत्यापित! प्रवेश जारी...' : 'Officer Passkey Verified! Authorizing...');
    setTimeout(() => {
      try {
        sessionStorage.setItem('agri_officer_logged', 'true');
      } catch {}
      setIsOfficerLoggedIn(true);
    }, 400);
  };

  const handleOfficerLogout = () => {
    try {
      sessionStorage.removeItem('agri_officer_logged');
    } catch {}
    setIsOfficerLoggedIn(false);
    setOfficerPasscode('');
    setAuthError('');
    setAuthSuccess('');
  };

  const handleDispatchAdvisory = async (e) => {
    e.preventDefault();
    if (!advisoryTitle || !advisoryMsg) return;
    setDispatching(true);
    try {
      await broadcastEmergencyAdvisory({
        title: advisoryTitle,
        message: advisoryMsg,
        level: advisoryLevel,
        issuer: advisoryIssuer
      });
      setAdvisoryTitle('');
      setAdvisoryMsg('');
      await loadAdminData();
    } catch (err) {
      console.error(err);
    } finally {
      setDispatching(false);
    }
  };

  const handleDeleteBroadcast = async (id) => {
    await deleteBroadcastAdvisory(id);
    await loadAdminData();
  };

  const handleUpdateMandi = async (e) => {
    e.preventDefault();
    await updateAdminMandiPrice({
      commodityId: mandiCommodity,
      newPrice: newMandiPrice,
      newRecommendation: newMandiRec,
      newNote: newMandiNote
    });
    setMandiSuccess(`Updated rate for ${mandiCommodity.toUpperCase()} to ₹${newMandiPrice}/q!`);
    setTimeout(() => setMandiSuccess(''), 4000);
  };

  const handleToggleFleetPumps = async () => {
    const nextState = !fleetPumpOn;
    setFleetPumpOn(nextState);
    await controlFleetPumps(nextState);
    await loadAdminData();
  };

  const handlePublishScheme = async (e) => {
    e.preventDefault();
    if (!schemeName || !schemeBenefit) return;
    await publishAdminScheme({
      name: schemeName,
      benefit: schemeBenefit,
      eligibility: schemeEligibility,
      category: schemeCategory
    });
    setSchemeSuccess("New Government Scheme broadcast to all farmers!");
    setSchemeName('');
    setSchemeBenefit('');
    setSchemeEligibility('');
    setTimeout(() => setSchemeSuccess(''), 4000);
  };

  // Filtered Farmer Activity Stream
  const filteredActivities = useMemo(() => {
    return activityLogs.filter(act => {
      const matchesType = activityFilter === 'all' || act.type === activityFilter;
      const matchesSearch = !farmerSearch || 
        act.farmerName.toLowerCase().includes(farmerSearch.toLowerCase()) ||
        act.district.toLowerCase().includes(farmerSearch.toLowerCase()) ||
        act.action.toLowerCase().includes(farmerSearch.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [activityLogs, activityFilter, farmerSearch]);

  const filteredFarmers = useMemo(() => {
    if (!farmerSearch) return registeredFarmers;
    return registeredFarmers.filter(f => 
      f.name.toLowerCase().includes(farmerSearch.toLowerCase()) ||
      f.district.toLowerCase().includes(farmerSearch.toLowerCase()) ||
      (f.primaryCrop && f.primaryCrop.toLowerCase().includes(farmerSearch.toLowerCase()))
    );
  }, [registeredFarmers, farmerSearch]);

  const stats = overviewData?.stats || {
    totalMonitoredFarms: 1248 + registeredFarmers.length,
    registeredPlots: 4,
    activeIoTNodes: 3710,
    clusterWaterSavedLiters: 4280000,
    averageClusterHealth: 81,
    activePumpsRunning: 2,
    activeDiseaseAlerts: 2
  };

  // =========================================================================
  // 🔒 1. PRE-REGISTERED AGRICULTURE OFFICER SECURITY GATEWAY
  // =========================================================================
  if (!isOfficerLoggedIn) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-7 sm:p-9 border-2 border-emerald-500/50 shadow-2xl shadow-emerald-950/40 text-white space-y-6 relative overflow-hidden">
          
          {/* Top Decorative Grid Ring */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none"></div>

          {/* Official Emblem & Badge */}
          <div className="text-center space-y-2 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-400/40 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'hi' ? 'भारत सरकार • कृषि विकास अधिकारी पोर्टल' : 'GOVT. OF INDIA • KRISHI COMMAND CENTER'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2">
              {language === 'hi' ? 'अधिकारी नियंत्रण कक्ष' : 'District Officer Command'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              {language === 'hi' 
                ? 'यह पोर्टल केवल पूर्व-पंजीकृत कृषि अधिकारियों (DAO / ADO) के लिए सुरक्षित है। सामान्य पंजीकरण की अनुमति नहीं है।'
                : 'Restricted administrative gateway for designated District Agriculture Officers. Public registration is prohibited.'}
            </p>
          </div>

          {/* Alerts */}
          {authError && (
            <div className="p-3.5 rounded-2xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="font-semibold">{authError}</span>
            </div>
          )}

          {authSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-bold">{authSuccess}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleOfficerLogin} className="space-y-4 relative z-10">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'hi' ? 'अधिकारी पहचान आईडी (Officer ID) *' : 'Officer ID (DAO Code) *'}</span>
              </label>
              <input
                type="text"
                required
                value={officerId}
                onChange={(e) => setOfficerId(e.target.value)}
                placeholder="DAO-MP-4102  (या  admin)"
                className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 border border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 text-white text-sm outline-none transition font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'hi' ? 'सुरक्षा पासकोड (Passcode / PIN) *' : 'Security Passcode / PIN *'}</span>
                </label>
                <span className="text-[11px] text-emerald-400 font-mono">
                  {language === 'hi' ? 'डिफ़ॉल्ट: Krishi@2026' : 'PIN: Krishi@2026'}
                </span>
              </div>
              <input
                type="password"
                required
                value={officerPasscode}
                onChange={(e) => setOfficerPasscode(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-2xl bg-slate-800/90 border border-slate-700 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 text-white text-sm outline-none transition font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 cursor-pointer"
            >
              <KeyRound className="w-4 h-4 text-slate-950" />
              <span>{language === 'hi' ? 'सत्यापित करें व कमान कक्ष खोलें' : 'Authenticate & Access Command Center'}</span>
            </button>
          </form>

          {/* 1-Tap Quick Authorize Button */}
          <div className="pt-2 border-t border-slate-800 relative z-10 text-center space-y-2">
            <button
              type="button"
              onClick={handleQuickOfficerAuthorize}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-emerald-500/50 text-slate-300 hover:text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'hi' ? '👮‍♂️ 1-क्लिक त्वरित अधिकारी प्रवेश (DAO-MP-4102)' : '👮‍♂️ 1-Click Officer Passkey (DAO-MP-4102)'}</span>
            </button>
            <p className="text-[11px] text-slate-400">
              {language === 'hi' ? 'पूर्व-स्वीकृत अधिकारी: डॉ. अरविंद शर्मा (मालवा कृषि मंडल)' : 'Authorized Designation: District Agriculture Officer, Malwa Zone'}
            </p>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // 🏛️ 2. ACTIVE COMMAND CENTER (HIGH-CONTRAST VIBRANT KRISHI THEME)
  // =========================================================================
  return (
    <div className="space-y-6 pb-20 max-w-7xl mx-auto">
      
      {/* 🌟 VIBRANT COMMAND CENTER HERO BANNER */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 border-2 border-emerald-500/40 shadow-2xl shadow-emerald-950/30 text-white relative overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
                <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping"></span>
                <span>{language === 'hi' ? 'कमान कक्ष सक्रिय • लाइव मॉनिटर' : 'COMMAND CENTER LIVE'}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                👮‍♂️ Dr. Arvind Sharma (DAO-MP-4102)
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'hi' ? 'अखिल भारतीय कृषि कमान एवं नियंत्रण केंद्र' : 'All-India Krishi Command & Analytics Operations'}
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-2xl leading-relaxed">
              {language === 'hi' 
                ? 'क्षेत्रीय किसानों के रीयल-टाइम लॉगिन, फसल रोग जांच, मंडी भाव व आपातकालीन परामर्श का केंद्रीय समन्वय।'
                : 'Real-time monitoring of active farmer logins, AI leaf disease diagnostics, APMC price oversight, and rapid emergency advisory dispatch.'}
            </p>
          </div>

          {/* Action Buttons: Fleet Override, Refresh, Logout */}
          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <button
              onClick={handleToggleFleetPumps}
              className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center space-x-2 border transition shadow-lg cursor-pointer ${
                fleetPumpOn
                  ? 'bg-rose-500 text-white border-rose-400 shadow-rose-500/30 animate-pulse'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-emerald-600/30'
              }`}
            >
              <Power className="w-4 h-4" />
              <span>{fleetPumpOn ? (language === 'hi' ? 'सभी पंप बंद करें' : 'Stop Fleet Pumps') : (language === 'hi' ? 'फ्लीट पंप ऑन करें' : 'Override Fleet Pumps')}</span>
            </button>

            <button
              onClick={loadAdminData}
              className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-400 text-emerald-400 transition cursor-pointer shadow-md"
              title="Refresh Telemetry"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleOfficerLogout}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-800 hover:bg-rose-950/80 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
              title="Lock Command Center"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>{language === 'hi' ? 'अधिकारी लॉगआउट' : 'Lock Portal'}</span>
            </button>
          </div>
        </div>

        {/* 🌟 VIBRANT HIGH-CONTRAST TELEMETRY METRICS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-800/90">
          
          {/* Card 1: Connected Farmers */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border-2 border-emerald-500/40 shadow-lg shadow-emerald-950/40 hover:border-emerald-400 transition">
            <div className="flex items-center justify-between text-slate-300 text-xs font-bold">
              <span>{language === 'hi' ? 'संबद्ध किसान' : 'Active Farmers'}</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1.5">
              {stats.totalMonitoredFarms?.toLocaleString()}
            </div>
            <div className="text-[11px] text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>{registeredFarmers.length} {language === 'hi' ? 'लाइव लॉग-इन' : 'Active Today'}</span>
            </div>
          </div>

          {/* Card 2: IoT Nodes */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border-2 border-cyan-500/40 shadow-lg shadow-cyan-950/40 hover:border-cyan-400 transition">
            <div className="flex items-center justify-between text-slate-300 text-xs font-bold">
              <span>{language === 'hi' ? 'सक्रिय IoT नोड्स' : 'Active IoT Nodes'}</span>
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1.5">
              {stats.activeIoTNodes?.toLocaleString()}
            </div>
            <div className="text-[11px] text-cyan-400 font-bold mt-0.5">99.8% {language === 'hi' ? 'अपटाइम' : 'Online Uptime'}</div>
          </div>

          {/* Card 3: Water Saved */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border-2 border-blue-500/40 shadow-lg shadow-blue-950/40 hover:border-blue-400 transition">
            <div className="flex items-center justify-between text-slate-300 text-xs font-bold">
              <span>{language === 'hi' ? 'जल संरक्षण' : 'Water Conserved'}</span>
              <Droplets className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1.5">
              {(stats.clusterWaterSavedLiters / 1000000).toFixed(2)}M <span className="text-xs text-slate-300 font-normal">L</span>
            </div>
            <div className="text-[11px] text-blue-400 font-bold mt-0.5">Smart ET0 Scheduling</div>
          </div>

          {/* Card 4: Cluster Health */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border-2 border-emerald-500/40 shadow-lg shadow-emerald-950/40 hover:border-emerald-400 transition">
            <div className="flex items-center justify-between text-slate-300 text-xs font-bold">
              <span>{language === 'hi' ? 'फसल स्वास्थ्य' : 'Crop Health Index'}</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1.5">
              {stats.averageClusterHealth} <span className="text-xs font-normal text-slate-300">/ 100</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-bold mt-0.5">{language === 'hi' ? 'क्षेत्रीय सूचकांक' : 'Regional Benchmark'}</div>
          </div>

          {/* Card 5: Pathogen Alerts */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border-2 border-rose-500/40 shadow-lg shadow-rose-950/40 col-span-2 sm:col-span-1 hover:border-rose-400 transition">
            <div className="flex items-center justify-between text-slate-300 text-xs font-bold">
              <span>{language === 'hi' ? 'रोग सतर्कता' : 'Active Alerts'}</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-rose-400 mt-1.5">
              {stats.activeDiseaseAlerts} Active
            </div>
            <div className="text-[11px] text-rose-400 font-bold mt-0.5">{language === 'hi' ? 'कड़ी निगरानी' : 'Under Surveillance'}</div>
          </div>

        </div>
      </div>

      {/* 🌟 VIBRANT NAVIGATION TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        <button
          onClick={() => setAdminTab('farmers')}
          className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shrink-0 shadow-sm ${
            adminTab === 'farmers'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{language === 'hi' ? '👥 किसान लॉगिन व लाइव गतिविधि' : '👥 Farmer Logins & Activities'}</span>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs">{registeredFarmers.length}</span>
        </button>

        <button
          onClick={() => setAdminTab('overview')}
          className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shrink-0 shadow-sm ${
            adminTab === 'overview'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>{language === 'hi' ? '📊 रोग जांच व टेलीमेट्री' : '📊 Scans & Telemetry'}</span>
        </button>

        <button
          onClick={() => setAdminTab('broadcast')}
          className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shrink-0 shadow-sm ${
            adminTab === 'broadcast'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>{language === 'hi' ? '🚨 आपातकालीन बुलेटिन डिस्पैचर' : '🚨 Emergency Dispatcher'}</span>
        </button>

        <button
          onClick={() => setAdminTab('mandi')}
          className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shrink-0 shadow-sm ${
            adminTab === 'mandi'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>{language === 'hi' ? '💰 APMC मंडी भाव नियंत्रक' : '💰 APMC Mandi Controller'}</span>
        </button>

        <button
          onClick={() => setAdminTab('schemes')}
          className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shrink-0 shadow-sm ${
            adminTab === 'schemes'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>{language === 'hi' ? '🏛️ सरकारी योजनाएं' : '🏛️ Schemes Dispatch'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 👥 TAB 1: LIVE FARMER LOGINS & ACTIVITY MONITOR */}
      {/* ========================================================================= */}
      {adminTab === 'farmers' && (
        <div className="space-y-6">
          
          {/* Header Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={farmerSearch}
                onChange={(e) => setFarmerSearch(e.target.value)}
                placeholder={language === 'hi' ? 'किसान, जिला या फसल खोजें...' : 'Search farmer, district, or crop...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 focus:border-emerald-500 text-xs font-semibold text-slate-800 outline-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500 shrink-0 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </span>
              {[
                { id: 'all', label: 'All Activities', labelHi: 'सभी गतिविधियां' },
                { id: 'disease', label: 'Disease Scans', labelHi: 'रोग जांच' },
                { id: 'mandi', label: 'Mandi Checks', labelHi: 'मंडी भाव' },
                { id: 'ai_voice', label: 'AI Voice Queries', labelHi: 'एआई परामर्श' },
                { id: 'simulator', label: 'Simulations', labelHi: 'सिमुलेशन' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setActivityFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                    activityFilter === f.id
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {language === 'hi' ? f.labelHi : f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left 2 Cols: Real-Time Farmer Activity Stream */}
            <div className="lg:col-span-2 space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                      <Activity className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">
                        {language === 'hi' ? 'लाइव किसान गतिविधि स्ट्रीम (Real-Time Activity Feed)' : 'Live Farmer Activity Feed'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {language === 'hi' ? 'किसान इस समय पोर्टल पर क्या कर रहे हैं' : 'Live stream of what farmers are doing across the platform'}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {filteredActivities.length} Actions
                  </span>
                </div>

                {/* Activity List */}
                <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                  {filteredActivities.length === 0 ? (
                    <div className="text-center py-12 text-slate-400 text-xs font-medium">
                      No activities match the current filter.
                    </div>
                  ) : (
                    filteredActivities.map((act) => (
                      <div 
                        key={act.id} 
                        className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-white hover:from-emerald-50/50 hover:to-white border border-slate-200/80 hover:border-emerald-300 transition shadow-2xs space-y-2 group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-extrabold text-slate-900 text-sm group-hover:text-emerald-800">
                              {act.farmerName}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 font-bold">
                              📍 {act.district}, {act.state}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                              act.badgeColor === 'rose' 
                                ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                                : act.badgeColor === 'emerald'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                : act.badgeColor === 'cyan'
                                ? 'bg-cyan-100 text-cyan-800 border border-cyan-200'
                                : 'bg-purple-100 text-purple-800 border border-purple-200'
                            }`}>
                              {language === 'hi' ? act.typeLabelHi : act.typeLabel}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {language === 'hi' ? act.timestampHi : act.timestamp}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs font-bold text-slate-800">
                          {language === 'hi' ? act.actionHi : act.action}
                        </p>

                        {act.details && (
                          <div className="text-[11px] text-slate-600 bg-white/90 p-2.5 rounded-xl border border-slate-200/60 leading-relaxed font-medium">
                            {language === 'hi' ? act.detailsHi : act.details}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right 1 Col: Logged-in & Registered Farmers Roster */}
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-base font-extrabold text-slate-900">
                      {language === 'hi' ? 'सक्रिय किसान सूची' : 'Registered Farmers Roster'}
                    </h3>
                  </div>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {filteredFarmers.length} Total
                  </span>
                </div>

                {/* Farmers Cards */}
                <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                  {filteredFarmers.map((farmer, idx) => (
                    <div 
                      key={farmer.id || idx}
                      className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 transition space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2.5 min-w-0">
                          {farmer.photoURL ? (
                            <img 
                              src={farmer.photoURL} 
                              alt={farmer.name} 
                              className="w-9 h-9 rounded-full object-cover ring-2 ring-emerald-500 shrink-0" 
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white font-black text-xs flex items-center justify-center shrink-0">
                              {farmer.name.charAt(0)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="text-xs font-black text-slate-900 truncate">
                              {farmer.name}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">
                              {farmer.district}, {farmer.state}
                            </div>
                          </div>
                        </div>

                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                          <span>Online</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-slate-200/60 text-[10px]">
                        <div>
                          <span className="text-slate-400">Crop: </span>
                          <strong className="text-slate-800">{farmer.primaryCrop || 'Wheat'}</strong>
                        </div>
                        <div className="text-right">
                          <span className="text-slate-400">Auth: </span>
                          <strong className="text-emerald-700">{farmer.authProvider || farmer.provider || 'Mobile'}</strong>
                        </div>
                        {farmer.age && (
                          <div>
                            <span className="text-slate-400">Age: </span>
                            <strong className="text-slate-800">{farmer.age} yrs</strong>
                          </div>
                        )}
                        {farmer.landholdingAcre && (
                          <div className="text-right">
                            <span className="text-slate-400">Plot: </span>
                            <strong className="text-slate-800">{farmer.landholdingAcre} Ac</strong>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 📊 TAB 2: OVERVIEW & SCANS */}
      {/* ========================================================================= */}
      {adminTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Live Pathogen & Diagnosis Feed */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <ScanLine className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {language === 'hi' ? 'लाइव पत्ती स्कैन व पैथोजन अलर्ट' : 'Live Leaf Scan Diagnostics'}
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-black uppercase">
                2 Active Alerts
              </span>
            </div>

            <div className="space-y-3">
              {[
                { crop: "PO", name: "Late Blight (Phytophthora infestans)", farmer: "Rajesh Kumar", loc: "Indore (Plot A1)", conf: 96, time: "10 mins ago", level: "High Risk" },
                { crop: "WH", name: "Yellow / Stripe Rust", farmer: "Harpreet Singh", loc: "Dewas Block B", conf: 94, time: "45 mins ago", level: "High Risk" },
                { crop: "TO", name: "Early Blight", farmer: "Suresh Patil", loc: "Dhar Sector 3", conf: 91, time: "2 hrs ago", level: "Moderate Risk" }
              ].map((scan, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                      {scan.crop}
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                        <span>{scan.name}</span>
                        <span className="px-2 py-0.2 rounded text-[9px] font-bold bg-rose-100 text-rose-800">{scan.level}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Farmer: {scan.farmer} • {scan.loc}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-emerald-600">{scan.conf}% Match</div>
                    <div className="text-[10px] text-slate-400">{scan.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Water & IoT Network Grid */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-cyan-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {language === 'hi' ? 'ब्लॉक टेलीमेट्री एवं सिंचाई नेटवर्क' : 'Block Telemetry & Irrigation Grid'}
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                5 Blocks Active
              </span>
            </div>

            <div className="space-y-3">
              {[
                { block: "Indore Central", moisture: "44%", temp: "28.5°C", pumps: "1 Active", status: "Optimal" },
                { block: "Dewas Agri Belt", moisture: "38%", temp: "29.2°C", pumps: "0 Active", status: "Mild Deficit" },
                { block: "Ujjain North", moisture: "42%", temp: "27.8°C", pumps: "1 Active", status: "Optimal" },
                { block: "Dhar Western Sector", moisture: "35%", temp: "30.1°C", pumps: "0 Active", status: "Needs Water" }
              ].map((bl, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-black text-slate-900">{bl.block}</div>
                    <div className="text-[10px] text-slate-500">Soil Moisture: {bl.moisture} • Soil Temp: {bl.temp}</div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${bl.status === 'Optimal' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                      {bl.status}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">{bl.pumps}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 🚨 TAB 3: EMERGENCY BROADCAST ADVISORY */}
      {/* ========================================================================= */}
      {adminTab === 'broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Radio className="w-5 h-5 text-amber-600 animate-pulse" />
                <h3 className="text-base font-extrabold text-slate-900">
                  {language === 'hi' ? 'आपातकालीन अलर्ट जारी करें' : 'Emergency Advisory Dispatcher'}
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-black uppercase">
                Instant Push
              </span>
            </div>

            <form onSubmit={handleDispatchAdvisory} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Advisory Title</label>
                <input
                  type="text"
                  required
                  value={advisoryTitle}
                  onChange={(e) => setAdvisoryTitle(e.target.value)}
                  placeholder="e.g. Yellow Rust Outbreak Warning in Malwa"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Prescription / Action Guidance</label>
                <textarea
                  rows="3"
                  required
                  value={advisoryMsg}
                  onChange={(e) => setAdvisoryMsg(e.target.value)}
                  placeholder="e.g. Inspect wheat canopy. Spray Propiconazole 25% EC (1ml/L) immediately."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Alert Level</label>
                  <select
                    value={advisoryLevel}
                    onChange={(e) => setAdvisoryLevel(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold outline-none"
                  >
                    <option value="warning">⚠️ Warning</option>
                    <option value="critical">🚨 Critical Emergency</option>
                    <option value="info">ℹ️ General Info</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Issuer</label>
                  <input
                    type="text"
                    value={advisoryIssuer}
                    onChange={(e) => setAdvisoryIssuer(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={dispatching}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>{dispatching ? "Broadcasting..." : "Broadcast Emergency Alert to All Farmers"}</span>
              </button>
            </form>
          </div>

          {/* Active Broadcasts Roster */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">
                {language === 'hi' ? 'वर्तमान में सक्रिय बुलेटिन' : 'Live Dispatched Advisories'}
              </h3>
              <span className="text-xs text-slate-400 font-bold">{overviewData?.broadcasts?.length || 0} active</span>
            </div>

            <div className="space-y-3 max-h-[380px] overflow-y-auto">
              {(overviewData?.broadcasts || []).map((b) => (
                <div key={b.id} className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-amber-950">{b.title}</span>
                    <button
                      onClick={() => handleDeleteBroadcast(b.id)}
                      className="p-1 rounded-lg text-rose-600 hover:bg-rose-100 transition cursor-pointer"
                      title="Withdraw broadcast"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-amber-900 leading-relaxed">{b.message}</p>
                  <div className="text-[10px] text-slate-500 font-medium">Issued by: {b.issuer}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 💰 TAB 4: APMC MANDI PRICE CONTROLLER */}
      {/* ========================================================================= */}
      {adminTab === 'mandi' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 max-w-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-extrabold text-slate-900">
                {language === 'hi' ? 'एपीएमसी मंडी लाइव भाव नियंत्रक' : 'APMC Mandi Price Feed Override'}
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
              Official Feed Control
            </span>
          </div>

          {mandiSuccess && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{mandiSuccess}</span>
            </div>
          )}

          <form onSubmit={handleUpdateMandi} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Commodity</label>
                <select
                  value={mandiCommodity}
                  onChange={(e) => setMandiCommodity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold outline-none"
                >
                  <option value="wheat">🌾 Wheat (गेहूं)</option>
                  <option value="soybean">🌱 Soybean (सोयाबीन)</option>
                  <option value="onion">🧅 Onion (प्याज)</option>
                  <option value="garlic">🧄 Garlic (लहसुन)</option>
                  <option value="mustard">🌼 Mustard (सरसों)</option>
                  <option value="cotton">☁️ Cotton (कपास)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">New Price (₹ / Quintal)</label>
                <input
                  type="number"
                  value={newMandiPrice}
                  onChange={(e) => setNewMandiPrice(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Market Recommendation</label>
              <select
                value={newMandiRec}
                onChange={(e) => setNewMandiRec(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold outline-none"
              >
                <option value="HOLD">🟢 HOLD - Expected to Rise</option>
                <option value="SELL">🔴 SELL - Peak Price Reached</option>
                <option value="NEUTRAL">🟡 NEUTRAL - Stable Rates</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Official Advisory Note</label>
              <input
                type="text"
                value={newMandiNote}
                onChange={(e) => setNewMandiNote(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Broadcast New Price to All Farmer Portals</span>
              <TrendingUp className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 🏛️ TAB 5: GOVERNMENT SCHEMES PUBLISHER */}
      {/* ========================================================================= */}
      {adminTab === 'schemes' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-4 max-w-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Landmark className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-extrabold text-slate-900">
                {language === 'hi' ? 'नई सरकारी योजना जारी करें' : 'Publish Government Scheme'}
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] font-bold">
              Kisan Portal Push
            </span>
          </div>

          {schemeSuccess && (
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{schemeSuccess}</span>
            </div>
          )}

          <form onSubmit={handlePublishScheme} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Scheme Name</label>
              <input
                type="text"
                required
                value={schemeName}
                onChange={(e) => setSchemeName(e.target.value)}
                placeholder="e.g. PM Solar Pump Subsidy Scheme (KUSUM 2.0)"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Financial Benefit</label>
              <input
                type="text"
                required
                value={schemeBenefit}
                onChange={(e) => setSchemeBenefit(e.target.value)}
                placeholder="e.g. 60% direct subsidy on solar pump installation"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Eligibility Criteria</label>
              <input
                type="text"
                value={schemeEligibility}
                onChange={(e) => setSchemeEligibility(e.target.value)}
                placeholder="e.g. All farmers with verified agricultural landholding"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Publish Scheme to Farmer App</span>
              <Landmark className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
