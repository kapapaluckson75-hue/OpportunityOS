import React, { useState, useEffect } from 'react';
import { StudentProfile, Opportunity, AssistanceMode } from '../types';
import { generateApplicationAssistanceAI } from '../services/api';
import { Sparkles, FileText, Copy, Check, Download, Send, Bot, RefreshCw, Compass, ArrowLeft, Lightbulb, Zap, UserCheck } from 'lucide-react';

interface ApplicationAssistantViewProps {
  studentProfile: StudentProfile;
  selectedOpportunity: Opportunity;
  allOpportunities: Opportunity[];
  onSelectOpportunity: (opp: Opportunity) => void;
  onBackToDashboard: () => void;
}

export const ApplicationAssistantView: React.FC<ApplicationAssistantViewProps> = ({
  studentProfile,
  selectedOpportunity,
  allOpportunities,
  onSelectOpportunity,
  onBackToDashboard,
}) => {
  const [activeMode, setActiveMode] = useState<AssistanceMode>('strategy');
  const [assistanceResults, setAssistanceResults] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [customQuestionInput, setCustomQuestionInput] = useState<string>(
    'Why are you interested in this opportunity and how does your background make you a strong candidate?'
  );
  const [copiedMode, setCopiedMode] = useState<string | null>(null);

  // Trigger AI generation when activeMode or selectedOpportunity changes
  useEffect(() => {
    const key = `${selectedOpportunity.id}-${activeMode}`;
    if (!assistanceResults[key]) {
      fetchAssistance(activeMode);
    }
  }, [selectedOpportunity.id, activeMode]);

  const fetchAssistance = async (modeToFetch: AssistanceMode) => {
    setIsGenerating(true);
    try {
      const response = await generateApplicationAssistanceAI({
        studentProfile,
        opportunity: selectedOpportunity,
        mode: modeToFetch,
        customQuestionPrompt: modeToFetch === 'question_answer' ? customQuestionInput : undefined,
      });

      const key = `${selectedOpportunity.id}-${modeToFetch}`;
      setAssistanceResults((prev) => ({ ...prev, [key]: response.content }));
    } catch (error) {
      console.error('Failed to fetch AI assistance:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const currentKey = `${selectedOpportunity.id}-${activeMode}`;
  const currentContent = assistanceResults[currentKey] || '';

  const handleCopy = (text: string, modeName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMode(modeName);
    setTimeout(() => setCopiedMode(null), 2500);
  };

  const handleDownload = (text: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Banner & Opportunity Selector */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <button
            onClick={onBackToDashboard}
            className="self-start px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-600" />
            <span>Back to Opportunities</span>
          </button>

          {/* Opportunity Switcher Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500 font-semibold">Preparing for:</span>
            <select
              value={selectedOpportunity.id}
              onChange={(e) => {
                const found = allOpportunities.find((o) => o.id === e.target.value);
                if (found) onSelectOpportunity(found);
              }}
              className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-indigo-700 font-bold focus:outline-none focus:border-indigo-500 focus:bg-white max-w-xs sm:max-w-sm truncate"
            >
              {allOpportunities.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.title} ({o.organization})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Target Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>AI Application Suite • Gemini Powered</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-800">{selectedOpportunity.title}</h1>
            <p className="text-xs text-slate-600 mt-1">
              Target Candidate: <strong className="text-indigo-600 font-semibold">{studentProfile.fullName}</strong> ({studentProfile.universityOrStatus})
            </p>
          </div>

          <button
            onClick={() => fetchAssistance(activeMode)}
            disabled={isGenerating}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-semibold transition flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin text-amber-500' : 'text-indigo-600'}`} />
            <span>Regenerate Current AI Output</span>
          </button>
        </div>
      </div>

      {/* 5 AI Tools Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
        <button
          onClick={() => setActiveMode('strategy')}
          className={`p-3 rounded-xl border text-center font-bold transition flex flex-col items-center justify-center space-y-1 cursor-pointer ${
            activeMode === 'strategy'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>1. Strategy</span>
        </button>

        <button
          onClick={() => setActiveMode('pitch')}
          className={`p-3 rounded-xl border text-center font-bold transition flex flex-col items-center justify-center space-y-1 cursor-pointer ${
            activeMode === 'pitch'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>2. Tailored Pitch</span>
        </button>

        <button
          onClick={() => setActiveMode('cv_suggestions')}
          className={`p-3 rounded-xl border text-center font-bold transition flex flex-col items-center justify-center space-y-1 cursor-pointer ${
            activeMode === 'cv_suggestions'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>3. CV Points</span>
        </button>

        <button
          onClick={() => setActiveMode('cover_letter')}
          className={`p-3 rounded-xl border text-center font-bold transition flex flex-col items-center justify-center space-y-1 cursor-pointer ${
            activeMode === 'cover_letter'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>4. Cover Letter</span>
        </button>

        <button
          onClick={() => setActiveMode('question_answer')}
          className={`p-3 rounded-xl border text-center font-bold transition flex flex-col items-center justify-center space-y-1 cursor-pointer col-span-2 sm:col-span-1 ${
            activeMode === 'question_answer'
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>5. Essay Q&A</span>
        </button>
      </div>

      {/* Essay Question Custom Input Bar (Only in Essay Q&A mode) */}
      {activeMode === 'question_answer' && (
        <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-3 text-slate-800 shadow-sm">
          <label className="block text-xs font-bold text-indigo-700">
            Customize Application Question Prompt:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customQuestionInput}
              onChange={(e) => setCustomQuestionInput(e.target.value)}
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
              placeholder="Type any application essay prompt (e.g. Why do you want to join this program?)"
            />
            <button
              onClick={() => fetchAssistance('question_answer')}
              disabled={isGenerating}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Generate Framework</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Render Box */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-slate-800 shadow-sm relative min-h-[350px]">
        {/* Loading Overlay */}
        {isGenerating && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-20 space-y-3">
            <Bot className="w-8 h-8 text-indigo-600 animate-spin" />
            <div className="text-sm font-bold text-slate-800">Gemini 3.6 is generating your application package...</div>
            <div className="text-xs text-slate-500">Analyzing student profile & opportunity criteria</div>
          </div>
        )}

        {/* Action Toolbar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>
              {activeMode === 'strategy' && 'Application Strategy & Roadmap'}
              {activeMode === 'pitch' && 'Personalized Elevator Pitch & Bio'}
              {activeMode === 'cv_suggestions' && 'CV Bullet Transformation Suggestions'}
              {activeMode === 'cover_letter' && 'Tailored Cover Letter Draft'}
              {activeMode === 'question_answer' && 'Application Essay Answer Framework'}
            </span>
          </div>

          {currentContent && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleCopy(currentContent, activeMode)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-medium transition flex items-center space-x-1.5 cursor-pointer"
              >
                {copiedMode === activeMode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-indigo-600 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleDownload(currentContent, `OpportunityOS_${activeMode}_${studentProfile.fullName.replace(/\s+/g, '_')}.txt`)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-medium transition flex items-center space-x-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export TXT</span>
              </button>
            </div>
          )}
        </div>

        {/* Render Generated AI Text with formatting */}
        {currentContent ? (
          <div className="prose max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans text-slate-800 bg-slate-50 p-6 rounded-xl border border-slate-200">
            {currentContent}
          </div>
        ) : (
          !isGenerating && (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Bot className="w-10 h-10 mx-auto text-slate-400" />
              <div className="text-sm text-slate-600">Click "Regenerate" above to fetch Gemini application assistance.</div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
