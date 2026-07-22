import React, { useState } from 'react';
import { 
  Sprout, 
  Volume2, 
  CloudRain, 
  TrendingUp, 
  Mic, 
  AlertCircle, 
  Search 
} from 'lucide-react';
import { LanguageCode, AgricultureAdvisory } from '../../types';
import { MOCK_AGRICULTURE_DATA, SUPPORTED_LANGUAGES } from '../../data/mockData';
import { aiEngine } from '../../services/aiEngine';

interface AgricultureModuleProps {
  currentLanguage: LanguageCode;
}

export const AgricultureModule: React.FC<AgricultureModuleProps> = ({ currentLanguage }) => {
  const [selectedAdvisory, setSelectedAdvisory] = useState<AgricultureAdvisory>(MOCK_AGRICULTURE_DATA[0]);

  const handleSpeakAgri = (text: string) => {
    aiEngine.speakText(text, currentLanguage);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Sprout className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white">AI Agriculture & Farmer Multilingual Advisory</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Voice-enabled crop disease diagnosis, real-time Mandi rates & regional weather alerts
          </p>
        </div>

        <button
          onClick={() => handleSpeakAgri("किसान भाईयों, अपनी फसल की बीमारी का नाम बोलें या फोटो अपलोड करें।")}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition"
        >
          <Mic className="w-4 h-4" />
          <span>Ask Question in Native Voice</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Crop Selection */}
        <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-3">
          <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
            Select Farmer Advisory Record
          </h3>

          <div className="space-y-2">
            {MOCK_AGRICULTURE_DATA.map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedAdvisory(item)}
                className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                  selectedAdvisory.id === item.id
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-100 shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-emerald-400">{item.crop}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.id}</span>
                </div>
                <p className="text-slate-300 line-clamp-1">{item.query}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Advisory Detail */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-5 lg:col-span-2">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs text-slate-400">Target Crop:</span>
              <h3 className="font-bold text-lg text-white">{selectedAdvisory.crop}</h3>
            </div>

            <button
              onClick={() => handleSpeakAdvisory(selectedAdvisory.remedyNative)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-saffron-500 hover:bg-saffron-600 text-white rounded-xl text-xs font-bold shadow"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Advisory Voice</span>
            </button>
          </div>

          {/* Issue & Remedy */}
          <div className="space-y-3">
            <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-semibold">Detected Problem:</span>
              <p className="text-xs font-bold text-amber-400">{selectedAdvisory.detectedIssue}</p>
            </div>

            <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/30 space-y-2">
              <span className="text-xs font-bold text-emerald-300 block">
                Regional Remedy ({currentLangObj?.nativeName}):
              </span>
              <p className="text-sm font-indic text-slate-100 leading-relaxed font-medium">
                "{selectedAdvisory.remedyNative}"
              </p>
              <p className="text-xs text-slate-400 italic">
                English translation: {selectedAdvisory.remedyEnglish}
              </p>
            </div>
          </div>

          {/* Mandi Rates & Weather Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Mandi Market Rates
              </span>
              <p className="text-sm font-extrabold text-white">{selectedAdvisory.marketPrice}</p>
            </div>

            <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-semibold">
                <CloudRain className="w-3.5 h-3.5 text-cyan-400" /> Regional Weather Alert
              </span>
              <p className="text-xs text-cyan-200">{selectedAdvisory.weatherWarning}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );

  function handleSpeakAdvisory(text: string) {
    aiEngine.speakText(text, currentLanguage);
  }
};
