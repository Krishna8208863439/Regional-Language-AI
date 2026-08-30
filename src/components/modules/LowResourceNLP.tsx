import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Tag, 
  AlertCircle, 
  CheckCircle2, 
  Search, 
  Smile, 
  Frown, 
  Meh, 
  Zap,
  BookOpen
} from 'lucide-react';
import { LanguageCode, NLPAnalysis } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { aiEngine } from '../../services/aiEngine';

interface LowResourceNLPProps {
  currentLanguage: LanguageCode;
}

const DIALECT_PRESETS = [
  {
    name: 'Varhadi / Vidarbha Marathi (वऱ्हाडी बोली)',
    lang: 'mr' as LanguageCode,
    text: 'आमच्या गावाकडे यंदा कापसावर बोंडअळीचा मोठा प्रादुर्भाव झाला, काही उपाय सांगा बरं.'
  },
  {
    name: 'Ahirani / Khandeshi Marathi (अहिराणी बोली)',
    lang: 'mr' as LanguageCode,
    text: 'मनाले शेती मा पाणी द्याना शे, तहसीलदार कचेरी मा अर्ज कसा कराव?'
  },
  {
    name: 'Malvani / Konkani Marathi (मालवणी बोली)',
    lang: 'mr' as LanguageCode,
    text: 'ह्यो दाखलो गावाच्या तलाठी कचेरीतनं मिळलो, आता पुढे काय करू?'
  },
  {
    name: 'Bhojpuri Regional Hindi (भोजपुरी बोली)',
    lang: 'hi' as LanguageCode,
    text: 'हमनी के गांव में अस्पताल में डॉक्टर ना बाड़े, दवाई के खातिर का करे के पड़ी?'
  },
  {
    name: 'Standard Devanagari Hindi (मानक हिन्दी)',
    lang: 'hi' as LanguageCode,
    text: 'डिजिटल समावेशन से प्रत्येक नागरिक को अपनी मातृभाषा में त्वरित सहायता प्राप्त होती है।'
  }
];

export const LowResourceNLP: React.FC<LowResourceNLPProps> = ({ currentLanguage }) => {
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(currentLanguage || 'mr');
  const [inputText, setInputText] = useState(
    currentLanguage === 'mr' 
      ? 'आमच्या गावाकडे यंदा कापसावर बोंडअळीचा मोठा प्रादुर्भाव झाला, काही उपाय सांगा बरं.'
      : 'डिजिटल समावेशन से प्रत्येक नागरिक को अपनी मातृभाषा में त्वरित सहायता प्राप्त होती है।'
  );
  const [analysis, setAnalysis] = useState<NLPAnalysis | null>(() =>
    aiEngine.analyzeLowResourceNLP(
      currentLanguage === 'mr' 
        ? 'आमच्या गावाकडे यंदा कापसावर बोंडअळीचा मोठा प्रादुर्भाव झाला, काही उपाय सांगा बरं.'
        : 'डिजिटल समावेशन से प्रत्येक नागरिक को अपनी मातृभाषा में त्वरित सहायता प्राप्त होती है।',
      currentLanguage || 'mr'
    )
  );

  const handleRunAnalysis = () => {
    if (!inputText.trim()) return;
    const res = aiEngine.analyzeLowResourceNLP(inputText, selectedLang);
    setAnalysis(res);
  };

  const handleLoadPreset = (preset: typeof DIALECT_PRESETS[0]) => {
    setSelectedLang(preset.lang);
    setInputText(preset.text);
    const res = aiEngine.analyzeLowResourceNLP(preset.text, preset.lang);
    setAnalysis(res);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Cpu className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">Regional Dialect & Morphological NLP Pipeline</h2>
              <p className="text-xs text-slate-400">
                POS Tagging, Named Entity Recognition (NER), Sentiment, Intent & Dialect Normalization for Marathi, Hindi & English
              </p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-amber-400 font-semibold px-2">Target Language:</span>
            <select
              value={selectedLang}
              onChange={(e) => {
                const newLang = e.target.value as LanguageCode;
                setSelectedLang(newLang);
              }}
              className="bg-slate-800 text-slate-100 font-semibold text-xs rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none"
            >
              {SUPPORTED_LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.nativeName} ({l.name})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dialect Presets Quick Buttons */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-400 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" /> Dialect Presets:
          </span>
          {DIALECT_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleLoadPreset(preset)}
              className="px-2.5 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 font-semibold transition"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2">
          <span className="font-bold text-slate-800 dark:text-slate-300">Input Regional Text ({currentLangObj?.nativeName})</span>
          <span className="text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
            Script: {currentLangObj?.script}
          </span>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full glass-input p-3.5 rounded-xl text-sm font-indic focus:outline-none focus:border-amber-500 resize-none h-24"
        />

        <div className="flex justify-end">
          <button
            onClick={handleRunAnalysis}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-saffron-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition active:scale-95"
          >
            <Zap className="w-4 h-4" />
            <span>Execute Regional NLP Pipeline</span>
          </button>
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Morphological Tokenizer & POS Tags */}
          <div className="lg:col-span-2 glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Parts of Speech (POS) & Morphological Tokenizer</h3>
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-mono font-semibold">{analysis.tokens.length} Tokens</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {analysis.tokens.map((token, idx) => (
                <div key={idx} className="flex flex-col items-center bg-slate-50 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 shadow-sm">
                  <span className="text-sm font-black text-slate-900 dark:text-slate-100 font-indic">{token.word}</span>
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 font-mono mt-0.5">{token.pos}</span>
                </div>
              ))}
            </div>

            {/* Named Entity Recognition (NER) */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider block">
                Named Entities Detected (NER)
              </span>
              <div className="flex flex-wrap gap-2">
                {analysis.entities.map((ent, idx) => (
                  <div key={idx} className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 text-xs shadow-sm">
                    <span className="font-bold text-indigo-900 dark:text-indigo-300 font-indic">{ent.text}</span>
                    <span className="text-[9px] bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded font-mono font-bold">
                      {ent.category} ({(ent.confidence * 100).toFixed(0)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sentiment, Intent & Grammar Tuning */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-5">
            
            {/* Sentiment Metric */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-slate-300">Sentiment Polarity</span>
                <span className="font-mono text-emerald-400 font-bold">{(analysis.sentimentScore * 100).toFixed(1)}%</span>
              </div>
              <div className={`p-3 rounded-xl border flex items-center space-x-3 ${
                analysis.sentiment === 'positive'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}>
                {analysis.sentiment === 'positive' ? <Smile className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <div>
                  <p className="text-xs font-bold capitalize">{analysis.sentiment} Tone</p>
                  <p className="text-[10px] text-slate-400">Regional sentence mood</p>
                </div>
              </div>
            </div>

            {/* Inferred Intent */}
            <div className="space-y-1.5">
              <span className="text-xs text-slate-400 font-semibold">Inferred User Intent</span>
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 font-mono text-xs text-saffron-400 font-semibold">
                {analysis.intent}
              </div>
            </div>

            {/* Grammar & Dialect Normalization Suggestion */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dialect Normalization
              </span>
              {analysis.grammarSuggestions.map((g, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="line-through text-red-400 font-indic">{g.original}</span>
                    <span className="text-emerald-400 font-bold font-indic">➔ {g.replacement}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">{g.reason}</p>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
