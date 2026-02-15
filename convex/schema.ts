import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  systemStatus: defineTable({
    name: v.string(),
    status: v.union(v.literal("up"), v.literal("down"), v.literal("degraded")),
    port: v.optional(v.number()),
    lastCheck: v.number(),
    responseTime: v.optional(v.number()),
    details: v.optional(v.string()),
  })
    .index("by_name", ["name"])
    .index("by_status", ["status"]),

  agents: defineTable({
    name: v.string(),
    id: v.string(),
    role: v.string(),
    model: v.string(),
    level: v.union(v.literal("L1"), v.literal("L2"), v.literal("L3"), v.literal("L4")),
    status: v.union(v.literal("active"), v.literal("idle"), v.literal("error")),
    healthy: v.boolean(),
    lastActive: v.number(),
    personality: v.object({
      traits: v.array(v.string()),
      tone: v.optional(v.string()),
    }),
    capabilities: v.array(v.string()),
    rules: v.array(v.string()),
  })
    .index("by_id", ["id"])
    .index("by_status", ["status"]),

  cronJobs: defineTable({
    name: v.string(),
    schedule: v.string(),
    status: v.union(v.literal("enabled"), v.literal("disabled"), v.literal("error")),
    lastRun: v.optional(v.number()),
    lastStatus: v.union(v.literal("success"), v.literal("error"), v.literal("pending")),
    consecutiveErrors: v.number(),
    nextRun: v.optional(v.number()),
  })
    .index("by_name", ["name"])
    .index("by_status", ["status"]),

  tasks: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    category: v.string(),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected"), v.literal("completed")),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("urgent")),
    effort: v.union(v.literal("1h"), v.literal("4h"), v.literal("1d"), v.literal("3d"), v.literal("1w")),
    reasoning: v.optional(v.string()),
    nextAction: v.optional(v.string()),
    createdAt: v.number(),
    approvedAt: v.optional(v.number()),
  })
    .index("by_category", ["category"])
    .index("by_status", ["status"])
    .index("by_priority", ["priority"]),

  contentDrafts: defineTable({
    title: v.string(),
    platform: v.union(v.literal("twitter"), v.literal("blog"), v.literal("email"), v.literal("discord"), v.literal("other")),
    content: v.string(),
    status: v.union(v.literal("draft"), v.literal("review"), v.literal("approved"), v.literal("published")),
    createdAt: v.number(),
    updatedAt: v.number(),
    scheduledFor: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_platform", ["platform"]),

  calendarEvents: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    type: v.union(v.literal("meeting"), v.literal("deadline"), v.literal("task"), v.literal("reminder"), v.literal("event")),
    startTime: v.number(),
    endTime: v.number(),
    color: v.optional(v.string()),
    attendees: v.optional(v.array(v.string())),
    recurring: v.optional(v.boolean()),
  })
    .index("by_start", ["startTime"])
    .index("by_type", ["type"]),

  chatMessages: defineTable({
    sessionId: v.string(),
    channel: v.union(v.literal("telegram"), v.literal("discord"), v.literal("webchat")),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    timestamp: v.number(),
    threadId: v.optional(v.string()),
  })
    .index("by_session", ["sessionId"])
    .index("by_channel", ["channel"])
    .index("by_timestamp", ["timestamp"]),

  chatSessions: defineTable({
    sessionKey: v.string(),
    channel: v.string(),
    lastMessage: v.optional(v.string()),
    lastMessageTime: v.optional(v.number()),
    messageCount: v.number(),
  })
    .index("by_key", ["sessionKey"])
    .index("by_channel", ["channel"]),

  clients: defineTable({
    name: v.string(),
    status: v.union(v.literal("prospect"), v.literal("contacted"), v.literal("meeting"), v.literal("proposal"), v.literal("active")),
    contacts: v.array(
      v.object({
        name: v.string(),
        role: v.optional(v.string()),
        email: v.optional(v.string()),
      })
    ),
    lastInteraction: v.optional(v.number()),
    nextAction: v.optional(v.string()),
    notes: v.optional(v.string()),
  })
    .index("by_status", ["status"]),

  ecosystemProducts: defineTable({
    slug: v.string(),
    name: v.string(),
    status: v.union(v.literal("active"), v.literal("development"), v.literal("concept")),
    description: v.optional(v.string()),
    metrics: v.optional(v.object({})),
    brand: v.optional(v.object({})),
    community: v.optional(v.object({})),
    content: v.optional(v.object({})),
    legal: v.optional(v.object({})),
    product: v.optional(v.object({})),
    website: v.optional(v.string()),
  })
    .index("by_slug", ["slug"])
    .index("by_status", ["status"]),

  activities: defineTable({
    type: v.string(),
    description: v.string(),
    timestamp: v.number(),
    metadata: v.optional(v.object({})),
  })
    .index("by_timestamp", ["timestamp"])
    .index("by_type", ["type"]),
});
