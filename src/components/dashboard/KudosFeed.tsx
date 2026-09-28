import { Heart, Award, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export function KudosFeed() {
  const { kudos, likeKudos } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 animate-slide-up" style={{ animationDelay: '640ms', opacity: 0 }}>
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-slate-900">Kudos Wall</h3>
        </div>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-0.5">
          View all <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {kudos.map((k) => (
          <div
            key={k.id}
            className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-slate-200 transition-colors"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold ring-2 ring-white">
                  {k.fromAvatar}
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white text-xs font-semibold ring-2 ring-white">
                  {k.toAvatar}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">{k.from}</span>
                  <span className="text-slate-400"> → </span>
                  <span className="font-semibold text-slate-700">{k.to}</span>
                </p>
                <p className="text-[11px] text-slate-400">{k.date}</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md bg-amber-50 text-amber-600">
                {k.value}
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">{k.message}</p>
            <button
              onClick={() => likeKudos(k.id)}
              className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-rose-500 transition-colors group"
            >
              <Heart className="w-4 h-4 group-hover:fill-rose-500 transition-all" />
              <span className="tabular-nums">{k.likes}</span>
              <span>likes</span>
            </button>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2.5 rounded-xl border border-dashed border-slate-300 text-sm font-semibold text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-2">
        <Award className="w-4 h-4" />
        Give Kudos
      </button>
    </div>
  );
}
