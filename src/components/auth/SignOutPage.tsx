import React from 'react';
import {
  LogOut,
  ShieldCheck,
  Flame,
  Coins,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useEdu } from '../../context/EduContext';

export const SignOutPage: React.FC = () => {
  const { logout, setActivePage, profile, learningGaps } = useEdu();

  const handleConfirmSignOut = () => {
    logout();
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      
      {/* Top Breadcrumb Back Button */}
      <button
        onClick={() => setActivePage('dashboard')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Mission Control</span>
      </button>

      {/* Main Sign Out Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/30 shadow-2xl space-y-6 text-center relative overflow-hidden">
        
        {/* Glow Element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Sign Out Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-red-600 to-purple-600 p-0.5 shadow-xl shadow-red-600/20 mb-1">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-3xl">
            <LogOut className="w-8 h-8 text-red-400" />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Sign Out of Adaptix?
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Ready to wrap up this study adventure, <strong className="text-purple-300">Udhay</strong>? All your learning XP, streaks, and comeback challenges will be securely preserved.
          </p>
        </div>

        {/* Student Session Summary Card */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-xl">
                ⚡
              </div>
              <div>
                <p className="font-extrabold text-white text-sm">Udhay</p>
                <p className="text-[11px] text-cyan-400 font-mono">Level {profile.level} • {profile.title}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>{profile.streakDays}d Streak Safe</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">TOTAL XP</span>
              <span className="font-bold text-purple-300 font-mono text-sm">{profile.xp}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">MEME COINS</span>
              <span className="font-bold text-amber-300 font-mono text-sm">{profile.memeCoins} 🪙</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block font-mono">ACTIVE GAPS</span>
              <span className="font-bold text-cyan-300 font-mono text-sm">{learningGaps.length}</span>
            </div>
          </div>
        </div>

        {/* IS 27001 Data Integrity Notice */}
        <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3 text-left">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong className="text-emerald-300">IS/ISO 27001 Protected: </strong>
            Your learning progression and badge tokens remain safely locked in sovereign local encryption.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setActivePage('dashboard')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            Cancel & Keep Studying
          </button>

          <button
            onClick={handleConfirmSignOut}
            className="w-full sm:w-auto px-8 py-3 rounded-2xl font-bold text-xs bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Confirm Sign Out</span>
          </button>
        </div>

      </div>

    </div>
  );
};
