import { Megaphone, Pin, ChevronRight } from 'lucide-react';
import { announcements } from '@/data/mockData';

const categoryStyles: Record<string, string> = {
  Company: 'bg-blue-50 text-blue-600',
  Policy: 'bg-slate-100 text-slate-600',
  Event: 'bg-emerald-50 text-emerald-600',
  Benefits: 'bg-amber-50 text-amber-600',
};

export function AnnouncementFeed() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 animate-slide-up" style={{ animationDelay: '560ms', opacity: 0 }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-rose-500" />
          <h3 className="font-bold text-slate-900">Announcements</h3>
        </div>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-0.5">
          View all <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((a) => (
          <div
            key={a.id}
            className={`relative p-4 rounded-xl border transition-colors ${
              a.pinned
                ? 'border-blue-200 bg-blue-50/30'
                : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
            }`}
          >
            {a.pinned && (
              <Pin className="absolute top-3.5 right-3.5 w-3.5 h-3.5 text-blue-400 fill-blue-400" />
            )}
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md ${categoryStyles[a.category]}`}>
                {a.category}
              </span>
              <span className="text-xs text-slate-400">{a.date}</span>
            </div>
            <h4 className="text-sm font-semibold text-slate-900 mb-1.5 pr-5">{a.title}</h4>
            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{a.body}</p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-[10px] font-semibold">
                {a.author.split(' ').map((n) => n[0]).join('')}
              </div>
              <span className="text-xs font-medium text-slate-600">{a.author}</span>
              <span className="text-xs text-slate-400">· {a.authorRole}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
