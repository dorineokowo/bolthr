import { useState, useMemo } from 'react';
import { useApp } from '@/context/AppContext';
import { DirectoryTable } from '@/components/directory/DirectoryTable';
import { DirectoryGrid } from '@/components/directory/DirectoryGrid';
import { OrgChart } from '@/components/directory/OrgChart';
import { ProfileDrawer } from '@/components/directory/ProfileDrawer';
import { AddEmployeeModal } from '@/components/directory/AddEmployeeModal';
import { departments, locations } from '@/data/employees';
import type { Employee, EmploymentStatus } from '@/types';
import {
  Search,
  LayoutGrid,
  Table2,
  Network,
  UserPlus,
  SlidersHorizontal,
  X,
} from 'lucide-react';

type ViewMode = 'grid' | 'table' | 'org';
type StatusFilter = 'All' | EmploymentStatus;

const statusOptions: StatusFilter[] = ['All', 'Active', 'On Leave', 'Remote'];

export function Directory() {
  const { employees, addEmployee } = useApp();
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const filtered = useMemo(() => {
    return employees.filter((emp) => {
      if (search) {
        const q = search.toLowerCase();
        if (!emp.name.toLowerCase().includes(q) && !emp.title.toLowerCase().includes(q)) return false;
      }
      if (deptFilter !== 'All' && emp.department !== deptFilter) return false;
      if (locationFilter !== 'All' && emp.location !== locationFilter) return false;
      if (statusFilter !== 'All' && emp.status !== statusFilter) return false;
      return true;
    });
  }, [employees, search, deptFilter, locationFilter, statusFilter]);

  const hasActiveFilters = deptFilter !== 'All' || locationFilter !== 'All' || statusFilter !== 'All' || search !== '';

  const clearFilters = () => {
    setSearch('');
    setDeptFilter('All');
    setLocationFilter('All');
    setStatusFilter('All');
  };

  const viewModes: { key: ViewMode; label: string; icon: typeof LayoutGrid }[] = [
    { key: 'table', label: 'Table', icon: Table2 },
    { key: 'grid', label: 'Grid', icon: LayoutGrid },
    { key: 'org', label: 'Org Chart', icon: Network },
  ];

  const selectClass =
    'px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all bg-white cursor-pointer hover:border-slate-300';

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fade-in">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Employee Directory</h2>
          <p className="text-sm text-slate-500 mt-1">
            {employees.length} employees · {filtered.length} shown
          </p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
        >
          <UserPlus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-3 animate-fade-in">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or role…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all bg-white"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-slate-400">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <select className={selectClass} value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select className={selectClass} value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="All">All Locations</option>
            {locations.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <select className={selectClass} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}>
            {statusOptions.map((s) => (
              <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}

          {/* View toggle */}
          <div className="flex items-center gap-0.5 p-1 rounded-xl bg-slate-100 ml-auto">
            {viewModes.map((mode) => {
              const Icon = mode.icon;
              const active = viewMode === mode.key;
              return (
                <button
                  key={mode.key}
                  onClick={() => setViewMode(mode.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                    active
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {viewMode === 'table' && <DirectoryTable employees={filtered} onRowClick={setSelectedEmp} />}
        {viewMode === 'grid' && <DirectoryGrid employees={filtered} onCardClick={setSelectedEmp} />}
        {viewMode === 'org' && <OrgChart employees={filtered} onNodeClick={setSelectedEmp} />}
      </div>

      {/* Drawer */}
      <ProfileDrawer employee={selectedEmp} onClose={() => setSelectedEmp(null)} />

      {/* Add Modal */}
      <AddEmployeeModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAdd={addEmployee}
        employees={employees}
      />
    </div>
  );
}
