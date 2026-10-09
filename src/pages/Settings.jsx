import React, { useState, useRef } from 'react';
import { useApp, STORAGE_KEYS } from '../context/AppContext';
import { backupStateToJSON, readJSONFile } from '../utils/exportJson';
import { ConfirmationModal } from '../components/common/ConfirmationModal';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Sliders,
  Database,
  Download,
  Upload,
  RotateCcw,
  Trash2,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2
} from 'lucide-react';

export const Settings = () => {
  const {
    theme,
    toggleTheme,
    workloadThreshold,
    setWorkloadThreshold,
    resetAllData,
    restoreFromBackup,
    tasks,
    team,
    surveyResponses,
    completedPractices,
    projectMetadata,
    addToast
  } = useApp();

  const [thresholdInput, setThresholdInput] = useState(workloadThreshold);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isWipeModalOpen, setIsWipeModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpdateThreshold = (e) => {
    e.preventDefault();
    const val = parseInt(thresholdInput, 10);
    if (!isNaN(val) && val >= 1 && val <= 20) {
      setWorkloadThreshold(val);
      addToast('Threshold Updated', `Workload warning threshold set to ${val} tasks.`, 'success');
    }
  };

  const handleBackupExport = () => {
    const appState = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      tasks,
      team,
      surveyResponses,
      completedPractices,
      projectMetadata,
      workloadThreshold
    };
    backupStateToJSON(appState, `delegatepro_backup_${new Date().toISOString().split('T')[0]}.json`);
    addToast('Backup Created', 'All application data exported as JSON.', 'success');
  };

  const handleFileImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await readJSONFile(file);
      restoreFromBackup(data);
    } catch (err) {
      addToast('Import Failed', err.message || 'Could not parse JSON file.', 'error');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleWipeAll = () => {
    localStorage.clear();
    resetAllData();
    setIsWipeModalOpen(false);
    addToast('Data Cleared', 'Browser local storage completely purged.', 'warning');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
            System Preferences & Data Governance
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Settings & Local Storage Control
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          Configure application parameters, appearance theme, workload thresholds, and manage browser storage backups.
        </p>

        {/* LocalStorage Privacy Notice Requirement */}
        <div className="mt-5 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-royal-600 dark:text-royal-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold">Client-Side Local Storage Notice</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              DelegatePro stores tasks, team records, survey submissions, and report settings securely in your browser's <code>localStorage</code>. This data remains on your local device and is <strong>not automatically shared with other computers, browsers, or external cloud servers</strong>. To transfer data across devices, use the JSON Backup & Restore utility below.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Appearance & Theme */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Interface Appearance Theme
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Currently using <strong>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</strong>
          </p>
        </div>

        <button
          onClick={toggleTheme}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors self-start sm:self-auto"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              Switch to Light Mode
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-slate-700" />
              Switch to Dark Mode
            </>
          )}
        </button>
      </div>

      {/* Section 2: Workload Threshold Setting */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
          Team Workload Alert Threshold
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Subordinates whose pending task count meets or exceeds this threshold will trigger a High Workload warning on the Dashboard and Team tabs.
        </p>

        <form onSubmit={handleUpdateThreshold} className="flex items-center gap-3 max-w-sm">
          <input
            type="number"
            min={1}
            max={20}
            value={thresholdInput}
            onChange={(e) => setThresholdInput(e.target.value)}
            className="w-24 px-3 py-2 rounded-xl text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-bold text-center focus:outline-none focus:ring-2 focus:ring-royal-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-royal-600 hover:bg-royal-700 shadow-sm transition-all"
          >
            Update Threshold
          </button>
        </form>
      </div>

      {/* Section 3: Data Backup, Restore & Reset */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-subtle space-y-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Data Backup & Migration
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Export a full JSON snapshot of your tasks, team members, and research questionnaire responses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Export System Backup
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Save complete application state to a single downloadable JSON file.
              </p>
            </div>
            <button
              onClick={handleBackupExport}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold rounded-xl text-royal-700 dark:text-royal-300 bg-royal-50 dark:bg-royal-950/60 border border-royal-200 dark:border-royal-800 hover:bg-royal-100 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download JSON Backup
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Restore from Backup
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Import and overwrite current state with a previously exported JSON backup.
              </p>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileImport}
                accept=".json"
                className="hidden"
                id="restore-file-input"
              />
              <label
                htmlFor="restore-file-input"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 text-xs font-bold rounded-xl text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                Select Backup JSON File
              </label>
            </div>
          </div>
        </div>

        {/* Reset Actions Strip */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Reset Application Datasets
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Restore default baseline tasks, fictional members, and sample survey responses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsResetModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 hover:bg-amber-100 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to Defaults
            </button>

            <button
              onClick={() => setIsWipeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Purge LocalStorage
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmationModal
        isOpen={isResetModalOpen}
        title="Reset All Data to Baseline?"
        message="This will reset tasks, team members, survey responses, and report metadata back to the default demonstration dataset. Any custom tasks created will be overwritten."
        confirmText="Reset to Baseline"
        confirmVariant="warning"
        onConfirm={() => {
          resetAllData();
          setIsResetModalOpen(false);
        }}
        onCancel={() => setIsResetModalOpen(false)}
      />

      <ConfirmationModal
        isOpen={isWipeModalOpen}
        title="Completely Purge Local Storage?"
        message="This will wipe all records from your browser's localStorage and re-initialize the baseline defaults."
        confirmText="Purge Storage"
        confirmVariant="danger"
        onConfirm={handleWipeAll}
        onCancel={() => setIsWipeModalOpen(false)}
      />
    </div>
  );
};
