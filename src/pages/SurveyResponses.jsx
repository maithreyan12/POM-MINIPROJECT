import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { exportSurveyResponsesToCSV } from '../utils/exportCsv';
import { EmptyState } from '../components/common/EmptyState';
import { ConfirmationModal } from '../components/common/ConfirmationModal';
import { surveyQuestions } from '../data/surveyQuestions';
import {
  Database,
  Download,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  User,
  Building,
  Sparkles,
  FileQuestion,
  X
} from 'lucide-react';

export const SurveyResponses = () => {
  const {
    surveyResponses,
    deleteSurveyResponse,
    clearSurveyResponses,
    loadDemoSurveyResponses,
    setActiveTab
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [selectedResponse, setSelectedResponse] = useState(null);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [responseToDelete, setResponseToDelete] = useState(null);

  // Filter responses
  const filteredResponses = surveyResponses.filter((resp) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      (resp.respondentName && resp.respondentName.toLowerCase().includes(query)) ||
      (resp.organization && resp.organization.toLowerCase().includes(query)) ||
      (resp.orgCategory && resp.orgCategory.toLowerCase().includes(query)) ||
      (resp.q10 && resp.q10.toLowerCase().includes(query));

    if (!matchesSearch) return false;

    if (roleFilter !== 'All' && resp.role !== roleFilter) {
      return false;
    }

    return true;
  });

  const handleDeleteOne = () => {
    if (responseToDelete) {
      deleteSurveyResponse(responseToDelete.id);
      setResponseToDelete(null);
    }
  };

  const handleClearAll = () => {
    clearSurveyResponses();
    setIsClearModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Survey Submissions & Primary Data Ledger
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300">
              N = {surveyResponses.length}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Verified primary dataset recorded in local client storage for GE3751 POM.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => exportSurveyResponsesToCSV(surveyResponses)}
            disabled={surveyResponses.length === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 disabled:opacity-40 disabled:cursor-not-allowed shadow-subtle transition-all"
            title="Download full dataset as CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export to CSV
          </button>

          {surveyResponses.length > 0 && (
            <button
              onClick={() => setIsClearModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Submissions
            </button>
          )}

          {surveyResponses.length === 0 && (
            <button
              onClick={loadDemoSurveyResponses}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-royal-50 dark:bg-royal-950 text-royal-600 dark:text-royal-400 border border-royal-200 dark:border-royal-800 hover:bg-royal-100 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Load Sample Demo Dataset
            </button>
          )}
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
            placeholder="Search responses by name, organization, category, or challenges..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-500"
        >
          <option value="All">All Roles</option>
          <option value="Manager">Manager</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Employee">Employee</option>
          <option value="Business Owner">Business Owner</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Table / List */}
      {filteredResponses.length === 0 ? (
        <EmptyState
          icon={Database}
          title="No survey responses recorded yet"
          description="Take the research questionnaire or load sample demonstration entries."
          actionLabel="Take Survey"
          onAction={() => setActiveTab('survey')}
        />
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-900/60 uppercase font-bold text-[10px] text-slate-500 tracking-wider border-b border-slate-200/80 dark:border-slate-700">
              <tr>
                <th className="px-5 py-3.5">Respondent</th>
                <th className="px-4 py-3.5">Organization & Category</th>
                <th className="px-4 py-3.5">Role & Experience</th>
                <th className="px-4 py-3.5">Date Recorded</th>
                <th className="px-4 py-3.5">Reported Challenge (Q10)</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {filteredResponses.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-700/40 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 font-bold flex items-center justify-center text-xs shrink-0">
                        {r.respondentName ? r.respondentName.substring(0, 2).toUpperCase() : 'AN'}
                      </div>
                      <span className="truncate">{r.respondentName || 'Anonymous Respondent'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="font-medium text-slate-800 dark:text-slate-200">{r.organization || 'N/A'}</div>
                    <div className="text-[11px] text-slate-400">{r.orgCategory}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-royal-600 dark:text-royal-400">{r.role}</span>
                    <span className="text-[11px] text-slate-400 block">{r.experience}</span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-500">
                    {r.timestamp ? new Date(r.timestamp).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-3.5 max-w-xs truncate text-slate-700 dark:text-slate-300 italic">
                    "{r.q10}"
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedResponse(r)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-royal-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        title="Inspect full questionnaire answers"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setResponseToDelete(r)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        title="Delete response"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Response Detail Inspector Modal */}
      {selectedResponse && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-elevated border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
              <div>
                <span className="text-xs font-mono text-royal-600 dark:text-royal-400">ID: {selectedResponse.id}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Detailed Questionnaire Submission
                </h3>
              </div>
              <button
                onClick={() => setSelectedResponse(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              {/* Respondent info strip */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 grid grid-cols-2 gap-2">
                <div><span className="text-slate-400">Respondent:</span> <strong>{selectedResponse.respondentName || 'Anonymous'}</strong></div>
                <div><span className="text-slate-400">Organization:</span> <strong>{selectedResponse.organization || 'N/A'}</strong></div>
                <div><span className="text-slate-400">Category:</span> <strong>{selectedResponse.orgCategory}</strong></div>
                <div><span className="text-slate-400">Role & Experience:</span> <strong>{selectedResponse.role} ({selectedResponse.experience})</strong></div>
              </div>

              {/* Likert Answers */}
              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                  Likert Scale Ratings (Q1 to Q9):
                </h4>
                {surveyQuestions.filter((q) => !q.isText).map((q) => (
                  <div key={q.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                    <span className="text-slate-700 dark:text-slate-300 font-medium">Q{q.number}. {q.text}</span>
                    <span className="font-bold px-2.5 py-1 rounded bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 shrink-0">
                      {selectedResponse[`q${q.number}`]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Q10 */}
              <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                <span className="font-bold text-amber-800 dark:text-amber-300 block mb-1">
                  Q10 Biggest Delegation Barrier:
                </span>
                <p className="text-slate-800 dark:text-slate-200 italic leading-relaxed text-sm">
                  "{selectedResponse.q10}"
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <button
                onClick={() => setSelectedResponse(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!responseToDelete}
        title="Delete Survey Response"
        message="Are you sure you want to remove this questionnaire submission? Statistical metrics in the Analytics and Report sections will update immediately."
        confirmText="Delete Response"
        confirmVariant="danger"
        onConfirm={handleDeleteOne}
        onCancel={() => setResponseToDelete(null)}
      />

      {/* Clear All Modal */}
      <ConfirmationModal
        isOpen={isClearModalOpen}
        title="Clear All Survey Submissions"
        message="Are you sure you want to wipe all recorded survey responses? You can reload sample demonstration entries at any time."
        confirmText="Clear All Data"
        confirmVariant="danger"
        onConfirm={handleClearAll}
        onCancel={() => setIsClearModalOpen(false)}
      />
    </div>
  );
};
