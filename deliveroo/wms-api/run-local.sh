#!/bin/bash

source .venv/bin/activate

export POSTGRES_URL=postgresql+psycopg2://admin:strongpassword123@localhost:5432/deliveroo
export SERVICE_NAME=wms-api
export PORT=3001
python src/run.py

deactivate
