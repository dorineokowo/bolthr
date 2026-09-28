import { KpiCards } from '@/components/dashboard/KpiCards';
import { HeadcountChart } from '@/components/dashboard/HeadcountChart';
import { DepartmentChart } from '@/components/dashboard/DepartmentChart';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { AnnouncementFeed } from '@/components/dashboard/AnnouncementFeed';
import { KudosFeed } from '@/components/dashboard/KudosFeed';
import { kpiCards } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export function Dashboard() {
  const { role } = useApp();

  return (
    <div className="p-4 lg:p-6 space-y-5 lg:space-y-6">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fade-in">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Good afternoon, Sarah
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Here's what's happening across your organization today.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-600">
            Viewing as <span className="text-slate-900">{role}</span>
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <KpiCards cards={kpiCards} />

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
        <div className="lg:col-span-2">
          <HeadcountChart />
        </div>
        <div>
          <DepartmentChart />
        </div>
      </div>

      {/* Bottom row: Quick Actions + Announcements + Kudos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
        <QuickActions />
        <AnnouncementFeed />
        <KudosFeed />
      </div>
    </div>
  );
}
