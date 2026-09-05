export const CROP_DISEASES = [
  {
    id: "potato_late_blight",
    crop: "Potato",
    diseaseName: "Late Blight (Phytophthora infestans)",
    severity: "High",
    confidence: 0.96,
    pathogenType: "Oomycete / Fungal-like",
    affectedLeafArea: "38%",
    diseaseStage: "Active Sporulation / Foliar Blight Stage",
    urgentAction: "Immediate action required within 24-36 hours. Spray systemic fungicide before rain or fog spread spores.",
    economicThreshold: "1-2 lesions per plant canopy trigger emergency intervention threshold.",
    spreadConditions: "Relative humidity > 85%, temperature 12-22°C with morning fog or rain splash.",
    yieldRecovery: "Up to 92% yield recoverable if treated within 48 hours of lesion appearance.",
    commercialBrands: [
      "Ridomil Gold MZ (Syngenta) @ 2g/L",
      "Kavach (Syngenta) @ 2g/L",
      "Dithane M-45 (UPL) @ 2.5g/L",
      "Curzate M-8 (Corteva) @ 2.5g/L"
    ],
    spraySchedule: "Day 0: Curative systemic spray | Day 10: Protective contact spray | Pre-harvest interval: 14 days",
    symptoms: [
      "Water-soaked dark lesions on leaf tips and margins",
      "White fungal fuzzy growth on underside of leaves in humid conditions",
      "Rapidly browning and rotting foliage with unpleasant odor"
    ],
    organicTreatments: [
      "Spray copper sulfate or Bordeaux mixture (1%) at first sign",
      "Apply Trichoderma viride or Bacillus subtilis biological sprays @ 5g/L",
      "Prune and destroy infected leaves; do not compost them"
    ],
    chemicalControls: [
      "Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2g/liter of water",
      "Mancozeb 75% WP (Dithane M-45) @ 2.5g/liter",
      "Dimethomorph 50% WP @ 1g/liter during peak outbreak"
    ],
    prevention: [
      "Use certified disease-free seed tubers with strict cold store inspection",
      "Maintain wide plant spacing (60cm x 20cm) for optimal airflow",
      "Avoid overhead sprinkler irrigation to keep foliage dry"
    ]
  },
  {
    id: "tomato_early_blight",
    crop: "Tomato",
    diseaseName: "Early Blight (Alternaria solani)",
    severity: "Moderate",
    confidence: 0.94,
    pathogenType: "Fungal",
    affectedLeafArea: "24%",
    diseaseStage: "Lower Canopy Target-Board Spot Stage",
    urgentAction: "Prune lower infected leaves up to 25cm from soil and apply curative foliar fungicide within 48 hours.",
    economicThreshold: "5% lower foliage infection or 2-3 target spots per lower leaf.",
    spreadConditions: "Warm humid weather (24-30°C) with alternating wet and dry periods.",
    yieldRecovery: "Up to 95% marketable fruit yield salvageable with prompt treatment.",
    commercialBrands: [
      "Score 250 EC (Syngenta - Difenoconazole) @ 0.5ml/L",
      "Antracol (Bayer - Propineb 70% WP) @ 2.5g/L",
      "Amistar Top (Syngenta) @ 1ml/L"
    ],
    spraySchedule: "Day 0: Foliar application | Day 12: Repeat spray if humidity remains high | Pre-harvest interval: 5 days",
    symptoms: [
      "Concentric dark brown rings resembling target-board spots on older leaves",
      "Yellow halos surrounding brown spots",
      "Premature leaf drop starting from lower canopy"
    ],
    organicTreatments: [
      "Neem seed kernel extract (5%) or Neem oil 3000 ppm @ 5ml/liter spray",
      "Bio-fungicide Pseudomonas fluorescens @ 5g/liter foliar spray",
      "Mulch soil surface with straw or plastic to prevent rain splash of soil spores"
    ],
    chemicalControls: [
      "Difenoconazole 25% EC (Score) @ 0.5ml/liter of water",
      "Chlorothalonil 75% WP (Kavach) @ 2g/liter",
      "Azoxystrobin 23% SC @ 1ml/liter"
    ],
    prevention: [
      "Implement 3-year crop rotation without solanaceous crops (potato, brinjal)",
      "Stake and trellis plants to keep foliage off ground",
      "Drip irrigation to keep leaves dry"
    ]
  },
  {
    id: "rice_blast",
    crop: "Rice / Paddy",
    diseaseName: "Rice Blast (Magnaporthe oryzae)",
    severity: "High",
    confidence: 0.95,
    pathogenType: "Fungal",
    affectedLeafArea: "42%",
    diseaseStage: "Foliar Spindle Lesion & Panicle Neck Rot Threat",
    urgentAction: "Halt nitrogen/urea top dressing immediately. Spray systemic blasticide within 24 hours.",
    economicThreshold: "1-2 spindle spots per hill in seedling or tillering stage.",
    spreadConditions: "Overcast skies, 90%+ humidity, night temp 18-24°C with excessive nitrogen fertilizer.",
    yieldRecovery: "Up to 88% yield recoverable if treated before neck blast sets in.",
    commercialBrands: [
      "Baan (Bayer - Tricyclazole 75% WP) @ 0.6g/L",
      "Fuji-One (Isoprothiolane 40% EC) @ 1.5ml/L",
      "Kasumin (Arysta - Kasugamycin 3% SL) @ 2.5ml/L"
    ],
    spraySchedule: "Spray at tillering and repeat at 5% panicle emergence stage.",
    symptoms: [
      "Spindle-shaped elliptical lesions with grayish-white centers and brown borders",
      "Neck rot causing panicles to droop and turn whitish (chaffy grain)",
      "Severe leaf blighting across canopy"
    ],
    organicTreatments: [
      "Spray fermented butter milk (chaas) mixed with asafoetida (hing 50g/acre)",
      "Pseudomonas fluorescens seed treatment (10g/kg seed) and foliar spray @ 5g/L",
      "Apply silica fertilizer to strengthen plant epidermal cell walls"
    ],
    chemicalControls: [
      "Tricyclazole 75% WP (Baan) @ 0.6g/liter (Most potent blasticide)",
      "Isoprothiolane 40% EC @ 1.5ml/liter",
      "Kasugamycin 3% SL @ 2.5ml/liter"
    ],
    prevention: [
      "Avoid excessive split doses of urea top-dressing during cloudy weather",
      "Maintain continuous shallow flooding during vulnerable stages",
      "Plant blast-resistant certified cultivars (e.g. Swarna Sub1, Pusa 1509)"
    ]
  },
  {
    id: "wheat_yellow_rust",
    crop: "Wheat",
    diseaseName: "Yellow / Stripe Rust (Puccinia striiformis)",
    severity: "High",
    confidence: 0.93,
    pathogenType: "Fungal",
    affectedLeafArea: "35%",
    diseaseStage: "Active Linear Pustule / Epidemic Spread Stage",
    urgentAction: "Spray Propiconazole 25% EC across entire field within 48 hours to arrest fungal mycelium.",
    economicThreshold: "Detection of even a single patch of yellow stripes in 1 acre triggers mandatory spray.",
    spreadConditions: "Cool humid weather (8-15°C) with persistent winter fog, dew, and western disturbances.",
    yieldRecovery: "Up to 90% grain yield protected if sprayed before ear-emergence.",
    commercialBrands: [
      "Tilt (Syngenta - Propiconazole 25% EC) @ 1ml/L",
      "Folicur (Bayer - Tebuconazole 25.9% EC) @ 1ml/L",
      "Custodia (Adama) @ 1.5ml/L"
    ],
    spraySchedule: "Day 0: 200 ml Propiconazole in 200 L water/acre | Day 14: Repeat if fog persists.",
    symptoms: [
      "Yellow-orange pustules arranged in distinct linear stripes along leaf veins",
      "Chlorotic yellowing of leaves",
      "Powdery yellow spores rubbing off easily on fingers"
    ],
    organicTreatments: [
      "Spray fermented sour buttermilk + cow urine (1:10 ratio) with 50g turmeric",
      "Apply bio-fungicide Trichoderma harzianum early in winter season",
      "Ensure balanced potassium (MOP) nutrition to build cellular rust resistance"
    ],
    chemicalControls: [
      "Propiconazole 25% EC (Tilt) @ 1ml/liter (200 ml/acre in 200 L water)",
      "Tebuconazole 25.9% EC (Folicur) @ 1ml/liter",
      "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/liter"
    ],
    prevention: [
      "Sow rust-resistant certified wheat varieties (e.g., HD 3086, DBW 187, DBW 303)",
      "Timely sowing in November before rust airborne spores migrate from sub-Himalayas",
      "Monitor northern and sub-montane plains closely during December-January"
    ]
  },
  {
    id: "corn_common_rust",
    crop: "Corn / Maize",
    diseaseName: "Common Rust (Puccinia sorghi)",
    severity: "Moderate",
    confidence: 0.92,
    pathogenType: "Fungal",
    affectedLeafArea: "20%",
    diseaseStage: "Bilateral Pustule Eruption Stage",
    urgentAction: "Foliar spray of contact plus systemic fungicide before silking stage.",
    economicThreshold: "6 or more pustules per leaf prior to tasseling stage.",
    spreadConditions: "Cool nights (15-20°C), warm days (24-28°C) with heavy dew.",
    yieldRecovery: "Up to 94% cob filling and grain weight preserved.",
    commercialBrands: [
      "Amistar (Syngenta - Azoxystrobin) @ 1ml/L",
      "Dithane M-45 (UPL - Mancozeb) @ 2.5g/L",
      "Priaxor (BASF) @ 0.8ml/L"
    ],
    spraySchedule: "Initial application at first pustule sight; repeat after 14 days if needed.",
    symptoms: [
      "Small, powdery cinnamon-brown to dark brown pustules on both upper and lower leaf surfaces",
      "Pustules rupture epidermal tissue",
      "Leaves turn yellow and die prematurely under heavy infection"
    ],
    organicTreatments: [
      "Sulfur dusting @ 15-20 kg/ha in early morning",
      "Foliar spray of neem oil (3000 ppm) @ 3ml/liter",
      "Ensure balanced potassium nutrition to enhance natural resistance"
    ],
    chemicalControls: [
      "Mancozeb 75% WP @ 2.5g/liter",
      "Azoxystrobin + Difenoconazole @ 1ml/liter",
      "Pyraclostrobin 20% WG @ 1g/liter"
    ],
    prevention: [
      "Select rust-tolerant hybrid corn seeds (Pioneer / Syngenta / Dekalb)",
      "Early planting to avoid late-season high humidity cycles",
      "Eradicate Oxalis weed species (alternate host)"
    ]
  },
  {
    id: "cotton_bacterial_blight",
    crop: "Cotton",
    diseaseName: "Bacterial Blight / Angular Leaf Spot (Xanthomonas citri pv. malvacearum)",
    severity: "Moderate",
    confidence: 0.91,
    pathogenType: "Bacterial",
    affectedLeafArea: "28%",
    diseaseStage: "Angular Vein-Bounded Lesion & Black Arm Stage",
    urgentAction: "Spray Streptocycline antibacterial formulation mixed with Copper Oxychloride within 48 hours.",
    economicThreshold: "> 10% plants showing angular lesions or black stem streaks.",
    spreadConditions: "Warm humid rainy weather (28-35°C) with wind-driven rain and thunderstorm splash.",
    yieldRecovery: "Up to 91% boll retention and lint quality protected.",
    commercialBrands: [
      "Streptocycline (Hindustan Antibiotics) @ 0.1g/L",
      "Blitox 50 WP (Rallis - Copper Oxychloride) @ 2.5g/L",
      "Kocide (Corteva - Copper Hydroxide) @ 2g/L"
    ],
    spraySchedule: "Day 0: Streptocycline 10g + Blitox 250g in 100L water/acre | Day 12: Repeat if rainfall continues.",
    symptoms: [
      "Small, water-soaked angular spots bounded by leaf veins",
      "Lesions turn dark brown to black (black arm on stems)",
      "Boll rot leading to fiber staining"
    ],
    organicTreatments: [
      "Bio-agent Bacillus amyloliquefaciens spray @ 5g/liter",
      "Soak seeds in cow dung slurry + Trichoderma before sowing",
      "Copper hydroxide organic formulation @ 2g/liter"
    ],
    chemicalControls: [
      "Streptocycline (9:1 Streptomycin + Tetracycline) @ 100mg/liter + Copper Oxychloride @ 2.5g/liter",
      "Copper Hydroxide 53.8% DF @ 2g/liter",
      "Kasugamycin 3% SL @ 2ml/liter"
    ],
    prevention: [
      "Acid delinting of cotton seeds with concentrated H2SO4",
      "Field sanitation and burning of previous season cotton stalks",
      "Avoid excess nitrogenous top dressing"
    ]
  },
  {
    id: "apple_scab",
    crop: "Apple",
    diseaseName: "Apple Scab (Venturia inaequalis)",
    severity: "High",
    confidence: 0.95,
    pathogenType: "Fungal",
    affectedLeafArea: "31%",
    diseaseStage: "Velvety Olive Lesion / Fruit Infection Stage",
    urgentAction: "Apply curative systemic fungicide within 72 hours of primary infection period.",
    economicThreshold: "1-2 scab lesions per leaf cluster during pink bud to petal fall.",
    spreadConditions: "Wet foliage for 6-9 continuous hours at 15-20°C during spring blossom.",
    yieldRecovery: "Up to 93% fruit quality and market value protected.",
    commercialBrands: [
      "Score 250 EC (Syngenta) @ 0.3ml/L",
      "Captaf 50 WP (Rallis - Captan) @ 2.5g/L",
      "Dodine 65 WP (Syllit) @ 1g/L"
    ],
    spraySchedule: "Pre-bloom, petal fall, and fruit development sprays at 10-day intervals.",
    symptoms: [
      "Olive-green to dull dark brown velvety spots on leaves",
      "Deformed leaves with scabby crusts",
      "Corky, cracked lesions on apple fruit surfaces"
    ],
    organicTreatments: [
      "Liquid lime sulfur spray during green tip stage",
      "Bicarbonate of soda (baking soda) 5g/liter with horticultural oil",
      "Compost tea spray to boost beneficial phyllosphere microbes"
    ],
    chemicalControls: [
      "Captan 50% WP @ 2.5g/liter",
      "Difenoconazole 25% EC @ 0.5ml/liter",
      "Dodine 65% WP @ 1g/liter"
    ],
    prevention: [
      "Rake and shred or spray urea on fallen autumn leaves to eliminate overwintering spores",
      "Prune orchard canopies to maximize air circulation and sunlight penetration",
      "Plant scab-resistant cultivars"
    ]
  },
  {
    id: "healthy_crop",
    crop: "General / Universal",
    diseaseName: "Healthy Crop - No Pathogen Detected",
    severity: "None",
    confidence: 0.98,
    pathogenType: "None",
    affectedLeafArea: "0%",
    diseaseStage: "Optimal Physiological Vegetative Vigor",
    urgentAction: "No chemical fungicide or pesticide required. Maintain standard irrigation and nutrition schedule.",
    economicThreshold: "Zero pathogen threshold. Keep monitoring every 4-5 days.",
    spreadConditions: "Favorable dry microclimate with good soil drainage and balanced NPK nutrition.",
    yieldRecovery: "100% full potential yield anticipated under continued good management.",
    commercialBrands: [
      "NPK 19:19:19 water-soluble foliar spray @ 5g/L",
      "Seaweed Extract (Biozyme / Sagarika) @ 2ml/L",
      "Chelated Micronutrient Spray @ 1.5g/L"
    ],
    spraySchedule: "Routine vegetative nutrition: Spray NPK 19:19:19 + Micronutrients every 15-20 days.",
    symptoms: [
      "Vibrant green leaf coloration with uniform chlorophyll distribution",
      "Turgid leaf structure without necrosis, chlorosis, or spots",
      "Clean leaf underside without fungal mycelium or insect egg clusters"
    ],
    organicTreatments: [
      "Apply preventative seaweed extract or humic acid foliar spray (2ml/L) to boost immunity",
      "Maintain regular beneficial microbial drench (Jeevavrit or Trichoderma)",
      "Ensure balanced micronutrient nutrition (Zinc, Boron, Magnesium)"
    ],
    chemicalControls: [
      "No chemical pesticide required. Avoid unnecessary chemical applications to preserve beneficial predatory insects."
    ],
    prevention: [
      "Continue regular field scouting every 3-4 days",
      "Maintain smart soil moisture tracking and balanced fertilizer schedules"
    ]
  }
];
