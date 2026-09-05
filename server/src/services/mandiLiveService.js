/**
 * 🌾 AgriSmart AI — Real-Time Mandi Live Feed & Commodity Intelligence Service
 * Handles live filtering by state, district, product category, search, and ticker stats.
 */

import { MANDI_PRICES } from '../data/mandiPrices.js';

let liveMandiRegistry = [...MANDI_PRICES];

export function getLiveMandiRates({
  search = "",
  state = "all",
  district = "all",
  category = "all",
  sortBy = "volume", // 'volume' | 'price_high' | 'price_low' | 'gainers' | 'crop_name'
  limit = 50
} = {}) {
  let list = [...liveMandiRegistry];

  // 1. Filter by State
  if (state && state !== "all") {
    const sLower = state.toLowerCase().trim();
    list = list.filter(item => item.state.toLowerCase().includes(sLower));
  }

  // 2. Filter by District / Local Mandi
  if (district && district !== "all") {
    const dLower = district.toLowerCase().trim();
    list = list.filter(item => 
      item.district.toLowerCase().includes(dLower) || 
      item.market.toLowerCase().includes(dLower)
    );
  }

  // 3. Filter by Product Category
  if (category && category !== "all") {
    const cLower = category.toLowerCase().trim();
    list = list.filter(item => item.category.toLowerCase() === cLower);
  }

  // 4. Free-Text Search across commodity, Hindi name, market, and district
  if (search && search.trim().length > 0) {
    const q = search.toLowerCase().trim();
    list = list.filter(item => 
      item.commodity.toLowerCase().includes(q) ||
      (item.commodityHi && item.commodityHi.toLowerCase().includes(q)) ||
      (item.commodityBho && item.commodityBho.toLowerCase().includes(q)) ||
      item.market.toLowerCase().includes(q) ||
      item.district.toLowerCase().includes(q) ||
      item.state.toLowerCase().includes(q)
    );
  }

  // 5. Sorting
  if (sortBy === "price_high") {
    list.sort((a, b) => b.currentPrice - a.currentPrice);
  } else if (sortBy === "price_low") {
    list.sort((a, b) => a.currentPrice - b.currentPrice);
  } else if (sortBy === "gainers") {
    list.sort((a, b) => {
      const getPercent = (str) => parseFloat(str.match(/([+-]?\d+(\.\d+)?)%/)?.[1] || 0);
      return getPercent(b.change24h) - getPercent(a.change24h);
    });
  } else if (sortBy === "crop_name") {
    list.sort((a, b) => a.commodity.localeCompare(b.commodity));
  } else {
    // Default: Sort by arrival volume / activity
    list.sort((a, b) => (b.arrivalTons || 0) - (a.arrivalTons || 0));
  }

  return {
    success: true,
    totalMarkets: liveMandiRegistry.length,
    matchingCount: list.length,
    timestamp: new Date().toISOString(),
    lastUpdatedFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " Today",
    markets: list.slice(0, limit)
  };
}

export function getMandiSummary() {
  const all = [...liveMandiRegistry];
  
  // Top 4 Gainers
  const gainers = [...all]
    .filter(m => m.trend === "up")
    .sort((a, b) => {
      const getPercent = (str) => parseFloat(str.match(/([+-]?\d+(\.\d+)?)%/)?.[1] || 0);
      return getPercent(b.change24h) - getPercent(a.change24h);
    })
    .slice(0, 4);

  // Top Volume / Arrivals
  const highestArrivals = [...all]
    .sort((a, b) => (b.arrivalTons || 0) - (a.arrivalTons || 0))
    .slice(0, 4);

  // Available unique states & districts for dropdown filters
  const uniqueStates = [...new Set(all.map(m => m.state))];
  const uniqueDistricts = [...new Set(all.map(m => m.district))];
  const uniqueCategories = [
    { id: "all", label: "All Products (सभी फसलें)", count: all.length },
    { id: "grains", label: "Cereals & Grains (अनाज)", count: all.filter(m => m.category === "grains").length },
    { id: "pulses", label: "Pulses & Legumes (दलहन)", count: all.filter(m => m.category === "pulses").length },
    { id: "oilseeds", label: "Oilseeds (तिलहन)", count: all.filter(m => m.category === "oilseeds").length },
    { id: "vegetables", label: "Vegetables (सब्जियां)", count: all.filter(m => m.category === "vegetables").length },
    { id: "spices", label: "Spices & Commercial (मसाले)", count: all.filter(m => m.category === "spices").length },
    { id: "cash_crops", label: "Cash & Fiber Crops (नकदी)", count: all.filter(m => m.category === "cash_crops").length }
  ];

  // Live Scrolling Ticker Items
  const tickerItems = all.map(m => ({
    id: m.id,
    commodity: m.commodity,
    commodityHi: m.commodityHi,
    market: m.market,
    district: m.district,
    state: m.state,
    currentPrice: m.currentPrice,
    change24h: m.change24h,
    trend: m.trend
  }));

  return {
    success: true,
    totalCommoditiesTracked: all.length,
    gainers,
    highestArrivals,
    uniqueStates,
    uniqueDistricts,
    uniqueCategories,
    tickerItems,
    lastSyncTime: new Date().toISOString()
  };
}

export function updateMandiPriceById(commodityId, updates) {
  const cId = (commodityId || "").toLowerCase().trim();
  const matchedItems = liveMandiRegistry.filter(m => 
    m.id === commodityId || 
    m.id.toLowerCase() === cId ||
    m.id.toLowerCase().startsWith(cId) ||
    m.commodity.toLowerCase().includes(cId)
  );
  if (matchedItems.length === 0) return null;

  matchedItems.forEach(item => {
    if (updates.currentPrice) {
      const oldPrice = item.currentPrice;
      const newPrice = Number(updates.currentPrice);
      const diff = newPrice - oldPrice;
      const percent = oldPrice > 0 ? ((diff / oldPrice) * 100).toFixed(1) : "0.0";
      
      item.currentPrice = newPrice;
      item.change24h = `${diff >= 0 ? '+' : ''}₹${diff} (${diff >= 0 ? '+' : ''}${percent}%)`;
      item.trend = diff > 0 ? "up" : diff < 0 ? "down" : "stable";
      
      if (item.historical && item.historical.length > 0) {
        const todayIdx = item.historical.findIndex(h => h.date.includes("Today"));
        if (todayIdx >= 0) {
          item.historical[todayIdx].price = newPrice;
        }
      }
    }

    if (updates.sellRecommendation) item.sellRecommendation = updates.sellRecommendation;
    if (updates.forecastNote) item.forecastNote = updates.forecastNote;
    if (updates.arrivalTons) item.arrivalTons = Number(updates.arrivalTons);
  });

  return matchedItems[0];
}
