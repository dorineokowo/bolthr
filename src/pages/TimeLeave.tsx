import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { LeaveBalanceCards } from '@/components/leave/LeaveBalanceCards';
import { TeamCalendar } from '@/components/leave/TeamCalendar';
import { RequestTimeOffModal } from '@/components/leave/RequestTimeOffModal';
import { ApprovalQueue } from '@/components/leave/ApprovalQueue';
import { leaveBalances, holidays } from '@/data/leaveData';
import { CalendarPlus, ShieldCheck } from 'lucide-react';

export function TimeLeave() {
  const { role, leaveRequests, addLeaveRequest } = useApp();
  const [modalOpen, setModalOpen] = useState(false);

  const canApprove = role === 'Admin' || role === 'Line Manager';

  const pendingCount = leaveRequests.filter((r) => r.status === 'Pending').length;

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fade-in">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Time & Leave</h2>
          <p className="text-sm text-slate-500 mt-1">
            Manage your leave balances, team calendar, and time-off requests.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
        >
          <CalendarPlus className="w-4 h-4" />
          Request Time Off
        </button>
      </div>

      {/* Balance cards */}
      <LeaveBalanceCards balances={leaveBalances} />

      {/* Main content: Calendar + Approval queue */}
      <div className={`grid grid-cols-1 ${canApprove ? 'lg:grid-cols-3' : ''} gap-5`}>
        <div className={canApprove ? 'lg:col-span-2' : ''}>
          <TeamCalendar leaveRequests={leaveRequests} holidays={holidays} />
        </div>
        {canApprove && (
          <div className="space-y-5">
            <ApprovalQueue requests={leaveRequests} />
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white animate-slide-up" style={{ animationDelay: '300ms', opacity: 0 }}>
              <div className="flex items-center gap-2.5 mb-3">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold">Manager View</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                You're viewing as <span className="font-semibold text-white">{role}</span>. Pending approvals appear here for one-click action.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold tabular-nums">
                  {pendingCount} pending
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold tabular-nums">
                  {leaveRequests.filter((r) => r.status === 'Approved').length} approved
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {!canApprove && (
        <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center animate-fade-in">
          <p className="text-sm text-slate-500">
            Approval tools are available to Admin and Line Manager roles. Switch your role in the top bar to access them.
          </p>
        </div>
      )}

      {/* Modal */}
      <RequestTimeOffModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={addLeaveRequest}
        employeeName="Sarah Chen"
        employeeInitials="SC"
        employeeDept="HR"
      />
    </div>
  );
}
