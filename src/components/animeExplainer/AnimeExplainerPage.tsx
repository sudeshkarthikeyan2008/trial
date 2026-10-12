import React, { useState } from 'react';
import {
  Tv,
  Sparkles,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  CheckCircle,
  Award,
  Layers,
  Zap,
  Atom,
  Search,
  BookOpen
} from 'lucide-react';
import { INITIAL_ANIME_CHAPTERS } from '../../data/mockData';
import { AnimeExplainerChapter } from '../../types';
import { useEdu } from '../../context/EduContext';
import { sounds } from '../../utils/soundEffects';

export const AnimeExplainerPage: React.FC = () => {
  const { gainXp, accessibility } = useEdu();
  const [selectedChapter, setSelectedChapter] = useState<AnimeExplainerChapter>(INITIAL_ANIME_CHAPTERS[0]);
  const [isNarrating, setIsNarrating] = useState<boolean>(false);
  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>({});

  // Interactive Demo States
  // 1. Newton's 3rd Law Force Slider
  const [blastPower, setBlastPower] = useState<number>(50); // 10 to 100
  // 2. Doctor Strange Call Stack
  const [callStack, setCallStack] = useState<string[]>(['main()', 'dormammuBargain(depth: 1)']);
  const [recursionBaseCaseReached, setRecursionBaseCaseReached] = useState<boolean>(false);
  // 3. Chemical Bonding Demo
  const [bondType, setBondType] = useState<'covalent' | 'ionic'>('covalent');
  // 4. Binary Search Demo
  const [binaryTarget, setBinaryTarget] = useState<number>(42);
  const [binaryRange, setBinaryRange] = useState<{ min: number; max: number; steps: number }>({ min: 1, max: 100, steps: 0 });
  const [binaryFound, setBinaryFound] = useState<boolean>(false);

  const toggleNarration = () => {
    if (isNarrating) {
      sounds.stopSpeaking();
      setIsNarrating(false);
    } else {
      setIsNarrating(true);
      sounds.speak(`${selectedChapter.title}. ${selectedChapter.analogyText}. Key Takeaway: ${selectedChapter.keyTakeaways.join('. ')}`);
    }
  };

  const handleCompleteChapter = () => {
    if (!completedChapters[selectedChapter.id]) {
      setCompletedChapters(prev => ({ ...prev, [selectedChapter.id]: true }));
      gainXp(100, `Completing anime explainer: ${selectedChapter.conceptName}`);
      sounds.playCorrect();
    }
  };

  // Stack simulator methods
  const pushCallStack = () => {
    if (callStack.length >= 5) {
      // Simulate base case
      setRecursionBaseCaseReached(true);
      sounds.playMemeError();
      return;
    }
    const nextDepth = callStack.length;
    setCallStack(prev => [...prev, `dormammuBargain(depth: ${nextDepth})`]);
    sounds.playCorrect();
  };

  const popCallStack = () => {
    if (callStack.length > 1) {
      setCallStack(prev => prev.slice(0, -1));
      sounds.playCorrect();
    }
  };

  const resetCallStack = () => {
    setCallStack(['main()', 'dormammuBargain(depth: 1)']);
    setRecursionBaseCaseReached(false);
  };

  // Binary search step
  const handleBinaryStep = (direction: 'higher' | 'lower' | 'correct') => {
    const mid = Math.floor((binaryRange.min + binaryRange.max) / 2);
    if (direction === 'correct' || mid === binaryTarget) {
      setBinaryFound(true);
      sounds.playCorrect();
      return;
    }

    if (direction === 'higher') {
      setBinaryRange(prev => ({ ...prev, min: mid + 1, steps: prev.steps + 1 }));
    } else {
      setBinaryRange(prev => ({ ...prev, max: mid - 1, steps: prev.steps + 1 }));
    }
    sounds.playCorrect();
  };

  const resetBinary = () => {
    setBinaryRange({ min: 1, max: 100, steps: 0 });
    setBinaryFound(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-purple-900/30">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Tv className="w-4 h-4" />
            <span>Pop-Culture Concept Studio</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Anime & Movie Inspired Explanations
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Bridging abstract academic principles through legendary anime battles and blockbuster cinema lore.
          </p>
        </div>

        {/* Audio Narration Action Button (IS 17802 accessibility) */}
        <button
          onClick={toggleNarration}
          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
            isNarrating
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 animate-pulse'
              : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
          }`}
          title="Screen Reader & Audio Narration (IS 17802 Standard)"
        >
          {isNarrating ? <VolumeX className="w-4 h-4 text-cyan-400" /> : <Volume2 className="w-4 h-4" />}
          <span>{isNarrating ? 'Stop Audio Narration' : 'Narrate Concept (TTS)'}</span>
        </button>
      </div>

      {/* Chapters Selector Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {INITIAL_ANIME_CHAPTERS.map(ch => {
          const isSelected = selectedChapter.id === ch.id;
          const isDone = completedChapters[ch.id];
          return (
            <button
              key={ch.id}
              onClick={() => {
                setSelectedChapter(ch);
                if (isNarrating) {
                  sounds.stopSpeaking();
                  setIsNarrating(false);
                }
              }}
              className={`p-3.5 rounded-2xl text-left border transition-all relative ${
                isSelected
                  ? 'bg-purple-950/80 border-purple-400 shadow-lg shadow-purple-900/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {ch.animeInspiration}
                </span>
                {isDone && <CheckCircle className="w-4 h-4 text-emerald-400" />}
              </div>
              <h2 className={`font-bold text-xs line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                {ch.conceptName}
              </h2>
              <p className="text-[11px] text-slate-400 truncate mt-0.5">
                {ch.heroCharacter}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Chapter Content View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Lore & Analogy Explanation (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 rounded-3xl glass-panel border border-purple-500/30 space-y-4">
            
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
                {selectedChapter.category.toUpperCase()}
              </span>
              <span className="text-xs text-slate-400">
                Inspired by <strong className="text-slate-200">{selectedChapter.animeInspiration}</strong>
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">
              {selectedChapter.title}
            </h2>

            {/* Anime Quote / Tagline */}
            <div className="p-3.5 rounded-xl bg-purple-950/40 border-l-4 border-purple-400 text-xs italic text-purple-200 font-medium">
              "{selectedChapter.tagline}"
            </div>

            {/* The Analogy */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                The Pop-Culture Analogy
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                {selectedChapter.analogyText}
              </p>
            </div>

            {/* Academic Deep Dive */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Scientific / Academic Mechanism
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                {selectedChapter.loreExplanation}
              </p>
            </div>

            {/* Real World Applications */}
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs">
              <span className="font-bold text-amber-400">Everyday Real-World Application: </span>
              <span className="text-slate-300">{selectedChapter.realWorldApplication}</span>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Key Exam Takeaways
              </h3>
              <div className="space-y-1.5">
                {selectedChapter.keyTakeaways.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Chapter Action */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Award: +100 XP
              </span>
              <button
                onClick={handleCompleteChapter}
                disabled={completedChapters[selectedChapter.id]}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                  completedChapters[selectedChapter.id]
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800 cursor-default'
                    : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-purple-600/30'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>
                  {completedChapters[selectedChapter.id] ? 'Chapter Mastered ✓' : 'Mark as Mastered (+100 XP)'}
                </span>
              </button>
            </div>

          </div>

        </div>

        {/* Right Column: Interactive Hands-On Simulation Sandbox (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl glass-panel border border-cyan-500/30 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-cyan-400">
                <Play className="w-4 h-4 fill-cyan-400" />
                <span className="font-extrabold text-sm text-white">Interactive Sandbox</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                Live Physics / Code Engine
              </span>
            </div>

            {/* 1. Newton's 3rd Law Kamehameha Slider */}
            {selectedChapter.interactiveDemoType === 'force_recoil' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">
                  Drag the Ki Blast slider to observe Newton's 3rd Law: as Goku outputs forward beam force ($+F$), an equal recoil force ($-F$) throws him backward!
                </p>

                {/* Visualizer Stage */}
                <div className="relative h-44 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center p-4">
                  {/* Goku Sprite */}
                  <div
                    className="absolute transition-transform duration-100 flex flex-col items-center"
                    style={{ left: `${Math.max(5, 45 - blastPower * 0.35)}%` }}
                  >
                    <span className="text-3xl animate-pulse">🥋</span>
                    <span className="text-[10px] font-bold text-amber-400">Goku (m=75kg)</span>
                    <span className="text-[9px] text-red-400 font-mono">Recoil: -{Math.round(blastPower * 1.33)} m/s²</span>
                  </div>

                  {/* Beam Blast */}
                  <div
                    className="h-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full shadow-lg shadow-cyan-400/50 absolute"
                    style={{
                      left: `${Math.max(5, 45 - blastPower * 0.35) + 12}%`,
                      width: `${blastPower * 0.45}%`
                    }}
                  />

                  {/* Beam target */}
                  <div className="absolute right-4 flex flex-col items-center">
                    <span className="text-3xl">☄️</span>
                    <span className="text-[9px] text-cyan-400 font-mono">+{blastPower * 10} N Force</span>
                  </div>
                </div>

                {/* Slider Control */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Kamehameha Output Force:</span>
                    <span className="text-cyan-400 font-mono font-bold">{blastPower * 10} Newtons</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={blastPower}
                    onChange={e => setBlastPower(Number(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-1">
                  <p className="text-cyan-300">Action Force (Beam): +{blastPower * 10} N</p>
                  <p className="text-pink-400">Reaction Force (Recoil): -{blastPower * 10} N</p>
                  <p className="text-emerald-400 font-bold">Sum of Interaction: Equal & Opposite!</p>
                </div>
              </div>
            )}

            {/* 2. Doctor Strange Call Stack */}
            {selectedChapter.interactiveDemoType === 'call_stack' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">
                  Step into Dormammu's time loop. Each recursive call adds a frame to the Call Stack. Without a base case, it overflows!
                </p>

                {/* Stack Container */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[160px] flex flex-col-reverse gap-2">
                  {callStack.map((frame, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-gradient-to-r from-indigo-950 to-purple-900 border border-purple-500/40 text-xs font-mono text-purple-200 flex items-center justify-between animate-in slide-in-from-bottom-2"
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{frame}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">Frame #{idx}</span>
                    </div>
                  ))}
                </div>

                {recursionBaseCaseReached && (
                  <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-xs text-red-200">
                    ⚠️ <strong>Dormammu Agreed to Bargain (Base Case Reached)!</strong> Now pop the frames off the stack to conclude the function!
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={pushCallStack}
                    disabled={recursionBaseCaseReached}
                    className="py-2 px-3 rounded-xl bg-purple-700 hover:bg-purple-600 disabled:opacity-40 text-white font-bold text-xs"
                  >
                    + Recurse Step
                  </button>
                  <button
                    onClick={popCallStack}
                    className="py-2 px-3 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-white font-bold text-xs"
                  >
                    - Pop Frame
                  </button>
                  <button
                    onClick={resetCallStack}
                    className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                  >
                    Reset Loop
                  </button>
                </div>
              </div>
            )}

            {/* 3. Chemical Bonding Simulator */}
            {selectedChapter.interactiveDemoType === 'electron_sharing' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">
                  Switch between Covalent (Naruto & Sasuke sharing chakra) and Ionic (Orochimaru electron robbery) bonding!
                </p>

                <div className="flex rounded-xl bg-slate-900 p-1 border border-slate-800">
                  <button
                    onClick={() => setBondType('covalent')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      bondType === 'covalent' ? 'bg-cyan-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Covalent (H₂O Sharing)
                  </button>
                  <button
                    onClick={() => setBondType('ionic')}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      bondType === 'ionic' ? 'bg-purple-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Ionic (NaCl Transfer)
                  </button>
                </div>

                {/* Atom visualizer */}
                <div className="h-44 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-around p-4 relative">
                  {bondType === 'covalent' ? (
                    <>
                      <div className="text-center">
                        <div className="w-14 h-14 rounded-full border-2 border-dashed border-cyan-400 flex items-center justify-center font-bold text-cyan-300 text-sm">
                          H
                        </div>
                        <span className="text-[10px] text-slate-400">Hydrogen</span>
                      </div>
                      
                      {/* Shared pair */}
                      <div className="flex flex-col items-center gap-1 bg-cyan-950/60 p-2 rounded-xl border border-cyan-500/40">
                        <span className="text-xs">⚡⚡</span>
                        <span className="text-[9px] font-bold text-cyan-300">Shared e⁻ Pair</span>
                      </div>

                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full border-2 border-cyan-500 flex items-center justify-center font-bold text-cyan-300 text-sm">
                          O
                        </div>
                        <span className="text-[10px] text-slate-400">Oxygen (Octet)</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center">
                        <div className="w-14 h-14 rounded-full border-2 border-amber-500 flex items-center justify-center font-bold text-amber-300 text-sm">
                          Na⁺
                        </div>
                        <span className="text-[10px] text-amber-400">Lost 1 e⁻ (Cation)</span>
                      </div>
                      
                      <div className="text-center">
                        <span className="text-lg">➡️ ⚡ ➡️</span>
                        <span className="text-[9px] text-slate-400 block">Transfer</span>
                      </div>

                      <div className="text-center">
                        <div className="w-16 h-16 rounded-full border-2 border-purple-500 flex items-center justify-center font-bold text-purple-300 text-sm">
                          Cl⁻
                        </div>
                        <span className="text-[10px] text-purple-400">Gained 1 e⁻ (Anion)</span>
                      </div>
                    </>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  {bondType === 'covalent' ? (
                    <span>💡 <strong>Covalent bond:</strong> Non-metal atoms overlap valence electron shells without transferring net charges!</span>
                  ) : (
                    <span>💡 <strong>Ionic bond:</strong> Metal gives up electron to non-metal, creating electrostatic Coulomb attraction!</span>
                  )}
                </div>
              </div>
            )}

            {/* 4. Binary Search Simulator */}
            {selectedChapter.interactiveDemoType === 'binary_search' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-300">
                  L is deducing a secret number between 1 and 100. Watch how binary search finds it in at most 7 steps!
                </p>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
                  <p className="text-xs text-slate-400">Current Search Range:</p>
                  <p className="text-2xl font-black font-mono text-cyan-400">
                    [{binaryRange.min} ... {Math.floor((binaryRange.min + binaryRange.max) / 2)} ... {binaryRange.max}]
                  </p>
                  <p className="text-xs text-purple-300">
                    L's Guess: <strong>{Math.floor((binaryRange.min + binaryRange.max) / 2)}</strong> (Steps taken: {binaryRange.steps}/7)
                  </p>
                </div>

                {binaryFound ? (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-center text-xs text-emerald-300">
                    🎯 <strong>Target Found!</strong> Solved in {binaryRange.steps} logarithmic deductions!
                    <button
                      onClick={resetBinary}
                      className="block mx-auto mt-2 px-3 py-1 rounded bg-emerald-700 text-white font-bold"
                    >
                      Play Again
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleBinaryStep('lower')}
                      className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                    >
                      Target is Lower
                    </button>
                    <button
                      onClick={() => handleBinaryStep('correct')}
                      className="py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-xs font-bold text-white"
                    >
                      Exact Match!
                    </button>
                    <button
                      onClick={() => handleBinaryStep('higher')}
                      className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200"
                    >
                      Target is Higher
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
