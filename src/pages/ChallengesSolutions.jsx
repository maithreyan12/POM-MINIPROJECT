import React, { useState } from 'react';
import { challengesList } from '../data/challengesData';
import {
  AlertTriangle,
  Lightbulb,
  Search,
  BookOpen,
  ShieldCheck,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';

export const ChallengesSolutions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(challengesList[0].id);

  const categories = ['All', ...new Set(challengesList.map((c) => c.category))];

  const filteredChallenges = challengesList.filter((item) => {
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.principle.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesQuery) return false;

    if (categoryFilter !== 'All' && item.category !== categoryFilter) {
      return false;
    }

    return true;
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            Managerial Barriers & Remedies &bull; GE3751 POM
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Common Delegation Challenges & Practical Solutions
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Delegation frequently stumbles not from ill intention, but from subtle psychological hesitations, structural misalignments, and communication breakdowns.
        </p>

        <div className="mt-5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-royal-600 dark:text-royal-400 shrink-0 mt-0.5" />
          <span>
            <strong>Educational Scope:</strong> The 10 barriers below represent established management theory benchmarks and workplace best practices mapped against Classical and Modern POM doctrines.
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search challenges by title, symptom, or solution..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'All Categories' : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Challenges Expandable Cards List */}
      <div className="space-y-4">
        {filteredChallenges.map((item, idx) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-white dark:bg-slate-800 border-royal-400/80 dark:border-royal-600/80 shadow-premium'
                  : 'bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700/80 shadow-subtle hover:border-slate-300'
              }`}
            >
              {/* Header Toggle */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="w-full p-5 text-left flex items-start justify-between gap-4 transition-colors"
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                    isExpanded
                      ? 'bg-royal-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        {item.category}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-blue-50 dark:bg-blue-950/60 text-royal-700 dark:text-royal-300">
                        {item.principle}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                      {item.explanation}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pt-1 text-slate-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-royal-600" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Expanded Detailed Breakdown */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-700/80 space-y-4 animate-fadeIn text-xs">
                  {/* Explanation & Root Cause */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80">
                      <h4 className="font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-1">
                        Detailed Explanation
                      </h4>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-xs">
                        {item.explanation}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/50">
                      <h4 className="font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider text-[10px] mb-1">
                        Underlying Root Cause
                      </h4>
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-xs">
                        {item.cause}
                      </p>
                    </div>
                  </div>

                  {/* Practical Workplace Example */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80">
                    <h4 className="font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-1 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-royal-600" />
                      Practical Workplace Scenario
                    </h4>
                    <p className="text-slate-700 dark:text-slate-200 italic leading-relaxed text-xs">
                      "{item.example}"
                    </p>
                  </div>

                  {/* Recommended Management Solution */}
                  <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/50 flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider text-[10px] mb-1">
                        Recommended Managerial Solution & Intervention
                      </h4>
                      <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed text-xs">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
