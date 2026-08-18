#!/usr/bin/env bash
set -euo pipefail

cd /app

if [[ ! -f storage/vector_db/index.faiss ]]; then
  echo "Building FAISS vector store..."
  uv run python scripts/build_vectorstore.py
fi

exec uv run uvicorn backend.main:app --host 0.0.0.0 --port "${PORT:-8000}"
