import React, { useState } from 'react';
import { 
  Globe, 
  UserCheck, 
  Volume2, 
  Activity, 
  Bell, 
  ShieldCheck, 
  Sparkles,
  ChevronDown,
  Moon,
  Sun,
  Radio
} from 'lucide-react';
import { LanguageCode, UserRole } from '../types';
import { SUPPORTED_LANGUAGES, USER_ROLES } from '../data/mockData';

interface HeaderProps {
  selectedLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  latencyMs: number;
}

export const Header: React.FC<HeaderProps> = ({
  selectedLanguage,
  onLanguageChange,
  activeRole,
  onRoleChange,
  latencyMs
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];
  const currentRole = USER_ROLES.find(r => r.id === activeRole) || USER_ROLES[0];

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800 px-4 lg:px-8 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-saffron-600 via-saffron-500 to-amber-400 text-white shadow-lg shadow-saffron-500/20">
            <Volume2 className="w-6 h-6 animate-pulse-slow" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-saffron-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-indic">
                Bharat<span className="gradient-text-saffron">Voice AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-saffron-500/10 text-saffron-400 border border-saffron-500/30">
                Enterprise v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden md:block">
              Multilingual Voice, Translation & Low-Resource AI for 22+ Languages
            </p>
          </div>
        </div>

        {/* Center: Language & Role Switchers */}
        <div className="flex items-center space-x-2 md:space-x-3">
          
          {/* Live Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-saffron-500/50 px-3 py-1.5 rounded-lg text-sm transition-all shadow-sm"
              title="Select Primary Regional Language"
            >
              <Globe className="w-4 h-4 text-saffron-400" />
              <span className="font-medium text-slate-200">{currentLang.nativeName}</span>
              <span className="text-xs text-slate-400 hidden sm:inline">({currentLang.name})</span>
              {currentLang.lowResource && (
                <span className="px-1.5 py-0.2 text-[10px] bg-amber-500/20 text-amber-300 rounded font-semibold">
                  Low-Res
                </span>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-72 max-h-96 overflow-y-auto glass-panel rounded-xl shadow-2xl border border-slate-700 z-50 custom-scrollbar p-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-slate-400 border-b border-slate-800 mb-1 flex justify-between">
                  <span>INDIAN LANGUAGES (22+)</span>
                  <span>SCRIPT</span>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                        selectedLanguage === lang.code
                          ? 'bg-saffron-500/20 text-saffron-400 font-semibold border border-saffron-500/40'
                          : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold">{lang.nativeName}</span>
                        <span className="text-slate-400">({lang.name})</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {lang.lowResource && (
                          <span className="px-1 text-[9px] bg-amber-500/20 text-amber-300 rounded">
                            LR
                          </span>
                        )}
                        <span className="text-[10px] text-slate-500 font-mono">{lang.script}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleOpen(!isRoleOpen)}
              className="flex items-center space-x-2 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 px-3 py-1.5 rounded-lg text-sm transition-all shadow-sm"
              title="Switch Persona / User Role"
            >
              <UserCheck className="w-4 h-4 text-indigo-400" />
              <span className="font-medium text-slate-200 hidden sm:inline">{currentRole.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isRoleOpen && (
              <div className="absolute right-0 mt-2 w-64 glass-panel rounded-xl shadow-2xl border border-slate-700 z-50 p-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-slate-400 border-b border-slate-800 mb-1">
                  SELECT USER PERSONA
                </div>
                {USER_ROLES.map(role => (
                  <button
                    key={role.id}
                    onClick={() => {
                      onRoleChange(role.id);
                      setIsRoleOpen(false);
                    }}
                    className={`flex flex-col text-left w-full px-3 py-2 rounded-lg text-xs transition-colors mb-1 ${
                      activeRole === role.id
                        ? 'bg-indigo-600/20 text-indigo-300 font-semibold border border-indigo-500/40'
                        : 'hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{role.label}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-0.5">{role.description}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right: Latency Monitor, Status, Theme & Notifications */}
        <div className="flex items-center space-x-3">
          
          {/* Latency Telemetry */}
          <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800 text-xs">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-slate-400">Edge Inference:</span>
            <span className="text-emerald-400 font-mono font-semibold">{latencyMs}ms</span>
          </div>

          {/* Audio Engine Status Badge */}
          <div className="hidden md:flex items-center space-x-1 px-2.5 py-1 rounded-md bg-saffron-500/10 border border-saffron-500/30 text-saffron-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>IndicASR + IndicTrans2</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            title="Toggle Light / Dark UI Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>

          {/* Security & Audit Status */}
          <div className="flex items-center space-x-1 text-emerald-400 p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20" title="AES-256 Encrypted & Consent Verified">
            <ShieldCheck className="w-4 h-4" />
          </div>

        </div>

      </div>
    </header>
  );
};
