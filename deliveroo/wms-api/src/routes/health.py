from flask import Blueprint
from application import logger

health_bp = Blueprint('health_bp', __name__)

@health_bp.route('/', methods=['GET'])
def health():
    logger.debug('Health check requested')
    return 'OK', 200
