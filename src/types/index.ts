export type SubjectCategory = 'physics' | 'cs' | 'chemistry' | 'math' | 'biology';

export interface MemeFeedback {
  id: string;
  type: 'correct' | 'incorrect';
  title: string;
  subtitle: string;
  imageEmoji: string;
  memeTemplate: string;
  reactionPhrase: string;
  educationalTakeaway: string;
}

export interface QuizQuestion {
  id: string;
  category: SubjectCategory;
  topic: string;
  question: string;
  animeReference?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  humorousAnalogy: string;
  difficulty: 'easy' | 'medium' | 'boss';
  correctMeme: MemeFeedback;
  incorrectMeme: MemeFeedback;
}

export interface AnimeExplainerChapter {
  id: string;
  title: string;
  category: SubjectCategory;
  animeInspiration: string;
  heroCharacter: string;
  conceptName: string;
  tagline: string;
  readTime: string;
  realWorldApplication: string;
  analogyText: string;
  loreExplanation: string;
  interactiveDemoType: 'force_recoil' | 'call_stack' | 'electron_sharing' | 'binary_search';
  keyTakeaways: string[];
}

export interface BossState {
  name: string;
  title: string;
  avatarEmoji: string;
  maxHp: number;
  currentHp: number;
  phases: number;
  currentPhase: number;
  specialMove: string;
  dialogue: {
    start: string;
    attack: string;
    hurt: string;
    defeat: string;
  };
}

export interface StudentProfile {
  name: string;
  title: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streakDays: number;
  memeCoins: number;
  completedQuests: number;
  bossesDefeated: number;
  comebacksCompleted: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface LearningGap {
  id: string;
  category: SubjectCategory;
  topic: string;
  missedCount: number;
  lastMissedAt: string;
  status: 'active' | 'in_comeback' | 'mastered';
  suggestedChapterId: string;
}

export interface AccessibilitySettings {
  highContrast: boolean;
  dyslexiaFont: boolean;
  fontSize: 'normal' | 'large' | 'xl';
  reducedMotion: boolean;
  audioNarration: boolean;
  soundEffects: boolean;
  keyboardAssistance: boolean;
}

export interface SecuritySettings {
  incognitoMode: boolean;
  encryptedLocalStore: boolean;
  telemetryDisabled: boolean;
  pseudonymizeLeaderboard: boolean;
  auditLogEnabled: boolean;
}

export interface AuthUser {
  username: string;
  name: string;
  role: string;
  avatarEmoji: string;
}

