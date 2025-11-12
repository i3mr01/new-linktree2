#!/usr/bin/env node

// Auto-push script for GitHub (Node.js)
// This script commits and pushes all changes to GitHub

const { execSync } = require('child_process');
const path = require('path');

console.log('🔄 Auto-pushing changes to GitHub...');

try {
  // Add all changes
  execSync('git add -A', { stdio: 'inherit' });

  // Check if there are changes to commit
  const status = execSync('git status --porcelain', { encoding: 'utf-8' });
  
  if (!status.trim()) {
    console.log('✅ No changes to commit');
    process.exit(0);
  }

  // Commit with timestamp
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const commitMsg = `Auto-update: ${timestamp}`;
  execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });

  // Push to GitHub
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('✅ Successfully pushed to GitHub!');
} catch (error) {
  console.error('❌ Error pushing to GitHub:', error.message);
  process.exit(1);
}

