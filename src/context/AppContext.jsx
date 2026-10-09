import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTeamMembers, initialTasks, initialProjectMetadata, demoSurveyResponses } from '../data/initialData';
import { defaultBestPractices } from '../data/bestPracticesData';

const AppContext = createContext();

export const STORAGE_KEYS = {
  TASKS: 'delegatepro_tasks_v1',
  TEAM: 'delegatepro_team_v1',
  SURVEY_RESPONSES: 'delegatepro_survey_v1',
  BEST_PRACTICES: 'delegatepro_best_practices_v1',
  METADATA: 'delegatepro_metadata_v1',
  THEME: 'delegatepro_theme_v1',
  WORKLOAD_THRESHOLD: 'delegatepro_workload_threshold_v1'
};

export const AppProvider = ({ children }) => {
  // 1. Navigation State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 2. Theme State
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 3. Workload Threshold Setting
  const [workloadThreshold, setWorkloadThreshold] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WORKLOAD_THRESHOLD);
    return saved ? parseInt(saved, 10) : 3;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WORKLOAD_THRESHOLD, workloadThreshold.toString());
  }, [workloadThreshold]);

  // 4. Tasks State
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialTasks;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  // 5. Team Members State
  const [team, setTeam] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TEAM);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return initialTeamMembers;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(team));
  }, [team]);

  // 6. Survey Responses State
  const [surveyResponses, setSurveyResponses] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SURVEY_RESPONSES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return demoSurveyResponses;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SURVEY_RESPONSES, JSON.stringify(surveyResponses));
  }, [surveyResponses]);

  // 7. Best Practices Checklist State (map of id -> boolean)
  const [completedPractices, setCompletedPractices] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BEST_PRACTICES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    // Default: mark 5 initially checked for a realistic dashboard start
    return { "bp-1": true, "bp-2": true, "bp-3": true, "bp-4": true, "bp-8": true };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BEST_PRACTICES, JSON.stringify(completedPractices));
  }, [completedPractices]);

  // 8. Project Report Metadata
  const [projectMetadata, setProjectMetadata] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.METADATA);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed.teamMembers &&
          parsed.teamMembers.length === 1 &&
          parsed.teamMembers[0].name.includes("Gopika") &&
          parsed.facultyDesignation &&
          parsed.facultyDesignation.includes("Department of Information Technology")
        ) {
          return parsed;
        }
      } catch (e) { console.error(e); }
    }
    return initialProjectMetadata;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.METADATA, JSON.stringify(projectMetadata));
  }, [projectMetadata]);

  // 9. Toast Notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Task Handlers
  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `tsk-${Date.now()}`
    };
    setTasks((prev) => [newTask, ...prev]);
    addToast('Task Created', `Delegated "${newTask.title}" successfully.`, 'success');
  };

  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
    addToast('Task Updated', 'Delegation parameters updated.', 'info');
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    addToast('Task Deleted', `"${taskToDelete?.title || 'Task'}" has been removed.`, 'warning');
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    addToast('Status Changed', `Task status set to "${newStatus}".`, 'info');
  };

  // Team Handlers
  const addMember = (memberData) => {
    const initials = memberData.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const newMember = {
      ...memberData,
      id: `mem-${Date.now()}`,
      avatar: initials || 'TM'
    };
    setTeam((prev) => [...prev, newMember]);
    addToast('Member Added', `${newMember.name} joined the delegation roster.`, 'success');
  };

  const updateMember = (id, updatedFields) => {
    setTeam((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updatedFields } : m))
    );
    addToast('Member Updated', 'Team member profile refreshed.', 'info');
  };

  const deleteMember = (id) => {
    const memberToDelete = team.find((m) => m.id === id);
    // Unassign tasks assigned to this member or keep with unassigned notice
    setTasks((prev) =>
      prev.map((t) => (t.assignedTo === id ? { ...t, assignedTo: '' } : t))
    );
    setTeam((prev) => prev.filter((m) => m.id !== id));
    addToast('Member Removed', `${memberToDelete?.name || 'Member'} removed and their tasks unassigned.`, 'warning');
  };

  // Survey Handlers
  const addSurveyResponse = (responseData) => {
    const newResponse = {
      ...responseData,
      id: `resp-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setSurveyResponses((prev) => [newResponse, ...prev]);
    addToast('Survey Submitted', 'Your responses have been recorded in local storage.', 'success');
  };

  const deleteSurveyResponse = (id) => {
    setSurveyResponses((prev) => prev.filter((r) => r.id !== id));
    addToast('Response Removed', 'Survey entry deleted.', 'info');
  };

  const clearSurveyResponses = () => {
    setSurveyResponses([]);
    addToast('Survey Data Cleared', 'All recorded survey submissions cleared.', 'warning');
  };

  const loadDemoSurveyResponses = () => {
    setSurveyResponses(demoSurveyResponses);
    addToast('Demo Data Loaded', '5 illustrative sample responses loaded.', 'info');
  };

  // Best Practices Handlers
  const togglePractice = (id) => {
    setCompletedPractices((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetPractices = () => {
    setCompletedPractices({});
    addToast('Checklist Reset', 'All recommendations marked incomplete.', 'info');
  };

  // Reset entire app to initial defaults
  const resetAllData = () => {
    setTasks(initialTasks);
    setTeam(initialTeamMembers);
    setSurveyResponses(demoSurveyResponses);
    setCompletedPractices({ "bp-1": true, "bp-2": true, "bp-3": true, "bp-4": true, "bp-8": true });
    setProjectMetadata(initialProjectMetadata);
    setWorkloadThreshold(3);
    addToast('System Reset', 'All application datasets restored to default demonstration baseline.', 'info');
  };

  // Restore from imported JSON backup
  const restoreFromBackup = (backup) => {
    try {
      if (backup.tasks) setTasks(backup.tasks);
      if (backup.team) setTeam(backup.team);
      if (backup.surveyResponses) setSurveyResponses(backup.surveyResponses);
      if (backup.completedPractices) setCompletedPractices(backup.completedPractices);
      if (backup.projectMetadata) setProjectMetadata(backup.projectMetadata);
      if (backup.workloadThreshold) setWorkloadThreshold(backup.workloadThreshold);
      addToast('Backup Restored', 'Application state successfully imported from JSON file.', 'success');
    } catch (e) {
      addToast('Restore Failed', 'Invalid or corrupt backup payload.', 'error');
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        theme,
        toggleTheme,
        workloadThreshold,
        setWorkloadThreshold,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        updateTaskStatus,
        team,
        addMember,
        updateMember,
        deleteMember,
        surveyResponses,
        addSurveyResponse,
        deleteSurveyResponse,
        clearSurveyResponses,
        loadDemoSurveyResponses,
        completedPractices,
        togglePractice,
        resetPractices,
        projectMetadata,
        setProjectMetadata,
        toasts,
        addToast,
        removeToast,
        resetAllData,
        restoreFromBackup
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
