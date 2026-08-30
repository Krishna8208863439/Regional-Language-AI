import React, { useState } from 'react';
import { 
  Sprout, 
  Volume2, 
  CloudRain, 
  TrendingUp, 
  Mic, 
  MicOff,
  AlertCircle, 
  Search,
  Sparkles,
  Send,
  CheckCircle2,
  HelpCircle,
  Radio,
  X
} from 'lucide-react';
import { LanguageCode, AgricultureAdvisory } from '../../types';
import { MOCK_AGRICULTURE_DATA, SUPPORTED_LANGUAGES } from '../../data/mockData';
import { aiEngine } from '../../services/aiEngine';
import { createLiveSpeechRecognizer, LiveSpeechRecognitionController } from '../../utils/speechToText';
import confetti from 'canvas-confetti';

interface AgricultureModuleProps {
  currentLanguage: LanguageCode;
}

export const AgricultureModule: React.FC<AgricultureModuleProps> = ({ currentLanguage }) => {
  const [advisoriesList, setAdvisoriesList] = useState<AgricultureAdvisory[]>(MOCK_AGRICULTURE_DATA);
  const [selectedAdvisory, setSelectedAdvisory] = useState<AgricultureAdvisory>(MOCK_AGRICULTURE_DATA[0]);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [voiceLang, setVoiceLang] = useState<LanguageCode>(currentLanguage);
  const [isRecording, setIsRecording] = useState(false);
  const [spokenQuestion, setSpokenQuestion] = useState('कापसावर बोंडअळीचा प्रादुर्भाव झाला आहे, कोणती फवारणी करावी?');
  const [recognizer, setRecognizer] = useState<LiveSpeechRecognitionController | null>(null);
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const handleSpeak = (text: string, lang: LanguageCode = currentLanguage, id?: string) => {
    if (id) setActivePlayingId(id);
    aiEngine.speakText(
      text, 
      lang, 
      1.0, 
      1.0, 
      'female',
      () => { if (id) setActivePlayingId(id); },
      () => { setActivePlayingId(null); }
    );
  };

  const startVoiceRecording = (lang: LanguageCode = voiceLang) => {
    if (isRecording) {
      if (recognizer) recognizer.stop();
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    setSpokenQuestion('');

    const rec = createLiveSpeechRecognizer(
      lang,
      (transcript, isFinal) => {
        setSpokenQuestion(transcript);
      },
      (err) => {
        console.warn('Agriculture voice recognition error:', err);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );

    setRecognizer(rec);
    rec.start();
  };

  const handleProcessVoiceQuestion = (textToProcess?: string) => {
    const query = textToProcess || spokenQuestion;
    if (!query.trim()) return;

    if (isRecording && recognizer) {
      recognizer.stop();
      setIsRecording(false);
    }

    let newCrop = 'सोयाबीन / सोयाबीन (Soybean)';
    let issue = 'Yellow Mosaic Virus (पिवळा मोझॅक रोग / Whitefly vector)';
    let remedyMr = 'पांढऱ्या माशीच्या नियंत्रणासाठी थायामेथोक्सम २५% डब्ल्यूपी ४ ग्रॅम प्रति १० लिटर पाण्यात मिसळून फवारा. बाधित झाडे उपटून नष्ट करा.';
    let remedyEn = 'Spray Thiamethoxam 25% WP @ 4g per 10L water for whitefly vector control. Rogue out infected plants.';
    let price = '₹4,850 - ₹5,150 / क्विंटल (लातूर / अकोला APMC)';
    let weather = 'पुढील २४ तासांत स्वच्छ सूर्यप्रकाश. दुपारच्या वेळेत फवारणी टाळावी.';

    if (query.includes('कापूस') || query.includes('बोंडअळी') || query.includes('cotton')) {
      newCrop = 'कापूस / कपास (Cotton)';
      issue = 'Pink Bollworm (गुलाबी बोंडअळी / Pectinophora gossypiella)';
      remedyMr = 'एकर प्रति ५ फेरोमोन ट्रॅप लावा आणि प्रादुर्भाव वाढल्यास इमामेक्टिन बेंझोएट ५% एसजी (४ ग्रॅम प्रति १० लिटर पाणी) फवारा. नत्राचा संतुलित वापर करा.';
      remedyEn = 'Install 5 Pheromone Traps per acre. Spray Emamectin Benzoate 5% SG @ 4g per 10L water. Maintain balanced nitrogen application.';
      price = '₹7,250 - ₹7,600 / क्विंटल (Mandi Rate)';
      weather = 'पुढील २४ तासांत अंशतः ढगाळ हवामान. फवारणी सकाळी ८ ते ११ या वेळेतच करावी.';
    } else if (query.includes('कांदा') || query.includes('onion') || query.includes('प्याज')) {
      newCrop = 'कांदा / प्याज (Onion)';
      issue = 'Purple Blotch & Thrips (जांभळा करपा व फुलकिडे)';
      remedyMr = 'मॅन्कोझेब ७५% डब्ल्यूपी २.५ ग्रॅम किंवा टेबुकोनॅझोल १ मिली प्रति लिटर पाण्यात मिसळून सोबत स्टिकरचा वापर करा.';
      remedyEn = 'Spray Mancozeb 75% WP @ 2.5g/L or Tebuconazole @ 1ml/L with a wetting agent / sticker.';
      price = '₹2,800 - ₹3,400 / क्विंटल (लासलगाव / नाशिक कृषी उत्पन्न बाजार)';
      weather = 'सकाळी धुके पडण्याची शक्यता असल्याने बुरशीनाशक फवारणी त्वरित करा.';
    } else if (query.includes('गहू') || query.includes('wheat') || query.includes('गेहूं')) {
      newCrop = 'गहू / गेहूं (Wheat)';
      issue = 'Wheat Rust & Termite (तांबेरा रोग व वाळवी)';
      remedyMr = 'प्रोपिकोनेझोल २५% ईसी १ मिली प्रति लिटर पाण्यात मिसळून फवारा. सिंचन वेळेवर करा.';
      remedyEn = 'Spray Propiconazole 25% EC @ 1ml/L of water at first sign of rust appearance.';
      price = '₹2,500 - ₹2,750 / क्विंटल (Mandi Rate)';
      weather = 'तापमानात वाढ होण्याची शक्यता, हलके सिंचन चालू ठेवा.';
    }

    const newAdvisory: AgricultureAdvisory = {
      id: `ag-${500 + advisoriesList.length + 1}`,
      crop: newCrop,
      query: query,
      detectedIssue: issue,
      remedyNative: remedyMr,
      remedyEnglish: remedyEn,
      marketPrice: price,
      weatherWarning: weather
    };

    setAdvisoriesList([newAdvisory, ...advisoriesList]);
    setSelectedAdvisory(newAdvisory);
    setIsVoiceModalOpen(false);

    confetti({ particleCount: 40, spread: 60 });
    handleSpeak(remedyMr, 'mr', 'remedy');
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
              <Sprout className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">AI Agriculture & Farmer Multilingual Advisory</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Voice-enabled crop disease diagnosis, real-time Mandi rates & regional weather alerts in Marathi, Hindi & English
          </p>
        </div>

        {/* 🎤 Ask Question in Native Voice Button */}
        <button
          onClick={() => setIsVoiceModalOpen(true)}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-md transition cursor-pointer active:scale-95 shrink-0"
        >
          <Mic className="w-4 h-4 animate-bounce" />
          <span>🎤 Ask Question in Native Voice</span>
        </button>
      </div>

      {/* Voice Assistant Modal */}
      {isVoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 border border-emerald-500/40 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 relative">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <Sprout className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">
                    शेतकरी आवाज सहाय्यक (Farmer Voice Advisory)
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Speak your crop problem naturally in Marathi, Hindi, or English
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (isRecording && recognizer) recognizer.stop();
                  setIsRecording(false);
                  setIsVoiceModalOpen(false);
                }}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                बोलण्याची भाषा (Speaking Language):
              </span>
              <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
                {(['mr', 'hi', 'en'] as LanguageCode[]).map((code) => (
                  <button
                    key={code}
                    onClick={() => setVoiceLang(code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition cursor-pointer ${
                      voiceLang === code
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {code === 'mr' ? 'मराठी' : code === 'hi' ? 'हिन्दी' : 'English'}
                  </button>
                ))}
              </div>
            </div>

            {/* Big Live Microphone Recorder Box */}
            <div className="p-6 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border-2 border-dashed border-emerald-300 dark:border-emerald-800/80 text-center space-y-4">
              <button
                type="button"
                onClick={() => startVoiceRecording(voiceLang)}
                className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition shadow-lg cursor-pointer ${
                  isRecording
                    ? 'bg-red-600 text-white animate-pulse ring-8 ring-red-500/30'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>

              <div>
                <h4 className="font-black text-sm text-slate-900 dark:text-white">
                  {isRecording ? '🔴 Listening to your voice... बोलत राहा...' : 'Click Microphone to Speak Your Crop Question'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {isRecording 
                    ? 'Live microphone is capturing your voice. When done, click submit.' 
                    : 'Speak in Marathi / Hindi / English (e.g. कापसावर बोंडअळी, कांद्याचे बाजारभाव)'}
                </p>
              </div>

              {/* Waveform Animation */}
              {isRecording && (
                <div className="flex justify-center items-center gap-1.5 h-6">
                  {[40, 75, 100, 60, 90, 45, 80, 50, 95, 30].map((h, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-emerald-600 rounded-full animate-pulse" 
                      style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }} 
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Transcribed Question Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                आपला विचारलेला प्रश्न (Transcribed Question):
              </label>
              <textarea
                value={spokenQuestion}
                onChange={(e) => setSpokenQuestion(e.target.value)}
                rows={2}
                placeholder="Type or speak your crop issue here..."
                className="w-full p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-indic font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Quick 1-Click Voice Test Prompts */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block">⚡ Quick 1-Click Questions (थेट प्रश्न निवडा):</span>
              <div className="grid grid-cols-1 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    const q = 'कापसावर बोंडअळीचा प्रादुर्भाव झाला आहे, कोणती फवारणी करावी?';
                    setSpokenQuestion(q);
                    handleProcessVoiceQuestion(q);
                  }}
                  className="p-2 bg-slate-50 dark:bg-slate-950 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-left font-semibold text-slate-900 dark:text-slate-200 cursor-pointer flex items-center justify-between"
                >
                  <span>🌿 "कापसावर बोंडअळी पडली असून पाने पिवळी पडत आहेत"</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Diagnose ➔</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const q = 'कांद्याचे आजचे बाजारभाव आणि जांभळा करपा रोगाचा उपाय सांगा.';
                    setSpokenQuestion(q);
                    handleProcessVoiceQuestion(q);
                  }}
                  className="p-2 bg-slate-50 dark:bg-slate-950 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-left font-semibold text-slate-900 dark:text-slate-200 cursor-pointer flex items-center justify-between"
                >
                  <span>🧅 "कांद्याचे आजचे बाजारभाव आणि जांभळा करपा रोगाचा उपाय"</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Diagnose ➔</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const q = 'सोयाबीन पिकावर पिवळा मोझॅक रोग आला आहे, काय करावे?';
                    setSpokenQuestion(q);
                    handleProcessVoiceQuestion(q);
                  }}
                  className="p-2 bg-slate-50 dark:bg-slate-950 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 rounded-xl border border-slate-200 dark:border-slate-800 text-left font-semibold text-slate-900 dark:text-slate-200 cursor-pointer flex items-center justify-between"
                >
                  <span>🌱 "सोयाबीन पिकावर पिवळा मोझॅक रोग आला आहे, काय उपाय?"</span>
                  <span className="text-[10px] text-emerald-600 font-bold">Diagnose ➔</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (isRecording && recognizer) recognizer.stop();
                  setIsRecording(false);
                  setIsVoiceModalOpen(false);
                }}
                className="w-1/3 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                रद्द करा (Cancel)
              </button>

              <button
                type="button"
                onClick={() => handleProcessVoiceQuestion()}
                className="w-2/3 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>प्रश्न विचारा व सल्ला ऐका (Submit)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Crop Selection */}
        <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="font-black text-xs text-slate-700 dark:text-slate-400 uppercase tracking-wider">
              Select Farmer Advisory Record
            </h3>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              {advisoriesList.length} Records
            </span>
          </div>

          <div className="space-y-2">
            {advisoriesList.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedAdvisory(item)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs cursor-pointer ${
                  selectedAdvisory.id === item.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-500/60 text-emerald-950 dark:text-emerald-100 shadow-md ring-2 ring-emerald-500/30'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-black text-sm text-emerald-800 dark:text-emerald-300">{item.crop}</span>
                  <span className="text-[10px] text-slate-600 dark:text-slate-400 font-mono font-bold">{item.id}</span>
                </div>
                <p className="text-slate-900 dark:text-slate-200 font-medium line-clamp-1 mb-2">{item.query}</p>

                {/* Direct Voice Button on Crop Item */}
                <div className="flex justify-between items-center pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-[10px]">
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">{item.marketPrice.split(' ')[0]}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeak(item.remedyNative, 'mr', item.id);
                    }}
                    className={`px-2 py-0.5 rounded-md font-bold text-[10px] flex items-center gap-1 transition cursor-pointer ${
                      activePlayingId === item.id
                        ? 'bg-emerald-600 text-white animate-pulse'
                        : 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200'
                    }`}
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>{activePlayingId === item.id ? 'Playing...' : 'Voice (ऐका)'}</span>
                  </button>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Advisory Detail */}
        <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5 lg:col-span-2 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-3">
            <div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Target Crop:</span>
              <h3 className="font-black text-lg text-slate-900 dark:text-white">{selectedAdvisory.crop}</h3>
            </div>

            {/* Listen Advisory Voice Button */}
            <button
              onClick={() => handleSpeak(selectedAdvisory.remedyNative, 'mr', 'main-advisory')}
              className={`flex items-center space-x-2 px-4 py-2 text-white rounded-xl text-xs font-black shadow-sm transition cursor-pointer ${
                activePlayingId === 'main-advisory'
                  ? 'bg-emerald-600 ring-4 ring-emerald-500/30 animate-pulse'
                  : 'bg-saffron-500 hover:bg-saffron-600'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${activePlayingId === 'main-advisory' ? 'animate-bounce' : ''}`} />
              <span>{activePlayingId === 'main-advisory' ? '🔊 Playing Marathi Voice Guidance...' : '🔊 Listen Advisory Voice (सल्ला ऐका)'}</span>
            </button>
          </div>

          {/* Issue & Remedy */}
          <div className="space-y-3">
            <div className="bg-amber-50 dark:bg-amber-950/30 p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60">
              <span className="text-[11px] text-amber-900 dark:text-amber-400 block font-bold">Detected Problem:</span>
              <p className="text-xs font-black text-amber-950 dark:text-amber-200">{selectedAdvisory.detectedIssue}</p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-300 dark:border-emerald-500/40 space-y-2 shadow-xs">
              <div className="flex justify-between items-center">
                <span className="text-xs font-black text-emerald-900 dark:text-emerald-300 block">
                  Regional Remedy ({currentLangObj?.nativeName}):
                </span>
                <button
                  type="button"
                  onClick={() => handleSpeak(selectedAdvisory.remedyNative, 'mr', 'remedy-badge')}
                  className="text-xs text-emerald-700 dark:text-emerald-300 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Speak
                </button>
              </div>

              <p className="text-sm font-indic text-slate-900 dark:text-slate-100 leading-relaxed font-bold">
                "{selectedAdvisory.remedyNative}"
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-400 italic font-medium pt-1">
                English translation: {selectedAdvisory.remedyEnglish}
              </p>
            </div>
          </div>

          {/* Mandi Rates & Weather Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-700 dark:text-slate-400 flex items-center gap-1 font-bold">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Mandi Market Rates
                </span>
                <button
                  type="button"
                  onClick={() => handleSpeak(`बाजारभाव: ${selectedAdvisory.marketPrice}`, 'mr', 'mandi')}
                  className="text-xs text-emerald-700 dark:text-emerald-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3 h-3" />
                </button>
              </div>
              <p className="text-base font-black text-slate-900 dark:text-white">{selectedAdvisory.marketPrice}</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-700 dark:text-slate-400 flex items-center gap-1 font-bold">
                  <CloudRain className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Regional Weather Alert
                </span>
                <button
                  type="button"
                  onClick={() => handleSpeak(`हवामान अंदाज: ${selectedAdvisory.weatherWarning}`, 'mr', 'weather')}
                  className="text-xs text-cyan-700 dark:text-cyan-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3 h-3" />
                </button>
              </div>
              <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold">{selectedAdvisory.weatherWarning}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
