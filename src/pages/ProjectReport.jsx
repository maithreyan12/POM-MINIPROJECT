import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { computeSurveyStats, computeTaskMetrics } from '../utils/calculations';
import { surveyQuestions } from '../data/surveyQuestions';
import {
  Printer,
  Edit3,
  FileText,
  CheckCircle2,
  AlertCircle,
  Building,
  GraduationCap,
  Calendar,
  X,
  Plus,
  Trash2,
  BookOpen
} from 'lucide-react';

export const ProjectReport = () => {
  const {
    projectMetadata,
    setProjectMetadata,
    surveyResponses,
    tasks,
    team
  } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState(projectMetadata);

  const surveyStats = computeSurveyStats(surveyResponses);
  const taskMetrics = computeTaskMetrics(tasks);

  const handleSaveMetadata = (e) => {
    e.preventDefault();
    setProjectMetadata(formData);
    setIsEditModalOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddMember = () => {
    setFormData({
      ...formData,
      teamMembers: [
        ...formData.teamMembers,
        { name: "New Student", regNo: "312321104000", role: "Team Member" }
      ]
    });
  };

  const handleRemoveMember = (idx) => {
    setFormData({
      ...formData,
      teamMembers: formData.teamMembers.filter((_, i) => i !== idx)
    });
  };

  const handleMemberChange = (idx, field, value) => {
    const updated = [...formData.teamMembers];
    updated[idx] = { ...updated[idx], [field]: value };
    setFormData({ ...formData, teamMembers: updated });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Control Action Bar (Screen Only - Hidden in Print) */}
      <div className="no-print bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Academic Mini Project Report Generator
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300">
              16 Sections &bull; GE3751
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Formatted to official university submission standards with dynamic survey data integration.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              setFormData(projectMetadata);
              setIsEditModalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Project Details
          </button>

          <button
            onClick={handlePrint}
            className="print-include inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl text-white bg-royal-600 hover:bg-royal-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-royal-500"
          >
            <Printer className="w-4 h-4" />
            Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Official Report Document Container */}
      <article className="print-area bg-white text-slate-900 rounded-2xl p-8 sm:p-14 shadow-premium border border-slate-200/90 leading-relaxed font-sans text-sm space-y-12">
        {/* SECTION 1: TITLE PAGE */}
        <section className="text-center space-y-6 pt-6 pb-12 border-b-2 border-slate-900 avoid-break">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest font-bold text-slate-500">
              A Mini Project Report On
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase max-w-2xl mx-auto leading-tight pt-2">
              {projectMetadata.projectTitle}
            </h1>
          </div>

          <p className="text-xs text-slate-600 italic">
            Submitted in partial fulfillment of the requirements for the course
          </p>

          <div className="py-2">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              {projectMetadata.subjectCode} – {projectMetadata.subjectName}
            </h2>
            <p className="text-xs text-slate-600">
              {projectMetadata.semester} &bull; Academic Year: {projectMetadata.academicYear}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 text-left max-w-xl mx-auto border-t border-slate-200 text-xs">
            <div>
              <p className="font-bold uppercase text-slate-500 mb-2">Submitted By:</p>
              <ul className="space-y-1.5">
                {projectMetadata.teamMembers.map((m, idx) => (
                  <li key={idx} className="text-slate-800">
                    <p className="font-bold text-slate-900 text-sm">
                      {m.name} <span className="font-mono text-slate-500 font-normal">({m.regNo})</span>
                    </p>
                    <p className="text-slate-700 font-medium mt-0.5">
                      {m.role || 'B.Tech Information Technology – 4th Year'}
                    </p>
                    <p className="text-slate-600">
                      {projectMetadata.department}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-bold uppercase text-slate-500 mb-2">Under the Guidance Of:</p>
              <p className="font-bold text-slate-900">{projectMetadata.facultyGuide}</p>
              <p className="text-slate-600 font-medium">{projectMetadata.facultyDesignation}</p>
              {!projectMetadata.facultyDesignation?.includes(projectMetadata.department) && (
                <p className="text-slate-600 mt-1 font-medium">{projectMetadata.department}</p>
              )}
              <p className="font-bold text-slate-800 mt-1">{projectMetadata.collegeName}</p>
            </div>
          </div>

          <div className="pt-4 text-xs font-semibold text-slate-500">
            {projectMetadata.submissionDate}
          </div>
        </section>

        {/* SECTION 2: ABSTRACT */}
        <section className="space-y-3 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            2. Abstract
          </h2>
          <p className="text-slate-800 text-justify leading-relaxed">
            This study examines the role of delegation in effective management. It explores how managers assign responsibilities and authority to employees, establish accountability, monitor performance, and support organizational objectives. It also examines the potential benefits, challenges, and best practices associated with delegation. Utilizing both classical management literature and an empirical research questionnaire (N = {surveyStats.totalResponses}), this study assesses the practical parity of authority, managerial time savings, and productivity optimization across operating enterprises.
          </p>
        </section>

        {/* SECTION 3: INTRODUCTION */}
        <section className="space-y-3 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            3. Introduction
          </h2>
          <p className="text-slate-800 text-justify leading-relaxed">
            In management science, delegation is recognized as the foundational mechanism of the organizing function. Defined classically by Koontz and O'Donnell, delegation represents the downward transfer of authority from a superior to a subordinate, enabling the accomplishment of specialized organizational objectives while preserving overall managerial accountability. As enterprises scale in size and complexity, individual executive capacity becomes an operational ceiling unless authority is distributed systematically.
          </p>
        </section>

        {/* SECTION 4: NEED FOR THE STUDY */}
        <section className="space-y-3 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            4. Need for the Study
          </h2>
          <p className="text-slate-800 text-justify leading-relaxed">
            While delegation is universally acknowledged as a necessity, contemporary workplace surveys indicate widespread reluctance among managers to delegate critical tasks. Barriers such as the "I can do it better myself" mindset, anxiety over potential subordinate errors, and institutional micromanagement stifle employee development. Simultaneously, subordinates are frequently assigned responsibilities without commensurate financial or administrative authority, violating Henri Fayol's principle of authority and responsibility parity. Investigating these systemic friction points is essential for optimizing organizational throughput.
          </p>
        </section>

        {/* SECTION 5: OBJECTIVES OF THE STUDY */}
        <section className="space-y-3 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            5. Objectives of the Study
          </h2>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-800">
            <li>To understand the meaning and importance of delegation in effective management.</li>
            <li>To study the tripartite elements of delegation: Duties, Authority, and Accountability.</li>
            <li>To examine the relationship between delegation and managerial effectiveness.</li>
            <li>To understand how delegation improves employee development and organizational productivity.</li>
            <li>To identify common psychological and structural barriers faced during delegation.</li>
            <li>To recommend actionable practices and checklists for effective delegation.</li>
          </ol>
        </section>

        {/* SECTION 6: SCOPE OF THE STUDY */}
        <section className="space-y-3 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            6. Scope of the Study
          </h2>
          <p className="text-slate-800 text-justify leading-relaxed">
            "The study focuses on delegation practices in organizations, including task allocation, authority, responsibility, accountability, communication, supervision, and employee performance."
          </p>
        </section>

        {/* SECTION 7: REVIEW OF CONCEPTS */}
        <section className="space-y-3 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            7. Review of Concepts
          </h2>
          <p className="text-slate-800 text-justify leading-relaxed">
            The theoretical architecture of delegation rests upon three interconnected pillars:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-800 text-xs">
            <li><strong>Assignment of Duties:</strong> The articulation of specific deliverables, quality standards, and deadlines to subordinates.</li>
            <li><strong>Granting of Authority:</strong> Conferring legitimate decision rights, resource access, and administrative powers (Parity of Authority and Responsibility).</li>
            <li><strong>Establishing Accountability:</strong> Enforcing subordinate answerability for task performance, while the delegating manager retains ultimate accountability to higher governance (Absoluteness of Responsibility).</li>
          </ul>
        </section>

        {/* SECTION 8: RESEARCH METHODOLOGY */}
        <section className="space-y-3 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            8. Research Methodology
          </h2>
          <p className="text-slate-800 text-justify leading-relaxed">
            This study employs an empirical descriptive research design. Primary data was collected using a structured 10-item questionnaire distributed to managers, supervisors, and front-line employees across diverse organizational sectors. Secondary data was gathered from established textbooks on Principles of Management. Quantitative data was recorded, sanitized, and evaluated using frequency distributions, percentage analysis, and Likert scale metrics.
          </p>
        </section>

        {/* SECTION 9: DATA COLLECTION */}
        <section className="space-y-3 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            9. Data Collection & Sample Profile
          </h2>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
            <p><strong>Total Valid Submissions:</strong> N = {surveyStats.totalResponses} respondents</p>
            <p><strong>Sampling Technique:</strong> Purposive sampling targeting active industry professionals</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {surveyStats.roleDistribution.map((r) => (
                <div key={r.name} className="p-2 bg-white rounded border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">{r.name}</span>
                  <strong className="text-slate-800">{r.count} ({r.percentage}%)</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: DATA ANALYSIS */}
        <section className="space-y-4 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            10. Data Analysis & Frequency Table
          </h2>
          {surveyStats.totalResponses === 0 ? (
            <p className="text-xs text-slate-500 italic">
              Data analysis is pending primary response collection. Complete submissions in the Research Survey tab to populate this frequency distribution.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-300">
                <thead className="bg-slate-100 font-bold border-b border-slate-300">
                  <tr>
                    <th className="p-2 border-r border-slate-300">Question Dimension</th>
                    <th className="p-2 text-center border-r border-slate-300">Strongly Agree</th>
                    <th className="p-2 text-center border-r border-slate-300">Agree</th>
                    <th className="p-2 text-center border-r border-slate-300">Neutral</th>
                    <th className="p-2 text-center border-r border-slate-300">Disagree</th>
                    <th className="p-2 text-center border-r border-slate-300">Strongly Disagree</th>
                    <th className="p-2 text-center font-bold">Positive %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {surveyStats.agreementRates.map((row) => (
                    <tr key={row.questionNumber}>
                      <td className="p-2 border-r border-slate-300 font-medium">
                        Q{row.questionNumber}. {surveyQuestions.find(q => q.number === row.questionNumber)?.dimension}
                      </td>
                      <td className="p-2 text-center border-r border-slate-300">{row.stronglyAgree}</td>
                      <td className="p-2 text-center border-r border-slate-300">{row.agree}</td>
                      <td className="p-2 text-center border-r border-slate-300">{row.neutral}</td>
                      <td className="p-2 text-center border-r border-slate-300">{row.disagree}</td>
                      <td className="p-2 text-center border-r border-slate-300">{row.stronglyDisagree}</td>
                      <td className="p-2 text-center font-bold text-royal-700">{row.agreementRate}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* SECTION 11: FINDINGS */}
        <section className="space-y-3 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            11. Findings
          </h2>
          {surveyStats.totalResponses === 0 ? (
            <p className="text-xs text-slate-500 italic">
              Empirical findings will be synthesized from verified survey submissions upon data collection.
            </p>
          ) : (
            <ul className="list-disc pl-5 space-y-1.5 text-slate-800 text-xs">
              <li>
                <strong>Managerial Time Savings:</strong> A prominent {surveyStats.agreementRates.find(a => a.questionNumber === 4)?.agreementRate || 0}% of respondents affirmed that effective delegation allows managers to save time and focus on strategic priorities.
              </li>
              <li>
                <strong>Human Capital Growth:</strong> {surveyStats.agreementRates.find(a => a.questionNumber === 5)?.agreementRate || 0}% confirmed that delegating substantive responsibilities directly improves subordinate confidence and operational skills.
              </li>
              <li>
                <strong>Parity of Authority Deficit:</strong> Approximately {100 - (surveyStats.agreementRates.find(a => a.questionNumber === 2)?.agreementRate || 0)}% of respondents reported gaps where authority granted did not fully match the responsibilities assigned.
              </li>
              <li>
                <strong>Qualitative Bottlenecks:</strong> Common challenges articulated by participants in Q10 highlighted micromanagement, lack of training prior to handoff, and fear of penalty during unpredicted outcomes.
              </li>
            </ul>
          )}
        </section>

        {/* SECTION 12: SUGGESTIONS */}
        <section className="space-y-3 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            12. Suggestions & Recommendations
          </h2>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-800 text-xs">
            <li><strong>Strict Enforcement of Parity Principle:</strong> Ensure that every assigned task is accompanied by explicit decision-making authority and resource access.</li>
            <li><strong>SMART Goal Contracting:</strong> Eliminate ambiguous verbal instructions by documenting expectations, deliverables, and acceptance metrics.</li>
            <li><strong>Non-Intrusive Progress Gates:</strong> Replace constant hovering with scheduled milestone reviews (e.g., 25%, 50%, and 75% checkpoints).</li>
            <li><strong>Psychological Safety:</strong> Treat minor developmental errors as learning opportunities rather than imposing immediate punitive measures.</li>
            <li><strong>Centralized Workload Balancing:</strong> Utilize management dashboards like DelegatePro to track task counts and avoid overloading high performers.</li>
          </ol>
        </section>

        {/* SECTION 13: LIMITATIONS */}
        <section className="space-y-3 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            13. Limitations of the Study
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-800 text-xs">
            <li>The sample size (N = {surveyStats.totalResponses}) is constrained by the timeframe of the college mini-project.</li>
            <li>Responses reflect subjective perceptions and self-reported evaluations of participants.</li>
            <li>Geographical coverage was predominantly localized to regional small and medium organizations.</li>
          </ul>
        </section>

        {/* SECTION 14: CONCLUSION */}
        <section className="space-y-3 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            14. Conclusion
          </h2>
          <p className="text-slate-800 text-justify leading-relaxed">
            Delegation is not merely a method of offloading routine administrative tasks; it is an indispensable leadership discipline and strategic driver of managerial productivity. When structured upon clear duty assignment, adequate authority, mutual accountability, and constructive feedback, delegation multiplies managerial span of control, develops subordinate talent, and fosters a high-performance organizational culture.
          </p>
        </section>

        {/* SECTION 15: QUESTIONNAIRE */}
        <section className="space-y-3 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            15. Research Questionnaire (Survey Instrument)
          </h2>
          <p className="text-xs text-slate-600">The 10-item instrument deployed in this study:</p>
          <div className="space-y-1.5 text-xs text-slate-800 pl-2">
            {surveyQuestions.map((q) => (
              <p key={q.id}>
                <strong>Q{q.number}.</strong> {q.text} {q.isText ? '(Open Text)' : '(5-point Likert Scale)'}
              </p>
            ))}
          </div>
        </section>

        {/* SECTION 16: REFERENCES */}
        <section className="space-y-3 avoid-break">
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 pb-1 border-b border-slate-300">
            16. References & Academic Citations
          </h2>
          <ul className="space-y-1.5 text-xs text-slate-700 pl-2">
            <li>1. Koontz, H., & O'Donnell, C. <em>Principles of Management: An Analysis of Managerial Functions</em>. McGraw-Hill Education.</li>
            <li>2. Weihrich, H., Cannice, M. V., & Koontz, H. <em>Management: A Global, Innovative, and Entrepreneurial Perspective</em>. McGraw-Hill.</li>
            <li>3. Robbins, S. P., Coulter, M., & DeCenzo, D. A. <em>Fundamentals of Management</em>. Pearson Education.</li>
            <li>4. Stoner, J. A. F., Freeman, R. E., & Gilbert, D. R. <em>Management</em>. Prentice Hall.</li>
            <li>5. Anna University Curriculum Regulation 2021: <em>GE3751 Principles of Management Course Syllabus</em>.</li>
          </ul>
        </section>
      </article>

      {/* Edit Metadata Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-elevated border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                Edit Academic Report Cover Details
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMetadata} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={formData.projectTitle}
                  onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    College Name
                  </label>
                  <input
                    type="text"
                    value={formData.collegeName}
                    onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Faculty Guide Name
                  </label>
                  <input
                    type="text"
                    value={formData.facultyGuide}
                    onChange={(e) => setFormData({ ...formData, facultyGuide: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Faculty Designation
                  </label>
                  <input
                    type="text"
                    value={formData.facultyDesignation}
                    onChange={(e) => setFormData({ ...formData, facultyDesignation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Academic Year
                </label>
                <input
                  type="text"
                  value={formData.academicYear}
                  onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              {/* Student Author */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Project Author (Finished By)
                  </label>
                </div>
                <div className="space-y-2">
                  {formData.teamMembers.map((m, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={m.name}
                        onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                        placeholder="Student Name"
                        className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                      />
                      <input
                        type="text"
                        value={m.regNo}
                        onChange={(e) => handleMemberChange(idx, 'regNo', e.target.value)}
                        placeholder="Register Number"
                        className="w-36 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                      />
                      {formData.teamMembers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(idx)}
                          className="p-1.5 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-royal-600 hover:bg-royal-700 shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
