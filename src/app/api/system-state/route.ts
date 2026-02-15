import { NextResponse } from "next/server";

/**
 * API Route: /api/system-state
 * Reads system state from OpenClaw workspace
 * In production, this would be pushed to Convex periodically
 */

export async function GET() {
  try {
    // Mock response - in production this would read from workspace
    const systemState = {
      timestamp: new Date().toISOString(),
      services: [
        {
          name: "Gateway API",
          status: "up",
          port: 18789,
          responseTime: 45,
          lastCheck: Date.now(),
        },
        {
          name: "Postgres",
          status: "up",
          port: 5432,
          responseTime: 12,
          lastCheck: Date.now(),
        },
        {
          name: "Redis Cache",
          status: "up",
          port: 6379,
          responseTime: 8,
          lastCheck: Date.now(),
        },
      ],
      uptime: "99.8%",
      activeAgents: 3,
      healthyAgents: 3,
      pendingTasks: 5,
    };

    return NextResponse.json(systemState);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch system state" },
      { status: 500 }
    );
  }
}
