# Phase 1: Foundation & Postgres Migration

## Overview
This document describes Phase 1 of the AI-powered Application Review System implementation.

## Changes Made

### 1. Database Migration: SQLite → PostgreSQL

**Why:** SQLite caused Vercel build failures due to filesystem constraints. PostgreSQL (via Neon) provides:
- Serverless compatibility
- No build-time filesystem requirements
- Better scalability for production

**Schema Changes:**
- Changed `datasource db` provider from `"sqlite"` to `"postgresql"`
- Kept `binaryTargets = ["native", "debian-openssl-3.0.x"]` for Vercel compatibility

### 2. New Application Model

Added comprehensive Application tracking with:

**Fields:**
- Applicant info: `firstName`, `lastName`, `email`, `program`, `gpa`, `skills[]`
- Application data: `answersJson` (pre-qualification questions)
- Resume: `resumeUrl`, `resumeText`, `resumeKeywords[]`
- AI evaluation: `aiScore`, `aiRationale`, `aiRecommendation`
- Workflow: `status` (tracks application lifecycle)

**Status Workflow:**
```
DRAFT → SUBMITTED → STAFF_REVIEW → RECOMMENDED →
COMMITTEE_REVIEW → OFFER_APPROVED/OFFER_DECLINED/REJECTED
```

**New Enums:**
- `ApplicationStatus`: 9 states from DRAFT to WITHDRAWN
- `ApplicationRecommendation`: AI recommendation levels

### 3. Application History Model

Audit trail for all application state changes:
- Tracks actor (user or system/AI)
- Records action and notes
- Timestamps for compliance

### 4. Environment Configuration

**New Required Variables:**
```bash
DATABASE_URL          # Neon Postgres connection string
OPENAI_API_KEY        # For AI resume scoring
RESEND_API_KEY        # For email notifications
```

**Optional (for Supabase Storage instead of Vercel Blob):**
```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## Setup Instructions

### Local Development

1. **Get a Neon Postgres Database** (free tier):
   - Go to https://neon.tech
   - Create a new project
   - Copy the connection string

2. **Update `.env.local`:**
   ```bash
   DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
   OPENAI_API_KEY="sk-..."  # Get from OpenAI
   RESEND_API_KEY="re_..."  # Get from Resend
   ```

3. **Run Migrations:**
   ```bash
   npx prisma migrate dev --name init_postgres
   npx prisma generate
   ```

4. **Start Development:**
   ```bash
   npm run dev
   ```

### Vercel Deployment

1. **Add Environment Variables** in Vercel Dashboard:
   - Navigate to: Project → Settings → Environment Variables
   - Add for **Preview** and **Production**:
     - `DATABASE_URL` = Your Neon Postgres connection string
     - `OPENAI_API_KEY` = Your OpenAI API key
     - `RESEND_API_KEY` = Your Resend API key

2. **Deploy:**
   ```bash
   git push origin feat/applications-ai-review-and-vercel-stability
   ```

3. **Run Initial Migration** (one-time):
   - After first successful build
   - Option A: Use Vercel CLI: `vercel env pull && npx prisma migrate deploy`
   - Option B: Create temporary `/api/migrate` endpoint (remove after use)

## Verification Steps

1. **Schema Generation:**
   ```bash
   npx prisma generate
   # Should complete without errors
   ```

2. **Type Check:**
   ```bash
   npm run typecheck
   # Should pass with new Application types
   ```

3. **Lint:**
   ```bash
   npm run lint
   # Should pass
   ```

## Breaking Changes

⚠️ **Important:** This changes the Application model significantly:

**Old Model (linked to User):**
```prisma
model Application {
  userId    String
  status    AppStatus
  user      User @relation(...)
}
```

**New Model (standalone):**
```prisma
model Application {
  email            String @unique
  firstName        String
  // ... no User relation
}
```

**Migration Path:**
- Existing Application data will be dropped
- If you have production data, export it first
- This is Phase 1 foundation - data structure will stabilize

## Next Phases

- **Phase 2:** Core API endpoints & file upload (Vercel Blob)
- **Phase 3:** AI integration (OpenAI scoring)
- **Phase 4:** Email workflows (Resend)
- **Phase 5:** UI dashboards (Student/Staff/Committee)
- **Phase 6:** Tests & documentation

## Rollback Plan

If issues occur:

1. **Revert schema:**
   ```bash
   git checkout main -- prisma/schema.prisma
   npx prisma generate
   ```

2. **Update DATABASE_URL** back to SQLite (local only):
   ```bash
   DATABASE_URL="file:/tmp/dev.db"
   ```

3. **Redeploy:**
   ```bash
   git push origin main
   ```

## Support

If you encounter issues:
1. Check Vercel build logs for specific errors
2. Verify DATABASE_URL format (must include `?sslmode=require` for Neon)
3. Ensure Prisma client regenerates after schema changes
4. Confirm no build-time database access (all DB calls in API routes only)

---

**Status:** Phase 1 Complete
**Next:** Implement Core API endpoints (Phase 2)
