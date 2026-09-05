// =========================================================================
// 🌦️ REAL-TIME LIVE WEATHER & AGRO-METEOROLOGY SERVICE
// Powered by Open-Meteo Global High-Resolution Weather & Geocoding API
// =========================================================================

import https from 'https';

// WMO Weather Interpretation Codes (WW)
const WMO_CODES = {
  0: { en: "Clear sky", hi: "साफ आसमान", icon: "sun" },
  1: { en: "Mainly clear", hi: "मुख्यतः साफ", icon: "sun" },
  2: { en: "Partly cloudy", hi: "आंशिक रूप से बादल", icon: "cloud-sun" },
  3: { en: "Overcast", hi: "घने बादल", icon: "cloud" },
  45: { en: "Foggy / Mist", hi: "कोहरा / धुंध", icon: "cloud-fog" },
  48: { en: "Depositing rime fog", hi: "सफेद घना कोहरा", icon: "cloud-fog" },
  51: { en: "Light drizzle", hi: "हल्की बूंदाबांदी", icon: "cloud-drizzle" },
  53: { en: "Moderate drizzle", hi: "मध्यम बूंदाबांदी", icon: "cloud-drizzle" },
  55: { en: "Dense drizzle", hi: "तेज बूंदाबांदी", icon: "cloud-drizzle" },
  61: { en: "Slight rain", hi: "हल्की बारिश", icon: "cloud-rain" },
  63: { en: "Moderate rain", hi: "मध्यम बारिश", icon: "cloud-rain" },
  65: { en: "Heavy rain", hi: "भारी बारिश", icon: "cloud-rain" },
  71: { en: "Slight snow", hi: "हल्की बर्फबारी", icon: "snowflake" },
  80: { en: "Rain showers", hi: "बारिश की बौछारें", icon: "cloud-rain" },
  81: { en: "Moderate rain showers", hi: "मध्यम बौछारें", icon: "cloud-rain" },
  82: { en: "Violent rain showers", hi: "मूसलाधार बारिश", icon: "cloud-lightning" },
  95: { en: "Thunderstorm", hi: "गरज के साथ आंधी-तूफान", icon: "cloud-lightning" },
  96: { en: "Thunderstorm with hail", hi: "ओलावृष्टि के साथ तूफान", icon: "cloud-lightning" }
};

// HTTP GET helper
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'AgriSmart-Platform/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Generate Agricultural Impact Advisory from weather data
function generateAgroAdvisory(current, daily) {
  const temp = current.temperature_2m;
  const humidity = current.relative_humidity_2m;
  const wind = current.wind_speed_10m;
  const rainNext24h = daily.precipitation_sum?.[0] || 0;
  const maxTemp = daily.temperature_2m_max?.[0] || temp;

  let sprayCondition = "Optimal";
  let sprayConditionHi = "अनुकूल (उत्तम समय)";
  let sprayDesc = "Low wind (<12 km/h) and dry canopy. Ideal for foliar spray and bio-fungicides.";
  let sprayDescHi = "शांत हवा एवं सूखी पत्तियां। फफूंदनाशी एवं नैनो यूरिया छिड़काव के लिए उत्तम समय।";

  if (wind > 15 || rainNext24h > 2) {
    sprayCondition = "Not Recommended";
    sprayConditionHi = "छिड़काव से बचें (प्रतिकूल)";
    sprayDesc = `High wind (${wind} km/h) or expected rain (${rainNext24h}mm) may cause chemical drift and pesticide runoff.`;
    sprayDescHi = `तेज हवा (${wind} किमी/घंटा) या बारिश की संभावना के कारण दवा बहने का डर है।`;
  }

  let irrigationAdvice = "Normal Precision Drip";
  let irrigationAdviceHi = "सामान्य सूक्ष्म ड्रिप पटवन";
  if (rainNext24h >= 8) {
    irrigationAdvice = "Postpone Irrigation (Rain Expected)";
    irrigationAdviceHi = "सिंचाई रोकें (बारिश का पूर्वानुमान)";
  } else if (temp > 32 || humidity < 35) {
    irrigationAdvice = "High Evapotranspiration: Increase Irrigation by 20%";
    irrigationAdviceHi = "अधिक वाष्पीकरण: पटवन 20% बढ़ाएं";
  }

  let fieldAdvisory = "Weather is favorable for routine agricultural operations and weeding.";
  let fieldAdvisoryHi = "वर्तमान मौसम फसल वृद्धि एवं सामान्य कृषि कार्यों के लिए पूरी तरह अनुकूल है।";

  if (rainNext24h > 15) {
    fieldAdvisory = "Heavy rainfall warning: Ensure open drainage channels to prevent waterlogging in roots.";
    fieldAdvisoryHi = "भारी बारिश की चेतावनी: खेत में जलभराव रोकने के लिए जलनिकासी नाली साफ रखें।";
  } else if (maxTemp >= 38) {
    fieldAdvisory = "Heat stress alert: Provide light evening irrigation to cool soil root-zone.";
    fieldAdvisoryHi = "गर्मी व लू की चेतावनी: शाम के समय हल्की सिंचाई कर मिट्टी का तापमान नियंत्रित करें।";
  }

  return {
    spraying: { status: sprayCondition, statusHi: sprayConditionHi, desc: sprayDesc, descHi: sprayDescHi },
    irrigation: { status: irrigationAdvice, statusHi: irrigationAdviceHi },
    generalAdvisory: fieldAdvisory,
    generalAdvisoryHi: fieldAdvisoryHi
  };
}

export async function getLiveWeatherForecast({ lat = 22.7196, lon = 75.8577, cityName = "Indore, Madhya Pradesh" }) {
  try {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,uv_index_max,sunrise,sunset&timezone=auto`;
    
    const rawData = await fetchJson(weatherUrl);

    if (!rawData?.current) {
      throw new Error("Invalid response from Open-Meteo");
    }

    const curr = rawData.current;
    const daily = rawData.daily;
    const hourly = rawData.hourly;

    const weatherInfo = WMO_CODES[curr.weather_code] || { en: "Clear", hi: "साफ मौसम", icon: "sun" };

    // Format 7-Day Forecast
    const forecast7Day = daily.time.map((dateStr, i) => {
      const date = new Date(dateStr);
      const dayName = i === 0 ? "Today" : i === 1 ? "Tomorrow" : date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNameHi = i === 0 ? "आज" : i === 1 ? "कल" : date.toLocaleDateString('hi-IN', { weekday: 'short' });
      const wInfo = WMO_CODES[daily.weather_code[i]] || { en: "Clear", hi: "साफ", icon: "sun" };

      return {
        date: dateStr,
        day: dayName,
        dayHi: dayNameHi,
        maxTemp: Math.round(daily.temperature_2m_max[i]),
        minTemp: Math.round(daily.temperature_2m_min[i]),
        rainProb: daily.precipitation_probability_max[i] || 0,
        precipitationMm: daily.precipitation_sum[i] || 0,
        condition: wInfo.en,
        conditionHi: wInfo.hi,
        icon: wInfo.icon,
        uvIndex: daily.uv_index_max[i] || 5,
        sunrise: daily.sunrise[i]?.split('T')[1] || "06:15",
        sunset: daily.sunset[i]?.split('T')[1] || "18:30"
      };
    });

    // Format next 24-hour hourly forecast
    const currentHourIndex = new Date().getHours();
    const hourly24 = [];
    for (let i = currentHourIndex; i < currentHourIndex + 24 && i < hourly.time.length; i++) {
      const timeStr = hourly.time[i].split('T')[1];
      const wInfo = WMO_CODES[hourly.weather_code[i]] || { en: "Clear", hi: "साफ", icon: "sun" };
      hourly24.push({
        time: timeStr,
        temp: Math.round(hourly.temperature_2m[i]),
        humidity: hourly.relative_humidity_2m[i],
        rainProb: hourly.precipitation_probability[i] || 0,
        condition: wInfo.en,
        conditionHi: wInfo.hi,
        icon: wInfo.icon
      });
    }

    const agroAdvisory = generateAgroAdvisory(curr, daily);

    return {
      success: true,
      isLive: true,
      city: cityName,
      coordinates: { latitude: lat, longitude: lon },
      current: {
        temperature: Math.round(curr.temperature_2m),
        feelsLike: Math.round(curr.apparent_temperature),
        humidity: curr.relative_humidity_2m,
        condition: weatherInfo.en,
        conditionHi: weatherInfo.hi,
        icon: weatherInfo.icon,
        windSpeedKmH: Math.round(curr.wind_speed_10m),
        windDirection: curr.wind_direction_10m,
        pressureHpa: Math.round(curr.surface_pressure),
        precipitationCurrentMm: curr.precipitation,
        uvIndex: daily.uv_index_max?.[0] || 6,
        rainfallForecast24h: `${daily.precipitation_sum?.[0] || 0} mm`
      },
      forecast7Day,
      hourly24,
      agroAdvisory,
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

  } catch (err) {
    console.warn("Live Open-Meteo fetch failed, using realistic agro-fallback:", err.message);
    
    return {
      success: true,
      isLive: false,
      city: cityName,
      coordinates: { latitude: lat, longitude: lon },
      current: {
        temperature: 29,
        feelsLike: 30,
        humidity: 46,
        condition: "Mainly Clear & Sunny",
        conditionHi: "साफ एवं धूप",
        icon: "sun",
        windSpeedKmH: 9,
        windDirection: 240,
        pressureHpa: 1012,
        precipitationCurrentMm: 0,
        uvIndex: 6,
        rainfallForecast24h: "0 mm"
      },
      forecast7Day: [
        { day: "Today", dayHi: "आज", maxTemp: 30, minTemp: 18, rainProb: 5, precipitationMm: 0, condition: "Sunny", conditionHi: "धूप", icon: "sun", uvIndex: 6 },
        { day: "Tomorrow", dayHi: "कल", maxTemp: 31, minTemp: 19, rainProb: 10, precipitationMm: 0, condition: "Clear", conditionHi: "साफ", icon: "sun", uvIndex: 7 },
        { day: "Wed", dayHi: "बुध", maxTemp: 29, minTemp: 18, rainProb: 15, precipitationMm: 0.5, condition: "Partly Cloudy", conditionHi: "आंशिक बादल", icon: "cloud-sun", uvIndex: 5 },
        { day: "Thu", dayHi: "गुरु", maxTemp: 28, minTemp: 17, rainProb: 25, precipitationMm: 2.0, condition: "Cloudy", conditionHi: "बादल", icon: "cloud", uvIndex: 4 },
        { day: "Fri", dayHi: "शुक्र", maxTemp: 27, minTemp: 16, rainProb: 40, precipitationMm: 4.5, condition: "Light Rain", conditionHi: "हल्की बारिश", icon: "cloud-rain", uvIndex: 4 },
        { day: "Sat", dayHi: "शनि", maxTemp: 29, minTemp: 17, rainProb: 10, precipitationMm: 0, condition: "Sunny", conditionHi: "धूप", icon: "sun", uvIndex: 6 },
        { day: "Sun", dayHi: "रवि", maxTemp: 30, minTemp: 18, rainProb: 5, precipitationMm: 0, condition: "Clear", conditionHi: "साफ", icon: "sun", uvIndex: 7 }
      ],
      hourly24: [],
      agroAdvisory: {
        spraying: { status: "Optimal", statusHi: "अनुकूल (उत्तम)", desc: "Calm wind and dry leaf canopy. Ideal for foliar spray.", descHi: "शांत हवा एवं सूखी पत्तियां। छिड़काव के लिए उत्तम।" },
        irrigation: { status: "Normal Drip", statusHi: "सामान्य ड्रिप पटवन" },
        generalAdvisory: "Clear sunny weather. Favorable for vegetative growth and routine weeding.",
        generalAdvisoryHi: "साफ मौसम। फसलों के विकास एवं सामान्य कृषि कार्यों के लिए उत्तम।"
      },
      updatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  }
}

// Geocode search for Indian cities / districts
export async function searchCityCoordinates(query = "Indore") {
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
    const geoData = await fetchJson(geoUrl);

    if (geoData?.results?.length > 0) {
      return geoData.results.map(r => ({
        name: r.name,
        admin1: r.admin1 || "",
        country: r.country || "India",
        latitude: r.latitude,
        longitude: r.longitude,
        displayName: `${r.name}${r.admin1 ? ', ' + r.admin1 : ''}, ${r.country || 'India'}`
      }));
    }

    return [];
  } catch (err) {
    console.warn("Geocoding search failed:", err);
    return [];
  }
}

// Reverse geocode latitude and longitude into City/District name
export async function reverseGeocodeCoordinates({ lat, lon }) {
  try {
    const revUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    const data = await fetchJson(revUrl);
    if (data && (data.city || data.locality || data.principalSubdivision)) {
      const city = data.city || data.locality || data.localityInfo?.administrative?.[2]?.name || "My Farm";
      const state = data.principalSubdivision || "India";
      return {
        displayName: `${city}, ${state}`,
        city,
        state,
        latitude: Number(lat),
        longitude: Number(lon)
      };
    }
  } catch (e) {
    console.warn("Reverse geocode failed, using coordinates fallback:", e.message);
  }
  return {
    displayName: `Live Farm GPS (${Number(lat).toFixed(3)}°N, ${Number(lon).toFixed(3)}°E)`,
    city: `Live GPS (${Number(lat).toFixed(2)}°, ${Number(lon).toFixed(2)}°)`,
    state: "India",
    latitude: Number(lat),
    longitude: Number(lon)
  };
}


