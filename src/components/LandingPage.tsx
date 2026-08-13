import React from 'react';
import { StudentProfile } from '../types';
import { SAMPLE_PROFILES } from '../data/sampleProfiles';
import { Sparkles, ArrowRight, CheckCircle2, Target, Award, ShieldCheck, Zap, Compass, FileCheck } from 'lucide-react';

interface LandingPageProps {
  onStartMatching: () => void;
  onSelectPersonaAndMatch: (profile: StudentProfile) => void;
  currentProfile: StudentProfile;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartMatching,
  onSelectPersonaAndMatch,
  currentProfile,
}) => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20 bg-white rounded-3xl border border-slate-200 text-slate-800 shadow-sm">
        {/* Subtle glow background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-slate-100/80 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center relative z-10 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Built for African University Students & Early Career Talent</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Find opportunities you're <span className="text-indigo-600">actually qualified for</span>.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Stop wasting hundreds of hours searching through scattered jobs, fellowships, grants, scholarships, and hackathons. OpportunityOS uses <strong className="text-slate-900 font-bold">Gemini 3.6</strong> to evaluate your profile against real criteria, calculate your true match score, and generate tailored application packages.
          </p>

          {/* Primary Action CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartMatching}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-md shadow-indigo-100 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-3 cursor-pointer"
            >
              <Compass className="w-5 h-5" />
              <span>Find My Opportunities</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onSelectPersonaAndMatch(SAMPLE_PROFILES[0])}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold text-sm transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 text-indigo-600" />
              <span>Demo as Chipo (UNZA Student)</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-slate-100 max-w-4xl mx-auto text-xs text-slate-600 font-medium">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Zero Fake Opportunities</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Zambia & Pan-Africa Focus</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Instant AI Eligibility Check</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Tailored Cover Letters</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Problem & Product Promise Section */}
      <section className="grid md:grid-cols-2 gap-8 items-stretch">
        {/* The Problem */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">The Opportunity Discovery Crisis</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Students and young graduates across Zambia and Africa spend hundreds of hours browsing WhatsApp groups, Facebook posts, and disjointed portals for jobs, internships, fellowships, and grants.
          </p>
          <ul className="space-y-2 text-xs text-slate-600 pt-2">
            <li className="flex items-start space-x-2">
              <span className="text-rose-600 font-bold">•</span>
              <span><strong>Eligibility Mystery:</strong> Unclear requirements lead students to apply for opportunities they aren't eligible for, wasting valuable time.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-rose-600 font-bold">•</span>
              <span><strong>Generic Applications:</strong> Submitting uncustomized CVs and cover letters leads to rejection without actionable feedback.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-rose-600 font-bold">•</span>
              <span><strong>Missed Deadlines:</strong> Crucial funding and scholarships expire unnoticed.</span>
            </li>
          </ul>
        </div>

        {/* The Solution */}
        <div className="bg-white border border-indigo-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm relative overflow-hidden">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">The OpportunityOS Solution</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            OpportunityOS creates a structured bridge between student profiles and real-world opportunities. Gemini 3.6 acts as your personal career strategist.
          </p>
          <ul className="space-y-2 text-xs text-slate-700 pt-2">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>Precise Match Scores:</strong> Receive transparent 0-100 match ratings with explicit breakdowns of why you qualify and potential gaps to address.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>AI Application Suite:</strong> Instantly generate customized elevator pitches, CV bullet points, tailored cover letters, and essay question frameworks.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>Curated Regional Dataset:</strong> Hand-verified opportunities across Zambia, Southern Africa, and global remote programs.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Quick Demo Persona Switcher Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4" />
              <span>Instant Test Drive</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Select a Student Persona to Test AI Matching</h3>
            <p className="text-xs text-slate-500">Click any persona below to load their profile and run instant Gemini opportunity matching.</p>
          </div>
          <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 font-mono font-medium">
            4 Pre-built Personas
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SAMPLE_PROFILES.map((profile) => {
            const isSelected = currentProfile.id === profile.id;
            return (
              <div
                key={profile.id}
                onClick={() => onSelectPersonaAndMatch(profile)}
                className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-indigo-50/80 border-indigo-500 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{profile.fullName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                      {profile.country}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-indigo-600">{profile.universityOrStatus}</div>
                  <div className="text-xs text-slate-700 font-medium">{profile.fieldOfStudy}</div>
                  <div className="text-[11px] text-slate-500 line-clamp-2">{profile.bioSummary}</div>
                </div>

                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-500 font-mono">{profile.skills.length} skills listed</span>
                  <span className={`font-semibold flex items-center space-x-1 ${isSelected ? 'text-indigo-600 font-bold' : 'text-slate-600'}`}>
                    <span>{isSelected ? 'Selected' : 'Test Profile'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it Works Step-by-Step */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How OpportunityOS Works</h2>
          <p className="text-slate-500 text-sm">Four seamless steps from profile to submission</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 relative shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-base flex items-center justify-center">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">Fill Student Profile</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your country, university status, field of study, skills, and target opportunity types (or pick a preset).
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 relative shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-base flex items-center justify-center">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900">Gemini Match Analysis</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gemini 3.6 compares your profile against curated Zambian & African opportunities, calculating a match score (0-100) and eligibility breakdown.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 relative shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-base flex items-center justify-center">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900">Review Detailed Insights</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Examine specific strengths, eligibility risks, deadlines, and benefits before deciding where to invest your application energy.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 relative shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold text-base flex items-center justify-center">
              4
            </div>
            <h3 className="text-base font-bold text-slate-900">Prepare Application AI</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Generate tailored elevator pitches, CV bullet points, custom cover letters, and application essay frameworks in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Build with Gemini XPRIZE Statement */}
      <section className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
            <Award className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Build with Gemini XPRIZE Preserved Role</h3>
            <p className="text-xs text-slate-500">Clear, defensible AI work integrated into core workflow</p>
          </div>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Gemini performs core product work in OpportunityOS: performing structured multi-variable matching across non-standard eligibility text, identifying implicit skill gaps, and generating contextual application copy tailored to African student realities.
        </p>
      </section>
    </div>
  );
};
