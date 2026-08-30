import { LanguageCode, UserRole } from '../types';

export interface AppTranslationStrings {
  brandSubtitle: string;
  selectLanguage: string;
  selectPersona: string;
  edgeInference: string;
  systemStatus: string;
  operational: string;
  encrypted: string;
  signIn: string;
  signOut: string;
  createAccount: string;
  forgotPassword: string;
  rememberMe: string;
  enterFullscreen: string;
  exitFullscreen: string;
  toggleThemeLight: string;
  toggleThemeDark: string;
  toggleModules: string;
  coreEngines: string;
  domainEcosystem: string;
  innovations: string;
  modelsCount: string;
  navItems: Record<string, { label: string; badge?: string }>;
  roles: Record<UserRole, { label: string; description: string }>;
  authHeroTitle: string;
  authHeroSubtitle: string;
  authHeroFeatures: { title: string; desc: string }[];
}

export const UI_TRANSLATIONS: Record<LanguageCode, AppTranslationStrings> = {
  mr: {
    brandSubtitle: 'मराठी, हिन्दी आणि इंग्रजीसाठी प्रगत AI मंच',
    selectLanguage: 'भाषा निवडा',
    selectPersona: 'भूमिका निवडा',
    edgeInference: 'प्रक्रिया वेग',
    systemStatus: 'प्रणाली स्थिती',
    operational: 'सक्रिय व सुरक्षित',
    encrypted: 'AES-256 कूटबद्ध आणि सुरक्षित',
    signIn: 'लॉगिन करा (Sign In)',
    signOut: 'बाहेर पडा (Sign Out)',
    createAccount: 'नवीन खाते तयार करा',
    forgotPassword: 'पासवर्ड विसरलात?',
    rememberMe: 'या लॅपटॉपवर मला आठवणीत ठेवा',
    enterFullscreen: 'पूर्ण स्क्रीन उघडा',
    exitFullscreen: 'पूर्ण स्क्रीन बंद करा',
    toggleThemeLight: 'लाइट मोड चालू करा',
    toggleThemeDark: 'डार्क मोड चालू करा',
    toggleModules: 'AI विभाग मेनू',
    coreEngines: 'मुख्य AI मॉडेल्स',
    domainEcosystem: 'क्षेत्रीय सेवा परिसंस्था',
    innovations: 'नवकल्पना व प्रशासन',
    modelsCount: '५ AI मॉडेल्स',
    navItems: {
      text_translator: { label: 'मशिन भाषांतर प्रणाली', badge: 'IndicTrans2' },
      document_ocr: { label: 'दस्तऐवज ओसीआर व AI', badge: 'PaddleOCR' },
      ai_chat: { label: 'प्रादेशिक संभाषण AI' },
      low_resource_nlp: { label: 'बोलीभाषा व्याकरण व NLP', badge: 'मराठी / हिंदी' },
      voice_cloning: { label: 'आवाज क्लोनिंग व संमती केंद्र', badge: 'प्रमाणित' },
      healthcare: { label: 'आरोग्य व रुग्णालय सेवा' },
      agriculture: { label: 'कृषी व शेतकरी सल्लागार' },
      governance: { label: 'शासकीय योजना व अर्ज' },
      smart_search: { label: 'स्मार्ट बहुभाषिक शोध' },
      admin_analytics: { label: 'प्रशासक सुरक्षा व विश्लेषण' }
    },
    roles: {
      citizen: { label: 'नागरिक (Citizen)', description: 'ध्वनी भाषांतर, योजना अर्ज साहाय्य व माहिती' },
      student: { label: 'विद्यार्थी (Student)', description: 'भाषा शिक्षण, संभाषण AI व शैक्षणिक सराव' },
      teacher: { label: 'शिक्षक (Teacher)', description: 'अभ्यासक्रम भाषांतर व प्रश्न निर्मिती' },
      govt_officer: { label: 'शासकीय अधिकारी (Officer)', description: 'सार्वजनिक सेवा, परिपत्रके व नागरिक संवाद' },
      healthcare_worker: { label: 'आरोग्य सेवक (Healthcare)', description: 'रुग्ण लक्षण तपासणी व औषध सूचना' },
      farmer: { label: 'शेतकरी (Farmer)', description: 'पीक रोग सल्ला, बाजारभाव व हवामान अंदाज' },
      business: { label: 'उद्योग / व्यवसाय (Business)', description: 'ग्राहक सेवा चॅटबॉट व कागदपत्रे' },
      admin: { label: 'प्रशासक (System Admin)', description: 'सुरक्षा ऑडिट, मॉडेल विश्लेषण व टेलिमेट्री' }
    },
    authHeroTitle: 'आपल्या मातृभाषेत प्रगत AI तंत्रज्ञान अनुभवा',
    authHeroSubtitle: 'मराठी, हिन्दी आणि इंग्रजी भाषांमध्ये अखंड संवाद, थेट सरकारी योजना, शेती सल्ला व आरोग्य मार्गदर्शन.',
    authHeroFeatures: [
      { title: '🎙️ थेट ध्वनी व भाषा अनुवाद', desc: 'बोला आणि त्वरित मराठी, हिंदी व इंग्रजीत संवाद साधा.' },
      { title: '🏛️ शासकीय योजना व ७/१२ उतारा', desc: 'माझी लाडकी बहीण, पीएम-किसान व महसूल दाखल्यांची माहिती.' },
      { title: '🔒 संपूर्ण सुरक्षित व कूटबद्ध', desc: 'AES-256 सुरक्षा आणि वापरकर्ता संमती संरक्षण.' }
    ]
  },
  hi: {
    brandSubtitle: 'हिंदी, मराठी और अंग्रेजी हेतु उन्नत एआई मंच',
    selectLanguage: 'भाषा चुनें',
    selectPersona: 'भूमिका चुनें',
    edgeInference: 'प्रक्रिया गति',
    systemStatus: 'प्रणाली स्थिति',
    operational: 'सक्रिय एवं सुरक्षित',
    encrypted: 'AES-256 एन्क्रिप्टेड एवं सुरक्षित',
    signIn: 'लॉगिन करें (Sign In)',
    signOut: 'लॉगआउट करें (Sign Out)',
    createAccount: 'नया खाता बनाएं',
    forgotPassword: 'पासवर्ड भूल गए?',
    rememberMe: 'इस लैपटॉप पर मुझे याद रखें',
    enterFullscreen: 'फुल स्क्रीन खोलें',
    exitFullscreen: 'फुल स्क्रीन बंद करें',
    toggleThemeLight: 'लाइट मोड चालू करें',
    toggleThemeDark: 'डार्क मोड चालू करें',
    toggleModules: 'एआई मॉड्यूल मेनू',
    coreEngines: 'प्रमुख एआई इंजन',
    domainEcosystem: 'क्षेत्रीय सेवा तंत्र',
    innovations: 'नवाचार एवं प्रशासन',
    modelsCount: '5 AI मॉडल्स',
    navItems: {
      text_translator: { label: 'मशीन अनुवाद प्रणाली', badge: 'IndicTrans2' },
      document_ocr: { label: 'दस्तावेज़ ओसीआर एवं एआई', badge: 'PaddleOCR' },
      ai_chat: { label: 'क्षेत्रीय संवादात्मक एआई' },
      low_resource_nlp: { label: 'बोली एवं भाषा व्याकरण NLP', badge: 'हिंदी / मराठी' },
      voice_cloning: { label: 'आवाज़ क्लोनिंग एवं सहमति केंद्र', badge: 'सत्यापित' },
      healthcare: { label: 'स्वास्थ्य एवं चिकित्सा सेवा' },
      agriculture: { label: 'कृषि एवं किसान परामर्श' },
      governance: { label: 'सरकारी योजनाएं एवं प्रपत्र' },
      smart_search: { label: 'स्मार्ट बहुभाषी खोज' },
      admin_analytics: { label: 'प्रशासन सुरक्षा एवं विश्लेषण' }
    },
    roles: {
      citizen: { label: 'नागरिक (Citizen)', description: 'ध्वनि अनुवाद, सरकारी फॉर्म सहायता एवं सूचनाएं' },
      student: { label: 'विद्यार्थी (Student)', description: 'भाषा सीखना, संवाद एआई एवं शैक्षिक अभ्यास' },
      teacher: { label: 'शिक्षक (Teacher)', description: 'पाठ्यक्रम अनुवाद एवं प्रश्न निर्माण' },
      govt_officer: { label: 'शासकीय अधिकारी (Officer)', description: 'सार्वजनिक सेवा, अधिसूचनाएं एवं नागरिक संवाद' },
      healthcare_worker: { label: 'स्वास्थ्य कर्मी (Healthcare)', description: 'रोगी लक्षण जांच एवं दवा निर्देश' },
      farmer: { label: 'किसान (Farmer)', description: 'फसल रोग परामर्श, मंडी भाव एवं मौसम पूर्वानुमान' },
      business: { label: 'व्यापार / उद्योग (Business)', description: 'ग्राहक सहायता चैटबॉट एवं दस्तावेज़' },
      admin: { label: 'प्रशासक (System Admin)', description: 'सुरक्षा ऑडिट, मॉडल विश्लेषण एवं टेलीमेट्री' }
    },
    authHeroTitle: 'अपनी मातृभाषा में उन्नत AI तकनीक का अनुभव करें',
    authHeroSubtitle: 'हिंदी, मराठी और अंग्रेजी में निर्बाध संवाद, सरकारी योजनाओं का लाभ, कृषि सलाह और स्वास्थ्य मार्गदर्शन।',
    authHeroFeatures: [
      { title: '🎙️ रीयल-टाइम वॉइस अनुवाद', desc: 'अपनी भाषा में बोलें और तुरंत हिंदी, मराठी व अंग्रेजी में अनुवाद पाएं।' },
      { title: '🏛️ सरकारी योजनाएं एवं दस्तावेज', desc: 'पीएम-किसान, आवास योजना और आय प्रमाण पत्र की पूरी जानकारी।' },
      { title: '🔒 पूर्णतः सुरक्षित एवं संरक्षित', desc: 'AES-256 एन्क्रिप्शन और उपयोगकर्ता गोपनीयता का पूर्ण ध्यान।' }
    ]
  },
  en: {
    brandSubtitle: 'Enterprise Multilingual AI for Marathi, Hindi & English',
    selectLanguage: 'Select Language',
    selectPersona: 'Select Persona',
    edgeInference: 'Edge Latency',
    systemStatus: 'System Status',
    operational: 'Operational',
    encrypted: 'AES-256 Encrypted & Verified',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    createAccount: 'Create Account',
    forgotPassword: 'Forgot Password?',
    rememberMe: 'Remember me on this laptop',
    enterFullscreen: 'Enter Full Screen',
    exitFullscreen: 'Exit Full Screen',
    toggleThemeLight: 'Switch to Light Mode',
    toggleThemeDark: 'Switch to Dark Mode',
    toggleModules: 'Toggle Modules Menu',
    coreEngines: 'CORE AI ENGINES',
    domainEcosystem: 'DOMAIN ECOSYSTEM',
    innovations: 'INNOVATIONS & GOVERNANCE',
    modelsCount: '5 AI Models',
    navItems: {
      text_translator: { label: 'Neural Machine Translation', badge: 'IndicTrans2' },
      document_ocr: { label: 'OCR & Document AI', badge: 'PaddleOCR' },
      ai_chat: { label: 'Regional Conversational AI' },
      low_resource_nlp: { label: 'Regional Dialect NLP Engine', badge: 'Marathi / Hindi' },
      voice_cloning: { label: 'Voice Cloning (Consent Hub)', badge: 'Consent Verified' },
      healthcare: { label: 'Healthcare & Clinical Translation' },
      agriculture: { label: 'Agriculture & Farmer Advisory' },
      governance: { label: 'Government Services & Forms' },
      smart_search: { label: 'Cross-Language Smart Search' },
      admin_analytics: { label: 'Admin Telemetry & Security' }
    },
    roles: {
      citizen: { label: 'Citizen', description: 'Voice translation, form filling assistance & public notifications' },
      student: { label: 'Student', description: 'Language learning, flashcards, AI tutor & lecture translation' },
      teacher: { label: 'Teacher', description: 'Content translation, lesson voiceover & question generator' },
      govt_officer: { label: 'Govt Officer', description: 'Public service translation, official notices & citizen dialogue' },
      healthcare_worker: { label: 'Healthcare Worker', description: 'Patient symptom translation, prescription reader & medical forms' },
      farmer: { label: 'Farmer / Agri', description: 'Crop disease advice, mandi prices & voice weather forecasts' },
      business: { label: 'Business Enterprise', description: 'Multilingual customer support chatbots & document workflow' },
      admin: { label: 'System Admin', description: 'Model benchmarking, RBAC security, API usage & telemetry' }
    },
    authHeroTitle: 'Enterprise Multilingual AI for India',
    authHeroSubtitle: 'Communicate seamlessly across Marathi, Hindi, and English with voice translation, scheme assistance, and clinical AI.',
    authHeroFeatures: [
      { title: '🎙️ Real-Time Voice Translation', desc: 'Instant ASR and natural TTS voice synthesis in your mother tongue.' },
      { title: '🏛️ Government Services & Schemes', desc: 'Guided form assistance for PM-Kisan, Ladki Bahin, and land records.' },
      { title: '🔒 Enterprise Security & Consent', desc: 'AES-256 encryption, biometric voice consent, and full telemetry.' }
    ]
  }
};
