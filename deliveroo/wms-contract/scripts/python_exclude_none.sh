#!/bin/bash

# Script to replace exclude_none=True with exclude_none=False in generated Python files
# This ensures that None values are included in the JSON output

echo "🔄 Modifying exclude_none behavior in generated Python models..."

# Directory containing the generated Python files
PYTHON_OUTPUT_DIR="./output/python"

# Check if the directory exists
if [ ! -d "$PYTHON_OUTPUT_DIR" ]; then
    echo "❌ Directory $PYTHON_OUTPUT_DIR does not exist. Make sure Python generation completed successfully."
    exit 1
fi

# Find all Python files and replace exclude_none=True with exclude_none=False
find "$PYTHON_OUTPUT_DIR" -name "*.py" -type f -exec sed -i.bak 's/exclude_none=True/exclude_none=False/g' {} \;

# Count the number of files that were modified
MODIFIED_FILES=$(find "$PYTHON_OUTPUT_DIR" -name "*.py" -type f -exec grep -l "exclude_none=False" {} \; | wc -l)

# Clean up backup files created by sed
find "$PYTHON_OUTPUT_DIR" -name "*.bak" -type f -delete

echo "✅ Successfully modified exclude_none behavior in $MODIFIED_FILES Python files"
echo "🔧 All None values will now be included in JSON output"
