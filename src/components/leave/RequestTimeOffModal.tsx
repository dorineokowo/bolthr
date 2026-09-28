import { useState } from 'react';
import type { LeaveType, LeaveRequest } from '@/types';
import { X, CalendarPlus, Check, Calendar } from 'lucide-react';

const leaveTypes: LeaveType[] = ['Annual Leave', 'Sick Leave', 'Remote Work', 'Personal Day', 'Unpaid Leave'];

function calculateDays(start: string, end: string): number {
  if (!start || !end) return 0;
  const s = new Date(start);
  const e = new Date(end);
  if (e < s) return 0;
  const diff = Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return diff;
}

const inputClass =
  'w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all';
const labelClass = 'block text-xs font-semibold text-slate-600 mb-1.5';

export function RequestTimeOffModal({
  open,
  onClose,
  onSubmit,
  employeeName,
  employeeInitials,
  employeeDept,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (req: LeaveRequest) => void;
  employeeName: string;
  employeeInitials: string;
  employeeDept: string;
}) {
  const [type, setType] = useState<LeaveType>('Annual Leave');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ start?: string; end?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const days = calculateDays(startDate, endDate);

  const handleSubmit = () => {
    const e: { start?: string; end?: string } = {};
    if (!startDate) e.start = 'Required';
    if (!endDate) e.end = 'Required';
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) e.end = 'End date must be after start date';
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const req: LeaveRequest = {
      id: `lr${Date.now()}`,
      employeeName,
      employeeInitials,
      employeeDept,
      type,
      startDate,
      endDate,
      days,
      status: 'Pending',
      notes: notes || '—',
      requestedDate: new Date().toISOString().split('T')[0],
    };
    onSubmit(req);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setType('Annual Leave');
      setStartDate('');
      setEndDate('');
      setNotes('');
      onClose();
    }, 1200);
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 animate-fade-in" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col pointer-events-auto animate-scale-in"
          onClick={(ev) => ev.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <CalendarPlus className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Request Time Off</h2>
                <p className="text-xs text-slate-400">Submit a new leave request</p>
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
                <h3 className="font-bold text-slate-900 text-lg">Request Submitted</h3>
                <p className="text-sm text-slate-500 mt-1">Your {type.toLowerCase()} request has been sent for approval.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Leave type */}
                <div>
                  <label className={labelClass}>Leave Type</label>
                  <select className={inputClass} value={type} onChange={(e) => setType(e.target.value as LeaveType)}>
                    {leaveTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Start Date</label>
                    <input
                      type="date"
                      className={inputClass}
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                        setErrors((prev) => ({ ...prev, start: undefined }));
                      }}
                    />
                    {errors.start && <p className="text-xs text-rose-500 mt-1">{errors.start}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>End Date</label>
                    <input
                      type="date"
                      className={inputClass}
                      value={endDate}
                      min={startDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                        setErrors((prev) => ({ ...prev, end: undefined }));
                      }}
                    />
                    {errors.end && <p className="text-xs text-rose-500 mt-1">{errors.end}</p>}
                  </div>
                </div>

                {/* Auto-calculated days */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4.5 h-4.5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 font-medium">Total Duration</p>
                    <p className="text-lg font-bold text-slate-900">
                      {days > 0 ? `${days} ${days === 1 ? 'day' : 'days'}` : '—'}
                    </p>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className={labelClass}>Notes (optional)</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add context for your approver…"
                  />
                </div>
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
                Submit Request
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
