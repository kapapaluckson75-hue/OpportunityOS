import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-100 text-slate-600 py-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span className="font-bold text-lg text-slate-900 font-sans">
                Opportunity<span className="text-indigo-600">OS</span>
              </span>
            </div>
            <p className="text-slate-600 max-w-md text-xs leading-relaxed">
              AI-powered opportunity discovery and application assistant empowering university students and early-career individuals in Zambia & Africa.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-slate-700">
            <div>
              <div className="font-bold text-slate-900 mb-2 uppercase text-[10px] tracking-wider">Focus Regions</div>
              <ul className="space-y-1 text-slate-600">
                <li>Zambia (Lusaka, Copperbelt, Southern)</li>
                <li>Southern Africa</li>
                <li>Sub-Saharan Africa</li>
                <li>Global Remote Programs</li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-slate-900 mb-2 uppercase text-[10px] tracking-wider">Opportunity Types</div>
              <ul className="space-y-1 text-slate-600">
                <li>Fellowships & Grants</li>
                <li>Scholarships & Master's</li>
                <li>FinTech & Tech Hackathons</li>
                <li>Student Internships & Gigs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center space-x-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for university students across Africa. Powered by Google Gemini 3.6.</span>
          </div>

          <div className="flex items-center space-x-4">
            <span>Build with Gemini XPRIZE Entry</span>
            <span>•</span>
            <span>Cloud Run Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
