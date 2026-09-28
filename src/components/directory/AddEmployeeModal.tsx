import { useState } from 'react';
import type { Employee, EmploymentStatus } from '@/types';
import { X, UserPlus, Check } from 'lucide-react';
import { departments, locations } from '@/data/employees';

interface FormData {
  firstName: string;
  lastName: string;
  title: string;
  department: string;
  location: string;
  status: EmploymentStatus;
  email: string;
  phone: string;
  salary: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract';
}

const emptyForm: FormData = {
  firstName: '',
  lastName: '',
  title: '',
  department: 'Engineering',
  location: 'San Francisco, CA',
  status: 'Active',
  email: '',
  phone: '',
  salary: '',
  employmentType: 'Full-time',
};

const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all';

const labelClass = 'block text-xs font-semibold text-slate-600 mb-1.5';

export function AddEmployeeModal({
  open,
  onClose,
  onAdd,
  employees,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (emp: Employee) => void;
  employees: Employee[];
}) {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const managers = employees.filter((e) => e.level === 'C-Level' || e.level === 'VP' || e.level === 'Director' || e.level === 'Manager' || e.level === 'Lead');

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) e.firstName = 'Required';
    if (!form.lastName.trim()) e.lastName = 'Required';
    if (!form.title.trim()) e.title = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.salary.trim()) e.salary = 'Required';
    else if (isNaN(Number(form.salary)) || Number(form.salary) < 0) e.salary = 'Invalid amount';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const id = `e${Date.now()}`;
    const newEmp: Employee = {
      id,
      name: `${form.firstName} ${form.lastName}`,
      firstName: form.firstName,
      lastName: form.lastName,
      avatar: '',
      initials: `${form.firstName[0] ?? ''}${form.lastName[0] ?? ''}`.toUpperCase(),
      title: form.title,
      department: form.department,
      location: form.location,
      status: form.status,
      email: form.email,
      phone: form.phone || '—',
      managerId: null,
      managerName: null,
      startDate: new Date().toISOString().split('T')[0],
      employmentType: form.employmentType,
      salary: Number(form.salary),
      bonus: 0,
      level: 'Mid',
      documents: [],
      assets: [],
    };
    onAdd(newEmp);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm(emptyForm);
      onClose();
    }, 1200);
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 animate-fade-in" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Add New Employee</h2>
                <p className="text-xs text-slate-400">Create a new profile in the directory</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-emerald-600" strokeWidth={2.5} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Employee Added</h3>
                <p className="text-sm text-slate-500 mt-1">{form.firstName} {form.lastName} has been added to the directory.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Name */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>First Name</label>
                    <input
                      className={inputClass}
                      value={form.firstName}
                      onChange={(e) => update('firstName', e.target.value)}
                      placeholder="Jane"
                    />
                    {errors.firstName && <p className="text-xs text-rose-500 mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Last Name</label>
                    <input
                      className={inputClass}
                      value={form.lastName}
                      onChange={(e) => update('lastName', e.target.value)}
                      placeholder="Smith"
                    />
                    {errors.lastName && <p className="text-xs text-rose-500 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className={labelClass}>Job Title</label>
                  <input
                    className={inputClass}
                    value={form.title}
                    onChange={(e) => update('title', e.target.value)}
                    placeholder="Software Engineer"
                  />
                  {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
                </div>

                {/* Department + Location */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Department</label>
                    <select className={inputClass} value={form.department} onChange={(e) => update('department', e.target.value)}>
                      {departments.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Location</label>
                    <select className={inputClass} value={form.location} onChange={(e) => update('location', e.target.value)}>
                      {locations.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Status + Type */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Status</label>
                    <select className={inputClass} value={form.status} onChange={(e) => update('status', e.target.value as EmploymentStatus)}>
                      <option value="Active">Active</option>
                      <option value="On Leave">On Leave</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Employment Type</label>
                    <select className={inputClass} value={form.employmentType} onChange={(e) => update('employmentType', e.target.value)}>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                    </select>
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="jane.smith@nexushr.com"
                    />
                    {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input
                      className={inputClass}
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <label className={labelClass}>Annual Salary (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-medium">$</span>
                    <input
                      className={`${inputClass} pl-7`}
                      value={form.salary}
                      onChange={(e) => update('salary', e.target.value)}
                      placeholder="95000"
                      type="number"
                    />
                  </div>
                  {errors.salary && <p className="text-xs text-rose-500 mt-1">{errors.salary}</p>}
                </div>

                {/* Manager info */}
                <p className="text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
                  New employees are added at the top level. You can assign a manager from the profile drawer after creation.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {!submitted && (
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 flex-shrink-0">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
              >
                Add Employee
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
