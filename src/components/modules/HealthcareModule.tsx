import React, { useState } from 'react';
import { 
  Stethoscope, 
  Volume2, 
  AlertTriangle, 
  FileText, 
  CheckCircle, 
  Play, 
  Mic,
  MicOff,
  Radio,
  Pill,
  ShieldCheck,
  Bell,
  Clock,
  Activity,
  Heart,
  Thermometer,
  Zap,
  Check,
  Send,
  Sparkles,
  UploadCloud,
  FileCheck
} from 'lucide-react';
import { LanguageCode, HealthcareSymptomCard } from '../../types';
import { MOCK_HEALTHCARE_DATA, SUPPORTED_LANGUAGES } from '../../data/mockData';
import { aiEngine } from '../../services/aiEngine';
import confetti from 'canvas-confetti';

import { createLiveSpeechRecognizer, LiveSpeechRecognitionController } from '../../utils/speechToText';

interface HealthcareModuleProps {
  currentLanguage: LanguageCode;
}

export const HealthcareModule: React.FC<HealthcareModuleProps> = ({ currentLanguage }) => {
  const [patientsList, setPatientsList] = useState<HealthcareSymptomCard[]>(MOCK_HEALTHCARE_DATA);
  const [selectedCase, setSelectedCase] = useState<HealthcareSymptomCard>(MOCK_HEALTHCARE_DATA[0]);
  const [activeTab, setActiveTab] = useState<'triage' | 'voice_input' | 'prescription'>('triage');
  const [selectedSummaryLang, setSelectedSummaryLang] = useState<LanguageCode>(currentLanguage);
  const [isAlertNotified, setIsAlertNotified] = useState(false);
  const [isQueueVoiceInputOpen, setIsQueueVoiceInputOpen] = useState(false);

  // Voice Input State
  const [isRecording, setIsRecording] = useState(false);
  const [recordedVoiceText, setRecordedVoiceText] = useState('मला गेल्या दोन तासांपासून छातीत तीव्र कळा येत आहेत आणि घाम फुटला आहे.');
  const [voiceLang, setVoiceLang] = useState<LanguageCode>('mr');
  const [recognizer, setRecognizer] = useState<LiveSpeechRecognitionController | null>(null);
  const [voiceTranslatedData, setVoiceTranslatedData] = useState<{ mr: string; hi: string; en: string; risk: string; score: number } | null>({
    mr: 'मला गेल्या दोन तासांपासून छातीत तीव्र कळा येत आहेत आणि घाम फुटला आहे.',
    hi: 'मुझे पिछले दो घंटे से सीने में तेज दर्द हो रहा है और अत्यधिक पसीना आ रहा है।',
    en: 'Patient reports severe retrosternal chest pain and diaphoresis for the last two hours.',
    risk: 'High (Emergency)',
    score: 94
  });

  const [activePlayingVoiceId, setActivePlayingVoiceId] = useState<string | null>(null);

  // Prescription OCR state
  const [selectedRx, setSelectedRx] = useState<'cardio' | 'antibiotic'>('cardio');
  const [rxLang, setRxLang] = useState<LanguageCode>(currentLanguage);

  const handleSpeakMedical = (text: string, lang: LanguageCode = currentLanguage, id?: string) => {
    if (id) {
      setActivePlayingVoiceId(id);
    }
    aiEngine.speakText(
      text, 
      lang, 
      1.0, 
      1.0, 
      'female',
      () => {
        if (id) setActivePlayingVoiceId(id);
      },
      () => {
        setActivePlayingVoiceId(null);
      }
    );
  };

  const handleTriggerEmergencyAlert = () => {
    setIsAlertNotified(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.6 }
    });
    setTimeout(() => setIsAlertNotified(false), 5000);
  };

  const startLiveVoiceRecording = (lang: LanguageCode = voiceLang) => {
    if (isRecording) {
      if (recognizer) recognizer.stop();
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    setRecordedVoiceText('');

    const rec = createLiveSpeechRecognizer(
      lang,
      (transcript, isFinal) => {
        setRecordedVoiceText(transcript);
        updateVoiceTranslations(transcript, lang);
      },
      (err) => {
        console.warn('Speech error:', err);
        setIsRecording(false);
      },
      () => {
        setIsRecording(false);
      }
    );

    setRecognizer(rec);
    rec.start();
  };

  const updateVoiceTranslations = (text: string, lang: LanguageCode) => {
    const isEmerg = text.includes('छातीत') || text.includes('कळ') || text.includes('दर्द') || text.includes('chest') || text.includes('pain') || text.includes('breath');
    const isUrg = text.includes('ताप') || text.includes('खोकला') || text.includes('fever') || text.includes('cough') || text.includes('बुखार');

    if (lang === 'mr') {
      setVoiceTranslatedData({
        mr: text,
        hi: `[हिंदी रूपांतरण]: ${text} (चिकित्सीय अनुवादित)`,
        en: `Patient presents with reported symptoms: ${text}`,
        risk: isEmerg ? 'High (Emergency Cat. 1)' : isUrg ? 'Moderate (Urgent Priority)' : 'Low (Routine Care)',
        score: isEmerg ? 95 : isUrg ? 68 : 34
      });
    } else if (lang === 'hi') {
      setVoiceTranslatedData({
        mr: `[मराठी रूपांतरण]: ${text} (वैद्यकीय भाषांतर)`,
        hi: text,
        en: `Patient clinical observation: ${text}`,
        risk: isEmerg ? 'High (Emergency Cat. 1)' : isUrg ? 'Moderate (Urgent Priority)' : 'Low (Routine Care)',
        score: isEmerg ? 95 : isUrg ? 68 : 34
      });
    } else {
      setVoiceTranslatedData({
        mr: `[मराठी अनुवाद]: ${text}`,
        hi: `[हिंदी अनुवाद]: ${text}`,
        en: text,
        risk: isEmerg ? 'High (Emergency Cat. 1)' : isUrg ? 'Moderate (Urgent Priority)' : 'Low (Routine Care)',
        score: isEmerg ? 95 : isUrg ? 68 : 34
      });
    }
  };

  const handleSubmitSpokenCase = (spokenText?: string) => {
    const text = spokenText || recordedVoiceText;
    if (!text.trim()) return;

    const newId = `hc-${100 + patientsList.length + 1}`;
    const isEmergency = text.includes('छातीत') || text.includes('कळ') || text.includes('दर्द') || text.includes('chest') || text.includes('heart') || text.includes('breath');
    const isUrgent = text.includes('ताप') || text.includes('खोकला') || text.includes('fever') || text.includes('cough') || text.includes('बुखार');

    const urgency: 'Emergency' | 'Urgent' | 'Normal' = isEmergency ? 'Emergency' : isUrgent ? 'Urgent' : 'Normal';
    const riskLevel = isEmergency ? 'High' : isUrgent ? 'Moderate' : 'Low';
    const riskScore = isEmergency ? 95 : isUrgent ? 68 : 34;

    const newPatient: HealthcareSymptomCard = {
      id: newId,
      patientName: `Voice Patient (${voiceLang === 'mr' ? 'मराठी' : voiceLang === 'hi' ? 'हिंदी' : 'English'})`,
      patientAge: '45 Yrs',
      patientGender: 'Spoken Case',
      chiefComplaint: text,
      symptoms: [
        isEmergency ? 'Chest pain / छातीत वेदना' : isUrgent ? 'High Fever / तीव्र ताप' : 'Abdominal cramps / पोटदुखी',
        isEmergency ? 'Dyspnea / श्वास घेण्यास त्रास' : isUrgent ? 'Cough / खोकला' : 'Nausea / मळमळ',
        '🎤 Voice Input Verified'
      ],
      duration: 'Just Now (Live Voice)',
      translatedMedicalSummary: {
        mr: `रुग्णाने आवाजाद्वारे नोंदवलेले लक्षण: "${text}". तातडीने वैद्यकीय तपासणी आणि triage प्रोटोकॉलची अंमलबजावणी करावी.`,
        hi: `मरीज द्वारा आवाज से दर्ज लक्षण: "${text}". तुरंत चिकित्सीय जांच और ट्राइएज प्रोटोकॉल लागू करें।`,
        en: `Patient reported via live voice input: "${text}". Immediate clinical evaluation and triage protocol recommended.`
      },
      urgencyLevel: urgency,
      riskLevel: riskLevel,
      riskScore: riskScore,
      confidenceScore: 97.4,
      suggestedAction: isEmergency ? 'Immediate 12-lead ECG, ICU admission & Emergency Clinician Review' : isUrgent ? 'Antipyretic therapy & Vital Monitoring' : 'Routine Clinical Consultation & Hydration',
      responsePriority: isEmergency ? 'Immediate (< 5 mins)' : isUrgent ? 'Priority (< 30 mins)' : 'Routine (< 2 hours)',
      vitalSigns: {
        bp: isEmergency ? '155/95 mmHg' : isUrgent ? '125/82 mmHg' : '118/78 mmHg',
        heartRate: isEmergency ? '108 bpm' : isUrgent ? '88 bpm' : '72 bpm',
        spo2: isEmergency ? '92%' : isUrgent ? '97%' : '99%',
        temp: isEmergency ? '98.6°F' : isUrgent ? '102.1°F' : '98.4°F'
      },
      triageNotes: `Live Voice Input processed via Indic Speech-to-Text (${voiceLang.toUpperCase()}). Patient verbal triage verified.`,
      consentId: `MED-VOICE-${Math.floor(100000 + Math.random() * 900000)}`,
      consentTimestamp: new Date().toLocaleString(),
      emergencyAlertTriggered: isEmergency
    };

    setPatientsList([newPatient, ...patientsList]);
    setSelectedCase(newPatient);
    setIsQueueVoiceInputOpen(false);
    confetti({ particleCount: 40, spread: 60 });
    handleSpeakMedical(`New patient ${newId} recorded via voice. Triage level is ${urgency}.`, 'en');
  };

  const prescriptionItems = {
    cardio: {
      title: 'Cardiology Emergency Care Rx - Dr. Kulkarni (MD, DM)',
      doctor: 'Dr. S. Kulkarni (Apex Heart Institute)',
      date: '30 August 2026',
      medicines: [
        {
          name: 'Tab. Sorbitrate 5mg (सॉर्बिट्रेट)',
          dosage: '1 Tab Sublingual (जिभेखाली ठेवावी)',
          timing: 'Immediate SOS / तातडीने १ गोळी जिभेखाली',
          instructions: {
            mr: 'छातीत दुखू लागल्यास त्वरित १ गोळी जिभेखाली ठेवावी. गिळू नये. (Take 1 tablet under tongue immediately)',
            hi: 'सीने में दर्द होने पर तुरंत 1 गोली जीभ के नीचे रखें। निगलें नहीं।',
            en: 'Place 1 tablet under the tongue immediately upon chest discomfort. Do not swallow directly.'
          }
        },
        {
          name: 'Tab. Ecosprin AV 75/20mg (इकोस्प्रिन)',
          dosage: '1 Tab Once Daily after dinner',
          timing: 'Night after meals / रात्री जेवणानंतर',
          instructions: {
            mr: 'रोज रात्री जेवणानंतर १ गोळी पाण्यासोबत नियमित घ्यावी. (Take 1 tablet daily after dinner)',
            hi: 'रोजाना रात को भोजन के बाद 1 गोली पानी के साथ नियमित लें।',
            en: 'Take 1 tablet daily after dinner with a full glass of water.'
          }
        },
        {
          name: 'Tab. Atorvastatin 40mg (अटोरव्हास्टाटीन)',
          dosage: '1 Tab Bedtime',
          timing: 'Night before sleep / झोपण्यापूर्वी',
          instructions: {
            mr: 'रात्री झोपण्यापूर्वी १ गोळी घ्यावी. (Take 1 tablet at bedtime)',
            hi: 'रात को सोने से पहले 1 गोली लें।',
            en: 'Take 1 tablet at bedtime regularly for lipid control.'
          }
        }
      ],
      remarks: {
        mr: 'तणाव टाळा, हलका आहार घ्या आणि २४ तासांत पुन्हा ईसीजी (ECG) तपासणी करा.',
        hi: 'तनाव से बचें, सुपाच्य भोजन लें और 24 घंटे में दोबारा ईसीजी कराएं।',
        en: 'Avoid strenuous physical activity, maintain low-sodium diet and repeat 12-lead ECG in 24 hours.'
      }
    },
    antibiotic: {
      title: 'General OPD & Fever Prescription - Dr. A. Verma (MBBS)',
      doctor: 'Dr. Anita Verma (Civil District Hospital)',
      date: '30 August 2026',
      medicines: [
        {
          name: 'Tab. Paracetamol 650mg (डोलो / पॅरासिटामॉल)',
          dosage: '1 Tab TID (दिवसातून ३ वेळा)',
          timing: 'Morning - Afternoon - Night / सकाळी-दुपारी-रात्री',
          instructions: {
            mr: 'ताप आल्यास किंवा दिवसातून ३ वेळा जेवणानंतर १ गोळी घ्यावी. (Take 1 tablet 3 times a day after meals)',
            hi: 'बुखार होने पर या दिन में 3 बार भोजन के बाद 1 गोली लें।',
            en: 'Take 1 tablet 3 times a day after meals as needed for fever and pain.'
          }
        },
        {
          name: 'Cap. Amoxicillin 500mg (अमोक्सिसिलिन अँटिबायोटिक)',
          dosage: '1 Cap Twice Daily for 5 Days',
          timing: 'Morning & Night / सकाळी आणि रात्री',
          instructions: {
            mr: 'सकाळी व रात्री जेवणानंतर १ कॅप्सूल नियमित ५ दिवस पूर्ण घ्या. कोर्स अर्धवट सोडू नका.',
            hi: 'सुबह और रात को भोजन के बाद 1 कैप्सूल नियमित 5 दिनों तक लें। कोर्स पूरा करें।',
            en: 'Take 1 capsule twice daily after meals for a complete 5-day antibiotic course.'
          }
        },
        {
          name: 'Sachet ORS Electrolyte (इलेक्ट्रोलाइट पावडर)',
          dosage: '1 Liter water solution throughout the day',
          timing: 'Throughout the day / दिवसभरात',
          instructions: {
            mr: '१ पाकीट १ लिटर स्वच्छ पाण्यात मिसळून दिवसभरात थोडे थोडे प्या.',
            hi: '1 पैकेट 1 लीटर स्वच्छ पानी में घोलकर दिन भर धीरे-धीरे पिएं।',
            en: 'Dissolve 1 sachet in 1 liter of boiled drinking water and consume across the day.'
          }
        }
      ],
      remarks: {
        mr: 'भरपूर पाणी प्या, विश्रांती घ्या आणि ३ दिवसांनी पुन्हा तपासणीसाठी या.',
        hi: 'पर्याप्त पानी पिएं, पूर्ण आराम करें और 3 दिन बाद पुनः दिखाएं।',
        en: 'Maintain high fluid intake, rest adequately, and follow up after 3 days.'
      }
    }
  };

  const currentRxData = prescriptionItems[selectedRx];

  return (
    <div className="space-y-6">
      
      {/* Top Patient Dashboard Command Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="glass-card p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-400 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Total Patients</p>
            <h4 className="text-base font-black text-slate-900 dark:text-white">48 Cases</h4>
          </div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50/40 dark:bg-red-950/20 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 flex items-center justify-center font-bold relative">
            <AlertTriangle className="w-5 h-5" />
            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1 right-1 animate-ping" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-red-800 dark:text-red-300">🔴 Emergency</p>
            <h4 className="text-base font-black text-red-950 dark:text-red-100">3 Critical</h4>
          </div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-amber-800 dark:text-amber-300">🟠 Urgent Cases</p>
            <h4 className="text-base font-black text-amber-950 dark:text-amber-100">11 Priority</h4>
          </div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">🟢 Normal Cases</p>
            <h4 className="text-base font-black text-emerald-950 dark:text-emerald-100">34 Routine</h4>
          </div>
        </div>

        <div className="glass-card p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 shadow-sm col-span-2 sm:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Avg Triage Time</p>
            <h4 className="text-base font-black text-slate-900 dark:text-white">42 Seconds</h4>
          </div>
        </div>
      </div>

      {/* Header Banner & Tab Navigation */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-rose-500/20 text-rose-700 dark:text-rose-400 border border-rose-500/30">
              <Stethoscope className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">AI Healthcare & Clinical Multilingual Portal</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Real-time patient-doctor symptom translation, triage prioritization & prescription audio instructions in Marathi, Hindi & English
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('triage')}
            className={`px-3.5 py-2 rounded-lg font-black transition cursor-pointer ${
              activeTab === 'triage'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Symptom Translator & Triage
          </button>
          <button
            onClick={() => setActiveTab('voice_input')}
            className={`px-3.5 py-2 rounded-lg font-black transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'voice_input'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Voice Symptom Input</span>
          </button>
          <button
            onClick={() => setActiveTab('prescription')}
            className={`px-3.5 py-2 rounded-lg font-black transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'prescription'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Pill className="w-3.5 h-3.5" />
            <span>Prescription Reader</span>
          </button>
        </div>
      </div>

      {/* Emergency Alert Notification Banner if Triggered */}
      {isAlertNotified && (
        <div className="p-4 rounded-2xl bg-red-600 text-white flex items-center justify-between shadow-xl animate-bounce">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6 animate-spin" />
            <div>
              <h4 className="font-black text-sm">🚨 EMERGENCY CODE BLUE / TRAUMA ALERT DISPATCHED</h4>
              <p className="text-xs text-red-100 font-medium">On-duty Emergency Physician, Cardiac ICU & Crash Cart dispatched to Triage Bay #{selectedCase.id}.</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-white/20 text-white rounded-lg text-xs font-bold">Priority Dispatched</span>
        </div>
      )}

      {/* TAB 1: SYMPTOM TRANSLATOR & LIVE TRIAGE */}
      {activeTab === 'triage' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Patient Triage Queues with Voice Input Button */}
          <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-2">
              <div>
                <h3 className="font-black text-xs text-slate-700 dark:text-slate-400 uppercase tracking-wider">
                  Patient Triage Queue
                </h3>
              </div>
              <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400">{patientsList.length} Active Cases</span>
            </div>

            {/* + 🎤 Speak & Record New Patient Voice Symptoms Button */}
            <button
              type="button"
              onClick={() => setIsQueueVoiceInputOpen(!isQueueVoiceInputOpen)}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition shadow-sm cursor-pointer ${
                isQueueVoiceInputOpen
                  ? 'bg-slate-800 text-white'
                  : 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white'
              }`}
            >
              <Mic className={`w-4 h-4 ${isQueueVoiceInputOpen ? 'text-rose-400 animate-bounce' : ''}`} />
              <span>{isQueueVoiceInputOpen ? 'Close Voice Recorder' : '+ 🎤 Record Patient Voice Symptoms'}</span>
            </button>

            {/* Interactive In-line Live Voice Input Box */}
            {isQueueVoiceInputOpen && (
              <div className="p-4 bg-rose-50/70 dark:bg-rose-950/40 rounded-2xl border-2 border-dashed border-rose-300 dark:border-rose-800/80 space-y-3 animate-fadeIn">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black text-rose-900 dark:text-rose-200">
                    Live Microphone ASR Input
                  </span>
                  
                  {/* Language Selector */}
                  <select
                    value={voiceLang}
                    onChange={(e) => setVoiceLang(e.target.value as LanguageCode)}
                    className="bg-white dark:bg-slate-900 text-rose-900 dark:text-rose-300 text-[10px] font-bold rounded-lg px-2 py-1 border border-rose-200 dark:border-rose-800 cursor-pointer"
                  >
                    <option value="mr">मराठी (MR)</option>
                    <option value="hi">हिन्दी (HI)</option>
                    <option value="en">English (EN)</option>
                  </select>
                </div>

                {/* Big Live Microphone Button */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => startLiveVoiceRecording(voiceLang)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition shadow-md shrink-0 cursor-pointer ${
                      isRecording
                        ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-500/40'
                        : 'bg-rose-600 hover:bg-rose-500 text-white'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                      {isRecording ? '🔴 Listening to microphone...' : 'Click mic or pick a quick prompt:'}
                    </p>
                    {isRecording ? (
                      <div className="flex items-center gap-1 h-3 mt-1">
                        {[50, 90, 40, 100, 70, 30, 80].map((h, i) => (
                          <span key={i} className="w-1 bg-red-600 rounded-full animate-pulse" style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Speak symptoms in Marathi/Hindi/English</p>
                    )}
                  </div>
                </div>

                {/* Live Editable Transcript */}
                <textarea
                  value={recordedVoiceText}
                  onChange={(e) => {
                    setRecordedVoiceText(e.target.value);
                    updateVoiceTranslations(e.target.value, voiceLang);
                  }}
                  rows={2}
                  placeholder="Patient spoken symptoms will appear here in real-time..."
                  className="w-full p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-rose-200 dark:border-rose-800 text-xs font-indic font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                />

                {/* Quick 1-Click Regional Voice Prompts */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 block">Quick Test Voice Prompts:</span>
                  <div className="flex flex-col gap-1 text-[10px]">
                    <button
                      type="button"
                      onClick={() => {
                        const txt = 'मला छातीत तीव्र कळा येत आहेत आणि डाव्या हातात कळ जातेय.';
                        setRecordedVoiceText(txt);
                        setVoiceLang('mr');
                        updateVoiceTranslations(txt, 'mr');
                      }}
                      className="text-left p-1.5 bg-white dark:bg-slate-900 hover:bg-rose-100 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 font-semibold cursor-pointer"
                    >
                      ⚡ "मला छातीत तीव्र कळा येत आहेत आणि डाव्या हातात कळ जातेय." (Emergency)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const txt = '3 दिनों से तेज बुखार और लगातार खांसी की शिकायत है।';
                        setRecordedVoiceText(txt);
                        setVoiceLang('hi');
                        updateVoiceTranslations(txt, 'hi');
                      }}
                      className="text-left p-1.5 bg-white dark:bg-slate-900 hover:bg-rose-100 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 font-semibold cursor-pointer"
                    >
                      ⚡ "3 दिनों से तेज बुखार और लगातार खांसी की शिकायत है।" (Urgent)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const txt = 'Severe acute dyspnea and retrosternal pressure since morning.';
                        setRecordedVoiceText(txt);
                        setVoiceLang('en');
                        updateVoiceTranslations(txt, 'en');
                      }}
                      className="text-left p-1.5 bg-white dark:bg-slate-900 hover:bg-rose-100 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 font-semibold cursor-pointer"
                    >
                      ⚡ "Severe acute dyspnea and retrosternal pressure." (English)
                    </button>
                  </div>
                </div>

                {/* + Submit Spoken Case */}
                <button
                  type="button"
                  onClick={() => handleSubmitSpokenCase()}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>+ Process & Add Spoken Case to Triage</span>
                </button>
              </div>
            )}

            {/* Patients Triage List */}
            <div className="space-y-2.5">
              {patientsList.map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCase(item)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs cursor-pointer ${
                    selectedCase.id === item.id
                      ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 dark:border-rose-500/60 text-rose-950 dark:text-rose-100 shadow-md ring-2 ring-rose-500/30'
                      : 'bg-slate-50 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-black text-sm text-slate-900 dark:text-white">{item.id}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      item.urgencyLevel === 'Emergency' 
                        ? 'bg-red-500/20 text-red-800 dark:text-red-300 border border-red-500/30' 
                        : item.urgencyLevel === 'Urgent'
                        ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {item.urgencyLevel}
                    </span>
                  </div>

                  <p className="font-bold text-slate-700 dark:text-slate-400 text-[11px] mb-1">
                    👤 {item.patientName} • {item.patientAge} ({item.patientGender})
                  </p>

                  <p className="font-indic text-slate-900 dark:text-slate-200 font-semibold line-clamp-2 leading-tight">
                    {item.chiefComplaint}
                  </p>

                  {/* Duration, Risk Score & 🔊 Direct Voice Button */}
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-[10px]">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                      <span>⏱️ {item.duration}</span>
                      <span>•</span>
                      <span className="font-bold text-rose-700 dark:text-rose-400">Risk: {item.riskScore}%</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        const textToSpeak = item.translatedMedicalSummary[currentLanguage] || item.chiefComplaint;
                        handleSpeakMedical(textToSpeak, currentLanguage, item.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg font-black text-[10px] flex items-center gap-1 transition shadow-xs cursor-pointer ${
                        activePlayingVoiceId === item.id
                          ? 'bg-red-600 text-white animate-pulse'
                          : 'bg-rose-600 hover:bg-rose-500 text-white active:scale-95'
                      }`}
                    >
                      <Volume2 className={`w-3 h-3 ${activePlayingVoiceId === item.id ? 'animate-bounce' : ''}`} />
                      <span>{activePlayingVoiceId === item.id ? 'Playing Voice...' : '🔊 Voice (ऐका)'}</span>
                    </button>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Selected Case Details, Medical Summary & AI Risk Card */}
          <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5 lg:col-span-2 shadow-sm">
            
            {/* Top Patient Header & Vitals */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-3">
              <div>
                <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Selected Triage Patient Case:</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <h3 className="font-black text-lg text-slate-900 dark:text-white">{selectedCase.id}</h3>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">({selectedCase.patientName})</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                  {selectedCase.patientAge} • {selectedCase.patientGender} • Duration: {selectedCase.duration}
                </p>
              </div>

              {/* Urgency Badge */}
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-sm ${
                  selectedCase.urgencyLevel === 'Emergency'
                    ? 'bg-red-600 text-white animate-pulse'
                    : selectedCase.urgencyLevel === 'Urgent'
                    ? 'bg-amber-500 text-white'
                    : 'bg-emerald-600 text-white'
                }`}>
                  <AlertTriangle className="w-4 h-4" />
                  <span>{selectedCase.urgencyLevel} Priority</span>
                </span>
              </div>
            </div>

            {/* Vital Signs Grid */}
            {selectedCase.vitalSigns && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">BLOOD PRESSURE</span>
                  <span className="text-xs font-black text-rose-700 dark:text-rose-400">{selectedCase.vitalSigns.bp}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">HEART RATE</span>
                  <span className="text-xs font-black text-rose-700 dark:text-rose-400">{selectedCase.vitalSigns.heartRate}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">SPO2 LEVEL</span>
                  <span className="text-xs font-black text-teal-700 dark:text-teal-400">{selectedCase.vitalSigns.spo2}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">TEMPERATURE</span>
                  <span className="text-xs font-black text-amber-700 dark:text-amber-400">{selectedCase.vitalSigns.temp}</span>
                </div>
              </div>
            )}

            {/* Symptoms Tags with Audio Pronounce */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-400 block">Chief Symptoms (Click to Listen Pronunciation):</label>
                <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold">🔊 Audio Enabled</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCase.symptoms.map((symptom, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSpeakMedical(symptom, currentLanguage, `symptom-${idx}`)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition ${
                      activePlayingVoiceId === `symptom-${idx}`
                        ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                        : 'bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-950 dark:text-rose-200 border-rose-200 dark:border-rose-800/60'
                    }`}
                  >
                    <span>{symptom}</span>
                    <Volume2 className="w-3 h-3 opacity-70" />
                  </button>
                ))}
              </div>
            </div>

            {/* SIDE-BY-SIDE CARDS: (1) Regional Medical Summary & (2) ⭐ AI Patient Risk & Triage Score */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* CARD 1: Regional Medical Summary */}
              <div className="bg-slate-50 dark:bg-slate-900/90 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-black text-rose-700 dark:text-rose-400">
                      Regional Medical Summary
                    </span>
                    
                    {/* Language Selector Pills */}
                    <div className="flex gap-1 bg-white dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                      {(['en', 'mr', 'hi'] as LanguageCode[]).map(code => (
                        <button
                          key={code}
                          onClick={() => setSelectedSummaryLang(code)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition cursor-pointer ${
                            selectedSummaryLang === code
                              ? 'bg-rose-600 text-white'
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {code === 'en' ? 'English' : code === 'mr' ? 'मराठी' : 'हिन्दी'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs font-indic leading-relaxed text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 font-semibold mt-3 min-h-[90px]">
                    "{selectedCase.translatedMedicalSummary[selectedSummaryLang] || selectedCase.translatedMedicalSummary['en']}"
                  </p>
                </div>

                {/* Listen Voice Instructions Button */}
                <button
                  type="button"
                  onClick={() => handleSpeakMedical(selectedCase.translatedMedicalSummary[selectedSummaryLang] || selectedCase.translatedMedicalSummary['en'], selectedSummaryLang, 'summary')}
                  className={`w-full py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition shadow-sm cursor-pointer ${
                    activePlayingVoiceId === 'summary'
                      ? 'bg-emerald-600 text-white animate-pulse ring-4 ring-emerald-500/30'
                      : 'bg-rose-600 hover:bg-rose-500 text-white'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${activePlayingVoiceId === 'summary' ? 'animate-bounce' : ''}`} />
                  <span>
                    {activePlayingVoiceId === 'summary' 
                      ? '🔊 Playing Medical Audio Instructions...' 
                      : `🔊 Listen Audio in ${selectedSummaryLang === 'en' ? 'English' : selectedSummaryLang === 'mr' ? 'मराठी' : 'हिन्दी'}`}
                  </span>
                </button>
              </div>

              {/* CARD 2: ⭐ AI Patient Risk & Triage Score Card (The exact card requested by the user) */}
              <div className="bg-gradient-to-br from-slate-50 to-rose-50/30 dark:from-slate-900 dark:to-rose-950/20 p-4 rounded-2xl border-2 border-rose-200 dark:border-rose-900/50 space-y-3 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-rose-200 dark:border-rose-900/40">
                    <h4 className="font-black text-xs text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-rose-600" />
                      AI Patient Risk & Triage Score
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-800 dark:text-rose-300">
                      Triage AI v2.4
                    </span>
                  </div>

                  {/* Risk Level & Score Meter */}
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-700 dark:text-slate-300">Risk Assessment:</span>
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-black ${
                        selectedCase.riskLevel === 'High'
                          ? 'bg-red-500/20 text-red-800 dark:text-red-300 border border-red-500/40'
                          : selectedCase.riskLevel === 'Moderate'
                          ? 'bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40'
                          : 'bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40'
                      }`}>
                        {selectedCase.riskLevel === 'High' ? '🔴 High Risk' : selectedCase.riskLevel === 'Moderate' ? '🟠 Moderate Risk' : '🟢 Low Risk'}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          selectedCase.riskLevel === 'High' ? 'bg-red-500' : selectedCase.riskLevel === 'Moderate' ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${selectedCase.riskScore}%` }}
                      />
                    </div>

                    {/* Clinical Properties */}
                    <div className="space-y-1 text-xs pt-1">
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Confidence:</span>
                        <span className="font-black text-slate-900 dark:text-white">{selectedCase.confidenceScore}%</span>
                      </div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Priority:</span>
                        <span className="font-black text-rose-700 dark:text-rose-400">{selectedCase.urgencyLevel} (Cat. 1)</span>
                      </div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Response Priority:</span>
                        <span className="font-black text-slate-900 dark:text-white">{selectedCase.responsePriority}</span>
                      </div>
                      <div className="pt-1 text-[11px] text-slate-700 dark:text-slate-300 font-semibold bg-white/70 dark:bg-slate-950/70 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                        <span className="text-rose-700 dark:text-rose-400 font-bold">Suggested Action: </span>
                        {selectedCase.suggestedAction}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 🔔 Trigger Emergency Notification Button */}
                <button
                  onClick={handleTriggerEmergencyAlert}
                  className="w-full py-2 bg-red-600 hover:bg-red-700 active:scale-98 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span>Notify Emergency Medical Staff</span>
                </button>
              </div>

            </div>

            {/* Nurse / Clinician Guidance Box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-400">
              <span className="font-black text-slate-900 dark:text-slate-300 block mb-1">Nurse Triage Guidance:</span>
              <p className="font-medium text-slate-800 dark:text-slate-300">{selectedCase.triageNotes}</p>
            </div>

            {/* 🔐 Consent & Privacy Vault Banner */}
            <div className="p-3 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong className="font-black">Patient Consent Vault:</strong> Verbal & Digital consent recorded for multilingual AI triage.
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded text-emerald-800 dark:text-emerald-200">
                {selectedCase.consentId}
              </span>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: VOICE SYMPTOM INPUT & REAL-TIME SPEECH-TO-MEDICAL TRANSLATION */}
      {activeTab === 'voice_input' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Voice Input Panel */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Mic className="w-4 h-4 text-rose-600" />
                Patient Voice Symptom Recording
              </h3>
              
              {/* Language Switcher */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Language:</span>
                <select
                  value={voiceLang}
                  onChange={(e) => setVoiceLang(e.target.value as LanguageCode)}
                  className="bg-white dark:bg-slate-900 text-rose-900 dark:text-rose-300 font-bold text-xs rounded-xl px-3 py-1.5 border border-slate-300 dark:border-slate-700"
                >
                  <option value="mr">मराठी (Marathi)</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="en">English (English)</option>
                </select>
              </div>
            </div>

            {/* Interactive Recording Area */}
            <div className="p-8 bg-slate-50 dark:bg-slate-950 rounded-2xl border-2 border-dashed border-rose-300 dark:border-rose-900/60 text-center space-y-4">
              <button
                type="button"
                onClick={() => startLiveVoiceRecording(voiceLang)}
                className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center transition shadow-lg cursor-pointer ${
                  isRecording 
                    ? 'bg-red-600 text-white animate-pulse ring-8 ring-red-500/30' 
                    : 'bg-rose-600 hover:bg-rose-500 text-white'
                }`}
              >
                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>

              <div>
                <h4 className="font-black text-sm text-slate-900 dark:text-white">
                  {isRecording ? '🔴 Listening to Live Microphone...' : 'Click to Speak Patient Symptoms'}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
                  {isRecording 
                    ? 'Speak in Marathi, Hindi, or English. Live speech-to-text is capturing your words...' 
                    : 'Speak symptoms naturally. AI will transcribe, translate and assign triage score.'}
                </p>
              </div>

              {/* Waveform Animation when recording */}
              {isRecording && (
                <div className="flex justify-center items-center gap-1.5 h-8">
                  {[40, 75, 100, 60, 90, 45, 80, 50, 95, 30].map((h, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-rose-600 rounded-full animate-pulse" 
                      style={{ height: `${h}%`, animationDelay: `${i * 80}ms` }} 
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Transcribed Input Text */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Transcribed Patient Statement:
              </label>
              <textarea
                value={recordedVoiceText}
                onChange={(e) => {
                  setRecordedVoiceText(e.target.value);
                  updateVoiceTranslations(e.target.value, voiceLang);
                }}
                rows={3}
                className="w-full p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-indic font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Real-Time Translation & Live Risk Engine */}
          <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-emerald-600" />
                Real-Time Multilingual Medical Translation & Triage
              </h3>
            </div>

            {voiceTranslatedData && (
              <div className="space-y-3 text-xs">
                {/* Marathi Stream */}
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-rose-700 dark:text-rose-400">मराठी (Marathi Medical Text)</span>
                    <button 
                      type="button"
                      onClick={() => handleSpeakMedical(voiceTranslatedData.mr, 'mr', 'voice-tab-mr')}
                      className="text-saffron-600 dark:text-saffron-400 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> <span>Play</span>
                    </button>
                  </div>
                  <p className="font-indic font-semibold text-slate-900 dark:text-slate-100">{voiceTranslatedData.mr}</p>
                </div>

                {/* Hindi Stream */}
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-rose-700 dark:text-rose-400">हिन्दी (Hindi Medical Text)</span>
                    <button 
                      type="button"
                      onClick={() => handleSpeakMedical(voiceTranslatedData.hi, 'hi', 'voice-tab-hi')}
                      className="text-saffron-600 dark:text-saffron-400 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> <span>Play</span>
                    </button>
                  </div>
                  <p className="font-indic font-semibold text-slate-900 dark:text-slate-100">{voiceTranslatedData.hi}</p>
                </div>

                {/* English Stream */}
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-black text-rose-700 dark:text-rose-400">English (Clinical Synopsis)</span>
                    <button 
                      type="button"
                      onClick={() => handleSpeakMedical(voiceTranslatedData.en, 'en', 'voice-tab-en')}
                      className="text-saffron-600 dark:text-saffron-400 font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> <span>Play</span>
                    </button>
                  </div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{voiceTranslatedData.en}</p>
                </div>

                {/* Live Risk Output */}
                <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/40 dark:to-rose-950/40 rounded-xl border border-red-200 dark:border-red-900/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-red-700 dark:text-red-300 block">AI TRIAGE CLASSIFICATION</span>
                    <h4 className="font-black text-sm text-red-950 dark:text-red-100">{voiceTranslatedData.risk}</h4>
                  </div>
                  <span className="px-3 py-1.5 bg-red-600 text-white rounded-lg font-black text-xs">
                    Score: {voiceTranslatedData.score}%
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleSubmitSpokenCase(recordedVoiceText);
                    setActiveTab('triage');
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>+ Submit to Triage Queue & Open Patient Case</span>
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 3: PRESCRIPTION READER & MEDICAL OCR */}
      {activeTab === 'prescription' && (
        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-5 max-w-4xl mx-auto shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-3">
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Pill className="w-5 h-5 text-rose-600" />
                Prescription Reader & Audio Guidance
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                OCR extracts medicine names, dosages & timing, and reads instructions in patient's preferred language.
              </p>
            </div>

            {/* Rx Language Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Audio Lang:</span>
              <select
                value={rxLang}
                onChange={(e) => setRxLang(e.target.value as LanguageCode)}
                className="bg-white dark:bg-slate-900 text-rose-900 dark:text-rose-300 font-bold text-xs rounded-xl px-3 py-1.5 border border-slate-300 dark:border-slate-700"
              >
                <option value="mr">मराठी (Marathi)</option>
                <option value="hi">हिन्दी (Hindi)</option>
                <option value="en">English (English)</option>
              </select>
            </div>
          </div>

          {/* Prescription Selector Samples */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedRx('cardio')}
              className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                selectedRx === 'cardio'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-500/60 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-xs text-slate-900 dark:text-white">
                <FileCheck className="w-4 h-4 text-rose-600" />
                <span>Cardiology Emergency Rx (हृदयरोग औषध पत्रक)</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Apex Heart Institute • Dr. S. Kulkarni (3 Medicines)
              </p>
            </button>

            <button
              onClick={() => setSelectedRx('antibiotic')}
              className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
                selectedRx === 'antibiotic'
                  ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-500/60 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-xs text-slate-900 dark:text-white">
                <FileCheck className="w-4 h-4 text-teal-600" />
                <span>General OPD & Fever Rx (ताप व सर्दी औषध पत्रक)</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                Civil District Hospital • Dr. A. Verma (3 Medicines)
              </p>
            </button>
          </div>

          {/* Medicines Audio List */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300">
              Extracted Prescriptions & Regional Audio Guides ({rxLang === 'mr' ? 'मराठी' : rxLang === 'hi' ? 'हिन्दी' : 'English'}):
            </h4>

            {currentRxData.medicines.map((med, index) => (
              <div key={index} className="p-4 bg-slate-50 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h5 className="font-black text-xs text-slate-900 dark:text-white">{med.name}</h5>
                    <p className="text-[11px] font-bold text-rose-700 dark:text-rose-400">{med.dosage} • {med.timing}</p>
                  </div>
                  <button
                    onClick={() => handleSpeakMedical(med.instructions[rxLang], rxLang, `rx-${selectedRx}-${index}`)}
                    className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer self-start sm:self-auto ${
                      activePlayingVoiceId === `rx-${selectedRx}-${index}`
                        ? 'bg-emerald-600 text-white animate-pulse'
                        : 'bg-rose-600 hover:bg-rose-500 text-white'
                    }`}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${activePlayingVoiceId === `rx-${selectedRx}-${index}` ? 'animate-bounce' : ''}`} />
                    <span>{activePlayingVoiceId === `rx-${selectedRx}-${index}` ? 'Playing...' : 'Listen Guide'}</span>
                  </button>
                </div>

                <p className="text-xs font-indic font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  {med.instructions[rxLang]}
                </p>
              </div>
            ))}

            {/* Doctor's Remarks */}
            <div className="p-3.5 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50 text-xs">
              <span className="font-black text-amber-900 dark:text-amber-300">Doctor's Remark / डॉक्टरांचा सल्ला: </span>
              <span className="font-medium text-amber-950 dark:text-amber-200">{currentRxData.remarks[rxLang]}</span>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
