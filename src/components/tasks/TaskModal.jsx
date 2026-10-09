import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, AlertCircle } from 'lucide-react';

export const TaskModal = ({ isOpen, onClose, taskToEdit = null }) => {
  const { team, addTask, updateTask } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'Medium',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    authority: '',
    expectedOutcome: '',
    status: 'Not Started',
    managerNotes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        assignedTo: taskToEdit.assignedTo || '',
        priority: taskToEdit.priority || 'Medium',
        startDate: taskToEdit.startDate || '',
        dueDate: taskToEdit.dueDate || '',
        authority: taskToEdit.authority || '',
        expectedOutcome: taskToEdit.expectedOutcome || '',
        status: taskToEdit.status || 'Not Started',
        managerNotes: taskToEdit.managerNotes || ''
      });
    } else {
      // Default dates
      const today = new Date();
      const inOneWeek = new Date();
      inOneWeek.setDate(today.getDate() + 7);

      setFormData({
        title: '',
        description: '',
        assignedTo: team.length > 0 ? team[0].id : '',
        priority: 'Medium',
        startDate: today.toISOString().split('T')[0],
        dueDate: inOneWeek.toISOString().split('T')[0],
        authority: '',
        expectedOutcome: '',
        status: 'Not Started',
        managerNotes: ''
      });
    }
    setErrors({});
  }, [taskToEdit, isOpen, team]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Task title is required.';
    if (!formData.description.trim()) errs.description = 'Task description is required.';
    if (!formData.assignedTo) errs.assignedTo = 'Please assign a team member.';
    if (!formData.dueDate) errs.dueDate = 'Due date is required.';
    if (formData.startDate && formData.dueDate && formData.dueDate < formData.startDate) {
      errs.dueDate = 'Due date cannot be before start date.';
    }
    if (!formData.authority.trim()) errs.authority = 'Please specify the authority or resources granted.';
    if (!formData.expectedOutcome.trim()) errs.expectedOutcome = 'Expected outcome must be specified.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (taskToEdit) {
      updateTask(taskToEdit.id, formData);
    } else {
      addTask(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-elevated border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {taskToEdit ? "Edit Delegated Task" : "Delegate New Management Task"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Establish duties, vest appropriate authority, and define explicit accountability.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Task Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Annual Physical Asset Audit & Inventory Verification"
              className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border ${
                errors.title ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              } text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500`}
            />
            {errors.title && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Task Scope & Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Clearly define operational responsibilities, deliverables, and boundaries..."
              className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border ${
                errors.description ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              } text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500`}
            />
            {errors.description && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.description}</p>}
          </div>

          {/* Assigned Member & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Assign To (Team Member) <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border ${
                  errors.assignedTo ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                } text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500`}
              >
                <option value="">Select a team member</option>
                {team.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
              {errors.assignedTo && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.assignedTo}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Priority Level
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Dates: Start & Due */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Due Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border ${
                  errors.dueDate ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                } text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500`}
              />
              {errors.dueDate && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.dueDate}</p>}
            </div>
          </div>

          {/* Authority Granted */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Required Authority & Resources Granted <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.authority}
              onChange={(e) => setFormData({ ...formData, authority: e.target.value })}
              placeholder="e.g., Financial approval up to ₹50,000, ERP ledger admin access, overtime scheduling rights..."
              className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border ${
                errors.authority ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              } text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500`}
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Principles of Management: Parity of Authority & Responsibility requires providing commensurate powers.
            </p>
            {errors.authority && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.authority}</p>}
          </div>

          {/* Expected Outcome */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Expected Outcome / Acceptance Criteria <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.expectedOutcome}
              onChange={(e) => setFormData({ ...formData, expectedOutcome: e.target.value })}
              placeholder="e.g., Reconciliation report signed by department head with variance under 1%..."
              className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border ${
                errors.expectedOutcome ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              } text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500`}
            />
            {errors.expectedOutcome && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.expectedOutcome}</p>}
          </div>

          {/* Status & Manager Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Current Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                Manager Coaching Notes (Optional)
              </label>
              <input
                type="text"
                value={formData.managerNotes}
                onChange={(e) => setFormData({ ...formData, managerNotes: e.target.value })}
                placeholder="Checkpoints, reminders, or special guidelines"
                className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-semibold rounded-xl text-white bg-royal-600 hover:bg-royal-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-royal-500 transition-all"
            >
              {taskToEdit ? "Update Delegation" : "Delegate Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
