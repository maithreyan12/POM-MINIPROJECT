import React, { useState } from 'react';
import { workflowSteps, retailCaseWalkthrough } from '../data/workflowData';
import {
  GitBranch,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Store,
  ChevronDown,
  ChevronUp,
  FileText,
  UserCheck,
  ShieldCheck,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';

export const DelegationWorkflow = () => {
  const [activeStepNumber, setActiveStepNumber] = useState(1);
  const [expandedPhaseIndex, setExpandedPhaseIndex] = useState(0);

  const activeStep = workflowSteps.find((s) => s.stepNumber === activeStepNumber) || workflowSteps[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-royal-100 dark:bg-royal-950/70 text-royal-700 dark:text-royal-300 border border-royal-200 dark:border-royal-800">
            Procedural Management Framework
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          The 8-Step Delegation Workflow
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          A systematic operational roadmap designed to transition responsibilities from executive oversight to subordinate ownership while maintaining managerial control and psychological safety.
        </p>
      </div>

      {/* Interactive 8-Step Stepper / Timeline */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-royal-600" />
            Interactive Workflow Timeline
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            Step {activeStepNumber} of 8: {activeStep.title}
          </span>
        </div>

        {/* Stepper Buttons Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-2 pb-6 border-b border-slate-100 dark:border-slate-700/80">
          {workflowSteps.map((step) => {
            const isCurrent = step.stepNumber === activeStepNumber;
            const isPassed = step.stepNumber < activeStepNumber;

            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepNumber(step.stepNumber)}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  isCurrent
                    ? 'border-royal-600 bg-royal-50/70 dark:bg-royal-950/50 shadow-sm ring-2 ring-royal-500/20'
                    : isPassed
                    ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700/40'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${
                    isCurrent
                      ? 'bg-royal-600 text-white'
                      : isPassed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {isPassed ? <CheckCircle2 className="w-4 h-4" /> : step.stepNumber}
                </div>
                <span className={`text-[11px] font-bold leading-tight truncate w-full ${
                  isCurrent ? 'text-royal-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'
                }`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Step Deep-Dive Inspector */}
        <div className="mt-6 space-y-5 animate-fadeIn">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-royal-600 text-white font-black text-base flex items-center justify-center shadow-md">
              0{activeStep.stepNumber}
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400">
                Phase Breakdown
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
                {activeStep.title}
              </h3>
            </div>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700">
            {activeStep.details}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Manager Checklist */}
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Manager Action Checklist
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {activeStep.managerChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pitfall to Avoid */}
            <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 mb-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  Common Supervisory Pitfall
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activeStep.commonPitfall}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-rose-200/40 dark:border-rose-900/40 text-[11px] text-rose-700 dark:text-rose-400 font-semibold">
                Guideline: Prioritize developmental impact over short-term managerial convenience.
              </div>
            </div>
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <button
              onClick={() => setActiveStepNumber(prev => Math.max(1, prev - 1))}
              disabled={activeStepNumber === 1}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              &larr; Previous Step
            </button>

            <button
              onClick={() => setActiveStepNumber(prev => Math.min(8, prev + 1))}
              disabled={activeStepNumber === 8}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-royal-600 hover:bg-royal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Next Step &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Realistic Real-World Case Walkthrough: Retail Inventory Audit */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-1">
              <Store className="w-4 h-4" />
              Applied Case Study Walkthrough
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {retailCaseWalkthrough.scenarioTitle}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {retailCaseWalkthrough.context} &bull; Delegated by: <strong>{retailCaseWalkthrough.manager}</strong> to <strong>{retailCaseWalkthrough.delegatee}</strong>
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          This case demonstrates how the General Store Manager structured the delegation of a critical quarterly audit, granting ERP system permissions, scheduling overtime rights, and establishing non-intrusive review gates.
        </p>

        {/* Accordion of 5 Phases */}
        <div className="space-y-3">
          {retailCaseWalkthrough.phases.map((phase, idx) => {
            const isExpanded = expandedPhaseIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50/50 dark:bg-slate-900/40 transition-all"
              >
                <button
                  onClick={() => setExpandedPhaseIndex(isExpanded ? -1 : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-slate-100/60 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {phase.phaseName}
                    </h4>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 pt-1 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700/60 space-y-3 text-xs">
                    <div>
                      <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Managerial Action:
                      </span>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed">
                        {phase.action}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Key Tangible Output:</strong> {phase.deliverable}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
