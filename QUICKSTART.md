# Quick Start — 5 Minutes to Running Dashboard

## 1. Install Dependencies (1 min)

```bash
cd ~/.openclaw/workspace
npm install
```

## 2. Set Up Convex (2 min)

```bash
# Authenticate
npx convex auth login

# Create project
npx convex project create mission-control
```

Convex outputs:
```
Deployment URL: https://mission-control-xyz.convex.cloud
```

## 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_CONVEX_URL=https://mission-control-xyz.convex.cloud
```

(Or during development, use local Convex: `http://localhost:19000`)

## 4. Start Development Servers

**Terminal 1:**
```bash
npm run convex:dev
```

Wait for: `✅ API server running at http://localhost:19000`

**Terminal 2:**
```bash
npm run dev
```

Wait for: `▲ Ready in Xs`

## 5. Open Dashboard

Open browser: **http://localhost:3000**

You should see the HOME page with system status cards.

## Verify It Works

✅ See system services, agents, cron jobs
✅ Click through nav items (ops, agents, chat, etc.)
✅ Try the chat interface
✅ Approve a task in /ops?tab=tasks

## Seed Demo Data (Optional)

```bash
# In a third terminal
npx convex run seed:seedDatabase
```

Refreshes the browser page to see data populate.

## Next Steps

1. **Customize** — Edit colors, text, icons
2. **Add features** — Follow patterns in existing pages
3. **Deploy** — See `DEPLOYMENT.md`
4. **Integrate** — Connect to OpenClaw (see `README.md`)

## Troubleshooting

**"Cannot find module" error?**
```bash
npm install
```

**Convex auth failing?**
```bash
npx convex auth logout
npx convex auth login
```

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**No data showing?**
```bash
npx convex run seed:seedDatabase
```

## What You Built

A premium AI agent command center with:
- ✅ 8 full-featured pages
- ✅ Real-time database (Convex)
- ✅ Beautiful dark UI (glass morphism)
- ✅ Smooth animations (Framer Motion)
- ✅ Mobile responsive
- ✅ Production ready

---

**Questions?** Read `README.md` or `DEVELOPMENT.md`

**Ready to deploy?** See `DEPLOYMENT.md`
