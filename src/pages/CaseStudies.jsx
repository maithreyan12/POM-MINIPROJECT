import React, { useState } from 'react';
import { caseStudies } from '../data/caseStudiesData';
import {
  Briefcase,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Info,
  TrendingUp,
  MapPin,
  Users
} from 'lucide-react';

export const CaseStudies = () => {
  const [selectedCaseId, setSelectedCaseId] = useState(caseStudies[0].id);

  const activeCase = caseStudies.find((c) => c.id === selectedCaseId) || caseStudies[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-royal-100 dark:bg-royal-950/70 text-royal-700 dark:text-royal-300 border border-royal-200 dark:border-royal-800">
            Qualitative Analysis &bull; GE3751 POM
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Delegation Case Studies (Applied MSME Scenarios)
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Examining how small and medium enterprise managers overcome bottlenecks by systematically delegating operational authority to trusted team leaders.
        </p>

        {/* Clear Disclosure Alert */}
        <div className="mt-5 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Academic Integrity Disclosure:</strong> These case studies represent illustrative management scenarios developed for academic learning and qualitative analysis under GE3751 Principles of Management, not verified corporate field audits.
          </span>
        </div>
      </div>

      {/* Case Study Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {caseStudies.map((cs) => {
          const isSelected = cs.id === selectedCaseId;

          return (
            <button
              key={cs.id}
              onClick={() => setSelectedCaseId(cs.id)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-royal-600 bg-royal-50/50 dark:bg-royal-950/40 shadow-premium ring-2 ring-royal-500/20'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400 block mb-1">
                  {cs.tag}
                </span>
                <h3 className={`text-sm font-bold leading-tight ${isSelected ? 'text-royal-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                  {cs.title}
                </h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-3 truncate block">
                {cs.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Case Deep Dive Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-6 animate-fadeIn">
        {/* Title & Metadata Strip */}
        <div className="pb-5 border-b border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400 mb-1">
            <Briefcase className="w-4 h-4" />
            {activeCase.tag}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {activeCase.title}
          </h2>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1">
            {activeCase.subtitle}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-royal-600" />
              Staff: <strong>{activeCase.businessProfile.headcount}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              Turnover: <strong>{activeCase.businessProfile.annualRevenue}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Location: <strong>{activeCase.businessProfile.location}</strong>
            </span>
          </div>
        </div>

        {/* 1. Background & Management Problem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-royal-600" />
              Organizational Background
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeCase.background}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              The Core Management Problem
            </h4>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeCase.managementProblem}
            </p>
          </div>
        </div>

        {/* 2. The Delegation Intervention: Duties, Authority, Responsibility, Monitoring */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
            The Delegation Intervention (Parity Structure)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Delegated Task */}
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-royal-700 dark:text-royal-300 block mb-1">
                1. Delegated Duty / Task
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                {activeCase.delegatedTask}
              </p>
            </div>

            {/* Authority Provided */}
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block mb-1">
                2. Authority Granted (Parity Principle)
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                {activeCase.authorityProvided}
              </p>
            </div>

            {/* Responsibility Assigned */}
            <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block mb-1">
                3. Responsibility & Target KPIs
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                {activeCase.responsibilityAssigned}
              </p>
            </div>

            {/* Monitoring Method */}
            <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 block mb-1">
                4. Non-Intrusive Monitoring Method
              </span>
              <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                {activeCase.monitoringMethod}
              </p>
            </div>
          </div>
        </div>

        {/* 3. Expected Benefits */}
        <div className="p-5 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Quantifiable Management Benefits Realized
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activeCase.expectedBenefits.map((ben, bIdx) => (
              <div key={bIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{ben}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Lessons Learned */}
        <div className="p-5 rounded-xl bg-navy-900 text-white rounded-2xl shadow-md">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-1.5 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-blue-400" />
            Key Lesson in Principles of Management (POM)
          </h4>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
            "{activeCase.lessonsLearned}"
          </p>
        </div>
      </div>
    </div>
  );
};
