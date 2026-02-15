import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const updateTaskStatus = mutation({
  args: { taskId: v.id("tasks"), status: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.taskId, { status: args.status, updatedAt: Date.now() });
  },
});

export const createTask = mutation({
  args: {
    title: v.string(),
    category: v.string(),
    priority: v.string(),
    effort: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("tasks", {
      title: args.title,
      category: args.category,
      priority: args.priority,
      effort: args.effort,
      description: args.description,
      status: "pending",
      createdAt: Date.now(),
    });
  },
});

export const addChatMessage = mutation({
  args: {
    sessionId: v.string(),
    channel: v.string(),
    role: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    await ctx.db.insert("chatMessages", {
      sessionId: args.sessionId,
      channel: args.channel,
      role: args.role,
      content: args.content,
      timestamp,
    });

    // Update session
    const session = await ctx.db
      .query("chatSessions")
      .filter((q) => q.eq(q.field("sessionId"), args.sessionId))
      .first();

    if (session) {
      await ctx.db.patch(session._id, {
        lastMessage: args.content,
        lastMessageTime: timestamp,
        messageCount: (session.messageCount || 0) + 1,
      });
    } else {
      await ctx.db.insert("chatSessions", {
        sessionId: args.sessionId,
        channel: args.channel,
        lastMessage: args.content,
        lastMessageTime: timestamp,
        messageCount: 1,
      });
    }
  },
});

export const createCalendarEvent = mutation({
  args: {
    title: v.string(),
    type: v.string(),
    startTime: v.number(),
    endTime: v.number(),
    description: v.optional(v.string()),
    color: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("calendarEvents", {
      title: args.title,
      type: args.type,
      startTime: args.startTime,
      endTime: args.endTime,
      description: args.description,
      color: args.color,
    });
  },
});

export const updateCalendarEvent = mutation({
  args: {
    eventId: v.id("calendarEvents"),
    title: v.optional(v.string()),
    startTime: v.optional(v.number()),
    endTime: v.optional(v.number()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const update: any = {};
    if (args.title) update.title = args.title;
    if (args.startTime) update.startTime = args.startTime;
    if (args.endTime) update.endTime = args.endTime;
    if (args.description) update.description = args.description;
    return await ctx.db.patch(args.eventId, update);
  },
});

export const deleteCalendarEvent = mutation({
  args: { eventId: v.id("calendarEvents") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.eventId);
  },
});

export const updateContentDraft = mutation({
  args: {
    draftId: v.id("contentDrafts"),
    status: v.optional(v.string()),
    content: v.optional(v.string()),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const update: any = { updatedAt: Date.now() };
    if (args.status) update.status = args.status;
    if (args.content) update.content = args.content;
    if (args.title) update.title = args.title;
    return await ctx.db.patch(args.draftId, update);
  },
});

export const createContentDraft = mutation({
  args: {
    title: v.string(),
    platform: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("contentDrafts", {
      title: args.title,
      platform: args.platform,
      content: args.content,
      status: "draft",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const addClient = mutation({
  args: {
    name: v.string(),
    status: v.string(),
    contacts: v.optional(
      v.array(
        v.object({
          name: v.string(),
          role: v.optional(v.string()),
          email: v.optional(v.string()),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("clients", {
      name: args.name,
      status: args.status,
      contacts: args.contacts || [],
    });
  },
});

export const updateClient = mutation({
  args: {
    clientId: v.id("clients"),
    status: v.optional(v.string()),
    nextAction: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const update: any = { lastInteraction: Date.now() };
    if (args.status) update.status = args.status;
    if (args.nextAction) update.nextAction = args.nextAction;
    return await ctx.db.patch(args.clientId, update);
  },
});

export const addActivity = mutation({
  args: {
    type: v.string(),
    description: v.string(),
    metadata: v.optional(v.object({})),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("activities", {
      type: args.type,
      description: args.description,
      timestamp: Date.now(),
      metadata: args.metadata,
    });
  },
});
