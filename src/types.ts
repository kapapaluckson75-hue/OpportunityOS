export type OpportunityType = 
  | 'Job / Paid Gig'
  | 'Internship'
  | 'Fellowship'
  | 'Grant / Seed Fund'
  | 'Scholarship'
  | 'Hackathon'
  | 'Competition'
  | 'Accelerator / Incubator';

export type ExperienceLevel = 
  | 'High School Senior / High School Grad'
  | 'Early Undergraduate (Year 1-2)'
  | 'Late Undergraduate (Year 3-4)'
  | 'Recent Graduate (< 2 Years)'
  | 'Postgraduate / Master\'s Student'
  | 'Self-Taught / Early Career';

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  country: string;
  universityOrStatus: string;
  fieldOfStudy: string;
  experienceLevel: ExperienceLevel;
  skills: string[];
  desiredOpportunityTypes: OpportunityType[];
  interests: string[];
  bioSummary: string;
  locationCity?: string;
  gpaOrAcademicNote?: string;
}

export interface EligibilityCriterion {
  rule: string;
  isMandatory: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  logoUrl?: string;
  type: OpportunityType;
  deadline: string; // ISO date string YYYY-MM-DD or readable
  deadlineDisplay: string;
  compensation: string; // e.g. "$5,000 Prize + Mentorship", "Paid Stipend (ZMW 4,500/mo)", "Fully Funded"
  isPaid: boolean;
  region: 'Zambia' | 'Southern Africa' | 'Sub-Saharan Africa' | 'Global / Remote';
  location: string;
  eligibilitySummary: string;
  eligibilityCriteria: EligibilityCriterion[];
  overview: string;
  responsibilitiesOrBenefits: string[];
  applicationUrl: string;
  tags: string[];
  isDemoSample: boolean;
  featured?: boolean;
}

export interface MatchAnalysis {
  opportunityId: string;
  matchScore: number; // 0 to 100
  matchTier: 'Top Fit' | 'Good Fit' | 'Moderate Fit' | 'High Gap';
  whyItMatches: string[];
  strengths: string[];
  gapsOrRisks: string[];
  eligibilityStatus: 'Eligible' | 'Likely Eligible' | 'Potential Gap' | 'Ineligible';
  summaryInsight: string;
}

export type AssistanceMode = 'strategy' | 'pitch' | 'cv_suggestions' | 'cover_letter' | 'question_answer';

export interface ApplicationAssistanceRequest {
  studentProfile: StudentProfile;
  opportunity: Opportunity;
  mode: AssistanceMode;
  customQuestionPrompt?: string;
}

export interface ApplicationAssistanceResponse {
  mode: AssistanceMode;
  content: string;
  strategyHighlights?: {
    positioningAngle: string;
    keyThemesToEmphasize: string[];
    actionPlan: string[];
  };
  cvBulletSuggestions?: Array<{
    originalOrArea: string;
    suggestedBullet: string;
    whyItWorks: string;
  }>;
  suggestedAnswer?: {
    questionPrompt: string;
    answerDraft: string;
    tips: string[];
  };
}
