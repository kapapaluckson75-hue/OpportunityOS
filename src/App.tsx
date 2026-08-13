import React, { useState, useEffect, useMemo } from 'react';
import { StudentProfile, Opportunity, MatchAnalysis } from './types';
import { SAMPLE_PROFILES } from './data/sampleProfiles';
import { SAMPLE_OPPORTUNITIES } from './data/sampleOpportunities';
import { matchOpportunitiesWithAI, checkServerHealth } from './services/api';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { StudentProfileForm } from './components/StudentProfileForm';
import { OpportunityCard } from './components/OpportunityCard';
import { OpportunityDetailModal } from './components/OpportunityDetailModal';
import { ApplicationAssistantView } from './components/ApplicationAssistantView';
import { OpportunityFilters } from './components/OpportunityFilters';
import { Footer } from './components/Footer';
import { Sparkles, Bot, AlertCircle, Compass, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'landing' | 'dashboard' | 'profile' | 'assistant'>('landing');
  const [currentProfile, setCurrentProfile] = useState<StudentProfile>(SAMPLE_PROFILES[0]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(SAMPLE_OPPORTUNITIES);
  const [matchResults, setMatchResults] = useState<Record<string, MatchAnalysis>>({});
  const [selectedModalOpp, setSelectedModalOpp] = useState<Opportunity | null>(null);
  const [selectedAssistantOpp, setSelectedAssistantOpp] = useState<Opportunity>(SAMPLE_OPPORTUNITIES[0]);

  const [isAiAnalyzing, setIsAiAnalyzing] = useState<boolean>(false);
  const [hasGeminiKey, setHasGeminiKey] = useState<boolean>(true);
  const [isFallbackMode, setIsFallbackMode] = useState<boolean>(false);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [paidOnly, setPaidOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'matchScore' | 'deadline' | 'title'>('matchScore');

  // Check server health on launch
  useEffect(() => {
    checkServerHealth().then((res) => {
      setHasGeminiKey(res.hasGeminiApiKey);
    });
  }, []);

  // Run AI matching whenever student profile or opportunities change
  useEffect(() => {
    runBatchAiMatch(currentProfile, opportunities);
  }, [currentProfile.id]);

  const runBatchAiMatch = async (profileToMatch: StudentProfile, oppList: Opportunity[]) => {
    setIsAiAnalyzing(true);
    try {
      const response = await matchOpportunitiesWithAI(profileToMatch, oppList);
      const resultMap: Record<string, MatchAnalysis> = {};
      response.matches.forEach((m) => {
        resultMap[m.opportunityId] = m;
      });
      setMatchResults(resultMap);
      setIsFallbackMode(response.isFallback);
    } catch (error) {
      console.error('[App] Failed to match opportunities:', error);
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const handleSelectPresetProfile = (preset: StudentProfile) => {
    setCurrentProfile(preset);
    runBatchAiMatch(preset, opportunities);
  };

  const handleSaveProfile = (updated: StudentProfile) => {
    setCurrentProfile(updated);
    runBatchAiMatch(updated, opportunities);
  };

  const handlePrepareApplication = (opp: Opportunity) => {
    setSelectedAssistantOpp(opp);
    setActiveTab('assistant');
  };

  // Filter & Sort Logic
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      // Search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesTitle = opp.title.toLowerCase().includes(term);
        const matchesOrg = opp.organization.toLowerCase().includes(term);
        const matchesOverview = opp.overview.toLowerCase().includes(term);
        const matchesTags = opp.tags.some((t) => t.toLowerCase().includes(term));
        if (!matchesTitle && !matchesOrg && !matchesOverview && !matchesTags) {
          return false;
        }
      }

      // Opportunity Type
      if (selectedType !== 'All Types' && opp.type !== selectedType) {
        return false;
      }

      // Region
      if (selectedRegion !== 'All Regions' && opp.region !== selectedRegion) {
        return false;
      }

      // Paid only
      if (paidOnly && !opp.isPaid) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'matchScore') {
        const scoreA = matchResults[a.id]?.matchScore ?? 0;
        const scoreB = matchResults[b.id]?.matchScore ?? 0;
        return scoreB - scoreA;
      }
      if (sortBy === 'deadline') {
        return a.deadline.localeCompare(b.deadline);
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [opportunities, matchResults, searchTerm, selectedType, selectedRegion, paidOnly, sortBy]);

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentProfile={currentProfile}
        onSelectPresetProfile={handleSelectPresetProfile}
        hasGeminiKey={hasGeminiKey}
        isAiAnalyzing={isAiAnalyzing}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Banner notification if calculating or fallback */}
        {isFallbackMode && (
          <div className="mb-6 p-3.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs flex items-center justify-between shadow-sm">
            <div className="flex items-center space-x-2">
              <Bot className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                Gemini AI matching system active for student <strong className="text-indigo-950">{currentProfile.fullName}</strong>.
              </span>
            </div>
            <span className="text-[10px] text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              Live AI Match Engine
            </span>
          </div>
        )}

        {/* Tab 1: Landing Page */}
        {activeTab === 'landing' && (
          <LandingPage
            onStartMatching={() => setActiveTab('dashboard')}
            onSelectPersonaAndMatch={(p) => {
              handleSelectPresetProfile(p);
              setActiveTab('dashboard');
            }}
            currentProfile={currentProfile}
          />
        )}

        {/* Tab 2: Discover & Match Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Dashboard Header */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-slate-900 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Gemini AI Opportunity Discovery Engine</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Recommended Opportunities</h1>
                <p className="text-xs sm:text-sm text-slate-600">
                  Showing opportunities evaluated specifically for <strong className="text-indigo-600 font-semibold">{currentProfile.fullName}</strong> ({currentProfile.universityOrStatus}, {currentProfile.country}).
                </p>
              </div>

              <button
                onClick={() => setActiveTab('profile')}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition flex items-center justify-center space-x-2 shrink-0 cursor-pointer"
              >
                <span>Edit Profile or Switch Persona</span>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </button>
            </div>

            {/* Filters Bar */}
            <OpportunityFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedRegion={selectedRegion}
              setSelectedRegion={setSelectedRegion}
              paidOnly={paidOnly}
              setPaidOnly={setPaidOnly}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onRunBatchAiMatch={() => runBatchAiMatch(currentProfile, opportunities)}
              isAiAnalyzing={isAiAnalyzing}
              totalCount={opportunities.length}
              filteredCount={filteredOpportunities.length}
            />

            {/* Opportunity Cards Grid */}
            {filteredOpportunities.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpportunities.map((opp) => (
                  <OpportunityCard
                    key={opp.id}
                    opportunity={opp}
                    match={matchResults[opp.id]}
                    onViewDetails={(selected) => setSelectedModalOpp(selected)}
                    onPrepareApplication={handlePrepareApplication}
                    isAiAnalyzing={isAiAnalyzing}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-sm">
                <Compass className="w-12 h-12 text-slate-400 mx-auto" />
                <h3 className="text-lg font-bold text-slate-800">No matching opportunities found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try adjusting your search terms or filters (e.g., selecting 'All Types' or clearing the search bar).
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('All Types');
                    setSelectedRegion('All Regions');
                    setPaidOnly(false);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Student Profile */}
        {activeTab === 'profile' && (
          <StudentProfileForm
            profile={currentProfile}
            onSaveProfile={handleSaveProfile}
            onSelectPresetProfile={handleSelectPresetProfile}
            isAiAnalyzing={isAiAnalyzing}
          />
        )}

        {/* Tab 4: AI Application Suite */}
        {activeTab === 'assistant' && (
          <ApplicationAssistantView
            studentProfile={currentProfile}
            selectedOpportunity={selectedAssistantOpp}
            allOpportunities={opportunities}
            onSelectOpportunity={(opp) => setSelectedAssistantOpp(opp)}
            onBackToDashboard={() => setActiveTab('dashboard')}
          />
        )}
      </main>

      {/* Opportunity Detail Modal */}
      <OpportunityDetailModal
        opportunity={selectedModalOpp}
        match={selectedModalOpp ? matchResults[selectedModalOpp.id] : undefined}
        studentProfile={currentProfile}
        onClose={() => setSelectedModalOpp(null)}
        onPrepareApplication={handlePrepareApplication}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
