import type { Candidate, CandidateStage } from '@/types';
import { useApp } from '@/context/AppContext';
import { Star, ChevronLeft, ChevronRight, Mail, MapPin } from 'lucide-react';

const stages: CandidateStage[] = ['Applied', 'Screening', 'Technical Interview', 'Offer Sent', 'Hired'];

const stageConfig: Record<CandidateStage, { color: string; dot: string; headerBg: string }> = {
  'Applied': { color: 'text-slate-600', dot: 'bg-slate-400', headerBg: 'bg-slate-50' },
  'Screening': { color: 'text-blue-600', dot: 'bg-blue-500', headerBg: 'bg-blue-50' },
  'Technical Interview': { color: 'text-violet-600', dot: 'bg-violet-500', headerBg: 'bg-violet-50' },
  'Offer Sent': { color: 'text-amber-600', dot: 'bg-amber-500', headerBg: 'bg-amber-50' },
  'Hired': { color: 'text-emerald-600', dot: 'bg-emerald-500', headerBg: 'bg-emerald-50' },
};

const deptGradients: Record<string, string> = {
  Engineering: 'from-blue-500 to-blue-600',
  Sales: 'from-emerald-500 to-emerald-600',
  Marketing: 'from-amber-500 to-amber-600',
  Design: 'from-violet-500 to-violet-600',
  Finance: 'from-rose-500 to-rose-600',
};

function getGradient(dept: string): string {
  return deptGradients[dept] ?? 'from-slate-500 to-slate-600';
}

export function KanbanBoard({ onCardClick }: { onCardClick: (c: Candidate) => void }) {
  const { candidates, updateCandidateStage } = useApp();

  const moveCandidate = (id: string, currentStage: CandidateStage, direction: 1 | -1) => {
    const idx = stages.indexOf(currentStage);
    const newIdx = idx + direction;
    if (newIdx >= 0 && newIdx < stages.length) {
      updateCandidateStage(id, stages[newIdx]);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 animate-slide-up" style={{ animationDelay: '150ms', opacity: 0 }}>
      <h3 className="font-bold text-slate-900 mb-4">Applicant Pipeline</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {stages.map((stage) => {
          const config = stageConfig[stage];
          const stageCandidates = candidates.filter((c) => c.stage === stage);
          return (
            <div key={stage} className="flex flex-col min-w-0">
              {/* Column header */}
              <div className={`flex items-center justify-between px-3 py-2.5 rounded-t-xl ${config.headerBg}`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                  <span className={`text-xs font-bold ${config.color}`}>{stage}</span>
                </div>
                <span className={`text-xs font-bold tabular-nums ${config.color}`}>
                  {stageCandidates.length}
                </span>
              </div>

              {/* Column body */}
              <div className="flex-1 bg-slate-50/50 rounded-b-xl border border-slate-100 border-t-0 p-2 space-y-2 min-h-[200px]">
                {stageCandidates.length === 0 ? (
                  <div className="flex items-center justify-center h-24 text-xs text-slate-300">
                    No candidates
                  </div>
                ) : (
                  stageCandidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      onClick={() => onCardClick(candidate)}
                      className="bg-white rounded-xl border border-slate-200 p-3 cursor-pointer hover:shadow-md hover:border-slate-300 transition-all group"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${getGradient(candidate.department)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                          {candidate.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                            {candidate.name}
                          </p>
                          <p className="text-xs text-slate-400 truncate">{candidate.role}</p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-0.5 mt-2">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className={`w-3 h-3 ${n <= candidate.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                          />
                        ))}
                        <span className="text-[10px] text-slate-400 ml-1">{candidate.experience}</span>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {candidate.skills.slice(0, 3).map((skill) => (
                          <span key={skill} className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                            {skill}
                          </span>
                        ))}
                        {candidate.skills.length > 3 && (
                          <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-400">
                            +{candidate.skills.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Move buttons */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-50">
                        <button
                          onClick={(e) => { e.stopPropagation(); moveCandidate(candidate.id, candidate.stage, -1); }}
                          disabled={stages.indexOf(candidate.stage) === 0}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-[10px] text-slate-400">{candidate.source}</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); moveCandidate(candidate.id, candidate.stage, 1); }}
                          disabled={stages.indexOf(candidate.stage) === stages.length - 1}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
