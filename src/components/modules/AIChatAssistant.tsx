import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Mic, 
  Volume2, 
  User, 
  Sparkles, 
  Landmark, 
  Stethoscope, 
  Sprout, 
  GraduationCap,
  RefreshCw
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { SUPPORTED_LANGUAGES, SAMPLE_TRANSLATIONS } from '../../data/mockData';
import { aiEngine } from '../../services/aiEngine';

interface AIChatAssistantProps {
  currentLanguage: LanguageCode;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  textNative: string;
  textEnglish: string;
  agentRole: string;
  timestamp: string;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ currentLanguage }) => {
  const [activeAgent, setActiveAgent] = useState<'govt' | 'medical' | 'agri' | 'tutor'>('govt');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      textNative: 'नमस्ते! मैं आपका भारतवाणी AI सहायक हूँ। आप मुझसे सरकारी योजनाओं, स्वास्थ्य या कृषि सम्बन्धी प्रश्न पूछ सकते हैं।',
      textEnglish: 'Greetings! I am your BharatVoice AI assistant. Ask me about government schemes, healthcare, or agriculture in your language.',
      agentRole: 'Government & Public Services Agent',
      timestamp: '10:02 AM'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);

  const agents = [
    { id: 'govt', label: 'Govt Form & Scheme Advisor', icon: Landmark, color: 'text-amber-400' },
    { id: 'medical', label: 'Healthcare & Clinical Assistant', icon: Stethoscope, color: 'text-rose-400' },
    { id: 'agri', label: 'Farmer & Crop Specialist', icon: Sprout, color: 'text-emerald-400' },
    { id: 'tutor', label: 'Regional Language Tutor', icon: GraduationCap, color: 'text-indigo-400' }
  ] as const;

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      textNative: inputText,
      textEnglish: inputText,
      agentRole: 'Citizen User',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    await new Promise(res => setTimeout(res, 1000));

    let aiReplyNative = '';
    let aiReplyEnglish = '';

    if (activeAgent === 'govt') {
      aiReplyNative = `पीएम-किसान एवं राशन कार्ड के लिए आपके द्वारा पूछी गई जानकारी के अनुसार आप नजदीकी ई-सेवा केंद्र पर जाकर अपने ${currentLangObj?.nativeName || 'क्षेत्रीय'} भाषा दस्तावेजों को सत्यापित करा सकते हैं।`;
      aiReplyEnglish = 'As per your query regarding PM-Kisan & Ration cards, you can verify your regional language documents at nearest E-Seva Kendra.';
    } else if (activeAgent === 'agri') {
      aiReplyNative = `फसल की सुरक्षा के लिए जैविक नीम तेल (Neem Oil) का 5ml/लीटर पानी में घोल बनाकर छिड़काव करें। मंडी में आज का न्यूनतम समर्थन मूल्य ₹2,180 प्रति क्विंटल है।`;
      aiReplyEnglish = 'For crop protection, spray organic neem oil @ 5ml/L of water. Today MSP in Mandi is ₹2,180 / quintal.';
    } else if (activeAgent === 'medical') {
      aiReplyNative = `यदि बुखार 101°F से अधिक है, तो मरीज को आराम दें और तुरंत नजदीकी प्राथमिक स्वास्थ्य केंद्र (PHC) में पैरासिटामोल के लिए डॉक्टर से परामर्श लें।`;
      aiReplyEnglish = 'If fever exceeds 101°F, rest the patient and consult doctor at nearest Primary Health Center (PHC).';
    } else {
      aiReplyNative = `${currentLangObj?.nativeName || 'हिंदी'} वाक्य संरचना में 'कर्ता + कर्म + क्रिया' (SOV) का क्रम होता है। अभ्यास के लिए एक नया वाक्य बोलें!`;
      aiReplyEnglish = 'Regional syntax follows Subject + Object + Verb (SOV) order. Speak a new sentence for practice!';
    }

    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      textNative: aiReplyNative,
      textEnglish: aiReplyEnglish,
      agentRole: agents.find(a => a.id === activeAgent)?.label || 'BharatVoice AI',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const handlePlayVoice = (text: string) => {
    aiEngine.speakText(text, currentLanguage);
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Agent Persona Selector */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-xl bg-saffron-500/20 text-saffron-400 border border-saffron-500/30">
            <Bot className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-lg font-bold text-white">Multilingual Conversational AI & Agent Platform</h2>
            <p className="text-xs text-slate-400">
              Interact naturally in 22 regional languages with specialized domain agents
            </p>
          </div>
        </div>

        {/* Persona Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
          {agents.map(ag => {
            const Icon = ag.icon;
            const isSelected = activeAgent === ag.id;
            return (
              <button
                key={ag.id}
                onClick={() => setActiveAgent(ag.id)}
                className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-saffron-500/20 text-saffron-300 border-saffron-500/50 shadow-md'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${ag.color}`} />
                <span className="truncate">{ag.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Window */}
      <div className="glass-card rounded-2xl border border-slate-800 flex flex-col h-[520px] justify-between overflow-hidden">
        
        {/* Messages Feed */}
        <div className="p-4 overflow-y-auto custom-scrollbar space-y-4 flex-1">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 max-w-3xl ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-md ${
                  msg.sender === 'user' ? 'bg-saffron-500' : 'bg-indigo-600'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl border text-xs space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-saffron-950/40 border-saffron-500/30 text-saffron-100 rounded-tr-none'
                    : 'bg-slate-900/80 border-slate-800 text-slate-100 rounded-tl-none'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1 border-b border-slate-800/60">
                  <span className="font-semibold">{msg.agentRole}</span>
                  <span>{msg.timestamp}</span>
                </div>

                <p className="text-sm font-indic leading-relaxed font-medium">
                  {msg.textNative}
                </p>

                <p className="text-[11px] text-slate-400 italic">
                  English translation: {msg.textEnglish}
                </p>

                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => handlePlayVoice(msg.textNative)}
                    className="flex items-center space-x-1 text-[10px] text-saffron-400 hover:text-saffron-300 font-semibold"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen Voice</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 italic p-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-saffron-400" />
              <span>{agents.find(a => a.id === activeAgent)?.label} is thinking in {currentLangObj?.name}...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
          <button
            onClick={() => handlePlayVoice("नमस्कार, मैं आपकी सहायता कैसे कर सकता हूँ?")}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-saffron-400 border border-slate-800 transition"
            title="Voice Input Prompt"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={`Ask in ${currentLangObj?.name} (${currentLangObj?.nativeName}) or type in English...`}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-saffron-500 font-indic"
          />

          <button
            onClick={handleSendMessage}
            className="p-2.5 rounded-xl bg-saffron-500 hover:bg-saffron-600 text-white font-bold transition shadow-lg shadow-saffron-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
