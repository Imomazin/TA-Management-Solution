# GitHub Actions Workflow Setup

Due to GitHub security restrictions, the workflow file `.github/workflows/ci.yml` must be added manually.

## Option 1: Add via GitHub UI (Recommended)

1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. Click "New workflow"
4. Click "set up a workflow yourself"
5. Copy and paste the content below
6. Name the file `ci.yml`
7. Commit the file

## Option 2: Push with Your Personal Credentials

If you have push access with your personal GitHub account:

```bash
git add .github/workflows/ci.yml
git commit -m "Add CI workflow"
git push
```

## Workflow Content

Create `.github/workflows/ci.yml` with this content:

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - run: npm ci

      - run: npm run lint

      - run: npm run typecheck

      - run: npm run build
```

## After Adding the Workflow

1. Enable branch protection on `main`:
   - Go to Settings > Branches
   - Add rule for `main`
   - Require status checks: "CI / build"
   - Require PR reviews before merging

2. The workflow will run automatically on:
   - Every pull request
   - Every push to main branch

## What the Workflow Does

- ✅ Installs dependencies with `npm ci`
- ✅ Runs ESLint to check code quality
- ✅ Runs TypeScript type checking
- ✅ Builds the project to verify production readiness
