import { Users, CalendarOff, Briefcase, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { KPICard } from '@/types';

const iconMap: Record<string, typeof Users> = {
  Users,
  CalendarOff,
  Briefcase,
  DollarSign,
};

const accentMap: Record<string, { bg: string; text: string; ring: string; glow: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-100', glow: 'shadow-blue-500/10' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-600', ring: 'ring-amber-100', glow: 'shadow-amber-500/10' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', ring: 'ring-emerald-100', glow: 'shadow-emerald-500/10' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'ring-indigo-100', glow: 'shadow-indigo-500/10' },
};

export function KpiCards({ cards }: { cards: KPICard[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5">
      {cards.map((card, i) => {
        const Icon = iconMap[card.icon] ?? Users;
        const accent = accentMap[card.accent] ?? accentMap.blue;
        return (
          <div
            key={card.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-300 animate-slide-up group"
            style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${accent.bg} flex items-center justify-center ring-1 ${accent.ring}`}>
                <Icon className={`w-6 h-6 ${accent.text}`} strokeWidth={2} />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
                  card.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-500 bg-slate-50'
                }`}
              >
                {card.trend === 'up' ? (
                  <ArrowUpRight className="w-3.5 h-3.5" />
                ) : (
                  <ArrowDownRight className="w-3.5 h-3.5" />
                )}
                <span className="hidden sm:inline">{card.change}</span>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">{card.value}</p>
              <p className="text-sm text-slate-500 mt-1 font-medium">{card.label}</p>
              <p className="text-xs text-slate-400 mt-2 sm:hidden">{card.change}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
