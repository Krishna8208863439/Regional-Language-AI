import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, ModuleTab } from './components/Sidebar';
import { VoiceTranslator } from './components/modules/VoiceTranslator';
import { TextTranslator } from './components/modules/TextTranslator';
import { DocumentOCR } from './components/modules/DocumentOCR';
import { AIChatAssistant } from './components/modules/AIChatAssistant';
import { LowResourceNLP } from './components/modules/LowResourceNLP';
import { VoiceCloning } from './components/modules/VoiceCloning';
import { HealthcareModule } from './components/modules/HealthcareModule';
import { AgricultureModule } from './components/modules/AgricultureModule';
import { GovernmentServices } from './components/modules/GovernmentServices';
import { EducationModule } from './components/modules/EducationModule';
import { SmartSearch } from './components/modules/SmartSearch';
import { EnhancementsHub } from './components/modules/EnhancementsHub';
import { AdminAnalytics } from './components/modules/AdminAnalytics';
import { LanguageCode, UserRole } from './types';
import { USER_ROLES, SUPPORTED_LANGUAGES } from './data/mockData';
import { Sparkles, Menu, X, Globe, UserCheck, ShieldCheck } from 'lucide-react';

export function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('hi');
  const [activeRole, setActiveRole] = useState<UserRole>('citizen');
  const [activeTab, setActiveTab] = useState<ModuleTab>('voice_translator');
  const [latencyMs, setLatencyMs] = useState(142);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fluctuate edge latency slightly for realistic telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyMs(135 + Math.floor(Math.random() * 18));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    const roleInfo = USER_ROLES.find(r => r.id === role);
    if (roleInfo) {
      showToast(`Switched persona to ${roleInfo.label}`);
    }
  };

  const handleLanguageChange = (lang: LanguageCode) => {
    setSelectedLanguage(lang);
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === lang);
    showToast(`Primary Regional Language set to ${langObj?.name} (${langObj?.nativeName})`);
  };

  const renderModuleContent = () => {
    switch (activeTab) {
      case 'voice_translator':
        return <VoiceTranslator currentLanguage={selectedLanguage} />;
      case 'text_translator':
        return <TextTranslator currentLanguage={selectedLanguage} />;
      case 'document_ocr':
        return <DocumentOCR currentLanguage={selectedLanguage} />;
      case 'ai_chat':
        return <AIChatAssistant currentLanguage={selectedLanguage} />;
      case 'low_resource_nlp':
        return <LowResourceNLP currentLanguage={selectedLanguage} />;
      case 'voice_cloning':
        return <VoiceCloning currentLanguage={selectedLanguage} />;
      case 'healthcare':
        return <HealthcareModule currentLanguage={selectedLanguage} />;
      case 'agriculture':
        return <AgricultureModule currentLanguage={selectedLanguage} />;
      case 'governance':
        return <GovernmentServices currentLanguage={selectedLanguage} />;
      case 'education':
        return <EducationModule currentLanguage={selectedLanguage} />;
      case 'smart_search':
        return <SmartSearch currentLanguage={selectedLanguage} />;
      case 'enhancements':
        return <EnhancementsHub currentLanguage={selectedLanguage} />;
      case 'admin_analytics':
        return <AdminAnalytics />;
      default:
        return <VoiceTranslator currentLanguage={selectedLanguage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-saffron-500 selection:text-white">
      
      {/* Header Bar */}
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        activeRole={activeRole}
        onRoleChange={handleRoleChange}
        latencyMs={latencyMs}
      />

      {/* Mobile Top Navigation Toggle */}
      <div className="md:hidden glass-panel px-4 py-2 flex items-center justify-between border-b border-slate-800">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center space-x-2 text-xs font-bold text-saffron-400 p-1.5 rounded-lg bg-saffron-500/10 border border-saffron-500/20"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>Toggle Modules Menu</span>
        </button>

        <span className="text-xs font-mono text-emerald-400 font-semibold">{latencyMs}ms Latency</span>
      </div>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Desktop Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setIsMobileMenuOpen(false);
          }}
          userRole={activeRole}
        />

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 space-y-4 overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="font-extrabold text-saffron-400">BharatVoice AI Modules</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-sm font-semibold">
              {[
                { id: 'voice_translator', label: '🗣️ Speech & Voice Translator' },
                { id: 'text_translator', label: '🔠 NMT Machine Translation' },
                { id: 'document_ocr', label: '📄 OCR & Document Intelligence' },
                { id: 'ai_chat', label: '🤖 Regional Conversational AI' },
                { id: 'low_resource_nlp', label: '🔬 Low-Resource NLP Engine' },
                { id: 'voice_cloning', label: '🎙️ Voice Cloning (Consent Managed)' },
                { id: 'healthcare', label: '🏥 Healthcare & Clinical Translation' },
                { id: 'agriculture', label: '🌾 Agriculture & Farmer Advisory' },
                { id: 'governance', label: '🏛️ Government Services & Forms' },
                { id: 'education', label: '🎓 Education & AI Tutor' },
                { id: 'smart_search', label: '🔎 Cross-Language Search' },
                { id: 'enhancements', label: '⚡ Sign Language & AR Vision' },
                { id: 'admin_analytics', label: '📊 Admin Telemetry & Audit' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as ModuleTab);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border ${
                    activeTab === item.id
                      ? 'bg-saffron-500/20 text-saffron-300 border-saffron-500/50'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Central Content Area */}
        <main className="flex-1 p-4 lg:p-8 min-w-0">
          {renderModuleContent()}
        </main>

      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel border border-saffron-500/40 text-saffron-300 px-4 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 text-xs font-bold animate-bounce">
          <Sparkles className="w-4 h-4 text-saffron-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
