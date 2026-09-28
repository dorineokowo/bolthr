import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { departmentDistribution } from '@/data/mockData';
import { PieChart as PieIcon } from 'lucide-react';

export function DepartmentChart() {
  const total = departmentDistribution.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 animate-slide-up" style={{ animationDelay: '400ms', opacity: 0 }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <PieIcon className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-slate-900">Department Distribution</h3>
          </div>
          <p className="text-sm text-slate-500">{total} employees across 7 departments</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        <div className="relative w-full" style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departmentDistribution}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {departmentDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  fontSize: '13px',
                }}
                formatter={(value, name) => [`${value} (${((Number(value) / total) * 100).toFixed(1)}%)`, name as string]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-slate-900 tabular-nums">{total}</span>
            <span className="text-xs text-slate-400 font-medium">Total</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
          {departmentDistribution.map((dept) => (
            <div key={dept.name} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: dept.color }} />
              <span className="text-xs font-medium text-slate-600 flex-1 truncate">{dept.name}</span>
              <span className="text-xs font-semibold text-slate-900 tabular-nums">{dept.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
