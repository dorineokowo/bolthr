import type { LeaveBalance } from '@/types';
import { CalendarDays, Heart, Laptop } from 'lucide-react';

const iconMap: Record<string, typeof CalendarDays> = {
  'Annual Leave': CalendarDays,
  'Sick Leave': Heart,
  'Remote Work': Laptop,
};

function CircularProgress({
  used,
  total,
  color,
  size = 88,
}: {
  used: number;
  total: number;
  color: string;
  size?: number;
}) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const remaining = Math.max(0, total - used);
  const percentage = total > 0 ? (remaining / total) * 100 : 0;
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={8}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-slate-900 tabular-nums">{remaining}</span>
        <span className="text-[10px] text-slate-400 font-medium">left</span>
      </div>
    </div>
  );
}

export function LeaveBalanceCards({ balances }: { balances: LeaveBalance[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
      {balances.map((balance, i) => {
        const Icon = iconMap[balance.type] ?? CalendarDays;
        const remaining = balance.total - balance.used;
        return (
          <div
            key={balance.type}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md transition-shadow animate-slide-up flex items-center gap-5"
            style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
          >
            <CircularProgress used={balance.used} total={balance.total} color={balance.color} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${balance.color}15` }}
                >
                  <Icon className="w-4 h-4" style={{ color: balance.color }} />
                </div>
                <h3 className="text-sm font-bold text-slate-900 truncate">{balance.type}</h3>
              </div>
              <div className="flex items-baseline gap-1.5 mt-2">
                <span className="text-2xl font-bold text-slate-900 tabular-nums">{remaining}</span>
                <span className="text-xs text-slate-400">/ {balance.total} {balance.unit}</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${(balance.used / balance.total) * 100}%`, backgroundColor: balance.color }}
                  />
                </div>
                <span className="text-xs text-slate-400 font-medium tabular-nums">{balance.used} used</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
