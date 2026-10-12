import React, { useState, useEffect } from 'react';
import {
  Laugh,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Volume2,
  Keyboard,
  Coins,
  ShieldAlert
} from 'lucide-react';
import { INITIAL_QUIZ_QUESTIONS } from '../../data/mockData';
import { QuizQuestion, MemeFeedback } from '../../types';
import { useEdu } from '../../context/EduContext';
import { sounds } from '../../utils/soundEffects';

export const MemeQuizArena: React.FC = () => {
  const { recordQuestionResult, gainXp, setActivePage, accessibility } = useEdu();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [feedbackMeme, setFeedbackMeme] = useState<MemeFeedback | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const currentQ: QuizQuestion = INITIAL_QUIZ_QUESTIONS[currentIndex];

  // IS 17802: Full keyboard navigation (keys 1-4 to select option, Enter to submit)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnswered) {
        if (e.key === 'Enter') {
          handleNextQuestion();
        }
        return;
      }

      if (['1', '2', '3', '4'].includes(e.key)) {
        const optIndex = parseInt(e.key, 10) - 1;
        if (optIndex < currentQ.options.length) {
          setSelectedOption(optIndex);
        }
      } else if (e.key === 'Enter' && selectedOption !== null) {
        handleSubmitAnswer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, selectedOption, currentQ]);

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    const correct = selectedOption === currentQ.correctIndex;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setFeedbackMeme(currentQ.correctMeme);
      recordQuestionResult(currentQ, true);
    } else {
      setFeedbackMeme(currentQ.incorrectMeme);
      recordQuestionResult(currentQ, false);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setFeedbackMeme(null);
    if (currentIndex < INITIAL_QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  const narrateQuestion = () => {
    sounds.speak(`${currentQ.question}. Options: ${currentQ.options.map((o, idx) => `Option ${idx + 1}: ${o}`).join('. ')}`);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Top Arena Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-purple-900/30">
        <div>
          <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Laugh className="w-4 h-4 text-amber-300" />
            <span>Fail-Forward Learning Lab</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Meme Quiz Arena
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Mistakes aren't penalties here. They're hilarious memes that teach you exactly what to adjust!
          </p>
        </div>

        {/* Question Counter & Narration */}
        <div className="flex items-center gap-2">
          <button
            onClick={narrateQuestion}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            title="Read Question Out Loud (IS 17802 Voice Narration)"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <div className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
            Question {currentIndex + 1} / {INITIAL_QUIZ_QUESTIONS.length}
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/30 space-y-6 relative overflow-hidden">
        
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Category & Topic Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
            {currentQ.category.toUpperCase()}
          </span>
          <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-800 text-slate-300">
            Topic: {currentQ.topic}
          </span>
          {currentQ.animeReference && (
            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-purple-900/40 text-purple-300 border border-purple-500/30">
              📺 {currentQ.animeReference}
            </span>
          )}
        </div>

        {/* Question Prompt */}
        <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
          {currentQ.question}
        </h2>

        {/* Options List */}
        <div className="space-y-3" role="radiogroup" aria-label="Question choices">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            let btnStyle = 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-purple-500/40';

            if (isAnswered) {
              if (idx === currentQ.correctIndex) {
                btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-950/50';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-red-950/80 border-red-400 text-red-200';
              } else {
                btnStyle = 'opacity-40 bg-slate-900/40 border-slate-800 text-slate-500';
              }
            } else if (isSelected) {
              btnStyle = 'bg-purple-950/80 border-purple-400 text-white shadow-md shadow-purple-900/40';
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => setSelectedOption(idx)}
                className={`w-full p-4 rounded-2xl border text-left font-medium text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-300 flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span>{opt}</span>
                </div>

                {isAnswered && idx === currentQ.correctIndex && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Submit Action or Feedback Banner */}
        {!isAnswered ? (
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Keyboard className="w-4 h-4 text-purple-400" />
              <span>Tip: Press keys <strong>1-4</strong> to select, <strong>Enter</strong> to submit</span>
            </div>

            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:opacity-40 transition-all shadow-lg shadow-purple-600/30"
            >
              Confirm Answer
            </button>
          </div>
        ) : (
          /* Humorous Meme Feedback Module */
          feedbackMeme && (
            <div
              className={`p-6 rounded-2xl border animate-in zoom-in-95 duration-200 ${
                isCorrect
                  ? 'bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border-emerald-400/50'
                  : 'bg-gradient-to-br from-red-950/80 via-slate-900 to-slate-950 border-red-400/50'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-4">
                
                {/* Meme Reaction Emoji and Title */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-3xl shadow-inner animate-meme-bob">
                    {feedbackMeme.imageEmoji}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Meme Reaction: {feedbackMeme.memeTemplate}
                    </span>
                    <h3 className={`text-xl font-black ${isCorrect ? 'text-emerald-300' : 'text-red-300'}`}>
                      {feedbackMeme.title}
                    </h3>
                    <p className="text-xs text-slate-300 font-medium">
                      "{feedbackMeme.reactionPhrase}"
                    </p>
                  </div>
                </div>

                {/* Score / Reward Badge */}
                {isCorrect ? (
                  <div className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>+50 XP & +15 Coins!</span>
                  </div>
                ) : (
                  <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>Added to Comeback Quests (2x XP)</span>
                  </div>
                )}
              </div>

              {/* Constructive Explanations */}
              <div className="space-y-2 mb-6">
                <p className="text-xs text-slate-200 leading-relaxed">
                  💡 <strong className="text-white">Explanation: </strong>
                  {currentQ.explanation}
                </p>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-amber-300">Anime Analogy: </span>
                  <span>{currentQ.humorousAnalogy}</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {!isCorrect ? (
                  <button
                    onClick={() => setActivePage('comeback-quests')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Redeem on Comeback Quests (2x Double XP)</span>
                  </button>
                ) : (
                  <div className="text-xs text-slate-400 font-mono">
                    Awesome job! Keep the streak alive!
                  </div>
                )}

                <button
                  onClick={handleNextQuestion}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/30"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
};
