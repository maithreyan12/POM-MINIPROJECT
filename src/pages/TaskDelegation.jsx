import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { isTaskOverdue, computeTaskMetrics } from '../utils/calculations';
import { exportTasksToCSV } from '../utils/exportCsv';
import { StatusBadge, PriorityBadge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { ConfirmationModal } from '../components/common/ConfirmationModal';
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Calendar,
  User,
  Clock,
  MoreVertical,
  Trash2,
  Edit2,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const TaskDelegation = ({
  onOpenCreateModal,
  onOpenEditModal,
  onOpenDetailModal
}) => {
  const {
    tasks,
    team,
    deleteTask,
    updateTaskStatus
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [memberFilter, setMemberFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc'); // asc = closest deadline first
  const [taskToDelete, setTaskToDelete] = useState(null);

  const metrics = computeTaskMetrics(tasks);

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      // Search
      const assigned = team.find((m) => m.id === task.assignedTo);
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        (assigned && assigned.name.toLowerCase().includes(query));

      if (!matchesSearch) return false;

      // Status
      if (statusFilter !== 'All') {
        if (statusFilter === 'Overdue') {
          if (!isTaskOverdue(task)) return false;
        } else if (task.status !== statusFilter) {
          return false;
        }
      }

      // Priority
      if (priorityFilter !== 'All' && task.priority !== priorityFilter) {
        return false;
      }

      // Member
      if (memberFilter !== 'All' && task.assignedTo !== memberFilter) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.dueDate || '9999-12-31').getTime();
      const dateB = new Date(b.dueDate || '9999-12-31').getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  const handleDeleteConfirm = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Task Delegation Workspace
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Operational contract manager: define scope, vest authority, and verify deliverables.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => exportTasksToCSV(tasks, team)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-subtle transition-all"
            title="Download tasks as CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            Export CSV
          </button>
          <button
            onClick={onOpenCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-royal-600 hover:bg-royal-700 text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-royal-500"
          >
            <Plus className="w-4 h-4" />
            Delegate New Task
          </button>
        </div>
      </div>

      {/* Quick Status Count Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={() => setStatusFilter('All')}
          className={`p-3 rounded-xl border text-left transition-all ${
            statusFilter === 'All'
              ? 'border-royal-500 bg-royal-50/40 dark:bg-royal-950/40 ring-1 ring-royal-500'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total</span>
          <span className="text-xl font-bold text-slate-900 dark:text-slate-100">{metrics.total}</span>
        </button>

        <button
          onClick={() => setStatusFilter('In Progress')}
          className={`p-3 rounded-xl border text-left transition-all ${
            statusFilter === 'In Progress'
              ? 'border-blue-500 bg-blue-50/40 dark:bg-blue-950/40 ring-1 ring-blue-500'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 block">In Progress</span>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{metrics.inProgress}</span>
        </button>

        <button
          onClick={() => setStatusFilter('Completed')}
          className={`p-3 rounded-xl border text-left transition-all ${
            statusFilter === 'Completed'
              ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/40 ring-1 ring-emerald-500'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 block">Completed</span>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{metrics.completed}</span>
        </button>

        <button
          onClick={() => setStatusFilter('Not Started')}
          className={`p-3 rounded-xl border text-left transition-all ${
            statusFilter === 'Not Started'
              ? 'border-slate-400 bg-slate-100 dark:bg-slate-800 ring-1 ring-slate-400'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Not Started</span>
          <span className="text-xl font-bold text-slate-700 dark:text-slate-300">{metrics.notStarted}</span>
        </button>

        <button
          onClick={() => setStatusFilter('Overdue')}
          className={`p-3 rounded-xl border text-left transition-all col-span-2 sm:col-span-1 ${
            statusFilter === 'Overdue'
              ? 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/40 ring-1 ring-rose-500'
              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">Overdue</span>
          <span className="text-xl font-bold text-rose-600 dark:text-rose-400">{metrics.overdue}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, description, or team member..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500"
          />
        </div>

        {/* Filters Group */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Priority */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-500"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          {/* Member */}
          <select
            value={memberFilter}
            onChange={(e) => setMemberFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-500 max-w-[140px] truncate"
          >
            <option value="All">All Members</option>
            {team.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          {/* Sort deadline */}
          <button
            onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle deadline sort direction"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>{sortOrder === 'asc' ? 'Earliest Due' : 'Latest Due'}</span>
          </button>
        </div>
      </div>

      {/* Task List / Cards */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          title="No matching tasks found"
          description="Adjust your search query or filters, or delegate a new task."
          actionLabel="Delegate Task"
          onAction={onOpenCreateModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map((task) => {
            const assigned = team.find((m) => m.id === task.assignedTo);
            const overdue = isTaskOverdue(task);

            return (
              <div
                key={task.id}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle hover:shadow-premium transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <StatusBadge status={task.status} isOverdue={overdue} />
                      <PriorityBadge priority={task.priority} />
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onOpenDetailModal(task)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-royal-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onOpenEditModal(task)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        title="Edit task"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setTaskToDelete(task)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3
                    onClick={() => onOpenDetailModal(task)}
                    className="text-base font-bold text-slate-900 dark:text-slate-100 leading-snug cursor-pointer group-hover:text-royal-600 dark:group-hover:text-royal-400 transition-colors"
                  >
                    {task.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                    {task.description}
                  </p>

                  {/* Authority Granted Snapshot */}
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 text-xs">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5">
                      Vested Authority:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 line-clamp-1 italic text-[11px]">
                      "{task.authority}"
                    </p>
                  </div>
                </div>

                {/* Card Footer: Assignee & Timeline */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 font-bold flex items-center justify-center text-[10px] shrink-0">
                      {assigned?.avatar || <User className="w-3.5 h-3.5" />}
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      {assigned?.name || 'Unassigned'}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`flex items-center gap-1 font-medium ${
                      overdue ? 'text-rose-600 dark:text-rose-400 font-semibold' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      <Clock className="w-3.5 h-3.5" />
                      {task.dueDate}
                    </span>

                    {/* Quick status cycle button */}
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      className="px-2 py-1 text-[11px] rounded-lg bg-slate-100 dark:bg-slate-700 font-medium text-slate-700 dark:text-slate-200 border-none focus:ring-1 focus:ring-royal-500 cursor-pointer"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!taskToDelete}
        title="Delete Delegated Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This will permanently remove the task record and update team workload calculations.`}
        confirmText="Delete Task"
        confirmVariant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setTaskToDelete(null)}
      />
    </div>
  );
};
