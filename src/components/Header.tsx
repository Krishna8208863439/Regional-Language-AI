import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  UserCheck, 
  Volume2, 
  ShieldCheck, 
  Sparkles,
  ChevronDown,
  Moon,
  Sun,
  Radio,
  Maximize2,
  Minimize2,
  LogIn,
  LogOut,
  User,
  CheckCircle2
} from 'lucide-react';
import { LanguageCode, UserRole, UserAccount } from '../types';
import { SUPPORTED_LANGUAGES, USER_ROLES } from '../data/mockData';
import { UI_TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  selectedLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  latencyMs: number;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  currentUser: UserAccount | null;
  onOpenAuthModal: (tab?: 'login' | 'register' | 'forgot') => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedLanguage,
  onLanguageChange,
  activeRole,
  onRoleChange,
  latencyMs,
  isDarkMode,
  onToggleTheme,
  currentUser,
  onOpenAuthModal,
  onLogout
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const t = UI_TRANSLATIONS[selectedLanguage] || UI_TRANSLATIONS.mr;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen().catch(err => console.error(err));
    }
  };

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];
  const currentRoleInfo = t.roles[activeRole] || { label: activeRole, description: '' };

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800 px-4 lg:px-8 py-3 transition-colors duration-200 w-full">
      <div className="w-full flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-saffron-600 via-saffron-500 to-amber-400 text-white shadow-lg shadow-saffron-500/20">
            <Volume2 className="w-6 h-6 animate-pulse-slow" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-saffron-500"></span>
            </span>
          </div>

          <div>
            <span className="font-black text-xl tracking-tight text-white font-indic">
              Bharat<span className="gradient-text-saffron">Voice AI</span>
            </span>
          </div>
        </div>

        {/* Center: Language Switcher */}
        <div className="flex items-center space-x-2 md:space-x-3">
          
          {/* Live Language Selector Dropdown (3 Languages) */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-saffron-500/50 px-3 py-1.5 rounded-xl text-sm transition-all shadow-sm"
              title={t.selectLanguage}
            >
              <Globe className="w-4 h-4 text-saffron-400" />
              <span className="font-bold text-slate-200">{currentLang.nativeName}</span>
              <span className="text-xs text-slate-400 hidden sm:inline">({currentLang.name})</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl shadow-2xl border border-slate-700 z-50 p-2 animate-fadeIn">
                <div className="px-3 py-2 text-[11px] font-bold text-slate-400 border-b border-slate-800 mb-1.5 flex justify-between items-center">
                  <span>{t.selectLanguage}</span>
                  <span className="text-saffron-400 font-mono">3 ACTIVE</span>
                </div>
                <div className="space-y-1">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all ${
                        selectedLanguage === lang.code
                          ? 'bg-gradient-to-r from-saffron-500/20 to-amber-500/20 text-saffron-300 font-bold border border-saffron-500/40'
                          : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="text-sm font-bold">{lang.nativeName}</span>
                        <span className="text-slate-400">({lang.name})</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono px-1.5 py-0.5 rounded bg-slate-900/60">
                        {lang.script}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: User Auth, Theme & Fullscreen */}
        <div className="flex items-center space-x-2 md:space-x-3">

          {/* User Account / Auth Section */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-1.5 md:px-3 md:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition shadow-sm"
              >
                <span className="text-base">{currentUser.avatar || '👤'}</span>
                <span className="text-xs font-bold text-slate-200 hidden md:inline truncate max-w-[110px]">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400 hidden md:inline" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 glass-panel rounded-2xl shadow-2xl border border-slate-700 z-50 p-3 animate-fadeIn">
                  <div className="flex items-center space-x-3 border-b border-slate-800 pb-3 mb-2">
                    <span className="text-2xl p-1 bg-slate-800 rounded-xl">{currentUser.avatar || '👤'}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-0.5 text-[9px] px-1.5 py-0.2 bg-saffron-500/20 text-saffron-400 rounded-md font-semibold capitalize">
                        {currentUser.role.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onOpenAuthModal('register');
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-800 transition flex items-center space-x-2"
                    >
                      <User className="w-3.5 h-3.5 text-saffron-400" />
                      <span>{t.createAccount}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition flex items-center space-x-2 font-semibold"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-400" />
                      <span>{t.signOut}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuthModal('login')}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white font-bold text-xs shadow-md shadow-saffron-500/20 hover:brightness-110 active:scale-95 transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.signIn}</span>
              <span className="sm:hidden">Login</span>
            </button>
          )}

          {/* Theme Toggle (Dark & Light Mode) */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors cursor-pointer"
            title={isDarkMode ? t.toggleThemeLight : t.toggleThemeDark}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Fullscreen Toggle for Laptop */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl text-slate-400 hover:text-saffron-400 hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors cursor-pointer"
            title={isFullscreen ? t.exitFullscreen : t.enterFullscreen}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-saffron-400" /> : <Maximize2 className="w-4 h-4" />}
          </button>

        </div>

      </div>
    </header>
  );
};
