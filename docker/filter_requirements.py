"""Filter uv export output — drop CUDA/NVIDIA/torch lines for CPU-only Docker builds."""

import sys

SKIP = ("nvidia-", "cuda-", "triton", "torch")


def main() -> None:
    for line in sys.stdin:
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        pkg = stripped.split("==")[0].split(";")[0].strip().lower()
        if pkg.startswith(SKIP):
            continue
        sys.stdout.write(line)


if __name__ == "__main__":
    main()
