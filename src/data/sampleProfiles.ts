import { StudentProfile } from '../types';

export const SAMPLE_PROFILES: StudentProfile[] = [
  {
    id: 'unza-cs-chipo',
    fullName: 'Chipo Mwansa',
    email: 'chipo.mwansa@student.unza.zb',
    country: 'Zambia',
    universityOrStatus: 'University of Zambia (UNZA)',
    fieldOfStudy: 'Computer Science',
    experienceLevel: 'Late Undergraduate (Year 3-4)',
    skills: ['Python', 'React', 'JavaScript', 'SQL', 'Git', 'REST APIs', 'Problem Solving'],
    desiredOpportunityTypes: ['Internship', 'Hackathon', 'Job / Paid Gig', 'Grant / Seed Fund'],
    interests: ['FinTech', 'AI & Tech', 'EdTech', 'Open Source'],
    locationCity: 'Lusaka',
    gpaOrAcademicNote: 'Distinction / Upper Second',
    bioSummary: 'Final-year Computer Science student at UNZA interested in building financial technology and scalable cloud applications for local merchants in Zambia.'
  },
  {
    id: 'cbu-agri-tendai',
    fullName: 'Tendai Banda',
    email: 'tendai.banda@cbu.ac.zm',
    country: 'Zambia',
    universityOrStatus: 'Copperbelt University (CBU)',
    fieldOfStudy: 'Agricultural Sciences & Technology',
    experienceLevel: 'Late Undergraduate (Year 3-4)',
    skills: ['Data Analysis', 'Grant Writing', 'Field Research', 'IoT Sensors', 'Soil Analytics', 'Project Management'],
    desiredOpportunityTypes: ['Grant / Seed Fund', 'Fellowship', 'Competition', 'Accelerator / Incubator'],
    interests: ['AgriTech', 'Clean Energy', 'Healthcare', 'Social Impact'],
    locationCity: 'Kitwe',
    gpaOrAcademicNote: 'Merit',
    bioSummary: 'Copperbelt University student building smart irrigation telemetry prototypes for smallholder farmers in the Copperbelt province.'
  },
  {
    id: 'zcas-grad-kondwani',
    fullName: 'Kondwani Phiri',
    email: 'k.phiri@gmail.com',
    country: 'Zambia',
    universityOrStatus: 'ZCAS University',
    fieldOfStudy: 'Business Administration & Finance',
    experienceLevel: 'Recent Graduate (< 2 Years)',
    skills: ['Financial Modeling', 'Market Research', 'Pitch Decks', 'Excel', 'Business Strategy', 'Public Speaking'],
    desiredOpportunityTypes: ['Job / Paid Gig', 'Fellowship', 'Accelerator / Incubator', 'Grant / Seed Fund'],
    interests: ['FinTech', 'Social Impact', 'Business & Finance', 'Clean Energy'],
    locationCity: 'Lusaka',
    gpaOrAcademicNote: 'Bachelor of Arts (Honours)',
    bioSummary: 'Recent finance graduate passionate about capital allocation for early-stage African startups and impact investment.'
  },
  {
    id: 'ndola-dev-grace',
    fullName: 'Grace Tembo',
    email: 'grace.tembo@outlook.com',
    country: 'Zambia',
    universityOrStatus: 'Self-Taught / High School',
    fieldOfStudy: 'Self-Taught Software Development',
    experienceLevel: 'High School Senior / High School Grad',
    skills: ['HTML/CSS', 'Tailwind', 'React', 'Figma', 'UI Design', 'Copywriting'],
    desiredOpportunityTypes: ['Hackathon', 'Job / Paid Gig', 'Scholarship', 'Internship'],
    interests: ['AI & Tech', 'Creative Media', 'EdTech'],
    locationCity: 'Ndola',
    bioSummary: 'Self-taught frontend developer and UI enthusiast from Ndola who won 2 regional coding challenges.'
  }
];
