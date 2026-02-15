"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

interface Tab {
  id: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  defaultTab?: string;
}

export function TabBar({ tabs, defaultTab = tabs[0]?.id }: TabBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || defaultTab;

  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tabId);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            layoutId={`tab-${tab.id}`}
            className={`relative px-4 py-2 rounded-[12px] font-medium text-sm whitespace-nowrap transition-all duration-200 ${
              isActive
                ? "text-primary bg-primary/[0.1] border border-primary/30"
                : "text-white/60 hover:text-white/80 border border-transparent"
            }`}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="active-tab-bg"
                className="absolute inset-0 bg-primary/[0.05] rounded-[12px] -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
