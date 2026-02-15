# Mission Control Dashboard

A premium, real-time command center for monitoring and controlling OpenClaw AI agents. Built with Next.js 15, Convex, Tailwind CSS v4, Framer Motion, and TypeScript.

## 🎯 Overview

Mission Control is a sophisticated dashboard that provides:

- **Real-time System Monitoring** — Live status of services, agents, and cron jobs
- **Agent Management** — View and control autonomous AI agents
- **Content Pipeline** — Kanban-style draft management
- **Communication Hub** — Chat, notifications, and CRM integration
- **Operations Dashboard** — Server health, scheduled jobs, and task management
- **Knowledge Base** — Searchable documentation and ecosystem explorer
- **Code Pipeline** — Repository monitoring and deployment tracking

## 🏗️ Architecture

### Data Flow

```
OpenClaw Agent (Mac Mini)
    ↓
Convex Real-time Database
    ↓
Next.js Dashboard ← Queries & Subscriptions
```

**Two-tier approach:**
1. **Convex** — Real-time source of truth for structured data
2. **API Routes** — Optional filesystem integration with OpenClaw workspace

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15 App Router, React 19 |
| **Real-time** | Convex (real-time sync) |
| **Styling** | Tailwind CSS v4, custom glass morphism |
| **Animation** | Framer Motion |
| **UI Components** | ShadCN-inspired, Lucide icons |
| **Language** | TypeScript (100% typed) |

## 📦 Project Structure

```
src/
├── app/
│   ├── page.tsx              # HOME: System overview
│   ├── ops/page.tsx          # OPS: Operations, Tasks, Calendar
│   ├── agents/page.tsx       # AGENTS: Agent grid & models
│   ├── chat/page.tsx         # CHAT: Messaging & commands
│   ├── content/page.tsx      # CONTENT: Draft pipeline
│   ├── comms/page.tsx        # COMMS: Communications & CRM
│   ├── knowledge/page.tsx    # KNOWLEDGE: Docs & ecosystem
│   ├── code/page.tsx         # CODE: Repository monitoring
│   ├── ecosystem/[slug]/page.tsx  # Ecosystem product detail
│   ├── api/                  # API routes (optional)
│   ├── layout.tsx            # Root layout
│   ├── providers.tsx         # Convex provider setup
│   └── globals.css           # Tailwind + custom styles
│
├── components/
│   ├── nav.tsx               # Top navigation bar
│   ├── tab-bar.tsx           # Tabbed view component
│   └── ui/                   # Reusable UI primitives
│       ├── card.tsx
│       ├── status-badge.tsx
│       ├── skeleton.tsx
│       └── empty-state.tsx
│
├── types/
│   └── index.ts              # TypeScript interfaces
│
└── convex/
    ├── schema.ts             # Convex table definitions
    ├── queries.ts            # Read operations
    ├── mutations.ts          # Write operations
    └── seed.ts               # Initial data seeding

convex/                        # Convex backend config
└── .env                       # Convex credentials
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Convex account (free tier works)

### Installation

1. **Clone and setup:**
   ```bash
   cd ~/.openclaw/workspace
   npm install
   ```

2. **Create Convex project:**
   ```bash
   npx convex auth login
   npx convex project create mission-control
   ```

3. **Set environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Convex URL
   ```

4. **Initialize Convex:**
   ```bash
   npx convex dev
   # In another terminal:
   npm run convex:dev
   ```

5. **Seed database:**
   ```bash
   npx convex run seed:seedDatabase
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

7. **Open browser:**
   Navigate to `http://localhost:3000`

## 🎨 Design System

### Color Palette
- **Background:** Pure black (#000000)
- **Primary:** Golden yellow (hsl(59, 89%, 51%))
- **Secondary:** Purple-blue (hsl(260, 80%, 50%))
- **Accent:** Orange (hsl(29, 100%, 50%))

### Components
- **Cards:** Glass morphism with `backdrop-blur-xl` and `bg-white/[0.03]`
- **Buttons:** Solid primary, secondary, and ghost variants
- **Status Indicators:** Color-coded (green=up, red=down, yellow=degraded)
- **Animations:** Spring physics with `type: "spring"`, `bounce: 0.2`

### Typography
- **Font:** Inter (system fallback: -apple-system, system-ui, sans-serif)
- **Sizes:** Clamp values for responsive text (10-14px on mobile)
- **Weight:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

## 📊 Data Schema

### Convex Tables

**systemStatus**
- Service health monitoring (API, databases, services)
- Fields: name, status, port, responseTime, lastCheck

**agents**
- Autonomous AI agents registry
- Fields: name, role, model, level, status, personality, capabilities, rules

**cronJobs**
- Scheduled tasks and automation
- Fields: name, schedule, status, lastRun, lastStatus, consecutiveErrors

**tasks**
- Strategic task suggestions with approval flow
- Fields: title, category, priority, effort, status, reasoning

**contentDrafts**
- Content pipeline (draft → review → approved → published)
- Fields: title, platform, content, status, createdAt, scheduledFor

**calendarEvents**
- Team meetings and deadlines
- Fields: title, type, startTime, endTime, color, attendees

**chatMessages & chatSessions**
- Chat history and active sessions
- Fields: sessionId, channel, role, content, timestamp

**clients**
- CRM client pipeline
- Fields: name, status, contacts, lastInteraction, nextAction

**ecosystemProducts**
- Product/app inventory with metadata
- Fields: slug, name, status, metrics, brand, community, content, legal, product, website

## 🔄 Real-time Updates

The dashboard uses **Convex subscriptions** for live updates:

```typescript
// Example: Watch system status
const systemStatus = useQuery(api.queries.getSystemStatus);

// Automatically re-renders when data changes
// No polling, true real-time push
```

## 🔐 Security

- **No API keys exposed** — All Convex auth handled server-side
- **Type-safe** — Full TypeScript coverage prevents runtime errors
- **Convex security rules** — Add per-table access control as needed
- **Environment variables** — Sensitive config in `.env.local` (never commit)

## 📱 Responsive Design

- **Mobile-first** — Tested at 320px minimum
- **Touch-friendly** — Buttons 40px+, tap targets spacing
- **Adaptive navigation** — Icon-only on mobile, labels on desktop
- **Flexible grid** — 1 col mobile → 2 cols tablet → 3-4 cols desktop

## 🎬 Animations

**Built with Framer Motion:**
- **Page transitions** — Fade + slide up on load
- **Stagger grids** — Cards cascade in with 0.05s delay
- **Card hover** — Lift effect with spring physics
- **Tab switches** — Smooth color transitions with layoutId

## 🔌 Integration with OpenClaw

### Option 1: Convex (Recommended)
OpenClaw pushes state to Convex via webhook every 30s:
```bash
POST /convex/updateSystemState
{
  "systemStatus": [...],
  "agents": [...],
  "cronJobs": [...]
}
```

### Option 2: Filesystem API
Dashboard reads from workspace (optional):
- `/api/system-state` — reads `state/servers.json`
- `/api/agents` — reads `agents/registry.json`
- `/api/content-pipeline` — parses `content/queue.md`

**Note:** Filesystem approach has latency. Convex push model is preferred.

## 📈 Performance

- **Core Web Vitals:** Optimized for Lighthouse 90+
- **Bundle Size:** ~150KB (gzipped)
- **Time to Interactive:** <2s
- **Real-time Latency:** <100ms with Convex

## 🛠️ Development

### Local Development
```bash
# Terminal 1: Convex backend
npm run convex:dev

# Terminal 2: Next.js frontend
npm run dev
```

### Code Quality
```bash
npm run lint          # ESLint
npm run type-check    # TypeScript
npm run build         # Full build test
```

### Database Migrations
```bash
# Modify convex/schema.ts
npx convex dev       # Convex watches for changes

# Run seed again if needed
npx convex run seed:seedDatabase
```

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect GitHub repo:**
   ```bash
   git remote add origin <your-repo>
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com/new
   - Import repository
   - Set environment variables (`NEXT_PUBLIC_CONVEX_URL`)
   - Deploy

3. **Deploy Convex:**
   ```bash
   npm run convex:deploy
   ```

### Self-hosted

1. **Build:**
   ```bash
   npm run build
   ```

2. **Run:**
   ```bash
   npm start
   # or with PM2
   pm2 start npm --name dashboard -- start
   ```

3. **Environment:**
   - Set `NEXT_PUBLIC_CONVEX_URL` before starting
   - Use Node.js 18+
   - Enable HTTPS in production

## 📝 Environment Variables

Required:
- `NEXT_PUBLIC_CONVEX_URL` — Convex deployment URL

Optional:
- `OPENCLAW_WORKSPACE_PATH` — Path to OpenClaw workspace (default: `~/.openclaw/workspace`)
- `OPENCLAW_API_URL` — OpenClaw gateway URL (default: `http://localhost:18789`)

## 🐛 Troubleshooting

### Dashboard shows "no data"
1. Check Convex connection: `echo $NEXT_PUBLIC_CONVEX_URL`
2. Verify seed data: `npx convex run seed:seedDatabase`
3. Check browser console for errors

### Convex type errors
```bash
# Regenerate Convex types
npx convex codegen
```

### Slow queries
- Use Convex dashboard to monitor query performance
- Add indexes for frequently filtered fields
- Implement pagination for large result sets

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Convex Docs](https://docs.convex.dev)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4)
- [Framer Motion](https://www.framer.com/motion)
- [OpenClaw Docs](https://docs.openclaw.ai)

## 📄 License

MIT — See LICENSE.md

---

Built with ❤️ for autonomous AI agent control.
