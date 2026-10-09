import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { defaultBestPractices } from '../data/bestPracticesData';
import {
  Award,
  CheckCircle2,
  Circle,
  RotateCcw,
  Sparkles,
  Filter,
  Check,
  ShieldCheck,
  Lightbulb
} from 'lucide-react';

export const BestPractices = () => {
  const { completedPractices, togglePractice, resetPractices } = useApp();

  const [phaseFilter, setPhaseFilter] = useState('All');

  const totalCount = defaultBestPractices.length;
  const completedCount = Object.values(completedPractices).filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const phases = ['All', ...new Set(defaultBestPractices.map((b) => b.phase))];

  const filteredPractices = defaultBestPractices.filter((b) => {
    if (phaseFilter !== 'All' && b.phase !== phaseFilter) return false;
    return true;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Managerial Guidelines & Audit Checklist
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Best Practices & Recommendations Checklist
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          An interactive operational checklist of 12 core practices designed to elevate supervisory competence, eliminate bottlenecks, and ensure organizational accountability.
        </p>
      </div>

      {/* Progress & Quick Stats Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="6"
                className="text-slate-100 dark:text-slate-700"
                fill="transparent"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                stroke="currentColor"
                strokeWidth="6"
                className="text-emerald-500 transition-all duration-500"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 26}
                strokeDashoffset={2 * Math.PI * 26 * (1 - progressPercentage / 100)}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute font-black text-xs text-slate-900 dark:text-slate-100">
              {progressPercentage}%
            </span>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Implementation Readiness
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              <strong>{completedCount}</strong> of <strong>{totalCount}</strong> delegation standards implemented and validated.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-500"
          >
            {phases.map((p) => (
              <option key={p} value={p}>
                {p === 'All' ? 'All Workflow Phases' : p}
              </option>
            ))}
          </select>

          <button
            onClick={resetPractices}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
            title="Reset checklist"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPractices.map((bp) => {
          const isDone = !!completedPractices[bp.id];

          return (
            <div
              key={bp.id}
              onClick={() => togglePractice(bp.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 select-none ${
                isDone
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 shadow-subtle'
                  : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="pt-0.5 shrink-0">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'border-2 border-slate-300 dark:border-slate-600 text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400">
                    {bp.phase}
                  </span>
                  {isDone && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                      Completed
                    </span>
                  )}
                </div>

                <h4 className={`text-sm font-bold leading-snug ${
                  isDone ? 'text-emerald-900 dark:text-emerald-100 line-through decoration-emerald-500/50' : 'text-slate-900 dark:text-slate-100'
                }`}>
                  {bp.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {bp.description}
                </p>

                {/* Practical Tip */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-2">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Manager Tip:</strong> {bp.actionTip}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
