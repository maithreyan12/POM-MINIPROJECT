/**
 * Helper to escape CSV cell value according to RFC-4180
 */
const escapeCsvCell = (val) => {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
};

/**
 * Export Survey Responses to CSV
 */
export const exportSurveyResponsesToCSV = (responses = [], filename = "delegatepro_survey_responses.csv") => {
  if (!responses || responses.length === 0) {
    alert("No survey responses available to export.");
    return false;
  }

  const headers = [
    "Response ID",
    "Timestamp",
    "Respondent Name",
    "Organization",
    "Category",
    "Role",
    "Experience",
    "Q1: Clear Assignment",
    "Q2: Sufficient Authority",
    "Q3: Clear Expectations & Deadlines",
    "Q4: Saves Managerial Time",
    "Q5: Improves Skills & Confidence",
    "Q6: Faster Decisions",
    "Q7: Employee Accountability",
    "Q8: Suitable Guidance & Feedback",
    "Q9: Team Productivity",
    "Q10: Biggest Challenge"
  ];

  const rows = responses.map((r) => [
    r.id || "",
    r.timestamp ? new Date(r.timestamp).toLocaleString() : "",
    r.respondentName || "Anonymous",
    r.organization || "N/A",
    r.orgCategory || "",
    r.role || "",
    r.experience || "",
    r.q1 || "",
    r.q2 || "",
    r.q3 || "",
    r.q4 || "",
    r.q5 || "",
    r.q6 || "",
    r.q7 || "",
    r.q8 || "",
    r.q9 || "",
    r.q10 || ""
  ]);

  const csvContent = [
    headers.map(escapeCsvCell).join(","),
    ...rows.map((row) => row.map(escapeCsvCell).join(","))
  ].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
};

/**
 * Export Tasks to CSV
 */
export const exportTasksToCSV = (tasks = [], team = [], filename = "delegatepro_tasks.csv") => {
  if (!tasks || tasks.length === 0) {
    alert("No tasks available to export.");
    return false;
  }

  const memberMap = {};
  team.forEach((m) => {
    memberMap[m.id] = m.name;
  });

  const headers = [
    "Task ID",
    "Title",
    "Assigned To",
    "Priority",
    "Status",
    "Start Date",
    "Due Date",
    "Authority Granted",
    "Expected Outcome",
    "Description",
    "Manager Notes"
  ];

  const rows = tasks.map((t) => [
    t.id || "",
    t.title || "",
    memberMap[t.assignedTo] || "Unassigned",
    t.priority || "",
    t.status || "",
    t.startDate || "",
    t.dueDate || "",
    t.authority || "",
    t.expectedOutcome || "",
    t.description || "",
    t.managerNotes || ""
  ]);

  const csvContent = [
    headers.map(escapeCsvCell).join(","),
    ...rows.map((row) => row.map(escapeCsvCell).join(","))
  ].join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
};
