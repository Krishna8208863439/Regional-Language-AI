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
  Zap 
} from 'lucide-react';
import { LanguageCode, NLPAnalysis } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { aiEngine } from '../../services/aiEngine';

interface LowResourceNLPProps {
  currentLanguage: LanguageCode;
}

export const LowResourceNLP: React.FC<LowResourceNLPProps> = ({ currentLanguage }) => {
  const [selectedLang, setSelectedLang] = useState<LanguageCode>('sat'); // Default Santali
  const [inputText, setInputText] = useState('ᱵᱷᱟᱨᱚᱛᱵᱷᱚᱭᱮᱥ ᱮᱟᱟᱭ ᱨᱮ ᱟᱯᱱᱟᱨᱟᱜ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ᱾ ᱥᱟᱱᱛᱟᱲᱤ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱨᱚᱲ ᱢᱮ᱾');
  const [analysis, setAnalysis] = useState<NLPAnalysis | null>(() =>
    aiEngine.analyzeLowResourceNLP('ᱵᱷᱟᱨᱚᱛᱵᱷᱚᱭᱮᱥ ᱮᱟᱟᱭ ᱨᱮ ᱟᱯᱱᱟᱨᱟᱜ ᱥᱟᱹᱜᱩᱱ ᱫᱟᱨᱟᱢ᱾ ᱥᱟᱱᱛᱟᱲᱤ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱨᱚᱲ ᱢᱮ᱾', 'sat')
  );

  const handleRunAnalysis = () => {
    if (!inputText.trim()) return;
    const res = aiEngine.analyzeLowResourceNLP(inputText, selectedLang);
    setAnalysis(res);
  };

  const lowResLanguages = SUPPORTED_LANGUAGES.filter(l => l.lowResource || l.code === 'hi');
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLang);

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
              <h2 className="text-lg font-bold text-white">Low-Resource Language NLP Engine & Pipeline</h2>
              <p className="text-xs text-slate-400">
                Tokenization, NER, Intent Detection, POS Tagging & Grammar for dialects with limited training data
              </p>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-amber-400 font-semibold px-2">Low-Resource Target:</span>
            <select
              value={selectedLang}
              onChange={(e) => {
                const newLang = e.target.value as LanguageCode;
                setSelectedLang(newLang);
              }}
              className="bg-slate-800 text-slate-100 font-semibold text-xs rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none"
            >
              {lowResLanguages.map(l => (
                <option key={l.code} value={l.code}>{l.nativeName} ({l.name}) - {l.script}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Input Box */}
      <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2">
          <span className="font-semibold text-slate-300">Input Script String ({currentLangObj?.name})</span>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono">
            Script: {currentLangObj?.script}
          </span>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-slate-100 text-sm font-indic focus:outline-none focus:border-amber-500 resize-none h-24"
        />

        <div className="flex justify-end">
          <button
            onClick={handleRunAnalysis}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 transition"
          >
            <Zap className="w-4 h-4" />
            <span>Execute Low-Resource NLP Pipeline</span>
          </button>
        </div>
      </div>

      {/* Pipeline Artifacts Display */}
      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Tokens & POS Tags */}
          <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-3 lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-amber-400" /> Tokenizer & POS Tagger Breakdown
              </span>
              <span className="text-slate-400">{analysis.tokens.length} Tokens Parsed</span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {analysis.tokens.map((token, idx) => (
                <div key={idx} className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl text-center shadow-sm">
                  <span className="block text-xs font-bold text-amber-300 font-indic">{token.word}</span>
                  <span className="text-[9px] text-slate-400 font-mono block mt-0.5">{token.pos} ({token.tag})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sentiment & Intent Meter */}
          <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-2 text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Sentiment & Intent Classification
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Sentiment:</span>
                <span className="flex items-center gap-1 font-bold text-emerald-400">
                  <Smile className="w-4 h-4" /> POSITIVE ({(analysis.sentimentScore * 100).toFixed(0)}%)
                </span>
              </div>

              <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-400">Detected Intent:</span>
                <span className="font-mono text-saffron-400 font-bold">{analysis.intent}</span>
              </div>
            </div>
          </div>

          {/* Named Entity Recognition (NER) */}
          <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="border-b border-slate-800 pb-2 text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-teal-400" /> Named Entity Recognition (NER)
            </div>

            <div className="space-y-2">
              {analysis.entities.map((ent, idx) => (
                <div key={idx} className="flex justify-between items-center bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <span className="font-bold text-teal-300 font-indic">{ent.text}</span>
                  <span className="px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded text-[10px] font-mono font-semibold">
                    {ent.category}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Grammar & Spell Corrector */}
          <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-3 lg:col-span-2">
            <div className="border-b border-slate-800 pb-2 text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Low-Resource Grammar & Spell Corrector
            </div>

            <div className="space-y-2">
              {analysis.grammarSuggestions.map((sug, idx) => (
                <div key={idx} className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2 font-indic">
                    <span className="line-through text-rose-400">{sug.original}</span>
                    <span className="text-slate-400">➔</span>
                    <span className="text-emerald-400 font-bold">{sug.replacement}</span>
                  </div>
                  <span className="text-[11px] text-slate-400 italic">{sug.reason}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
