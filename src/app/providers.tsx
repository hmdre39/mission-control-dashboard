"use client";

import { ReactNode } from "react";

// In development with mock data, this is a no-op
// In production, replace with real Convex provider
export function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
