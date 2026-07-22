import { LanguageCode, DomainType, TranslationRequest, ASRResult, OCRResult, NLPAnalysis, VoiceProfile } from '../types';
import { SUPPORTED_LANGUAGES, SAMPLE_TRANSLATIONS } from '../data/mockData';

class BharatVoiceAIEngine {
  private synth: SpeechSynthesis | null = null;
  private isBrowserSpeechAvailable = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.isBrowserSpeechAvailable = true;
    }
  }

  // --- 1. Speech Recognition (ASR) ---
  public async simulateASR(audioBlob: Blob | null, lang: LanguageCode): Promise<ASRResult> {
    await new Promise(res => setTimeout(res, 800)); // simulated latency

    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === lang);
    const sampleText = SAMPLE_TRANSLATIONS[lang]?.native || 
      `यह ${langObj?.name || 'regional'} भाषा में उच्च-सटीकता भाषण पहचान संचरण का एक उदाहरण है। (Real-time ASR Stream)`;

    return {
      transcript: sampleText,
      language: lang,
      confidence: 0.962,
      durationSeconds: 4.8,
      diarization: [
        { speaker: 'Speaker 1 (Citizen)', text: sampleText.slice(0, Math.floor(sampleText.length / 2)), startTime: '00:00.0', endTime: '00:02.4' },
        { speaker: 'Speaker 2 (Officer)', text: sampleText.slice(Math.floor(sampleText.length / 2)), startTime: '00:02.4', endTime: '00:04.8' }
      ],
      punctuateRestored: true
    };
  }

  // --- 2. Text-to-Speech (TTS) ---
  public speakText(text: string, lang: LanguageCode, pitch = 1.0, rate = 1.0, gender: 'male' | 'female' = 'female') {
    if (!this.synth) {
      console.warn('Speech synthesis not available in this browser environment.');
      return;
    }

    this.synth.cancel(); // Stop ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;

    // Map language codes to BCP 47 tags
    const bcp47Map: Record<string, string> = {
      hi: 'hi-IN', mr: 'mr-IN', ta: 'ta-IN', te: 'te-IN', bn: 'bn-IN',
      gu: 'gu-IN', kn: 'kn-IN', ml: 'ml-IN', pa: 'pa-IN', ur: 'ur-IN',
      en: 'en-IN'
    };

    utterance.lang = bcp47Map[lang] || 'hi-IN';

    // Try to find a matching voice in voices list
    const voices = this.synth.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(utterance.lang) || v.lang.includes(lang));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    this.synth.speak(utterance);
  }

  public stopSpeech() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  // --- 3. Neural Machine Translation (NMT) ---
  public async translateText(
    text: string,
    sourceLang: LanguageCode,
    targetLang: LanguageCode,
    domain: DomainType = 'general'
  ): Promise<TranslationRequest> {
    await new Promise(res => setTimeout(res, 500));

    if (!text.trim()) {
      return {
        sourceLang,
        targetLang,
        domain,
        sourceText: '',
        translatedText: '',
        confidence: 1.0,
        engineUsed: 'IndicTrans2'
      };
    }

    const sourceLangObj = SUPPORTED_LANGUAGES.find(l => l.code === sourceLang);
    const targetLangObj = SUPPORTED_LANGUAGES.find(l => l.code === targetLang);

    let translated = '';
    let translit = '';

    if (SAMPLE_TRANSLATIONS[targetLang]) {
      translated = SAMPLE_TRANSLATIONS[targetLang].native;
      translit = SAMPLE_TRANSLATIONS[targetLang].transliteration;
    } else {
      translated = `[${domain.toUpperCase()} NMT - ${targetLangObj?.name} Translation]: ${text} (अनुवादित एवं सत्यापित)`;
      translit = `Transliterated string for ${targetLangObj?.name}`;
    }

    // Domain specific tag insertion for demonstration
    if (domain === 'healthcare') {
      translated += ` [चिकित्सा संदर्भ: प्राथमिकता 1]`;
    } else if (domain === 'agriculture') {
      translated += ` [कृषि सलाह: सत्यापित मंडी]`;
    } else if (domain === 'governance') {
      translated += ` [शासकीय दस्तावेज प्ररुप]`;
    }

    return {
      sourceLang,
      targetLang,
      domain,
      sourceText: text,
      translatedText: translated,
      confidence: 0.978,
      engineUsed: sourceLangObj?.lowResource || targetLangObj?.lowResource ? 'IndicTrans2' : 'SeamlessM4T',
      transliteration: translit
    };
  }

  // --- 4. OCR & Document Intelligence ---
  public async processOCR(file: File): Promise<OCRResult> {
    await new Promise(res => setTimeout(res, 1200));

    return {
      documentName: file.name,
      detectedLanguage: 'hi',
      fullExtractedText: 'भारत सरकार - प्रमाण पत्र (Government Certificate)\nप्रमाणित किया जाता है कि आवेदक को क्षेत्रीय भाषा सहायता स्वीकृत की गई है।\nदिनांक: 22 जुलाई 2026',
      fullTranslatedText: 'Government of India - Certificate\nIt is certified that the applicant has been granted regional language support assistance.\nDate: July 22, 2026',
      boxes: [
        { id: 'box-1', x: 20, y: 15, width: 60, height: 12, originalText: 'भारत सरकार - प्रमाण पत्र', translatedText: 'Government of India - Certificate', confidence: 0.99 },
        { id: 'box-2', x: 15, y: 35, width: 75, height: 25, originalText: 'प्रमाणित किया जाता है कि आवेदक को क्षेत्रीय भाषा सहायता स्वीकृत की गई है।', translatedText: 'Certified that applicant is granted language support assistance.', confidence: 0.96 },
        { id: 'box-3', x: 20, y: 70, width: 40, height: 10, originalText: 'दिनांक: 22 जुलाई 2026', translatedText: 'Date: July 22, 2026', confidence: 0.98 }
      ]
    };
  }

  // --- 5. Low-Resource NLP Engine ---
  public analyzeLowResourceNLP(text: string, lang: LanguageCode): NLPAnalysis {
    const words = text.split(/\s+/).filter(Boolean);
    const posTags = ['NOUN', 'VERB', 'ADJ', 'PRON', 'ADV', 'PART', 'NUM'];

    const tokens = words.map((w, idx) => ({
      word: w,
      pos: posTags[idx % posTags.length],
      tag: `B-${posTags[idx % posTags.length]}`
    }));

    const entities = [
      { text: words[0] || 'भारत', category: 'LOCATION' as const, confidence: 0.98 },
      { text: words[Math.floor(words.length / 2)] || 'प्रधानमंत्री', category: 'ORGANIZATION' as const, confidence: 0.94 }
    ];

    return {
      text,
      language: lang,
      tokens,
      entities,
      sentiment: text.includes('समस्या') || text.includes('दर्द') ? 'negative' : 'positive',
      sentimentScore: 0.88,
      intent: 'INFORMATIONAL_QUERY',
      keywords: words.slice(0, 5),
      grammarSuggestions: [
        { original: words[words.length - 1] || 'है', replacement: 'हैं', reason: 'Honorific agreement in plural regional syntax' }
      ]
    };
  }

  // --- 6. Voice Cloning & Watermarking ---
  public generateVoiceProfile(speakerName: string, lang: LanguageCode, gender: 'male' | 'female'): VoiceProfile {
    return {
      id: `vp-${Math.random().toString(36).substring(2, 9)}`,
      speakerName,
      language: lang,
      consentSigned: true,
      consentTimestamp: new Date().toISOString(),
      watermarkHash: `BW-WM-${Math.random().toString(16).substring(2, 10).toUpperCase()}-VERIFIED`,
      audioSampleDuration: 12.4,
      gender,
      qualityScore: 98.4
    };
  }
}

export const aiEngine = new BharatVoiceAIEngine();
