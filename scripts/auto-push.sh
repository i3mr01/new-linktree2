#!/bin/bash

# Auto-push script for GitHub
# This script commits and pushes all changes to GitHub

echo "🔄 Auto-pushing changes to GitHub..."

# Add all changes
git add -A

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "✅ No changes to commit"
    exit 0
fi

# Commit with timestamp
COMMIT_MSG="Auto-update: $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG"

# Push to GitHub
git push origin main

echo "✅ Successfully pushed to GitHub!"

