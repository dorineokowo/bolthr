import type { JobRequisition, RequisitionStatus } from '@/types';
import { Briefcase, Users, MapPin, Calendar, TrendingUp, FileText } from 'lucide-react';

const statusStyles: Record<RequisitionStatus, string> = {
  Published: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  Draft: 'bg-slate-100 text-slate-500 border-slate-200',
  Closed: 'bg-rose-50 text-rose-600 border-rose-200',
};

const priorityStyles: Record<string, string> = {
  High: 'bg-rose-50 text-rose-600',
  Medium: 'bg-amber-50 text-amber-600',
  Low: 'bg-slate-100 text-slate-500',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function RequisitionsOverview({ requisitions }: { requisitions: JobRequisition[] }) {
  const published = requisitions.filter((r) => r.status === 'Published');
  const draft = requisitions.filter((r) => r.status === 'Draft');
  const closed = requisitions.filter((r) => r.status === 'Closed');
  const totalApplicants = requisitions.reduce((sum, r) => sum + r.applicants, 0);
  const totalOpenings = published.reduce((sum, r) => sum + r.openings, 0);

  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Active Requisitions', value: published.length, icon: Briefcase, color: 'text-blue-600 bg-blue-50' },
          { label: 'Open Positions', value: totalOpenings, icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Total Applicants', value: totalApplicants, icon: Users, color: 'text-amber-600 bg-amber-50' },
          { label: 'Draft Requisitions', value: draft.length, icon: FileText, color: 'text-slate-600 bg-slate-100' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 tabular-nums">{stat.value}</p>
                <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Requisition cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 animate-slide-up">
        <h3 className="font-bold text-slate-900 mb-4">Job Requisitions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {requisitions.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                    {req.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{req.department}</p>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${statusStyles[req.status]}`}>
                  {req.status}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-500 mt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {req.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {formatDate(req.postedDate)}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50">
                <span className="text-xs font-semibold text-slate-700">{req.salaryRange}</span>
                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${priorityStyles[req.priority]}`}>
                  {req.priority}
                </span>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 tabular-nums">{req.openings}</span> opening{req.openings !== 1 ? 's' : ''}
                  {' · '}
                  <span className="font-semibold text-slate-700 tabular-nums">{req.applicants}</span> applicant{req.applicants !== 1 ? 's' : ''}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Hiring Manager: {req.hiringManager}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
