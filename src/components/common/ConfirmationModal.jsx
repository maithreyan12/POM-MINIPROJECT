import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmationModal = ({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  confirmVariant = "danger",
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  const confirmBtnStyles = {
    danger: "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500",
    primary: "bg-royal-600 hover:bg-royal-700 text-white focus:ring-royal-500",
    warning: "bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500"
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 shadow-elevated border border-slate-100 dark:border-slate-700 transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl shrink-0 ${
            confirmVariant === 'danger' ? 'bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400' :
            confirmVariant === 'warning' ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400' :
            'bg-blue-100 dark:bg-blue-950/70 text-royal-600 dark:text-royal-400'
          }`}>
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="flex-1">
            <h3 id="modal-headline" className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all ${
              confirmBtnStyles[confirmVariant] || confirmBtnStyles.danger
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
