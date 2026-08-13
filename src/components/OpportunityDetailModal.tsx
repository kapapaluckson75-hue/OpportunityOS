import React from 'react';
import { Opportunity, MatchAnalysis, StudentProfile } from '../types';
import { X, Calendar, MapPin, DollarSign, ExternalLink, Sparkles, CheckCircle2, AlertTriangle, FileText, Building, Award, ShieldCheck } from 'lucide-react';

interface OpportunityDetailModalProps {
  opportunity: Opportunity | null;
  match?: MatchAnalysis;
  studentProfile: StudentProfile;
  onClose: () => void;
  onPrepareApplication: (opp: Opportunity) => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  match,
  studentProfile,
  onClose,
  onPrepareApplication,
}) => {
  if (!opportunity) return null;

  const score = match?.matchScore ?? 75;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto text-slate-800 shadow-xl relative my-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-slate-200 p-6 flex items-start justify-between gap-4 z-10">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100">
                {opportunity.type}
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600">
                {opportunity.region}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-tight">{opportunity.title}</h2>
            <p className="text-xs font-semibold text-indigo-600 flex items-center space-x-2">
              <Building className="w-3.5 h-3.5" />
              <span>{opportunity.organization}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* AI Match Overview Banner */}
          <div className="bg-slate-50 border border-indigo-100 rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700 border border-indigo-200">
                  <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500">Gemini Profile Match Rating</div>
                  <div className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                    <span className="text-indigo-600 font-mono text-xl">{score}%</span>
                    <span className="text-xs font-semibold text-slate-600">({match?.matchTier || 'Good Fit'})</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onPrepareApplication(opportunity);
                }}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Prepare My Application AI</span>
              </button>
            </div>

            {/* Strengths and Gaps */}
            {match && (
              <div className="grid sm:grid-cols-2 gap-4 text-xs pt-1">
                {/* Strengths */}
                <div className="space-y-1.5 bg-indigo-50/70 p-3 rounded-xl border border-indigo-100 text-slate-800">
                  <div className="font-bold text-indigo-900 flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span>Your Top Key Strengths</span>
                  </div>
                  <ul className="space-y-1 text-slate-700">
                    {(match.strengths || []).map((s, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Gaps or Risks */}
                <div className="space-y-1.5 bg-amber-50/70 p-3 rounded-xl border border-amber-200 text-slate-800">
                  <div className="font-bold text-amber-900 flex items-center space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Gaps & Strategy Advice</span>
                  </div>
                  <ul className="space-y-1 text-slate-700">
                    {(match.gapsOrRisks || []).map((g, idx) => (
                      <li key={idx} className="flex items-start space-x-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Deadline</div>
                <div className="font-bold text-slate-800">{opportunity.deadlineDisplay}</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Location</div>
                <div className="font-bold text-slate-800">{opportunity.location}</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase">Compensation / Value</div>
                <div className="font-bold text-indigo-700">{opportunity.compensation}</div>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Opportunity Overview</h3>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
              {opportunity.overview}
            </p>
          </div>

          {/* Eligibility Criteria Checklist */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Eligibility Requirements</span>
            </h3>

            <div className="space-y-2 text-xs">
              {opportunity.eligibilityCriteria.map((criterion, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-800 font-medium">{criterion.rule}</span>
                    {criterion.isMandatory && (
                      <span className="ml-2 text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                        Mandatory
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Responsibilities & Benefits */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider">Key Benefits & Offerings</h3>
            <ul className="space-y-2 text-xs text-slate-700">
              {opportunity.responsibilitiesOrBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <Award className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            href={opportunity.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition flex items-center justify-center space-x-2"
          >
            <span>Official Application Website</span>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </a>

          <button
            onClick={() => {
              onClose();
              onPrepareApplication(opportunity);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition flex items-center justify-center space-x-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Prepare Application AI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
