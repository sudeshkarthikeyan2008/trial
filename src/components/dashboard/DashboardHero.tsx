import React from 'react';
import {
  Sparkles,
  Zap,
  Swords,
  Tv,
  Laugh,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useEdu } from '../../context/EduContext';

export const DashboardHero: React.FC = () => {
  const { profile, boss, learningGaps, setActivePage, health } = useEdu();

  const activeGaps = learningGaps.filter(g => g.status === 'active');
  const xpPercent = Math.min(100, Math.round((profile.xp / profile.nextLevelXp) * 100));

  return (
    <div className="space-y-6">
      
      {/* Hero Banner: Anime RPG Welcome */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border border-purple-500/30 shadow-2xl shadow-purple-950/50">
        
        {/* Glow orb */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/50 border border-purple-400/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Smart Education Ecosystem • BIS Aligned</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Welcome back, <span className="bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">{profile.name}</span>!
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Transforming complex formulas into anime battles and confusing mistakes into hilarious comeback victories. No red marks—only power-ups!
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => setActivePage('meme-quiz')}
                className="px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-700/30 transition-all flex items-center gap-2"
              >
                <Laugh className="w-4 h-4 text-amber-300" />
                <span>Enter Meme Arena</span>
              </button>

              <button
                onClick={() => setActivePage('boss-battle')}
                className="px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-red-900/50 hover:bg-red-800/60 border border-red-500/40 transition-all flex items-center gap-2"
              >
                <Swords className="w-4 h-4 text-red-400" />
                <span>Raid NullPointer ({boss.currentHp} HP)</span>
              </button>
            </div>
          </div>

          {/* Player Battle Card Widget */}
          <div className="w-full md:w-auto p-5 rounded-2xl bg-slate-900/80 border border-purple-500/30 min-w-[280px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 p-0.5 flex items-center justify-center text-2xl">
                  🥷
                </div>
                <div>
                  <p className="font-extrabold text-white text-sm">{profile.title}</p>
                  <p className="text-xs text-cyan-400 font-mono">Level {profile.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-400 font-bold text-xs bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/30">
                <Flame className="w-4 h-4" />
                <span>{profile.streakDays}d Streak</span>
              </div>
            </div>

            {/* HP and XP gauges */}
            <div className="space-y-2.5 text-xs font-semibold">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Player Health</span>
                  <span className="text-emerald-400 font-mono">{health}/100 HP</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${health}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Level Progress</span>
                  <span className="text-purple-400 font-mono">{xpPercent}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300"
                    style={{ width: `${xpPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Adaptive Learning Comeback Alert (if gaps exist) */}
      {activeGaps.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <RotateCcw className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-amber-300 text-sm">
                  Comeback Quests Activated! (Double 2x XP)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {activeGaps.length} Areas to Conquer
                </span>
              </div>
              <p className="text-xs text-slate-300">
                You stumbled on <strong className="text-amber-200">"{activeGaps[0].topic}"</strong>. Revisit with tailored memes to master it and earn double XP!
              </p>
            </div>
          </div>
          <button
            onClick={() => setActivePage('comeback-quests')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all whitespace-nowrap flex items-center gap-1.5 shadow-md shadow-amber-500/20"
          >
            <span>Launch Comeback</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Core Ecosystem Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Pillar 1: Anime & Pop-Culture Explanations */}
        <div
          onClick={() => setActivePage('anime-explainers')}
          className="p-5 rounded-2xl glass-panel glass-panel-hover cursor-pointer border border-cyan-500/20 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
              <Tv className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
              4 Chapters
            </span>
          </div>
          <h2 className="text-base font-extrabold text-white mb-1 group-hover:text-cyan-300 transition-colors">
            Anime & Movie Explanations
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Learn Newton’s 3rd Law via Dragon Ball Kamehamehas, Recursion via Doctor Strange, and Chemical bonds via Naruto!
          </p>
          <div className="flex items-center gap-1 text-xs font-bold text-cyan-400">
            <span>Explore Lore Modules</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Pillar 2: Meme-Powered Fail-Forward Arena */}
        <div
          onClick={() => setActivePage('meme-quiz')}
          className="p-5 rounded-2xl glass-panel glass-panel-hover cursor-pointer border border-purple-500/20 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-400 group-hover:scale-110 transition-transform">
              <Laugh className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-950 border border-purple-800 text-purple-300">
              Zero Fear
            </span>
          </div>
          <h2 className="text-base font-extrabold text-white mb-1 group-hover:text-purple-300 transition-colors">
            Meme Quiz & Fail-Forward
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Mistakes trigger hilarious memes ("Emotional Damage", "Task Failed Successfully") instead of intimidating red ink!
          </p>
          <div className="flex items-center gap-1 text-xs font-bold text-purple-400">
            <span>Play Quiz Arena</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Pillar 3: Boss Battles & Comeback Quests */}
        <div
          onClick={() => setActivePage('boss-battle')}
          className="p-5 rounded-2xl glass-panel glass-panel-hover cursor-pointer border border-red-500/20 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400 group-hover:scale-110 transition-transform">
              <Swords className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-300">
              Epic Raid
            </span>
          </div>
          <h2 className="text-base font-extrabold text-white mb-1 group-hover:text-red-300 transition-colors">
            Boss Battle: NullPointer
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Turn milestone exams into high-stakes RPG boss encounters with combo attacks, shields, and legendary loot drops.
          </p>
          <div className="flex items-center gap-1 text-xs font-bold text-red-400">
            <span>Battle Boss Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* BIS Standards & Inclusion Overview */}
      <div className="p-6 rounded-3xl glass-panel border border-emerald-500/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">
                Bureau of Indian Standards (BIS) Architecture
              </h2>
              <p className="text-xs text-slate-400">
                Engineered for strict compliance with national accessibility and data protection mandates.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActivePage('bis-standards')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>Open Compliance Lab</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>IS 17802 (Part 1):2021 – Inclusive UX</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Provides readable typography, WCAG AAA high contrast toggles, OpenDyslexic font support, Web Speech synthesis narration, and complete keyboard-only navigation.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>IS/ISO/IEC 27001:2022 – Data Shield</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Protects student learning records through local-first encryption, zero external ad trackers, incognito evaluation mode, and auditable cryptographic activity logs.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
