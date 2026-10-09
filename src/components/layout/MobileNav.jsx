import React from 'react';
import { useApp } from '../../context/AppContext';
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
  X,
  ShieldCheck
} from 'lucide-react';

export const MobileNav = () => {
  const {
    activeTab,
    setActiveTab,
    mobileMenuOpen,
    setMobileMenuOpen
  } = useApp();

  if (!mobileMenuOpen) return null;

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks", label: "Task Delegation", icon: CheckSquare },
    { id: "team", label: "Team Members", icon: Users },
    { id: "overview", label: "Project Overview", icon: BookOpen },
    { id: "fundamentals", label: "Fundamentals", icon: Compass },
    { id: "workflow", label: "Delegation Workflow", icon: GitBranch },
    { id: "case-studies", label: "Case Studies", icon: Briefcase },
    { id: "challenges", label: "Challenges & Solutions", icon: AlertTriangle },
    { id: "practices", label: "Best Practices", icon: Award },
    { id: "survey", label: "Research Survey", icon: FileQuestion },
    { id: "responses", label: "Survey Responses", icon: Database },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "report", label: "Project Report", icon: FileText },
    { id: "about", label: "About Project", icon: Info },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden bg-slate-900/60 backdrop-blur-sm">
      <div className="fixed inset-y-0 left-0 w-72 bg-[#14213D] text-slate-100 p-4 shadow-elevated flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-navy-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-royal-600 flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-base text-white">DelegatePro</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links list */}
          <div className="mt-4 space-y-1 max-h-[calc(100vh-140px)] overflow-y-auto pr-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-royal-600 text-white font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-navy-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-navy-800 text-xs text-slate-400">
          <p className="font-semibold text-slate-300">GE3751 POM Mini Project</p>
          <p className="text-[11px] text-slate-500">Principles of Management</p>
        </div>
      </div>
    </div>
  );
};
