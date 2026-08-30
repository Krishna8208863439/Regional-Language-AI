import { LanguageCode } from '../types';

export interface LiveSpeechRecognitionController {
  start: () => void;
  stop: () => void;
}

export const createLiveSpeechRecognizer = (
  language: LanguageCode,
  onResult: (transcript: string, isFinal: boolean) => void,
  onError: (error: string) => void,
  onEnd: () => void
): LiveSpeechRecognitionController => {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  const bcp47Map: Record<LanguageCode, string> = {
    mr: 'mr-IN',
    hi: 'hi-IN',
    en: 'en-IN'
  };

  if (!SpeechRecognition) {
    console.warn('SpeechRecognition API not available in this browser. Using simulation fallback.');
    let interval: any = null;
    return {
      start: () => {
        let count = 0;
        const sampleWords = language === 'mr' 
          ? ['मला ', 'गेल्या ', 'दोन तासांपासून ', 'छातीत तीव्र कळा ', 'येत आहेत आणि ', 'घाम फुटला आहे.']
          : language === 'hi'
          ? ['मुझे ', 'पिछले ', 'दो घंटे से ', 'सीने में तेज दर्द ', 'और सांस फूलने की ', 'समस्या हो रही है।']
          : ['Patient ', 'reports ', 'severe acute ', 'chest tightness ', 'and difficulty in breathing.'];

        let current = '';
        interval = setInterval(() => {
          if (count < sampleWords.length) {
            current += sampleWords[count];
            onResult(current, count === sampleWords.length - 1);
            count++;
          } else {
            clearInterval(interval);
            onEnd();
          }
        }, 500);
      },
      stop: () => {
        if (interval) clearInterval(interval);
        onEnd();
      }
    };
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = bcp47Map[language] || 'mr-IN';

  recognition.onresult = (event: any) => {
    let finalTranscript = '';
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    const currentText = finalTranscript || interimTranscript;
    if (currentText) {
      onResult(currentText, Boolean(finalTranscript));
    }
  };

  recognition.onerror = (event: any) => {
    console.warn('Speech recognition error:', event.error);
    onError(event.error);
  };

  recognition.onend = () => {
    onEnd();
  };

  return {
    start: () => {
      try {
        recognition.start();
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch (err) {
        console.warn('Recognition stop error:', err);
      }
    }
  };
};
