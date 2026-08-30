import React, { useState } from 'react';
import { Search, Globe, Sparkles, FileText, ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
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
  category: string;
}

const ALL_SEARCH_DOCUMENTS: SearchResultItem[] = [
  {
    id: 'doc-01',
    title: 'मुख्यमंत्री माझी लाडकी बहीण योजना - शासन निर्णय (GR)',
    language: 'mr',
    snippetNative: 'महिलांच्या सर्वांगीण विकासासाठी दरमहा ₹१,५०० थेट बँक खात्यात जमा करणारी महाराष्ट्र शासनाची महत्त्वाकांक्षी योजना.',
    snippetEnglish: 'Ambitious Maharashtra Government scheme transferring INR 1,500 monthly directly to women bank accounts.',
    relevanceScore: 98.8,
    category: 'Governance'
  },
  {
    id: 'doc-02',
    title: 'राष्ट्रीय स्वास्थ्य मिशन (NHM) नागरिक सेवा निर्देश',
    language: 'hi',
    snippetNative: 'ग्रामीण क्षेत्रों में प्राथमिक स्वास्थ्य केंद्र (PHC) द्वारा निःशुल्क औषधि, टीकाकरण एवं मातृ सुरक्षा योजना।',
    snippetEnglish: 'Free medicines, vaccinations, and maternity protection provided by Primary Health Centers in rural regions.',
    relevanceScore: 96.2,
    category: 'Healthcare'
  },
  {
    id: 'doc-03',
    title: 'Pradhan Mantri Krishi Sinchayee Yojana Guidelines',
    language: 'en',
    snippetNative: 'Subsidies and technical guidance for micro-irrigation, drip systems, and farm ponds across agricultural belts.',
    snippetEnglish: 'Subsidies and technical guidance for micro-irrigation, drip systems, and farm ponds across agricultural belts.',
    relevanceScore: 92.5,
    category: 'Agriculture'
  },
  {
    id: 'doc-04',
    title: 'महाराष्ट्र जमीन महसूल संहिता व ७/१२ उतारा डिजिटल प्रमाणीकरण',
    language: 'mr',
    snippetNative: 'डिजिटल स्वाक्षरीसह प्रमाणित ७/१२ आणि ८-अ उतारा महाभूमी पोर्टलवरून घरबसल्या मिळवण्याची कार्यपद्धती.',
    snippetEnglish: 'Workflow to obtain digitally signed 7/12 land extract from Mahabhumi portal.',
    relevanceScore: 89.4,
    category: 'Land Records'
  },
  {
    id: 'doc-05',
    title: 'पीएम-किसान सम्मान निधि एवं ई-केवाईसी सत्यापन प्रक्रिया',
    language: 'hi',
    snippetNative: 'किसानों के बैंक खातों में प्रतिवर्ष ₹6,000 की वित्तीय सहायता हेतु आधार लिंक व बायोमेट्रिक ई-केवाईसी नियम।',
    snippetEnglish: 'PM-Kisan DBT subsidy rules and mandatory biometric e-KYC guidelines.',
    relevanceScore: 87.1,
    category: 'Agriculture'
  }
];

export const SmartSearch: React.FC<SmartSearchProps> = ({ currentLanguage }) => {
  const [query, setQuery] = useState('आरोग्य आणि शेतकरी योजना (Healthcare & Agri Schemes)');
  const [results, setResults] = useState<SearchResultItem[]>(ALL_SEARCH_DOCUMENTS);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults(ALL_SEARCH_DOCUMENTS);
      return;
    }
    const q = query.toLowerCase();
    const filtered = ALL_SEARCH_DOCUMENTS.filter(
      doc =>
        doc.title.toLowerCase().includes(q) ||
        doc.snippetNative.toLowerCase().includes(q) ||
        doc.snippetEnglish.toLowerCase().includes(q) ||
        doc.category.toLowerCase().includes(q)
    );
    setResults(filtered.length > 0 ? filtered : ALL_SEARCH_DOCUMENTS);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-xl bg-teal-500/20 text-teal-700 dark:text-teal-400 border border-teal-500/30">
            <Search className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Cross-Language Multilingual Smart Search Engine</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Query in Marathi, Hindi, or English and retrieve semantically indexed public documents instantly
            </p>
          </div>
        </div>

        {/* Search Bar Input */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                const val = e.target.value;
                setQuery(val);
                if (!val.trim()) {
                  setResults(ALL_SEARCH_DOCUMENTS);
                } else {
                  const q = val.toLowerCase();
                  const filtered = ALL_SEARCH_DOCUMENTS.filter(
                    doc =>
                      doc.title.toLowerCase().includes(q) ||
                      doc.snippetNative.toLowerCase().includes(q) ||
                      doc.snippetEnglish.toLowerCase().includes(q) ||
                      doc.category.toLowerCase().includes(q)
                  );
                  setResults(filtered.length > 0 ? filtered : ALL_SEARCH_DOCUMENTS);
                }
              }}
              placeholder="Search in Marathi (मराठी), Hindi (हिन्दी), or English..."
              className="w-full glass-input rounded-xl px-4 py-3 text-sm font-indic text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-semibold focus:outline-none focus:border-teal-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-lg shadow-teal-500/20 transition active:scale-95 cursor-pointer shrink-0"
          >
            Semantic Search
          </button>
        </form>
      </div>

      {/* Results Feed */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400 px-1 font-semibold">
          <span>Found {results.length} Cross-Language Matches</span>
          <span className="font-mono text-teal-700 dark:text-teal-400 font-bold">FAISS Dense Vector Index: 3 Languages Active</span>
        </div>

        {results.map((res) => {
          const langObj = SUPPORTED_LANGUAGES.find(l => l.code === res.language);
          return (
            <div key={res.id} className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 hover:border-teal-500/50 transition">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-saffron-700 dark:text-saffron-400 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold font-indic">
                    {langObj?.nativeName || res.language}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white font-indic">{res.title}</h3>
                </div>

                <span className="text-[10px] font-mono bg-teal-500/20 text-teal-800 dark:text-teal-300 px-2 py-0.5 rounded-lg font-bold">
                  Relevance: {res.relevanceScore}%
                </span>
              </div>

              <p className="text-sm font-indic text-slate-900 dark:text-slate-200 leading-relaxed font-semibold">
                "{res.snippetNative}"
              </p>

              {res.language !== 'en' && (
                <p className="text-xs text-slate-600 dark:text-slate-400 italic font-medium">
                  English contextual translation: {res.snippetEnglish}
                </p>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
