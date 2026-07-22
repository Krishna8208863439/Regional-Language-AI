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
  const [form, setForm] = useState<GovtSchemeForm>(MOCK_GOVT_FORMS[0]);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({
    farmer_name: 'रमेश कुमार शर्मा (Ramesh Kumar Sharma)',
    aadhaar_no: '9823-4512-8809',
    land_khata: 'Khata No. 412/A, Mouza Rampur',
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

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);

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
            Voice-guided form filling, certificate applications & official public notice translations
          </p>
        </div>

        <button
          onClick={() => handleSpeakNotice(form.applicantVoicePrompt)}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md transition"
        >
          <Mic className="w-4 h-4" />
          <span>Listen Voice Prompts</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Multilingual Application Form */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="font-bold text-base text-white">{form.schemeName}</h3>
            <p className="text-xs text-amber-400 font-medium">{form.ministry}</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
            {form.fields.map((field) => (
              <div key={field.fieldId}>
                <label className="text-slate-300 font-medium block mb-1 flex items-center justify-between">
                  <span>{field.labelNative} ({field.labelEnglish})</span>
                  {field.required && <span className="text-rose-400 text-[10px]">*Required</span>}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fieldValues[field.fieldId] || ''}
                    onChange={(e) => setFieldValues({ ...fieldValues, [field.fieldId]: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-indic focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleSpeakNotice(field.labelNative)}
                    className="absolute right-2 top-2 text-slate-400 hover:text-amber-400"
                    title="Audio Label Prompt"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-saffron-500 text-slate-950 font-extrabold text-xs shadow-lg hover:brightness-110 transition flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Verify & Submit Scheme Application</span>
            </button>
          </form>
        </div>

        {/* Verification Certificate & Notice Generator */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-2">
            Automated Official Regional Notice Output
          </h3>

          {isSubmitted ? (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl space-y-3 text-xs">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Application Verified & Aadhaar eKYC Synced</span>
                </div>

                <p className="text-sm font-indic text-slate-100 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 font-medium">
                  "{form.generatedNoticeText}"
                </p>

                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
                  <span>Digital Signature: e-GOV-IND-2026-VERIFIED</span>
                  <button
                    onClick={() => handleSpeakNotice(form.generatedNoticeText)}
                    className="text-saffron-400 font-bold flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Broadcast Notice Audio
                  </button>
                </div>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Fill Another Form
              </button>
            </div>
          ) : (
            <div className="h-56 flex items-center justify-center text-xs text-slate-500 italic text-center p-4">
              Fill and submit the citizen scheme application form to generate verified official regional notice.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
