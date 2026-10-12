import React, { useState } from 'react';
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { useEdu } from '../../context/EduContext';
import { LearningGap } from '../../types';

export const ComebackQuestsPage: React.FC = () => {
  const { learningGaps, resolveLearningGap, setActivePage, profile } = useEdu();
  const [activeGapModal, setActiveGapModal] = useState<LearningGap | null>(null);
  const [selectedComebackOption, setSelectedComebackOption] = useState<number | null>(null);
  const [comebackCompleted, setComebackCompleted] = useState<boolean>(false);

  const activeGaps = learningGaps.filter(g => g.status !== 'mastered');
  const masteredGaps = learningGaps.filter(g => g.status === 'mastered');

  const handleLaunchModal = (gap: LearningGap) => {
    setActiveGapModal(gap);
    setSelectedComebackOption(null);
    setComebackCompleted(false);
  };

  const handleConfirmRedemption = () => {
    if (selectedComebackOption === 1 && activeGapModal) {
      resolveLearningGap(activeGapModal.id);
      setComebackCompleted(true);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-amber-900/30">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <RotateCcw className="w-4 h-4" />
            <span>Adaptive Resilience Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Comeback Quests (2x Double XP)
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Conventional tests penalize mistakes with red marks. Adaptix turns every mistake into a high-reward redemption quest!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>{profile.comebacksCompleted} Comebacks Conquered</span>
          </div>
        </div>
      </div>

      {/* Philosophy Callout Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Adaptive Learning Philosophy
          </span>
          <p className="text-sm font-bold text-white">
            "A stumble is just setup for an epic anime comeback arc."
          </p>
          <p className="text-xs text-slate-300">
            Whenever a question is answered incorrectly in the Meme Arena or Boss Battle, Adaptix isolates the underlying concept and schedules a tailored 2x XP comeback challenge.
          </p>
        </div>

        <button
          onClick={() => setActivePage('anime-explainers')}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 whitespace-nowrap flex items-center gap-1.5"
        >
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>Review Anime Analogies</span>
        </button>
      </div>

      {/* Active Learning Gaps Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <span>Pending Comeback Quests</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {activeGaps.length} Active
            </span>
          </h2>
          <span className="text-xs text-amber-400 font-bold font-mono">Double XP Active 🔥</span>
        </div>

        {activeGaps.length === 0 ? (
          <div className="p-8 rounded-3xl glass-panel border border-slate-800 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 mx-auto flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">All Learning Gaps Conquered!</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              You currently have zero pending weak points. Jump into the Meme Arena or Boss Battle to unlock new challenges!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeGaps.map(gap => (
              <div
                key={gap.id}
                className="p-5 rounded-2xl glass-panel border border-amber-500/30 space-y-4 hover:border-amber-400/50 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-950 text-amber-300 border border-amber-800">
                      {gap.category}
                    </span>
                    <h3 className="font-extrabold text-white text-base">
                      {gap.topic}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/30">
                    2x XP
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>Stumbled: <strong>{gap.missedCount}x</strong></span>
                  <span>•</span>
                  <span>Last Seen: <strong>{gap.lastMissedAt}</strong></span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                  <p>
                    💡 <strong>Comeback Strategy: </strong>
                    Review the concept with a humorous deconstruction, then answer the redemption prompt correctly to claim +120 XP!
                  </p>
                </div>

                <button
                  onClick={() => handleLaunchModal(gap)}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Launch 2x Comeback Challenge</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mastered Comebacks Archive */}
      {masteredGaps.length > 0 && (
        <div className="space-y-3 pt-4">
          <h2 className="text-sm font-extrabold text-slate-400 uppercase tracking-wider">
            Trophy Case: Previously Conquered Mistakes ({masteredGaps.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {masteredGaps.map(gap => (
              <div
                key={gap.id}
                className="p-3.5 rounded-xl bg-slate-900/60 border border-emerald-500/30 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-bold text-white line-clamp-1">{gap.topic}</p>
                  <p className="text-[10px] text-emerald-400 font-medium">Redeemed & Mastered ✓</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-300">
                  🏆
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Redemption Interactive Modal */}
      {activeGapModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-slate-900 border-2 border-amber-500/60 shadow-2xl space-y-5 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                <RotateCcw className="w-4 h-4" />
                <span>Comeback Redemption Prompt</span>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                +120 XP Reward
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-white">
                {activeGapModal.topic}
              </h3>
              <p className="text-xs text-slate-300">
                Which statement represents the core understanding that cures this mistake forever?
              </p>
            </div>

            {/* Comeback Multiple Choice */}
            <div className="space-y-2.5">
              {[
                "Mistakes mean I have lower innate talent and should avoid this topic",
                "Action and reaction forces act on different bodies simultaneously and are always equal in magnitude",
                "Force is only exerted by the moving object, while the static object feels nothing"
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedComebackOption(idx)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                    selectedComebackOption === idx
                      ? 'bg-amber-950/80 border-amber-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-amber-400">{idx + 1}.</span>
                  {opt}
                </button>
              ))}
            </div>

            {comebackCompleted ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                <p className="text-sm font-extrabold text-emerald-300">
                  🎉 COMEBACK CONQUERED! +120 DOUBLE XP AWARDED!
                </p>
                <p className="text-xs text-slate-300">
                  You converted this learning gap into resilient, permanent mastery!
                </p>
                <button
                  onClick={() => setActiveGapModal(null)}
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                >
                  Awesome! Close Quest
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveGapModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRedemption}
                  disabled={selectedComebackOption === null}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 disabled:opacity-40 shadow-lg shadow-amber-500/20"
                >
                  Submit Redemption
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
