#!/bin/bash

# Script to replace wms_client.models. with models. in generated Python model files
# This simplifies the import paths within the models directory

echo "🔄 Simplifying import paths in generated Python models..."

# Directory containing the generated Python model files
MODELS_DIR="./output/python/wms_client/models"

# Check if the directory exists
if [ ! -d "$MODELS_DIR" ]; then
    echo "❌ Directory $MODELS_DIR does not exist. Make sure Python generation completed successfully."
    exit 1
fi

# Find all Python files in the models directory and replace wms_client.models. with models.
find "$MODELS_DIR" -name "*.py" -type f -exec sed -i.bak 's/wms_client\.models\./contract\./g' {} \;

# Count the number of files that were modified
MODIFIED_FILES=$(find "$MODELS_DIR" -name "*.py" -type f -exec grep -l "contract\." {} \; | wc -l)

# Clean up backup files created by sed
find "$MODELS_DIR" -name "*.bak" -type f -delete

echo "✅ Successfully simplified import paths in $MODIFIED_FILES Python model files"
echo "🔧 Changed 'wms_client.models.' to 'contract.' for cleaner imports"
