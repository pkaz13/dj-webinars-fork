from flask import Blueprint, jsonify, request
from application import logger
from sqlalchemy import text
from database import db_engine

payments_bp = Blueprint('payments_bp', __name__)

@payments_bp.route('/', methods=['GET'])
def payments():
    status = request.args.get('status', 'pending')
    query = text('''
        SELECT
            payment_id,
            storage_record_id,
            customer_id,
            amount,
            currency,
            status,
            payment_date,
            external_reference
        FROM
            payment
        WHERE
            status = :status
        ORDER BY
            payment_date NULLS LAST, payment_id;
    ''')
    with db_engine.connect() as conn:
        result = conn.execute(query, {'status': status})
        payments = [dict(row) for row in result.mappings()]
    logger.info(f"Fetched {len(payments)} payments with status '{status}'")
    return jsonify(payments)
