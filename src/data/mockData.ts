import { AnimeExplainerChapter, QuizQuestion, BossState, Badge } from '../types';

export const INITIAL_ANIME_CHAPTERS: AnimeExplainerChapter[] = [
  {
    id: 'chapter-1',
    title: "Newton's 3rd Law of Motion: The Kamehameha Clash",
    category: 'physics',
    animeInspiration: 'Dragon Ball Z',
    heroCharacter: 'Son Goku & Vegeta',
    conceptName: "Action & Reaction Forces",
    tagline: "For every action, there is an equal and opposite reaction!",
    readTime: '3 min read',
    realWorldApplication: 'Rocket propulsion, recoils, walking on pavement, swimming',
    analogyText: "Imagine Goku firing a massive Kamehameha into deep space. As millions of joules of ki blast forward, why does Goku get pushed backward into the rocks? Because the blast exerts an equal force back on him! Forces NEVER exist alone; they always come in mutual pairs.",
    loreExplanation: "When Body A applies a force $F_{AB}$ on Body B, Body B simultaneously exerts a force $F_{BA} = -F_{AB}$ on Body A. Notice that these two forces act on DIFFERENT objects, which is why they don't simply cancel each other out into zero motion!",
    interactiveDemoType: 'force_recoil',
    keyTakeaways: [
      'Forces always occur in matched action-reaction pairs.',
      'Action and reaction forces act on different bodies, never the same one.',
      'Equal force does not mean equal acceleration if masses are different (F = ma)!'
    ]
  },
  {
    id: 'chapter-2',
    title: "Recursion & Call Stack: Doctor Strange's Infinite Time Loop",
    category: 'cs',
    animeInspiration: 'Doctor Strange / Inception',
    heroCharacter: 'Doctor Strange vs Dormammu',
    conceptName: "Recursion & Base Cases",
    tagline: "'Dormammu, I have come to bargain!' ...until the condition is fulfilled.",
    readTime: '4 min read',
    realWorldApplication: 'File system traversal, JSON parsing, tree algorithms, undo histories',
    analogyText: "Strange enters Dormammu's realm and loops time again and again. Every time Strange dies, the time stone restarts the loop with a fresh call. Dormammu only yields when Strange's Base Case is reached: when Dormammu agrees to leave Earth! If Strange had no base case, the universe would suffer a Stack Overflow!",
    loreExplanation: "A recursive function is a function that calls itself to solve smaller sub-problems. Every recursive function MUST have two critical components: (1) A Base Case that terminates recursion without further calls, and (2) A Recursive Step that moves the problem closer toward the base case.",
    interactiveDemoType: 'call_stack',
    keyTakeaways: [
      'Every recursive function must have at least one Base Case to prevent infinite recursion.',
      'Each function invocation adds a stack frame to memory (Call Stack).',
      'Missing the base case causes a Maximum Call Stack Size Exceeded (Stack Overflow).'
    ]
  },
  {
    id: 'chapter-3',
    title: "Chemical Bonding: Naruto & Sasuke's Covalent Synergy",
    category: 'chemistry',
    animeInspiration: 'Naruto Shippuden',
    heroCharacter: 'Naruto & Sasuke',
    conceptName: "Covalent vs Ionic Bonding",
    tagline: "Sharing chakra creates unbreakable covalent bonds; stealing electrons is ionic robbery!",
    readTime: '3 min read',
    realWorldApplication: 'Water molecules (H2O), plastics, table salt (NaCl), DNA structure',
    analogyText: "When Naruto and Sasuke combine their Wind and Lightning Rasengan, neither ninja gives away their chakra completely—they SHARE it equally to achieve ultimate power (Covalent bond like H2O!). On the other hand, when Orochimaru straight up steals a curse mark electron, that's an Ionic bond like NaCl where one atom takes and the other gives!",
    loreExplanation: "Atoms bond to achieve stable outer electron octets (8 valence electrons). In Covalent bonding, non-metal atoms share electron pairs. In Ionic bonding, a metal transfers valence electrons to a non-metal, creating opposite electrostatic charges (cations and anions) that attract.",
    interactiveDemoType: 'electron_sharing',
    keyTakeaways: [
      'Covalent bonds share valence electrons between non-metals.',
      'Ionic bonds transfer electrons from metals to non-metals, creating electrostatic attraction.',
      'The Octet Rule drives chemical bonding for atomic stability.'
    ]
  },
  {
    id: 'chapter-4',
    title: "Binary Search: Death Note's 50/50 Deduction Strategy",
    category: 'math',
    animeInspiration: 'Death Note',
    heroCharacter: 'L vs Light Yagami',
    conceptName: "Logarithmic Search O(log n)",
    tagline: "Cut the suspect pool in half with every single deduction!",
    readTime: '3 min read',
    realWorldApplication: 'Database indexing, git bisect, dictionary lookup, auto-complete',
    analogyText: "If L had to interrogate all 1,000,000 citizens in Kanto one by one (Linear Search), Light would win easily ($O(N)$ steps!). Instead, L broadcasts the fake Lind L. Tailor signal to one specific region, slicing the possible suspect territory in half in seconds ($O(\\log N)$!).",
    loreExplanation: "In a sorted array of size $N$, binary search compares the target with the median element. If not equal, half of the remaining elements are discarded immediately. To search 1,000,000 elements, binary search takes at most 20 comparisons ($\log_2 1,000,000 \\approx 20$)!",
    interactiveDemoType: 'binary_search',
    keyTakeaways: [
      'Binary search requires the dataset to be sorted beforehand.',
      'Time complexity is O(log n), making it astronomically faster than linear search O(n).',
      'Doubling the dataset size only adds 1 extra comparison step!'
    ]
  }
];

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    category: 'physics',
    topic: "Newton's 3rd Law",
    question: "When a cannon fires a cannonball, why does the cannon recoil backwards with less acceleration than the speeding ball?",
    animeReference: 'Dragon Ball Z / One Piece',
    options: [
      "The cannon experiences a weaker force than the ball",
      "Both experience the exact same magnitude of force, but the cannon has much greater mass (F = ma)",
      "Newton's 3rd law does not apply to heavy metal objects",
      "Friction cancels the force inside the cannon barrel"
    ],
    correctIndex: 1,
    explanation: "Newton's 3rd Law guarantees the forces on both the ball and cannon are EQUAL in magnitude and OPPOSITE in direction. But because the cannon has much higher mass (m), its resulting acceleration (a = F/m) is proportionally smaller!",
    humorousAnalogy: "Like when All Might punches a boulder: the force on his fist is identical to the force on the boulder, but All Might's arm doesn't shatter because of his durability!",
    difficulty: 'easy',
    correctMeme: {
      id: 'cm-1',
      type: 'correct',
      title: "GIGACHAD INTELLECT!",
      subtitle: "You didn't fall for the mass trap!",
      imageEmoji: '🗿⚡',
      memeTemplate: 'GigaChad Approved',
      reactionPhrase: "Newton just gave you a thumbs up from the heavens!",
      educationalTakeaway: "Equal forces + different masses = different accelerations. F = ma masterclass!"
    },
    incorrectMeme: {
      id: 'im-1',
      type: 'incorrect',
      title: "EMOTIONAL DAMAGE!",
      subtitle: "The cannon felt that one...",
      imageEmoji: '🤦‍♂️💥',
      memeTemplate: 'Emotional Damage / Confused Cat',
      reactionPhrase: "Wait, that's illegal! Newton's 3rd Law NEVER plays favorites with force magnitude!",
      educationalTakeaway: "Remember: The forces are ALWAYS exactly equal! Only the masses differ!"
    }
  },
  {
    id: 'q-2',
    category: 'cs',
    topic: 'Recursion & Call Stack',
    question: "What happens if a recursive function in Python or JavaScript is missing a Base Case?",
    animeReference: 'Doctor Strange / Inception',
    options: [
      "The program runs at 2x speed using GPU acceleration",
      "The function automatically converts into an efficient while-loop",
      "The call stack grows infinitely until memory runs out, causing a Stack Overflow error",
      "The computer deletes the code file to save disk space"
    ],
    correctIndex: 2,
    explanation: "Without a base case, the function keeps pushing new stack frames onto the call stack forever until the runtime limit is hit, crashing with 'Maximum call stack size exceeded'!",
    humorousAnalogy: "Doctor Strange getting trapped in Dormammu's loop without any exit condition—eternal bargain loop of doom!",
    difficulty: 'medium',
    correctMeme: {
      id: 'cm-2',
      type: 'correct',
      title: "BIG BRAIN TIME!",
      subtitle: "Stack preserved. Dormammu defeated.",
      imageEmoji: '🧠✨',
      memeTemplate: 'Galaxy Brain',
      reactionPhrase: "You navigated the Inception dream levels without dropping into Limbo!",
      educationalTakeaway: "Every recursion requires an exit base case to pop the stack frames back down."
    },
    incorrectMeme: {
      id: 'im-2',
      type: 'incorrect',
      title: "TASK FAILED SUCCESSFULLY!",
      subtitle: "Stack Overflow: Memory go bye-bye",
      imageEmoji: '🥞🔥',
      memeTemplate: 'This Is Fine Dog',
      reactionPhrase: "Your CPU is screaming in infinite mirror dimensions right now!",
      educationalTakeaway: "A recursive function without a base case is a one-way ticket to crash city."
    }
  },
  {
    id: 'q-3',
    category: 'chemistry',
    topic: 'Chemical Bonds',
    question: "In a water molecule (H₂O), what type of bond holds the hydrogen and oxygen atoms together?",
    animeReference: 'Naruto Shippuden',
    options: [
      "Ionic bond (Oxygen stole both hydrogen electrons like a rogue ninja)",
      "Covalent bond (Oxygen and Hydrogen share valence electron pairs)",
      "Nuclear fission bond (they smash atomic nuclei together)",
      "Van der Waals gravitational magnetic bond"
    ],
    correctIndex: 1,
    explanation: "Hydrogen and Oxygen are non-metals. Oxygen needs 2 electrons to complete its valence octet, and each Hydrogen needs 1 electron for a stable duet. They share electron pairs, forming polar covalent bonds!",
    humorousAnalogy: "Naruto and Sasuke sharing their chakra in the final battle—true teamwork, no electrons stolen!",
    difficulty: 'easy',
    correctMeme: {
      id: 'cm-3',
      type: 'correct',
      title: "ULTRA INSTINCT UNLOCKED!",
      subtitle: "Sharing is caring in chemistry!",
      imageEmoji: '💧⚡',
      memeTemplate: 'Anime Eyes Glow',
      reactionPhrase: "The power of friendship and covalent valence sharing wins again!",
      educationalTakeaway: "Non-metal + Non-metal = Covalent bond (electron sharing)."
    },
    incorrectMeme: {
      id: 'im-3',
      type: 'incorrect',
      title: "NOT STONKS!",
      subtitle: "Oxygen is not a pirate atom!",
      imageEmoji: '📉🧪',
      memeTemplate: 'Confused Travolta',
      reactionPhrase: "Did you just accuse humble water of committing armed ionic robbery?",
      educationalTakeaway: "Water is COVALENT. Electron sharing happens between non-metals!"
    }
  },
  {
    id: 'q-4',
    category: 'math',
    topic: 'Binary Search',
    question: "If you have a sorted phonebook of 1,024 names, what is the maximum number of comparisons binary search needs to find any name?",
    animeReference: 'Death Note',
    options: [
      "1,024 comparisons",
      "512 comparisons",
      "10 comparisons (log₂(1024) = 10)",
      "1 comparison every single time"
    ],
    correctIndex: 2,
    explanation: "Because 2¹⁰ = 1,024, each binary comparison cuts the remaining candidates in half. Even in the worst-case scenario, binary search will find the name in at most 10 steps!",
    humorousAnalogy: "L solving the Kira case in 10 questions while Light expected a million days of searching!",
    difficulty: 'medium',
    correctMeme: {
      id: 'cm-4',
      type: 'correct',
      title: "IT'S OVER 9000... WAIT NO, IT'S ONLY 10!",
      subtitle: "Logarithmic efficiency at its finest!",
      imageEmoji: '📈⚡',
      memeTemplate: 'Chad Mathematician',
      reactionPhrase: "L would be proud of your logarithmic deductive reasoning!",
      educationalTakeaway: "Binary search runs in O(log n) time. 1024 items -> 10 comparisons!"
    },
    incorrectMeme: {
      id: 'im-4',
      type: 'incorrect',
      title: "HE A LITTLE CONFUSED BUT HE GOT THE SPIRIT!",
      subtitle: "Why check everyone one-by-one?",
      imageEmoji: '🤔📖',
      memeTemplate: 'Math Lady Meme',
      reactionPhrase: "Are you really going to read 1,000 names while Kira escapes?",
      educationalTakeaway: "Remember log₂(1024) = 10. Cut the search range in half each step!"
    }
  }
];

export const INITIAL_BOSS: BossState = {
  name: 'NullPointer & Lord Procrastination',
  title: 'The Bug Overlord & Distraction Phantom',
  avatarEmoji: '👾👿',
  maxHp: 1000,
  currentHp: 1000,
  phases: 3,
  currentPhase: 1,
  specialMove: 'Doom Scrolling Flashbang',
  dialogue: {
    start: "Bwahaha! You think anime memes can stop my reign of eternal cramming and 404 errors?! Prove it, student!",
    attack: "Take this: 'Just watch one more 10-second TikTok before studying' strike!",
    hurt: "Argh! That conceptual clarity is burning away my confusion shields!",
    defeat: "NOOO! Defeated by wholesome memes and deep understanding?! My bugs... are patched..."
  }
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-1',
    name: 'Meme Connoisseur',
    description: 'Received your first hilarious fail-forward feedback without crying.',
    icon: '🎭',
    unlockedAt: 'Day 1',
    rarity: 'common'
  },
  {
    id: 'badge-2',
    name: 'Newton’s Disciple',
    description: 'Mastered the Kamehameha recoil action-reaction pair.',
    icon: '⚡',
    unlockedAt: 'Day 1',
    rarity: 'rare'
  },
  {
    id: 'badge-3',
    name: 'Glitch Slayer',
    description: 'Dealt over 500 damage to Lord Procrastination in a Boss Battle.',
    icon: '⚔️',
    rarity: 'epic'
  },
  {
    id: 'badge-4',
    name: 'IS 17802 Accessibility Hero',
    description: 'Explored multi-modal high contrast and dyslexia-friendly features.',
    icon: '🛡️',
    unlockedAt: 'Day 1',
    rarity: 'rare'
  },
  {
    id: 'badge-5',
    name: 'Comeback King',
    description: 'Turned a failed concept into a 2x XP Mastered achievement.',
    icon: '👑',
    rarity: 'legendary'
  }
];

export const LEADERBOARD_STUDENTS = [
  { rank: 1, name: 'Saitama_Codes', title: 'One-Punch Scholar', level: 42, xp: 14200, streak: 38, badge: '👑' },
  { rank: 2, name: 'Goku_Learner', title: 'Ultra Instinct Student', level: 39, xp: 12950, streak: 25, badge: '⚡' },
  { rank: 3, name: 'Mikasa_Newton', title: 'Physics Surveyor', level: 36, xp: 11400, streak: 19, badge: '⚔️' },
  { rank: 4, name: 'You (Adaptix Cadet)', title: 'Meme Scholar', level: 5, xp: 1250, streak: 4, badge: '🌟', isCurrentUser: true },
  { rank: 5, name: 'Kakashi_Log', title: 'Copy Ninja Engineer', level: 31, xp: 9800, streak: 14, badge: '🔥' }
];
