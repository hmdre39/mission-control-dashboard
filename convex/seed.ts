import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const seedDatabase = mutation(async (ctx) => {
  const now = Date.now();

  // System Status
  await ctx.db.insert("systemStatus", {
    name: "Gateway API",
    status: "up",
    port: 18789,
    lastCheck: now,
    responseTime: 45,
  });

  await ctx.db.insert("systemStatus", {
    name: "Postgres",
    status: "up",
    port: 5432,
    lastCheck: now,
    responseTime: 12,
  });

  await ctx.db.insert("systemStatus", {
    name: "Redis Cache",
    status: "up",
    port: 6379,
    lastCheck: now,
    responseTime: 8,
  });

  // Agents
  const agent1 = await ctx.db.insert("agents", {
    name: "Claude Prime",
    id: "agent-001",
    role: "Main strategist",
    model: "claude-opus-4-1",
    level: "L4",
    status: "active",
    healthy: true,
    lastActive: now,
    personality: {
      traits: ["analytical", "direct", "strategic"],
      tone: "professional",
    },
    capabilities: ["task_planning", "content_generation", "code_review", "strategic_thinking"],
    rules: ["always verify before executing", "ask for approval on financial decisions"],
  });

  const agent2 = await ctx.db.insert("agents", {
    name: "Content Muse",
    id: "agent-002",
    role: "Content specialist",
    model: "claude-haiku-4-5",
    level: "L2",
    status: "active",
    healthy: true,
    lastActive: now - 300000,
    personality: {
      traits: ["creative", "engaging", "clear"],
      tone: "conversational",
    },
    capabilities: ["content_generation", "editing", "social_media", "copywriting"],
    rules: ["always fact-check claims", "maintain brand voice"],
  });

  // Cron Jobs
  await ctx.db.insert("cronJobs", {
    name: "Daily digest",
    schedule: "0 9 * * *",
    status: "enabled",
    lastRun: now - 3600000,
    lastStatus: "success",
    consecutiveErrors: 0,
    nextRun: now + 86400000,
  });

  await ctx.db.insert("cronJobs", {
    name: "Weekly report",
    schedule: "0 0 * * 1",
    status: "enabled",
    lastRun: now - 604800000,
    lastStatus: "success",
    consecutiveErrors: 0,
    nextRun: now + 604800000,
  });

  await ctx.db.insert("cronJobs", {
    name: "Backup state",
    schedule: "*/30 * * * *",
    status: "enabled",
    lastRun: now - 60000,
    lastStatus: "success",
    consecutiveErrors: 0,
    nextRun: now + 1800000,
  });

  // Tasks
  const categories = ["Revenue", "Product", "Community", "Content", "Operations"];
  const tasks = [
    { title: "Launch new feature roadmap", category: "Product", priority: "high", effort: "1d" },
    { title: "Optimize API response times", category: "Operations", priority: "medium", effort: "4h" },
    { title: "Create Q1 content calendar", category: "Content", priority: "high", effort: "3d" },
    { title: "Reach out to 5 new prospects", category: "Revenue", priority: "urgent", effort: "1h" },
  ];

  for (const task of tasks) {
    await ctx.db.insert("tasks", {
      title: task.title,
      description: `Suggested task: ${task.title}`,
      category: task.category,
      status: "pending",
      priority: task.priority,
      effort: task.effort,
      reasoning: "Strategic priority",
      nextAction: "Review and approve",
      createdAt: now,
    });
  }

  // Content Drafts
  await ctx.db.insert("contentDrafts", {
    title: "The Future of AI Agents",
    platform: "blog",
    content:
      "Autonomous AI agents are reshaping how we work. In this deep dive, we explore the latest developments in agent architecture...",
    status: "review",
    createdAt: now - 86400000,
    updatedAt: now - 3600000,
  });

  await ctx.db.insert("contentDrafts", {
    title: "Weekly product update",
    platform: "email",
    content: "Hi community,\n\nThis week we shipped...",
    status: "approved",
    createdAt: now - 172800000,
    updatedAt: now - 86400000,
    scheduledFor: now + 86400000,
  });

  // Calendar Events (next 30 days)
  const eventTypes = ["meeting", "deadline", "task", "reminder"];
  for (let i = 0; i < 8; i++) {
    const startTime = now + i * 86400000 + Math.random() * 86400000;
    await ctx.db.insert("calendarEvents", {
      title: `Event ${i + 1}`,
      description: "Sample calendar event",
      type: eventTypes[i % eventTypes.length],
      startTime,
      endTime: startTime + 3600000,
      color: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A"][i % 4],
    });
  }

  // Chat Sessions
  await ctx.db.insert("chatSessions", {
    sessionKey: "session-001",
    channel: "telegram",
    lastMessage: "See you tomorrow!",
    lastMessageTime: now - 3600000,
    messageCount: 42,
  });

  await ctx.db.insert("chatSessions", {
    sessionKey: "session-002",
    channel: "discord",
    lastMessage: "Thanks for the update",
    lastMessageTime: now - 7200000,
    messageCount: 18,
  });

  // Clients
  await ctx.db.insert("clients", {
    name: "Acme Corp",
    status: "active",
    contacts: [
      { name: "Sarah Chen", role: "CTO", email: "sarah@acme.com" },
      { name: "Mike Johnson", role: "CEO", email: "mike@acme.com" },
    ],
    lastInteraction: now - 86400000,
    nextAction: "Schedule Q1 review",
  });

  await ctx.db.insert("clients", {
    name: "Startup Labs",
    status: "proposal",
    contacts: [{ name: "Alex Park", role: "Founder", email: "alex@startuplabs.io" }],
    lastInteraction: now - 604800000,
    nextAction: "Follow up on proposal",
  });

  // Ecosystem Products
  const products = [
    { name: "Dashboard", status: "active" },
    { name: "Agent API", status: "active" },
    { name: "Memory System", status: "active" },
    { name: "Analytics Engine", status: "development" },
  ];

  for (const product of products) {
    await ctx.db.insert("ecosystemProducts", {
      slug: product.name.toLowerCase().replace(/ /g, "-"),
      name: product.name,
      status: product.status,
      description: `${product.name} - Core infrastructure component`,
      metrics: { uptime: 99.9, users: 1200 },
    });
  }

  // Activities
  await ctx.db.insert("activities", {
    type: "deployment",
    description: "Deployed v2.1.0 to production",
    timestamp: now - 3600000,
    metadata: { version: "2.1.0", duration: 125 },
  });

  return "Database seeded successfully";
});
