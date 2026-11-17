export type ServiceCategoryId = 'all' | 'comm' | 'mgmt' | 'devops';
export type WorkspaceTabId = 'all' | 'pinned' | 'attention';
export type PortalNavId =
  | 'home'
  | 'profile'
  | 'portfolio'
  | 'projects'
  | 'calendar'
  | 'notifications'
  | 'surveys'
  | 'policies'
  | 'handoff';

export type UserPresenceStatus = 'present' | 'meeting' | 'remote' | 'leave';

export interface ServiceSubItem {
  id: string;
  title: string;
  subtitle: string;
  metric: string;
  statusLabel: string;
  accent: 'lime' | 'indigo' | 'orange' | 'neutral';
}

export interface PortalService {
  id: string;
  code: string;
  title: string;
  englishName: string;
  shortTitle: string;
  category: Exclude<ServiceCategoryId, 'all'>;
  categoryTitle: string;
  description: string;
  badgeText: string;
  unreadCount: number;
  pinned: boolean;
  needsAttention: boolean;
  uptime: string;
  responseTime: string;
  ownerTeam: string;
  leadName: string;
  leadRole: string;
  url: string;
  accentColor: '#CFFF04' | '#5F5CE1' | '#FA5A14';
  primaryMetric: { label: string; value: string };
  secondaryMetric: { label: string; value: string };
  tertiaryMetric: { label: string; value: string };
  ctaLabel: string;
  subItems: ServiceSubItem[];
}

export interface WorkLogEntry {
  id: string;
  date: string;
  projectTitle: string;
  hours: number;
  status: 'approved' | 'pending';
  description: string;
}

export interface PortalProject {
  id: string;
  code: string;
  name: string;
  role: string;
  progress: number;
  sprint: string;
  openTasks: number;
  completedTasks: number;
  status: 'on-track' | 'review' | 'at-risk';
  teamMembers: { name: string; initials: string; color: string }[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  dateLabel: string;
  room: string;
  type: 'meeting' | 'sprint' | 'deployment' | 'review';
  organizer: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  serviceName: string;
  timeAgo: string;
  read: boolean;
  priority: 'high' | 'normal';
  description: string;
}

export interface SurveyItem {
  id: string;
  title: string;
  deadline: string;
  questionsCount: number;
  estimatedMinutes: number;
  completed: boolean;
  department: string;
}

export interface PolicyItem {
  id: string;
  code: string;
  title: string;
  category: string;
  updatedAt: string;
  summary: string;
  acknowledged: boolean;
}
