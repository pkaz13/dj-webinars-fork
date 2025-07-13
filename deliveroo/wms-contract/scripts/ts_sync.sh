#!/bin/bash

rm -rf ../wms-frontend/src/app/contract
cp -r ./output/ts ../wms-frontend/src/app/contract
echo "✅ Successfully synced TypeScript models to wms-frontend/src/app/contract"
