import React from 'react';
import {
  Trophy,
  Flame,
  Medal,
  Award,
  Sparkles,
  Shield,
  Star,
  CheckCircle2
} from 'lucide-react';
import { useEdu } from '../../context/EduContext';
import { LEADERBOARD_STUDENTS } from '../../data/mockData';

export const LeaderboardPage: React.FC = () => {
  const { profile, security } = useEdu();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-purple-900/30">
        <div>
          <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>Competitive Spirit & Camaraderie</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Global Hall of Fame
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Celebrate students turning academic obstacles into legendary high scores and comebacks!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 font-bold text-xs font-mono">
            Season 1: Anime Awakening
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        
        {/* Silver #2 */}
        <div className="order-2 md:order-1 p-5 rounded-2xl glass-panel border border-slate-700 text-center space-y-2 mt-4 md:mt-6">
          <span className="text-3xl">🥈</span>
          <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
            Rank #2
          </div>
          <h3 className="font-extrabold text-white text-base">Goku_Learner</h3>
          <p className="text-xs text-cyan-400 font-medium">Ultra Instinct Student</p>
          <div className="pt-2 flex justify-center items-center gap-3 text-xs font-mono font-bold text-slate-300">
            <span>Lvl 39</span>
            <span>•</span>
            <span className="text-purple-300">12,950 XP</span>
          </div>
        </div>

        {/* Gold #1 */}
        <div className="order-1 md:order-2 p-6 rounded-3xl bg-gradient-to-b from-yellow-950/50 via-slate-900 to-slate-950 border-2 border-yellow-500/50 text-center space-y-2 shadow-xl shadow-yellow-950/30">
          <span className="text-4xl animate-bounce inline-block">👑</span>
          <div className="inline-block px-3 py-1 rounded-full text-xs font-extrabold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
            Rank #1 Grandmaster
          </div>
          <h3 className="font-black text-white text-lg">Saitama_Codes</h3>
          <p className="text-xs text-amber-300 font-medium">One-Punch Scholar</p>
          <div className="pt-2 flex justify-center items-center gap-3 text-xs font-mono font-bold text-slate-200">
            <span className="text-yellow-400">Lvl 42</span>
            <span>•</span>
            <span className="text-purple-300">14,200 XP</span>
            <span>•</span>
            <span className="text-amber-400 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              38d
            </span>
          </div>
        </div>

        {/* Bronze #3 */}
        <div className="order-3 p-5 rounded-2xl glass-panel border border-slate-700 text-center space-y-2 mt-4 md:mt-8">
          <span className="text-3xl">🥉</span>
          <div className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">
            Rank #3
          </div>
          <h3 className="font-extrabold text-white text-base">Mikasa_Newton</h3>
          <p className="text-xs text-pink-400 font-medium">Physics Surveyor</p>
          <div className="pt-2 flex justify-center items-center gap-3 text-xs font-mono font-bold text-slate-300">
            <span>Lvl 36</span>
            <span>•</span>
            <span className="text-purple-300">11,400 XP</span>
          </div>
        </div>

      </div>

      {/* Leaderboard Table */}
      <div className="p-5 rounded-3xl glass-panel border border-purple-500/30 space-y-3">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2">
          Rankings & Class Standings
        </h3>

        <div className="space-y-2">
          {LEADERBOARD_STUDENTS.map(student => {
            const isUser = student.isCurrentUser;
            const displayName = isUser && security.pseudonymizeLeaderboard
              ? 'Agent_X42 (Incognito)'
              : student.name;

            return (
              <div
                key={student.rank}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                  isUser
                    ? 'bg-gradient-to-r from-purple-950/80 to-indigo-950/60 border-purple-400 shadow-md shadow-purple-950/40'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                    student.rank === 1 ? 'bg-yellow-500 text-slate-950' :
                    student.rank === 2 ? 'bg-slate-300 text-slate-950' :
                    student.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {student.rank}
                  </span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-bold text-sm truncate ${isUser ? 'text-cyan-300' : 'text-white'}`}>
                        {displayName}
                      </p>
                      {isUser && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                          YOU
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {isUser ? profile.title : student.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono font-bold flex-shrink-0">
                  <div className="flex items-center gap-1 text-amber-400">
                    <Flame className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{isUser ? profile.streakDays : student.streak}d</span>
                  </div>
                  <span className="text-slate-400">Lvl {isUser ? profile.level : student.level}</span>
                  <span className="text-purple-300">{isUser ? profile.xp : student.xp} XP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges & Achievements Cabinet */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Unlocked Badges & Trophies</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {profile.badges.filter(b => b.unlockedAt).length} / {profile.badges.length} Collected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {profile.badges.map(badge => {
            const isUnlocked = !!badge.unlockedAt;
            return (
              <div
                key={badge.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-slate-900/80 border-purple-500/30'
                    : 'bg-slate-950/40 border-slate-800 opacity-50'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{badge.icon}</span>
                  <div>
                    <h4 className="font-bold text-xs text-white">{badge.name}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                      {badge.rarity}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {badge.description}
                </p>
                {isUnlocked && (
                  <p className="text-[10px] text-emerald-400 font-bold mt-2">
                    ✓ Unlocked ({badge.unlockedAt})
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
