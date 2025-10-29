# TA Management System

Teaching Assistant Management Platform built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, RLS)
- **Deployment**: Vercel

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ta-management
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL migrations in `supabase/migrations/` folder
3. Copy your project URL and anon key from Project Settings > API

### 4. Configure Environment Variables

```bash
cp .env.sample .env.local
```

Edit `.env.local` and add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 5. Run Database Migrations

Execute all SQL files in `supabase/migrations/` in your Supabase SQL editor.

### 6. Seed the Database

```bash
npm run seed
```

### 7. Start Development Server

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
ta-management/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable components
│   ├── lib/              # Utilities and configurations
│   ├── types/            # TypeScript type definitions
│   └── middleware.ts     # Auth middleware
├── supabase/
│   └── migrations/       # SQL migration files
├── scripts/
│   └── seed.ts          # Database seeding script
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
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

GitHub Actions workflow included for:
- Build verification
- Linting
- Type checking

## Security Features

- Row Level Security (RLS) policies
- Signed URLs for file storage
- Role-based access control
- Comprehensive audit logging
- Token-based offer acceptance

## License

MIT
