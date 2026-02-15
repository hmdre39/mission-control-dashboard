export interface SystemStatus {
  _id: string;
  name: string;
  status: "up" | "down" | "degraded";
  port?: number;
  lastCheck: number;
  responseTime?: number;
  details?: string;
}

export interface Agent {
  _id: string;
  name: string;
  id: string;
  role: string;
  model: string;
  level: "L1" | "L2" | "L3" | "L4";
  status: "active" | "idle" | "error";
  healthy: boolean;
  lastActive: number;
  personality: {
    traits: string[];
    tone?: string;
  };
  capabilities: string[];
  rules: string[];
}

export interface CronJob {
  _id: string;
  name: string;
  schedule: string;
  status: "enabled" | "disabled" | "error";
  lastRun?: number;
  lastStatus: "success" | "error" | "pending";
  consecutiveErrors: number;
  nextRun?: number;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  category: string;
  status: "pending" | "approved" | "rejected" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  effort: "1h" | "4h" | "1d" | "3d" | "1w";
  reasoning?: string;
  nextAction?: string;
  createdAt: number;
  approvedAt?: number;
}

export interface ContentDraft {
  _id: string;
  title: string;
  platform: "twitter" | "blog" | "email" | "discord" | "other";
  content: string;
  status: "draft" | "review" | "approved" | "published";
  createdAt: number;
  updatedAt: number;
  scheduledFor?: number;
}

export interface CalendarEvent {
  _id: string;
  title: string;
  description?: string;
  type: "meeting" | "deadline" | "task" | "reminder" | "event";
  startTime: number;
  endTime: number;
  color?: string;
  attendees?: string[];
  recurring?: boolean;
}

export interface ChatMessage {
  _id: string;
  sessionId: string;
  channel: "telegram" | "discord" | "webchat";
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  threadId?: string;
}

export interface ChatSession {
  _id: string;
  sessionKey: string;
  channel: string;
  lastMessage?: string;
  lastMessageTime?: number;
  messageCount: number;
}

export interface Client {
  _id: string;
  name: string;
  status: "prospect" | "contacted" | "meeting" | "proposal" | "active";
  contacts: Array<{
    name: string;
    role?: string;
    email?: string;
  }>;
  lastInteraction?: number;
  nextAction?: string;
  notes?: string;
}

export interface EcosystemProduct {
  _id: string;
  slug: string;
  name: string;
  status: "active" | "development" | "concept";
  description?: string;
  metrics?: Record<string, any>;
  brand?: Record<string, any>;
  community?: Record<string, any>;
  content?: Record<string, any>;
  legal?: Record<string, any>;
  product?: Record<string, any>;
  website?: string;
}

export interface Activity {
  _id: string;
  type: string;
  description: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface DashboardStats {
  totalAgents: number;
  healthyAgents: number;
  activeSubAgents: number;
  servicesUp: number;
  servicesTotal: number;
  uptime: number;
  cronHealthy: number;
  cronTotal: number;
  pendingTasks: number;
  pendingApprovals: number;
}
