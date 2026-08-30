import React, { useState } from 'react';
import { 
  AudioWaveform, 
  ShieldCheck, 
  Mic, 
  CheckCircle, 
  Play, 
  Download, 
  Lock, 
  Key, 
  Sparkles 
} from 'lucide-react';
import { LanguageCode, VoiceProfile } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { aiEngine } from '../../services/aiEngine';

interface VoiceCloningProps {
  currentLanguage: LanguageCode;
}

export const VoiceCloning: React.FC<VoiceCloningProps> = ({ currentLanguage }) => {
  const [speakerName, setSpeakerName] = useState('Ananya Sharma / अनघा शर्मा');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [consentChecked, setConsentChecked] = useState(false);
  const [isRecordingSample, setIsRecordingSample] = useState(false);
  const [voiceProfile, setVoiceProfile] = useState<VoiceProfile | null>(null);

  const handleRecordSample = async () => {
    if (!consentChecked) return;
    setIsRecordingSample(true);
    await new Promise(res => setTimeout(res, 1500));
    const profile = aiEngine.generateVoiceProfile(speakerName, currentLanguage, gender);
    setVoiceProfile(profile);
    setIsRecordingSample(false);
  };

  const handleTestSyntheticSpeech = () => {
    if (!voiceProfile) return;
    const sampleSpeech = currentLanguage === 'mr'
      ? 'नमस्कार, हा माझा डिजिटल स्वरूपात प्रमाणित संमती-आधारित व्यक्तिगत आवाज आहे.'
      : currentLanguage === 'hi'
      ? 'नमस्ते, यह मेरी डिजिटल रूप से सत्यापित सहमति-आधारित व्यक्तिगत आवाज़ है।'
      : 'Hello, this is my digitally verified consent-governed personalized voice model.';
    aiEngine.speakText(sampleSpeech, currentLanguage);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <AudioWaveform className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white">Ethical Voice Cloning & Consent Verification Vault</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Generate personalized regional voice output with cryptographic watermarking and biometric consent in Marathi, Hindi & English
          </p>
        </div>

        <div className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>Watermark Protection ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Consent Form & Speaker Input */}
        <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">
            1. Speaker Verification & Biometric Consent
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-700 dark:text-slate-400 block mb-1 font-bold">Speaker Full Name</label>
              <input
                type="text"
                value={speakerName}
                onChange={(e) => setSpeakerName(e.target.value)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-purple-500 font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-700 dark:text-slate-400 block mb-1 font-bold">Gender Profile</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-semibold focus:outline-none focus:border-purple-500"
                >
                  <option value="female">Female Voice</option>
                  <option value="male">Male Voice</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-400 block mb-1 font-bold">Primary Language</label>
                <input
                  type="text"
                  disabled
                  value={`${currentLangObj?.name} (${currentLangObj?.nativeName})`}
                  className="w-full bg-slate-100 dark:bg-slate-950/80 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-300 font-bold"
                />
              </div>
            </div>

            {/* Consent Agreement Box */}
            <div className="p-3.5 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/30 rounded-xl space-y-2">
              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-0.5 rounded border-slate-400 dark:border-slate-700 text-purple-600 focus:ring-purple-500 bg-white dark:bg-slate-900"
                />
                <span className="text-xs text-purple-950 dark:text-purple-200 font-semibold leading-relaxed">
                  I hereby provide my explicit biometric consent to clone my voice for personalized regional speech synthesis. I acknowledge that output contains cryptographic tamper-proof watermarking.
                </span>
              </label>
            </div>

            <button
              onClick={handleRecordSample}
              disabled={!consentChecked || isRecordingSample}
              className={`w-full py-3.5 rounded-xl font-bold text-xs shadow-lg transition flex items-center justify-center space-x-2 active:scale-95 cursor-pointer ${
                !consentChecked
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-110 shadow-purple-500/25'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>
                {isRecordingSample
                  ? 'Recording 10s Voice Sample...'
                  : 'Record 10-Second Sample & Generate Profile'}
              </span>
            </button>
          </div>
        </div>

        {/* Voice Profile Card & Watermark Preview */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-2">
            2. Generated Voice Profile & Security Credentials
          </h3>

          {voiceProfile ? (
            <div className="space-y-4">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="font-bold text-purple-300">{voiceProfile.speakerName}</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded font-mono text-[10px] font-bold">
                    Consent Timestamped
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block font-medium">Profile ID:</span>
                    <span className="font-mono text-slate-200">{voiceProfile.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Quality Rating:</span>
                    <span className="text-emerald-400 font-bold">{voiceProfile.qualityScore}% Match</span>
                  </div>
                </div>

                {/* Cryptographic Watermark Hash */}
                <div className="bg-slate-950 p-2.5 rounded-lg border border-purple-500/30 flex items-center justify-between text-[10px]">
                  <div className="flex items-center space-x-1.5 text-purple-300 font-mono">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Watermark: {voiceProfile.watermarkHash}</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                </div>
              </div>

              <button
                onClick={handleTestSyntheticSpeech}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-500 text-white font-bold text-xs shadow-md hover:brightness-110 flex items-center justify-center space-x-2 active:scale-95"
              >
                <Play className="w-4 h-4" />
                <span>Test Cloned Regional Voice Output</span>
              </button>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-xs text-slate-400 italic text-center p-4">
              Complete consent agreement and record 10s voice sample to view generated profile credentials.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
