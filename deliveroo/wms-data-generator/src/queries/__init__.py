import psycopg2
from psycopg2.extras import RealDictCursor

DB_CONFIG = {
    'host': 'localhost',
    'port': 5432,
    'dbname': 'deliveroo',
    'user': 'admin',
    'password': 'strongpassword123',
    'sslmode': 'prefer',
}

def get_connection():
    return psycopg2.connect(**DB_CONFIG, cursor_factory=RealDictCursor)

# --- Query Functions ---
def fetch_employees_with_roles_by_warehouse(warehouse_id):
    sql = '''
    SELECT
        p.party_id,
        p.name AS employee_name,
        p.created_at AS hire_date,
        STRING_AGG(r.name, ', ') AS roles
    FROM
        party p
    JOIN
        employee_warehouse ew ON p.party_id = ew.party_id
    JOIN
        party_role pr ON p.party_id = pr.party_id
    JOIN
        role r ON pr.role_id = r.role_id
    WHERE
        ew.warehouse_id = %s
        AND p.data->>'type' = 'employee'
    GROUP BY
        p.party_id
    ORDER BY
        p.name;
    '''
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (warehouse_id,))
            return cur.fetchall()

def get_all_pending_payments(limit=20):
    sql = '''
    SELECT
        payment_id,
        storage_record_id,
        party_id,
        amount,
        currency,
        status,
        payment_date,
        external_reference
    FROM
        payment
    WHERE
        status = 'PENDING'
    ORDER BY
        payment_date NULLS LAST, payment_id
    LIMIT %s;
    '''
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (limit,))
            return cur.fetchall()

def get_all_payments_by_party(party_id, limit=20):
    sql = '''
    SELECT
        payment_id,
        storage_record_id,
        party_id,
        amount,
        currency,
        status,
        payment_date,
        external_reference
    FROM
        payment
    WHERE
        party_id = %s
    ORDER BY
        payment_date NULLS LAST, payment_id
    LIMIT %s;
    '''
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (party_id, limit))
            return cur.fetchall()

def get_pending_payments_by_party(party_id, limit=20):
    sql = '''
    SELECT
        payment_id,
        storage_record_id,
        party_id,
        amount,
        currency,
        status,
        payment_date,
        external_reference
    FROM
        payment
    WHERE
        party_id = %s
        AND status = 'pending'
    ORDER BY
        payment_date NULLS LAST,
        payment_id
    LIMIT %s;
    '''
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (party_id, limit))
            return cur.fetchall()

def list_pending_storage_requests(limit=20):
    sql = '''
    SELECT
        request_id,
        issuing_party_id,
        warehouse_id,
        requested_entry_date,
        requested_exit_date,
        status
    FROM
        storage_request
    WHERE
        status = 'PENDING'
    ORDER BY
        requested_entry_date
    LIMIT %s;
    '''
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (limit,))
            return cur.fetchall()

def storage_event_history_for_storage_record(storage_record_id, limit=20):
    sql = '''
    SELECT
        event_id,
        storage_record_id,
        event_type_id,
        event_time,
        party_id,
        details
    FROM
        cargo_event_history
    WHERE
        storage_record_id = %s
    ORDER BY
        event_time
    LIMIT %s;
    '''
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (storage_record_id, limit))
            return cur.fetchall()

def get_table_row_and_row_counts():
    sql_tables = """
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
    """
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql_tables)
            tables = [row['table_name'] for row in cur.fetchall()]
            results = []
            for table in tables:
                cur.execute(f'SELECT COUNT(*) AS row_count FROM "{table}";')
                row_count = cur.fetchone()['row_count']
                results.append({'table': table, 'row_count': row_count})
            return results

def get_contractor_details(contractor_party_id):
    sql = """
    WITH contractor_base AS (
        SELECT
            p.party_id,
            p.name AS contractor_name,
            p.data,
            p.created_at,
            p.updated_at
        FROM party p
        WHERE p.party_id = %s AND p.data->>'type' = 'contractor_company'
    ),
    contractor_contacts AS (
        SELECT
            party_id,
            json_agg(json_build_object('type', type, 'details', details)) AS contacts
        FROM party_contact
        WHERE party_id = %s
        GROUP BY party_id
    ),
    employee_parties AS (
        SELECT
            pr.party_id_primary,
            p.party_id AS employee_id,
            p.name AS employee_name,
            p.data AS employee_data,
            (SELECT json_agg(json_build_object('type', pc.type, 'details', pc.details))
             FROM party_contact pc WHERE pc.party_id = p.party_id) AS contacts
        FROM party_relationship pr
        JOIN party p ON pr.party_id_secondary = p.party_id
        WHERE pr.party_id_primary = %s AND pr.relationship_type = 'REPRESENTATIVE'
    ),
    aggregated_employees AS (
        SELECT
            party_id_primary,
            json_agg(json_build_object(
                'employee_id', employee_id,
                'employee_name', employee_name,
                'employee_data', employee_data,
                'contacts', contacts
            )) AS employees
        FROM employee_parties
        GROUP BY party_id_primary
    )
    SELECT
        cb.*,
        cc.contacts,
        ae.employees
    FROM contractor_base cb
    LEFT JOIN contractor_contacts cc ON cb.party_id = cc.party_id
    LEFT JOIN aggregated_employees ae ON cb.party_id = ae.party_id_primary;
    """
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(sql, (contractor_party_id, contractor_party_id, contractor_party_id))
            return cur.fetchone()

# --- Automated Console Test ---
def run_all_queries_test():
    print('--- fetch_employees_with_roles_by_warehouse ---')
    for wid in [1]:
        print(f'warehouse_id={wid}:', fetch_employees_with_roles_by_warehouse(wid))
    print('\n--- get_all_pending_payments (limit=5) ---')
    print(get_all_pending_payments(limit=5))
    print('\n--- get_all_payments_by_party (limit=5) ---')
    for pid in [1, 2]:
        print(f'party_id={pid}:', get_all_payments_by_party(pid, limit=5))
    print('\n--- get_pending_payments_by_party (limit=5) ---')
    for pid in [1, 2]:
        print(f'party_id={pid}:', get_pending_payments_by_party(pid, limit=5))
    print('\n--- list_pending_storage_requests (limit=5) ---')
    print(list_pending_storage_requests(limit=5))
    print('\n--- storage_event_history_for_storage_record (limit=5) ---')
    for srid in [1, 2]:
        print(f'storage_record_id={srid}:', storage_event_history_for_storage_record(srid, limit=5))
    print('\n--- Table row counts ---')
    table_info = get_table_row_and_row_counts()
    for info in table_info:
        print(f"Table: {info['table']}, Rows: {info['row_count']}")
    empty_tables = [info['table'] for info in table_info if info['row_count'] == 0]
    print(f"\nEmpty tables: {empty_tables}")
    print('\n--- get_contractor_details ---')
    for cid in [1, 2, 3]:
        print(f'contractor_id={cid}:', get_contractor_details(cid))
