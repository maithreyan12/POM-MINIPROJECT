import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, AlertCircle } from 'lucide-react';

export const MemberModal = ({ isOpen, onClose, memberToEdit = null }) => {
  const { addMember, updateMember } = useApp();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: 'Operations',
    skills: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (memberToEdit) {
      setFormData({
        name: memberToEdit.name || '',
        role: memberToEdit.role || '',
        department: memberToEdit.department || 'Operations',
        skills: Array.isArray(memberToEdit.skills) ? memberToEdit.skills.join(', ') : (memberToEdit.skills || ''),
        email: memberToEdit.email || ''
      });
    } else {
      setFormData({
        name: '',
        role: '',
        department: 'Operations',
        skills: '',
        email: ''
      });
    }
    setErrors({});
  }, [memberToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required.';
    if (!formData.role.trim()) errs.role = 'Organizational role is required.';
    if (!formData.department.trim()) errs.department = 'Department is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const skillsArray = formData.skills
      ? formData.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : ['General Operations'];

    const payload = {
      name: formData.name.trim(),
      role: formData.role.trim(),
      department: formData.department.trim(),
      skills: skillsArray,
      email: formData.email.trim()
    };

    if (memberToEdit) {
      updateMember(memberToEdit.id, payload);
    } else {
      addMember(payload);
    }
    onClose();
  };

  const departments = [
    'Operations',
    'Marketing',
    'Finance',
    'Quality Assurance',
    'Retail Operations',
    'Human Resources',
    'Supply Chain',
    'Information Technology'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-elevated border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {memberToEdit ? "Edit Team Member" : "Add Team Member"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Maintain subordinate profile for task matching and workload balancing.
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
          {/* Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Senthil Kumar"
              className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border ${
                errors.name ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              } text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500`}
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Designation / Role <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g., Assistant Shift Supervisor"
              className={`w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border ${
                errors.role ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
              } text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500`}
            />
            {errors.role && <p className="text-xs text-rose-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.role}</p>}
          </div>

          {/* Department */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Department <span className="text-rose-500">*</span>
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Core Skills (comma separated)
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              placeholder="e.g., Inventory, Budgeting, Quality Control"
              className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Used to match tasks with suitable subordinate competencies.
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              Contact Email (Optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g., senthil.kumar@delegatepro.demo"
              className="w-full px-3.5 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-royal-500"
            />
          </div>

          {/* Buttons */}
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
              {memberToEdit ? "Update Member" : "Save Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
