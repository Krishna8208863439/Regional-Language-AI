import React, { useState } from 'react';
import { 
  Landmark, 
  Mic, 
  Volume2, 
  CheckCircle2, 
  FileCheck, 
  Sparkles, 
  Download, 
  Send 
} from 'lucide-react';
import { LanguageCode, GovtSchemeForm } from '../../types';
import { MOCK_GOVT_FORMS, SUPPORTED_LANGUAGES } from '../../data/mockData';
import { aiEngine } from '../../services/aiEngine';

interface GovernmentServicesProps {
  currentLanguage: LanguageCode;
}

export const GovernmentServices: React.FC<GovernmentServicesProps> = ({ currentLanguage }) => {
  const [selectedFormIndex, setSelectedFormIndex] = useState(0);
  const form = MOCK_GOVT_FORMS[selectedFormIndex] || MOCK_GOVT_FORMS[0];

  const [fieldValues, setFieldValues] = useState<Record<string, string>>({
    beneficiary_name: 'सुनिता गणेश पाटील (Sunita Ganesh Patil)',
    farmer_name: 'रमेश कुमार शर्मा (Ramesh Kumar Sharma)',
    aadhaar_no: '7482-9012-3341',
    bank_account: '401288920194 (Bank of Maharashtra)',
    family_income: '₹1,20,000',
    land_khata: 'Gat No. 142/A, Mouza Rampur',
    bank_ifsc: 'SBIN0001420'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSpeakNotice = (text: string) => {
    aiEngine.speakText(text, currentLanguage);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Landmark className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white">Government Services & Multilingual Form Assistant</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Voice-guided form filling, certificate applications & official public notice broadcast in Marathi, Hindi & English
          </p>
        </div>

        {/* Scheme Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-semibold">Select Scheme:</span>
          <select
            value={selectedFormIndex}
            onChange={(e) => {
              setSelectedFormIndex(parseInt(e.target.value));
              setIsSubmitted(false);
            }}
            className="bg-slate-900 text-amber-400 font-bold text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none"
          >
            {MOCK_GOVT_FORMS.map((f, idx) => (
              <option key={f.id} value={idx}>{f.schemeName}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Multilingual Application Form */}
        <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex justify-between items-start">
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white">{form.schemeName}</h3>
              <p className="text-xs text-amber-800 dark:text-amber-400 font-bold mt-0.5">{form.ministry}</p>
            </div>
            <button
              onClick={() => handleSpeakNotice(form.applicantVoicePrompt)}
              className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
              title="Voice Prompt"
            >
              <Volume2 className="w-3.5 h-3.5" /> Prompt
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
            {form.fields.map((field) => (
              <div key={field.fieldId}>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1 flex items-center justify-between">
                  <span>{field.labelNative} ({field.labelEnglish})</span>
                  {field.required && <span className="text-rose-600 dark:text-rose-400 text-[10px] font-bold">*Required</span>}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fieldValues[field.fieldId] || field.value}
                    onChange={(e) => setFieldValues({ ...fieldValues, [field.fieldId]: e.target.value })}
                    className="w-full glass-input rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-bold font-indic focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleSpeakNotice(field.labelNative)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-amber-600 cursor-pointer"
                    title="Audio Label Prompt"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-saffron-500 text-slate-950 font-black text-xs shadow-lg hover:brightness-110 transition flex items-center justify-center space-x-2 active:scale-95 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Verify & Submit Scheme Application (अर्ज सादर करा)</span>
            </button>
          </form>
        </div>

        {/* Verification Certificate & Notice Generator */}
        <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">
            Automated Official Regional Notice & DBT Verification
          </h3>

          {isSubmitted ? (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 rounded-2xl space-y-3 text-xs shadow-sm">
                <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Application Verified & Aadhaar eKYC DBT Synced</span>
                </div>

                <p className="text-sm font-indic text-slate-900 dark:text-slate-100 leading-relaxed bg-white dark:bg-slate-950/80 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-semibold shadow-inner">
                  "{form.generatedNoticeText}"
                </p>

                <div className="flex justify-between items-center text-[10px] text-slate-600 dark:text-slate-400 pt-1">
                  <span className="font-mono font-bold">Digital Signature: e-GOV-2026-VERIFIED</span>
                  <button
                    onClick={() => handleSpeakNotice(form.generatedNoticeText)}
                    className="text-saffron-600 dark:text-saffron-400 hover:text-saffron-500 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Broadcast Notice Voice
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-xs text-slate-400 text-center p-6 space-y-2">
              <FileCheck className="w-8 h-8 text-slate-600 mb-1" />
              <p className="font-semibold text-slate-300">Awaiting Citizen Submission</p>
              <p className="text-[11px] text-slate-500 max-w-xs">
                Fill and submit the citizen scheme application form to generate a certified regional notice with digital signature.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
