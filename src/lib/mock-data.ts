// Mock data for local development (no Convex required)

export const mockSystemStatus = [
  {
    _id: "1",
    name: "Gateway API",
    status: "up" as const,
    port: 18789,
    lastCheck: Date.now(),
    responseTime: 45,
  },
  {
    _id: "2",
    name: "Postgres",
    status: "up" as const,
    port: 5432,
    lastCheck: Date.now(),
    responseTime: 12,
  },
  {
    _id: "3",
    name: "Redis Cache",
    status: "up" as const,
    port: 6379,
    lastCheck: Date.now(),
    responseTime: 8,
  },
];

export const mockAgents = [
  {
    _id: "1",
    name: "Claude Prime",
    id: "agent-001",
    role: "Main strategist",
    model: "claude-opus-4-1",
    level: "L4" as const,
    status: "active" as const,
    healthy: true,
    lastActive: Date.now(),
    personality: {
      traits: ["analytical", "direct", "strategic"],
      tone: "professional",
    },
    capabilities: ["task_planning", "content_generation", "code_review"],
    rules: ["always verify before executing"],
  },
  {
    _id: "2",
    name: "Content Muse",
    id: "agent-002",
    role: "Content specialist",
    model: "claude-haiku-4-5",
    level: "L2" as const,
    status: "active" as const,
    healthy: true,
    lastActive: Date.now() - 300000,
    personality: {
      traits: ["creative", "engaging", "clear"],
      tone: "conversational",
    },
    capabilities: ["content_generation", "editing", "social_media"],
    rules: ["maintain brand voice"],
  },
];

export const mockCronJobs = [
  {
    _id: "1",
    name: "Daily digest",
    schedule: "0 9 * * *",
    status: "enabled" as const,
    lastRun: Date.now() - 3600000,
    lastStatus: "success" as const,
    consecutiveErrors: 0,
    nextRun: Date.now() + 86400000,
  },
  {
    _id: "2",
    name: "Weekly report",
    schedule: "0 0 * * 1",
    status: "enabled" as const,
    lastRun: Date.now() - 604800000,
    lastStatus: "success" as const,
    consecutiveErrors: 0,
    nextRun: Date.now() + 604800000,
  },
];

export const mockTasks = [
  {
    _id: "1",
    title: "Launch new feature roadmap",
    category: "Product",
    priority: "high" as const,
    effort: "1d" as const,
    status: "pending" as const,
    description: "Plan and announce Q1 roadmap",
    createdAt: Date.now(),
  },
  {
    _id: "2",
    title: "Reach out to 5 new prospects",
    category: "Revenue",
    priority: "urgent" as const,
    effort: "1h" as const,
    status: "pending" as const,
    description: "Sales outreach campaign",
    createdAt: Date.now(),
  },
];

export const mockContentDrafts = [
  {
    _id: "1",
    title: "The Future of AI Agents",
    platform: "blog" as const,
    content: "Autonomous AI agents are reshaping how we work...",
    status: "review" as const,
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now(),
  },
  {
    _id: "2",
    title: "Weekly product update",
    platform: "email" as const,
    content: "Hi community, this week we shipped...",
    status: "approved" as const,
    createdAt: Date.now() - 172800000,
    updatedAt: Date.now(),
  },
];

export const mockClients = [
  {
    _id: "1",
    name: "Acme Corp",
    status: "active" as const,
    contacts: [{ name: "Sarah Chen", role: "CTO", email: "sarah@acme.com" }],
    lastInteraction: Date.now() - 86400000,
    nextAction: "Schedule Q1 review",
  },
  {
    _id: "2",
    name: "Startup Labs",
    status: "proposal" as const,
    contacts: [{ name: "Alex Park", role: "Founder", email: "alex@startup.io" }],
    lastInteraction: Date.now() - 604800000,
    nextAction: "Follow up on proposal",
  },
];

export const mockActivities = [
  {
    _id: "1",
    type: "deployment",
    description: "Deployed v2.1.0 to production",
    timestamp: Date.now() - 3600000,
    metadata: { version: "2.1.0" },
  },
  {
    _id: "2",
    type: "task",
    description: "Task approved by user",
    timestamp: Date.now() - 7200000,
  },
];
