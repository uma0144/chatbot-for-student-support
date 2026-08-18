#!/usr/bin/env bash
set -euo pipefail

cd /app

uv venv /app/.venv
export PATH="/app/.venv/bin:$PATH"
export UV_LINK_MODE=copy

echo "Installing CPU-only PyTorch..."
uv pip install torch --index-url https://download.pytorch.org/whl/cpu

echo "Installing remaining dependencies (no CUDA/NVIDIA packages)..."
uv export --frozen --no-dev --no-hashes \
  | python3 /docker/filter_requirements.py \
  | uv pip install -r /dev/stdin

echo "Backend dependencies installed."
