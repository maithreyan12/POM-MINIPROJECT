export const initialTeamMembers = [
  {
    id: "mem-1",
    name: "Aravind Sharma",
    role: "Operations Supervisor",
    department: "Operations",
    skills: ["Inventory Control", "Process Optimization", "Vendor Relations"],
    email: "aravind.sharma@delegatepro.demo",
    avatar: "AS"
  },
  {
    id: "mem-2",
    name: "Pooja Venkat",
    role: "Senior Marketing Associate",
    department: "Marketing",
    skills: ["Campaign Planning", "Digital Content", "Market Research"],
    email: "pooja.venkat@delegatepro.demo",
    avatar: "PV"
  },
  {
    id: "mem-3",
    name: "Rohan Nair",
    role: "Financial Analyst",
    department: "Finance",
    skills: ["Budgeting", "Variance Analysis", "ERP Auditing"],
    email: "rohan.nair@delegatepro.demo",
    avatar: "RN"
  },
  {
    id: "mem-4",
    name: "Divya Krishnan",
    role: "Quality Assurance Lead",
    department: "Quality",
    skills: ["SOP Audits", "Compliance", "Root Cause Analysis"],
    email: "divya.krishnan@delegatepro.demo",
    avatar: "DK"
  },
  {
    id: "mem-5",
    name: "Karthik Subramanian",
    role: "Store Floor In-Charge",
    department: "Retail Operations",
    skills: ["Visual Merchandising", "Customer Service", "Staff Scheduling"],
    email: "karthik.s@delegatepro.demo",
    avatar: "KS"
  }
];

// Helper to get formatted date string offset from today
const getDate = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const initialTasks = [
  {
    id: "tsk-101",
    title: "Quarterly Warehouse Physical Stock Verification",
    description: "Conduct physical counting of fast-moving raw materials in Warehouse B and reconcile with ERP ledger.",
    assignedTo: "mem-1", // Aravind Sharma
    priority: "High",
    startDate: getDate(-5),
    dueDate: getDate(2),
    authority: "Approval to cross-check store ledgers and issue stock discrepancy adjustment slips up to ₹50,000.",
    expectedOutcome: "Zero unaccounted variances with signed stock audit report submitted to Operations Manager.",
    status: "In Progress",
    managerNotes: "Ensure night-shift security supervisor signs off on sealed bin seals."
  },
  {
    id: "tsk-102",
    title: "Q3 Festival Promotional Campaign Rollout",
    description: "Execute omni-channel promotional banners, social media calendars, and regional influencer coordination.",
    assignedTo: "mem-2", // Pooja Venkat
    priority: "Medium",
    startDate: getDate(-10),
    dueDate: getDate(5),
    authority: "Ad spend approval up to ₹1,20,000 across Instagram and local radio channels.",
    expectedOutcome: "Minimum 15% increase in seasonal walk-ins and 2,500 qualified customer leads.",
    status: "In Progress",
    managerNotes: "Creative assets have been pre-approved by the Brand Director."
  },
  {
    id: "tsk-103",
    title: "Monthly Operational Cost Variance Audit",
    description: "Examine utility, maintenance, and logistics overheads against standard budgeted benchmarks.",
    assignedTo: "mem-3", // Rohan Nair
    priority: "Critical",
    startDate: getDate(-12),
    dueDate: getDate(-1), // Intentionally overdue for testing dashboard badge
    authority: "Direct query access to department expense vouchers and vendor contracts.",
    expectedOutcome: "Comprehensive variance table highlighting departments exceeding 5% variance.",
    status: "In Progress",
    managerNotes: "Focus particularly on diesel generator fuel escalation in plant 2."
  },
  {
    id: "tsk-104",
    title: "ISO 9001 Process Documentation Review",
    description: "Audit customer feedback logging mechanism and calibration records across assembly lines.",
    assignedTo: "mem-4", // Divya Krishnan
    priority: "High",
    startDate: getDate(-15),
    dueDate: getDate(-2),
    authority: "Mandate corrective action requests (CAR) to line managers failing calibration checks.",
    expectedOutcome: "Audit compliance score above 95% ahead of third-party registrar visit.",
    status: "Completed",
    managerNotes: "Completed with zero major non-conformances. Commendable diligence."
  },
  {
    id: "tsk-105",
    title: "Weekend Store Floor Staff Re-Allocation",
    description: "Design roster balancing peak hour cashier staffing with floor assist specialists for Saturday & Sunday.",
    assignedTo: "mem-5", // Karthik Subramanian
    priority: "Medium",
    startDate: getDate(-3),
    dueDate: getDate(1),
    authority: "Authorize overtime allowance within allocated ₹25,000 weekend shift budget.",
    expectedOutcome: "Checkout queue wait time kept under 4 minutes during 5 PM to 9 PM rush.",
    status: "In Progress",
    managerNotes: "Coordinate with HR for backup part-time relief pool."
  },
  {
    id: "tsk-106",
    title: "Supplier Service Level Agreement (SLA) Benchmarking",
    description: "Review top 10 packaging material vendors on delivery punctuality and defective return ratios.",
    assignedTo: "mem-1", // Aravind Sharma
    priority: "Low",
    startDate: getDate(-1),
    dueDate: getDate(10),
    authority: "Request performance reviews and rate contract renewal parameters from procurement.",
    expectedOutcome: "Categorized vendor scorecard ranking suppliers as Tier A, B, or C.",
    status: "Not Started",
    managerNotes: "Take last 6 months receipt logs from procurement portal."
  }
];

export const initialProjectMetadata = {
  projectTitle: "Role of Delegation in Effective Management",
  subjectCode: "GE3751",
  subjectName: "Principles of Management (POM)",
  academicYear: "2026 – 2027",
  semester: "Semester VII (4th Year)",
  department: "Department of Information Technology",
  facultyGuide: "Faculty Guide",
  facultyDesignation: "Assistant Professor, Department of Information Technology",
  teamMembers: [
    { name: "Gopika K", regNo: "23521", role: "B.Tech Information Technology – 4th Year" }
  ],
  submissionDate: "October 2026"
};

// Illustrative demo survey responses (clearly marked as synthetic demo data)
export const demoSurveyResponses = [
  {
    id: "resp-1",
    timestamp: "2026-10-01T10:15:00Z",
    respondentName: "Senthil Nathan",
    organization: "Apex Precision Tools Ltd",
    orgCategory: "Manufacturing",
    role: "Manager",
    experience: "6-10 years",
    q1: "Strongly Agree",
    q2: "Agree",
    q3: "Strongly Agree",
    q4: "Strongly Agree",
    q5: "Agree",
    q6: "Agree",
    q7: "Strongly Agree",
    q8: "Agree",
    q9: "Strongly Agree",
    q10: "Subordinates frequently ask for step-by-step approvals due to fear of blame."
  },
  {
    id: "resp-2",
    timestamp: "2026-10-02T14:30:00Z",
    respondentName: "Ananya Ramesh",
    organization: "NexGen Cloud Solutions",
    orgCategory: "Information Technology",
    role: "Supervisor",
    experience: "3-5 years",
    q1: "Agree",
    q2: "Neutral",
    q3: "Agree",
    q4: "Strongly Agree",
    q5: "Strongly Agree",
    q6: "Agree",
    q7: "Agree",
    q8: "Neutral",
    q9: "Strongly Agree",
    q10: "Balancing autonomy with micromanagement; some leads step in too early."
  },
  {
    id: "resp-3",
    timestamp: "2026-10-03T11:00:00Z",
    respondentName: "M. Balamurugan",
    organization: "Sri Krishna Textiles",
    orgCategory: "Retail",
    role: "Business Owner",
    experience: "10+ years",
    q1: "Agree",
    q2: "Agree",
    q3: "Neutral",
    q4: "Strongly Agree",
    q5: "Agree",
    q6: "Strongly Agree",
    q7: "Agree",
    q8: "Agree",
    q9: "Agree",
    q10: "Difficulty finding staff willing to take full ownership during customer complaints."
  },
  {
    id: "resp-4",
    timestamp: "2026-10-04T16:45:00Z",
    respondentName: "Preeti Sundar",
    organization: "Horizon Logistics Hub",
    orgCategory: "Logistics",
    role: "Employee",
    experience: "1-2 years",
    q1: "Neutral",
    q2: "Disagree",
    q3: "Disagree",
    q4: "Agree",
    q5: "Agree",
    q6: "Neutral",
    q7: "Agree",
    q8: "Disagree",
    q9: "Neutral",
    q10: "Authority to approve vendor vouchers is withheld, causing routine dispatch delays."
  },
  {
    id: "resp-5",
    timestamp: "2026-10-05T09:20:00Z",
    respondentName: "Vijay Kumar",
    organization: "Blue Ocean Hospitality",
    orgCategory: "Hospitality",
    role: "Manager",
    experience: "6-10 years",
    q1: "Strongly Agree",
    q2: "Agree",
    q3: "Strongly Agree",
    q4: "Strongly Agree",
    q5: "Strongly Agree",
    q6: "Strongly Agree",
    q7: "Agree",
    q8: "Agree",
    q9: "Strongly Agree",
    q10: "Ensuring proper training before handing over guest dispute escalation power."
  }
];
