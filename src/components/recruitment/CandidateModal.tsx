import { useState } from 'react';
import type { Candidate } from '@/types';
import { useApp } from '@/context/AppContext';
import { X, Star, Mail, Phone, MapPin, Briefcase, Calendar, FileText, FileCheck, Check } from 'lucide-react';

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

export function CandidateModal({
  candidate,
  onClose,
}: {
  candidate: Candidate | null;
  onClose: () => void;
}) {
  const { updateCandidateRating } = useApp();
  const [hoverRating, setHoverRating] = useState(0);
  const [offerGenerated, setOfferGenerated] = useState(false);

  if (!candidate) return null;

  const gradient = getGradient(candidate.department);

  const handleGenerateOffer = () => {
    setOfferGenerated(true);
    setTimeout(() => setOfferGenerated(false), 2500);
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
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 px-6 pt-6 pb-16 rounded-t-2xl flex-shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-slate-300">{candidate.role}</span>
              <span className="text-xs text-slate-500">· {candidate.department}</span>
            </div>
            <h2 className="text-xl font-bold text-white">{candidate.name}</h2>
            <p className="text-sm text-slate-400 mt-0.5">Applied {new Date(candidate.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
          </div>

          {/* Avatar */}
          <div className="px-6 -mt-12 relative z-10 flex items-end justify-between">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-4 ring-white`}>
              {candidate.initials}
            </div>
            <div className="pb-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() => updateCandidateRating(candidate.id, n)}
                  onMouseEnter={() => setHoverRating(n)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-0.5 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-5 h-5 transition-colors ${
                      n <= (hoverRating || candidate.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto scrollbar-thin px-6 py-5">
            {/* Contact info */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-xs text-slate-600 truncate">{candidate.email}</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-xs text-slate-600">{candidate.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-xs text-slate-600">{candidate.location}</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50">
                <Briefcase className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-xs text-slate-600">{candidate.experience} exp</span>
              </div>
            </div>

            {/* Resume snippet */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-bold text-slate-900">Resume Summary</h3>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed">{candidate.resumeSnippet}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-5">
              <h3 className="text-sm font-bold text-slate-900 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill) => (
                  <span key={skill} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Source */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>Applied via <span className="font-semibold text-slate-600">{candidate.source}</span> on {new Date(candidate.appliedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 flex-shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleGenerateOffer}
              disabled={offerGenerated}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all shadow-lg ${
                offerGenerated
                  ? 'bg-emerald-600 shadow-emerald-600/20'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
              }`}
            >
              {offerGenerated ? (
                <>
                  <Check className="w-4 h-4" />
                  Offer Letter Generated
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  Generate Offer Letter
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
