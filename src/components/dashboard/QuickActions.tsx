import { CalendarPlus, Receipt, UserPlus, Sparkles } from 'lucide-react';
import { useState } from 'react';

const actions = [
  {
    id: 'leave',
    label: 'Request Leave',
    desc: 'Submit a time-off request',
    icon: CalendarPlus,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    hover: 'hover:border-blue-300 hover:bg-blue-50/60',
  },
  {
    id: 'expense',
    label: 'Submit Expense',
    desc: 'File a reimbursement claim',
    icon: Receipt,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    hover: 'hover:border-emerald-300 hover:bg-emerald-50/60',
  },
  {
    id: 'onboard',
    label: 'Onboard New Hire',
    desc: 'Start the onboarding flow',
    icon: UserPlus,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    hover: 'hover:border-indigo-300 hover:bg-indigo-50/60',
  },
];

export function QuickActions() {
  const [triggered, setTriggered] = useState<string | null>(null);

  const handleClick = (id: string) => {
    setTriggered(id);
    setTimeout(() => setTriggered(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 animate-slide-up" style={{ animationDelay: '480ms', opacity: 0 }}>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <h3 className="font-bold text-slate-900">Quick Actions</h3>
      </div>
      <div className="space-y-2.5">
        {actions.map((action) => {
          const Icon = action.icon;
          const isTriggered = triggered === action.id;
          return (
            <button
              key={action.id}
              onClick={() => handleClick(action.id)}
              className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-200 transition-all duration-200 ${action.hover} group ${
                isTriggered ? 'ring-2 ring-blue-400 ring-offset-1' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-lg ${action.bg} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110`}>
                <Icon className={`w-5 h-5 ${action.color}`} strokeWidth={2} />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-slate-900">{action.label}</p>
                <p className="text-xs text-slate-500">{action.desc}</p>
              </div>
              {isTriggered && (
                <span className="text-xs font-semibold text-blue-600 animate-fade-in">Opening…</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
