/**
 * Check if a task is overdue
 */
export const isTaskOverdue = (task) => {
  if (!task.dueDate || task.status === 'Completed') return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(task.dueDate);
  due.setHours(0, 0, 0, 0);
  return due < today;
};

/**
 * Compute aggregate task metrics
 */
export const computeTaskMetrics = (tasks = []) => {
  const total = tasks.length;
  let completed = 0;
  let inProgress = 0;
  let notStarted = 0;
  let blocked = 0;
  let overdue = 0;

  tasks.forEach((t) => {
    if (t.status === 'Completed') completed++;
    else if (t.status === 'In Progress') inProgress++;
    else if (t.status === 'Not Started') notStarted++;
    else if (t.status === 'Blocked') blocked++;

    if (isTaskOverdue(t)) overdue++;
  });

  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    inProgress,
    notStarted,
    blocked,
    pending,
    overdue,
    completionRate
  };
};

/**
 * Compute team member workload
 */
export const computeTeamWorkload = (team = [], tasks = [], overloadThreshold = 3) => {
  return team.map((member) => {
    const assignedTasks = tasks.filter((t) => t.assignedTo === member.id);
    const completedTasks = assignedTasks.filter((t) => t.status === 'Completed').length;
    const pendingTasks = assignedTasks.filter((t) => t.status !== 'Completed').length;
    const overdueTasks = assignedTasks.filter((t) => isTaskOverdue(t)).length;
    const totalAssigned = assignedTasks.length;

    let statusLevel = 'Optimal';
    if (pendingTasks >= overloadThreshold) {
      statusLevel = 'High Load';
    } else if (pendingTasks === 0) {
      statusLevel = 'Available';
    }

    return {
      ...member,
      totalAssigned,
      completedTasks,
      pendingTasks,
      overdueTasks,
      statusLevel,
      isOverloaded: pendingTasks >= overloadThreshold
    };
  });
};

/**
 * Compute survey statistics
 */
export const computeSurveyStats = (responses = []) => {
  const totalResponses = responses.length;
  if (totalResponses === 0) {
    return {
      totalResponses: 0,
      roleDistribution: [],
      categoryDistribution: [],
      questionDistributions: {},
      agreementRates: []
    };
  }

  // Role distribution
  const roleCounts = {};
  responses.forEach((r) => {
    const role = r.role || 'Unspecified';
    roleCounts[role] = (roleCounts[role] || 0) + 1;
  });
  const roleDistribution = Object.keys(roleCounts).map((role) => ({
    name: role,
    count: roleCounts[role],
    percentage: Math.round((roleCounts[role] / totalResponses) * 100)
  }));

  // Org category distribution
  const categoryCounts = {};
  responses.forEach((r) => {
    const cat = r.orgCategory || 'Other';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });
  const categoryDistribution = Object.keys(categoryCounts).map((cat) => ({
    name: cat,
    count: categoryCounts[cat]
  }));

  // Likert distribution per question (Q1 to Q9)
  const likertKeys = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'];
  const questionDistributions = {};
  const agreementRates = [];

  for (let i = 1; i <= 9; i++) {
    const qKey = `q${i}`;
    const counts = { 'Strongly Agree': 0, 'Agree': 0, 'Neutral': 0, 'Disagree': 0, 'Strongly Disagree': 0 };

    responses.forEach((r) => {
      if (counts[r[qKey]] !== undefined) {
        counts[r[qKey]]++;
      }
    });

    questionDistributions[qKey] = counts;

    const positiveCount = counts['Strongly Agree'] + counts['Agree'];
    const agreementRate = Math.round((positiveCount / totalResponses) * 100);

    agreementRates.push({
      questionNumber: i,
      questionKey: qKey,
      positiveCount,
      agreementRate,
      stronglyAgree: counts['Strongly Agree'],
      agree: counts['Agree'],
      neutral: counts['Neutral'],
      disagree: counts['Disagree'],
      stronglyDisagree: counts['Strongly Disagree']
    });
  }

  return {
    totalResponses,
    roleDistribution,
    categoryDistribution,
    questionDistributions,
    agreementRates
  };
};
