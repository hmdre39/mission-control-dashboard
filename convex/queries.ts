import { query } from "./_generated/server";
import { v } from "convex/values";

export const getSystemStatus = query(async (ctx) => {
  return await ctx.db.query("systemStatus").collect();
});

export const getAgents = query(async (ctx) => {
  return await ctx.db.query("agents").order("_creationTime", "desc").collect();
});

export const getAgent = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("agents").filter((q) => q.eq(q.field("id"), args.id)).first();
  },
});

export const getCronJobs = query(async (ctx) => {
  return await ctx.db.query("cronJobs").collect();
});

export const getTasks = query({
  args: { category: v.optional(v.string()), status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let query = ctx.db.query("tasks");
    if (args.category) {
      query = query.filter((q) => q.eq(q.field("category"), args.category));
    }
    if (args.status) {
      query = query.filter((q) => q.eq(q.field("status"), args.status));
    }
    return await query.order("_creationTime", "desc").collect();
  },
});

export const getContentDrafts = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let query = ctx.db.query("contentDrafts");
    if (args.status) {
      query = query.filter((q) => q.eq(q.field("status"), args.status));
    }
    return await query.order("updatedAt", "desc").collect();
  },
});

export const getCalendarEvents = query({
  args: { from: v.number(), to: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("calendarEvents")
      .filter((q) => q.and(q.gte(q.field("startTime"), args.from), q.lte(q.field("startTime"), args.to)))
      .order("startTime", "asc")
      .collect();
  },
});

export const getChatSessions = query(async (ctx) => {
  return await ctx.db.query("chatSessions").order("_creationTime", "desc").collect();
});

export const getChatMessages = query({
  args: { sessionId: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const l = args.limit || 50;
    return await ctx.db
      .query("chatMessages")
      .filter((q) => q.eq(q.field("sessionId"), args.sessionId))
      .order("timestamp", "asc")
      .take(l);
  },
});

export const getClients = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    let query = ctx.db.query("clients");
    if (args.status) {
      query = query.filter((q) => q.eq(q.field("status"), args.status));
    }
    return await query.collect();
  },
});

export const getEcosystemProduct = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ecosystemProducts")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();
  },
});

export const getEcosystemProducts = query(async (ctx) => {
  return await ctx.db.query("ecosystemProducts").collect();
});

export const getActivities = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const l = args.limit || 20;
    return await ctx.db.query("activities").order("timestamp", "desc").take(l);
  },
});
