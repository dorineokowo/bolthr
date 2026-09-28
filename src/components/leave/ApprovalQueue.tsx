import type { LeaveRequest } from '@/types';
import { useApp } from '@/context/AppContext';
import { Check, X, Clock, CalendarRange, FileText } from 'lucide-react';

const typeColors: Record<string, string> = {
  'Annual Leave': 'bg-blue-50 text-blue-600',
  'Sick Leave': 'bg-amber-50 text-amber-600',
  'Remote Work': 'bg-emerald-50 text-emerald-600',
  'Personal Day': 'bg-violet-50 text-violet-600',
  'Unpaid Leave': 'bg-rose-50 text-rose-600',
};

const statusStyles: Record<string, string> = {
  Pending: 'bg-amber-50 text-amber-600',
  Approved: 'bg-emerald-50 text-emerald-600',
  Rejected: 'bg-rose-50 text-rose-600',
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function ApprovalQueue({ requests }: { requests: LeaveRequest[] }) {
  const { updateLeaveStatus } = useApp();

  const pending = requests.filter((r) => r.status === 'Pending');

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 animate-slide-up" style={{ animationDelay: '200ms', opacity: 0 }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center">
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Pending Approvals</h3>
            <p className="text-xs text-slate-400">{pending.length} request{pending.length !== 1 ? 's' : ''} awaiting review</p>
          </div>
        </div>
        {pending.length > 0 && (
          <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-xs font-bold text-amber-600 tabular-nums">
            {pending.length}
          </span>
        )}
      </div>

      {pending.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
            <Check className="w-7 h-7 text-emerald-500" />
          </div>
          <p className="text-sm font-semibold text-slate-700">All caught up</p>
          <p className="text-xs text-slate-400 mt-1">No pending leave requests right now.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pending.map((req) => {
            const typeColor = typeColors[req.type] ?? typeColors['Annual Leave'];
            return (
              <div
                key={req.id}
                className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {req.employeeInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-slate-900">{req.employeeName}</p>
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md ${typeColor}`}>
                        {req.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{req.employeeDept}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <CalendarRange className="w-3.5 h-3.5 text-slate-400" />
                        {formatDate(req.startDate)} – {formatDate(req.endDate)}
                      </span>
                      <span className="text-xs font-bold text-slate-700 tabular-nums">{req.days}d</span>
                    </div>
                    {req.notes !== '—' && (
                      <p className="flex items-start gap-1.5 text-xs text-slate-500 mt-2 leading-relaxed">
                        <FileText className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                        {req.notes}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50">
                  <button
                    onClick={() => updateLeaveStatus(req.id, 'Approved')}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => updateLeaveStatus(req.id, 'Rejected')}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recent decisions */}
      {(() => {
        const recent = requests.filter((r) => r.status !== 'Pending').slice(0, 3);
        if (recent.length === 0) return null;
        return (
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Recent Decisions</p>
            <div className="space-y-2">
              {recent.map((req) => (
                <div key={req.id} className="flex items-center gap-3 py-1.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 flex-shrink-0">
                    {req.employeeInitials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-700 truncate">{req.employeeName}</p>
                    <p className="text-[11px] text-slate-400">{req.type} · {req.days}d</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md ${statusStyles[req.status]}`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
