import { StudentProfile, Opportunity, MatchAnalysis, ApplicationAssistanceRequest, ApplicationAssistanceResponse } from '../types';

export async function checkServerHealth(): Promise<{ status: string; hasGeminiApiKey: boolean }> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return { status: 'offline', hasGeminiApiKey: false };
    return await res.json();
  } catch (error) {
    return { status: 'offline', hasGeminiApiKey: false };
  }
}

export async function matchOpportunitiesWithAI(
  studentProfile: StudentProfile,
  opportunities: Opportunity[]
): Promise<{ matches: MatchAnalysis[]; isFallback: boolean }> {
  try {
    const res = await fetch('/api/gemini/match-opportunities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentProfile, opportunities }),
    });

    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }

    const data = await res.json();
    return { matches: data.matches || [], isFallback: Boolean(data.isFallback) };
  } catch (error) {
    console.warn('[API Client] Server match call failed, calculating local fallback match.', error);
    const matches = opportunities.map((opp) => calculateLocalFallbackMatch(studentProfile, opp));
    return { matches, isFallback: true };
  }
}

export async function generateApplicationAssistanceAI(
  request: ApplicationAssistanceRequest
): Promise<{ content: string; isFallback: boolean }> {
  try {
    const res = await fetch('/api/gemini/application-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      throw new Error(`Server returned status ${res.status}`);
    }

    const data = await res.json();
    return { content: data.result || '', isFallback: Boolean(data.isFallback) };
  } catch (error) {
    console.warn('[API Client] Server application assistant call failed, using local template.', error);
    return {
      content: getLocalFallbackAssistance(request.studentProfile, request.opportunity, request.mode, request.customQuestionPrompt),
      isFallback: true,
    };
  }
}

function calculateLocalFallbackMatch(student: StudentProfile, opp: Opportunity): MatchAnalysis {
  let score = 50;
  const whyItMatches: string[] = [];
  const strengths: string[] = [];
  const gapsOrRisks: string[] = [];

  if (student.desiredOpportunityTypes.includes(opp.type)) {
    score += 20;
    whyItMatches.push(`Directly matches your target opportunity type: ${opp.type}`);
  }

  const matchedSkills = student.skills.filter((skill) =>
    opp.overview.toLowerCase().includes(skill.toLowerCase()) ||
    opp.tags.some((tag) => tag.toLowerCase().includes(skill.toLowerCase())) ||
    opp.title.toLowerCase().includes(skill.toLowerCase())
  );

  if (matchedSkills.length > 0) {
    score += Math.min(matchedSkills.length * 9, 25);
    strengths.push(`Your skills in ${matchedSkills.join(', ')} align strongly with this project.`);
    whyItMatches.push(`Matched required skillsets (${matchedSkills.join(', ')})`);
  } else {
    gapsOrRisks.push(`Make sure to highlight transferable technical skills in your application.`);
  }

  if (opp.region === 'Zambia' && student.country === 'Zambia') {
    score += 15;
    whyItMatches.push(`Zambian local residency match.`);
  } else if (opp.region === 'Sub-Saharan Africa' || opp.region === 'Southern Africa') {
    score += 10;
    whyItMatches.push(`Open to applicants in ${opp.region}.`);
  }

  const finalScore = Math.min(Math.max(score, 38), 98);
  let matchTier: 'Top Fit' | 'Good Fit' | 'Moderate Fit' | 'High Gap' = 'Good Fit';
  if (finalScore >= 85) matchTier = 'Top Fit';
  else if (finalScore >= 68) matchTier = 'Good Fit';
  else if (finalScore >= 50) matchTier = 'Moderate Fit';
  else matchTier = 'High Gap';

  return {
    opportunityId: opp.id,
    matchScore: finalScore,
    matchTier,
    whyItMatches: whyItMatches.length > 0 ? whyItMatches : [`Alignment with your background in ${student.fieldOfStudy}.`],
    strengths: strengths.length > 0 ? strengths : [`Academic foundation at ${student.universityOrStatus}.`],
    gapsOrRisks: gapsOrRisks.length > 0 ? gapsOrRisks : ['Ensure you highlight practical project outcomes.'],
    eligibilityStatus: finalScore >= 65 ? 'Eligible' : 'Likely Eligible',
    summaryInsight: `High value opportunity for ${student.fullName}. Highlight project impact in ${student.country}.`,
  };
}

function getLocalFallbackAssistance(student: StudentProfile, opp: Opportunity, mode: string, customQuestion?: string): string {
  if (mode === 'strategy') {
    return `### Strategic Application Plan for ${student.fullName}
**Opportunity:** ${opp.title} (${opp.organization})

#### 1. Core Positioning Angle
Position yourself as an ambitious student at **${student.universityOrStatus}** bridging academic rigor in **${student.fieldOfStudy}** with practical execution in **${student.skills.slice(0, 3).join(', ')}**.

#### 2. Key Themes
- **Local African Context:** Emphasize how your projects address real needs in ${student.country}.
- **Technical Rigor:** Showcase coursework or independent tools built with ${student.skills[0] || 'core tools'}.
- **Community Impact:** Highlight leadership in student groups or peer mentorship.

#### 3. Immediate Action Plan
1. Tailor your resume header to align with ${opp.organization}'s mission.
2. Select 2 portfolio projects demonstrating measurable results.
3. Review submission guidelines carefully for deadline ${opp.deadlineDisplay}.
`;
  }

  if (mode === 'pitch') {
    return `### Tailored 60-Second Elevator Pitch
"Hello, my name is ${student.fullName}, studying ${student.fieldOfStudy} at ${student.universityOrStatus} in ${student.country}. I specialize in ${student.skills.slice(0, 3).join(', ')}. I am applying for ${opp.title} because I am dedicated to driving tech and social innovation across Africa, and I bring both technical proficiency and local market understanding."
`;
  }

  if (mode === 'cover_letter') {
    return `Dear Selection Team at ${opp.organization},

I am writing to express my strong interest in the **${opp.title}**. As a student of **${student.fieldOfStudy}** at **${student.universityOrStatus}**, I have developed a strong foundation in **${student.skills.join(', ')}**.

${student.bioSummary}

I look forward to contributing my skills to ${opp.organization} and learning from your team.

Sincerely,
${student.fullName}
`;
  }

  return `### Tailored Response Guidance
Focus your answer on linking your background in ${student.fieldOfStudy} at ${student.universityOrStatus} with ${opp.organization}'s goals. Mention your core skills: ${student.skills.join(', ')}.
`;
}
