import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { computeTeamWorkload } from '../utils/calculations';
import { WorkloadBadge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { ConfirmationModal } from '../components/common/ConfirmationModal';
import {
  UserPlus,
  Search,
  LayoutGrid,
  List,
  Edit2,
  Trash2,
  Mail,
  Briefcase,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert
} from 'lucide-react';

export const TeamManagement = ({ onOpenAddModal, onOpenEditModal }) => {
  const {
    team,
    tasks,
    deleteMember,
    workloadThreshold,
    setActiveTab
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
  const [memberToDelete, setMemberToDelete] = useState(null);

  const teamWorkload = computeTeamWorkload(team, tasks, workloadThreshold);

  // Departments list
  const departments = ['All', ...new Set(team.map((m) => m.department))];

  // Filtered members
  const filteredMembers = teamWorkload.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.skills && member.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())));

    if (!matchesSearch) return false;

    if (departmentFilter !== 'All' && member.department !== departmentFilter) {
      return false;
    }

    return true;
  });

  const handleDeleteConfirm = () => {
    if (memberToDelete) {
      deleteMember(memberToDelete.id);
      setMemberToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Team Member Management & Workload Allocation
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor subordinate capabilities, active commitments, and prevent delegation burnout.
          </p>
        </div>

        <button
          onClick={onOpenAddModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-royal-600 hover:bg-royal-700 text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-royal-500 self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          Add Team Member
        </button>
      </div>

      {/* Workload Threshold Notice */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">
              Workload Balancing Rule:
            </span>
            <span className="text-slate-600 dark:text-slate-300 ml-1">
              Members with <strong>{workloadThreshold} or more</strong> pending tasks are marked with a High Load warning badge.
            </span>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('settings')}
          className="text-royal-600 dark:text-royal-400 font-semibold hover:underline shrink-0"
        >
          Adjust Threshold &rarr;
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role, or skills..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-royal-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-500"
          >
            {departments.map((d) => (
              <option key={d} value={d}>
                {d === 'All' ? 'All Departments' : d}
              </option>
            ))}
          </select>

          {/* Toggle View: Cards vs Table */}
          <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-700">
            <button
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-800 text-royal-600 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Card view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-800 text-royal-600 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              title="Table view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 ? (
        <EmptyState
          title="No team members found"
          description="Adjust your search filters or add a new team member."
          actionLabel="Add Member"
          onAction={onOpenAddModal}
        />
      ) : viewMode === 'cards' ? (
        /* Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`bg-white dark:bg-slate-800 rounded-2xl p-5 border shadow-subtle hover:shadow-premium transition-all flex flex-col justify-between ${
                member.isOverloaded
                  ? 'border-amber-300 dark:border-amber-800/80 ring-1 ring-amber-300/50'
                  : 'border-slate-200/80 dark:border-slate-700/80'
              }`}
            >
              <div>
                {/* Header: Avatar, Name & Actions */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 font-bold flex items-center justify-center text-sm shadow-sm">
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                        {member.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onOpenEditModal(member)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      title="Edit member"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setMemberToDelete(member)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      title="Delete member"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Department & Email */}
                <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>{member.department}</span>
                  </div>
                  {member.email && (
                    <div className="flex items-center gap-1.5 truncate">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  )}
                </div>

                {/* Skills Chips */}
                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 text-[10px] rounded-md bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Workload Metrics Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Active Workload:
                  </span>
                  <WorkloadBadge count={member.pendingTasks} isOverloaded={member.isOverloaded} />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-[11px] bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Total</span>
                    <strong className="text-slate-800 dark:text-slate-200 font-bold">{member.totalAssigned}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Pending</span>
                    <strong className="text-blue-600 dark:text-blue-400 font-bold">{member.pendingTasks}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Done</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{member.completedTasks}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-subtle overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-900/60 uppercase font-bold text-[10px] text-slate-500 tracking-wider border-b border-slate-200/80 dark:border-slate-700">
              <tr>
                <th className="px-5 py-3.5">Member</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5">Skills</th>
                <th className="px-4 py-3.5 text-center">Assigned</th>
                <th className="px-4 py-3.5 text-center">Pending</th>
                <th className="px-4 py-3.5 text-center">Completed</th>
                <th className="px-4 py-3.5">Workload Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-700/40 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-slate-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-royal-100 dark:bg-royal-950 text-royal-700 dark:text-royal-300 font-bold flex items-center justify-center text-xs">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-slate-100">{member.name}</div>
                        <div className="text-[11px] text-slate-400">{member.role}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">{member.department}</td>
                  <td className="px-4 py-3.5 max-w-xs truncate">
                    {member.skills?.join(', ') || 'General'}
                  </td>
                  <td className="px-4 py-3.5 text-center font-bold text-slate-800 dark:text-slate-200">{member.totalAssigned}</td>
                  <td className="px-4 py-3.5 text-center font-bold text-blue-600 dark:text-blue-400">{member.pendingTasks}</td>
                  <td className="px-4 py-3.5 text-center font-bold text-emerald-600 dark:text-emerald-400">{member.completedTasks}</td>
                  <td className="px-4 py-3.5">
                    <WorkloadBadge count={member.pendingTasks} isOverloaded={member.isOverloaded} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onOpenEditModal(member)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                        title="Edit"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setMemberToDelete(member)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!memberToDelete}
        title="Remove Team Member"
        message={`Are you sure you want to remove ${memberToDelete?.name}? Any tasks currently assigned to this member will be marked unassigned.`}
        confirmText="Remove Member"
        confirmVariant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setMemberToDelete(null)}
      />
    </div>
  );
};
