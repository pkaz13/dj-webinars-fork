from flask import Flask, request
from flask_cors import CORS
import os
from env import assert_env_var
from logger import logger

# register blueprints
from routes.health import health_bp
from routes.warehouse import warehouse_bp
from routes.payments import payments_bp
from routes.storage import storage_bp
from routes.employees import employees_bp

assert_env_var('SERVICE_NAME')
SERVICE_NAME = os.environ.get('SERVICE_NAME')

app = Flask(SERVICE_NAME)

CORS(app, origins=["http://localhost:4200"])
# per route
# @cross_origin(origins="http://localhost:4200")

@app.before_request
def log_request():
    logger.info(f"Request: {request.method} {request.url}")
    # logger.info(f"Request: {request.method} {request.url} {request.headers}")

app.register_blueprint(health_bp, url_prefix='/health')
app.register_blueprint(warehouse_bp, url_prefix='/warehouse')
app.register_blueprint(payments_bp, url_prefix='/payments')
app.register_blueprint(storage_bp, url_prefix='/storage')
app.register_blueprint(employees_bp, url_prefix='/employees')
