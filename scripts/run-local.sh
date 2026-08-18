#!/usr/bin/env bash
# Run backend + frontend locally (Linux/macOS)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ ! -f .env ]]; then
  echo "Create .env first: cp .env.example .env"
  echo "Then set GROQ_API_KEY in .env"
  exit 1
fi

if [[ ! -f storage/vector_db/index.faiss ]]; then
  echo "Building FAISS vector store (first run only)..."
  python .cursor/scripts/build_vectorstore.py
fi

echo "Starting backend on http://127.0.0.1:8000"
echo "Starting frontend on http://localhost:5173"
echo "Press Ctrl+C to stop both."

trap 'kill 0' EXIT

(
  set -a
  source .env
  set +a
  uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
) &

cd frontend
npm run dev -- --host 127.0.0.1 --port 5173
