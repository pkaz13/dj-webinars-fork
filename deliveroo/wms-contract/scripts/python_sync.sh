#!/bin/bash

rm -rf ../wms-api/src/contract
cp -r ./output/python/wms_client/models ../wms-api/src/contract
echo "✅ Successfully synced Python models to wms-api/src/contract"
