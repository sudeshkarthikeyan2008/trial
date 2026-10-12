import React from 'react';
import {
  LayoutDashboard,
  Tv,
  Laugh,
  Swords,
  RotateCcw,
  ShieldCheck,
  Trophy,
  X,
  LogOut
} from 'lucide-react';
import { useEdu, NavPage } from '../../context/EduContext';


interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { activePage, setActivePage, learningGaps, boss } = useEdu();

  const activeGapsCount = learningGaps.filter(g => g.status === 'active').length;

  const navItems: { id: NavPage; label: string; icon: React.ReactNode; badge?: string; badgeColor?: string }[] = [
    {
      id: 'dashboard',
      label: 'Mission Control',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      id: 'anime-explainers',
      label: 'Anime & Pop Explainers',
      icon: <Tv className="w-5 h-5" />,
      badge: '4 Lore Quests',
      badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800'
    },
    {
      id: 'meme-quiz',
      label: 'Meme Quiz Arena',
      icon: <Laugh className="w-5 h-5" />,
      badge: 'Fail-Forward',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-800'
    },
    {
      id: 'boss-battle',
      label: 'Boss Battle: NullPointer',
      icon: <Swords className="w-5 h-5 text-red-400" />,
      badge: `${boss.currentHp} HP`,
      badgeColor: 'bg-red-950 text-red-300 border-red-800'
    },
    {
      id: 'comeback-quests',
      label: 'Comeback Quests',
      icon: <RotateCcw className="w-5 h-5 text-amber-400" />,
      badge: activeGapsCount > 0 ? `${activeGapsCount} Active (2x XP)` : 'Ready',
      badgeColor: activeGapsCount > 0 ? 'bg-amber-950 text-amber-300 border-amber-700 animate-pulse' : 'bg-slate-800 text-slate-400'
    },
    {
      id: 'bis-standards',
      label: 'BIS Standards & Security',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      badge: 'IS 17802 / 27001',
      badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800'
    },
    {
      id: 'leaderboard',
      label: 'Global Hall of Fame',
      icon: <Trophy className="w-5 h-5 text-yellow-400" />
    },
    {
      id: 'signout',
      label: 'Sign Out (Udhay)',
      icon: <LogOut className="w-5 h-5 text-red-400" />,
      badge: 'Active',
      badgeColor: 'bg-red-950 text-red-300 border-red-800'
    }
  ];


  const handleSelect = (id: NavPage) => {
    setActivePage(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-18 left-0 z-40 h-[calc(100vh-4.5rem)] w-72 flex-shrink-0 bg-slate-950/90 md:bg-slate-950/40 border-r border-purple-900/20 backdrop-blur-xl transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between p-4 overflow-y-auto`}
      >
        <div>
          {/* Mobile Close Button */}
          <div className="flex md:hidden items-center justify-between pb-4 mb-2 border-b border-slate-800">
            <span className="font-bold text-sm text-slate-300 uppercase tracking-wider">Navigation</span>
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Learning Pathways
          </p>

          <nav className="space-y-1.5" aria-label="Main Navigation">
            {navItems.map(item => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-900/60 to-indigo-900/40 text-white border border-purple-500/40 shadow-lg shadow-purple-950/40 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-purple-400' : 'text-slate-400'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        item.badgeColor || 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info: BIS Standards Certification */}
        <div className="pt-4 mt-6 border-t border-purple-900/20">
          <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-800/30 text-xs">
            <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
              <span>🇮🇳</span>
              <span>BIS Aligned EdTech</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Certified for <strong className="text-slate-300">IS 17802</strong> (Accessible UI) & <strong className="text-slate-300">IS 27001</strong> (Data Security).
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
