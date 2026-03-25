#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
SOURCE_DIR="$ROOT_DIR/.claude/commands"
TARGET_DIR="$ROOT_DIR/.opencode/commands"

mkdir -p "$TARGET_DIR"

python3 - "$SOURCE_DIR" "$TARGET_DIR" <<'PY'
from pathlib import Path
import re
import sys

source_dir = Path(sys.argv[1])
target_dir = Path(sys.argv[2])

for source_path in sorted(source_dir.glob("speckit.*.md")):
    text = source_path.read_text(encoding="utf-8")

    if text.startswith("---\n"):
        _, frontmatter, body = text.split("---\n", 2)
    else:
        frontmatter = ""
        body = text

    match = re.search(r"^description:\s*(.+)$", frontmatter, flags=re.MULTILINE)
    description = match.group(1).strip() if match else f"Run {source_path.stem}"

    output = (
        "---\n"
        f"description: {description}\n"
        "agent: build\n"
        "---\n\n"
        f"{body.lstrip()}"
    )

    target_path = target_dir / source_path.name
    target_path.write_text(output, encoding="utf-8")
    print(target_path.relative_to(target_dir.parent.parent))
PY
