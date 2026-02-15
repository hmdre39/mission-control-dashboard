"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Settings,
  Users,
  MessageSquare,
  FileText,
  Radio,
  Brain,
  Code2,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home, id: "home" },
  { href: "/ops", label: "Ops", icon: Settings, id: "ops" },
  { href: "/agents", label: "Agents", icon: Users, id: "agents" },
  { href: "/chat", label: "Chat", icon: MessageSquare, id: "chat" },
  { href: "/content", label: "Content", icon: FileText, id: "content" },
  { href: "/comms", label: "Comms", icon: Radio, id: "comms" },
  { href: "/knowledge", label: "Knowledge", icon: Brain, id: "knowledge" },
  { href: "/code", label: "Code", icon: Code2, id: "code" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b bg-black/80 backdrop-blur-xl" style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-[8px] bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">MC</span>
            </div>
            <span className="hidden md:inline text-sm font-semibold text-white/80 truncate">
              Mission Control
            </span>
          </div>

          {/* Nav Items */}
          <div className="flex items-center gap-1 flex-1 justify-center ml-4 sm:ml-8">
            {NAV_ITEMS.map((item) => {
              const isActive =
                (pathname === "/" && item.href === "/") ||
                (pathname !== "/" && pathname.startsWith(item.href) && item.href !== "/");

              const Icon = item.icon;

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-[12px] text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-primary/[0.06]"
                      : "text-white/60 hover:text-white/80 hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 ml-4">
            <div className="auto-refresh">
              15S
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
