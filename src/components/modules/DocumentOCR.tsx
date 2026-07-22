import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  Eye, 
  Download, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles, 
  Layers, 
  Maximize2 
} from 'lucide-react';
import { OCRResult, LanguageCode } from '../../types';
import { aiEngine } from '../../services/aiEngine';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';

interface DocumentOCRProps {
  currentLanguage: LanguageCode;
}

export const DocumentOCR: React.FC<DocumentOCRProps> = ({ currentLanguage }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [targetLang, setTargetLang] = useState<LanguageCode>('en');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setIsProcessing(true);
      const res = await aiEngine.processOCR(selected);
      setOcrResult(res);
      setIsProcessing(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      setFile(selected);
      setIsProcessing(true);
      const res = await aiEngine.processOCR(selected);
      setOcrResult(res);
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-bold text-white">OCR & Multilingual Document Intelligence</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Extract text from scanned PDFs, handwritten notes & government certificates with layout-preserving translation
          </p>
        </div>

        {/* Export & Target Select */}
        <div className="flex items-center space-x-3">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value as LanguageCode)}
            className="bg-slate-900 text-teal-300 font-semibold text-xs rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none"
          >
            {SUPPORTED_LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>Translate to {l.name}</option>
            ))}
          </select>

          {ocrResult && (
            <button className="flex items-center space-x-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold transition shadow-md">
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Drag and Drop Upload Area */}
      {!ocrResult && !isProcessing && (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="glass-card p-10 rounded-2xl border-2 border-dashed border-slate-700 hover:border-teal-500/50 text-center transition cursor-pointer flex flex-col items-center justify-center space-y-4"
        >
          <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-teal-400 border border-slate-800 shadow-xl">
            <UploadCloud className="w-8 h-8 animate-bounce" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-200">Drag & Drop Regional Document or Image</h3>
            <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, PDF, Handwritten Forms & Land Records (Up to 25MB)</p>
          </div>

          <label className="px-5 py-2.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 font-bold text-xs border border-teal-500/40 cursor-pointer transition">
            Browse Document File
            <input type="file" onChange={handleFileUpload} accept="image/*,.pdf" className="hidden" />
          </label>
        </div>
      )}

      {/* Processing Loader */}
      {isProcessing && (
        <div className="glass-panel p-12 rounded-2xl text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin text-teal-400 mx-auto" />
          <h3 className="font-bold text-sm text-slate-200">Running PaddleOCR & Layout Structure Extractor...</h3>
          <p className="text-xs text-slate-400">Detecting text bounding boxes and preserving original typography</p>
        </div>
      )}

      {/* OCR Result Interactive Preview */}
      {ocrResult && !isProcessing && (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between glass-panel px-4 py-2.5 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-slate-200">Document: {ocrResult.documentName}</span>
              <span className="text-slate-400">({ocrResult.boxes.length} text bounding boxes detected)</span>
            </div>

            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition ${
                showOverlay
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showOverlay ? 'Translated Overlay ON' : 'Original Text Boxes'}</span>
            </button>
          </div>

          {/* Interactive Document Viewer with Bounding Boxes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Visual Canvas Layout */}
            <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span className="font-semibold text-slate-300">Layout-Preserved OCR Canvas</span>
                <span className="text-[10px] text-teal-400 font-mono">100% Geometry Matched</span>
              </div>

              {/* Simulated Document Canvas View */}
              <div className="relative bg-slate-950 rounded-xl p-6 border border-slate-800 min-h-[300px] flex flex-col justify-between space-y-6">
                {ocrResult.boxes.map((box) => (
                  <div
                    key={box.id}
                    className={`p-3 rounded-lg border transition-all ${
                      showOverlay
                        ? 'bg-teal-950/40 border-teal-500/50 text-teal-200'
                        : 'bg-saffron-950/40 border-saffron-500/50 text-saffron-200 font-indic'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] mb-1 opacity-70">
                      <span className="font-mono">{box.id}</span>
                      <span>Confidence: {(box.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <p className="text-xs font-medium">
                      {showOverlay ? box.translatedText : box.originalText}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Extracted Side-by-Side Text */}
            <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2">
                <span className="font-semibold text-slate-300">Extracted & Translated Text Stream</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">Extracted Regional Text:</label>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-200 font-indic leading-relaxed">
                    {ocrResult.fullExtractedText}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-teal-400 block mb-1">Target Translated Text:</label>
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-teal-500/30 text-xs text-teal-100 font-indic leading-relaxed">
                    {ocrResult.fullTranslatedText}
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setOcrResult(null); setFile(null); }}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition"
              >
                Scan Another Document
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
