import type { Employee, EmploymentStatus } from '@/types';

export const statusStyles: Record<EmploymentStatus, { dot: string; badge: string }> = {
  Active: { dot: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700' },
  'On Leave': { dot: 'bg-amber-500', badge: 'bg-amber-50 text-amber-700' },
  Remote: { dot: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700' },
};

export const departmentColors: Record<string, string> = {
  Engineering: 'from-blue-500 to-blue-600',
  Sales: 'from-emerald-500 to-emerald-600',
  Marketing: 'from-amber-500 to-amber-600',
  Operations: 'from-indigo-500 to-indigo-600',
  Finance: 'from-rose-500 to-rose-600',
  HR: 'from-teal-500 to-teal-600',
  Design: 'from-violet-500 to-violet-600',
};

export function getDepartmentGradient(dept: string): string {
  return departmentColors[dept] ?? 'from-slate-500 to-slate-600';
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'Africa/Nairobi' });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function buildOrgTree(emps: Employee[]): Map<string | null, Employee[]> {
  const tree = new Map<string | null, Employee[]>();
  for (const emp of emps) {
    const key = emp.managerId;
    const list = tree.get(key) ?? [];
    list.push(emp);
    tree.set(key, list);
  }
  return tree;
}

export function getDirectReports(emps: Employee[], managerId: string): Employee[] {
  return emps.filter((e) => e.managerId === managerId);
}
