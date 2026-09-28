import { useState } from 'react';
import type { Candidate } from '@/types';
import { RequisitionsOverview } from '@/components/recruitment/RequisitionsOverview';
import { KanbanBoard } from '@/components/recruitment/KanbanBoard';
import { CandidateModal } from '@/components/recruitment/CandidateModal';
import { jobRequisitions } from '@/data/recruitmentData';
import { UserPlus, Filter } from 'lucide-react';

export function Recruitment() {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  return (
    <div className="p-4 lg:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 animate-fade-in">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Recruitment</h2>
          <p className="text-sm text-slate-500 mt-1">
            Track job requisitions and manage candidates through your hiring pipeline.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
          <UserPlus className="w-4 h-4" />
          New Requisition
        </button>
      </div>

      {/* Requisitions overview */}
      <RequisitionsOverview requisitions={jobRequisitions} />

      {/* Kanban board */}
      <KanbanBoard onCardClick={setSelectedCandidate} />

      {/* Candidate modal */}
      <CandidateModal candidate={selectedCandidate} onClose={() => setSelectedCandidate(null)} />
    </div>
  );
}
