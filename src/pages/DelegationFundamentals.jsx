import React, { useState } from 'react';
import {
  delegationDefinition,
  delegationElements,
  delegationImportance,
  delegationPrinciples
} from '../data/fundamentalsData';
import {
  Compass,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lightbulb,
  Briefcase,
  HelpCircle,
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';

export const DelegationFundamentals = () => {
  const [selectedElementId, setSelectedElementId] = useState('assignment');

  const selectedElement = delegationElements.find((e) => e.id === selectedElementId) || delegationElements[0];

  const elementIcons = {
    assignment: FileText,
    authority: ShieldCheck,
    accountability: CheckCircle2
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Title & Introduction */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-royal-100 dark:bg-royal-950/70 text-royal-700 dark:text-royal-300 border border-royal-200 dark:border-royal-800">
            Core Curriculum &bull; Chapter 5 Organizing
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Delegation Fundamentals & Core Concepts
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Delegation represents the operational lifeline of managerial organizing. Without delegation, an enterprise remains restricted to what a single individual can physically accomplish.
        </p>
      </div>

      {/* 1. Meaning of Delegation */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center gap-2.5 mb-4 text-royal-600 dark:text-royal-400">
          <BookOpen className="w-5 h-5" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Meaning of Delegation
          </h2>
        </div>

        <blockquote className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border-l-4 border-royal-600 text-slate-800 dark:text-slate-200 font-medium text-base sm:text-lg leading-relaxed">
          "{delegationDefinition.quote}"
        </blockquote>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {delegationDefinition.keyPoints.map((pt, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-700/60"
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400 mb-1">
                {pt.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {pt.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Interactive Tripartite Diagram: Elements of Delegation */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <div className="flex items-center gap-2.5 text-royal-600 dark:text-royal-400">
            <Compass className="w-5 h-5" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Interactive Tripartite Elements of Delegation
            </h2>
          </div>
          <span className="text-xs font-semibold text-royal-600 dark:text-royal-400 bg-royal-50 dark:bg-royal-950 px-2.5 py-1 rounded-full">
            Click any element below to inspect
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Delegation operates as an indivisible tripartite contract: Assignment of Duties &rarr; Granting Authority &rarr; Establishing Accountability.
        </p>

        {/* Interactive Diagram Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
          {delegationElements.map((elem, idx) => {
            const Icon = elementIcons[elem.id];
            const isSelected = selectedElementId === elem.id;

            return (
              <div
                key={elem.id}
                onClick={() => setSelectedElementId(elem.id)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-royal-600 bg-royal-50/50 dark:bg-royal-950/40 shadow-premium'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-xl bg-royal-600 text-white font-extrabold text-xs flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-royal-600 dark:text-royal-400' : 'text-slate-400'}`} />
                  </div>
                  <h3 className={`text-base font-bold mb-1.5 ${isSelected ? 'text-royal-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                    {elem.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {elem.shortDescription}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-semibold">
                  <span className={isSelected ? 'text-royal-600 dark:text-royal-400' : 'text-slate-400'}>
                    {isSelected ? 'Active Selection' : 'Click to inspect'}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-royal-600' : 'text-slate-400'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Element Detail Inspector Panel */}
        <div className="mt-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 animate-fadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-royal-600 text-white flex items-center justify-center">
              {React.createElement(elementIcons[selectedElement.id], { className: "w-5 h-5" })}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-royal-600 dark:text-royal-400">
                Detailed Element Breakdown
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                {selectedElement.name}
              </h3>
            </div>
          </div>

          <div className="space-y-4">
            {/* Definition */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-subtle">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-royal-600" />
                Academic Definition
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {selectedElement.definition}
              </p>
            </div>

            {/* Practical Workplace Example */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-subtle">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                Practical Workplace Example
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
                "{selectedElement.practicalExample}"
              </p>
            </div>

            {/* Management Tip */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-subtle">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                Key Management Tip for Leaders
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {selectedElement.managementTip}
              </p>
            </div>

            {/* Key Questions Answered */}
            <div className="pt-2">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Critical Questions Answered in this Phase:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedElement.keyQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-royal-600 shrink-0"></span>
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Importance of Delegation (8 Points) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center gap-2.5 mb-2 text-royal-600 dark:text-royal-400">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Organizational Importance of Delegation
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          8 strategic benefits that make delegation a prerequisite for enterprise vitality and scalability.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {delegationImportance.map((item, idx) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-700/70 hover:border-royal-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold font-mono text-royal-600 dark:text-royal-400">
                    BENEFIT #{idx + 1}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-royal-50 dark:bg-royal-950 text-royal-700 dark:text-royal-300 font-medium">
                    {item.pomPrinciple}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>{item.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Principles of Effective Delegation (8 Principles) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center gap-2.5 mb-2 text-royal-600 dark:text-royal-400">
          <ShieldCheck className="w-5 h-5" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Principles of Effective Delegation
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Established management doctrines that ensure smooth scalar transfer and prevent organizational paralysis.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {delegationPrinciples.map((prin) => (
            <div
              key={prin.number}
              className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/70 dark:border-slate-700/70 hover:border-royal-500/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-black text-royal-600 dark:text-royal-400 font-mono">
                    {prin.number}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold uppercase">
                    {prin.badge}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                  {prin.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {prin.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
