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
  GraduationCap, 
  Search, 
  Sparkles, 
  BarChart3,
  BadgeAlert
} from 'lucide-react';
import { UserRole } from '../types';

export type ModuleTab =
  | 'voice_translator'
  | 'text_translator'
  | 'document_ocr'
  | 'ai_chat'
  | 'low_resource_nlp'
  | 'voice_cloning'
  | 'healthcare'
  | 'agriculture'
  | 'governance'
  | 'education'
  | 'smart_search'
  | 'enhancements'
  | 'admin_analytics';

interface SidebarProps {
  activeTab: ModuleTab;
  onTabChange: (tab: ModuleTab) => void;
  userRole: UserRole;
}

interface NavItem {
  id: ModuleTab;
  label: string;
  icon: React.ElementType;
  badge?: string;
  category: 'core' | 'domain' | 'advanced';
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  userRole
}) => {
  const navItems: NavItem[] = [
    // Core AI Engines
    { id: 'voice_translator', label: 'Speech & Voice Translator', icon: Mic, badge: 'Realtime ASR', category: 'core' },
    { id: 'text_translator', label: 'Neural Machine Translation', icon: Languages, badge: 'IndicTrans2', category: 'core' },
    { id: 'document_ocr', label: 'OCR & Document AI', icon: FileText, badge: 'PaddleOCR', category: 'core' },
    { id: 'ai_chat', label: 'Regional Conversational AI', icon: Bot, category: 'core' },
    { id: 'low_resource_nlp', label: 'Low-Resource NLP Pipeline', icon: Cpu, badge: 'Santali / Bodo', category: 'core' },
    { id: 'voice_cloning', label: 'Voice Cloning (Consent Hub)', icon: AudioWaveform, badge: 'Consent Verified', category: 'core' },

    // Domain Services
    { id: 'healthcare', label: 'Healthcare & Clinical Translation', icon: Stethoscope, category: 'domain' },
    { id: 'agriculture', label: 'Agriculture & Farmer Advisory', icon: Sprout, category: 'domain' },
    { id: 'governance', label: 'Government Services & Forms', icon: Landmark, category: 'domain' },
    { id: 'education', label: 'Multilingual Education & Tutor', icon: GraduationCap, category: 'domain' },

    // Advanced & Management
    { id: 'smart_search', label: 'Cross-Language Smart Search', icon: Search, category: 'advanced' },
    { id: 'enhancements', label: 'Sign Language & AR Vision', icon: Sparkles, badge: 'New', category: 'advanced' },
    { id: 'admin_analytics', label: 'Admin Telemetry & Security', icon: BarChart3, category: 'advanced' }
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-800 shrink-0 hidden md:flex flex-col h-[calc(100vh-65px)] sticky top-[65px]">
      <div className="p-4 overflow-y-auto custom-scrollbar flex-1 space-y-6">
        
        {/* Core AI Engines Category */}
        <div>
          <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase px-3 mb-2 flex justify-between items-center">
            <span>CORE AI ENGINES</span>
            <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">6 AI Models</span>
          </div>
          <div className="space-y-1">
            {navItems.filter(item => item.category === 'core').map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-saffron-500/20 to-amber-500/10 text-saffron-400 border border-saffron-500/40 shadow-lg shadow-saffron-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-saffron-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-saffron-500/30 text-saffron-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Domain Modules Category */}
        <div>
          <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase px-3 mb-2">
            DOMAIN ECOSYSTEM
          </div>
          <div className="space-y-1">
            {navItems.filter(item => item.category === 'domain').map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/10 text-indigo-300 border border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Innovations & Admin Category */}
        <div>
          <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase px-3 mb-2">
            INNOVATIONS & GOVERNANCE
          </div>
          <div className="space-y-1">
            {navItems.filter(item => item.category === 'advanced').map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/10 text-teal-300 border border-teal-500/40 shadow-lg shadow-teal-500/10'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-teal-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.5 bg-teal-500/20 text-teal-300 rounded font-semibold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Footer System Status Banner */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/60 text-xs">
        <div className="flex items-center justify-between text-slate-400 mb-1">
          <span className="text-[11px]">System Status</span>
          <span className="text-emerald-400 font-semibold text-[10px] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Operational
          </span>
        </div>
        <p className="text-[10px] text-slate-500">
          NLLB-200 & IndicASR pipeline synced. Encryption: AES-256
        </p>
      </div>
    </aside>
  );
};
