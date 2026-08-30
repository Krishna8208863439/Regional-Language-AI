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
  Maximize2,
  FileCheck,
  Check
} from 'lucide-react';
import { OCRResult, LanguageCode } from '../../types';
import { aiEngine } from '../../services/aiEngine';
import { SUPPORTED_LANGUAGES } from '../../data/mockData';
import { exportOCRResultToPDF } from '../../utils/pdfExport';

interface DocumentOCRProps {
  currentLanguage: LanguageCode;
}

export const DocumentOCR: React.FC<DocumentOCRProps> = ({ currentLanguage }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState<OCRResult | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [targetLang, setTargetLang] = useState<LanguageCode>('en');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const [detectedDocLang, setDetectedDocLang] = useState<LanguageCode>('mr');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setIsProcessing(true);
      setDetectedDocLang(currentLanguage);
      const res = await aiEngine.processOCR(selected, currentLanguage, targetLang);
      setOcrResult(res);
      setIsProcessing(false);
    }
  };

  const handleSampleSelect = async (sampleName: string, lang: LanguageCode) => {
    setIsProcessing(true);
    setDetectedDocLang(lang);
    const mockFile = new File(['mock content'], sampleName, { type: 'application/pdf' });
    setFile(mockFile);
    const res = await aiEngine.processOCR(mockFile, lang, targetLang);
    setOcrResult(res);
    setIsProcessing(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selected = e.dataTransfer.files[0];
      setFile(selected);
      setIsProcessing(true);
      setDetectedDocLang(currentLanguage);
      const res = await aiEngine.processOCR(selected, currentLanguage, targetLang);
      setOcrResult(res);
      setIsProcessing(false);
    }
  };

  const handleTargetLangChange = async (newLang: LanguageCode) => {
    setTargetLang(newLang);
    if (ocrResult) {
      setIsProcessing(true);
      const activeDocFile = file || new File(['mock content'], ocrResult.documentName, { type: 'application/pdf' });
      const res = await aiEngine.processOCR(activeDocFile, detectedDocLang, newLang);
      setOcrResult(res);
      setIsProcessing(false);
    }
  };

  const handleExportPDF = () => {
    if (!ocrResult) return;
    setIsDownloading(true);
    const targetObj = SUPPORTED_LANGUAGES.find(l => l.code === targetLang);
    const targetName = targetObj ? `${targetObj.nativeName} (${targetObj.name})` : 'English';
    
    exportOCRResultToPDF(ocrResult, targetName);
    
    setIsDownloading(false);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-teal-500/20 text-teal-700 dark:text-teal-400 border border-teal-500/30">
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">OCR & Multilingual Document Intelligence</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Extract text from scanned PDFs, handwritten forms & government land records in Marathi, Hindi & English
          </p>
        </div>

        {/* Export & Target Select */}
        <div className="flex items-center space-x-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-400">Target Lang:</span>
          <select
            value={targetLang}
            onChange={(e) => handleTargetLangChange(e.target.value as LanguageCode)}
            className="bg-white dark:bg-slate-900 text-teal-900 dark:text-teal-300 font-bold text-xs rounded-xl px-3.5 py-2 border border-slate-300 dark:border-slate-700 focus:outline-none shadow-sm cursor-pointer"
          >
            {SUPPORTED_LANGUAGES.map(l => (
              <option key={l.code} value={l.code}>{l.nativeName} ({l.name})</option>
            ))}
          </select>

          {ocrResult && (
            <button 
              onClick={handleExportPDF}
              disabled={isDownloading}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-black transition shadow-md cursor-pointer ${
                downloadSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-teal-600 hover:bg-teal-500 text-white active:scale-95'
              }`}
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>PDF Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{isDownloading ? 'Generating PDF...' : 'Export PDF'}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Drag and Drop Upload Area */}
      {!ocrResult && !isProcessing && (
        <div className="space-y-4">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="glass-card p-8 md:p-12 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-teal-500 text-center transition cursor-pointer flex flex-col items-center justify-center space-y-4 shadow-sm"
          >
            <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-slate-900 flex items-center justify-center text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-slate-800 shadow-md">
              <UploadCloud className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <h3 className="font-black text-base text-slate-900 dark:text-slate-200">Drag & Drop Regional Document or Image</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">Supports PNG, JPG, PDF, Handwritten Forms & Land Records (Up to 25MB)</p>
            </div>

            <label className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow-md cursor-pointer transition">
              Browse Document File
              <input type="file" onChange={handleFileUpload} accept="image/*,.pdf" className="hidden" />
            </label>
          </div>

          {/* Quick Demo Sample Documents */}
          <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-400 block mb-2">⚡ Or Test with Sample Government Documents:</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <button
                onClick={() => handleSampleSelect('Maharashtra_Land_Record_7_12.pdf', 'mr')}
                className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 hover:border-teal-500/40 text-left transition cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-slate-200">महाराष्ट्र ७/१२ उतारा</p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Maharashtra Land Extract (MR)</p>
                </div>
              </button>

              <button
                onClick={() => handleSampleSelect('Aadhaar_Government_Certificate.pdf', 'hi')}
                className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 hover:border-teal-500/40 text-left transition cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-indigo-500 shrink-0" />
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-slate-200">निवास प्रमाण पत्र</p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Domicile Certificate (HI)</p>
                </div>
              </button>

              <button
                onClick={() => handleSampleSelect('Official_Public_Certificate.pdf', 'en')}
                className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-800 hover:border-teal-500/40 text-left transition cursor-pointer"
              >
                <FileCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-slate-200">Public Digital Certificate</p>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">Official Government Form (EN)</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Processing Loader */}
      {isProcessing && (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-3 border border-slate-200 dark:border-slate-800 shadow-lg">
          <RefreshCw className="w-8 h-8 animate-spin text-teal-600 dark:text-teal-400 mx-auto" />
          <h3 className="font-black text-base text-slate-900 dark:text-slate-200">Running PaddleOCR & Multilingual Layout Engine...</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Detecting text bounding boxes and preserving original geometry</p>
        </div>
      )}

      {/* OCR Result Interactive Preview */}
      {ocrResult && !isProcessing && (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between glass-panel px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs shadow-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-black text-slate-900 dark:text-slate-200">Document: {ocrResult.documentName}</span>
              <span className="text-slate-600 dark:text-slate-400 font-mono font-bold">({ocrResult.boxes.length} bounding boxes)</span>
            </div>

            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                showOverlay
                  ? 'bg-teal-50 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-500/40 shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-300 dark:border-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showOverlay ? 'Translated Overlay ON' : 'Original Text Boxes'}</span>
            </button>
          </div>

          {/* Interactive Document Viewer with Bounding Boxes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Visual Canvas Layout */}
            <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2 font-bold">
                <span className="text-slate-900 dark:text-slate-300">Layout-Preserved OCR Canvas</span>
                <span className="text-[10px] text-teal-700 dark:text-teal-400 font-mono">100% Geometry Matched</span>
              </div>

              {/* Document Canvas View */}
              <div className="relative bg-slate-50 dark:bg-slate-950/80 rounded-xl p-6 border border-slate-200 dark:border-slate-800 min-h-[300px] flex flex-col justify-between space-y-4 shadow-inner">
                {ocrResult.boxes.map((box) => (
                  <div
                    key={box.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      showOverlay
                        ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-300 dark:border-teal-500/50 text-teal-950 dark:text-teal-200 shadow-sm'
                        : 'bg-amber-50 dark:bg-saffron-950/40 border-amber-300 dark:border-saffron-500/50 text-amber-950 dark:text-saffron-200 font-indic shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] mb-1 opacity-80 font-bold">
                      <span className="font-mono">{box.id}</span>
                      <span>Confidence: {(box.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <p className="text-xs font-bold">
                      {showOverlay ? box.translatedText : box.originalText}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Extracted Side-by-Side Text */}
            <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                <span className="font-bold text-slate-900 dark:text-slate-300">Extracted & Translated Text Stream</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-400 block mb-1">Extracted Regional Text:</label>
                  <div className="bg-slate-50 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-200 font-indic leading-relaxed font-semibold">
                    {ocrResult.fullExtractedText}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-teal-800 dark:text-teal-400 block mb-1">Target Translated Text:</label>
                  <div className="bg-teal-50/50 dark:bg-slate-900/80 p-3.5 rounded-xl border border-teal-200 dark:border-teal-500/30 text-xs text-teal-950 dark:text-teal-100 font-indic leading-relaxed font-semibold">
                    {ocrResult.fullTranslatedText}
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setOcrResult(null); setFile(null); }}
                className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer border border-slate-200 dark:border-slate-700"
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
