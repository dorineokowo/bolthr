export type Role = 'Admin' | 'Line Manager' | 'Employee';

export type ViewKey =
  | 'dashboard'
  | 'directory'
  | 'time-leave'
  | 'recruitment'
  | 'onboarding'
  | 'payroll'
  | 'performance'
  | 'resource-hub'
  | 'analytics';

export interface NavItem {
  key: ViewKey;
  label: string;
  icon: string;
}

export interface KPICard {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  accent: string;
}

export interface HeadcountPoint {
  month: string;
  headcount: number;
  hires: number;
  departures: number;
}

export interface DepartmentSlice {
  name: string;
  value: number;
  color: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  author: string;
  authorRole: string;
  date: string;
  category: 'Company' | 'Policy' | 'Event' | 'Benefits';
  pinned?: boolean;
}

export interface Kudos {
  id: string;
  from: string;
  fromAvatar: string;
  to: string;
  toAvatar: string;
  message: string;
  value: string;
  date: string;
  likes: number;
}

export interface Notification {
  id: string;
  title: string;
  detail: string;
  time: string;
  read: boolean;
  type: 'leave' | 'expense' | 'onboarding' | 'review' | 'announcement';
}

export type EmploymentStatus = 'Active' | 'On Leave' | 'Remote';

export interface EmployeeDocument {
  id: string;
  name: string;
  type: string;
  uploaded: string;
  size: string;
}

export interface EmployeeAsset {
  id: string;
  name: string;
  serial: string;
  assigned: string;
  category: string;
}

export interface Employee {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  avatar: string;
  initials: string;
  title: string;
  department: string;
  location: string;
  status: EmploymentStatus;
  email: string;
  phone: string;
  managerId: string | null;
  managerName: string | null;
  startDate: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract';
  salary: number;
  bonus: number;
  level: string;
  documents: EmployeeDocument[];
  assets: EmployeeAsset[];
}

export type LeaveType = 'Annual Leave' | 'Sick Leave' | 'Remote Work' | 'Personal Day' | 'Unpaid Leave';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveBalance {
  type: LeaveType;
  total: number;
  used: number;
  unit: string;
  color: string;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  employeeInitials: string;
  employeeDept: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  status: LeaveStatus;
  notes: string;
  requestedDate: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: string;
  type: 'Company Holiday' | 'Observance';
}

export type RequisitionStatus = 'Published' | 'Draft' | 'Closed';

export interface JobRequisition {
  id: string;
  title: string;
  department: string;
  location: string;
  status: RequisitionStatus;
  openings: number;
  applicants: number;
  postedDate: string;
  hiringManager: string;
  salaryRange: string;
  priority: 'High' | 'Medium' | 'Low';
}

export type CandidateStage = 'Applied' | 'Screening' | 'Technical Interview' | 'Offer Sent' | 'Hired';

export interface Candidate {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  stage: CandidateStage;
  appliedDate: string;
  rating: number;
  experience: string;
  location: string;
  resumeSnippet: string;
  skills: string[];
  source: string;
}

export type TaskCategory = 'IT Setup' | 'HR Documentation' | 'Manager Intro';
export type TaskStatus = 'Pending' | 'In Progress' | 'Complete';

export interface OnboardingTask {
  id: string;
  title: string;
  category: TaskCategory;
  status: TaskStatus;
  assignee: string;
  dueDate: string;
}

export interface OnboardingJourney {
  id: string;
  employeeName: string;
  employeeInitials: string;
  role: string;
  department: string;
  startDate: string;
  manager: string;
  tasks: OnboardingTask[];
  progress: number;
}
