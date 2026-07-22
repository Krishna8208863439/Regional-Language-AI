import React, { useState } from 'react';
import { 
  Stethoscope, 
  Volume2, 
  AlertTriangle, 
  FileText, 
  CheckCircle, 
  Play, 
  PlusCircle 
} from 'lucide-react';
import { LanguageCode, HealthcareSymptomCard } from '../../types';
import { MOCK_HEALTHCARE_DATA, SUPPORTED_LANGUAGES } from '../../data/mockData';
import { aiEngine } from '../../services/aiEngine';

interface HealthcareModuleProps {
  currentLanguage: LanguageCode;
}

export const HealthcareModule: React.FC<HealthcareModuleProps> = ({ currentLanguage }) => {
  const [selectedCase, setSelectedCase] = useState<HealthcareSymptomCard>(MOCK_HEALTHCARE_DATA[0]);
  const [activeTab, setActiveTab] = useState<'translator' | 'prescription'>('translator');

  const handleSpeakMedical = (text: string) => {
    aiEngine.speakText(text, currentLanguage);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Stethoscope className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white">AI Healthcare & Clinical Multilingual Portal</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time patient-doctor symptom translation, triage prioritization & prescription audio instructions
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('translator')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'translator' ? 'bg-rose-500 text-white' : 'text-slate-400'
            }`}
          >
            Symptom Translator
          </button>
          <button
            onClick={() => setActiveTab('prescription')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'prescription' ? 'bg-rose-500 text-white' : 'text-slate-400'
            }`}
          >
            Prescription Voice Reader
          </button>
        </div>
      </div>

      {activeTab === 'translator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Clinical Cases List */}
          <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2">
              Patient Triage Queues
            </h3>

            <div className="space-y-2">
              {MOCK_HEALTHCARE_DATA.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCase(item)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                    selectedCase.id === item.id
                      ? 'bg-rose-950/40 border-rose-500/50 text-rose-100 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{item.id}</span>
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                      item.urgencyLevel === 'Emergency' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {item.urgencyLevel}
                    </span>
                  </div>
                  <p className="font-indic text-slate-200 line-clamp-2">{item.chiefComplaint}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Case Detail & Translation */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 lg:col-span-2">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs text-slate-400">Selected Triage Patient Case:</span>
                <h3 className="font-bold text-base text-white">{selectedCase.id}</h3>
              </div>

              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  {selectedCase.urgencyLevel} Priority
                </span>
              </div>
            </div>

            {/* Symptoms Tags */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Chief Symptoms:</label>
              <div className="flex flex-wrap gap-1.5">
                {selectedCase.symptoms.map((symptom, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-900 text-rose-300 rounded-lg border border-slate-800 text-xs font-semibold">
                    {symptom}
                  </span>
                ))}
              </div>
            </div>

            {/* Translated Summary Card */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-rose-400">
                  Regional Medical Summary ({currentLangObj?.nativeName})
                </span>
                <button
                  onClick={() => handleSpeakMedical(selectedCase.translatedMedicalSummary[currentLanguage] || selectedCase.translatedMedicalSummary['hi'])}
                  className="flex items-center space-x-1 text-saffron-400 hover:text-saffron-300 font-semibold"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen Medical Instructions</span>
                </button>
              </div>

              <p className="text-sm font-indic leading-relaxed text-slate-100 bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                "{selectedCase.translatedMedicalSummary[currentLanguage] || selectedCase.translatedMedicalSummary['hi']}"
              </p>
            </div>

            {/* Triage Protocol Notes */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
              <span className="font-bold text-slate-300 block mb-1">Nurse Triage Guidance:</span>
              <p>{selectedCase.triageNotes}</p>
            </div>

          </div>

        </div>
      ) : (
        /* Prescription Voice Reader View */
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 max-w-2xl mx-auto">
          <h3 className="font-bold text-base text-white border-b border-slate-800 pb-2">
            Multilingual Prescription Voice Instructions
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 block">Medicine 1: Paracetamol 500mg</span>
              <p className="text-slate-300 font-indic">
                दिन में 3 बार भोजन के बाद 1 गोली पानी के साथ लें। (Take 1 tablet after meals 3 times a day)
              </p>
              <button
                onClick={() => handleSpeakMedical("दिन में 3 बार भोजन के बाद 1 गोली पानी के साथ लें।")}
                className="text-saffron-400 font-bold flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> Play Audio Guide
              </button>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-rose-400 block">Medicine 2: Amoxicillin 250mg</span>
              <p className="text-slate-300 font-indic">
                सुबह और शाम 5 दिनों तक लें। (Take morning & evening for 5 days)
              </p>
              <button
                onClick={() => handleSpeakMedical("सुबह और शाम 5 दिनों तक लें।")}
                className="text-saffron-400 font-bold flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" /> Play Audio Guide
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
