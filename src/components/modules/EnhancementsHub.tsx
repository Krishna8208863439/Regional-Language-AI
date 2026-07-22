import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  Volume2, 
  Mic, 
  Globe, 
  Camera, 
  Bookmark, 
  Layers, 
  Play 
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { MOCK_SIGN_LANGUAGE_ITEMS, SUPPORTED_LANGUAGES } from '../../data/mockData';
import { aiEngine } from '../../services/aiEngine';

interface EnhancementsHubProps {
  currentLanguage: LanguageCode;
}

export const EnhancementsHub: React.FC<EnhancementsHubProps> = ({ currentLanguage }) => {
  const [activeTab, setActiveTab] = useState<'sign' | 'ar' | 'preservation'>('sign');
  const [activeSignIndex, setActiveSignIndex] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [preservedStories, setPreservedStories] = useState([
    { dialect: 'Santali (Ol Chiki)', story: 'ᱥᱟᱱᱛᱟᱲᱤ ᱠᱟᱹᱦᱱᱤ - ᱫᱟᱨᱮ, ᱫᱟ cross-regional folk tale', audioLength: '03:42' },
    { dialect: 'Manipuri (Meitei)', story: 'ꯃꯩꯇꯩꯂꯣꯟ ꯐꯨꯡꯒꯥꯋꯥꯔꯤ - Ancient Meitei oral story', audioLength: '04:15' }
  ]);

  const currentSignItem = MOCK_SIGN_LANGUAGE_ITEMS[activeSignIndex];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white">Innovation & Regional AI Enhancement Suite</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Sign language translation, AR live camera translation & endangered language documentation
          </p>
        </div>

        {/* Feature Selector Tabs */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('sign')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'sign' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Sign Language AI
          </button>
          <button
            onClick={() => setActiveTab('ar')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'ar' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            AR Camera Live
          </button>
          <button
            onClick={() => setActiveTab('preservation')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'preservation' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Language Preservation
          </button>
        </div>
      </div>

      {activeTab === 'sign' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Sign Notation Player */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 text-center">
            <h3 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-2">
              Indian Sign Language (ISL) Visualizer
            </h3>

            <div className="bg-slate-950 p-8 rounded-2xl border border-teal-500/30 space-y-3">
              <span className="text-6xl block">{currentSignItem.animationFrames[0]}</span>
              <h4 className="font-extrabold text-white text-base font-indic">{currentSignItem.phrase}</h4>
              <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded font-mono text-xs">
                Notation: {currentSignItem.signNotation}
              </span>
            </div>

            <div className="space-y-1 text-left text-xs">
              <span className="font-bold text-slate-400 block mb-1">Hand Gesture Sequence:</span>
              {currentSignItem.handGestures.map((gesture, idx) => (
                <div key={idx} className="bg-slate-900 p-2 rounded-lg border border-slate-800 text-slate-300">
                  Step {idx + 1}: {gesture}
                </div>
              ))}
            </div>
          </div>

          {/* Gestures List */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-2">
              ISL Regional Dictionary
            </h3>

            {MOCK_SIGN_LANGUAGE_ITEMS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSignIndex(idx)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition ${
                  activeSignIndex === idx
                    ? 'bg-teal-950/40 border-teal-500/50 text-teal-100 font-bold'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                {item.phrase}
              </button>
            ))}
          </div>

        </div>
      )}

      {activeTab === 'ar' && (
        <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="font-bold text-base text-white border-b border-slate-800 pb-2">
            Augmented Reality (AR) Live Camera Overlay Simulation
          </h3>

          <div className="relative bg-slate-950 rounded-2xl p-8 border border-slate-800 min-h-[300px] flex flex-col items-center justify-center space-y-4 overflow-hidden">
            {isCameraActive ? (
              <div className="space-y-3">
                <div className="p-3 bg-teal-500/20 text-teal-200 border border-teal-500/40 rounded-xl text-xs font-bold animate-pulse">
                  AR HUD Active: Scanning Real-world signs & street noticeboards...
                </div>
                <div className="p-4 bg-saffron-950/80 border border-saffron-500/60 rounded-xl text-sm font-indic text-saffron-200 font-bold shadow-xl">
                  [AR Live Text Translated]: "कृपया बाएँ मुड़ें - शासकीय प्राथमिक चिकित्सा केंद्र 200m"
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Camera className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">Click below to activate AR camera live translation feed</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCameraActive(!isCameraActive)}
            className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg"
          >
            {isCameraActive ? 'Stop AR Feed' : 'Launch AR Live Translation Camera'}
          </button>
        </div>
      )}

      {activeTab === 'preservation' && (
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-2 flex justify-between items-center">
            <h3 className="font-bold text-sm text-white">Endangered Language Documentation & Audio Archive</h3>
            <button className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold">
              Record Dialect Story
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {preservedStories.map((item, idx) => (
              <div key={idx} className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-400 block">{item.dialect}</span>
                  <span className="text-slate-300 font-indic">{item.story}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] text-slate-500 font-mono">{item.audioLength}</span>
                  <button className="p-1.5 bg-slate-800 text-saffron-400 rounded-lg">
                    <Play className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
