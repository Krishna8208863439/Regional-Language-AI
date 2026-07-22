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
  const [speakerName, setSpeakerName] = useState('Ananya Sharma');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [consentChecked, setConsentChecked] = useState(false);
  const [isRecordingSample, setIsRecordingSample] = useState(false);
  const [voiceProfile, setVoiceProfile] = useState<VoiceProfile | null>(null);

  const handleRecordSample = async () => {
    if (!consentChecked) return;
    setIsRecordingSample(true);
    await new Promise(res => setTimeout(res, 2000));
    const profile = aiEngine.generateVoiceProfile(speakerName, currentLanguage, gender);
    setVoiceProfile(profile);
    setIsRecordingSample(false);
  };

  const handleTestSyntheticSpeech = () => {
    if (!voiceProfile) return;
    aiEngine.speakText('नमस्ते, यह मेरी डिजिटल रूप से सत्यापित सहमति-आधारित व्यक्तिगत आवाज़ है।', currentLanguage);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);

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
            Generate personalized regional voice output with cryptographic watermarking and biometric consent
          </p>
        </div>

        <div className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Watermark Protection ACTIVE</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Consent Form & Speaker Input */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-2">
            1. Speaker Verification & Biometric Consent
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Speaker Full Name</label>
              <input
                type="text"
                value={speakerName}
                onChange={(e) => setSpeakerName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Gender Profile</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="female">Female Voice</option>
                  <option value="male">Male Voice</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Primary Language</label>
                <input
                  type="text"
                  disabled
                  value={`${currentLangObj?.name} (${currentLangObj?.nativeName})`}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-400 font-semibold"
                />
              </div>
            </div>

            {/* Consent Agreement Box */}
            <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-xl space-y-2">
              <label className="flex items-start space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="mt-0.5 rounded border-slate-700 text-purple-500 focus:ring-purple-500 bg-slate-900"
                />
                <span className="text-[11px] text-purple-200 leading-tight">
                  I hereby provide my explicit consent to clone my voice for personalized regional speech synthesis. I acknowledge that output will contain tamper-proof cryptographic watermarking.
                </span>
              </label>
            </div>

            <button
              onClick={handleRecordSample}
              disabled={!consentChecked || isRecordingSample}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-500/20 transition disabled:opacity-40 flex items-center justify-center space-x-2"
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
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="font-bold text-purple-300">{voiceProfile.speakerName}</span>
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded font-mono text-[10px]">
                    Consent Timestamped
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400 block">Profile ID:</span>
                    <span className="font-mono text-slate-200">{voiceProfile.id}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Quality Rating:</span>
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
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-saffron-500 to-amber-500 text-white font-bold text-xs shadow-md hover:brightness-110 flex items-center justify-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Test Cloned Voice Output</span>
              </button>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-xs text-slate-500 italic text-center p-4">
              Complete consent agreement and record 10s voice sample to view generated profile details.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
