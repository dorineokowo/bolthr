import type { Employee } from '@/types';
import { Mail, Phone, MapPin } from 'lucide-react';
import { statusStyles, getDepartmentGradient } from '@/utils/employeeUtils';

export function DirectoryGrid({
  employees,
  onCardClick,
}: {
  employees: Employee[];
  onCardClick: (emp: Employee) => void;
}) {
  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-slate-200">
        <Mail className="w-10 h-10 text-slate-300 mb-3" />
        <p className="text-sm text-slate-400">No employees match your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 animate-fade-in">
      {employees.map((emp) => {
        const status = statusStyles[emp.status];
        return (
          <button
            key={emp.id}
            onClick={() => onCardClick(emp)}
            className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:border-slate-300 transition-all duration-300 text-left group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getDepartmentGradient(emp.department)} flex items-center justify-center text-white text-lg font-bold shadow-sm group-hover:scale-105 transition-transform`}>
                {emp.initials}
              </div>
              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold ${status.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                {emp.status}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{emp.name}</h3>
            <p className="text-xs text-slate-500 mb-3">{emp.title}</p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{emp.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span className="truncate">{emp.email}</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                {emp.department}
              </span>
              <span className="text-xs text-slate-400">{emp.level}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
