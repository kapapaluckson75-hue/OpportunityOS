import React from 'react';
import { Opportunity, MatchAnalysis } from '../types';
import { Award, Calendar, MapPin, DollarSign, ExternalLink, Sparkles, CheckCircle2, ChevronRight, FileText, AlertTriangle } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  match?: MatchAnalysis;
  onViewDetails: (opp: Opportunity) => void;
  onPrepareApplication: (opp: Opportunity) => void;
  isAiAnalyzing?: boolean;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  match,
  onViewDetails,
  onPrepareApplication,
  isAiAnalyzing,
}) => {
  // Score badge styling
  const score = match?.matchScore ?? 75;
  let scoreBadgeBg = 'bg-indigo-50 text-indigo-700 border-indigo-200';

  if (score >= 85) {
    scoreBadgeBg = 'bg-indigo-600 text-white border-indigo-600';
  } else if (score >= 68) {
    scoreBadgeBg = 'bg-indigo-100 text-indigo-800 border-indigo-200';
  } else if (score >= 50) {
    scoreBadgeBg = 'bg-amber-50 text-amber-800 border-amber-200';
  } else {
    scoreBadgeBg = 'bg-slate-100 text-slate-700 border-slate-200';
  }

  return (
    <div className="bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between space-y-5 relative group">
      {/* Featured / Demo Tag */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
            {opportunity.type}
          </span>
          {opportunity.isDemoSample && (
            <span className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 font-medium">
              Demo Sample
            </span>
          )}
        </div>

        {/* AI Match Score Badge */}
        <div className={`px-3 py-1 rounded-full border flex items-center space-x-1.5 ${scoreBadgeBg}`}>
          <Sparkles className={`w-3.5 h-3.5 ${score >= 85 ? 'text-amber-300' : 'text-indigo-600'}`} />
          <div className="flex items-baseline space-x-1">
            <span className="text-xs font-bold font-mono">{score}%</span>
            <span className="text-[10px] font-semibold uppercase hidden sm:inline opacity-90">
              {match?.matchTier || 'Matched'}
            </span>
          </div>
        </div>
      </div>

      {/* Title & Organization */}
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors leading-snug">
          {opportunity.title}
        </h3>
        <p className="text-xs font-semibold text-indigo-600 flex items-center space-x-1.5">
          <span>{opportunity.organization}</span>
        </p>
      </div>

      {/* Key Info Bar (Deadline, Location, Compensation) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-xs text-slate-600">
        <div className="flex items-center space-x-1.5 text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{opportunity.deadlineDisplay}</span>
        </div>

        <div className="flex items-center space-x-1.5 text-slate-600">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{opportunity.location}</span>
        </div>

        <div className="flex items-center space-x-1.5 text-indigo-700 font-semibold">
          <DollarSign className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
          <span className="truncate">{opportunity.compensation}</span>
        </div>
      </div>

      {/* Eligibility Summary */}
      <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Eligibility Summary
        </div>
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {opportunity.eligibilitySummary}
        </p>
      </div>

      {/* Why This Matches You (Gemini AI Insight) */}
      {match && match.whyItMatches && match.whyItMatches.length > 0 && (
        <div className="space-y-1.5 bg-indigo-50/70 border border-indigo-100 p-3 rounded-xl">
          <div className="text-[11px] font-bold text-indigo-900 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Why this matches your profile</span>
          </div>
          <ul className="space-y-1 text-xs text-slate-700">
            {match.whyItMatches.slice(0, 2).map((reason, idx) => (
              <li key={idx} className="flex items-start space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer Actions */}
      <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-100">
        <button
          onClick={() => onViewDetails(opportunity)}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition cursor-pointer flex items-center space-x-1"
        >
          <span>View Details</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onPrepareApplication(opportunity)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100 transition cursor-pointer flex items-center space-x-1.5"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Prepare Application AI</span>
        </button>
      </div>
    </div>
  );
};
