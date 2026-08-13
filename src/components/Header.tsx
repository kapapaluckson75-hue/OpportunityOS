import React from 'react';
import { StudentProfile } from '../types';
import { SAMPLE_PROFILES } from '../data/sampleProfiles';
import { Sparkles, User, Search, FileText, Compass, CheckCircle2, Bot } from 'lucide-react';

interface HeaderProps {
  activeTab: 'landing' | 'dashboard' | 'profile' | 'assistant';
  setActiveTab: (tab: 'landing' | 'dashboard' | 'profile' | 'assistant') => void;
  currentProfile: StudentProfile;
  onSelectPresetProfile: (profile: StudentProfile) => void;
  hasGeminiKey: boolean;
  isAiAnalyzing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentProfile,
  onSelectPresetProfile,
  hasGeminiKey,
  isAiAnalyzing
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 text-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl tracking-tight text-slate-800 font-sans">
                  Opportunity<span className="text-indigo-600">OS</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100 tracking-wider">
                  Build with Gemini
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Find opportunities you're actually qualified for</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 cursor-pointer ${
                activeTab === 'landing'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Discover & Match</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Student Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('assistant')}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 cursor-pointer ${
                activeTab === 'assistant'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm shadow-indigo-100'
                  : 'text-indigo-600 bg-indigo-50/80 hover:bg-indigo-100 border border-indigo-100 font-semibold'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>AI Application Suite</span>
            </button>
          </nav>

          {/* Right Action Bar & Demo Persona Selector */}
          <div className="flex items-center space-x-3">
            {/* Persona Preset Selector Dropdown */}
            <div className="relative group">
              <div className="flex items-center space-x-2 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 cursor-pointer hover:bg-slate-200/70 transition">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium text-slate-500 hidden lg:inline">Active Persona:</span>
                <span className="font-semibold text-indigo-700 max-w-[120px] sm:max-w-[160px] truncate">
                  {currentProfile.fullName.split(' ')[0]} ({currentProfile.universityOrStatus.split(' ')[0]})
                </span>
              </div>

              {/* Hover/Focus Dropdown */}
              <div className="absolute right-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-xl p-2 hidden group-hover:block transition-all z-50">
                <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider border-b border-slate-100 mb-1">
                  Switch Demo Persona
                </div>
                {SAMPLE_PROFILES.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectPresetProfile(p)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition cursor-pointer ${
                      currentProfile.id === p.id
                        ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-800">{p.fullName}</div>
                      <div className="text-[10px] text-slate-500">{p.universityOrStatus} ({p.country})</div>
                    </div>
                    {currentProfile.id === p.id && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Status Badge */}
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] text-slate-600">
              <Bot className={`w-3.5 h-3.5 ${isAiAnalyzing ? 'text-amber-500 animate-spin' : 'text-indigo-600'}`} />
              <span className="font-medium">{isAiAnalyzing ? 'AI Analyzing...' : hasGeminiKey ? 'Gemini 3.6 Ready' : 'Gemini Active'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation bar */}
      <div className="md:hidden flex items-center justify-around bg-white border-t border-slate-200 py-2 px-2 text-xs">
        <button
          onClick={() => setActiveTab('landing')}
          className={`flex flex-col items-center py-1 px-2 rounded cursor-pointer ${activeTab === 'landing' ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}
        >
          <Compass className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center py-1 px-2 rounded cursor-pointer ${activeTab === 'dashboard' ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}
        >
          <Search className="w-4 h-4 mb-0.5" />
          <span>Discover</span>
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center py-1 px-2 rounded cursor-pointer ${activeTab === 'profile' ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}
        >
          <User className="w-4 h-4 mb-0.5" />
          <span>Profile</span>
        </button>
        <button
          onClick={() => setActiveTab('assistant')}
          className={`flex flex-col items-center py-1 px-2 rounded cursor-pointer ${activeTab === 'assistant' ? 'text-indigo-600 font-bold' : 'text-slate-500'}`}
        >
          <FileText className="w-4 h-4 mb-0.5" />
          <span>AI Prep</span>
        </button>
      </div>
    </header>
  );
};
