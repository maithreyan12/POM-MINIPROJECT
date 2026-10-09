export const workflowSteps = [
  {
    stepNumber: 1,
    title: "Identify the Task",
    shortSummary: "Determine suitable tasks for delegation vs. tasks requiring executive handling.",
    details: "Managers must evaluate tasks based on complexity, confidentiality, and routine nature. Highly repetitive operational duties, technical data analysis, and procedural tasks are prime candidates for delegation, while strategic goal-setting and disciplinary reviews should remain with executive leadership.",
    managerChecklist: [
      "Can another team member perform this with appropriate guidance?",
      "Does this task recurringly consume disproportionate managerial time?",
      "Will delegating this offer valuable developmental experience to the subordinate?"
    ],
    commonPitfall: "Delegating only unpleasant grunt work instead of meaningful developmental responsibilities."
  },
  {
    stepNumber: 2,
    title: "Select the Appropriate Employee",
    shortSummary: "Assess competencies, existing workload, and growth readiness.",
    details: "Match task demands with individual skills, career aspirations, and current bandwidth. Consider whether the employee needs full guidance, moderate coaching, or near-total autonomy.",
    managerChecklist: [
      "Review current assigned tasks to prevent burnout.",
      "Identify individuals who have demonstrated initiative in related areas.",
      "Ensure fair distribution of opportunities across the entire team."
    ],
    commonPitfall: "Always dumping work on the single most capable employee ('the curse of competence')."
  },
  {
    stepNumber: 3,
    title: "Define Responsibilities",
    shortSummary: "Articulate specific deliverables, standards, and scope boundaries.",
    details: "Deconstruct the task into explicit deliverables, quality criteria, and operational boundaries. Specify clearly what 'done' looks like and what fall-back protocols exist.",
    managerChecklist: [
      "Draft clear written task specifications.",
      "Clarify what is within scope and what remains strictly out of scope.",
      "Define quantitative and qualitative acceptance metrics."
    ],
    commonPitfall: "Giving vague verbal instructions like 'take care of the inventory' without precise definitions."
  },
  {
    stepNumber: 4,
    title: "Grant Required Authority",
    shortSummary: "Provide formal decision rights, budget limits, and system access.",
    details: "Provide the subordinate with legitimate formal authority to access databases, approve vendor transactions within preset financial limits, and instruct collaborating peers without friction.",
    managerChecklist: [
      "Grant digital ERP and documentation access permissions.",
      "Specify formal financial approval thresholds (e.g., up to ₹25,000).",
      "Announce the subordinate's delegated role to all relevant stakeholders."
    ],
    commonPitfall: "Demanding results while withholding essential passwords, budget approvals, or operational autonomy."
  },
  {
    stepNumber: 5,
    title: "Communicate Expectations & Deadlines",
    shortSummary: "Hold a structured briefing to establish mutual alignment.",
    details: "Conduct a comprehensive briefing session to ensure mutual understanding of objectives, milestones, intermediate check-ins, and final deadlines. Allow the employee to ask clarifying questions and reiterate the mandate.",
    managerChecklist: [
      "Confirm target completion date and critical milestone dates.",
      "Have the employee explain the task back in their own words (two-way feedback).",
      "Agree on the preferred communication channels for regular updates."
    ],
    commonPitfall: "Assuming the employee understood everything because they nodded silently during the briefing."
  },
  {
    stepNumber: 6,
    title: "Monitor Progress (Checkpoints)",
    shortSummary: "Track milestones without disruptive micromanagement.",
    details: "Establish predetermined touchpoints (e.g., bi-weekly standups, automated dashboard updates) rather than hovering over the employee's shoulder. Intervene only when critical variance or systemic blockers arise.",
    managerChecklist: [
      "Review milestone status against the agreed schedule.",
      "Inquire: 'What blockers are hindering your velocity?'",
      "Offer mentorship and resource unlocks without seizing back the task."
    ],
    commonPitfall: "Hovering constantly over daily steps or abruptly disappearing until the final day of delivery."
  },
  {
    stepNumber: 7,
    title: "Provide Feedback",
    shortSummary: "Deliver continuous, timely, and constructive coaching.",
    details: "Offer constructive course-correction early during execution. Acknowledge quick wins and guide the subordinate through unpredicted challenges while keeping psychological safety intact.",
    managerChecklist: [
      "Praise creative problem-solving and diligent adherence to standards.",
      "Address quality gaps objectively with reference to agreed metrics.",
      "Encourage the subordinate to propose corrective remedies themselves."
    ],
    commonPitfall: "Postponing constructive criticism until the very end when deadlines have already been compromised."
  },
  {
    stepNumber: 8,
    title: "Evaluate the Outcome",
    shortSummary: "Review deliverables, close accountability loop, and reward growth.",
    details: "Conduct a final post-completion review against initial criteria. Formally document performance achievements, recognize successful execution publicly, and record insights to refine future delegation cycles.",
    managerChecklist: [
      "Measure final deliverable against the established baseline.",
      "Conduct a brief retrospective: What worked smoothly? What should be improved?",
      "Publicly acknowledge the subordinate's contribution in team forums."
    ],
    commonPitfall: "Taking credit for the subordinate's success while shifting blame for any minor deviations."
  }
];

export const retailCaseWalkthrough = {
  scenarioTitle: "Comprehensive Walkthrough: Retail Inventory Audit Delegation",
  context: "Supermarket Retail Chain (FreshCart MegaStore, 45,000 sq ft)",
  manager: "Vikram Malhotra (General Store Manager)",
  delegatee: "Aravind Sharma (Floor Supervisor)",
  taskName: "Quarterly Comprehensive Physical Stock Audit & ERP Reconciliation",
  phases: [
    {
      phaseName: "Phase 1: Task Framing & Scope Definition",
      action: "Vikram analyzes previous stock audits and notes that reconciling 4,200 SKUs took 14 days and caused billing bottlenecks. He establishes a clear objective: Complete physical counting and ERP batch reconciliation within 5 working days with less than 0.5% unexplained variance.",
      deliverable: "Written Audit Charter with explicit SKU coverage and audit methodology."
    },
    {
      phaseName: "Phase 2: Subordinate Selection & Briefing",
      action: "Vikram selects Aravind Sharma, who has strong attention to detail and 18 months of inventory floor experience. Vikram schedules a dedicated 45-minute briefing session to walk through the audit charter and answer queries.",
      deliverable: "Mutual agreement on schedule, team assignments, and safety protocols."
    },
    {
      phaseName: "Phase 3: Formal Authority & Resource Vesting",
      action: "Vikram confers specific operational powers onto Aravind: (1) Temporary ERP Admin privileges to freeze stock batches, (2) Authority to schedule 6 floor staff for overtime, (3) Discretionary approval to write off expired/damaged goods up to ₹15,000 without prior GM sign-off.",
      deliverable: "ERP role permissions granted and formal memo broadcast to department supervisors."
    },
    {
      phaseName: "Phase 4: Milestone Check-Ins (Non-intrusive Monitoring)",
      action: "Rather than inspecting bins every hour, Vikram establishes two check-in gates: Gate 1 at Day 2 (50% physical count completion) and Gate 2 at Day 4 (ERP variance report generated). Aravind shares a 3-bullet daily summary on the store management dashboard.",
      deliverable: "Day 2 and Day 4 milestone reconciliation logs."
    },
    {
      phaseName: "Phase 5: Final Review, Recognition & Impact",
      action: "The audit concludes on Day 5 with 99.7% reconciliation accuracy. Vikram reviews the final report with Aravind, commends his innovative barcode batch scanning workflow, presents his findings to the Regional Director, and recommends Aravind for the Assistant Manager development track.",
      deliverable: "Signed Audit Closure Report, public commendation, and updated employee performance dossier."
    }
  ]
};
