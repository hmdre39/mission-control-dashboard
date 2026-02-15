"use client";



import { Card } from "@/components/ui/card";
import { CardSkeleton } from "@/components/ui/skeleton";
import { TabBar } from "@/components/tab-bar";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, FileText, Package, Zap, BarChart } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface EcosystemProduct {
  _id: string;
  slug: string;
  name: string;
  description: string;
  status: "active" | "development" | "concept";
  metrics?: Record<string, any>;
}

const TABS = [
  { id: "knowledge", label: "Knowledge" },
  { id: "ecosystem", label: "Ecosystem" },
];

function KnowledgeTab() {
  const [searchQuery, setSearchQuery] = useState("");

  const knowledgeBase = [
    {
      title: "Agent Architecture",
      category: "Technical",
      excerpt: "Overview of how agents are structured and communicate...",
    },
    {
      title: "Deployment Guide",
      category: "Operations",
      excerpt: "Step-by-step instructions for deploying to production...",
    },
    {
      title: "API Reference",
      category: "Technical",
      excerpt: "Complete API documentation and endpoint reference...",
    },
    {
      title: "Troubleshooting",
      category: "Support",
      excerpt: "Common issues and how to resolve them...",
    },
    {
      title: "Security Best Practices",
      category: "Security",
      excerpt: "Guidelines for securing your deployment...",
    },
    {
      title: "Performance Tuning",
      category: "Operations",
      excerpt: "Optimize your system for maximum performance...",
    },
  ];

  const filteredResults = knowledgeBase.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          placeholder="Search knowledge base..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/[0.05] border border-white/[0.1] rounded-[12px] pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-primary/40"
        />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card hoverable className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <FileText className="w-5 h-5 text-primary/60 flex-shrink-0 mt-1" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-xs bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5 w-fit text-primary">
                      {item.category}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-4">{item.excerpt}</p>
                <button className="btn-secondary text-xs">Read More</button>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-white/40">
            No results found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
}

function EcosystemTab() {
  const products: EcosystemProduct[] = [];

  if (!products) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  const statusStyles = {
    active: "bg-green-500/10 border-green-500/20 text-green-400",
    development: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    concept: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  };

  const statusIcons = {
    active: <Zap className="w-4 h-4" />,
    development: <BarChart className="w-4 h-4" />,
    concept: <Package className="w-4 h-4" />,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link href={`/ecosystem/${product.slug}`}>
            <Card hoverable className="p-6 h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{product.name}</h3>
                  <p className="text-xs text-white/60">{product.description}</p>
                </div>
                <div
                  className={`p-2 rounded-[8px] border ${
                    statusStyles[product.status as keyof typeof statusStyles]
                  }`}
                >
                  {statusIcons[product.status as keyof typeof statusIcons]}
                </div>
              </div>

              {product.metrics && (
                <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-white/[0.1]">
                  {Object.entries(product.metrics).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-xs text-white/60 mb-1 capitalize">
                        {key}
                      </p>
                      <p className="text-sm font-semibold text-white">
                        {String(value)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2 mt-auto pt-4 border-t border-white/[0.1]">
                <button className="btn-secondary text-xs flex-1">View</button>
                <button className="btn-ghost text-xs flex-1">Config</button>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default function KnowledgePage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "knowledge";

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Knowledge Base</h1>
        <p className="text-white/60 text-sm">Search docs and explore the ecosystem</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <TabBar tabs={TABS} defaultTab="knowledge" />
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
      >
        {tab === "knowledge" && <KnowledgeTab />}
        {tab === "ecosystem" && <EcosystemTab />}
      </motion.div>
    </div>
  );
}
