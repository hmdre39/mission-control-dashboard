"use client";

import { Card } from "@/components/ui/card";
import { TabBar } from "@/components/tab-bar";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { mockClients } from "@/lib/mock-data";

const TABS = [
  { id: "comms", label: "Comms" },
  { id: "crm", label: "CRM" },
];

function CommsTab() {
  const recentMessages = [
    { _id: "1", sessionKey: "session-001", channel: "telegram", lastMessage: "See you tomorrow!", lastMessageTime: Date.now() - 3600000, messageCount: 42 },
    { _id: "2", sessionKey: "session-002", channel: "discord", lastMessage: "Thanks for the update", lastMessageTime: Date.now() - 7200000, messageCount: 18 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Messages */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Messages</h3>
        <div className="space-y-3">
          {recentMessages.map((session) => (
            <motion.div
              key={session._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="text-sm">
                    {session.channel === "telegram" ? "📱" : "💬"}
                  </div>
                  <h4 className="font-medium text-white">{session.sessionKey}</h4>
                </div>
                <span className="text-xs text-white/40">
                  {session.lastMessageTime
                    ? new Date(session.lastMessageTime).toLocaleTimeString()
                    : "N/A"}
                </span>
              </div>
              <p className="text-xs text-white/60 line-clamp-2">
                {session.lastMessage || "No messages"}
              </p>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Notification History */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Notification History</h3>
        <div className="space-y-3">
          {[
            { type: "email", title: "Weekly digest sent", time: "2 hours ago", icon: "📧" },
            { type: "alert", title: "Agent error recovered", time: "4 hours ago", icon: "🔔" },
            { type: "meeting", title: "Client standup scheduled", time: "1 day ago", icon: "📅" },
            { type: "task", title: "Task approved", time: "1 day ago", icon: "✅" },
            { type: "deployment", title: "v2.1.0 deployed", time: "2 days ago", icon: "🚀" },
          ].map((notification, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.05]"
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">{notification.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{notification.title}</p>
                  <p className="text-xs text-white/40">{notification.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ClientCard({
  client,
  status,
}: {
  client: any;
  status: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="p-4">
        <div className="mb-3">
          <h4 className="font-semibold text-white mb-1">{client.name}</h4>
          <p className="text-xs text-white/50">{client.contacts.length} contacts</p>
        </div>
        <div className="space-y-2 mb-3">
          {client.contacts.slice(0, 2).map((contact: any, i: number) => (
            <div key={i} className="text-xs text-white/60">
              <p className="font-medium text-white">{contact.name}</p>
              {contact.role && <p className="text-white/40">{contact.role}</p>}
            </div>
          ))}
        </div>
        {client.nextAction && (
          <p className="text-xs bg-primary/10 border border-primary/20 rounded-full px-2 py-1 text-primary mb-3">
            {client.nextAction}
          </p>
        )}
        <div className="flex gap-1 pt-3 border-t border-white/[0.1]">
          <button className="btn-secondary text-xs flex-1">Call</button>
          <button className="btn-ghost text-xs flex-1">Email</button>
        </div>
      </Card>
    </motion.div>
  );
}

function CRMTab() {
  const clients = mockClients;

  const statuses = ["prospect", "contacted", "meeting", "proposal", "active"] as const;
  const statusLabels: Record<string, string> = {
    prospect: "Prospects",
    contacted: "Contacted",
    meeting: "Meetings",
    proposal: "Proposals",
    active: "Active Clients",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {statuses.map((status) => {
        const statusClients = clients.filter((c) => c.status === status);
        return (
          <div key={status} className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <h3 className="font-semibold text-white text-sm">{statusLabels[status]}</h3>
              <span className="text-xs bg-white/[0.1] rounded-full px-2 py-1 text-white/60">
                {statusClients.length}
              </span>
            </div>
            <div className="space-y-2">
              {statusClients.map((client) => (
                <ClientCard key={client._id} client={client} status={status} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CommsPageContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "comms";

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Communications</h1>
        <p className="text-white/60 text-sm">Manage client relationships and communications</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <TabBar tabs={TABS} defaultTab="comms" />
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
      >
        {tab === "comms" && <CommsTab />}
        {tab === "crm" && <CRMTab />}
      </motion.div>
    </div>
  );
}

export default function CommsPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <CommsPageContent />
    </Suspense>
  );
}
