import { LanguageInfo, UserRoleInfo, HealthcareSymptomCard, AgricultureAdvisory, GovtSchemeForm, SignLanguageDictionaryItem, SystemAnalytics } from '../types';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', region: 'North/Central India', speakers: '600M+', lowResource: false, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari', region: 'Maharashtra', speakers: '90M+', lowResource: false, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati', region: 'Gujarat', speakers: '60M+', lowResource: false, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', region: 'West Bengal, Tripura', speakers: '100M+', lowResource: false, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', region: 'Punjab', speakers: '35M+', lowResource: false, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', region: 'Karnataka', speakers: '50M+', lowResource: false, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', region: 'Tamil Nadu, Puducherry', speakers: '75M+', lowResource: false, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', region: 'Andhra Pradesh, Telangana', speakers: '85M+', lowResource: false, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam', region: 'Kerala', speakers: '38M+', lowResource: false, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia', region: 'Odisha', speakers: '35M+', lowResource: false, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', script: 'Bengali-Assamese', region: 'Assam', speakers: '15M+', lowResource: true, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Perso-Arabic', region: 'Pan-India', speakers: '50M+', lowResource: false, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', script: 'Devanagari', region: 'Pan-India', speakers: 'Classical', lowResource: true, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', script: 'Devanagari / Roman', region: 'Goa, Karnataka', speakers: '2.5M+', lowResource: true, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', script: 'Devanagari', region: 'Sikkim, West Bengal', speakers: '3M+', lowResource: true, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'mni', name: 'Manipuri (Meitei)', nativeName: 'ꯃꯩꯇꯩꯂꯣꯟ', script: 'Meitei Mayek / Bengali', region: 'Manipur', speakers: '1.8M+', lowResource: true, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो', script: 'Devanagari', region: 'Bodoland Assam', speakers: '1.5M+', lowResource: true, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki', region: 'Jharkhand, Odisha, WB', speakers: '7M+', lowResource: true, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر', script: 'Perso-Arabic / Devanagari', region: 'Jammu & Kashmir', speakers: '7M+', lowResource: true, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', script: 'Devanagari', region: 'Jammu', speakers: '2.6M+', lowResource: true, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', script: 'Tirhuta / Devanagari', region: 'Bihar, Nepal border', speakers: '14M+', lowResource: true, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'sd', name: 'Sindhi', nativeName: 'سنڌي', script: 'Arabic / Devanagari', region: 'Gujarat, Maharashtra', speakers: '2.8M+', lowResource: true, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } },
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin', region: 'Global / India', speakers: '125M+ in India', lowResource: false, supportedFeatures: { asr: true, nmt: true, tts: true, ocr: true, nlp: true } }
];

export const USER_ROLES: UserRoleInfo[] = [
  { id: 'citizen', label: 'Citizen', icon: 'User', description: 'Voice translation, form filling assistance & public notifications', recommendedModule: 'voice_translator' },
  { id: 'student', label: 'Student', icon: 'GraduationCap', description: 'Language learning, flashcards, AI tutor & lecture translation', recommendedModule: 'education' },
  { id: 'teacher', label: 'Teacher', icon: 'BookOpen', description: 'Content translation, lesson voiceover & question generator', recommendedModule: 'education' },
  { id: 'govt_officer', label: 'Govt Officer', icon: 'Landmark', description: 'Public service translation, official notices & citizen dialogue', recommendedModule: 'governance' },
  { id: 'healthcare_worker', label: 'Healthcare Worker', icon: 'Stethoscope', description: 'Patient symptom translation, prescription reader & medical forms', recommendedModule: 'healthcare' },
  { id: 'farmer', label: 'Farmer / Agri', icon: 'Sprout', description: 'Crop disease advice, mandi prices & voice weather forecasts', recommendedModule: 'agriculture' },
  { id: 'business', label: 'Business Enterprise', icon: 'Building2', description: 'Multilingual customer support chatbots & document workflow', recommendedModule: 'text_translator' },
  { id: 'admin', label: 'System Admin', icon: 'ShieldCheck', description: 'Model benchmarking, RBAC security, API usage & telemetry', recommendedModule: 'admin_analytics' }
];

export const SAMPLE_TRANSLATIONS: Record<string, { native: string; english: string; transliteration: string }> = {
  hi: { native: 'भारतवाणी एआई में आपका स्वागत है। आप अपनी मातृभाषा में निर्बाध संवाद कर सकते हैं।', english: 'Welcome to BharatVoice AI. You can communicate seamlessly in your mother tongue.', transliteration: 'BharatVoice AI mein aapka swagat hai. Aap apni matribhasha mein nirbaadh samvaad kar sakte hain.' },
  mr: { native: 'भारतवाणी एआय मध्ये आपले स्वागत आहे. आपण आपल्या मातृभाषेत सहज संवाद साधू शकता.', english: 'Welcome to BharatVoice AI. You can communicate seamlessly in your mother tongue.', transliteration: 'BharatVoice AI madhye aaple swagat aahe. Aapana aaplyaa maatrubhaashet sahaj samvaad saadhu shakataa.' },
  ta: { native: 'பாரத்வாஸ் AI க்கு உங்களை வரவேற்கிறோம். உங்கள் தாய்மொழியில் தடையின்றி உரையாடலாம்.', english: 'Welcome to BharatVoice AI. You can communicate seamlessly in your mother tongue.', transliteration: 'BharatVoice AI kku ungalai varaverkirom. Ungal thaaimozhiyil thadaiyindri uraiyaadalaam.' },
  te: { native: 'భారత్‌వాస్ AI కి స్వాగతం. మీరు మీ మాతృభాషలో సులభంగా మాట్లాడవచ్చు.', english: 'Welcome to BharatVoice AI. You can communicate seamlessly in your mother tongue.', transliteration: 'BharatVoice AI ki swagatam. Meeru mee maatrubhashalo sulabhanga maatlaadavachhu.' },
  bn: { native: 'ভারতবাণী এআই-তে আপনাকে স্বাগতম। আপনি আপনার মাতৃভাষায় নিরবচ্ছিন্নভাবে কথা বলতে পারেন।', english: 'Welcome to BharatVoice AI. You can communicate seamlessly in your mother tongue.', transliteration: 'BharatVoice AI-te aapnake swagatam. Aapni aapnar matribhashay nirabachhinnobhabe kotha bolte paren.' },
  kn: { native: 'ಭಾರತವಾಣಿ AI ಗೆ ನಿಮಗೆ ಸುಸ್ವಾಗತ. உங்கள் ಮಾತೃಭಾಷೆಯಲ್ಲಿ ನೀವು ಮುಕ್ತವಾಗಿ ಮಾತನಾಡಬಹುದು.', english: 'Welcome to BharatVoice AI. You can communicate seamlessly in your mother tongue.', transliteration: 'BharatVoice AI ge nimage suswagata. Nimma maatrubhaasheyalli neevu muktavaagi maatanaadabahudu.' },
  gu: { native: 'ભારતવાણી AI માં આપનું સ્વાગત છે. તમે તમારી માતૃભાષામાં સરળતાથી વાતચીત કરી શકો છો.', english: 'Welcome to BharatVoice AI. You can communicate seamlessly in your mother tongue.', transliteration: 'BharatVoice AI ma aapnu swagat chhe. Tame tamari matrubhashama saraltathi vatchit kari shako chho.' },
  sat: { native: 'ᱵᱷᱟᱨᱚᱛᱵᱷᱚᱭᱮᱥ ᱮᱟᱟᱭ ᱨᱮ ᱟᱯᱱᱟᱨᱟᱜ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ᱾, ᱟᱯᱮ ᱟᱯᱱᱟᱨᱟᱜ ᱟᱭᱳ ᱟᱲᱟᱝ ᱛᱮ ᱨᱚᱲ ᱫᱟᱲᱮᱭᱟᱜ-ᱟᱯᱮ᱾', english: 'Welcome to BharatVoice AI. You can communicate seamlessly in your mother tongue.', transliteration: 'BharatVoice AI re apnarag sagun daram. Ape apnarag ayo alang te ror dareyag-ape.' }
};

export const MOCK_HEALTHCARE_DATA: HealthcareSymptomCard[] = [
  {
    id: 'hc-101',
    chiefComplaint: 'तीव्र छाती में दर्द और सांस लेने में कठिनाई (Acute Chest Pain & Dyspnea)',
    symptoms: ['Chest pressure', 'Shortness of breath', 'Sweating', 'Dizziness'],
    translatedMedicalSummary: {
      hi: 'मरीज को पिछले 2 घंटे से छाती में तेज जकड़न और सांस फूलने की शिकायत है। तुरंत ईसीजी और कार्डिएक परामर्श आवश्यक है।',
      ta: 'நோயாளிக்கு கடந்த 2 மணிநேரமாக நெஞ்சு இறுக்கமும் மூச்சுத்திணறலும் உள்ளது. உடனடியாக ஈசிஜி பார்க்கப்பட வேண்டும்.',
      mr: 'रुग्णाला गेल्या २ तासांपासून छातीत तीव्र वेदना आणि श्वास घेण्यास त्रास होत आहे. तातडीने ईसीजी तपासणी आवश्यक आहे.',
      te: 'రోగి గత 2 గంటలుగా ఛాతీ నొప్పితో బాధపడుతున్నారు. తక్షణమే ఈసిజీ పరీక్ష అవసరం.'
    },
    urgencyLevel: 'Emergency',
    triageNotes: 'Prioritize Triage Category 1. Monitor O2 saturation and prepare emergency cart.'
  },
  {
    id: 'hc-102',
    chiefComplaint: 'तीव्र ताप आणि खोकला (High Fever & Persistent Cough)',
    symptoms: ['Fever > 102°F', 'Dry cough', 'Body ache', 'Fatigue'],
    translatedMedicalSummary: {
      hi: '3 दिनों से तेज बुखार और लगातार खांसी। रक्त जांच (CBC) और मलेरिया/डेंगू एंटीजन टेस्ट की सलाह दी जाती है।',
      mr: '३ दिवसांपासून तीव्र ताप आणि कोरडा खोकला. सीबीसी आणि डेंग्यू तपासणीची शिफारस.'
    },
    urgencyLevel: 'Urgent',
    triageNotes: 'Administer Antipyretic, recommend viral panel and hydration.'
  }
];

export const MOCK_AGRICULTURE_DATA: AgricultureAdvisory[] = [
  {
    id: 'ag-501',
    crop: 'धान (Paddy Rice)',
    query: 'पत्तियों पर भूरे धब्बे दिखाई दे रहे हैं, फसल सूख रही है। (Brown spots on leaf blades)',
    detectedIssue: 'Rice Brown Spot Disease (Helminthosporium oryzae)',
    remedyNative: 'फसल पर ट्राइसाइक्लाजोल 75% डब्लूपी (Tricyclazole) 0.6 ग्राम प्रति लीटर पानी में मिलाकर छिड़काव करें। खेत में अत्यधिक नाइट्रोजन न डालें।',
    remedyEnglish: 'Spray Tricyclazole 75% WP @ 0.6g/L of water. Avoid excessive nitrogen application.',
    marketPrice: '₹2,200 - ₹2,450 / Quintal (Mandi Rate)',
    weatherWarning: 'अगले 48 घंटों में मध्यम वर्षा की संभावना। छिड़काव के बाद 4 घंटे तक बारिश नहीं होनी चाहिए।'
  },
  {
    id: 'ag-502',
    crop: 'कपास (Cotton)',
    query: 'गुलाबी सुंडी का प्रकोप और पत्तियां पीली पड़ रही हैं। (Pink Bollworm & leaf yellowing)',
    detectedIssue: 'Pink Bollworm (Pectinophora gossypiella)',
    remedyNative: 'फेरोमोन ट्रैप 5 प्रति एकड़ लगाएं और एमामेक्टिन बेंजोएट 5% एसजी का प्रयोग करें।',
    remedyEnglish: 'Install 5 Pheromone Traps per acre and spray Emamectin Benzoate 5% SG.',
    marketPrice: '₹7,100 / Quintal',
    weatherWarning: 'हवा की गति 14 किमी/घंटे, कीटनाशक छिड़काव सुबह 8 से 10 बजे के बीच करें।'
  }
];

export const MOCK_GOVT_FORMS: GovtSchemeForm[] = [
  {
    id: 'gov-pmkisan',
    schemeName: 'पीएम-किसान सम्मान निधि योजना (PM-KISAN Samman Nidhi)',
    ministry: 'कृषि एवं किसान कल्याण मंत्रालय (Ministry of Agriculture)',
    applicantVoicePrompt: 'कृपया अपना आधार नंबर, खसरा खतौनी नंबर और बैंक खाता विवरण बोलें।',
    fields: [
      { fieldId: 'farmer_name', labelNative: 'किसान का पूरा नाम', labelEnglish: 'Farmer Full Name', value: 'रमेश कुमार शर्मा (Ramesh Kumar Sharma)', required: true },
      { fieldId: 'aadhaar_no', labelNative: 'आधार कार्ड संख्या', labelEnglish: 'Aadhaar Card Number', value: '9823-4512-8809', required: true },
      { fieldId: 'land_khata', labelNative: 'खसरा खतौनी / खाता संख्या', labelEnglish: 'Land Khasra / Khata Number', value: 'Khata No. 412/A, Mouza Rampur', required: true },
      { fieldId: 'bank_ifsc', labelNative: 'बैंक आईएफएससी कोड', labelEnglish: 'Bank IFSC Code', value: 'SBIN0001420', required: true }
    ],
    generatedNoticeText: 'आवेदक रमेश कुमार शर्मा का पीएम-किसान पंजीकरण सफलतापूर्वक सत्यापित किया गया। वार्षिक ₹6,000 की किश्तें आपके डीबीटी (DBT) बैंक खाते में हस्तांतरित की जाएंगी।'
  }
];

export const MOCK_SIGN_LANGUAGE_ITEMS: SignLanguageDictionaryItem[] = [
  {
    phrase: 'नमस्कार / नम्र निवेदन (Greetings & Respect)',
    language: 'hi',
    signNotation: 'ISL-GREETING-PALMS-JOINED',
    handGestures: ['Both hands at chest level', 'Palms pressed together', 'Slight head bow'],
    animationFrames: ['🙏', '🤝', '😊']
  },
  {
    phrase: 'सहायता चाहिए (Need Medical Assistance)',
    language: 'hi',
    signNotation: 'ISL-HELP-MEDICAL-CROSS',
    handGestures: ['Right hand tapping left wrist pulse', 'Open palm wave upward'],
    animationFrames: ['🖐️', '➕', '🚨']
  },
  {
    phrase: 'धन्यवाद (Thank You)',
    language: 'ta',
    signNotation: 'ISL-THANKS-CHIN-TOUCH',
    handGestures: ['Fingertips touch chin', 'Extend hand forward towards speaker'],
    animationFrames: ['🖐️', '➡️', '🙏']
  }
];

export const INITIAL_ANALYTICS: SystemAnalytics = {
  totalTranslations: 1482930,
  activeUsersToday: 42180,
  avgLatencyMs: 142,
  bleuScoreAverage: 41.8,
  asrAccuracyRate: 94.6,
  topLanguagePairs: [
    { pair: 'Hindi ➔ English', count: 482100 },
    { pair: 'English ➔ Marathi', count: 294100 },
    { pair: 'Tamil ➔ English', count: 215000 },
    { pair: 'Bengali ➔ Hindi', count: 184900 },
    { pair: 'Telugu ➔ English', count: 154000 },
    { pair: 'Santali ➔ Hindi (Low-Res)', count: 68400 }
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
