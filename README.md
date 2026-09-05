# 🌾 AgriSmart AI — Smart Agriculture & Krishi Command Platform

[![Deploy to GitHub Pages](https://github.com/Saddam5244/Agridmart-AI/actions/workflows/deploy.yml/badge.svg)](https://github.com/Saddam5244/Agridmart-AI/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen)](https://saddam5244.github.io/Agridmart-AI/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> An advanced, full-stack AI-powered agricultural intelligence platform designed to empower farmers and agricultural officers with computer vision disease detection, live mandi commodity analytics, official agro-meteorological advisories, and an administrative command center.

🌐 **Live Deployment Link:** [https://saddam5244.github.io/Agridmart-AI/](https://saddam5244.github.io/Agridmart-AI/)

---

## 🌟 Key Features

### 1. 🌿 AI Crop Disease Detection & Leaf Verification
- **Botanical Leaf Validation**: Intelligent pre-scan validation prevents non-plant images from being analyzed, displaying instant corrective guidance to farmers.
- **Multi-Crop Pathology**: Deep diagnostic engine detecting Early/Late Blight, Powdery Mildew, Rust, Yellow Leaf Curl Virus, and Bacterial Spot with targeted organic/chemical treatment plans.

### 2. 📊 Live Mandi Market Intelligence
- **GPS Live Geolocation**: Auto-detects the farmer's current coordinates and fetches the nearest active agricultural mandi.
- **Pan-India Manual Search**: Filter across all Indian states, districts, and crop varieties to compare real-time arrivals, modal prices, and 7-day price trajectories.
- **Accurate Price Tracking**: Helps farmers choose the most profitable marketplace to sell their yield.

### 3. 🌤️ Agro-Meteorological Weather & Official Advisories
- **Live Weather Telemetry**: Hyperlocal temperature, humidity, rainfall probability, and wind metrics.
- **IMD / ICAR National Advisories**: Official agricultural bulletins tailored to specific farming regions with timely monsoon and irrigation advisories.

### 4. 👨‍🌾 Farmer Authentication & Onboarding
- **Farmer Profile Registration**: Captures name, district, state, farmer age, and primary crop focus.
- **Firebase Google One-Tap Sign-In**: Quick authentication with seamless session persistence.

### 5. 🛡️ Krishi Admin Command Center
- **Pre-Registered Security Gate**: Public registration is locked. Accessible strictly via authorized Department of Agriculture Officer credentials (`DAO-MP-4102`).
- **Live Farmer Logins Roster**: Real-time monitor of all registered and currently active farmers across districts.
- **Real-Time Activity Stream**: Live feed tracking crop scans, mandi queries, voice interactions, and yield simulations across the nation.
- **Cyber-Agri Aesthetic**: High-contrast, vibrant command-center dark theme with cyber-emerald and cyan metrics.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Recharts, Canvas Confetti
- **Authentication**: Firebase Authentication (Google Sign-In) + Local Storage Session Roster
- **Backend / API**: Node.js, Express, Multer, REST APIs
- **Machine Learning**: Custom Leaf-Verification Neural Classifier & Disease Diagnosis Pipeline
- **Deployment**: GitHub Pages (via GitHub Actions workflow)

---

## 🚀 Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/Saddam5244/Agridmart-AI.git
cd Agridmart-AI
```

### 2. Run the Frontend (React 19 + Vite)
```bash
cd client
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Run the Backend (Optional for full backend API)
```bash
cd ..
npm install
node src/index.js
```

---

## 🔐 Admin Portal Credentials (Pre-Registered)

| Field | Value |
|-------|-------|
| **Officer ID** | `DAO-MP-4102` *(or `admin`)* |
| **Passcode** | `Krishi@2026` *(or `9988`)* |

*Note: For testing purposes, the login screen includes a 1-tap "Use Official Demo Passkey" button.*

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
