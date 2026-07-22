import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Play, 
  Pause, 
  Download, 
  Sliders, 
  RefreshCw, 
  Users, 
  CheckCircle2, 
  Radio, 
  Sparkles,
  Zap
} from 'lucide-react';
import { LanguageCode, ASRResult } from '../../types';
import { SUPPORTED_LANGUAGES, SAMPLE_TRANSLATIONS } from '../../data/mockData';
import { aiEngine } from '../../services/aiEngine';

interface VoiceTranslatorProps {
  currentLanguage: LanguageCode;
}

export const VoiceTranslator: React.FC<VoiceTranslatorProps> = ({ currentLanguage }) => {
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>('hi');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlayingOutput, setIsPlayingOutput] = useState(false);
  const [asrData, setAsrData] = useState<ASRResult | null>(null);
  
  // Audio controls
  const [pitch, setPitch] = useState<number>(1.0);
  const [rate, setRate] = useState<number>(1.0);
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>('female');
  const [noiseSuppression, setNoiseSuppression] = useState(true);

  // Audio Canvas visualizer ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Simulate Canvas Waveform Animation while recording
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bars = 36;
      const width = canvas.width / bars;

      for (let i = 0; i < bars; i++) {
        const height = isRecording
          ? Math.sin(step + i * 0.3) * 20 + Math.random() * 25 + 5
          : 4;
        ctx.fillStyle = isRecording ? '#f97316' : '#334155';
        ctx.fillRect(i * width, canvas.height / 2 - height / 2, width - 2, height);
      }
      step += 0.15;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRecording]);

  const toggleRecording = async () => {
    if (isRecording) {
      setIsRecording(false);
      setIsProcessing(true);
      const result = await aiEngine.simulateASR(null, currentLanguage);
      setAsrData(result);
      setIsProcessing(false);
    } else {
      setIsRecording(true);
      setAsrData(null);
    }
  };

  const handleSpeakOutput = () => {
    if (!asrData) return;
    setIsPlayingOutput(true);
    
    // Fetch translated native text for target language
    const targetSample = SAMPLE_TRANSLATIONS[targetLanguage]?.native || asrData.transcript;
    aiEngine.speakText(targetSample, targetLanguage, pitch, rate, voiceGender);
    
    setTimeout(() => {
      setIsPlayingOutput(false);
    }, 4000);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);
  const targetLangObj = SUPPORTED_LANGUAGES.find(l => l.code === targetLanguage);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between glass-panel p-5 rounded-2xl border border-slate-800 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-saffron-500/20 text-saffron-400 border border-saffron-500/30">
              <Mic className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white">Real-Time Speech-to-Speech & ASR Engine</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Continuous stream transcription with noise reduction, speaker diarization & natural TTS synthesis
          </p>
        </div>

        {/* Target Language Switcher */}
        <div className="flex items-center space-x-3 bg-slate-900/80 p-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-medium">Target Speech Language:</span>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value as LanguageCode)}
            className="bg-slate-800 text-saffron-400 font-semibold text-xs rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none"
          >
            {SUPPORTED_LANGUAGES.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.nativeName} ({lang.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Microphone & Waveform Card */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 text-center relative overflow-hidden">
        
        {/* Background glow when recording */}
        {isRecording && (
          <div className="absolute inset-0 bg-gradient-to-t from-saffron-600/10 via-transparent to-transparent pointer-events-none animate-pulse" />
        )}

        <div className="max-w-md mx-auto space-y-6">
          
          <div className="flex justify-center items-center space-x-2 text-xs font-semibold">
            <span className="text-slate-400">Input Source:</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-saffron-400 border border-saffron-500/30 flex items-center gap-1">
              <Radio className="w-3 h-3 animate-ping text-saffron-500" />
              {currentLangObj?.name} ({currentLangObj?.nativeName})
            </span>
          </div>

          {/* Record Button */}
          <div className="relative inline-block">
            <button
              onClick={toggleRecording}
              className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-2xl ${
                isRecording
                  ? 'bg-gradient-to-r from-red-600 to-saffron-600 text-white recording-pulse scale-105'
                  : 'bg-gradient-to-r from-saffron-500 to-amber-500 text-white hover:shadow-saffron-500/30'
              }`}
            >
              {isRecording ? <MicOff className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
            </button>
          </div>

          <p className="text-xs font-medium text-slate-300">
            {isRecording
              ? 'Listening to live speech... Click to stop & transcribe'
              : 'Click Microphone to start real-time regional ASR'}
          </p>

          {/* Canvas Waveform Visualizer */}
          <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 flex justify-center">
            <canvas ref={canvasRef} width={280} height={48} className="w-full max-w-xs" />
          </div>

          {/* Environmental Controls & Toggles */}
          <div className="flex items-center justify-center space-x-4 text-xs">
            <label className="flex items-center space-x-2 cursor-pointer text-slate-400 hover:text-slate-200">
              <input
                type="checkbox"
                checked={noiseSuppression}
                onChange={(e) => setNoiseSuppression(e.target.checked)}
                className="rounded border-slate-700 text-saffron-500 focus:ring-saffron-500 bg-slate-900"
              />
              <span className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Noisy Environment Suppressor
              </span>
            </label>
          </div>

        </div>
      </div>

      {/* Processing Loader */}
      {isProcessing && (
        <div className="glass-panel p-4 rounded-xl text-center text-xs text-slate-300 flex justify-center items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-saffron-400" />
          <span>Processing IndicASR acoustic feature extraction & punctuation restoration...</span>
        </div>
      )}

      {/* Transcription & Speech Output Display */}
      {asrData && !isProcessing && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Source Transcription Card */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-saffron-500"></span>
                <h3 className="font-bold text-sm text-white">Live ASR Transcript ({currentLangObj?.nativeName})</h3>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono font-semibold">
                Confidence: {(asrData.confidence * 100).toFixed(1)}%
              </span>
            </div>

            <p className="text-sm leading-relaxed text-slate-200 bg-slate-900/60 p-4 rounded-xl border border-slate-800 font-indic">
              "{asrData.transcript}"
            </p>

            {/* Speaker Diarization Tags */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center text-xs text-slate-400 font-semibold gap-1">
                <Users className="w-3.5 h-3.5 text-saffron-400" /> Speaker Diarization
              </div>
              <div className="space-y-1.5">
                {asrData.diarization.map((sp, idx) => (
                  <div key={idx} className="flex items-start justify-between text-xs bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
                    <span className="font-semibold text-saffron-400 shrink-0 mr-2">{sp.speaker}:</span>
                    <span className="text-slate-300 text-right font-indic">{sp.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Target TTS Speech Output Card */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-sm text-white">Speech Synthesis ({targetLangObj?.nativeName})</h3>
              </div>
              <button
                onClick={handleSpeakOutput}
                disabled={isPlayingOutput}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-saffron-500 to-amber-500 text-white font-semibold text-xs shadow-md hover:brightness-110 disabled:opacity-50"
              >
                {isPlayingOutput ? <Pause className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlayingOutput ? 'Synthesizing Audio...' : 'Play Translated Voice'}</span>
              </button>
            </div>

            <p className="text-sm leading-relaxed text-indigo-200 bg-slate-900/60 p-4 rounded-xl border border-slate-800 font-indic">
              "{SAMPLE_TRANSLATIONS[targetLanguage]?.native || asrData.transcript}"
            </p>

            {/* TTS Voice Tuning Controls */}
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center text-xs font-semibold text-slate-400 gap-1">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" /> Voice Synthesis Controls
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Voice Gender</label>
                  <div className="flex bg-slate-800 p-1 rounded-lg">
                    <button
                      onClick={() => setVoiceGender('female')}
                      className={`flex-1 py-1 text-center rounded-md font-medium transition ${
                        voiceGender === 'female' ? 'bg-saffron-500 text-white' : 'text-slate-400'
                      }`}
                    >
                      Female
                    </button>
                    <button
                      onClick={() => setVoiceGender('male')}
                      className={`flex-1 py-1 text-center rounded-md font-medium transition ${
                        voiceGender === 'male' ? 'bg-saffron-500 text-white' : 'text-slate-400'
                      }`}
                    >
                      Male
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Playback Speed: {rate}x</label>
                  <input
                    type="range"
                    min="0.5"
                    max="1.5"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value))}
                    className="w-full accent-saffron-500"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
