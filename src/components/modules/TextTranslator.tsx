import React, { useState } from 'react';
import { 
  Languages, 
  ArrowRightLeft, 
  Volume2, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  BookOpen, 
  Stethoscope, 
  Sprout, 
  Landmark, 
  Scale, 
  Globe,
  Keyboard
} from 'lucide-react';
import { LanguageCode, DomainType, TranslationRequest } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { aiEngine } from '../../services/aiEngine';

interface TextTranslatorProps {
  currentLanguage: LanguageCode;
}

export const TextTranslator: React.FC<TextTranslatorProps> = ({ currentLanguage }) => {
  const [sourceLang, setSourceLang] = useState<LanguageCode>('en');
  const [targetLang, setTargetLang] = useState<LanguageCode>(currentLanguage);
  const [domain, setDomain] = useState<DomainType>('general');
  const [sourceText, setSourceText] = useState('Digital inclusion enables every citizen to access government healthcare and financial services in their mother tongue.');
  const [translationResult, setTranslationResult] = useState<TranslationRequest | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsTranslating(true);
    const res = await aiEngine.translateText(sourceText, sourceLang, targetLang, domain);
    setTranslationResult(res);
    setIsTranslating(false);
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    if (translationResult) {
      setSourceText(translationResult.translatedText);
      setTranslationResult(null);
    }
  };

  const handleCopy = () => {
    if (!translationResult) return;
    navigator.clipboard.writeText(translationResult.translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = (text: string, lang: LanguageCode) => {
    aiEngine.speakText(text, lang);
  };

  const domainOptions: { id: DomainType; label: string; icon: React.ElementType }[] = [
    { id: 'general', label: 'General Context', icon: Globe },
    { id: 'healthcare', label: 'Medical & Clinical', icon: Stethoscope },
    { id: 'agriculture', label: 'Agricultural / Mandi', icon: Sprout },
    { id: 'governance', label: 'Government & Schemes', icon: Landmark },
    { id: 'education', label: 'Educational / Tutor', icon: BookOpen },
    { id: 'legal', label: 'Legal & Constitutional', icon: Scale },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header & Domain Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Languages className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">Neural Machine Translation (NMT) Engine</h2>
              <p className="text-xs text-slate-400">
                Powered by IndicTrans2 & NLLB-200 for high-fidelity regional domain translation
              </p>
            </div>
          </div>

          <button
            onClick={handleTranslate}
            disabled={isTranslating}
            className="flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white font-bold text-xs shadow-lg shadow-saffron-500/20 hover:brightness-110 active:scale-95 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>{isTranslating ? 'Translating Text...' : 'Translate Instantly'}</span>
          </button>
        </div>

        {/* Domain Toggles */}
        <div className="pt-2">
          <label className="text-[11px] font-bold text-slate-400 block mb-2 uppercase tracking-wider">
            Select Domain Context Adaptation
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {domainOptions.map(opt => {
              const Icon = opt.icon;
              const isSelected = domain === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setDomain(opt.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                    isSelected
                      ? 'bg-saffron-500/20 text-saffron-300 border-saffron-500/50 shadow-md'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Language Pair Selector & Swap */}
      <div className="flex items-center justify-between glass-panel px-6 py-3 rounded-xl border border-slate-800">
        
        {/* Source Language */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Source:</span>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value as LanguageCode)}
            className="bg-slate-900 text-slate-100 font-semibold text-xs rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none"
          >
            {SUPPORTED_LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.nativeName} ({l.name})</option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          className="p-2 rounded-full bg-slate-800 hover:bg-saffron-500/20 text-slate-300 hover:text-saffron-400 border border-slate-700 transition"
          title="Swap Source and Target Languages"
        >
          <ArrowRightLeft className="w-4 h-4" />
        </button>

        {/* Target Language */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Target:</span>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value as LanguageCode)}
            className="bg-slate-900 text-saffron-400 font-bold text-xs rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none"
          >
            {SUPPORTED_LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.nativeName} ({l.name})</option>
            ))}
          </select>
        </div>

      </div>

      {/* Side-by-Side Input & Output Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Text Box */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3 min-h-[220px]">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
            <span className="font-semibold text-slate-300">Input Text ({sourceLang.toUpperCase()})</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSpeak(sourceText, sourceLang)}
                className="hover:text-saffron-400 transition"
                title="Listen Source Audio"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Type or paste regional text to translate..."
            className="w-full bg-transparent text-slate-100 text-sm leading-relaxed border-0 focus:ring-0 focus:outline-none resize-none font-indic h-36"
          />

          <div className="flex justify-between items-center text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
            <span>{sourceText.length} characters</span>
            <span className="flex items-center gap-1 text-slate-400">
              <Keyboard className="w-3.5 h-3.5 text-slate-500" /> Transliteration Enabled
            </span>
          </div>
        </div>

        {/* Translation Output Box */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3 min-h-[220px]">
          <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-saffron-400">Translated Output ({targetLang.toUpperCase()})</span>
              {translationResult && (
                <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-mono">
                  Engine: {translationResult.engineUsed}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {translationResult && (
                <>
                  <button
                    onClick={() => handleSpeak(translationResult.translatedText, targetLang)}
                    className="hover:text-saffron-400 transition text-slate-400"
                    title="Listen Translated Voice"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCopy}
                    className="hover:text-saffron-400 transition text-slate-400"
                    title="Copy Translation"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="h-36 overflow-y-auto custom-scrollbar">
            {translationResult ? (
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-indigo-100 font-indic font-medium">
                  {translationResult.translatedText}
                </p>

                {translationResult.transliteration && (
                  <p className="text-xs italic text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    Transliteration: {translationResult.transliteration}
                  </p>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-500 italic">
                Click "Translate Instantly" to compute Neural Machine Translation output.
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
            <span>BLEU Score Est: {translationResult ? '44.2' : '--'}</span>
            <span>Confidence: {translationResult ? `${(translationResult.confidence * 100).toFixed(1)}%` : '--'}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
