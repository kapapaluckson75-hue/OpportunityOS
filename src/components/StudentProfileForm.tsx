import React, { useState } from 'react';
import { StudentProfile, OpportunityType, ExperienceLevel } from '../types';
import { SAMPLE_PROFILES } from '../data/sampleProfiles';
import { User, Sparkles, Plus, X, Save, RotateCcw, Check } from 'lucide-react';

interface StudentProfileFormProps {
  profile: StudentProfile;
  onSaveProfile: (updatedProfile: StudentProfile) => void;
  onSelectPresetProfile: (preset: StudentProfile) => void;
  isAiAnalyzing: boolean;
}

const OPPORTUNITY_TYPE_OPTIONS: OpportunityType[] = [
  'Job / Paid Gig',
  'Internship',
  'Fellowship',
  'Grant / Seed Fund',
  'Scholarship',
  'Hackathon',
  'Competition',
  'Accelerator / Incubator'
];

const EXPERIENCE_LEVEL_OPTIONS: ExperienceLevel[] = [
  'High School Senior / High School Grad',
  'Early Undergraduate (Year 1-2)',
  'Late Undergraduate (Year 3-4)',
  'Recent Graduate (< 2 Years)',
  'Postgraduate / Master\'s Student',
  'Self-Taught / Early Career'
];

const COMMON_SKILL_SUGGESTIONS = [
  'Python', 'React', 'JavaScript', 'SQL', 'Data Analysis', 'Grant Writing',
  'Financial Modeling', 'Project Management', 'Public Speaking', 'Git',
  'Tailwind CSS', 'UI/UX Design', 'Market Research', 'IoT Sensors', 'Figma'
];

const INTEREST_OPTIONS = [
  'FinTech', 'AgriTech', 'Clean Energy', 'Healthcare', 'AI & Tech',
  'EdTech', 'Social Impact', 'Business & Finance', 'Creative Media', 'Open Source'
];

export const StudentProfileForm: React.FC<StudentProfileFormProps> = ({
  profile,
  onSaveProfile,
  onSelectPresetProfile,
  isAiAnalyzing
}) => {
  const [formData, setFormData] = useState<StudentProfile>({ ...profile });
  const [newSkillInput, setNewSkillInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleOpportunityType = (type: OpportunityType) => {
    setFormData((prev) => {
      const exists = prev.desiredOpportunityTypes.includes(type);
      const updated = exists
        ? prev.desiredOpportunityTypes.filter((t) => t !== type)
        : [...prev.desiredOpportunityTypes, type];
      return { ...prev, desiredOpportunityTypes: updated };
    });
  };

  const handleToggleInterest = (interest: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);
      const updated = exists
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || formData.skills.includes(trimmed)) return;
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    setNewSkillInput('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
            <User className="w-4 h-4 text-indigo-600" />
            <span>Student Profile Builder</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800">Your Career & Academic Profile</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            OpportunityOS uses these exact details to run Gemini AI eligibility matching and generate tailored cover letters and pitches.
          </p>
        </div>

        {/* Quick Presets Picker */}
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl space-y-2 shrink-0">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Load Demo Preset:</div>
          <div className="flex flex-wrap gap-1.5">
            {SAMPLE_PROFILES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setFormData(p);
                  onSelectPresetProfile(p);
                }}
                className={`px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer ${
                  formData.id === p.id
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {p.fullName.split(' ')[0]} ({p.universityOrStatus.split(' ')[0]})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-8 text-slate-800 shadow-sm">
        {/* Personal & Academic Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-indigo-600 border-b border-slate-100 pb-2 flex items-center space-x-2">
            <span>1. Personal & University Status</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleTextChange}
                required
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                placeholder="e.g. Chipo Mwansa"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleTextChange}
                required
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                placeholder="e.g. chipo@student.unza.zm"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleTextChange}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
              >
                <option value="Zambia">Zambia</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Kenya">Kenya</option>
                <option value="South Africa">South Africa</option>
                <option value="Ghana">Ghana</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Uganda">Uganda</option>
                <option value="Zimbabwe">Zimbabwe</option>
                <option value="Malawi">Malawi</option>
                <option value="Other / Global">Other / Global</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">City / Location</label>
              <input
                type="text"
                name="locationCity"
                value={formData.locationCity || ''}
                onChange={handleTextChange}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                placeholder="e.g. Lusaka / Kitwe / Ndola"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">University / Student Status *</label>
              <input
                type="text"
                name="universityOrStatus"
                value={formData.universityOrStatus}
                onChange={handleTextChange}
                required
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                placeholder="e.g. University of Zambia (UNZA)"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Field of Study / Major *</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleTextChange}
                required
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                placeholder="e.g. Computer Science / Agricultural Sciences"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Experience Level *</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleTextChange}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
              >
                {EXPERIENCE_LEVEL_OPTIONS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">GPA / Academic Standing (Optional)</label>
              <input
                type="text"
                name="gpaOrAcademicNote"
                value={formData.gpaOrAcademicNote || ''}
                onChange={handleTextChange}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                placeholder="e.g. Distinction / Merit / Upper Second"
              />
            </div>
          </div>
        </div>

        {/* Skills Management */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-indigo-600 border-b border-slate-100 pb-2">
            2. Skills & Technical Capabilities
          </h2>

          <div className="space-y-3 text-xs">
            {/* Active Skills tags */}
            <div className="flex flex-wrap gap-2 min-h-[40px] p-3 bg-slate-50 border border-slate-200 rounded-xl">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-600 transition cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              {formData.skills.length === 0 && (
                <span className="text-slate-400 italic">No skills added yet. Add skills below.</span>
              )}
            </div>

            {/* Custom Skill Input */}
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSkillInput}
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(newSkillInput);
                  }
                }}
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                placeholder="Type a skill (e.g. Python, Grant Writing) and hit Enter or click Add"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(newSkillInput)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl font-semibold transition cursor-pointer flex items-center space-x-1"
              >
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>Add</span>
              </button>
            </div>

            {/* Quick Skill Suggestions */}
            <div>
              <div className="text-[11px] text-slate-500 font-semibold mb-1">Click to add common skills:</div>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_SKILL_SUGGESTIONS.filter((s) => !formData.skills.includes(s)).map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => handleAddSkill(suggestion)}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-indigo-700 border border-slate-200 transition cursor-pointer font-medium"
                  >
                    + {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desired Opportunity Types & Interests */}
        <div className="grid sm:grid-cols-2 gap-6 space-y-0">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-indigo-600 border-b border-slate-100 pb-2">
              3. Target Opportunity Types
            </h2>
            <p className="text-xs text-slate-500">Select all that you are actively seeking:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {OPPORTUNITY_TYPE_OPTIONS.map((type) => {
                const isSelected = formData.desiredOpportunityTypes.includes(type);
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleToggleOpportunityType(type)}
                    className={`p-2.5 rounded-xl border text-left font-medium transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold'
                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className="truncate">{type}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold text-indigo-600 border-b border-slate-100 pb-2">
              4. Sector Interests
            </h2>
            <p className="text-xs text-slate-500">Choose domains you are interested in:</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {INTEREST_OPTIONS.map((interest) => {
                const isSelected = formData.interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleToggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold'
                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Short Bio / Achievements */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-indigo-600 border-b border-slate-100 pb-2">
            5. Short Bio / Project Achievements Summary
          </h2>
          <p className="text-xs text-slate-500">
            Provide 2-4 sentences describing your current projects, passions, or goals. Gemini uses this for personalized pitch and cover letter drafting.
          </p>
          <textarea
            name="bioSummary"
            rows={4}
            value={formData.bioSummary}
            onChange={handleTextChange}
            className="w-full bg-slate-100 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
            placeholder="e.g. Final-year Computer Science student at UNZA building mobile financial apps. Won 1st place in regional hackathon."
          />
        </div>

        {/* Submit / Save Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Saving will automatically re-run Gemini AI opportunity matching!</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {savedSuccess && (
              <span className="text-xs font-bold text-indigo-600 flex items-center space-x-1 animate-fade-in">
                <Check className="w-4 h-4 text-indigo-600" />
                <span>Profile Saved & Matches Updated!</span>
              </span>
            )}

            <button
              type="submit"
              disabled={isAiAnalyzing}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-100 transition flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isAiAnalyzing ? 'Analyzing with AI...' : 'Save Profile & Run AI Match'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
