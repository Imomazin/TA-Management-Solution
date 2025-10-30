#!/bin/bash

# Simple script to add and push the GitHub Actions workflow
# This works in GitHub Codespaces because you have your own credentials

echo "📦 Adding GitHub Actions workflow..."
git add .github/workflows/ci.yml

echo "💾 Committing workflow..."
git commit -m "Add GitHub Actions CI workflow

Automated CI pipeline that runs on PRs and pushes to main:
- npm ci (install dependencies)
- npm run lint (ESLint checks)
- npm run typecheck (TypeScript validation)
- npm run build (production build verification)

🤖 Generated with Claude Code"

echo "🚀 Pushing to GitHub..."
git push

echo "✅ Done! Your CI workflow is now active on GitHub."
echo ""
echo "Next steps:"
echo "1. Go to your repo on GitHub and click the 'Actions' tab"
echo "2. You should see the workflow running!"
echo "3. (Optional) Enable branch protection in Settings > Branches"
