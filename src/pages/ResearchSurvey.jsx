import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  orgCategories,
  respondentRoles,
  experienceRanges,
  likertOptions,
  surveyQuestions
} from '../data/surveyQuestions';
import confetti from 'canvas-confetti';
import {
  FileQuestion,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Eye,
  Send,
  HelpCircle,
  Building,
  User,
  Briefcase,
  Sparkles,
  Info
} from 'lucide-react';

export const ResearchSurvey = () => {
  const { addSurveyResponse, setActiveTab } = useApp();

  const [formData, setFormData] = useState({
    respondentName: '',
    organization: '',
    orgCategory: '',
    role: '',
    experience: '',
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
    q8: '',
    q9: '',
    q10: ''
  });

  const [errors, setErrors] = useState({});
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calculate completion percentage
  const totalRequiredQuestions = 3 + 9 + 1; // 3 demographics (orgCategory, role, experience) + 9 Likert + 1 text
  let answeredCount = 0;
  if (formData.orgCategory) answeredCount++;
  if (formData.role) answeredCount++;
  if (formData.experience) answeredCount++;
  for (let i = 1; i <= 9; i++) {
    if (formData[`q${i}`]) answeredCount++;
  }
  if (formData.q10.trim()) answeredCount++;

  const progressPercent = Math.round((answeredCount / totalRequiredQuestions) * 100);

  const validate = () => {
    const errs = {};
    if (!formData.orgCategory) errs.orgCategory = 'Please select your organization category.';
    if (!formData.role) errs.role = 'Please specify your organizational role.';
    if (!formData.experience) errs.experience = 'Please indicate your experience range.';

    for (let i = 1; i <= 9; i++) {
      if (!formData[`q${i}`]) {
        errs[`q${i}`] = 'Please select a response.';
      }
    }

    if (!formData.q10.trim()) {
      errs.q10 = 'Please share your insights on the biggest delegation challenge.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleOpenPreview = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }
    setIsPreviewOpen(true);
  };

  const handleFinalSubmit = () => {
    addSurveyResponse(formData);
    setIsPreviewOpen(false);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // Confetti fallback
    }
  };

  const handleReset = () => {
    setFormData({
      respondentName: '',
      organization: '',
      orgCategory: '',
      role: '',
      experience: '',
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: '',
      q6: '',
      q7: '',
      q8: '',
      q9: '',
      q10: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-royal-100 dark:bg-royal-950/70 text-royal-700 dark:text-royal-300 border border-royal-200 dark:border-royal-800">
            Primary Data Collection &bull; GE3751 POM
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Delegation Effectiveness Research Questionnaire
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          This academic survey assesses ground-level delegation practices, parity of authority, managerial time savings, and productivity in contemporary organizations.
        </p>

        {/* Academic Ethics / Student Research Notice */}
        <div className="mt-5 p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-royal-600 dark:text-royal-400 shrink-0 mt-0.5" />
          <span>
            <strong>Student Academic Survey Disclosure:</strong> Conducted exclusively for undergraduate academic research under <strong>GE3751 Principles of Management</strong>. Personal identifiers are completely optional. Submissions are stored locally in your browser storage.
          </span>
        </div>
      </div>

      {/* Completion Progress Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle sticky top-20 z-10">
        <div className="flex items-center justify-between text-xs font-semibold mb-2">
          <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-royal-600" />
            Survey Completion Progress: <strong>{progressPercent}%</strong>
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            {answeredCount} of {totalRequiredQuestions} answered
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-royal-600 to-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {isSubmitted ? (
        /* Submission Success Confirmation */
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800 shadow-elevated text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Thank You for Contributing to Management Research!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            Your responses have been successfully logged into the research dataset. You can view the cumulative analysis charts or inspect all raw responses.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('analytics')}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-royal-600 hover:bg-royal-700 text-white shadow-sm transition-all"
            >
              View Analytics Dashboard &rarr;
            </button>
            <button
              onClick={() => setActiveTab('responses')}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
            >
              View All Submissions
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-royal-600 dark:text-royal-400 hover:underline"
            >
              Submit Another Response
            </button>
          </div>
        </div>
      ) : (
        /* Main Survey Form */
        <form onSubmit={handleOpenPreview} className="space-y-6">
          {/* Section A: Respondent Demographics */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
              <User className="w-4 h-4 text-royal-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Section A: Respondent Profile
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Respondent Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.respondentName}
                  onChange={(e) => setFormData({ ...formData, respondentName: e.target.value })}
                  placeholder="e.g., S. Ramesh (or leave blank)"
                  className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Organization / Firm (Optional)
                </label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g., Precision Components Ltd"
                  className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Business / Industry Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.orgCategory}
                  onChange={(e) => setFormData({ ...formData, orgCategory: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border ${
                    errors.orgCategory ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  } text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500`}
                >
                  <option value="">Select industry category</option>
                  {orgCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.orgCategory && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.orgCategory}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Current Role <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border ${
                    errors.role ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  } text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500`}
                >
                  <option value="">Select organizational role</option>
                  {respondentRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.role}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Total Professional Experience <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border ${
                    errors.experience ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                  } text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500`}
                >
                  <option value="">Select experience range</option>
                  {experienceRanges.map((exp) => (
                    <option key={exp} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
                {errors.experience && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.experience}</p>}
              </div>
            </div>
          </div>

          {/* Section B: Likert Scale Questions 1 to 9 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <FileQuestion className="w-4 h-4 text-royal-600" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                  Section B: Delegation Evaluation (Likert Scale)
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                Rate on a 5-point scale from Strongly Agree to Strongly Disagree
              </span>
            </div>

            <div className="space-y-6 divide-y divide-slate-100 dark:divide-slate-700/70">
              {surveyQuestions.filter((q) => !q.isText).map((q) => {
                const qKey = `q${q.number}`;
                const hasError = errors[qKey];

                return (
                  <div key={q.id} className="pt-5 first:pt-0 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-royal-600 dark:text-royal-400 font-mono block">
                          QUESTION {q.number} &bull; {q.dimension}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                          {q.text} <span className="text-rose-500">*</span>
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          {q.description}
                        </p>
                      </div>
                    </div>

                    {/* Radio Options Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                      {likertOptions.map((opt) => {
                        const isSelected = formData[qKey] === opt;
                        return (
                          <label
                            key={opt}
                            className={`p-2.5 rounded-xl border text-center cursor-pointer text-xs font-semibold transition-all flex items-center justify-center ${
                              isSelected
                                ? 'border-royal-600 bg-royal-600 text-white shadow-sm'
                                : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={qKey}
                              value={opt}
                              checked={isSelected}
                              onChange={() => setFormData({ ...formData, [qKey]: opt })}
                              className="sr-only"
                            />
                            <span>{opt}</span>
                          </label>
                        );
                      })}
                    </div>
                    {hasError && <p className="text-xs text-rose-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{hasError}</p>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section C: Qualitative Question 10 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
              <Sparkles className="w-4 h-4 text-royal-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                Section C: Qualitative Insights
              </h3>
            </div>

            <div>
              <span className="text-xs font-bold text-royal-600 dark:text-royal-400 font-mono block">
                QUESTION 10 &bull; Qualitative Barriers
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5 mb-2">
                What is the biggest challenge faced during delegation in your organization? <span className="text-rose-500">*</span>
              </h4>
              <textarea
                rows={3}
                value={formData.q10}
                onChange={(e) => setFormData({ ...formData, q10: e.target.value })}
                placeholder="Share specific workplace challenges (e.g., micromanagement, fear of blame, unclear requirements, staff turnover, lack of training)..."
                className={`w-full px-3.5 py-2.5 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border ${
                  errors.q10 ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                } text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500`}
              />
              {errors.q10 && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.q10}</p>}
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Form
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-royal-600 hover:bg-royal-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-royal-500"
            >
              <Eye className="w-4 h-4" />
              Review Answers & Submit
            </button>
          </div>
        </form>
      )}

      {/* Review & Confirmation Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-elevated border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
              Review Your Survey Answers
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Please confirm your responses before submitting to local storage.
            </p>

            <div className="space-y-3 text-xs bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                <div><span className="text-slate-400">Respondent:</span> <strong>{formData.respondentName || 'Anonymous'}</strong></div>
                <div><span className="text-slate-400">Organization:</span> <strong>{formData.organization || 'N/A'}</strong></div>
                <div><span className="text-slate-400">Category:</span> <strong>{formData.orgCategory}</strong></div>
                <div><span className="text-slate-400">Role & Exp:</span> <strong>{formData.role} ({formData.experience})</strong></div>
              </div>

              <div className="space-y-2 pt-1 max-h-60 overflow-y-auto pr-1">
                {surveyQuestions.filter((q) => !q.isText).map((q) => (
                  <div key={q.id} className="flex justify-between items-center py-1 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-slate-600 dark:text-slate-300 max-w-xs truncate">Q{q.number}. {q.text}</span>
                    <span className="font-bold text-royal-600 dark:text-royal-400">{formData[`q${q.number}`]}</span>
                  </div>
                ))}
                <div className="pt-2">
                  <span className="text-slate-400 block mb-0.5">Q10 Challenge:</span>
                  <p className="text-slate-800 dark:text-slate-200 italic">"{formData.q10}"</p>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold rounded-xl text-white bg-royal-600 hover:bg-royal-700 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
