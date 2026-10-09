import React from 'react';

export const StatusBadge = ({ status, isOverdue = false }) => {
  if (isOverdue && status !== 'Completed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse"></span>
        Overdue
      </span>
    );
  }

  const styles = {
    'Completed': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    'In Progress': 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    'Not Started': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    'Blocked': 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800'
  };

  const currentStyle = styles[status] || styles['Not Started'];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${currentStyle}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'Completed' ? 'bg-emerald-500' :
        status === 'In Progress' ? 'bg-royal-600' :
        status === 'Blocked' ? 'bg-amber-500' : 'bg-slate-400'
      }`}></span>
      {status}
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  const styles = {
    'Critical': 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 border-red-200 dark:border-red-800 font-semibold',
    'High': 'bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-800 font-medium',
    'Medium': 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800 font-medium',
    'Low': 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700'
  };

  const currentStyle = styles[priority] || styles['Medium'];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${currentStyle}`}>
      {priority}
    </span>
  );
};

export const WorkloadBadge = ({ count, isOverloaded }) => {
  if (isOverloaded) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
        High Load ({count})
      </span>
    );
  }

  if (count === 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
        Available (0)
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
      Optimal ({count})
    </span>
  );
};
