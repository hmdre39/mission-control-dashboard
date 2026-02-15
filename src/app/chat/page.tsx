"use client";



import { Card } from "@/components/ui/card";
import { CardSkeleton } from "@/components/ui/skeleton";
import { TabBar } from "@/components/tab-bar";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Send, Mic, MessageCircle } from "lucide-react";

const TABS = [
  { id: "chat", label: "Chat" },
  { id: "command", label: "Command" },
];

function ChatTab() {
  const mockSessions = [{ _id: "1", sessionKey: "session-001", channel: "telegram", lastMessage: "See you!", lastMessageTime: Date.now(), messageCount: 42 }];
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const messages = useQuery(
    api.queries.getChatMessages,
    selectedSession ? { sessionId: selectedSession, limit: 50 } : "skip"
  );
  const addMessage = useMutation(api.mutations.addChatMessage);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!sessions) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[600px]">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !selectedSession) return;

    setIsLoading(true);
    try {
      const session = sessions.find((s) => s.sessionKey === selectedSession);
      await addMessage({
        sessionId: selectedSession,
        channel: session?.channel || "webchat",
        role: "user",
        content: input,
      });
      setInput("");
    } finally {
      setIsLoading(false);
    }
  };

  const currentSession = sessions.find((s) => s.sessionKey === selectedSession);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[600px]">
      {/* Sessions Sidebar */}
      <Card className="p-4 overflow-y-auto">
        <h3 className="font-semibold text-white mb-3 text-sm">Sessions</h3>
        <div className="space-y-2">
          {sessions.map((session) => (
            <button
              key={session._id}
              onClick={() => setSelectedSession(session.sessionKey)}
              className={`w-full text-left p-3 rounded-[10px] transition-colors text-sm ${
                selectedSession === session.sessionKey
                  ? "bg-primary/20 border border-primary/40 text-white"
                  : "text-white/60 hover:bg-white/[0.05] border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">
                  {session.channel === "telegram" ? "📱" : "💬"}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-white/80">{session.sessionKey}</p>
                  <p className="text-xs text-white/40 truncate">
                    {session.messageCount} messages
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Chat Area */}
      <div className="lg:col-span-3 glass-card flex flex-col">
        {selectedSession && currentSession ? (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages && messages.length > 0 ? (
                messages.map((msg) => (
                  <motion.div
                    key={msg._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-[14px] ${
                        msg.role === "user"
                          ? "bg-primary/20 border border-primary/40 text-white"
                          : "bg-white/[0.05] border border-white/[0.1] text-white/90"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs text-white/40 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-white/40">
                  <p>No messages yet</p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/[0.1] p-4">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-[10px] px-4 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-primary/40 disabled:opacity-50"
                />
                <button
                  type="button"
                  className="btn-ghost p-2 flex items-center justify-center"
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="btn-primary p-2 flex items-center justify-center disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-white/40">
            <MessageCircle className="w-8 h-8 mr-3" />
            <p>Select a session to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CommandTab() {
  const commands = [
    { name: "Deploy", description: "Deploy latest build", icon: "🚀" },
    { name: "Backup", description: "Backup system state", icon: "💾" },
    { name: "Health Check", description: "Run system diagnostics", icon: "🏥" },
    { name: "Clear Cache", description: "Clear all caches", icon: "🗑️" },
    { name: "Restart Agents", description: "Restart all agents", icon: "🔄" },
    { name: "Report", description: "Generate system report", icon: "📊" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {commands.map((cmd, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <Card hoverable className="p-6 text-center cursor-pointer">
            <div className="text-3xl mb-3">{cmd.icon}</div>
            <h3 className="font-semibold text-white mb-1">{cmd.name}</h3>
            <p className="text-xs text-white/60 mb-4">{cmd.description}</p>
            <button className="btn-primary w-full text-xs">Execute</button>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export default function ChatPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "chat";

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Chat & Commands</h1>
        <p className="text-white/60 text-sm">Communicate with agents and execute commands</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <TabBar tabs={TABS} defaultTab="chat" />
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
      >
        {tab === "chat" && <ChatTab />}
        {tab === "command" && <CommandTab />}
      </motion.div>
    </div>
  );
}
