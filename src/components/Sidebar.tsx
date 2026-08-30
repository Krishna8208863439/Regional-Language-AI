import React from 'react';
import { 
  Mic, 
  Languages, 
  FileText, 
  Bot, 
  Cpu, 
  AudioWaveform, 
  Stethoscope, 
  Sprout, 
  Landmark, 
  Search, 
  BarChart3
} from 'lucide-react';
import { UserRole, LanguageCode } from '../types';
import { UI_TRANSLATIONS } from '../data/translations';

export type ModuleTab =
  | 'text_translator'
  | 'document_ocr'
  | 'ai_chat'
  | 'low_resource_nlp'
  | 'voice_cloning'
  | 'healthcare'
  | 'agriculture'
  | 'governance'
  | 'smart_search'
  | 'admin_analytics';

interface SidebarProps {
  activeTab: ModuleTab;
  onTabChange: (tab: ModuleTab) => void;
  userRole: UserRole;
  currentLanguage: LanguageCode;
}

interface NavItemConfig {
  id: ModuleTab;
  icon: React.ElementType;
  category: 'core' | 'domain' | 'advanced';
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  userRole,
  currentLanguage
}) => {
  const t = UI_TRANSLATIONS[currentLanguage] || UI_TRANSLATIONS.mr;

  const navConfigs: NavItemConfig[] = [
    // Core AI Engines
    { id: 'text_translator', icon: Languages, category: 'core' },
    { id: 'document_ocr', icon: FileText, category: 'core' },
    { id: 'ai_chat', icon: Bot, category: 'core' },
    { id: 'low_resource_nlp', icon: Cpu, category: 'core' },
    { id: 'voice_cloning', icon: AudioWaveform, category: 'core' },

    // Domain Services
    { id: 'healthcare', icon: Stethoscope, category: 'domain' },
    { id: 'agriculture', icon: Sprout, category: 'domain' },
    { id: 'governance', icon: Landmark, category: 'domain' },

    // Advanced & Management
    { id: 'smart_search', icon: Search, category: 'advanced' },
    { id: 'admin_analytics', icon: BarChart3, category: 'advanced' }
  ];

  const getNavItemInfo = (id: ModuleTab) => {
    return t.navItems[id] || { label: id, badge: undefined };
  };

  return (
    <aside className="w-64 bg-[#23140d] dark:bg-[#1a0e08] border-r border-[#422619] dark:border-[#331c12] text-[#faede1] shrink-0 hidden md:flex flex-col h-[calc(100vh-65px)] sticky top-[65px] shadow-2xl z-30 transition-colors duration-200">
      <div className="p-3.5 overflow-y-auto custom-scrollbar flex-1 space-y-5">
        
        {/* Core AI Engines Category */}
        <div>
          <div className="text-[11px] font-extrabold tracking-wider text-[#d4a373] uppercase px-3 mb-2 flex justify-between items-center">
            <span>{t.coreEngines}</span>
            <span className="text-[9px] bg-[#3a2216] text-[#e8c29e] px-2 py-0.5 rounded-full font-bold border border-[#523020]">
              {t.modelsCount}
            </span>
          </div>
          <div className="space-y-1">
            {navConfigs.filter(item => item.category === 'core').map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const info = getNavItemInfo(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-saffron-500/30 via-amber-600/25 to-[#422619] text-[#ffc085] border border-saffron-500/50 shadow-md shadow-saffron-950/40 font-bold'
                      : 'text-[#d4bead] hover:text-white hover:bg-[#341d13] border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-saffron-400' : 'text-[#c29d82]'}`} />
                    <span className="truncate font-indic">{info.label}</span>
                  </div>
                  {info.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ml-1 ${
                      isActive 
                        ? 'bg-saffron-500/30 text-[#ffd8b3] border border-saffron-500/40' 
                        : 'bg-[#331c12] text-[#ba977d] border border-[#48291b]'
                    }`}>
                      {info.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Domain Modules Category */}
        <div>
          <div className="text-[11px] font-extrabold tracking-wider text-[#d4a373] uppercase px-3 mb-2">
            {t.domainEcosystem}
          </div>
          <div className="space-y-1">
            {navConfigs.filter(item => item.category === 'domain').map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const info = getNavItemInfo(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500/30 to-[#422619] text-indigo-200 border border-indigo-500/50 shadow-md font-bold'
                      : 'text-[#d4bead] hover:text-white hover:bg-[#341d13] border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-300' : 'text-[#c29d82]'}`} />
                    <span className="truncate font-indic">{info.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Innovations & Admin Category */}
        <div>
          <div className="text-[11px] font-extrabold tracking-wider text-[#d4a373] uppercase px-3 mb-2">
            {t.innovations}
          </div>
          <div className="space-y-1">
            {navConfigs.filter(item => item.category === 'advanced').map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const info = getNavItemInfo(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-500/30 to-[#422619] text-teal-200 border border-teal-500/50 shadow-md font-bold'
                      : 'text-[#d4bead] hover:text-white hover:bg-[#341d13] border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-teal-300' : 'text-[#c29d82]'}`} />
                    <span className="truncate font-indic">{info.label}</span>
                  </div>
                  {info.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-teal-900/50 text-teal-300 rounded-full font-bold border border-teal-700/50 shrink-0 ml-1">
                      {info.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </aside>
  );
};
