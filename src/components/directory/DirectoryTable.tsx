import type { Employee } from '@/types';
import { ChevronDown, Mail } from 'lucide-react';
import { statusStyles, getDepartmentGradient } from '@/utils/employeeUtils';

export function DirectoryTable({
  employees,
  onRowClick,
}: {
  employees: Employee[];
  onRowClick: (emp: Employee) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-fade-in">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                <button className="flex items-center gap-1 hover:text-slate-700 transition-colors">
                  Employee <ChevronDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Department</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Location</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Manager</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Start Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => {
              const status = statusStyles[emp.status];
              return (
                <tr
                  key={emp.id}
                  onClick={() => onRowClick(emp)}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 cursor-pointer transition-colors group"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getDepartmentGradient(emp.department)} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
                        {emp.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{emp.name}</p>
                        <p className="text-xs text-slate-500">{emp.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-slate-600 font-medium">{emp.department}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-slate-600">{emp.location}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold ${status.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-slate-600">{emp.managerName ?? '—'}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-sm text-slate-500">
                      {new Date(emp.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {employees.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Mail className="w-10 h-10 text-slate-300 mb-3" />
          <p className="text-sm text-slate-400">No employees match your filters</p>
        </div>
      )}
    </div>
  );
}
