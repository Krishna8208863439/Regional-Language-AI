export type LanguageCode = 'hi' | 'mr' | 'en';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  preferredLanguage: LanguageCode;
  avatar?: string;
  createdAt: string;
  isLoggedIn: boolean;
}

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  script: string;
  region: string;
  speakers: string;
  lowResource: boolean;
  supportedFeatures: {
    asr: boolean;
    nmt: boolean;
    tts: boolean;
    ocr: boolean;
    nlp: boolean;
  };
}

export type UserRole =
  | 'citizen'
  | 'student'
  | 'teacher'
  | 'govt_officer'
  | 'healthcare_worker'
  | 'farmer'
  | 'business'
  | 'admin';

export interface UserRoleInfo {
  id: UserRole;
  label: string;
  icon: string;
  description: string;
  recommendedModule: string;
}

export type DomainType = 'general' | 'healthcare' | 'agriculture' | 'governance' | 'education' | 'legal';

export interface TranslationRequest {
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  domain: DomainType;
  sourceText: string;
  translatedText: string;
  confidence: number;
  engineUsed: 'IndicTrans2' | 'NLLB-200' | 'MarianMT' | 'SeamlessM4T';
  transliteration?: string;
  audioUrl?: string;
}

export interface ASRResult {
  transcript: string;
  language: LanguageCode;
  confidence: number;
  durationSeconds: number;
  diarization: {
    speaker: string;
    text: string;
    startTime: string;
    endTime: string;
  }[];
  punctuateRestored: boolean;
}

export interface OCRBoundingBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  originalText: string;
  translatedText: string;
  confidence: number;
}

export interface OCRResult {
  documentName: string;
  detectedLanguage: LanguageCode;
  boxes: OCRBoundingBox[];
  fullExtractedText: string;
  fullTranslatedText: string;
}

export interface VoiceProfile {
  id: string;
  speakerName: string;
  language: LanguageCode;
  consentSigned: boolean;
  consentTimestamp: string;
  watermarkHash: string;
  audioSampleDuration: number;
  gender: 'male' | 'female' | 'neutral';
  qualityScore: number;
}

export interface NLPAnalysis {
  text: string;
  language: LanguageCode;
  tokens: { word: string; pos: string; tag: string }[];
  entities: { text: string; category: 'LOCATION' | 'PERSON' | 'ORGANIZATION' | 'DATE' | 'SCHEME'; confidence: number }[];
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  intent: string;
  keywords: string[];
  grammarSuggestions: { original: string; replacement: string; reason: string }[];
}

export interface HealthcareSymptomCard {
  id: string;
  patientName?: string;
  patientAge?: string;
  patientGender?: string;
  chiefComplaint: string;
  symptoms: string[];
  duration?: string;
  translatedMedicalSummary: Record<string, string>;
  urgencyLevel: 'Normal' | 'Urgent' | 'Emergency';
  riskLevel: 'High' | 'Moderate' | 'Low';
  riskScore: number;
  confidenceScore: number;
  suggestedAction: string;
  responsePriority: string;
  vitalSigns?: {
    bp: string;
    heartRate: string;
    spo2: string;
    temp: string;
  };
  triageNotes: string;
  consentId: string;
  consentTimestamp: string;
  emergencyAlertTriggered?: boolean;
}

export interface AgricultureAdvisory {
  id: string;
  crop: string;
  query: string;
  detectedIssue: string;
  remedyNative: string;
  remedyEnglish: string;
  marketPrice: string;
  weatherWarning: string;
}

export interface GovtSchemeForm {
  id: string;
  schemeName: string;
  ministry: string;
  applicantVoicePrompt: string;
  fields: {
    fieldId: string;
    labelNative: string;
    labelEnglish: string;
    value: string;
    required: boolean;
  }[];
  generatedNoticeText: string;
}

export interface SignLanguageDictionaryItem {
  phrase: string;
  language: LanguageCode;
  signNotation: string;
  handGestures: string[];
  animationFrames: string[];
}

export interface SystemAnalytics {
  totalTranslations: number;
  activeUsersToday: number;
  avgLatencyMs: number;
  bleuScoreAverage: number;
  asrAccuracyRate: number;
  topLanguagePairs: { pair: string; count: number }[];
  requestsByDomain: Record<DomainType, number>;
  hourlyTraffic: { hour: string; requests: number }[];
}
