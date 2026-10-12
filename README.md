# ⚡ Adaptix – Gamified, Meme-Powered Smart Learning Ecosystem

**Theme:** Smart Education  
**Standards Alignment:** Bureau of Indian Standards (BIS) **IS 17802 (Part 1):2021** & **IS/ISO/IEC 27001:2022**

---

## 📖 1. Problem Statement

Traditional education often struggles to maintain student engagement, accommodate different learning needs, and make complex concepts enjoyable and relatable. Students frequently lose motivation, suffer from anxiety over failure, and struggle to identify their learning gaps due to conventional, punitive assessment methods.

**Adaptix** transforms education into an interactive learning adventure by combining:
1. **Meme-Powered Fail-Forward Feedback:** Replaces discouraging red marks with humorous, relatable pop-culture & anime memes paired with clear conceptual breakdowns.
2. **Anime & Movie-Inspired Explanations:** Real-world physical, chemical, and computational principles grounded in relatable pop culture (e.g., Newton's 3rd Law via Dragon Ball Kamehamehas, Recursion via Doctor Strange, Chemical bonding via Naruto).
3. **Epic Boss Battles:** Milestone examinations transformed into RPG raid encounters where correct answers deal damage and critical strikes to "Lord Procrastination & The Bug Overlord".
4. **Adaptive Comeback Quests (2x XP):** Pinpoints individual learning gaps and offers double XP redemption challenges to build confidence and resilience.
5. **BIS Standards Architecture:**
   - **IS 17802 (Part 1):2021:** High contrast toggles (WCAG AAA 21:1), Dyslexia-friendly typography (Lexend/OpenDyslexic), text-to-speech audio narration, and full keyboard navigation.
   - **IS/ISO/IEC 27001:2022:** Local-first encrypted learning records, zero third-party advertising telemetry, student incognito mode, and verifiable audit logging.

---

## 🚀 2. Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Quick Start
```bash
# Navigate to project directory
cd /Users/sudesh/Desktop/Adaptix
# or cd /Users/sudesh/Desktop/byteforce/adaptix

# Install dependencies (already installed)
npm install

# Start development server
npm run dev
```

Visit the application at **`http://localhost:5174/`**.

### 🔐 Student Authentication Credentials
- **Username:** `udhay`
- **Password:** `udh`
- Includes one-click auto-fill, password visibility toggle, and secure sign-out flows.


---

## 🛠️ 3. Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 + Custom Cyberpunk / Dark RPG Theme Tokens
- **Audio Engine:** Zero-dependency Web Audio API 8-Bit Synthesizer + Web Speech API (IS 17802 TTS)
- **Visuals & Animations:** Canvas Confetti, Lucide Icons, Glassmorphic UI
- **Storage & Security:** Local Encrypted State Persistence (IS 27001)

---

## 🏛️ 4. Bureau of Indian Standards (BIS) Compliance Matrix

| Standard | Focus Area | Implementation in Adaptix |
| :--- | :--- | :--- |
| **IS 17802 (Part 1):2021** | Accessible Interface Design | • High contrast mode with 21:1 ratio<br>• Lexend/OpenDyslexic typography toggle<br>• Scalable font hierarchies (`normal`, `large`, `xl`)<br>• Web Speech API narration<br>• Keyboard shortcuts (1-4, Enter, Esc, Tab) |
| **IS/ISO/IEC 27001:2022** | Student Data Protection | • Local-first encrypted learning record storage<br>• Zero external ad telemetry or tracking<br>• Pseudonymous incognito leaderboard mode<br>• Right to Data Portability (JSON export)<br>• Right to Erasure (instant data wipe) |

---

## 🎮 5. Modules & Pathways

- **Mission Control (`Dashboard`):** Player level, health, mana, streak flames, and active comeback alert banner.
- **Anime Explainer Studio (`Anime & Pop Explainers`):** 4 interactive concept chapters with live sandbox simulators (Newton Force Slider, Doctor Strange Call Stack, Covalent Electron Sharing, Binary Search).
- **Meme Quiz Arena (`Fail-Forward`):** Interactive quizzes with instant, hilarious meme reactions for incorrect and correct choices.
- **Boss Battle Arena (`Lord Procrastination`):** Multi-phase boss fight with health bars, shields, anime heals, and loot drops.
- **Comeback Quests (`2x XP Redemption`):** Diagnostic gap detector turning mistakes into double-XP triumphs.
- **BIS Compliance Lab:** Interactive toggles and live audit trail.
- **Hall of Fame (`Leaderboard`):** Ranks, clans, and unlockable badges.
