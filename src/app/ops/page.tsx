"use client";

import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { TabBar } from "@/components/tab-bar";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertCircle, Calendar, Clock } from "lucide-react";
import { mockSystemStatus, mockCronJobs, mockTasks } from "@/lib/mock-data";

const TABS = [
  { id: "operations", label: "Operations" },
  { id: "tasks", label: "Tasks" },
  { id: "calendar", label: "Calendar" },
];

function OperationsTab() {
  const systemStatus = mockSystemStatus;
  const cronJobs = mockCronJobs;

  return (
    <div className="space-y-6">
      {/* Server Health Table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-white/[0.1]">
          <h3 className="text-lg font-semibold text-white">Server Health</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.1]">
                <th className="px-6 py-3 text-left font-semibold text-white/80">Service</th>
                <th className="px-6 py-3 text-left font-semibold text-white/80">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-white/80">Port</th>
                <th className="px-6 py-3 text-left font-semibold text-white/80">Response Time</th>
                <th className="px-6 py-3 text-left font-semibold text-white/80">Last Check</th>
              </tr>
            </thead>
            <tbody>
              {systemStatus.map((service) => (
                <tr key={service._id} className="border-b border-white/[0.05] hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-medium text-white">{service.name}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={service.status} />
                  </td>
                  <td className="px-6 py-4 text-white/60">{service.port || "—"}</td>
                  <td className="px-6 py-4 text-white/60">
                    {service.responseTime ? `${service.responseTime}ms` : "—"}
                  </td>
                  <td className="px-6 py-4 text-xs text-white/40">
                    {new Date(service.lastCheck).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Cron Jobs Table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-white/[0.1]">
          <h3 className="text-lg font-semibold text-white">Scheduled Jobs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.1]">
                <th className="px-6 py-3 text-left font-semibold text-white/80">Job Name</th>
                <th className="px-6 py-3 text-left font-semibold text-white/80">Schedule</th>
                <th className="px-6 py-3 text-left font-semibold text-white/80">Status</th>
                <th className="px-6 py-3 text-left font-semibold text-white/80">Last Run</th>
                <th className="px-6 py-3 text-left font-semibold text-white/80">Errors</th>
              </tr>
            </thead>
            <tbody>
              {cronJobs.map((job) => (
                <tr key={job._id} className="border-b border-white/[0.05] hover:bg-white/[0.02]">
                  <td className="px-6 py-4 font-medium text-white">{job.name}</td>
                  <td className="px-6 py-4 font-mono text-xs text-white/60">{job.schedule}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={job.lastStatus === "success" ? "active" : "error"} />
                  </td>
                  <td className="px-6 py-4 text-xs text-white/40">
                    {job.lastRun
                      ? new Date(job.lastRun).toLocaleTimeString()
                      : "Never"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-sm font-semibold ${
                        job.consecutiveErrors > 0 ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {job.consecutiveErrors}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function TasksTab() {
  const tasks = mockTasks;

  const categories = ["Revenue", "Product", "Community", "Content", "Operations"];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {categories.map((category) => {
        const categoryTasks = tasks.filter((t) => t.category === category);
        return (
          <div key={category}>
            <h3 className="font-semibold text-white mb-3">{category}</h3>
            <div className="space-y-2">
              {categoryTasks.map((task) => (
                <motion.div
                  key={task._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-white text-sm flex-1">
                        {task.title}
                      </h4>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          task.priority === "urgent"
                            ? "bg-red-500/20 text-red-400"
                            : task.priority === "high"
                              ? "bg-orange-500/20 text-orange-400"
                              : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {task.priority[0].toUpperCase()}
                      </span>
                    </div>
                    {task.description && (
                      <p className="text-xs text-white/60 mb-3">{task.description}</p>
                    )}
                    <div className="flex gap-2">
                      {task.status === "pending" ? (
                        <>
                          <button
                            onClick={() => {}}
                            className="btn-primary text-xs flex-1"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {}}
                            className="btn-secondary text-xs flex-1"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-white/60 px-2 py-1">
                          {task.status}
                        </span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CalendarTab() {
  // Mock calendar data
  const events = [
    { _id: "1", title: "Meeting", color: "#3B82F6", startTime: Date.now() },
    { _id: "2", title: "Deadline", color: "#EF4444", startTime: Date.now() + 86400000 },
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <Card className="p-6 overflow-x-auto">
      <div className="min-w-full">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {days.map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-white/80 text-sm py-2"
            >
              {day.slice(0, 3)}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {events.map((event) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-2 rounded-[8px] text-xs font-medium text-white cursor-pointer hover:scale-105 transition-transform"
              style={{
                backgroundColor: event.color || "rgba(59, 130, 246, 0.2)",
                borderColor: event.color || "rgba(59, 130, 246, 0.4)",
                borderWidth: "1px",
              }}
            >
              <p className="truncate">{event.title}</p>
              <p className="text-white/60 text-xs">
                {new Date(event.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function OpsPageContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "operations";

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Operations</h1>
        <p className="text-white/60 text-sm">Manage system operations and tasks</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <TabBar tabs={TABS} defaultTab="operations" />
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
      >
        {tab === "operations" && <OperationsTab />}
        {tab === "tasks" && <TasksTab />}
        {tab === "calendar" && <CalendarTab />}
      </motion.div>
    </div>
  );
}

export default function OpsPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <OpsPageContent />
    </Suspense>
  );
}
