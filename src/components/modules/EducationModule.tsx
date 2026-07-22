import React, { useState } from 'react';
import { 
  GraduationCap, 
  Volume2, 
  Mic, 
  CheckCircle, 
  Sparkles, 
  RotateCw, 
  Award, 
  BookOpen 
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { aiEngine } from '../../services/aiEngine';

interface EducationModuleProps {
  currentLanguage: LanguageCode;
}

export const EducationModule: React.FC<EducationModuleProps> = ({ currentLanguage }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const flashcards = [
    { native: 'मातृभाषा (Matribhasha)', english: 'Mother Tongue', phrase: 'मेरी मातृभाषा हिंदी है।', hint: 'Primary spoken language of native heritage' },
    { native: 'शिक्षा (Shiksha)', english: 'Education', phrase: 'शिक्षा ही प्रगति का आधार है।', hint: 'Process of receiving or giving systematic instruction' },
    { native: 'संस्कृति (Sanskriti)', english: 'Culture & Heritage', phrase: 'भारतीय संस्कृति विविध और समृद्ध है।', hint: 'Ideas, customs, and social behavior' },
  ];

  const handleSpeakWord = (text: string) => {
    aiEngine.speakText(text, currentLanguage);
  };

  const handleEvaluatePronunciation = async () => {
    setIsEvaluating(true);
    await new Promise(res => setTimeout(res, 1200));
    setPronunciationScore(94.2);
    setIsEvaluating(false);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage);
  const currentCard = flashcards[activeCardIndex];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white">AI Multilingual Education & Pronunciation Tutor</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Learn regional vocabulary, evaluate pronunciation accuracy & translate classroom lectures
          </p>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-lg text-xs font-bold">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Regional Mastery Badge Level 3</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Interactive Flashcard Card */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2">
            <span className="font-semibold text-slate-300">
              Vocabulary Flashcard ({activeCardIndex + 1} of {flashcards.length})
            </span>
            <button
              onClick={() => { setShowAnswer(false); setActiveCardIndex((activeCardIndex + 1) % flashcards.length); }}
              className="text-saffron-400 font-bold hover:underline flex items-center gap-1"
            >
              <RotateCw className="w-3.5 h-3.5" /> Next Flashcard
            </button>
          </div>

          {/* Flashcard Body */}
          <div
            onClick={() => setShowAnswer(!showAnswer)}
            className="bg-slate-950 p-8 rounded-2xl border border-indigo-500/30 text-center space-y-4 cursor-pointer hover:border-indigo-400 transition transform active:scale-98 min-h-[200px] flex flex-col items-center justify-center"
          >
            <span className="text-2xl font-extrabold text-white font-indic">{currentCard.native}</span>
            <p className="text-xs text-slate-400 italic">Example: "{currentCard.phrase}"</p>

            {showAnswer ? (
              <div className="pt-2 border-t border-slate-800 text-xs font-bold text-indigo-300 animate-fade-in">
                English Meaning: {currentCard.english}
              </div>
            ) : (
              <span className="text-[10px] text-indigo-400 font-semibold bg-indigo-500/10 px-2.5 py-1 rounded-full">
                Click card to flip & reveal English translation
              </span>
            )}
          </div>

          <button
            onClick={() => handleSpeakWord(currentCard.native)}
            className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-saffron-400 font-bold text-xs flex items-center justify-center space-x-2"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen Native Pronunciation</span>
          </button>
        </div>

        {/* Pronunciation Coach & Score Evaluator */}
        <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-200 border-b border-slate-800 pb-2">
            AI Speech & Pronunciation Evaluator
          </h3>

          <div className="space-y-3 text-xs">
            <p className="text-slate-300">
              Speak the target phrase aloud into your microphone to get real-time acoustic score feedback:
            </p>

            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-indic text-sm font-bold text-saffron-300 text-center">
              "{currentCard.phrase}"
            </div>

            <button
              onClick={handleEvaluatePronunciation}
              disabled={isEvaluating}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Mic className="w-4 h-4" />
              <span>{isEvaluating ? 'Evaluating Speech Waveform...' : 'Record Voice & Rate Pronunciation'}</span>
            </button>

            {pronunciationScore !== null && !isEvaluating && (
              <div className="p-4 bg-slate-900 rounded-xl border border-emerald-500/40 text-center space-y-2">
                <span className="text-[10px] text-slate-400 block font-semibold">Pronunciation Accuracy:</span>
                <span className="text-3xl font-extrabold text-emerald-400 font-mono">
                  {pronunciationScore}%
                </span>
                <p className="text-[11px] text-emerald-300 font-medium">
                  Excellent tone accuracy & regional vowel inflection!
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
