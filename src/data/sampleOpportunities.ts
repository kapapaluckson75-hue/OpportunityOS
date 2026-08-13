import { Opportunity } from '../types';

export const SAMPLE_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-zambia-fintech-hackathon-2026',
    title: 'Zambia FinTech Innovation Challenge 2026',
    organization: 'Bank of Zambia & Bongohive Innovation Hub',
    type: 'Hackathon',
    deadline: '2026-09-15',
    deadlineDisplay: 'September 15, 2026',
    compensation: 'ZMW 120,000 ($5,000) Grand Prize + 6-Month Incubation',
    isPaid: true,
    region: 'Zambia',
    location: 'Lusaka & Hybrid (Zambia)',
    eligibilitySummary: 'Enrolled university students or young Zambian residents under 30 with software or fintech ideas.',
    eligibilityCriteria: [
      { rule: 'Must be a Zambian citizen, resident, or student registered at a Zambian higher education institution.', isMandatory: true },
      { rule: 'Team or individual must present a functional software prototype or financial access concept.', isMandatory: true },
      { rule: 'Applicants must be available for a virtual mentoring sprint and in-person Lusaka pitch finale.', isMandatory: false }
    ],
    overview: 'The annual nationwide FinTech challenge empowering university builders and early innovators to create digital payments, agricultural micro-insurance, and financial inclusion tools tailored for Zambia.',
    responsibilitiesOrBenefits: [
      'ZMW 120,000 top cash award + ZMW 40,000 runner-up prizes',
      'Direct fast-track entry into Bongohive\'s FinTech Accelerator',
      'Regulatory sandbox access with Bank of Zambia compliance mentors',
      'Cloud infrastructure credits ($5,000 Google Cloud / Firebase)'
    ],
    applicationUrl: 'https://bongohive.co.zm/fintech-challenge-2026',
    tags: ['FinTech', 'Software', 'Lusaka', 'University Students', 'Incubation'],
    isDemoSample: true,
    featured: true
  },
  {
    id: 'opp-africa-tech-fellows-2026',
    title: 'Pan-African Tech Leadership Fellowship 2026/2027',
    organization: 'Pan-African Innovation Foundation & Google for Developers',
    type: 'Fellowship',
    deadline: '2026-09-30',
    deadlineDisplay: 'September 30, 2026',
    compensation: '$1,200 Monthly Stipend + $3,000 Project Budget',
    isPaid: true,
    region: 'Sub-Saharan Africa',
    location: 'Remote with 1-week retreat in Kigali, Rwanda',
    eligibilitySummary: 'Final-year students or recent graduates (< 2 years) residing in Sub-Saharan Africa.',
    eligibilityCriteria: [
      { rule: 'Must hold citizenship in an African nation and reside in Sub-Saharan Africa.', isMandatory: true },
      { rule: 'Demonstrated experience in AI, software engineering, product design, or data science.', isMandatory: true },
      { rule: 'Must commit 20 hours per week over the 9-month fellowship duration.', isMandatory: true }
    ],
    overview: 'A high-impact 9-month fellowship connecting top African tech talent with global product mentors, dedicated funding for open-source AI projects, and hands-on career placements.',
    responsibilitiesOrBenefits: [
      '$1,200/month living stipend for full 9 months',
      'All-expenses-paid opening retreat in Kigali, Rwanda',
      'One-on-one mentorship from staff software engineers at top global tech companies',
      'Direct recruitment pipeline to high-growth tech companies across Africa'
    ],
    applicationUrl: 'https://panafricantechfellows.org/apply-2026',
    tags: ['AI', 'Software Engineering', 'Fellowship', 'Sub-Saharan Africa', 'Remote'],
    isDemoSample: true,
    featured: true
  },
  {
    id: 'opp-copperbelt-agritech-grant',
    title: 'Copperbelt Smart Farming Student Innovation Grant',
    organization: 'Copperbelt University & AgriVision Zambia',
    type: 'Grant / Seed Fund',
    deadline: '2026-10-10',
    deadlineDisplay: 'October 10, 2026',
    compensation: '$3,500 Equity-Free Seed Grant + Field Testing Sites',
    isPaid: true,
    region: 'Zambia',
    location: 'Kitwe & Copperbelt Province, Zambia',
    eligibilitySummary: 'Current undergraduate or postgraduate students at UNZA, CBU, or registered Zambian universities.',
    eligibilityCriteria: [
      { rule: 'Must be currently enrolled in an accredited Zambian university.', isMandatory: true },
      { rule: 'Project must address agricultural yield, climate resilience, or supply chain efficiency in Zambia.', isMandatory: true }
    ],
    overview: 'Targeted equity-free seed grant funding student-led research and technological prototypes in precision agriculture, smart irrigation, and post-harvest grain preservation.',
    responsibilitiesOrBenefits: [
      '$3,500 direct grant disbursed in 2 milestones',
      'Access to AgriVision commercial testing farms in Mpongwe & Kitwe',
      'Dedicated faculty advisor and agronomist feedback'
    ],
    applicationUrl: 'https://cbu.ac.zm/agritech-grant-2026',
    tags: ['AgriTech', 'Grant', 'CBU', 'UNZA', 'Climate Resilience'],
    isDemoSample: true,
    featured: false
  },
  {
    id: 'opp-unza-cbu-software-internship',
    title: 'Junior Cloud & AI Developer Internship',
    organization: 'Zambia National Commercial Bank (Zanaco) Digital Hub',
    type: 'Internship',
    deadline: '2026-08-31',
    deadlineDisplay: 'August 31, 2026',
    compensation: 'ZMW 5,500 Monthly Stipend + Health Insurance',
    isPaid: true,
    region: 'Zambia',
    location: 'Lusaka (Hybrid), Zambia',
    eligibilitySummary: 'Penultimate/final-year students or 2025/2026 graduates in Computer Science, IT, or Engineering.',
    eligibilityCriteria: [
      { rule: 'Degree in CS, IT, Software Engineering, or related technical field.', isMandatory: true },
      { rule: 'Familiarity with modern Web frameworks (React, Node.js, Python, or Java).', isMandatory: true },
      { rule: 'Minimum 3.0 GPA / Merit academic standing.', isMandatory: false }
    ],
    overview: 'Join Zanaco\'s core Digital Transformation team in Lusaka building next-generation mobile banking services, USSD APIs, and automated fraud monitoring systems.',
    responsibilitiesOrBenefits: [
      '6-month structured internship with potential full-time conversion',
      'ZMW 5,500/month competitive stipend',
      'Direct exposure to production banking systems and microservices'
    ],
    applicationUrl: 'https://zanaco.co.zm/careers/digital-internship-2026',
    tags: ['Software', 'Internship', 'Lusaka', 'Paid', 'Banking'],
    isDemoSample: true,
    featured: true
  },
  {
    id: 'opp-google-startups-africa-2026',
    title: 'Google for Startups Accelerator: Africa (Cohort 10)',
    organization: 'Google for Startups',
    type: 'Accelerator / Incubator',
    deadline: '2026-10-15',
    deadlineDisplay: 'October 15, 2026',
    compensation: '$100,000 Equity-Free Google Cloud Credits + Mentorship',
    isPaid: true,
    region: 'Sub-Saharan Africa',
    location: 'Hybrid (Virtual + Lagos/Nairobi Summits)',
    eligibilitySummary: 'Early-stage African technology startups with a working MVP and seed traction.',
    eligibilityCriteria: [
      { rule: 'Startup headquartered in or serving markets in Africa.', isMandatory: true },
      { rule: 'Must have a functional product using or aiming to integrate Machine Learning/AI.', isMandatory: true },
      { rule: 'At least one full-time co-founder.', isMandatory: true }
    ],
    overview: 'A 3-month equity-free virtual accelerator program for top early-stage African tech startups. Founders receive technical AI support, product strategy, and access to Google\'s global network.',
    responsibilitiesOrBenefits: [
      '$100,000 in Google Cloud & AI Platform credits',
      '1:1 access to Google Machine Learning experts and engineers',
      'Investor demo day presenting to top Pan-African VCs'
    ],
    applicationUrl: 'https://startup.google.com/accelerator/africa',
    tags: ['Accelerator', 'AI', 'Startups', 'Africa', 'Cloud Credits'],
    isDemoSample: true,
    featured: false
  },
  {
    id: 'opp-yali-regional-leadership',
    title: 'YALI Regional Leadership Center Southern Africa (RLC SA)',
    organization: 'Young African Leaders Initiative & USAID',
    type: 'Fellowship',
    deadline: '2026-09-20',
    deadlineDisplay: 'September 20, 2026',
    compensation: 'Fully Funded (Airfare, Meals, Lodging, Certificate)',
    isPaid: true,
    region: 'Southern Africa',
    location: 'UNISA Pretoria Campus & Online',
    eligibilitySummary: 'Young leaders aged 18–35 from Southern Africa (Zambia, Malawi, Zimbabwe, SA, etc.).',
    eligibilityCriteria: [
      { rule: 'Aged 18 to 35 at time of application.', isMandatory: true },
      { rule: 'Citizen and resident of Southern African nation (including Zambia).', isMandatory: true },
      { rule: 'Proven track record of community involvement or leadership in Civic, Business, or Public Mgmt.', isMandatory: true }
    ],
    overview: 'Premier leadership development program empowering young leaders across Southern Africa with transformative training in Civic Leadership, Business & Entrepreneurship, and Public Management.',
    responsibilitiesOrBenefits: [
      'Full scholarship covering all travel, meals, housing, and coursework',
      'Prestige YALI RLC Alumni Network membership and funding eligibility',
      'Intensive 4-week hybrid coursework and team challenge'
    ],
    applicationUrl: 'https://yalirsa.org.za/apply-now',
    tags: ['Leadership', 'Fellowship', 'Southern Africa', 'Civic', 'Entrepreneurship'],
    isDemoSample: true,
    featured: false
  },
  {
    id: 'opp-mastercard-aims-scholarship',
    title: 'Mastercard Foundation Fully Funded Master\'s in Mathematical Sciences',
    organization: 'African Institute for Mathematical Sciences (AIMS)',
    type: 'Scholarship',
    deadline: '2026-11-30',
    deadlineDisplay: 'November 30, 2026',
    compensation: '100% Tuition Waiver + Monthly Allowance + Laptop + Travel',
    isPaid: true,
    region: 'Sub-Saharan Africa',
    location: 'AIMS Campuses (Rwanda, Ghana, Senegal, South Africa)',
    eligibilitySummary: 'African university graduates with a Bachelor\'s degree in Math, CS, Physics, or Engineering.',
    eligibilityCriteria: [
      { rule: '4-year Bachelor degree or 3-year honors in quantitative discipline.', isMandatory: true },
      { rule: 'Strong commitment to applying science to African development problems.', isMandatory: true }
    ],
    overview: 'An intensive 1-year Master\'s program taught by world-class international professors, training future African leaders in data science, artificial intelligence, climate modeling, and quantitative finance.',
    responsibilitiesOrBenefits: [
      'Full 100% tuition coverage + monthly living allowance',
      'Free accommodation, meals, and medical coverage',
      'High-performance laptop provided upon arrival'
    ],
    applicationUrl: 'https://nexteinstein.org/mastercard-scholarship',
    tags: ['Scholarship', 'Data Science', 'Master\'s', 'Fully Funded', 'Africa'],
    isDemoSample: true,
    featured: true
  },
  {
    id: 'opp-zambia-youth-energy-challenge',
    title: 'Zambia Clean Energy & Mini-Grid Youth Challenge',
    organization: 'Rural Electrification Authority (REA) Zambia & SIDA',
    type: 'Competition',
    deadline: '2026-10-01',
    deadlineDisplay: 'October 1, 2026',
    compensation: 'ZMW 80,000 First Place + Commercial Feasibility Pilot',
    isPaid: true,
    region: 'Zambia',
    location: 'Zambia (National Submission)',
    eligibilitySummary: 'Zambian youth aged 18-30 or student teams presenting renewable energy concepts for off-grid communities.',
    eligibilityCriteria: [
      { rule: 'Zambian citizenship or permanent residency required.', isMandatory: true },
      { rule: 'Proposal must focus on solar, biomass, hydro, or energy storage for rural Zambia.', isMandatory: true }
    ],
    overview: 'A national pitch competition identifying sustainable energy solutions to solve rural power access gaps across Zambia\'s 10 provinces.',
    responsibilitiesOrBenefits: [
      'ZMW 80,000 cash grant for top concept',
      'Direct pilot opportunity with REA mini-grid developers',
      'Technical mentorship from solar engineering experts'
    ],
    applicationUrl: 'https://rea.org.zm/youth-clean-energy-challenge',
    tags: ['Clean Energy', 'Zambia', 'Competition', 'Grant', 'Engineering'],
    isDemoSample: true,
    featured: false
  },
  {
    id: 'opp-bantustan-media-gig',
    title: 'Junior UX/UI Designer & Brand Writer (Paid Gig)',
    organization: 'Lusaka Digital Studio',
    type: 'Job / Paid Gig',
    deadline: '2026-08-25',
    deadlineDisplay: 'August 25, 2026',
    compensation: 'ZMW 3,500 - ZMW 6,000 per project / monthly contract',
    isPaid: true,
    region: 'Zambia',
    location: 'Remote / Lusaka, Zambia',
    eligibilitySummary: 'Self-taught developers, design students, or communications graduates in Zambia.',
    eligibilityCriteria: [
      { rule: 'Portfolio demonstrating web design (Figma, Tailwind) or tech copywriting.', isMandatory: true },
      { rule: 'Ability to meet weekly client deliverables.', isMandatory: true }
    ],
    overview: 'Flexible paid contract position for Zambian creative talent to build user interfaces and content for growing SMBs and tech startups across Lusaka and the Copperbelt.',
    responsibilitiesOrBenefits: [
      'Flexible remote work hours around university schedule',
      'Direct payment per completed sprint / monthly milestone',
      'Portfolio building with real commercial clients'
    ],
    applicationUrl: 'https://lusakadigital.com/jobs/designer-writer',
    tags: ['UI Design', 'Paid Gig', 'Remote', 'Zambia', 'Part-Time'],
    isDemoSample: true,
    featured: false
  },
  {
    id: 'opp-healthtech-africa-grant',
    title: 'HealthTech Africa Student Research & Deployment Grant',
    organization: 'African Public Health Alliance & Wellcome Trust',
    type: 'Grant / Seed Fund',
    deadline: '2026-11-15',
    deadlineDisplay: 'November 15, 2026',
    compensation: '$8,000 Field Project Grant + Lab Equipment',
    isPaid: true,
    region: 'Sub-Saharan Africa',
    location: 'Sub-Saharan Africa (Local Deployment)',
    eligibilitySummary: 'Undergraduate or Master\'s students in Health Sciences, Biomedical Engineering, or Data Science.',
    eligibilityCriteria: [
      { rule: 'Enrolled in an African university health science or tech faculty.', isMandatory: true },
      { rule: 'Project must target diagnostic tools, telemedicine, or maternal health tracking.', isMandatory: true }
    ],
    overview: 'Grant supporting student researchers using mobile health apps, AI diagnostics, or low-cost medical devices to improve clinic outcomes in underserved rural communities.',
    responsibilitiesOrBenefits: [
      '$8,000 project disbursement',
      'Institutional Ethics Committee approval support',
      'Publication assistance in African Health Sciences journal'
    ],
    applicationUrl: 'https://healthtechafrica.org/student-grants-2026',
    tags: ['Healthcare', 'Grant', 'Research', 'Africa', 'AI Diagnostics'],
    isDemoSample: true,
    featured: false
  }
];
