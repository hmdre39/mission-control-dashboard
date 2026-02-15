# Deployment Guide

Complete instructions for deploying Mission Control Dashboard to production.

## Prerequisites

- GitHub repository (for Vercel)
- Convex account (convex.dev)
- Node.js 18+ installed locally
- Domain name (optional, for custom domain)

## Step 1: Prepare Code for Deployment

### 1.1 Update environment configuration

```bash
cd ~/.openclaw/workspace
cp .env.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_CONVEX_URL=https://[your-project].convex.cloud
```

### 1.2 Test production build locally

```bash
npm run build
npm start
```

Visit http://localhost:3000 and verify all pages load.

### 1.3 Commit changes

```bash
git add .
git commit -m "chore: prepare for production deployment"
git push origin main
```

## Step 2: Deploy Convex Backend

### 2.1 Authenticate with Convex

```bash
npx convex auth login
```

Follow the prompts to authenticate.

### 2.2 Create Convex project

```bash
npx convex project create mission-control-prod
```

Convex will output a deployment URL like:
```
Deployment URL: https://mission-control-prod-xyz.convex.cloud
```

### 2.3 Update .env.local

```
NEXT_PUBLIC_CONVEX_URL=https://mission-control-prod-xyz.convex.cloud
```

### 2.4 Deploy Convex functions and schema

```bash
npx convex deploy
```

This pushes the schema, queries, and mutations to production.

### 2.5 Seed production database

```bash
npx convex run seed:seedDatabase
```

Verify data was seeded:
```bash
npx convex run queries:getSystemStatus
```

## Step 3: Deploy to Vercel

### 3.1 Push code to GitHub

Ensure your repository is up to date:

```bash
git add .
git commit -m "chore: production ready"
git push origin main
```

### 3.2 Create Vercel project

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your repository
4. Click "Import"

### 3.3 Configure environment variables

In Vercel dashboard:
1. Go to "Settings" → "Environment Variables"
2. Add variable:
   - Name: `NEXT_PUBLIC_CONVEX_URL`
   - Value: `https://mission-control-prod-xyz.convex.cloud`
3. Click "Save"

### 3.4 Deploy

1. Click "Deploy" button
2. Wait for build to complete (~3-5 minutes)
3. Once complete, Vercel provides your dashboard URL:
   ```
   https://mission-control-[random].vercel.app
   ```

### 3.5 Add custom domain (optional)

1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate (usually instant)

## Step 4: Verify Production Deployment

### 4.1 Test dashboard accessibility

1. Open https://mission-control-[random].vercel.app
2. Verify all pages load (click through each nav item)
3. Check browser console for errors

### 4.2 Verify Convex connectivity

1. Go to HOME page
2. Confirm system status cards display data
3. Check Network tab in DevTools for Convex requests

### 4.3 Test real-time updates

1. Open two browser windows to the dashboard
2. Go to /ops?tab=tasks page in both
3. Click "Approve" on a task in one window
4. Verify the task status updates in the other window (real-time)

## Step 5: Configure OpenClaw Integration (Optional)

If running OpenClaw and want to push state to Convex:

### 5.1 Get Convex deployment API key

```bash
npx convex env
```

Copy the API key.

### 5.2 Create OpenClaw webhook

Add to OpenClaw config (`~/.openclaw/openclaw.json`):

```json
{
  "webhooks": {
    "convex": {
      "url": "https://[your-convex-url]/updateSystemState",
      "apiKey": "[convex-api-key]",
      "interval": 30000
    }
  }
}
```

### 5.3 Restart OpenClaw

```bash
openclaw gateway restart
```

### 5.4 Verify data sync

Monitor Convex dashboard to see incoming updates.

## Step 6: Set Up CI/CD

### 6.1 Automatic deployments on push

Vercel automatically deploys when you push to main:

```bash
# This automatically triggers a Vercel deployment
git push origin main
```

### 6.2 Deploy Convex on code changes

Add to your CI/CD pipeline (GitHub Actions):

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: npx convex deploy
        env:
          CONVEX_DEPLOYMENT: ${{ secrets.CONVEX_DEPLOYMENT }}
          CONVEX_ADMIN_KEY: ${{ secrets.CONVEX_ADMIN_KEY }}
```

Add secrets in GitHub:
1. Go to repo "Settings" → "Secrets and variables" → "Actions"
2. Add:
   - `CONVEX_DEPLOYMENT`: Your deployment ID
   - `CONVEX_ADMIN_KEY`: Your admin key (from `npx convex env`)

## Step 7: Monitoring & Maintenance

### 7.1 Monitor Vercel

- Visit https://vercel.com/dashboard
- Check deployment status and logs
- Monitor performance metrics

### 7.2 Monitor Convex

- Visit https://dashboard.convex.dev
- Check query/mutation performance
- Monitor storage usage
- Set up alerts for errors

### 7.3 Application monitoring (optional)

Consider adding:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **Datadog** for performance monitoring

## Step 8: Scaling & Optimization

### 8.1 Optimize images (if added)

- Use Next.js Image component
- Set `unoptimized: false` in `next.config.ts`

### 8.2 Optimize bundle size

```bash
npm install --save-dev @next/bundle-analyzer
```

Check what's taking up space.

### 8.3 Add caching headers

Update `next.config.ts`:

```typescript
async headers() {
  return [
    {
      source: "/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
  ];
}
```

### 8.4 Set up CDN caching

Vercel automatically uses Vercel Edge Network. No additional setup needed.

## Troubleshooting

### Build fails on Vercel

1. Check build logs in Vercel dashboard
2. Verify all TypeScript types are correct:
   ```bash
   npx tsc --noEmit
   ```
3. Test locally first:
   ```bash
   npm run build
   ```

### Convex deployment fails

1. Check Convex CLI is authenticated:
   ```bash
   npx convex auth status
   ```
2. Verify schema has no errors:
   ```bash
   npx convex dev
   ```
3. Check for TypeScript errors in Convex code

### Data not syncing from OpenClaw

1. Verify OpenClaw is running:
   ```bash
   openclaw status
   ```
2. Check webhook URL in config is correct
3. Check OpenClaw logs:
   ```bash
   openclaw log
   ```
4. Verify Convex API key is valid

### Dashboard slow in production

1. Check Convex query performance:
   - Go to Convex dashboard
   - Look for slow queries
   - Add indexes if needed
2. Check Vercel performance:
   - Go to Analytics in Vercel
   - Check Core Web Vitals
3. Use browser DevTools Network tab:
   - Look for slow API responses
   - Check for failed requests

## Rollback

If you need to rollback to a previous version:

### Rollback Vercel

1. Go to Vercel dashboard
2. Click "Deployments"
3. Find the deployment you want to restore
4. Click three dots → "Promote to Production"

### Rollback Convex

```bash
# Check available versions
npx convex versions list

# Rollback to specific version
npx convex versions restore [version-id]
```

## Cleanup & Decommission

To completely remove the deployment:

### Remove from Vercel

1. Go to project settings
2. Scroll to "Danger Zone"
3. Click "Delete Project"

### Remove from Convex

```bash
npx convex project delete
```

### Clean up GitHub (optional)

```bash
git remote remove origin
```

---

**Questions?** See [docs.openclaw.ai](https://docs.openclaw.ai) or [docs.convex.dev](https://docs.convex.dev)
