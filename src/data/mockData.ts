import { LanguageInfo, UserRoleInfo, HealthcareSymptomCard, AgricultureAdvisory, GovtSchemeForm, SignLanguageDictionaryItem, SystemAnalytics, UserAccount } from '../types';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { 
    code: 'en', 
    name: 'English', 
    nativeName: 'English', 
    script: 'Latin', 
    region: 'India & Global', 
    speakers: '125M+ in India', 
    lowResource: false, 
    supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } 
  },
  { 
    code: 'hi', 
    name: 'Hindi', 
    nativeName: 'हिन्दी', 
    script: 'Devanagari', 
    region: 'North & Central India', 
    speakers: '600M+', 
    lowResource: false, 
    supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } 
  },
  { 
    code: 'mr', 
    name: 'Marathi', 
    nativeName: 'मराठी', 
    script: 'Devanagari', 
    region: 'Maharashtra & Goa', 
    speakers: '90M+', 
    lowResource: false, 
    supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } 
  }
];

export const DEMO_USERS: UserAccount[] = [
  {
    id: 'user-1',
    name: 'Aniket Kulkarni / अनिकेत कुलकर्णी',
    email: 'aniket.student@vidya.edu.in',
    phone: '+91 98234 56789',
    role: 'student',
    preferredLanguage: 'mr',
    avatar: '🎓',
    createdAt: '2026-01-15',
    isLoggedIn: true
  },
  {
    id: 'user-2',
    name: 'Ramesh Patil / रमेश पाटील',
    email: 'ramesh.patil@agrikisan.in',
    phone: '+91 94220 11223',
    role: 'farmer',
    preferredLanguage: 'mr',
    avatar: '👨‍🌾',
    createdAt: '2026-03-01',
    isLoggedIn: false
  },
  {
    id: 'user-3',
    name: 'Pooja Sharma / पूजा शर्मा',
    email: 'pooja.sharma@health.gov.in',
    phone: '+91 98765 43210',
    role: 'healthcare_worker',
    preferredLanguage: 'hi',
    avatar: '👩‍⚕️',
    createdAt: '2026-02-10',
    isLoggedIn: false
  },
  {
    id: 'user-4',
    name: 'Aarav Deshmukh / आरव देशमुख',
    email: 'aarav.deshmukh@bharatvoice.ai',
    phone: '+91 98234 11223',
    role: 'citizen',
    preferredLanguage: 'mr',
    avatar: '👨‍💼',
    createdAt: '2026-01-10',
    isLoggedIn: false
  },
  {
    id: 'user-5',
    name: 'Dr. Vikram Joshi / डॉ. विक्रम जोशी',
    email: 'vikram.joshi@admin.ai',
    phone: '+91 91234 56780',
    role: 'admin',
    preferredLanguage: 'en',
    avatar: '🛡️',
    createdAt: '2025-11-20',
    isLoggedIn: false
  }
];

export const USER_ROLES: UserRoleInfo[] = [
  { id: 'citizen', label: 'Citizen (नागरिक)', icon: 'User', description: 'Voice translation, form filling assistance & public notifications', recommendedModule: 'text_translator' },
  { id: 'student', label: 'Student (विद्यार्थी)', icon: 'GraduationCap', description: 'Language learning, AI conversational tutor & practice', recommendedModule: 'ai_chat' },
  { id: 'teacher', label: 'Teacher (शिक्षक)', icon: 'BookOpen', description: 'Content translation, lesson voiceover & question generator', recommendedModule: 'text_translator' },
  { id: 'govt_officer', label: 'Govt Officer (अधिकारी)', icon: 'Landmark', description: 'Public service translation, official notices & citizen dialogue', recommendedModule: 'governance' },
  { id: 'healthcare_worker', label: 'Healthcare Worker (आरोग्य सेवक)', icon: 'Stethoscope', description: 'Patient symptom translation, prescription reader & medical forms', recommendedModule: 'healthcare' },
  { id: 'farmer', label: 'Farmer / Agri (शेतकरी / किसान)', icon: 'Sprout', description: 'Crop disease advice, mandi prices & voice weather forecasts', recommendedModule: 'agriculture' },
  { id: 'business', label: 'Business Enterprise (उद्योग)', icon: 'Building2', description: 'Multilingual customer support chatbots & document workflow', recommendedModule: 'text_translator' },
  { id: 'admin', label: 'System Admin (प्रशासक)', icon: 'ShieldCheck', description: 'Model benchmarking, RBAC security, API usage & telemetry', recommendedModule: 'admin_analytics' }
];

export const SAMPLE_TRANSLATIONS: Record<string, { native: string; english: string; transliteration: string }> = {
  en: {
    native: 'Welcome to BharatVoice AI. You can communicate seamlessly in English, Hindi, and Marathi.',
    english: 'Welcome to BharatVoice AI. You can communicate seamlessly in English, Hindi, and Marathi.',
    transliteration: 'Welcome to BharatVoice AI. You can communicate seamlessly in English, Hindi, and Marathi.'
  },
  hi: { 
    native: 'भारतवाणी एआई में आपका स्वागत है। आप हिंदी, मराठी और अंग्रेजी में निर्बाध संवाद कर सकते हैं।', 
    english: 'Welcome to BharatVoice AI. You can communicate seamlessly in your mother tongue.', 
    transliteration: 'BharatVoice AI mein aapka swagat hai. Aap Hindi, Marathi aur Angrezi mein nirbaadh samvaad kar sakte hain.' 
  },
  mr: { 
    native: 'भारतवाणी एआय मध्ये आपले सहर्ष स्वागत आहे. आपण मराठी, हिंदी आणि इंग्रजीत सहज संवाद साधू शकता.', 
    english: 'Welcome to BharatVoice AI. You can communicate seamlessly in your mother tongue.', 
    transliteration: 'BharatVoice AI madhye aaple saharsha swagat aahe. Aapana Marathi, Hindi aani Ingrajit sahaj samvaad saadhu shakataa.' 
  }
};

export const MOCK_HEALTHCARE_DATA: HealthcareSymptomCard[] = [
  {
    id: 'hc-101',
    patientName: 'Rameshwar Shinde / रामेश्वर शिंदे',
    patientAge: '54 Yrs',
    patientGender: 'Male',
    chiefComplaint: 'तीव्र छातीत दुखणे आणि श्वास घेण्यास त्रास (Acute Chest Pain & Dyspnea)',
    symptoms: ['Chest tightness / छातीत दाब', 'Shortness of breath / श्वास लागणे', 'Excessive Sweating / घाम येणे', 'Dizziness / चक्कर'],
    duration: '2 Hours (Acute)',
    translatedMedicalSummary: {
      en: 'Patient presents with severe acute retrosternal chest pain, radiating discomfort, and severe dyspnea for 2 hours. Immediate 12-lead ECG, troponin I, and cardiac ICU admission recommended.',
      hi: 'मरीज को पिछले 2 घंटे से छाती में तेज जकड़न और सांस फूलने की शिकायत है। तुरंत 12-लीड ईसीजी और आपातकालीन कार्डिएक परामर्श आवश्यक है।',
      mr: 'रुग्णाला गेल्या २ तासांपासून छातीत तीव्र वेदना आणि श्वास घेण्यास त्रास होत आहे. तातडीने १२-लीड ईसीजी तपासणी आणि अतिदक्षता उपचार आवश्यक आहेत.'
    },
    urgencyLevel: 'Emergency',
    riskLevel: 'High',
    riskScore: 94,
    confidenceScore: 96.2,
    suggestedAction: 'Immediate clinician review & Emergency Cardiac ICU admission',
    responsePriority: 'Immediate (< 5 mins)',
    vitalSigns: {
      bp: '160/100 mmHg',
      heartRate: '112 bpm',
      spo2: '91%',
      temp: '98.6°F'
    },
    triageNotes: 'Prioritize Triage Category 1. Maintain O2 saturation > 95%. Prepare emergency defibrillator and sublingual nitroglycerin if indicated.',
    consentId: 'MED-CONSENT-991204',
    consentTimestamp: '2026-08-30 11:10:45 IST',
    emergencyAlertTriggered: true
  },
  {
    id: 'hc-102',
    patientName: 'Kavita Suresh Patil / कविता सुरेश पाटील',
    patientAge: '32 Yrs',
    patientGender: 'Female',
    chiefComplaint: 'तीव्र ताप आणि कोरडा खोकला (High Grade Fever with Persistent Cough)',
    symptoms: ['High Fever > 102°F / ताप', 'Continuous dry cough / खोकला', 'Severe body pain / अंगदुखी', 'Fatigue / थकवा'],
    duration: '3 Days',
    translatedMedicalSummary: {
      en: 'Patient has high-grade fever (>102°F) with dry cough for 3 days. Complete Blood Count (CBC), Dengue NS1 antigen, and Malaria smear recommended.',
      hi: '3 दिनों से तेज बुखार (>102°F) और लगातार सूखी खांसी। पूर्ण रक्त गणना (CBC) और मलेरिया/डेंगू एंटीजन परीक्षण कराने की सलाह है।',
      mr: 'गेल्या ३ दिवसांपासून तीव्र ताप (>१०२°F) आणि कोरडा खोकला. सीबीसी (CBC) आणि डेंग्यू/मलेरिया चाचणी करून घेण्याचा वैद्यकीय सल्ला दिला आहे.'
    },
    urgencyLevel: 'Urgent',
    riskLevel: 'Moderate',
    riskScore: 68,
    confidenceScore: 93.8,
    suggestedAction: 'Chest X-ray, CBC blood smear & Antipyretic hydration therapy',
    responsePriority: 'Urgent (< 30 mins)',
    vitalSigns: {
      bp: '120/80 mmHg',
      heartRate: '88 bpm',
      spo2: '97%',
      temp: '102.4°F'
    },
    triageNotes: 'Administer Paracetamol 650mg SOS. Advise oral hydration therapy and isolate pending viral panel results.',
    consentId: 'MED-CONSENT-991205',
    consentTimestamp: '2026-08-30 11:08:12 IST',
    emergencyAlertTriggered: false
  },
  {
    id: 'hc-103',
    patientName: 'Ganesh Shripad Deshmukh / गणेश श्रीपाद देशमुख',
    patientAge: '28 Yrs',
    patientGender: 'Male',
    chiefComplaint: 'पोटात तीव्र कळा आणि मळमळ (Severe Abdominal Cramps & Nausea)',
    symptoms: ['Abdominal pain / पोटदुखी', 'Nausea / मळमळ', 'Dehydration / निर्जलीकरण'],
    duration: '1 Day',
    translatedMedicalSummary: {
      en: 'Acute gastroenteritis symptoms with severe cramping. Advise electrolyte replacement and abdominal ultrasound if localized right lower quadrant pain persists.',
      hi: 'तीव्र पेट दर्द और उल्टी के लक्षण। ओआरएस (ORS) घोल और पेट का अल्ट्रासाउंड कराने का परामर्श दिया गया।',
      mr: 'पोटात तीव्र कळा आणि उलट्यांचा त्रास. ओआरएस (ORS) द्रावण आणि पोटाची सोनोग्राफी (Ultrasound) तपासणी त्वरित करून घ्या.'
    },
    urgencyLevel: 'Normal',
    riskLevel: 'Low',
    riskScore: 32,
    confidenceScore: 91.5,
    suggestedAction: 'Oral rehydration salts, anti-spasmodics & routine outpatient follow-up',
    responsePriority: 'Routine (< 2 hours)',
    vitalSigns: {
      bp: '118/76 mmHg',
      heartRate: '74 bpm',
      spo2: '99%',
      temp: '98.4°F'
    },
    triageNotes: 'Oral rehydration salts, anti-spasmodic therapy, diet of bland foods.',
    consentId: 'MED-CONSENT-991206',
    consentTimestamp: '2026-08-30 11:02:30 IST',
    emergencyAlertTriggered: false
  }
];

export const MOCK_AGRICULTURE_DATA: AgricultureAdvisory[] = [
  {
    id: 'ag-501',
    crop: 'कापूस / कपास (Cotton)',
    query: 'बोंडअळीचा प्रादुर्भाव आणि पाने पिवळी पडत आहेत. (Pink Bollworm & leaf yellowing)',
    detectedIssue: 'Pink Bollworm (गुलाबी बोंडअळी / Pectinophora gossypiella)',
    remedyNative: 'एकर प्रति ५ फेरोमोन ट्रॅप लावा आणि प्रादुर्भाव वाढल्यास इमामेक्टिन बेंझोएट ५% एसजी (४ ग्रॅम प्रति १० लिटर पाणी) फवारा. नत्राचा संतुलित वापर करा.',
    remedyEnglish: 'Install 5 Pheromone Traps per acre. Spray Emamectin Benzoate 5% SG @ 4g per 10L water. Maintain balanced nitrogen application.',
    marketPrice: '₹7,250 - ₹7,600 / क्विंटल (Mandi Rate)',
    weatherWarning: 'पुढील २४ तासांत अंशतः ढगाळ हवामान. फवारणी सकाळी ८ ते ११ या वेळेतच करावी.'
  },
  {
    id: 'ag-502',
    crop: 'भात / धान (Paddy Rice)',
    query: 'पानांवर तपकिरी ठिपके दिसत असून पीक सुकत आहे. (Brown spots on leaf blades)',
    detectedIssue: 'Rice Brown Spot Disease (तपकिरी ठिपके रोग)',
    remedyNative: 'पिकावर ट्रायसायक्लाझोल ७५% डब्ल्यूपी (Tricyclazole) ०.६ ग्रॅम प्रति लिटर पाण्यात मिसळून फवारणी करा. युरियाचा अतिरेक टाळा.',
    remedyEnglish: 'Spray Tricyclazole 75% WP @ 0.6g/L of water. Avoid excessive top dressing of urea fertilizer.',
    marketPrice: '₹2,280 - ₹2,480 / क्विंटल',
    weatherWarning: 'संध्याकाळी हलक्या पावसाची शक्यता. फवारणीनंतर किमान ४ तास पाऊस नसावा.'
  },
  {
    id: 'ag-503',
    crop: 'कांदा / प्याज (Onion)',
    query: 'पानांवर जांभळा करपा आणि शेंडे जळणे. (Purple Blotch & Tip burn)',
    detectedIssue: 'Purple Blotch Disease (जांभळा करपा)',
    remedyNative: 'मॅन्कोझेब ७५% डब्ल्यूपी २.५ ग्रॅम किंवा टेबुकोनॅझोल १ मिली प्रति लिटर पाण्यात मिसळून सोबत स्टिकरचा वापर करा.',
    remedyEnglish: 'Spray Mancozeb 75% WP @ 2.5g/L or Tebuconazole @ 1ml/L with a wetting agent / sticker.',
    marketPrice: '₹2,800 - ₹3,400 / क्विंटल (लासलगाव / नाशिक कृषी उत्पन्न बाजार)',
    weatherWarning: 'सकाळी धुके पडण्याची शक्यता असल्याने बुरशीनाशक फवारणी त्वरित करा.'
  }
];

export const MOCK_GOVT_FORMS: GovtSchemeForm[] = [
  {
    id: 'gov-ladki-bahin',
    schemeName: 'मुख्यमंत्री माझी लाडकी बहीण योजना (Mukhyamantri Majhi Ladki Bahin)',
    ministry: 'महिला व बाल विकास विभाग, महाराष्ट्र शासन (Govt. of Maharashtra)',
    applicantVoicePrompt: 'कृपया आपले आधार कार्ड नाव, बँक खाते आणि कौटुंबिक उत्पन्नाचा दाखला सांगा.',
    fields: [
      { fieldId: 'beneficiary_name', labelNative: 'अर्जदार महिलेचे पूर्ण नाव', labelEnglish: 'Beneficiary Full Name', value: 'सुनिता गणेश पाटील (Sunita Ganesh Patil)', required: true },
      { fieldId: 'aadhaar_no', labelNative: 'आधार कार्ड क्रमांक', labelEnglish: 'Aadhaar Card Number', value: '7482-9012-3341', required: true },
      { fieldId: 'bank_account', labelNative: 'आधार लिंक बँक खाते क्रमांक', labelEnglish: 'Aadhaar Linked Bank Account', value: '401288920194 (Bank of Maharashtra)', required: true },
      { fieldId: 'family_income', labelNative: 'वार्षिक कौटुंबिक उत्पन्न (₹)', labelEnglish: 'Annual Family Income (INR)', value: '₹1,20,000 (दाखला जोडला)', required: true }
    ],
    generatedNoticeText: 'अर्जदार सुनिता पाटील यांचा माझी लाडकी बहीण योजनेचा अर्ज यशस्वीरित्या मंजूर झाला आहे. दरमहा ₹१,५०० ची आर्थिक मदत आपल्या थेट बँक खात्यात (DBT) जमा केली जाईल.'
  },
  {
    id: 'gov-pmkisan',
    schemeName: 'पीएम-किसान सन्मान निधी योजना (PM-KISAN Samman Nidhi)',
    ministry: 'कृषि एवं किसान कल्याण मंत्रालय (Ministry of Agriculture)',
    applicantVoicePrompt: 'कृपया अपना आधार नंबर, खसरा / ७/१२ उतारा नंबर और बैंक विवरण बोलें।',
    fields: [
      { fieldId: 'farmer_name', labelNative: 'किसान का पूरा नाम / शेतकऱ्याचे नाव', labelEnglish: 'Farmer Full Name', value: 'रमेश कुमार शर्मा (Ramesh Kumar Sharma)', required: true },
      { fieldId: 'aadhaar_no', labelNative: 'आधार कार्ड संख्या', labelEnglish: 'Aadhaar Card Number', value: '9823-4512-8809', required: true },
      { fieldId: 'land_khata', labelNative: '७/१२ उतारा / खसरा नंबर', labelEnglish: 'Land 7/12 / Khata Number', value: 'Gat No. 142/A, Mouza Rampur', required: true },
      { fieldId: 'bank_ifsc', labelNative: 'बैंक आईएफएससी कोड', labelEnglish: 'Bank IFSC Code', value: 'SBIN0001420 (SBI)', required: true }
    ],
    generatedNoticeText: 'आवेदक रमेश कुमार शर्मा का पीएम-किसान पंजीकरण सफलतापूर्वक सत्यापित हुआ। वार्षिक ₹6,000 की वित्तीय सहायता DBT माध्यम से सीधे खाते में भेजी जाएगी।'
  }
];

export const MOCK_SIGN_LANGUAGE_ITEMS: SignLanguageDictionaryItem[] = [
  {
    phrase: 'नमस्कार / स्वागत आहे (Greetings / Welcome)',
    language: 'mr',
    signNotation: 'ISL-GREETING-PALMS-JOINED',
    handGestures: ['Both hands pressed together at chest level (Namaste gesture)', 'Gentle nod of head', 'Friendly facial expression'],
    animationFrames: ['🙏', '🤝', '😊']
  },
  {
    phrase: 'मदत पाहिजे / सहायता चाहिए (Need Assistance)',
    language: 'hi',
    signNotation: 'ISL-HELP-MEDICAL-CROSS',
    handGestures: ['Right palm taps left wrist pulse point', 'Right hand extends forward with open palm asking for support'],
    animationFrames: ['🖐️', '➕', '🚨']
  },
  {
    phrase: 'धन्यवाद / Thank You (Gratitude)',
    language: 'en',
    signNotation: 'ISL-THANKS-CHIN-TOUCH',
    handGestures: ['Fingertips gently touch chin', 'Hand moves outward smoothly towards listener with smile'],
    animationFrames: ['🖐️', '➡️', '🙏']
  }
];

export const INITIAL_ANALYTICS: SystemAnalytics = {
  totalTranslations: 1482930,
  activeUsersToday: 42180,
  avgLatencyMs: 142,
  bleuScoreAverage: 42.6,
  asrAccuracyRate: 96.2,
  topLanguagePairs: [
    { pair: 'Marathi ➔ English', count: 520400 },
    { pair: 'Hindi ➔ English', count: 498100 },
    { pair: 'English ➔ Marathi', count: 320100 },
    { pair: 'Hindi ➔ Marathi', count: 280900 },
    { pair: 'Marathi ➔ Hindi', count: 245000 },
    { pair: 'English ➔ Hindi', count: 218430 }
  ],
  requestsByDomain: {
    general: 512000,
    governance: 340000,
    healthcare: 280000,
    agriculture: 210000,
    education: 110000,
    legal: 30930
  },
  hourlyTraffic: [
    { hour: '00:00', requests: 12400 },
    { hour: '04:00', requests: 8900 },
    { hour: '08:00', requests: 45200 },
    { hour: '12:00', requests: 89400 },
    { hour: '16:00', requests: 94100 },
    { hour: '20:00', requests: 62300 }
  ]
};
