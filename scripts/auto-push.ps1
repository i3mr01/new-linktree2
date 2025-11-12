# Auto-push script for GitHub (PowerShell)
# This script commits and pushes all changes to GitHub

Write-Host "🔄 Auto-pushing changes to GitHub..." -ForegroundColor Cyan

# Add all changes
git add -A

# Check if there are changes to commit
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "✅ No changes to commit" -ForegroundColor Green
    exit 0
}

# Commit with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMsg = "Auto-update: $timestamp"
git commit -m $commitMsg

# Push to GitHub
git push origin main

Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green

