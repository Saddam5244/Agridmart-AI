import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  TrendingUp, 
  Coins, 
  Droplets, 
  ShieldCheck, 
  AlertTriangle, 
  Trophy, 
  Calendar, 
  Check, 
  ArrowRight,
  PieChart,
  Sparkles,
  Info
} from 'lucide-react';
import { fetchCropComparison } from '../services/api';
import { CROP_NAMES_MAP, getTranslation } from '../utils/translations';

export default function CropComparisonMatrix({ 
  language = "en", 
  initialCrops = ["Wheat", "Mustard / Rapeseed", "Chickpea / Gram"] 
}) {
  const t = getTranslation(language);

  const AVAILABLE_CROPS = [
    "Wheat",
    "Mustard / Rapeseed",
    "Chickpea / Gram",
    "Tomato",
    "Potato",
    "Rice / Paddy",
    "Cotton",
    "Maize / Corn",
    "Soybean"
  ];

  const [selectedCrops, setSelectedCrops] = useState(initialCrops.slice(0, 3));
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCrops.length > 0) {
      loadComparison();
    }
  }, [selectedCrops]);

  const loadComparison = async () => {
    setLoading(true);
    try {
      const res = await fetchCropComparison(selectedCrops);
      if (res?.crops) {
        setComparisonData(res.crops);
      }
    } catch (err) {
      console.error("Comparison load failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleCropSelection = (cropName) => {
    if (selectedCrops.includes(cropName)) {
      if (selectedCrops.length > 2) {
        setSelectedCrops(selectedCrops.filter(c => c !== cropName));
      }
    } else {
      if (selectedCrops.length < 3) {
        setSelectedCrops([...selectedCrops, cropName]);
      } else {
        // Replace the last one
        setSelectedCrops([selectedCrops[0], selectedCrops[1], cropName]);
      }
    }
  };

  const getLocalizedName = (name) => {
    // Check in CROP_NAMES_MAP
    for (const key of Object.keys(CROP_NAMES_MAP)) {
      if (name.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(name.toLowerCase())) {
        return CROP_NAMES_MAP[key]?.[language] || CROP_NAMES_MAP[key]?.hi || name;
      }
    }
    return name;
  };

  return (
    <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 bg-white border border-emerald-500/30 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-300">
            <Scale className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.crops?.compareTab || "Side-by-Side Crop Comparison & Insights"}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {t.crops?.compareTab || "Side-by-Side Crop Comparison"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.crops?.compareSubtitle || "Compare expected yield, net profit, cultivation costs, and water intensity between top candidate crops."}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-2xl border border-emerald-200">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>{language === 'hi' ? 'भाकृअनुप (ICAR) कृषि अर्थशास्त्र मानक' : 'ICAR Farm Economics Benchmarks'}</span>
        </div>
      </div>

      {/* Crop Selector Pills */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-2">
          {t.crops?.selectCropsToCompare || "Select 2 or 3 Crops to Compare"}:
        </label>
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_CROPS.map((crop) => {
            const isSelected = selectedCrops.includes(crop);
            return (
              <button
                key={crop}
                type="button"
                onClick={() => toggleCropSelection(crop)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 border ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-400/40'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                <span>{getLocalizedName(crop)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      {loading ? (
        <div className="py-12 text-center text-slate-500 space-y-2">
          <div className="animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto" />
          <p className="text-xs font-medium">Calculating comparative economics & water balance...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {comparisonData.map((crop, idx) => {
            const locName = getLocalizedName(crop.name);
            const isHighestProfit = crop.badges?.some(b => b.type === 'profit');
            
            return (
              <div 
                key={crop.name + idx}
                className={`rounded-3xl p-5 border transition-all flex flex-col justify-between ${
                  isHighestProfit 
                    ? 'bg-gradient-to-b from-emerald-50/70 to-white border-2 border-emerald-500 shadow-xl shadow-emerald-500/10' 
                    : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Top Badge & Crop Title */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        {locName}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {crop.category} • {crop.durationDays}
                      </span>
                    </div>

                    {isHighestProfit && (
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-600 text-white text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1 shadow-sm">
                        <Trophy className="w-3 h-3" />
                        <span>Best Profit</span>
                      </span>
                    )}
                  </div>

                  {/* Verdict Badges */}
                  {crop.badges?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 my-3">
                      {crop.badges.map((b, bIdx) => (
                        <span 
                          key={bIdx}
                          className="px-2 py-0.5 rounded-lg bg-emerald-100/90 text-emerald-900 text-[10px] font-bold border border-emerald-300 flex items-center gap-1"
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                          <span>{language === 'hi' ? b.labelHi : b.label}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Highlight Metrics */}
                  <div className="space-y-2.5 my-4">
                    
                    {/* Net Profit */}
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-emerald-800 font-bold block">
                          {t.crops?.netProfit || "Net Profit (Per Acre)"}
                        </span>
                        <span className="text-lg font-black text-emerald-700">
                          ₹{crop.netProfit?.toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 font-medium block">ROI</span>
                        <span className="text-sm font-extrabold text-emerald-800">
                          +{crop.roiPercentage}%
                        </span>
                      </div>
                    </div>

                    {/* Yield & Mandi Price */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] text-slate-500 block font-medium">
                          {t.crops?.predictedYield || "Expected Yield"}
                        </span>
                        <span className="font-extrabold text-slate-900 text-sm">
                          {crop.yieldAcre} <span className="text-[10px] font-normal text-slate-500">q/Acre</span>
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-[10px] text-slate-500 block font-medium">
                          {t.crops?.mandiPrice || "Mandi Rate / MSP"}
                        </span>
                        <span className="font-extrabold text-cyan-800 text-sm">
                          ₹{crop.marketRate?.toLocaleString()} <span className="text-[10px] font-normal text-cyan-600">/ q</span>
                        </span>
                      </div>
                    </div>

                    {/* Cultivation Cost */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">
                        {t.crops?.cultivationCost || "Total Cultivation Cost"}:
                      </span>
                      <span className="font-bold text-slate-900">
                        ₹{crop.totalCost?.toLocaleString()}
                      </span>
                    </div>

                    {/* Water Intensity */}
                    <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sky-900 font-semibold flex items-center gap-1">
                          <Droplets className="w-3.5 h-3.5 text-sky-600" />
                          <span>{t.crops?.waterIntensity || "Water Requirement"}:</span>
                        </span>
                        <span className="font-bold text-sky-800">
                          {(crop.waterLiters / 100000).toFixed(1)} Lakh L/Ac
                        </span>
                      </div>
                      <div className="text-[10px] text-sky-700">
                        {crop.waterRequirement}
                      </div>
                    </div>

                    {/* Pest / Disease Vulnerability */}
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                      <div className="flex items-center space-x-1.5 text-amber-900 font-bold mb-0.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{t.crops?.riskRating || "Pest & Risk Factor"}:</span>
                      </div>
                      <div className="text-[11px] text-amber-800 leading-tight">
                        {crop.diseaseRisk}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Agronomic Advice Footnote */}
                <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-600 leading-normal flex items-start space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>{language === 'hi' ? 'कृषि सलाह:' : 'Advice:'}</strong> {crop.keyAdvice}</span>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Comparison Summary Table */}
      {comparisonData.length > 1 && (
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">{language === 'hi' ? 'तुलनात्मक संकेतक / मापदंड' : 'Metric / Comparison Signal'}</th>
                {comparisonData.map(c => (
                  <th key={c.name} className="p-3 font-extrabold text-slate-900">
                    {getLocalizedName(c.name)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              <tr>
                <td className="p-3 font-semibold text-slate-600">{t.crops?.netProfit || "Net Profit (Per Acre)"}</td>
                {comparisonData.map(c => (
                  <td key={c.name} className="p-3 font-black text-emerald-700 text-sm">
                    ₹{c.netProfit?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-600">{t.crops?.predictedYield || "Expected Yield"}</td>
                {comparisonData.map(c => (
                  <td key={c.name} className="p-3 font-bold">
                    {c.yieldAcre} q/Acre
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-600">{t.crops?.cultivationCost || "Total Cultivation Cost"}</td>
                {comparisonData.map(c => (
                  <td key={c.name} className="p-3 font-bold text-slate-700">
                    ₹{c.totalCost?.toLocaleString()}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-600">{t.crops?.waterIntensity || "Water Requirement"}</td>
                {comparisonData.map(c => (
                  <td key={c.name} className="p-3 font-medium text-sky-800">
                    {(c.waterLiters / 100000).toFixed(1)} Lakh L/Ac
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-600">{t.crops?.growthDays || "Harvest Duration"}</td>
                {comparisonData.map(c => (
                  <td key={c.name} className="p-3 font-medium text-slate-600">
                    {c.durationDays}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-semibold text-slate-600">{t.crops?.winnerVerdict || "Economic Verdict"}</td>
                {comparisonData.map(c => (
                  <td key={c.name} className="p-3">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-extrabold text-[10px]">
                      {c.badges?.[0]?.label || "Balanced Choice"}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
