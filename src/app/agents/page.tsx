"use client";

import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { TabBar } from "@/components/tab-bar";
import { CardSkeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Bot, Zap, BookOpen } from "lucide-react";
import { mockAgents } from "@/lib/mock-data";

const TABS = [
  { id: "agents", label: "Agents" },
  { id: "models", label: "Models" },
];

function AgentsTab() {
  const agents = mockAgents;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {agents.map((agent) => (
        <motion.div key={agent._id} variants={itemVariants}>
          <Card hoverable className="p-6 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[8px] bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-white truncate">{agent.name}</h3>
                  <p className="text-xs text-white/40">{agent.role}</p>
                </div>
              </div>
              <StatusBadge status={agent.healthy ? "active" : "error"} />
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Model</span>
                <span className="text-xs font-mono text-primary">{agent.model.split("/")[1]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/60">Level</span>
                <span className="text-xs font-semibold text-white">{agent.level}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {agent.capabilities.slice(0, 2).map((cap, i) => (
                  <span key={i} className="text-xs bg-white/[0.05] border border-white/[0.1] rounded-full px-2 py-1">
                    {cap}
                  </span>
                ))}
                {agent.capabilities.length > 2 && (
                  <span className="text-xs text-white/40">+{agent.capabilities.length - 2}</span>
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-white/[0.1]">
              <button className="btn-secondary flex-1 text-xs">View</button>
              <button className="btn-ghost flex-1 text-xs">Config</button>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

function ModelsTab() {
  const models = [
    { name: "Claude Opus 4.1", usage: "45%", cost: "$0.015/1K", failover: "GPT-4o" },
    { name: "Claude Haiku 4.5", usage: "35%", cost: "$0.001/1K", failover: "GPT-4o mini" },
    { name: "GPT-4o", usage: "15%", cost: "$0.003/1K", failover: "Claude Opus" },
    { name: "GPT-4o mini", usage: "5%", cost: "$0.00015/1K", failover: "Claude Haiku" },
  ];

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.1]">
              <th className="px-4 py-3 text-left font-semibold text-white/80">Model</th>
              <th className="px-4 py-3 text-left font-semibold text-white/80">Usage</th>
              <th className="px-4 py-3 text-left font-semibold text-white/80">Cost</th>
              <th className="px-4 py-3 text-left font-semibold text-white/80">Failover</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, i) => (
              <tr key={i} className="border-b border-white/[0.05] hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-medium text-white">{model.name}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/[0.1] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: model.usage }}
                      />
                    </div>
                    <span className="text-xs text-white/60 w-8 text-right">{model.usage}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-white/60">{model.cost}</td>
                <td className="px-4 py-3 text-xs text-white/60">{model.failover}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default function AgentsPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "agents";

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Agents</h1>
        <p className="text-white/60 text-sm">Manage your AI agents and models</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: "spring", bounce: 0.2, duration: 0.5 }}
      >
        <TabBar tabs={TABS} defaultTab="agents" />
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
      >
        {tab === "agents" && <AgentsTab />}
        {tab === "models" && <ModelsTab />}
      </motion.div>
    </div>
  );
}
