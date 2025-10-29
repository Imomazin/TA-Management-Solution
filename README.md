# TA Management System

Teaching Assistant Management Platform built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and Supabase.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, RLS)
- **ORM**: Prisma
- **Error Tracking**: Sentry
- **Testing**: Playwright (E2E)
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## Prerequisites

- Node.js 22+ (use `nvm use` to set the correct version)
- npm or yarn
- A Supabase account
- A Sentry account (optional, for error tracking)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TA-Management-Solution
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings > Database > Connection String > URI
3. Copy your connection string (you'll need this for DATABASE_URL)
4. Copy your project URL and anon key from Project Settings > API

### 4. Configure Environment Variables

```bash
cp .env.sample .env.local
```

Edit `.env.local` and add your credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database Configuration (Prisma)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres

# Sentry Configuration (Optional)
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project
SENTRY_AUTH_TOKEN=your_sentry_auth_token

# Email configuration
EMAIL_FROM=noreply@university.edu
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Generate Prisma Client

```bash
npm run prisma:generate
```

### 6. Run Database Migrations

```bash
npm run prisma:migrate
```

This will create all the necessary tables in your Supabase database.

### 7. Seed the Database (Optional)

```bash
npm run seed
```

### 8. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Accounts

After running the seed script, use these credentials:

- **Admin**: admin@test.com / password123
- **Staff**: staff1@test.com / password123
- **Committee**: committee1@test.com / password123
- **TA**: ta1@test.com / password123
- **Applicant**: applicant1@test.com / password123

## Project Structure

```
TA-Management-Solution/
├── app/                   # Next.js app directory (App Router)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── lib/                  # Utilities and configurations
│   └── prisma.ts         # Prisma client singleton
├── prisma/
│   └── schema.prisma     # Database schema
├── tests/
│   └── e2e/              # Playwright E2E tests
├── scripts/
│   └── seed.ts           # Database seeding script
├── .github/
│   └── workflows/
│       └── ci.yml        # GitHub Actions CI pipeline
├── sentry.*.config.ts    # Sentry configuration
├── instrumentation.ts    # Next.js instrumentation
├── playwright.config.ts  # Playwright configuration
├── .nvmrc                # Node version specification
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes Prisma client generation)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run test:e2e` - Run Playwright E2E tests
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations (dev)
- `npm run prisma:deploy` - Deploy migrations (production)
- `npm run prisma:studio` - Open Prisma Studio (database GUI)
- `npm run seed` - Seed the database

## Features

### Applicant Portal
- Submit applications with resume upload
- Set preferences for sections
- Track application status

### Staff Console
- Review and filter applications
- Mark applications as ready for review
- Request additional documents

### Matching System
- Automated scoring based on GPA, experience, availability, and preferences
- Conflict detection
- Ranked results with explanation

### Committee Review
- Approve, hold, or reject applications
- Auto-approval for high-scoring candidates
- Decision tracking

### Offer Management
- Generate PDF offers
- Email delivery with acceptance tokens
- Automatic assignment creation upon acceptance

### Time Tracking
- TAs log hours against tasks
- Weekly timesheet submission
- Instructor approval workflow
- Admin CSV export

### Reporting
- Hours by TA and section
- CSV exports
- Comprehensive audit logging

## Deployment

### Vercel Deployment

1. Push to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Supabase Setup

1. Create production project
2. Run migrations
3. Configure authentication providers
4. Set up storage buckets with appropriate policies

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every PR and push to main:
- Dependency installation
- ESLint checks
- TypeScript type checking
- Production build verification

To enable branch protection:
1. Go to Repository Settings > Branches
2. Add a branch protection rule for `main`
3. Require status checks to pass before merging
4. Select the "CI / build" check

## Security Features

- Row Level Security (RLS) policies
- Signed URLs for file storage
- Role-based access control
- Comprehensive audit logging
- Token-based offer acceptance

## License

MIT
