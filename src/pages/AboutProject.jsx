import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GraduationCap,
  BookOpen,
  Code2,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

export const AboutProject = () => {
  const { projectMetadata } = useApp();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-royal-100 dark:bg-royal-950/70 text-royal-700 dark:text-royal-300 border border-royal-200 dark:border-royal-800">
            Academic Portfolio & Course Mapping
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          About DelegatePro Mini Project
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Developed as a comprehensive, interactive laboratory demonstration and research project for the subject <strong>GE3751 Principles of Management (POM)</strong>.
        </p>
      </div>

      {/* Curriculum Mapping & Course Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 text-royal-600 dark:text-royal-400">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Syllabus Mapping & Unit Coverage
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            This project covers the core learning outcomes of <strong>Unit III: Organizing</strong> under the Anna University / Affiliated Colleges curriculum:
          </p>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Nature and Purpose of Organizing:</strong> Formal scalar chain and vertical task division.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Delegation of Authority:</strong> Duties, authority, and accountability tripartite dynamics.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Parity of Authority & Responsibility:</strong> Ensuring balanced operational empowerment.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Decentralization vs. Centralization:</strong> Managing executive span of control and bottleneck mitigation.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Code2 className="w-5 h-5" />
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Software Architecture & Technology Stack
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Built as a zero-dependency, high-speed single page application engineered with modern web standards:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <strong>Frontend Framework:</strong> React 18 with Vite
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <strong>Styling System:</strong> Tailwind CSS & CSS3
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <strong>Analytics Engine:</strong> Recharts
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <strong>Persistence:</strong> LocalStorage API
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
            Self-contained client execution without requiring paid APIs, server backends, or external credentials.
          </p>
        </div>
      </div>

      {/* Project Author */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
          <Users className="w-5 h-5 text-royal-600" />
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Project Finished By & Faculty Guide
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projectMetadata.teamMembers.map((m, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 font-bold flex items-center justify-center text-sm">
                  GK
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">{m.name}</h4>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">Register No: {m.regNo}</p>
                </div>
              </div>
              <p className="text-xs text-royal-600 dark:text-royal-400 font-semibold">{m.role || 'B.Tech Information Technology – 4th Year'}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{projectMetadata.department}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 flex items-center justify-between flex-wrap gap-3 text-xs">
          <div>
            <span className="font-bold text-royal-800 dark:text-royal-300 block">Faculty Supervisor:</span>
            <span className="text-slate-700 dark:text-slate-300">{projectMetadata.facultyGuide} &bull; {projectMetadata.facultyDesignation}</span>
          </div>
          <div className="text-right">
            <span className="font-bold text-slate-800 dark:text-slate-200 block">{projectMetadata.department}</span>
            <span className="text-slate-500">{projectMetadata.collegeName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
