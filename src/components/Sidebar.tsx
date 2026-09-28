import { useApp } from '@/context/AppContext';
import { sidebarNav } from '@/data/mockData';
import {
  LayoutDashboard,
  Contact,
  CalendarDays,
  UserPlus,
  Rocket,
  Wallet,
  TrendingUp,
  BookOpen,
  BarChart3,
  ChevronLeft,
  Zap,
} from 'lucide-react';
import type { ViewKey } from '@/types';

const iconMap: Record<string, typeof LayoutDashboard> = {
  LayoutDashboard,
  Contact,
  CalendarDays,
  UserPlus,
  Rocket,
  Wallet,
  TrendingUp,
  BookOpen,
  BarChart3,
};

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, currentView, setCurrentView } = useApp();

  const handleNav = (key: ViewKey) => {
    setCurrentView(key);
  };

  return (
    <aside
      className={`${
        sidebarCollapsed ? 'w-20' : 'w-64'
      } flex flex-col bg-slate-900 text-slate-100 transition-all duration-300 ease-in-out flex-shrink-0 relative`}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-5 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
            <Zap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          {!sidebarCollapsed && (
            <span className="font-bold text-lg tracking-tight whitespace-nowrap animate-fade-in">
              Nexus<span className="text-blue-400">HR</span>
            </span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3">
        <div className={`${sidebarCollapsed ? 'hidden' : 'block'} px-3 mb-2`}>
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Menu</p>
        </div>
        <ul className="space-y-1">
          {sidebarNav.map((item) => {
            const Icon = iconMap[item.icon] ?? LayoutDashboard;
            const active = currentView === item.key;
            return (
              <li key={item.key}>
                <button
                  onClick={() => handleNav(item.key as ViewKey)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                    active
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={active ? 2.4 : 2} />
                  {!sidebarCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                  {sidebarCollapsed && active && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-l-full bg-blue-400" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-slate-800 p-3 flex-shrink-0">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
        >
          <ChevronLeft
            className={`w-5 h-5 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`}
          />
          {!sidebarCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
