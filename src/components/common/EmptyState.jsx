import React from 'react';
import { FolderOpen } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = FolderOpen,
  title = "No Data Found",
  description = "Get started by creating a new entry or loading demo data.",
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-subtle border border-slate-200 dark:border-slate-700 text-royal-600 dark:text-royal-400 mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mt-1 mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl text-white bg-royal-600 hover:bg-royal-700 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-royal-500"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
