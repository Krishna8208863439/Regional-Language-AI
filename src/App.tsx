import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, ModuleTab } from './components/Sidebar';
import { AuthModal } from './components/AuthModal';
import { AuthScreen } from './components/AuthScreen';
import { TextTranslator } from './components/modules/TextTranslator';
import { DocumentOCR } from './components/modules/DocumentOCR';
import { AIChatAssistant } from './components/modules/AIChatAssistant';
import { LowResourceNLP } from './components/modules/LowResourceNLP';
import { VoiceCloning } from './components/modules/VoiceCloning';
import { HealthcareModule } from './components/modules/HealthcareModule';
import { AgricultureModule } from './components/modules/AgricultureModule';
import { GovernmentServices } from './components/modules/GovernmentServices';
import { SmartSearch } from './components/modules/SmartSearch';
import { AdminAnalytics } from './components/modules/AdminAnalytics';
import { LanguageCode, UserRole, UserAccount } from './types';
import { USER_ROLES, SUPPORTED_LANGUAGES, DEMO_USERS } from './data/mockData';
import { UI_TRANSLATIONS } from './data/translations';
import { Sparkles, Menu, X, ShieldCheck } from 'lucide-react';

export function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('mr');
  const [activeRole, setActiveRole] = useState<UserRole>('citizen');
  const [activeTab, setActiveTab] = useState<ModuleTab>('text_translator');
  const [latencyMs, setLatencyMs] = useState(142);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Authentication State: First time visitors must Create Account / Sign In
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('bv_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null; // Prompt Auth Screen first!
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register' | 'forgot'>('login');

  // Dark & Light Mode Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('bv_theme');
    if (saved) return saved === 'dark';
    return true; // Default Dark Cyber Theme
  });

  const t = UI_TRANSLATIONS[selectedLanguage] || UI_TRANSLATIONS.mr;

  // Apply dark class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('bv_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('bv_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    showToast(!isDarkMode ? '🌙 Dark Mode Activated' : '☀️ Light Mode Activated');
  };

  // Edge latency fluctuation for live telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyMs(135 + Math.floor(Math.random() * 16));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    const roleInfo = t.roles[role] || USER_ROLES.find(r => r.id === role);
    if (roleInfo) {
      showToast(`Switched persona to ${roleInfo.label}`);
    }
  };

  const handleLanguageChange = (lang: LanguageCode) => {
    setSelectedLanguage(lang);
    const langObj = SUPPORTED_LANGUAGES.find(l => l.code === lang);
    showToast(`Regional Language set to ${langObj?.nativeName} (${langObj?.name})`);
  };

  const handleOpenAuthModal = (tab: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    localStorage.setItem('bv_user', JSON.stringify(user));
    if (user.preferredLanguage) setSelectedLanguage(user.preferredLanguage);
    if (user.role) {
      setActiveRole(user.role);
      // Auto route to role-relevant module
      if (user.role === 'student' || user.role === 'teacher') {
        setActiveTab('text_translator');
      } else if (user.role === 'farmer') {
        setActiveTab('agriculture');
      } else if (user.role === 'healthcare_worker') {
        setActiveTab('healthcare');
      } else if (user.role === 'citizen' || user.role === 'govt_officer') {
        setActiveTab('governance');
      } else if (user.role === 'admin') {
        setActiveTab('admin_analytics');
      }
    }
    showToast(`Welcome, ${user.name}! Access granted.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bv_user');
    showToast('Signed out of BharatVoice AI.');
  };

  // If user is NOT authenticated yet, show full Auth Screen first!
  if (!currentUser) {
    return (
      <AuthScreen
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onLoginSuccess={handleLoginSuccess}
      />
    );
  }

  const renderModuleContent = () => {
    switch (activeTab) {
      case 'text_translator':
        return <TextTranslator currentLanguage={selectedLanguage} />;
      case 'document_ocr':
        return <DocumentOCR currentLanguage={selectedLanguage} />;
      case 'ai_chat':
        return <AIChatAssistant currentLanguage={selectedLanguage} currentUserRole={activeRole} />;
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
      case 'smart_search':
        return <SmartSearch currentLanguage={selectedLanguage} />;
      case 'admin_analytics':
        return <AdminAnalytics />;
      default:
        return <TextTranslator currentLanguage={selectedLanguage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-saffron-500 selection:text-white transition-colors duration-200">
      
      {/* Top Header Bar */}
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        activeRole={activeRole}
        onRoleChange={handleRoleChange}
        latencyMs={latencyMs}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        currentUser={currentUser}
        onOpenAuthModal={handleOpenAuthModal}
        onLogout={handleLogout}
      />

      {/* Mobile Top Navigation Drawer Button */}
      <div className="md:hidden glass-panel px-4 py-2 flex items-center justify-between border-b border-slate-800">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center space-x-2 text-xs font-bold text-saffron-400 p-2 rounded-xl bg-saffron-500/10 border border-saffron-500/20"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>{t.toggleModules}</span>
        </button>

        <span className="text-xs font-mono text-emerald-400 font-semibold">{latencyMs}ms</span>
      </div>

      {/* Full-Screen Edge-to-Edge Workspace Layout */}
      <div className="flex-1 flex w-full">
        
        {/* Desktop Sidebar Navigation (Brown Background with Live Localization) */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setIsMobileMenuOpen(false);
          }}
          userRole={activeRole}
          currentLanguage={selectedLanguage}
        />

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-[#1e100a]/95 backdrop-blur-md p-4 space-y-4 overflow-y-auto border-r border-[#422619] text-[#faede1]">
            <div className="flex justify-between items-center border-b border-[#422619] pb-3">
              <span className="font-black text-saffron-400 text-base">BharatVoice AI Modules</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-[#d4bead] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-sm font-semibold">
              {[
                { id: 'text_translator', label: t.navItems.text_translator.label },
                { id: 'document_ocr', label: t.navItems.document_ocr.label },
                { id: 'ai_chat', label: t.navItems.ai_chat.label },
                { id: 'low_resource_nlp', label: t.navItems.low_resource_nlp.label },
                { id: 'voice_cloning', label: t.navItems.voice_cloning.label },
                { id: 'healthcare', label: t.navItems.healthcare.label },
                { id: 'agriculture', label: t.navItems.agriculture.label },
                { id: 'governance', label: t.navItems.governance.label },
                { id: 'smart_search', label: t.navItems.smart_search.label },
                { id: 'admin_analytics', label: t.navItems.admin_analytics.label }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as ModuleTab);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border transition-all ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-saffron-500/30 to-[#3d2417] text-[#ffc085] border-saffron-500/60 font-bold'
                      : 'bg-[#29170f] border-[#422619] text-[#d4bead] hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Central Content Area */}
        <main className="flex-1 p-4 lg:p-8 min-w-0 space-y-5">
          {/* Personalized Login-Wise Role Notification Bar */}
          {currentUser && (
            <div className="glass-panel p-3.5 px-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center space-x-3">
                <span className="text-2xl p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl shadow-inner">
                  {currentUser.avatar || '👤'}
                </span>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-xs md:text-sm text-slate-900 dark:text-white">
                      {currentUser.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-saffron-500/20 text-saffron-700 dark:text-saffron-300 border border-saffron-500/30 uppercase tracking-wide">
                      {currentUser.role.replace('_', ' ')} Mode
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 font-indic">
                    {currentUser.role === 'student' && '🎓 शिक्षण कक्ष: AI भाषा अनुवाद, संभाषण AI, व्याकरण नियम व शैक्षणिक सराव सक्रिय आहे.'}
                    {currentUser.role === 'farmer' && '🌾 शेतकरी सल्ला कक्ष: कापूस-सोयाबीन रोग नियंत्रण, लासलगाव बाजारभाव व हवामान सल्ला.'}
                    {currentUser.role === 'healthcare_worker' && '🏥 आरोग्य सेवा कक्ष: प्रिस्क्रिप्शन ऑडिओ रीडर, रुग्ण लक्षण भाषांतर व आपत्कालीन सूचना.'}
                    {currentUser.role === 'citizen' && '🏛️ नागरिक सेवा केंद्र: माझी लाडकी बहीण, पीएम-किसान, ७/१२ उतारा व शासकीय योजना साहाय्य.'}
                    {currentUser.role === 'admin' && '🛡️ प्रणाली प्रशासक: IndicTrans2 लेटन्सी, एआय मॉडेल बेंचमार्क व सुरक्षा ऑडिट.'}
                    {currentUser.role === 'teacher' && '📚 शिक्षक कक्ष: बहुभाषिक अभ्यासक्रम निर्मिती, प्रश्नपत्रिका भाषांतर व व्याकरण विश्लेषण.'}
                  </p>
                </div>
              </div>

              {/* Quick shortcut buttons tailored for role */}
              <div className="flex items-center gap-2">
                {currentUser.role === 'student' && (
                  <>
                    <button
                      onClick={() => setActiveTab('text_translator')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'text_translator'
                          ? 'bg-saffron-500 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:border-saffron-500'
                      }`}
                    >
                      📖 Translate Notes
                    </button>
                    <button
                      onClick={() => setActiveTab('ai_chat')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'ai_chat'
                          ? 'bg-saffron-500 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:border-saffron-500'
                      }`}
                    >
                      💬 Ask Doubt
                    </button>
                  </>
                )}

                {currentUser.role === 'farmer' && (
                  <>
                    <button
                      onClick={() => setActiveTab('agriculture')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'agriculture'
                          ? 'bg-saffron-500 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:border-saffron-500'
                      }`}
                    >
                      🚜 Mandi Rates & Crops
                    </button>
                    <button
                      onClick={() => setActiveTab('ai_chat')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'ai_chat'
                          ? 'bg-saffron-500 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:border-saffron-500'
                      }`}
                    >
                      💬 Kisan AI
                    </button>
                  </>
                )}

                {currentUser.role === 'healthcare_worker' && (
                  <>
                    <button
                      onClick={() => setActiveTab('healthcare')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'healthcare'
                          ? 'bg-saffron-500 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:border-saffron-500'
                      }`}
                    >
                      💊 Clinical Triage
                    </button>
                    <button
                      onClick={() => setActiveTab('ai_chat')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'ai_chat'
                          ? 'bg-saffron-500 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:border-saffron-500'
                      }`}
                    >
                      💬 Clinical AI Assistant
                    </button>
                  </>
                )}

                {currentUser.role === 'citizen' && (
                  <>
                    <button
                      onClick={() => setActiveTab('governance')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'governance'
                          ? 'bg-saffron-500 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:border-saffron-500'
                      }`}
                    >
                      🏛️ Govt Schemes
                    </button>
                    <button
                      onClick={() => setActiveTab('document_ocr')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                        activeTab === 'document_ocr'
                          ? 'bg-saffron-500 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 hover:border-saffron-500'
                      }`}
                    >
                      📄 7/12 Land OCR
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

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

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialTab={authModalTab}
        currentLanguage={selectedLanguage}
      />

    </div>
  );
}
