import React from 'react';
import { useApp } from '../context/AppContext';
import { computeTaskMetrics, computeTeamWorkload } from '../utils/calculations';
import { StatCard } from '../components/common/StatCard';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Percent,
  Plus,
  UserPlus,
  FileText,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Calendar
} from 'lucide-react';

const STATUS_COLORS = {
  'Completed': '#10B981',
  'In Progress': '#2563EB',
  'Not Started': '#94A3B8',
  'Blocked': '#F59E0B'
};

export const Dashboard = ({ onOpenTaskModal, onOpenMemberModal, onSelectTask }) => {
  const {
    tasks,
    team,
    setActiveTab,
    workloadThreshold
  } = useApp();

  const metrics = computeTaskMetrics(tasks);
  const teamWorkload = computeTeamWorkload(team, tasks, workloadThreshold);

  // Status distribution data for Pie Chart
  const statusChartData = [
    { name: 'Completed', value: metrics.completed, color: STATUS_COLORS['Completed'] },
    { name: 'In Progress', value: metrics.inProgress, color: STATUS_COLORS['In Progress'] },
    { name: 'Not Started', value: metrics.notStarted, color: STATUS_COLORS['Not Started'] },
    { name: 'Blocked', value: metrics.blocked, color: STATUS_COLORS['Blocked'] }
  ].filter(d => d.value > 0);

  // Workload bar chart data
  const workloadChartData = teamWorkload.map(m => ({
    name: m.name.split(' ')[0], // First name for clean axis
    fullName: m.name,
    Pending: m.pendingTasks,
    Completed: m.completedTasks
  }));

  // Recent 4 tasks
  const recentTasks = tasks.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Top Banner / Academic Mini Project Intro */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-900 via-navy-800 to-royal-900 p-6 sm:p-8 text-white shadow-elevated">
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-sm border border-white/15 text-blue-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              GE3751 &bull; Principles of Management Mini Project
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <span>Completed By: <strong>Gopika K</strong> (23521) &bull; B.Tech IT 4th Year</span>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Role of Delegation in Effective Management
          </h2>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-2xl">
            A comprehensive management platform illustrating task assignment, authority granting, accountability tracking, and empirical organizational research.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenTaskModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-royal-600 hover:bg-royal-500 text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <Plus className="w-4 h-4" />
              Delegate Task
            </button>
            <button
              onClick={onOpenMemberModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/20 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              Add Member
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition-all"
            >
              <FileText className="w-4 h-4" />
              View Academic Report
            </button>
          </div>
        </div>

        {/* Subtle decorative background circle */}
        <div className="absolute -right-12 -bottom-16 w-64 h-64 rounded-full bg-royal-500/10 blur-2xl pointer-events-none"></div>
      </div>

      {/* KPI Cards Row (6 metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        <StatCard
          title="Total Tasks"
          value={metrics.total}
          subtitle="Delegated responsibilities"
          icon={CheckSquare}
          color="navy"
          onClick={() => setActiveTab('tasks')}
        />
        <StatCard
          title="Pending"
          value={metrics.pending}
          subtitle="Active execution"
          icon={Clock}
          color="blue"
          onClick={() => setActiveTab('tasks')}
        />
        <StatCard
          title="Completed"
          value={metrics.completed}
          subtitle="Verified outcomes"
          icon={CheckCircle2}
          color="emerald"
          onClick={() => setActiveTab('tasks')}
        />
        <StatCard
          title="Overdue"
          value={metrics.overdue}
          subtitle="Requires attention"
          icon={AlertCircle}
          color={metrics.overdue > 0 ? "rose" : "blue"}
          badgeText={metrics.overdue > 0 ? "Action needed" : "On schedule"}
          onClick={() => setActiveTab('tasks')}
        />
        <StatCard
          title="Team Members"
          value={team.length}
          subtitle="Active roster"
          icon={Users}
          color="blue"
          onClick={() => setActiveTab('team')}
        />
        <StatCard
          title="Completion Rate"
          value={`${metrics.completionRate}%`}
          subtitle="Efficiency index"
          icon={Percent}
          color="emerald"
          trend={{ text: `${metrics.completed}/${metrics.total} Tasks`, isPositive: true }}
          onClick={() => setActiveTab('analytics')}
        />
      </div>

      {/* Analytics Visual Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Task Status Distribution (Donut Chart) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Task Status Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Proportion of tasks across lifecycle stages
              </p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              {metrics.total} Total
            </span>
          </div>

          {metrics.total === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <EmptyState
                title="No tasks delegated yet"
                description="Create a task to view the status distribution."
                actionLabel="Create Task"
                onAction={onOpenTaskModal}
              />
            </div>
          ) : (
            <div className="h-64 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      borderColor: '#334155',
                      borderRadius: '0.75rem',
                      color: '#F8FAFC',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Center stat inside donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-black text-slate-800 dark:text-slate-100">
                  {metrics.completionRate}%
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Completed
                </span>
              </div>
            </div>
          )}

          {/* Legend row */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {Object.keys(STATUS_COLORS).map((status) => {
              const count = tasks.filter(t => t.status === status).length;
              return (
                <div key={status} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: STATUS_COLORS[status] }}
                  ></span>
                  <span className="truncate text-slate-600 dark:text-slate-300 text-[11px]">
                    {status}: <strong className="text-slate-900 dark:text-slate-100">{count}</strong>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workload by Team Member (Bar Chart) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Workload Distribution by Team Member
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Active pending vs completed duties per member
              </p>
            </div>
            <button
              onClick={() => setActiveTab('team')}
              className="text-xs font-semibold text-royal-600 dark:text-royal-400 hover:underline flex items-center gap-1"
            >
              Manage Team &rarr;
            </button>
          </div>

          {team.length === 0 ? (
            <div className="h-64 flex items-center justify-center">
              <EmptyState
                title="No team members added"
                description="Add subordinates to distribute managerial workload."
                actionLabel="Add Member"
                onAction={onOpenMemberModal}
              />
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={workloadChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700/60" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={{ stroke: '#cbd5e1' }} />
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
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="Pending" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={18} />
                  <Bar dataKey="Completed" fill="#10B981" radius={[4, 4, 0, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Workload threshold: <strong>{workloadThreshold} tasks</strong></span>
            <span>Balanced delegation optimizes team productivity</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Delegated Tasks & Delegation Principles Highlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Delegated Tasks */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Recent Delegated Tasks
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Recently assigned duties and accountability checkpoints
              </p>
            </div>
            <button
              onClick={() => setActiveTab('tasks')}
              className="text-xs font-semibold text-royal-600 dark:text-royal-400 hover:underline flex items-center gap-1"
            >
              View All ({tasks.length}) &rarr;
            </button>
          </div>

          {tasks.length === 0 ? (
            <EmptyState
              title="No tasks delegated"
              description="Start by creating a new delegated task."
              actionLabel="Delegate Task"
              onAction={onOpenTaskModal}
            />
          ) : (
            <div className="space-y-3">
              {recentTasks.map((task) => {
                const assigned = team.find(m => m.id === task.assignedTo);
                const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'Completed';

                return (
                  <div
                    key={task.id}
                    onClick={() => onSelectTask(task)}
                    className="p-3.5 rounded-xl border border-slate-200/70 dark:border-slate-700/70 hover:border-royal-500/50 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <StatusBadge status={task.status} isOverdue={isOverdue} />
                        <PriorityBadge priority={task.priority} />
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Due: {task.dueDate}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-royal-600 dark:group-hover:text-royal-400 transition-colors">
                        {task.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        Assigned to: <strong className="text-slate-700 dark:text-slate-300">{assigned?.name || 'Unassigned'}</strong> ({assigned?.role || 'N/A'})
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <span className="text-xs text-royal-600 dark:text-royal-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                        Details &rarr;
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Delegation Activity & Tripartite Summary */}
        <div className="lg:col-span-5 space-y-4">
          {/* Tripartite Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
              The Delegation Process
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Core tripartite relationship in Principles of Management
            </p>

            <div className="space-y-3">
              <div
                onClick={() => setActiveTab('fundamentals')}
                className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 cursor-pointer hover:border-royal-500 transition-all"
              >
                <div className="flex items-center gap-2 font-bold text-xs text-royal-700 dark:text-royal-300">
                  <span className="w-5 h-5 rounded-full bg-royal-600 text-white flex items-center justify-center text-[10px]">1</span>
                  Assignment of Duties
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 pl-7">
                  Clearly defining the task, expected standards, and time boundary.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('fundamentals')}
                className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/60 cursor-pointer hover:border-emerald-500 transition-all"
              >
                <div className="flex items-center gap-2 font-bold text-xs text-emerald-700 dark:text-emerald-300">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
                  Granting Authority
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 pl-7">
                  Vesting legitimate decision rights and resource access (Parity Principle).
                </p>
              </div>

              <div
                onClick={() => setActiveTab('fundamentals')}
                className="p-3 rounded-xl bg-navy-50/70 dark:bg-navy-950/40 border border-navy-200/60 dark:border-navy-900/60 cursor-pointer hover:border-navy-500 transition-all"
              >
                <div className="flex items-center gap-2 font-bold text-xs text-navy-800 dark:text-blue-300">
                  <span className="w-5 h-5 rounded-full bg-[#14213D] text-white flex items-center justify-center text-[10px]">3</span>
                  Establishing Accountability
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 pl-7">
                  Subordinate answerability while manager retains ultimate responsibility.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs">
              <span className="text-slate-500">Interactive study guide</span>
              <button
                onClick={() => setActiveTab('fundamentals')}
                className="font-semibold text-royal-600 dark:text-royal-400 hover:underline"
              >
                Explore Fundamentals &rarr;
              </button>
            </div>
          </div>

          {/* Quick Research Questionnaire Promo Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 rounded-2xl p-5 border border-blue-200/70 dark:border-slate-700 shadow-subtle flex items-start gap-4">
            <div className="p-3 rounded-xl bg-royal-600 text-white shrink-0 shadow-md">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Delegation Research Survey
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Record your responses to our 10-point academic survey on managerial time-saving, authority parity, and productivity.
              </p>
              <button
                onClick={() => setActiveTab('survey')}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-royal-600 dark:text-royal-400 hover:underline"
              >
                Take Survey Now &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
