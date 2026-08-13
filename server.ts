import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini Client
  let genAI: GoogleGenAI | null = null;
  function getGenAI(): GoogleGenAI | null {
    if (!genAI && process.env.GEMINI_API_KEY) {
      genAI = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return genAI;
  }

  // Helper function to invoke Gemini with fallback models, retries, and rate limit resilience
  async function callGeminiApi(
    ai: GoogleGenAI,
    params: {
      contents: any;
      config?: any;
      preferredModel?: string;
    }
  ): Promise<string> {
    const modelsToTry = [
      params.preferredModel || 'gemini-3.6-flash',
      'gemini-3.1-flash-lite',
    ];

    let lastError: any = null;

    for (const model of modelsToTry) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: params.contents,
            config: params.config,
          });
          if (response?.text) {
            return response.text;
          }
        } catch (err: any) {
          lastError = err;
          const errMessage = String(err?.message || err);
          const isRateLimit = errMessage.includes('429') || errMessage.includes('RESOURCE_EXHAUSTED') || errMessage.includes('Quota exceeded');

          if (isRateLimit && attempt === 0) {
            console.log(`[OpportunityOS] Rate limit hit on ${model} (attempt 1). Pausing 1s before retry...`);
            await new Promise((res) => setTimeout(res, 1000));
            continue;
          }

          if (isRateLimit) {
            console.log(`[OpportunityOS] Quota limit reached on model ${model}, attempting fallback model...`);
            break; // Try next model in modelsToTry
          }

          throw err;
        }
      }
    }

    throw lastError || new Error('Gemini API call failed across models');
  }

  // API Endpoint: Health Check & Gemini status
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiApiKey: Boolean(process.env.GEMINI_API_KEY),
      environment: process.env.NODE_ENV || 'development',
    });
  });

  // API Endpoint: Batch Analyze Student Match with Opportunities
  app.post('/api/gemini/match-opportunities', async (req, res) => {
    try {
      const { studentProfile, opportunities } = req.body;

      if (!studentProfile || !opportunities || !Array.isArray(opportunities)) {
        res.status(400).json({ error: 'Missing studentProfile or opportunities array.' });
        return;
      }

      const ai = getGenAI();

      // Fallback matching function if Gemini API key is missing
      if (!ai) {
        console.log('[OpportunityOS] No GEMINI_API_KEY found, returning heuristic match fallback.');
        const fallbackResults = opportunities.map((opp: any) => calculateHeuristicMatch(studentProfile, opp));
        res.json({ matches: fallbackResults, isFallback: true });
        return;
      }

      const prompt = `
You are an expert career counselor and opportunity discovery AI for African university students and early-career talent.
Analyze the following student profile against the provided opportunities.

STUDENT PROFILE:
- Name: ${studentProfile.fullName}
- Country: ${studentProfile.country}
- University / Status: ${studentProfile.universityOrStatus}
- Field of Study: ${studentProfile.fieldOfStudy}
- Experience Level: ${studentProfile.experienceLevel}
- Skills: ${studentProfile.skills.join(', ')}
- Desired Opportunity Types: ${studentProfile.desiredOpportunityTypes.join(', ')}
- Interests: ${studentProfile.interests.join(', ')}
- Bio Summary: ${studentProfile.bioSummary}

OPPORTUNITIES TO EVALUATE:
${JSON.stringify(opportunities.map((o: any) => ({
  id: o.id,
  title: o.title,
  organization: o.organization,
  type: o.type,
  region: o.region,
  eligibilitySummary: o.eligibilitySummary,
  eligibilityCriteria: o.eligibilityCriteria,
  overview: o.overview,
  tags: o.tags
})), null, 2)}

TASK:
For EVERY opportunity in the list, evaluate match score (0-100), eligibility tier, strengths, gaps/risks, and brief actionable summary insight.
Return structured JSON array corresponding to each opportunity.
`;

      const responseText = await callGeminiApi(ai, {
        preferredModel: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction: 'You are an objective, honest, and empowering career counselor specializing in African student opportunities. Provide clear numbers (0-100) and actionable bullet points.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                opportunityId: { type: Type.STRING },
                matchScore: { type: Type.NUMBER, description: 'Score between 0 and 100 representing eligibility & skill alignment' },
                matchTier: { type: Type.STRING, description: 'Top Fit | Good Fit | Moderate Fit | High Gap' },
                whyItMatches: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: '2-3 key bullet reasons why this opportunity suits the student'
                },
                strengths: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Student strengths relevant to this specific opportunity'
                },
                gapsOrRisks: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: 'Any missing skills, eligibility prerequisites, or competition factors'
                },
                eligibilityStatus: { type: Type.STRING, description: 'Eligible | Likely Eligible | Potential Gap | Ineligible' },
                summaryInsight: { type: Type.STRING, description: '1-2 sentence overall career advice for this opportunity' },
              },
            },
          },
        },
      });

      const matches = JSON.parse(responseText.trim());
      res.json({ matches, isFallback: false });
    } catch (error: any) {
      console.log('[OpportunityOS Gemini Match] Note: Using intelligent heuristic match fallback due to API rate limit/quota:', error?.message || error);
      const { studentProfile, opportunities } = req.body;
      if (studentProfile && Array.isArray(opportunities)) {
        const fallbackResults = opportunities.map((opp: any) => calculateHeuristicMatch(studentProfile, opp));
        res.json({ matches: fallbackResults, isFallback: true });
      } else {
        res.status(500).json({ error: error?.message || 'Failed to generate match analysis' });
      }
    }
  });

  // API Endpoint: Application Assistance Suite (Strategy, Pitch, CV Suggestions, Cover Letter, Q&A)
  app.post('/api/gemini/application-assistant', async (req, res) => {
    try {
      const { studentProfile, opportunity, mode, customQuestionPrompt } = req.body;

      if (!studentProfile || !opportunity || !mode) {
        res.status(400).json({ error: 'Missing required parameters (studentProfile, opportunity, mode).' });
        return;
      }

      const ai = getGenAI();

      if (!ai) {
        console.log('[OpportunityOS] No GEMINI_API_KEY found, generating structured template response.');
        const fallbackContent = generateFallbackAssistance(studentProfile, opportunity, mode, customQuestionPrompt);
        res.json({ result: fallbackContent, isFallback: true });
        return;
      }

      let systemPrompt = 'You are a elite executive coach and university application advisor helping African talent present their authentic best self for competitive global and regional opportunities.';
      let prompt = '';

      if (mode === 'strategy') {
        prompt = `
Analyze how ${studentProfile.fullName} (${studentProfile.fieldOfStudy}, ${studentProfile.universityOrStatus}) should strategically approach applying for "${opportunity.title}" at ${opportunity.organization}.

Opportunity Type: ${opportunity.type}
Overview: ${opportunity.overview}
Eligibility: ${opportunity.eligibilitySummary}
Student Skills: ${studentProfile.skills.join(', ')}
Student Interests: ${studentProfile.interests.join(', ')}
Student Bio: ${studentProfile.bioSummary}

Generate a comprehensive Strategic Application Roadmap covering:
1. Recommended Core Positioning Angle (How to frame their background uniquely)
2. 3 Key Themes to Emphasize in their application
3. Step-by-Step Action Plan before submitting
4. Critical Pitfalls to Avoid
`;
      } else if (mode === 'pitch') {
        prompt = `
Draft a compelling 60-second Elevator Pitch & Professional Bio for ${studentProfile.fullName} tailored specifically to apply for "${opportunity.title}" by ${opportunity.organization}.

Student Details:
- Country & Uni: ${studentProfile.country}, ${studentProfile.universityOrStatus}
- Field: ${studentProfile.fieldOfStudy} (${studentProfile.experienceLevel})
- Skills: ${studentProfile.skills.join(', ')}
- Interests: ${studentProfile.interests.join(', ')}
- Bio: ${studentProfile.bioSummary}

Opportunity Details:
- Title: ${opportunity.title}
- Org: ${opportunity.organization}
- Overview: ${opportunity.overview}

Provide:
1. Spoken 60-second Elevator Pitch (written in first-person "I am...")
2. A polished 3-sentence written Bio for application forms
3. Key bullet points on why this candidate brings authentic local value and technical foundation.
`;
      } else if (mode === 'cv_suggestions') {
        prompt = `
Provide tailored CV & Resume Improvement Suggestions for ${studentProfile.fullName} applying for "${opportunity.title}" at ${opportunity.organization}.

Current Student Background:
- Field: ${studentProfile.fieldOfStudy}
- Skills: ${studentProfile.skills.join(', ')}
- Summary: ${studentProfile.bioSummary}

Opportunity Key Requirements & Benefits:
- Requirements: ${opportunity.eligibilitySummary}
- Details: ${opportunity.overview}
- Responsibilities/Benefits: ${opportunity.responsibilitiesOrBenefits.join('; ')}

Output 4 to 5 high-impact bullet point transformations for their CV:
Show:
- Target Experience / Skill Area
- Suggested Strong Action-Verb Bullet Point (tailored with metrics/context)
- Why this aligns with ${opportunity.organization}'s expectations
`;
      } else if (mode === 'cover_letter') {
        prompt = `
Write a formal, highly customized Cover Letter for ${studentProfile.fullName} applying for "${opportunity.title}" at ${opportunity.organization}.

Student Details:
- Name: ${studentProfile.fullName}
- Email: ${studentProfile.email}
- Location: ${studentProfile.locationCity || studentProfile.country}, ${studentProfile.country}
- Uni/Status: ${studentProfile.universityOrStatus} (${studentProfile.fieldOfStudy})
- Skills: ${studentProfile.skills.join(', ')}
- Summary: ${studentProfile.bioSummary}

Opportunity:
- Title: ${opportunity.title}
- Org: ${opportunity.organization}
- Location/Region: ${opportunity.location} (${opportunity.region})
- Overview: ${opportunity.overview}

Instructions:
- Write in a professional, authentic voice (not overly robotic or template-sounding).
- Highlight specific regional/contextual enthusiasm (e.g. solving real problems in ${studentProfile.country} or Africa).
- Explicitly connect candidate's skills (${studentProfile.skills.slice(0, 4).join(', ')}) to the opportunity's goals.
`;
      } else if (mode === 'question_answer') {
        const questionToAnswer = customQuestionPrompt || "Why are you interested in this opportunity and how does your background make you a strong candidate?";
        prompt = `
Help ${studentProfile.fullName} answer the following application essay/interview question for "${opportunity.title}" at ${opportunity.organization}:

QUESTION:
"${questionToAnswer}"

CANDIDATE CONTEXT:
- Uni & Field: ${studentProfile.universityOrStatus}, ${studentProfile.fieldOfStudy}
- Skills: ${studentProfile.skills.join(', ')}
- Interests: ${studentProfile.interests.join(', ')}
- Bio: ${studentProfile.bioSummary}

OPPORTUNITY CONTEXT:
- Title: ${opportunity.title} (${opportunity.type})
- Org: ${opportunity.organization}
- Overview: ${opportunity.overview}

Provide:
1. Recommended Answer Framework (Structure to follow: Situation, Task, Action, Result, Impact)
2. Complete Tailored Answer Draft (approx 200-300 words, authentic, candidate's voice)
3. 3 Expert Tips for making the response stand out to selection reviewers.
`;
      }

      const responseText = await callGeminiApi(ai, {
        preferredModel: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });

      res.json({
        result: responseText,
        isFallback: false,
      });
    } catch (error: any) {
      console.log('[OpportunityOS Gemini Assistant] Note: Using structured template fallback due to API rate limit/quota:', error?.message || error);
      const { studentProfile, opportunity, mode, customQuestionPrompt } = req.body;
      const fallbackContent = generateFallbackAssistance(studentProfile, opportunity, mode, customQuestionPrompt);
      res.json({ result: fallbackContent, isFallback: true });
    }
  });

  // Serve Vite in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[OpportunityOS Server] Running on http://0.0.0.0:${PORT}`);
  });
}

// Algorithmic heuristic fallback matcher when API key is not present or offline
function calculateHeuristicMatch(student: any, opp: any) {
  let score = 50; // base score
  const whyItMatches: string[] = [];
  const strengths: string[] = [];
  const gapsOrRisks: string[] = [];

  // Check type match
  if (student.desiredOpportunityTypes?.includes(opp.type)) {
    score += 20;
    whyItMatches.push(`Directly matches your desired opportunity type (${opp.type}).`);
  }

  // Check skills match
  const matchedSkills = (student.skills || []).filter((skill: string) =>
    opp.overview?.toLowerCase().includes(skill.toLowerCase()) ||
    opp.tags?.some((tag: string) => tag.toLowerCase().includes(skill.toLowerCase())) ||
    opp.title?.toLowerCase().includes(skill.toLowerCase())
  );

  if (matchedSkills.length > 0) {
    score += Math.min(matchedSkills.length * 8, 25);
    strengths.push(`Your skills in ${matchedSkills.join(', ')} align with this opportunity.`);
    whyItMatches.push(`Strong overlap in required skills (${matchedSkills.join(', ')}).`);
  } else {
    gapsOrRisks.push(`Consider tailoring your resume to highlight relevant domain projects.`);
  }

  // Check region match
  if (opp.region === 'Zambia' && student.country === 'Zambia') {
    score += 15;
    whyItMatches.push(`Local opportunity based in Zambia for immediate regional eligibility.`);
  } else if (opp.region === 'Sub-Saharan Africa' || opp.region === 'Southern Africa') {
    score += 10;
    whyItMatches.push(`Open to applicants across ${opp.region}.`);
  }

  // Final score clamping
  const finalScore = Math.min(Math.max(score, 35), 98);
  let matchTier: 'Top Fit' | 'Good Fit' | 'Moderate Fit' | 'High Gap' = 'Good Fit';
  if (finalScore >= 85) matchTier = 'Top Fit';
  else if (finalScore >= 68) matchTier = 'Good Fit';
  else if (finalScore >= 50) matchTier = 'Moderate Fit';
  else matchTier = 'High Gap';

  return {
    opportunityId: opp.id,
    matchScore: finalScore,
    matchTier,
    whyItMatches: whyItMatches.length > 0 ? whyItMatches : [`General alignment with your academic background in ${student.fieldOfStudy}.`],
    strengths: strengths.length > 0 ? strengths : [`Academic grounding at ${student.universityOrStatus}.`],
    gapsOrRisks: gapsOrRisks.length > 0 ? gapsOrRisks : ['Competitive application pool; ensure early submission.'],
    eligibilityStatus: finalScore >= 65 ? 'Eligible' : 'Likely Eligible',
    summaryInsight: `Solid alignment for ${student.fullName}. Focus on demonstrating practical projects and commitment during application.`
  };
}

function generateFallbackAssistance(student: any, opp: any, mode: string, customQuestion?: string) {
  if (mode === 'strategy') {
    return `### Strategic Application Roadmap for ${student.fullName}
**Opportunity:** ${opp.title} (${opp.organization})

#### 1. Core Positioning Angle
Position yourself as a forward-thinking student from **${student.universityOrStatus}** combining a solid foundation in **${student.fieldOfStudy}** with hands-on skills in **${student.skills.slice(0, 3).join(', ')}**. Highlight your authentic perspective on local challenges in **${student.country}**.

#### 2. Key Themes to Emphasize
- **Local Context & Practical Drive:** Emphasize how your background enables you to identify real problems in ${student.country} and execute practical solutions.
- **Technical & Analytical Aptitude:** Showcase concrete projects or coursework involving ${student.skills[0] || 'your core discipline'}.
- **Collaborative Leadership:** Mention experience collaborating with peers or student associations at ${student.universityOrStatus}.

#### 3. Step-by-Step Action Plan
1. **Refine Portfolio/CV:** Ensure your top 2 projects clearly document the tools used (${student.skills.slice(0, 3).join(', ')}) and measurable outcomes.
2. **Tailor Personal Statement:** Address ${opp.organization}'s specific mission in your opening paragraph.
3. **Secure Recommendations:** Request a brief reference from a lecturer or project supervisor who can attest to your technical curiosity.

#### 4. Critical Pitfalls to Avoid
- Avoid submitting generic, uncustomized cover letters that fail to mention ${opp.organization} by name.
- Don't underestimate soft skills or community leadership experience.
`;
  }

  if (mode === 'pitch') {
    return `### Tailored 60-Second Pitch & Bio
**Target:** ${opp.title} at ${opp.organization}

#### 60-Second Spoken Pitch
"Hello! I am ${student.fullName}, a ${student.experienceLevel} studying ${student.fieldOfStudy} at ${student.universityOrStatus} in ${student.country}. My core technical focus centers on ${student.skills.slice(0, 3).join(' and ')}. I am deeply passionate about ${student.interests.slice(0, 2).join(' and ')}, and I have been actively building solutions to address real-world needs in our community. I am thrilled about the opportunity at ${opp.organization} because it directly aligns with my drive to apply technology and innovation for measurable impact across Africa."

#### Written Application Bio (3 Sentences)
${student.fullName} is a dedicated ${student.fieldOfStudy} candidate at ${student.universityOrStatus} with demonstrated skills in ${student.skills.slice(0, 3).join(', ')}. Passionate about ${student.interests.join(' and ')}, ${student.fullName.split(' ')[0]} actively works on practical projects serving communities across ${student.country}. Seeking to leverage technical expertise and strategic problem-solving as part of the ${opp.title} with ${opp.organization}.
`;
  }

  if (mode === 'cv_suggestions') {
    return `### CV Improvement Suggestions for ${opp.title}

1. **Highlight Core Discipline & Skills:**
   - *Current Area:* ${student.fieldOfStudy} & Technical Skills
   - *Suggested Bullet:* "Engineered and deployed modular software/research projects utilizing **${student.skills.slice(0, 3).join(', ')}**, optimizing performance and user engagement for regional applications."
   - *Why it works:* Demonstrates practical execution directly relevant to ${opp.organization}.

2. **Quantify Local Problem-Solving:**
   - *Current Area:* Projects & Coursework
   - *Suggested Bullet:* "Collaborated with a team of 3 developers/researchers at **${student.universityOrStatus}** to analyze community data, identifying actionable insights in ${student.interests[0] || 'technology'}."
   - *Why it works:* Shows teamwork and measurable outcome orientation.

3. **Demonstrate Initiative & Continuous Learning:**
   - *Current Area:* Extra-Curricular / Projects
   - *Suggested Bullet:* "Selected to participate in competitive university technical workshops and student initiatives focused on ${student.interests.slice(0, 2).join(' and ')}."
   - *Why it works:* Sets you apart from passive applicants by demonstrating self-starter initiative.
`;
  }

  if (mode === 'cover_letter') {
    return `Dear Selection Committee at ${opp.organization},

I am writing to express my enthusiastic application for the **${opp.title}**. As a ${student.experienceLevel} pursuing **${student.fieldOfStudy}** at **${student.universityOrStatus}** in ${student.country}, I have watched ${opp.organization}'s impactful work with great admiration.

My academic journey and hands-on projects have allowed me to build strong proficiency in **${student.skills.slice(0, 4).join(', ')}**. What drives my work is a commitment to solving pressing challenges in **${student.interests.slice(0, 2).join(' and ')}**, particularly within the context of ${student.country} and Sub-Saharan Africa.

${student.bioSummary}

The opportunity to join ${opp.title} represents a pivotal step in my career where I can contribute my analytical skills, local insights, and collaborative energy while learning from industry leaders at ${opp.organization}.

Thank you for your time and consideration. I welcome the opportunity to discuss how my background and enthusiasm align with your team's objectives.

Sincerely,

${student.fullName}
${student.email}
${student.universityOrStatus}, ${student.country}
`;
  }

  return `### Application Guidance for Question
**Question:** "${customQuestion || 'Why are you interested in this position?'}"

#### Recommended Response Framework:
- **Opening:** Directly state your excitement for ${opp.organization}'s specific mission in ${student.country}/Africa.
- **Body Paragraph 1 (The 'Why'):** Link a specific project or learning experience at ${student.universityOrStatus} to why this work matters to you.
- **Body Paragraph 2 (The 'How'):** Highlight your proficiency in ${student.skills.slice(0, 3).join(', ')} and how you will apply them.
- **Closing:** Reiterate your commitment to long-term impact in ${student.interests[0] || 'your field'}.
`;
}

startServer();
