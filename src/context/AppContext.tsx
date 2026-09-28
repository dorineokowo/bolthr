import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Role, ViewKey, Notification, Kudos, Employee, LeaveRequest, Candidate, CandidateStage, OnboardingJourney, TaskStatus } from '@/types';
import { notifications as initialNotifications, kudosFeed as initialKudos } from '@/data/mockData';
import { employees as initialEmployees } from '@/data/employees';
import { leaveRequests as initialLeaveRequests } from '@/data/leaveData';
import { candidates as initialCandidates } from '@/data/recruitmentData';
import { onboardingJourneys as initialJourneys } from '@/data/onboardingData';

interface AppState {
  role: Role;
  setRole: (r: Role) => void;
  currentView: ViewKey;
  setCurrentView: (v: ViewKey) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  notifications: Notification[];
  markAllNotificationsRead: () => void;
  unreadCount: number;
  kudos: Kudos[];
  likeKudos: (id: string) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  employees: Employee[];
  addEmployee: (emp: Employee) => void;
  leaveRequests: LeaveRequest[];
  addLeaveRequest: (req: LeaveRequest) => void;
  updateLeaveStatus: (id: string, status: 'Approved' | 'Rejected') => void;
  candidates: Candidate[];
  updateCandidateStage: (id: string, stage: CandidateStage) => void;
  updateCandidateRating: (id: string, rating: number) => void;
  onboardingJourneys: OnboardingJourney[];
  updateTaskStatus: (journeyId: string, taskId: string, status: TaskStatus) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('Admin');
  const [currentView, setCurrentView] = useState<ViewKey>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [kudos, setKudos] = useState<Kudos[]>(initialKudos);
  const [searchOpen, setSearchOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  const [journeys, setJourneys] = useState<OnboardingJourney[]>(initialJourneys);

  const toggleSidebar = () => setSidebarCollapsed((p) => !p);
  const markAllNotificationsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const unreadCount = notifications.filter((n) => !n.read).length;
  const likeKudos = (id: string) =>
    setKudos((prev) => prev.map((k) => (k.id === id ? { ...k, likes: k.likes + 1 } : k)));
  const addEmployee = (emp: Employee) => setEmployees((prev) => [...prev, emp]);
  const addLeaveRequest = (req: LeaveRequest) => setLeaveRequests((prev) => [req, ...prev]);
  const updateLeaveStatus = (id: string, status: 'Approved' | 'Rejected') =>
    setLeaveRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  const updateCandidateStage = (id: string, stage: CandidateStage) =>
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, stage } : c)));
  const updateCandidateRating = (id: string, rating: number) =>
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, rating } : c)));
  const updateTaskStatus = (journeyId: string, taskId: string, status: TaskStatus) =>
    setJourneys((prev) =>
      prev.map((j) => {
        if (j.id !== journeyId) return j;
        const tasks = j.tasks.map((t) => (t.id === taskId ? { ...t, status } : t));
        const completed = tasks.filter((t) => t.status === 'Complete').length;
        const progress = Math.round((completed / tasks.length) * 100);
        return { ...j, tasks, progress };
      })
    );

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentView,
        setCurrentView,
        sidebarCollapsed,
        toggleSidebar,
        notifications,
        markAllNotificationsRead,
        unreadCount,
        kudos,
        likeKudos,
        searchOpen,
        setSearchOpen,
        employees,
        addEmployee,
        leaveRequests,
        addLeaveRequest,
        updateLeaveStatus,
        candidates,
        updateCandidateStage,
        updateCandidateRating,
        onboardingJourneys: journeys,
        updateTaskStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
