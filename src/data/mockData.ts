import type {
  Announcement,
  DepartmentSlice,
  HeadcountPoint,
  Kudos,
  KPICard,
  Notification,
} from '@/types';

export const kpiCards: KPICard[] = [
  {
    id: 'headcount',
    label: 'Total Headcount',
    value: '482',
    change: '+18 this quarter',
    trend: 'up',
    icon: 'Users',
    accent: 'blue',
  },
  {
    id: 'leaves',
    label: 'Active Leaves',
    value: '12',
    change: '3 returning today',
    trend: 'down',
    icon: 'CalendarOff',
    accent: 'amber',
  },
  {
    id: 'requisitions',
    label: 'Open Requisitions',
    value: '8',
    change: '2 new this week',
    trend: 'up',
    icon: 'Briefcase',
    accent: 'emerald',
  },
  {
    id: 'payroll',
    label: 'Monthly Payroll',
    value: '$1.2M',
    change: '+2.1% vs last month',
    trend: 'up',
    icon: 'DollarSign',
    accent: 'indigo',
  },
];

export const headcountTrend: HeadcountPoint[] = [
  { month: 'Apr', headcount: 438, hires: 14, departures: 6 },
  { month: 'May', headcount: 446, hires: 12, departures: 4 },
  { month: 'Jun', headcount: 451, hires: 9, departures: 4 },
  { month: 'Jul', headcount: 459, hires: 11, departures: 3 },
  { month: 'Aug', headcount: 468, hires: 13, departures: 4 },
  { month: 'Sep', headcount: 472, hires: 8, departures: 4 },
  { month: 'Oct', headcount: 482, hires: 14, departures: 4 },
];

export const departmentDistribution: DepartmentSlice[] = [
  { name: 'Engineering', value: 142, color: '#3b82f6' },
  { name: 'Sales', value: 88, color: '#10b981' },
  { name: 'Marketing', value: 54, color: '#f59e0b' },
  { name: 'Operations', value: 62, color: '#6366f1' },
  { name: 'Finance', value: 38, color: '#ec4899' },
  { name: 'HR', value: 28, color: '#14b8a6' },
  { name: 'Design', value: 70, color: '#8b5cf6' },
];

export const announcements: Announcement[] = [
  {
    id: 'a1',
    title: 'Q4 All-Hands Meeting — October 18',
    body: 'Join us for our quarterly all-hands where leadership will cover FY performance, product roadmap, and year-end goals. Calendar invites have been sent.',
    author: 'Sarah Chen',
    authorRole: 'Chief People Officer',
    date: '2h ago',
    category: 'Company',
    pinned: true,
  },
  {
    id: 'a2',
    title: 'New Wellness Stipend Now Available',
    body: 'Employees can now claim up to $600/year for gym memberships, mental health apps, and wellness programs through the expenses portal.',
    author: 'Marcus Rivera',
    authorRole: 'Benefits Manager',
    date: '1d ago',
    category: 'Benefits',
  },
  {
    id: 'a3',
    title: 'Updated Remote Work Policy',
    body: 'We have refined the hybrid policy to require 2 days in-office (Tue/Wed) for teams with over 8 members. Fully remote roles remain unchanged.',
    author: 'Sarah Chen',
    authorRole: 'Chief People Officer',
    date: '3d ago',
    category: 'Policy',
  },
  {
    id: 'a4',
    title: 'Annual Engineering Hackathon — Nov 1-3',
    body: 'Form teams of 3-5 and build something impactful. Prizes include a $5,000 team budget and executive lunch with the CTO.',
    author: 'Priya Nair',
    authorRole: 'VP Engineering',
    date: '4d ago',
    category: 'Event',
  },
];

export const kudosFeed: Kudos[] = [
  {
    id: 'k1',
    from: 'Alex Morgan',
    fromAvatar: 'AM',
    to: 'Jordan Lee',
    toAvatar: 'JL',
    message: 'Incredible work shipping the auth refactor ahead of schedule — saved the team weeks of rework.',
    value: 'Excellence',
    date: '1h ago',
    likes: 24,
  },
  {
    id: 'k2',
    from: 'Dana Patel',
    fromAvatar: 'DP',
    to: 'Sam Rodriguez',
    toAvatar: 'SR',
    message: 'Thank you for stepping in to mentor our new hires this week. Your patience and guidance mean a lot.',
    value: 'Teamwork',
    date: '5h ago',
    likes: 17,
  },
  {
    id: 'k3',
    from: 'Chris Kim',
    fromAvatar: 'CK',
    to: 'Taylor Brooks',
    toAvatar: 'TB',
    message: 'Went above and beyond on the client presentation — the deal closed because of your prep.',
    value: 'Ownership',
    date: '1d ago',
    likes: 31,
  },
];

export const notifications: Notification[] = [
  {
    id: 'n1',
    title: 'Leave request approved',
    detail: 'Your PTO request for Oct 10-12 has been approved by Marcus Rivera.',
    time: '10 min ago',
    read: false,
    type: 'leave',
  },
  {
    id: 'n2',
    title: 'New expense submission',
    detail: 'Jordan Lee submitted a $340 expense for client dinner.',
    time: '1h ago',
    read: false,
    type: 'expense',
  },
  {
    id: 'n3',
    title: 'Onboarding task overdue',
    detail: 'IT equipment setup for new hire Emma Walsh is 1 day overdue.',
    time: '3h ago',
    read: false,
    type: 'onboarding',
  },
  {
    id: 'n4',
    title: 'Performance review reminder',
    detail: 'Q4 self-assessment is due by October 25.',
    time: '1d ago',
    read: true,
    type: 'review',
  },
];

export const sidebarNav = [
  { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { key: 'directory', label: 'Directory', icon: 'Contact' },
  { key: 'time-leave', label: 'Time & Leave', icon: 'CalendarDays' },
  { key: 'recruitment', label: 'Recruitment', icon: 'UserPlus' },
  { key: 'onboarding', label: 'Onboarding', icon: 'Rocket' },
  { key: 'payroll', label: 'Payroll', icon: 'Wallet' },
  { key: 'performance', label: 'Performance', icon: 'TrendingUp' },
  { key: 'resource-hub', label: 'Resource Hub', icon: 'BookOpen' },
  { key: 'analytics', label: 'Analytics', icon: 'BarChart3' },
] as const;
