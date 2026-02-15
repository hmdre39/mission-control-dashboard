# Development Guide

Instructions for developing and extending Mission Control Dashboard.

## Getting Started

### 1. Local Development Setup

```bash
cd ~/.openclaw/workspace

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_CONVEX_URL=http://localhost:19000
```

### 2. Start Development Servers

**Terminal 1: Convex Backend**
```bash
npm run convex:dev
```

This starts Convex local development server on port 19000.

**Terminal 2: Next.js Frontend**
```bash
npm run dev
```

This starts Next.js on `http://localhost:3000`.

Open your browser to `http://localhost:3000` and start developing.

## Project Structure

### Frontend (Next.js)

```
src/
├── app/                      # Pages and route segments
│   ├── (pages)
│   │   ├── page.tsx         # / (HOME)
│   │   ├── ops/page.tsx     # /ops (OPERATIONS)
│   │   ├── agents/page.tsx  # /agents (AGENTS)
│   │   ├── chat/page.tsx    # /chat (CHAT)
│   │   ├── content/page.tsx # /content (CONTENT)
│   │   ├── comms/page.tsx   # /comms (COMMS)
│   │   ├── knowledge/page.tsx # /knowledge (KNOWLEDGE)
│   │   ├── code/page.tsx    # /code (CODE)
│   │   └── ecosystem/[slug]/page.tsx  # /ecosystem/:slug
│   ├── api/                 # API routes (optional)
│   ├── layout.tsx           # Root layout
│   ├── providers.tsx        # Context providers (Convex)
│   └── globals.css          # Global styles
│
├── components/              # React components
│   ├── nav.tsx             # Navigation bar
│   ├── tab-bar.tsx         # Tab switcher component
│   └── ui/                 # Reusable UI components
│       ├── card.tsx
│       ├── status-badge.tsx
│       ├── skeleton.tsx
│       ├── empty-state.tsx
│       └── ...
│
├── types/                  # TypeScript type definitions
│   └── index.ts
│
└── convex/                 # Convex backend config
    ├── schema.ts           # Table definitions
    ├── queries.ts          # Read operations
    ├── mutations.ts        # Write operations
    ├── seed.ts            # Database seeding
    └── _generated/        # Auto-generated types (ignore)
```

### Convex Backend

Tables are defined in `convex/schema.ts`. Each table maps to a real-time database table.

## Adding a New Page

### 1. Create Page Component

Create `src/app/newpage/page.tsx`:

```typescript
"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function NewPage() {
  // Query data from Convex
  const data = useQuery(api.queries.getExampleData);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        className="space-y-2"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Page Title
        </h1>
        <p className="text-white/60 text-sm">Description</p>
      </motion.div>

      {/* Content */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Card Title
        </h2>
        {/* Your content */}
      </Card>
    </div>
  );
}
```

### 2. Add Navigation Item

Edit `src/components/nav.tsx`:

```typescript
const NAV_ITEMS = [
  // ... existing items
  {
    href: "/newpage",
    label: "New Page",
    icon: IconName,
    id: "newpage",
  },
];
```

Import the icon from Lucide:
```typescript
import { IconName } from "lucide-react";
```

## Adding a New Data Table

### 1. Define Schema

Edit `convex/schema.ts`:

```typescript
export default defineSchema({
  // ... existing tables
  
  newTable: defineTable({
    name: v.string(),
    value: v.number(),
    status: v.union(v.literal("active"), v.literal("inactive")),
  })
    .index("by_name", ["name"])
    .index("by_status", ["status"]),
});
```

### 2. Add Query

Edit `convex/queries.ts`:

```typescript
export const getNewTableData = query(async (ctx) => {
  return await ctx.db.query("newTable").collect();
});
```

### 3. Add Mutation (if needed)

Edit `convex/mutations.ts`:

```typescript
export const createNewTableEntry = mutation({
  args: {
    name: v.string(),
    value: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("newTable", {
      name: args.name,
      value: args.value,
      status: "active",
    });
  },
});
```

### 4. Regenerate Types

```bash
npx convex codegen
```

This creates types in `convex/_generated/api.ts`.

### 5. Use in Component

```typescript
const data = useQuery(api.queries.getNewTableData);
const createEntry = useMutation(api.mutations.createNewTableEntry);
```

## Component Patterns

### Loading State

```typescript
const data = useQuery(api.queries.getData);

if (!data) {
  return <CardSkeleton />;
}

// Render with data
```

### Animations

```typescript
import { motion } from "framer-motion";

// Page load
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
>
  Content
</motion.div>

// Stagger grid
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
```

### Hover Effects

```typescript
<Card hoverable className="p-6">
  Content (automatically gets hover animation)
</Card>
```

## Styling

### Glass Card

```html
<div class="glass-card">
  <!-- rounded-[16px] border border-white/[0.06] bg-white/[0.03] backdrop-blur-xl -->
</div>
```

### Buttons

```html
<button class="btn-primary">Primary</button>
<button class="btn-secondary">Secondary</button>
<button class="btn-ghost">Ghost</button>
```

### Status Badge

```typescript
<StatusBadge status="up" />
<StatusBadge status="down" />
<StatusBadge status="active" />
```

### Custom Utilities

All utilities are in `src/app/globals.css`:
- `.glass-card` — Glass morphism container
- `.btn-*` — Button variants
- `.status-*` — Status indicators
- `.auto-refresh` — Live update badge
- `.skeleton` — Loading animation

## Testing

### Type Checking

```bash
npx tsc --noEmit
```

### Linting

```bash
npm run lint
```

### Build Test

```bash
npm run build
```

## Performance Tips

### 1. Memoization

```typescript
import { useMemo } from "react";

const memoizedData = useMemo(() => {
  return expensiveComputation(data);
}, [data]);
```

### 2. Lazy Loading

```typescript
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  loading: () => <CardSkeleton />,
});
```

### 3. Image Optimization

```typescript
import Image from "next/image";

<Image
  src="/image.png"
  alt="Description"
  width={400}
  height={300}
  priority
/>
```

### 4. Query Optimization

Use indexes in Convex schema:
```typescript
.index("by_status", ["status"])
```

Filter client-side only when necessary:
```typescript
// Good: Filter in query
const tasks = useQuery(api.queries.getTasks, { status: "pending" });

// Avoid: Filter everything then slice
const allTasks = useQuery(api.queries.getAllTasks);
const pending = allTasks?.filter(t => t.status === "pending");
```

## Common Tasks

### Add a new status variant

Edit `src/components/ui/status-badge.tsx`:

```typescript
const STATUS_STYLES = {
  // ... existing
  myStatus: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
};
```

### Create a reusable form

```typescript
"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function MyForm() {
  const [input, setInput] = useState("");
  const submitMutation = useMutation(api.mutations.submitData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await submitMutation({ data: input });
      setInput("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={isLoading}
        className="w-full bg-white/[0.05] border border-white/[0.1] rounded-[10px] px-4 py-2"
      />
      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```

### Add dark mode toggle (future)

Note: Dashboard is dark-only. To add theme toggle in future:

```typescript
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle Theme
    </button>
  );
}
```

## Debugging

### Browser DevTools

- **React DevTools** — Inspect component hierarchy
- **Network tab** — Monitor Convex requests
- **Console** — Check for errors and logs

### Convex Debugging

```bash
# Watch Convex logs
npx convex logs

# Query database directly
npx convex run queries:getSystemStatus

# Run mutation for testing
npx convex run mutations:addActivity \
  --args '{"type":"test","description":"Test activity"}'
```

### Next.js Debugging

Add debug logging:
```typescript
console.log("🔍 Debug:", { data, error });
```

Use React DevTools Profiler:
1. Open DevTools → "Profiler" tab
2. Record interactions
3. Identify slow renders

## Environment Variables

### Development (.env.local)

```
NEXT_PUBLIC_CONVEX_URL=http://localhost:19000
```

### Production (.env.production)

```
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
```

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/my-feature

# After review and merge
git checkout main
git pull origin main
```

## Resources

- [Next.js App Router](https://nextjs.org/docs/app)
- [Convex Docs](https://docs.convex.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)

---

Happy coding! 🚀
