import React from 'react';
import { StatusBadge, PriorityBadge } from '../common/Badge';
import { isTaskOverdue } from '../../utils/calculations';
import {
  X,
  Calendar,
  User,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Clock,
  Edit2,
  Trash2,
  AlertTriangle
} from 'lucide-react';

export const TaskDetailModal = ({
  isOpen,
  onClose,
  task,
  team,
  onEdit,
  onDelete,
  onUpdateStatus
}) => {
  if (!isOpen || !task) return null;

  const assignedMember = team.find((m) => m.id === task.assignedTo);
  const overdue = isTaskOverdue(task);

  const statusOptions = ['Not Started', 'In Progress', 'Completed', 'Blocked'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-elevated border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <StatusBadge status={task.status} isOverdue={overdue} />
              <PriorityBadge priority={task.priority} />
              <span className="text-xs text-slate-400 font-mono">ID: {task.id}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {task.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-5">
          {/* Delegatee Profile Card */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 font-bold flex items-center justify-center text-sm">
                {assignedMember?.avatar || <User className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold">Delegated To</p>
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {assignedMember?.name || "Unassigned"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {assignedMember?.role} &bull; {assignedMember?.department}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Start Date</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {task.startDate || "Not set"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Due Date</span>
                <span className={`font-semibold flex items-center gap-1 mt-0.5 ${
                  overdue ? 'text-rose-600 dark:text-rose-400' : 'text-slate-700 dark:text-slate-300'
                }`}>
                  <Clock className="w-3.5 h-3.5" />
                  {task.dueDate}
                </span>
              </div>
            </div>
          </div>

          {/* Tripartite Breakdown: Duties, Authority, Accountability */}
          <div className="space-y-4">
            {/* 1. Duties / Scope */}
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40">
              <div className="flex items-center gap-2 text-royal-700 dark:text-royal-300 font-bold text-xs uppercase tracking-wider mb-1.5">
                <FileText className="w-4 h-4" />
                1. Assignment of Duties (Task Scope)
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {task.description}
              </p>
            </div>

            {/* 2. Authority Granted */}
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                2. Granting of Authority & Resources
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {task.authority}
              </p>
            </div>

            {/* 3. Expected Outcome / Accountability */}
            <div className="p-4 rounded-xl bg-navy-50/50 dark:bg-navy-950/20 border border-navy-200/60 dark:border-navy-900/40">
              <div className="flex items-center gap-2 text-navy-800 dark:text-blue-300 font-bold text-xs uppercase tracking-wider mb-1.5">
                <CheckCircle2 className="w-4 h-4" />
                3. Establishing Accountability & Expected Outcome
              </div>
              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                {task.expectedOutcome}
              </p>
            </div>

            {/* Manager Notes if any */}
            {task.managerNotes && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Manager Coaching Notes & Checkpoints
                </p>
                <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                  "{task.managerNotes}"
                </p>
              </div>
            )}
          </div>

          {/* Quick Status Update Bar */}
          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/60 flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Quick Status Update:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {statusOptions.map((st) => (
                <button
                  key={st}
                  onClick={() => onUpdateStatus(task.id, st)}
                  className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                    task.status === st
                      ? 'bg-royal-600 text-white shadow-sm font-semibold'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <button
            onClick={() => {
              onDelete(task.id);
              onClose();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Task
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onEdit(task);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-royal-600 dark:text-royal-400 bg-royal-50 dark:bg-royal-950/50 hover:bg-royal-100 dark:hover:bg-royal-900/50 rounded-xl transition-colors border border-royal-200 dark:border-royal-800"
            >
              <Edit2 className="w-3.5 h-3.5" />
              Edit Parameters
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
