import React from 'react';
import { Sparkles, Trophy, Coins, ArrowRight, Zap } from 'lucide-react';
import { useEdu } from '../../context/EduContext';

export const LevelUpModal: React.FC = () => {
  const { levelUpModalOpen, closeLevelUpModal, profile, gainCoins, healPlayer } = useEdu();

  if (!levelUpModalOpen) return null;

  const handleClaim = () => {
    gainCoins(100);
    healPlayer(50);
    closeLevelUpModal();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="levelup-heading"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-purple-950 to-slate-950 border-2 border-purple-500/60 shadow-2xl shadow-purple-500/40 text-center overflow-hidden">
        
        {/* Glow ambient background element */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />

        {/* Anime Level Up Badge Header */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-pink-500 p-1 shadow-lg shadow-orange-500/30 mb-4 animate-bounce">
          <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center text-3xl">
            ⚡
          </div>
        </div>

        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-900/60 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Power Level Surge
        </div>

        <h2 id="levelup-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-1">
          LEVEL UP!
        </h2>
        
        <p className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
          Level {profile.level} reached!
        </p>

        {/* Reaction Meme Card */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 mb-6 text-left">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🗿👑</span>
            <div>
              <p className="font-extrabold text-white text-sm">GigaChad Status Unlocked</p>
              <p className="text-xs text-purple-300">"He’s beginning to believe..."</p>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Your persistence converted textbook boredom into pure cognitive kinetic energy!
          </p>
        </div>

        {/* Claimable Rewards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-purple-900/30 border border-purple-500/20 text-center">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 font-bold text-sm mb-1">
              <Coins className="w-4 h-4" />
              <span>+100 Coins</span>
            </div>
            <p className="text-[11px] text-slate-400">Bonus Meme Vault Gold</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-900/30 border border-emerald-500/20 text-center">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold text-sm mb-1">
              <Zap className="w-4 h-4" />
              <span>+50 HP Refill</span>
            </div>
            <p className="text-[11px] text-slate-400">Health Restored</p>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleClaim}
          className="w-full py-3.5 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 shadow-xl shadow-purple-600/30 transition-all transform active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Claim Rewards & Continue</span>
          <ArrowRight className="w-5 h-5" />
        </button>

      </div>
    </div>
  );
};
