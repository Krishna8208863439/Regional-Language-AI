# 🗣️ BharatVoice AI – Enterprise Regional Language AI Platform

> **Intelligent Multilingual Voice, Neural Translation, OCR & Low-Resource Language AI Ecosystem for 22+ Scheduled Indian Languages**

![BharatVoice AI](https://img.shields.io/badge/BharatVoice_AI-v1.0.0-orange.svg)
![Status](https://img.shields.io/badge/Production-Ready-emerald.svg)
![Languages](https://img.shields.io/badge/Languages-22%2B_Indian-blue.svg)
![License](https://img.shields.io/badge/License-Enterprise_Proprietary-indigo.svg)

---

## 🌟 Overview

**BharatVoice AI** is a production-grade, enterprise-ready Regional Language AI Platform engineered to bridge digital and linguistic divides across India and low-resource language communities worldwide. It unifies:

- 🗣️ **Speech Recognition (ASR)**: Real-time continuous transcription with noise reduction, speaker diarization, and punctuation restoration.
- 🔠 **Neural Machine Translation (NMT)**: Multi-domain translation (Healthcare, Agriculture, Governance, Education, Legal) powered by IndicTrans2 & NLLB-200.
- 🔊 **Text-to-Speech Synthesis (TTS)**: Natural regional voice generation with pitch, speed, and gender modulation.
- 📄 **OCR & Document Intelligence**: Geometry-preserving layout translation for scanned PDFs, certificates, and handwritten notes.
- 🔬 **Low-Resource NLP Pipeline**: POS tagging, Named Entity Recognition (NER), sentiment analysis, intent detection, and grammar correction for underserved languages (e.g., Santali, Bodo, Dogri, Manipuri, Maithili).
- 🎙️ **Voice Cloning with Biometric Consent**: Cryptographically watermarked personalized voice profiles.
- 🏥 **Healthcare Portal**: Symptom translation, emergency triage tagging, and prescription voice instructions.
- 🌾 **Agriculture Advisory**: Voice crop disease diagnosis, mandi market prices, and weather advisories.
- 🏛️ **Government Services Assistant**: Multilingual form-filling helper (PM-Kisan, Aadhaar, Caste Certificates) and official notice broadcaster.
- 🎓 **Multilingual Education**: Interactive vocabulary flashcards, AI tutor, and voice pronunciation evaluator.
- 🔎 **Smart Search**: Semantic cross-language vector search across regional scripts.
- ⚡ **Innovation Suite**: Sign Language visualizer, AR live camera translation simulation, and endangered language preservation archiver.

---

## 🇮🇳 22+ Supported Indian Languages

| Language | Script | Region | Resource Classification |
| :--- | :--- | :--- | :--- |
| **Hindi (हिन्दी)** | Devanagari | North/Central India | High-Resource |
| **Marathi (मराठी)** | Devanagari | Maharashtra | High-Resource |
| **Gujarati (ગુજરાતી)** | Gujarati | Gujarat | High-Resource |
| **Bengali (বাংলা)** | Bengali | West Bengal, Tripura | High-Resource |
| **Punjabi (ਪੰਜਾਬੀ)** | Gurmukhi | Punjab | High-Resource |
| **Kannada (ಕನ್ನಡ)** | Kannada | Karnataka | High-Resource |
| **Tamil (தமிழ்)** | Tamil | Tamil Nadu, Puducherry | High-Resource |
| **Telugu (తెలుగు)** | Telugu | Andhra Pradesh, Telangana | High-Resource |
| **Malayalam (മലയാളം)** | Malayalam | Kerala | High-Resource |
| **Odia (ଓଡ଼ିଆ)** | Odia | Odisha | High-Resource |
| **Assamese (অসমীয়া)** | Bengali-Assamese | Assam | Low-Resource |
| **Urdu (اردو)** | Perso-Arabic | Pan-India | High-Resource |
| **Sanskrit (संस्कृतम्)** | Devanagari | Pan-India | Low-Resource |
| **Konkani (कोंकणी)** | Devanagari | Goa, Karnataka | Low-Resource |
| **Nepali (नेपाली)** | Devanagari | Sikkim, WB | Low-Resource |
| **Manipuri (ꯃꯩꯇꯩꯂꯣꯟ)** | Meitei Mayek | Manipur | Low-Resource |
| **Bodo (बड़ो)** | Devanagari | Bodoland Assam | Low-Resource |
| **Santali (ᱥᱟᱱᱛᱟᱲᱤ)** | Ol Chiki | Jharkhand, Odisha, WB | Low-Resource |
| **Kashmiri (کٲشُر)** | Perso-Arabic | J&K | Low-Resource |
| **Dogri (डोगरी)** | Devanagari | Jammu | Low-Resource |
| **Maithili (मैथिली)** | Devanagari | Bihar | Low-Resource |
| **Sindhi (سنڌي)** | Arabic / Devanagari | Gujarat, Maharashtra | Low-Resource |

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas API, Web Speech API, Web Audio API
- **AI Models & Engines**: IndicTrans2, NLLB-200, IndicASR, Whisper, PaddleOCR, Coqui TTS, mBERT, IndicBERT
- **Security**: AES-256 Encryption, Cryptographic Audio Watermarking, Biometric Consent Vault, Role-Based Access Control (RBAC)

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/Krishna8208863439/Regional-Language-AI.git

# Navigate into project folder
cd Regional-Language-AI

# Install dependencies
npm install

# Run Vite dev server
npm run dev
```

The application will start locally at `http://localhost:3001/` (or `http://localhost:3000/`).

### Building for Production

```bash
npm run build
```

---

## 🔒 Security & Privacy Compliance

- **Consent Management**: Voice cloning requires explicit checkbox confirmation and generates timestamped cryptographic hashes (`BW-WM-VERIFIED`).
- **Data Protection**: All client audio processing utilizes AES-256 encryption.

---

## 📄 License

Enterprise Platform - All rights reserved.
