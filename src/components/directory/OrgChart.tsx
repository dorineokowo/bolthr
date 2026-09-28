import { useState } from 'react';
import type { Employee } from '@/types';
import { ChevronRight, Users } from 'lucide-react';
import { getDepartmentGradient, statusStyles, getDirectReports } from '@/utils/employeeUtils';

export function OrgChart({
  employees,
  onNodeClick,
}: {
  employees: Employee[];
  onNodeClick: (emp: Employee) => void;
}) {
  const roots = employees.filter((e) => e.managerId === null);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 overflow-x-auto scrollbar-thin animate-fade-in">
      <div className="min-w-fit">
        {roots.map((root) => (
          <OrgNode
            key={root.id}
            employee={root}
            employees={employees}
            depth={0}
            isLast={true}
            onNodeClick={onNodeClick}
          />
        ))}
      </div>
    </div>
  );
}

function OrgNode({
  employee,
  employees,
  depth,
  isLast,
  onNodeClick,
}: {
  employee: Employee;
  employees: Employee[];
  depth: number;
  isLast: boolean;
  onNodeClick: (emp: Employee) => void;
}) {
  const [expanded, setExpanded] = useState(depth < 2);
  const reports = getDirectReports(employees, employee.id);
  const hasReports = reports.length > 0;
  const status = statusStyles[employee.status];
  const gradient = getDepartmentGradient(employee.department);

  return (
    <div className="relative" style={{ paddingLeft: depth === 0 ? 0 : 28 }}>
      {/* Connector line to parent */}
      {depth > 0 && (
        <div
          className={`absolute left-0 top-0 ${isLast ? 'h-12' : 'h-full'} border-l-2 border-slate-200`}
          style={{ left: -14 }}
        />
      )}
      {depth > 0 && (
        <div
          className="absolute top-12 border-t-2 border-slate-200"
          style={{ left: -14, width: 14 }}
        />
      )}

      {/* Node card */}
      <div className="inline-flex items-center mb-0">
        <button
          onClick={() => onNodeClick(employee)}
          className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:shadow-md hover:border-slate-300 transition-all duration-200 group text-left"
          style={{ marginLeft: depth > 0 ? 14 : 0 }}
        >
          <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm`}>
            {employee.initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors whitespace-nowrap">
                {employee.name}
              </p>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot} flex-shrink-0`} />
            </div>
            <p className="text-xs text-slate-500 whitespace-nowrap">{employee.title}</p>
          </div>
          {hasReports && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((p) => !p);
              }}
              className="ml-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors flex-shrink-0"
            >
              <ChevronRight
                className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
              />
              <span className="text-[10px] font-semibold text-slate-500 tabular-nums">{reports.length}</span>
            </button>
          )}
        </button>
      </div>

      {/* Children */}
      {expanded && hasReports && (
        <div className="relative pt-2">
          {reports.map((child, i) => (
            <OrgNode
              key={child.id}
              employee={child}
              employees={employees}
              depth={depth + 1}
              isLast={i === reports.length - 1}
              onNodeClick={onNodeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
