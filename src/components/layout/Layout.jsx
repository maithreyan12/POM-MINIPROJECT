import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { ToastContainer } from '../common/Toast';
import { TaskModal } from '../tasks/TaskModal';
import { TaskDetailModal } from '../tasks/TaskDetailModal';
import { MemberModal } from '../team/MemberModal';
import { ConfirmationModal } from '../common/ConfirmationModal';

// Pages
import { Dashboard } from '../../pages/Dashboard';
import { ProjectOverview } from '../../pages/ProjectOverview';
import { DelegationFundamentals } from '../../pages/DelegationFundamentals';
import { TaskDelegation } from '../../pages/TaskDelegation';
import { TeamManagement } from '../../pages/TeamManagement';
import { DelegationWorkflow } from '../../pages/DelegationWorkflow';
import { CaseStudies } from '../../pages/CaseStudies';
import { ResearchSurvey } from '../../pages/ResearchSurvey';
import { SurveyResponses } from '../../pages/SurveyResponses';
import { Analytics } from '../../pages/Analytics';
import { ChallengesSolutions } from '../../pages/ChallengesSolutions';
import { BestPractices } from '../../pages/BestPractices';
import { ProjectReport } from '../../pages/ProjectReport';
import { AboutProject } from '../../pages/AboutProject';
import { Settings } from '../../pages/Settings';

export const Layout = () => {
  const {
    activeTab,
    team,
    deleteTask,
    updateTaskStatus
  } = useApp();

  // Task Modal State
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Task Detail Modal State
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Member Modal State
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState(null);

  // Delete Confirmation State
  const [taskToDeleteId, setTaskToDeleteId] = useState(null);

  // Handlers for Tasks
  const handleOpenCreateTask = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditTask = (task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleOpenDetailTask = (task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  // Handlers for Members
  const handleOpenAddMember = () => {
    setMemberToEdit(null);
    setIsMemberModalOpen(true);
  };

  const handleOpenEditMember = (member) => {
    setMemberToEdit(member);
    setIsMemberModalOpen(true);
  };

  const handleConfirmDeleteTask = () => {
    if (taskToDeleteId) {
      deleteTask(taskToDeleteId);
      setTaskToDeleteId(null);
    }
  };

  // Render Page Content based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            onOpenTaskModal={handleOpenCreateTask}
            onOpenMemberModal={handleOpenAddMember}
            onSelectTask={handleOpenDetailTask}
          />
        );
      case 'overview':
        return <ProjectOverview />;
      case 'fundamentals':
        return <DelegationFundamentals />;
      case 'tasks':
        return (
          <TaskDelegation
            onOpenCreateModal={handleOpenCreateTask}
            onOpenEditModal={handleOpenEditTask}
            onOpenDetailModal={handleOpenDetailTask}
          />
        );
      case 'team':
        return (
          <TeamManagement
            onOpenAddModal={handleOpenAddMember}
            onOpenEditModal={handleOpenEditMember}
          />
        );
      case 'workflow':
        return <DelegationWorkflow />;
      case 'case-studies':
        return <CaseStudies />;
      case 'survey':
        return <ResearchSurvey />;
      case 'responses':
        return <SurveyResponses />;
      case 'analytics':
        return <Analytics />;
      case 'challenges':
        return <ChallengesSolutions />;
      case 'practices':
        return <BestPractices />;
      case 'report':
        return <ProjectReport />;
      case 'about':
        return <AboutProject />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <Dashboard
            onOpenTaskModal={handleOpenCreateTask}
            onOpenMemberModal={handleOpenAddMember}
            onSelectTask={handleOpenDetailTask}
          />
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] dark:bg-slate-900 transition-colors">
      {/* Collapsible Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Slide-Out Drawer */}
      <MobileNav />

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Navbar */}
        <Header onOpenTaskModal={handleOpenCreateTask} />

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>

      {/* Floating Toast Notification Container */}
      <ToastContainer />

      {/* Task Create / Edit Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        taskToEdit={taskToEdit}
      />

      {/* Task Full Detail Modal */}
      <TaskDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        task={selectedTask}
        team={team}
        onEdit={(task) => {
          setIsDetailModalOpen(false);
          handleOpenEditTask(task);
        }}
        onDelete={(taskId) => {
          setTaskToDeleteId(taskId);
        }}
        onUpdateStatus={updateTaskStatus}
      />

      {/* Team Member Add / Edit Modal */}
      <MemberModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        memberToEdit={memberToEdit}
      />

      {/* Task Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!taskToDeleteId}
        title="Delete Delegated Task"
        message="Are you sure you want to delete this delegated task? This action cannot be reversed."
        confirmText="Delete Task"
        confirmVariant="danger"
        onConfirm={handleConfirmDeleteTask}
        onCancel={() => setTaskToDeleteId(null)}
      />
    </div>
  );
};
