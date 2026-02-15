"use client";



import { Card } from "@/components/ui/card";
import { CardSkeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { FileText, Plus, Trash2 } from "lucide-react";

function ContentColumn({
  title,
  status,
  drafts,
}: {
  title: string;
  status: string;
  drafts: any[];
}) {
  return (
    <div className="flex flex-col gap-3 flex-1 min-w-0">
      <div className="flex items-center justify-between px-2">
        <h3 className="font-semibold text-white text-sm">{title}</h3>
        <span className="text-xs bg-white/[0.1] border border-white/[0.2] rounded-full px-2 py-1 text-white/60">
          {drafts.length}
        </span>
      </div>
      <div className="space-y-2 flex-1">
        {drafts.map((draft) => (
          <motion.div
            key={draft._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-3 cursor-grab active:cursor-grabbing">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-semibold text-white flex-1 line-clamp-2">
                    {draft.title}
                  </h4>
                  <button className="btn-ghost p-1 text-white/60 hover:text-red-400">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <p className="text-xs text-white/50 line-clamp-2">{draft.content}</p>
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.1]">
                  <span className="text-xs bg-primary/20 border border-primary/40 rounded-full px-2 py-0.5 text-primary">
                    {draft.platform}
                  </span>
                  <span className="text-xs text-white/40">
                    {new Date(draft.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ContentPage() {
  const drafts = [];

  if (!drafts) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <CardSkeleton />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const statusGroups = {
    draft: drafts.filter((d) => d.status === "draft"),
    review: drafts.filter((d) => d.status === "review"),
    approved: drafts.filter((d) => d.status === "approved"),
    published: drafts.filter((d) => d.status === "published"),
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Content Pipeline</h1>
          <p className="text-white/60 text-sm">Manage content drafts across platforms</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Draft</span>
        </button>
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-max"
      >
        <ContentColumn
          title="Draft"
          status="draft"
          drafts={statusGroups.draft}
        />
        <ContentColumn
          title="Review"
          status="review"
          drafts={statusGroups.review}
        />
        <ContentColumn
          title="Approved"
          status="approved"
          drafts={statusGroups.approved}
        />
        <ContentColumn
          title="Published"
          status="published"
          drafts={statusGroups.published}
        />
      </motion.div>
    </div>
  );
}
