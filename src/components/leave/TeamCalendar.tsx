import { useState, useMemo } from 'react';
import type { LeaveRequest, Holiday } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { holidays as holidayData } from '@/data/leaveData';

const leaveTypeColors: Record<string, { bg: string; border: string; text: string }> = {
  'Annual Leave': { bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700' },
  'Sick Leave': { bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-700' },
  'Remote Work': { bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-700' },
  'Personal Day': { bg: 'bg-violet-100', border: 'border-violet-300', text: 'text-violet-700' },
  'Unpaid Leave': { bg: 'bg-rose-100', border: 'border-rose-300', text: 'text-rose-700' },
};

const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthLabels = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function dateInRange(date: Date, start: Date, end: Date): boolean {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return d >= s && d <= e;
}

export function TeamCalendar({
  leaveRequests,
  holidays: staticHolidays,
}: {
  leaveRequests: LeaveRequest[];
  holidays: Holiday[];
}) {
  const today = new Date(2026, 8, 28); // Sep 28, 2026 — project "current date"
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const allHolidays = useMemo(() => [...staticHolidays, ...holidayData], [staticHolidays]);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startWeekday = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(currentYear, currentMonth, d));
    const trailing = (7 - (days.length % 7)) % 7;
    for (let i = 0; i < trailing; i++) days.push(null);

    return days;
  }, [currentYear, currentMonth]);

  const approvedLeaves = useMemo(
    () => leaveRequests.filter((r) => r.status === 'Approved'),
    [leaveRequests]
  );

  const getLeavesForDate = (date: Date): LeaveRequest[] => {
    return approvedLeaves.filter((leave) => {
      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);
      return dateInRange(date, start, end);
    });
  };

  const getHolidayForDate = (date: Date): Holiday | undefined => {
    return allHolidays.find((h) => isSameDay(new Date(h.date), date));
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const goToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(today);
  };

  const selectedLeaves = selectedDate ? getLeavesForDate(selectedDate) : [];
  const selectedHoliday = selectedDate ? getHolidayForDate(selectedDate) : undefined;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 animate-slide-up" style={{ animationDelay: '200ms', opacity: 0 }}>
      {/* Calendar header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            {monthLabels[currentMonth]} {currentYear}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Team calendar · leaves & holidays</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={goToday}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Today
          </button>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {Object.entries(leaveTypeColors).map(([type, style]) => (
          <div key={type} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-sm ${style.bg} border ${style.border}`} />
            <span className="text-[11px] font-medium text-slate-500">{type}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
          <span className="text-[11px] font-medium text-slate-500">Holiday</span>
        </div>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1.5 mb-1.5">
        {weekdayLabels.map((day) => (
          <div key={day} className="text-center text-[11px] font-bold text-slate-400 uppercase tracking-wide py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {calendarDays.map((date, i) => {
          if (!date) return <div key={i} className="aspect-square" />;

          const dayLeaves = getLeavesForDate(date);
          const holiday = getHolidayForDate(date);
          const isToday = isSameDay(date, today);
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const hasLeaves = dayLeaves.length > 0;

          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`aspect-square rounded-lg border p-1.5 text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'border-blue-500 ring-2 ring-blue-200 bg-blue-50/30'
                  : isToday
                  ? 'border-slate-400 bg-slate-50'
                  : holiday
                  ? 'border-rose-200 bg-rose-50/40'
                  : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
              }`}
            >
              <span className={`text-xs font-semibold block ${
                isToday ? 'text-slate-900' : holiday ? 'text-rose-600' : 'text-slate-600'
              }`}>
                {date.getDate()}
              </span>
              {holiday && (
                <div className="mt-0.5 text-[9px] font-medium text-rose-600 truncate leading-tight">
                  {holiday.name}
                </div>
              )}
              {hasLeaves && !holiday && (
                <div className="mt-0.5 space-y-0.5">
                  {dayLeaves.slice(0, 2).map((leave) => {
                    const style = leaveTypeColors[leave.type] ?? leaveTypeColors['Annual Leave'];
                    return (
                      <div
                        key={leave.id}
                        className={`text-[9px] font-medium ${style.text} ${style.bg} ${style.border} border rounded px-1 truncate leading-tight`}
                      >
                        {leave.employeeInitials}
                      </div>
                    );
                  })}
                  {dayLeaves.length > 2 && (
                    <div className="text-[9px] font-medium text-slate-400 leading-tight">
                      +{dayLeaves.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected date details */}
      {selectedDate && (
        <div className="mt-5 pt-4 border-t border-slate-100 animate-fade-in">
          <p className="text-sm font-bold text-slate-900 mb-3">
            {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
          {selectedHoliday && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-50 border border-rose-100 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 flex-shrink-0" />
              <span className="text-sm font-semibold text-rose-700">{selectedHoliday.name}</span>
              <span className="text-xs text-rose-400 ml-auto">{selectedHoliday.type}</span>
            </div>
          )}
          {selectedLeaves.length > 0 ? (
            <div className="space-y-2">
              {selectedLeaves.map((leave) => {
                const style = leaveTypeColors[leave.type] ?? leaveTypeColors['Annual Leave'];
                return (
                  <div key={leave.id} className={`flex items-center gap-3 p-3 rounded-xl ${style.bg} border ${style.border}`}>
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-xs font-bold text-slate-700 flex-shrink-0">
                      {leave.employeeInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">{leave.employeeName}</p>
                      <p className="text-xs text-slate-500">{leave.type} · {leave.employeeDept}</p>
                    </div>
                    <span className={`text-xs font-semibold ${style.text}`}>{leave.days}d</span>
                  </div>
                );
              })}
            </div>
          ) : !selectedHoliday ? (
            <p className="text-sm text-slate-400">No leaves scheduled on this day.</p>
          ) : null}
        </div>
      )}
    </div>
  );
}
