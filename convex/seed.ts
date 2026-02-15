// Seed database - mock data setup
// This is not used in production, just for local development
// TODO: Connect to real Convex backend when ready

export const seedDatabase = async () => {
  const now = Date.now();

  // Mock data structure for reference
  const mockData = {
    systemStatus: [
      {
        name: "Gateway API",
        status: "up",
        port: 18789,
        lastCheck: now,
        responseTime: 45,
      },
      {
        name: "Postgres",
        status: "up",
        port: 5432,
        lastCheck: now,
        responseTime: 12,
      },
      {
        name: "Redis Cache",
        status: "up",
        port: 6379,
        lastCheck: now,
        responseTime: 8,
      },
    ],
    agents: [
      {
        name: "Claude Prime",
        id: "agent-001",
        role: "Main strategist",
        model: "claude-opus-4-1",
        level: "L4",
        status: "active",
        healthy: true,
        lastActive: now,
      },
      {
        name: "Content Muse",
        id: "agent-002",
        role: "Content specialist",
        model: "claude-haiku-4-5",
        level: "L2",
        status: "active",
        healthy: true,
        lastActive: now - 300000,
      },
    ],
  };

  return {
    success: true,
    message: "Database seeded successfully",
    data: mockData,
  };
};
