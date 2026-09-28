import { useApp } from '@/context/AppContext';
import { OnboardingList } from '@/components/onboarding/OnboardingList';
import { Rocket, Users, CheckCircle2, Clock } from 'lucide-react';

export function Onboarding() {
  const { onboardingJourneys } = useApp();

  const activeCount = onboardingJourneys.filter((j) => j.progress < 100).length;
  const completedCount = onboardingJourneys.filter((j) => j.progress === 100).length;
  const totalTasks = onboardingJourneys.reduce((sum, j) => sum + j.tasks.length, 0);
  const completedTasks = onboardingJourneys.reduce(
    (sum, j) => sum + j.tasks.filter((t) => t.status === 'Complete').length,
    0
  );
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    { label: 'Active Journeys', value: activeCount, icon: Rocket, color: 'text-blue-600 bg-blue-50' },
    { label: 'New Hires', value: onboardingJourneys.length, icon: Users, color: 'text-violet-600 bg-violet-50' },
    { label: 'Tasks Completed', value: `${completedTasks}/${totalTasks}`, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
    { label: 'Overall Progress', value: `${overallProgress}%`, icon: Clock, color: 'text-amber-600 bg-amber-50' },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fade-in">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Onboarding</h2>
          <p className="text-sm text-slate-500 mt-1">
            Track new hire journeys through IT setup, HR documentation, and manager introductions.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms`, opacity: 0 }}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color} flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-slate-900 tabular-nums truncate">{stat.value}</p>
                <p className="text-xs text-slate-400 font-medium truncate">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Onboarding journeys */}
      <OnboardingList journeys={onboardingJourneys} />
    </div>
  );
}
