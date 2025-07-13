#!/bin/bash
set -e

echo "🚚 Testing WMS SQL queries..."

# Activate venv and run the test function
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

if [ -d ".venv" ]; then
    source .venv/bin/activate
fi

python3 -c "from src.queries import run_all_queries_test; run_all_queries_test()"

deactivate
echo "✅ Done"
