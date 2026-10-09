import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { computeTaskMetrics, computeTeamWorkload } from '../../utils/calculations';
import {
  Menu,
  Sun,
  Moon,
  Plus,
  Bell,
  FileText,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';

export const Header = ({ onOpenTaskModal }) => {
  const {
    activeTab,
    setActiveTab,
    theme,
    toggleTheme,
    mobileMenuOpen,
    setMobileMenuOpen,
    tasks,
    team,
    workloadThreshold
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const metrics = computeTaskMetrics(tasks);
  const teamWorkload = computeTeamWorkload(team, tasks, workloadThreshold);
  const overloadedMembers = teamWorkload.filter((m) => m.isOverloaded);
  const overdueTasks = tasks.filter((t) => metrics.overdue > 0 && t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Completed');

  const totalAlerts = overdueTasks.length + overloadedMembers.length;

  const tabTitles = {
    dashboard: { title: "Delegation Management Dashboard", subtitle: "Operational oversight, task distribution, and delegation performance" },
    overview: { title: "Project Overview", subtitle: "Academic abstract, study objectives, methodology, and course context" },
    fundamentals: { title: "Delegation Fundamentals", subtitle: "Core concepts, tripartite elements, organizational importance, and principles" },
    tasks: { title: "Task Delegation Workspace", subtitle: "Assign responsibilities, confer authority, set deadlines, and track execution" },
    team: { title: "Team Member Management", subtitle: "Human resource roster, competency profiles, and active workload distribution" },
    workflow: { title: "Delegation Workflow & Timeline", subtitle: "8-step procedural framework with real-world retail audit walkthrough" },
    'case-studies': { title: "Delegation Case Studies", subtitle: "Practical management dilemmas and delegation solutions across MSMEs" },
    survey: { title: "Research Questionnaire", subtitle: "Empirical survey on managerial delegation effectiveness & employee empowerment" },
    responses: { title: "Survey Submissions & Raw Data", subtitle: "Review, filter, inspect, and export collected research survey entries" },
    analytics: { title: "Delegation Analytics & Insights", subtitle: "Statistical visual charts, task completion ratios, and Likert survey results" },
    challenges: { title: "Challenges & Recommended Solutions", subtitle: "Overcoming managerial resistance, micromanagement, and communication barriers" },
    practices: { title: "Best Practices Checklist", subtitle: "Audited checklist of 12 essential principles for effective delegation" },
    report: { title: "Mini Project Report Generator", subtitle: "Official 16-section academic project report ready for review and printing" },
    about: { title: "About GE3751 POM Project", subtitle: "Syllabus alignment, developer team credits, and architecture documentation" },
    settings: { title: "System Settings & Data Control", subtitle: "Workload parameters, theme customization, and JSON data backup/recovery" }
  };

  const currentTabInfo = tabTitles[activeTab] || tabTitles.dashboard;

  return (
    <header className="header-container bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 h-16 sticky top-0 z-20 transition-colors">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 truncate tracking-tight">
              {currentTabInfo.title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block truncate">
              {currentTabInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Delegate Task Button */}
          <button
            onClick={onOpenTaskModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-royal-600 hover:bg-royal-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-royal-500/50"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Delegate Task</span>
            <span className="sm:hidden">Delegate</span>
          </button>

          {/* Quick Nav to Report */}
          <button
            onClick={() => setActiveTab('report')}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700 transition-colors"
            title="Open printable project report"
          >
            <FileText className="w-3.5 h-3.5 text-royal-600 dark:text-royal-400" />
            <span>Academic Report</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalAlerts > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900"></span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-elevated p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-royal-600 dark:text-royal-400" />
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      System Alerts & Notifications
                    </h3>
                  </div>
                  <button
                    onClick={() => setNotificationsOpen(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="py-2 max-h-72 overflow-y-auto space-y-2">
                  {totalAlerts === 0 ? (
                    <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                      All delegated tasks are on schedule and team workloads are balanced.
                    </div>
                  ) : (
                    <>
                      {overdueTasks.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => {
                            setActiveTab('tasks');
                            setNotificationsOpen(false);
                          }}
                          className="p-2.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/60 text-xs flex items-start gap-2.5 cursor-pointer hover:bg-rose-100/60 transition-colors"
                        >
                          <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="font-semibold text-rose-900 dark:text-rose-200 truncate">
                              Overdue Task: {t.title}
                            </p>
                            <p className="text-[11px] text-rose-700 dark:text-rose-300 mt-0.5">
                              Deadline was {t.dueDate}. Review with delegatee.
                            </p>
                          </div>
                        </div>
                      ))}

                      {overloadedMembers.map((m) => (
                        <div
                          key={m.id}
                          onClick={() => {
                            setActiveTab('team');
                            setNotificationsOpen(false);
                          }}
                          className="p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/60 text-xs flex items-start gap-2.5 cursor-pointer hover:bg-amber-100/60 transition-colors"
                        >
                          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <p className="font-semibold text-amber-900 dark:text-amber-200 truncate">
                              High Workload: {m.name}
                            </p>
                            <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-0.5">
                              Has {m.pendingTasks} pending tasks (threshold: {workloadThreshold}). Consider reassigning.
                            </p>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">
                    Calculated in real-time
                  </span>
                  <button
                    onClick={() => {
                      setActiveTab('tasks');
                      setNotificationsOpen(false);
                    }}
                    className="font-semibold text-royal-600 dark:text-royal-400 hover:underline"
                  >
                    View All Tasks &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
