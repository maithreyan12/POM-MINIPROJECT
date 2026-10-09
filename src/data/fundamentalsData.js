export const delegationDefinition = {
  title: "Meaning of Delegation",
  quote: "Delegation is the operational process by which a manager assigns duties and grants appropriate authority to a subordinate to complete specified tasks while retaining overall managerial accountability.",
  academicCitation: "Koontz & O'Donnell (Principles of Management)",
  keyPoints: [
    {
      title: "Downward Transfer of Authority",
      description: "Authority flows vertically downward from superior to subordinate along the scalar chain of command."
    },
    {
      title: "Preservation of Ultimate Responsibility",
      description: "A manager can delegate authority and duties, but cannot abdicate ultimate accountability to their own superiors."
    },
    {
      title: "Empowerment with Boundaries",
      description: "Subordinates receive discretion to make decisions within clearly defined operating parameters and budgets."
    },
    {
      title: "Core Function of Organizing",
      description: "In the P-O-D-C (Planning, Organizing, Directing, Controlling) framework, delegation is the primary organizing instrument."
    }
  ]
};

export const delegationElements = [
  {
    id: "assignment",
    name: "Assignment of Duties",
    shortDescription: "The manager clearly defines the task, expected standards, and delivery deadlines.",
    icon: "FileText",
    color: "blue",
    definition: "The initial step where a manager identifies what work needs to be accomplished, decomposes objectives into specific operational tasks, and allocates them to qualified subordinates based on their competencies and bandwidth.",
    practicalExample: "An Operations Manager instructs a shift supervisor: 'Conduct a physical inventory verification of Raw Material Warehouse B by Friday 4 PM, document any variance over 2%, and update the ERP batch ledger.'",
    managementTip: "Always communicate the 'Why' behind the task alongside the 'What'. Set unambiguous SMART (Specific, Measurable, Achievable, Relevant, Time-bound) targets so subordinates have a clear yardstick for success.",
    keyQuestions: [
      "What exact deliverable is expected?",
      "What is the non-negotiable deadline?",
      "What quality standards apply?"
    ]
  },
  {
    id: "authority",
    name: "Granting Authority",
    shortDescription: "The employee receives the formal right to command resources and make binding operational decisions.",
    icon: "ShieldCheck",
    color: "emerald",
    definition: "The formal vesting of legitimate decision-making power, access to physical and digital resources, expenditure limits, and organizational jurisdiction necessary to accomplish the assigned duties without bottlenecks.",
    practicalExample: "The store owner grants the assistant manager official credentials to authorize vendor purchase orders up to ₹25,000 and direct warehouse staff to re-arrange inventory bays without seeking prior sign-off.",
    managementTip: "Follow the 'Principle of Parity of Authority and Responsibility'. Granting responsibility without commensurate authority paralyzes employees and leads to frustration.",
    keyQuestions: [
      "What financial and operational approvals can they make?",
      "Who needs to be officially notified of this authority?",
      "What system access permissions are required?"
    ]
  },
  {
    id: "accountability",
    name: "Establishing Accountability",
    shortDescription: "The employee is answerable for assigned obligations, while the manager retains ultimate accountability.",
    icon: "CheckCircle",
    color: "navy",
    definition: "The contractual obligation of the subordinate to account for the utilization of authority and the timely achievement of the delegated task. Accountability cannot be delegated further downwards; it remains linked to the person accepting the task.",
    practicalExample: "The shift supervisor submits a weekly audit reconciliation report every Monday at 10 AM, presenting variance root causes and answering queries directly to the plant head during the operational review.",
    managementTip: "Establish periodic milestone checkpoints rather than waiting until the final deadline. This maintains accountability without resorting to micromanagement.",
    keyQuestions: [
      "How and when will progress be reported?",
      "What key performance indicators (KPIs) measure results?",
      "What happens when variance or hurdles arise?"
    ]
  }
];

export const delegationImportance = [
  {
    id: "workload",
    title: "Reduces Excessive Managerial Workload",
    description: "Frees managers from routine administrative and repetitive operational chores so they can focus on high-impact strategic initiatives.",
    pomPrinciple: "Management by Exception",
    impact: "Prevents executive burnout and improves operational agility."
  },
  {
    id: "time",
    title: "Improves Time Management",
    description: "Optimizes the time allocation of executive leadership, shifting focus from firefighting to forecasting and business planning.",
    pomPrinciple: "Efficiency & Optimum Utilization",
    impact: "Tasks are processed concurrently rather than bottlenecking at one desk."
  },
  {
    id: "skills",
    title: "Develops Employee Skills",
    description: "Acts as a practical on-the-job training tool, preparing high-potential subordinates for higher administrative responsibilities.",
    pomPrinciple: "Personnel Development & Succession Planning",
    impact: "Builds a resilient organizational talent pipeline."
  },
  {
    id: "decision",
    title: "Supports Faster Decision-Making",
    description: "Empowers on-the-ground employees to resolve client issues and operational snags without waiting for multi-tier approvals.",
    pomPrinciple: "Decentralization & Speed of Action",
    impact: "Dramatically reduces customer response time and cycle latency."
  },
  {
    id: "coordination",
    title: "Improves Coordination",
    description: "Clarifies interpersonal relationships, reporting lines, and task dependencies across departments.",
    pomPrinciple: "Unity of Direction & Cohesiveness",
    impact: "Minimizes duplicate effort and inter-departmental conflicts."
  },
  {
    id: "confidence",
    title: "Encourages Employee Confidence & Motivation",
    description: "Demonstrates managerial trust and respect, fostering psychological ownership and heightened job satisfaction.",
    pomPrinciple: "Herzberg's Motivator Factors (Recognition & Growth)",
    impact: "Increases employee retention and voluntary initiative."
  },
  {
    id: "strategic",
    title: "Helps Managers Focus on Strategic Priorities",
    description: "Enables executive leaders to dedicate intellect to market expansion, technology adoption, and competitive strategy.",
    pomPrinciple: "Strategic Leadership & Vision",
    impact: "Drives sustainable long-term enterprise growth."
  },
  {
    id: "growth",
    title: "Supports Organizational Growth & Scalability",
    description: "Enables organizations to scale headcount, service offerings, and branch networks without structural paralysis.",
    pomPrinciple: "Scalability & Span of Control",
    impact: "Allows businesses to replicate success across multiple branches."
  }
];

export const delegationPrinciples = [
  {
    number: "01",
    title: "Clear Assignment of Duties",
    description: "Tasks must be articulated in concrete terms with clearly documented expected outcomes and quality benchmarks.",
    badge: "Clarity"
  },
  {
    number: "02",
    title: "Appropriate Authority (Parity Principle)",
    description: "The authority conferred on a subordinate must be co-extensive with and proportionate to the responsibility assigned.",
    badge: "Parity"
  },
  {
    number: "03",
    title: "Clear Expectations & Guidelines",
    description: "Both manager and subordinate must share a synchronous understanding of success criteria, boundaries, and priorities.",
    badge: "Alignment"
  },
  {
    number: "04",
    title: "Unity of Command",
    description: "Each subordinate should receive instructions from and be answerable to only one direct superior to prevent confusion.",
    badge: "Structure"
  },
  {
    number: "05",
    title: "Defined Accountability (Absoluteness)",
    description: "While authority is delegated, ultimate managerial responsibility remains absolute and cannot be passed off.",
    badge: "Integrity"
  },
  {
    number: "06",
    title: "Effective Communication & Transparency",
    description: "Open two-way communication channels must remain accessible throughout the execution period.",
    badge: "Dialogue"
  },
  {
    number: "07",
    title: "Appropriate Supervision (Non-Interference)",
    description: "Establish periodic milestone audits without suffocating the subordinate through constant micro-surveillance.",
    badge: "Autonomy"
  },
  {
    number: "08",
    title: "Feedback and Performance Evaluation",
    description: "Provide constructive appraisal upon completion, recognizing achievements and identifying developmental areas.",
    badge: "Review"
  }
];
