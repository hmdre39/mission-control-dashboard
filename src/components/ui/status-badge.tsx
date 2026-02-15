"use client";

interface StatusBadgeProps {
  status: "up" | "down" | "degraded" | "active" | "idle" | "error";
  label?: string;
}

const STATUS_STYLES = {
  up: "bg-green-900 border-green-700 text-green-300",
  down: "bg-red-900 border-red-700 text-red-300",
  degraded: "bg-yellow-900 border-yellow-700 text-yellow-300",
  active: "bg-green-900 border-green-700 text-green-300",
  idle: "bg-gray-700 border-gray-600 text-gray-300",
  error: "bg-red-900 border-red-700 text-red-300",
};

const STATUS_LABELS = {
  up: "Up",
  down: "Down",
  degraded: "Degraded",
  active: "Active",
  idle: "Idle",
  error: "Error",
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];
  const displayLabel = label || STATUS_LABELS[status];

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${style}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {displayLabel}
    </span>
  );
}
