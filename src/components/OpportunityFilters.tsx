import React from 'react';
import { OpportunityType } from '../types';
import { Search, Filter, Sparkles, RefreshCw, Layers } from 'lucide-react';

interface OpportunityFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  paidOnly: boolean;
  setPaidOnly: (paid: boolean) => void;
  sortBy: 'matchScore' | 'deadline' | 'title';
  setSortBy: (sort: 'matchScore' | 'deadline' | 'title') => void;
  onRunBatchAiMatch: () => void;
  isAiAnalyzing: boolean;
  totalCount: number;
  filteredCount: number;
}

const TYPE_OPTIONS = [
  'All Types',
  'Job / Paid Gig',
  'Internship',
  'Fellowship',
  'Grant / Seed Fund',
  'Scholarship',
  'Hackathon',
  'Competition',
  'Accelerator / Incubator'
];

const REGION_OPTIONS = [
  'All Regions',
  'Zambia',
  'Southern Africa',
  'Sub-Saharan Africa',
  'Global / Remote'
];

export const OpportunityFilters: React.FC<OpportunityFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  selectedRegion,
  setSelectedRegion,
  paidOnly,
  setPaidOnly,
  sortBy,
  setSortBy,
  onRunBatchAiMatch,
  isAiAnalyzing,
  totalCount,
  filteredCount
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 text-slate-800 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-100 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white transition"
            placeholder="Search opportunities by title, organization, tags (e.g. Lusaka, Python, Grant)..."
          />
        </div>

        {/* AI Match Re-run Button */}
        <button
          onClick={onRunBatchAiMatch}
          disabled={isAiAnalyzing}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition flex items-center justify-center space-x-2 shrink-0 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className={`w-3.5 h-3.5 ${isAiAnalyzing ? 'animate-spin text-amber-300' : 'text-white'}`} />
          <span>{isAiAnalyzing ? 'Gemini Calculating Matches...' : 'Recalculate AI Match Scores'}</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {/* Type Dropdown */}
        <div>
          <label className="block text-slate-500 font-semibold mb-1">Opportunity Type</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white font-medium"
          >
            {TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Region Dropdown */}
        <div>
          <label className="block text-slate-500 font-semibold mb-1">Target Region</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white font-medium"
          >
            {REGION_OPTIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div>
          <label className="block text-slate-500 font-semibold mb-1">Sort Results By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-indigo-700 focus:outline-none focus:border-indigo-500 focus:bg-white font-bold"
          >
            <option value="matchScore">Highest AI Match Score</option>
            <option value="deadline">Earliest Deadline</option>
            <option value="title">Opportunity Name</option>
          </select>
        </div>

        {/* Toggle Paid Only */}
        <div className="flex items-end">
          <label className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 flex items-center justify-between cursor-pointer hover:border-slate-300 transition">
            <span className="font-semibold text-slate-700">Paid/Funded Only</span>
            <input
              type="checkbox"
              checked={paidOnly}
              onChange={(e) => setPaidOnly(e.target.checked)}
              className="accent-indigo-600 w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Results Count Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
        <div className="flex items-center space-x-2">
          <Layers className="w-3.5 h-3.5 text-indigo-600" />
          <span>
            Showing <strong className="text-slate-800">{filteredCount}</strong> of <strong className="text-slate-800">{totalCount}</strong> curated opportunities
          </span>
        </div>

        <div className="text-[11px] text-indigo-600 font-semibold font-mono">
          Curated Demo Opportunities Dataset
        </div>
      </div>
    </div>
  );
};
