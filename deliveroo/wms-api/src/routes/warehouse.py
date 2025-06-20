from flask import Blueprint, jsonify, request
from application import logger
from sqlalchemy import text
from database import db_engine

warehouse_bp = Blueprint('warehouse_bp', __name__)

@warehouse_bp.route('/<int:warehouse_id>', methods=['GET'])
def get_warehouse_employees(warehouse_id):
    query = text('''
        SELECT
            e.employee_id,
            e.name AS employee_name,
            e.email,
            e.phone,
            e.hire_date,
            STRING_AGG(r.name, ', ') AS roles
        FROM
            employee e
        JOIN
            employee_warehouse ew ON e.employee_id = ew.employee_id
        JOIN
            employee_role er ON e.employee_id = er.employee_id
        JOIN
            role r ON er.role_id = r.role_id
        WHERE
            ew.warehouse_id = :warehouse_id
        GROUP BY
            e.employee_id, e.name, e.email, e.phone, e.hire_date
        ORDER BY
            e.name;
    ''')
    with db_engine.connect() as conn:
        result = conn.execute(query, {'warehouse_id': warehouse_id})
        employees = [dict(row) for row in result.mappings()]
    logger.info(f"Fetched {len(employees)} employees for warehouse {warehouse_id}")
    return jsonify(employees)