import React, { useState } from 'react';
import { EduProvider, useEdu } from './context/EduContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { LevelUpModal } from './components/layout/LevelUpModal';

// Pages
import { DashboardHero } from './components/dashboard/DashboardHero';
import { AnimeExplainerPage } from './components/animeExplainer/AnimeExplainerPage';
import { MemeQuizArena } from './components/memeQuiz/MemeQuizArena';
import { BossBattleArena } from './components/bossBattle/BossBattleArena';
import { ComebackQuestsPage } from './components/comebackQuests/ComebackQuestsPage';
import { BISCompliancePage } from './components/bisStandards/BISCompliancePage';
import { LeaderboardPage } from './components/leaderboard/LeaderboardPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignOutPage } from './components/auth/SignOutPage';

function AppContent() {
  const { activePage, isAuthenticated } = useEdu();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // If user is not logged in, render the Login Page
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardHero />;
      case 'anime-explainers':
        return <AnimeExplainerPage />;
      case 'meme-quiz':
        return <MemeQuizArena />;
      case 'boss-battle':
        return <BossBattleArena />;
      case 'comeback-quests':
        return <ComebackQuestsPage />;
      case 'bis-standards':
        return <BISCompliancePage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'signout':
        return <SignOutPage />;
      default:
        return <DashboardHero />;
    }
  };


  return (
    <div className="min-h-screen bg-[#070914] text-slate-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Global Level Up Modal */}
      <LevelUpModal />

      {/* Top Navigation */}
      <Navbar onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)} />

      {/* Main Content Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
        />

        {/* Dynamic Page Stage */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto focus:outline-none"
        >
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}

export function App() {
  return (
    <EduProvider>
      <AppContent />
    </EduProvider>
  );
}

export default App;
