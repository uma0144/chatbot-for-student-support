#!/usr/bin/env bash
set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

export PATH="${HOME}/.local/bin:${PATH}"

if ! command -v uv >/dev/null 2>&1; then
  curl -fsSL https://astral.sh/uv/install.sh | sh
  export PATH="${HOME}/.local/bin:${PATH}"
fi

uv python install 3.14
uv sync --frozen 2>/dev/null || uv sync

cd frontend
if [[ -f package-lock.json ]]; then
  npm ci
else
  npm install
fi
cd ..

if [[ ! -f storage/vector_db/index.faiss ]]; then
  uv run python .cursor/scripts/build_vectorstore.py
fi

echo "Install complete."
