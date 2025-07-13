#!/bin/bash

mv ./output/ts/default/default.service.ts ./output/ts/default/api.service.contract.ts
mv ./output/ts/default/default.msw.ts ./output/ts/default/api.service.contract.msw.ts

# The -i '' is for macOS compatibility (to edit in-place without a backup)
sed -i '' 's/DefaultService/ContractAPIService/g' ./output/ts/default/api.service.contract.ts
sed -i '' 's/DefaultService/ContractAPIService/g' ./output/ts/default/api.service.contract.msw.ts

mv ./output/ts/default ./output/ts/api
