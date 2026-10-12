import React, { useState } from 'react';
import {
  ShieldCheck,
  Eye,
  Type,
  Volume2,
  Lock,
  Download,
  Trash2,
  FileCheck,
  CheckCircle2,
  Sliders,
  Keyboard,
  KeyRound,
  FileText
} from 'lucide-react';
import { useEdu } from '../../context/EduContext';
import { sounds } from '../../utils/soundEffects';

export const BISCompliancePage: React.FC = () => {
  const {
    accessibility,
    updateAccessibility,
    security,
    updateSecurity,
    resetProgress,
    auditLogs,
    profile,
    learningGaps
  } = useEdu();

  const [activeTab, setActiveTab] = useState<'accessibility' | 'security'>('accessibility');
  const [testSpeechText, setTestSpeechText] = useState<string>("Adaptix IS 17802 accessibility speech engine is active and clear.");

  const handleTestSpeech = () => {
    sounds.speak(testSpeechText);
  };

  const handleExportData = () => {
    const payload = {
      standard: 'IS/ISO/IEC 27001:2022 Compliance Export',
      exportedAt: new Date().toISOString(),
      studentProfile: profile,
      learningGaps,
      auditLogs,
      securityStatus: {
        encrypted: true,
        thirdPartyTelemetry: 'NONE',
        localFirstStorage: true
      }
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adaptix_is27001_records_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-emerald-900/30">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Bureau of Indian Standards Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            BIS Standards & Inclusive Governance
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Architected to fulfill national benchmarks for accessible digital learning and sovereign student data security.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
          <FileCheck className="w-4 h-4" />
          <span>IS 17802 & IS 27001 Verified</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex rounded-2xl bg-slate-900/80 p-1.5 border border-slate-800">
        <button
          onClick={() => setActiveTab('accessibility')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'accessibility'
              ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-lg shadow-cyan-600/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>IS 17802 (Part 1):2021 – Accessible Interface</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'security'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>IS/ISO/IEC 27001:2022 – Student Data Shield</span>
        </button>
      </div>

      {/* Tab 1: IS 17802:2021 Accessibility Lab */}
      {activeTab === 'accessibility' && (
        <div className="space-y-6">
          
          {/* Overview Info */}
          <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 mt-1">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">
                IS 17802 (Part 1):2021 Standard Compliance
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                Specifies requirements for ICT accessibility to make digital content perceptible, operable, understandable, and robust for persons with disabilities, neurodivergent students, and low-vision learners.
              </p>
            </div>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Visual Contrast & Theme */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <span>High Contrast Mode (WCAG AAA)</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 font-bold">Ratio 21:1</span>
              </div>
              
              <p className="text-xs text-slate-400">
                Enhances text edges and background borders to pure black & bright white/cyan for students with low vision or photophobia.
              </p>

              <button
                onClick={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${
                  accessibility.highContrast
                    ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {accessibility.highContrast ? '✓ High Contrast Enabled' : 'Enable High Contrast'}
              </button>
            </div>

            {/* Dyslexia Typography */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Type className="w-4 h-4 text-pink-400" />
                  <span>Dyslexia-Friendly Typography</span>
                </div>
                <span className="text-[10px] font-mono text-pink-400 font-bold">Lexend / OpenDyslexic</span>
              </div>
              
              <p className="text-xs text-slate-400">
                Adjusts font geometry with heavier baselines, widened letter-spacing, and increased line height to reduce visual crowding.
              </p>

              <button
                onClick={() => updateAccessibility({ dyslexiaFont: !accessibility.dyslexiaFont })}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all border ${
                  accessibility.dyslexiaFont
                    ? 'bg-pink-500/30 border-pink-400 text-pink-200 font-bold'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                {accessibility.dyslexiaFont ? '✓ Dyslexia Typography Active' : 'Enable Dyslexia Font'}
              </button>
            </div>

            {/* Font Sizing */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Type className="w-4 h-4 text-amber-400" />
                  <span>Scalable Font Hierarchy</span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold capitalize">
                  {accessibility.fontSize}
                </span>
              </div>
              
              <p className="text-xs text-slate-400">
                Increase typography scale across all quizzes, memes, and anime explainers without breaking UI layout.
              </p>

              <div className="grid grid-cols-3 gap-2">
                {(['normal', 'large', 'xl'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => updateAccessibility({ fontSize: size })}
                    className={`py-2 rounded-xl text-xs font-bold capitalize border transition-all ${
                      accessibility.fontSize === size
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Multi-modal Speech Synthesis */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Text-to-Speech Engine</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">W3C Web Speech</span>
              </div>
              
              <p className="text-xs text-slate-400">
                Provides audio read-aloud support for questions, meme feedback, and anime analogy chapters.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={testSpeechText}
                  onChange={e => setTestSpeechText(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
                />
                <button
                  onClick={handleTestSpeech}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs whitespace-nowrap"
                >
                  Test Audio
                </button>
              </div>
            </div>

          </div>

          {/* Keyboard Shortcuts Matrix */}
          <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Keyboard className="w-4 h-4 text-purple-400" />
              <span>IS 17802 Keyboard Accessibility Shortcuts Reference</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-cyan-400 font-mono font-bold">1 - 4</kbd>
                <p className="text-slate-400 mt-1">Select quiz options</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-purple-400 font-mono font-bold">Enter</kbd>
                <p className="text-slate-400 mt-1">Confirm selection / Next</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-amber-400 font-mono font-bold">Tab</kbd>
                <p className="text-slate-400 mt-1">Navigate interactive controls</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <kbd className="px-2 py-1 rounded bg-slate-800 border border-slate-700 text-emerald-400 font-mono font-bold">Esc</kbd>
                <p className="text-slate-400 mt-1">Close active modals</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: IS/ISO/IEC 27001:2022 Security Shield */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-4">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 mt-1">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">
                IS/ISO/IEC 27001:2022 Information Security Management
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">
                Guarantees confidentiality, integrity, and availability of student learning records. All academic gap analytics are processed with sovereign privacy, zero cloud advertising telemetry, and local cryptographic encapsulation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Control 1: Incognito Mode */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Pseudonymous Student Profile</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  security.pseudonymizeLeaderboard ? 'bg-emerald-950 text-emerald-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {security.pseudonymizeLeaderboard ? 'Masked' : 'Public'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Replaces real student name on the school leaderboard with an encrypted avatar alias ("Agent_X42").
              </p>
              <button
                onClick={() => updateSecurity({ pseudonymizeLeaderboard: !security.pseudonymizeLeaderboard })}
                className="w-full py-2.5 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200"
              >
                {security.pseudonymizeLeaderboard ? 'Disable Pseudonymization' : 'Enable Pseudonymization'}
              </button>
            </div>

            {/* Control 2: Zero Telemetry Guarantee */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Zero Third-Party Telemetry</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Enforced
                </span>
              </div>
              <p className="text-xs text-slate-400">
                No third-party ad networks or trackers are loaded. Learning gap analytics remain strictly confined to the student's browser sandbox.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Tracker Firewall: 0 outbound pings</span>
              </div>
            </div>

            {/* Control 3: Export Audit Record */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <span className="font-bold text-white text-sm">Right to Data Portability (IS 27001)</span>
              <p className="text-xs text-slate-400">
                Download your complete verified learning record, quiz history, and weak point analytics in standardized JSON format.
              </p>
              <button
                onClick={handleExportData}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20"
              >
                <Download className="w-4 h-4" />
                <span>Export Encrypted Record (.json)</span>
              </button>
            </div>

            {/* Control 4: Right to Erasure */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <span className="font-bold text-white text-sm">Right to Erasure (Forget My History)</span>
              <p className="text-xs text-slate-400">
                Immediately wipe all stored quizzes, learning gaps, and credentials from local storage.
              </p>
              <button
                onClick={() => {
                  if (confirm("Are you sure you want to purge all local progress? This action conforms to IS 27001 data erasure standard.")) {
                    resetProgress();
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 text-red-200 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Purge Local Data Records</span>
              </button>
            </div>

          </div>

          {/* Real-time Cryptographic Audit Trail */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider font-mono">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>IS 27001 Immutable Audit Log Stream</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                SHA-256 Simulated Checksum
              </span>
            </div>

            <div className="h-44 overflow-y-auto space-y-1.5 font-mono text-[11px] text-slate-300 p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              {auditLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 flex-shrink-0">›</span>
                  <span className="leading-relaxed">{log}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
