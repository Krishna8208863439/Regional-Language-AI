import React, { useState } from 'react';
import { Search, Globe, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { LanguageCode } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';

interface SmartSearchProps {
  currentLanguage: LanguageCode;
}

interface SearchResultItem {
  id: string;
  title: string;
  language: LanguageCode;
  snippetNative: string;
  snippetEnglish: string;
  relevanceScore: number;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ currentLanguage }) => {
  const [query, setQuery] = useState('स्वास्थ्य केंद्र योजना (Healthcare Scheme)');
  const [results, setResults] = useState<SearchResultItem[]>([
    {
      id: 'doc-01',
      title: 'राष्ट्रीय स्वास्थ्य मिशन (NHM) नागरिक सेवा निर्देश',
      language: 'hi',
      snippetNative: 'ग्रामीण क्षेत्रों में प्राथमिक स्वास्थ्य केंद्र द्वारा निःशुल्क औषधि एवं मातृ सुरक्षा योजना।',
      snippetEnglish: 'Free medicines & maternity protection scheme provided by Primary Health Centers in rural areas.',
      relevanceScore: 98.4
    },
    {
      id: 'doc-02',
      title: 'ஆரோக்கிய திட்ட விண்ணப்பப் படிவம் (Health Application)',
      language: 'ta',
      snippetNative: 'குடும்ப அட்டைதாரர்களுக்கான இலவச மருத்துவ காப்பீட்டுத் திட்டம்.',
      snippetEnglish: 'Free medical insurance scheme for ration card holders.',
      relevanceScore: 94.1
    },
    {
      id: 'doc-03',
      title: 'आरोग्य योजना नियम आणि अटी (Health Rules)',
      language: 'mr',
      snippetNative: 'सार्वजनिक आरोग्य विभागांतर्गत मोफत तपासणी सुविधा.',
      snippetEnglish: 'Free diagnostic examination facilities under Public Health Department.',
      relevanceScore: 91.8
    }
  ]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate query refresh
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <Search className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-white">Cross-Language Multilingual Smart Search Engine</h2>
            <p className="text-xs text-slate-400">
              Query in one language and retrieve indexed semantic results across 22+ regional Indian scripts
            </p>
          </div>
        </div>

        {/* Search Bar Input */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search in English or any Indian language script..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-teal-500 font-indic"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-500/20 transition"
          >
            Semantic Search
          </button>
        </form>
      </div>

      {/* Results Feed */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-400 px-1">
          <span>Found {results.length} Cross-Language Matches</span>
          <span className="font-mono text-teal-400">Dense Vector Index: Indexed</span>
        </div>

        {results.map((res) => {
          const langObj = SUPPORTED_LANGUAGES.find(l => l.code === res.language);
          return (
            <div key={res.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2 hover:border-teal-500/40 transition">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 bg-slate-800 text-saffron-400 border border-slate-700 rounded text-xs font-bold font-indic">
                    {langObj?.nativeName || res.language}
                  </span>
                  <h3 className="font-bold text-sm text-white font-indic">{res.title}</h3>
                </div>

                <span className="text-[10px] font-mono bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded font-bold">
                  Relevance: {res.relevanceScore}%
                </span>
              </div>

              <p className="text-sm font-indic text-slate-200 leading-relaxed font-medium">
                "{res.snippetNative}"
              </p>

              <p className="text-xs text-slate-400 italic">
                English contextual translation: {res.snippetEnglish}
              </p>
            </div>
          );
        })}
      </div>

    </div>
  );
};
