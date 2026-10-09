import React from 'react';
import { useApp } from '../../context/AppContext';
import { computeTaskMetrics } from '../../utils/calculations';
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  BookOpen,
  Compass,
  GitBranch,
  Briefcase,
  FileQuestion,
  Database,
  BarChart3,
  AlertTriangle,
  Award,
  FileText,
  Info,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    sidebarCollapsed,
    setSidebarCollapsed,
    tasks,
    surveyResponses
  } = useApp();

  const metrics = computeTaskMetrics(tasks);

  const navGroups = [
    {
      group: "Operations",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "tasks", label: "Task Delegation", icon: CheckSquare, badge: metrics.overdue > 0 ? `${metrics.overdue} Overdue` : null, badgeVariant: "danger" },
        { id: "team", label: "Team Members", icon: Users }
      ]
    },
    {
      group: "POM Curriculum",
      items: [
        { id: "overview", label: "Project Overview", icon: BookOpen },
        { id: "fundamentals", label: "Fundamentals", icon: Compass },
        { id: "workflow", label: "Delegation Workflow", icon: GitBranch },
        { id: "case-studies", label: "Case Studies", icon: Briefcase },
        { id: "challenges", label: "Challenges & Solutions", icon: AlertTriangle },
        { id: "practices", label: "Best Practices", icon: Award }
      ]
    },
    {
      group: "Research & Analytics",
      items: [
        { id: "survey", label: "Research Survey", icon: FileQuestion },
        { id: "responses", label: "Survey Responses", icon: Database, badge: surveyResponses.length > 0 ? `${surveyResponses.length}` : null },
        { id: "analytics", label: "Analytics", icon: BarChart3 }
      ]
    },
    {
      group: "Documentation",
      items: [
        { id: "report", label: "Project Report", icon: FileText, highlight: true },
        { id: "about", label: "About Project", icon: Info },
        { id: "settings", label: "Settings", icon: Settings }
      ]
    }
  ];

  return (
    <aside
      className={`sidebar-container hidden md:flex flex-col bg-[#14213D] text-slate-200 border-r border-navy-800 transition-all duration-300 select-none z-30 shrink-0 ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-navy-800">
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-royal-600 to-blue-400 flex items-center justify-center text-white font-black shadow-md shrink-0">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div className="truncate">
              <span className="font-extrabold text-base tracking-tight text-white block">
                Delegate<span className="text-blue-400">Pro</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider text-slate-400 uppercase block -mt-1">
                GE3751 POM Mini Project
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-9 h-9 rounded-xl bg-gradient-to-tr from-royal-600 to-blue-400 flex items-center justify-center text-white font-black shadow-md">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
        )}

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800/80 transition-colors ${
            sidebarCollapsed ? 'mx-auto mt-2 hidden' : ''
          }`}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-5">
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {!sidebarCollapsed && (
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                {group.group}
              </p>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all group relative ${
                    isActive
                      ? 'bg-royal-600 text-white shadow-sm font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-navy-800/60'
                  } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  {!sidebarCollapsed && (
                    <span className="truncate text-left flex-1">{item.label}</span>
                  )}

                  {!sidebarCollapsed && item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        item.badgeVariant === 'danger'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-navy-800 text-slate-300 border border-navy-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {sidebarCollapsed && item.badge && item.badgeVariant === 'danger' && (
                    <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Profile / Subject Badge */}
      <div className="p-3 border-t border-navy-800">
        {!sidebarCollapsed ? (
          <div className="p-2.5 rounded-xl bg-navy-800/70 border border-navy-700/80 space-y-1">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">GE3751 &bull; Principles of Management</p>
                <p className="text-[10px] text-emerald-400 font-semibold truncate">Gopika K &bull; 23521</p>
              </div>
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-navy-700/60"
                title="Collapse"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-[9px] text-slate-400 truncate">B.Tech IT &bull; 4th Year</p>
          </div>
        ) : (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="w-full flex justify-center py-2 text-slate-400 hover:text-white hover:bg-navy-800/80 rounded-xl"
            title="Expand"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
};
