"use client";



import { Card } from "@/components/ui/card";
import { CardSkeleton } from "@/components/ui/skeleton";
import { TabBar } from "@/components/tab-bar";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Zap, Users, FileText, Scale, Package } from "lucide-react";
import Link from "next/link";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "brand", label: "Brand" },
  { id: "community", label: "Community" },
  { id: "content", label: "Content" },
  { id: "legal", label: "Legal" },
];

export default function EcosystemDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = useQuery(api.queries.getEcosystemProduct, { slug: params.slug });
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "overview";

  if (!product) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  const statusStyles = {
    active: "bg-green-500/10 border-green-500/20 text-green-400",
    development: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    concept: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Back Button & Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        className="flex items-center gap-4 mb-4"
      >
        <Link href="/knowledge?tab=ecosystem">
          <button className="btn-ghost p-2 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {product.name}
          </h1>
          <p className="text-white/60 text-sm mt-1">{product.description}</p>
        </div>
        <div
          className={`px-4 py-2 rounded-[12px] border font-semibold ${
            statusStyles[product.status as keyof typeof statusStyles]
          }`}
        >
          {product.status}
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <TabBar tabs={TABS} defaultTab="overview" />
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        className="space-y-6"
      >
        {tab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>
              {product.metrics && Object.keys(product.metrics).length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.metrics).map(([key, value]) => (
                    <div
                      key={key}
                      className="p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.05]"
                    >
                      <p className="text-xs text-white/60 mb-2 capitalize">{key}</p>
                      <p className="text-xl font-bold text-white">
                        {String(value)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-white/60">No metrics available</p>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Actions</h3>
              <div className="space-y-2">
                <button className="btn-primary w-full">View Repository</button>
                <button className="btn-secondary w-full">Configuration</button>
                <button className="btn-ghost w-full">Documentation</button>
              </div>
            </Card>
          </div>
        )}

        {tab === "brand" && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Brand Guidelines</h3>
            {product.brand &&
            Object.keys(product.brand).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(product.brand).map(([key, value]) => (
                  <div key={key}>
                    <p className="font-medium text-white mb-2 capitalize">{key}</p>
                    <p className="text-white/70">{String(value)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/60">No brand information available</p>
            )}
          </Card>
        )}

        {tab === "community" && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Community</h3>
            {product.community &&
            Object.keys(product.community).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(product.community).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.05]"
                  >
                    <span className="font-medium text-white capitalize">{key}</span>
                    <span className="text-white/70">{String(value)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/60">No community data available</p>
            )}
          </Card>
        )}

        {tab === "content" && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Content</h3>
            {product.content &&
            Object.keys(product.content).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(product.content).map(([key, value]) => (
                  <div
                    key={key}
                    className="p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.05]"
                  >
                    <p className="font-medium text-white mb-1 capitalize">{key}</p>
                    <p className="text-sm text-white/70">{String(value)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/60">No content available</p>
            )}
          </Card>
        )}

        {tab === "legal" && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            {product.legal &&
            Object.keys(product.legal).length > 0 ? (
              <div className="space-y-4 text-sm text-white/70">
                {Object.entries(product.legal).map(([key, value]) => (
                  <div key={key}>
                    <p className="font-medium text-white mb-2 capitalize">{key}</p>
                    <p>{String(value)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/60">No legal information available</p>
            )}
          </Card>
        )}
      </motion.div>
    </div>
  );
}
