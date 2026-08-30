import React, { useState } from 'react';
import { 
  BarChart3, 
  Activity, 
  ShieldCheck, 
  Users, 
  Cpu, 
  Lock, 
  TrendingUp, 
  Database, 
  Zap,
  Server
} from 'lucide-react';
import { INITIAL_ANALYTICS } from '../../data/mockData';

export const AdminAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState(INITIAL_ANALYTICS);
  const [activeTab, setActiveTab] = useState<'overview' | 'models' | 'security'>('overview');

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-saffron-500/20 text-saffron-700 dark:text-saffron-400 border border-saffron-500/30">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">System Admin Telemetry, Security & Analytics</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Real-time API throughput, model benchmark evaluation, RBAC governance & audit logs
          </p>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-300 dark:border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              activeTab === 'overview' ? 'bg-saffron-500 text-white shadow-sm' : 'text-slate-700 dark:text-slate-400'
            }`}
          >
            Telemetry Overview
          </button>
          <button
            onClick={() => setActiveTab('models')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              activeTab === 'models' ? 'bg-saffron-500 text-white shadow-sm' : 'text-slate-700 dark:text-slate-400'
            }`}
          >
            Model Benchmarks
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
              activeTab === 'security' ? 'bg-saffron-500 text-white shadow-sm' : 'text-slate-700 dark:text-slate-400'
            }`}
          >
            Security & Audit
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Top Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">Total NMT Requests</span>
              <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                {analytics.totalTranslations.toLocaleString()}
              </p>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +14.2% this week
              </span>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">Average Edge Latency</span>
              <p className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                {analytics.avgLatencyMs} ms
              </p>
              <span className="text-[10px] text-slate-500 font-mono font-semibold">GPU Accelerated</span>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">BLEU Score (IndicTrans2)</span>
              <p className="text-2xl font-black text-saffron-700 dark:text-saffron-400 font-mono">
                {analytics.bleuScoreAverage}
              </p>
              <span className="text-[10px] text-saffron-700 dark:text-saffron-300 font-extrabold">State-of-the-Art</span>
            </div>

            <div className="glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-bold">ASR Word Accuracy Rate</span>
              <p className="text-2xl font-black text-teal-700 dark:text-teal-400 font-mono">
                {analytics.asrAccuracyRate}%
              </p>
              <span className="text-[10px] text-teal-700 dark:text-teal-300 font-extrabold">Punctuation Restored</span>
            </div>

          </div>

          {/* Detailed Traffic & Language Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Top Language Pairs */}
            <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-xs text-slate-700 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">
                Top Language Pairs Volume
              </h3>

              <div className="space-y-2.5">
                {analytics.topLanguagePairs.map((item, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-slate-900 dark:text-slate-200">
                      <span>{item.pair}</span>
                      <span className="font-mono text-saffron-700 dark:text-saffron-400 font-black">{item.count.toLocaleString()} reqs</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-300 dark:border-slate-800">
                      <div
                        className="bg-gradient-to-r from-saffron-500 to-amber-400 h-full rounded-full"
                        style={{ width: `${Math.min(100, (item.count / 500000) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Domain Distribution */}
            <div className="glass-card p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-xs text-slate-700 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">
                Domain Traffic Allocation
              </h3>

              <div className="space-y-2 text-xs">
                {Object.entries(analytics.requestsByDomain).map(([domainKey, count]) => (
                  <div key={domainKey} className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-900 dark:text-slate-300 uppercase">{domainKey}</span>
                    <span className="font-mono text-indigo-700 dark:text-indigo-400 font-black">{count.toLocaleString()} requests</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {activeTab === 'models' && (
        <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">
            AI Model Benchmark Matrix
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3">Model Name</th>
                  <th className="p-3">Primary Task</th>
                  <th className="p-3">Supported Languages</th>
                  <th className="p-3">BLEU / Accuracy</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-900 dark:text-slate-200">
                <tr>
                  <td className="p-3 font-bold text-saffron-700 dark:text-saffron-400">IndicTrans2</td>
                  <td className="p-3 font-semibold">NMT Machine Translation</td>
                  <td className="p-3">Marathi, Hindi, English</td>
                  <td className="p-3 font-mono font-black text-emerald-700 dark:text-emerald-400">41.8 BLEU</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 rounded text-[10px] font-bold">Active Primary</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-indigo-700 dark:text-indigo-400">Whisper / IndicASR</td>
                  <td className="p-3 font-semibold">Speech Recognition (ASR)</td>
                  <td className="p-3">Multilingual Real-time</td>
                  <td className="p-3 font-mono font-black text-emerald-700 dark:text-emerald-400">94.6% WER Acc</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 rounded text-[10px] font-bold">Active Primary</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-teal-700 dark:text-teal-400">PaddleOCR Indic</td>
                  <td className="p-3 font-semibold">OCR & Layout Structure</td>
                  <td className="p-3">Scanned Documents & Forms</td>
                  <td className="p-3 font-mono font-black text-emerald-700 dark:text-emerald-400">97.2% Layout Acc</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-800 dark:text-emerald-400 rounded text-[10px] font-bold">Active Primary</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-2">
            Security Compliance & Cryptographic Audit Logs
          </h3>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-emerald-800 dark:text-emerald-400 font-bold flex justify-between shadow-sm">
              <span>[2026-07-22 10:05:12 UTC] AES-256 Key Exchange verified for session BW-2901</span>
              <span>COMPLIANT</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-emerald-800 dark:text-emerald-400 font-bold flex justify-between shadow-sm">
              <span>[2026-07-22 10:04:44 UTC] Biometric Voice Consent watermark signed (BW-WM-88A9B2)</span>
              <span>VERIFIED</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-emerald-800 dark:text-emerald-400 font-bold flex justify-between shadow-sm">
              <span>[2026-07-22 10:01:02 UTC] RBAC Role check: Govt Officer granted form authorization</span>
              <span>GRANTED</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
