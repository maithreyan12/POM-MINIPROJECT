import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  computeTaskMetrics,
  computeTeamWorkload,
  computeSurveyStats
} from '../utils/calculations';
import { surveyQuestions } from '../data/surveyQuestions';
import { EmptyState } from '../components/common/EmptyState';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  Users,
  CheckCircle2,
  FileQuestion,
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';

const LIKERT_COLORS = {
  'Strongly Agree': '#10B981', // emerald
  'Agree': '#3B82F6', // royal
  'Neutral': '#94A3B8', // slate
  'Disagree': '#F59E0B', // amber
  'Strongly Disagree': '#EF4444' // red
};

export const Analytics = () => {
  const {
    tasks,
    team,
    surveyResponses,
    loadDemoSurveyResponses,
    setActiveTab,
    workloadThreshold
  } = useApp();

  const taskMetrics = computeTaskMetrics(tasks);
  const teamWorkload = computeTeamWorkload(team, tasks, workloadThreshold);
  const surveyStats = computeSurveyStats(surveyResponses);

  // 1. Priority Distribution
  const priorityCounts = { Low: 0, Medium: 0, High: 0, Critical: 0 };
  tasks.forEach((t) => {
    if (priorityCounts[t.priority] !== undefined) priorityCounts[t.priority]++;
  });
  const priorityChartData = [
    { priority: 'Low', count: priorityCounts.Low, fill: '#64748B' },
    { priority: 'Medium', count: priorityCounts.Medium, fill: '#3B82F6' },
    { priority: 'High', count: priorityCounts.High, fill: '#F97316' },
    { priority: 'Critical', count: priorityCounts.Critical, fill: '#EF4444' }
  ];

  // 2. Agreement Stacked Bar Data (Q1 to Q9)
  const likertStackedData = surveyQuestions
    .filter((q) => !q.isText)
    .map((q) => {
      const qKey = `q${q.number}`;
      const counts = surveyStats.questionDistributions[qKey] || {
        'Strongly Agree': 0,
        Agree: 0,
        Neutral: 0,
        Disagree: 0,
        'Strongly Disagree': 0
      };

      return {
        label: `Q${q.number}`,
        dimension: q.dimension,
        'Strongly Agree': counts['Strongly Agree'],
        Agree: counts['Agree'],
        Neutral: counts['Neutral'],
        Disagree: counts['Disagree'],
        'Strongly Disagree': counts['Strongly Disagree']
      };
    });

  // 3. Perceived Benefits Comparison
  const benefitsComparisonData = [
    {
      benefit: 'Time Savings (Q4)',
      score: surveyStats.agreementRates.find((a) => a.questionNumber === 4)?.agreementRate || 0
    },
    {
      benefit: 'Employee Skills (Q5)',
      score: surveyStats.agreementRates.find((a) => a.questionNumber === 5)?.agreementRate || 0
    },
    {
      benefit: 'Decision Speed (Q6)',
      score: surveyStats.agreementRates.find((a) => a.questionNumber === 6)?.agreementRate || 0
    },
    {
      benefit: 'Productivity (Q9)',
      score: surveyStats.agreementRates.find((a) => a.questionNumber === 9)?.agreementRate || 0
    }
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-royal-100 dark:bg-royal-950/70 text-royal-700 dark:text-royal-300 border border-royal-200 dark:border-royal-800">
            Quantitative Analysis &bull; GE3751 POM
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Delegation Analytics & Empirical Survey Results
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Real-time statistical synthesis comparing operational task execution metrics with verified empirical research questionnaire submissions.
        </p>
      </div>

      {/* Part 1: Operational Task Analytics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-royal-600" />
            1. Operational Task & Workload Metrics
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Active Dataset: {taskMetrics.total} Delegated Tasks
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Tasks by Priority */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
              Task Priority Breakdown
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Distribution of delegated duties by strategic urgency
            </p>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={priorityChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700/60" vertical={false} />
                  <XAxis dataKey="priority" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} axisLine={{ stroke: '#cbd5e1' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      color: '#F8FAFC',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="count" name="Tasks" radius={[4, 4, 0, 0]} barSize={26}>
                    {priorityChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Task Completion Efficiency */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                Delegation Efficiency Index
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Overall completion throughput vs overdue friction
              </p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
                  <span className="text-xs uppercase font-bold text-emerald-700 dark:text-emerald-300 block">
                    Completion Rate
                  </span>
                  <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
                    {taskMetrics.completionRate}%
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                    {taskMetrics.completed} of {taskMetrics.total} finalized
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center">
                  <span className="text-xs uppercase font-bold text-blue-700 dark:text-blue-300 block">
                    Active Velocity
                  </span>
                  <span className="text-3xl font-black text-royal-600 dark:text-royal-400 mt-1 block">
                    {taskMetrics.inProgress}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                    Tasks undergoing execution
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 mt-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
              <span>Overdue Tasks: <strong className="text-rose-600">{taskMetrics.overdue}</strong></span>
              <span>Available Members: <strong className="text-emerald-600">{team.length}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Empirical Survey Research Analytics */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <FileQuestion className="w-5 h-5 text-royal-600" />
                2. Survey Research Findings
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                Sample Size: N = {surveyStats.totalResponses}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Empirical statistics derived from actual respondent submissions in local storage.
            </p>
          </div>

          {surveyStats.totalResponses === 0 && (
            <button
              onClick={loadDemoSurveyResponses}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-royal-600 text-white shadow-sm hover:bg-royal-700 self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Load Sample Demo Dataset
            </button>
          )}
        </div>

        {surveyStats.totalResponses === 0 ? (
          <EmptyState
            icon={FileQuestion}
            title="No survey data collected yet"
            description="Submit responses in the Research Survey tab or load sample demonstration data."
            actionLabel="Take Research Survey"
            onAction={() => setActiveTab('survey')}
          />
        ) : (
          <div className="space-y-6">
            {/* Chart 3: Likert Agreement Stacked Bar Chart */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Agreement Distribution Across Questions (Q1 to Q9)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Stacked Likert response breakdown across all recorded questionnaires
                  </p>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={likertStackedData} margin={{ top: 20, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700/60" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} axisLine={{ stroke: '#cbd5e1' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1E293B',
                        borderColor: '#334155',
                        borderRadius: '0.75rem',
                        color: '#F8FAFC',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                    <Bar dataKey="Strongly Agree" stackId="a" fill={LIKERT_COLORS['Strongly Agree']} />
                    <Bar dataKey="Agree" stackId="a" fill={LIKERT_COLORS['Agree']} />
                    <Bar dataKey="Neutral" stackId="a" fill={LIKERT_COLORS['Neutral']} />
                    <Bar dataKey="Disagree" stackId="a" fill={LIKERT_COLORS['Disagree']} />
                    <Bar dataKey="Strongly Disagree" stackId="a" fill={LIKERT_COLORS['Strongly Disagree']} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Question Reference Key */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                {surveyQuestions.filter(q => !q.isText).map(q => (
                  <div key={q.id} className="truncate">
                    <strong>Q{q.number}:</strong> {q.dimension}
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 4 & 5: Benefits Comparison & Role Distribution (2 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Benefits Comparison */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                  Perceived Delegation Benefits (% Positive Agreement)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Comparative percentage of respondents who Agreed or Strongly Agreed
                </p>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={benefitsComparisonData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700/60" horizontal={false} />
                      <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11, fill: '#64748b' }} />
                      <YAxis type="category" dataKey="benefit" tick={{ fontSize: 10, fill: '#64748b' }} width={120} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1E293B',
                          borderColor: '#334155',
                          borderRadius: '0.75rem',
                          color: '#F8FAFC',
                          fontSize: '12px'
                        }}
                        formatter={(val) => [`${val}%`, 'Agreement Rate']}
                      />
                      <Bar dataKey="score" fill="#2563EB" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Respondent Roles Distribution */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                    Respondent Demographics by Role
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    Representation of organizational levels in sample
                  </p>

                  <div className="space-y-3">
                    {surveyStats.roleDistribution.map((role) => (
                      <div key={role.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                          <span>{role.name}</span>
                          <span>{role.count} ({role.percentage}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                          <div
                            className="h-full bg-royal-600 rounded-full"
                            style={{ width: `${role.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 text-[11px] text-slate-500 dark:text-slate-400">
                  Total respondents: <strong>N = {surveyStats.totalResponses}</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
