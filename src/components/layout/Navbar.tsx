import React from 'react';
import {
  Flame,
  Coins,
  Shield,
  Volume2,
  VolumeX,
  Eye,
  Type,
  Menu,
  Sparkles,
  LogOut
} from 'lucide-react';
import { useEdu } from '../../context/EduContext';

interface NavbarProps {
  onToggleMobileMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu }) => {
  const {
    profile,
    accessibility,
    updateAccessibility,
    health,
    setActivePage
  } = useEdu();


  const xpPercent = Math.min(100, Math.round((profile.xp / profile.nextLevelXp) * 100));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-900/30 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-purple-500/20 flex items-center justify-center">
              <span className="text-xl">⚡</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                  Adaptix
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300">
                  BIS Smart Ed
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                Gamified & Meme-Powered Learning Ecosystem
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live Level & XP Progress Bar */}
        <div className="hidden lg:flex flex-col items-center flex-1 max-w-xs">
          <div className="flex items-center justify-between w-full text-xs font-semibold mb-1">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              Lvl {profile.level} {profile.title}
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              {profile.xp} / {profile.nextLevelXp} XP ({xpPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-800/90 rounded-full h-2.5 overflow-hidden p-0.5 border border-purple-500/20">
            <div
              className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${xpPercent}%` }}
              role="progressbar"
              aria-valuenow={xpPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Right: Gamified Stats & Accessibility Shortcuts */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Daily Streak */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold"
            title={`${profile.streakDays} Day Learning Streak`}
          >
            <Flame className="w-4 h-4 fill-amber-400 animate-pulse text-amber-400" />
            <span>{profile.streakDays}d</span>
          </div>

          {/* Meme Coins */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold font-mono"
            title={`${profile.memeCoins} Meme Coins earned`}
          >
            <Coins className="w-4 h-4 text-purple-400" />
            <span>{profile.memeCoins}</span>
          </div>

          {/* Player HP */}
          <div
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold"
            title={`Player Health: ${health}/100`}
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>{health} HP</span>
          </div>

          {/* Accessibility Shortcuts (IS 17802) */}
          <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
            
            {/* Audio Sfx Toggle */}
            <button
              onClick={() => updateAccessibility({ soundEffects: !accessibility.soundEffects })}
              aria-label={accessibility.soundEffects ? "Mute audio sound effects" : "Enable audio sound effects"}
              title="Sound Effects (Retro 8-bit & Voice)"
              className={`p-2 rounded-xl border transition-all ${
                accessibility.soundEffects
                  ? 'bg-purple-900/40 border-purple-500/40 text-purple-300'
                  : 'bg-slate-900/60 border-slate-800 text-slate-500'
              }`}
            >
              {accessibility.soundEffects ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* High Contrast Toggle */}
            <button
              onClick={() => updateAccessibility({ highContrast: !accessibility.highContrast })}
              aria-label="Toggle high contrast accessibility mode"
              title="IS 17802: High Contrast Mode"
              className={`p-2 rounded-xl border transition-all ${
                accessibility.highContrast
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Dyslexia-Friendly Font Toggle */}
            <button
              onClick={() => updateAccessibility({ dyslexiaFont: !accessibility.dyslexiaFont })}
              aria-label="Toggle dyslexia-friendly typography"
              title="IS 17802: Dyslexia Friendly Font"
              className={`p-2 rounded-xl border transition-all ${
                accessibility.dyslexiaFont
                  ? 'bg-pink-500/20 border-pink-400 text-pink-300 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Type className="w-4 h-4" />
            </button>

          </div>

          {/* User Profile & Sign Out Button */}
          <div className="flex items-center gap-2 border-l border-slate-800 pl-2">
            <div className="hidden xl:flex flex-col text-right">
              <span className="text-xs font-bold text-white leading-tight">Udhay</span>
              <span className="text-[10px] text-purple-400 font-medium">Student</span>
            </div>

            <button
              onClick={() => setActivePage('signout')}
              title="Sign Out of Adaptix"
              aria-label="Sign out"
              className="p-2 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span className="hidden sm:inline-block text-xs font-bold">Sign Out</span>
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
