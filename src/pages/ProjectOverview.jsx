import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Target,
  Compass,
  FileCheck2,
  Workflow,
  Sparkles,
  Award,
  AlertCircle,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const ProjectOverview = () => {
  const { setActiveTab } = useApp();

  const objectives = [
    {
      number: "01",
      title: "Meaning & Importance",
      text: "To understand the meaning and importance of delegation in modern managerial structures."
    },
    {
      number: "02",
      title: "Elements of Delegation",
      text: "To study the core tripartite elements of delegation: Duties, Authority, and Accountability."
    },
    {
      number: "03",
      title: "Managerial Effectiveness",
      text: "To examine the relationship between systematic delegation and managerial time optimization."
    },
    {
      number: "04",
      title: "Employee Development",
      text: "To understand how delegation fosters subordinate competence, initiative, and team productivity."
    },
    {
      number: "05",
      title: "Barriers & Dilemmas",
      text: "To identify common psychological and organizational hurdles encountered during delegation."
    },
    {
      number: "06",
      title: "Best Practice Guidelines",
      text: "To formulate actionable recommendations and checklists for effective delegation execution."
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-royal-100 dark:bg-royal-950/70 text-royal-700 dark:text-royal-300 border border-royal-200 dark:border-royal-800">
            GE3751 &bull; Principles of Management
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            College Mini Project
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Role of Delegation in Effective Management
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          An applied academic investigation combining foundational management principles, practical interactive workflow tools, and empirical survey analysis to evaluate how managerial delegation drives enterprise productivity.
        </p>
      </div>

      {/* Abstract */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle relative overflow-hidden">
        <div className="flex items-center gap-2.5 mb-4 text-royal-600 dark:text-royal-400">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Abstract
          </h2>
        </div>
        <blockquote className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed italic border-l-4 border-royal-600 pl-4 py-1 bg-royal-50/40 dark:bg-royal-950/20 rounded-r-xl">
          "This study examines the role of delegation in effective management. It explores how managers assign responsibilities and authority to employees, establish accountability, monitor performance, and support organizational objectives. It also examines the potential benefits, challenges, and best practices associated with delegation."
        </blockquote>
      </div>

      {/* Introduction & Need for Study (2 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-3">
          <div className="flex items-center gap-2.5 text-royal-600 dark:text-royal-400">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              1. Introduction
            </h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            In any expanding enterprise, a single executive cannot personally supervise and execute every operational transaction. Management, fundamentally described by Mary Parker Follett as "the art of getting things done through people," relies heavily on the scalar transfer of authority.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Delegation serves as the primary organizing mechanism that bridges executive vision with front-line execution, fostering distributed decision-making while maintaining centralized strategic accountability.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
            <Target className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              2. Need for the Study
            </h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Despite the recognized theoretical value of delegation, real-world organizations frequently encounter leadership bottlenecks. Many managers hesitate to delegate due to fear of losing control, lack of trust in subordinate competencies, or micromanagement tendencies.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Conversely, subordinates often face "authority deficits"—held accountable for targets without being granted the legitimate spending or administrative rights needed to execute them. This study investigates these systemic gaps.
          </p>
        </div>
      </div>

      {/* Objectives of the Study (Grid of 6) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <div className="flex items-center gap-2.5 text-royal-600 dark:text-royal-400">
            <Compass className="w-5 h-5" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              3. Objectives of the Study
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Formulated as per GE3751 syllabus benchmarks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {objectives.map((obj) => (
            <div
              key={obj.number}
              className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/70 dark:border-slate-700/70 hover:border-royal-500/50 transition-all group"
            >
              <span className="text-xs font-black text-royal-600 dark:text-royal-400 font-mono">
                OBJECTIVE {obj.number}
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1 mb-1.5 group-hover:text-royal-600 dark:group-hover:text-royal-400 transition-colors">
                {obj.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {obj.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scope of the Study */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center gap-2.5 mb-4 text-royal-600 dark:text-royal-400">
          <Workflow className="w-5 h-5" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            4. Scope of the Study
          </h2>
        </div>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          "The study focuses on delegation practices in organizations, including task allocation, authority, responsibility, accountability, communication, supervision, and employee performance."
        </p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-medium text-slate-700 dark:text-slate-300">
            Task Allocation
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-medium text-slate-700 dark:text-slate-300">
            Parity of Authority
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-medium text-slate-700 dark:text-slate-300">
            Accountability Flow
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-center font-medium text-slate-700 dark:text-slate-300">
            Productivity Impact
          </div>
        </div>
      </div>

      {/* Methodology & Expected Outcomes (Side by Side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Methodology */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-3">
          <div className="flex items-center gap-2.5 text-royal-600 dark:text-royal-400">
            <FileCheck2 className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              5. Research Methodology
            </h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-royal-600 mt-2 shrink-0"></span>
              <span><strong>Primary Data:</strong> Structured 10-item empirical survey targeting managers, supervisors, and employees across sectors.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-royal-600 mt-2 shrink-0"></span>
              <span><strong>Secondary Data:</strong> Academic literature, textbook references (Koontz, Weihrich, Robbins), and illustrative case studies.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-royal-600 mt-2 shrink-0"></span>
              <span><strong>Analytical Instruments:</strong> 5-point Likert scale distribution analysis, workload variance mapping, and percentage frequencies.</span>
            </li>
          </ul>
        </div>

        {/* Expected Outcomes vs Actual Findings */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400">
            <Award className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              6. Expected Outcomes
            </h3>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Academic Integrity Notice:</strong> Expected outcomes reflect initial theoretical hypotheses. Actual verified research findings are generated solely from real survey responses recorded in this system.
            </span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
              <span>Managers who delegate systematically report saving substantial weekly administrative hours.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
              <span>Subordinates granted commensurate authority demonstrate higher initiative and satisfaction.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
              <span>Unclear instructions and fear of blame remain the most critical barriers to effective delegation.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Ready to explore theoretical foundations?
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Review the tripartite elements, organizational importance, and core principles.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('fundamentals')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-royal-600 hover:bg-royal-700 text-white shadow-sm transition-all"
        >
          <span>Explore Fundamentals</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
