import type { ViewKey } from '@/types';

const viewInfo: Record<string, { title: string; desc: string }> = {
  directory: { title: 'Employee Directory', desc: 'Browse and manage all 482 team members across departments.' },
  'time-leave': { title: 'Time & Leave', desc: 'Review leave balances, approve requests, and track time off.' },
  recruitment: { title: 'Recruitment Pipeline', desc: 'Track open positions and candidates through your hiring funnel.' },
  onboarding: { title: 'Onboarding Hub', desc: 'Guide new hires through their first 90 days with task checklists.' },
  payroll: { title: 'Payroll Center', desc: 'Manage compensation, run payroll cycles, and review reports.' },
  performance: { title: 'Performance Reviews', desc: 'Conduct reviews, set goals, and track employee development.' },
  'resource-hub': { title: 'Resource Hub', desc: 'Access company policies, templates, and learning materials.' },
  analytics: { title: 'People Analytics', desc: 'Deep dive into workforce metrics, trends, and forecasts.' },
};

export function PlaceholderPage({ view }: { view: ViewKey }) {
  const info = viewInfo[view] ?? { title: 'Coming Soon', desc: 'This module is under development.' };

  return (
    <div className="p-4 lg:p-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-300 to-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">{info.title}</h2>
        <p className="text-sm text-slate-500 max-w-md mb-6">{info.desc}</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-100">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-sm font-semibold text-blue-600">Module ready for implementation</span>
        </div>
      </div>
    </div>
  );
}
