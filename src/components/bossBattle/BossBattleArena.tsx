import React, { useState } from 'react';
import {
  Swords,
  Shield,
  Zap,
  Sparkles,
  Trophy,
  RotateCcw,
  AlertTriangle,
  Flame,
  CheckCircle,
  Skull
} from 'lucide-react';
import { useEdu } from '../../context/EduContext';
import { sounds } from '../../utils/soundEffects';

interface BossQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  damage: number;
  concept: string;
}

const BOSS_QUESTIONS: BossQuestion[] = [
  {
    prompt: "Lord Procrastination casts 'Infinite Loop of Video Games'! How do you break the cycle?",
    options: [
      "Let the battery drain to 0%",
      "Define a strict Base Case condition with an exit return statement",
      "Keep spawning child threads until RAM bursts",
      "Ignore it and hope it sorts itself out"
    ],
    correctIndex: 1,
    damage: 250,
    concept: "Recursion Base Case"
  },
  {
    prompt: "The Bug Overlord launches a high-speed '404 Null Exception' projectile! You fire an energy blast to repel it. According to Newton's 3rd Law:",
    options: [
      "The blast pushes the projectile away, but nothing pushes back on you",
      "The projectile pushes back on your blast with the exact same magnitude of force",
      "Physics stops working during runtime exceptions",
      "Only the heavier object feels a force"
    ],
    correctIndex: 1,
    damage: 300,
    concept: "Action-Reaction Mutual Force"
  },
  {
    prompt: "Lord Procrastination hides the homework file inside 1,000,000 nested folders! What is your fastest spell to locate it?",
    options: [
      "Linear Search: open all 1,000,000 folders manually (O(N))",
      "Binary Search on sorted index: find it in ~20 steps (O(log N))",
      "Random shuffle guessing (O(N!))",
      "Delete Windows System32"
    ],
    correctIndex: 1,
    damage: 350,
    concept: "Logarithmic Search Complexity"
  },
  {
    prompt: "NullPointer attempts to dissolve your defenses using free radicals. How do atoms stabilize their outer shells against chemical decay?",
    options: [
      "By forming Covalent bonds to share valence electrons and complete an octet",
      "By ejecting all protons into space",
      "By increasing temperature to absolute zero",
      "By ignoring valence electrons entirely"
    ],
    correctIndex: 0,
    damage: 400,
    concept: "Covalent Octet Rule"
  }
];

export const BossBattleArena: React.FC = () => {
  const { boss, damageBoss, health, damagePlayer, healPlayer, mana, gainXp, gainCoins } = useEdu();

  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasShield, setHasShield] = useState<boolean>(false);
  const [combatLog, setCombatLog] = useState<string[]>([
    "⚔️ Raid started against NullPointer & Lord Procrastination!",
    "💡 Answer correctly to unleash devastating critical strikes!"
  ]);

  const bossDefeated = boss.currentHp <= 0;
  const currentQ = BOSS_QUESTIONS[currentQIndex % BOSS_QUESTIONS.length];
  const bossHpPercent = Math.max(0, Math.round((boss.currentHp / boss.maxHp) * 100));

  const addCombatLog = (msg: string) => {
    setCombatLog(prev => [msg, ...prev.slice(0, 7)]);
  };

  const handleAttack = () => {
    if (selectedOption === null || bossDefeated) return;

    if (selectedOption === currentQ.correctIndex) {
      damageBoss(currentQ.damage);
      gainXp(80, 'Boss Critical Strike hit!');
      gainCoins(25);
      addCombatLog(`💥 CRITICAL HIT! You countered ${currentQ.concept} and dealt ${currentQ.damage} DMG to ${boss.name}!`);
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      sounds.playMemeError();
      if (hasShield) {
        setHasShield(false);
        addCombatLog(`🛡️ Your Meme Shield absorbed NullPointer's counterattack!`);
      } else {
        damagePlayer(25);
        addCombatLog(`💔 OUCH! NullPointer struck back with 'Doom Scrolling Flashbang' for 25 DMG!`);
      }
      setSelectedOption(null);
    }
  };

  const castMemeShield = () => {
    if (hasShield) return;
    setHasShield(true);
    sounds.playCorrect();
    addCombatLog("🛡️ Cast 'Meme Shield': Next boss counterattack will be completely nullified!");
  };

  const castAnimeHeal = () => {
    healPlayer(30);
    sounds.playCorrect();
    addCombatLog("✨ Channeled 'Senzu Bean / Anime Focus': Restored +30 HP!");
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Boss Raid Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-red-900/40">
        <div>
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Swords className="w-4 h-4 text-red-500" />
            <span>Milestone Exam Disguised as Boss Fight</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Boss Battle: NullPointer & Lord Procrastination
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Put your learning to the ultimate test. Each correct deduction deals massive damage to the glitch overlord!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 font-bold text-xs font-mono">
            Phase {bossHpPercent > 60 ? '1' : bossHpPercent > 25 ? '2' : '3'}
          </span>
        </div>
      </div>

      {/* Main Boss Visualizer Stage */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-red-950/40 via-slate-900 to-slate-950 border border-red-500/40 shadow-2xl relative overflow-hidden">
        
        {/* Ambient Red Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 pb-6 border-b border-slate-800">
          
          {/* Boss Avatar & Health */}
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-red-950/80 border-2 border-red-500 flex items-center justify-center text-4xl sm:text-5xl shadow-2xl ${
              bossDefeated ? 'grayscale opacity-60' : 'animate-boss-pulse'
            }`}>
              {bossDefeated ? '💀' : boss.avatarEmoji}
            </div>

            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {boss.name}
                </h2>
                {bossDefeated && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
                    DEFEATED!
                  </span>
                )}
              </div>
              
              <p className="text-xs text-red-300 italic">
                "{bossDefeated ? boss.dialogue.defeat : bossHpPercent < 40 ? boss.dialogue.hurt : boss.dialogue.start}"
              </p>

              {/* Boss HP Bar */}
              <div className="space-y-1 pt-1 max-w-sm">
                <div className="flex justify-between text-xs font-bold font-mono">
                  <span className="text-red-400">BOSS HEALTH</span>
                  <span className="text-white">{boss.currentHp} / {boss.maxHp} HP ({bossHpPercent}%)</span>
                </div>
                <div className="h-4 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-red-500/40">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 rounded-full transition-all duration-300 shadow-md shadow-red-500/50"
                    style={{ width: `${bossHpPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Player Combat Vitals & Special Spells */}
          <div className="w-full md:w-auto p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 min-w-[240px]">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-300">Your Health:</span>
              <span className="text-emerald-400 font-mono">{health}/100 HP</span>
            </div>
            
            <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${health}%` }}
              />
            </div>

            {/* Quick Spell Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={castMemeShield}
                disabled={hasShield || bossDefeated}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                  hasShield
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Blocks the next boss counterattack"
              >
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>{hasShield ? 'Shield Active' : 'Meme Shield'}</span>
              </button>

              <button
                onClick={castAnimeHeal}
                disabled={health >= 100 || bossDefeated}
                className="py-2 px-3 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
                title="Restores 30 HP"
              >
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Anime Heal</span>
              </button>
            </div>
          </div>

        </div>

        {/* Combat Question Arena */}
        {!bossDefeated ? (
          <div className="pt-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Flame className="w-4 h-4" />
              <span>Boss Combat Strike Encounter:</span>
            </div>

            <p className="text-lg font-black text-white leading-snug">
              {currentQ.prompt}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(idx)}
                    className={`p-4 rounded-2xl border text-left text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-red-950/80 border-red-400 text-white shadow-lg shadow-red-900/40'
                        : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold font-mono text-red-400 mr-2">[{idx + 1}]</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleAttack}
                disabled={selectedOption === null}
                className="px-8 py-3 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 hover:from-red-500 hover:to-amber-500 disabled:opacity-40 shadow-xl shadow-red-600/30 transition-all flex items-center gap-2"
              >
                <Swords className="w-4 h-4" />
                <span>Unleash Strike ({currentQ.damage} DMG)</span>
              </button>
            </div>
          </div>
        ) : (
          /* Victory Stage */
          <div className="pt-8 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 mx-auto flex items-center justify-center text-4xl shadow-xl shadow-amber-500/30">
              👑
            </div>
            <h2 className="text-3xl font-black text-white">
              VICTORY! LORD PROCRASTINATION HAS FALLEN!
            </h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              You applied conceptual physics, recursion base cases, logarithmic math, and chemical octets to banish the bug overlord!
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-xs">
              <Trophy className="w-4 h-4" />
              <span>Legendary Badge Unlocked: Glitch Slayer</span>
            </div>
          </div>
        )}

      </div>

      {/* Live Combat Log Console */}
      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
          Combat Activity Stream
        </p>
        <div className="space-y-1 font-mono text-xs text-slate-300">
          {combatLog.map((log, idx) => (
            <p key={idx} className="leading-relaxed">
              {log}
            </p>
          ))}
        </div>
      </div>

    </div>
  );
};
