#!/usr/bin/env bash
#
# Publish changes to the live site.
#
#   ./publish.sh "added 2027 Nature paper"
#
# Stages everything, commits, and pushes. GitHub Pages rebuilds automatically,
# so the site is live about a minute later.

set -euo pipefail
cd "$(dirname "$0")"

MSG="${1:-Update site}"

if [ -n "$(git status --porcelain -- '*.nojekyll' '.nojekyll' 2>/dev/null)" ] || [ -f .nojekyll ]; then
  echo "WARNING: a .nojekyll file is present."
  echo "That stops GitHub from building the site and it will serve raw templates."
  echo "Remove it first:  rm .nojekyll"
  exit 1
fi

if [ -z "$(git status --porcelain)" ]; then
  echo "Nothing to publish — no changes since the last push."
  exit 0
fi

echo "About to publish:"
git status --short
echo

git add -A
git commit -q -m "$MSG"
git push -q origin main

echo "Pushed: \"$MSG\""
echo
echo "GitHub is rebuilding now; the site updates in about a minute."
echo "If it doesn't, check the build log:"
echo "  https://github.com/cascoamarillo/cascoamarillo.github.io/actions"
