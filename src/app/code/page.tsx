"use client";



import { Card } from "@/components/ui/card";
import { CardSkeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { GitBranch, GitCommit, AlertCircle, Check } from "lucide-react";

export default function CodePage() {
  const activities = [];

  const repositories = [
    {
      name: "mission-control-dashboard",
      branch: "main",
      lastCommit: "Refactor card components",
      commits: 342,
      language: "TypeScript",
      status: "clean",
    },
    {
      name: "openclaw-agents",
      branch: "develop",
      lastCommit: "Add memory persistence",
      commits: 1203,
      language: "Python",
      status: "clean",
    },
    {
      name: "convex-schema",
      branch: "main",
      lastCommit: "Update schema definitions",
      commits: 89,
      language: "TypeScript",
      status: "clean",
    },
    {
      name: "cli-tools",
      branch: "feature/websocket",
      lastCommit: "WIP: websocket implementation",
      commits: 456,
      language: "Go",
      status: "dirty",
    },
  ];

  const languageColors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    Python: "bg-yellow-500",
    Go: "bg-cyan-500",
    JavaScript: "bg-yellow-400",
  };

  if (!activities) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <CardSkeleton />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

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
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Code Pipeline</h1>
        <p className="text-white/60 text-sm">Monitor repositories and commits</p>
      </motion.div>

      {/* Repository Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {repositories.map((repo) => (
          <motion.div key={repo.name} variants={itemVariants}>
            <Card hoverable className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{repo.name}</h3>
                  <div className="flex items-center gap-2 text-xs">
                    <GitBranch className="w-3 h-3 text-white/40" />
                    <span className="text-white/60">{repo.branch}</span>
                  </div>
                </div>
                {repo.status === "clean" ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                )}
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-white/60 mb-1">Last Commit</p>
                  <p className="text-sm text-white">{repo.lastCommit}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/[0.1]">
                  <div>
                    <p className="text-xs text-white/60">Commits</p>
                    <p className="text-sm font-semibold text-white">{repo.commits}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Language</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          languageColors[repo.language]
                        }`}
                      />
                      <span className="text-sm text-white">{repo.language}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-white/60">Status</p>
                    <p
                      className={`text-sm font-semibold ${
                        repo.status === "clean" ? "text-green-400" : "text-yellow-400"
                      }`}
                    >
                      {repo.status}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn-secondary text-xs flex-1">View</button>
                <button className="btn-ghost text-xs flex-1">Commits</button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {activities.map((activity) => (
            <motion.div
              key={activity._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.05]"
            >
              <GitCommit className="w-4 h-4 text-white/40 flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {activity.description}
                </p>
                <p className="text-xs text-white/40">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
              {activity.metadata?.status === "success" ? (
                <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              )}
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}
