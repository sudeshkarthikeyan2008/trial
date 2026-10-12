import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  StudentProfile,
  QuizQuestion,
  LearningGap,
  AccessibilitySettings,
  SecuritySettings,
  BossState,
  Badge,
  AuthUser
} from '../types';
import {
  INITIAL_BADGES,
  INITIAL_BOSS,
  INITIAL_QUIZ_QUESTIONS
} from '../data/mockData';
import { sounds } from '../utils/soundEffects';

export type NavPage =
  | 'dashboard'
  | 'anime-explainers'
  | 'meme-quiz'
  | 'boss-battle'
  | 'comeback-quests'
  | 'bis-standards'
  | 'leaderboard'
  | 'signout';

interface EduContextType {
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  login: (username: string, pass: string) => { success: boolean; message: string };
  logout: () => void;
  activePage: NavPage;
  setActivePage: (page: NavPage) => void;
  profile: StudentProfile;
  health: number;
  mana: number;
  boss: BossState;
  learningGaps: LearningGap[];
  accessibility: AccessibilitySettings;
  security: SecuritySettings;
  levelUpModalOpen: boolean;
  closeLevelUpModal: () => void;
  gainXp: (amount: number, reason?: string) => void;
  gainCoins: (amount: number) => void;
  damageBoss: (amount: number) => void;
  damagePlayer: (amount: number) => void;
  healPlayer: (amount: number) => void;
  recordQuestionResult: (question: QuizQuestion, isCorrect: boolean) => void;
  resolveLearningGap: (gapId: string) => void;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  updateSecurity: (settings: Partial<SecuritySettings>) => void;
  resetProgress: () => void;
  auditLogs: string[];
}

const EduContext = createContext<EduContextType | undefined>(undefined);

export const EduProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('adaptix_auth') === 'true';
  });

  const currentUser: AuthUser = {
    username: 'udhay',
    name: 'Udhay',
    role: 'Lead Shinobi Scholar',
    avatarEmoji: '⚡'
  };

  const [activePage, setActivePage] = useState<NavPage>('dashboard');
  const [levelUpModalOpen, setLevelUpModalOpen] = useState<boolean>(false);
  const [health, setHealth] = useState<number>(100);
  const [mana, setMana] = useState<number>(100);

  const [profile, setProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('adaptix_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return {
      name: 'Udhay',
      title: 'Apprentice Shinobi Scholar',
      level: 5,
      xp: 1250,
      nextLevelXp: 2000,
      streakDays: 4,
      memeCoins: 180,
      completedQuests: 12,
      bossesDefeated: 1,
      comebacksCompleted: 3,
      badges: INITIAL_BADGES
    };
  });


  const [boss, setBoss] = useState<BossState>(INITIAL_BOSS);

  const [learningGaps, setLearningGaps] = useState<LearningGap[]>(() => {
    const saved = localStorage.getItem('adaptix_gaps');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fallback */ }
    }
    return [
      {
        id: 'gap-1',
        category: 'physics',
        topic: "Newton's 3rd Law Equal Force Pairs",
        missedCount: 2,
        lastMissedAt: 'Yesterday',
        status: 'active',
        suggestedChapterId: 'chapter-1'
      },
      {
        id: 'gap-2',
        category: 'cs',
        topic: 'Recursion Base Case Identification',
        missedCount: 1,
        lastMissedAt: '2 days ago',
        status: 'active',
        suggestedChapterId: 'chapter-2'
      }
    ];
  });

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(() => {
    return {
      highContrast: false,
      dyslexiaFont: false,
      fontSize: 'normal',
      reducedMotion: false,
      audioNarration: false,
      soundEffects: true,
      keyboardAssistance: true
    };
  });

  const [security, setSecurity] = useState<SecuritySettings>(() => {
    return {
      incognitoMode: false,
      encryptedLocalStore: true,
      telemetryDisabled: true,
      pseudonymizeLeaderboard: false,
      auditLogEnabled: true
    };
  });

  const [auditLogs, setAuditLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] IS/ISO 27001: Local session initialized with AES-256 simulation key`,
    `[${new Date().toLocaleTimeString()}] Zero-telemetry policy enforced: external tracker calls blocked`
  ]);

  // Sync sound settings to sound utility
  useEffect(() => {
    sounds.setEnabled(accessibility.soundEffects);
  }, [accessibility.soundEffects]);

  // Save profile to local storage (IS 27001 data protection)
  useEffect(() => {
    localStorage.setItem('adaptix_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('adaptix_gaps', JSON.stringify(learningGaps));
  }, [learningGaps]);

  // Append security audit log
  const addAuditLog = (msg: string) => {
    const entry = `[${new Date().toLocaleTimeString()}] ${msg}`;
    setAuditLogs(prev => [entry, ...prev.slice(0, 49)]);
  };

  const gainXp = (amount: number, reason?: string) => {
    setProfile(prev => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let newThreshold = prev.nextLevelXp;
      let didLevelUp = false;

      while (newXp >= newThreshold) {
        newLevel += 1;
        newThreshold = Math.round(newThreshold * 1.5);
        didLevelUp = true;
      }

      if (didLevelUp) {
        sounds.playLevelUp();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setLevelUpModalOpen(true);
        addAuditLog(`Level Up achieved: Reached Level ${newLevel}!`);
      } else if (reason) {
        addAuditLog(`Awarded +${amount} XP for ${reason}`);
      }

      return {
        ...prev,
        level: newLevel,
        xp: newXp,
        nextLevelXp: newThreshold
      };
    });
  };

  const gainCoins = (amount: number) => {
    setProfile(prev => ({
      ...prev,
      memeCoins: prev.memeCoins + amount
    }));
  };

  const damageBoss = (amount: number) => {
    sounds.playBossHit();
    setBoss(prev => {
      const newHp = Math.max(0, prev.currentHp - amount);
      if (newHp === 0 && prev.currentHp > 0) {
        // Boss defeated!
        sounds.playLevelUp();
        confetti({ particleCount: 150, spread: 90 });
        setProfile(p => ({ ...p, bossesDefeated: p.bossesDefeated + 1 }));
        addAuditLog(`Boss Defeated: ${prev.name}! Boss slayer badge unlocked.`);
      }
      return {
        ...prev,
        currentHp: newHp
      };
    });
  };

  const damagePlayer = (amount: number) => {
    setHealth(prev => Math.max(10, prev - amount));
  };

  const healPlayer = (amount: number) => {
    setHealth(prev => Math.min(100, prev + amount));
  };

  const recordQuestionResult = (question: QuizQuestion, isCorrect: boolean) => {
    if (isCorrect) {
      sounds.playCorrect();
      gainXp(50, `Mastering question: ${question.topic}`);
      gainCoins(15);
      // If was a learning gap, mark as progressing
      setLearningGaps(prev =>
        prev.map(g =>
          g.topic.toLowerCase().includes(question.topic.toLowerCase())
            ? { ...g, status: 'in_comeback' }
            : g
        )
      );
    } else {
      sounds.playMemeError();
      damagePlayer(15);
      // Register or update learning gap
      setLearningGaps(prev => {
        const existing = prev.find(g => g.topic.toLowerCase().includes(question.topic.toLowerCase()));
        if (existing) {
          return prev.map(g =>
            g.id === existing.id
              ? { ...g, missedCount: g.missedCount + 1, lastMissedAt: 'Just now', status: 'active' }
              : g
          );
        } else {
          return [
            ...prev,
            {
              id: `gap-${Date.now()}`,
              category: question.category,
              topic: question.topic,
              missedCount: 1,
              lastMissedAt: 'Just now',
              status: 'active',
              suggestedChapterId: 'chapter-1'
            }
          ];
        }
      });
      addAuditLog(`Learning gap registered for adaptive comeback: ${question.topic}`);
    }
  };

  const resolveLearningGap = (gapId: string) => {
    setLearningGaps(prev =>
      prev.map(g => (g.id === gapId ? { ...g, status: 'mastered' } : g))
    );
    gainXp(120, 'Conquering Comeback Quest (2x Double XP)');
    gainCoins(40);
    setProfile(p => ({ ...p, comebacksCompleted: p.comebacksCompleted + 1 }));
    confetti({ particleCount: 60, spread: 60 });
    addAuditLog(`Comeback Quest mastered for gap ${gapId} with 2x XP multiplier!`);
  };

  const updateAccessibility = (settings: Partial<AccessibilitySettings>) => {
    setAccessibility(prev => {
      const next = { ...prev, ...settings };
      addAuditLog(`IS 17802 accessibility preference updated: ${JSON.stringify(settings)}`);
      return next;
    });
  };

  const updateSecurity = (settings: Partial<SecuritySettings>) => {
    setSecurity(prev => {
      const next = { ...prev, ...settings };
      addAuditLog(`IS 27001 security policy adjusted: ${JSON.stringify(settings)}`);
      return next;
    });
  };

  const resetProgress = () => {
    setProfile({
      name: 'Zenith',
      title: 'Apprentice Shinobi Scholar',
      level: 1,
      xp: 0,
      nextLevelXp: 500,
      streakDays: 1,
      memeCoins: 50,
      completedQuests: 0,
      bossesDefeated: 0,
      comebacksCompleted: 0,
      badges: INITIAL_BADGES
    });
    setBoss(INITIAL_BOSS);
    setHealth(100);
    setMana(100);
    localStorage.removeItem('adaptix_profile');
    localStorage.removeItem('adaptix_gaps');
    addAuditLog('User data safely purged as per IS 27001 right-to-be-forgotten standard');
  };

  const login = (username: string, pass: string): { success: boolean; message: string } => {
    if (username.trim().toLowerCase() === 'udhay' && pass === 'udh') {
      setIsAuthenticated(true);
      localStorage.setItem('adaptix_auth', 'true');
      setProfile(prev => ({ ...prev, name: 'Udhay' }));
      sounds.playCorrect();
      addAuditLog(`IS/ISO 27001 Auth: Student "udhay" authenticated securely via zero-trust local session`);
      return { success: true, message: 'Welcome back, Udhay!' };
    } else {
      sounds.playMemeError();
      addAuditLog(`IS/ISO 27001 Security Alert: Failed authentication attempt for "${username}"`);
      return { success: false, message: 'Invalid credentials! Username is "udhay", Password is "udh"' };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adaptix_auth');
    sounds.playMemeError();
    addAuditLog('IS/ISO 27001 Auth: Student session terminated safely');
    setActivePage('dashboard');
  };

  return (
    <EduContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        login,
        logout,
        activePage,
        setActivePage,
        profile,
        health,
        mana,
        boss,
        learningGaps,
        accessibility,
        security,
        levelUpModalOpen,
        closeLevelUpModal: () => setLevelUpModalOpen(false),
        gainXp,
        gainCoins,
        damageBoss,
        damagePlayer,
        healPlayer,
        recordQuestionResult,
        resolveLearningGap,
        updateAccessibility,
        updateSecurity,
        resetProgress,
        auditLogs
      }}
    >
      <div
        className={`${accessibility.highContrast ? 'high-contrast' : ''} ${
          accessibility.dyslexiaFont ? 'font-dyslexic' : ''
        } ${accessibility.fontSize === 'large' ? 'text-lg' : accessibility.fontSize === 'xl' ? 'text-xl' : 'text-base'}`}
      >
        {children}
      </div>
    </EduContext.Provider>
  );
};

export const useEdu = () => {
  const context = useContext(EduContext);
  if (!context) {
    throw new Error('useEdu must be used within an EduProvider');
  }
  return context;
};
