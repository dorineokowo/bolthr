import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  Shield,
  UserCog,
  User,
  Check,
  CalendarOff,
  Receipt,
  Rocket,
  TrendingUp,
  Megaphone,
  X,
} from 'lucide-react';
import type { Role } from '@/types';

const roles: Role[] = ['Admin', 'Line Manager', 'Employee'];

const roleStyles: Record<Role, { icon: typeof Shield; color: string; bg: string }> = {
  Admin: { icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
  'Line Manager': { icon: UserCog, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  Employee: { icon: User, color: 'text-amber-600', bg: 'bg-amber-50' },
};

const notifIcons: Record<string, typeof CalendarOff> = {
  leave: CalendarOff,
  expense: Receipt,
  onboarding: Rocket,
  review: TrendingUp,
  announcement: Megaphone,
};

const searchItems = [
  { label: 'Dashboard', category: 'Navigation' },
  { label: 'Employee Directory', category: 'Navigation' },
  { label: 'Time & Leave', category: 'Navigation' },
  { label: 'Recruitment Pipeline', category: 'Navigation' },
  { label: 'Onboarding Tasks', category: 'Navigation' },
  { label: 'Payroll Reports', category: 'Navigation' },
  { label: 'Performance Reviews', category: 'Navigation' },
  { label: 'Request Leave', category: 'Quick Action' },
  { label: 'Submit Expense', category: 'Quick Action' },
  { label: 'Onboard New Hire', category: 'Quick Action' },
  { label: 'Give Kudos', category: 'Quick Action' },
  { label: 'Jordan Lee — Senior Engineer', category: 'People' },
  { label: 'Dana Patel — Product Manager', category: 'People' },
  { label: 'Marcus Rivera — Benefits Manager', category: 'People' },
];

export function Header() {
  const { role, setRole, notifications, markAllNotificationsRead, unreadCount, setSearchOpen, currentView } = useApp();
  const [roleOpen, setRoleOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [localSearchOpen, setLocalSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const roleRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const viewTitles: Record<string, string> = {
    dashboard: 'Dashboard',
    directory: 'Employee Directory',
    'time-leave': 'Time & Leave',
    recruitment: 'Recruitment',
    onboarding: 'Onboarding',
    payroll: 'Payroll',
    performance: 'Performance',
    'resource-hub': 'Resource Hub',
    analytics: 'Analytics',
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) setRoleOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setLocalSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setLocalSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setLocalSearchOpen(false);
        setRoleOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const currentRole = roleStyles[role];
  const filteredItems = searchQuery
    ? searchItems.filter((i) => i.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : searchItems;

  const openGlobalSearch = () => {
    setSearchOpen(true);
    setLocalSearchOpen(true);
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 flex-shrink-0 z-30">
      {/* Left: Page title */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-slate-900 hidden sm:block">
          {viewTitles[currentView] ?? 'Dashboard'}
        </h1>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-4 hidden md:block" ref={searchRef}>
        <div className="relative">
          <button
            onClick={openGlobalSearch}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/70 transition-colors text-left group"
          >
            <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-500" />
            <span className="text-sm text-slate-400 flex-1">Search anything…</span>
            <kbd className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-semibold text-slate-400 shadow-sm">
              ⌘K
            </kbd>
          </button>

          {localSearchOpen && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scale-in z-50">
              <div className="p-3 border-b border-slate-100">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search pages, people, actions…"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>
              </div>
              <div className="max-h-72 overflow-y-auto scrollbar-thin p-2">
                {filteredItems.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-6">No results found</p>
                ) : (
                  filteredItems.map((item, i) => (
                    <button
                      key={i}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors group"
                    >
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                        {item.label}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        {item.category}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile search trigger */}
        <button
          onClick={openGlobalSearch}
          className="md:hidden p-2.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <Search className="w-5 h-5 text-slate-600" />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((p) => !p)}
            className="relative p-2.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute top-full mt-2 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scale-in z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <h3 className="font-semibold text-slate-900">Notifications</h3>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto scrollbar-thin">
                {notifications.map((n) => {
                  const NotifIcon = notifIcons[n.type] ?? Bell;
                  return (
                    <div
                      key={n.id}
                      className={`flex gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                        !n.read ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <NotifIcon className="w-4 h-4 text-slate-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.detail}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{n.time}</p>
                      </div>
                      {!n.read && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />}
                    </div>
                  );
                })}
              </div>
              <button className="w-full py-3 text-center text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                View all notifications
              </button>
            </div>
          )}
        </div>

        {/* Role Switcher */}
        <div className="relative" ref={roleRef}>
          <button
            onClick={() => setRoleOpen((p) => !p)}
            className="flex items-center gap-2 pl-2.5 pr-2 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <div className={`w-7 h-7 rounded-lg ${currentRole.bg} flex items-center justify-center`}>
              <currentRole.icon className={`w-4 h-4 ${currentRole.color}`} />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-900 leading-tight">{role}</p>
              <p className="text-[10px] text-slate-400 leading-tight">Role</p>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
          </button>

          {roleOpen && (
            <div className="absolute top-full mt-2 right-0 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-scale-in z-50">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Switch Role</p>
              </div>
              {roles.map((r) => {
                const style = roleStyles[r];
                const active = role === r;
                return (
                  <button
                    key={r}
                    onClick={() => {
                      setRole(r);
                      setRoleOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 transition-colors ${
                      active ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${style.bg} flex items-center justify-center`}>
                      <style.icon className={`w-4 h-4 ${style.color}`} />
                    </div>
                    <span className={`text-sm font-medium flex-1 text-left ${active ? 'text-blue-600' : 'text-slate-700'}`}>
                      {r}
                    </span>
                    {active && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="hidden sm:flex items-center gap-2.5 pl-2 ml-1 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
            SC
          </div>
        </div>
      </div>
    </header>
  );
}
