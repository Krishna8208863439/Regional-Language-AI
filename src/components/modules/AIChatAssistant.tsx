import React, { useState, useEffect } from 'react';
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
  RefreshCw,
  MessageSquare,
  BookOpen,
  Award
} from 'lucide-react';
import { LanguageCode, UserRole } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { aiEngine } from '../../services/aiEngine';

interface AIChatAssistantProps {
  currentLanguage: LanguageCode;
  currentUserRole?: UserRole;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  textNative: string;
  textEnglish: string;
  agentRole: string;
  timestamp: string;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ 
  currentLanguage, 
  currentUserRole = 'student' 
}) => {
  // Determine initial agent from logged-in user role
  const getInitialAgentForRole = (role: UserRole): 'govt' | 'medical' | 'agri' | 'tutor' => {
    if (role === 'student' || role === 'teacher') return 'tutor';
    if (role === 'farmer') return 'agri';
    if (role === 'healthcare_worker') return 'medical';
    return 'govt';
  };

  const [activeAgent, setActiveAgent] = useState<'govt' | 'medical' | 'agri' | 'tutor'>(() => 
    getInitialAgentForRole(currentUserRole)
  );
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getInitialGreeting = (lang: LanguageCode, role: UserRole, agent: string): Message => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (agent === 'tutor' || role === 'student' || role === 'teacher') {
      if (lang === 'mr') {
        return {
          id: `init-${Date.now()}`,
          sender: 'ai',
          textNative: 'नमस्कार विद्यार्थी मित्रा! मी आपला AI भाषा व अभ्यास शिक्षक (Tutor) आहे. आपण मला मराठी व्याकरण (नाम, सर्वनाम, समास), निबंध लेखन, इंग्रजी संभाषण किंवा बोर्ड परीक्षेच्या अभ्यासाविषयी काहीही विचारू शकता.',
          textEnglish: 'Hello student! I am your AI Language & Learning Tutor. Ask me about Marathi grammar, essays, English conversation, or exam preparation.',
          agentRole: 'AI Education & Language Tutor',
          timestamp: time
        };
      } else if (lang === 'hi') {
        return {
          id: `init-${Date.now()}`,
          sender: 'ai',
          textNative: 'नमस्ते प्रिय विद्यार्थी! मैं आपका एआई भाषा एवं अध्ययन शिक्षक (Tutor) हूँ। आप मुझसे हिंदी व्याकरण (संधि, समास, मुहावरे), निबंध, अंग्रेजी बोलना या परीक्षा तैयारी के बारे में प्रश्न पूछें।',
          textEnglish: 'Greetings student! I am your AI Language & Study Tutor. Ask me about Hindi grammar, essays, English speaking, or study tips.',
          agentRole: 'AI Education & Language Tutor',
          timestamp: time
        };
      } else {
        return {
          id: `init-${Date.now()}`,
          sender: 'ai',
          textNative: 'Hello student! I am your AI Multilingual Learning Tutor. Ask me any questions about regional grammar, vocabulary, exam revision, or bilingual translation.',
          textEnglish: 'Hello student! I am your AI Multilingual Learning Tutor. Ask me any questions about regional grammar, vocabulary, exam revision, or bilingual translation.',
          agentRole: 'AI Education & Language Tutor',
          timestamp: time
        };
      }
    }

    if (agent === 'agri' || role === 'farmer') {
      if (lang === 'mr') {
        return {
          id: `init-${Date.now()}`,
          sender: 'ai',
          textNative: 'नमस्कार शेतकरी मित्र! मी आपला कृषी व पीक सल्लागार AI आहे. कापूस-सोयाबीन रोग नियंत्रण, आजचे लासलगाव/जळगाव बाजारभाव, खत नियोजन व हवामान अंदाज विचारा.',
          textEnglish: 'Greetings farmer! I am your AI Crop & Agri Specialist. Ask me about pest diagnosis, mandi market rates, fertilizer schedules, and weather alerts.',
          agentRole: 'Farmer & Crop Specialist Agent',
          timestamp: time
        };
      } else if (lang === 'hi') {
        return {
          id: `init-${Date.now()}`,
          sender: 'ai',
          textNative: 'नमस्कार किसान भाई! मैं आपका कृषि एवं फसल सलाहकार एआई हूँ। आज के प्रमुख मंडी भाव, कीट नियंत्रण, जैविक खाद और मौसम चेतावनी के बारे में पूछें।',
          textEnglish: 'Greetings farmer! I am your AI Crop Specialist. Ask about mandi prices, pest control, and weather advisories.',
          agentRole: 'Farmer & Crop Specialist Agent',
          timestamp: time
        };
      }
    }

    if (agent === 'medical' || role === 'healthcare_worker') {
      if (lang === 'mr') {
        return {
          id: `init-${Date.now()}`,
          sender: 'ai',
          textNative: 'नमस्कार! मी आपला वैद्यकीय व क्लिनिकल साहाय्यक AI आहे. रुग्ण लक्षण तपासणी, औषध सूचना भाषांतर व प्राथमिक आरोग्य केंद्र (PHC) प्रोटोकॉल विचारा.',
          textEnglish: 'Greetings! I am your Healthcare & Clinical AI Assistant. Ask about patient symptom translation, dosage instructions, or triage guidelines.',
          agentRole: 'Healthcare & Clinical Assistant',
          timestamp: time
        };
      } else if (lang === 'hi') {
        return {
          id: `init-${Date.now()}`,
          sender: 'ai',
          textNative: 'नमस्ते! मैं आपका स्वास्थ्य एवं क्लिनिकल सहायक एआई हूँ। रोगी लक्षण जांच, दवा निर्देश अनुवाद एवं प्राथमिक उपचार प्रोटोकॉल पूछें।',
          textEnglish: 'Greetings! I am your Healthcare & Clinical Assistant. Ask about triage, dosage guidelines, and patient translation.',
          agentRole: 'Healthcare & Clinical Assistant',
          timestamp: time
        };
      }
    }

    // Default Citizen / Governance
    if (lang === 'mr') {
      return {
        id: `init-${Date.now()}`,
        sender: 'ai',
        textNative: 'नमस्कार! मी आपला शासन योजना व नागरिक सेवा साहाय्यक आहे. मुख्यमंत्री माझी लाडकी बहीण, पीएम-किसान, ७/१२ उतारा किंवा रेशन कार्डबाबत प्रश्न विचारा.',
        textEnglish: 'Greetings! I am your Government Services & Scheme Advisor. Ask me about Ladki Bahin, PM-Kisan, and 7/12 land extracts.',
        agentRole: 'Govt Form & Scheme Advisor',
        timestamp: time
      };
    } else if (lang === 'hi') {
      return {
        id: `init-${Date.now()}`,
        sender: 'ai',
        textNative: 'नमस्ते! मैं आपका सरकारी योजना एवं नागरिक सेवा सहायक हूँ। लाडली बहना, पीएम-किसान, खतौनी या राशन कार्ड सम्बन्धी कोई भी जानकारी पूछें।',
        textEnglish: 'Greetings! I am your Government Services & Scheme Advisor. Ask about citizen welfare schemes, PM-Kisan, and land records.',
        agentRole: 'Govt Form & Scheme Advisor',
        timestamp: time
      };
    } else {
      return {
        id: `init-${Date.now()}`,
        sender: 'ai',
        textNative: 'Hello! I am your BharatVoice AI Multilingual Assistant. How can I assist you today with citizen schemes, agriculture, healthcare, or learning?',
        textEnglish: 'Hello! I am your BharatVoice AI Multilingual Assistant. How can I assist you today with citizen schemes, agriculture, healthcare, or learning?',
        agentRole: 'Govt Form & Scheme Advisor',
        timestamp: time
      };
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    getInitialGreeting(currentLanguage, currentUserRole, activeAgent)
  ]);

  useEffect(() => {
    setActiveAgent(getInitialAgentForRole(currentUserRole));
    setMessages([getInitialGreeting(currentLanguage, currentUserRole, getInitialAgentForRole(currentUserRole))]);
  }, [currentLanguage, currentUserRole]);

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  const agents = [
    { id: 'tutor', label: 'Regional Language Tutor (भाषा शिक्षण / AI Tutor)', icon: GraduationCap, color: 'text-indigo-500' },
    { id: 'agri', label: 'Farmer & Crop Specialist (कृषी व शेती तज्ज्ञ)', icon: Sprout, color: 'text-emerald-500' },
    { id: 'medical', label: 'Healthcare & Clinical Assistant (आरोग्य साहाय्यक)', icon: Stethoscope, color: 'text-rose-500' },
    { id: 'govt', label: 'Govt Form & Scheme Advisor (शासन योजना)', icon: Landmark, color: 'text-amber-500' }
  ] as const;

  // Role-specific quick questions
  const getQuickQuestions = (): string[] => {
    if (activeAgent === 'tutor' || currentUserRole === 'student') {
      if (currentLanguage === 'mr') {
        return [
          'मराठी व्याकरणातील नाम आणि सर्वनाम नियम सांगा.',
          '१०वी/१२वी बोर्ड परीक्षेसाठी अभ्यासाचे नियोजन कसे करावे?',
          'इंग्रजीत स्वपरिचय (Self Introduction) कसा द्यावा?',
          'मराठी निबंध लेखन पद्धत व महत्त्वाचे मुद्दे समजावा.'
        ];
      } else if (currentLanguage === 'hi') {
        return [
          'हिंदी व्याकरण में संधि और समास के नियम बताएं।',
          'बोर्ड परीक्षा की तैयारी हेतु सर्वोत्तम अध्ययन टिप्स।',
          'अंग्रेजी में प्रभावी आत्म-परिचय कैसे दें?',
          'हिंदी निबंध लेखन के प्रमुख दिशानिर्देश।'
        ];
      } else {
        return [
          'Explain Subject-Verb-Object word order in Indic languages.',
          'Give tips for preparing for board examinations.',
          'How to introduce myself fluently in English and Hindi?',
          'Generate 5 vocabulary flashcards for daily practice.'
        ];
      }
    }

    if (activeAgent === 'agri' || currentUserRole === 'farmer') {
      if (currentLanguage === 'mr') {
        return [
          'कापसातील बोंडअळी नियंत्रणासाठी काय फवारावे?',
          'आजचे कांदा व सोयाबीन लासलगाव बाजारभाव काय आहेत?',
          'ठिबक सिंचन अनुदान योजनेचा लाभ कसा घ्यावा?',
          'सेंद्रिय खत व जिवामृत तयार करण्याची कृती सांगा.'
        ];
      } else if (currentLanguage === 'hi') {
        return [
          'फसलों में कीट नियंत्रण हेतु जैविक कीटनाशक बताएं।',
          'आज के प्रमुख मंडी भाव एवं न्यूनतम समर्थन मूल्य (MSP)।',
          'ड्रिप सिंचाई सब्सिडी योजना में ऑनलाइन आवेदन कैसे करें?',
          'जैविक खाद एवं वर्मीकम्पोस्ट बनाने की विधि।'
        ];
      }
    }

    if (activeAgent === 'medical' || currentUserRole === 'healthcare_worker') {
      if (currentLanguage === 'mr') {
        return [
          'छातीत तीव्र दुखत असल्यास प्राथमिक उपचार काय करावेत?',
          'मधुमेह व रक्तदाब रुग्णांसाठी आहार व औषध सल्ला.',
          'लसीकरण वेळापत्रक व बाल आरोग्य सूचना.',
          'डेंग्यू आणि मलेरिया लक्षणे व तातडीचे उपाय.'
        ];
      } else if (currentLanguage === 'hi') {
        return [
          'सीने में तेज दर्द होने पर आपातकालीन प्राथमिक उपचार।',
          'डायबिटीज और बीपी मरीजों के लिए आहार परामर्श।',
          'टीकाकरण शेड्यूल एवं बाल स्वास्थ्य निर्देश।',
          'डेंगू एवं वायरल फीवर के लक्षण व रोकथाम।'
        ];
      }
    }

    // Citizen
    if (currentLanguage === 'mr') {
      return [
        'माझी लाडकी बहीण योजनेसाठी कोणते कागदपत्रे लागतात?',
        'पीएम-किसान योजनेचा हप्ता कसा तपासावा?',
        'डिजिटल स्वाक्षरीचा ७/१२ उतारा कसा डाउनलोड करावा?',
        'नवीन रेशन कार्ड व उत्पन्नाचा दाखला कसा काढावा?'
      ];
    } else if (currentLanguage === 'hi') {
      return [
        'लाडली बहना योजना के लिए आवश्यक दस्तावेज क्या हैं?',
        'पीएम-किसान सम्मान निधि की स्थिति कैसे चेक करें?',
        'डिजिटल खतौनी एवं आय प्रमाण पत्र कैसे प्राप्त करें?',
        'राशन कार्ड एवं आयुष्मान भारत योजना की जानकारी दें।'
      ];
    } else {
      return [
        'How to apply for citizen welfare schemes online?',
        'What documents are needed for domicile certificate?',
        'How to check PM-Kisan subsidy status?',
        'What are the steps to download 7/12 land extract?'
      ];
    }
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const query = customPrompt || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      textNative: query,
      textEnglish: query,
      agentRole: 'You',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    await new Promise(res => setTimeout(res, 600));

    let aiReplyNative = '';
    let aiReplyEnglish = '';

    if (activeAgent === 'tutor' || currentUserRole === 'student') {
      if (currentLanguage === 'mr') {
        aiReplyNative = `विद्यार्थी मित्रा, आपल्या प्रश्नाचे उत्तर: मराठी भाषेत व्याकरण दृष्ट्या 'नाम' म्हणजे वस्तू, व्यक्ती किंवा ठिकाणाचे नाव (उदा. पुणे, हिमालय, नदी). वाक्यरचनेत 'कर्ता + कर्म + क्रियापद' हा क्रम पाळल्यास वाक्य अर्थपूर्ण बनते. परीक्षेसाठी दररोज २० मिनिटे वाचन व लेखन सराव करा!`;
        aiReplyEnglish = 'For students: In Marathi grammar, Nouns (Naam) denote person, place, or things. Marathi follows Subject + Object + Verb (SOV) order. Practice 20 minutes daily!';
      } else if (currentLanguage === 'hi') {
        aiReplyNative = `प्रिय छात्र, आपके प्रश्न का उत्तर: हिंदी व्याकरण में 'संज्ञा' किसी व्यक्ति, वस्तु, स्थान अथवा भाव के नाम को कहते हैं। वाक्य रचना में 'कर्ता + कर्म + क्रिया' का सही संयोजन आवश्यक है। परीक्षा में अच्छे अंकों हेतु नियमित लिखित अभ्यास करें!`;
        aiReplyEnglish = 'For students: Hindi syntax follows Subject + Object + Verb. Practice writing daily for better exam performance!';
      } else {
        aiReplyNative = 'Student Guidance: In Indic languages, sentences follow the Subject + Object + Verb (SOV) structure. Consistent daily practice in vocabulary and grammar will guarantee academic excellence!';
        aiReplyEnglish = aiReplyNative;
      }
    } else if (activeAgent === 'agri' || currentUserRole === 'farmer') {
      if (currentLanguage === 'mr') {
        aiReplyNative = `शेतकरी दादा, कृषी सल्ला: कापूस पिकावर बोंडअळी नियंत्रणासाठी एकरी ५ फेरोमोन ट्रॅप लावा आणि इमामेक्टिन बेंझोएट ५% एसजी ४ ग्रॅम प्रति १० लिटर पाण्यात फवारा. आजचा लासलगाव कांदा भाव ₹१,८०० - ₹२,४०० व सोयाबीन ₹४,६०० प्रति क्विंटल आहे.`;
        aiReplyEnglish = 'Farmer advisory: For bollworm, install 5 pheromone traps/acre and spray Emamectin Benzoate 5% SG. Mandi rates are stable today.';
      } else if (currentLanguage === 'hi') {
        aiReplyNative = `किसान भाई, कृषि सलाह: फसल सुरक्षा हेतु नीम तेल 5ml प्रति लीटर पानी में सुबह 8 से 11 बजे के बीच छिड़काव करें। आज का गेहूं व सोयाबीन मंडी भाव एमएसपी के अनुरूप अनुकूल है।`;
        aiReplyEnglish = 'Farmer advisory: Spray neem oil early in the morning. Mandi rates are favorable today.';
      } else {
        aiReplyNative = 'Agricultural Advisory: Install pheromone traps for pest management and apply micro-nutrients before flowering. Current market arrivals are steady.';
        aiReplyEnglish = aiReplyNative;
      }
    } else if (activeAgent === 'medical' || currentUserRole === 'healthcare_worker') {
      if (currentLanguage === 'mr') {
        aiReplyNative = `वैद्यकीय सूचना: छातीत तीव्र दुखणे, धाप लागणे किंवा १०२°F पेक्षा जास्त ताप असल्यास तात्काळ जवळच्या प्राथमिक आरोग्य केंद्रात (PHC) ईसीजी व तपासणी करून घ्या. रुग्णाला आराम देऊन भरपूर पाणी व ओआरएस द्या.`;
        aiReplyEnglish = 'Clinical protocol: For severe chest pain or high fever, seek immediate PHC examination. Maintain hydration.';
      } else if (currentLanguage === 'hi') {
        aiReplyNative = `चिकित्सा निर्देश: तेज बुखार या सीने में दर्द होने पर मरीज को आराम दें और तुरंत नजदीकी प्राथमिक स्वास्थ्य केंद्र (PHC) में डॉक्टर से संपर्क करें।`;
        aiReplyEnglish = 'Clinical guideline: For chest pain or persistent fever, immediately consult the primary health center.';
      } else {
        aiReplyNative = 'Clinical Advisory: For acute symptoms, immediately stabilize vitals and transfer to nearest certified medical facility.';
        aiReplyEnglish = aiReplyNative;
      }
    } else {
      // Citizen / Governance
      if (currentLanguage === 'mr') {
        aiReplyNative = `नागरिक सेवा माहिती: मुख्यमंत्री माझी लाडकी बहीण आणि पीएम-किसान योजनेसाठी आधार कार्ड, आधार संलग्न बँक पासबुक आणि उत्पन्नाचा दाखला आवश्यक आहे. आपण 'आपले सरकार' पोर्टल किंवा सेतू केंद्रावरून त्वरित अर्ज करू शकता.`;
        aiReplyEnglish = 'Citizen Service: For Ladki Bahin & PM-Kisan, your Aadhaar, bank passbook, and income certificate are needed. Apply via Aaple Sarkar portal.';
      } else if (currentLanguage === 'hi') {
        aiReplyNative = `नागरिक सूचना: सरकारी योजनाओं (पीएम-किसान, आवास योजना) के लिए आधार कार्ड, बैंक पासबुक और खतौनी अनिवार्य है। आप नजदीकी जनसेवा केंद्र (CSC) से आवेदन कर सकते हैं।`;
        aiReplyEnglish = 'Citizen Service: For PM-Kisan and welfare schemes, Aadhaar, bank passbook, and land records are required.';
      } else {
        aiReplyNative = 'Citizen Welfare: For public scheme benefits, ensure your Aadhaar is DBT-linked with your bank account. Applications can be submitted at civic centers.';
        aiReplyEnglish = aiReplyNative;
      }
    }

    const aiMsg: Message = {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      textNative: aiReplyNative,
      textEnglish: aiReplyEnglish,
      agentRole: agents.find(a => a.id === activeAgent)?.label.split(' ')[0] || 'BharatVoice AI',
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
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-saffron-500/20 text-saffron-600 dark:text-saffron-400 border border-saffron-500/30">
              <Bot className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                Role-Adaptive Conversational AI & Domain Specialist
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Personalized answers for Student, Farmer, Healthcare & Citizen in Marathi, Hindi & English
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1 bg-saffron-500/10 text-saffron-700 dark:text-saffron-300 border border-saffron-500/30 rounded-xl text-xs font-bold shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="capitalize">Persona: {currentUserRole.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Agent Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
          {agents.map((agent) => {
            const Icon = agent.icon;
            const isSelected = activeAgent === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => {
                  setActiveAgent(agent.id);
                  setMessages([getInitialGreeting(currentLanguage, currentUserRole, agent.id)]);
                }}
                className={`flex items-center space-x-2.5 p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-saffron-500/20 border-saffron-500 text-saffron-800 dark:text-saffron-300 font-bold shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${agent.color} shrink-0`} />
                <span className="text-xs truncate font-indic font-semibold">{agent.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-500 font-bold shrink-0 flex items-center gap-1">
          <MessageSquare className="w-3.5 h-3.5" /> Suggestions:
        </span>
        {getQuickQuestions().map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium shrink-0 font-indic transition shadow-sm hover:border-saffron-500"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="glass-card rounded-2xl border border-slate-200 dark:border-slate-800 p-4 md:p-6 space-y-4 h-[420px] overflow-y-auto custom-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 max-w-3xl ${
                isUser ? 'ml-auto flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                  isUser ? 'bg-gradient-to-r from-saffron-500 to-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-saffron-600 dark:text-saffron-400 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs space-y-2 leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-gradient-to-r from-saffron-500 to-amber-500 text-white rounded-tr-none font-bold'
                    : 'bg-white dark:bg-slate-900 rounded-tl-none border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100'
                }`}
              >
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-1.5 text-[10px]">
                  <span className="font-bold text-saffron-700 dark:text-saffron-400">{msg.agentRole}</span>
                  <span className="font-mono text-slate-500">{msg.timestamp}</span>
                </div>

                <p className="font-indic text-sm font-semibold leading-relaxed">{msg.textNative}</p>

                {!isUser && msg.textEnglish && currentLanguage !== 'en' && (
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-white/10 italic">
                    English: {msg.textEnglish}
                  </p>
                )}

                {!isUser && (
                  <div className="flex items-center justify-end pt-1">
                    <button
                      onClick={() => handlePlayVoice(msg.textNative)}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-saffron-600 dark:text-saffron-400 transition"
                      title="Speak Message in Mother Tongue"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-saffron-600 dark:text-saffron-400 p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl w-fit font-semibold animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>AI Domain Agent is synthesizing personalized regional answer...</span>
          </div>
        )}
      </div>

      {/* Input Message Form */}
      <div className="glass-card p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center space-x-2">
        <button
          onClick={() => {
            aiEngine.simulateASR(null, currentLanguage).then(res => {
              setInputText(res.transcript);
            });
          }}
          className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-saffron-600 dark:text-saffron-400 transition"
          title="Voice Speech Input"
        >
          <Mic className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={`Ask your ${currentUserRole.replace('_', ' ')} question in ${currentLangObj.nativeName} (${currentLangObj.name})...`}
          className="flex-1 glass-input px-4 py-2.5 rounded-xl text-xs font-indic focus:outline-none"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim()}
          className="p-3 rounded-xl bg-gradient-to-r from-saffron-500 via-amber-500 to-saffron-600 text-white font-bold transition shadow-lg shadow-saffron-500/20 disabled:opacity-50 hover:brightness-110 active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
