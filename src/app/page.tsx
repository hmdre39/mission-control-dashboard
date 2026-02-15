"use client";

import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, Server, Zap, TrendingUp } from "lucide-react";
import { mockSystemStatus, mockAgents, mockCronJobs, mockActivities } from "@/lib/mock-data";

export default function HomePage() {
  const systemStatus = mockSystemStatus;
  const agents = mockAgents;
  const cronJobs = mockCronJobs;
  const activities = mockActivities;

  const healthyAgents = agents.filter((a) => a.healthy).length;
  const upServices = systemStatus.filter((s) => s.status === "up").length;
  const healthyCrons = cronJobs.filter((c) => c.lastStatus === "success").length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", bounce: 0.2, duration: 0.5 },
    },
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Mission Control</h1>
        <p className="text-white/60 text-sm">System status and agent overview</p>
      </motion.div>

      {/* Quick Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
      >
        <motion.div variants={itemVariants}>
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-xs sm:text-sm mb-1">Services</p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {upServices}/{systemStatus.length}
                </p>
              </div>
              <Server className="w-5 h-5 text-primary/60" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-xs sm:text-sm mb-1">Agents</p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {healthyAgents}/{agents.length}
                </p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-500/60" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-xs sm:text-sm mb-1">Cron Jobs</p>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {healthyCrons}/{cronJobs.length}
                </p>
              </div>
              <Zap className="w-5 h-5 text-yellow-500/60" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/60 text-xs sm:text-sm mb-1">Uptime</p>
                <p className="text-xl sm:text-2xl font-bold text-white">99.8%</p>
              </div>
              <TrendingUp className="w-5 h-5 text-green-500/60" />
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* System Health */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">System Health</h2>
            <div className="space-y-3">
              {systemStatus.map((service) => (
                <div
                  key={service._id}
                  className="flex items-center justify-between p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.05]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{service.name}</p>
                    {service.port && (
                      <p className="text-xs text-white/40">Port {service.port}</p>
                    )}
                  </div>
                  <StatusBadge status={service.status} />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Active Agents */}
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Active Agents</h2>
            <div className="space-y-3">
              {agents.slice(0, 4).map((agent) => (
                <div
                  key={agent._id}
                  className="flex items-center justify-between p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.05]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{agent.name}</p>
                    <p className="text-xs text-white/40">{agent.model}</p>
                  </div>
                  <StatusBadge status={agent.healthy ? "active" : "error"} />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Cron Health */}
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Scheduled Jobs</h2>
            <div className="space-y-3">
              {cronJobs.slice(0, 4).map((job) => (
                <div
                  key={job._id}
                  className="flex items-center justify-between p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.05]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{job.name}</p>
                    <p className="text-xs text-white/40">{job.schedule}</p>
                  </div>
                  <StatusBadge status={job.lastStatus === "success" ? "active" : "error"} />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <div
                    key={activity._id}
                    className="flex items-start gap-3 p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.05]"
                  >
                    <Activity className="w-4 h-4 text-white/40 flex-shrink-0 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {activity.description}
                      </p>
                      <p className="text-xs text-white/40">
                        {new Date(activity.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/40">No recent activity</p>
              )}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
