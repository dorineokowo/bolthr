import { useState } from 'react';
import type { Employee } from '@/types';
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  UserCog,
  DollarSign,
  Award,
  FileText,
  Monitor,
  Download,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import { formatDate, formatCurrency, getDepartmentGradient, statusStyles } from '@/utils/employeeUtils';

type Tab = 'overview' | 'compensation' | 'documents' | 'assets';

const tabs: { key: Tab; label: string; icon: typeof Mail }[] = [
  { key: 'overview', label: 'Overview', icon: Mail },
  { key: 'compensation', label: 'Compensation', icon: DollarSign },
  { key: 'documents', label: 'Documents', icon: FileText },
  { key: 'assets', label: 'Equipment', icon: Monitor },
];

export function ProfileDrawer({ employee, onClose }: { employee: Employee | null; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  if (!employee) return null;

  const status = statusStyles[employee.status];
  const deptGradient = getDepartmentGradient(employee.department);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 px-6 pt-6 pb-20 flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold ${status.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {employee.status}
            </span>
            <span className="text-xs text-slate-400 font-medium">{employee.employmentType}</span>
          </div>
          <h2 className="text-xl font-bold text-white">{employee.name}</h2>
          <p className="text-sm text-slate-400">{employee.title}</p>
        </div>

        {/* Avatar */}
        <div className="px-6 -mt-12 relative z-10 flex items-end gap-4">
          <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${deptGradient} flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white flex-shrink-0`}>
            {employee.initials}
          </div>
          <div className="pb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-600">
              <Building2 className="w-3.5 h-3.5" />
              {employee.department}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 mt-5 border-b border-slate-200 flex-shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${
                  active
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5">
          {activeTab === 'overview' && <OverviewTab employee={employee} />}
          {activeTab === 'compensation' && <CompensationTab employee={employee} />}
          {activeTab === 'documents' && <DocumentsTab employee={employee} />}
          {activeTab === 'assets' && <AssetsTab employee={employee} />}
        </div>
      </div>
    </>
  );
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0">
      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-slate-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-sm font-semibold text-slate-900 truncate">{value}</p>
      </div>
    </div>
  );
}

function OverviewTab({ employee }: { employee: Employee }) {
  return (
    <div className="space-y-1 animate-fade-in">
      <InfoRow icon={Mail} label="Email" value={employee.email} />
      <InfoRow icon={Phone} label="Phone" value={employee.phone} />
      <InfoRow icon={MapPin} label="Location" value={employee.location} />
      <InfoRow icon={Building2} label="Department" value={employee.department} />
      <InfoRow icon={UserCog} label="Manager" value={employee.managerName ?? '— (Top level)'} />
      <InfoRow icon={Calendar} label="Start Date" value={formatDate(employee.startDate)} />
      <InfoRow icon={Briefcase} label="Job Title" value={employee.title} />
      <InfoRow icon={TrendingUp} label="Level" value={employee.level} />

      <div className="pt-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Tenure</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">
              {Math.floor((Date.now() - new Date(employee.startDate).getTime()) / (365.25 * 24 * 60 * 60 * 1000))}
            </span>
            <span className="text-sm text-slate-500">years at NexusHR</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompensationTab({ employee }: { employee: Employee }) {
  const total = employee.salary + employee.bonus;
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wide mb-1">Base Salary</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(employee.salary)}</p>
          <p className="text-xs text-slate-500 mt-1">Annual</p>
        </div>
        <div className="bg-emerald-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1">Bonus</p>
          <p className="text-2xl font-bold text-emerald-600">{formatCurrency(employee.bonus)}</p>
          <p className="text-xs text-slate-500 mt-1">Target annual</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Total Compensation</p>
            <p className="text-3xl font-bold">{formatCurrency(total)}</p>
          </div>
          <Award className="w-8 h-8 text-slate-600" />
        </div>
      </div>

      <div className="space-y-1">
        <InfoRow icon={TrendingUp} label="Level" value={employee.level} />
        <InfoRow icon={Briefcase} label="Employment Type" value={employee.employmentType} />
        <InfoRow icon={Building2} label="Department" value={employee.department} />
      </div>
    </div>
  );
}

function DocumentsTab({ employee }: { employee: Employee }) {
  if (employee.documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <FileText className="w-10 h-10 text-slate-300 mb-3" />
        <p className="text-sm text-slate-400">No documents on file</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 animate-fade-in">
      {employee.documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors group"
        >
          <div className="w-10 h-10 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-rose-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{doc.name}</p>
            <p className="text-xs text-slate-400">
              {doc.type} · {doc.size} · {formatDate(doc.uploaded)}
            </p>
          </div>
          <button className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100">
            <Download className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

function AssetsTab({ employee }: { employee: Employee }) {
  if (employee.assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <Monitor className="w-10 h-10 text-slate-300 mb-3" />
        <p className="text-sm text-slate-400">No equipment assigned</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 animate-fade-in">
      {employee.assets.map((asset) => (
        <div
          key={asset.id}
          className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <Monitor className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{asset.name}</p>
            <p className="text-xs text-slate-400">
              {asset.serial} · Assigned {formatDate(asset.assigned)}
            </p>
          </div>
          <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-md bg-slate-100 text-slate-500">
            {asset.category}
          </span>
        </div>
      ))}
    </div>
  );
}
