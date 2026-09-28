import type { OnboardingJourney, TaskCategory, TaskStatus } from '@/types';
import { useApp } from '@/context/AppContext';
import { Check, Clock, Circle, Laptop, FileText, Users, ChevronRight } from 'lucide-react';

const categoryIcons: Record<TaskCategory, typeof Laptop> = {
  'IT Setup': Laptop,
  'HR Documentation': FileText,
  'Manager Intro': Users,
};

const categoryStyles: Record<TaskCategory, { bg: string; text: string; border: string }> = {
  'IT Setup': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
  'HR Documentation': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
  'Manager Intro': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
};

const statusConfig: Record<TaskStatus, { icon: typeof Check; label: string; color: string; bg: string }> = {
  'Complete': { icon: Check, label: 'Complete', color: 'text-emerald-600', bg: 'bg-emerald-500' },
  'In Progress': { icon: Clock, label: 'In Progress', color: 'text-amber-600', bg: 'bg-amber-500' },
  'Pending': { icon: Circle, label: 'Pending', color: 'text-slate-400', bg: 'bg-slate-300' },
};

const nextStatus: Record<TaskStatus, TaskStatus> = {
  'Pending': 'In Progress',
  'In Progress': 'Complete',
  'Complete': 'Pending',
};

const deptGradients: Record<string, string> = {
  Engineering: 'from-blue-500 to-blue-600',
  Sales: 'from-emerald-500 to-emerald-600',
  Marketing: 'from-amber-500 to-amber-600',
  Design: 'from-violet-500 to-violet-600',
  Finance: 'from-rose-500 to-rose-600',
  HR: 'from-teal-500 to-teal-600',
};

function getGradient(dept: string): string {
  return deptGradients[dept] ?? 'from-slate-500 to-slate-600';
}

export function OnboardingList({ journeys }: { journeys: OnboardingJourney[] }) {
  const { updateTaskStatus } = useApp();

  return (
    <div className="space-y-5">
      {journeys.map((journey, journeyIdx) => {
        const gradient = getGradient(journey.department);
        const completedTasks = journey.tasks.filter((t) => t.status === 'Complete').length;
        const totalTasks = journey.tasks.length;

        // Group by category
        const categories: TaskCategory[] = ['IT Setup', 'HR Documentation', 'Manager Intro'];

        return (
          <div
            key={journey.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-slide-up"
            style={{ animationDelay: `${journeyIdx * 100}ms`, opacity: 0 }}
          >
            {/* Journey header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 border-b border-slate-100">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-lg font-bold flex-shrink-0`}>
                {journey.employeeInitials}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-slate-900">{journey.employeeName}</h3>
                <p className="text-sm text-slate-500">{journey.role} · {journey.department}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Started {new Date(journey.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · Manager: {journey.manager}
                </p>
              </div>

              {/* Progress circle */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900 tabular-nums">{journey.progress}%</p>
                  <p className="text-xs text-slate-400">{completedTasks}/{totalTasks} tasks</p>
                </div>
                <div className="relative w-14 h-14">
                  <svg width={56} height={56} className="-rotate-90">
                    <circle cx={28} cy={28} r={24} fill="none" stroke="#f1f5f9" strokeWidth={5} />
                    <circle
                      cx={28}
                      cy={28}
                      r={24}
                      fill="none"
                      stroke={journey.progress === 100 ? '#10b981' : '#3b82f6'}
                      strokeWidth={5}
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 24}
                      strokeDashoffset={2 * Math.PI * 24 - (journey.progress / 100) * 2 * Math.PI * 24}
                      className="transition-all duration-700"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {journey.progress === 100 ? (
                      <Check className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <span className="text-xs font-bold text-slate-700 tabular-nums">{journey.progress}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks grouped by category */}
            <div className="p-5 space-y-5">
              {categories.map((category) => {
                const catStyle = categoryStyles[category];
                const CatIcon = categoryIcons[category];
                const catTasks = journey.tasks.filter((t) => t.category === category);
                const catCompleted = catTasks.filter((t) => t.status === 'Complete').length;
                const catProgress = catTasks.length > 0 ? Math.round((catCompleted / catTasks.length) * 100) : 0;

                return (
                  <div key={category}>
                    {/* Category header */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className={`w-8 h-8 rounded-lg ${catStyle.bg} flex items-center justify-center`}>
                        <CatIcon className={`w-4 h-4 ${catStyle.text}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-900">{category}</p>
                        <p className="text-xs text-slate-400">{catCompleted}/{catTasks.length} complete</p>
                      </div>
                      {/* Mini progress bar */}
                      <div className="w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            catProgress === 100 ? 'bg-emerald-500' : catStyle.text.replace('text-', 'bg-')
                          }`}
                          style={{ width: `${catProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Task items */}
                    <div className="space-y-2 ml-10">
                      {catTasks.map((task) => {
                        const config = statusConfig[task.status];
                        const StatusIcon = config.icon;
                        return (
                          <div
                            key={task.id}
                            className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors group"
                          >
                            {/* Status toggle button */}
                            <button
                              onClick={() => updateTaskStatus(journey.id, task.id, nextStatus[task.status])}
                              className={`w-7 h-7 rounded-full ${config.bg} flex items-center justify-center text-white flex-shrink-0 transition-transform hover:scale-110`}
                              title={`Click to advance to: ${nextStatus[task.status]}`}
                            >
                              <StatusIcon className="w-3.5 h-3.5" strokeWidth={task.status === 'Pending' ? 1.5 : 2.5} />
                            </button>

                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-medium ${task.status === 'Complete' ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                                {task.title}
                              </p>
                              <p className="text-xs text-slate-400 mt-0.5">
                                {task.assignee} · Due {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </p>
                            </div>

                            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md ${config.color} bg-slate-50 flex-shrink-0`}>
                              {config.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
