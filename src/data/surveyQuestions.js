export const orgCategories = [
  "Manufacturing",
  "Information Technology",
  "Retail & E-Commerce",
  "Hospitality & Food Service",
  "Logistics & Supply Chain",
  "Healthcare & Pharma",
  "Education & Academia",
  "Banking & Financial Services",
  "Construction & Real Estate",
  "Other"
];

export const respondentRoles = [
  "Manager",
  "Supervisor",
  "Employee",
  "Business Owner",
  "Other"
];

export const experienceRanges = [
  "Less than 1 year",
  "1-2 years",
  "3-5 years",
  "6-10 years",
  "10+ years"
];

export const likertOptions = [
  "Strongly Agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly Disagree"
];

export const surveyQuestions = [
  {
    id: "q1",
    number: 1,
    text: "Are tasks and responsibilities clearly assigned in your organization?",
    dimension: "Task Clarity & Assignment",
    description: "Evaluates whether job duties, expectations, and operational scopes are distinctly defined."
  },
  {
    id: "q2",
    number: 2,
    text: "Do employees receive sufficient authority to complete delegated tasks?",
    dimension: "Parity of Authority",
    description: "Assesses if employees are granted decision rights and resources matching their duties."
  },
  {
    id: "q3",
    number: 3,
    text: "Are expected results and deadlines communicated clearly?",
    dimension: "Expectations & Scheduling",
    description: "Examines if delivery standards and timeline expectations are mutually understood."
  },
  {
    id: "q4",
    number: 4,
    text: "Does delegation help managers save time?",
    dimension: "Managerial Time Optimization",
    description: "Measures whether routine delegation liberates executive hours for strategic planning."
  },
  {
    id: "q5",
    number: 5,
    text: "Does delegation improve employee confidence and skills?",
    dimension: "Human Capital Development",
    description: "Evaluates the developmental impact of empowerment and hands-on decision-making."
  },
  {
    id: "q6",
    number: 6,
    text: "Does delegation improve decision-making speed?",
    dimension: "Organizational Velocity",
    description: "Checks whether decentralizing daily decisions accelerates business turnaround."
  },
  {
    id: "q7",
    number: 7,
    text: "Are employees held accountable for assigned responsibilities?",
    dimension: "Accountability Structure",
    description: "Assesses whether performance reviews and consequence management are systematically enforced."
  },
  {
    id: "q8",
    number: 8,
    text: "Do managers provide suitable guidance and feedback?",
    dimension: "Supervisory Support",
    description: "Determines if supportive coaching and constructive feedback exist during execution."
  },
  {
    id: "q9",
    number: 9,
    text: "Does delegation improve overall team productivity?",
    dimension: "Productivity & Team Synergy",
    description: "Assesses perceived aggregate throughput and operational efficiency of the enterprise."
  },
  {
    id: "q10",
    number: 10,
    text: "What is the biggest challenge faced during delegation in your organization?",
    dimension: "Qualitative Barriers",
    description: "Open-ended qualitative inquiry into ground-level managerial bottlenecks.",
    isText: true
  }
];
